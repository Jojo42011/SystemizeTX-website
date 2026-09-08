# Systemize TX: Website

Systemize TX is an operations and automation firm serving two industries: calibration
companies and third-party logistics (3PL) companies. Engagements are hands-on AI,
automation, and operational improvement, scoped to one workflow first and expanded as
results hold. It is explicitly not a self-service SaaS subscription.

This repository holds the rebranded marketing site, built from the design handoff
specification. [BRAND.md](BRAND.md) is the condensed brand guide and the source of
truth for every color, size, radius, and shadow used here.

## Stack

Zero dependencies. Plain HTML, CSS custom properties, and vanilla JavaScript. No build
step, no framework, no package manifest. Deploys as-is to GitHub Pages, Netlify,
Vercel, Cloudflare Pages, or any static host.

```
index.html                            /                          homepage
industries/calibration/index.html     /industries/calibration    calibration practice
industries/3pl/index.html             /industries/3pl            3PL practice
about/index.html                      /about
services/index.html                   /services                  what we do
case-studies/index.html               /case-studies

about.html                            redirect to /about
services.html                         redirect to /services
case-studies.html                     redirect to /case-studies

css/style.css                         tokens, components, layout
js/main.js                            header, dropdowns, reveals, ring caption, FAQ, booking dialog
assets/logo/                          star and avatar SVGs, for Canva and design reuse
docs/screenshots/                     desktop and mobile captures of all six pages
BRAND.md                              the brand guide
```

Each page is a directory with an `index.html`, so the clean routes above resolve on
every static host with no configuration, including GitHub Pages and a plain local
server. The three legacy `.html` files are redirect stubs so existing inbound links
still land. If you enable Vercel's `cleanUrls`, drop the stubs first, since both would
then claim the same path.

## Run it

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Contact and lead routing

There is no calendar integration in this repository yet. The verified contact is
**devon@systemizetx.com**, used as the fallback on every page and as the booking
dialog's submit target.

Every booking CTA carries `data-book` and opens the routing dialog: step 1 sends you to
the Calibration or 3PL page, or on to step 2, a four-field form that composes a mailto.
With JavaScript disabled each CTA falls through to its `href`, the on-page booking
section. Email subjects carry industry context:

| Page | Subject |
|---|---|
| Homepage | `Profit and operations review request` |
| Calibration | `Profit and operations review request (Calibration)` |
| 3PL | `Profit and operations review request (3PL)` |

### Wiring up Cal.com

The embed container `#my-cal-inline-systemize-discovery` and its card are final on all
three booking sections. No `calLink` was supplied, so nothing is faked in the embed
slot: it currently shows an honest note and the email fallback.

To go live, paste the complete Cal.com inline snippet into the container, delete the
`.stx-cal__pending` block, and remove the `data-cal-pending` attribute (that attribute
is the only thing suppressing the container's specified `min-height`). Use Devon's
calendar on the homepage and Calibration, and the cofounder's separate link on 3PL, and
pass industry context as booking metadata so leads arrive tagged:

```js
config: { metadata: { industry: "calibration" } }   // or "3pl"
```

## Analytics

None is installed, and none was removed. If you add a tag, add it once, in one place,
and check it is not already present before adding another.

## Editing

- **Tokens** live at the top of `css/style.css`. Change a value there, never inline.
- **Fonts:** SF Pro is aliased to locally installed faces through `@font-face` with
  `local()` sources only. No font files are shipped. If licensed webfont assets are ever
  placed in `assets/fonts/`, add real `url()` sources with `woff2` first and
  `font-display: swap`, keeping the `local()` sources ahead of them.
- **Icons** are Lucide (ISC), inlined as a `<symbol>` sprite per page. Nothing is
  fetched from a CDN at runtime.
- **Shared markup:** the header, footer, booking dialog, and icon sprite are duplicated
  across the six pages. Change one, change all six.

## Verified

Checked with headless Chromium across all six pages:

- All six routes plus the three redirect stubs return 200 and render.
- No horizontal overflow at 320, 390, 768, 901, 909, or 1440px.
- Header nav stays visible and on one line down to 901px and swaps to the burger at
  900px. The widest lockup ("Systemize TX | Calibration") is 232px, the nav 525px, and
  the container 811px at a 901px viewport, so it fits with room to spare.
- No console errors, page errors, or failed requests.
- Zero WCAG AA contrast failures across every rendered text and background pair.
- One `<h1>` per page, no skipped heading levels, `main`/`header`/`footer` landmarks.
- Every internal link and in-page anchor resolves; no dead anchors.
- Visible navy focus ring on every interactive element.
- Booking dialog: opens at step 1, moves focus into the panel, traps Tab, routes to the
  industry pages, advances to the form, guards empty submits by focusing the first empty
  required field, and returns focus to the trigger on Escape.
- Step ring: all four cards stay upright through the full 90s rotation, stay inside the
  box at 280, 320, and 520px widths, and all four respond to hover, not just the last.
- FAQ accordion: first panel open by default, one panel open at a time.
- Mobile nav opens, closes on Escape, closes on navigation, and locks body scroll.
- Content fully readable with JavaScript disabled and under `prefers-reduced-motion`;
  the ring stops and reveals resolve immediately.
- No em dashes or en dashes anywhere in the repository.

## Still open

Listed in full under "Open items" in [BRAND.md](BRAND.md):

1. **Cal.com is not live.** No calendar URLs were supplied.
2. **3PL copy is provisional**, pending confirmation of the cofounder's specialty.
3. **Case studies** are anonymized with figures removed and may still read as
   unverifiable proof.
4. **Founder information.** None exists in this repository, so none was invented.
5. **Fonts** render differently per platform.
