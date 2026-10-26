# Contributing to core

Read [DESIGN_RULES.md](DESIGN_RULES.md), [ICON_MARGIN_RULES.md](ICON_MARGIN_RULES.md) and [BOXED_ICON_RULES.md](BOXED_ICON_RULES.md) first. Re-read the boxed-icon construction reference before every Plus/X change. Review the silhouette and crisp strokes, and review new drawings in a batch against the approved family.

For every new or revised dual-style icon, match the Filled outer edge to the visible Outline exterior at native 100% and Regular 1.70. Compare overlays and rotated poses, inspect actual sizes, and add or update the packed-export contour regression check in the adapter.

Edit original SVG and metadata in `icons/`, or framework-independent types in `src/`. Preserve stable `data-part` names. Keep core free of framework imports and import-time DOM work. Run `pnpm verify` and inspect artwork in the homepage before accepting geometry changes.

Generated catalog data and adapter components are build output. Commit core changes before synchronizing an adapter, so the downstream source commit is traceable. Contributions to original code and artwork are submitted under the project’s [MIT license](LICENSE).

Use 2px at the primary opposing edge pair. Camera/Folder use left/right and retain horizontal proportions; another icon may use top/bottom. The remaining pair need not be 2px. Plus/X use all four sides of their Filled box. Naturally filled objects need no added enclosing box.

Owner exception: Menu/Search Filled is the shared Outline centerline expanded at Bold 2.25, with no box. Compare their packed Filled contours against Outline Bold, not Regular. See current direction in BOXED_ICON_RULES.md.
