# Morph — shared agent playbook

Maintained: 2026-10-27. **This is the canonical working document for every morph
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
- Keep static direct imports free of the morph runtime and unrelated geometry.
- Include reproducible automated checks, visual evidence and an accurate handoff.

The Sun ↔ Moon motion is the owner's preferred visual reference. Plus ↔ X's
continuous horizontal merge is the approved timing/construction reference for
that pair. Neither preference automatically approves the design of another pair.

## 2. Design

### Shared invariants

| Concern             | Required behavior                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Artboard and weight | 24 × 24; fixed Regular 1.75. Static Thin is 1.25 and Bold is 2.50. Do not add a morph thickness control unless requested.                 |
| Endpoints           | Derive geometry from core SVGs through endpoint builders. Match the actual endpoint variant, including its frame, pose, caps and contour. |
| Source ownership    | Original artwork and intermediate geometry live in core. Svelte renders and controls progress. The local Lab provides inspection UI.      |
| Continuity          | No whole-icon opacity crossfade. Map contours/parts explicitly; avoid kinks, accidental holes, contour crossings and disconnected shards. |
| Reversal            | Retain both position and velocity when the target changes. Use the same geometry function in reverse.                                     |
| Controller          | Shared analytic critically damped spring: mass 1, stiffness 100, damping 20. Keep pair-specific rate multipliers separate.                |
| Accessibility       | A nonempty `label` exposes an image role; otherwise SVGs are decorative. The host button owns its action label and state.                 |
| Reduced motion      | Disable Lab autoplay and switch requested endpoints immediately. Controlled manual inspection remains available.                          |
| Lifecycle           | Pause while hidden, resume without a time jump, cancel scheduled frames and remove listeners on unmount.                                  |
| Isolation           | Static icon direct imports/barrels must not import morph code. Morphs remain explicit opt-in subpaths.                                    |

`progress` overrides animation and is clamped to [0, 1]; non-finite progress maps
to 0. `moon` selects the Sun Moon destination; `x` selects the Plus X and Menu X
destination. `minus` selects the Plus Minus destination. Existing components also accept `style`, `size`, `color`, `class`,
`label`, `speed`, `onprogress` and `onsettle`. Check `MorphProgress.svelte` before
changing speed limits, settling thresholds or callback behavior; existing values
are implementation constraints, not an invitation to retune approved motion.

### Pair registry and current endpoint contract

| Pair         | Lab route           | Opt-in Svelte subpath | Default shared-rate multiplier | Motion status                                          |
| ------------ | ------------------- | --------------------- | ------------------------------ | ------------------------------------------------------ |
| Sun ↔ Moon   | `/morph`            | `morph/sun-moon`      | 1.0                            | Owner-preferred reference; experiment                  |
| Plus ↔ X     | `/morph/plus-x`     | `morph/plus-x`        | 0.4                            | Continuous horizontal-merge motion approved 2026-10-27 |
| Menu ↔ X     | `/morph/menu-x`     | `morph/menu-x`        | 0.6                            | Proposed motion; awaiting owner review                 |
| Plus ↔ Minus | `/morph/plus-minus` | `morph/plus-minus`    | 0.6                            | Proposed single-fold motion; awaiting owner review     |

**Current Plus/X geometry depends on the selected native frame.** Plus/Minus/X
None uses centered half-extents 8.75: Regular visible bounds 2.375..21.625,
or 19.25 square; unboxed Filled Bold 2.50 spans 2..22, or 20 square.
Square/Circle retain half-extents 4.5: Regular visible bounds 6.625..17.375,
or 10.75 square. Square frame bounds remain 2..22 with the current exterior radius 6.
Framed Filled holes match the smaller Regular mark. Compare each endpoint with
the same selected frame; never restore the larger None glyph inside a frame.

Static endpoint approval and motion approval are separate. The frame-family
revision reopens static Plus/Minus/X review; it does not revoke or retune the
approved Plus X motion algorithm. Builders and the latest construction rules
supply current dimensions; old approved commits establish motion history only.

### Sun ↔ Moon reference

Derive the circle, eight 3px visible Sun rays and Moon circles from source. The
body grows into the crescent while the rays retract; concavity and ray phases use
C2 interpolation. Filled follows the evolving closed body and Regular exterior.
Preserve the Moon's baked native pose, including its accepted -30° source
orientation. Regenerate endpoint data after a source revision instead of copying
new paths into the adapter or local app.

### Plus ↔ X approved motion

Fold Plus through exactly one horizontal line at progress 0.5, then immediately
open into X. There is no hold and no easing to a stop at the merge. Carry nonzero
matching angular velocity and continuous acceleration through that point. Keep
its 0.4× default rate and smooth reversal. Extend the arms as needed to reach the
current source X rather than a smaller strict rotation of Plus.

The Filled Square frame stays upright. Its hole is the exact analytical union of
the same moving Outline strokes, including overlapping round end caps. No
style-specific glyph translation or scaling is allowed.

Historical motion reference: core `e4a739a4fde20156bfe7a812f78918f06daeb75b`,
Svelte `190b84b49ea2e058fc99d358298a392c0271eaee`. Later source-derived weight and
frame-family refits supersede those commits' static dimensions. Simple rotating
crosses, vertical merges, faster default pacing and a held midpoint were rejected.

### Menu ↔ X proposal

Outline maps the outer Menu bars onto the X diagonals. Move them inward and open
into X while the middle bar contracts to zero length and thickness. Keep round
ends, continuous movement and exact current source endpoints.

Filled uses the same selected None/Square/Circle variant at both ends. None is
the positive unboxed Bold mark. Square/Circle keep the source frame upright and
cut out the exact union of the moving bars. Menu's source cutout is Bold2.50,
which interpolates to X's Regular1.75 cutout in framed variants; None stays2.50.
The previous unboxed-to-box topology bridge is superseded. See the complete frame
family rule below. Keep the existing0.6× rate and Outline motion for review.

### Plus ↔ Minus proposal

Goal: expand/collapse or add/remove state, with Plus and Minus from current core
sources. `icons/plus.svg` and `icons/minus.svg` share the horizontal centerline
from 7.5,12 to 16.5,12. Both endpoint drawings are pending static family review;
this new motion is also pending review. Filled uses their Square frame sources.

Keep the horizontal arm fixed. Fold the vertical arm through 90° onto that same
line, preserving its length, Regular1.75 weight and round ends. Quintic C2 phase
interpolation settles smoothly at both endpoints without a middle hold. Reverse
along the same geometry using the shared spring. The proposed rate is0.6×; keep
Sun Moon and approved Plus X rates unchanged. Filled retains the current source
Square at2..22 and cuts out the exact analytical union of the same two strokes.

The pure capsule-union helper is shared with Plus X; extracting it must preserve
Plus X frames exactly. Compare packed Plus/Minus endpoints in both styles, check
near-parallel overlapping caps and native16/20/24/48px samples, test reversal,
reduced motion and pair navigation in all three engines. Menu X retains its
existing design and rate; reverify its current Menu and Square Filled X sources
alongside this pair. No unresolved endpoint identity or timing decision blocks
this proposal; both pairs remain available for owner visual review.

### Complete matching frame families — owner correction, 2026-10-27

Frames are opt-in per icon: add them only when the owner asks for that identity.
A morph request does not authorize adding frames to every icon or inventing missing
variants. Read supported frame capabilities from both actual endpoint sources.
New Tab, Maximize and External Link have no added frames under the current owner
correction. Where a pair's supported families differ, clarify the intended shared
variant rather than silently changing static artwork.

If a morph endpoint supports frames, implement and verify every supported common
frame for the whole pair. Menu ↔ X, Plus ↔ X and Plus ↔ Minus must all provide
None, Square and Circle. A single selected frame applies to both endpoints, the
intermediate Filled geometry, static comparison buttons and actual-size samples.
Never pair an unframed Filled source with a framed target, silently fall back to
another frame, or declare the pair complete after testing only Square. Builders
reject missing or mismatched frame data. Read both exterior and Outline frame
paths from source; never hardcode a previous corner radius in runtime or comparison
masks. Current Square exterior radius is 6, with Regular centerline radius 5.125;
Circle remains radius 10. A corner-only revision regenerates all existing framed
morphs without changing native marks or motion. The frame exterior stays upright and
unchanged throughout a framed transition. Default Square preserves existing
math-morph presentation; switching frame does not retune progress or motion.

None Filled follows the unboxed Bold2.50 source at both ends. Square/Circle use
their actual source cutouts: Menu is Bold2.50 and X/Plus/Minus are Regular1.75.
Menu X interpolates that source-derived cutout width while retaining the existing
Outline part mapping, progress phases and0.6× pace. Its former solid-to-box
topology bridge is superseded: framed Menu starts in the same frame as X.
Outline uses Regular1.75 and supports every matching frame too; it defaults to None, while Filled defaults to Square. Existing Plus X merge/timing and Plus Minus
fold/timing remain unchanged.

Native mark geometry is selected per frame. The owner's later 2026-10-27
correction makes None deliberately larger than Square/Circle; derive its
centerlines, extents and exact endpoints from the standalone source, and derive
framed marks from the selected frame's glyph source. Never reuse None dimensions
inside a frame or simulate the difference with Lab-only scaling. The same selected
variant must drive Outline, Filled, intermediate geometry and every preview.
Source-size updates regenerate all three pairs without changing their approved
angular sequence or rate. Verify near-endpoint continuity as well as exact endpoint
paths, and keep a regression proving that changing None leaves framed motion intact.

Required regression matrix: three pairs × three frame choices × both endpoints,
plus intermediate contour/negative-space checks, reversal and reduced motion in
all three browser engines. Update the packed component fixture and the actual
Lab; a static source check alone does not verify the rendered frame selection.

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
| Core source           | `icons/`; `src/morphs/<pair>.ts` for pure geometry and types. No framework or DOM dependencies.                                                |
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

| Area             | Required assertions                                                                                                                                                        | Existing starting points                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Core geometry    | Exact endpoint data, invalid/out-of-range progress, deterministic finite intermediate frames, bounded contours and continuity around critical phases.                      | `core/tests/unit/sun-moon-morph.test.ts`, `plus-x-morph.test.ts`, `menu-x-morph.test.ts`. |
| Pair geometry    | Verify its actual design contract, not just generated strings. Plus X needs one line at 0.5, nonzero continuous merge velocity and identical Outline/Filled hole geometry. | Core Plus X unit tests and adapter `tests/browser/plus-x-morph.spec.ts`.                  |
| Packed endpoints | Raster/vector compare both styles at both ends against actual installed static exports, selecting Square Filled for Plus/X.                                                | Adapter `tests/browser/*morph.spec.ts` and packed fixture.                                |
| Runtime behavior | Retarget mid-flight without resetting position/velocity or replacing the SVG; controlled progress, repeated reversal and reduced-motion changes.                           | Adapter morph specs and shared `MorphProgress.svelte`.                                    |
| Lifecycle        | Hidden-tab pause/resume and cleanup after unmount, including repeated mount cycles.                                                                                        | Shared controller and packed fixture; extend coverage when changing lifecycle logic.      |
| Compatibility    | SSR/client compilation, hydration without mismatch, Svelte 5.0 through supported Svelte 5, package declarations and consumer engines.                                      | Adapter `test:pack`, `test:compat`, compatibility fixture.                                |
| Static isolation | Static direct imports must traverse no morph runtime or unrelated geometry, before and after tree shaking.                                                                 | Adapter `test:bundle` and `test:imports`.                                                 |
| Lab integration  | Correct route/pair picker, endpoints, styles, scrubbing, reversal, reduced-motion loop policy, responsive widths and retained catalog status.                              | Local Lab `tests/browser/morph.spec.ts` and pair-specific specs.                          |

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
