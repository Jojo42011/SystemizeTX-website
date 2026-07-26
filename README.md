# Systemize TX — Website

Premium, minimal, one-page site for **Systemize TX** — the systems people who use AI.
We systemize operations-heavy Texas businesses: one AI-native operating system the whole
company runs on, built custom, hosted and run by us.

## Design system

- **Palette — the exact Texas flag colors** (Texas Legislature, 2001):
  - Blue `#00205B` (Pantone 281) — loyalty
  - Red `#BF0A30` (Pantone 193) — bravery
  - White / warm paper `#F7F5F0` — purity
- **Type**: Fraunces (display serif) + Inter (UI sans), via Google Fonts with system fallbacks.
- **Motion**: preloader star draw · hero city slideshow (5 Texas skylines as custom SVG
  silhouettes, Ken Burns skies) · kinetic word-mask headline · scroll-lit manifesto ·
  sticky "tools converge into one system" scene · staggered reveals · count-up stats ·
  self-drawing Texas map · full `prefers-reduced-motion` support.

## Stack

Zero dependencies. Pure HTML + CSS + vanilla JS — no build step, no frameworks, nothing to break.

```
index.html      the whole page
css/style.css   design system + animations
js/main.js      slideshow, scroll choreography, reveals
```

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Deploys as-is to GitHub Pages, Netlify, Vercel, or any static host.

## Editing quick-reference

- **Contact email**: search `hello@systemizetx.com` in `index.html`.
- **Slideshow cities/lines**: the `data-city` / `data-line` attributes on each `.hero-slide`.
- **Pricing & offer copy**: the `#offer` section — keep in sync with the canonical offer doc.
- **Colors**: CSS custom properties at the top of `css/style.css`.
