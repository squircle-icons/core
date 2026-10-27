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

Plus X motion correction (2026-10-27): the owner rejected the simple rotating cross and requested that the strokes first merge into one line. Fold Plus into one vertical stroke, hold that single line briefly, then split into the approved X; reverse along the same path. Preserve Regular1.70, endpoint shapes, and the upright radius4 Filled box. The Filled hole is the exact union of the moving round-ended strokes, including partially overlapping end caps. During the single-line phase extra horizontal clearance is intentional. No weight control.

Plus X horizontal pacing correction (2026-10-27), superseding the vertical-line trial: the owner rejected the fast motion and requested a horizontal merge. Keep the horizontal Plus stroke while folding the vertical stroke down into it; hold one horizontal line, then open symmetrically into X. The adapter slows this pair to 40% of the shared spring rate at default1×, preserving progress and velocity during reversal. Keep the same geometry in Outline and the Filled hole, fixed Regular1.70, and the upright radius4 box. Static endpoints and Sun Moon timing stay unchanged. This revised morph still awaits owner review.

Plus X continuous merge correction (2026-10-27): the owner preferred the horizontal merge but removed the pause. Pass through exactly one horizontal line at progress0.5, immediately opening into X in either direction. Keep nonzero matching angular velocity and acceleration continuity at that point, rather than merely removing a constant hold while easing both phases to a stop. Preserve the slower pair pace, shared Outline/Filled contours, fixed1.70 stroke, upright box and static endpoints. The morph still awaits owner review.

## Approved Plus ↔ X motion — 2026-10-27

The owner explicitly approved the current continuous horizontal-merge motion and asked to preserve it as a reference. This approval supersedes the earlier pending-review notes for this pair and covers the current motion in Outline and Filled.

- Sequence: Plus → one horizontal line → X; reverse along the same path. The single line occurs at progress0.5, with no hold and no easing to a stop at the merge.
- Carry nonzero angular velocity and continuous acceleration through the merge; retain position and velocity when reversed mid-flight.
- Preserve the approved slower default: Plus X runs at40% of the shared critically damped spring rate (mass1, stiffness100, damping20). The speed prop scales that pace; keep Sun Moon timing separate.
- Keep Regular1.70 with round ends, approved static endpoints, and the upright radius4 Filled box at2..22. The Filled hole remains the exact union of the same moving Outline strokes. No adjustable thickness.
- Accepted implementation: core `e4a739a4fde20156bfe7a812f78918f06daeb75b`, Svelte adapter `190b84b49ea2e058fc99d358298a392c0271eaee`; preview `/lab/morph/plus-x`.

Keep this version as the accepted reference for later revisions. The earlier simple rotation, vertical merge, fast pacing and horizontal hold are superseded. Static icon approvals remain unchanged.

## Current global weight palette — 2026-10-27

Owner requested all icons to start at Regular1.75, with Thin1.25, Bold2.50 and .25-unit adjustment steps. The owner explicitly confirmed this includes Filled and both morphs. This supersedes historical1.70/2.25 stroke references throughout earlier construction notes. All26 Outline sources now default to1.75. Filled contours are rebuilt around the same source centerlines at radius.875; Menu/Search use Bold2.50. Existing2px primary bounds and boxed2px inner clearance are retained by a small uniform centerline refit; box frames stay2..22/radius4. Other accepted centerline poses remain unchanged. Preserve the approved horizontal, continuous, no-hold Plus X motion and its slow pace; only the source-derived stroke/endpoints follow the new weight. Keep the six Round5 arrow pairs as drafts.

## Current framed arrow family — 2026-10-27

The owner requested smaller, equal arrows with room for Square/Circle frames. This supersedes the previous18.25-unit shaft and standalone2px edge rule. All8 directions now share a12.25-unit shaft, identical head arms and1.75 stroke. Standalone and framed arrows use exactly the same glyph, position and size. Add frame variants to the existing8 arrow identities; this is a construction revision, not a new six-icon batch. Square/Circle outer frames have2px artboard margins; Square exterior radius4, Circle radius10. Outline frame centerlines are inset by.875. Filled frames use negative space cut from a solid frame, preserving the standalone Filled solid-head silhouette. The glyph has14px visible length along its own axis; cardinal standalone primary margins are5px and diagonal margins6.79397097px. Circle inner clearance is1.25px at Regular and.5px at Bold2.50. Directional rotation never rotates the Square frame. All8 arrow pairs and their new frames await owner review;18 of26 standalone pairs remain approved.

## Current Chevron family — 2026-10-27

Apply the same Arrow concept to Chevron:8 directions times None/Square/Circle =24 variants, with Outline/Filled for each. Round6 adds the six missing directions to existing Up/Down. Use equal90-degree V arms of length5.5*sqrt(2), endpoints at(-5.5,2.75),(0,-2.75),(5.5,2.75) before rotation. Rotate and uniformly recenter the bounding box at12,12; never scale directions independently. The same glyph/placement appears in all frames. Filled closes and expands the same triangle at half Regular.875; framed Filled subtracts that exact silhouette. Reuse Arrow frame geometry:2px exterior margins, Square exterior radius4, Circle radius10. At Bold2.50 the circular border still clears all Chevron vertices by at least.4758px. Up/Down review reopens for the new smaller shared glyph. The catalog now contains32 standalone identities:16 approved and16 directional Arrow/Chevron pairs awaiting review. Each directional family contains24 variants; styles do not change that count.

## Menu ↔ X morph bridge — 2026-10-27

See [MORPH.md](MORPH.md) for the maintained motion specification. Menu Filled
remains unboxed Bold2.50, and X Filled retains its radius4 box at2..22 and exact
Regular1.75 cutout at4..20. Their new transition maps the Menu outer capsules
to two solid regions around the X hole; intermediate Filled contours are a
separately authored topology bridge. This changes neither static construction
nor the exact shared moving glyph in the approved Plus X pair. Menu X motion
is pending owner review.
