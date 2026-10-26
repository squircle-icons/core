# Squircle Icons design rules

Owner direction recorded on 2026-10-26; Moon approval added on 2026-10-27. These rules guide new drawings and revisions; Folder, Camera, Heart and Settings Outline/Filled, plus Search Outline, are approved references. Bell is also approved after its solid Filled clapper correction; Sun Outline/Filled are also owner-approved after enlarging the disc and shortening the rays; Moon Outline/Filled were approved on 2026-10-27; the first eight static icons are owner-approved; the six Round 3 and six Round 4 drawings await review. Search intentionally has no Filled style.

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

## Current technical baseline

The grid is 24×24 with rounded caps/joins. Outer spacing balances in opposite pairs, measured to the visible edge: left equals right, top equals bottom. The pairs may differ to preserve the real object. Do not stretch every icon into a square.

Folder Outline and Filled were approved by the owner on 2026-10-26 at X=100%, Y=110%, weight=1.70. Those settings are baked into both source drawings. Outline now has a 1.7 default stroke, contour bounds x=3..21/y=4.3..19.7 and visible padding 2.15 horizontally/3.45 vertically. Filled has bounds x=2.125..21.875/y=3.3375..20.6625 and a default 1.7 inner gap. The Lab now displays the approved source at 100% / 100%. The shared stroke defaults are Thin 1.25, Regular / Default 1.70, and Bold 2.25; custom stroke widths remain supported. Camera Outline/Filled and Search Outline were subsequently owner-approved at native 100% proportions. Heart Outline/Filled were approved after head alignment and grid correction, with the reviewed local X/Y=95% preview recorded in metadata; source proportions are retained. Settings Outline/Filled were then owner-approved at native 100% proportions after contour alignment. Their selected 30-degree clockwise pose is now baked into both SVG sources and becomes the native 0-degree orientation. Bell was initially approved after shortening the hanger, then review was reopened when its Filled clapper still appeared hollow. The solid clapper correction was subsequently owner-approved.

Construction notes must explain the outer contour, internal shapes, optical adjustments and any exceptions. SVGs and metadata remain the only editable artwork source; generated adapters and homepage components must not contain alternative copies of paths.

## Outline and filled styles

Outline uses configurable, consistent strokes. Filled is separately authored fill-only geometry with deliberate negative space; it is not made by simply filling every outline path. Both styles preserve a recognizable silhouette and balanced opposite margins. Review their apparent sizes together at actual display sizes. Folder, Camera, Heart and Settings are approved filled references. Bell is also approved after its solid Filled clapper correction; Sun Outline/Filled are also owner-approved after enlarging the disc and shortening the rays; Moon Outline/Filled were approved on 2026-10-27; the first eight static icons are owner-approved; the six Round 3 and six Round 4 drawings await review. Search is intentionally Outline-only by owner direction. Counters other than Folder are fixed geometry. Only Folder has a strokeWidth-controlled divider.

### Matching outer edges — required for new drawings and revisions

- Outline and Filled must share the same visible outer contour: shape, dimensions, position, corners, shoulders, endpoints and spacing. Matching only the bounding box or apparent size is insufficient.
- Use native X/Y=100%, rotation=0° and Outline Regular / Default 1.70 on the shared 24×24 artboard as the reference. The Filled edge must match the **outside of the visible stroke**, not the Outline path centerline. Preserve that alignment under equal size and rotation settings.
- Build or fit the Filled exterior from the Outline exterior. Do not expand a separate silhouette by eye. Both drawings must use the same center and placement; do not hide source mismatches with style-specific preview scaling or translation.
- Interior features follow the icon's meaning. Corresponding openings must align in shape and position; for a hub such as Settings, its Filled counter matches the visible Outline opening at the reference weight. Filled does not reproduce every decorative internal Outline stroke or add a hole where none is needed. Open parts that represent solid objects, such as the Bell clapper, must have a solid Filled interior; retain their exterior and separation from adjacent parts.
- Review an overlay and repeated style switching, then inspect 16/20/24/48px and at least one rotated pose. New or revised dual-style geometry needs a contour regression check using the actual packed exports. Record the reference weight and construction method in metadata.
- Normal antialiasing differences are acceptable; geometric bulges, shifted edges, unmatched corners or different openings are not. Evaluate vector edges rather than chasing identical raster colors at every zoom.

Filled remains fixed fill-only artwork. Thin, Bold and custom Outline weights can move the visible stroke edge; the required match is at Regular 1.70. Independent nonuniform Lab scaling preserves Outline stroke width and is a diagnostic adjustment, not a replacement for the native reference comparison. Outline-only icons such as Search do not need a Filled variant.

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
