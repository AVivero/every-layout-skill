---
name: every-layout
description: Use when building or adjusting any CSS layout — arranging, spacing, aligning, or making elements responsive (sidebars, card grids, toolbars, centered content, media, sticky footers, overlays). Applies Every Layout's composable primitives and axioms so layouts are intrinsically responsive and free of breakpoint hacks and per-element margins — expressed in whatever styling approach the project already uses (Tailwind, CSS-in-JS, or vanilla CSS).
---

# Every Layout

Make layout decisions the way Every Layout (Heydon Pickering & Andy Bell) teaches: compose a
small set of **primitives**, driven by **axioms**, and dodge the known **pitfalls**. The reasoning
is the point — *which* primitive, *which* axiom, *which* trap to avoid. Express that reasoning in
whatever CSS the project already uses; do not impose a new styling system.

## Core mental model

1. **Style the context, not the element.** Spacing is a property of the *relationship* between
   siblings — inject it from a common parent (`.stack > * + *`), don't glue `margin-bottom` onto
   elements.
2. **Be the browser's mentor, not its micro-manager.** Set axioms (a measure ceiling in `ch`,
   modular-scale spacing, logical properties) and let the browser's algorithms — flex wrapping,
   `min()`/`clamp()`, `auto-fit` — produce the pixels. Avoid fixed widths and device-width media
   queries.
3. **Match the project's stack; don't impose one.** Emit the chosen primitive in whatever styling
   approach the project already uses. Never drop `every-layout.css` into a project that already has
   a styling system — translate the primitive into that system instead.

## How to use this skill

1. **Detect the project's styling approach:**
   - `tailwind.config.*`, `@tailwind` / `@import "tailwindcss"`, or utility classes in the markup → **Tailwind**.
   - `styled-components`, `@emotion`, `@stitches/react`, or `vanilla-extract` in dependencies → **CSS-in-JS**.
   - CSS Modules (`*.module.css`) or plain `.css` / `.scss` with authored class names → **vanilla CSS**.
   - Nothing conclusive (greenfield) → use the vanilla **`every-layout.css`** primitives.
2. **Pick the primitive(s)** for the need — consult `references/decision-tree.md` (intent → primitive
   or composition).
3. **Read the primitive file(s)** in `references/primitives/` for the canonical (vanilla) CSS, its
   custom-property API, and its pitfalls.
4. **Express it in the detected idiom**, translating from that canonical CSS (see *Translating
   faithfully* below). Greenfield → emit the `every-layout.css` classes + custom properties directly.
5. **Apply the axioms** from `references/rudiments.md` (global measure, modular-scale spacing,
   logical properties) in the stack's own global-styles mechanism, and **avoid the pitfalls** the
   primitive doc lists — both are idiom-independent.
6. **Compose** where needed — see `references/composition.md`.

## Translating faithfully (any idiom)

- **Preserve behavior, not syntax.** The primitive's *effect* is the contract — e.g. Switcher's
  binary row↔column flip via `calc((threshold - 100%) * 999)`, Grid's no-overflow
  `minmax(min(--grid-min, 100%), 1fr)`, Sidebar's aggressive `flex-grow: 999`. Reproduce the
  behavior using the idiom's escape hatch (arbitrary values, a `styled` block, an inline style),
  never a lossy approximation.
- **Keep the custom-property API** where the stack supports CSS variables (nearly all do) — it's
  how primitives are tuned (`--space`, `--measure`, `--sidebar-width`, `--threshold`, `--grid-min`, …).
- **Prefer `gap` and logical properties** (`margin-block`, `inline-size`, `inset-*`) in every idiom.
- **Set axioms globally, exceptions locally** — mirror the three-tier model from `rudiments.md`
  (universal styles → primitives → utilities) in the stack's global-styles mechanism.

## The 12 primitives

Stack, Box, Center, Cluster, Sidebar (`.with-sidebar`), Switcher, Cover, Grid, Frame, Reel,
Imposter, Icon. The vanilla class names and CSS live in `every-layout.css`; each primitive doc's
Canonical CSS is your reference for translating into any idiom.

## Vanilla reference

`every-layout.css` is the owned, framework-free implementation — the greenfield/vanilla output and
the reference every translation is derived from. `examples/` contains zero-build HTML pages that
link it, showing the primitives composed.
