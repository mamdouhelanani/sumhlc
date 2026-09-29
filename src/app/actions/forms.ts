"use server";

import { z } from "zod";
import { site } from "@/config/site";
import { sendFormEmail } from "@/lib/mail";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (label: string, max = 200) => text(max).min(1, `${label} is required.`);

/** Bots fill the hidden "website" field; humans never see it. */
function isSpam(formData: FormData) {
  return String(formData.get("website") ?? "").length > 0;
}

function valuesOf(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));
}

const failure = (values: Record<string, string>): FormState => ({
  status: "error",
  values,
  message: `Sorry — we couldn't send your message. Please email us directly at ${site.email} or call ${site.phone.display}.`,
});

/* ─────────────── Contact ─────────────── */

const contactSchema = z.object({
  name: required("Your name"),
  email: z.email("Enter a valid email address, like name@example.com."),
  phone: text(40).optional(),
  topic: z.enum(["general", "membership", "training", "otp-health-homes", "media", "other"]),
  message: required("A message", 5000),
});

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = valuesOf(formData, ["name", "email", "phone", "topic", "message"]);
  if (isSpam(formData)) return { status: "success" };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", values, errors: z.flattenError(parsed.error).fieldErrors, message: "Please fix the highlighted fields." };
  }
  const d = parsed.data;
  const { ok } = await sendFormEmail({
    subject: `Website contact (${d.topic}): ${d.name}`,
    replyTo: d.email,
    fields: [
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone ?? ""],
      ["Topic", d.topic],
      ["Message", d.message],
    ],
  });
  return ok ? { status: "success", message: "Thank you — your message has been sent. We'll get back to you as soon as we can." } : failure(values);
}

/* ─────────────── Group training request ─────────────── */

const trainingSchema = z.object({
  firstName: required("First name", 100),
  lastName: required("Last name", 100),
  email: z.email("Enter a valid email address, like name@example.com."),
  organization: required("Organization name"),
  participants: z.coerce.number({ error: "Enter a number." }).int("Enter a whole number.").min(1, "Enter at least 1 participant.").max(5000),
  topics: required("Training topic(s)", 1000),
  comments: text(5000).optional(),
});

export async function submitTrainingRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = valuesOf(formData, ["firstName", "lastName", "email", "organization", "participants", "topics", "comments"]);
  if (isSpam(formData)) return { status: "success" };

  const parsed = trainingSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", values, errors: z.flattenError(parsed.error).fieldErrors, message: "Please fix the highlighted fields." };
  }
  const d = parsed.data;
  const { ok } = await sendFormEmail({
    subject: `Group training request: ${d.organization} (${d.participants} participants)`,
    replyTo: d.email,
    fields: [
      ["Contact name", `${d.firstName} ${d.lastName}`],
      ["Email", d.email],
      ["Organization", d.organization],
      ["Estimated participants", String(d.participants)],
      ["Requested topic(s)", d.topics],
      ["Additional comments", d.comments ?? ""],
    ],
  });
  return ok
    ? {
        status: "success",
        message: `Thank you — your request has been sent. Our training team will contact you to schedule your session${d.participants >= 20 ? " and apply your 15% group discount" : ""}.`,
      }
    : failure(values);
}
