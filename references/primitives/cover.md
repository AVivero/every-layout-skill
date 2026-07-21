# Cover

The Cover (`.cover`) is the primitive for a region with a guaranteed minimum height that
vertically centers one principal element — a heading, a logo — while letting optional elements
sit pinned above and below it.

## The problem

Vertically centering a single element inside a region that also needs a fixed header and/or
footer is fiddly with plain flow: naive `margin: auto` centering on the wrong axis, or absolute
positioning, tends to fight with the header/footer instead of coexisting with them, and the region
itself needs an explicit minimum height (a full viewport for a hero, say) that content alone won't
guarantee. The Cover solves this with a column flex container whose children get automatic
block-axis margin, and one designated child (`.cover-centered`) whose margin is set to `auto` on
both sides — which claims all remaining space equally above and below it, vertically centering it
between whatever header and footer siblings exist, however many or few there are.

## Canonical CSS

```css
/* ---- The Cover: min-height region with a vertically centered principal child ---- */
.cover {
  display: flex;
  flex-direction: column;
  min-block-size: var(--cover-min, 100vh);
  padding: var(--space, 1rem);
}
.cover > * {
  margin-block: var(--space, 1rem);
}
.cover > :first-child:not(.cover-centered) {
  margin-block-start: 0;
}
.cover > :last-child:not(.cover-centered) {
  margin-block-end: 0;
}
.cover > .cover-centered {
  margin-block: auto;
}
```

## API

- `--cover-min` — the minimum block size of the region. The CSS fallback and effective default are
  both `100vh` (no `:root` override ships for it), which is why a `.cover` reads as a full-viewport
  hero out of the box; set it locally for a shorter region, e.g. inside a card.
- `--space` — drives both the Cover's own `padding` and the `margin-block` injected between its
  children. The `var(--space, 1rem)` fallback of `1rem` only applies if `--space` is out of scope
  entirely; `every-layout.css`'s `:root` sets `--space: var(--s1)` (`1.5rem`), which inherits down
  to every `.cover`, so the effective default for both the padding and the inter-child margin is
  `1.5rem`.
- `.cover-centered` — the modifier class marking which direct child is the principal, vertically
  centered element. That child's `margin-block` is `auto` on both sides, so it's pushed away from
  both the top and bottom by equal amounts, centering it in whatever space the header/footer
  siblings don't occupy.

## When to reach for it

Hero sections (background plus a centered headline, optional nav above and CTA below), cards that
need a pinned header and/or footer around a centered body, and splash/landing screens that must
fill the viewport with one focal element regardless of how much surrounding content exists.

## Pitfalls

- Exactly one child should carry `.cover-centered`. The centering behavior comes from that single
  child's `margin-block: auto` claiming the leftover space; marking two children `.cover-centered`
  splits that space between two "centered" elements instead of centering one against the rest.
- The first and last children lose their outer `margin-block` by design — `:first-child:not(.cover-
  centered)` and `:last-child:not(.cover-centered)` zero out the block-start/block-end margin so the
  Cover's own `padding` is the only space at the very top and bottom, not padding plus a doubled-up
  child margin. If the first or last child *is* `.cover-centered`, that `:not()` guard doesn't
  apply and its `margin-block: auto` centering takes over instead.
- `.cover` is a layout container, so the measure axiom (which caps only text elements — `p`,
  headings, `blockquote`, `figcaption`) never clips the region; text *inside* it still caps at the
  measure via those text elements or a wrapping `.center`.

## Example

```html
<div class="cover" style="--cover-min: 100vh">
  <header class="box">Site header</header>
  <h1 class="cover-centered">Centered headline</h1>
  <footer class="box">Footer content</footer>
</div>
```
