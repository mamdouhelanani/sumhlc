import { Container } from "@/components/layout/container";

export function ImpactStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="SUMHLC at a glance" className="border-y border-brand-100 bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-brand-100 py-8 lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-4 text-center">
              <dt className="mt-1 text-sm text-slate-muted">{s.label}</dt>
              <dd className="font-heading text-4xl font-bold text-brand-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
