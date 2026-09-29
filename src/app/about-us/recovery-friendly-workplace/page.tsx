import type { Metadata } from "next";
import { Award, HeartHandshake, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ExternalLink } from "@/components/shared/external-link";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Recovery Friendly Workplace",
  description: "SUMHLC is a designated Recovery Friendly Workplace under Rhode Island's RFW initiative.",
};

export default function RecoveryFriendlyWorkplacePage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A Recovery Friendly Workplace"
        intro="In July 2020, the Office of the Governor recognized SUMHLC as a Recovery Friendly Workplace under Rhode Island's RFW initiative."
        breadcrumbs={[{ title: "About Us", href: "/about-us" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-brand-900 prose-a:text-brand-700">
            <h2>What the designation means</h2>
            <p>
              Rhode Island&apos;s Recovery Friendly Workplaces strengthen their communities by creating work environments that welcome people
              in recovery. Employers, staff and communities work together to remove the barriers that addiction creates — and to support
              the wellbeing of every employee.
            </p>
            <p>
              As a designated workplace, SUMHLC commits to a culture that grows understanding, raises awareness and supports people in or
              seeking recovery, among our own staff and across the organizations we work with.
            </p>
            <h2>Learn more about the initiative</h2>
            <p>
              Any Rhode Island employer can take part. Visit <ExternalLink href="https://www.recoveryfriendlyri.com">RecoveryFriendlyRI.com</ExternalLink>{" "}
              for information and resources about becoming a Recovery Friendly Workplace.
            </p>
          </div>
          <ul className="space-y-4 self-start">
            {[
              { icon: Award, title: "Designated July 2, 2020", body: "Recognized by the Office of the Governor of Rhode Island." },
              { icon: HeartHandshake, title: "A welcoming culture", body: "Support for employees in recovery and for staff wellness." },
              { icon: Users, title: "Shared commitment", body: "Employers, staff and communities removing barriers together." },
            ].map(({ icon: Icon, ...item }) => (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-brand-50 p-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
                <span>
                  <span className="block font-semibold text-brand-900">{item.title}</span>
                  <span className="text-sm text-slate-muted">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
