"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Heart, LifeBuoy, Menu, X } from "lucide-react";
import { mainNav } from "@/config/nav";

/**
 * Mobile menu built on the native <dialog> element: showModal() provides the
 * focus trap, Escape to close, and an inert background without extra JavaScript.
 */
export function MobileNav() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();
  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.classList.add("menu-open");
  };

  const linkClass =
    "block rounded-md px-2 py-2.5 text-base font-medium text-ink hover:bg-muted aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700";

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={open}
        className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-white hover:bg-muted xl:hidden"
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-menu-title"
        onClose={() => document.documentElement.classList.remove("menu-open")}
        // Clicking the backdrop (the dialog element itself) closes the menu.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-[88vw] max-w-sm bg-white p-0 text-ink shadow-xl backdrop:bg-brand-950/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 id="mobile-menu-title" className="text-lg font-bold">
              Menu
            </h2>
            <button type="button" onClick={close} className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-muted">
              <X className="size-5" aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-6">
              {mainNav.map((section) => (
                <li key={section.title}>
                  {section.items ? (
                    <>
                      <p className="text-xs font-bold tracking-wider text-slate-muted uppercase">{section.title}</p>
                      <ul className="mt-2 space-y-1">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined} className={linkClass}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={section.href} onClick={close} aria-current={pathname === section.href ? "page" : undefined} className={`${linkClass} font-semibold`}>
                      {section.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-2 border-t border-border p-4">
            <Link href="/get-help" onClick={close} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-warm-700 font-semibold text-white hover:bg-warm-800">
              <LifeBuoy className="size-5" aria-hidden /> Get Help Now
            </Link>
            <Link href="/donate" onClick={close} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border font-semibold hover:bg-muted">
              <Heart className="size-5" aria-hidden /> Donate
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
