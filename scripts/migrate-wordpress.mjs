// One-off migration: pulls News + Blog posts from the legacy WordPress REST API
// and writes them to content/news/*.md, plus a redirect map for the old URLs.
//
// Usage: node scripts/migrate-wordpress.mjs
// Re-running overwrites migrated files (hand-edited posts should drop `wpId`).

import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import YAML from "yaml";

const API = "https://sumhlc.org/wp-json/wp/v2";
const NEWS = 7;
const BLOG = 17;
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "content", "news");
const REDIRECTS = path.join(ROOT, "src", "config", "legacy-post-redirects.json");

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}/posts?per_page=100&page=${page}&_embed=wp:featuredmedia,author`);
    if (res.status === 400) break; // past the last page
    if (!res.ok) throw new Error(`WordPress API ${res.status} on page ${page}`);
    const batch = await res.json();
    posts.push(...batch);
    if (batch.length < 100) break;
  }
  return posts;
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };
function decode(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}
const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const TRAILING_FILLER = new Set(["a", "an", "and", "at", "by", "for", "in", "of", "on", "the", "to", "with"]);
const slugify = (text) => text.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function shortSlug(post, title, taken) {
  // Some WordPress slugs are auto-generated junk ("elementor-1122", a pasted URL).
  const source = /^(elementor-\d+|https?-)/.test(post.slug) ? slugify(title) : post.slug;
  const words = source.split("-").filter(Boolean).slice(0, 7);
  while (words.length > 2 && (TRAILING_FILLER.has(words.at(-1)) || /^\d{1,2}$/.test(words.at(-1)))) words.pop();
  let base = words.join("-");
  let candidate = base;
  for (let i = 2; taken.has(candidate); i++) candidate = `${base}-${i}`;
  taken.add(candidate);
  return candidate;
}

function excerptOf(post, title) {
  let text = stripTags(post.excerpt?.rendered ?? "");
  if (text.toLowerCase().startsWith(title.toLowerCase())) text = text.slice(title.length).trim();
  text = text.replace(/\s*\[…\]\s*$/, "").replace(/\s*…\s*$/, "");
  if (text.length <= 220) return text;
  return text.slice(0, 220).replace(/\s+\S*$/, "") + "…";
}

function makeTurndown() {
  const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });

  // Elementor gallery: <a class="e-gallery-item" href="full.jpg"><div data-thumbnail=…>
  td.addRule("elementorGallery", {
    filter: (node) => node.nodeName === "A" && /\be-gallery-item\b/.test(node.getAttribute("class") ?? ""),
    replacement: (_content, node) => `\n\n![](${node.getAttribute("href")})\n\n`,
  });
  // Elementor video widget stores its URL in data-settings JSON.
  td.addRule("elementorVideo", {
    filter: (node) => node.nodeName === "DIV" && /\belementor-widget-video\b/.test(node.getAttribute("class") ?? ""),
    replacement: (_content, node) => {
      try {
        const settings = JSON.parse(decode(node.getAttribute("data-settings") ?? "{}"));
        const url = settings.youtube_url || settings.vimeo_url || settings.external_url;
        return url ? `\n\n[Watch the video](${url})\n\n` : "";
      } catch {
        return "";
      }
    },
  });
  td.addRule("iframe", {
    filter: "iframe",
    replacement: (_content, node) => {
      const src = node.getAttribute("src");
      return src ? `\n\n[Watch the video](${src.replace(/^\/\//, "https://")})\n\n` : "";
    },
  });
  // Lazy-loaded images keep the real source in data-src.
  td.addRule("img", {
    filter: "img",
    replacement: (_content, node) => {
      const src = node.getAttribute("data-src") || node.getAttribute("src");
      if (!src || src.startsWith("data:")) return "";
      const alt = (node.getAttribute("alt") ?? "").replace(/[[\]]/g, "");
      return `![${alt}](${src})`;
    },
  });
  td.remove(["script", "style", "noscript", "svg"]);
  return td;
}

function toMarkdown(td, post, title) {
  let md = td.turndown(post.content.rendered);
  md = md
    .replace(/ /g, " ")
    .replace(/(?<!!)\[\s*\]\([^)]*\)/g, "") // empty links (but not images)
    .replace(/^\s*\*\*\s*\*\*\s*$/gm, "") // empty bold
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  // Elementor "More Blogs" / related-posts widgets were embedded in the content.
  md = md.replace(/\n#{2,6}\s*More (Blogs|News|Posts)[\s\S]*$/i, "").trim();
  // Author card duplicated above the "By:" line on blog posts.
  if (/^#{2,6}\s*Author\b/.test(md) && md.includes("\nBy:")) md = md.slice(md.indexOf("\nBy:") + 1);
  // Drop an opening line that just repeats the title.
  const lines = md.split("\n");
  const first = lines[0]?.replace(/^#+\s*|\*\*/g, "").trim().toLowerCase();
  if (first && first === title.toLowerCase()) md = lines.slice(1).join("\n").trim();
  return md;
}

async function main() {
  const posts = (await fetchAllPosts()).filter((p) => p.categories.includes(NEWS) || p.categories.includes(BLOG));
  posts.sort((a, b) => b.date.localeCompare(a.date));

  await fs.mkdir(OUT_DIR, { recursive: true });
  const td = makeTurndown();
  const taken = new Set();
  const redirects = [];

  for (const post of posts) {
    const title = decode(post.title.rendered).trim();
    const slug = shortSlug(post, title, taken);
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const frontmatter = {
      title,
      date: post.date.slice(0, 10),
      author: post._embedded?.author?.[0]?.name ?? "SUMHLC",
      category: post.categories.includes(BLOG) ? "Perspectives" : "News",
      excerpt: excerptOf(post, title) || null,
      image: media?.source_url ?? null,
      imageAlt: media?.alt_text || null,
      originalUrl: post.link,
      wpId: post.id,
    };
    const body = toMarkdown(td, post, title);
    const file = `---\n${YAML.stringify(frontmatter, { lineWidth: 0 })}---\n\n${body}\n`;
    await fs.writeFile(path.join(OUT_DIR, `${slug}.md`), file, "utf8");

    const oldPath = new URL(post.link).pathname.replace(/\/$/, "");
    redirects.push({ source: oldPath, destination: `/news/${slug}` });
  }

  await fs.writeFile(REDIRECTS, JSON.stringify(redirects, null, 2) + "\n", "utf8");
  console.log(`Wrote ${posts.length} posts to content/news and ${redirects.length} redirects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
