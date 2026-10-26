# Contributing to core

Read [DESIGN_RULES.md](DESIGN_RULES.md) first. Review the static silhouette and crisp strokes before motion, and review new drawings in a batch against the approved family.

For every new or revised dual-style icon, match the Filled outer edge to the visible Outline exterior at native 100% and Regular 1.70. Compare overlays and rotated poses, inspect actual sizes, and add or update the packed-export contour regression check in the adapter.

Edit original SVG and metadata in `icons/`, motion definitions in `motions/`, or framework-independent code in `src/`. Preserve stable `data-part` names and explicit state endpoints. Keep core free of framework imports and import-time DOM work. Run `pnpm verify` and inspect artwork/motion in the homepage before accepting geometry changes.

Generated catalog data and adapter components are build output. Commit core changes before synchronizing an adapter, so the downstream source commit is traceable. Contributions to original code and artwork are submitted under the project’s [MIT license](LICENSE).
