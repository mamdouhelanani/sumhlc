"use client";

import Image from "next/image";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { Building2, ChevronDown, ExternalLink, Search } from "lucide-react";
import { LocationList } from "@/components/shared/location-list";
import type { Member } from "@/lib/content";
import { hostname } from "@/lib/format";
import { score } from "@/lib/search";
import { cn } from "@/lib/utils";

const tiers = [
  { id: "all", label: "All members" },
  { id: "full", label: "Full members" },
  { id: "associate", label: "Associate members" },
] as const;

export function MemberDirectory({ members }: { members: Member[] }) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState<(typeof tiers)[number]["id"]>("all");
  const query = useDeferredValue(q);
  const searchId = useId();

  const results = useMemo(
    () =>
      members
        .filter((m) => tier === "all" || m.tier === tier)
        .filter((m) => score(query, [{ text: m.name, weight: 3 }, { text: m.locations.map((l) => `${l.city ?? ""} ${l.label ?? ""}`).join(" "), weight: 1 }]) > 0),
    [members, query, tier],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" role="search">
        <div className="w-full md:max-w-sm">
          <label htmlFor={searchId} className="text-sm font-semibold text-ink">
            Search by name or town
          </label>
          <div className="relative mt-1.5">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-muted" aria-hidden />
            <input
              id={searchId}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-white pr-3 pl-10 text-base"
            />
          </div>
        </div>
        <fieldset>
          <legend className="sr-only">Membership type</legend>
          <div className="inline-flex rounded-xl bg-muted p-1 text-sm">
            {tiers.map((t) => (
              <label
                key={t.id}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500",
                  tier === t.id ? "bg-white text-brand-800 shadow-sm" : "text-slate-muted hover:text-ink",
                )}
              >
                <input type="radio" name="tier" value={t.id} checked={tier === t.id} onChange={() => setTier(t.id)} className="sr-only" />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p aria-live="polite" className="mt-6 mb-4 text-sm text-slate-muted">
        Showing <strong className="text-ink">{results.length}</strong> of {members.length} member organizations
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((m) => (
          <li key={m.id}>
            <MemberCard member={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const primary = member.locations[0];
  const rest = member.locations.slice(1);
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex h-16 items-center">
        {member.logo ? (
          <div className="relative h-14 w-40">
            <Image
              src={member.logo}
              alt=""
              fill
              sizes="160px"
              className="object-contain object-left"
              unoptimized={member.logo.endsWith(".svg")}
            />
          </div>
        ) : (
          <span className="grid size-14 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Building2 className="size-6" aria-hidden />
          </span>
        )}
      </div>
      <h2 className="mt-3 font-sans text-base leading-snug font-bold text-brand-900">{member.name}</h2>
      <p className="mt-1 text-xs font-semibold tracking-wide text-slate-muted uppercase">{member.tier === "full" ? "Full member" : "Associate member"}</p>
      {primary && <LocationList locations={[primary]} name={member.name} className="mt-3 mb-2" />}
      {rest.length > 0 && (
        <details className="group mb-4 text-sm">
          <summary className="flex min-h-8 cursor-pointer list-none items-center gap-1 rounded font-semibold text-brand-700 hover:underline [&::-webkit-details-marker]:hidden">
            {rest.length} more {rest.length === 1 ? "location" : "locations"}
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <LocationList locations={rest} name={member.name} className="mt-3" />
        </details>
      )}
      {member.website && (
        <a href={member.website} className="mt-auto inline-flex min-h-6 items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:underline">
          {hostname(member.website)} <ExternalLink className="size-3.5" aria-hidden />
          <span className="sr-only">(external site)</span>
        </a>
      )}
    </article>
  );
}
