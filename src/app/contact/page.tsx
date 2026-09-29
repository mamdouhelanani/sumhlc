import type { Metadata } from "next";
import { Clock, LifeBuoy, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { bhLink } from "@/config/crisis";
import { fullAddress, site } from "@/config/site";
import { getStaff } from "@/lib/content";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact SUMHLC at ${fullAddress}, call ${site.phone.display}, or send us a message.`,
};

export default function ContactPage() {
  const staff = getStaff();
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" intro="Questions about membership, trainings, the OTP Health Home program or anything else? We're glad to help." />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div className="flex gap-3 rounded-2xl border border-warm-200 bg-warm-50 p-5">
            <LifeBuoy className="mt-0.5 size-5 shrink-0 text-warm-700" aria-hidden />
            <p className="text-sm text-ink">
              <strong>This form is not monitored around the clock.</strong> If you need help now, call or text{" "}
              <a href="tel:988" className="font-semibold text-warm-700 underline">988</a>, call BH Link at{" "}
              <a href={`tel:${bhLink.tel}`} className="font-semibold text-warm-700 underline">{bhLink.display}</a>, or{" "}
              <Link href="/get-help" className="font-semibold text-warm-700 underline">see all crisis resources</Link>.
            </p>
          </div>

          <address className="space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block font-semibold text-ink">{site.name}</span>
                <a href={site.address.mapUrl} className="text-brand-700 hover:underline">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                  <span className="sr-only"> (open in Google Maps)</span>
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden />
              <a href={`tel:${site.phone.tel}`} className="text-lg font-semibold text-brand-700 hover:underline">
                {site.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden />
              <a href={`mailto:${site.email}`} className="font-semibold break-all text-brand-700 hover:underline">
                {site.email}
              </a>
            </p>
            <p className="flex gap-3 text-slate-muted">
              <Clock className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden />
              <span>We&apos;ll get back to you as soon as we can.</span>
            </p>
          </address>

          <div>
            <h2 className="font-sans text-base font-bold text-ink">Reach a staff member directly</h2>
            <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-white">
              {staff.map((p) => (
                <li key={p.email} className="p-4 text-sm">
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-slate-muted">{p.titles.join(" · ")}</p>
                  <p className="mt-1 flex flex-wrap gap-x-4">
                    {p.phone && (
                      <a href={telHref(p.phone) ?? undefined} className="text-brand-700 hover:underline">
                        {p.phone}
                      </a>
                    )}
                    <a href={`mailto:${p.email}`} className="text-brand-700 hover:underline">
                      {p.email}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <p className="mt-1 mb-6 text-sm text-slate-muted">Fields marked * are required.</p>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
