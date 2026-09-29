"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { LocationList } from "@/components/shared/location-list";
import type { Provider } from "@/lib/content";
import { type Service, serviceLabels } from "@/lib/content-labels";
import { score } from "@/lib/search";
import { hostname } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProviderLocator({ providers }: { providers: Provider[] }) {
  const [q, setQ] = useState("");
  const [service, setService] = useState<Service | "all">("all");
  const [town, setTown] = useState("all");
  const query = useDeferredValue(q);
  const ids = { search: useId(), service: useId(), town: useId() };

  const towns = useMemo(
    () => [...new Set(providers.flatMap((p) => p.locations.map((l) => l.city).filter((c): c is string => !!c)))].sort(),
    [providers],
  );
  const services = useMemo(() => (Object.keys(serviceLabels) as Service[]).filter((s) => providers.some((p) => p.services.includes(s))), [providers]);

  const results = useMemo(
    () =>
      providers
        .filter((p) => service === "all" || p.services.includes(service))
        .map((p) => ({
          ...p,
          // When a town is chosen, show only that town's sites.
          locations: town === "all" ? p.locations : p.locations.filter((l) => l.city === town),
        }))
        .filter((p) => p.locations.length > 0)
        .filter((p) =>
          score(query, [
            { text: p.name, weight: 3 },
            { text: p.services.map((s) => serviceLabels[s]).join(" "), weight: 2 },
            { text: `${p.summary ?? ""} ${p.locations.map((l) => `${l.label ?? ""} ${l.city ?? ""}`).join(" ")}`, weight: 1 },
          ]) > 0,
        ),
    [providers, query, service, town],
  );

  const clear = () => {
    setQ("");
    setService("all");
    setTown("all");
  };
  const selectClass = "h-12 w-full rounded-xl border border-input bg-white px-3 text-base text-ink";

  return (
    <div>
      <div className="grid gap-4 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100 md:grid-cols-[1.4fr_1.2fr_1fr]" role="search">
        <div>
          <label htmlFor={ids.search} className="text-sm font-semibold text-ink">
            Provider name or keyword
          </label>
          <div className="relative mt-1.5">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-muted" aria-hidden />
            <input
              id={ids.search}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. CODAC, Suboxone"
              className={cn(selectClass, "pl-10")}
            />
          </div>
        </div>
        <div>
          <label htmlFor={ids.service} className="text-sm font-semibold text-ink">
            Service
          </label>
          <select id={ids.service} value={service} onChange={(e) => setService(e.target.value as Service | "all")} className={cn(selectClass, "mt-1.5")}>
            <option value="all">All services</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {serviceLabels[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={ids.town} className="text-sm font-semibold text-ink">
            Town
          </label>
          <select id={ids.town} value={town} onChange={(e) => setTown(e.target.value)} className={cn(selectClass, "mt-1.5")}>
            <option value="all">All towns</option>
            {towns.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 mb-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-slate-muted">
          <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "provider" : "providers"} found
        </p>
        {(q || service !== "all" || town !== "all") && (
          <button type="button" onClick={clear} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-brand-700 hover:bg-brand-50">
            <X className="size-4" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-semibold text-ink">No providers match those filters.</p>
          <p className="mt-1 text-sm text-slate-muted">
            Try another town or service, or check the{" "}
            <a href="https://bhddh.ri.gov/substance-useaddiction" className="font-semibold text-brand-700 underline">
              state&apos;s full list of licensed providers
            </a>
            .
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 lg:grid-cols-2">
          {results.map((p) => (
            <li key={p.id}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-sans text-lg leading-snug font-bold text-brand-900">{p.name}</h2>
                  {p.member && <span className="rounded-full bg-warm-100 px-2.5 py-1 text-xs font-semibold text-warm-800">SUMHLC member</span>}
                </div>
                {p.summary && <p className="mt-1 text-sm text-slate-muted">{p.summary}</p>}
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Services">
                  {p.services.map((s) => (
                    <li key={s} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
                      {serviceLabels[s]}
                    </li>
                  ))}
                </ul>
                <LocationList locations={p.locations} name={p.name} className="mt-4 mb-4" />
                {p.website && (
                  <a href={p.website} className="mt-auto inline-flex min-h-6 items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline">
                    {hostname(p.website)} <ExternalLink className="size-3.5" aria-hidden />
                    <span className="sr-only">(external site)</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
