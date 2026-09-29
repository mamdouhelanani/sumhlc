"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { FormState } from "@/app/actions/forms";

/** Announces the result and moves focus to it, so keyboard and screen-reader users hear what happened. */
export function FormStatus({ state }: { state: FormState }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "idle") ref.current?.focus();
  }, [state]);

  if (state.status === "idle" || !state.message) return <div ref={ref} tabIndex={-1} aria-live="polite" />;
  const success = state.status === "success";
  const Icon = success ? CheckCircle2 : AlertCircle;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={success ? "status" : "alert"}
      className={
        success
          ? "flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-brand-900 outline-none"
          : "flex gap-3 rounded-xl border border-destructive/40 bg-red-50 p-4 text-destructive outline-none"
      }
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p className="font-medium">{state.message}</p>
    </div>
  );
}
