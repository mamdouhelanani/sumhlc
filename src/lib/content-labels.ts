// Display labels for content enums. Kept separate from content.ts (server-only)
// so client components can use them.

export const resourceCategories = {
  crisis: "Crisis support",
  "support-groups": "Support groups & peer recovery",
  treatment: "Finding treatment",
  guides: "Resource guides",
  "older-adults": "Older adults & memory care",
  insurance: "Health insurance",
  screening: "Self-screening tools",
  handouts: "Handouts & data",
  ccbhc: "Certified Community Behavioral Health Clinics",
  "otp-health-homes": "OTP Health Homes",
} as const;
export type ResourceCategory = keyof typeof resourceCategories;

export const audiences = {
  individuals: "Individuals & families",
  professionals: "Professionals & providers",
} as const;
export type Audience = keyof typeof audiences;

export const serviceLabels = {
  mat: "Medication for addiction treatment (MAT)",
  buprenorphine: "Buprenorphine / Suboxone",
  naltrexone: "Extended-release naltrexone",
  outpatient: "Outpatient counseling",
  "co-occurring": "Co-occurring mental health & substance use",
  crisis: "Crisis & emergency services",
  "health-home": "Opioid treatment program / OTP Health Home",
  veterans: "Veterans only",
} as const;
export type Service = keyof typeof serviceLabels;
