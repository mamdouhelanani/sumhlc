// Moves everything the site still loads from the old WordPress server into this repo.
//
// 1. Finds every https://sumhlc.org/wp-content/uploads/… URL in content/ and src/.
// 2. Downloads each file to public/wp-content/uploads/… — the same path it had on
//    WordPress, so links to those files from other websites keep working after the
//    domain moves here.
// 3. Rewrites the URLs to local paths (/wp-content/uploads/…).
// 4. Rewrites links to old WordPress pages and posts inside content/ to their new
//    routes, using the redirect maps in src/config/.
//
// Usage: node scripts/migrate-wordpress-assets.mjs [--dry-run]
// Safe to re-run: files that are already downloaded are skipped.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");
const ORIGIN = "https://sumhlc.org";
const URL_RE = /(?:https?:)?\/\/(?:www\.)?sumhlc\.org(\/[^\s"'<>)\]]*)?/gi;

const pageRedirects = JSON.parse(fs.readFileSync(path.join(ROOT, "src/config/legacy-page-redirects.json"), "utf8"));
const postRedirects = Object.fromEntries(
  JSON.parse(fs.readFileSync(path.join(ROOT, "src/config/legacy-post-redirects.json"), "utf8")).map((r) => [r.source, r.destination]),
);

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

// src/ is scanned for uploads only: it also holds the canonical site URL and the redirect maps.
const contentFiles = walk(path.join(ROOT, "content")).filter((f) => /\.(ya?ml|md)$/.test(f));
const srcFiles = walk(path.join(ROOT, "src")).filter((f) => /\.(tsx?|ts)$/.test(f));

const isUpload = (p) => p?.startsWith("/wp-content/uploads/");

/** New route for an old WordPress page/post path, or null if there isn't one. */
function newRoute(p) {
  const clean = decodeURI(p.split(/[?#]/)[0]).replace(/\/+$/, "") || "/";
  if (clean === "/") return "/";
  return postRedirects[clean] ?? pageRedirects[clean] ?? null;
}

/* ─────────────── 1. Collect ─────────────── */

const uploads = new Set();
const unmapped = new Map();
for (const file of [...contentFiles, ...srcFiles]) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(URL_RE)) {
    const p = m[1];
    if (isUpload(p)) uploads.add(p.split(/[?#]/)[0]);
    else if (contentFiles.includes(file) && !/^\s*originalUrl:/m.test(text.slice(text.lastIndexOf("\n", m.index) + 1, m.index + 1)) && newRoute(p ?? "/") === null)
      unmapped.set(p, path.relative(ROOT, file));
  }
}
console.log(`Found ${uploads.size} uploaded files referenced from content/ and src/.`);

/* ─────────────── 2. Download ─────────────── */

async function download(p) {
  const dest = path.join(ROOT, "public", ...decodeURIComponent(p).split("/").filter(Boolean));
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return { p, status: "exists" };
  if (DRY_RUN) return { p, status: "would download" };
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(ORIGIN + p, { signal: AbortSignal.timeout(90_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get("content-type") ?? "";
      if (type.includes("text/html")) throw new Error(`got an HTML page instead of a file (${type})`);
      const body = Buffer.from(await res.arrayBuffer());
      const expected = Number(res.headers.get("content-length") ?? body.length);
      if (body.length !== expected) throw new Error(`size mismatch ${body.length} ≠ ${expected}`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, body);
      return { p, status: "downloaded", bytes: body.length };
    } catch (err) {
      if (attempt === 3) return { p, status: "failed", error: String(err.message ?? err) };
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

const queue = [...uploads];
const results = [];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const r = await download(queue.shift());
      results.push(r);
      if (r.status === "failed") console.log(`  ✗ ${r.p}: ${r.error}`);
    }
  }),
);
const failed = new Set(results.filter((r) => r.status === "failed").map((r) => r.p));
const bytes = results.reduce((n, r) => n + (r.bytes ?? 0), 0);
console.log(
  `Downloaded ${results.filter((r) => r.status === "downloaded").length} (${(bytes / 1048576).toFixed(1)} MB), ` +
    `already present ${results.filter((r) => r.status === "exists").length}, failed ${failed.size}.`,
);

/* ─────────────── 3–4. Rewrite links ─────────────── */

let changedFiles = 0;
let rewritten = 0;
for (const file of [...contentFiles, ...srcFiles]) {
  const isContent = contentFiles.includes(file);
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let changed = false;
  const out = lines.map((line) => {
    // Keep the record of where a migrated post came from.
    if (/^\s*originalUrl:/.test(line)) return line;
    return line.replace(URL_RE, (full, p) => {
      if (isUpload(p)) {
        const clean = p.split(/[?#]/)[0];
        if (failed.has(clean)) return full; // leave it pointing at WordPress so nothing breaks
        rewritten++;
        changed = true;
        return p;
      }
      if (!isContent) return full;
      const route = newRoute(p ?? "/");
      if (!route) return full;
      rewritten++;
      changed = true;
      return route;
    });
  });
  if (changed) {
    changedFiles++;
    if (!DRY_RUN) fs.writeFileSync(file, out.join("\n"));
  }
}
console.log(`${DRY_RUN ? "Would rewrite" : "Rewrote"} ${rewritten} links in ${changedFiles} files.`);

if (unmapped.size) {
  console.log(`\n${unmapped.size} link(s) to old WordPress pages have no new route and were left unchanged:`);
  for (const [p, file] of unmapped) console.log(`  ${p}  (${file})`);
}
if (failed.size) process.exitCode = 1;
