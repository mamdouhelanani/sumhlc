import "server-only";
import { z } from "zod";
import { readYaml, urlOrPath } from "@/lib/content";

// Organization facts are edited in content/site.yaml (Pages CMS: "Site settings").

const siteSchema = z.strictObject({
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  logo: urlOrPath,
  address: z.strictObject({
    street: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}$/, "Use a 5-digit ZIP code"),
  }),
  phone: z.string().refine((p) => p.replace(/\D/g, "").length === 10, "Use a 10-digit phone number, e.g. 401-521-5759"),
  email: z.email(),
  facebook: z.url(),
  youtube: z.url(),
  newsletterUrl: z.url(),
  paypalUrl: z.url(),
  donationQrCode: urlOrPath,
  // Not published on the old site; shown on /donate once added.
  ein: z.string().nullish().transform((v) => v ?? null),
});

const data = readYaml("site.yaml", siteSchema);
const oneLineAddress = `${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zip}`;

export const site = {
  name: data.name,
  shortName: data.shortName,
  description: data.description,
  url: "https://sumhlc.org",
  logo: { src: data.logo, alt: "SUMHLC logo: two hands reaching toward each other inside a circle" },
  address: {
    ...data.address,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(oneLineAddress)}`,
  },
  phone: { display: data.phone, tel: `+1${data.phone.replace(/\D/g, "")}` },
  email: data.email,
  social: { facebook: data.facebook, youtube: data.youtube },
  newsletterUrl: data.newsletterUrl,
  donate: { paypalUrl: data.paypalUrl, qrCode: data.donationQrCode, ein: data.ein },
} as const;

export const fullAddress = oneLineAddress;
