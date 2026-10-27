# Plus and X: required construction reference

Read this file before every Plus/X change. The owner accepted the contained
shared-glyph relationship on 2026-10-27, then requested rounder box corners.
The owner approved the current radius-4 corners and complete Plus/X pairs in both styles on 2026-10-27. The dimensions below are the approved reference.

## The relationship to preserve

Outline is exactly the mark inside Filled, like the established Plus pair.
Filled adds an upright solid rounded box around that same mark, cutting the mark
out as negative space. Its cutout must match the visible Regular Outline stroke
in position, size, weight, intersection and rounded ends.

The Filled box stays inside the artboard. X has 2px outside its box and another
2px between the box and the glyph on each side. The standalone Outline inherits
the inner glyph's 4px artboard spacing. Do not force both style exteriors to the
same bounds: that would either shrink the Filled glyph or push the box into the
artboard edge. Do not fix this relationship with Lab-only scaling or translation.

## Native reference values

Use a 24×24 grid, X/Y=100%, rotation=0, Regular stroke 1.70 and round cap radius
0.85. Values below are native SVG units, equal to pixels at 24px output.

| Measurement                            | Plus                              | X                                                 |
| -------------------------------------- | --------------------------------- | ------------------------------------------------- |
| Outline centerlines                    | `M4.85 12 H19.15 M12 4.85 V19.15` | `M4.85 4.85 L19.15 19.15 M19.15 4.85 L4.85 19.15` |
| Shared glyph visible bounds, both axes | 4..20                             | 4..20                                             |
| Shared glyph width/height              | 16.00                             | 16.00                                             |
| Filled box bounds, both axes           | 2..22                             | 2..22                                             |
| Filled box width/height                | 20.00                             | 20.00                                             |
| Artboard-to-box spacing                | 2.00                              | 2.00                                              |
| Glyph-to-box spacing at each side      | 2.00                              | 2.00                                              |
| Filled box corner radius               | 4.00                              | 4.00                                              |

Plus and X now both use the all-side primary-pair rule: Filled box bounds 2..22 and shared glyph bounds 4..20. Read ICON_MARGIN_RULES.md for horizontal or vertical objects whose other pair may have larger margins. X is optically sized to this family;
do not restore a strict unscaled 45° rotation of Plus. Derive the diagonal
construction from Plus but keep X's recorded final coordinates and stroke weight.
Other already-approved artwork is not implicitly resized by this reference.

## How to construct or revise the pair

1. Author the Outline centerlines in `icons/<name>.svg`. Measure the visible
   exterior, including the half-stroke and round caps, not just path coordinates.
2. Construct the Filled cutout from that exact stroke exterior at width 1.70.
   Use the analytical union at intersections so there are no doubled contours.
   For X the cap radius stays 0.85 and the diagonal offset is `0.85 / sqrt(2)`.
3. Add a solid box using the recorded exterior bounds. Put the outer box and
   glyph cutout into one `fill-rule="evenodd"` path under `data-part="body"`.
   Keep `filledTreatment: "boxed-cutout"` in metadata.
4. A box-rounding request changes only the outer path's corners. Keep the box
   bounds, glyph subpath, Outline coordinates and stroke weight unchanged.
   Current radius is 4, increased from 2.85. Side clearance remains 2; rounded
   corner clearance is a separate geometric measurement.
5. Update construction metadata and `DESIGN_RULES.md` when the owner changes a
   rule. Do not mark a visual revision approved solely because checks pass.

## Required verification and delivery

- Run core `pnpm verify`, commit source, then run adapter `pnpm sync:core ../core`.
- In the adapter, check the actual packed exports: overlay the Outline exterior
  and Filled cutout at native proportions and rotated poses. Both glyphs must
  coincide without style-specific scaling or translation. Check stroke 1.70,
  box bounds, side clearances and round corners. Run `pnpm verify`.
- Inspect the shared Plus/X proof sheet and actual 16/20/24/48px samples.
- Commit adapter changes. In the homepage use `pnpm sync:lab ../svelte`, then
  check/build and test the native Lab spacing and style switching.
- Keep the published public package separate from the Lab development artifact;
  the full Lab must retain draft icons. Reload the Lab's updated dependency and
  confirm the actual browser view before claiming completion.
- Save a screenshot for the owner. Only explicit owner review approves artwork.

## Menu and Search: superseded boxed treatment

The owner changed Menu and Search to **Filled = Bold** on 2026-10-27. Their previous boxed treatment is superseded. Neither has an enclosing box or cutout glyph. Use the same centerlines as Outline with fixed fill-only Bold 2.25 expansion (radius-1.125 round caps); Outline defaults to Regular 1.70. Size the shared centerlines for 2px primary margins at the Bold Filled reference, leaving 2.275px for Regular Outline. Menu uses left/right as its primary pair; Search uses both pairs. This explicit weight exception does not change Plus/X boxed construction. The owner approved both revised pairs on 2026-10-27.

Owner approval recorded on 2026-10-27: current Search and Menu Outline/Filled passed with unboxed Filled = Bold 2.25; current Trash was accepted in both styles, including the fitted radius-1 handle centerline corners and radius-3.25 base centerline corners. Preserve these exact accepted geometries. Thirteen of twenty current pairs are approved.

## Check boxed extension

The owner requested boxed Filled Check on2026-10-27. Use the same radius-4 frame at2..22 and exact Regular1.70 shared mark as the Plus/X construction. Check centerlines are M4.85 12.55 L9.25 16.95 L19.15 7.05. Shared visible bounds are x4..20/y6.2..17.8; horizontal primary inner clearance is2px and vertical clearance4.2px. Outline remains the exact mark cut out of Filled. The owner approved both styles on2026-10-27.

Approval clarification on2026-10-27: Check, Arrow Left/Right and Chevron Up/Down passed in both styles. Download and Upload are still awaiting review.18 of20 pairs are approved. Keep Chevron Up/Down as the unified names: each is one icon with Outline and Filled styles. Chevron/caret terminology overlaps and varies by library; do not define the words by whether a shape is filled. Caret is an optional discovery tag, not a separate icon identity or an export rename.

Plus ↔ X morph experiment (2026-10-27): the owner requested a reversible pair with the same smooth motion as Sun ↔ Moon. Derive both endpoints and the shared box from approved core artwork. Rotate the cross0→45 degrees and extend its arms during rotation so it never becomes the undersized strict rotation previously rejected for X. Keep the glyph visible bounds4..20, Regular1.70, round .85 ends, and the Filled radius4 box upright at2..22. The Filled hole is the exact union of those same two strokes at every frame. Reuse the Sun Moon critically damped progress behavior, retaining position and velocity during reversal. The owner explicitly declined adjustable thickness for this experiment; do not add stroke controls or multiple stroke variants. Static approval statuses stay unchanged. The new morph awaits owner review.
