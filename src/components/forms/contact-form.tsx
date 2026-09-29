"use client";

import { useActionState } from "react";
import { Loader2, Send } from "lucide-react";
import { type FormState, submitContact } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, inputClass } from "./field";
import { FormStatus } from "./form-status";

const topics = [
  { value: "general", label: "General question" },
  { value: "membership", label: "Membership" },
  { value: "training", label: "TRAIN ED trainings & CEUs" },
  { value: "otp-health-homes", label: "OTP Health Homes" },
  { value: "media", label: "Media or speaking request" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "success") return <FormStatus state={state} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <FormStatus state={state} />
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required errors={e.name}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={v.name} className={`${inputClass} h-12`} />}
        </Field>
        <Field name="email" label="Email" required errors={e.email}>
          {(p) => <input {...p} type="email" autoComplete="email" defaultValue={v.email} className={`${inputClass} h-12`} />}
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="phone" label="Phone" errors={e.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" defaultValue={v.phone} className={`${inputClass} h-12`} />}
        </Field>
        <Field name="topic" label="What is this about?" required errors={e.topic}>
          {(p) => (
            <select {...p} defaultValue={v.topic || "general"} className={`${inputClass} h-12`}>
              {topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field name="message" label="Message" required errors={e.message} hint="Please don't include private health information.">
        {(p) => <textarea {...p} rows={6} defaultValue={v.message} className={`${inputClass} py-3`} />}
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
