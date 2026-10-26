# Squircle Icons design rules

Owner direction recorded on 2026-10-26; Moon approval added on 2026-10-27. These rules guide new drawings and revisions; Folder, Camera, Heart and Settings Outline/Filled, plus Search Outline, are approved references. Bell is also approved after its solid Filled clapper correction; Sun Outline/Filled are also owner-approved after enlarging the disc and shortening the rays; Moon Outline/Filled were approved on 2026-10-27; the first eight static icons are owner-approved; Plus and X Outline/Filled are owner-approved as of 2026-10-27; Copy Outline/Filled are also owner-approved as of 2026-10-27; three Round 3 and four Round 4 drawings await review. Search’s earlier boxed pair was approved on 2026-10-27; its current Bold Filled revision was subsequently approved on 2026-10-27.

## Shape language

Use a rounded rectangular structure as the primary language for the outer contour, while preserving the real object's silhouette, proportions, openings and defining features. This is a construction principle, not a requirement to put every icon inside a rounded-square frame or turn every object into the same shape.

Use straight sides and deliberate rounded corners where the object calls for them. Keep the contour stable, balanced and recognizable. Avoid unnecessary bulging edges or decorative bends.

Interior geometry follows the icon's meaning and the real object. It may be straight, circular, angular or curved. Do not make an internal line curve just to repeat the outer rounding. Record departures from the common outer construction in the icon's construction notes and review them with the owner.

### Folder example

- Preserve the actual folder silhouette: a recognizable tab, a rear shell and a front panel.
- The front panel's upper edge can be straight. A bowed edge is not a requirement of Squircle style.
- Round the appropriate outer corners without erasing the tab or making the folder read as a generic rounded square.
- Review shared edges and the lower corners for unwanted doubled strokes or dark seams. Separate movable parts must still read as one coherent object when closed.
- Resolve the static closed/open drawings before spending more time on easing or timing.

## Crisp strokes

Crisp means clean contours and consistent visual weight. It does not mean replacing rounded caps or corners with sharp ones.

- Use one deliberate stroke weight per icon. Avoid accidental changes caused by overlaps, duplicate paths, tiny segments or inconsistent joins.
- Keep intentional straight sections straight. Curves must join them smoothly, without kinks, flat spots or uneven shoulders.
- Draw a shared visible edge once where possible. Do not hide construction mistakes with extra strokes.
- Keep the icon artwork monochrome and inherit `currentColor`. No blur, glow, shadow or gradient is used to make the glyph appear softer. The website's indigo accents are separate from icon geometry.
- Inspect at actual 16, 20 and 24px sizes before judging the enlarged view. Also inspect at 48px for contour defects, on light and dark surfaces.
- Align straight strokes to the intended pixel grid where practical. Fractional stroke widths and scaling can produce normal antialiasing; do not promise identical pixel sharpness at every size or distort the object's geometry to force it.

## Standard object corner roundness

Owner direction recorded on 2026-10-27: use the accepted Camera/Folder main-body roundness as the standard for object corners. The reference is a circular **3.25-unit Outline centerline radius** at Regular 1.70. Its visible exterior and corresponding Filled outer corner have radius **4.10**; an exposed Filled border's inner radius is **2.40**. Keep stroke width 1.70 and cap radius .85. Use this shared radius for comparable full-size body/page corners, including both Copy pages and the Download/Upload trays. Smaller shoulders, tabs and semantic details keep their fitted local radii; do not overwrite approved local features. The separately approved Plus/X enclosing-box radius remains 4.00.

Copy uses this standard on both pages, with a 4px clear gap between exposed straight borders, exact 2px artboard margins, aligned Outline/Filled exteriors and no extra enclosing box. Both exposed rear endpoints stop 1px before the foreground border, including their rounded caps, to create the owner-requested breaks at the two layer junctions. Record departures from the standard in construction metadata and review them with the owner.

## Current technical baseline

The grid is 24×24 with rounded caps/joins. Outer spacing balances in opposite pairs, measured to the visible edge: left equals right, top equals bottom. The pairs may differ to preserve the real object. Do not stretch every icon into a square.

### Owner-required 2px outer margin

On 2026-10-27, the owner clarified a **primary opposing edge pair** rule: use 2px on the shape's primary pair, with the other pair balanced but free to have more space. Horizontal Camera and Folder use left/right; vertical icons may use top/bottom. Plus and X use both pairs. Keep natural proportions rather than stretching every icon into a square. For naturally filled objects use their own silhouette, with no extra enclosing box. Read [ICON_MARGIN_RULES.md](ICON_MARGIN_RULES.md) before revising size or spacing. Measure visible edges, including stroke/caps, at native 24×24, X/Y=100%, rotation=0 and Regular 1.70.

For boxed Filled marks, reserve 2 units between the box and the artboard on each side. The Outline must be exactly the glyph inside that Filled box, at the same position, size, stroke weight and rounded tips. Retain another 2 units between the glyph and box. For X this gives box bounds 2..22 and shared glyph bounds 4..20. Outline therefore has 4 units of artboard spacing. Keep both glyphs identical; never enlarge one style independently or expand the box to the artboard edges. This is the same shared-glyph relationship as Plus.

Folder Outline and Filled were approved by the owner on 2026-10-26 at X=100%, Y=110%, weight=1.70. Those settings are baked into both source drawings. Outline now has a 1.7 default stroke, contour bounds x=3..21/y=4.3..19.7 and visible padding 2.15 horizontally/3.45 vertically. Filled has bounds x=2.125..21.875/y=3.3375..20.6625 and a default 1.7 inner gap. The Lab now displays the approved source at 100% / 100%. The shared stroke defaults are Thin 1.25, Regular / Default 1.70, and Bold 2.25; custom stroke widths remain supported. Camera Outline/Filled and Search Outline were subsequently owner-approved at native 100% proportions. Heart Outline/Filled were approved after head alignment and grid correction, with the reviewed local X/Y=95% preview recorded in metadata; source proportions are retained. Settings Outline/Filled were then owner-approved at native 100% proportions after contour alignment. Their selected 30-degree clockwise pose is now baked into both SVG sources and becomes the native 0-degree orientation. Bell was initially approved after shortening the hanger, then review was reopened when its Filled clapper still appeared hollow. The solid clapper correction was subsequently owner-approved.

Construction notes must explain the outer contour, internal shapes, optical adjustments and any exceptions. SVGs and metadata remain the only editable artwork source; generated adapters and homepage components must not contain alternative copies of paths.

## Outline and filled styles

Outline uses configurable, consistent strokes. Filled is separately authored fill-only geometry with deliberate negative space; it is not made by simply filling every outline path. Both styles preserve a recognizable silhouette and balanced opposite margins. Review their apparent sizes together at actual display sizes. Folder, Camera, Heart and Settings are approved filled references. Bell is also approved after its solid Filled clapper correction; Sun Outline/Filled are also owner-approved after enlarging the disc and shortening the rays; Moon Outline/Filled were approved on 2026-10-27; the first eight static icons are owner-approved; Plus and X Outline/Filled are owner-approved as of 2026-10-27; Copy Outline/Filled are also owner-approved as of 2026-10-27; three Round 3 and four Round 4 drawings await review. The latest owner direction uses unboxed Bold Filled geometry for Menu and Search. Counters other than Folder are fixed geometry. Only Folder has a strokeWidth-controlled divider.

### Owner-requested boxed Filled marks

On 2026-10-27, the owner requested solid rounded boxes for Plus and X Filled only, with glyph cutouts and exactly 2 native units of inner clearance on all four sides. Outline remains unboxed. Plus uses the `boxed-cutout` treatment: its Filled glyph cutout matches the Regular Outline exterior, and the box is fitted around it.

X uses this same `boxed-cutout` treatment with its box contained at 2..22 and both glyphs at 4..20. The 2px outer margin applies to the Filled box, and another 2px separates the shared glyph from that box. Both glyphs have exactly matching contours at Regular 1.70 and radius-.85 caps. The owner requested rounder box corners for both Plus and X; their current corner radius is 4. Box bounds and both glyph contours stay fixed. The 2-unit inner clearance is measured against each straight box side; a rounder corner changes diagonal clearance. The glyph is centered identically in both styles with no style-specific scaling or translation. Only the added box exterior differs. Both Plus and X pairs are owner-approved on 2026-10-27 at the current radius-4 corners and recorded dimensions.

### Matching outer edges — required for new drawings and revisions

- Outline and Filled must share the same visible outer contour: shape, dimensions, position, corners, shoulders, endpoints and spacing. Matching only the bounding box or apparent size is insufficient.
- Use native X/Y=100%, rotation=0° and Outline Regular / Default 1.70 on the shared 24×24 artboard as the reference. The Filled edge must match the **outside of the visible stroke**, not the Outline path centerline. Preserve that alignment under equal size and rotation settings.
- Build or fit the Filled exterior from the Outline exterior. Do not expand a separate silhouette by eye. Both drawings must use the same center and placement; do not hide source mismatches with style-specific preview scaling or translation.
- Interior features follow the icon's meaning. Corresponding openings must align in shape and position; for a hub such as Settings, its Filled counter matches the visible Outline opening at the reference weight. Filled does not reproduce every decorative internal Outline stroke or add a hole where none is needed. Open parts that represent solid objects, such as the Bell clapper, must have a solid Filled interior; retain their exterior and separation from adjacent parts.
- Review an overlay and repeated style switching, then inspect 16/20/24/48px and at least one rotated pose. New or revised dual-style geometry needs a contour regression check using the actual packed exports. Record the reference weight and construction method in metadata.
- Normal antialiasing differences are acceptable; geometric bulges, shifted edges, unmatched corners or different openings are not. Evaluate vector edges rather than chasing identical raster colors at every zoom.

Filled remains fixed fill-only artwork. Thin, Bold and custom Outline weights can move the visible stroke edge; the required match is at Regular 1.70. Independent nonuniform Lab scaling preserves Outline stroke width and is a diagnostic adjustment, not a replacement for the native reference comparison. Filled availability follows the current owner direction and catalog; Search now provides both styles.

The library and Lab focus on static Outline/Filled geometry, stroke weight and centered X/Y size adjustments. Animation files and exports have been removed.

## Quality and delivery order

1. Establish a small approved static reference set using the shared outer construction and crisp-stroke rules. Review Folder first, then use other object types to check that the grammar works across the family.
2. Produce additional static icons in small batches from that grammar. Review the batch together for weight, spacing and silhouette consistency. Do not invent a separate visual system or custom review page for every icon.
3. Promote an approved change through core → Svelte → homepage. Keep original geometry, deterministic generation, accessible names and style selection intact.

Do not expand the collection while its static visual grammar is unsettled.

## Approval gate

Before a drawing is considered ready, confirm its recognizable outer silhouette, consistent rounding, appropriate interior geometry, crisp strokes, matching Outline/Filled visible outer edges where both styles exist, and readability at actual sizes.

Automated validation checks geometry syntax, safe SVG, named parts, generation and behavior. Visual quality and approval remain human review decisions; passing tests or adding more icons does not establish them.

## Batch requests

When the owner says to add icons, create a batch of six. Any icons the owner names count toward those six; choose complementary icons to fill the remaining places automatically. Do not ask the owner to supply the remainder. This applies to future batches as well. Record each batch and its review status in ICON_BATCHES.md.

Current Camera/Folder revision: both styles now have exact 2px left/right margins and rounder tangent corners. Camera retains a visible height of 17.01649746 (top/bottom 3.49175127); Folder retains 17.36040609 (top/bottom 3.31979695). Their Filled exteriors match the Regular Outline body exactly with no extra box. The owner approved these exact revisions in both styles on 2026-10-27, including the lower Camera housing.

Search boxed revision: the owner requested Filled in a rounded box like Plus/X. The revised shared magnifier fits bounds 4..20 at unchanged Regular 1.70; the box spans 2..22 with radius-4 corners. Its negative-space ring and handle exactly match Outline, with a solid lens center. Both revised styles were owner-approved on 2026-10-27.

Menu/Trash revision: Menu now uses a boxed Filled treatment with radius-4 frame bounds 2..22 and an identical three-bar Outline/cutout glyph. Trash now has vertical sides, standard radius-3.25 centerline base corners (Filled exterior 4.10), fitted rounded handle corners, and a vertical primary margin pair of 2px. Its horizontal margins stay balanced at 3.15px. The owner approved both revised pairs on 2026-10-27.

Current owner direction, superseding earlier Menu/Search box notes: Filled = Bold for Menu and Search, with no enclosing box. Filled matches their shared centerlines at fixed Bold 2.25; Regular Outline remains 1.70. Bold Filled has 2px at its primary pair (Menu left/right; Search all sides); Regular Outline has 2.275px at the same pair. This is an explicit exception to matching the Regular exterior. The owner approved the current resized unboxed Bold Menu/Search pairs and current Trash on 2026-10-27. Thirteen of twenty current pairs are approved. See BOXED_ICON_RULES.md.

Owner approval recorded on 2026-10-27: current Search and Menu Outline/Filled passed with unboxed Filled = Bold 2.25; current Trash was accepted in both styles, including the fitted radius-1 handle centerline corners and radius-3.25 base centerline corners. Preserve these exact accepted geometries. Thirteen of twenty current pairs are approved.

Trash approval-pose correction (2026-10-27): the owner reviewed and accepted X=105%, Y=95%, Regular 1.70 and rotation=0 in both styles. The earlier 100%/100% approval record was incorrect. Preserve the original SVG geometry and its native margin measurements; use metadata labDefaults 105/95 for opening or resetting Trash in Lab. Draft adjustments still take priority while switching icons. Trash remains approved, with 13 approved pairs total.

Trash native-size correction (2026-10-27), superseding the preceding Lab-default correction: bake the accepted 105%/95% centerline proportions into both source drawings and return Lab X/Y to100%/100%. Keep Regular1.70 and round .85 caps. Reconstruct Filled from the baked Outline exterior so both styles align. New native visible bounds x=2.75..21.25/y=2.4575..21.5425 (18.5×19.085); the earlier 2px native top/bottom measurements are historical. Base centerline radii become rx3.4125/ry3.0875; handle rx1.05/ry.95. Trash stays owner-approved. No105/95 Lab-default override remains.

## Arrow V heads

Owner feedback on2026-10-27 rejected the broad radius-1.50 curved-head experiment. Arrow Left/Right, Chevron Up/Down and Download/Upload return to straight-arm V heads, with the original Regular1.70 stroke, round .85 free caps and round joins. Preserve their original endpoints, shafts, bounds and centers. Filled follows the exact Regular Outline exterior. Do not treat the rejected curved-head experiment as a future standard. The owner approved the four navigation Arrow/Chevron pairs on2026-10-27; Download and Upload remain pending.

## Current Check and Filled arrow treatment

Owner direction on2026-10-27: Check Filled uses the boxed-cutout family, with radius-4 frame bounds2..22 and an identical standalone Outline/negative-space mark. See BOXED_ICON_RULES.md. Every Filled arrow (Arrow Left/Right, Chevron Up/Down, Download/Upload) has a solid triangular head with small round exterior corners, keeping the Outline V tip/endpoints and its Regular1.70 exterior. Keep shafts and transfer trays unchanged. Outline heads remain open V shapes. The solid head is a deliberate semantic exception to open Outline interiors; verify Filled against the closed, solid Outline-head reference. The owner approved Check and the four navigation Arrow/Chevron pairs on2026-10-27; Download and Upload remain pending.

Approval clarification on2026-10-27: Check, Arrow Left/Right and Chevron Up/Down passed in both styles. Download and Upload are still awaiting review.18 of20 pairs are approved. Keep Chevron Up/Down as the unified names: each is one icon with Outline and Filled styles. Chevron/caret terminology overlaps and varies by library; do not define the words by whether a shape is filled. Caret is an optional discovery tag, not a separate icon identity or an export rename.

Download/Upload tray refinement (2026-10-27): apply the standard Camera/Folder circular centerline radius3.25 to both lower tray corners. Use Filled outer radius4.10 and inner radius2.40 at Regular1.70, with .85 free-end caps. Preserve the tray mouth endpoints, arrow geometry, overall bounds and opposite margins. Both pairs remain drafts;18 of20 pairs are approved.

Current Moon revision (2026-10-27): the owner requested a longer/deeper inner crescent. Preserve the approved outer radius8, horn positions, native bounds and Regular1.70; reduce the inner centerline radius10→9, deepening the arc midpoint .63324958. Filled uses outer8.85/inner8.15 and .85 horn joins from the same source circles. Previous Moon approval covered radius10; the revised radius9 pair awaits owner review.17 of20 current pairs are approved.

Moon fullness correction (2026-10-27), superseding the preceding deeper-arc revision: the owner rejected radius9 because it made the body thinner. Use inner centerline radius14, moving the inner midpoint1.83215957 units toward the opening and making the crescent substantially fuller. Preserve outer radius8, horn locations, bounds, centering, Regular1.70 and .85 joins. Filled uses outer8.85/inner13.15. The revised pair remains pending;17 pairs stay approved.

Confirmed Moon horn extension (2026-10-27), superseding the curvature experiments: the owner confirmed keeping the previously approved concavity and lengthening both horns. Use inner centerline radius10 and outer8; extend each horn15 degrees along the outer circle (+4.18879020 units total arc). Refit the same radius10 circle through the new ends and uniformly recenter the whole drawing; no independent style scaling. Filled uses8.85/9.15 circles and .85 joins. Native visible margin3.20252287, width/height17.59495426; X/Y100%. The revised pair remains pending, with17 approved pairs.

Moon deeper concavity after horn extension (2026-10-27): Owner requested a deeper Moon concavity after the horn-extension revision. Preserve the extended horn endpoints, outer radius8, placement, bounds, Regular1.70 and round .85 joins. Reduce the inner centerline radius10 to9 and refit its circle through the unchanged horns. Filled follows the exact Regular exterior with outer radius8.85, inner radius8.15 and .85 horn joins. Both styles remain pending owner review. The new inner-circle center is 19.75836822 4.24163178. Native margins remain3.20252287.17 of20 pairs remain approved.

Moon concavity beyond center (2026-10-27), superseding radius9: Owner requested substantially deeper concavity, with the inner arc extending beyond the artboard center. Preserve both extended horns, outer radius8, native bounds, placement and Regular1.70. Fit inner centerline radius6.52 through the unchanged horns. Filled uses the exact Regular exterior: outer radius8.85, inner radius5.67 and round .85 horn joins. The visible concave midpoint is11.73755556 12.26244444, beyond12,12 toward the crescent body; the center is inside the opening in both styles. Both styles remain pending owner review. The new inner-circle center is 15.74685101 8.25314899. Native margins remain3.20252287.17 of20 pairs remain approved.

Moon concavity centered at local0,0 (2026-10-27), superseding beyond-center revision: Owner clarified the concavity target: its deepest visible edge must coincide exactly with the icon center, treated as local0,0. Preserve both extended horns, outer radius8, position, native bounds, Regular1.70 and round .85 joins. Fit inner centerline radius6.569189459166889 so its inward visible edge at Regular1.70 reaches12,12 exactly. Filled is the exact Regular exterior: outer radius8.85, inner radius5.719189459166889 and .85 horn joins. Centerline midpoint11.39895924 12.60104076; shared visible concave midpoint12 12. Both styles remain pending owner review. The new inner-circle center is 16.04407765 7.95592235. Native margins remain3.20252287.17 of20 pairs remain approved.

Moon concave point moved to local2,2 (2026-10-27), superseding the circle-center interpretation: Owner corrected the interpretation: move the concave edge point, not the circle center, to local2,2 relative to the artboard center. The requested visible edge point is14,14. Translate the existing concave circle by+2,+2; preserve outer-circle center12.05252287 11.94747713, outer radius8, inner centerline radius6.569189459166889, Regular1.70 and round .85 joins. Recompute both horn intersections with the fixed outer circle. Filled uses exact outer8.85 and inner5.719189459166889 offsets and .85 joins. Do not recenter the result, because that would move the requested point away from local2,2. Native visible margins are left3.20252287/right4.51829225/top3.09747713/bottom3.20252287. This asymmetry is the intentional result of the requested notch translation. Both styles remain pending owner review. The new inner-circle center is 18.04407765 9.95592235.17 of20 pairs remain approved.
