import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Accessibility", description: "SUMHLC's commitment to an accessible website." };

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader title="Accessibility" intro="Everyone should be able to find help and information on this site." />
      <Container className="py-12 sm:py-16">
        <div className="prose prose-lg max-w-3xl prose-headings:font-heading prose-headings:text-brand-900 prose-a:text-brand-700">
          <p>
            SUMHLC aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. This site was built with accessibility in
            mind, including:
          </p>
          <ul>
            <li>Text and controls with at least 4.5:1 color contrast, and a visible focus indicator on every interactive element.</li>
            <li>Full keyboard navigation, a &ldquo;skip to main content&rdquo; link, and menus and dialogs that follow WAI-ARIA patterns.</li>
            <li>Tap-to-call phone numbers, large touch targets, and layouts that work from small phones to large screens.</li>
            <li>Respect for your device&apos;s reduced-motion setting.</li>
            <li>Forms with clear labels, announced errors, and no time limits.</li>
          </ul>
          <h2>Documents from other organizations</h2>
          <p>
            Some linked PDFs and websites come from other organizations and may not be fully accessible. If you need information in another
            format, contact us and we will help.
          </p>
          <h2>Tell us about a problem</h2>
          <p>
            If something on this site doesn&apos;t work for you, email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>. Please tell us the page and what happened.
          </p>
        </div>
      </Container>
    </>
  );
}
