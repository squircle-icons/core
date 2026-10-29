# Current Squircle design rules

The production collection now contains the same 94 native source pairs used by the active Lab. Use [ICON_RULES.md](ICON_RULES.md) for the canonical current construction decisions and source references. Legacy production/frame artwork and superseded prototype datasets are removed.

## Original shape language

Develop the project's own squircle language from each icon's meaning. Apply curvature deliberately to each body, tab, housing, join or opening; do not force every detail into the same corner or copy external geometry. Keep accepted source contours, native proportions, poses and semantic details intact. New visual revisions require owner review.

## Source and styles

Native SVG sources and hashes live under `icons/figma-study/`. Generated catalogs/components must preserve their path coordinates, transforms, paint and transparent counters. Regular Outline follows the current 1.5 source baseline; configurable weights apply only to real centerline strokes. Expanded Heart/Pen Outline geometry remains fixed. Filled keeps its actual authored treatment; it is not a generic fill of the Outline and does not inherit a fake width control.

Inspect actual 16/20/24/48px output on light and dark surfaces. Compare the packed component to literal source paint, including clip boundaries and counters. Do not hide errors with scaling, opaque patches, generic corner refits or updated visual baselines. Viewport normalization may remove only verified full-viewport clip definitions, without changing visible paint.

## Motion and publication

[MORPH.md](MORPH.md) owns the five reversible pair specifications and Trash motion. Keep approved timing and source-derived endpoints. Static and animated Trash now share current source artwork. Animate and Morph retain separate Lab pages.

Review metadata stays truthful. Four source pairs retain explicit approval; other current drawings remain drafts. The owner authorized the current alpha release; successful tests or publication do not grant visual approval. Stable releases require approved artwork.
