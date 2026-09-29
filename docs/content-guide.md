# Editing site content

Staff edit the website with **Pages CMS** at <https://app.pagescms.org>. It shows friendly forms for everything in the `content/` folder. No code is involved.

## How it works

1. Sign in at app.pagescms.org and open the **sumhlc** project.
2. Pick a section in the left menu (for example **Trainings & events → TRAIN ED trainings**), make your change and click **Save**.
3. The site rebuilds automatically and the change is live in about two minutes.

**Safety net:** every save is checked before it goes live. If something is wrong, such as a date in the wrong format or a link missing `https://`, the update is rejected and the live site keeps showing the last good version. A developer will see the error message naming the file and field.

## What's in the menu

| Menu item | Updates |
|---|---|
| **News & op-eds** | Posts on `/news`. Click **Add an entry** to write a new post. |
| **TRAIN ED trainings** | The schedule on `/trainings` and the home page. Past trainings disappear on their own. |
| **Community events** | `/events` |
| **Licensure & CEU resources** | `/trainings/licensure` |
| **Resource directory** | `/resources` |
| **Treatment locator** | `/resources/treatment` |
| **Member directory** | `/membership/directory` |
| **OTP Health Homes** | `/programs/otp-health-homes` |
| **Careers** | `/careers` |
| **Site settings** | Address, phone, public email, social links, PayPal link, logo |
| **Staff** | `/about-us/staff` and the contact page |
| **Membership tiers** | Prices, application forms and the comparison table on `/membership` |

## Tips

- **Images and PDFs:** upload them with the image or file buttons, or under **Media**. For a resource that is a PDF, upload it under Media and paste its `/uploads/…` path into **Link or file**.
- **Image descriptions:** always fill in **Image description** on news posts. It's read aloud to people using screen readers.
- **Times** use 24-hour Eastern time (`13:30` for 1:30 PM).
- **Leaving a field blank** hides it on the site. For example, a blank **Price** on the Full Board tier shows "Contact us for dues".
- **Internal notes** on members and providers are for staff only and never appear on the site. Notes starting with "VERIFY" mark details from the old site that still need confirming.

## What staff can't edit (on purpose)

- **Crisis phone numbers** live in `src/config/crisis.ts` and appear in the banner, header, mobile call bar, footer and `/get-help`. A developer changes them, and only after confirming with the crisis line.
- **Menus and page layouts** are part of the code.

## Adding people as editors

Anyone with write access to the GitHub repository can invite collaborators by email from the project in Pages CMS. Invitees don't need a GitHub account. They sign in with a one-time code sent to their email and can edit content and media, but can't change the configuration.

## For developers

- The editing forms are defined in `.pages.yml`; the validation rules are in `src/lib/content.ts`.
- **Pages CMS deletes any key that isn't declared in `.pages.yml`** when it saves a file. After adding a field to a schema, declare it in `.pages.yml` too, then run `npm run check:cms` to confirm every key in `content/` is covered.
- Pages CMS rewrites YAML files on save, which removes comments. Put guidance in field `description`s in `.pages.yml` rather than in YAML comments.
- Blank fields are removed rather than saved as empty strings, so optional fields in the schemas accept a missing key.
