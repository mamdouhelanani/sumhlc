// Verifies that every key used in content/ is declared in .pages.yml.
// Pages CMS drops undeclared keys when it saves a file, so a missing declaration
// would silently delete data the first time a staff member edits that file.
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

function checkValue(value, field, where) {
  if (value === null || value === undefined) return;
  if (field.list) {
    if (!Array.isArray(value)) return problems.push(`${where}: expected a list for "${field.name}"`);
    value.forEach((v, i) => checkValue(v, { ...field, list: false }, `${where}[${i}]`));
    return;
  }
  if (field.type === "object") checkObject(value, field.fields ?? [], where);
}

function checkObject(obj, fields, where) {
  if (typeof obj !== "object" || Array.isArray(obj)) return problems.push(`${where}: expected an object`);
  const byName = new Map(fields.map((f) => [f.name, resolve(f)]));
  for (const [key, value] of Object.entries(obj)) {
    const field = byName.get(key);
    if (!field) problems.push(`${where}.${key} is not declared in .pages.yml`);
    else checkValue(value, field, `${where}.${key}`);
  }
}

function entries(list) {
  return list.flatMap((e) => (e.type === "group" ? entries(e.items ?? []) : [e]));
}

for (const entry of entries(config.content ?? [])) {
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
console.log("✓ Every content key is declared in .pages.yml");
