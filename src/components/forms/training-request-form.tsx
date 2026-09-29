"use client";

import { useActionState } from "react";
import { Loader2, Send } from "lucide-react";
import { type FormState, submitTrainingRequest } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, inputClass } from "./field";
import { FormStatus } from "./form-status";

export function TrainingRequestForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitTrainingRequest, { status: "idle" });
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "success") return <FormStatus state={state} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <FormStatus state={state} />
      <Honeypot />
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Contact name</legend>
        <Field name="firstName" label="First name" required errors={e.firstName}>
          {(p) => <input {...p} type="text" autoComplete="given-name" defaultValue={v.firstName} className={`${inputClass} h-12`} />}
        </Field>
        <Field name="lastName" label="Last name" required errors={e.lastName}>
          {(p) => <input {...p} type="text" autoComplete="family-name" defaultValue={v.lastName} className={`${inputClass} h-12`} />}
        </Field>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Contact email" required errors={e.email}>
          {(p) => <input {...p} type="email" autoComplete="email" defaultValue={v.email} className={`${inputClass} h-12`} />}
        </Field>
        <Field name="organization" label="Group or organization name" required errors={e.organization}>
          {(p) => <input {...p} type="text" autoComplete="organization" defaultValue={v.organization} className={`${inputClass} h-12`} />}
        </Field>
      </div>
      <Field name="participants" label="Estimated number of participants" required errors={e.participants} hint="Groups of 20 or more receive 15% off.">
        {(p) => <input {...p} type="number" inputMode="numeric" min={1} defaultValue={v.participants} className={`${inputClass} h-12 sm:max-w-48`} />}
      </Field>
      <Field name="topics" label="Requested training topic(s)" required errors={e.topics} hint="For example: trauma-informed care, clinical documentation, ethics.">
        {(p) => <input {...p} type="text" defaultValue={v.topics} className={`${inputClass} h-12`} />}
      </Field>
      <Field name="comments" label="Additional comments or requirements" errors={e.comments} hint="Preferred dates, in-person or virtual, CEU boards needed, accessibility needs.">
        {(p) => <textarea {...p} rows={5} defaultValue={v.comments} className={`${inputClass} py-3`} />}
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
        {pending ? "Sending…" : "Submit training request"}
      </Button>
    </form>
  );
}
