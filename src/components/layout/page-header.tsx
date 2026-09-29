import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";

type Crumb = { title: string; href: string };

export function PageHeader({
  title,
  intro,
  eyebrow,
  breadcrumbs = [],
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white">
      <Container className="py-10 sm:py-14">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-muted">
              <li>
                <Link href="/" className="hover:text-brand-700 hover:underline">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3.5" aria-hidden />
                  <Link href={crumb.href} className="hover:text-brand-700 hover:underline">
                    {crumb.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="mb-2 text-sm font-bold tracking-wider text-warm-700 uppercase">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-3xl text-lg text-slate-muted">{intro}</div>}
        {children}
      </Container>
    </div>
  );
}
