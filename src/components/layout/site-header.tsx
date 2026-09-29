import Link from "next/link";
import { Heart, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* The long name wraps badly on phones and crowds the full desktop menu. */}
        <Logo subtitleClassName="hidden sm:block xl:hidden" />
        <MainNav />
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden border-brand-200 text-brand-800 sm:inline-flex">
            <Link href="/donate">
              <Heart aria-hidden /> Donate
            </Link>
          </Button>
          <Button asChild variant="crisis">
            <Link href="/get-help">
              <LifeBuoy aria-hidden />
              <span className="hidden sm:inline">Get Help Now</span>
              <span className="sm:hidden">Get Help</span>
            </Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
