# Primary margin pairs — mandatory reference

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

Owner approval on2026-10-27 completes the full collection: Check and all six arrow pairs passed in both styles, including the boxed Check and solid Filled heads. All20 pairs are approved. Keep Chevron Up/Down as the unified names: each is one icon with Outline and Filled styles. Chevron/caret terminology overlaps and varies by library; do not define the words by whether a shape is filled. Caret is an optional discovery tag, not a separate icon identity or an export rename.
