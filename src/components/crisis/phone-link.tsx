import { cn } from "@/lib/utils";

type PhoneLinkProps = {
  tel: string;
  children: React.ReactNode;
  /** Spoken label, e.g. "Call BH Link at 401-414-5465". */
  label?: string;
  sms?: boolean;
  className?: string;
};

/** Tap-to-call (or tap-to-text) link. Every phone number on the site goes through this. */
export function PhoneLink({ tel, children, label, sms = false, className }: PhoneLinkProps) {
  return (
    <a
      href={`${sms ? "sms" : "tel"}:${tel}`}
      aria-label={label}
      className={cn("font-semibold underline-offset-4 hover:underline", className)}
    >
      {children}
    </a>
  );
}
