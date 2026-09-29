import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 rounded-md", className)}>
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-brand-100">
        <Image src={site.logo.src} alt="" width={48} height={48} loading="eager" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn("font-heading text-xl font-bold tracking-tight", inverse ? "text-white" : "text-brand-900")}>
          {site.shortName}
        </span>
        <span className={cn("max-w-56 text-[0.7rem] leading-snug", inverse ? "text-brand-200" : "text-slate-muted")}>
          Substance Use &amp; Mental Health Leadership Council of RI
        </span>
      </span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
