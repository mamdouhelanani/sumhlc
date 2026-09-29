import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/shared/section";
import { YouTubeIcon } from "@/components/shared/social-icons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Recovery TV",
  description: "SUMHLC Recovery TV on YouTube: conversations and resources supporting mental health and substance use recovery.",
};

export default function RecoveryTvPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events & Trainings"
        title="SUMHLC Recovery TV"
        intro="Our YouTube channel shares conversations and resources that support mental health and substance use recovery — for professionals and for anyone looking for guidance."
      />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-50 shadow-sm">
            <Image
              src="https://sumhlc.org/wp-content/uploads/2026/07/Screenshot-2026-07-13-104946.png"
              alt="Still from a SUMHLC Recovery TV episode"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Watch and subscribe</h2>
            <p className="mt-3 text-lg text-slate-muted">
              Recovery TV aims to empower professionals and anyone seeking guidance with information on mental health and substance use
              recovery. Subscribe for updates on mental health education and advocacy.
            </p>
            <a
              href={site.social.youtube}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-warm-700 px-6 font-semibold text-white hover:bg-warm-800"
            >
              <YouTubeIcon className="size-5" /> View all episodes on YouTube
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
