import "server-only";
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import YAML from "yaml";
import { z } from "zod";
import { urlOrPath } from "./content";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

const frontmatter = z.strictObject({
  title: z.string(),
  date: z.iso.date(),
  author: z.string().default("SUMHLC"),
  category: z.enum(["News", "Perspectives"]),
  excerpt: z.string().nullish().transform((v) => v ?? null),
  image: urlOrPath.nullish().transform((v) => v ?? null),
  imageAlt: z.string().nullish().transform((v) => v ?? null),
  originalUrl: z.url().nullish(),
  wpId: z.number().nullish(),
});

export type Post = z.output<typeof frontmatter> & { slug: string; body: string };

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`content/news/${file} is missing its --- frontmatter --- block`);
  const result = frontmatter.safeParse(YAML.parse(match[1]));
  if (!result.success) throw new Error(`Invalid frontmatter in content/news/${file}:\n${z.prettifyError(result.error)}`);
  return { ...result.data, slug: file.replace(/\.md$/, ""), body: match[2].trim() };
}

let cache: Post[] | undefined;

export function getPosts(): Post[] {
  cache ??= fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

const marked = new Marked({
  gfm: true,
  renderer: {
    image({ href, title, text }) {
      const alt = text.replace(/"/g, "&quot;");
      return `<img src="${href}" alt="${alt}"${title ? ` title="${title}"` : ""} loading="lazy" decoding="async">`;
    },
    // Shift headings down one level: the page itself owns the only <h1>.
    heading({ tokens, depth }) {
      const level = Math.min(depth + 1, 6);
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
    },
  },
});

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
