import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Landmark, Network, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { DonationCta } from "@/components/shared/donation-cta";
import { Section, SectionHeading } from "@/components/shared/section";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Substance Use and Mental Health Leadership Council of RI promotes a collaborative, coordinated system of community-based mental health and substance use prevention and treatment.",
};

const provide = [
  { icon: Landmark, title: "Mental health leadership", body: "A united voice for community-based providers with state agencies, legislators and partners." },
  { icon: Network, title: "Substance use prevention advocacy", body: "Pushing for prevention, fair provider rates and policies that keep treatment within reach." },
  { icon: GraduationCap, title: "Collaboration and training", body: "Roundtables for members and accredited continuing education through TRAIN ED." },
];

const more = [
  { href: "/about-us/staff", icon: Users, title: "Staff & leadership", body: "Meet the team and find the right person to contact." },
  { href: "/membership/directory", icon: Network, title: "Member organizations", body: "The providers and partners that make up our network." },
  { href: "/about-us/recovery-friendly-workplace", icon: Award, title: "Recovery Friendly Workplace", body: "Our designation under Rhode Island's RFW initiative." },
];

export default function AboutPage() {
  const memberCount = getMembers().length;
  return (
    <>
      <PageHeader eyebrow="About SUMHLC" title="A collaborative voice for behavioral health in Rhode Island" />

      <Section aria-labelledby="mission-heading">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="mission-heading" className="text-3xl font-bold tracking-tight">
              Our mission
            </h2>
            <blockquote className="mt-5 border-l-4 border-warm-600 pl-5 text-xl leading-relaxed font-medium text-brand-900 sm:text-2xl">
              The mission of the Substance Use and Mental Health Leadership Council of RI is to promote a collaborative, coordinated system of
              high quality, comprehensive community-based mental health and substance use prevention and treatment services.
            </blockquote>
            <p className="mt-6 text-lg text-slate-muted">
              We are driven by the needs of the clients and communities our members serve, and accomplish our mission through
              collaboration, advocacy, and training.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-start">
            {[
              { value: String(memberCount), label: "member organizations" },
              { value: "30+", label: "years delivering continuing education" },
              { value: "1,500", label: "professionals trained each year" },
              { value: "24/7", label: "crisis help via BH Link and 988" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-brand-50 p-5">
                <dt className="mt-1 text-sm text-slate-muted">{s.label}</dt>
                <dd className="font-heading text-3xl font-bold text-brand-700">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="sand" aria-labelledby="provide-heading">
        <SectionHeading id="provide-heading" eyebrow="What we provide" title="Leadership, advocacy and training" />
        <ul className="grid gap-6 md:grid-cols-3">
          {provide.map(({ icon: Icon, ...p }) => (
            <li key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-100">
              <Icon className="size-7 text-brand-600" aria-hidden />
              <h3 className="mt-4 font-sans text-lg font-bold text-brand-900">{p.title}</h3>
              <p className="mt-2 text-slate-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="more-heading">
        <SectionHeading id="more-heading" title="Get to know us better" />
        <ul className="grid gap-4 md:grid-cols-3">
          {more.map(({ icon: Icon, ...m }) => (
            <li key={m.href}>
              <Link href={m.href} className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-brand-500">
                <Icon className="mt-1 size-6 shrink-0 text-brand-600" aria-hidden />
                <span>
                  <span className="flex items-center gap-1 font-sans text-lg font-bold text-brand-900 group-hover:underline">
                    {m.title} <ArrowRight className="size-4" aria-hidden />
                  </span>
                  <span className="mt-1 block text-slate-muted">{m.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <DonationCta />
    </>
  );
}
