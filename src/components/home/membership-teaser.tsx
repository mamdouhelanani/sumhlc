import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/shared/section";
import type { MembershipTier } from "@/lib/content";

export function MembershipTeaser({ tiers }: { tiers: MembershipTier[] }) {
  return (
    <Section tone="navy" aria-labelledby="membership-heading">
      <SectionHeading
        inverse
        id="membership-heading"
        eyebrow="Membership"
        title="Join Rhode Island's behavioral health network"
        intro="Stay ahead of policy and funding changes, grow professionally and connect with peers across the state."
        action={
          <Button asChild variant="inverse" size="lg">
            <Link href="/membership">
              Compare memberships <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <ul className="grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <li key={tier.id} className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/15">
            <h3 className="font-sans text-lg font-bold text-white">{tier.name}</h3>
            <p className="mt-1 text-sm text-brand-200">{tier.audience}</p>
            <p className="mt-5">
              {tier.price ? (
                <>
                  <span className="font-heading text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-brand-200"> {tier.priceNote}</span>
                </>
              ) : (
                <span className="text-lg font-semibold text-white">{tier.priceNote ?? "Contact us for dues"}</span>
              )}
            </p>
            {tier.badge && (
              <p className="mt-4 flex items-center gap-2 text-sm text-warm-200">
                <Check className="size-4" aria-hidden /> {tier.badge}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
