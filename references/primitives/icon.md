# Icon

The Icon (`.icon`) is the primitive for sizing an inline icon to the surrounding text and keeping
it baseline-aligned beside a label, via the companion `.with-icon` wrapper.

## The problem

An icon placed next to a text label — inside a button, a link, a status line — needs to scale with
that text's font size (so it doesn't look oversized or undersized at different type scales) and
needs to align with the text rather than sitting a few pixels above or below the baseline the way
inline SVGs and images tend to by default. Fixed pixel dimensions on the icon break the moment the
surrounding font size changes, and default inline-block alignment leaves a visible vertical
mismatch between glyph and text. The Icon solves the first problem by sizing itself in
text-relative units, and the `.with-icon` wrapper solves the second by using flexbox's
`align-items: baseline` to line the icon up with the text's baseline.

## Canonical CSS

```css
/* ---- The Icon: text-sized inline icon, baseline-aligned to adjacent text ---- */
.icon {
  block-size: 0.75em;
  block-size: 1cap;
  inline-size: 0.75em;
  inline-size: 1cap;
}
.with-icon {
  display: inline-flex;
  align-items: baseline;
}
.with-icon .icon {
  margin-inline-end: var(--space, 0.5rem);
}
```

## API

- `.icon` sizes both axes with a declaration pair: `0.75em` is declared first as a widely-supported
  fallback, then immediately overridden by `1cap` — the cap-height unit — in browsers that
  understand it. Where `1cap` is supported, the icon is sized to the text's actual cap height (the
  height of a capital letter in the current font) rather than an approximation; where it isn't, the
  `0.75em` fallback stands.
- `.with-icon` is the wrapper you put around both the icon and its label. `display: inline-flex`
  keeps the pair inline with surrounding text while giving access to flex alignment, and
  `align-items: baseline` is what actually lines the icon up with the label's text baseline instead
  of its default (often bottom- or middle-aligned) inline box position.
- `--space` sets the gap between the icon and the label, applied as `margin-inline-end` on `.icon`
  inside a `.with-icon` (`.with-icon .icon { margin-inline-end: var(--space, 0.5rem) }`). That
  rule's own fallback is `0.5rem`, but `every-layout.css`'s `:root` sets `--space: var(--s1)`
  (`1.5rem`), which inherits into `.with-icon .icon` the same as anywhere else `--space` is used —
  so the effective default gap is `1.5rem`, not the `0.5rem` written in the fallback, unless
  `--space` is overridden locally (e.g. to something tighter like `--space: 0.5em` for a compact
  icon button).

## When to reach for it

Buttons and links with a leading or trailing icon, inline status glyphs next to a label (a
checkmark before "Complete", a warning triangle before an error message), and anywhere a small
graphic needs to read as part of a line of text rather than a separate block.

## Pitfalls

- Icons that are purely decorative — the label text already conveys the same information — need
  `aria-hidden="true"` on the icon element so assistive technology doesn't announce it (or, worse,
  read out an unhelpful `alt`/title). If the icon is the *only* conveyor of meaning (no adjacent
  text label), it needs an accessible name instead (`aria-label`, `<title>` inside the SVG, or
  equivalent) rather than being hidden.
- The `1cap` sizing is deliberately layered over an `em`-based fallback rather than used alone;
  don't strip the `0.75em` declaration when customizing this rule; `1cap` support is solid in
  evergreen browsers but the fallback is what keeps older ones from rendering an unsized (or
  browser-default-sized) icon.
- The `var(--space, 0.5rem)` fallback of `0.5rem` only applies where `--space` is completely out of
  scope; because `:root` sets `--space: 1.5rem`, don't assume a `.with-icon` will render with tight
  `0.5rem` spacing out of the box; override `--space` locally if that's the intended gap.

## Example

```html
<span class="with-icon">
  <svg class="icon" aria-hidden="true"><use href="#check" /></svg>
  Complete
</span>
```
