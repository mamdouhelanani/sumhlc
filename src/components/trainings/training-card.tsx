import { CalendarClock, ExternalLink, UserRound, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Training } from "@/lib/content";
import { dateParts, formatDate, formatTimeRange, formatWeekday } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TrainingDate({ date, className }: { date: string | null; className?: string }) {
  if (!date) {
    return (
      <div className={cn("flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-sand-100 text-center text-xs font-bold text-slate-muted", className)}>
        Date
        <br />
        TBA
      </div>
    );
  }
  const { month, day } = dateParts(date);
  return (
    <div
      className={cn("flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-900 text-white", className)}
      aria-hidden
    >
      <span className="text-xs font-bold tracking-wider uppercase">{month}</span>
      <span className="font-heading text-2xl leading-none font-bold">{day}</span>
    </div>
  );
}

export function TrainingCard({ training, headingLevel: Heading = "h3" }: { training: Training; headingLevel?: "h2" | "h3" }) {
  const time = formatTimeRange(training.startTime, training.endTime);
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <TrainingDate date={training.date} />
        <div className="min-w-0">
          <Heading className="font-sans text-lg leading-snug font-bold text-brand-900">{training.title}</Heading>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-muted">
            <CalendarClock className="size-4 shrink-0" aria-hidden />
            {training.date ? (
              <span>
                {formatWeekday(training.date)}, {formatDate(training.date)}
                {time && ` · ${time}`}
              </span>
            ) : (
              <span>{training.note ?? "Date to be announced"}</span>
            )}
          </p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-ink">
        {training.trainer && (
          <li className="flex items-center gap-2">
            <UserRound className="size-4 shrink-0 text-slate-muted" aria-hidden />
            {training.trainer}
          </li>
        )}
        <li className="flex items-center gap-2">
          <Video className="size-4 shrink-0 text-slate-muted" aria-hidden />
          {training.format === "virtual" ? "Live online via Zoom" : training.location}
        </li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {training.ceus && <Badge className="bg-brand-100 text-brand-800">{training.ceus.toFixed(1)} CEUs</Badge>}
        {training.date && training.note && <Badge className="bg-warm-100 text-warm-800">{training.note.replace(/--/g, " — ").toLowerCase().replace(/^./, (c) => c.toUpperCase())}</Badge>}
        {training.price && <Badge className="bg-sand-100 text-ink">{training.price}</Badge>}
      </div>
      <div className="mt-auto pt-5">
        {training.registerUrl ? (
          <a
            href={training.registerUrl}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Register<span className="sr-only"> for {training.title} (opens registration site)</span>
            <ExternalLink className="size-4" aria-hidden />
          </a>
        ) : (
          <p className="text-sm font-medium text-slate-muted">Registration opens soon</p>
        )}
      </div>
    </article>
  );
}
