# Primary margin pairs — mandatory reference

> **Current concept — original squircle identity:** start with [ICON_RULES.md](ICON_RULES.md#current-design-direction--original-squircle-identity). The owner requested a concept/documentation update first. Develop our own shape language from icon meaning; external collections must not supply geometry, proportions, motifs or style recipes. Ordinary circular rounding alone does not establish the intended squircle identity. Numerical corner values below record the approved legacy implementation, not a universal future design recipe. Preserve current artwork and approval records; prototypes and redesign implementation require a later artwork task.

> **Base-shape study —2026-10-28:** compare whole-contour Square, Camera and Folder prototypes together before extending the redesign. New-study/new-design stroke is1.5; existing artwork and motion keep their current1.75 baseline. See the [canonical scoped rule](ICON_RULES.md#base-shape-first-new-design-stroke15--2026-10-28).

> **Camera trial —2026-10-28:** the owner now requests the first Camera-only redesign and local Lab preview. See the [canonical trial scope](ICON_RULES.md#camera-original-squircle-trial--2026-10-28). Camera reviews reopen; other artwork remains unchanged. The earlier concept-only scope is historical.

> **Current operating rule:** read [ICON_RULES.md](ICON_RULES.md). Enclosing Square/Circle frames are opt-in only when the owner explicitly requests them; new icons default to None. The current Square rounding trial uses exterior radius6 at bounds2..22 and Outline centerline radius5.125 at bounds2.875..21.125, with fixed Regular1.75. This supersedes older enclosing-frame radius4/3.125 examples below, without changing natural-object corner radii or inner glyphs. External Link, Maximize and Minimize are explicitly None-only. New Tab is the semantic use of the existing Plus Square variant, discovered by new-tab/newtab tags; do not duplicate it as another identity or export. Larger native None geometry and the separately requested closer Chevron Line gaps are specified in the canonical guide.

Owner direction recorded on 2026-10-27: use **2px at the shape's primary opposing edge pair**. The remaining pair does not need to sit at 2px. Preserve natural proportions and center opposite margins; never stretch a horizontal or vertical object into a square just to fill every side.

- Horizontal objects such as Camera and Folder: left/right are the primary pair, both 2px. Top/bottom stay balanced and may be larger.
- Vertical objects: top/bottom can be the primary pair, both 2px. Left/right may be larger.
- Symmetric marks such as Plus and X: both pairs are primary, so the Filled box has 2px on all four sides.
- An icon that naturally works as Filled, such as Camera or Folder, needs no added enclosing box. Use the object's own visible silhouette for its 2px primary pair in both styles.
- For a mark that needs a Filled box, such as Plus or X, measure the outside 2px from that box. Keep another 2px from the box to the shared inner mark. Outline is exactly that inner mark, with identical position, size, weight and round caps. Read BOXED_ICON_RULES.md.

Measure visible bounds at native 24×24, Regular 1.70, X/Y=100% and rotation=0, including stroke/cap extent. Edit original geometry, keeping stroke weight fixed. Filled outer contours must match the Regular Outline exterior for unboxed objects.

## Current revised native dimensions

| Pair                     | Visible width | Visible height | Left/right margin | Top/bottom margin |
| ------------------------ | ------------- | -------------- | ----------------- | ----------------- |
| Camera, both styles      | 20            | 17.01649746    | 2                 | 3.49175127        |
| Folder, both styles      | 20            | 17.36040609    | 2                 | 3.31979695        |
| Plus/X Filled box        | 20            | 20             | 2                 | 2                 |
| Plus/X shared inner mark | 16            | 16             | 4                 | 4                 |

Camera and Folder retain natural horizontal proportions with rounder tangent corners. Camera’s raised housing is .75 unit lower relative to its body, with the whole drawing recentered vertically. Their Filled exteriors are exact .85 outward offsets of the same Outline paths. Interior lens/indicator counters and the straight adjustable Folder divider remain separate semantic features. The owner approved these current Camera/Folder revisions and the current Plus/X pairs on 2026-10-27 in both styles. These exact dimensions are approved references. The public released package stays pinned separately from the development Lab.

Copy revision: both pairs are primary, with combined visible bounds 2..22. The exposed parallel page borders have 4px clear spacing, with separate 1px breaks between the two rear end caps and the foreground border. Comparable object corners follow the standard Camera/Folder centerline radius 3.25, giving visible/Filled exterior radius 4.10 at Regular 1.70; see DESIGN_RULES.md. Both Copy styles were owner-approved on 2026-10-27.

Search boxed extension: the shared magnifier uses bounds 4..20 and its new Filled box uses bounds 2..22, radius 4 and 2px side clearances, like Plus/X. Both revised styles were owner-approved on 2026-10-27, replacing the old Outline-only version.

Menu: Filled box bounds 2..22; shared bar glyph bounds x=4..20/y=5.15..18.85, retaining 2px horizontal primary inner clearance and 3.15px vertical clearance. Trash: visible bounds x=3.15..20.85/y=2..22; the primary pair is top/bottom at 2px, with natural vertical proportions. The owner approved both revised pairs on 2026-10-27.

Current owner direction, superseding earlier Menu/Search box notes: Filled = Bold for Menu and Search, with no enclosing box. Filled matches their shared centerlines at fixed Bold 2.25; Regular Outline remains 1.70. Bold Filled has 2px at its primary pair (Menu left/right; Search all sides); Regular Outline has 2.275px at the same pair. This is an explicit exception to matching the Regular exterior. The owner approved the current resized unboxed Bold Menu/Search pairs and current Trash on 2026-10-27. Thirteen of twenty current pairs are approved. See BOXED_ICON_RULES.md.

Owner approval recorded on 2026-10-27: current Search and Menu Outline/Filled passed with unboxed Filled = Bold 2.25; current Trash was accepted in both styles, including the fitted radius-1 handle centerline corners and radius-3.25 base centerline corners. Preserve these exact accepted geometries. Thirteen of twenty current pairs are approved.

Trash approval-pose correction (2026-10-27): the owner reviewed and accepted X=105%, Y=95%, Regular 1.70 and rotation=0 in both styles. The earlier 100%/100% approval record was incorrect. Preserve the original SVG geometry and its native margin measurements; use metadata labDefaults 105/95 for opening or resetting Trash in Lab. Draft adjustments still take priority while switching icons. Trash remains approved, with 13 approved pairs total.

Trash native-size correction (2026-10-27), superseding the preceding Lab-default correction: bake the accepted 105%/95% centerline proportions into both source drawings and return Lab X/Y to100%/100%. Keep Regular1.70 and round .85 caps. Reconstruct Filled from the baked Outline exterior so both styles align. New native visible bounds x=2.75..21.25/y=2.4575..21.5425 (18.5×19.085); the earlier 2px native top/bottom measurements are historical. Base centerline radii become rx3.4125/ry3.0875; handle rx1.05/ry.95. Trash stays owner-approved. No105/95 Lab-default override remains.

Approval clarification on2026-10-27: Check, Arrow Left/Right and Chevron Up/Down passed in both styles. Download and Upload are still awaiting review.18 of20 pairs are approved. Keep Chevron Up/Down as the unified names: each is one icon with Outline and Filled styles. Chevron/caret terminology overlaps and varies by library; do not define the words by whether a shape is filled. Caret is an optional discovery tag, not a separate icon identity or an export rename.

Round5 compass arrows (2026-10-27): new Arrow Up/Down use2px top/bottom and balanced natural left/right spacing; all four diagonal arrows use2px on both opposing pairs. Fit centerlines to9.15 half extent then expand at fixed Regular1.70, preserving stroke/cap size. Existing approved Left/Right keep their original geometry and3.15px horizontal margin. Both styles of the six new pairs await review.

## Current global weight palette — 2026-10-27

Owner requested all icons to start at Regular1.75, with Thin1.25, Bold2.50 and .25-unit adjustment steps. The owner explicitly confirmed this includes Filled and both morphs. This supersedes historical1.70/2.25 stroke references throughout earlier construction notes. All26 Outline sources now default to1.75. Filled contours are rebuilt around the same source centerlines at radius.875; Menu/Search use Bold2.50. Existing2px primary bounds and boxed2px inner clearance are retained by a small uniform centerline refit; box frames stay2..22/radius4. Other accepted centerline poses remain unchanged. Preserve the approved horizontal, continuous, no-hold Plus X motion and its slow pace; only the source-derived stroke/endpoints follow the new weight. Keep the six Round5 arrow pairs as drafts.

Owner compass-arrow size correction (2026-10-27): all8 directional arrows must use the same physical shaft length18.25, identical head-arm lengths and Regular1.75. Derive each direction by rotation about12,12; do not independently enlarge diagonals to touch all four artboard edges. Cardinals have2px at their primary pair. Diagonal visible X/Y margins are4.67265062, preserving the same physical size. This explicit owner correction supersedes earlier diagonal all-side2px fits and normalizes Left/Right with Up/Down.

## Current framed arrow family — 2026-10-27

The owner requested smaller, equal arrows with room for Square/Circle frames. This supersedes the previous18.25-unit shaft and standalone2px edge rule. All8 directions now share a12.25-unit shaft, identical head arms and1.75 stroke. Standalone and framed arrows use exactly the same glyph, position and size. Add frame variants to the existing8 arrow identities; this is a construction revision, not a new six-icon batch. Square/Circle outer frames have2px artboard margins; Square exterior radius4, Circle radius10. Outline frame centerlines are inset by.875. Filled frames use negative space cut from a solid frame, preserving the standalone Filled solid-head silhouette. The glyph has14px visible length along its own axis; cardinal standalone primary margins are5px and diagonal margins6.79397097px. Circle inner clearance is1.25px at Regular and.5px at Bold2.50. Directional rotation never rotates the Square frame. All8 arrow pairs and their new frames await owner review;18 of26 standalone pairs remain approved.

## Current Chevron family — 2026-10-27

Apply the same Arrow concept to Chevron:8 directions times None/Square/Circle =24 variants, with Outline/Filled for each. Round6 adds the six missing directions to existing Up/Down. Use equal90-degree V arms of length5.5*sqrt(2), endpoints at(-5.5,2.75),(0,-2.75),(5.5,2.75) before rotation. Rotate and uniformly recenter the bounding box at12,12; never scale directions independently. The same glyph/placement appears in all frames. Filled closes and expands the same triangle at half Regular.875; framed Filled subtracts that exact silhouette. Reuse Arrow frame geometry:2px exterior margins, Square exterior radius4, Circle radius10. At Bold2.50 the circular border still clears all Chevron vertices by at least.4758px. Up/Down review reopens for the new smaller shared glyph. The catalog now contains32 standalone identities:16 approved and16 directional Arrow/Chevron pairs awaiting review. Each directional family contains24 variants; styles do not change that count.

## Chevron owner clarification — four directions plus Double (2026-10-27)

Supersedes the earlier eight-direction Chevron proposal. The owner explicitly excludes diagonal Chevron icons. Keep Single Chevron in Up/Down/Left/Right and add Double Chevron in the same four directions (`chevrons-up/down/left/right`). Each of these8 identities supports None/Square/Circle with Outline/Filled:24 variants total. Single V geometry stays unchanged. Double uses two equal V marks with local vertices(-4,2),(0,-2),(4,2), shifted by -3/+3 along the vertical axis before cardinal rotation. Rotate and center without scaling; reuse exactly the same glyph in all frames. Filled closes and expands both triangles at.875, retaining.25px between them; framed Filled subtracts that same silhouette. All Arrow frame dimensions remain unchanged. Double retains at least.2218px circular clearance at Bold2.50. The total catalog remains32 identities,16 approved and16 pending directional pairs. No diagonal Chevron components or exports remain.

## Double Chevron touching heads — 2026-10-27

Owner requested the two Double Chevron Filled heads to touch, as viewed in Lab. Set the two V centers at -2.875/+2.875 along the directional axis (5.75 center separation), with unchanged local arm vertices(-4,2),(0,-2),(4,2) and Regular1.75. The .875-expanded solid triangles meet exactly at the artwork center with zero gap, without overlap. Apply the identical revised centerlines to Outline and every Square/Circle variant. The four cardinal directions remain rigid rotations; no diagonals. Double native visible size is9.75 by11.50 for Up/Down, swapped for Left/Right. This supersedes the earlier .25px Filled gap and shifts of -3/+3.

## Plus / Minus / X three-style frame family — 2026-10-27

Owner requested Plus/Minus/X to follow the frame family with three explicit styles: Outline Regular1.75, unboxed Bold2.50, and Filled. Frame None Filled equals the unboxed Bold2.50 expansion, as Menu/Search. Square/Circle Filled uses a solid upright frame and the exact Regular1.75 glyph cutout. Use shared centerlines centered at12,12, extent4.5 on both axes; Plus and X retain identical optical bounds10.75 square at Regular and11.50 at Bold; Minus shares their horizontal extent. Smaller source glyphs reserve actual Circle clearance at every weight without independent per-frame scaling. Frame exteriors span2..22, Square radius4 and Circle radius10, same as Arrow/Chevron. Outline centerlines are2.875..21.125 with corner radius3.125, circle9.125. Bold is explicitly unboxed; selecting it ignores a frame. At Bold the Circle border clears the X by at least.261px. Filled standalone is the exact union of the shared centerlines expanded at2.50; frame holes use1.75. This supersedes the previous standalone boxed Plus/X Filled semantics. Morph timing remains approved, while its boxed endpoints derive from the new Square frame sources. Family extension adds Minus only; it is not a six unrelated-icon batch. All three revised identities await owner review.

The catalog now has33 identities:14 approved and19 draft. Arrow and Chevron families keep their current geometry. Plus X and Menu X retain the same reversible motion and timing; boxed Filled endpoints now reference the Square frame source, while standalone Filled is Bold.

## Menu frames and shorter Trash slots — 2026-10-27

The Menu frame extension uses one smaller shared glyph in None/Square/Circle: centerlines x7..17 at y8,12,16. Outline remains Regular1.75. Unframed Filled remains the exact Bold2.50 expansion; framed Filled subtracts that same Bold silhouette from the solid frame. Standard frame exteriors remain2..22 with Square radius4 / Circle radius10. The Circle still clears a Bold Outline glyph and Bold frame by more than.2px. This replaces only Menu’s former standalone2px fit; Search is unchanged. Menu X endpoints follow the new source, preserving motion sequence and rate.

Trash slots keep x9.9/14.1, center y13.425 and fixed1.75 weight, but centerlines shorten from y10.1..16.75 to11.1..15.75, removing1px at each end. Filled holes use the matching radius.875 capsules. Body/lid/handle and baked105/95 proportions are unchanged. Menu and Trash reviews reopen; earlier approval records remain in metadata history. These revisions await owner review.
