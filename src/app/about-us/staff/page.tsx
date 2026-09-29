import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, Smartphone, UserRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getStaff } from "@/lib/content";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Staff & Leadership",
  description: "Meet the SUMHLC team and find direct phone numbers and email addresses.",
};

export default function StaffPage() {
  const staff = getStaff();
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Staff & leadership"
        intro="Our small team supports members, runs TRAIN ED and coordinates Rhode Island's OTP Health Home program."
        breadcrumbs={[{ title: "About Us", href: "/about-us" }]}
      />
      <Container className="py-12 sm:py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((person) => (
            <li key={person.email}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="relative aspect-[4/5] bg-brand-50">
                  {person.photo ? (
                    <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  ) : (
                    <UserRound className="absolute inset-0 m-auto size-16 text-brand-300" aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-sans text-lg font-bold text-brand-900">
                    {person.name}
                    {person.credentials && <span className="font-normal text-slate-muted">, {person.credentials}</span>}
                  </h2>
                  <ul className="mt-1 text-sm text-slate-muted">
                    {person.titles.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <ul className="mt-auto space-y-1.5 pt-4 text-sm">
                    {person.phone && (
                      <li className="flex items-center gap-2">
                        <Phone className="size-4 text-slate-muted" aria-hidden />
                        <a href={telHref(person.phone) ?? undefined} className="font-medium text-brand-700 hover:underline">
                          <span className="sr-only">Office: </span>
                          {person.phone}
                        </a>
                      </li>
                    )}
                    {person.mobile && (
                      <li className="flex items-center gap-2">
                        <Smartphone className="size-4 text-slate-muted" aria-hidden />
                        <a href={telHref(person.mobile) ?? undefined} className="font-medium text-brand-700 hover:underline">
                          <span className="sr-only">Mobile: </span>
                          {person.mobile}
                        </a>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <Mail className="size-4 shrink-0 text-slate-muted" aria-hidden />
                      <a href={`mailto:${person.email}`} className="font-medium break-all text-brand-700 hover:underline">
                        {person.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
