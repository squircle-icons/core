# Morph specification — core reference

Status: maintained specification, 2026-10-27. The homepage `design/MORPH.md` is the user-facing companion. This document defines the supported
pairs and their implementation contract. Approval is recorded per pair; a passing
check does not approve a new motion or change static icon approval.

## Pair registry

| Pair       | Lab route           | Svelte subpath   | Default rate     | Review status                                |
| ---------- | ------------------- | ---------------- | ---------------- | -------------------------------------------- |
| Sun ↔ Moon | `/lab/morph`        | `morph/sun-moon` | 1.0× shared rate | Owner-preferred motion reference; experiment |
| Plus ↔ X   | `/lab/morph/plus-x` | `morph/plus-x`   | 0.4× shared rate | Motion explicitly approved 2026-10-27        |
| Menu ↔ X   | `/lab/morph/menu-x` | `morph/menu-x`   | 0.6× shared rate | New proposal; awaiting owner review          |

These are deliberately authored pairs. Adding a pair requires a meaningful state
relationship, an explicit mapping of contours and parts, endpoint checks, and
visual review in both directions. The API does not automatically morph arbitrary
icons. Static direct imports and barrels must not load the morph runtime.

## Source ownership and promotion

Core owns the original SVGs, source-derived endpoint data, and framework-independent
intermediate geometry. Svelte owns rendering, accessible attributes and the shared
progress controller. The homepage imports the packed development adapter and
provides inspection controls; it must not copy or author icon paths.

Commit and validate core, run adapter `pnpm sync:core ../core`, verify and commit
the adapter, then run homepage `pnpm sync:lab ../svelte`. Keep the public published
package separate from `@squircle-icons/lab-svelte`, and retain all Lab drafts.
Use a clean committed source snapshot when other work is in progress; preserve
unrelated working-tree changes.

## Shared motion and API contract

- Native artboard: 24 × 24. Current Regular stroke: 1.75; Thin 1.25 and Bold 2.50
  remain the static palette. Morph weights are fixed, with no thickness control.
  Historical 1.70/2.25 references are superseded.
- One analytic critically damped spring drives progress: mass 1, stiffness 100,
  damping 20. Each pair's rate multiplier is applied before the `speed` prop.
- Retargeting retains position and velocity. Never restart from an endpoint,
  remount the SVG, or insert a pause on reversal. Both directions use the same
  geometry function.
- `progress` provides deterministic inspection in [0, 1] and overrides animation.
  Non-finite input resolves to the start; values outside the range are clamped.
- Sun Moon uses `moon`; Plus X and Menu X use `x` for the destination boolean.
  All accept `style`, `size`, `color`, `label`, `class`, `speed`, `onprogress` and
  `onsettle`. Optional labels expose an image role; otherwise SVGs are decorative.
- Reduced motion disables autoplay and switches requested states immediately.
  Manual scrubbing remains available. Hidden tabs pause playback; unmounting
  cancels scheduled frames and removes listeners.
- Geometry must be continuous. Preserve approved static contours and endpoints;
  use coordinated contour changes, without a whole-icon opacity crossfade.

## Sun ↔ Moon

Use this pair as the owner's preferred motion reference: continuous shape change,
coordinated parts, gentle settling and smooth mid-flight reversal. Core derives
the circle, eight 3px visible Sun rays, and Moon circles from the current SVGs.
The body grows into the crescent while the rays retract. Concavity and ray phases
use C2 interpolation. Filled follows the same evolving closed body and Regular
exterior. Moon retains its approved native pose, including the baked -30° source
orientation. Endpoint data must be regenerated after an approved static revision.

## Plus ↔ X — approved reference

Fold Plus through one horizontal line and immediately open into X. At progress
0.5 there is exactly one horizontal stroke, with no hold and no easing to a stop.
Carry nonzero matching angular velocity and continuous acceleration through that
merge. Keep the approved slower 0.4× rate and smooth reversal.

The mark has visible bounds 4..20. X extends its arms as it opens so it matches
the accepted endpoint rather than an undersized strict rotation. In Filled, the
radius-4 box stays upright at 2..22; its hole is the exact analytical union of the
same two moving round-ended Outline strokes, including overlapping end caps.

Original approved motion commits: core
`e4a739a4fde20156bfe7a812f78918f06daeb75b`, Svelte
`190b84b49ea2e058fc99d358298a392c0271eaee`. The subsequent global weight update
changes source-derived contours to 1.75 while preserving that motion and pace.
Earlier simple rotation, vertical merge, faster pace and held midpoint trials
are superseded and are not implementation options.

## Menu ↔ X — proposed pair

Outline maps the top and bottom Menu bars onto the two X diagonals. The bars
move inward, then open into X as the middle bar contracts to zero length and
thickness. Rounded ends follow the shared geometry. The X endpoint uses the
accepted 4..20 visible bounds at Regular 1.75. There is no midpoint hold.

Filled endpoints have deliberately different construction: Menu is the accepted
unboxed Bold 2.50 glyph, while X is a Regular 1.75 cutout in its radius-4 box at
2..22. Preserve both endpoint sources. The transition maps the two outer Menu
capsules to the upper and lower solid regions of the boxed X; their concave
boundaries open the X hole while the middle capsule contracts. Matched horizontal boundary stations provide a geometric transition without opacity, duplicate IDs or masks.
Intermediate Filled geometry is a separately authored topology bridge; only the
X endpoint has the exact Outline/cutout relationship. This does not alter the
shared-glyph rule for static icons or the approved Plus X morph.

The 0.6× rate and intermediate contour treatment are review proposals. Do not
record them as owner-approved until explicitly accepted. No static approval
statuses change when this pair is added.

## Review and verification

1. Compare each packed endpoint against the corresponding static component in
   Outline and Filled. Inspect 16, 20, 24 and 48px, on light and dark surfaces.
2. Scrub intermediate frames, including phase boundaries and values immediately
   next to both endpoints. Check finite coordinates, bounded contours, consistent
   rounding and the absence of flashes, gaps or accidental holes.
3. Exercise forward/reverse playback, reversal before and after the midpoint,
   repeated retargeting, slow playback, hidden-tab resume and reduced motion.
4. Check native SSR/hydration, Svelte 5.0 compatibility, static import isolation,
   and Chromium, Firefox and WebKit rendering. Inspect desktop and mobile widths.
5. Preserve the static catalog and its draft/approval records. Save a screenshot
   for owner review and record explicit motion approval separately from tests.

The Lab provides a pair picker, loop, click-to-reverse, 1×/0.5× speed, progress
scrubber, style and surface switching, endpoint comparisons and actual-size
samples. Documentation becomes official independently of visual acceptance of a
new pair.
