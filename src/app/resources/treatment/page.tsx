import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProviderLocator } from "@/components/resources/provider-locator";
import { getProviders } from "@/lib/content";

export const metadata: Metadata = {
  title: "Treatment Locator",
  description:
    "Find substance use and mental health treatment in Rhode Island by service, medication (buprenorphine, naltrexone, MAT) and town.",
};

export default function TreatmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources & Locator"
        title="Treatment locator"
        intro="Find outpatient care, medication for addiction treatment and co-occurring services near you. Call ahead to confirm hours, intake and insurance."
        breadcrumbs={[{ title: "Resources", href: "/resources" }]}
      >
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://bhddh.ri.gov/substance-useaddiction"
            className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white p-4 text-sm shadow-sm hover:border-brand-500"
          >
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
            <span>
              <span className="block font-semibold text-brand-900">Official list of licensed providers</span>
              <span className="text-slate-muted">Maintained by BHDDH, the state behavioral health department.</span>
            </span>
          </a>
          <Link
            href="/resources/bed-availability"
            className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white p-4 text-sm shadow-sm hover:border-brand-500"
          >
            <BedDouble className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
            <span>
              <span className="block font-semibold text-brand-900">Need a residential or inpatient bed?</span>
              <span className="text-slate-muted">See live open-bed availability across Rhode Island.</span>
            </span>
          </Link>
        </div>
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <ProviderLocator providers={getProviders()} />
      </Container>
    </>
  );
}
