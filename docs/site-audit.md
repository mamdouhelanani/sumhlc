# SUMHLC.org — Content & Architecture Audit

Audited 2026-09-28. 19 pages on sumhlc.org + 2 on trainedprogram.net (TRAIN ED, Wix). Text-only crawl: colors, performance, and visual layout were not measured.

---

## 1. Key findings that shape the rebuild

1. **Crisis help is nearly invisible.** BH Link appears once, inside a tab on `/resources/`, written as "414-LINK; 414-5465" — no 401 area code, not a `tel:` link. **988 appears nowhere.** No banner, no header/footer hotline.
2. **Training lives on a different site.** Menu item "TRAIN ED" (`/trainrischedule/`) 301-redirects to `trainedprogram.net` (Wix, separate nav/branding). The request form calls it "TRAIN RI". Self-paced OTP HH training is on Google Sites; printables on Google Drive.
3. **Pages the brief expects don't exist:** no Contact page, no Donate page, no Board list, no general inbox (only `selanani@sumhlc.org`), no privacy policy / accessibility statement, no site search.
4. **Membership is incomplete:** Full Board dues are "tiered by annual revenue" but no amounts are published. Applications are `.docx` downloads to be emailed; no online form or payment.
5. **News is split three ways:** "News & More" → a dated post URL (`/2024/05/02/news-from-sumhlc/`), a duplicate `/news/` ("News Original"), and a stale `/blog-archive/` (last post Mar 2025). No pagination.
6. **Directory data is duplicated and error-prone:** Treatment, Member Organizations, and OTP HH repeat the same providers with conflicting/garbled details.
7. **Site has more scope than the brief lists:** OTP Health Homes initiative, live Residential Bed Availability, Recovery TV, Careers, Recovery Friendly Workplace. All need a home in the new IA.

---

## 2. Current navigation

- **About Us** `/about-us/`
  - SUMHLC Staff Directory `/staff-directory/`
  - Membership `/membership/`
  - Recovery Friendly Workplace `/recovery-friendly-workplace/`
  - Member Organizations `/member-organizations/`
- **TRAIN ED** `/trainrischedule/` → 301 to `https://www.trainedprogram.net/`
  - TRAIN ED Home (Wix)
  - Community Training Request Form `/community-training-request-form/`
- **Resources** `/resources/`
  - Self-Help Tools `/self-help-tools/`
- **OTP HH** `/otp-hh-initiative/`
- **Treatment** `/treatment/`
  - Residential Availability `/treatment/residential-availability/`
- **Recovery TV** `/recovery-tv/`
- **Careers** `/discover-jobs/`
- **News & More** `/2024/05/02/news-from-sumhlc/`
  - Upcoming Events `/upcoming-events/`
  - Blog Archive `/blog-archive/`

Global: PayPal legacy GIF "Donate" button in header (no alt text). Footer: logo, org name, address, phone (`tel:`), Facebook only.

---

## 3. Page inventory

| Page | Purpose | Notable content | Issues |
|---|---|---|---|
| `/` | Home | Mission line; "Collaboration / Advocacy / Training"; 3 feature cards (Training → TRAIN ED, Resources, Client-Driven Services → Treatment); 3 latest news; Constant Contact signup | No crisis info; 2 news cards lack excerpts |
| `/about-us/` | Mission | "We provide" list; links to staff / RFW / members; donation copy (PayPal, QR code, mail) | Copy refers to a Donate button "below" that doesn't exist; no board/history |
| `/staff-directory/` | Staff | 4 staff cards | No board |
| `/membership/` | Tiers | 3 pricing cards + `.docx` applications | Full Board dues missing; "Popular" badge on two cards; price renders "$ 300 00" |
| `/recovery-friendly-workplace/` | Designation | Full text of 2020 Governor's letter | Old address; truncated sentence |
| `/member-organizations/` | Directory | 29 Full + 16 Associate members w/ addresses, phones, sites, logos | Many data errors (see §10) |
| `/community-training-request-form/` | Group training request | WPForms: name, email, org, # participants, topics, comments; 15% off 20+ | Named "TRAIN RI"; JS-only form; emoji-heavy |
| `/resources/` | Resource hub | Tabs: BH Link · Support & Resource Guides · Elder Resources · Affordable Insurance · CCBHC · Helpful Handouts | Typo "Behaviorial"; 2 broken links; content hidden in tabs |
| `/self-help-tools/` | Screening | DAST-10 PDF only | Single 2014 PDF; typo "Down load" |
| `/otp-hh-initiative/` | OTP Health Homes program | Tabs: Providers · Self-paced training (Google Sites) · HH 101 video · Resources · Staff Forms (4 PDFs) | Links Apr 2025 resource guide (Resources page has Aug 2026); "Add Widgets in Right Sidebar" placeholder |
| `/treatment/` | Provider directory | Tabs by service/MOUD type; BHDDH licensed-provider link; crisis unit numbers in last tab | Two H1s; typos; "Substance Abuse" wording; duplicates member list; placeholder widget text |
| `/treatment/residential-availability/` | Live bed table | ~50 rows from ribhopenbeds.org, filters by provider/bed type/status/service/setting | No heading, intro, or data-source note |
| `/recovery-tv/` | Media | YouTube channel link; Substack mention | Images no alt; Substack "Click here" has no link |
| `/discover-jobs/` | Careers | External careers links for ~11 member orgs | Typo "Gailee"; tracking params in URLs |
| `/news/`, `/2024/05/02/news-from-sumhlc/` | News | Same 12 post cards | Duplicate pages; no pagination |
| `/upcoming-events/` | Events | 14 past-event photos; 3 event blurbs | Filename alt text; past event still listed; `utm_source=chatgpt.com` in link |
| `/blog-archive/` | Blog | 6 posts Apr 2024 – Mar 2025 | Stale; separate from News |

### TRAIN ED (trainedprogram.net, Wix)
- "Continuing Education for the Licensed Professional"; "over 30 years of experience"; stats: 1,500 professionals trained/yr, 3k+ CE hours.
- Schedule grouped by month: title, date/time, description, CEU breakdown, trainer, "Zoom/Virtual", **Register** → Zoom webinar registration.
- CEU approvals: NASW-RI, RI Certification Board, RIMHCA, NBCC, NAADAC (Approved Education Provider #339978).
- Placeholder social links (generic facebook.com / youtube.com / linkedin.com).

---

## 4. Crisis & help information

**Currently on site:**
- BH Link hotline "414-LINK; 414-5465" + BH Link Triage Center (24/7 walk-in) → bhlink.org — `/resources/` tab only.
- Community Care Alliance Acute Stabilization Unit: 401-235-7120
- East Bay Center 24-Hour Emergency Services: 401-246-0700
- Providence Center Crisis Stabilization Unit: 401-383-5150 (24/7)

**Proposed for the rebuild (⚠ every number must be verified by SUMHLC before launch):**
- 988 Suicide & Crisis Lifeline — call or text 988
- BH Link — (401) 414-LINK (5465), 24/7; Triage Center walk-in
- Kids' Link RI — 1-855-543-5465 (youth)
- 911 for immediate danger

---

## 5. Organization facts

- **Name:** The Substance Use and Mental Health Leadership Council of Rhode Island (SUMHLC). Variants in use: "…of RI", "The Leadership Council of RI".
- **Mission (paraphrase):** promote a collaborative, coordinated system of high-quality, comprehensive, community-based mental health and substance use prevention and treatment services — driven by the needs of members' clients and communities, through collaboration, advocacy, and training.
- **Address:** 15 Messenger Drive, 1st Floor, Warwick, RI 02888 (old: 200 Metro Center Blvd Unit 10, Warwick 02886 — remove everywhere)
- **Phone:** 401-521-5759
- **Email:** no general inbox published
- **Social:** Facebook `facebook.com/theleadershipcouncil/`; YouTube `youtube.com/channel/UCTGgVDR-RnwNyOEC7jmV4Ow`; Substack (URL unknown)
- **Newsletter:** Constant Contact `https://lp.constantcontactpages.com/sl/YT3tLmc`
- **Logos:** `/wp-content/uploads/2024/01/SUMHLC_Logo-150x150.png`, `/wp-content/uploads/2024/01/sumhlc-logo-square-150x150.png`, `/wp-content/uploads/2024/04/sumhlcLogoSmall.png`, `/wp-content/uploads/2024/03/logo.png` — need a vector (SVG) original.

---

## 6. Membership

| Tier | Dues | Audience | Benefits | Application |
|---|---|---|---|---|
| Full Board | Tiered by annual revenue — **amounts not published** | Provider organizations | Legislative alerts & funding updates; professional development, roundtables, networking; website promotion, conference room use, volunteer opportunities, business discounts; voting board seat (implied) | `/wp-content/uploads/2026/03/MEMBERSHIP-APPLICATION1.docx` |
| Associate | $1,150/yr | Partners supporting the field "behind the scenes" | Funding & policy alerts; networking, roundtables, forums; professional development, volunteering, conference & training space | `/wp-content/uploads/2026/03/Associatememberfinal.docx` |
| Single (new, Mar 2026) | $300/yr | Individual professionals, small private practices | SUMHLC communications; attend full board meetings (non-voting); "SUMHLC Proud Member" logo | `/wp-content/uploads/2026/03/SingleMembershipApplication2026.docx` |

Process today: download `.docx` → email to selanani@sumhlc.org.

---

## 7. Staff (no board listed anywhere)

| Name | Title | Phone | Email |
|---|---|---|---|
| John J. Tassoni, Jr. | President/CEO | 401-521-5759 (cell 401-451-1305) | jtassoni@sumhlc.org |
| Sophia Elanani, BA | Director of Training; OTP Health Home Coordinator | 401-572-1257 | selanani@sumhlc.org |
| Nicole Rouleau | Administrative Assistant | 401-521-5759 | nrouleau@sumhlc.org |
| Wendy Looker, RN, BS | OTP Health Home Administrator | 401-521-5759 | wlooker@sumhlc.org |

---

## 8. Resource inventory (for the searchable directory)

**Crisis:** BH Link hotline + triage center (bhlink.org)

**Support & guides**
- Prevent Overdose RI — preventoverdoseri.org
- SAMHSA — linked as samhsa.org → fix to **samhsa.gov**
- RICARES
- Peer support: Anchor Recovery (**404**), NAMI RI support groups, PSNRI peer support meetings, RI Alcoholics Anonymous
- PDFs: Lifespan Emergency Resource Guide (2017 — stale), HH Resource Guide Aug 2026 (`/wp-content/uploads/2026/08/HH-Resource-Guide-August-2026.pdf`), RI Prevention Resource Guide 2019 (**404**)

**Elder & memory care**
- rielderinfo.com
- Grands Flourish Inc. (grandparents raising grandchildren affected by substance use)
- memorycare.com — memory care in RI
- PayingForSeniorCare.com — assisted living Warwick; RI assisted living & home care costs

**Insurance:** AffordableHealthInsurance.com guides — Medicare, Medicaid, coverage for the unemployed

**CCBHC:** "The ABC's of CCBHC" PDF; Horizon Healthcare Partners; National Council for Mental Wellbeing; SAMHSA CCBHC

**Handouts (PDF):** NARR Levels (`/wp-content/uploads/2025/08/NARR-Levels-1.pdf`); BHDDH 2024 Adult Behavioral Health in RI snapshot (`/wp-content/uploads/2025/08/2024-Snapshot-Adult-Behavioral-Health-in-RI-V5-Fina.pdf`)

**Self-help:** DAST-10 screening (`/wp-content/uploads/2024/04/DrugAbuseScreeningTest_2014Mar24.pdf`)

**OTP Health Homes**
- Providers: BHG (Providence, Johnston, Pawtucket, Middletown, Westerly); Addiction Recovery Institute (Pawtucket, Warwick); CODAC (Cranston, Royal Little Providence, East Bay, Newport, South County); VICTA (Providence); Discovery House (Providence, Woonsocket)
- Self-paced training: sites.google.com/view/otphhoverview101/home
- Printables: Google Drive folder
- Staff forms (`/wp-content/uploads/2025/03/`): Patient-Centered Plan of Care; Receive or Resume; Eligibility & Follow-up; Opt-out

**Treatment:** BHDDH licensed provider list (bhddh.ri.gov/substance-useaddiction) + hand-typed provider lists by MOUD/service type.

**Bed availability:** live data from ribhopenbeds.org (investigate whether an API/embed is available).

---

## 9. News & events

**News (12 posts, newest first):** CEO on Chaos in Recovery (Aug 2026) · RIHEBC capital grant (Jun 2026) · Single Membership (Mar 2026) · community statement (Dec 2025) · MADD Awards 2025 · Rally 4 Recovery 2025 · Bob Houghtaling Foundation (Aug 2025) · Speaker Shekarchi check presentation (Jul 2025) · insurance credentialing workshop (May 2025) · NatCon 2025 · The Rhode Show (Apr 2025) · President's speech, Pawtucket Country Club (Mar 2025)

**Blog Archive (6 posts, Apr 2024 – Mar 2025):** cannabis op-ed · 50% off CE · Legislative Recap 2024 · MOUD prescribing · Rethinking Return to Use · "We Cannot Wait on Rate Reform"

**Events:** static text — RI-PREVCON 2026 (Sep 29, 2026, Crowne Plaza Warwick), Cape Cod Symposium on Addiction Disorders (Providence 2026, no date), Rally4Recovery (Sep 19, 2026 — past).

---

## 10. Donations

- PayPal hosted donate button, ID `A9RBQ4FWZKC4Y` → `https://www.paypal.com/donate/?hosted_button_id=A9RBQ4FWZKC4Y`
- QR code image (`/wp-content/uploads/2025/01/QR-Code.png`); checks by mail to 15 Messenger Drive
- "Tax-deductible" stated; no EIN, impact statement, or recurring-gift option shown.

---

## 11. Cleanup checklist (fix during migration)

**Broken / wrong links**
- [ ] Anchor Recovery page (404)
- [ ] RI Prevention Resource Guide 2019 (404)
- [ ] SAMHSA → samhsa.gov
- [ ] Replace 2017 Lifespan guide or mark as archived
- [ ] OTP HH: link the current HH Resource Guide
- [ ] Substack link missing
- [ ] Strip `utm_source=chatgpt.com` and HubSpot tracking params

**Member Organizations data**
- [ ] Blackstone Valley Prevention Coalition shows AdCare's address/phone
- [ ] Run-together phones: Child & Family "(401) 781-36692020"; East Bay "(401) 848-66976…"; Gateway
- [ ] Link text ≠ destination: C3 ("risas.org" → c3wellbeing.org); Gateway ("gatewayhealth.org" → brownhealth.org)
- [ ] Ironworkers Local 37: address "37845 Waterman Ave", links to UA Local 51's site
- [ ] CODAC / Tri-County entries split around logos

**Treatment data**
- [ ] "Hallane" vs "Hallene"; "401-737-4788M"; BHG Providence "841-535-7291"
- [ ] Roger Williams zip 02928; Thrive "Warwick, RI 02904" (likely typos)
- [ ] Replace "Substance Abuse" with person-first "Substance Use" language
- [ ] Link providers' own sites instead of third-party directories

**Copy**
- [ ] Typos: "Behaviorial", "Down load", "Gailee"
- [ ] Recovery Friendly Workplace: old address, truncated sentence
- [ ] Remove past events; remove "Add Widgets in Right Sidebar"
- [ ] Staff: fix `mailto: wlooker@…` (stray space)

**Accessibility**
- [ ] Meaningful alt text everywhere (donate GIF, Recovery TV, event gallery, news thumbnails)
- [ ] Every phone number as a `tel:` link
- [ ] One H1 per page, no skipped heading levels
- [ ] Replace tabbed content with scannable sections / filterable lists

---

## 12. Proposed information architecture

```
Header:  [Logo]  About Us ▾   Resources & Locator ▾   Membership ▾   Events & Trainings ▾   Contact   [Get Help Now] [Donate]
```

| Section | Pages |
|---|---|
| **Get Help Now** `/get-help` | All crisis lines, tap-to-call, BH Link triage center, "what happens when I call" |
| **About Us** `/about-us` | Mission & pillars · Staff & Leadership `/about-us/staff` · Recovery Friendly Workplace `/about-us/recovery-friendly-workplace` · Careers in Behavioral Health `/careers` |
| **Resources & Locator** `/resources` | Searchable directory (all guides, PDFs, support groups, elder/memory care, insurance, CCBHC) · Treatment Locator `/resources/treatment` · Residential Bed Availability `/resources/bed-availability` · Self-Help Screening `/resources/self-help` · OTP Health Homes `/programs/otp-health-homes` |
| **Membership** `/membership` | Tier comparison + applications · Member Directory `/membership/directory` |
| **Events & Trainings** | TRAIN ED schedule `/trainings` · Group Training Request `/trainings/request` · Community Events `/events` · News `/news` · Recovery TV `/recovery-tv` |
| **Contact** `/contact` | Address, map link, phone, staff contacts, contact form |
| **Donate** `/donate` | PayPal, QR, mail-a-check, tax-deductible note |
| **Footer** | Crisis lines, address/phone, sitemap columns, Facebook/YouTube/Substack, newsletter, Privacy, Accessibility |

---

## 13. Redirect map (preserve SEO & bookmarks)

| Old URL | New URL |
|---|---|
| `/staff-directory/` | `/about-us/staff` |
| `/recovery-friendly-workplace/` | `/about-us/recovery-friendly-workplace` |
| `/member-organizations/` | `/membership/directory` |
| `/trainrischedule/` | `/trainings` |
| `/community-training-request-form/` | `/trainings/request` |
| `/self-help-tools/` | `/resources/self-help` |
| `/otp-hh-initiative/` | `/programs/otp-health-homes` |
| `/treatment/` | `/resources/treatment` |
| `/treatment/residential-availability/` | `/resources/bed-availability` |
| `/discover-jobs/` | `/careers` |
| `/upcoming-events/` | `/events` |
| `/blog-archive/` | `/news` |
| `/2024/05/02/news-from-sumhlc/` | `/news` |
| `/:year/:month/:day/:slug/` | `/news/:slug` |
| `/wp-content/uploads/:path*` | `/documents/...` (per-file map for migrated PDFs) |

---

## 14. Open questions for SUMHLC

1. ~~TRAIN ED: bring the training schedule into the new site?~~ **Decided:** moved in-house (`/trainings`).
2. Full Board membership dues — revenue bands and amounts? **Pending:** SUMHLC will supply; the page shows "Contact us for dues" until then.
3. ~~General contact email?~~ **Decided:** selanani@gmail.com for the site contact email and form submissions.
4. Board of directors — publish names/affiliations?
5. EIN for the donation page? Recurring-gift option in PayPal?
6. Vector logo and brand colors, if they exist.
7. Who updates content after launch (developer vs. staff)? Decides whether a CMS UI is needed.
8. Sign-off on all crisis numbers in §4.
