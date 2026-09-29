# Launch checklist

## Must confirm with SUMHLC

- [ ] **Crisis numbers** in `src/config/crisis.ts`: 988, BH Link (401) 414-5465, Kids' Link RI 1-855-543-5465, and the three local crisis units.
- [ ] **Full Board dues** — add revenue bands or a price to `content/membership.yaml`.
- [ ] **Membership benefit matrix** in `content/membership.yaml` — it reflects only what the old page listed.
- [ ] **Contact email** — the site uses `selanani@gmail.com` (`content/site.yaml`, `content/membership.yaml`). The old site used `selanani@sumhlc.org`; confirm which should be public.
- [ ] Entries whose `internalNote` starts with `VERIFY` in `content/members.yaml` and `content/providers.yaml` (conflicting phone numbers and addresses on the old site).
- [ ] CEU hours in `content/licensure.yaml`, and the two TRAIN ED dates whose weekday didn't match on the old site (Nov 17, 2026 and Jan 19, 2027).
- [ ] EIN for the donate page (`ein` in `content/site.yaml`).
- [ ] Privacy page wording (`src/app/privacy/page.tsx`) — a draft.

## Before retiring WordPress

The new site still loads **images and PDFs from `sumhlc.org/wp-content/uploads/`** (logo, staff photos, member logos, news images, handouts, membership applications). Once WordPress is shut down those links break, so:

- [ ] Copy those files into `public/` (e.g. `public/documents/`, `public/images/`) and update the URLs in `content/` (Pages CMS uploads land in `public/uploads/`).
- [ ] Remove the `sumhlc.org` entry from `images.remotePatterns` in `next.config.ts`.
- [ ] Replace the 150 px PNG logo with a vector (SVG) version if one exists.
- [ ] Broken on the old site and **left out** of the new one: the Anchor Recovery support-group page and the 2019 RI Prevention Resource Guide. Find replacements if still relevant.
- [ ] The Mental Health Parity 101 registration link still points to trainedprogram.net (Wix). Replace it before that site is closed.

## Content editing (Pages CMS)

- [ ] Push this repository to GitHub (a private repository is fine).
- [ ] Sign in at https://app.pagescms.org with GitHub and install the Pages CMS GitHub App on the repository.
- [ ] Open the repository in Pages CMS; it picks up `.pages.yml` automatically.
- [ ] Invite staff as collaborators by email in Pages CMS (no GitHub account needed).
- [ ] Make a small test edit (e.g. a training's notice) and confirm the host rebuilds and the change goes live.

## Forms

- [ ] Create a Resend account, verify the sending domain, and set `RESEND_API_KEY`, `MAIL_FROM` (and optionally `MAIL_TO`) in the host's environment variables.
- [ ] Send a test message from `/contact` and `/trainings/request` on the deployed site.

## Go live

- [ ] Deploy to Vercel/Netlify and test the preview URL on a phone.
- [ ] Point the `sumhlc.org` DNS to the new host.
- [ ] Spot-check old URLs (e.g. `/staff-directory/`, `/member-organizations/`, a news post URL) — they should redirect.
- [ ] Submit `https://sumhlc.org/sitemap.xml` in Google Search Console.
