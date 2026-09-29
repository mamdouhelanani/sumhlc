import type { NextConfig } from "next";
import legacyPageRedirects from "./src/config/legacy-page-redirects.json";
import legacyPostRedirects from "./src/config/legacy-post-redirects.json";

// Old WordPress URLs → new routes, so bookmarks and search results keep working.
// Entries that map a path to itself (e.g. "/news") are only used by the asset
// migration script to rewrite links, so they're skipped here.
const pageRedirects = Object.entries(legacyPageRedirects).filter(([source, destination]) => source !== destination);

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind output is small (~17 KB); inlining it removes a render-blocking request,
    // which matters most for first-time visitors on phones.
    inlineCss: true,
  },
  // Content files are read at request time when ISR pages revalidate.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  async redirects() {
    return [
      ...pageRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...legacyPostRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
