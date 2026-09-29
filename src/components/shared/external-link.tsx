import { ExternalLink as ExternalIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/** Link to another site or a downloadable file, announced as such to screen readers. */
export function ExternalLink({
  href,
  children,
  file,
  className,
  iconClassName,
}: {
  href: string;
  children: React.ReactNode;
  /** e.g. "PDF" — shown after the label. */
  file?: string;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = file ? FileText : ExternalIcon;
  return (
    <a href={href} className={cn("inline-flex items-baseline gap-1 font-medium text-brand-700 underline underline-offset-4 hover:text-brand-900", className)}>
      <span>{children}</span>
      {file && <span className="text-xs font-semibold text-slate-muted no-underline">({file})</span>}
      <Icon className={cn("size-3.5 shrink-0 self-center", iconClassName)} aria-hidden />
      {!file && <span className="sr-only">(external site)</span>}
    </a>
  );
}
