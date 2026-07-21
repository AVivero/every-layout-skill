# Grid

The Grid (`.grid`) is the primitive for a responsive grid of equal-minimum-width cells that fits
as many columns as the available space allows, with no breakpoints and no risk of overflow on
narrow screens.

## The problem

A responsive card grid is traditionally built as a series of breakpoints — two columns here, three
there, four beyond that — each one a guess about which viewport widths deserve which column count.
CSS Grid's own `auto-fit`/`minmax()` combination already solves the "as many columns as fit"
problem without media queries, but a plain `minmax(250px, 1fr)` has a gap: if the viewport (or
container) is ever narrower than that minimum, the track can't shrink below it and the grid
overflows its parent. The Grid closes that gap by wrapping the minimum in `min(var(--grid-min,
250px), 100%)`, so the effective per-column minimum is whichever is smaller — the intended pixel
minimum, or the full available width — which is what lets a single column still fit correctly on a
narrow phone screen instead of forcing horizontal overflow.

## Canonical CSS

```css
/* ---- The Grid: auto-fitting equal columns, no breakpoints ---- */
.grid {
  display: grid;
  gap: var(--space, 1rem);
}
@supports (width: min(250px, 100%)) {
  .grid {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(var(--grid-min, 250px), 100%), 1fr)
    );
  }
}
```

## API

- `--grid-min` — the ideal minimum width of each cell before the Grid adds another column. The CSS
  fallback and effective default are both `250px` (no `:root` override ships for it); raise it for
  fewer, wider cells or lower it for more, narrower ones.
- `--space` — the `gap` between cells, in both axes. The `gap: var(--space, 1rem)` fallback of
  `1rem` only applies if `--space` is out of scope entirely; `every-layout.css`'s `:root` sets
  `--space: var(--s1)` (`1.5rem`), which inherits down to every `.grid`, so the effective default
  gap is `1.5rem`.
- `min(var(--grid-min), 100%)` — not a separate custom property, but the mechanism that prevents
  overflow: the per-column minimum is capped at `100%` of the available width, so a viewport
  narrower than `--grid-min` still gets a single, fully-shrunk column instead of a horizontal
  scrollbar.

## When to reach for it

Galleries, card decks, and dashboard tiles — any open-ended collection of same-shaped items where
you want CSS itself to decide the column count from available space, rather than hand-picking
column counts at a handful of breakpoints.

## Pitfalls

- The column-generating rule is wrapped in `@supports (width: min(250px, 100%))` because it
  depends on `min()` support; browsers without it still get `display: grid` and the `gap`, but fall
  back to the browser's default single implicit column rather than the auto-fit track sizing.
  That's a deliberate progressive-enhancement fallback, not a bug to "fix" by removing the
  `@supports` guard.
- `.grid` uses `auto-fit`, not `auto-fill`: empty tracks collapse, so when the items don't fill
  every possible column the ones present stretch to fill the row instead of leaving a trailing gap
  of empty tracks. If you'd rather each cell keep a fixed maximum width and leave that trailing
  space, swap `auto-fit` for `auto-fill` and give the cells a `max-inline-size`.
- The Grid is for an open-ended or larger number of equal cells. For a small, fixed number of
  items (roughly two to four) that should flip between a row and a stack as a single unit rather
  than reflow independently, use Switcher instead — Grid's per-cell auto-fitting isn't built for
  that binary flip.
- `.grid` is a layout container, so the measure axiom (which caps only text elements — `p`,
  headings, `blockquote`, `figcaption`) never clips the grid or its cells; text *inside* a cell
  still caps at the measure via those text elements or a wrapping `.center`.

## Example

```html
<div class="grid" style="--grid-min: 15rem">
  <div class="box">Card one</div>
  <div class="box">Card two</div>
  <div class="box">Card three</div>
  <div class="box">Card four</div>
</div>
```
