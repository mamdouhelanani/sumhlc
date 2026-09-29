import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BedDouble, ClipboardCheck, MapPinned } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resource Directory",
  description:
    "Search Rhode Island mental health and substance use resources: crisis lines, support groups, treatment, memory care, insurance guides, handouts and more.",
};

const tools = [
  { href: "/resources/treatment", icon: MapPinned, title: "Treatment locator", body: "Filter providers by service, medication and town." },
  { href: "/resources/bed-availability", icon: BedDouble, title: "Open beds", body: "Live residential and inpatient availability." },
  { href: "/resources/self-help", icon: ClipboardCheck, title: "Self-screening", body: "Free, private screening tools." },
];

export default function ResourcesPage() {
  const resources = getResources();
  return (
    <>
      <PageHeader
        eyebrow="Resources & Locator"
        title="Behavioral health resources for Rhode Island"
        intro="Guides, support groups, treatment options and handouts for individuals, families and professionals. Everything here is free to use."
      >
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {tools.map(({ icon: Icon, ...t }) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group flex h-full items-start gap-3 rounded-xl border border-brand-100 bg-white p-4 shadow-sm hover:border-brand-500"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                <span>
                  <span className="flex items-center gap-1 font-semibold text-brand-900 group-hover:underline">
                    {t.title} <ArrowRight className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm text-slate-muted">{t.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <ResourceExplorer resources={resources} />
      </Container>
    </>
  );
}
