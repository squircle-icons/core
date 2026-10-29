# Morph — shared agent playbook

Maintained: 2026-10-29. **This is the canonical working document for every morph
request across core, Svelte and the standalone local Lab.** Read it before starting a pair or
revising motion. Update this document when the owner changes the contract;
repository entry points should link here instead of maintaining another copy.

## Start here — owner working agreement

When the owner says “make A ↔ B”, treat that as an instruction to implement the
pair through to a working Lab preview. Start after the required reading; do not
stop at a recommendation, capability statement or proposed plan. Choose sensible
implementation details within the established design rules. A written design
brief below records the work; it is not a mandatory approval checkpoint.

**The owner explicitly allows questions whenever the agent is unsure.** Ask when
intent, endpoint identity, construction, style, timing or conflicting instructions
could materially change the result. Do not conceal uncertainty or treat this
permission as a requirement to ask before every routine step. Continue independent
work while awaiting clarification; do not guess a decision that needs the owner's
answer. A morph request authorizes the necessary pair implementation and preview,
not an unrelated icon batch, publication or a change to other approved motions.

An unfamiliar pair needs its own contour/part mapping. It is not a reason to stop
at “these icons cannot morph automatically”. Investigate and author the transition;
ask if the intended states or a significant design choice remain unclear. If an
endpoint does not exist, establish the necessary static state using the same
construction rules before animating it. An explicit add-icons request still follows
the workspace's six-icon batch rule.

Before editing:

1. Read the workspace `AGENTS.md` and the relevant repository `CONTRIBUTING.md`.
2. Read [DESIGN_RULES.md](DESIGN_RULES.md), [ICON_MARGIN_RULES.md](ICON_MARGIN_RULES.md)
   and [BOXED_ICON_RULES.md](BOXED_ICON_RULES.md). Use their latest applicable owner
   rule; older dated trials are historical, not alternative current specifications.
3. Read this playbook, the selected pair's source, its endpoint builder and its
   existing tests. Inspect both static styles and the actual frame variant used.
4. Inspect the working state of the source repositories and local app. Preserve unrelated work,
   drafts, review metadata and the separate public/Lab package pins.

## 1. Goal

Deliver a deliberately designed transformation between two meaningful states,
readable at actual icon sizes and smooth in both directions. The result must:

- Reach the current source contours exactly at progress 0 and 1, including the
  correct style and frame. Preserve their review status separately from motion.
- Change the same shape or coordinated parts continuously, with deliberate
  treatment of appearing parts, holes, merges and splits.
- Reverse mid-flight from its current position and velocity, without a reset,
  flash, SVG replacement or unintended midpoint pause.
- Work in Outline and Filled, with accessible labeling, reduced motion and a
  usable Lab preview for manual inspection.
- Keep ordinary static direct imports free of motion runtime and unrelated geometry.
  Trash is the explicit unified-API exception described below.
- Include reproducible automated checks, visual evidence and an accurate handoff.

The Sun ↔ Moon motion is the owner's preferred visual reference. Plus ↔ X's
continuous horizontal merge is the approved timing/construction reference for
that pair. Neither preference automatically approves the design of another pair.

## 2. Design

### Current endpoint contract — owner migration, 2026-10-29

The owner explicitly requested **all morphs use the new icons and the old morph
set be removed**. This supersedes the earlier1.75 production/frame endpoint
contract. The active five pairs read the same committed `FIGMA_STUDY_ICONS` export
from `src/design/figma-catalog.ts` that the new main Lab uses. Do not use legacy
`icons/` drawings or re-create an endpoint in Lab. Static production package
retention is separate from removal of the old active morph interface.

All active endpoints use native24×24 and Outline1.5. Filled uses the actual source
treatment: Sun/Moon follow the1.5 exterior; Plus/Minus/X/Menu/Maximize/Minimize use
fixed Bold2.5 marks. Preserve source pose, round caps, joins and optical extents.
Current new endpoints are unframed: remove old None/Square/Circle selection and
old framed morph data. A later framed request must provide authored matching
sources; never apply a generic frame to the new study marks.

| Pair                | Canonical Lab route        | Opt-in Svelte subpath     | Rate | Motion review                                  |
| ------------------- | -------------------------- | ------------------------- | ---- | ---------------------------------------------- |
| Sun ↔ Moon          | `/morph`                   | `morph/sun-moon`          | 1.0  | Owner-preferred reference; experiment          |
| Plus ↔ X            | `/morph/plus-x`            | `morph/plus-x`            | 0.4  | Continuous horizontal merge approved2026-10-27 |
| Menu ↔ X            | `/morph/menu-x`            | `morph/menu-x`            | 0.6  | Proposed horizontal-first merge                |
| Plus ↔ Minus        | `/morph/plus-minus`        | `morph/plus-minus`        | 0.6  | Proposed single fold                           |
| Maximize ↔ Minimize | `/morph/maximize-minimize` | `morph/maximize-minimize` | 0.6  | Proposed inward cubic fold                     |

Only one implementation per pair remains active. The temporary
`/morph/maximize-minimize-study` address redirects to the canonical route; its
separate component/data export is removed. The current static drafts retain their
own approval records. Migrating endpoints does not automatically approve their
artwork or the proposed motions.

### Shared design and runtime invariants

- Reach the actual source paint at progress0/1 in both styles, including semantic
  solid parts and transparent counters. Convert stroked Filled Menu marks to exact
  capsule contours for animation; do not interpret them as closed filled paths.
- Use the shared analytic critically damped spring (mass1/stiffness100/damping20).
  Keep the rates above. Reverse using current progress and velocity, without a
  reset, whole-icon fade, element replacement or unintended middle pause.
- Controlled `progress` overrides animation; clamp to0..1 and map nonfinite values
  to0. Preserve destination flags `moon`, `x`, `minus` and `minimize`, along with
  size/color/style/class/label/speed/callback behavior. No thickness control.
- Nonempty labels expose image semantics; unlabeled SVGs are decorative. Disable
  Lab autoplay and switch requested endpoints directly under reduced motion.
- Pause while hidden, resume without a time jump and clean up on unmount. Keep
  all morph code opt-in; ordinary static direct imports must load no motion runtime.
  The owner-approved unified Trash API includes only its own motion and shared controller.

### Sun ↔ Moon

Preserve the shared-circle growth and coordinated retracting rays. Recover the
circle centers/radii and native pose from the current baked cubic source anchors.
Sun has eight visible3px rays. Use C2 interpolation for body growth and ray
retraction; preserve the source crescent concavity and rotated native pose.
Use literal source body paths at both endpoints in each style, including the
filled Moon's native contour. Intermediate Filled is the evolving closed body
plus its1.5 stroke exterior; rays retain the same1.5 construction. Verify the
source/analytic near-endpoint transition as well as exact endpoints.

### Plus ↔ X — preserve approved motion

Plus folds through exactly one horizontal line at0.5, immediately opening into X.
Carry matching nonzero angular velocity and continuous acceleration through the
merge. Keep the approved0.4× pace and smooth reversal. Derive actual extents from
new source; do not substitute a smaller strict rotation. Filled is the analytical
union of the same moving centerlines at2.5 with round1.25 caps. The new endpoints
have no box or cutout. Earlier rotation-only, vertical-line, held-middle and faster
trials remain rejected. Historical motion reference: core
`e4a739a4fde20156bfe7a812f78918f06daeb75b`; its obsolete dimensions are not current
source. Endpoint migration does not authorize retuning this approved motion.

### Menu ↔ X

At0..0.5 all three bars stay horizontal, outer bars move to center and the middle
contracts to zero length/thickness. At0.5 render one horizontal stroke; at0.5..1
open opposite diagonals into X. Use C2 phase interpolation and no scheduled hold.
Interpolate projected horizontal extent from source Menu to X to avoid bulging.
Filled is the exact positive union of the moving2.5 bars. Test close neighbors of
0.5 so coincident contours never cancel. Rate0.6, reversible on the shared spring.

### Plus ↔ Minus

Keep the source horizontal arm fixed. Fold the vertical arm90° onto it with
quintic C2 interpolation, preserving source extents,1.5 Outline and2.5 Filled
union. No middle hold or style-specific translation/scaling. Keep0.6× pace.

### Maximize ↔ Minimize

Use four stable TL/TR/BR/BL cubic corner marks. Anchor their two source tips and
reverse destination traversal to align those tips. Pull the two authored cubic
runs inward with quintic C2 progress, passing through exact straight diagonal
chords at0.5, then bending into Minimize. Do not rigidly rotate corners or replace
gradual squircle curves with circular fillets.

Filled is the analytical normal offset of the moving centerline at2.5, with1.25
round caps. Fit with16 fixed subdivisions per cubic; independently sampled error
must stay below.0002 native units throughout the fold. Keep literal exported
endpoint paths and verify near-endpoint boundary continuity below.0005. Preserve
0.6× pace and smooth reversal. The previous rigid half-turn and legacy circular
elbow implementation are superseded.

### Object Motion is separate from Morph — owner clarification2026-10-29

Motion animates parts of one icon. Morph transforms between two icon identities.
The owner explicitly requires separate pages and navigation: `/motion` contains
Trash; `/morph` contains only the five authored pairs. Do not put Trash in the
Morph picker or import its renderer through a Morph page. Geometry lives in
`src/motions/trash.ts` and the adapter uses a distinct `motion/trash` export.
The spring controller may be shared internally; this does not merge the features.

### Unified Trash component API — owner decision2026-10-29

The owner selected `<Trash animate open={open} />` using the ordinary `trash`
import. Reuse the existing renderer internally; do not create a second animation.
`animate` defaults to false, preserving the legacy production Trash shape and
static stroke-width props. True selects the existing current-Figma motion at its
fixed authored thickness. Keep `animate` enabled and change `open` to reverse
without remounting; switching `animate` changes the rendering mode and source
generation. Continue supporting Outline/Filled and the existing common/motion
props. Reject `strokeWidth` in the animated TypeScript API.

The unified Trash import includes its motion renderer, geometry and controller
so SSR and the first interaction need no asynchronous fallback or extra download.
Static mode must mount none of the motion lifecycle; other per-icon imports must
exclude this runtime and geometry. The compatibility `motion/trash` export remains.
Do not change geometry, timing, approvals, Motion/Morph page separation or public
package pins as part of this API integration. Verify packed SSR/hydration, both
styles, default static parity, reversal, controlled progress, lifecycle, reduced
motion, compatibility and measured bundle isolation/size.

### Trash lid motion — proposed 2026-10-29

The owner requested an icon motion starting with Trash opening its lid and closing.
Preview `/motion` or `/motion/trash`, opt-in adapter `motion/trash`. This is object motion rather
than a transformation to a different icon. Closed references are current Figma
Trash Outline18:145 and Filled18:151 in `FIGMA_STUDY_ICONS`; static draft statuses
remain unchanged. No frame or additional static identity is introduced.

Keep the body and two slots fixed. Treat lid and handle as one rigid part, rotating
clockwise12° about the right lid terminal19.75,6.5, with no separate lift.
This rightward opening and anchored balance follow the owner’s2026-10-29 review;
the earlier centered upward/leftward tilt is superseded. Both styles share
that transform. Use the shared reversible spring at0.7×, mapping progress linearly
to the transform so retargeting retains geometric velocity. The Lab loops closed →
open → closed, with manual states, scrubbing and reduced-motion direct selection.

Filled's original union is split at its exported lid/body junctions19.1495,7.22754
and4.8497,7.22754. Keep every source curve and all three transparent counters;
the shared straight cut reveals the solid body's top edge when opened. At closure
the two positive pieces reconstitute the source silhouette. Do not use evenodd
across overlapping solid pieces. Render Filled as one nonzero-winding path with
reversed slot counters and a transformed lid subpath, avoiding an antialiased seam
where the two source pieces meet. Outline's open body remains its exact
source stroke. This deliberate revealed-rim treatment needs owner visual review.

Verify packed closed contours against the literal catalog, no discontinuity near
closure, rigid lid/handle correspondence, stationary body/slots, bounds, both
styles, actual sizes, light/dark, reversal, reduced motion and responsive controls.
The motion is proposed, pending owner review; existing approved timing is unchanged.

### Verification matrix for this migration

All five pairs × both styles × both endpoints must match the current packed Figma
catalog. Also inspect intermediate frames, actual16/20/24/48px, light/dark,
mid-flight reversal, reduced motion, narrow screens and navigation. Test the
approved PlusX merge velocity and new MaxMin fixed-tip/straight-chord behavior.
Verify no legacy frame controls or duplicate study pair remain. Static drafts and
owner edits must be preserved, with the full Core→adapter→Lab provenance recorded.

## 3. Implementation workflow

### Record the pair brief, then implement

For a new pair, add its brief to this document before or alongside implementation.
For a revision, update the existing pair section. Record:

| Brief field         | What the agent must decide or verify                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Goal and states     | What UI state changes, and what each endpoint means.                                            |
| Endpoint references | Core source files, style/frame, native pose and review status for both ends.                    |
| Part mapping        | Which contour/part becomes which; how extra parts and holes appear or disappear.                |
| Motion design       | Sequence, phase boundaries, continuity through merges, proposed rate and reverse behavior.      |
| Style relationship  | Which geometry must match exactly across styles and any justified intermediate exception.       |
| Verification plan   | Endpoint comparisons, critical intermediate frames, actual sizes, reversal and lifecycle cases. |
| Open questions      | Material uncertainty to clarify with the owner; do not label assumptions as approval.           |

A brief is required design reasoning, not a user approval form. Begin implementation
within the authorized request and ask whenever clarification would improve a
material decision. A request for a named pair should produce that pair's preview.

### Edit the correct layer

Paths below are relative to each repository; the active repositories are siblings
under workspace `repos/`. The historical workspace-root `icons/`, `packages/`
and `apps/` are not implementation targets.

| Layer                 | Files to inspect or extend                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Core source           | `src/design/figma-catalog.ts`; `src/morphs/<pair>.ts` for pure geometry and types. No framework or DOM dependencies.                           |
| Core endpoint data    | `tools/build-<pair>.ts`; register JSON generation in `tools/build.ts` and exports in `package.json`.                                           |
| Core tests            | `tests/unit/<pair>-morph.test.ts`.                                                                                                             |
| Svelte renderer       | `src/lib/morph/<Pair>Morph.svelte`; reuse `MorphProgress.svelte`.                                                                              |
| Adapter generation    | Register the opt-in pair in `tools/generate.ts`. `<pair>-geometry.*` and `<pair>-data.*` are generated; never edit them by hand.               |
| Packed consumer tests | `tests/fixture/src/routes/+page.svelte`, `tests/browser/*morph.spec.ts`, `tests/compatibility/App.svelte` and `tests/compatibility/build.mjs`. |
| Local Lab             | `src/lib/components/MorphIcon.svelte`, `src/routes/morph/+page.svelte`, and the pair route wrapper. Import the Lab adapter; no copied paths.   |
| Local Lab tests       | `tests/browser/morph.spec.ts` and pair-specific specs such as `tests/browser/menu-x-morph.spec.ts`.                                            |

Preserve stable part names and existing API behavior. Do not replace the shared
progress controller for a new pair. Choose the new pair's rate deliberately;
do not apply the approved Plus X multiplier to every animation by default.

### Promote in order

Run each command from the named repository, using the repository's supported Node
and pnpm versions. Development currently uses Node 24.19.0 and pnpm 10.10.0.
Do not publish or replace the public package as part of a Lab-only morph request.

1. In **core**, run `pnpm verify`, inspect the source diff and commit the intended
   source changes. A documentation-only edit needs the documentation checks below.
2. In **svelte**, run `pnpm sync:core ../core`, then `pnpm verify`. Commit the
   intended adapter changes, generated artifacts, lockfile and provenance together.
3. In **local Lab**, run `pnpm sync:svelte ../svelte`, then `pnpm verify`. Verify that
   `@squircle-icons/svelte` points at the new artifact and Homepage’s public package pin
   is unchanged. Compare the before/after Lab identities and review metadata.
4. Inspect the actual updated browser page and save visual evidence. If the owner
   asked to open the preview, open that route and verify that it is visible.

Sync commands require a clean committed upstream. Do not reset, discard, hide or
commit unrelated work just to satisfy that condition. If work is concurrent, use
an isolated committed checkout containing the intended source and verify its
catalog/provenance before syncing. Treat sync as exclusive use of the destination;
do not run competing syncs or edits to its owned files. A backup alone does not
prove that drafts or concurrent work are safe to overwrite.

## 4. Verification — inspect the result

Verification means checking the visual and interaction result, not only running
tests. Inspect the **actual packed adapter used by Lab**, not a separate drawing
or a development-only copy of its paths.

| Check                    | Procedure                                                                                                                         | Pass criterion                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Endpoints                | Compare progress 0/1 with the packed static components in both styles and the correct frames; use overlay/raster comparisons.     | Same contour, placement, cap, hole and pose; no independent style refit.                     |
| Intermediate shapes      | Scrub the full range and each phase boundary, with close samples on both sides and near 0/1.                                      | Finite geometry, intentional bounds/rounding, no flashes, seams, shards or accidental holes. |
| Merges                   | Inspect the exact merge frame and neighboring frames at slow speed.                                                               | Pair-specific line/part count and continuity hold; Plus X crosses 0.5 without stopping.      |
| Reversal                 | Reverse early, near a phase boundary, late and repeatedly while moving.                                                           | Retains current shape and velocity, returns to the same endpoints without a remount or jump. |
| Sizes and surfaces       | Inspect 16, 20, 24 and 48px; use enlargement only to diagnose defects. Repeat on light/dark and at a rotated pose where relevant. | Native-size readability and consistent visual weight; no defects hidden by enlargement.      |
| Controls                 | Exercise loop, click-to-reverse, manual scrubbing, 1×/0.5×, style/surface switching and pair navigation.                          | Controls reflect the current pair/state; actual-size samples match its progress.             |
| Lifecycle                | Hide/resume the tab, navigate away/unmount, remount, and change the reduced-motion preference during playback.                    | No time jump, background playback, leaked frames/listeners or unwanted autoplay.             |
| Responsive/accessibility | Check 390px and 1280px widths, keyboard controls, accessible labels and reduced motion.                                           | No overflow or inaccessible controls; requested reduced-motion states switch immediately.    |
| Preservation             | Compare static sources, Lab catalog/review metadata, public package pins and unrelated diffs.                                     | Only intended changes; every unrelated draft and user edit remains intact.                   |

Do not change a visual baseline to hide a mismatch. If a criterion fails, fix it
or clearly report the unresolved limitation. Automated success does not establish
owner visual approval. Record a new pair as proposed until explicitly accepted;
an approved pair's timing should not change incidentally during a source refit.

## 5. Tests — automated evidence

These are required behaviors to cover, not a claim that every existing pair has a
dedicated automated test for every row. Read the existing tests, reuse their packed
fixtures, and add meaningful missing coverage for the changed behavior. Label any
manual-only verification honestly.

| Area             | Required assertions                                                                                                                                                                                | Existing starting points                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Core geometry    | Exact endpoint data, invalid/out-of-range progress, deterministic finite intermediate frames, bounded contours and continuity around critical phases.                                              | `core/tests/unit/sun-moon-morph.test.ts`, `plus-x-morph.test.ts`, `menu-x-morph.test.ts`. |
| Pair geometry    | Verify its actual design contract, not just generated strings. Plus X needs one line at 0.5, nonzero continuous merge velocity and identical Outline/Filled hole geometry.                         | Core Plus X unit tests and adapter `tests/browser/plus-x-morph.spec.ts`.                  |
| Packed endpoints | Raster/vector compare both styles at both ends against actual installed static exports, selecting Square Filled for Plus/X.                                                                        | Adapter `tests/browser/*morph.spec.ts` and packed fixture.                                |
| Runtime behavior | Retarget mid-flight without resetting position/velocity or replacing the SVG; controlled progress, repeated reversal and reduced-motion changes.                                                   | Adapter morph specs and shared `MorphProgress.svelte`.                                    |
| Lifecycle        | Hidden-tab pause/resume and cleanup after unmount, including repeated mount cycles.                                                                                                                | Shared controller and packed fixture; extend coverage when changing lifecycle logic.      |
| Compatibility    | SSR/client compilation, hydration without mismatch, Svelte 5.0 through supported Svelte 5, package declarations and consumer engines.                                                              | Adapter `test:pack`, `test:compat`, compatibility fixture.                                |
| Static isolation | Ordinary static direct imports must traverse no motion runtime or unrelated geometry. Unified Trash may traverse only its own motion and shared controller, with no lifecycle work in static mode. | Adapter `test:bundle` and `test:imports`.                                                 |
| Lab integration  | Correct route/pair picker, endpoints, styles, scrubbing, reversal, reduced-motion loop policy, responsive widths and retained catalog status.                                                      | Local Lab `tests/browser/morph.spec.ts` and pair-specific specs.                          |

### Commands

For focused work, run only the relevant cases while iterating. For example:

```sh
# From repos/core
pnpm exec vitest run tests/unit/menu-x-morph.test.ts

# From repos/svelte: refresh the packed fixture before its browser tests
pnpm test:pack
pnpm exec playwright test tests/browser/menu-x-morph.spec.ts

# From repos/lab: build the route before preview-based browser tests
pnpm build
pnpm exec playwright test tests/browser/menu-x-morph.spec.ts
```

Substitute the pair's actual test file. Playwright configs cover Chromium, Firefox
and WebKit by default; a Chromium-only iteration is not the full browser check.
For shared-controller changes, include every pair's specs. For generation/API or
exports changes, include packing, compatibility and static import isolation.
Complete `pnpm verify` in each affected implementation repository before delivery;
the promotion steps above provide the full order. Repeat broader checks only when
new changes, failures or unresolved concerns justify doing so.

For **documentation-only** changes, run Prettier checks on the edited Markdown,
check relative links/anchors and referenced file paths, and verify documented
commands against each `package.json`. A documentation edit does not require
resynchronizing packages or rerunning animation/browser suites.

If the full suite has failures outside the change, inspect them and report their
scope and evidence separately. Do not claim that the full suite passed, delete
failing checks or silently waive them. Do not claim a failure was pre-existing
without baseline evidence. Include passing focused checks and remaining failures
in the delivery record.

## 6. Definition of done and handoff

Implementation is ready for owner review when the intended pair works in the Lab,
source/packed endpoints agree, the design invariants hold, the required checks
have evidence, and unrelated work is preserved. Visual acceptance is a separate
owner decision. A prototype can be delivered as pending review without asking for
an extra approval merely to complete reversible implementation work.

Record the following in the task handoff or review notes:

- Pair, preview route, supported styles/frames and the current review status.
- Design sequence, rate and any deliberate intermediate style/topology exception.
- Source commit and the adapter/Lab dependency provenance used for the review.
- Exact checks run and their results; distinguish automated, manual and unverified
  checks, and disclose any unresolved failures or limitations.
- Saved endpoint/intermediate or page screenshots and native-size observations.
- Confirmation that unrelated icons, drafts, review metadata and public dependency
  pins were preserved; note any intentional changes rather than claiming otherwise.
- Whether the requested preview was opened and visibly confirmed.

On explicit owner acceptance, update the registry and the pair's motion approval
record here. On a construction-rule change, update `DESIGN_RULES.md` and
`BOXED_ICON_RULES.md` together as required. Never turn a recommendation, successful
test run or official-looking document into an approval record.
