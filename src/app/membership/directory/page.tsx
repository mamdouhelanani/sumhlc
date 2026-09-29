import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { MemberDirectory } from "@/components/membership/member-directory";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Member Directory",
  description: "Rhode Island behavioral health providers and partner organizations that are members of SUMHLC.",
};

export default function MemberDirectoryPage() {
  const members = getMembers();
  const full = members.filter((m) => m.tier === "full").length;
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Member directory"
        intro={
          <>
            {full} full members and {members.length - full} associate members make up Rhode Island&apos;s behavioral health network.{" "}
            <Link href="/membership" className="font-semibold text-brand-700 underline underline-offset-4">
              Become a member
            </Link>
            .
          </>
        }
        breadcrumbs={[{ title: "Membership", href: "/membership" }]}
      />
      <Container className="py-12 sm:py-16">
        <MemberDirectory members={members} />
      </Container>
    </>
  );
}
