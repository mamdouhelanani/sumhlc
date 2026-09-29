import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy", description: "How the SUMHLC website handles your information." };

// DRAFT — have SUMHLC review before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy" intro="We collect as little information as possible." />
      <Container className="py-12 sm:py-16">
        <div className="prose prose-lg max-w-3xl prose-headings:font-heading prose-headings:text-brand-900 prose-a:text-brand-700">
          <h2>What we collect</h2>
          <p>
            This website does not use advertising or tracking cookies, and it does not require an account. If you send us a message or a
            training request, we receive the information you type into the form so we can reply to you.
          </p>
          <h2>Forms</h2>
          <p>
            Form submissions are delivered to SUMHLC staff by email. Please don&apos;t include private health information in a form. We use
            what you send only to respond to you and do not sell or share it.
          </p>
          <h2>Other websites</h2>
          <p>
            Our resource directory links to other organizations&apos; websites, and donations are processed by PayPal. Those sites have their
            own privacy policies.
          </p>
          <h2>Questions</h2>
          <p>
            Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone.display}.
          </p>
        </div>
      </Container>
    </>
  );
}
