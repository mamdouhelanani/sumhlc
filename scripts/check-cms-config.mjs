// Checks .pages.yml against the files in content/ before staff run into problems:
//
//  1. Every key used in content/ is declared in .pages.yml. Pages CMS drops
//     undeclared keys when it saves, which would silently delete data.
//  2. Existing values pass the checks Pages CMS runs on every save. One invalid
//     item anywhere in a file blocks saving the whole file:
//     - `pattern` is applied even to blank values (so optional patterns must match "")
//     - number inputs reject values that aren't a multiple of `step` (default 1)
//     - string fields reject non-string values (e.g. an unquoted number)
//     - select values must be one of the declared values
//  3. Optional date fields set `default: ""`; otherwise Pages CMS fills an empty
//     date with today's date when the file is opened.
//
// Usage: npm run check:cms

import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const ROOT = path.resolve(import.meta.dirname, "..");
const config = YAML.parse(fs.readFileSync(path.join(ROOT, ".pages.yml"), "utf8"));
const components = config.components ?? {};
const problems = [];

/** Resolve `component:` references into a concrete field definition. */
function resolve(field) {
  if (!field.component) return field;
  const base = components[field.component];
  if (!base) {
    problems.push(`Unknown component "${field.component}"`);
    return field;
  }
  return { ...resolve(base), ...field, component: undefined };
}

const isBlank = (v) => v === null || v === undefined || v === "";

/** Emulate the per-field checks Pages CMS runs when saving. */
function validateField(value, field, where) {
  const opts = field.options ?? {};
  if (isBlank(value)) {
    if (field.required) problems.push(`${where}: required field "${field.name}" is empty`);
    if (field.pattern && ["string", "text"].includes(field.type ?? "string")) {
      const regex = typeof field.pattern === "string" ? field.pattern : field.pattern.regex;
      if (!new RegExp(regex).test("")) problems.push(`${where}: blank value fails pattern ${regex} (optional patterns must also match "")`);
    }
    return;
  }
  switch (field.type ?? "string") {
    case "string":
    case "text": {
      if (typeof value !== "string") return problems.push(`${where}: expected text but found ${JSON.stringify(value)} (quote it in the YAML)`);
      if (field.pattern) {
        const regex = typeof field.pattern === "string" ? field.pattern : field.pattern.regex;
        if (!new RegExp(regex).test(value)) problems.push(`${where}: ${JSON.stringify(value)} fails pattern ${regex}`);
      }
      if (opts.maxlength && value.length > opts.maxlength) problems.push(`${where}: longer than ${opts.maxlength} characters`);
      break;
    }
    case "number": {
      const n = Number(value);
      if (Number.isNaN(n)) return problems.push(`${where}: ${JSON.stringify(value)} is not a number`);
      const step = opts.step ?? 1;
      const base = opts.min ?? 0;
      const ratio = (n - base) / step;
      if (step !== "any" && Math.abs(ratio - Math.round(ratio)) > 1e-9) problems.push(`${where}: ${n} is not a multiple of step ${step} (set options.step)`);
      if (opts.min !== undefined && n < opts.min) problems.push(`${where}: ${n} is below the minimum ${opts.min}`);
      if (opts.max !== undefined && n > opts.max) problems.push(`${where}: ${n} is above the maximum ${opts.max}`);
      break;
    }
    case "select": {
      const allowed = (opts.values ?? []).map((v) => (typeof v === "object" ? String(v.value ?? v.name) : String(v)));
      const values = opts.multiple ? (Array.isArray(value) ? value : [value]) : [value];
      for (const v of values) {
        if (typeof v !== "string") problems.push(`${where}: select value ${JSON.stringify(v)} must be text`);
        else if (!allowed.includes(v)) problems.push(`${where}: "${v}" is not one of ${allowed.join(", ")}`);
      }
      break;
    }
    case "date":
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) problems.push(`${where}: date ${JSON.stringify(value)} is not YYYY-MM-DD`);
      break;
  }
}

function checkConfigField(field, where) {
  if (field.type === "date" && !field.required && field.default !== "") {
    problems.push(`${where}.${field.name}: optional date needs default: "" or Pages CMS fills in today's date`);
  }
  for (const f of field.fields ?? []) checkConfigField(resolve(f), `${where}.${field.name}`);
}

function checkValue(value, field, where) {
  if (field.list) {
    if (isBlank(value)) return field.required ? problems.push(`${where}: required list "${field.name}" is empty`) : undefined;
    if (!Array.isArray(value)) return problems.push(`${where}: expected a list for "${field.name}"`);
    value.forEach((v, i) => checkValue(v, { ...field, list: false }, `${where}[${i}]`));
    return;
  }
  if (field.type === "object") {
    if (!isBlank(value)) checkObject(value, field.fields ?? [], where);
    return;
  }
  validateField(value, field, where);
}

function checkObject(obj, fields, where) {
  if (typeof obj !== "object" || Array.isArray(obj)) return problems.push(`${where}: expected an object`);
  const resolved = fields.map(resolve);
  const byName = new Map(resolved.map((f) => [f.name, f]));
  for (const key of Object.keys(obj)) {
    if (!byName.has(key)) problems.push(`${where}.${key} is not declared in .pages.yml`);
  }
  for (const field of resolved) checkValue(obj[field.name], field, `${where}.${field.name}`);
}

function entries(list) {
  return list.flatMap((e) => (e.type === "group" ? entries(e.items ?? []) : [e]));
}

for (const entry of entries(config.content ?? [])) {
  for (const f of entry.fields ?? []) checkConfigField(resolve(f), entry.name);

  if (entry.type === "file") {
    const data = YAML.parse(fs.readFileSync(path.join(ROOT, entry.path), "utf8"));
    checkObject(data, entry.fields ?? [], entry.path);
  } else if (entry.type === "collection" && entry.format === "yaml-frontmatter") {
    for (const file of fs.readdirSync(path.join(ROOT, entry.path)).filter((f) => f.endsWith(".md"))) {
      const raw = fs.readFileSync(path.join(ROOT, entry.path, file), "utf8");
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fm) {
        problems.push(`${entry.path}/${file}: missing frontmatter`);
        continue;
      }
      checkObject(YAML.parse(fm[1]), (entry.fields ?? []).filter((f) => f.name !== "body"), `${entry.path}/${file}`);
    }
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) between content/ and .pages.yml:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("✓ .pages.yml covers every content key, and all existing content passes Pages CMS's save checks");
