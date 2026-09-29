// The ONLY place crisis numbers are defined. The banner, header, mobile call bar,
// footer and /get-help all read from here.
// ⚠ SUMHLC must confirm every number before launch (see docs/site-audit.md §4).

export type CrisisLine = {
  id: string;
  name: string;
  description: string;
  display: string;
  tel?: string;
  sms?: string;
  url?: string;
  availability: string;
};

export const crisisLines: CrisisLine[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support for anyone in emotional distress, a mental health or substance use crisis, or thinking about suicide.",
    display: "988",
    tel: "988",
    sms: "988",
    url: "https://988lifeline.org",
    availability: "Call or text, 24/7",
  },
  {
    id: "bh-link",
    name: "BH Link",
    description: "Rhode Island's statewide behavioral health crisis hotline. Trained staff can talk you through a crisis and connect you to care.",
    display: "(401) 414-LINK (5465)",
    tel: "+14014145465",
    url: "https://www.bhlink.org/",
    availability: "Call, 24/7",
  },
  {
    id: "kids-link",
    name: "Kids' Link RI",
    description: "Behavioral health triage and referral for children and teens.",
    display: "1-855-543-5465",
    tel: "+18555435465",
    availability: "Call, 24/7",
  },
];

export const bhLinkTriage = {
  name: "BH Link Triage Center",
  description:
    "A 24/7 community-based walk-in and drop-off center where clinicians connect people to immediate, stabilizing behavioral health services and longer-term care.",
  url: "https://www.bhlink.org/",
};

export const emergency = { display: "911", tel: "911" };

/** Crisis units run by SUMHLC members (from the old /treatment/ page). */
export const localCrisisServices: { name: string; phone: string; hours?: string }[] = [
  { name: "The Providence Center — Crisis Stabilization Unit", phone: "401-383-5150", hours: "24 hours a day, 7 days a week" },
  { name: "East Bay Center — 24-Hour Emergency Services", phone: "401-246-0700", hours: "24 hours a day" },
  { name: "Community Care Alliance — Acute Stabilization Unit", phone: "401-235-7120" },
];

export const primaryCrisis = crisisLines[0];
export const bhLink = crisisLines[1];
