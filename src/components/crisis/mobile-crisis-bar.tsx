import { MessageSquareText, Phone } from "lucide-react";
import { bhLink, primaryCrisis } from "@/config/crisis";

/** Sticky call bar on small screens. Pure HTML/CSS, no JavaScript. */
export function MobileCrisisBar() {
  const item =
    "flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-semibold leading-tight hover:bg-white/10";
  return (
    <nav
      aria-label="Crisis hotlines"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-brand-950 pb-[env(safe-area-inset-bottom)] text-white md:hidden"
    >
      <ul className="grid grid-cols-3 divide-x divide-white/15">
        <li>
          <a href={`tel:${primaryCrisis.tel}`} className={item}>
            <Phone className="size-5 text-warm-300" aria-hidden />
            Call 988
          </a>
        </li>
        <li>
          <a href={`sms:${primaryCrisis.sms}`} className={item}>
            <MessageSquareText className="size-5 text-warm-300" aria-hidden />
            Text 988
          </a>
        </li>
        <li>
          <a href={`tel:${bhLink.tel}`} className={item} aria-label="Call BH Link, Rhode Island's 24/7 crisis line">
            <Phone className="size-5 text-warm-300" aria-hidden />
            BH Link
          </a>
        </li>
      </ul>
    </nav>
  );
}
