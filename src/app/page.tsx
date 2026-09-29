import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ImpactStrip } from "@/components/home/impact-strip";
import { MembershipTeaser } from "@/components/home/membership-teaser";
import { Pillars } from "@/components/home/pillars";
import { ResourceQuickFind } from "@/components/home/resource-quick-find";
import { NewsCard } from "@/components/news/news-card";
import { DonationCta } from "@/components/shared/donation-cta";
import { Section, SectionHeading } from "@/components/shared/section";
import { TrainingCard } from "@/components/trainings/training-card";
import { Button } from "@/components/ui/button";
import { getMembers, getMembership, getUpcomingTrainings } from "@/lib/content";
import { getPosts } from "@/lib/news";

// Re-render hourly so past trainings drop off without a redeploy.
export const revalidate = 3600;

export default function HomePage() {
  const members = getMembers();
  const trainings = getUpcomingTrainings(3);
  const posts = getPosts().slice(0, 3);
  const { tiers } = getMembership();

  return (
    <>
      <Hero memberCount={members.length} nextTraining={trainings[0]} />
      <ImpactStrip
        stats={[
          { value: String(members.length), label: "member organizations" },
          { value: "1,500", label: "professionals trained each year" },
          { value: "3,000+", label: "continuing education hours delivered" },
          { value: "5", label: "boards that approve our CE credits" },
        ]}
      />
      <ResourceQuickFind />
      <Pillars />

      <Section aria-labelledby="trainings-heading">
        <SectionHeading
          id="trainings-heading"
          eyebrow="TRAIN ED"
          title="Upcoming trainings"
          intro="Live online continuing education approved by NASW-RI, the RI Certification Board, RIMHCA, NBCC and NAADAC."
          action={
            <Button asChild variant="outline" size="lg">
              <Link href="/trainings">
                Full schedule <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        {trainings.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainings.map((t) => (
              <li key={t.slug}>
                <TrainingCard training={t} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-muted">New trainings are being scheduled. Check back soon.</p>
        )}
      </Section>

      <MembershipTeaser tiers={tiers} />

      <Section aria-labelledby="news-heading">
        <SectionHeading
          id="news-heading"
          eyebrow="News"
          title="Latest from SUMHLC"
          action={
            <Button asChild variant="outline" size="lg">
              <Link href="/news">
                All news <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <DonationCta />
    </>
  );
}
