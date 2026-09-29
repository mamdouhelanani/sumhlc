import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPinned } from "lucide-react";
import { CrisisContacts } from "@/components/crisis/crisis-contacts";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/shared/section";
import { PhoneNumbers } from "@/components/shared/location-list";
import { bhLinkTriage, localCrisisServices } from "@/config/crisis";

export const metadata: Metadata = {
  title: "Get Help Now",
  description:
    "Mental health or substance use crisis in Rhode Island? Call or text 988, or call BH Link at (401) 414-5465, 24/7. If you are in immediate danger, call 911.",
};

export default function GetHelpPage() {
  return (
    <>
      <div className="border-b border-warm-200 bg-warm-50">
        <Container className="py-10 sm:py-14">
          <p className="text-sm font-bold tracking-wider text-warm-700 uppercase">You are not alone</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Get help now</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink">
            If you or someone you care about is struggling with mental health or substance use, free and confidential help is available
            right now — day or night.
          </p>
          <h2 className="mt-10 font-sans text-xl font-bold text-ink">Talk to someone now</h2>
          <CrisisContacts className="mt-4" />
        </Container>
      </div>

      <Section aria-labelledby="walk-in-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="walk-in-heading" title="Prefer to talk in person?" />
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-sans text-lg font-bold text-brand-900">
                <Building2 className="size-5 text-brand-600" aria-hidden />
                {bhLinkTriage.name}
              </h3>
              <p className="mt-2 text-ink">{bhLinkTriage.description}</p>
              <a href={bhLinkTriage.url} className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700 underline underline-offset-4">
                Location and hours on bhlink.org <span className="sr-only">(external site)</span>
              </a>
            </div>
          </div>
          <div>
            <SectionHeading id="local-heading" title="Local crisis stabilization" />
            <ul className="space-y-3">
              {localCrisisServices.map((s) => (
                <li key={s.name} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <p className="font-semibold text-ink">{s.name}</p>
                  {s.hours && <p className="text-sm text-slate-muted">{s.hours}</p>}
                  <p className="mt-1">
                    <PhoneNumbers phone={s.phone} label={s.name} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="tint" aria-labelledby="next-heading">
        <SectionHeading id="next-heading" title="When you're ready for the next step" />
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/resources/treatment", title: "Find treatment", body: "Outpatient care, medication for addiction treatment and more, by town." },
            { href: "/resources?category=support-groups", title: "Join a support group", body: "Peer-led groups for people in recovery and their families." },
            { href: "/resources/bed-availability", title: "Check open beds", body: "Live availability at residential and inpatient programs." },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 hover:ring-brand-500">
                <MapPinned className="size-6 text-brand-600" aria-hidden />
                <span className="mt-3 font-sans text-lg font-bold text-brand-900 group-hover:underline">{item.title}</span>
                <span className="mt-1 text-slate-muted">{item.body}</span>
                <ArrowRight className="mt-auto size-5 pt-1 text-brand-700" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
