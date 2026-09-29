const TZ = "America/New_York";

/** "2026-09-30" → Date at noon Eastern, so the calendar day never shifts. */
const toDate = (iso: string) => new Date(`${iso}T12:00:00-04:00`);

export function formatDate(iso: string, style: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  }).format(toDate(iso));
}

export function formatWeekday(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long" }).format(toDate(iso));
}

export function dateParts(iso: string) {
  const d = toDate(iso);
  const part = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(d);
  return { month: part({ month: "short" }), day: part({ day: "numeric" }), weekday: part({ weekday: "short" }) };
}

/** "13:30" → "1:30 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatTimeRange(start: string | null, end: string | null): string | null {
  if (!start) return null;
  return end ? `${formatTime(start)} – ${formatTime(end)} ET` : `${formatTime(start)} ET`;
}

/** Turns any human-written US number into a tel: URI, or null if it isn't one. */
export function telHref(phone: string): string | null {
  const digits = phone.replace(/ext.*$/i, "").replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return null;
}

export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
