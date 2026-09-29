import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { bhLink } from "@/config/crisis";

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-28">
      <p className="text-sm font-bold tracking-wider text-warm-700 uppercase">Page not found</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-muted">
        It may have moved when we rebuilt our website. Try one of these instead — or if you need help right now, call or text 988, or
        call BH Link at{" "}
        <a href={`tel:${bhLink.tel}`} className="font-semibold text-warm-700 underline">
          {bhLink.display}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/resources">Resources</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </Container>
  );
}
