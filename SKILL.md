---
name: every-layout
description: Use when building or adjusting any CSS layout — arranging, spacing, aligning, or making elements responsive (sidebars, card grids, toolbars, centered content, media, sticky footers, overlays). Applies Every Layout's composable primitives and axioms so layouts are intrinsically responsive and free of breakpoint hacks and per-element margins.
---

# Every Layout

Make layout decisions the way Every Layout (Heydon Pickering & Andy Bell) teaches:
compose a small set of **primitives**, driven by **axioms**, and emit **canonical CSS the
user owns** — never a dependency, never bespoke breakpoint soup.

## Core mental model

1. **Style the context, not the element.** Spacing is a property of the *relationship*
   between siblings — inject it from a common parent (`.stack > * + *`), don't glue
   `margin-bottom` onto elements.
2. **Be the browser's mentor, not its micro-manager.** Set axioms (a measure ceiling in
   `ch`, modular-scale spacing, logical properties) and let the browser's algorithms —
   flex wrapping, `min()`/`clamp()`, `auto-fit` — produce the pixels. Avoid fixed widths
   and device-width media queries.
3. **The user owns the CSS.** Emit classes + custom properties from `every-layout.css`.
   Do not tell the user to install anything.

## How to use this skill

1. **Identify the need** in plain language ("sidebar that collapses", "equal cards",
   "toolbar that wraps", "centered modal", "prose column").
2. **Pick the primitive(s)** — read `references/decision-tree.md` to map intent → primitive
   or composition.
3. **Read the primitive file(s)** in `references/primitives/` for the canonical CSS, its
   custom-property API, and its pitfalls.
4. **Apply the axioms** from `references/rudiments.md` (global measure, modular-scale spacing,
   logical properties) rather than per-element values.
5. **Emit** the class + custom properties, and ensure the primitive's CSS from
   `every-layout.css` is present in the project (or copy the relevant block in).
6. **Compose** where needed — see `references/composition.md`.

## The 12 primitives

Stack, Box, Center, Cluster, Sidebar (`.with-sidebar`), Switcher, Cover, Grid, Frame,
Reel, Imposter, Icon. Class names are fixed; see `every-layout.css` for each.

## Runnable references

`examples/` contains zero-build HTML pages that link `every-layout.css` — point to them
for concrete, composed layouts.
