import "server-only";
import { site } from "@/config/site";

/*
 * Form email delivery through Resend's HTTP API (https://resend.com), no SDK needed.
 * Environment variables (see .env.example):
 *   RESEND_API_KEY  – required in production
 *   MAIL_FROM       – a sender on a domain verified in Resend, e.g. "SUMHLC Website <forms@sumhlc.org>"
 *   MAIL_TO         – optional override; defaults to the site contact email
 */

type Mail = { subject: string; replyTo: string; fields: [label: string, value: string][] };

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendFormEmail({ subject, replyTo, fields }: Mail): Promise<{ ok: boolean }> {
  const text = fields.map(([label, value]) => `${label}:\n${value || "—"}`).join("\n\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">${fields
    .map(([label, value]) => `<tr><th align="left" valign="top">${escape(label)}</th><td>${escape(value || "—").replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail] RESEND_API_KEY not set — would have sent "${subject}":\n${text}`);
      return { ok: true };
    }
    console.error("[mail] RESEND_API_KEY is not configured; form submission was not delivered.");
    return { ok: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "SUMHLC Website <onboarding@resend.dev>",
      to: [process.env.MAIL_TO ?? site.email],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) console.error(`[mail] Resend responded ${res.status}: ${await res.text()}`);
  return { ok: res.ok };
}
