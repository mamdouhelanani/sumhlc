import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileDown, Mail, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { TierComparison } from "@/components/membership/tier-comparison";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getMembers, getMembership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Compare SUMHLC Full Board, Associate and Single memberships. Legislative alerts, professional development, networking and more for Rhode Island's behavioral health field.",
};

export default function MembershipPage() {
  const { tiers, benefits, applyEmail } = getMembership();
  const memberCount = getMembers().length;

  const steps = [
    { icon: FileDown, title: "Download", body: "Choose a membership below and download its application." },
    { icon: Mail, title: "Complete & email", body: <>Send the completed form to <a href={`mailto:${applyEmail}`} className="font-semibold text-brand-700 underline underline-offset-4">{applyEmail}</a>.</> },
    { icon: Send, title: "Welcome aboard", body: "Our team confirms your membership and dues, and adds you to member communications." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Lead, learn and influence the future of behavioral health"
        intro={`Join ${memberCount} organizations working together for high-quality, community-based mental health and substance use care in Rhode Island.`}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#compare">Compare memberships</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/membership/directory">
              See our members <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </PageHeader>

      <Section aria-labelledby="compare-heading" id="compare" className="scroll-mt-24">
        <SectionHeading id="compare-heading" title="Compare memberships" intro="Every membership includes SUMHLC communications. Choose the level that fits your organization or practice." />
        <TierComparison tiers={tiers} benefits={benefits} />
        <p className="mt-4 text-sm text-slate-muted">
          Questions about dues or benefits?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </Section>

      <Section tone="sand" aria-labelledby="how-heading">
        <SectionHeading id="how-heading" title="How to join" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, ...s }, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-100">
              <span className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-700 font-heading font-bold text-white">{i + 1}</span>
                <Icon className="size-5 text-brand-600" aria-hidden />
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold text-brand-900">{s.title}</h3>
              <p className="mt-1 text-slate-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
