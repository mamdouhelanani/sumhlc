import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { TrainingDate } from "@/components/trainings/training-card";
import { type CommunityEvent, getEvents, todayInRI } from "@/lib/content";
import { formatDate, formatWeekday } from "@/lib/format";

export const metadata: Metadata = {
  title: "Community Events",
  description: "Upcoming behavioral health conferences, recovery rallies and community events in Rhode Island and New England.",
};

export const revalidate = 3600;

export default function EventsPage() {
  const today = todayInRI();
  const events = getEvents();
  const upcoming = events.filter((e) => e.date === null || e.date >= today);
  const past = events.filter((e) => e.date !== null && e.date < today).reverse();

  return (
    <>
      <PageHeader
        eyebrow="Events & Trainings"
        title="Community & national events"
        intro={
          <>
            Conferences, rallies and gatherings where SUMHLC and our members connect. Looking for CE credits?{" "}
            <Link href="/trainings" className="font-semibold text-brand-700 underline underline-offset-4">
              See the TRAIN ED schedule
            </Link>
            .
          </>
        }
      />
      <Container className="space-y-14 py-12 sm:py-16">
        <section aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="mb-6 text-3xl font-bold tracking-tight">
            Upcoming
          </h2>
          {upcoming.length ? (
            <ul className="space-y-4">
              {upcoming.map((e) => (
                <li key={e.title}>
                  <EventRow event={e} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-muted">No upcoming events are listed right now.</p>
          )}
        </section>
        {past.length > 0 && (
          <section aria-labelledby="past-heading">
            <h2 id="past-heading" className="mb-6 text-2xl font-bold">
              Recent events
            </h2>
            <ul className="space-y-4 opacity-90">
              {past.map((e) => (
                <li key={e.title}>
                  <EventRow event={e} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}

function EventRow({ event }: { event: CommunityEvent }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-start">
      <TrainingDate date={event.date} />
      <div className="flex-1">
        <h3 className="font-sans text-xl font-bold text-brand-900">{event.title}</h3>
        <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-muted">
          <li className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            {event.date ? `${formatWeekday(event.date)}, ${formatDate(event.date)}` : event.dateNote}
            {event.time && ` · ${event.time}`}
          </li>
          {event.venue && (
            <li className="flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden />
              {event.venue}
            </li>
          )}
        </ul>
        <p className="mt-3 text-ink">{event.description}</p>
        {event.organizer && <p className="mt-2 text-sm text-slate-muted">Presented by {event.organizer}</p>}
      </div>
      {event.url && (
        <a href={event.url} className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-lg border border-brand-700 px-4 text-sm font-semibold text-brand-700 hover:bg-brand-50">
          Event details <ExternalLink className="size-4" aria-hidden />
          <span className="sr-only">for {event.title} (external site)</span>
        </a>
      )}
    </article>
  );
}
