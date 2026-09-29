import Link from "next/link";
import { HandHeart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { site } from "@/config/site";

export function DonationCta() {
  return (
    <section aria-labelledby="donate-heading" className="bg-sand-50 py-14 [contain-intrinsic-size:auto_560px] [content-visibility:auto] sm:py-20">
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-warm-200 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-2 text-sm font-bold tracking-wider text-warm-700 uppercase">Support our work</p>
            <h2 id="donate-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Every gift helps a Rhode Islander find care.
            </h2>
            <p className="mt-4 text-lg text-slate-muted">
              Donations fund training for the behavioral health workforce, advocacy for community-based care, and resources for people
              seeking help. Your contribution is tax-deductible.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="crisis" size="lg">
                <Link href="/donate">
                  <HandHeart aria-hidden /> Donate today
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.newsletterUrl}>
                  <Mail aria-hidden /> Join the mailing list
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-warm-50 p-6 text-sm text-ink">
            <p className="font-semibold">Prefer to give by mail?</p>
            <address className="mt-2 not-italic leading-relaxed">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
          </div>
        </div>
      </Container>
    </section>
  );
}
