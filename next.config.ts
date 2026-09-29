import type { NextConfig } from "next";
import legacyPostRedirects from "./src/config/legacy-post-redirects.json";

// Old WordPress URLs → new routes, so bookmarks and search results keep working.
const legacyPageRedirects: Record<string, string> = {
  "/staff-directory": "/about-us/staff",
  "/recovery-friendly-workplace": "/about-us/recovery-friendly-workplace",
  "/member-organizations": "/membership/directory",
  "/trainrischedule": "/trainings",
  "/trainrischedule/training": "/trainings",
  "/community-training-request-form": "/trainings/request",
  "/e-learning-opportunities": "/trainings",
  "/self-help-tools": "/resources/self-help",
  "/otp-hh-initiative": "/programs/otp-health-homes",
  "/opioid-treatment-program-health-home-community-resource-guide-updated-november-2025": "/programs/otp-health-homes",
  "/treatment": "/resources/treatment",
  "/treatment/residential-availability": "/resources/bed-availability",
  "/residential-availabilityarchive": "/resources/bed-availability",
  "/discover-jobs": "/careers",
  "/job-openings": "/careers",
  "/job-search": "/careers",
  "/job-availability": "/careers",
  "/upcoming-events": "/events",
  "/blog-archive": "/news",
  "/2024/05/02/news-from-sumhlc": "/news",
  "/category/news": "/news",
  "/category/blog": "/news",
};

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind output is small (~17 KB); inlining it removes a render-blocking request,
    // which matters most for first-time visitors on phones.
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      // Images still served by the legacy WordPress site; move into /public before it is retired.
      { protocol: "https", hostname: "sumhlc.org", pathname: "/wp-content/uploads/**" },
    ],
  },
  // Content files are read at request time when ISR pages revalidate.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  async redirects() {
    return [
      ...Object.entries(legacyPageRedirects).map(([source, destination]) => ({ source, destination, permanent: true })),
      ...legacyPostRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
