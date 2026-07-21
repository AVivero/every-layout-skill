# Sidebar

The Sidebar (`.with-sidebar`) is the primitive for a two-column layout — a sidebar and a main
content area — that share a row while there's room, and wrap to stacked rows once there isn't,
with no media query deciding the break point.

## The problem

A sidebar-plus-content layout is usually built with a breakpoint: above some viewport width the
two columns sit side by side, below it they stack. That breakpoint is a guess about the
*viewport*, but what actually determines whether the layout works is the *content area's*
available width — the same viewport can be too narrow when the sidebar is wide, or plenty wide
when it's narrow. The Sidebar solves this with flexbox sizing instead of a media query: the
content column is given a `min-inline-size` percentage of its own flex container, and a flex-basis
trick (`flex-grow: 999`) that makes it claim all leftover space whenever there is any. The moment
the container can't satisfy that minimum alongside the sidebar's basis, flex-wrap drops the
content onto its own row — a wrap driven by available space, not a hardcoded viewport number.

## Canonical CSS

```css
/* ---- The Sidebar: intrinsic sidebar+content, no media queries ---- */
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 1rem);
}
.with-sidebar > :first-child {
  flex-basis: var(--sidebar-width, 20rem);
  flex-grow: 1;
}
.with-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--content-min, 50%);
}
```

## API

- `--sidebar-width` — the sidebar's ideal `flex-basis`. The CSS fallback is `20rem`, used only if
  no `--sidebar-width` is in scope; there's no `:root` value for it in `every-layout.css`, so
  `20rem` is also the effective default unless you set it.
- `--content-min` — the percentage of the flex container's width below which the content column
  refuses to shrink further and is forced onto its own row instead. This percentage, not a
  viewport breakpoint, is what drives the wrap. The CSS fallback and effective default are both
  `50%` (no `:root` override ships for it either).
- `--space` — the `gap` between the two children, in both axes once wrapped. The `gap: var(--space,
  1rem)` fallback of `1rem` only applies if `--space` is out of scope entirely; `every-layout.css`'s
  `:root` sets `--space: var(--s1)` (`1.5rem`), which inherits down to every `.with-sidebar`, so the
  effective default gap is `1.5rem`.
- Order matters, not naming: the rule targets `:first-child` and `:last-child`, not a "sidebar"
  class. Put the sidebar first or last in markup and give it `--sidebar-width`; whichever position
  you leave for the "main" role is the one that grows (`flex-grow: 999`) to consume the rest.

## When to reach for it

App shells (nav rail plus workspace), settings pages (label column plus form), and media-object
style rows (an avatar or icon plus a text block) — anywhere one column has a natural, roughly
fixed width and the other should flexibly fill whatever room is left, wrapping only when there
genuinely isn't enough of it.

## Pitfalls

- The wrap point is tuned via `--content-min`, a percentage of the container's own width, not a
  viewport-width breakpoint. Resist the urge to reach for a media query to "fix" the wrap
  threshold — adjust `--content-min` (or `--sidebar-width`) instead, and it keeps responding
  correctly however the Sidebar is nested or resized.
- `.with-sidebar` only looks at `:first-child` and `:last-child`, so it expects exactly two direct
  children. A third direct child gets no sizing rules of its own and will not participate in the
  sidebar/content split as intended — wrap extra content inside one of the two children instead of
  adding a third sibling.
- `.with-sidebar` is on the global measure opt-out list in `every-layout.css` (`max-inline-size:
  none`), so it isn't clipped to the `60ch` measure the way ordinary elements are; the measure cap
  still applies inside its children unless they too opt out.

## Example

```html
<div class="with-sidebar" style="--sidebar-width: 20rem; --content-min: 50%">
  <aside class="box">Sidebar navigation</aside>
  <main class="box">Main content, which claims the remaining space or wraps below.</main>
</div>
```
