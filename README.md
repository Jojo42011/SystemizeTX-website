# Systemize TX — Website

Premium, minimal, one-page site for **Systemize TX**, the systems people who use AI.
We systemize Texas businesses: one AI native operating system the whole company runs on,
built custom, hosted and run by us.

## Design system

- **Palette, the exact Texas flag colors** (Texas Legislature, 2001):
  - Blue `#00205B` (Pantone 281), loyalty
  - Red `#BF0A30` (Pantone 193), bravery
  - White / warm paper `#F7F5F0`, purity
- **Type**: Fraunces (display serif) + Inter (UI sans), via Google Fonts with system fallbacks.
- **Motion**: preloader star draw · hero slideshow of five Texas cities (real photography,
  brand tinted, slow Ken Burns) · kinetic word-mask headline · editorial pain-point list ·
  sticky "tools converge into one system" scene · staggered reveals · count-up stats ·
  self-drawing Texas map · full `prefers-reduced-motion` support.

## Site structure (multi page)

- `index.html` — Hero (city slideshow) → The Problem → The System → The Outcomes →
  The Partnership → The Process → Texas → Booking (calendar embed) → Footer
- `about.html` — positioning, animated stats strip, four principles, who we serve,
  cross links to the other pages
- `services.html` — the three phase engagement with deliverables, what the system can
  own, the every build ships with checklist, two engagement models (scoped in the
  briefing, no pricing), and a seven question FAQ accordion
- `case-studies.html` — five representative engagements in challenge → build → outcome
  format with industry tags (anonymized, from the founders' build library)

Header on every page: About Us · What We Do · Case Studies + the Book a briefing button.
No pricing appears anywhere on the site by design. The close is the free operational
briefing, booked via the calendar section on the homepage.

## Stack

Zero dependencies. Pure HTML + CSS + vanilla JS. No build step, no frameworks.

```
index.html         the homepage
about.html         About Us
services.html      What We Do
case-studies.html  Case Studies
css/style.css      design system + animations
js/main.js         slideshow, scroll choreography, reveals, FAQ accordion
assets/img/        hero photography (five Texas cities)
```

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Deploys as-is to GitHub Pages, Netlify, Vercel, or any static host.

## Editing quick-reference

- **Calendar embed**: paste your Calendly / Cal.com embed inside `.booking__embed`
  in `index.html` (a comment marks the spot) and delete the placeholder block.
- **Contact email**: search `hello@systemizetx.com` in `index.html`.
- **Slideshow cities/lines**: the `data-city` / `data-line` attributes on each `.hero-slide`,
  plus the matching photo in `assets/img/`.
- **Colors**: CSS custom properties at the top of `css/style.css`.

## Photo credits (Wikimedia Commons)

- Austin: "Austin Texas skyline at dusk in 2016" — CC BY 2.0
- Dallas: "Dallas Skyline at Dusk" — CC BY-SA 4.0
- Houston: "Houston, Texas" by Carol M. Highsmith — Public domain
- Fort Worth: "Fort Worth Skyline at Sunset" — CC BY 2.0
- San Antonio: "San Antonio blue hour" — CC BY 2.0
