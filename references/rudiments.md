# Rudiments — the axioms behind every primitive

Primitives are the *what*; rudiments are the *why*. Set these globally so primitives inherit
them, instead of repeating values per element.

## Boxes

Everything in layout is a box (content, padding, border, margin). Layout is the arrangement
of boxes. Prefer `box-sizing: border-box` project-wide.

## Units — deal in tolerances, not fixed sizes

Fixed widths/heights are anathema to responsive design. Prefer:

- `ch` for measure (line length), because it scales with `font-size`.
- `rem` for spacing/type, driven by the modular scale.
- `min()`, `max()`, `clamp()` to let the browser choose within tolerances.
- Viewport units (`vh`/`vi`) for cover-style regions.

## The modular scale

One `--ratio` (default `1.5`, matching a `1.5` body `line-height`) generates every spacing
and type step (`--s-5`..`--s5` in `every-layout.css`). Vertical rhythm derives from the body
`line-height` because text dominates most pages.

## The measure axiom

"The measure should never exceed ~60ch." Seed it globally:
`* { max-inline-size: var(--measure); }` and opt structural containers out with
`max-inline-size: none`. `every-layout.css` already does this. Because `ch` tracks
`font-size`, the measure stays correct without a hardcoded pixel width.

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
