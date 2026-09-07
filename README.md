# Systemize TX — Website

Systemize TX is the shared parent brand for two cofounders who bring hands-on AI,
automation, technology, and operational improvement to businesses that need more
capacity without more overhead. Two founder-led industry practices sit under it:
**calibration** and **third-party logistics (3PL)**.

This is not a self-service SaaS product. Engagements begin with one valuable workflow
and expand from there, and the site is written to say so.

## Stack

Zero dependencies. Plain HTML, CSS custom properties, and vanilla JS. No build step,
no framework, no package manifest. Deploys as-is to GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or any static host.

```
index.html                          /                        homepage
industries/calibration/index.html   /industries/calibration   calibration practice
industries/3pl/index.html           /industries/3pl           3PL practice

about.html                          redirect → /#about
services.html                       redirect → /#services
case-studies.html                   redirect → /

css/style.css                       design tokens + components
js/main.js                          mobile nav, scrollspy, reveal-on-scroll
assets/logo/                        star, avatar, and lockup reference SVGs
docs/screenshots/                   desktop + mobile captures of all three pages
BRAND.md                            color, type, spacing, logo, and icon rules
```

## Run it

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

The industry pages use directory-plus-`index.html` so the live URLs are
`/industries/calibration` and `/industries/3pl` with no extension. Opening the files
directly over `file://` also works, but the clean URLs do not — use the server.

## Routing and redirects

`about.html`, `services.html`, and `case-studies.html` are now redirect stubs
(instant meta refresh + `window.location.replace` + a canonical tag + a visible
fallback link). They work on every static host with no configuration.

If your host supports real redirects, upgrade them to 301s and delete the stubs:

- **Netlify / Cloudflare Pages** — a `_redirects` file
- **Vercel** — a `redirects` array in `vercel.json`
- **GitHub Pages** — no server-side redirects; keep the stubs

## Contact and lead routing

There is no calendar integration in this repository. Every CTA opens a mailto to
`hello@systemizetx.com`, and industry context is carried in the subject line:

| Page | Subject |
|---|---|
| Homepage | `Operational briefing request` |
| Calibration | `Operational briefing request — Calibration` |
| 3PL | `Operational briefing request — 3PL` |

To add a real calendar later, replace the `href` on the `.btn--primary` CTAs and keep
the subject-line convention on the email fallback.

## Analytics

None is installed, and none was removed. If you add a tag, add it once per page and
check that it is not already present before adding another.

## Editing

- **Colors, type, spacing** — the token block at the top of `css/style.css`. Change a
  value there, never inline.
- **Logo** — one component (`.logo`) with master, Calibration, and 3PL variants. See
  BRAND.md §4.
- **Icons** — one in-house outline family, defined as an inline `<symbol>` sprite in
  each page. See BRAND.md §5.
- **Shared markup** — the header, footer, logo, and icon sprite are duplicated across
  the three pages. Change one, change all three.

Full rules, including what not to do, are in [BRAND.md](BRAND.md).

## Verified

- All three pages plus the three redirect stubs return 200 and render.
- No horizontal overflow at 320, 390, 768, or 1440px.
- No console errors, no page errors, no failed requests.
- Zero WCAG AA contrast failures across every rendered text/background pair.
- One `<h1>` per page, no skipped heading levels, `main`/`header`/`footer` landmarks present.
- Every internal link and in-page anchor resolves.
- Visible 2px focus ring on every interactive element.
- Content fully readable with JavaScript disabled and under `prefers-reduced-motion`.
- Mobile nav opens, closes on navigation, closes on Escape, and closes at desktop width.

Known open items — provisional 3PL copy, missing founder details, the unconfirmed
canonical domain, and platform-dependent fonts — are listed in [BRAND.md §9](BRAND.md).
