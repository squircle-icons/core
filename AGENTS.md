# Mandatory icon construction reading

Before editing any artwork or its construction metadata, read `CONTRIBUTING.md`,
`DESIGN_RULES.md`, `ICON_MARGIN_RULES.md` and `BOXED_ICON_RULES.md`. Re-read the boxed-icon guide for any
Plus/X revision, even when prior conversation context is available.

Outline is the exact glyph inside the boxed Filled variant. Preserve its size,
position, stroke weight and round ends across styles. The Filled box needs its
own outer clearance. Follow the recorded dimensions instead of compensating one
style independently. Update the guide when the owner explicitly changes a rule.

Original SVGs and metadata are the only artwork source. Commit validated source
before syncing an adapter. Automated checks never grant visual approval.

Use 2px at the primary opposing edge pair. Camera/Folder use left/right and retain horizontal proportions; another icon may use top/bottom. The remaining pair need not be 2px. Plus/X use all four sides of their Filled box. Naturally filled objects need no added enclosing box.
