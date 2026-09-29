import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const tones = {
  white: "bg-white",
  tint: "bg-brand-50",
  sand: "bg-sand-50",
  navy: "bg-brand-900 text-white",
} as const;

export function Section({
  tone = "white",
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: keyof typeof tones; containerClassName?: string }) {
  return (
    // content-visibility lets the browser skip layout and paint for sections that are
    // still off-screen. Not used on dark sections: automated contrast checkers read
    // unrendered sections as white and would report false failures.
    <section
      className={cn("py-14 sm:py-20", tone !== "navy" && "[contain-intrinsic-size:auto_720px] [content-visibility:auto]", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
  inverse = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={cn("mb-2 text-sm font-bold tracking-wider uppercase", inverse ? "text-warm-300" : "text-warm-700")}>{eyebrow}</p>
        )}
        <h2 id={id} className={cn("text-3xl font-bold tracking-tight sm:text-4xl", inverse && "text-white")}>
          {title}
        </h2>
        {intro && <div className={cn("mt-3 text-lg", inverse ? "text-brand-100" : "text-slate-muted")}>{intro}</div>}
      </div>
      {action}
    </div>
  );
}
