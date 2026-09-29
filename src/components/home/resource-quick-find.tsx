import Link from "next/link";
import { Search } from "lucide-react";
import { Section } from "@/components/shared/section";

const shortcuts = [
  { label: "Crisis support", href: "/get-help" },
  { label: "Find treatment", href: "/resources/treatment" },
  { label: "Open beds", href: "/resources/bed-availability" },
  { label: "Support groups", href: "/resources?category=support-groups" },
  { label: "Older adults & memory care", href: "/resources?category=older-adults" },
  { label: "Health insurance", href: "/resources?category=insurance" },
  { label: "Self-screening", href: "/resources/self-help" },
];

/** A plain GET form — works without JavaScript and hands off to the full directory. */
export function ResourceQuickFind() {
  return (
    <Section aria-labelledby="find-heading" className="py-12 sm:py-16">
      <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-10">
        <h2 id="find-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Find resources and support
        </h2>
        <p className="mt-2 text-slate-muted">Search guides, support groups, treatment options and handouts from across Rhode Island.</p>
        <form action="/resources" method="get" role="search" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="quick-find" className="sr-only">
            Search resources
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-muted" aria-hidden />
            <input
              id="quick-find"
              name="q"
              type="search"
              placeholder="Try “support group”, “Medicaid” or “memory care”"
              className="h-13 w-full rounded-xl border border-input bg-white pr-4 pl-12 text-base text-ink placeholder:text-slate-muted focus-visible:border-brand-500"
            />
          </div>
          <button type="submit" className="h-13 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">
            Search
          </button>
        </form>
        <nav aria-label="Popular topics" className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex h-10 items-center rounded-full border border-brand-200 bg-white px-4 text-sm font-medium text-brand-800 hover:border-brand-500 hover:bg-brand-100"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
