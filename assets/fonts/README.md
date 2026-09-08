# Fonts

Inter, self hosted and subsetted to Latin, under the SIL Open Font License 1.1.
`OFL.txt` is the licence and must stay alongside the font files.

```
inter-400-normal.woff2    body copy
inter-500-normal.woff2    labels, nav, buttons
inter-600-normal.woff2    card titles, subheads
inter-700-normal.woff2    H1 and H2
inter-500-italic.woff2    the accent phrase ending every H1 and H2
```

Declared in the `@font-face` block at the top of `css/style.css`, with
`font-display: swap`. The 400 and 700 faces are preloaded in every page head.

## Do not add SF Pro

SF Pro was the original design direction. It cannot be used here. Apple licenses it
solely for creating mock-ups of interfaces running on Apple platforms, and the licence
embedded in the font files says plainly that it may not be embedded in any product, nor
used to create or display website content. That applies regardless of the `fsType` bit
in the files, which Apple left at its permissive default.

Inter was drawn on close to the same proportions and is licensed for exactly this use.

The repository's `.gitignore` blocks `.otf`, `.ttf`, `.dmg`, `.pkg` and `.zip` so font
source packages cannot be committed by accident. This repository is public and Vercel
serves its root as static files, so anything committed here is downloadable on the live
domain.
