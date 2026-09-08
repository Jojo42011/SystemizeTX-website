# Systemize TX: Brand guide (concise)

Minimal, premium, technical. Predominantly white. Navy and red stay the recognizable brand colors; red is used sparingly.

House style: no em or en dashes anywhere in copy or UI. Use a comma, a period, or a colon instead. Headlines carry one italic medium-weight accent phrase in navy. Sections are numbered 01 through 06 with a short hairline eyebrow.

Every value below is the one the site is actually built on. Change it here and in `css/style.css` together, or not at all.

## Logo
- One component, three variants: master, Calibration, 3PL.
- Flat red star (existing SVG path, unchanged) + "Systemize TX" in navy, semibold (600), letter-spacing -0.01em.
- Industry variant: 1px divider (#D5D9E2, 18px tall) + muted label (#5D667A, weight 500).
- Sizes: sm 16px star / 15px word / 12px label · md 20 / 18 / 14 · lg 26 / 24 / 17. Gap 10px throughout.
- Favicon / avatar: existing star on navy (`#BF0A30` on `#00205B`): unchanged.
- Canva-reproducible: one star shape + editable text. No trademark symbols. No alternate logo concepts.

## Color
| Token | Hex | Use |
|---|---|---|
| Texas navy | #00205B | Primary buttons, links, wordmark, icons, step numbers |
| Deep navy | #001233 | Headlines, primary hover |
| Signature red | #BF0A30 | Star, section numbers, ring arrows, small accents. Never large red areas |
| White | #FFFFFF | Page and card surface |
| Warm paper | #F7F5F0 | Alternate section bands, icon tiles, footer |
| Body ink | #3D4660 | Body copy (9.0:1 on white) |
| Muted ink | #5D667A | Secondary text (5.6:1 on white) |
| Text default | #2B3650 | Nav links, base body color |
| Pale border | #E3E6EC | 1px borders and dividers |
| Border on paper | #D9DCE3 | Dividers on paper bands |
| Control border | #CBD1DC | Secondary buttons and inputs |
| Neutral chip | #F3F4F7 | Nav hover background |
| Logo divider | #D5D9E2 | Industry lockup divider |
| Dot grid | #D9DCE3 | Hero background dots |
| Ring guide | #EAECF1 | Step ring guide circle |

Icons are monochrome navy on a warm paper tile. There are no multicolor icon tiles: an earlier direction used teal, amber, violet and blue accents, and the final design dropped them. Body text is never lighter than #5D667A. Bright blue is a supporting color only, never the primary identity.

## Typography
Face: **Inter**, self hosted and subsetted to Latin, under the SIL Open Font License 1.1. Five faces are served, matching the weights the design uses: 400, 500, 600 and 700 upright, plus 500 italic. Roughly 124KB total. The licence ships alongside them in `assets/fonts/OFL.txt`, as the OFL requires.

Stack: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`. Inter loads on every platform, so rendering is identical everywhere. The system faces behind it apply only if the webfont fails to load.

SF Pro was the original direction and is not used. Apple licenses it solely for mock-ups of interfaces running on Apple platforms, and the licence embedded in the font files states that it may not be embedded, nor used to display website content. Inter was drawn on close to the same proportions and is licensed for exactly this use. Do not reintroduce SF Pro webfont files.

Inter is slightly wider than SF Pro. That is why the header breakpoint is 960px rather than the 900px the original design called for: see Layout.

| Role | Size | Weight | Line height | Tracking | Color |
|---|---|---|---|---|---|
| Hero H1 | clamp(44px, 6.2vw, 84px) | 700 | 0.98 | -0.03em | #001233 |
| Page H1 | clamp(40px, 5.4vw, 72px) | 700 | 1.0 | -0.03em | #001233 |
| Section H2 | clamp(30px, 3.6vw, 44px) | 700 | 1.08 | -0.025em | #001233 |
| CTA H2 | clamp(26px, 3vw, 36px) | 700 | 1.12 | -0.02em | #001233 |
| Industry card title | clamp(24px, 2.6vw, 32px) | 700 | 1.1 | -0.02em | #001233 |
| Row title | clamp(20px, 2vw, 24px) | 600 | 1.3 | -0.015em | #001233 |
| Card title | 17 to 18px | 600 | 1.3 | 0 | #001233 |
| Statement | clamp(20px, 1.9vw, 26px) | 400 | 1.4 | -0.01em | #001233 |
| Lede | clamp(17px, 1.5vw, 21px) | 400 | 1.5 | 0 | #3D4660 |
| Body | 16 to 17px | 400 | 1.55 | 0 | #3D4660 |
| Small body | 15px | 400 | 1.55 | 0 | #5D667A |
| Label / eyebrow | 13 to 14px | 500 to 600 | 1.25 | 0 | #5D667A, number in #BF0A30 |

Headline accent: each H1 and H2 ends with an `<em>` phrase in italic, weight 500, #00205B. This is the signature typographic move; keep it consistent. Sentence case throughout. No uppercase runs, no thin weights. `text-wrap: pretty` on headings and paragraphs.

## Spacing and layout
- 8px scale: 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112.
- Content width `min(1160px, 100% - clamp(20px, 5vw, 48px) * 2)`, centered.
- Section padding `clamp(64px, 8vw, 112px)` vertical; CTA bands `clamp(56px, 7vw, 88px)`.
- Card padding 24px standard, `clamp(24px, 3vw, 36px)` for large cards. Grid gap 16px between cards; `36px clamp(40px, 6vw, 96px)` between heading and content columns.
- Copy widths: hero lede 560px, side intro 340px, body max 620px, ring caption 44ch.
- Section rhythm: white, paper, white. Paper bands carry 1px top and bottom borders. Never two paper sections in a row.
- **Header breakpoint 960px.** The desktop nav needs 838px: 244px for the widest lockup ("Systemize TX | Calibration"), 570px of nav, and the 24px bar gap. The container is 0.9 x viewport below 960px, so it only reaches 838px at a 931px viewport. The swap is CSS only; both navs are in the markup. Changing the typeface changes this number, so re-measure if the face ever changes.
- **Odd-count rule:** in any two-column grid with an odd number of children, the last child spans the full row (`grid-column: 1 / -1`). Otherwise it strands with dead space beside it.

## Radius
6px focus artifacts · 8px buttons, inputs, nav items · 10px icon tiles · 12px dialog options and dropdown panels · 14px standard cards · 16px hero, industry, calendar and dialog panels · 999px pill tags.

## Shadow
Reserved for hero cards, the calendar, hover states and the dialog. Most surfaces rely on the 1px border alone.

- Resting card `0 1px 2px rgba(0,18,51,.04)`
- Elevated `0 1px 2px rgba(0,18,51,.04), 0 24px 48px -32px rgba(0,18,51,.25)`
- Card hover `0 20px 40px -28px rgba(0,18,51,.35)` · large card hover `0 28px 56px -32px rgba(0,18,51,.4)`
- Button hover `0 10px 24px -12px rgba(0,18,51,.5)` · dialog `0 40px 80px -40px rgba(0,18,51,.6)`
- Header at rest `0 1px 0 #E3E6EC`, once scrolled past 8px `0 1px 0 #E3E6EC, 0 8px 24px -16px rgba(0,18,51,.18)`
- Dropdown panel `0 24px 48px -24px rgba(0,18,51,.35)`

## Buttons and focus
- Primary: navy background, white text, 16px/600, min-height 52px (44px in the header), padding 0 24px, radius 8px. Hover #001233, lift 1px, button-hover shadow.
- Secondary: white background, 1px #CBD1DC, navy text. Hover paper background, navy border, lift 1px.
- Focus (`:focus-visible`): `outline: none; box-shadow: 0 0 0 2px <surface>, 0 0 0 4px #00205B`, where the surface ring is #FFFFFF on white and #F7F5F0 on paper. Industry cards use the inset variant `inset 0 0 0 3px #00205B`. Focus is never removed.

## Icons
Lucide outline family (ISC licence), inlined as a `<symbol>` sprite, never loaded from a CDN at runtime. `stroke-width: 1.75`, round caps and joins, `fill: none`, `currentColor` stroke. 20px inside a 40px tile (radius 10px, 1px #E3E6EC border, #F7F5F0 background, navy glyph); 16px inline for arrows and checks. No filled icons, no mixing icon sets, no illustration, robots, brains, neon, or fake dashboards.

## Motion
- Reveals: 28px travel, 1.5s `cubic-bezier(.16, 1, .3, 1)`, roughly 0.11s stagger, firing at 90% of viewport height. Deliberately slow; do not shorten it to a typical 300ms fade.
- Step ring: 90s per revolution, linear, infinite; pauses on hover and keyboard focus.
- Micro transitions (color, border) 150 to 200ms; transform and shadow 250 to 350ms; header shadow 300ms.
- The reveal mechanism must never be the only thing between the reader and the copy. It is scoped to `.js` and backed by a safety timer, so content renders with JavaScript disabled.
- `prefers-reduced-motion: reduce` disables every transition and animation and resolves reveals immediately.
- No preloader, no hero slideshow, no scroll-driven scenes, no count-up statistics. Nothing delays access to content.

## Voice
Practical, direct, outcome-focused. Name the bottleneck; describe the workflow; state what changed. Soften sweeping promises ("runs without you" becomes "depends less on you day to day"). Never imply AI replaces technical judgment, calibration work, or required QA approval. No invented clients, testimonials, metrics, certifications, or credentials. No pricing anywhere. Texas is our origin, not a customer requirement.

## Open items
1. **Cal.com is live on two of three pages.** The homepage and Calibration mount `devonbooker/calibration-review` (containers `my-cal-inline-systemize-discovery` and `my-cal-inline-calibration-review`), each passing `metadata.industry` so leads arrive tagged. The 3PL page still shows the email fallback: it needs the cofounder's separate calLink, which drops into `calLink` on the `my-cal-inline-3pl-review` container. The homepage currently uses the calibration event type because that is the only link supplied; swap it for a general one if you have it.
2. **3PL copy is provisional.** The cofounder's precise 3PL specialty is unconfirmed, so the page keeps its claims broad and does not assume brokerage, warehousing, or fulfillment. Review before launch.
3. **Case studies** are anonymized with figures removed and may still read as unverifiable proof. The page may be relabelled or retired.
4. **Founder information.** No names, biographies, or credentials exist in this repository, so none were invented. The About page speaks as a firm.
5. **Fonts.** Platform-dependent rendering, as described under Typography.
