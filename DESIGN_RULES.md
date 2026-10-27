# Squircle Icons design rules

Current motion approval: Plus ↔ X continuous horizontal merge is owner-approved on2026-10-27. See the approved motion reference at the end of this document.

Current approval status:14 of33 pairs are owner-approved as of2026-10-27. Arrow/Chevron and Plus/Minus/X frame families await review; Sun retains its approved3px visible rays. Earlier approval counts below are historical. Moon uses the accepted -30-degree pose as its native0-degree source orientation.

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

Moon concave point moved to local2,2 (2026-10-27), superseding the circle-center interpretation: Owner corrected the interpretation: move the concave edge point, not the circle center, to local2,2 relative to the artboard center. The requested visible edge point is14,14. Keep inner center18.04407765 9.95592235 and centerline radius6.569189459166889. Preserve the radius8 outer-circle shape, Regular1.70 and .85 horn joins; place the outer center at12.65789151 12 and recompute intersections so the complete source is centered without moving the requested edge point. Filled uses exact outer8.85 and inner5.719189459166889 offsets and .85 joins. Native visible margins are left/right3.80789151 and top/bottom3.15. Both styles remain pending owner review. The new inner-circle center is 18.04407765 9.95592235.17 of20 pairs remain approved.

Owner approval completed on2026-10-27: Moon passed at -30 degrees and Download/Upload passed in both styles. All20 current icon pairs are approved. Moon’s accepted pose is baked into source and becomes native0 degrees at X/Y100%, preserving Regular1.70 and exact Outline/Filled contours. Recenter both styles uniformly; no independent scaling. Download/Upload geometry is unchanged.

## Experimental Sun ↔ Moon morph

The owner requested the first reversible morph pair on2026-10-27. This reopens motion as an opt-in experiment, superseding the earlier static-only scope for this separate pair. Preserve all20 approved static drawings and their statuses. Derive endpoint geometry from the validated Sun and Moon sources. A shared circular body grows from Sun into Moon while the eight rays retract and disappear; do not crossfade two whole icons. Keep Regular1.70 throughout. Filled is the same evolving closed silhouette plus its Regular exterior, matching the approved Filled endpoints. Use a critically damped, reversible progress controller, retain velocity when retargeting, and support manual inspection and reduced motion. The morph itself remains experimental and awaits owner review. Static direct imports must not load this experiment.

### Owner's preferred motion direction

On2026-10-27, the owner explicitly said they like the Sun ↔ Moon morph and asked to record it as the reference for future motion. Prefer a continuous transformation of the same shape, with coordinated disappearance/appearance of its parts, smooth settling, and equally considered forward and reverse motion. Preserve position and velocity when reversed mid-flight. Keep the accepted static endpoint shapes and stroke weight intact in both styles.

Morphs are deliberately authored pairs, not a promise that any two icons can be combined automatically. Choose pairs with a meaningful state relationship and inspect their geometric correspondence. Similar structures can share a construction; very different structures can still morph, but need their own treatment of contours, holes and appearing/disappearing parts. Design and inspect each new pair individually. Sun ↔ Moon is the first reference pair; liking this motion direction does not automatically approve future pairs or every timing detail of the prototype.

Sun ray-length trial (2026-10-27): Owner requested a trial of longer Sun rays on2026-10-27. Each ray is3px long measured to the visible rounded ends at native24px and Regular1.70: centerline length1.30, spanning radial distance7.90..9.20, plus .85 caps at each end. Extend only the inner endpoint by.30; preserve the outer tips, disc radius5.10 (Filled5.95), stroke1.70, native X/Y100%, rotation0 and equal margins1.95. Filled rays are exact radius-.85 capsules around the same centerlines. The Sun Moon morph derives its Sun endpoint from this source automatically. This trial replaces the previously approved2.70px rays and awaits owner review;19 of20 pairs remain approved.

Sun3px ray approval (2026-10-27): the owner approved the revised Sun and requested the morph be updated to use it. Preserve visible ray length3px (centerline1.30 plus1.70 rounded stroke), disc radius5.10 / Filled5.95, outer tips and Regular1.70. Regenerate the opt-in Sun Moon morph from this same source for exact matching endpoints in both directions and styles. All20 static pairs are approved; the morph remains a separate experiment.

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

## Round5 directional arrows

Add Arrow Up/Down and all four diagonal directions to complete the eight compass arrows. Use the approved Arrow Right centerline proportions, baked rotation and uniform fitting with fixed Regular1.70 and .85 round caps/joins. New Up/Down have2px top/bottom primary margins and naturally larger left/right spacing; diagonals use2px on both pairs. Construct Filled with the shared shaft capsule and a solid triangular head expanded around the same head vertices at radius.85. Keep the existing approved Left/Right source unchanged, including its historical3.15px horizontal margin. Do not infer approval of these six new drawings from the approved reference. All six pairs await owner review.

## Current global weight palette — 2026-10-27

Owner requested all icons to start at Regular1.75, with Thin1.25, Bold2.50 and .25-unit adjustment steps. The owner explicitly confirmed this includes Filled and both morphs. This supersedes historical1.70/2.25 stroke references throughout earlier construction notes. All26 Outline sources now default to1.75. Filled contours are rebuilt around the same source centerlines at radius.875; Menu/Search use Bold2.50. Existing2px primary bounds and boxed2px inner clearance are retained by a small uniform centerline refit; box frames stay2..22/radius4. Other accepted centerline poses remain unchanged. Preserve the approved horizontal, continuous, no-hold Plus X motion and its slow pace; only the source-derived stroke/endpoints follow the new weight. Keep the six Round5 arrow pairs as drafts.

Owner compass-arrow size correction (2026-10-27): all8 directional arrows must use the same physical shaft length18.25, identical head-arm lengths and Regular1.75. Derive each direction by rotation about12,12; do not independently enlarge diagonals to touch all four artboard edges. Cardinals have2px at their primary pair. Diagonal visible X/Y margins are4.67265062, preserving the same physical size. This explicit owner correction supersedes earlier diagonal all-side2px fits and normalizes Left/Right with Up/Down.

## Current framed arrow family — 2026-10-27

The owner requested smaller, equal arrows with room for Square/Circle frames. This supersedes the previous18.25-unit shaft and standalone2px edge rule. All8 directions now share a12.25-unit shaft, identical head arms and1.75 stroke. Standalone and framed arrows use exactly the same glyph, position and size. Add frame variants to the existing8 arrow identities; this is a construction revision, not a new six-icon batch. Square/Circle outer frames have2px artboard margins; Square exterior radius4, Circle radius10. Outline frame centerlines are inset by.875. Filled frames use negative space cut from a solid frame, preserving the standalone Filled solid-head silhouette. The glyph has14px visible length along its own axis; cardinal standalone primary margins are5px and diagonal margins6.79397097px. Circle inner clearance is1.25px at Regular and.5px at Bold2.50. Directional rotation never rotates the Square frame. All8 arrow pairs and their new frames await owner review;18 of26 standalone pairs remain approved.

## Current Chevron family — 2026-10-27

Apply the same Arrow concept to Chevron:8 directions times None/Square/Circle =24 variants, with Outline/Filled for each. Round6 adds the six missing directions to existing Up/Down. Use equal90-degree V arms of length5.5*sqrt(2), endpoints at(-5.5,2.75),(0,-2.75),(5.5,2.75) before rotation. Rotate and uniformly recenter the bounding box at12,12; never scale directions independently. The same glyph/placement appears in all frames. Filled closes and expands the same triangle at half Regular.875; framed Filled subtracts that exact silhouette. Reuse Arrow frame geometry:2px exterior margins, Square exterior radius4, Circle radius10. At Bold2.50 the circular border still clears all Chevron vertices by at least.4758px. Up/Down review reopens for the new smaller shared glyph. The catalog now contains32 standalone identities:16 approved and16 directional Arrow/Chevron pairs awaiting review. Each directional family contains24 variants; styles do not change that count.

## Maintained morph specification — 2026-10-27

[MORPH.md](MORPH.md) defines the current pair registry, fixed weights, shared
reversible spring, source ownership, promotion and review contract. Menu ↔ X is
a new authored proposal: outer Menu bars become X diagonals and the middle bar
contracts; Filled bridges its approved unboxed Bold Menu to the approved boxed
X. Its intermediate topology and 0.6× pace await owner review. The approved
Plus ↔ X motion and its 0.4× pace remain unchanged. Official documentation does
not confer motion approval or change static icon approval statuses.

## Chevron owner clarification — four directions plus Double (2026-10-27)

Supersedes the earlier eight-direction Chevron proposal. The owner explicitly excludes diagonal Chevron icons. Keep Single Chevron in Up/Down/Left/Right and add Double Chevron in the same four directions (`chevrons-up/down/left/right`). Each of these8 identities supports None/Square/Circle with Outline/Filled:24 variants total. Single V geometry stays unchanged. Double uses two equal V marks with local vertices(-4,2),(0,-2),(4,2), shifted by -3/+3 along the vertical axis before cardinal rotation. Rotate and center without scaling; reuse exactly the same glyph in all frames. Filled closes and expands both triangles at.875, retaining.25px between them; framed Filled subtracts that same silhouette. All Arrow frame dimensions remain unchanged. Double retains at least.2218px circular clearance at Bold2.50. The total catalog remains32 identities,16 approved and16 pending directional pairs. No diagonal Chevron components or exports remain.

## Double Chevron touching heads — 2026-10-27

Owner requested the two Double Chevron Filled heads to touch, as viewed in Lab. Set the two V centers at -2.875/+2.875 along the directional axis (5.75 center separation), with unchanged local arm vertices(-4,2),(0,-2),(4,2) and Regular1.75. The .875-expanded solid triangles meet exactly at the artwork center with zero gap, without overlap. Apply the identical revised centerlines to Outline and every Square/Circle variant. The four cardinal directions remain rigid rotations; no diagonals. Double native visible size is9.75 by11.50 for Up/Down, swapped for Left/Right. This supersedes the earlier .25px Filled gap and shifts of -3/+3.

## Plus / Minus / X three-style frame family — 2026-10-27

Owner requested Plus/Minus/X to follow the frame family with three explicit styles: Outline Regular1.75, unboxed Bold2.50, and Filled. Frame None Filled equals the unboxed Bold2.50 expansion, as Menu/Search. Square/Circle Filled uses a solid upright frame and the exact Regular1.75 glyph cutout. Use shared centerlines centered at12,12, extent4.5 on both axes; Plus and X retain identical optical bounds10.75 square at Regular and11.50 at Bold; Minus shares their horizontal extent. Smaller source glyphs reserve actual Circle clearance at every weight without independent per-frame scaling. Frame exteriors span2..22, Square radius4 and Circle radius10, same as Arrow/Chevron. Outline centerlines are2.875..21.125 with corner radius3.125, circle9.125. Bold is explicitly unboxed; selecting it ignores a frame. At Bold the Circle border clears the X by at least.261px. Filled standalone is the exact union of the shared centerlines expanded at2.50; frame holes use1.75. This supersedes the previous standalone boxed Plus/X Filled semantics. Morph timing remains approved, while its boxed endpoints derive from the new Square frame sources. Family extension adds Minus only; it is not a six unrelated-icon batch. All three revised identities await owner review.

The catalog now has33 identities:14 approved and19 draft. Arrow and Chevron families keep their current geometry. Plus X and Menu X retain the same reversible motion and timing; boxed Filled endpoints now reference the Square frame source, while standalone Filled is Bold.

## Morph frame parity — owner correction, 2026-10-27

When a morph has frame variants, implement every supported frame for the whole
pair. Menu X, Plus X and Plus Minus support None/Square/Circle, with the same
selection at both ends and throughout Filled playback. No unboxed-to-box pairing
or silent fallback is allowed. Verify every variant using packed endpoints and
intermediate frames. See [MORPH.md](MORPH.md) for the canonical frame matrix and
source-derived weights. This supersedes earlier Menu X topology-bridge notes;
static icon construction, approval statuses and accepted motion timing stay intact.
