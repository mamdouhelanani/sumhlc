import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ExternalLink } from "@/components/shared/external-link";
import { getLicensure } from "@/lib/content";

export const metadata: Metadata = {
  title: "Licensure & CEU Resources",
  description: "Rhode Island licensing boards, CEU renewal requirements and certification organizations for behavioral health professionals.",
};

export default function LicensurePage() {
  const { ceuRequirements, groups } = getLicensure();
  return (
    <>
      <PageHeader
        eyebrow="TRAIN ED"
        title="Career & licensure resource center"
        intro="State licensing requirements, CEU renewal hours and certification organizations for behavioral health professionals in Rhode Island and neighboring states."
        breadcrumbs={[{ title: "Trainings", href: "/trainings" }]}
      />
      <Container className="space-y-14 py-12 sm:py-16">
        <section aria-labelledby="ceu-heading">
          <h2 id="ceu-heading" className="text-3xl font-bold tracking-tight">
            CEU requirements in Rhode Island
          </h2>
          <p className="mt-2 text-slate-muted">Always confirm current requirements with your licensing board.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-brand-50 text-brand-900">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">License</th>
                  <th scope="col" className="px-5 py-3 font-semibold">CE hours required</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Renewal period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ceuRequirements.map((r) => (
                  <tr key={r.license}>
                    <th scope="row" className="px-5 py-3 font-medium text-ink">{r.license}</th>
                    <td className="px-5 py-3">{r.hours}</td>
                    <td className="px-5 py-3">{r.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/trainings" className="font-semibold text-brand-700 underline underline-offset-4">
              Earn CEUs with TRAIN ED
            </Link>
          </p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.title} aria-labelledby={`g-${g.title}`} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 id={`g-${g.title}`} className="text-2xl font-bold">
                {g.title}
              </h2>
              {g.intro && <p className="mt-2 text-sm text-slate-muted">{g.intro}</p>}
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.url}>
                    <ExternalLink href={l.url}>{l.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
