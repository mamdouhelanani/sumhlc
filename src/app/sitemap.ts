import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/news";

const routes = [
  "",
  "/get-help",
  "/about-us",
  "/about-us/staff",
  "/about-us/recovery-friendly-workplace",
  "/resources",
  "/resources/treatment",
  "/resources/bed-availability",
  "/resources/self-help",
  "/programs/otp-health-homes",
  "/membership",
  "/membership/directory",
  "/trainings",
  "/trainings/request",
  "/trainings/licensure",
  "/events",
  "/news",
  "/recovery-tv",
  "/careers",
  "/donate",
  "/contact",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "weekly" as const, priority: path === "" || path === "/get-help" ? 1 : 0.7 })),
    ...getPosts().map((p) => ({ url: `${site.url}/news/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
