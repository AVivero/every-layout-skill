# Imposter

The Imposter (`.imposter`) is the primitive for positioning an element centered over another,
lifting it out of the normal document flow entirely.

## The problem

Modals, tooltips, "new" badges pinned to a corner of a card, and other overlay elements need to sit
on top of some other piece of content — centered over it — without pushing that content around or
being constrained by its parent's own layout (flex/grid gaps, padding, sibling flow). Flow layout
has no notion of "on top of"; it only has "next to" and "below". The Imposter solves this with
absolute positioning: it's taken out of flow, offset to the center of its positioning context, then
pulled back by exactly half its own size with a `transform`, landing it dead-center regardless of
its own dimensions.

## Canonical CSS

```css
/* ---- The Imposter: element centered over a positioned ancestor ---- */
.imposter {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
}
.imposter.contain {
  --imposter-margin: 0px;
  overflow: auto;
  max-inline-size: calc(100% - (var(--imposter-margin) * 2));
  max-block-size: calc(100% - (var(--imposter-margin) * 2));
}
```

## API

- No custom property drives the base `.imposter` positioning — centering is fixed at `50%` /
  `50%` plus a `translate(-50%, -50%)` correction, which is what centers the element regardless of
  its own width/height.
- `.imposter.contain` — an additional modifier for when the imposed content might be bigger than
  its container. It caps the element's size to the container minus `--imposter-margin` on each
  side (`calc(100% - (var(--imposter-margin) * 2))` for both axes) and sets `overflow: auto`, so
  content past that cap scrolls internally instead of blowing out past the container's edges.
- `--imposter-margin` — the breathing room kept between the contained Imposter and the edge of its
  positioning context. Its default, set right on the `.imposter.contain` rule itself, is `0px` —
  so without an override, `.contain` lets the Imposter grow to fill the container exactly, only
  clipping/scrolling once it would exceed 100%.

## When to reach for it

Modals and dialogs, tooltips and popovers, "new"/"sale" badges pinned over a card corner, and any
overlay that needs to sit centered on top of another element without disturbing that element's
layout.

## Pitfalls

- `position: absolute` positions relative to the nearest ancestor that is itself positioned (i.e.
  has any `position` other than `static`). The Imposter's containing block **must** have
  `position: relative` (or `absolute`/`fixed`/`sticky`) set explicitly — otherwise the browser
  keeps walking up the tree until it finds one, which is very often `<body>` or the initial
  containing block, and the Imposter ends up centered over the whole page instead of the intended
  card or box.
- CSS positioning is not accessibility. An Imposter used as a modal, popover, or tooltip needs
  focus management (trapping focus inside it while open, returning focus on close), keyboard
  dismissal (Escape), and appropriate ARIA (`role="dialog"`, `aria-modal="true"`, labelling) — none
  of which the `.imposter` class provides. Treat this primitive as solving the visual positioning
  problem only; the interaction and semantics are a separate, necessary layer of work.
- `.contain`'s size cap is relative to the Imposter's own containing block (`100%` of it), not the
  viewport — if that containing block is small, `--imposter-margin` and the `max-inline-size` /
  `max-block-size` caps will constrain the Imposter to that small box, which may not be the
  intended "don't exceed the viewport" behavior for something like a full-screen modal.

## Example

```html
<div class="box" style="position: relative">
  <span class="imposter contain" style="--imposter-margin: 1rem">
    Overlay content
  </span>
</div>
```
