# Stack

Flow content — the everyday vertical rhythm of headings, paragraphs, and form fields — needs
consistent space between siblings. The Stack is that primitive: one rule, applied to a parent,
that puts space *between* children without anyone having to think about margins again.

## The problem

Margin is a relationship between elements, not a property of a single element. A rule like
`p { margin-bottom: 1.5rem }` gets this backwards: it bakes the space into the element itself,
so every paragraph carries a trailing margin whether or not another element follows it. That
leaks a redundant margin on the last child of a container, and when the container itself has
padding, the two add up — you get the padding *and* the orphaned margin stacking against the
next box. The Stack fixes this by putting the spacing decision on the parent and only applying
it *between* children (`* + *`), so the first and last child never carry an unwanted margin.

## Canonical CSS

```css
/* ---- The Stack: injects margin between flow siblings via their parent ---- */
.stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.stack > * {
  margin-block: 0;
}
.stack > * + * {
  margin-block-start: var(--space, 1.5rem);
}
```

## API

- `--space` — the gap injected between each pair of siblings. Defaults to `1.5rem`. Set it on
  the `.stack` element itself (not on a distant ancestor) so it doesn't leak or get overridden
  by a nested Stack that expects its own default.
- **Grouping to the edges:** because `.stack` is `display: flex; flex-direction: column`, you
  can push everything *after* a given child toward the bottom, while that child and everything
  before it stay grouped at the top, by giving it an `auto` block-end margin, e.g.
  `.stack > :nth-child(2) { margin-block-end: auto }` — the auto margin consumes the leftover
  space immediately below the 2nd child, so children 1 and 2 hold together at the top and every
  sibling from the 3rd onward is shoved down to the end of the flex container, the same trick as
  `margin-inline-end: auto` in a row layout, just rotated onto the block axis.

## When to reach for it

Any vertical flow of related content: an article body, a stack of form fields, the internals
of a card (title, body, meta, actions). Whenever elements are simply "one after another"
rather than needing individual, per-element spacing, reach for the Stack instead of styling
each element's own margin.

## Pitfalls

- The recursive variant (something like `.stack * + *`, applying the rule to *all* descendants
  rather than direct children) over-spreads: it reaches into nested lists, nested Stacks, and
  any other descendant structure, adding space where you didn't ask for it. Prefer the
  direct-child selector (`.stack > * + *`) and nest an explicit `.stack` where you want a new
  rhythm to start.
- Set `--space` on the Stack element that needs the custom value, not on a shared parent.
  Hoisting it up "to save a declaration" backfires the moment that parent contains a second,
  unrelated Stack that was expecting the default — it inherits the override too.
- An inline element like `<label>` won't respond to block-axis margin at all until it's
  `display: block` (or `inline-block`/`flex`/etc.) — the Stack's spacing silently does nothing
  to inline children.

## Example

```html
<div class="stack" style="--space: var(--s2)">
  <h2>Section title</h2>
  <p>First paragraph of body copy, spaced from the heading above it.</p>
  <p>A second paragraph, spaced the same amount from the first.</p>
</div>
```
