# Every Layout (Claude skill)

A [Claude skill](SKILL.md) that makes Claude fluent in [Every Layout](https://every-layout.dev)'s
composable CSS layout primitives and axioms. Instead of reaching for one-off flexbox hacks
and breakpoint soup, Claude picks from twelve well-defined primitives — Stack, Box, Center,
Cluster, Sidebar, Switcher, Cover, Grid, Frame, Reel, Imposter, Icon — and emits **canonical,
owned CSS**: plain classes and custom properties, copied straight into your project. There is
no runtime, no build step, and nothing to `npm install`. You own every line of CSS this skill
produces.

## Credit

This project is an independent reimplementation of the *method* taught by **Every Layout**,
created by **[Heydon Pickering](https://heydonworks.com/) & [Andy Bell](https://piccalil.li/)**.
Every Layout is a paid book/course — buy it at **[every-layout.dev](https://every-layout.dev)**.
It's an excellent, deeper read than anything here.

This repository does **not** redistribute the book's text, illustrations, or any of its
assets. Everything in `references/` and `every-layout.css` is our own paraphrase of the
public *ideas* behind each primitive, and our own original CSS implementation, written to
make those ideas usable by an AI coding assistant. If you find value in this skill, please
support the original authors by buying the book.

## Install the skill

Copy this repository into a directory Claude Code loads skills from:

```bash
# User-level (available in every project)
git clone <this-repo-url> ~/.claude/skills/every-layout

# Or project-level (checked into a single repo)
git clone <this-repo-url> .claude/skills/every-layout
```

Claude Code discovers `SKILL.md` automatically and will reach for this skill whenever you ask
it to build or adjust a CSS layout — sidebars, card grids, toolbars, centered content, media,
sticky footers, overlays, and so on.

## Use the CSS

You don't need the skill to use the stylesheet. Copy [`every-layout.css`](every-layout.css)
into your own project and reference it like any other stylesheet:

```html
<link rel="stylesheet" href="every-layout.css">
```

Then apply the primitive classes and tune each one with its custom properties, for example:

```html
<div class="stack" style="--stack-space: var(--s1)">
  <h2>Heading</h2>
  <p>Paragraph.</p>
</div>
```

The CSS is yours once copied — there is no package to update and no dependency to track.

## The 12 primitives

| Primitive | Purpose | Reference |
| --- | --- | --- |
| Stack | Vertical rhythm between flow siblings | [`references/primitives/stack.md`](references/primitives/stack.md) |
| Box | Padded surface with safe color inversion | [`references/primitives/box.md`](references/primitives/box.md) |
| Center | Centered, measure-capped column | [`references/primitives/center.md`](references/primitives/center.md) |
| Cluster | Wrapping group with even gaps | [`references/primitives/cluster.md`](references/primitives/cluster.md) |
| Sidebar | Collapsing sidebar + content, no breakpoints | [`references/primitives/with-sidebar.md`](references/primitives/with-sidebar.md) |
| Switcher | Flips row ↔ column at a container threshold | [`references/primitives/switcher.md`](references/primitives/switcher.md) |
| Cover | Min-height region with a centered child | [`references/primitives/cover.md`](references/primitives/cover.md) |
| Grid | Auto-fitting grid of equal cells | [`references/primitives/grid.md`](references/primitives/grid.md) |
| Frame | Aspect-ratio media crop | [`references/primitives/frame.md`](references/primitives/frame.md) |
| Reel | Horizontal scroller / carousel | [`references/primitives/reel.md`](references/primitives/reel.md) |
| Imposter | Element centered over another | [`references/primitives/imposter.md`](references/primitives/imposter.md) |
| Icon | Text-sized inline icon beside a label | [`references/primitives/icon.md`](references/primitives/icon.md) |

## More reference material

- [`references/decision-tree.md`](references/decision-tree.md) — map a plain-language need to
  a primitive or composition of primitives.
- [`references/rudiments.md`](references/rudiments.md) — the underlying axioms: measure,
  modular scale, logical units.
- [`references/composition.md`](references/composition.md) — rules for nesting primitives
  together (e.g. Cover › Sidebar › Stack for a "holy grail" layout).
- [`examples/`](examples/) — four runnable, zero-build HTML pages (`holy-grail`,
  `card-with-footer`, `prose-page`, `dashboard`) that link `every-layout.css` directly, so you
  can see every primitive composed in context.

## Validating the repo

```bash
npm test
```

This runs [`scripts/validate.mjs`](scripts/validate.mjs), a structural validator that checks
the stylesheet, `SKILL.md`, every reference doc, and every example for internal consistency.

## License

The code and original written content in this repository are released under the
[MIT License](LICENSE), copyright (c) 2026 Alex Vivero.

This license covers only this repository's original CSS, documentation, and examples. It does
**not** extend to, and does not grant any rights over, the *Every Layout* book itself, which
remains the copyrighted work of Heydon Pickering and Andy Bell — buy it at
[every-layout.dev](https://every-layout.dev).
