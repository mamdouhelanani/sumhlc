"use client";

import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Resource } from "@/lib/content";
import { type Audience, type ResourceCategory, audiences, resourceCategories } from "@/lib/content-labels";
import { score } from "@/lib/search";
import { cn } from "@/lib/utils";
import { ResourceCard } from "./resource-card";

type Filters = { q: string; category: ResourceCategory | "all"; audience: Audience | "all" };

const isCategory = (v: string | null): v is ResourceCategory => !!v && v in resourceCategories;
const isAudience = (v: string | null): v is Audience => !!v && v in audiences;

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [filters, setFilters] = useState<Filters>({ q: "", category: "all", audience: "all" });
  const [urlLoaded, setUrlLoaded] = useState(false);
  const query = useDeferredValue(filters.q);
  const searchId = useId();

  // The page is prerendered with no filters; apply any from the URL (e.g. the
  // home page search box) once mounted, so there is no Suspense fallback or layout shift.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const audience = params.get("audience");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    setFilters({
      q: params.get("q") ?? "",
      category: isCategory(category) ? category : "all",
      audience: isAudience(audience) ? audience : "all",
    });
    setUrlLoaded(true);
  }, []);

  // Keep the URL shareable without triggering a navigation.
  useEffect(() => {
    if (!urlLoaded) return;
    const next = new URLSearchParams();
    if (filters.q) next.set("q", filters.q);
    if (filters.category !== "all") next.set("category", filters.category);
    if (filters.audience !== "all") next.set("audience", filters.audience);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [filters, urlLoaded]);

  const results = useMemo(() => {
    return resources
      .filter((r) => filters.category === "all" || r.category === filters.category)
      .filter((r) => filters.audience === "all" || r.audience.includes(filters.audience as Audience))
      .map((r) => ({
        r,
        s: score(query, [
          { text: r.title, weight: 3 },
          { text: r.tags.join(" "), weight: 2 },
          { text: `${r.description} ${r.source ?? ""} ${resourceCategories[r.category]}`, weight: 1 },
        ]),
      }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.r);
  }, [resources, query, filters.category, filters.audience]);

  const grouped = !query && filters.category === "all";
  const counts = useMemo(() => {
    const c: Partial<Record<ResourceCategory, number>> = {};
    for (const r of resources) {
      if (filters.audience === "all" || r.audience.includes(filters.audience as Audience)) c[r.category] = (c[r.category] ?? 0) + 1;
    }
    return c;
  }, [resources, filters.audience]);

  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const hasFilters = filters.q || filters.category !== "all" || filters.audience !== "all";

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div role="search">
          <label htmlFor={searchId} className="text-sm font-semibold text-ink">
            Search resources
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-muted" aria-hidden />
            <input
              id={searchId}
              type="search"
              value={filters.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="e.g. Medicaid, AA, dementia"
              className="h-12 w-full rounded-xl border border-input bg-white pr-3 pl-10 text-base placeholder:text-slate-muted"
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-ink">Who is this for?</legend>
          <div className="mt-2 grid grid-cols-3 rounded-xl bg-muted p-1 text-sm lg:grid-cols-1">
            {(["all", "individuals", "professionals"] as const).map((a) => (
              <label
                key={a}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 text-center font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 lg:text-left",
                  filters.audience === a ? "bg-white text-brand-800 shadow-sm" : "text-slate-muted hover:text-ink",
                )}
              >
                <input type="radio" name="audience" value={a} checked={filters.audience === a} onChange={() => set({ audience: a })} className="sr-only" />
                {a === "all" ? "Everyone" : audiences[a]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-ink">Topic</legend>
          <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {(["all", ...Object.keys(resourceCategories)] as (ResourceCategory | "all")[]).map((c) => {
              const count = c === "all" ? undefined : (counts[c] ?? 0);
              if (count === 0) return null;
              return (
                <label
                  key={c}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 lg:rounded-lg lg:border-transparent",
                    filters.category === c ? "border-brand-700 bg-brand-700 text-white" : "border-border bg-white text-ink hover:bg-brand-50",
                  )}
                >
                  <input type="radio" name="category" value={c} checked={filters.category === c} onChange={() => set({ category: c })} className="sr-only" />
                  <span>{c === "all" ? "All topics" : resourceCategories[c]}</span>
                  {count !== undefined && <span className={cn("text-xs", filters.category === c ? "text-brand-100" : "text-slate-muted")}>{count}</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-slate-muted">
            <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "resource" : "resources"}
            {query && (
              <>
                {" "}
                matching “<span className="text-ink">{query}</span>”
              </>
            )}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => setFilters({ q: "", category: "all", audience: "all" })}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              <X className="size-4" aria-hidden /> Clear filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-semibold text-ink">No resources match your search.</p>
            <p className="mt-1 text-sm text-slate-muted">
              Try a different word, or call BH Link at <a href="tel:+14014145465" className="font-semibold text-brand-700 underline">(401) 414-5465</a> —
              they can help you find the right service 24/7.
            </p>
          </div>
        ) : grouped ? (
          <ResourceGroups resources={results} />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {results.map((r) => (
              <li key={r.id}>
                <ResourceCard resource={r} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Server-renderable grouped list; also the no-JavaScript fallback. */
export function ResourceGroups({ resources }: { resources: Resource[] }) {
  const categories = Object.keys(resourceCategories) as ResourceCategory[];
  return (
    <div className="space-y-12">
      {categories.map((c) => {
        const items = resources.filter((r) => r.category === c);
        if (items.length === 0) return null;
        return (
          <section key={c} aria-labelledby={`cat-${c}`}>
            <h2 id={`cat-${c}`} className="mb-4 text-2xl font-bold">
              {resourceCategories[c]}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {items.map((r) => (
                <li key={r.id}>
                  <ResourceCard resource={r} showCategory={false} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
