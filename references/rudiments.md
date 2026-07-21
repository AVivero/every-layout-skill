# Rudiments — the axioms behind every primitive

Primitives are the *what*; rudiments are the *why*. Set these globally so primitives inherit
them, instead of repeating values per element.

## Boxes

Everything in layout is a box (content, padding, border, margin). Layout is the arrangement
of boxes. `every-layout.css` ships a `box-sizing: border-box` reset (`*, *::before,
*::after`) so padding and border count toward an element's size — the model the primitives assume.

## Units — deal in tolerances, not fixed sizes

Fixed widths/heights are anathema to responsive design. Prefer:

- `ch` for measure (line length), because it scales with `font-size`.
- `rem` for spacing/type, driven by the modular scale.
- `min()`, `max()`, `clamp()` to let the browser choose within tolerances.
- Viewport units (`vh`/`vi`) for cover-style regions.

## The modular scale

One `--ratio` (default `1.5`) generates every spacing and type step (`--s-5`..`--s5` in
`every-layout.css`). `1.5` is chosen because it approximates a typical body `line-height`: one
line of text is roughly `1rem × 1.5`, which is exactly `--s1`. Vertical rhythm derives from
that relationship because text dominates most pages; `every-layout.css` does not itself set a
`line-height` — pair the scale with whatever line-height your project declares.

## The measure axiom

"The measure should never exceed ~60ch." `every-layout.css` seeds this by capping
`max-inline-size: var(--measure)` on the text-bearing elements themselves — `p`, `h1`–`h6`,
`blockquote`, `figcaption` — because `max-inline-size` doesn't inherit, so the cap must sit on
the text, not an ancestor. Images, media, tables, form controls, and layout containers are
deliberately left uncapped. The Center primitive re-declares the cap on its own box to hold
arbitrary content (not just text) to the measure. List items (`li`, `dd`) are intentionally left
uncapped too, so a `<ul>`/`<ol>` can double as a layout row or card list; for a uniform measure
across mixed prose — paragraphs and lists together — wrap the block in a `.center` rather than
relying on the per-element cap. Because `ch` tracks `font-size`, the measure stays correct without
a hardcoded pixel width.

## Global-and-local styling — three tiers

1. **Universal / inherited** styles (including the measure axiom) — the defaults.
2. **Layout primitives** — the classes in `every-layout.css`.
3. **Utility classes** — last-resort per-element exceptions.

Seed axioms as high up (tier 1) as possible; reach for utility classes *last*, not first.

## Custom properties as the API

Each primitive exposes tuning via custom properties with fallbacks (e.g.
`--space`, `--measure`, `--sidebar-width`, `--threshold`, `--grid-min`). Set them on the
element or a wrapper; never hoist a child's `--space` onto a parent that may itself become a
nested child (it would get overridden).
