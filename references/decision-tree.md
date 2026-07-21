# Decision tree — intent → primitive(s)

Start here. Translate the plain-language need into primitive(s), then read the linked
primitive file(s) for CSS and pitfalls. Compose where two or more are listed.

## Single-primitive intents

| The need | Reach for | File |
| --- | --- | --- |
| Vertical spacing between flow items | Stack | primitives/stack.md |
| Padded panel / card surface | Box | primitives/box.md |
| Centered, measure-capped column | Center | primitives/center.md |
| Toolbar / tag list / button group that wraps | Cluster | primitives/cluster.md |
| Sidebar + content that collapses (no breakpoints) | Sidebar | primitives/with-sidebar.md |
| 2–4 equal panels, side-by-side or all-stacked | Switcher | primitives/switcher.md |
| Min-height region with a vertically centered child | Cover | primitives/cover.md |
| Responsive grid of equal cells | Grid | primitives/grid.md |
| Media cropped to an aspect ratio | Frame | primitives/frame.md |
| Horizontal scroller / carousel | Reel | primitives/reel.md |
| Centered modal / overlay / badge | Imposter | primitives/imposter.md |
| Text-sized inline icon beside a label | Icon | primitives/icon.md |

## Composed intents

| The need | Compose |
| --- | --- |
| "Holy grail" app layout | Cover (page) › Sidebar (nav + main) › Stack (main content) |
| Card with a pinned footer | Cover with `--cover-min` + a `.cover-centered` body, or a flex Stack with an `auto` margin |
| Media object (avatar + text) | Sidebar (narrow `--sidebar-width`) or Cluster |
| Prose article page | Center (measure) › Stack (rhythm) |
| Dashboard of stat cards | Grid › Box (each card) › Stack (card internals) |
| Settings page | Sidebar (nav) › Stack (form) with a Cover-pinned action bar |
| Image gallery that scrolls sideways | Reel › Frame (each item) |
| Nav bar with logo + wrapping links | Cluster, or Sidebar if the logo is fixed-width |

## Rules of thumb

- Fixed number (2–4) that must switch together → **Switcher**. Unknown/large count → **Grid**.
- Spacing is always a **Stack** job — don't put `margin-bottom` on the elements themselves.
- Anything centered horizontally with a measure → **Center**; centered *within a min-height
  region* → **Cover**; centered *over* another element → **Imposter**.
