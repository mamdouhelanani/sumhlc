import type { Metadata } from "next";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getEmployers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers in Behavioral Health",
  description: "Explore open mental health and substance use jobs at SUMHLC member organizations across Rhode Island.",
};

export default function CareersPage() {
  const employers = getEmployers();
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Careers in behavioral health"
        intro="Meaningful work across Rhode Island's mental health and substance use field. Explore open positions at our member organizations and find the role that's right for you."
      />
      <Container className="py-12 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold">Member organizations currently hiring</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {employers.map((e) => (
            <li key={e.name}>
              <a href={e.url} className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-brand-500">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Briefcase className="size-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-brand-900 group-hover:underline">{e.name}</span>
                  <span className="text-sm text-slate-muted">View open positions</span>
                </span>
                <ExternalLink className="size-4 text-slate-muted" aria-hidden />
                <span className="sr-only">(external careers site)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-slate-muted">
          Are you a member organization that&apos;s hiring?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-4">
            Send us your careers link
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
