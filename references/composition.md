# Composition — nesting primitives

Primitives are designed to nest. A few rules keep compositions predictable.

## Each primitive owns one axis of concern
Stack owns vertical rhythm; Cluster/Sidebar/Switcher own horizontal grouping; Box owns
surface; Center/Cover own placement. Nest by concern, e.g. a Box that contains a Stack.

## Custom properties are set where they apply, not hoisted
Set `--space` on the specific Stack/Cluster that needs it. Do **not** move a child's
`--space` up to a parent that might itself become a nested child — it would be overridden
when nested (see rudiments, custom-property API).

## The measure caps text, not containers
`every-layout.css` applies the measure (`max-inline-size: var(--measure)`) only to
text-bearing elements — `p`, `h1`–`h6`, `blockquote`, `figcaption`. Layout containers,
images, media, tables, and form controls are never capped, so nesting primitives never fight
the measure and no opt-out list is needed. The one primitive that re-applies the cap is
`.center`, which re-declares it on its own box precisely so it can hold arbitrary content (not
just text elements) to a comfortable column width. So: reach for `.center` when you want a
container held to the measure; everything else is unconstrained by default.

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
sidebar, the `.cover` (last child) is the main content. `.with-sidebar` is a flex row and
doesn't override `align-items`, so the default `stretch` applies: both columns stretch to
the height of the tallest one. Here that's the `.cover`, whose `min-block-size: 66.666vh`
sets the row's height — so the sidebar column stretches to match it even though its own
thumbnails don't need that much space. (`flex-grow: 999` on the `.cover` only governs how
the *inline*-axis width is distributed between the two columns; it plays no part in the
height match.) The thumbnail list
lives in its own inner Stack (rhythm between thumbnails); the outer Stack wrapping that list
and the "Add slide" button uses `margin-block-start: auto` on the button to push it to the
bottom of the now-taller sidebar column, per the Stack's edge-grouping trick. The slide
itself is a Cover with one `.cover-centered` child (the heading), vertically centered in the
`66.666vh` region.

## Composition order
Outer → inner generally runs: placement (Cover/Center) → grouping (Sidebar/Switcher/Grid/
Cluster) → surface (Box) → rhythm (Stack) → media/detail (Frame/Icon).
