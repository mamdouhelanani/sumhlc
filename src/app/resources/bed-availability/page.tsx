import type { Metadata } from "next";
import { BedDouble, ExternalLink, Info, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { bhLink } from "@/config/crisis";

export const metadata: Metadata = {
  title: "Residential Bed Availability",
  description: "Check live open-bed availability at Rhode Island behavioral health residential and inpatient programs.",
};

const OPEN_BEDS_URL = "https://ribhopenbeds.org/";

export default function BedAvailabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources & Locator"
        title="Residential bed availability"
        intro="See which behavioral health residential, detox and inpatient programs in Rhode Island have open beds right now."
        breadcrumbs={[{ title: "Resources", href: "/resources" }]}
      />
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-brand-900 p-8 text-white sm:p-10">
          <BedDouble className="size-10 text-warm-300" aria-hidden />
          <h2 className="mt-4 text-3xl font-bold text-white">RI Behavioral Health Open Beds</h2>
          <p className="mt-3 text-lg text-brand-100">
            The state&apos;s official open-bed tracker lists every participating program with bed type, service, setting, and how many beds
            are available, filled or have a waiting list. Providers update it daily or weekly.
          </p>
          <a
            href={OPEN_BEDS_URL}
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 font-semibold text-brand-900 hover:bg-brand-50"
          >
            View live bed availability <ExternalLink className="size-4" aria-hidden />
            <span className="sr-only">(opens ribhopenbeds.org)</span>
          </a>
          <p className="mt-4 text-sm text-brand-200">Maintained by BHDDH in partnership with the Rhode Island Quality Institute.</p>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-brand-900">
              <Info className="size-5 text-brand-600" aria-hidden /> How to use it
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink">
              <li>Filter by provider, bed type, service or setting.</li>
              <li>Check the &ldquo;Updated&rdquo; time — availability changes quickly.</li>
              <li>Call the program directly to confirm a bed and ask about intake.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-warm-200 bg-warm-50 p-6">
            <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-ink">
              <Phone className="size-5 text-warm-700" aria-hidden /> Not sure where to start?
            </h2>
            <p className="mt-2 text-sm text-ink">
              BH Link can help you find the right level of care, 24/7:{" "}
              <a href={`tel:${bhLink.tel}`} className="font-semibold text-warm-700 underline">
                {bhLink.display}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
