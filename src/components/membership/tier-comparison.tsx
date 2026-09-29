"use client";

import { useState } from "react";
import { Check, Download, Minus } from "lucide-react";
import type { MembershipTier } from "@/lib/content";
import { cn } from "@/lib/utils";

type TierId = MembershipTier["id"];
type Benefit = { label: string } & Record<TierId, boolean | string>;

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto size-5 text-brand-600" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto size-5 text-slate-300" aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-sm font-semibold text-brand-800">{value}</span>;
}

function Price({ tier, large = false }: { tier: MembershipTier; large?: boolean }) {
  if (!tier.price) {
    return (
      <p className={cn("font-semibold text-ink", large ? "text-lg" : "text-base")}>
        Contact us for dues
        {tier.priceNote && <span className="block text-sm font-normal text-slate-muted">{tier.priceNote}</span>}
      </p>
    );
  }
  return (
    <p>
      <span className={cn("font-heading font-bold text-brand-900", large ? "text-4xl" : "text-3xl")}>{tier.price}</span>
      {tier.priceNote && <span className="text-slate-muted"> {tier.priceNote}</span>}
    </p>
  );
}

function ApplyLink({ tier, className }: { tier: MembershipTier; className?: string }) {
  return (
    <a
      href={tier.applicationUrl}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold",
        tier.id === "full" ? "bg-brand-700 text-white hover:bg-brand-800" : "border border-brand-700 text-brand-700 hover:bg-brand-50",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      Application<span className="sr-only"> for {tier.name} (Word document)</span>
    </a>
  );
}

/**
 * Desktop: a full comparison table where hovering or focusing a column highlights it.
 * Mobile: a tier switcher showing one tier's benefits at a time.
 */
export function TierComparison({ tiers, benefits }: { tiers: MembershipTier[]; benefits: Benefit[] }) {
  const [active, setActive] = useState<TierId>("full");
  const current = tiers.find((t) => t.id === active)!;

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Membership tiers" className="grid grid-cols-3 rounded-xl bg-muted p-1 text-sm">
          {tiers.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="tier-panel"
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => {
                // Arrow keys move between tabs (WAI-ARIA tabs pattern).
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = tiers.findIndex((x) => x.id === active);
                const next = tiers[(i + (e.key === "ArrowRight" ? 1 : tiers.length - 1)) % tiers.length];
                setActive(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }}
              className={cn("rounded-lg px-2 py-2.5 font-semibold", active === t.id ? "bg-white text-brand-800 shadow-sm" : "text-slate-muted")}
            >
              {t.name.replace(" Membership", "")}
            </button>
          ))}
        </div>
        <div id="tier-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-4 rounded-2xl border border-border bg-white p-5">
          <h3 className="font-sans text-xl font-bold text-brand-900">{current.name}</h3>
          <p className="mt-1 text-sm text-slate-muted">{current.audience}</p>
          <div className="mt-4">
            <Price tier={current} large />
          </div>
          <ul className="mt-5 space-y-3">
            {benefits.map((b) => {
              const v = b[active];
              return (
                <li key={b.label} className={cn("flex items-start gap-3 text-sm", v === false && "text-slate-muted line-through decoration-slate-300")}>
                  {v === false ? (
                    <Minus className="mt-0.5 size-4 shrink-0 text-slate-300" aria-hidden />
                  ) : (
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                  )}
                  <span>
                    <span className="sr-only">{v === false ? "Not included: " : "Included: "}</span>
                    {b.label}
                    {typeof v === "string" && <span className="font-semibold text-brand-800"> — {v}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          <ApplyLink tier={current} className="mt-6 w-full" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Membership benefits by tier</caption>
          <colgroup>
            <col className="w-[34%]" />
            {tiers.map((t) => (
              <col key={t.id} className={cn("transition-colors", active === t.id && "bg-brand-50")} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-border align-top">
              <td className="p-6">
                <p className="text-sm text-slate-muted">
                  Hover or focus a membership to highlight it. Applications are Word documents — email the completed form to us.
                </p>
              </td>
              {tiers.map((t) => (
                <th
                  key={t.id}
                  scope="col"
                  className="p-6 font-normal"
                  onMouseEnter={() => setActive(t.id)}
                  onFocus={() => setActive(t.id)}
                >
                  {t.badge && (
                    <span className="mb-2 inline-block rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-semibold text-warm-800">{t.badge}</span>
                  )}
                  <span className="block font-sans text-lg font-bold text-brand-900">{t.name}</span>
                  <span className="mt-1 block min-h-10 text-sm text-slate-muted">{t.audience}</span>
                  <div className="mt-4 min-h-16">
                    <Price tier={t} />
                  </div>
                  <ApplyLink tier={t} className="mt-4 w-full" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {benefits.map((b) => (
              <tr key={b.label} className="border-b border-border last:border-0">
                <th scope="row" className="px-6 py-4 text-sm font-medium text-ink">
                  {b.label}
                </th>
                {tiers.map((t) => (
                  <td key={t.id} className="px-6 py-4 text-center" onMouseEnter={() => setActive(t.id)}>
                    <Cell value={b[t.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
