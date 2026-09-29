import Link from "next/link";
import { ArrowRight, GraduationCap, Landmark, Network } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/section";

const pillars = [
  {
    icon: Network,
    title: "Collaboration",
    body: "We connect Rhode Island's community-based mental health and substance use providers so they can coordinate care, share what works and solve problems together.",
    href: "/membership/directory",
    cta: "Meet our members",
  },
  {
    icon: Landmark,
    title: "Advocacy",
    body: "We speak up at the State House for fair rates, sustainable funding and policies that protect access to care — and keep members ahead of legislative change.",
    href: "/news?category=Perspectives",
    cta: "Read our perspectives",
  },
  {
    icon: GraduationCap,
    title: "Training",
    body: "Through TRAIN ED we deliver live, accredited continuing education that helps clinicians keep their licenses and grow their skills.",
    href: "/trainings",
    cta: "Explore trainings",
  },
];

export function Pillars() {
  return (
    <Section tone="sand" aria-labelledby="pillars-heading">
      <SectionHeading
        id="pillars-heading"
        eyebrow="What we do"
        title="Driven by the needs of the clients and communities our members serve"
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, ...p }) => (
          <li key={p.title} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-100">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-2xl font-bold">{p.title}</h3>
            <p className="mt-3 text-slate-muted">{p.body}</p>
            <Link href={p.href} className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brand-700 hover:underline">
              {p.cta} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
