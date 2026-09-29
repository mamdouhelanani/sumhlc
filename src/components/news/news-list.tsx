"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/news";
import { cn } from "@/lib/utils";
import { NewsCard } from "./news-card";

const PAGE_SIZE = 12;
const categories = [
  { id: "All", label: "All" },
  { id: "News", label: "News" },
  { id: "Perspectives", label: "Op-eds & perspectives" },
] as const;
type CategoryId = (typeof categories)[number]["id"];

export type PostSummary = Omit<Post, "body">;

export function NewsList({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState<CategoryId>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const firstNewRef = useRef<HTMLLIElement>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  // Honour ?category= links (e.g. from the home page) after hydration.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (c === "News" || c === "Perspectives") setCategory(c);
  }, []);

  useEffect(() => {
    if (focusIndex !== null) firstNewRef.current?.querySelector("a")?.focus();
  }, [focusIndex]);

  const filtered = posts.filter((p) => category === "All" || p.category === category);
  const shown = filtered.slice(0, visible);

  const choose = (c: CategoryId) => {
    setCategory(c);
    setVisible(PAGE_SIZE);
    setFocusIndex(null);
    window.history.replaceState(null, "", c === "All" ? window.location.pathname : `?category=${c}`);
  };

  return (
    <div>
      <div role="group" aria-label="Filter news" className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => choose(c.id)}
            className={cn(
              "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium",
              category === c.id ? "border-brand-700 bg-brand-700 text-white" : "border-border bg-white text-ink hover:bg-brand-50",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {shown.length} of {filtered.length} posts
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, i) => (
          <li key={post.slug} ref={i === focusIndex ? firstNewRef : undefined}>
            <NewsCard post={post} headingLevel="h2" priority={i === 0} />
          </li>
        ))}
      </ul>
      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setFocusIndex(visible);
              setVisible((v) => v + PAGE_SIZE);
            }}
            className="inline-flex h-12 items-center rounded-lg border border-brand-700 px-6 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Show more posts
            <span className="ml-1 text-slate-muted">({filtered.length - visible} more)</span>
          </button>
        </div>
      )}
    </div>
  );
}
