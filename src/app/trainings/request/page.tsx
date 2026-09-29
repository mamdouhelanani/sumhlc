import type { Metadata } from "next";
import { CalendarCheck, Percent, ShieldCheck } from "lucide-react";
import { TrainingRequestForm } from "@/components/forms/training-request-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Request a Group Training",
  description: "Book a private TRAIN ED training for your organization. Groups of 20 or more receive 15% off.",
};

export default function TrainingRequestPage() {
  return (
    <>
      <PageHeader
        eyebrow="TRAIN ED"
        title="Request a group training"
        intro="Empower your team with high-quality, evidence-based training on substance use, mental health and more. We'll coordinate a custom session for your organization."
        breadcrumbs={[{ title: "Trainings", href: "/trainings" }]}
      />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.5fr]">
        <ul className="space-y-4 self-start">
          {[
            { icon: Percent, title: "15% off for 20+ participants", body: "A special group rate when your organization books a private training." },
            { icon: ShieldCheck, title: "Trusted trainers", body: "Experienced clinicians and educators, with accredited CE credit." },
            { icon: CalendarCheck, title: "Flexible scheduling", body: "Choose dates and a format that work for your staff." },
          ].map(({ icon: Icon, ...b }) => (
            <li key={b.title} className="flex gap-4 rounded-2xl bg-brand-50 p-5">
              <Icon className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block font-semibold text-brand-900">{b.title}</span>
                <span className="text-sm text-slate-muted">{b.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Tell us about your group</h2>
          <p className="mt-1 mb-6 text-sm text-slate-muted">Fields marked * are required.</p>
          <TrainingRequestForm />
        </div>
      </Container>
    </>
  );
}
