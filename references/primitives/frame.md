# Frame

The Frame (`.frame`) is the primitive for cropping media — images, video, embeds — to a fixed
aspect ratio, regardless of the media's own intrinsic dimensions.

## The problem

A grid of thumbnails, video embeds, or avatar tiles usually needs every item to present the same
aspect ratio even though the source images and videos come in whatever dimensions they were shot
or exported at. Setting an explicit `block-size` on the media itself squashes or stretches it, and
the old padding-box hack (a percentage `padding-block-end` trick to fake an aspect ratio before
`aspect-ratio` existed) requires wrapping markup and doesn't crop cleanly. The Frame solves this by
giving the container a locked `aspect-ratio` and clipping (`overflow: hidden`) whatever overflows
it, while its `img`/`video` child is told to fill the box and crop to cover it rather than
distorting.

## Canonical CSS

```css
/* ---- The Frame: fixed aspect ratio crop for media ---- */
.frame {
  aspect-ratio: var(--n, 16) / var(--d, 9);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame > img,
.frame > video {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}
```

## API

- `--n` / `--d` — the ratio numerator and denominator fed into `aspect-ratio: var(--n, 16) / var(--d, 9)`.
  Unset, the Frame defaults to a 16:9 widescreen crop; set `--n: 1; --d: 1` for a square, `--n: 4;
  --d: 3` for a classic photo ratio, and so on.
- The direct `img`/`video` child stretches to `inline-size: 100%; block-size: 100%` and is cropped
  with `object-fit: cover`, so it fills the frame edge-to-edge and overflow is clipped rather than
  the image being squashed to fit.
- `display: flex` plus `justify-content: center; align-items: center` centers non-media children
  (or media before it loads) inside the frame.
- This is the third-edition update to the primitive: it relies on the native CSS `aspect-ratio`
  property rather than the older padding-box percentage-hack, so no extra wrapper markup is
  required.

## When to reach for it

Thumbnail grids, video embeds, avatar/profile tiles, and any place a set of media items — of
inconsistent source dimensions — needs to render as uniform, cleanly cropped tiles.

## Pitfalls

- The Frame's crop relies on the standards-track `aspect-ratio` CSS property, not a padding-hack;
  confirm your target browsers support `aspect-ratio` (all evergreen browsers do, but this is a
  meaningful departure from the original two-edition version of the primitive).
- Only a direct `img` or `video` child gets the `object-fit: cover` fill-and-crop treatment — the
  selector is `.frame > img, .frame > video`, so a media element nested inside a wrapper `div`
  inside the `.frame` will not be sized or cropped by this rule.
- `object-fit: cover` crops to fill, meaning parts of the source image outside the target ratio are
  cut off; for logos or images where nothing may be cropped, the Frame is the wrong tool.

## Example

```html
<div class="frame" style="--n: 1; --d: 1">
  <img src="avatar.jpg" alt="" />
</div>
```
