import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { CrisisBanner, crisisBannerScript } from "@/components/crisis/crisis-banner";
import { MobileCrisisBar } from "@/components/crisis/mobile-crisis-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/config/site";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", display: "swap" });
// Headings only use bold, so load a single static weight instead of the full variable font.
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["700"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | ${site.name}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.shortName,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#071f31",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} ${sourceSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: crisisBannerScript }} />
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-brand-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to main content
        </a>
        <CrisisBanner />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCrisisBar />
      </body>
    </html>
  );
}
