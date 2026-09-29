import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, HandHeart, Landmark, LifeBuoy, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support SUMHLC's work for mental health and substance use care in Rhode Island. Donations are tax-deductible.",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support our work"
        title="Every donation helps someone seeking care"
        intro="Your gift supports training for the behavioral health workforce, advocacy for community-based care and free resources for Rhode Islanders. Contributions are tax-deductible."
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <section aria-labelledby="online-heading" className="rounded-3xl border border-warm-200 bg-warm-50 p-8">
            <HandHeart className="size-10 text-warm-700" aria-hidden />
            <h2 id="online-heading" className="mt-3 text-3xl font-bold">
              Give online
            </h2>
            <p className="mt-2 text-ink">
              Donate securely through PayPal. You&apos;ll complete your gift on PayPal&apos;s website.
            </p>
            <a
              href={site.donate.paypalUrl}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-warm-700 px-6 font-semibold text-white hover:bg-warm-800"
            >
              Donate with PayPal <span className="sr-only">(opens paypal.com)</span>
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-muted">
              <ShieldCheck className="size-4" aria-hidden /> Payment details are handled by PayPal and never stored by SUMHLC.
            </p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <section aria-labelledby="mail-heading" className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 id="mail-heading" className="flex items-center gap-2 font-sans text-lg font-bold text-brand-900">
                <Mail className="size-5 text-brand-600" aria-hidden /> Give by mail
              </h2>
              <p className="mt-2 text-sm text-ink">Mail checks to:</p>
              <address className="mt-2 text-sm not-italic leading-relaxed">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
            </section>
            <section aria-labelledby="qr-heading" className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 id="qr-heading" className="font-sans text-lg font-bold text-brand-900">
                Scan to give
              </h2>
              <Image src={site.donate.qrCode} alt="QR code that opens SUMHLC's PayPal donation page" width={140} height={140} className="mt-3" />
            </section>
          </div>
          {site.donate.ein && <p className="text-sm text-slate-muted">SUMHLC is a 501(c)(3) nonprofit, EIN {site.donate.ein}.</p>}
        </div>

        <aside aria-labelledby="impact-heading" className="self-start rounded-3xl bg-brand-900 p-8 text-white">
          <h2 id="impact-heading" className="text-2xl font-bold text-white">
            What your gift supports
          </h2>
          <ul className="mt-6 space-y-5">
            {[
              { icon: GraduationCap, title: "A trained workforce", body: "Accredited continuing education that keeps clinicians licensed and skilled." },
              { icon: Landmark, title: "A stronger system", body: "Advocacy for fair rates and funding for community-based providers." },
              { icon: LifeBuoy, title: "Help that's easy to find", body: "Free resource guides, directories and crisis information for every Rhode Islander." },
            ].map(({ icon: Icon, ...i }) => (
              <li key={i.title} className="flex gap-3">
                <Icon className="mt-0.5 size-6 shrink-0 text-warm-300" aria-hidden />
                <span>
                  <span className="block font-semibold">{i.title}</span>
                  <span className="text-sm text-brand-100">{i.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </>
  );
}
