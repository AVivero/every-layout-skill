# Center

The Center is the primitive for a horizontally centered column that's capped to a comfortable
reading measure and given gutters — the shape behind most "page wrapper" and prose-column
layouts.

## The problem

Centering a block and capping its width sounds trivial, but the naive version — a fixed
`max-width` plus `margin: 0 auto` — conflates two separate concerns: how wide the column is
allowed to get, and how much breathing room it has from the viewport edge. Add `padding` to get
that breathing room and you either shrink the usable content area (with the default
`border-box`) or blow past the intended cap (if padding isn't accounted for at all). The Center
resolves this by switching to `box-sizing: content-box` for just this element, so `padding-inline`
adds gutters *outside* the measure instead of eating into it, while `margin-inline: auto` does
the actual centering.

## Canonical CSS

```css
/* ---- The Center: horizontally centered, measure-capped column ---- */
.center {
  box-sizing: content-box;
  margin-inline: auto;
  max-inline-size: var(--measure);
  padding-inline: var(--s1);
}
```

## API

- `--measure` — the maximum inline size of the column, inherited from the global measure axiom
  (default `60ch`) unless overridden locally.
- `box-sizing: content-box` — deliberately opts out of the project-wide `border-box` default so
  that `padding-inline` is additive to `--measure` rather than subtracted from it; the gutters
  sit outside the capped content width.
- `padding-inline` — the gutter space between the centered column and the viewport edge,
  defaulting to `--s1` from the modular scale.

## When to reach for it

Prose columns (article bodies, long-form text) and page-level wrappers that need a comfortable,
centered measure with consistent side gutters — anywhere content shouldn't stretch edge-to-edge
on wide viewports.

## Pitfalls

- `.center` is deliberately *not* on the global measure opt-out list. The global
  `* { max-inline-size: var(--measure) }` rule is opted out (`max-inline-size: none`) by
  structural containers like `.stack`, `.cluster`, `.with-sidebar`, `.switcher`, `.cover`,
  `.grid`, `.frame`, and `.reel` in `every-layout.css` — but `.center` re-declares
  `max-inline-size: var(--measure)` on itself, because enforcing the measure cap *is* the
  primitive's job. Don't nest a `.center` inside another `.center` (or otherwise) expecting it
  to go full-width; if you need a width-spanning structure, wrap it in a container that's
  actually on the opt-out list instead.
- Centering the *box* is not the same as centering the *text* inside it — `.center` only
  handles layout position via `margin-inline: auto`; it does not center inline text. If you
  also want centered text, that's a separate, deliberate `text-align: center` decision, not
  something the primitive implies.

## Example

```html
<main class="center" style="--measure: 60ch">
  <h1>Article title</h1>
  <p>Body copy sits in a column capped to a comfortable measure, centered in the viewport.</p>
</main>
```
