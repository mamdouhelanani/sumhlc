import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, YouTubeIcon } from "@/components/shared/social-icons";
import { bhLink, emergency, primaryCrisis } from "@/config/crisis";
import { footerNav, legalNav } from "@/config/nav";
import { site } from "@/config/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="space-y-6">
          <Logo inverse />
          <address className="space-y-2 text-sm not-italic">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
              <a href={site.address.mapUrl} className="hover:text-white hover:underline">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
              <a href={`tel:${site.phone.tel}`} className="hover:text-white hover:underline">
                {site.phone.display}
              </a>
            </p>
            <p className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </p>
          </address>
          <div className="rounded-xl border border-white/15 p-4 text-sm">
            <p className="font-semibold text-white">In crisis? Help is available 24/7.</p>
            <p className="mt-1">
              Call or text{" "}
              <a href={`tel:${primaryCrisis.tel}`} className="font-semibold text-warm-200 underline underline-offset-4">
                988
              </a>{" "}
              · BH Link{" "}
              <a href={`tel:${bhLink.tel}`} className="font-semibold text-warm-200 underline underline-offset-4">
                {bhLink.display}
              </a>{" "}
              · Emergency{" "}
              <a href={`tel:${emergency.tel}`} className="font-semibold text-warm-200 underline underline-offset-4">
                911
              </a>
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-sans text-sm font-bold tracking-wider text-white uppercase">{group.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="sm:col-span-3">
            <h2 className="font-sans text-sm font-bold tracking-wider text-white uppercase">Stay connected</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={site.newsletterUrl}
                className="inline-flex h-11 items-center rounded-lg bg-white px-4 text-sm font-semibold text-brand-900 hover:bg-brand-50"
              >
                Join our mailing list
              </a>
              <a href={site.social.facebook} className="inline-flex size-11 items-center justify-center rounded-lg border border-white/20 hover:bg-white/10">
                <FacebookIcon className="size-5" />
                <span className="sr-only">SUMHLC on Facebook</span>
              </a>
              <a href={site.social.youtube} className="inline-flex size-11 items-center justify-center rounded-lg border border-white/20 hover:bg-white/10">
                <YouTubeIcon className="size-5" />
                <span className="sr-only">SUMHLC Recovery TV on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. SUMHLC is a nonprofit organization; donations are tax-deductible.
          </p>
          <ul className="flex gap-4">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
