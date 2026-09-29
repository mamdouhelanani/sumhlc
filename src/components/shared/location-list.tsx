import { MapPin, Phone } from "lucide-react";
import type { Location } from "@/lib/content";
import { telHref } from "@/lib/format";
import { cn } from "@/lib/utils";

export function formatAddress(loc: Location): string | null {
  const cityLine = [loc.city, [loc.state, loc.zip].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  return [loc.street, loc.city ? cityLine : null].filter(Boolean).join(", ") || null;
}

function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function PhoneNumbers({ phone, label }: { phone: string; label?: string }) {
  // Some listings hold two numbers ("401-294-6160 or 1-800-252-6465").
  const parts = phone.split(/\s+or\s+/i);
  return (
    <>
      {parts.map((p, i) => {
        const href = telHref(p);
        return (
          <span key={p}>
            {i > 0 && " or "}
            {href ? (
              <a href={href} className="inline-flex min-h-6 items-center font-semibold text-brand-700 underline-offset-4 hover:underline" aria-label={label ? `Call ${label} at ${p}` : undefined}>
                {p}
              </a>
            ) : (
              p
            )}
          </span>
        );
      })}
    </>
  );
}

export function LocationList({ locations, name, className }: { locations: Location[]; name: string; className?: string }) {
  return (
    <ul className={cn("divide-y divide-border", className)}>
      {locations.map((loc, i) => {
        const address = formatAddress(loc);
        return (
          <li key={`${loc.street}-${loc.phone}-${i}`} className="py-3 text-sm first:pt-0 last:pb-0">
            {loc.label && <p className="font-semibold text-ink">{loc.label}</p>}
            {address && (
              <p className="mt-1 flex gap-1.5 text-slate-muted">
                <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
                <a href={mapsUrl(address)} className="inline-flex min-h-6 items-center hover:text-brand-700 hover:underline">
                  {address}
                  <span className="sr-only"> (open in Google Maps)</span>
                </a>
              </p>
            )}
            {loc.phone && (
              <p className="mt-1 flex gap-1.5">
                <Phone className="mt-1 size-4 shrink-0 text-slate-muted" aria-hidden />
                <PhoneNumbers phone={loc.phone} label={`${name}${loc.label ? `, ${loc.label}` : ""}`} />
              </p>
            )}
            {loc.note && <p className="mt-0.5 text-slate-muted">{loc.note}</p>}
          </li>
        );
      })}
    </ul>
  );
}
