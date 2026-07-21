# Switcher

The Switcher (`.switcher`) is the primitive for a small set of equal elements that sit side by
side above a certain width and stack vertically below it — flipping all at once, based on the
*container's* own width rather than the viewport's.

## The problem

A row of two-to-four equal panels (feature cards, a pair of stat boxes) reads badly once the row
gets too narrow for its children — text wraps awkwardly, panels get squeezed thinner than their
content wants. The usual fix is a viewport media query, but that's the wrong signal: the same
Switcher might live in a full-width section on one page and a narrow sidebar slot on another, and
a viewport-based breakpoint can't tell the difference. The Switcher flips based on the *container's*
available width instead, using a `flex-basis` calculation that snaps every child from "wants 100%
of the row" to "wants a share of the row" (and back) all at once, rather than each item wrapping
independently the way default flex-wrap would.

## Canonical CSS

```css
/* ---- The Switcher: row-to-column flip at a content threshold ---- */
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 1rem);
}
.switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--threshold, 30rem) - 100%) * 999);
}
.switcher > :nth-last-child(n + 5),
.switcher > :nth-last-child(n + 5) ~ * {
  flex-basis: 100%; /* quantity threshold: stack when 5+ items */
}
```

## API

- `--threshold` — the container width at which the Switcher flips between stacked and row layout.
  The CSS fallback and effective default are both `30rem` (no `:root` override ships for it).
  Below this width, `(--threshold - 100%)` is positive and multiplying it by `999` forces
  `flex-basis` to a huge value, so each child claims the full row and wraps onto its own line;
  above it, the same expression goes negative and clamps to `0`, so children happily share a row.
- `--space` — the `gap` between children in both axes. The `gap: var(--space, 1rem)` fallback
  of `1rem` only applies if `--space` is out of scope entirely; `every-layout.css`'s `:root` sets
  `--space: var(--s1)` (`1.5rem`), which inherits down to every `.switcher`, so the effective
  default gap is `1.5rem`.
- The `:nth-last-child(n + 5)` rule (plus its `~ *` sibling selector) is a *quantity* threshold,
  independent of `--threshold`: once a Switcher has five or more direct children, every child gets
  `flex-basis: 100%` and the Switcher stacks unconditionally, regardless of container width.

## When to reach for it

Small, fixed sets of equal-weight elements — typically two to four cards, panels, or media
objects — that should sit in a tidy row when there's room and stack cleanly rather than being
squeezed into an awkwardly narrow column when there isn't.

## Pitfalls

- The `* 999` in the `flex-basis` calc is deliberate, not an arbitrary tuning knob: it's what turns
  a small positive-or-negative number into a value that's effectively either "0" or "way more than
  100%," producing a hard binary flip instead of a gradual, independent-per-item wrap. Don't
  "simplify" it down to a smaller multiplier — that reintroduces uneven, partial wrapping.
- The Switcher is meant for a small, fixed number of items, not a growing collection — the
  `:nth-last-child(n + 5)` rule exists precisely to force-stack once you exceed that count, since a
  wide row of many equal-width flex items isn't the Switcher's job. For galleries, card decks, or
  any open-ended list, use Grid instead.
- `.switcher` is a layout container, so the measure axiom (which caps only text elements — `p`,
  headings, `blockquote`, `figcaption`) never clips it; text *inside* a panel still caps at the
  measure via those text elements or a wrapping `.center`.

## Example

```html
<div class="switcher" style="--threshold: 30rem">
  <div class="box">Panel one</div>
  <div class="box">Panel two</div>
  <div class="box">Panel three</div>
</div>
```
