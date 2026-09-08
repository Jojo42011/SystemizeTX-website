# Fonts

This directory is empty on purpose.

The site requests SF Pro through `@font-face` rules in `css/style.css` that carry
**`local()` sources only**. No font files are downloaded, embedded, or served. SF Pro
therefore renders only on machines that already have it installed, and every other
platform falls through the stack to Segoe UI, Helvetica Neue, Arial, or the system
default.

## Adding licensed webfont files

Only add font files here if you hold a licence that permits embedding them on a public
website. Apple's SF Pro package, as distributed on developer.apple.com, is licensed for
designing and developing for Apple platforms and does not grant general web
redistribution. That call belongs to whoever owns the licence, not to this repository.

If you do have web embedding rights, drop the files here as `.woff2` (convert from
`.otf` first) using these names:

```
SFPro-Regular.woff2       weight 400
SFPro-Medium.woff2        weight 500
SFPro-Semibold.woff2      weight 600
SFPro-Bold.woff2          weight 700
SFPro-MediumItalic.woff2  weight 500, italic
```

Then add a `url()` source ahead of nothing and behind every `local()` source in each
`@font-face` block at the top of `css/style.css`, for example:

```css
@font-face{
  font-family:"SF Pro";
  font-weight:400;
  font-style:normal;
  font-display:swap;
  src:local("SF Pro Text"),local("SF Pro Text Regular"),local("SFProText-Regular"),
      url("../assets/fonts/SFPro-Regular.woff2") format("woff2");
}
```

Keeping `local()` first means anyone who already has SF Pro installed uses their system
copy and downloads nothing.

The italic face matters: every H1 and H2 ends with an italic medium accent phrase, which
is the signature typographic move. Without a real italic the browser will synthesise a
slanted upright, which looks wrong at large sizes.
