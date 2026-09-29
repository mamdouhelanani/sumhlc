import type { Metadata } from "next";
import { BookOpen, FileText, FolderOpen, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { LocationList } from "@/components/shared/location-list";
import { Section, SectionHeading } from "@/components/shared/section";
import { getHealthHomes, getResources } from "@/lib/content";
import { hostname } from "@/lib/format";

export const metadata: Metadata = {
  title: "OTP Health Homes",
  description:
    "Rhode Island Opioid Treatment Program Health Homes: participating providers, Health Home 101 training, resource guides and staff forms.",
};

export default function HealthHomesPage() {
  const { providers, training } = getHealthHomes();
  const resources = getResources().filter((r) => r.category === "otp-health-homes");
  const forms = resources.filter((r) => r.kind === "pdf");
  const guide = getResources().find((r) => r.title.startsWith("OTP Health Home Community Resource Guide"));
  const printables = resources.find((r) => r.kind === "folder");

  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Rhode Island OTP Health Homes"
        intro="Opioid Treatment Program Health Homes coordinate medical, behavioral and social care for people receiving treatment for opioid use disorder. SUMHLC coordinates training and resources for the program statewide."
      />

      <Section aria-labelledby="providers-heading">
        <SectionHeading id="providers-heading" title="Health Home providers" intro="Contact a site directly to ask about enrollment." />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <li key={p.name} className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-sans text-lg font-bold text-brand-900">{p.name}</h3>
              <LocationList locations={p.locations} name={p.name} className="mt-3 mb-4" />
              {p.website && (
                <a href={p.website} className="mt-auto inline-flex min-h-6 items-center self-start text-sm font-semibold text-brand-700 hover:underline">
                  {hostname(p.website)} <span className="sr-only">(external site)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" aria-labelledby="training-heading">
        <SectionHeading id="training-heading" eyebrow="For Health Home staff" title="Training" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
            <iframe
              src={training.videoEmbedUrl}
              title="Health Home 101: an introduction to Rhode Island's OTP Health Home program"
              loading="lazy"
              allow="fullscreen; picture-in-picture"
              className="aspect-video w-full"
            />
          </div>
          <div className="space-y-4">
            <a href={training.selfPacedUrl} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 hover:ring-brand-500">
              <BookOpen className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block font-sans text-lg font-bold text-brand-900">Health Home 101 self-paced course</span>
                <span className="text-slate-muted">
                  Program history, forms, procedures and assignments. Approved for initial training and for returning staff — available 24/7.
                </span>
              </span>
            </a>
            <a href={training.videoUrl} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 hover:ring-brand-500">
              <PlayCircle className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block font-sans text-lg font-bold text-brand-900">Health Home 101 video</span>
                <span className="text-slate-muted">Care coordination, populations served, enrollment and team roles.</span>
              </span>
            </a>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="forms-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="forms-heading" title="Staff forms" />
            <ul className="divide-y divide-border rounded-2xl border border-border bg-white">
              {forms.map((f) => (
                <li key={f.id}>
                  <a href={f.url} className="flex items-start gap-3 p-4 hover:bg-brand-50">
                    <FileText className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                    <span>
                      <span className="block font-semibold text-brand-800">{f.title} <span className="text-xs text-slate-muted">(PDF)</span></span>
                      <span className="text-sm text-slate-muted">{f.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading id="guides-heading" title="Resources" />
            <ul className="space-y-3">
              {guide && (
                <li>
                  <a href={guide.url} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 hover:border-brand-500">
                    <FileText className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                    <span>
                      <span className="block font-semibold text-brand-800">{guide.title} <span className="text-xs text-slate-muted">(PDF)</span></span>
                      <span className="text-sm text-slate-muted">{guide.description}</span>
                    </span>
                  </a>
                </li>
              )}
              {printables && (
                <li>
                  <a href={printables.url} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 hover:border-brand-500">
                    <FolderOpen className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                    <span>
                      <span className="block font-semibold text-brand-800">{printables.title}</span>
                      <span className="text-sm text-slate-muted">{printables.description}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
