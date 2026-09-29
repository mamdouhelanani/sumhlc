import Link from "next/link";
import { ArrowRight, CalendarDays, LifeBuoy, MessageSquareText, Phone, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { bhLink, primaryCrisis } from "@/config/crisis";
import type { Training } from "@/lib/content";
import { formatDate } from "@/lib/format";

type HeroProps = { memberCount: number; nextTraining?: Training };

export function Hero({ memberCount, nextTraining }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-brand-900 text-white">
      <HeroArt />
      <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-wider text-warm-300 uppercase">Collaboration · Advocacy · Training</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Stronger mental health and substance use care for every Rhode Island community.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-100 sm:text-xl">
            SUMHLC brings together the state&apos;s community-based providers to coordinate care, advocate for the people they serve, and
            train the workforce that makes recovery possible.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          <li className="flex flex-col rounded-2xl bg-warm-50 p-6 text-ink shadow-lg ring-1 ring-warm-200">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-warm-700 text-white">
                <LifeBuoy className="size-5" aria-hidden />
              </span>
              <h2 className="font-sans text-xl font-bold text-ink">Get help now</h2>
            </div>
            <p className="mt-3 text-sm text-slate-muted">Free, confidential support, 24 hours a day.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`tel:${primaryCrisis.tel}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-warm-700 text-sm font-semibold text-white hover:bg-warm-800"
                aria-label="Call the 988 Suicide and Crisis Lifeline"
              >
                <Phone className="size-4" aria-hidden /> Call 988
              </a>
              <a
                href={`sms:${primaryCrisis.sms}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-warm-700 text-sm font-semibold text-warm-700 hover:bg-warm-100"
                aria-label="Text the 988 Suicide and Crisis Lifeline"
              >
                <MessageSquareText className="size-4" aria-hidden /> Text 988
              </a>
            </div>
            <p className="mt-3 text-sm">
              RI&apos;s BH Link:{" "}
              <a href={`tel:${bhLink.tel}`} className="font-semibold text-warm-700 underline underline-offset-4">
                {bhLink.display}
              </a>
            </p>
            <Link href="/get-help" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-warm-700 hover:underline">
              All crisis resources <ArrowRight className="size-4" aria-hidden />
            </Link>
          </li>

          <HeroCard
            href="/membership/directory"
            icon={<Users className="size-5" aria-hidden />}
            title="Member directory"
            body={`${memberCount} provider and partner organizations serving communities across Rhode Island.`}
            cta="Browse members"
          />
          <HeroCard
            href="/trainings"
            icon={<CalendarDays className="size-5" aria-hidden />}
            title="Upcoming trainings"
            body={
              nextTraining?.date
                ? `Next: ${nextTraining.title} — ${formatDate(nextTraining.date)}. Live, accredited CE for licensed professionals.`
                : "Live, accredited continuing education for licensed behavioral health professionals."
            }
            cta="See the TRAIN ED schedule"
          />
        </ul>
      </Container>
    </section>
  );
}

function HeroCard({ href, icon, title, body, cta }: { href: string; icon: React.ReactNode; title: string; body: string; cta: string }) {
  return (
    <li className="group relative flex flex-col rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/15 transition-colors hover:bg-white/[0.12]">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-brand-500 text-white">{icon}</span>
        <h2 className="font-sans text-xl font-bold text-white">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
            {title}
          </Link>
        </h2>
      </div>
      <p className="mt-3 text-sm text-brand-100">{body}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-warm-200 group-hover:underline" aria-hidden>
        {cta} <ArrowRight className="size-4" />
      </span>
    </li>
  );
}

/** Two overlapping arcs echoing the two reaching hands in the SUMHLC logo. */
function HeroArt() {
  return (
    <svg aria-hidden className="absolute -top-24 -right-40 -z-10 h-[40rem] w-[40rem] text-brand-500 opacity-30 sm:-right-24" viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="28" strokeDasharray="520 420" strokeLinecap="round" />
      <circle cx="200" cy="200" r="150" stroke="#f3b58f" strokeWidth="28" strokeDasharray="300 640" strokeDashoffset="-600" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
