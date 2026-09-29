import type { Metadata } from "next";
import { ClipboardCheck, Download, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Self-Help Screening Tools",
  description: "Free, private self-screening tools for substance use, including the Drug Abuse Screening Test (DAST-10).",
};

export default function SelfHelpPage() {
  const tools = getResources().filter((r) => r.category === "screening");
  return (
    <>
      <PageHeader
        eyebrow="Resources & Locator"
        title="Self-help screening tools"
        intro="Private questionnaires you can complete on your own. A screening is not a diagnosis — it's a starting point for a conversation with a health professional."
        breadcrumbs={[{ title: "Resources", href: "/resources" }]}
      />
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr]">
        <ul className="space-y-4">
          {tools.map((t) => (
            <li key={t.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <ClipboardCheck className="size-8 text-brand-600" aria-hidden />
              <h2 className="mt-3 font-sans text-xl font-bold text-brand-900">{t.title}</h2>
              <p className="mt-2 text-ink">{t.description}</p>
              <a href={t.url} className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800">
                <Download className="size-4" aria-hidden /> Download screening (PDF)
              </a>
            </li>
          ))}
        </ul>
        <aside className="self-start rounded-2xl border border-warm-200 bg-warm-50 p-6">
          <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-ink">
            <LifeBuoy className="size-5 text-warm-700" aria-hidden /> Worried about your results?
          </h2>
          <p className="mt-2 text-sm text-ink">
            Talk with your doctor or a counselor, or reach out for support any time. <Link href="/get-help" className="font-semibold text-warm-700 underline">Get help now</Link> or{" "}
            <Link href="/resources/treatment" className="font-semibold text-warm-700 underline">find treatment near you</Link>.
          </p>
        </aside>
      </Container>
    </>
  );
}
