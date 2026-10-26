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

Camera and Folder retain natural horizontal proportions with rounder tangent corners. Camera’s raised housing is .75 unit lower relative to its body, with the whole drawing recentered vertically. Their Filled exteriors are exact .85 outward offsets of the same Outline paths. Interior lens/indicator counters and the straight adjustable Folder divider remain separate semantic features. Revisions await owner review; the previous approval refers to earlier geometry. The public released package stays pinned separately from the development Lab.
