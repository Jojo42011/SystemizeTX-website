# Systemize TX — Brand & Design System

The rules the site is built on. Everything here maps to a real token in
`css/style.css`; if you change a value, change it there and nowhere else.

Voice: practical, direct, outcome-focused. We describe what we improve, not what
the technology is. No sweeping promises, no invented proof.

---

## 1. Color

Brand colors are fixed. Navy and red are the identity; everything else supports them.

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#00205B` | Primary. Buttons, logo wordmark, links, active states. |
| `--navy-deep` | `#001233` | Headlines, the briefing CTA band, footer accents. |
| `--red` | `#BF0A30` | The star, eyebrows, checkmarks, one accent per view. Never a background for a whole section. |
| `--white` | `#FFFFFF` | The default surface. Most of the site is white. |
| `--paper` | `#F7F5F0` | Occasional alternate section background only. |

**Ink**

| Token | Hex | Contrast on white |
|---|---|---|
| `--ink` | `#0D1526` | 17.4:1 — body text |
| `--ink-muted` | `#55607A` | 6.2:1 — secondary copy |
| `--ink-faint` | `#646E88` | 5.1:1 — labels, footer meta |

**Icon accents** — used *only* as the stroke and 9% tint inside a 44px icon tile.
They are not brand colors and never appear as page backgrounds or button fills.

`--accent-teal #0E7C86` · `--accent-amber #A45B00` · `--accent-violet #6D3FC4` · `--accent-blue #1D4ED8`

Bright blue is a supporting accent. It does not replace navy as the primary identity.

**Rules**
- Predominantly white layouts. At most one dark section per page (the briefing CTA band).
- No large red fills. Red is a highlight, measured in pixels not panels.
- No gradients beyond the near-invisible hero wash. No neon, no glow.
- Every text/background pair must pass WCAG AA (4.5:1 body, 3:1 large text). Verified — currently zero failures.

---

## 2. Typography

SF Pro is the intended face, used **only where it is already installed on the
reader's machine**. No Apple font files are downloaded, embedded, or redistributed.

```css
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
             "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

The first five entries are the requested stack verbatim. `"Helvetica Neue", Arial`
is appended so Linux and older browsers land on a clean grotesk instead of a
default serif. **Appearance therefore varies by platform**: Apple devices get SF Pro,
Windows gets Segoe UI, most Linux gets a Helvetica/Arial substitute. This is expected.
If licensed font files are supplied later, add an `@font-face` block and put the
family at the front of the stack; nothing else needs to change.

| Role | Token | Weight |
|---|---|---|
| Hero display | `--fs-display` (38 → 62px) | 600 |
| Page h1 | `--fs-h1` (34 → 52px) | 600 |
| Section h2 | `--fs-h2` (28 → 40px) | 600 |
| Card h3 | `--fs-h3` (18 → 21px) | 600 |
| Lead paragraph | `--fs-lead` (17 → 20px) | 400 |
| Body | `--fs-body` 16px | 400 |
| Small / card copy | `--fs-sm` 15px | 400 |
| Meta | `--fs-xs` 14px | 400 |
| Eyebrow / label | `--fs-label` 12px | 500 |

- Headlines: semibold (600) with `-0.021em` to `-0.028em` tracking.
- Body: regular (400), line-height 1.6.
- Labels: medium (500), uppercase, `0.08em` tracking — **eyebrows and footer column
  headings only**. Nothing else is uppercase.
- No weights under 400. No thin or light type anywhere.

---

## 3. Spacing & layout

- **8px scale.** `--sp-1` (8) through `--sp-16` (128). Nothing uses an off-scale value.
- **Content width:** `--content-width: 1160px`.
- **Gutters:** `clamp(20px, 5vw, 48px)` — responsive, never less than 20px.
- **Section padding:** `clamp(64px, 8vw, 112px)` vertical.
- **Radius:** cards and bands `16px` (`--radius`), smaller surfaces `14px`, icon tiles `12px`, buttons fully rounded.
- **Borders:** 1px `--line #E6E8EE`. On paper sections, `#E9E5DC`.
- **Shadows:** restrained and only where a card needs to lift.
  `--shadow-sm` at rest, `--shadow-md` on hover, `--shadow-lg` on the two industry cards.
  Most surfaces carry a border and no shadow at all.

Grid helpers: `.grid--2`, `.grid--3`, `.grid--4` collapse to one column below 640–700px.

---

## 4. Logo

One component, three variants, one set of markup. Never hand-roll a new lockup.

```html
<a class="logo" href="/" aria-label="Systemize TX, home">
  <svg class="logo__star" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6l10.9 …"/></svg>
  <span class="logo__name">Systemize TX</span>
  <!-- optional industry variant -->
  <span class="logo__label">Calibration</span>
</a>
```

- **Star:** the existing Texas star geometry, unchanged, flat `--red`, no outline or effects.
- **Wordmark:** "Systemize TX" in `--navy`, 600 weight, standard letterforms, `-0.012em` tracking. No custom lettering.
- **Divider:** the thin 1px rule before the industry label is drawn by
  `.logo__label::before`. It only exists when a label exists.
- **Industry label:** `--ink-muted`, 14px, medium. Hidden below 460px so the header never crowds.

| Variant | Markup | Where |
|---|---|---|
| Master | `.logo` | Homepage header, all footers |
| Calibration | `.logo` + `.logo__label` "Calibration" | `/industries/calibration/` header |
| 3PL | `.logo` + `.logo__label` "3PL" | `/industries/3pl/` header |

Sizes: `.logo--sm` (18px star), default (20px star), `.logo--lg` (30px star).
On navy, add `.logo--light`.

**Favicon / avatar:** the star in red on a navy rounded square — `assets/logo/avatar.svg`,
inlined as a data URI in every page head. Never the wordmark alone at favicon size.

**Do not:** add a trademark symbol, add a tagline into the lockup, recolor the star,
outline it, rotate it, place it on a busy background, or create a second logo concept.

**Canva reproducibility:** the lockup is one vector star plus editable text. To rebuild
it, place `assets/logo/star.svg`, set "Systemize TX" in the nearest available grotesk at
600 weight in `#00205B`, and align the star's optical center to the cap height of the S.
`assets/logo/logo-lockup.svg` is the reference.

---

## 5. Icons

One family, drawn in-house, consistent across every page.

- 24×24 viewBox, `fill: none`, `stroke: currentColor`, **stroke-width 1.6**, round caps and joins.
- Defined once per page as a `<symbol>` sprite and referenced with
  `<svg class="icon" viewBox="0 0 24 24"><use href="#i-name"></use></svg>`.
- The Texas star is the one filled mark — it uses `.icon--fill`.
- Icons sit in a 44px tile (`.icon-tile`) with a 12px radius and a 9% accent tint.
  Small variant `.icon-tile--sm` is 36px.
- Accent assignment is by tile, not by icon: `--teal`, `--amber`, `--violet`, `--blue`, `--red`, or the default navy.
  Vary accents across a grid so no row repeats a color.

**Do not** mix in a third-party icon set, use filled icons, use a different stroke
weight, or introduce illustration, robots, brains, or 3D renders.

---

## 6. Components

| Class | Notes |
|---|---|
| `.btn--primary` | Navy fill, white text. Hover `--navy-hover`, active `--navy-deep` + 1px press. |
| `.btn--secondary` | White fill, navy text, `--line-strong` border. Hover borders navy. |
| `.btn--light` / `.btn--outline-light` | For use on the navy CTA band only. |
| `.card` | White, 1px border, 16px radius, 24px padding. |
| `.industry-card` | The two equally weighted industry entries. Same size, same treatment. |
| `.row-item` | Border-separated list rows for problem statements. No boxes. |
| `.step` | Numbered process step with a 2px navy top rule. |
| `.note` | Left-ruled callout for guardrails and caveats. |
| `.cta-band` | The single dark block per page. |

**Focus:** every interactive element shows a 2px `--navy` outline at 3px offset
(white on navy surfaces). Focus is never removed.

**Motion:** reveal-on-scroll only, 10px rise over 0.5s, capped stagger. It is scoped to
`.js` so **content is fully visible with JavaScript disabled**, and it is disabled
entirely under `prefers-reduced-motion: reduce`. There is no preloader and nothing
blocks first paint.

---

## 7. Content rules

- Never state a client name, testimonial, metric, certification, award, or result
  that has not been verified. There are none on the site today.
- No fictional product screenshots or dashboards. The hero composition is deliberately
  abstract — labels and icons, no numbers, no charts.
- Describe engagements as hands-on delivered work, not a SaaS subscription.
- Say that engagements start with one workflow and expand.
- On calibration: never imply AI performs calibration, exercises technical judgment,
  or grants QA approval.
- Texas is our origin, not a customer requirement. Say "Built in Texas", not "for Texas businesses only".

---

## 8. Editing

The three pages are plain HTML with no build step. The header, footer, logo, and icon
sprite are **duplicated across `index.html`, `industries/calibration/index.html`, and
`industries/3pl/index.html`** — if you change one, change all three, or the logo and
nav will drift out of sync.

---

## 9. Open items

- **3PL copy is provisional.** The cofounder's precise 3PL specialty is not confirmed,
  so `/industries/3pl/` is written to cover workflows common across 3PL operations and
  deliberately avoids claiming freight brokerage, warehousing, or fulfillment as a
  focus. Tighten it once the specialty is confirmed. A comment marks this in the source.
- **Founder details.** The About section says "two cofounders" and nothing more,
  because no verified names, titles, or biographies exist in this repository. Add them
  before launch rather than inventing them.
- **Booking.** There is no calendar integration in this repository, so every CTA opens
  a mailto to `hello@systemizetx.com` with an industry-specific subject line. If a
  Calendly/Cal.com account exists, swap the CTA hrefs and keep the subject-line routing.
- **Canonical domain.** Canonical tags use `https://systemizetx.com`, inferred from the
  contact address already in the repository. Confirm before launch.
- **Fonts.** SF Pro renders only where it is already installed. See §2.
