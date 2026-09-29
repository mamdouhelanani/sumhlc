import { ExternalLink, MessageSquareText, Phone } from "lucide-react";
import { crisisLines, emergency } from "@/config/crisis";
import { cn } from "@/lib/utils";

/** Full list of crisis lines as tap-to-call cards. Used on /get-help and the home hero. */
export function CrisisContacts({ compact = false, className }: { compact?: boolean; className?: string }) {
  const lines = compact ? crisisLines.slice(0, 2) : crisisLines;
  return (
    <ul className={cn("grid gap-4", !compact && "md:grid-cols-3", className)}>
      {lines.map((line) => (
        <li key={line.id} className="flex flex-col rounded-xl border border-warm-200 bg-white p-5 shadow-sm">
          <h3 className="font-sans text-base font-bold text-ink">{line.name}</h3>
          <p className="mt-0.5 text-sm text-slate-muted">{line.availability}</p>
          {!compact && <p className="mt-3 text-sm text-ink">{line.description}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {line.tel && (
              <a
                href={`tel:${line.tel}`}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-warm-700 px-4 font-semibold text-white hover:bg-warm-800"
                aria-label={`Call ${line.name} at ${line.display}`}
              >
                <Phone className="size-4" aria-hidden />
                {line.display}
              </a>
            )}
            {line.sms && (
              <a
                href={`sms:${line.sms}`}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-warm-700 px-4 font-semibold text-warm-700 hover:bg-warm-50"
                aria-label={`Text ${line.name} at ${line.sms}`}
              >
                <MessageSquareText className="size-4" aria-hidden />
                Text
              </a>
            )}
          </div>
          {!compact && line.url && (
            <a
              href={line.url}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 underline underline-offset-4"
            >
              Visit website
              <ExternalLink className="size-3.5" aria-hidden />
              <span className="sr-only">(opens external site)</span>
            </a>
          )}
        </li>
      ))}
      {!compact && (
        <li className="rounded-xl bg-warm-50 p-5 md:col-span-3">
          <p className="text-ink">
            <strong>If you or someone else is in immediate danger, call{" "}
            <a href={`tel:${emergency.tel}`} className="text-warm-700 underline underline-offset-4">
              {emergency.display}
            </a>
            </strong>{" "}
            or go to the nearest emergency room.
          </p>
        </li>
      )}
    </ul>
  );
}
