# Cluster

The Cluster groups items — buttons, tags, nav links — that should sit together and wrap onto
new lines as a group when space runs out, with even spacing preserved in both directions.

## The problem

Groups of inline-ish items (button rows, tag lists, toolbar controls) rarely fit on one line at
every viewport width. Once they wrap, you need the gap to stay even both between items on the
same row *and* between rows — something `inline-block` plus manual margins can't do without
negative-margin offsetting tricks to cancel the wrapped edge. The Cluster solves this with
`flex-wrap` and `gap`, which apply evenly in both axes automatically, however the items reflow.

## Canonical CSS

```css
/* ---- The Cluster: wrapping group with even gaps (toolbars, tags) ---- */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 1rem);
  justify-content: flex-start;
  align-items: center;
}
```

## API

- `--space` — the gap between items, applied evenly in both the row and column direction via
  `gap`. Defaults to `1rem`.
- `justify-content` — tunes how items align along the main axis (e.g. switch to `center` or
  `space-between` for a differently distributed toolbar); override it per instance as needed.
- `align-items` — tunes cross-axis alignment of items of differing heights; defaults to
  `center` so mismatched item heights (an icon next to text, say) line up on their centers.

## When to reach for it

Button groups, tag lists, navigation toolbars, and meta rows (byline plus date plus tags) —
any set of items that reads as a loose group and should wrap as a unit rather than overflow or
break awkwardly mid-item.

## Pitfalls

- Don't reach for the Cluster when you actually want equal-width columns — that's a job for
  Grid or Switcher, which control track sizing explicitly; the Cluster's items size to their own
  content.
- Because spacing comes from `gap`, there's no need (and no benefit) to reintroduce
  negative-margin wrapping hacks to cancel a trailing gap on the last item per row — `gap`
  already only applies *between* items, not around the group.

## Example

```html
<ul class="cluster" role="list">
  <li><a href="#">Design</a></li>
  <li><a href="#">Engineering</a></li>
  <li><a href="#">Writing</a></li>
</ul>
```
