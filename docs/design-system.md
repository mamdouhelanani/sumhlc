# Design system

Tokens are defined once in `src/app/globals.css` (`@theme`) and used as Tailwind classes (`bg-brand-700`, `text-warm-700`, …).

## Color

Brand blues are sampled from the SUMHLC logo (navy `#00507f`, cerulean `#0070b0`). The warm terracotta accent is reserved for **crisis help** and **giving** so it always reads as "act here".

| Token | Hex | Used for |
|---|---|---|
| `brand-950` | `#071f31` | Crisis banner, footer, mobile call bar |
| `brand-900` | `#0a2e47` | Headings, hero background |
| `brand-700` | `#00507f` | Primary buttons, links (logo navy) |
| `brand-500` | `#0070b0` | Focus ring, icon accents (logo cerulean) |
| `brand-50`–`200` | `#eff6fb`–`#c7dff0` | Tinted sections, chips |
| `warm-700` | `#9a3d12` | "Get Help Now", Donate, crisis call buttons |
| `warm-50`–`300` | `#fdf5ef`–`#f3b58f` | Crisis panels, highlights on navy |
| `sand-50/100` | `#faf7f2` / `#f3eee5` | Warm neutral section backgrounds |
| `ink` | `#10212f` | Body text |
| `slate-muted` | `#4a5b6b` | Secondary text |

### Contrast (WCAG 2.1 AA requires 4.5:1 for text, 3:1 for UI boundaries)

| Pair | Ratio |
|---|---|
| `ink` on white | 16.4 : 1 |
| `slate-muted` on white / on `sand-50` | 7.0 / 6.4 : 1 |
| `brand-700` on white | 8.6 : 1 |
| `brand-500` on white (focus ring) | 5.3 : 1 |
| white on `warm-700` | 6.9 : 1 |
| white on `brand-900` | 14.1 : 1 |
| `warm-200` on `brand-900` | 10.6 : 1 |
| `brand-100` on `brand-900` | 12.0 : 1 |
| input border `#768696` on white | 3.7 : 1 |

## Type

- **Headings:** Source Serif 4, bold — warm and trustworthy.
- **Body and UI:** Public Sans — the open-source typeface designed for U.S. government sites, chosen for legibility.
- Both are self-hosted by `next/font` with size-matched fallbacks, so there is no layout shift and no request to Google at runtime.

## Interaction and accessibility rules

- Every interactive element has a 3 px `brand-500` focus outline.
- Touch targets are at least 44 px tall (`Button` default size is `h-11`).
- Crisis help is reachable from every page three ways: the top banner (dismissible per visit), the header **Get Help Now** button, and the sticky call bar on phones.
- Motion is disabled when the visitor's device asks for reduced motion.
- External links and file downloads are labeled for screen readers ("external site", "PDF").
