import Link from "next/link";
import { LifeBuoy } from "lucide-react";
import { bhLink, emergency, primaryCrisis } from "@/config/crisis";
import { PhoneLink } from "./phone-link";
import { DismissCrisisBanner } from "./dismiss-crisis-banner";

/**
 * Site-wide crisis strip. Dismissing it only hides it for the current visit;
 * the header "Get Help Now" button and the mobile call bar always remain.
 */
export function CrisisBanner() {
  return (
    <aside aria-label="Crisis support" className="crisis-banner bg-brand-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <LifeBuoy className="hidden size-4 shrink-0 text-warm-300 sm:block" aria-hidden />
        <p className="min-w-0 flex-1 leading-snug">
          <span className="font-semibold">Need help now?</span>{" "}
          <span>
            Call or text{" "}
            <PhoneLink tel={primaryCrisis.tel!} label="Call the 988 Suicide and Crisis Lifeline" className="text-warm-200">
              988
            </PhoneLink>
          </span>
          <span className="hidden md:inline">
            {" "}
            · BH Link 24/7{" "}
            <PhoneLink tel={bhLink.tel!} label="Call BH Link at 401-414-5465" className="text-warm-200">
              {bhLink.display}
            </PhoneLink>
          </span>
          <span className="hidden lg:inline">
            {" "}
            · In immediate danger, call{" "}
            <PhoneLink tel={emergency.tel} className="text-warm-200">
              {emergency.display}
            </PhoneLink>
          </span>{" "}
          <Link href="/get-help" className="whitespace-nowrap underline underline-offset-4 hover:text-warm-200">
            More crisis resources
          </Link>
        </p>
        <DismissCrisisBanner />
      </div>
    </aside>
  );
}

/** Runs before first paint so a dismissed banner never flashes or shifts layout. */
export const crisisBannerScript = `try{if(sessionStorage.getItem("sumhlc:crisis-banner")==="dismissed")document.documentElement.dataset.crisisBanner="dismissed"}catch(e){}`;
