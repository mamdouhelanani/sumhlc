import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarClock, Users, Video } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { TrainingCard } from "@/components/trainings/training-card";
import { Button } from "@/components/ui/button";
import { getUpcomingTrainings, type Training } from "@/lib/content";

export const metadata: Metadata = {
  title: "TRAIN ED Training Schedule",
  description:
    "Live, accredited continuing education for licensed behavioral health professionals in Rhode Island. CEUs approved by NASW-RI, RICB, RIMHCA, NBCC and NAADAC.",
};

// Re-render hourly so past trainings drop off without a redeploy.
export const revalidate = 3600;

const accreditations = [
  { name: "National Association of Social Workers – RI Chapter", short: "NASW-RI" },
  { name: "RI Certification Board — Chemical Dependency", short: "RICB" },
  { name: "RI Mental Health Counselors Association", short: "RIMHCA" },
  { name: "National Board for Certified Counselors", short: "NBCC" },
  { name: "NAADAC Approved Education Provider #339978", short: "NAADAC" },
];

function monthKey(t: Training) {
  if (!t.date) return "Date to be announced";
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" }).format(new Date(`${t.date}T12:00:00-04:00`));
}

export default function TrainingsPage() {
  const trainings = getUpcomingTrainings();
  const byMonth = Map.groupBy(trainings, monthKey);

  return (
    <>
      <PageHeader
        eyebrow="TRAIN ED"
        title="Continuing education for the licensed professional"
        intro="Live, interactive trainings in substance use, mental health, ethics and behavioral health practice — led by expert trainers, online via Zoom."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#schedule">View the schedule</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/trainings/request">
              Request a group training <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </PageHeader>

      <section aria-label="Program highlights" className="border-b border-border bg-white">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: BadgeCheck, title: "Accredited CEUs", body: "Approved by five state and national boards." },
            { icon: Video, title: "Live on Zoom", body: "Interactive sessions you can join from anywhere." },
            { icon: Users, title: "Group discounts", body: "15% off private trainings for 20+ participants." },
          ].map(({ icon: Icon, ...h }) => (
            <li key={h.title} className="flex gap-3">
              <Icon className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block font-semibold text-ink">{h.title}</span>
                <span className="text-sm text-slate-muted">{h.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Section aria-labelledby="schedule-heading" id="schedule" className="scroll-mt-24">
        <SectionHeading
          id="schedule-heading"
          title="Training schedule"
          intro="All times are Eastern. Registration opens on Zoom; you'll receive the link and CE certificate details by email."
        />
        {trainings.length === 0 ? (
          <p className="text-slate-muted">New trainings are being scheduled. Please check back soon.</p>
        ) : (
          <div className="space-y-12">
            {[...byMonth].map(([month, items]) => (
              <section key={month} aria-labelledby={`m-${month}`}>
                <h3 id={`m-${month}`} className="mb-4 flex items-center gap-2 font-sans text-lg font-bold text-brand-800">
                  <CalendarClock className="size-5" aria-hidden /> {month}
                </h3>
                <ul className="grid gap-6 md:grid-cols-2">
                  {items.map((t) => (
                    <li key={t.slug} id={t.slug} className="scroll-mt-28">
                      <TrainingDetail training={t} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Section>

      <Section tone="tint" aria-labelledby="accreditation-heading">
        <SectionHeading id="accreditation-heading" title="Approved continuing education" intro="Credit hours vary by training and board; each listing shows its approvals." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {accreditations.map((a) => (
            <li key={a.short} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-100">
              <p className="font-heading text-2xl font-bold text-brand-700">{a.short}</p>
              <p className="mt-1 text-sm text-slate-muted">{a.name}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-muted">
          Need renewal requirements for your license?{" "}
          <Link href="/trainings/licensure" className="font-semibold text-brand-700 underline underline-offset-4">
            See licensure & CEU resources
          </Link>
          .
        </p>
      </Section>
    </>
  );
}

function TrainingDetail({ training }: { training: Training }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <TrainingCard training={training} headingLevel="h3" />
      {(training.description || training.credits.length > 0) && (
        <details className="group rounded-2xl border border-border bg-white px-5 py-4 text-sm">
          <summary className="cursor-pointer font-semibold text-brand-700 marker:text-brand-500">
            About this training<span className="sr-only">: {training.title}</span>
          </summary>
          {training.description && <p className="mt-3 whitespace-pre-line text-ink">{training.description}</p>}
          {training.credits.length > 0 && (
            <>
              <p className="mt-4 font-semibold text-ink">Continuing education</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-muted">
                {training.credits.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </details>
      )}
    </div>
  );
}
