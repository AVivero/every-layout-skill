# Composition — nesting primitives

Primitives are designed to nest. A few rules keep compositions predictable.

## Each primitive owns one axis of concern
Stack owns vertical rhythm; Cluster/Sidebar/Switcher own horizontal grouping; Box owns
surface; Center/Cover own placement. Nest by concern, e.g. a Box that contains a Stack.

## Custom properties are set where they apply, not hoisted
Set `--space` on the specific Stack/Cluster that needs it. Do **not** move a child's
`--space` up to a parent that might itself become a nested child — it would be overridden
when nested (see rudiments, custom-property API).

## Measure opts out for structural wrappers
Layout containers carry `max-inline-size: none` (in `every-layout.css`); only text-bearing
leaves inherit the global measure. Keep new structural wrappers out of the measure.

Concretely, `every-layout.css`'s opt-out list is `.stack .cluster .with-sidebar .switcher
.cover .grid .frame .reel` (plus the usual structural HTML elements) — every primitive
except one. `.center` is deliberately left off that list: its whole job is to *enforce* the
`--measure` cap on the column it wraps, so it keeps `max-inline-size: var(--measure)` on
itself rather than opting out. Everything else that exists to arrange other elements —
rhythm, grouping, placement — opts out so it can run full-width; the cap only bites again
once you're down to a genuine text-bearing leaf (a paragraph, a heading) that isn't itself
wrapped in another opted-out primitive.

## Worked example: presentation editor
`Sidebar` (thumbnail list + slide) › the slide is a `Cover` with `--cover-min: 66.666vh`,
forcing the sidebar taller than its content and pushing an "Add slide" button to the bottom
via a Stack `auto` margin. This is the book's canonical composition demo.

```html
<div class="with-sidebar" style="--sidebar-width: 16rem">
  <div class="stack">
    <div class="stack">
      <img class="frame" src="slide-1-thumb.png" alt="Slide 1">
      <img class="frame" src="slide-2-thumb.png" alt="Slide 2">
    </div>
    <button style="margin-block-start: auto">Add slide</button>
  </div>

  <div class="cover" style="--cover-min: 66.666vh">
    <h1 class="cover-centered">Slide heading</h1>
  </div>
</div>
```

The `.with-sidebar` is the outer grouping primitive: the thumbnail list (first child) is the
sidebar, the `.cover` (last child) is the main content. Because `.with-sidebar`'s last child
grows aggressively (`flex-grow: 999`), the row's height is dictated by whichever child is
tallest — here, the `.cover`'s `min-block-size: 66.666vh` — so the sidebar column stretches
to match it even though its own thumbnails don't need that much space. The thumbnail list
lives in its own inner Stack (rhythm between thumbnails); the outer Stack wrapping that list
and the "Add slide" button uses `margin-block-start: auto` on the button to push it to the
bottom of the now-taller sidebar column, per the Stack's edge-grouping trick. The slide
itself is a Cover with one `.cover-centered` child (the heading), vertically centered in the
`66.666vh` region.

## Composition order
Outer → inner generally runs: placement (Cover/Center) → grouping (Sidebar/Switcher/Grid/
Cluster) → surface (Box) → rhythm (Stack) → media/detail (Frame/Icon).
