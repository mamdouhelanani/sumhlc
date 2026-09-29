"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * Desktop navigation using the WAI-ARIA disclosure pattern: each section is a
 * button that shows or hides a list of links. Closes on Escape, outside click,
 * or when focus leaves the section. No third-party code.
 */
export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      navRef.current?.querySelector<HTMLButtonElement>(`[data-section="${open}"]`)?.focus();
      setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const itemClass = "inline-flex h-11 items-center gap-1 rounded-lg px-3 text-[0.95rem] font-medium text-ink hover:bg-muted";

  return (
    <nav ref={navRef} aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {mainNav.map((section, i) => {
          if (!section.items) {
            const active = isActive(pathname, section.href);
            return (
              <li key={section.title}>
                <Link href={section.href} aria-current={active ? "page" : undefined} className={cn(itemClass, active && "text-brand-700")}>
                  {section.title}
                </Link>
              </li>
            );
          }
          const expanded = open === section.title;
          const panelId = `nav-panel-${i}`;
          return (
            <li
              key={section.title}
              className="relative"
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(section.title)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setOpen((o) => (o === section.title ? null : o))}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen((o) => (o === section.title ? null : o));
              }}
            >
              <button
                type="button"
                data-section={section.title}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : section.title)}
                className={cn(
                  itemClass,
                  expanded && "bg-muted",
                  section.items.some((item) => isActive(pathname, item.href)) && "text-brand-700",
                )}
              >
                {section.title}
                <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} aria-hidden />
              </button>
              {/* pt-2 bridges the gap so the panel stays open while the mouse moves into it */}
              <div id={panelId} hidden={!expanded} className="absolute top-full left-0 z-50 pt-2">
                <ul className="grid w-[26rem] gap-1 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={() => setOpen(null)}
                        className="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-brand-50 aria-[current=page]:bg-brand-50"
                      >
                        <span className="font-semibold text-brand-900">{item.title}</span>
                        {item.description && <span className="text-sm leading-snug text-slate-muted">{item.description}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
