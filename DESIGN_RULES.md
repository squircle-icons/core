# Squircle Icons design rules

Owner direction recorded on 2026-10-26. These rules guide new drawings and revisions; Folder Outline and Filled are approved references; the remaining alpha drawings still need review.

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
- Motion must preserve readable contours and consistent apparent stroke weight. Translation and rotation are preferable when they express the action. Check nonuniform scaling for visibly compressed strokes and awkward joins before accepting it.

## Current technical baseline

The grid is 24×24 with rounded caps/joins. Outer spacing balances in opposite pairs, measured to the visible edge: left equals right, top equals bottom. The pairs may differ to preserve the real object. Do not stretch every icon into a square.

Folder Outline and Filled were approved by the owner on 2026-10-26 at X=100%, Y=110%, weight=1.70. Those settings are baked into both source drawings. Outline now has a 1.7 default stroke, contour bounds x=3..21/y=4.3..19.7 and visible padding 2.15 horizontally/3.45 vertically. Filled has bounds x=2.125..21.875/y=3.3375..20.6625 and a default 1.7 inner gap. The Lab now displays the approved source at 100% / 100%. The shared stroke defaults are Thin 1.25, Regular / Default 1.70, and Bold 2.25; custom stroke widths remain supported. Other icon shapes await their own review.

Construction notes must explain the outer contour, internal shapes, optical adjustments and any exceptions. SVGs and metadata remain the only editable artwork source; generated adapters and homepage components must not contain alternative copies of paths.

## Outline and filled styles

Outline uses configurable, consistent strokes. Filled is separately authored fill-only geometry with deliberate negative space; it is not made by simply filling every outline path. Both styles preserve a recognizable silhouette and balanced opposite margins. Review their apparent sizes together at actual display sizes. Folder is the approved filled reference. Camera, Bell, Heart, Search and Settings have separately authored filled review studies; they remain unapproved. Their counters are fixed geometry. Only Folder has a strokeWidth-controlled divider.

Motion work is paused. The current Lab focuses on static outline/filled geometry, stroke weight and centered X/Y size adjustments. Existing animation exports remain evaluation-era functionality and are not being extended.

## Quality and delivery order

1. Establish a small approved static reference set using the shared outer construction and crisp-stroke rules. Review Folder first, then use other object types to check that the grammar works across the family.
2. Produce additional static icons in small batches from that grammar. Review the batch together for weight, spacing and silhouette consistency. Do not invent a separate visual system or custom review page for every icon.
3. Add motion only when it communicates a useful state or action. Static support is sufficient for an icon; animation is not a release requirement for every drawing.
4. Reuse named-part motion patterns. Keep experiments in the existing Lab and limit each motion review to a small set of options. Park unresolved motion instead of blocking the static collection on it.
5. Promote an approved change through core → Svelte → homepage. Keep original geometry, deterministic generation, accessible names, opt-in playback and reduced-motion behavior intact.

Do not expand the collection while its static visual grammar is unsettled. Existing Folder/Bell motion remains available for evaluation; further motion refinement waits until the static baseline is accepted.

## Approval gate

Before a drawing is considered ready, confirm its recognizable outer silhouette, consistent rounding, appropriate interior geometry, crisp strokes and readability at actual sizes. If motion is included, also inspect both endpoints, a paused middle frame, interruption and reduced motion.

Automated validation checks geometry syntax, safe SVG, named parts, generation and behavior. Visual quality and approval remain human review decisions; passing tests or adding more icons does not establish them.
