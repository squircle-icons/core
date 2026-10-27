# Icon — Shared Agent Playbook

Maintained: 2026-10-27. **This is the canonical English working document for icon creation and revision across this workspace.** It defines the goal, rules, design contract, workflow, verification, tests and completion criteria. Read it before making icon changes. Update the current sections when the owner changes a rule; do not maintain competing copies in agent entry points.

## Start here

1. Read this playbook and the applicable `AGENTS.md` and `CONTRIBUTING.md` files.
2. Inspect the user's request and the working state of the three source repositories and standalone local app. Preserve unrelated work.
3. Identify the icon family, required styles/frames, current source geometry and approval status.
4. Use the workflow in section 4, the verification criteria in section 5 and the test plan in section 6.
5. Deliver a working, checked Lab result and the evidence in section 7. Do not stop at a plan when implementation is requested.

A named icon request authorizes its necessary implementation and preview. Choose routine details within the established rules. Ask when an unresolved choice would materially change identity, scope, geometry, styles, frames or an accepted result; continue independent work while waiting. A brief or checklist records decisions and is not a mandatory approval checkpoint.

Apply current user instructions within the applicable higher-priority instructions. This document records the current icon contract; older dated trials in supporting documents are history, not alternative specifications. If the request, this guide and the source disagree materially, identify the conflict and resolve it before making dependent changes. Do not silently restore an older design.

### Quick task map

| Request                                           | Start with                                                   | Required result                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| New icon or ordinary add-icons batch              | Family/reference selection, Outline source, Filled treatment | Original SVG/metadata, requested variants, packed exports and Lab preview                        |
| Size, rounding, spacing or orientation correction | Existing source and acceptance record                        | Revised native geometry; corresponding styles remain aligned; affected checks updated            |
| Frame or style extension                          | Shared glyph, frame geometry and style semantics             | One identity with supported variants, consistent API, Lab controls and variant checks            |
| Adapter/API change                                | Core contract and generator                                  | Deterministic outputs, direct-import isolation, compatibility and consumer checks                |
| Lab-only change                                   | Current packed Lab dependency                                | Correct controls, measurements, accessible interaction and responsive preview                    |
| Morph                                             | [Core MORPH.md](MORPH.md)                                    | Follow that canonical motion playbook in addition to these static rules                          |
| Documentation-only change                         | Current rules, source and package scripts                    | Clear current instructions, valid links/commands and consistent entry points; no artwork changes |

## 1. Goal

Create original, recognizable icons that form one coherent visual family and remain readable at actual UI sizes. A completed implementation must:

- Use consistent rounded construction and deliberate optical proportions.
- Keep the correct geometric relationship between Outline, Bold, Filled and frames; matching bounding boxes alone is insufficient.
- Preserve accepted artwork and motion outside the requested revision.
- Keep core framework-independent, static imports lightweight and morphs opt-in.
- Reach the real Lab through traceable core → Svelte → local Lab promotion, preserving every draft and the separate public package pin.
- Include reproducible checks and visual evidence, with implementation completion separate from owner approval.

A request is complete when its intended working result is delivered and verified. **Visual approval is a separate owner decision.** Do not mark a drawing approved merely because implementation or tests are complete.

## 2. Rules and ownership

### 2.1 Edit the correct layer

| Location         | Owns                                                                                                       | Do not put here                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `repos/core`     | Original SVGs, construction metadata, frame sources, shared types and framework-independent morph geometry | Framework components, Lab-only geometry corrections                 |
| `repos/svelte`   | Generator, presentation props, accessibility, packed consumers and component tests                         | Hand-edited generated icon paths or independent replacement artwork |
| `repos/lab`      | Independent private local app: review workbench, measurements, controls and morph previews                 | Copied artwork or imports from Homepage                             |
| `repos/homepage` | Public website and gallery, using the published adapter                                                    | Review routes, draft packages or development Lab dependencies       |

The root `icons/`, `packages/` and `apps/` folders are historical snapshots. **Do not edit them for active icon work.** Original SVGs and metadata are authoritative artwork sources; generated catalogs and components are outputs.

Inspect `git status --short` in each source repository before edits; the local app has no Git repository. Preserve unrelated changes and review records. Do not reset, discard or overwrite another chat's work to make a sync command pass. When sync requires a clean source, use an exact committed source snapshot and retain its provenance.

### 2.2 Scope and batching

An ordinary request to add icons means **six total**. Named icons occupy places in that six; choose the remainder automatically. Do not ask the owner to fill the remaining places.

Explicit family extensions and construction revisions follow their requested scope. Adding frames does not create another six-icon batch. The Plus/Minus/X family revision adds Minus to the existing symbols; it does not authorize unrelated additions. Styles and frames are variants of an identity, not duplicate sidebar icons.

### 2.3 Preserve contracts

- Author original geometry and keep metadata authorship accurate.
- Use stable kebab-case icon names and stable `data-part` names. Preserve existing public names unless a rename is requested.
- Keep direct Svelte imports independent of barrels, catalogs, unrelated icon geometry and animation runtime.
- Keep the published public package and the development Lab package separate. A Lab update must retain draft icons and must not silently replace the public dependency.
- New/revised drawings remain `draft` until explicitly accepted. Preserve approval history and reopen the affected review when construction changes.
- Do not publish a package or deploy a website unless requested. A local Lab preview is the normal review deliverable.

### 2.4 Standalone local review app

`repos/lab` is a private local app, not a new Git/GitHub repository. It owns its package manifest, lockfile, packed review artifact, catalog generation, dev server, production build and tests. Its runtime, check and build must work without Homepage or sibling source checkouts. Only an explicit package-sync operation needs the Svelte source checkout.

The canonical icon rules are this file in Core. Local-app agents read `../core/ICON_RULES.md`; no copied rule body is maintained in the app. The root workspace file is an entry link. Homepage must have no review routes, preview helpers, development icon dependency, review-specific tests or sync tools. Its public package pin remains independent.

Core → Svelte → local Lab is the icon-development path. Updating the published website is a separate task, using a released package.

## 3. Design contract

Use the following current rules to design the source. Family exceptions are intentional; do not apply one family's Filled construction or margin rule to every other icon.

### 3.1 Artboard, weight and shape

Use a native **24 × 24** artboard, centered at **12,12**. Native SVG units correspond to pixels when rendered at 24px.

| Weight              | Stroke width |
| ------------------- | -----------: |
| Thin                |         1.25 |
| Regular / default   |         1.75 |
| Bold                |         2.50 |
| Lab adjustment step |         0.25 |

- Use round line caps and round line joins. A round cap's radius is half its stroke width.
- Keep artwork monochrome and inherit `currentColor`.
- Preserve meaningful straight edges, circles, openings and proportions. Do not curve interior details just to make them softer.
- Avoid doubled shared edges, uneven joins and accidental dark intersections. Union overlapping Filled contours where necessary.
- Inspect actual 16, 20, 24 and 48px output on both light and dark surfaces.

The Camera/Folder main bodies are the object-corner reference. The original centerline-radius reference was 3.25 at Regular 1.70; current sources include the subsequent 1.75 weight refit. Reuse the current source construction instead of copying historical coordinates blindly. Small tabs, shoulders and handles retain their fitted local radii. Enclosing Square frames use a separate exterior radius of 4.

### 3.2 Margins and optical size

Measure the **visible edge**, including stroke and rounded caps, rather than only the centerline bounds.

- Use **2px on the primary opposing edge pair** when an icon is fitted to that pair.
- Camera and Folder use left/right, retaining their horizontal proportions. Another object may use top/bottom. The remaining pair may have larger margins.
- Naturally filled objects use their own silhouette; do not add an unnecessary box.
- Square/Circle frame exteriors have 2px on all four sides.
- **None is deliberately larger than Square/Circle.** Author larger native standalone geometry while preserving the existing compact framed glyphs. Fit the primary visible extent to20px at the family reference weight: Regular1.75 for directional/natural geometry and Bold2.50 for Bold-style Filled marks. The latter therefore has19.25px Regular Outline extent (2.375px primary margins). Arrow diagonals retain the same physical axial size, rather than being independently fitted to both artboard axes.
- Keep opposite margins balanced and preserve the native source proportions.
- Bake an accepted orientation or proportion change into the source when requested; Lab X/Y should return to 100/100 and rotation to 0 for that new native baseline.

Directional geometry must retain the same physical construction. Rotate and, where needed, recenter it. Do not independently scale diagonal variants to touch the artboard edges.

### 3.3 Styles

#### Outline

Outline uses the original centerlines, configurable stroke width, and Regular 1.75 by default.

#### Bold

Plus, Minus and X have an explicit **Bold** style in Lab. It uses the same centerlines at fixed 2.50 and is unboxed. The Svelte `style="bold"` rendering uses that fixed weight; a supplied frame is ignored for this style.

#### Filled

Filled is authored fill-only geometry. It is not the result of indiscriminately filling every Outline path.

| Family                                 | Current Filled treatment                                               |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Camera, Folder and other solid objects | Natural solid silhouette with intentional counters and openings        |
| Menu (no frame) and Search             | Unboxed Bold 2.50 expansion of the shared centerlines                  |
| Menu, Square/Circle                    | Solid frame with its compact Bold 2.50 glyph silhouette cut out        |
| Plus, Minus and X, `frame="none"`      | Unboxed Bold 2.50, matching the explicit Bold style                    |
| Plus, Minus and X, Square/Circle       | Solid frame with the exact Regular 1.75 symbol cut out                 |
| Arrow and Chevron, no frame            | Solid rounded triangular head; preserve the shared source construction |
| Arrow and Chevron, Square/Circle       | Solid frame with its compact Filled glyph silhouette cut out           |
| Check, no frame                        | Unboxed Bold 2.50 expansion of the shared check centerline             |
| Check, Square/Circle                   | Solid frame with its compact Bold silhouette cut out                   |

For natural dual-style objects, match the Filled exterior to the visible Regular Outline exterior. For Menu/Search, Check, alignment bars and unframed math symbols, compare Filled to **Bold 2.50**, not Regular. For boxed math marks, compare the hole to the corresponding Regular mark. Framed Menu, Check, alignment bars and Maximize use the compact framed glyph expanded at Bold as their cutouts. Directional families likewise use their compact framed solid-head geometry. Compare within the selected frame variant; the larger None silhouette is a separate source.

Keep the compact glyph identical between Square and Circle. None uses its separately authored larger geometry. Never enlarge a Filled path by scaling its stroke, and never simulate this size distinction with Lab-only transforms. This owner correction supersedes older same-size-None/frame instructions in historical metadata and supporting notes.

### 3.4 Frame construction

Supported frame choices are `none`, `square` and `circle` on the existing icon identity. Frames do not create duplicate sidebar identities.

| Measurement                  | Square                                    | Circle                     |
| ---------------------------- | ----------------------------------------- | -------------------------- |
| Filled exterior              | Bounds 2..22, corner radius 4             | Center 12,12, radius 10    |
| Outline centerline           | Bounds 2.875..21.125, corner radius 3.125 | Center 12,12, radius 9.125 |
| Default frame stroke         | 1.75                                      | 1.75                       |
| Default visible outer margin | 2 on all sides                            | 2 on all sides             |

The Square stays upright when a directional glyph rotates. Cutouts must be transparent negative space, not white-painted shapes. Preserve exact unions at intersections and correct fill rules.

Check glyph-to-frame clearance at Regular and Bold, especially near Circle borders and diagonal endpoints. The outer 2px margin is the default Regular measurement; changing the Outline stroke changes its visible exterior normally.

### 3.5 Current family geometry

#### Arrow

Eight directions × three frame choices = **24 variants**, each with Outline/Filled. None and framed versions have distinct native size references:

| Reference           | Shaft | Head half-span | Visible axial length |   Cardinal primary margin |
| ------------------- | ----: | -------------: | -------------------: | ------------------------: |
| None                | 18.25 |        6.84375 |                   20 |                         2 |
| Square/Circle glyph | 12.25 |        4.59375 |                   14 | 5 before adding the frame |

Use Regular1.75 and identical arm proportions within each size reference. Rotate one reference about12,12 for all eight directions; do not scale diagonals independently. None diagonal visible X/Y margins are4.67265062; the smaller framed glyph remains unchanged. Rebuild Filled at fixed radius0.875, analytically uniting the shaft and solid rounded head.

#### Single and Double Chevron

Single and Double Chevron each have four cardinal directions only, with no diagonal exports. Four Single + four Double identities × three frames = **24 variants**, each with Outline/Filled. Double names remain `chevrons-up/down/left/right`.

- Compact framed Single Up vertices remain `(6.5,14.75) → (12,9.25) → (17.5,14.75)`. None uses local vertices `(-9.125,4.5625) → (0,-4.5625) → (9.125,4.5625)` before centering/rotation, giving20px visible primary width at Regular1.75.
- Compact framed Double keeps local vertices `(-4,2) → (0,-2) → (4,2)` with centers−2.875/+2.875. Its visible size is9.75×11.50 for Up/Down.
- Larger None Double uses local vertices `(-8.25,4.125) → (0,-4.125) → (8.25,4.125)` with centers−5/+5 along its axis. Its visible primary extent is20px, and the expanded Filled heads still touch exactly at the center with zero gap or overlap. This separately solved construction preserves contact; a uniform scale of the previous Filled path would be wrong.
- Keep stroke/cap radius fixed at Regular1.75/0.875 in every source. Square/Circle glyph geometry stays unchanged; rotate the appropriate None or compact reference rigidly for direction changes.

#### Opposed Chevron and Chevron Line

These six identities are `chevron-up-down`, `chevron-left-right` and `chevron-line-up/down/left/right`. Up–Down combines two outward-facing heads; Left–Right is its quarter-turn. Line adds a separate stop line ahead of the V tip.

Compact framed Up–Down vertices remain `(8,10.5) → (12,6.5) → (16,10.5)` and `(16,13.5) → (12,17.5) → (8,13.5)`. Its None centerlines scale uniformly by73/44 about12,12, keeping Regular1.75 fixed and giving20px visible primary extent. Compact Line Up keeps `(8,15.5) → (12,11.5) → (16,15.5)` with stop line `(8,8.5) → (16,8.5)`; its larger None centerlines scale by73/32, giving20px primary width and17.71875px height. Other directions are rigid rotations.

Filled closes and expands each triangle at radius0.875 and adds a matching fixed-radius capsule where needed. None gaps grow with its centerline proportions; compact framed gaps remain1.25px at Regular and0.5px at Bold. Frame Filled uses the unchanged compact silhouette as its cutout. All revised None drawings and existing draft frames remain pending owner review.

#### Plus / Minus / X

These retain three styles: Outline / Bold / Filled. None Filled equals unboxed Bold2.50. Larger None centerlines use extent8.75 about12,12: Plus `M3.25 12 H20.75 M12 3.25 V20.75`, Minus the horizontal segment, and X the two diagonals between3.25 and20.75. None Bold/Filled visible bounds are2..22; Regular Outline primary margins are2.375.

Square/Circle keep their original compact centerline extent4.5: Plus `M7.5 12 H16.5 M12 7.5 V16.5`, Minus the horizontal segment, and X the two diagonals between7.5 and16.5. Framed Filled uses the compact Regular1.75 cutout. Bold remains explicitly unboxed and ignores frame selection. Do not substitute the larger None mark into a frame.

#### Check

Check supports Outline/Filled and all three frame choices. Larger None vertices are `(3.25,12.67307692) → (8.63461539,18.05769231) → (20.75,5.94230769)`. Compact Square/Circle vertices remain `(7,12.38461538) → (10.07692308,15.46153846) → (17,8.53846154)`. Both preserve the original4:9 arm ratio and45-degree slopes.

Regular Outline is1.75. None Filled is the exact larger Bold2.50 expansion; framed Filled cuts out the compact Bold mark. Use one analytical union contour with radius1.25 caps/outer join and an intersected inner offset corner, never overlapping evenodd capsules. None Filled has20px primary width; compact frame geometry stays unchanged. The earlier standalone boxed Filled is superseded. Preserve prior approval history and keep the revised drawing draft.

#### Corner and entry/exit controls

`corner-up-right`, `log-in` and `log-out` retain Outline/Filled and all frames. Their compact framed references remain unchanged:

- Corner uses `M8 16.75 V13.75 A3 3 0 0 1 11 10.75 H16`, with head `(12.5,7.25) → (16,10.75) → (12.5,14.25)`. None centerlines uniformly scale by18.25/9.5 about12,12, keeping1.75 stroke and rebuilding Filled with0.875 expansion. Its visible top/bottom are2..22; left/right are3.44078947..20.55921053.
- Entry/Exit compact rounded C doors occupy y7.5..16.5 with radius1.5. Entry bounds x12.5..16.5 open left; Exit mirrors the door to x7.5..11.5 and opens right. Both arrows point right. Entry shaft x7.5..12.5 has head base x9.5; Exit shaft x11.5..16.5 has head base x13.5; both heads use y9/15. None scales centerlines by18.25/9 about12,12 and rebuilds the natural Filled doorway/solid-head union at0.875, yielding Regular visible bounds2..22. Never reverse the exit arrow merely because its doorway is mirrored.

#### Alignment and Maximize

These use unboxed Bold2.50 Filled, with compact Bold cutouts in Square/Circle. Every larger None reference has20px primary extent at Bold and19.25px at Regular. Keep all existing framed geometry unchanged.

- Alignment None rows are y3.25,9.08333333,14.91666667,20.75. Long bars span x3.25..20.75; short bars are11.66666667 units with their Left/Center/Right anchors preserved. Compact rows remain y7.5,10.5,13.5,16.5, with long9-unit bars x7.5..16.5 and short6-unit bars x7.5..13.5 / x9..15 / x10.5..16.5 respectively.
- Maximize None corners occupy3.25..20.75 with arm length5.46875. Compact references remain the four rigid quarter-turns of `M8 10.5 V8 H10.5` within8..16. Rebuild each rounded Filled corner at radius1.25; do not scale the compact Filled contour.

#### More controls

Compact `more-horizontal/vertical` references remain three centers7.5/12/16.5 along their axis, Outline circle radius1 and natural Filled radius1.875. Larger None scales the centers/circle centerlines by73/44: centers12±7.46590909, Outline radius1.65909091 and Filled radius2.53409091. Stroke stays1.75; Filled is a freshly rebuilt visible exterior, not Bold. None primary bounds are2..22 and perpendicular visible size5.06818182. Frames retain their exact compact three-dot cutouts.

#### Copy and New Window

Copy places its foreground sheet bottom-left and background sheet top-right, by a baked horizontal reflection about x12. Every endpoint/control point maps x→24−x, elliptical-axis rotations negate and arc sweep flags reverse. Preserve original object roundness, rear-junction breaks, exposed parallel-border spacing and combined Regular visible bounds2..22. Filled is the natural silhouette with a solid foreground sheet.

`new-window` preserves both former Copy SVG files byte-for-byte, with foreground bottom-right and background top-left. Neither identity has additional Square/Circle variants, so this None-versus-frame enlargement does not resize them. New Window does not inherit Copy approval; revised Copy keeps previous approval in history. Both remain drafts.

#### New Tab and External Link

These keep the compact framed glyphs unchanged and author larger None glyphs at fixed Regular1.75.

- Compact New Tab uses window centerline bounds7..17/radius2.25 and centered plus half-extent1.75. Larger None scales centerlines by1.825 about12,12: window centerline radius4.10625, Filled exterior radius4.98125, plus half-extent3.19375. Natural Filled is a solid window with the Regular1.75 plus cut out, yielding visible bounds2..22. Framed Filled uses the unchanged compact window/plus silhouette.
- Compact External Link keeps the open window bounds7.5..16.5/radius1.5, top arm ending10,7.5 and right arm ending16.5,14. Shaft is11.5,12.5→16.5,7.5, with head `(13,7.5) → (16.5,7.5) → (16.5,11)`. None scales centerlines by18.25/9 and rebuilds the natural window plus united solid-head arrow at0.875, yielding Regular visible bounds2..22. Framed separation and clearance remain unchanged.

#### Menu and Trash

Menu larger None centerlines span x3.25..20.75 at y5,12,19. Filled is exact Bold2.50, with visible width20 and height16.5. Compact Square/Circle bars stay x7..17 at y8,12,16; their Filled cutouts use that compact Bold silhouette. Never reuse the enlarged None paths inside a frame.

Trash has no new enclosing frames and keeps its baked105/95 proportions, body, lid and handle. Short internal slots remain x9.9/14.1, y11.1..15.75 at1.75 weight with matching radius0.875 Filled capsules. These earlier slot revisions are unchanged by the None/frame sizing correction.

### 3.6 Authored morphs

Morphs are deliberately designed pairs, not arbitrary icon interpolation. Preserve accepted motion independently from static drawing approval.

- **Sun ↔ Moon:** preferred reference for continuous shape change and smooth reversal. Derive current endpoints from the source icons, including the 3px Sun rays and Moon's baked orientation.
- **Plus ↔ X:** merge into one horizontal line at progress 0.5 and immediately open into X. No midpoint hold or easing to a stop. Preserve matching nonzero angular velocity and continuous acceleration through the merge. Keep the approved 0.4× shared spring pace.
- **Menu ↔ X:** separately authored topology bridge; it remains a proposal until explicitly approved.
- Retarget from the current position and velocity; do not restart the SVG from an endpoint.
- Respect reduced motion. Keep morph imports separate from static icon imports.
- Morph endpoint builders must resolve the exact selected frame source. None uses its newly enlarged native geometry; Square/Circle keep their compact references. Regenerate each frame’s endpoint/intermediate geometry and compare packed endpoints against the corresponding static export. Do not feed enlarged None paths into every frame or change approved timing to hide a mismatch.

### 3.7 Source SVG and metadata contract

The current core parser supports `svg`, named `g` groups, `path` and `circle`. Convert other drawing primitives to supported paths rather than exporting an arbitrary editor document. Use the existing validator; do not bypass it to import unsupported artwork.

- The root namespace is `http://www.w3.org/2000/svg` and `viewBox` is exactly `0 0 24 24`.
- Outline uses root `fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"`, round caps and joins, with no fill rule.
- Filled uses root `fill="currentColor"`, `stroke="none"` and `fill-rule="evenodd"`, with no stroke width.
- Put artwork under uniquely named groups such as `data-part="body"`, `lens` or `lid`. Paths contain finite SVG geometry; circles use finite `cx`, `cy` and positive `r`.
- Source SVGs do not contain size props, transforms, CSS, IDs, scripts, external references, XML declarations or editor metadata. Bake native transforms into geometry. The adapter owns rendered size and accessible attributes.
- Bold is rendered from the shared Outline centerlines at fixed 2.50; there is no separate `icons/bold/` source directory in the current pipeline. Its advertised availability comes from metadata.
- Filled is fixed authored geometry except the existing Folder divider, whose bounded adjustable gap is derived from its source metadata. Do not make other Filled counters adjustable implicitly.

Illustrative source structure using the unframed Minus family:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <g data-part="body"><path d="M3.25 12 H20.75"/></g>
</svg>
```

Its unframed Filled treatment is the same centerline expanded at Bold 2.50:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" fill-rule="evenodd">
  <g data-part="body"><path d="M3.25 10.75 H20.75 A1.25 1.25 0 0 1 20.75 13.25 H3.25 A1.25 1.25 0 0 1 3.25 10.75 Z"/></g>
</svg>
```

The adjacent JSON file must describe the actual drawing and design decision, not copied approval claims. For example:

```json
{
  "name": "minus",
  "description": "A rounded minus symbol.",
  "tags": ["minus", "remove", "math"],
  "authorship": "Original geometry constructed for this project; no third-party icon paths used.",
  "construction": "Centered at12,12. Larger None horizontal centerline spans3.25..20.75 and Filled matches Bold2.50. Square/Circle retain the compact7.5..16.5 reference with a Regular1.75 cutout. Native variants preserve fixed stroke weights without runtime scaling.",
  "filledTreatment": "bold-stroke",
  "supportsBold": true,
  "review": { "status": "draft" }
}
```

Use the real icon name and construction values. Keep the corresponding Filled and frame metadata synchronized. Omit optional treatments/capabilities that do not apply. Production geometry remains in the core SVG files; these examples explain the authoring contract.

## 4. Implementation workflow

Follow this sequence for implementation work. Each step produces a concrete result that the next step consumes. Apply only steps relevant to the request: a documentation-only change does not require authoring artwork, repinning packages or rebuilding Lab.

### Step 1 — Establish the baseline

- Read the current request, this guide and relevant source/test files. Paths beginning with `repos/` in this guide are relative to the workspace root. For artwork, also read the core construction references in section 9 and the repository's contribution instructions.
- Inspect the source repository states and local app, current dependency/provenance files and the affected icon's review metadata.
- View the current Lab and source at native proportions. Identify what is accepted, what is being revised and what remains outside scope.
- Use the configured package manager and runtime from repository manifests. Do not update unrelated dependencies to perform an icon change.

### Step 2 — Record the design decision

Before drawing, establish this small brief in the work notes or construction metadata:

```text
Identity / family:
Requested change and preserved references:
Required styles and frames:
Native center, primary margin pair and intended visible bounds:
Filled treatment and its comparison reference:
Shared geometry, optical exception or direction mapping:
Affected exports, Lab controls and morph endpoints:
Verification and test plan:
Review status:
```

Use the established family rules for routine choices. If a missing decision materially affects the result, ask the owner while progressing work that does not depend on the answer.

### Step 3 — Author in core

Use these source locations:

```text
repos/core/icons/<name>.svg
repos/core/icons/<name>.json
repos/core/icons/filled/<name>.svg
repos/core/icons/filled/<name>.json
repos/core/icons/frames/{square,circle}/<name>.svg
repos/core/icons/frames/{square,circle}/<name>.json
repos/core/icons/frames/{square,circle}/filled/<name>.svg
repos/core/icons/frames/{square,circle}/filled/<name>.json
```

1. Establish the Outline centerlines and native placement first.
2. Measure the visible Regular exterior, including caps and joins. Fit the correct primary margin pair without distorting the silhouette.
3. Derive the corresponding Filled exterior or cutout using the treatment in section 3.3. Construct exact unions at intersections; preserve counters and openings.
4. Author the larger None glyph and preserve the compact shared Square/Circle glyphs as separate native variants. Keep Square upright, rebuild Filled at fixed family weight for each size, and verify compact Circle clearance.
5. Write/update metadata: name, description, tags, authorship, construction, parts and review status. Use `filledTreatment` consistently (`bold-stroke`, `boxed-cutout`, `solid-head` where applicable). The current math family uses `supportsBold: true`.
6. Update meaningful source/geometry checks when behavior changes. If a static endpoint changes, inspect its morph endpoint builder and regenerate the affected data; preserve accepted timing and unrelated pairs.
7. Run core checks and commit the intended source changes before adapter synchronization.

### Step 4 — Generate and verify the adapter

From `repos/svelte`:

```sh
pnpm sync:core ../core
pnpm verify
```

Inspect the generated exports, catalog styles/frames and actual packed consumer. Update the generator or props for new capabilities; never patch generated SVG paths manually. Commit the adapter changes, generated files, packed core artifact, lockfile and provenance together.

### Step 5 — Promote to Lab

From `repos/lab`:

```sh
pnpm sync:svelte ../svelte
pnpm verify
```

Run the local app sync from `repos/lab`, not the website. It updates only the app’s packed review dependency. Homepage remains a separate published-package consumer. The local app has no Git repository and must not be published or pushed.

Open the standalone local app at its `/` route, select the affected icon and exercise its styles/frames. Confirm that it uses the new packed dependency; a successful build alone does not prove the open browser refreshed. Save visual evidence after checking the result.

### Step 6 — Close the loop

Perform the verification in section 5, finish the tests in section 6, update this guide if the owner changed a rule, and deliver the handoff in section 7. Do not stop after editing SVGs when the request requires a usable Lab result.

## 5. Verification — inspect the result

Verification checks whether the requested visual/product result is correct. Automated tests in section 6 support these checks; they do not replace visual inspection.

| Check                   | Method                                                                        | Pass criterion                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Identity and silhouette | Compare with the chosen family/reference at 16/20/24/48px                     | Recognizable, balanced and consistent; defining features survive at small sizes                              |
| Native placement        | Measure at 24×24, X/Y 100/100, rotation 0, Regular 1.75                       | Correct center and primary margin pair; opposite margins balanced                                            |
| Visible bounds          | Include half-stroke, caps and joins in measurements                           | Specified dimensions/margins match the current family; no hidden clipping                                    |
| Contour relationship    | Overlay/vector-sample or compare raster masks from actual packed exports      | Objects match Regular exterior; Bold Filled matches 2.50; frame holes match their specified glyph            |
| Frame consistency       | Toggle None/Square/Circle at equal scale and pose                             | Square/Circle share the compact glyph; None is natively larger; fixed stroke and correct per-frame treatment |
| Frame clearance         | Inspect nearest glyph/border points at Regular and Bold                       | Positive clearance except a deliberately requested contact; default frame exterior has 2px margins           |
| Directional consistency | Compare the source reference under rigid rotations                            | Same physical construction; no independently enlarged diagonal directions; Square stays upright              |
| Rounding and overlaps   | Inspect caps, joins, corners and intersections at enlarged and actual sizes   | Smooth, intentional contours; no doubled edges, seams, accidental holes or unequal stroke weight             |
| Lab behavior            | Switch icon/style/frame, edit/reset X/Y and rotation, inspect optical samples | Correct supported options, preserved independent drafts, accurate measurements and native defaults           |
| Accessibility/layout    | Keyboard controls, accessible labels, desktop and mobile widths               | Usable controls, decorative SVGs hidden appropriately, meaningful icons named, no unintended page overflow   |
| Affected morphs         | Compare both packed endpoints and reverse during playback                     | Correct source/style/frame endpoints; accepted motion, timing and continuity remain intact                   |

For numeric measurements, use tolerances appropriate to the existing geometry checks. Opposite-margin comparisons normally use about 0.001 native units. Allow a documented antialiasing fringe in raster checks, not a genuine shape mismatch. Existing contour tests use one raster pixel at 40× magnification as a fringe allowance; do not loosen thresholds simply to make a regression pass.

If X/Y or rotation hides a source mismatch, fix the source. Do not solve it with a style-specific preview transform. An accepted native-pose revision must open/reset at 100/100 and 0 in Lab.

## 6. Tests — reproduce the checks

Run commands from the repository indicated below. Read the current `package.json` scripts and contribution instructions before executing; this table explains their purpose and does not freeze dependency versions or test counts.

### Required suites

| Repository / command     | Establishes                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| core: `pnpm verify`      | Formatting, safe/valid SVG and metadata, type checks, source/unit tests and rebuilt catalog/morph data                                   |
| Svelte: `pnpm verify`    | Provenance, deterministic generation, build/types, unit tests, bundle/import isolation, packed consumer, compatibility and browser tests |
| local app: `pnpm verify` | Formatting, pinned local-package provenance, catalog generation, types, unit tests, local production build and review behavior           |

For an artwork change delivered through Lab, complete the core → adapter → local app checks required by their contribution instructions. For a new capability, verify all supported variants, not just the selected screenshot. When Homepage itself changes, run its separate `pnpm verify` website suite; it is not a prerequisite for ordinary local Lab updates. Never claim a full suite passed if only selected tests ran.

### Choose tests by the change

| Change                             | Regression evidence to add or update                                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline/Filled geometry            | Packed contour comparison at native proportions and rotated poses, plus actual-size visual review                                                               |
| Frame construction                 | Exact shared glyph, correct default outer bounds, correct transparent cutout and clearance at relevant weights                                                  |
| Directional family                 | Rigid-rotation/equal-size contract and complete direction/frame coverage                                                                                        |
| Public props, exports or generator | Generation check, direct-import graph/bundle checks, packed consumer and compatibility suite                                                                    |
| Static endpoint used by a morph    | Regenerated endpoint data, packed endpoint comparison and affected reversal/intermediate-frame tests                                                            |
| Lab controls or measurements       | Style/frame switching, resets, drafts, displayed spacing, keyboard access and affected viewport checks                                                          |
| Documentation only                 | Verify current values against sources, resolve local links, check script names and Markdown formatting; no artwork/browser reruns unless implementation changed |

Useful focused commands, **after their required build/pack preparation**, include:

```sh
# repos/svelte
pnpm generate:check
pnpm test:pack
pnpm test:browser tests/browser/math-family.spec.ts
pnpm test:compat

# repos/lab
pnpm dependency:check
pnpm generate:check
pnpm check
pnpm build
pnpm test:browser tests/browser/lab.spec.ts
```

Svelte browser tests consume the fixture produced by `test:pack`; do not accidentally test an old fixture. Local-app browser tests must run against its newly built preview. Run the separate website suite only when the website was changed. Browser coverage uses Chromium, Firefox and WebKit. Use current repository scripts for consumer compatibility rather than assuming a local compiler proves all supported versions.

### When a check fails

1. Inspect the failing assertion and the actual source/artifact/browser state. Distinguish a geometry bug, stale output, wrong fixture/server, outdated expected behavior or an unrelated pre-existing failure.
2. Fix the responsible layer. Update an expected value only when the intended design changed and the new reference has been verified.
3. Regenerate and repack after source/generator changes. Refresh the real Lab dependency and browser when necessary.
4. Rerun the failed/affected checks. Broaden or repeat a full suite when subsequent changes create additional coverage needs; do not repeat unrelated checks without a reason.
5. If verification remains blocked, report the exact check, observed failure, work completed and remaining limitation. A saved log, successful command invocation or screenshot alone is not a pass.

If dev/build/test processes share output directories or a port, verify the server is serving the intended build. Use an isolated built preview when necessary. Preserve unrelated servers and working changes. Keep logs and screenshots in ignored `.artifacts/` directories; do not commit bulky reports as source.

## 7. Definition of done and handoff

Apply the items relevant to the request. For documentation-only work, validate the current contract, examples, links, commands, formatting and entry points; a new Lab build or screenshot is unnecessary. Before reporting icon implementation complete, confirm:

- [ ] All requested identities, styles and frames exist in the correct source layer.
- [ ] The design brief's geometry, treatment and preserved references are satisfied.
- [ ] Metadata, review status, parts and relevant documentation are current.
- [ ] Required generated artifacts and dependency provenance trace back to validated committed sources.
- [ ] Relevant automated checks have passed; any uncompleted check is stated accurately.
- [ ] The actual Lab shows the new packed result, with working controls and measurements.
- [ ] Actual-size and relevant viewport/pose comparisons have been inspected; visual evidence is saved.
- [ ] Unrelated icons, motions, working changes, Lab drafts and the public release pin are preserved.
- [ ] The final handoff states the concrete result, where to inspect it, validation performed and any material limitation.

Keep the handoff concise. Link the Lab and relevant source/document files; include the saved screenshot when reporting a visual UI change. Use wording such as **“Implemented and verified; awaiting owner visual review”** when appropriate. Do not convert `draft` to `approved` without explicit owner acceptance, and do not block delivery of a working preview merely to ask for routine confirmation.

## 8. Maintain this playbook

This file is an operating specification, not an append-only conversation log.

- Replace superseded rules in the current sections when the owner changes them. Keep historical detail in supporting decision records, clearly labeled as history.
- Update the affected source metadata, this guide and the relevant core design/boxed/margin reference together. A rule's impact on styles, frames, measurements, tests and morph endpoints must be explicit.
- Keep `AGENTS.md` and repository entry points short and linked to this guide. Do not duplicate numeric specifications there.
- Keep the morph implementation contract in the canonical core `MORPH.md`; this guide records only the static integration requirements.
- Recheck examples, file paths and package scripts when implementation changes. Do not record a temporary test count or localhost port as a permanent design rule.

## 9. Supporting references

The guide above is the current operational summary. Use these for source-level details and decision history:

- [Workspace agent entry point](../../AGENTS.md)
- [Core contribution instructions](CONTRIBUTING.md)
- [Core design and decision records](DESIGN_RULES.md)
- [Primary-margin details](ICON_MARGIN_RULES.md)
- [Box/cutout construction details](BOXED_ICON_RULES.md)
- [Batch and owner-review records](ICON_BATCHES.md)
- [Svelte contribution instructions](../svelte/CONTRIBUTING.md)
- [Local app contribution instructions](../lab/CONTRIBUTING.md)
- [Homepage contribution instructions](../homepage/CONTRIBUTING.md)
- [Canonical morph agent playbook](MORPH.md)
- [Local morph entry point](../lab/design/MORPH.md)

## Morph frame parity — owner correction, 2026-10-27

When a morph has frame variants, implement every supported frame for the whole
pair. Menu X, Plus X and Plus Minus support None/Square/Circle, with the same
selection at both ends and throughout Filled playback. No unboxed-to-box pairing
or silent fallback is allowed. Verify every variant using packed endpoints and
intermediate frames. See [MORPH.md](MORPH.md) for the canonical frame matrix and
source-derived weights. This supersedes earlier Menu X topology-bridge notes;
static icon construction, approval statuses and accepted motion timing stay intact.
