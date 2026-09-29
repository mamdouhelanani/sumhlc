import "server-only";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { z } from "zod";
import { type ResourceCategory, type Service, resourceCategories, serviceLabels } from "./content-labels";

export * from "./content-labels";

/*
 * Content layer. Everything editable lives in /content as YAML or Markdown — edited
 * by hand or through Pages CMS (.pages.yml) — and is validated here. A typo in a URL,
 * date or field name fails the build instead of shipping a broken page.
 *
 * Pages CMS removes fields that are left blank, so every optional field accepts a
 * missing key. Objects are strict: an unknown key (usually a typo, or text split by
 * an unquoted comma) is an error rather than being silently ignored.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Optional value: missing, null or "" all become null. */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === "" ? null : v), schema.nullish()).transform((v) => v ?? null);

const isoDate = z.iso.date();
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour time, e.g. 13:30");
const url = z.url({ protocol: /^https?$/ });
/** A full web address, or a file uploaded to the site (e.g. /uploads/guide.pdf). */
export const urlOrPath = z.union([url, z.string().regex(/^\/(?!\/)\S+$/, "Use a full web address or an uploaded /uploads/… file")]);
const optionalText = optional(z.string());
const optionalUrl = optional(url);
const optionalUrlOrPath = optional(urlOrPath);
const list = <T extends z.ZodType>(schema: T) => z.array(schema).nullish().transform((v) => v ?? []);

export function readYaml<T extends z.ZodType>(file: string, schema: T): z.output<T> {
  const raw = YAML.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid content in content/${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function memo<T>(load: () => T): () => T {
  let value: T | undefined;
  return () => (value ??= load());
}

/** Today's date in Rhode Island, as YYYY-MM-DD. */
export function todayInRI(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ─────────────────────────── Locations (shared) ─────────────────────────── */

const location = z.strictObject({
  label: optionalText,
  street: optionalText,
  city: optionalText,
  state: optional(z.string().length(2)).transform((v) => v ?? "RI"),
  zip: optional(z.string().regex(/^\d{5}$/, "Use a 5-digit ZIP code")),
  phone: optionalText,
  note: optionalText,
});
export type Location = z.output<typeof location>;

/* ─────────────────────────────── Trainings ─────────────────────────────── */

const training = z.strictObject({
  title: z.string(),
  date: optional(isoDate),
  startTime: optional(time),
  endTime: optional(time),
  note: optionalText,
  trainer: optionalText,
  format: z.enum(["virtual", "in-person", "hybrid"]),
  location: optionalText,
  ceus: optional(z.number().positive()),
  credits: list(z.string()),
  price: optionalText,
  description: optionalText,
  registerUrl: optionalUrl,
});
export type Training = z.output<typeof training> & { slug: string };

export const getAllTrainings = memo((): Training[] =>
  readYaml("trainings.yaml", z.strictObject({ trainings: list(training) })).trainings.map((t) => ({
    ...t,
    slug: `${slugify(t.title)}${t.date ? `-${t.date}` : ""}`,
  })),
);

/** Upcoming trainings in date order; date-TBA trainings come last. */
export function getUpcomingTrainings(limit?: number): Training[] {
  const today = todayInRI();
  const upcoming = getAllTrainings()
    .filter((t) => t.date === null || t.date >= today)
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999") || (a.startTime ?? "").localeCompare(b.startTime ?? ""));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/* ─────────────────────────────── Resources ─────────────────────────────── */

const resource = z.strictObject({
  title: z.string(),
  url: urlOrPath,
  kind: z.enum(["website", "pdf", "docx", "video", "folder", "course", "phone"]),
  category: z.enum(Object.keys(resourceCategories) as [ResourceCategory, ...ResourceCategory[]]),
  audience: z.array(z.enum(["individuals", "professionals"])).min(1, "Choose at least one audience"),
  description: z.string(),
  source: optionalText,
  tags: list(z.string()),
});
export type Resource = z.output<typeof resource> & { id: string };

export const getResources = memo((): Resource[] =>
  readYaml("resources.yaml", z.strictObject({ resources: list(resource) })).resources.map((r, i) => ({ ...r, id: `${slugify(r.title)}-${i}` })),
);

/* ─────────────────────────── Treatment providers ─────────────────────────── */

const provider = z.strictObject({
  name: z.string(),
  website: optionalUrl,
  member: optional(z.boolean()).transform((v) => v ?? false),
  services: z.array(z.enum(Object.keys(serviceLabels) as [Service, ...Service[]])).min(1, "Choose at least one service"),
  summary: optionalText,
  locations: z.array(location).min(1, "Add at least one location"),
  internalNote: optionalText,
});
export type Provider = z.output<typeof provider> & { id: string };

export const getProviders = memo((): Provider[] =>
  readYaml("providers.yaml", z.strictObject({ providers: list(provider) }))
    .providers.map((p) => ({ ...p, id: slugify(p.name) }))
    .sort((a, b) => a.name.localeCompare(b.name)),
);

/* ─────────────────────────────── Members ─────────────────────────────── */

const member = z.strictObject({
  name: z.string(),
  tier: z.enum(["full", "associate"]),
  website: optionalUrl,
  logo: optionalUrlOrPath,
  locations: list(location),
  internalNote: optionalText,
});
export type Member = z.output<typeof member> & { id: string };

export const getMembers = memo((): Member[] =>
  readYaml("members.yaml", z.strictObject({ members: list(member) }))
    .members.map((m) => ({ ...m, id: slugify(m.name) }))
    .sort((a, b) => a.name.localeCompare(b.name)),
);

/* ─────────────────────────────── Membership ─────────────────────────────── */

const tier = z.strictObject({
  id: z.enum(["full", "associate", "single"]),
  name: z.string(),
  tagline: z.string(),
  audience: z.string(),
  /** null = not published yet; the page shows "Contact us for dues". */
  price: optionalText,
  priceNote: optionalText,
  applicationUrl: urlOrPath,
  badge: optionalText,
});
/** "yes" → included, "no" or blank → not included, anything else is shown as a short note. */
const benefitValue = z
  .union([z.boolean(), z.string()])
  .nullish()
  .transform((v): boolean | string => {
    if (v === null || v === undefined || v === false) return false;
    if (v === true) return true;
    const s = v.trim();
    if (/^(yes|true|y|✓)$/i.test(s)) return true;
    if (/^(no|false|n|-|—)?$/i.test(s)) return false;
    return s;
  });
const membership = z.strictObject({
  applyEmail: z.email(),
  tiers: z.array(tier).length(3, "There must be exactly three tiers: full, associate and single"),
  benefits: list(z.strictObject({ label: z.string(), full: benefitValue, associate: benefitValue, single: benefitValue })),
});
export type MembershipTier = z.output<typeof tier>;
export const getMembership = memo(() => readYaml("membership.yaml", membership));

/* ─────────────────────────────── People ─────────────────────────────── */

const person = z.strictObject({
  name: z.string(),
  credentials: optionalText,
  titles: z.array(z.string()).min(1, "Add at least one title"),
  phone: optionalText,
  mobile: optionalText,
  email: z.email(),
  photo: optionalUrlOrPath,
});
export type Person = z.output<typeof person>;
export const getStaff = memo(() => readYaml("staff.yaml", z.strictObject({ staff: list(person) })).staff);

/* ─────────────────────────────── Events ─────────────────────────────── */

const event = z.strictObject({
  title: z.string(),
  date: optional(isoDate),
  dateNote: optionalText,
  time: optionalText,
  venue: optionalText,
  organizer: optionalText,
  description: z.string(),
  url: optionalUrl,
});
export type CommunityEvent = z.output<typeof event>;
export const getEvents = memo(() =>
  readYaml("events.yaml", z.strictObject({ events: list(event) })).events.sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999")),
);

/* ─────────────────────────────── Careers ─────────────────────────────── */

const employer = z.strictObject({ name: z.string(), url, member: optional(z.boolean()).transform((v) => v ?? true) });
export const getEmployers = memo(() =>
  readYaml("careers.yaml", z.strictObject({ employers: list(employer) })).employers.sort((a, b) => a.name.localeCompare(b.name)),
);

/* ─────────────────────────── Licensure resources ─────────────────────────── */

const linkItem = z.strictObject({ label: z.string(), url, description: optionalText });
export const getLicensure = memo(() =>
  readYaml(
    "licensure.yaml",
    z.strictObject({
      ceuRequirements: list(z.strictObject({ license: z.string(), hours: z.string(), period: z.string() })),
      groups: list(z.strictObject({ title: z.string(), intro: optionalText, links: list(linkItem) })),
    }),
  ),
);

/* ─────────────────────────── OTP Health Homes ─────────────────────────── */

export const getHealthHomes = memo(() =>
  readYaml(
    "otp-health-homes.yaml",
    z.strictObject({
      training: z.strictObject({ selfPacedUrl: url, videoUrl: url, videoEmbedUrl: url }),
      providers: list(z.strictObject({ name: z.string(), website: optionalUrl, locations: z.array(location).min(1) })),
    }),
  ),
);
