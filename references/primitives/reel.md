# Reel

The Reel (`.reel`) is the primitive for a horizontally scrolling track — a carousel or card rail —
that keeps its items in a single row with native, usable scroll behavior.

## The problem

A horizontal set of media or cards (a carousel, a "related items" rail) needs to stay in one row
and scroll sideways instead of wrapping, while still using the browser's own scroll mechanics
rather than a JavaScript-driven slider library. Left alone, flex or inline children wrap onto new
lines once they run out of horizontal room, and once you do force a single row you still need a
consistent item width, a visible scrollbar affordance, and gap spacing between items. The Reel
solves this with a flex row that scrolls on the inline axis, a default flex-basis for its
children, and a small set of custom properties to tune sizing and appearance.

## Canonical CSS

```css
/* ---- The Reel: horizontally scrolling track ---- */
.reel {
  display: flex;
  block-size: var(--reel-height, auto);
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: var(--reel-thumb, #000) var(--reel-track, #fff);
}
.reel > * {
  flex: 0 0 var(--reel-item-width, 25%);
}
.reel > img {
  block-size: 100%;
  flex-basis: auto;
  inline-size: auto;
}
.reel > * + * {
  margin-inline-start: var(--space, 1rem);
}
.reel.overflowing {
  padding-block-end: var(--space, 1rem);
}
```

## API

- `--reel-item-width` — the flex-basis of each item (`flex: 0 0 var(--reel-item-width, 25%)`); the
  CSS fallback is `25%` of the Reel's own width, so with no override four items fit per viewport
  width before scrolling starts. Set it to a fixed length (e.g. `20rem`) for consistently sized
  cards regardless of the Reel's own width.
- `--reel-height` — sets `block-size` on the Reel itself; the fallback is `auto`, so by default the
  Reel is only as tall as its tallest item.
- `--reel-thumb` / `--reel-track` — feed `scrollbar-color: var(--reel-thumb, #000) var(--reel-track,
  #fff)`, styling the (still browser-native) scrollbar thumb and track colors.
- `--space` — the gap between items, applied via `margin-inline-start` on every item after the
  first (`.reel > * + *`), and also the bottom padding added once `.overflowing` is present. The
  rule's own fallback is `1rem`, but `every-layout.css`'s `:root` sets `--space: var(--s1)`
  (`1.5rem`), which inherits down to the Reel, so the effective default gap is `1.5rem` unless
  `--space` is overridden locally or the Reel sits somewhere that fallback can't reach.
- `.overflowing` — a modifier class you toggle yourself, not a state CSS can detect on its own (see
  Pitfalls). While present, it adds `padding-block-end: var(--space, 1rem)` to reserve room for the
  scrollbar so it doesn't overlap the last row of content.
- An `img` that is a direct child of `.reel` (not wrapped) is instead sized by `block-size: 100%;
  flex-basis: auto; inline-size: auto`, i.e. it fills the Reel's height and takes its own natural aspect
  ratio's width, ignoring `--reel-item-width`.

## When to reach for it

Media carousels, horizontal card rails ("related products", "more from this author"), and any row
of items that should scroll rather than wrap once it overflows the available width.

## Pitfalls

- `.overflowing` is not automatic — CSS has no way to select an element for having overflowed
  content. You must toggle the class yourself, typically with a small script that compares
  `element.scrollWidth > element.clientWidth` (e.g. on load and on resize) and adds/removes
  `overflowing` accordingly. Shipping the class in markup unconditionally, or never toggling it at
  all, means the bottom padding either always or never appears regardless of whether the Reel is
  actually scrollable.
- Because the Reel scrolls with the browser's native scrollbar and supports standard touch/trackpad
  gestures, it's reasonably accessible by default, but a mouse-only user without a scroll wheel that
  moves horizontally may have no way to reach later items unless you also expose scroll buttons or
  ensure the Reel is keyboard-focusable and scrollable via arrow keys.
- `.reel > img` (unwrapped images) bypasses `--reel-item-width` entirely — if you need consistent
  item widths for images, wrap each one in another element rather than placing it as a direct child.

## Example

```html
<!-- Each image is wrapped so --reel-item-width applies: a bare `.reel > img` is
     instead sized by height, per the `.reel > img` rule above. -->
<div class="reel" style="--reel-item-width: 20rem">
  <div><img src="one.jpg" alt="" /></div>
  <div><img src="two.jpg" alt="" /></div>
  <div><img src="three.jpg" alt="" /></div>
</div>
```
