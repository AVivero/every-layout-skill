# Box

The Box is the primitive for a single padded, bordered region — a card, a callout, an alert —
built so its border stays visible under forced-colors modes and its color scheme can invert
safely.

## The problem

A plain `padding` + `border` combination looks fine in normal rendering, but two things
regularly break it: Windows High Contrast Mode (and other forced-colors user styles) can strip
out a `border` that relies on a subtle color, leaving the Box's edge invisible even though the
author intended it to always be visible; and naive color inversion (swapping a light background
for a dark one, say for a "highlighted" variant) easily leaves descendant text using whatever
color it had before, so inverted content loses contrast against its new background. The Box
solves both: it pairs the `border` with a transparent `outline` that forced-colors modes render
regardless of the declared color, and it forces every descendant to inherit `color` so an
inversion can't leave orphaned, low-contrast text behind.

## Canonical CSS

```css
/* ---- The Box: padding + border that never collapses; safe inversion ---- */
.box {
  padding: var(--s1);
  border: var(--border-thin) solid;
  outline: var(--border-thin) solid transparent; /* visible in Windows High Contrast */
  outline-offset: calc(var(--border-thin) * -1);
  --color-light: #ffffff;
  --color-dark: #000000;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.box * {
  color: inherit;
}
.box.invert {
  color: var(--color-light);
  background-color: var(--color-dark);
}
```

## API

- `--s1` — the padding applied on all sides, pulled from the modular scale.
- `--color-light` / `--color-dark` — the two-color pair the Box swaps between. Override either
  custom property to change the palette without touching the rule that does the swapping.
- `.invert` — a modifier class that flips the pairing (dark text on light becomes light text on
  dark), used for the same Box in a "reversed" visual state.
- The transparent `outline` (offset inward by the border's own width, so it overlays rather than
  doubling the border) is what keeps the Box's edge visible in Windows High Contrast Mode, where
  a color-only `border` can be discarded.

## When to reach for it

Any padded, bordered panel: cards, callouts, alert boxes, sidebars-within-content — anywhere
content needs a visible container that must keep working when colors are overridden by the
user's own accessibility settings.

## Pitfalls

- Don't rely on `border` alone for guaranteed visibility — that's exactly the gap the paired
  `outline: ... transparent` closes. Dropping the outline reintroduces the forced-colors bug.
- `.box * { color: inherit }` exists specifically so `.invert` can't leave descendant text at
  its original (now low-contrast) color; removing that rule silently breaks every inverted Box
  the moment it contains an element with its own explicit `color`.

## Example

```html
<div class="box invert">
  <h3>Heads up</h3>
  <p>This callout inverts to a dark background, and its text inherits the light color safely.</p>
</div>
```
