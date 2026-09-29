# SUMHLC website

The rebuilt website for the **Substance Use and Mental Health Leadership Council of Rhode Island**, replacing the WordPress site at sumhlc.org.

Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui · Lucide icons. Every page is prerendered to static HTML; the only JavaScript sent to the browser is for the navigation, the crisis banner's close button, the search/filter tools and the forms.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also validates all content files)
npm run lint
npm run check:cms  # every content key is declared in .pages.yml
```

Copy `.env.example` to `.env.local` to configure form email delivery.

## Where things live

| Path | What it is |
|---|---|
| `content/` | **All editable content**, edited by staff through Pages CMS — see [docs/content-guide.md](docs/content-guide.md) |
| `.pages.yml` | Pages CMS editing forms (keep in sync with `src/lib/content.ts`; check with `npm run check:cms`) |
| `content/site.yaml` | Address, phone, email, social links, PayPal link |
| `content/news/*.md` | News and op-ed posts (Markdown with a YAML header) |
| `content/trainings.yaml` | TRAIN ED schedule — past trainings disappear automatically |
| `content/resources.yaml`, `providers.yaml`, `members.yaml` | Resource directory, treatment locator, member directory |
| `src/config/crisis.ts` | **The only place crisis phone numbers are defined** |
| `src/config/site.ts` | Loads and validates `content/site.yaml` |
| `src/config/nav.ts` | Header and footer menus |
| `src/app/` | Pages (one folder per URL) |
| `src/components/` | UI components (`ui/` = shadcn primitives) |
| `src/lib/content.ts` | Loads and validates everything in `content/` |
| `next.config.ts` | Redirects from every old WordPress URL |
| `scripts/migrate-wordpress.mjs` | One-off import of posts from the old site's WordPress API |
| `scripts/migrate-wordpress-assets.mjs` | One-off copy of WordPress images and files into `public/wp-content/uploads/` |
| `docs/` | Site audit, design system, launch checklist |

## Editing content

Staff edit content at https://app.pagescms.org; each save commits to GitHub and triggers a rebuild. See [docs/content-guide.md](docs/content-guide.md).

## Deploying

Designed for Vercel (or Netlify): connect the repository, set the environment variables from `.env.example`, and deploy. Pages that list trainings or events re-render hourly so past dates drop off without a redeploy.

Before launch, work through [docs/launch-checklist.md](docs/launch-checklist.md).
