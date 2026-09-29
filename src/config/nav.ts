export type NavLink = { title: string; href: string; description?: string };
export type NavSection = { title: string; href: string; items?: NavLink[] };

export const mainNav: NavSection[] = [
  {
    title: "About Us",
    href: "/about-us",
    items: [
      { title: "About SUMHLC", href: "/about-us", description: "Our mission, and what we do for Rhode Island." },
      { title: "Staff & Leadership", href: "/about-us/staff", description: "The people behind SUMHLC and how to reach them." },
      { title: "Recovery Friendly Workplace", href: "/about-us/recovery-friendly-workplace", description: "Our state designation and what it means." },
      { title: "Careers in Behavioral Health", href: "/careers", description: "Open positions at our member organizations." },
    ],
  },
  {
    title: "Resources & Locator",
    href: "/resources",
    items: [
      { title: "Resource Directory", href: "/resources", description: "Search guides, support groups, handouts and more." },
      { title: "Treatment Locator", href: "/resources/treatment", description: "Find treatment by service, medication and town." },
      { title: "Residential Bed Availability", href: "/resources/bed-availability", description: "Live open-bed data for Rhode Island." },
      { title: "Self-Help Screening", href: "/resources/self-help", description: "Free, private screening tools." },
      { title: "OTP Health Homes", href: "/programs/otp-health-homes", description: "Providers, training and staff forms." },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
    items: [
      { title: "Membership Tiers", href: "/membership", description: "Compare benefits and download an application." },
      { title: "Member Directory", href: "/membership/directory", description: "Rhode Island organizations in our network." },
    ],
  },
  {
    title: "Events & Trainings",
    href: "/trainings",
    items: [
      { title: "TRAIN ED Schedule", href: "/trainings", description: "Live, accredited CE trainings for licensed professionals." },
      { title: "Request a Group Training", href: "/trainings/request", description: "15% off for groups of 20 or more." },
      { title: "Licensure & CEU Resources", href: "/trainings/licensure", description: "Boards, renewal hours and certification links." },
      { title: "Community Events", href: "/events", description: "Conferences, rallies and gatherings." },
      { title: "News", href: "/news", description: "Announcements, op-eds and press." },
      { title: "Recovery TV", href: "/recovery-tv", description: "Our YouTube channel on recovery and wellness." },
    ],
  },
  { title: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Get support",
    links: [
      { title: "Get help now", href: "/get-help" },
      { title: "Resource directory", href: "/resources" },
      { title: "Treatment locator", href: "/resources/treatment" },
      { title: "Bed availability", href: "/resources/bed-availability" },
      { title: "Self-help screening", href: "/resources/self-help" },
    ],
  },
  {
    title: "For professionals",
    links: [
      { title: "TRAIN ED schedule", href: "/trainings" },
      { title: "Group training request", href: "/trainings/request" },
      { title: "Licensure resources", href: "/trainings/licensure" },
      { title: "OTP Health Homes", href: "/programs/otp-health-homes" },
      { title: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Organization",
    links: [
      { title: "About us", href: "/about-us" },
      { title: "Staff & leadership", href: "/about-us/staff" },
      { title: "Membership", href: "/membership" },
      { title: "Member directory", href: "/membership/directory" },
      { title: "News", href: "/news" },
      { title: "Donate", href: "/donate" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Accessibility", href: "/accessibility" },
  { title: "Contact", href: "/contact" },
];
