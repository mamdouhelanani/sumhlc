"use client";

import { X } from "lucide-react";

export function DismissCrisisBanner() {
  function dismiss() {
    document.documentElement.dataset.crisisBanner = "dismissed";
    try {
      sessionStorage.setItem("sumhlc:crisis-banner", "dismissed");
    } catch {
      // Storage blocked (private mode): the banner simply returns on the next page.
    }
    document.getElementById("main")?.focus();
  }

  return (
    <button
      type="button"
      onClick={dismiss}
      className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-md text-brand-200 hover:bg-white/10 hover:text-white"
    >
      <X className="size-4" aria-hidden />
      <span className="sr-only">Hide this crisis banner for this visit</span>
    </button>
  );
}
