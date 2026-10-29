# Icon — Shared Agent Playbook

Maintained: 2026-10-29. **This is the canonical English working document for icon creation and revision across this workspace.** It defines the goal, rules, design contract, workflow, verification, tests and completion criteria. Read it before making icon changes. Update the current sections when the owner changes a rule; do not maintain competing copies in agent entry points.

## Svelte static API — owner decision, 2026-10-29

Generate one Svelte component per static icon identity. Select Outline (default) or Filled with the `style` prop on that same component. Do not generate separate Filled components, a Filled barrel or `/filled` package subpaths. Keep per-icon imports independent and preserve the existing stroke-width props. This packaging decision does not change authored artwork, approval status or the separate opt-in morph API.

**Unified motion API — owner decision, 2026-10-29:** use the existing Trash import with `<Trash animate open={open} />`. Omitted/false `animate` preserves the legacy static drawing and stroke-width props. True `animate` selects the existing current-Figma motion at its authored fixed thickness; keep it true and change `open` for smooth reversal. Reuse the motion renderer/controller without changing its geometry or timing. This explicitly adds Trash's own motion code to its import; other direct icon imports remain isolated. Keep the compatibility `motion/trash` entry, and keep Motion and Morph as separate Lab pages. Do not add generic animation props to icons without authored motion.

## Current design language — working contract, 2026-10-28

**Lab migration — 2026-10-29:** the owner explicitly requested all current Figma icons replace the old active Lab collection on a new main page. The active local review set is now the94 current identities /188 drawings, at study base1.5. `icons/figma-study/manifest.json` records all source IDs and hashes; `src/design/figma-catalog.ts` exposes `FIGMA_STUDY_ICONS` through Core and the pinned Svelte adapter's `design/figma-catalog` subpath. Do not mix legacy1.75 artwork or frame variants into this new page. The old packaged collection remains historical compatibility data for existing consumers, not the active Lab catalog. This migration does not grant new visual approvals or change Homepage. The separate morph task owns migration of the five motion pairs to these same endpoints.

The complete board was exported through Figma web when MCP quota was exhausted. The186 native framed SVGs are stored verbatim; the two raw Square layers retain their named board paths with cell translation only, without scaling. The generated module normalizes black paint to `currentColor` and namespaces SVG IDs, retaining all path coordinates, effective paint and transparent counters. Heart and Pen's authored expanded Outlines are fixed geometry; expose their1.5 weight honestly rather than pretending it has an editable centerline stroke. Other Outline previews support the existing quarter-step control; Filled remains authored source geometry.

**Read this synthesis first.** It consolidates the owner's decisions from our own Square, Camera, Folder, Trash, Calendar, Lock, Bell, Chat Bubble, Home and Heart studies. It governs new squircle design work. Current per-icon source notes below supply the detailed construction; earlier trials and numerical snapshots are recovery history wherever superseded. The legacy production collection still has its separately documented weights and behavior. Do not silently apply study rules to that collection.

### Goal

Create an original, coherent icon family with a full, calm squircle character, clear object recognition and clean small-size linework. Related icons should feel designed together through body curvature, stroke, spacing and detail restraint. They do not need identical silhouettes, heights or corner formulas. Develop the language from our own work; external examples explain a concern, not a shape to reproduce.

The studies already cover a plain body, compound housing, overlapping layers, upright container, circular attachment, flared body, semantic tail, roof and concave/pointed symbol. This is sufficient to document the language now. More subjects may test it later, but no extra artwork is required for this synthesis.

### Rules

| Property      | Current study contract                                                                                                                                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native canvas | 24 × 24; design in native units before changing display size.                                                                                                                                                                                                                          |
| Base stroke   | 1.5 for this squircle study and new redesign work. Existing production remains at its current 1.75 contract until explicitly migrated.                                                                                                                                                 |
| Margin        | Normally 2 visible units at the subject's primary opposing pair, including stroke. A horizontal subject may use left/right; an upright subject may use top/bottom. Do not stretch the other dimension to force all four sides to 2. Preserve scoped owner edits and record exceptions. |
| Body          | Use our accepted Balanced Square and current Camera Simple as curve references. Develop continuous side-to-corner flow, rather than substituting a rectangle with circular corner fillets.                                                                                             |
| Proportion    | Choose width, height and occupied area for the subject. Judge optical size across the row; equal numerical bounding boxes are not the goal.                                                                                                                                            |
| Detail        | Keep internal marks simple, short enough to breathe, and aligned to the relevant body or opening. Round-ended 1.5 marks are the ordinary study treatment; semantic exceptions are deliberate.                                                                                          |
| Dual styles   | Match the visible Outline exterior with Filled. Preserve the same body, attachments, positions and proportions; derive Filled from the master instead of drawing a second approximation.                                                                                               |
| Transparency  | Filled openings and seams are real transparent counters. No white or surface-colored patches.                                                                                                                                                                                          |
| Frames        | Opt-in only. A natural body is not an enclosing frame. Requested framed variants are separate icon exports/identities, not a universal frame component applied to all icons. Authoring helpers may share construction without collapsing those identities.                             |
| Approval      | Only the owner grants visual approval. A matching export or passing geometry check is not approval.                                                                                                                                                                                    |

### Design: construct the body first, then resolve the feature

**Squircle describes the body and its flow, not a mandate to round every point equally.** Our accepted Balanced Square uses profile 3.2 as its own construction reference. Do not impose that exponent, one radius or one exact height on all objects. Sides may approach a straight direction and corners may remain visibly square in character while the transition is gradual. Avoid both the balloon-like over-rounded trial and the abrupt straight-to-circular-corner substitute.

Break the object into meaningful pieces: body, cap, tab, shoulder, opening, seam and mark. Retain the useful body curves and fit the semantic feature locally. Do not pull the entire lower body into a tail, pinch a wall to suggest overlap, or enlarge a head just to make its joins easier. Overlapping conceptual forms must resolve to the visible shared exterior once, without double strokes, inward necks or hidden edges crossing the front panel.

Polish tangent flow and the pace of curvature, not merely anchor positions. A join that technically touches can still look angular, wavy or swollen. Inspect the actual expanded stroke on both sides of concave joins: aligned centerline handles alone do not prevent offset cusps. Use a small local transition where required. Do not replace the whole silhouette when only one join was marked.

Use circles where their meaning calls for them: Camera lenses and flash, Calendar days, and Lock's circular shackle remain appropriate. Lock's stems rise upright before entering the arch. The family does not require converting every circle into a squircle.

Keep semantic directional points recognizable. Heart retains a clear central V and a rounded lower tip; the owner accepted only slight local rounding at the inner and exterior V tips. A broad U-shaped valley is not interchangeable with that result. Rounded tail tips and roof joins likewise need their own local judgment, rather than a global round-join setting as the entire design solution.

For a symmetric object, polish the chosen master half and reflect its anchors and handles about the intended axis. If the owner edits the left half and asks for the right to match, use that exact left half; do not independently fit the right or replace the owner's left shape. A request to Flip means a true reflection of the whole specified shape, not an invented wall deformation. Preserve intended asymmetry in tabs and directional tails.

### Our reference subjects and the lesson to reuse

These are construction references, not a blanket approval list. Use their current source sections and live owner edits; do not run older trial scripts over them.

| Subject                | Reusable design decision                                                                                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Square                 | Balanced whole-contour base; compare side fullness and gradual corners. This reference is owner-accepted.                                                                                                                                                                   |
| Camera Simple → Camera | Simple's top and bottom share the same rectangular squircle body language. Camera retains that base and adds a small, centered head with locally fitted shoulders. Center the lens within the body, excluding the head; place the flash with clear shoulder/lens clearance. |
| Folder Simple → Folder | Same smaller-tab exterior. Simple is outer-only; Folder adds a shallow middle seam. Keep tab/shoulder flow continuous and restrain the seam's arch. Filled Simple is solid; Filled Folder has an inset transparent seam with solid end bridges.                             |
| Trash Simple → Trash   | Same upright body, short handle and crowned lid. Handle terminals meet inside the lid without hanging into the body. Trash adds two short round-ended marks; Filled subtracts matching capsules. Preserve the owner's latest mark placement.                                |
| Calendar               | Body plus short bindings, restrained upward header arch and six simple dates. Filled uses transparent header/date counters. Both styles are owner-approved.                                                                                                                 |
| Lock                   | Taller squircle body with upright stems then a circular arch; centered short key slot. Both styles are owner-approved.                                                                                                                                                      |
| Bell                   | Compact flared shell, controlled rim and a separate clapper. Current master is the owner's latest left shell mirrored to the right; do not replace it with an older fit.                                                                                                    |
| Chat Bubble            | Preserve the squircle body first; attach each tail locally. Far-left, centered-down and center-slanted tails are separate identities. Directional counterparts are real Flips. A semantic tail must not turn the full lower body into a generic taper.                      |
| Home                   | Roof and doorway details can vary while retaining the intended body. Keep separate variants separate. The eaves pair has now been removed at the owner's request and must not reappear as a current reference.                                                              |
| Heart                  | Broad mirrored lobes, recognizable V, restrained local notch softening and a rounded bottom. Both current styles were explicitly approved on 2026-10-28.                                                                                                                    |

### Workflow for an incoming agent

1. Read this contract, the applicable repository instructions, and the current per-icon source note. Establish whether the task is a Figma study, production icon, Lab behavior or morph; do not promote between those scopes implicitly.
2. Inspect the latest owner-edited artwork before changing it. Record the exact frame/vector IDs, current exports, approval state and the specific requested region. Save a recoverable baseline. If the live artwork differs from an older script, the latest owner edit takes precedence.
3. Decompose the subject and identify retained body curves versus the local feature to change. For a new identity, choose natural proportions and primary margins. For a revision, preserve unrequested anchors, details and neighboring drawings. Do not create variants or fill grid vacancies without scope.
4. Finish one clear master contour. Resolve symmetry, tangent flow, stroke clearance and optical balance. Keep a practical number of editable curves; generated offset segments need not become the design's editable master.
5. Derive Filled from the exact visible Outline construction. A union of closed interior and expanded stroke is appropriate for a naturally solid object. Cut transparent counters for meaningful interior marks, with bridges where a seam would otherwise split the body. Preserve any explicitly documented per-icon style exception.
6. Verify the actual exported pair, then review native sizes and the family grid. Capture the delivered state and record current source paths, measurements, exceptions and review status. A marked local correction must not become an unrequested global redraw.

### Verification

- **Geometry:** confirm native canvas, current weight, primary visible margins, finite closed paths, no accidental self-intersection, and intended symmetry or asymmetry. Compare unrequested geometry with the saved owner baseline.
- **Curve quality:** inspect shoulders, concave joins, tips and expanded inner/outer edges at high zoom. Check position and tangent continuity where intended. For regular smooth offsets, a centerline curvature radius exceeding half the stroke avoids an offset cusp; intentional local joins such as Heart's notch need their own comparison. Never assert whole-contour G2 continuity from a few aligned handles or sampled checks.
- **Style correspondence:** overlay the exported exterior of both styles. Verify counters are transparent, correctly placed and clear of the exterior. Check Filled's lens, seam, slots and semantic attachments, not only its bounding box. When reusing live paths, preserve effective SVG paint inheritance as well as path data: an omitted root `fill="none"` can accidentally fill an open flap. Test the complete painted composition, not isolated path attributes. Use the documented weight exception for any legacy Bold-as-Filled identity.
- **Optical review:** inspect 16, 20, 24 and 48 px, light and dark surfaces, and the row beside current family references. Compare apparent size, fullness, internal breathing room and recognition. A curve that looks smooth at extreme zoom may still produce an awkward small icon.
- **Owner review:** show the actual delivered artwork, name any unresolved limitation, and retain draft status until the owner passes that specific revision. Preserve previous approval history when reopening a shape.

### Tests and delivery

For Figma studies, run focused checks on the exported SVGs and retained owner geometry. Record measured fitting/offset errors and justified local exceptions in the corresponding verification artifact. Numerical tolerances belong to their construction and export method; do not turn every trial coordinate into an immutable family rule. Review remains visual as well as numerical.

For production promotion, additionally follow the existing Core → adapter → standalone local Lab contribution and verification requirements in this playbook. A Figma approval alone does not change the production catalog, packages or morph endpoints. Morph work belongs to its authorized task and must read `MORPH.md` before implementation.

The deliverable is the actual editable drawing/export pair plus its current source reference, relevant verification and screenshot, or the requested document change. Update this canonical English playbook when the owner changes the contract; entry-point files link here instead of maintaining competing copies. Keep rejected/recovery snapshots clearly historical. Do not commit or publish unrelated work.

### Current review record

Heart's latest Outline and Filled are **owner-approved on 2026-10-28**, including the slight inner/exterior notch softening. Square Balanced, Calendar and Lock retain their separately recorded approvals. Do not infer approval of every intervening draft from approval of the language or of Heart.

The owner requested removal of **Home Eaves / Outline `20:226` and Filled `20:231`**; both remain removed. Source snapshots are recovery history only. The active Figma study now contains **188 drawings /94 Outline–Filled pairs**, organized into eleven named native frames: Shapes & Symbols, Objects, Communication, Home, Interface, Weather, Arrows, Chevrons, Corner Arrows, Controls and Window & Transfer. The latest directional and object additions below are **drafts awaiting owner visual review**. Existing approval history is unchanged.

Artwork parent `11:30` and independent white background `18:160` are **1600×1800**. Preserve their current owner-set positions. The94 pairs occupy the upper-left752×816 area; reserved right/lower regions support **560 total pairs** without counting unused cells inside current groups. This is capacity, not560 completed icons. Current identities, exact frame IDs, main-local and nested coordinates are in `.artifacts/figma-study/icon-grid-layout.json`; implemented bounds, membership and capacity are in `icon-grid-settings.json` and `figma-group-audit.json`.

## Twelve current-study additions — 2026-10-29

The owner requested twelve independent identities: Info, Alert, Globe, Link, Code, Terminal, External Link, Shopping Bag, Bell Ring, Repeat, Reply and Image. All have native24×24 Outline/Filled pairs at study base1.5, with no added generic frames. They are **drafts awaiting owner visual review**. Preserve all82 preceding pairs, including the separately revised Shop and wider Bookmark.

The complete Figma web export76 contains186 framed SVGs; the retained two raw Square drawings bring the source inventory to188 drawings /94 pairs in11 groups. The24 new files are stored verbatim under `icons/figma-study/{identity}/`; manifest records carry their actual frame IDs, source hashes and archive provenance. Current frame placement evidence is `.artifacts/figma-study/connected-seams/new-batch-frames.json`. Shapes & Symbols, Objects, Interface and Arrows expand to width344 while keeping parent origins and existing artwork fixed. Shapes retains the actual UI originX26.7470703125, rather than the old nominalX24 inventory; that discrepancy is recorded without moving artwork.

| Identity      | Current construction and style treatment                                                                                                                                                                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Info          | Owner-requested Circle housing at center12,12: Outline radius9.25/stroke1.5, Filled radius10, visible bounds2..22. Preserve the current i dot/stem dimensions and position; Filled retains their exact transparent counters. No separate generic frame variant.                                                                                                |
| Alert         | Exact current Triangle body, with a short exclamation stem/dot. Filled uses transparent counters and retains Triangle's natural vertical margins.                                                                                                                                                                                                              |
| Globe         | Semantic circular globe, one curved meridian and equator. Filled is a solid disc with transparent trimmed meridian/equator counters and solid pole/rim bridges.                                                                                                                                                                                                |
| Link          | Shorter and slightly fuller diagonal open rings with a locally shortened connector. Shared Outline1.5 centerlines use fixed unboxed Bold2.5 Filled. Natural bounds now approximately3.154..20.846 for Outline and2.654..21.346 for Filled; do not enlarge back. Only the inner connector is trimmed.5 per end in actual export90, retaining frames40:47/40:52. |
| Code          | Unboxed angle brackets with a restrained slash. Filled expands the identical centerlines at Bold2.5, as Menu/Search; primary side margins2 at Filled and2.5 at Outline.                                                                                                                                                                                        |
| Terminal      | Taller full squircle housing: visible20×18, formerly20×16, centered at12 with width20 and1.5 stroke retained. Original prompt/underscore and transparent Filled counters move togetherY+.35 to center vertically; their shape is unchanged. Actual export77 retains frames40:65/40:70.                                                                         |
| External Link | Open three-quarter squircle window with an up-right arrow. Filled retains the1.5 window ribbon and uses our rounded solid-arrowhead treatment; the window is the semantic object.                                                                                                                                                                              |
| Shopping Bag  | Owner restored the ABOVE arch handle in actual export87. Butt terminals join the upper-body ribbon; straight walls gently flare toward gradual lower corners. Preserve body/handle geometry from79 with visible top/bottom2..22 and true Filled handle opening. Inside-U86 is superseded.                                                                      |
| Bell Ring     | Current crown-free Bell shell and clapper, plus one unchanged ringing curve per side. Ringing marks remain1.5 in both styles. Remove only the crown without recentering; shell top3.75 and clapper bottom22 retain the owner's remaining geometry. Actual export81 retains frames40:89/40:95.                                                                  |
| Repeat        | Two deliberate curved return flows, equal smaller90-degree heads, and quiet spacing. Filled keeps the1.5 shafts and uses rounded solid heads; primary bounds2..22.                                                                                                                                                                                             |
| Reply         | Broad returning shaft with one90-degree head. Filled keeps the1.5 shaft and rounded solid head; horizontal margins2 and natural vertical margins3.5.                                                                                                                                                                                                           |
| Image         | Original horizontal squircle body and sun retained. The first/last landscape rays now extend into the existing frame rim, with butt terminals; Filled cuts the same1.5 landscape seam while preserving its full solid rim and sun counter. Actual export89 retains frames40:99/40:104.                                                                         |

**Shorter and fuller Link —2026-10-29:** after the first wider-ring revision in export78, the owner requested a shorter and slightly fuller Link again. Each ring's local short-axis span grows8.497077639→8.997077639 (+.5), and its local long-axis span shortens9.335327898→8.085327898 (−1.25) toward the retained mouth axis-position. Preserve the rings, diagonal orientation and fixed Outline1.5/Bold2.5 weights. The owner subsequently shortened only the inner connector by.5 at each end, reducing its centerline length8.401899343→7.401899343 while keeping its center/angle. Actual export90 supersedes83 for this local trim; practical retained-ring and connector checks are in `.artifacts/new-icon-batch/link-short-connector/`. The resulting larger natural margins are intentional; do not enlarge the complete mark back to2px. The current actual export90 is stored verbatim in the original frames. Ring before/after cubics and earlier export83 checks are in `.artifacts/new-icon-batch/link-short-fuller/`; the earlier export78 remains recovery history. This scoped revision remains a draft pending owner review.

**Circle Info —2026-10-29:** replace only the former Square housing with a Circle centered12,12, Outline radius9.25/stroke1.5 and Filled radius10. Retain the existing i dot/stem and transparent counters literally. Corrected actual export85 keeps both original frames40:23/40:28 and native artwork at0,0; export84's unintendedX offset is superseded. The Outline exports as Figma's standard four quarter-cubic circle, verified against those exact controls; its small ordinary radial approximation does not authorize shifting the center or changing the radius. Practical candidates and actual-export checks are in `.artifacts/new-icon-batch/info-circle/`. Draft pending owner review.

**Above-handle Bag and crown-free Bells —2026-10-29:** the owner explicitly corrected the handle direction back to ABOVE the bag. Actual export87 restores the verified79 sloped body and connected arch handle; inside-U86 is superseded recovery history and must not be restored. Sides grow.2 horizontal units per vertical unit toward the base. Handle terminals meet the upper body centerline atx8.5/15.5,y8.320223469, with butt ends inside the shared ribbon and no hanging strokes. Filled uses the matching.75-radius arch expansion and normal-offset body with a true transparent handle opening. Body/handle retain visible top/bottom2..22 without the former U trial's translation. Practical masters and source/export checks are in `.artifacts/new-icon-batch/bag-bell-refine/`. Bell and Bell Ring remove the separate Outline crown/stem only; shell, clapper and Ring arcs are retained. Filled had merged the stem into its shell, so only the newly exposed1.5-unit top span is reconstructed, meeting the retained neighbours' tangent directions. The visible shell top is3.75, with no recentering to restore the removed crown's former margin. Actual exports80/81 remain current; Bell keeps frames18:229/18:234 and the new pairs keep their original frames/placement. Bell masters, source/export comparison, literal retention and complete-paint checks live in `.artifacts/new-icon-batch/bag-bell-refine/`. These remain drafts pending owner review.

**Connected Image —2026-10-29:** extend only the landscape first and last straight segments along their original directions to the unchanged frame centerline, approximately(4.27375978,18.83393107) and(20.29152433,18.20550714). Use butt terminals inside the rim; retain body, sun and middle landscape controls. Filled cuts the same1.5 seam only inside the body, preserving full1.5 exterior bridges. Actual export89 and source/export evidence live in `.artifacts/new-icon-batch/image-connected/`; Shop Filled stripe-seam evidence lives in `.artifacts/new-icon-batch/shop-seam-filled/`. Both remain drafts pending owner review.

Practical construction and focused geometry/rendering checks remain under `.artifacts/new-icon-batch/{symbol-action,developer-object,link-media}/`; actual exported-source checks cover the delivered24 files. Native16/20/24/48px inspection and passing checks do not confer owner approval. Adapter and standalone Lab promotion use the same current source inventory; Homepage and the historical production collection are separate scopes.

## Expanded Figma frame and second study batch — 2026-10-28

The owner explicitly requested room for500+ icons and logical groups. Resize the working frame and background, never Scale the artwork. Before expanding from400×480 to1600×1800, all74 then-existing direct children reported fixed Left/Top constraints. The66 visible drawings were repositioned as whole layers, preserving their IDs and path geometry; eight hidden recovery children remain intact. The visible drawings are now nested in ten unpainted native category frames, all with fixed Left/Top children and no clipping. Keep the main parent unclipped. Grouping can quantize placement below.0002 native units; it does not authorize reshaping an approved contour.

Within each category, native Outline/Filled cell origins differ by32; pair pitch is96 and row pitch48. Ordinary icon containers stay24×24. Square retains its two original rawbounds and cell offsets. The current full layout has73 pairs; do not use the older four-pair row coordinates as current placement. Do not add explanatory canvas text or colored panels. Frame names and the layer hierarchy identify the groups; the independent background stays white. New requested subjects can extend their category frame after confirming child constraints, without deforming existing icons.

The owner named Person and Settings, then Sun, Moon and Triangle; Search completes the standing six-identity batch. All six new pairs are **drafts awaiting owner visual review**, with1.5 base stroke and no enclosing frames. Production artwork, adapter, Lab and morphs are unchanged.

| Identity | Outline / Filled frame IDs | Current construction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person   | `22:2` / `22:6`            | Circular head center12,6 with centerline radius3.25; independent six-cubic full shoulder/body, mirrored aboutX12. Visible top/bottom2..22. Filled uses head radius4 and the body's exact.75 outward offset.                                                                                                                                                                                                                                                                                                                                    |
| Settings | `22:10` / `22:14`          | Six broad gear teeth with local.95-radius rounded transitions before native fitting. The preceding polygon-derived gear is baked30° so left/right crowns sit on the horizontal axis. The fully rounded sinusoidal-tooth trial was rejected and reverted; do not restore it. Center circle radius3.1; Filled counter radius2.35.                                                                                                                                                                                                                |
| Sun      | `22:17` / `22:21`          | Disk center12,12, radius4.7; eight radial centerlines from7.75 to9.25, round1.5 stroke, so visible ray length3. Filled disk radius5.45 and matching rays. Cardinal visible bounds2..22.                                                                                                                                                                                                                                                                                                                                                        |
| Moon     | `22:25` / `22:28`          | Our own accepted production Moon circular contours and baked pose, adapted only to study stroke1.5. Keep the natural margins and circular concavity. Filled is a native union of the closed interior and outlined stroke. This preserves the pose rather than claiming approval of the new-weight study.                                                                                                                                                                                                                                       |
| Triangle | `22:34` / `22:37`          | The owner rejected merely straight/locally filleted and arbitrary bowed-side trials, requesting the Square curve language. Each corner-to-side run now derives from our accepted Square quarter (profile3.2, normal inset.75), normalized and affinely mapped between the adjacent triangle edge midpoints through the vertex wedge. Eight fitted cubics per quarter, three quarters, are uniformly fitted to18.5 centerline width and expanded.75 for Filled. Preserve the triangular identity and gradual shallow sides; no enclosing frame. |
| Search   | `22:40` / `22:43`          | Owner requested a larger circle and short handle, then a slightly longer handle. Circle center11.3,11.3, radius8.05; tangent contact lies at11.3+8.05/√2 on both axes, ending21.15,21.15. Outline1.5; unboxed Filled retains the explicitly established Bold2.5 treatment. It is a style exception to identical Regular/Filled exterior. Bold's lower/right margin is1.6 after the scoped handle extension; do not silently shrink the circle to force a different fit.                                                                        |

Current files in `.artifacts/figma-study/`: `author-batch-person-settings.py`, each `{person,settings,sun,moon,triangle,search}-study-authoring.json`, the corresponding `-study-{outline,filled}.svg` authoring sources and `-study-{outline,filled}-live.svg` exports. Moon Filled's authoring SVG contains fill+stroke parts and requires their native union; the live export is the delivered union. Preserve editable centerlines/part names separately from fitted offset exports.

`verify-batch-person-settings.py` / `batch-person-settings-verification.json` check native24×24, paint transparency, source coordinates, normal-offset correspondence, smooth authoring joins and safe sampled curvature for Person/Settings/Triangle, eight3px Sun rays, Moon's Filled union, and Search's Bold exception. Actual body target errors are below.000101 and sampled exterior offset errors below.000106. Minimum sampled centerline radii are above.75; this is not a whole-contour G2 or owner-approval claim. Visual evidence: `person-settings-sun-moon-triangle-search-grid-web.png` and `triangle-square-language-web.png`. Earlier screenshots of this batch predate the owner's local corrections wherever they show a different Triangle, Settings or handle.

## Eight-direction Arrow study — latest, 2026-10-28

The owner requested **all eight Arrow directions**, then asked for a slightly shorter shaft. This explicit directional family is eight identities, not a six-unrelated-icon batch. Deliver Outline and Filled for each, without enclosing frames. Keep the earlier studies and production catalog unchanged; these new study drawings await owner visual review.

Use one right-facing native24×24 master, stroke1.5 with round caps/joins. After shortening, the shaft centerline runs(3.25,12)→(20.75,12), length17.5, with19 visible units along its own axis. The90-degree V retains half-span6.9375: head endpoints(13.8125,5.0625)/(13.8125,18.9375), tip(20.75,12). Head arms retain their original lengths while the tail is reduced; the complete master is recentered. Do not restore the initial18.5 shaft trial.

Rotate the entire master about(12,12): Up−90°, Up Right−45°, Right0°, Down Right45°, Down90°, Down Left135°, Left180°, Up Left225°. **Never enlarge diagonal arrows independently to match cardinal artboard width/height.** Physical length, head dimensions and stroke remain identical under rotation. The extra cardinal outer space is intentional after the owner's shaft shortening.

Filled follows the established **solid-head** semantics: unite the.75-radius round-ended shaft with the same triangular head expanded by.75 with round corners. This is a semantic head-fill exception, not Bold-as-Filled. Its analytic exterior is authored in the right master and rotated unchanged for every direction. No style-dependent translation, separate diagonal fit, background patch or enclosing frame is introduced.

| Direction  | Outline / Filled frame IDs | Native cell positions |
| ---------- | -------------------------- | --------------------- |
| Up         | `23:2` / `23:5`            | x408/440,y120         |
| Up Right   | `23:8` / `23:11`           | x504/536,y120         |
| Right      | `23:14` / `23:17`          | x600/632,y120         |
| Down Right | `23:20` / `23:23`          | x408/440,y168         |
| Down       | `23:26` / `23:29`          | x504/536,y168         |
| Down Left  | `23:32` / `23:35`          | x600/632,y168         |
| Left       | `23:38` / `23:41`          | x408/440,y216         |
| Up Left    | `23:44` / `23:47`          | x504/536,y216         |

The Arrow family is now arranged across three rows in the Arrows category. Its sixteen frame IDs and shortened source geometry are unchanged. The preceding400×480 layout with66 drawings was an intermediate state; current main/background dimensions, grouping and total count are recorded above.

Current source/evidence in `.artifacts/figma-study/`: `author-arrows-eight-study.py`, `arrows-eight-study-authoring.json`, each `arrow-{direction}-study-{outline,filled}.svg`, the corresponding `-live.svg` exports, `arrows-eight-study-grid.json`, `verify-arrows-eight-study.py`, `arrows-eight-study-verification.json` and `arrows-eight-study-shorter-web.png`. The previous `arrows-eight-study-web.png` shows the longer initial trial. Verification checks all16 exports, native24×24, stroke1.5, exact direction/shaft/head parameters, and inverse-rotated Filled exterior against the common master. Outline point error is below.00008 and sampled Filled rotation error below.000082; direction shafts differ only by export rounding, below.000013. A reversed traversal of the same open V is geometrically equivalent. Passing these checks does not grant owner visual approval. No production Core, adapter, Lab or morph promotion is included.

## Chevron and Corner Arrow studies — 2026-10-28

These are deliberately authored directional families at24×24/stroke1.5, not new enclosing-frame variants. **Chevron, Double Chevron and Chevron Line have only Up/Right/Down/Left.** Do not add diagonals. All directions derive from one master through rigid quarter-turns; no direction-specific scaling. Outline uses an open V with round caps/joins; Filled uses the same head's rounded solid triangle. This semantic Filled exception does not turn the entire icon into a boxed cutout.

- **Chevron:** right-facing centerline(8,4)→(16,12)→(8,20), depth/half-span8. Preserve its restrained natural bounds rather than stretching every direction to all four2-unit margins.
- **Double Chevron:** translate that exact head by±4.75, separation9.5. The two **Filled heads touch at(12,12)** without a gap or overlap. Keep both members' head dimensions and.75 rounding identical. Do not shrink heads independently to create spacing.
- **Chevron Line:** right master(6.5,4)→(14.5,12)→(6.5,20), stop centerline atx17.5,y4..20. The combined subject is centered12,12; the visible head/stop gap is1.5. Filled has the rounded solid head plus the same1.5 capsule stop. Rotate the entire composition for the other directions.
- **Corner Arrow:** all eight bent identities are present: Up Right, Up Left, Down Right, Down Left, Right Up, Right Down, Left Up, Left Down. One own master provides a broad two-cubic elbow whose curvature eases to zero at its straight joins; reflect/quarter-turn complete geometry, including the V head. Filled retains the shaft and uses a solid rounded head. Do not replace the elbow with a sharp L or inflate individual orientations.

Sources in `.artifacts/figma-study/`: `author-chevrons-study.py`, `author-chevron-line-study.py`, `author-corner-arrows-study.py`, corresponding authoring JSON, and `{identity}-study-{outline,filled}.svg`. Live exported SVGs use `-live.svg`. `verify-directional-study-live.py` / `directional-study-live-verification.json` verify the first32 actual Chevron/Double/Corner exports: Outline points match exactly; sampled Filled boundary error stays below.000063 against a predeclared.0002 tolerance; Double contact is retained. Chevron Line is included in the later expanded-study export check. These checks establish correspondence, not owner approval.

**Body/fullness and fabric hem revision —2026-10-29:** the owner requested a fuller Shopping Bag body because the handle looked oversized. Expand the body centerline horizontally aboutX12 by1.14, then expand the unchanged1.5 stroke normally; do not scale stroke width or the upper handle. Retain its exact upper arch and butt terminalY8.320223469 inside the shared top ribbon. Body height and visible top/bottom2..22 remain unchanged; straight side growth is now.228 per vertical unit. Both styles derive from this same body, with a true handle opening. The previous79/87 body dimensions are superseded.

Shop Filled now also exposes the scalloped fabric hem as a transparent1.5 seam, united with its existing vertical stripe counters. Follow the unchanged Outline canopy hem; preserve1.5 solid exterior bridges and the original exterior, doorway and window. This replaces the earlier vertical-stripes-only treatment without changing Shop Outline. Actual Figma export93 contains only these three revised drawings at their existing frame IDs. Base full-board archive91 remains the provenance for unaffected drawings. Construction, recovery exports, actual-size previews and verification are in `.artifacts/new-icon-batch/body-and-awning/`. Both revisions remain drafts awaiting owner review.

## Current Mail, Wallet and Shop corrections — 2026-10-29

Mail retains its original four-sided body. The latest owner direction develops the plain-line V baseline with slightly fuller arms and a small tangent fillet at the central tip. Keep a recognizable V, restrained bowing and clean terminals connected to the body; do not restore the strongly gathered ends or broad U. The local centerline fillet has sufficient radius for the 1.5 stroke to retain a small smooth inner edge. Filled subtracts the identical mark as a transparent counter clipped inside the existing outer rim. The plain V is a recovery baseline, not the final latest shape.

Wallet retains its literal body and circular fastener. Its closure now reaches the right wall; butt terminals end inside the shared body ribbon. The matching Filled counter reaches the inside of the rim and preserves a solid exterior bridge.

The owner first requested Shop use our Home roof and connect its doorway to the base, then replaced only the roof with a striped fabric canopy. The current Shop retains the exact Home Door lower body, side walls and connected doorway without scaling or distortion, plus the original short left window. The canopy has a restrained top, two straight exterior slopes and a shallow fabric hem; the owner explicitly excludes inward concavity on the left/right roof slopes. Outline adds two short panel seams. Filled is one solid exterior with two narrow transparent1.5 stripe seams joined to the transparent scalloped hem and the retained window counter; the central fabric panel is solid. Clip both stripe seams inside the canopy rim to retain solid outer bridges; the doorway remains open to the base. The former entire Home roof and earlier awning trials are recovery history. This is a Shop draft; no Home drawing was changed.

The six original frame IDs remain: Mail `24:123` / `24:127`, Wallet `24:130` / `24:135`, Shop `24:162` / `24:170` (Outline / Filled). Current native exports are in `icons/figma-study/{mail,wallet,shop}/`; the manifest records revision archives and hashes. Web export68 differs from the fresh export65 baseline only in these six SVGs; the other154 exports are byte-identical. Export70 supersedes only the two Mail drawings with the slightly fuller, locally softened V. Export69 remains the requested plain-line recovery baseline. Shop export75 establishes the fabric canopy and straight slopes. Filled export88 supersedes only its broad-panel treatment with two transparent stripe seams, retaining the exterior/window literally and preserving the original frames and placement. Figma simplifies only collinear lower-body vertical cubics to `V`; the actual lower/body/door geometry is unchanged. Earlier exports66/67, intermediate curves and generators are historical wherever their shapes differ from this section. Focused source/export comparison and retained-geometry evidence live under `.artifacts/figma-study/connected-seams/` and `.artifacts/new-icon-batch/core-revisions/`. These corrections await owner visual review.

Bookmark's latest scoped revision widens its visible body from15 to16 native units aboutX12, retaining height20 and stroke1.5. Preserve the upright proportions and locally softened V notch. Actual export74 is stored verbatim in `icons/figma-study/bookmark/`; existing frames `24:138` / `24:142` and their parent placement remain unchanged. Practical authoring metadata is in `.artifacts/new-icon-batch/bookmark/authoring.json`. It remains a draft pending owner visual review.

### Mail Fold — separate identity

The owner requested one additional Mail with lower fold seams. `mail-fold` retains the current Mail body and softened V literally, adding only two lower folds meeting the flap and the lower body corners. Both folds terminate inside the shared stroke ribbons, with no overshoot. Filled subtracts the union of the same flap/folds as a real transparent counter; retain a solid outer rim. Keep the original `mail` pair unchanged.

Native Figma frames are Outline `38:7` and Filled `38:12`, in Communication `24:116` at local192/224,48. These fill the previously empty cell; no other icon was moved or resized and no group/background expansion was needed. Complete export72 contains162 framed SVGs plus the two unexported raw Square drawings:164 drawings /82 pairs in11 groups. Relative to baseline65,154 original SVGs remain byte-identical, six requested originals are revised and the two Mail Fold exports are new. Source files live in `icons/figma-study/mail-fold/`; the manifest carries IDs/hashes. Draft pending owner review. All Lab pages and motion previews remain in the private standalone local app, never Homepage.

## Mail, Wallet, Bookmark, Note, Pen, Shop, Menu and Chat Bubble Mark — 2026-10-28

The owner requested six object identities, then the three Menu treatments and a Bubble with a center dash. All have Outline/Filled pairs and remain drafts. Use our existing bodies as references, not external library artwork. Preserve the actual exported Bubble master; a new mark does not authorize changing its tail.

| Identity                       | Construction and style treatment                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mail                           | Four-sided horizontal squircle envelope with flatter side runs and more defined gradual corners; the existing folded-flap seam is retained. Filled matches the revised exterior and retains its inset transparent seam and end bridges.                                                                                                                                                                                                |
| Wallet                         | Four-sided horizontal squircle body, visible20×17 at bounds2,3.5..22,20.5 after the latest height revision. Preserve the inward closure tongue and circular fastener without scaling them. Filled matches the revised exterior and retains the transparent closure details. The fastener remains a semantic circle.                                                                                                                    |
| Bookmark                       | Upright full body with a recognizable, locally softened lower V notch. Preserve the V; do not turn it into a broad U. Both styles share the exterior.                                                                                                                                                                                                                                                                                  |
| Note                           | Equal-sided four-sided squircle paper body, visible20×20 at bounds2,2..22,22. Preserve the three short round-ended marks exactly; Filled subtracts their matching capsules.                                                                                                                                                                                                                                                            |
| Pen                            | Diagonal barrel, cap and convex angular tapered nib. Its complete expanded exterior has no inward neck, concave shoulder or S bend. Preserve the locally softened tip and tiny.15 inner-tip fillet; do not restore the broadly round bulb or earlier pinched taper. Barrel/cap geometry, cap seam and Filled counter remain exact. Ordinary edges retain1.5 weight; the tiny semantic inner join is explicit expanded-contour artwork. |
| Shop                           | Exact Home Door lower/body/door geometry beneath a striped fabric canopy with straight exterior slopes and shallow hem. Preserve the short window, open connected doorway and transparent Filled stripe-seam/window counters. See the current revision above.                                                                                                                                                                          |
| Menu / Menu Two / Menu Unequal | Three equal lines, two equal lines, and three successively shorter lines. Outline1.5; **unboxed Filled is the same centerlines at Bold2.5**, following the existing Menu/Search exception. No enclosing box. The longest centerline isx3.25..20.75; equal three-line Y is6.5/12/17.5, two-line Y8/16. Unequal endpoints20.75/16.75/12.75 share the same left origin.                                                                   |
| Chat Bubble Mark               | Duplicate the freshly exported left-edge Bubble `19:344`/`19:347` exterior exactly. Add centerline(9,10.5)→(15,10.5), round1.5. Filled cuts its true capsule counter at the same position. The original unmarked pair stays intact.                                                                                                                                                                                                    |

Source generators: `author-mail-wallet-study.py`, `author-bookmark-note-study.py`, `author-pen-shop-study.py`, `author-menu-chat-mark-study.py`; per-family authoring JSON contains editable master curves and numerical construction. Ready Filled paths derive from the Outline exterior, rather than a second approximation. Generated dense offset paths are rendering geometry; edit the practical master and regenerate. Source verification and the independent `mail-wallet-pen-shop-source-review.json` check offsets, symmetry, safe local clearances and complete painted counters. Actual Figma exports are checked in `expanded-study-live-verification.json`. Menu's weight exception and Pen's local nib treatment must remain explicit.

The28 later drawings join their existing categories: Wallet/Shop in Objects, Mail/Bubble Mark in Communication, Bookmark in Shapes & Symbols, Note/Pen/Menu in Interface, and Chevron Line in Chevrons. Exact IDs and both main-local/nested positions are maintained in the implemented inventory, not duplicated here. Production Core icons, adapters, local Lab and morph endpoints have not been promoted by this Figma work. Latest overview evidence is `.artifacts/figma-study/review-revisions-grid-web.png`; the same live artwork at100% is `review-revisions-grid-native-web.png`. Earlier grouped-icon screenshots precede this latest review. All60 new exported SVGs passed their focused comparison checks; this does not grant owner visual approval.

## Scoped body polish, Bubble Mark family and Controls — current revisions, 2026-10-29

The three marked four-sided body revisions are **Mail, Wallet and Note**. Their body quarters use flatter side runs and more defined gradual corners. Editable body masters retain eight cubics. Mail keeps its existing proportions and `mail-squarer-study-{outline,filled}.svg` sources.

The owner's latest scoped proportion change is **Note as an equal-sided square and Wallet slightly taller**. Note expands its visible width from16 to20, retaining height20: bounds2,2..22,22. Wallet retains width20 and increases height from16 to17, centered at12,12: bounds2,3.5..22,20.5. Both retain the existing four-sided squircle curve language, native24×24 canvas and1.5 stroke. Do not use a sharp rectangle, scale the entire artwork, stretch internal details, or make Wallet square. All three Note marks/counters and Wallet's closure, circular fastener and transparent counters remain verbatim from fresh export61. Outline roots explicitly retain `fill="none"`; Wallet's fastener remains explicitly black.

Active sources for this scoped change are `note-square-study-{outline,filled}.svg` and `wallet-taller-study-{outline,filled}.svg`, generated by `author-note-square-wallet-taller.py`. Per-pair authoring JSON and `note-square-wallet-taller-authoring.json` hold the practical masters and exact retained details. `verify-note-square-wallet-taller.py` checks the source bounds, tangent joins, paint, offsets and detail retention. The earlier upright Note and lower Wallet sources are superseded; do not replay their generators over the current artwork. Actual Figma evidence is `note-square-review-web.png` and `wallet-taller-review-web.png`. `verify-note-square-wallet-taller-live.py` checks the four actual Figma exports from62 against the sources and baseline61. All four pass: bounds are exact, retained semantic controls have zero drift, sampled Filled/source drift is below.000054, and actual Outline/Filled exterior-offset drift is below.000106 against the declared.0002 export tolerance. Transparent counter paint probes pass. These remain drafts pending owner visual review.

**Person is excluded from this revision.** Its earlier circle head and six-cubic torso have been restored exactly from fresh export57. The squarer Person trial is inactive recovery only and excluded from active regeneration. Do not change Person when following the Mail/Wallet/Note request.

**Pen keeps an angular nib with slight local softening, like the accepted Heart treatment.** The broad rounded-nib trial is rejected. Current final files are `pen-convex-tip-study-{outline,filled}.svg`; source generators and authoring JSON retain the practical centerline. The cap, long barrel, seam and counter are retained. Rebuild only the nib as a convex rounded wedge with straight angled tapers and small tangent corner fillets. The actual expanded nib exterior has nonnegative curvature throughout; it must not pinch inward where it meets the barrel. The final Outline is an expanded compound contour so a tiny native.15 circular inner fillet removes the inner V cusp. Outline and Filled share the exact same convex exterior. This is a scoped semantic-tip exception; do not globally inflate a nib to force its centerline radius above half-stroke. `pen-convex-tip-review-web.png` records the actual Figma pair.

**All five Bubble silhouettes now also have a Mark identity**: left-edge, Right, Compact, Slant and Slant Right. The original five unmarked pairs remain. Each marked identity preserves its freshly exported body/tail paths exactly, then adds the same round-ended centerline(9,10.5)→(15,10.5), width1.5. Filled cuts the corresponding true transparent capsule. `author-bubble-mark-family.py`, `bubble-mark-family-authoring.json` and their live exports define the four additional counterparts; the earlier left-edge Mark remains current.

**Controls** is a new native category at main-local408,696, containing six Outline/Filled pairs:

| Identity                        | Current native construction                                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| More Horizontal / More Vertical | Three circles centered4/12/20 on the principal axis and12 on the other. Outline centerline radius1.25, weight1.5; Filled disk radius2 matches its exterior. No enclosing frame.                                                                            |
| Check                           | Clear V with a short lead-in and longer rising arm; round1.5 Outline. Unboxed Filled is the exact Bold2.5 checkmark union.                                                                                                                                 |
| Plus / Minus                    | Plus axes(3.25,12)→(20.75,12) and(12,3.25)→(12,20.75); Minus retains the horizontal. Outline1.5; unboxed Filled is exact Bold2.5.                                                                                                                          |
| X                               | Two diagonals between3.25 and20.75, with fixed1.5/2.5 weights. This is the existing optical-size compensation relative to Plus; do not substitute the visibly smaller strict rotation of Plus's shorter axes. No anisotropic stretching or stroke scaling. |

Current sources: `author-more-study.py`, `author-action-marks-study.py`, corresponding metadata and `{identity}-study-{outline,filled}.svg`. The current review layout has73 pairs /146 drawings in ten category frames. Communication extends to168 high; Home moves as a whole toY504; Controls occupies six cells of the lower reservation. Main/background remain1600×1800, with capacity547 pairs excluding internal category vacancies. All existing icon frame IDs and native sizes are retained.

`verify-review-revisions-live.py` compares the30 actual final exports: eight revised drawings, twenty new drawings and the two restored Person drawings. It reads export59 for the28 non-Pen drawings, then overlays the two final Pen exports from60; it does not use the superseded Pen inside59. Verify body/details, effective paint and transparent counters, exact Person restoration, preserved Bubble silhouettes, mark positions, optical X size and tiny Pen tip treatment. Actual export verification passed all30: Person and the four new Bubble exteriors retain literal baseline path data; the final Pen nib/shoulder arcs are convex in the native export, and the retained128 cap/barrel curves are exact. Generic sampled Filled drift stays below.000061. More semantic circles export as the standard four kappa cubics, with recorded true-circle radial deviation below.000553; compare their intended quarter-cubic controls explicitly instead of loosening the generic contour tolerance. Keep drafts pending the owner's visual review; no production/Lab/morph promotion is implied. The previous round-tip, concave nib and wrong-target Person trials must not be replayed. Current inventory and group audit, rather than previous screenshots or historical row coordinates, govern placement.

## Window and transfer study —2026-10-29

The owner explicitly requested Maximize, Minimize, Login, Logout, Upload, Download, New Window and Copy: eight identities /sixteen drawings, no extra enclosing frames. Native24×24, Outline1.5. Editable master curves and style SVGs are in `window-transfer-study-authoring.json` and `author-window-transfer-study.py` under `.artifacts/figma-study/`. Figma frame IDs and nested positions are in the inventory. The new unpainted, unclipped Window & Transfer frame `28:91` is main-local24,696, size248×120; children retain fixed Left/Top constraints. The collection has81 pairs /162 drawings across11 groups. Capacity remains547 pairs after accounting for eight newly occupied reservation cells.

- **Maximize / Minimize:** four gradually curved two-cubic elbows. Minimize turns each local elbow180° while retaining placement. Filled uses exact Bold2.5 ribbons on the same masters, following the established unboxed exception. No sharp H/V centerline substitute or enclosing frame.
- **Login / Logout:** open doorway with gradual squircle corners and an entry/exit arrow. Mirror the doorway for the counterpart. Filled retains its exact1.5 doorway and shaft with a rounded solid head; the doorway's expanded ribbon is fill-only artwork.
- **Upload / Download:** same upright broad curved tray. Only arrow direction changes; the tray never rotates. Filled retains exact1.5 tray and shaft plus a solid rounded head.
- **Copy / New Window:** same squircle sheet masters with deliberate exposed rear-junction gaps. Copy's foreground is bottom-left; New Window is its baked horizontal reflection, foreground bottom-right. Filled has the visible1.5 foreground exterior and exposed rear ribbon. New Tab remains the semantic use of Plus Square.

`verify-window-transfer-live.py` checks all16 actual SVGs from Figma export63. Maximum source correspondence error is below.000077 against declared.0002 export tolerance. Copy/New Window reflection error is below.000065. Native sizes, fixed Outline weight, fill-only Filled paths, baked live transforms and absence of opaque surface patches pass. Evidence: `window-transfer-study-grid-web.png` and `window-transfer-native-web.png`. These remain drafts pending owner visual approval.

The owner explicitly requested a **local Lab review and morph handoff** after this batch. Portable trusted endpoint data is committed at `src/design/window-transfer.ts`, exported as `@squircle-icons/core/design/window-transfer` and mirrored by the Svelte adapter's same design subpath. Local Lab route `/study/window-transfer` imports the pinned adapter data, never sibling sources or duplicated SVG literals. This opt-in draft study preserves the legacy production1.75 catalog and existing morph endpoints. The icon task supplies static endpoints; the separate morph task owns motion revisions. This handoff grants no implicit static/motion approval. The Lab study exposes an **Outline stroke preview control**: Thin1.25, study Regular1.5, Bold2.5, with.25 steps over.5..3 and Reset1.5. Apply the selected weight to both enlarged and actual-size Outline samples, retaining centerlines and the chosen setting while switching subjects. Filled stays the exact fixed authored artwork. This preview control does not alter Figma masters or add a morph thickness control.

## Study background and detailed construction records

The current working contract above takes precedence. Earlier dated trials below describe the route to the current source; superseded shapes and approval states must not override the latest owner decision.

### Original squircle direction — study background

The owner clarified that this project needs its **own squircle design language**, beyond ordinary rounded corners. The first Camera trial subsequently expanded into the Figma subjects summarized in the current working contract above. Those scoped studies do not authorize a collection-wide production redesign.

An external example may reveal a mismatch between our work and our own brief. It must not supply the design solution. Do not trace, extract, sample or reconstruct its paths, silhouettes, proportions, motifs, compositions, icon inventory or style recipes. Do not make a slightly altered version of another collection. Common primitives such as a square, circle and independently constructed squircle may naturally resemble each other; do not invent arbitrary differences merely to make a basic shape unusual. Use our own accepted Square and our own mathematical construction. The object silhouettes, linework, tabs, openings, spacing and other distinguishing solutions must be developed independently. Start our design decisions from the meaning of each icon and independently develop our own shape grammar.

The existing circular-corner measurements below describe the approved implementation baseline. They do not establish the future squircle language. No new curve formula, exponent, control-point recipe or replacement geometry is approved by this conceptual clarification. Preserve the current artwork and acceptance records until a later artwork request establishes the scope of a redesign.

## Base shape first; new-design stroke1.5 — 2026-10-28

The owner requested a base squircle study, then explicitly expanded it to three subject prototypes: **Folder, Camera and Square**. Review these together before extending the collection redesign. A rounded square and a squircle must read differently: the former has explicit straight sides joined by local circular fillets; the study develops its whole contour continuously toward its corners. Develop our own proportions. External screenshots clarify the distinction but are not shape templates.

**New-design base stroke is1.5 native units.** The owner explicitly scoped this to the shape study and future redesign work first. Do not change the existing collection's1.75 default, palette, Filled contours or morph weights as part of this study. Existing Camera remains the earlier1.75 draft; its shape is not the approved base grammar.

The standalone Lab shape study uses a native24×24 canvas, centered12,12, with visible bounds2..22 in both styles. The whole-contour trial is a mathematically constructed superellipse with an adjustable profile; its Balanced3.2 Square contour is now owner-accepted and leans more circular than the4-power reference; that acceptance is not a universal formula for semantic details. Outline centerlines are the inward normal offset of the Filled exterior by.75, rather than a scaled copy; export fitting error stays below.001 native units. Rounded-square and circle references use the same visible bounds and1.5 stroke for a fair comparison. The UI describes visual roundness; mathematical construction lives in this document and the Core design module.

This is one three-subject design-language study, not a request for six new production identities or for applying a frame to other icons. Keep it separate from the static catalog and approval counts. Square at Balanced and the scoped1.5 base are accepted; revised object drawings and any later production application remain subject to owner visual review. The study is authored in [Core](src/design/squircle-base.ts), promoted through the pinned adapter, and shown by the private local Lab. No runtime sibling-checkout imports or copied path implementations belong in Lab.

### Owner review: Balanced Square accepted; object tops rejected

On2026-10-28 the owner accepted the **Square base at Balanced (profile3.2, stroke1.5)**. Preserve its exact Outline/Filled geometry as the current shape reference. This approves that base contour, not every roundness setting, production enclosing frame, or a formula imposed on all object details.

Camera currently uses our own original silhouette at Core `310b780` with selective body-corner treatment; it remains a draft. Folder has moved beyond the rejected roof/cut-line upper trials: the owner accepted its Square-derived lower portion and clarified the upper construction with a sketch of overlapping squircle forms. Use our own Square curve language to build the large front body and smaller visible rear form. Original source geometry is a starting reference, not an immutable height/proportion requirement. Preserve accepted parts. The latest owner direction moves the focused three-icon design review to Figma first, as described below.

### Folder lower portion accepted; upper squircle flow still under review

The owner accepted the **lower portion of the cut-Square Folder at Balanced3.2 and1.5** from the `2580318` study snapshot. Preserve its retained lower Square curves and native1.5 construction in both styles during the upper revision. The acceptance regression protects X coordinates and relative Y coordinates of the starting point and first64 lower cubics. Uniform optical recentering is allowed; anisotropic scaling or changing the accepted lower curve is not. Acceptance of the lower shape does not freeze its absolute Y placement or a historical divider position. This is a specific accepted part, not a universal height/proportion rule for other subjects or approval of the complete Folder.

The owner found the upper portion too deliberately straight, then supplied a sketch clarifying **overlapping squircles**: a large front body and a smaller rear squircle peeking above it as the tab. Construct those independently authored forms and their visible overlap. The front body's upper curve is a layer boundary; do not model the concept as an arbitrary wavy tab-to-shelf line or freeze the previous straight divider. Use coherent curve joins, correct occlusion and safe1.5 offsets. Retain the recognizable folder, interior clearance and original linework. The complete upper silhouette and overall Folder still require owner visual review; Camera and the accepted Square remain unchanged by this revision.

### Part-by-part design judgment — owner clarification

The owner explicitly clarified that icons must **not pursue maximum squircle treatment at every corner**. Evaluate the artwork piece by piece. Balanced Square is a reference for the family, not a contour or mathematical profile to force onto every subject or subpart.

Identify the body, housing, tab, opening, concave join and small detail separately. A semantic object may be constructed from several meaningful squircle forms and other primitives, with deliberate overlap and occlusion, rather than deforming a single contour to express every feature. Use the family curve where it suits the part's meaning, proportions and available space. Keep level edges, circles and appropriately fitted local transitions where those produce clearer shapes or safer clearance. A tiny join need not duplicate a full-size body corner. Do not create bulges, warped silhouettes, oversized corners or awkward roofs merely to satisfy one formula. Record an intentional local exception and its reason; judge the complete icon at actual sizes for coherence and recognition.

This clarifies the whole-contour study rather than discarding the accepted Balanced Square. Camera currently uses its own original silhouette with selective body-corner treatment; Folder derives from our own Square by cutting its upper portion; its lower part is now accepted and its upper flow is being refined. Both use1.5 weight and allow subject-specific proportions. No collection-wide or unrelated redraw is authorized by this clarification.

### Proportion freedom and Folder from our own Square — latest owner clarification

Do not turn reference dimensions or a previous prototype into self-imposed design limits. Each subject may need its own width, height, aspect ratio, occupied area, tab, roof and internal placement. The accepted Square guides the family curve and visual character; it does not prescribe the height of Camera, Folder or every other icon. A shared language comes from coherent stroke, curve transitions, spacing and optical weight across a row of icons. It does not require equal bounding boxes or one formula for all subjects.

The owner's concrete Folder direction is to use **our independently authored Square as a body and cut away or lower the upper portion to form a folder top/tab**. Retain the useful side/lower curves directly where appropriate, rather than vertically scaling the whole Square or stretching the previous Folder to a fixed height. Design the new upper linework and joins ourselves. Let the resulting silhouette determine its natural height and then judge recognition, balance and actual-size readability. The Square reference itself stays unchanged; a derived Folder is a separate draft.

Common basic shapes are legitimate starting primitives. Reference images explain principles and point out a problem; they do not provide paths, traced silhouettes, sampled proportions, line style or detail arrangements to copy. A square looking similar to another square is not a reason to deform our base. Semantic objects and their distinguishing construction require our own decisions.

Numerical draft dimensions below describe an implementation snapshot, not a permanent approval or prohibition on redesign. Tests must protect native stroke, contour correspondence, clear openings, finite joins, primary margins and explicitly accepted artwork. Do not freeze an unapproved Camera/Folder height or every historical control point merely because it was used in a draft. A curve-only UI control may still keep semantic parts stable within the current construction; that local behavior test must not be presented as an immutable rule for future designs.

### Folder as overlapping squircles — owner sketch

Model the Folder as **two meaningful squircle forms seen in overlap**: the larger front panel/body and the smaller rear form visible above its upper-left portion. Use our own accepted Square curve language and independently chosen proportions; the owner's rough sketch explains the construction, not coordinates to trace. The front form occludes the covered rear edges. Its curved top expresses the layer boundary. Develop the body and rear form as pieces before resolving the visible combined silhouette.

Do not substitute a decorative waving single outline for the two forms. Do not insist on flat roofs/shelves or a predetermined object height. Preserve the accepted lower body curve; uniformly repositioning the completed drawing for optical balance is allowed. Camera and the standalone Square are outside this Folder revision.

The current independent trial uses the accepted Square's64 lower cubics and its actual upper-left side from angle0 through.4 (nine intervals), drawing that shared exterior once. A tangent-fitted cubic continues to the rear top at7.5,4.9; its handles use55% of the tangent-line intersection distances. The rear upper/right cap retains its native reference center7.5,8.1 and half-axes4.4/3.2, while the front cap uses half-axes10/3.5 about12,12. Fit the forms around the common edge rather than forcing a Boolean union of two immutable full primitives. Resolve the right overlap from the forms; the left is the shared Square curve. A uniform−1.45 Y recenter produces observed exterior boundsx2..22/y3.45..20.55; these are current construction measurements, not a new height rule. Rear geometry is authored in native coordinates before1.5 offset construction, so scaling a primitive does not scale its stroke.

The owner's latest correction is **one shared outer curve, with no inward neck** at the left overlap. The S-shaped connector trial is rejected. Continue the large body's own Square-derived upper-left curve directly from the accepted lower half, drawing that exterior only once. The front boundary lands on that same curve; the smaller rear upper/right cap is fitted around this common edge. Do not connect two offset left stems with an inward-returning bend or a decorative bridge. Rear proportions may change to fit the shared curve; their old center/width are not constraints. Preserve the accepted lower curve and native1.5 weight while allowing uniform optical recentering. Verify both actual stroke contact and the absence of a concave notch; a technically touching S-join does not meet this direction.

Outline must show only visible layer edges, without hidden rear strokes crossing the front. Keep the drawing transparent: do not mask occlusion with a hardcoded white or surface-colored patch. Filled needs the union of the visible forms with deliberate transparent counters or a clear layer seam; overlapping evenodd paths must not accidentally cancel the body. The old straight divider is replaced by the front layer's actual curved upper boundary. It branches at the common Square left point2,12 and uses a broad tangent fit into the front cap at angle4.2, preventing an inward-offset cusp or cap nub. The discarded S connector and its separate intersection solver must not be restored. The current Filled counter is a native1.5-wide curved strip following that boundary, with.75 end caps and endpoint X insets1.8/1.5 from the layer junctions to retain solid bridges. The Outline may retain a.75-radius connector at the right overlap intersection; the left must instead be the single shared Square-derived outer curve. Validate native contour matching there as well as on smooth curves. Verify the exterior styles against each other and inspect light/dark actual-size output.

### Current Folder/Simple owner edit and shallower seam — 2026-10-28

The owner reopened the first Folder design because its head was too large and the middle seam too strongly arched. The first scoped Simple trial reduced tab width to85% and protrusion to75%, preserving the lower body. The owner then edited Simple Outline directly and authorized: recheck smoothness, finish its Filled, then update Folder. **The latest live owner-edited Simple is now the shared exterior master for all four drawings.** Earlier Simple-only restrictions and the older large-head approval below are historical. Do not rerun an older proportion script over the owner's current shape.

The live source is preserved in `.artifacts/figma-study/folder-simple-owner-latest-outline.svg`. Preserve all thirteen owner anchors, the smaller head, updated lower/sloping right shoulder and native1.5 stroke. This polish changes only three control points: the two handles of the final upper-right cubic are `(21.104198412,9.158895806)` and `(20.9962,10.094133004)`, preserving its endpoints `(19.9273,8.21733)` and `(20.9962,11.3372)`; a negligible tangent discrepancy at the cap/neck join is removed by aligning that outgoing handle. The upper-right corner matches tangent and signed curvature to both retained neighbors; this is a local G2 check, not a whole-contour claim. Eleven complete cubics and every anchor remain identical to the owner source. Keep the head, lower curves and proportions rather than rounding the icon back to an earlier draft.

Simple Outline `16:2` is one closed editable exterior; Simple Filled `16:10` is the union of its exact fill and outlined1.5 stroke, completely solid. Folder Outline `16:25` uses the same exact exterior plus two editable middle cubics. Retain the former divider endpoints `(2.93823,11.6196)` / `(20.5856,11.6196)` and centerX11.5773, but reduce the center rise from approximately.886 to.35. Compress the existing divider's vertical deviations about endpointY11.6196, retaining its broad horizontal center tangent. Folder Filled is new native24×24 frame **`19:333`**, at x128,y64 in artwork parent `11:30`; its same solid exterior has a transparent1.5-wide round-ended seam cut from the last82% of the first divider cubic and first82% of the second. Preserve solid end bridges. No white overlay or surrounding frame is used. The old grouped Filled `16:53` is hidden as **Folder / Filled — previous larger head** for recovery. The independent white background contains only its background vector; do not parent artwork inside it or resize the constrained artwork parent.

Live exports verify identical Simple/Folder Outline exteriors, all owner anchors and eleven retained cubics unchanged exactly, target error below.000038, exterior offset error below.002361 across308 samples, and transparent seam offset error below.000656 across56 samples. Minimum sampled centerline radius is1.1282 above the.75 half-stroke. Evidence in `.artifacts/figma-study/`: `folder{,-simple}-owner-{outline,filled}-live.svg`, `folder-owner-final-authoring.json`, `folder-owner-final-verification.json`, `folder-simple-owner-polished-web.png`, and `folder-owner-shallow-seam-web.png`. Earlier large-head and first-balance sources remain recoverable. All four current revisions await owner visual review. Grid positions and accepted neighbors are retained; production Core artwork, adapter, Lab and morphs are unchanged.

### Folder Simple accepted exterior; Folder adds the seam — 2026-10-28

The owner approved the corrected live Figma exterior and named the outer-only identity **Folder Simple**. This approval includes the owner's edited tab and the scoped Square-language upper-left/upper-right corrections. That approval records the exterior before the subsequent narrow-head request. The latest shared exterior is the visible Folder Outline path inside Figma container `16:25`, duplicated directly into Simple Outline and used to construct both Filled exteriors; do not reconstruct it from earlier complete SVG scratch exports, which predate the owner's edits.

- **Folder Simple / Outline:** one closed exterior, native1.5 stroke, no middle divider.
- **Folder Simple / Filled:** the same visible exterior, completely solid black with no seam or interior counter. Figma container `16:10` receives an exact duplicate of the current Outline path, filled and united with its outlined stroke to retain the same visible boundary.
- **Folder / Outline:** the identical exterior plus one curved middle connecting edge. The owner repositioned and widened the divider across the body. Live divider `16:32` inside `16:25` now retains the owner's three anchors at approximately `(2.93823242,11.61964607)`, `(11.57733917,10.73358154)` and `(20.58564186,11.61964607)`. Polish changes only four handles: `(5.65,11.02)`, `(8.65,10.73358154)`, `(14.50467834,10.73358154)` and `(17.6,11.02)`. The central tangent is horizontal with matched handle lengths and matching signed curvature, removing the visible kink while retaining the broad shallow arch, native1.5 weight and endpoint locations. The exterior, Folder Simple and Filled drawings remain unchanged by this scoped edit. The previous high divider terminating at `(15,7.5)` is superseded. Review proof: `.artifacts/figma-study/folder-divider-polished-web.png`; numerical target check: `.artifacts/figma-study/folder-divider-polish-verification.json`. This polish awaits owner visual review.
- **Folder / Filled:** the identical solid exterior with an intentional inset transparent curved seam, retaining solid bridges at both ends. The current1.5-wide round-ended counter follows the owner-adjusted shallow middle divider, using the exact last82% of its first cubic and first82% of its second cubic. This trims each end away from the exterior while retaining the complete middle curve. Its outlined stroke is subtracted as a native Boolean. The earlier short/high counter is superseded; target curves are recorded in `.artifacts/figma-study/folder-filled-seam-target.json`. This is a deliberate solid-style interpretation, not a surface-colored overlay.

The semantic distinction and outer silhouette are owner-approved. The owner has now approved both Folder identities in both styles, including the seam. The current Camera continuation remains a draft and Square remains accepted. The latest four-variant screenshot is `.artifacts/figma-study/folder-latest-corner-all-variants-web.png`; earlier wide/narrow-head proofs are retained separately. These edits are in Figma web; they have not yet been promoted to Core artwork, the adapter or Lab. Export the exact current live vector before promotion, then run the appropriate source/contour and actual-size rendering checks. The historical Core construction below is not the current Figma master.

### Narrower Folder head — current scoped revision

The owner requested a narrower head for both Folder and Folder Simple, smooth linework, and matching Filled drawings. In live Folder Outline vector `16:30`, the five roof/tab anchors beginning at the former `(8.183784,3.8)` roof anchor and ending before the `(15,7.5)` shelf anchor were translated1 native unit left together with their handles. All other exterior anchors and handles, lower body, canvas and native1.5 stroke remain unchanged. Translating the tab section preserves its internal curve joins rather than scaling the whole object. The revised closed path is copied directly into Simple Outline; both Filled exteriors are the union of that exact path's black fill and outlined1.5 stroke. No independent redraw or anisotropic scale is used for the corresponding styles. Figma paste alignment introduces only tiny floating-point coordinate rounding.

Folder keeps the owner's polished shallow full-width Outline divider. Its Filled version now uses a trimmed transparent counter from that same curve, retaining bridges at both ends; Folder Simple Filled remains completely solid. Current proof: `.artifacts/figma-study/folder-narrow-head-web.png`. This is a Figma-only visual revision awaiting owner review. Core source promotion, adapter and Lab remain unchanged, as do Camera and Square.

### Owner-edited Simple head: preserve the squarer character

The owner revised **Folder Simple / Outline** directly in Figma vector `16:58`, then clarified that the preceding version was too round. Preserve the flatter roof, more upright short side, narrower tab and all current owner anchor positions. Polish means resolving local line continuity; it must not round the drawing back toward the earlier silhouette or force every part into a maximum-squircle profile. Automatic mirror-angle changes are not a safe substitute for examining the resulting contour. The failed automatic trial was superseded before delivery.

The current scoped edit changes six handles at three upper joins, retaining their anchors and native1.5 stroke. The roof-to-turn join uses incoming `(8.924748039,3.853382292)` and outgoing `(9.884748039,3.997382292)` about `(9.324748039,3.913382292)`. The turn uses incoming `(10.433223991,4.317620037)` and outgoing `(10.873223991,5.021620037)` about `(10.653223991,4.669620037)`. The concave shoulder uses incoming `(11.65,7.046486816)` and outgoing `(12.6,7.15851995)` about `(11.989189148,7.086486816)`. These establish aligned tangent directions at those joins and remove the shoulder control's previous Y overshoot beyond the shelf. This is a local tangent check, not a claim of whole-contour curvature continuity. Retain the owner's lower/side geometry. Other Folder styles and Camera/Square are unchanged by this Simple-Outline-only polish; do not propagate this trial before its visual review. Current proof: `.artifacts/figma-study/folder-simple-owner-head-polished-web.png`.

### Simple shoulder sharpness correction — latest review

The owner marked the concave head-to-shoulder transition as still too sharp. Preserve the squarer roof/short side; soften this local inward bend instead of rounding the entire head. The earlier tangent-only correction was insufficient because the bend was compressed into too little space for a1.5 stroke. In live Simple Outline vector `16:58`, move only the concave shoulder anchor from approximately `(11.989189,7.086487)` to `(12.65,7.207747459)`. The incoming cubic begins at retained `(11.340540886,6.113513470)`, with controls `(11.48,6.5)` and `(11.8,7.207747459)`. Its outgoing control becomes `(13.4,7.207747459)`, horizontally toward the retained shelf point. Align the preceding incoming handle at `(11.201081772,5.727026939)` to the new outgoing tangent. Keep other anchors, the flatter roof, native1.5 weight and lower body unchanged.

The incoming bend's sampled minimum centerline radius is approximately1.136 native units, above the.75 half-stroke, avoiding the offset cusp that produced the sharp shoulder tip. This is a local sampled curvature check, not an assertion that the whole contour is G2. The new shoulder target supersedes the old shoulder handle values in the preceding polish notes. Current proof is `.artifacts/figma-study/folder-simple-shoulder-softened-web.png`; numerical evidence is `.artifacts/figma-study/folder-simple-shoulder-checks.json`. This revision is limited to Simple Outline in Figma and awaits visual review; other styles have not been silently propagated.

### Approved head shared across both Folder identities — current delivery

The owner explicitly approved the softened, squarer Simple Outline head and requested that exact head on Folder and both Filled drawings. **Simple Outline vector `16:58` was the approved exterior master at this checkpoint**, including the owner's flatter roof/upright side and the widened concave shoulder described above. This supersedes the earlier Simple-only propagation restriction and earlier wide/narrow-head draft masters.

Folder Outline receives an exact native-vector duplicate of this master with its existing middle divider retained. Both Filled exteriors are the union of the same master's black interior and outlined native1.5 stroke; Simple Filled stays completely solid, while Folder Filled retains its current transparent middle seam. Use direct duplication and Boolean construction rather than separately redrawing or scaling the head. Native Outline vector origins are approximately `(2.765991211,3.768249512)` in their24px containers; the generated solid exterior origin is approximately `(2.015869141,3.018249512)`. The Folder Filled body uses the equivalent position in its parent coordinates, `(74.015869141,171.018249512)`, preserving native alignment with the72/168 icon placement. Figma stores minor coordinate rounding.

Verified in Figma web that all four variants share the same exterior, with Outline1.5, solid Simple Filled, and preserved Folder divider/counter. Current proof: `.artifacts/figma-study/folder-approved-head-all-variants-web.png`. The owner approved the head construction; this does not grant unrelated icon or motion approval. These are Figma edits only; exact complete-vector export and the later Core → adapter → Lab promotion remain separate work. Camera, Square and unrelated artwork are unchanged.

### Owner-adjusted Folder upper-right corner — current local polish

After sharing the approved head, the owner adjusted Folder Outline's upper-right corner to relate to its middle divider. Preserve this new local geometry and all owner anchors; do not restore the earlier universal corner fit or independently round the whole object. The current edit is limited to the visible exterior inside Figma container `16:25`. The shelf point is `(15.136752129,7.026510715)`, corner point `(20.018791199,8.481149673)` and side point `(21.018791199,10.981149673)`. Retain the owner's outgoing shelf handle `(17.234912872,7.215818405)`, incoming corner handle `(18.768791199,7.481099129)` and outgoing corner handle `(21.018798828,9.281196594)`.

Polish changes only two handle Y coordinates: the preceding shelf handle at X14.693755150 moves to Y6.986541073, matching the shelf's outgoing tangent; the incoming side handle at X21.018791199 moves to Y9.896805962, matching signed curvature through the two-cubic right turn within Figma coordinate-rounding tolerance. All anchor positions, the middle divider, lower body and native1.5 stroke remain unchanged. Check the local cubic targets and monotonicity rather than claiming whole-contour G2 continuity. Current proof: `.artifacts/figma-study/folder-owner-corner-polished-web.png`; numeric evidence: `.artifacts/figma-study/folder-owner-corner-checks.json`. The owner subsequently requested applying this latest corner to all four Folder/Simple Outline/Filled drawings. That propagation is complete: Simple Outline is an exact duplicate of the current Folder exterior, both Filled exteriors are the union of that same path’s black interior and outlined native1.5 stroke, Folder retains its divider/transparent seam, and Simple Filled remains solid. Earlier Simple-only or Folder-only propagation restrictions are superseded. The active Folder exterior inside container `16:25` is now the shared master; prior replaced vector IDs must not be used as live masters. Native origins remain approximately `(2.765991211,3.768249512)` for Outline and `(2.015869141,3.018249512)` for the solid exterior, allowing Figma coordinate rounding. Current four-variant proof: `.artifacts/figma-study/folder-latest-corner-all-variants-web.png`. These remain Figma edits; Core artwork, adapter, Lab, Camera and Square have not been altered by this propagation.

### Current review: Folder pair accepted; Camera continues the same language

The owner explicitly approved **Folder and Folder Simple in both Outline/Filled**, as shown in `folder-latest-corner-all-variants-web.png`, and requested Camera next using the same idea. Preserve those four Figma drawings. Earlier pending-Folder statements in the study history are superseded by this approval. This does not approve Camera or a new universal curve formula.

The new Camera draft is independently built part by part: a horizontally proportioned body with Square-language progressive side/lower corners, a low centered housing with a flat roof and two smooth transitions into the shoulders, the existing circular lens and indicator. This applies the accepted Folder principles of squarer proportions and relaxed local concave turns without copying the Folder tab onto a Camera or tracing external artwork. The body is symmetric about nativeX12; the main visible margins are2px left/right. Native stroke remains1.5. The complete silhouette's visible Y bounds are approximately3.6..20.4, an optical centering choice for this Camera draft rather than a new family height rule.

Editable Outline has17 body/housing cubic segments, plus a native circular lens at `(12,12.822746)`, radius3.24112, and indicator at `(17.88388062,9.13285542)`, radius.75. A housing transition is authored as an independent quintic and fitted to four cubic intervals; the body corner ratios derive from our own Balanced Square authoring fit, adapted separately to each semantic part. The accepted Square/Folder geometry itself is unchanged. Filled uses the analytical.75 outward normal offset of that same Outline body, fitted to cubic intervals with measured error below.000070 native units; its lens radius2.49112 and indicator radius.75 are transparent compound-path counters. Filled fitting segments are generated output, not the practical Outline drawing master. Source/parameters and native SVGs live in `.artifacts/figma-study/camera-folder-language-{authoring.json,outline.svg,filled.svg}`; the reproducible authoring script is `camera-folder-language-author.py` in that folder.

Checked finite closed geometry, tangent continuity through the authoring joins, shared Outline/Filled exterior construction, offset-fitting tolerance and minimum concave centerline radius above the.75 half-stroke. Both native24×24 drawings replace the prior Camera drafts in the plain Figma icon list at `(24,72)` and `(72,72)`, named **Camera / Outline** and **Camera / Filled**. The current proof is `.artifacts/figma-study/camera-folder-language-web.png`. Both Camera styles remain drafts for owner visual review. These are Figma study edits, not a promotion into production Core artwork, adapter or Lab; existing weights, morphs and other icon sources remain unchanged.

### Camera current owner-edited master — left-source symmetry

The current Camera Outline body is live Figma vector **`17:122`**. The owner rejected long diagonal and box-like head trials, then corrected the left profile directly. Their explicit correction is now: **use the current left contour as the only master; polish the left curve without moving its owner anchors, then reflect that exact same curve and every control handle to the right about nativeX12. Do not independently fit or preserve a different right profile.** The earlier independently polished left/right draft was rejected for asymmetry. Numerical smoothness does not grant owner visual approval.

The current seven left upper anchors are side `(2.75,11.449988)`, corner `(3.452837,7.221607)`, shoulder `(6.021660,6.043488)`, head points `(7.399670,5.748200)`, `(8.097298,4.881079)`, `(8.745963,4.037836)` and roof `(10.140476,3.725453)`. These owner anchors are retained. Handles between them are polished with a six-cubic interpolating fit, vertical side and horizontal roof tangents, continuous internal tangent/geometric curvature and sampled minimum radius approximately1.1307 native units, above the.75 half-stroke. The roof's plateau handles are leveled. The right anchors and handles are derived solely by `xRight = 24 - xLeft`, `yRight = yLeft`; no separate right fitting step is allowed. The upper-to-lower and upper-to-flat-roof joins are constrained by tangent direction, not a claim of whole-contour G2.

The earlier UI readback of **20 coordinate pairs was insufficient**: it checked the existence of coordinates but failed to establish which anchor/segment owned each handle. The owner again identified visible kinks. A complete live SVG export exposed reversed first/second controls in left upper cubics2,3,4 (zero-based). Their six handles are now assigned to the correct segments in place; all owner anchors, right/lower cubics and native1.5 stroke remain unchanged. Overlapping handles must be separated temporarily before selecting their counterpart, then restored to their intended target. Otherwise a click may select the handle just moved and silently undo the correction.

**Verify connectivity, not just a set of coordinates.** Export the live path and compare the ordered cubic controls and their anchor ownership against the intended construction. Check the actual incoming/outgoing tangent vectors at each join. The corrected live export matches the target upper cubics within.00001 native units, mirrored upper geometry within.00005 (SVG serialization precision), and internal tangent direction within.0013 degrees. Current evidence: `.artifacts/figma-study/camera-handle-ownership-fixed-live.svg`, `camera-handle-ownership-fix-verification.json` and `camera-handle-ownership-fixed-web.png`. The pre-fix live export is retained as `camera-live-before-handle-ownership-fix.svg`. `camera-left-master-mirror-target.json` remains the target construction. Earlier UI checks and screenshots are historical, not proof of correct connectivity or owner approval. The independently fitted `camera-owner-{left,right}-fair-fit-candidate.json` drawings must not be restored.

The owner subsequently approved the arched-roof Outline and explicitly requested matching Filled, as recorded below. Lower geometry, lens, Flash, native1.5 stroke and the approved Folder pair remain protected. Production Core artwork, adapter, Lab and morphs are outside this Figma-only revision.

**Latest owner roof edit and scoped polish:** the owner subsequently raised the middle of the roof into a shallow arch. Preserve that change rather than restoring the former horizontal plateau. Six cap/roof handles were adjusted, with every anchor and all other segments retained. Left cap controls are approximately `(8.947561,3.915336)` and `(9.248206,3.814607)`; the right cap reflects them aboutX12. The central arch uses controls near `(11.35,3.6046)` and `(12.65,3.6046)`, joining the unchanged roof anchors. The target matches tangent direction and geometric curvature at the adjoining cap/roof joins while retaining the previous tangent into the cap. The actual live SVG confirms target error below.00012 native units, join tangent error below.0031 degrees, unchanged anchors and unchanged other segments. Evidence: `.artifacts/figma-study/camera-arched-roof-polished-live.svg`, `camera-arched-roof-polish-target.json`, `camera-arched-roof-polish-verification.json` and `camera-arched-roof-polished-web.png`. This supersedes the old flat-roof target only in those six handles and awaits owner visual review; Filled and production remain unchanged.

### Camera Outline approved; matching Filled delivered — 2026-10-28

The owner approved the current Camera Outline and authorized deriving Filled from it. The approved master remains Outline frame `17:121`, body `17:122`, at native `(24,72)`. New Filled frame **`18:2`** at `(72,72)` is a direct duplicate of that24×24 frame. Its exterior is the union of the exact duplicated body's black interior and its outlined native1.5 stroke, rather than a separately drawn or scaled silhouette. Native Boolean **`18:9`** subtracts two black shapes as transparent counters: lens center `(12,12.741088867)`, radius approximately2.491088867 (the Outline lens's inner opening), and flash center `(18,8.75)`, radius.75. Read current live circles rather than an older placement record. The old Filled is hidden and named `Camera / Filled — previous draft` for recovery.

Live SVG exports verify575 exterior samples against the Outline body's.75 outward offset, with maximum deviation approximately.00195 native units from Figma's stroke outlining/Boolean approximation; no independent shape fitting was used. Both counters are transparent subpaths with black as the only opaque paint. Current evidence: `.artifacts/figma-study/camera-approved-shape-{outline,filled}-live.svg`, `camera-outline-filled-match-verification.json` and `camera-approved-outline-matching-filled-web.png`. Outline is owner-approved; the new Filled is delivered for visual review. This supersedes previous statements that Filled has not been propagated or that the current Outline is unapproved. Square, Folder/Simple, production Core artwork, adapter, Lab and morphs are unchanged.

### Camera Simple body, shared Camera housing and grid — latest owner direction

The owner requested **Camera Simple without a head**, then explicitly required its squircle top and bottom to match. Simple Outline `18:10` is a new eight-cubic rectangular body, exactly reflected left/right and top/bottom about the retained lens center `(12,12.741088867)`. Its native centerline bounds are x2.75..21.25/y5.832177734..19.65, with1.5 stroke. It adapts our Camera lower-quarter construction to this headless body, preserves the lens/flash placement and draws them as separate editable vectors. Simple Filled `18:15` uses the same exterior through native stroke outlining/union and transparent lens/flash subtraction. Live exports confirm top/bottom reflection within.000063 and exterior correspondence within.00060 native units. Evidence: `.artifacts/figma-study/camera-simple-{outline,filled}-live.svg`, `camera-simple-authoring.json`, `camera-simple-verification.json` and `camera-simple-outline-filled-web.png`. Both Simple drawings remain drafts.

The owner then directed **use Simple as Camera's base body and add a head**, followed by **make the head a bit smaller**. Current Camera Outline **`18:112`** and Filled **`18:117`** retain Simple's exact lower half, upper side corners, lens and flash; the center roof is replaced by the housing and fitted connecting shoulders. Head width and protrusion height are reduced to90% aboutX12 and the Simple roof height5.832177734, without scaling the1.5 stroke or body. The shoulders use curvature-controlled quintic construction fitted into four editable cubic intervals per side; right reflects left. The practical Outline has21 body cubics. Filled is the.75 outward normal offset of that exact centerline, with generated fitting segments and transparent circular counters. Native live exports confirm shared lower/corner coordinates within.00001 and exterior error below.000064 across4200 samples. Offset fitting error is below.000067 and minimum concave centerline radius approximately1.6267, safely above the.75 half-stroke. Evidence: `.artifacts/figma-study/camera-simple-base-housing-{outline,filled}.svg`, `camera-simple-base-housing-authoring.json`, `camera-shared-body-{outline,filled}-live.svg`, `camera-shared-body-verification.json` and `camera-simple-shared-body-small-head-web.png`. This new body/housing combination awaits owner review; earlier accepted Camera body and larger-head trials remain hidden for recovery. Do not confuse historical approval with approval of this new combination.

The owner requested a **plain icon grid list in Figma**. Its initial ten drawings used five rows: Square, Camera, Camera Simple, Folder, Folder Simple; Outline left and Filled right. That placement is historical; use the current four-column grid contract below. Square and the grouped Folder Filled retain their original bounding-box offsets within cells. Only placement changed for accepted Square/Folder artwork. The artwork parent retains its120×168 dimensions and unclipped behavior; do not resize it and scale its children. No explanatory canvas text or colors are added. Current positions and frame URLs are recorded in `.artifacts/figma-study/icon-grid-layout.json`. All work remains in the Figma study; production Core sources, adapter, Lab and morphs are unchanged.

### Trash Simple and Trash — current Figma study

The owner requested **Trash Simple**, then shortened its upper handle and required its terminal strokes to stop inside the lid without downward protrusion. Outline `18:120` and Filled `18:125` share our independently authored upright squircle body and shallow crowned lid. Use native24×24 and1.5 stroke. The handle centerline bounds are x9.35..14.65/y3.75..6; its round caps end at y6.75, inside the lid. Shortening the handle deliberately retains the existing body/lid positions rather than stretching the object to restore the former top margin. Visible top/bottom are now y3/22. The body adapts our own Camera Simple lower-quarter construction; do not take paths from another collection. Simple has no interior stripes. Filled is the union of the same body fill and outlined body/lid/handle strokes, with a transparent handle opening.

The owner then requested **Trash with two interior vertical marks**. Outline `18:145` and Filled `18:151` use that exact same exterior. Two round-ended1.5 marks are centered at x9.5/14.5 from y11.375 to16.375 after the owner shortened and repositioned the marks directly in Figma. Preserve this latest5-unit length. Filled uses transparent capsule counters at those same positions and thickness; never paint them white. Live Outline exports confirm identical shared body/handle/lid coordinates. These are drafts for owner visual review, not a production catalog replacement. Evidence: `.artifacts/figma-study/trash-{simple-,}{outline,filled}-live.svg`, `trash-study-verification.json` and `trash-simple-and-trash-web.png`.

The owner requested a wider grid with a white background, avoiding a long two-column stack. Before adding Calendar, the fourteen drawings used four columns: each identity remains an Outline/Filled pair, with Square and Camera in row1, Camera Simple and Folder in row2, Folder Simple and Trash Simple in row3, and Trash in row4. Calendar now occupies the second pair of row4, as described below. Native cells start at x24/56/96/128 and y24/64/104/144; raw Square and grouped Folder retain their native bounding offsets. A separate white176×192 background sits behind the list at the same global origin. The artwork parent remains120×168 and unclipped. Do not resize it: some children use Scale constraints and would deform. Change only individual placement or the independent background. Original drawing dimensions were restored and checked after a discarded parent-resize attempt. Current positions and URLs are in `icon-grid-layout.json`. No production Core artwork, adapter, Lab or morph changes are included.

### Calendar and an expandable review grid — current Figma study

The owner requested Calendar in the same design language, both Outline and Filled, then shortened the two binding marks and requested a slight upward arch in the header divider. Outline **`18:163`** and Filled **`18:169`** are independently authored24×24 study drawings with native1.5 stroke. The eight-cubic body adapts our own Camera Simple quarter ratios to center `(12,13)`, centerline bounds x2.75..21.25/y4.75..21.25. Do not force a circular fillet or an external icon silhouette onto this body. The two round-ended binding centerlines are x8/16 and y3.75..6.25. Their shortened height intentionally leaves visible top space3; body left/right and bottom space remain2.

The header is one editable cubic from `(3.15,9.25)` through `(8.2,8.7)` and `(15.8,8.7)` to `(20.85,9.25)`. Its center rises approximately.4125 above the endpoints. Six native.75-radius date marks use x8/12/16 and y12.75/16.75. Filled comes from that exact body fill plus native outlined body/binding strokes, united before subtracting transparent header/date counters. The header counter retains t.13...87 of the same divider curve and expands.75 along its normal, with round end caps and solid bridges to the exterior. It is not a white overlay. The six date counters have the same centers and radii as Outline's date marks. Native exported side/lower exterior samples stay within.000237 of the expected.75 Outline offset; all seven counters remain transparent. Evidence: `.artifacts/figma-study/calendar-{outline,filled}-live.svg`, `calendar-authoring.json`, `calendar-verification.json` and `calendar-outline-filled-web.png`. **The owner approved both Calendar styles on2026-10-28.** Preserve these exact drawings; this visual approval does not itself promote them to production.

At Calendar delivery, the review grid held **sixteen drawings in four columns and four rows**, with Calendar at native x96/128, y144. The white176×192 background had sufficient space for that pair. Lock extends it as described below. The owner permits extending the grid as more icons are added: preserve native drawing sizes and Outline/Filled pairing, append cells/rows, and expand only the independent white background when needed. Never enlarge the constrained artwork parent to create space. Do not add speculative icons or change accepted neighbors merely to fill a row. Current positions are in `icon-grid-layout.json`; Calendar-delivery evidence is `icon-grid-calendar-web.png`.

### Lock with a taller body and upright circular shackle — current Figma study

The owner requested Lock Outline/Filled, then raised the body and changed the shackle to a circular arch with upright stems before the curve. Outline **`18:194`** and Filled **`18:199`** use native24×24 and1.5 stroke. The independently adapted eight-cubic body retains our Camera Simple quarter ratios, center `(12,14.5)`, centerline bounds x2.75..21.25/y7.75..21.25. Its top is1.6 higher than the initial squat trial, with the bottom unchanged. A semantic circular shackle is intentional here: do not force the body's squircle profile onto it. Its semicircle has center `(12,6.75)` and radius4, with two editable cubic quarters. Vertical stems at x8/16 run from the body's actual upper centerline y7.903633718 to the circle start y6.75. Both endpoints land on the body curve so the round terminal caps merge into its stroke without protruding into the interior. The centered key-slot mark is a round-ended1.5 stroke at x12, y13..16.

Filled is a native union of the body fill and outlined body/shackle strokes, retaining the shackle opening. Subtract a matching transparent capsule for the key slot; do not add a surrounding frame or white overlay. Live exports confirm the body-side/lower exterior offset within.000514 across150 samples, the outer shackle radius within.001237 across24 samples, and the terminal/body intersections within.000004 native units. The key-slot counter is centered `(12,14.5)` with half-size `.75,2.25`. These are verification tolerances, not automatic visual approval. Evidence: `.artifacts/figma-study/lock-{outline,filled}-live.svg`, `lock-authoring.json`, `lock-verification.json` and `lock-outline-filled-web.png`. **The owner approved both Lock styles on2026-10-28 before requesting Bell.** Preserve them; Calendar and all prior neighbors remain unchanged. No production promotion is included.

At Lock delivery, the grid contained **eighteen drawings**, with Lock at x24/56, y184 in row5. Only the independent white background was extended to176×232; the constrained artwork parent stays120×168 and unclipped. Never resize or scale that parent to fit more rows. When pasting SVG into an existing icon container, zoom to that native frame first and confirm the imported frame has local0,0 and24×24 before ungrouping. Figma may otherwise place a paste into a different frame under the viewport center. Keep imported semantic parts inside the intended icon container. Lock-delivery grid proof is `icon-grid-lock-web.png`; current placement is recorded in `icon-grid-layout.json`. No production Core artwork, adapter, Lab or morph is changed by this Figma study.

### Bell from the owner's live left-side edit — current Figma study

Bell Outline **`18:229`** and Filled **`18:234`** remain native24×24 with1.5 stroke. After reviewing successive narrower-shell and compact-rim drafts, the owner directly edited the left shell twice. **The second live owner edit is the current construction master.** Retrieve current live geometry before another revision; older authoring scripts must not overwrite it. The latest source is `.artifacts/figma-study/bell-owner-second-edit-outline.svg`. Its twelve-cubic shell starts at approximately `(12.0001,4.5)`; preserve the left six cubics, including all anchors and handles, and construct the right six as their reversed reflection about that live center axis. The owner specifically requested the right side to match this new left edit. Do not substitute a prior curvature fit or silently polish away the owner's latest silhouette. This mirror-only revision is not a claim that every owner-side join is mathematically G2.

The owner removed the top crown/stem on2026-10-29 from Bell and Bell Ring. Preserve the remaining Outline shell and the separate lower elliptical half-arc clapper centered `(12,20.25)`, radii2.25/1. Filled retains the shell exterior and solid clapper; only the tiny top span formerly hidden by the merged stem is newly exposed. Keep the.5 visible transparent component gap. Current actual exports80/81 and focused verification are under `.artifacts/new-icon-batch/bag-bell-refine/`; do not restore the crown from older authoring files. Opaque paint remains black only, with no white overlay or added frame.

Before crown removal, the exported pair verified left-side preservation within.00005 native units, reflection within.00014 (Figma rounding), main exterior half-stroke offset within.002081 across330 samples and lower clapper offset within.000690 across76 samples. The historical main bounds included the crown atx3.969..20.032/y2..19; the current crown-free shell starts at3.75. Clapper y19.5..22 is retained. Sampled minimum shell curvature radius is1.4357. The maximum measured tangent-direction mismatch in the unchanged owner source is about1.817 degrees; these diagnostics do not grant visual approval. Historical evidence: `bell-{outline,filled}-live.svg`, `bell-authoring.json`, `bell-verification.json`, and `bell-owner-second-mirrored-web.png` in `.artifacts/figma-study/`. Earlier sources and the `before-compact-rim-bell-*` artifacts remain recoverable.

Bell remains a draft awaiting owner visual review. The grid has **twenty drawings in four columns and five rows**, Bell at x96/128, y184 beside Lock, with the existing176×232 independent white background. Preserve the constrained artwork parent and accepted neighbors. No production exports, adapter, Lab or morph promotion is included.

### Home variants — current Figma study, 2026-10-28

The owner stopped Home work and moved to Heart, then removed Home Eaves from the grid. Preserve the remaining three current pairs. The earlier mixed narrowed-body/floating-mark trial and tapered-door trial are superseded; do not restore them or continue Home artwork without another request.

**Home** (`20:126`/`20:131`, x96/128,y304) restores the original full-width outer body. Retain the original Home Door's ten exterior cubics, replace its doorway with the straight baseline cubic from(15.5,21.25) to(8.5,21.25), and retain native1.5 stroke. The closed shell therefore has eleven cubics. Its floating mark is centered x12, centerline y15..18 with round caps; Filled uses the identical transparent capsule. Visible body bounds are2..22 on both axes; mark clearance above the inner base is1.75. Source: `home-authoring.json`, `home-{outline,filled}-live.svg`; check: `verify-home.py`; proof: `home-original-body-mark-web.png`.

**Home Door** (`20:164`/`20:170`, x24/56,y344) preserves the original sixteen-cubic shell and integrated open arched doorway exactly. Source: `home-door-authoring.json`, `home-door-{outline,filled}-live.svg`; recovery: `home-before-closed-base-*`; check: `verify-home-door.py`.

**Home Door Closed** (`20:197`/`20:203`, x96/128,y344) preserves all sixteen original shell/doorway cubics and adds a native1.5 round-ended floor from(8.5,21.25) to(15.5,21.25). Filled unites the same floor with the original solid silhouette. Source: `home-door-closed-authoring.json`, matching live exports and `verify-home-door-closed.py`; proof: `home-door-closed-web.png`.

**Home Eaves — removed by the owner, recovery history only.** Former frames `20:226`/`20:231`, x24/56,y384, replaced the tapered trial before their removal. Do not recreate or use this as a current family reference. Historical construction: Uniformly fit the original sixteen-cubic Home Door by `(x,y) → (12+.9*(x−12),12+.9*(y−12))`, keeping the stroke1.5. This reserves overhang space without tapering the body or deforming its base. Right roof branch follows the existing tangent from(18.595632,8.24628) to(21.25,10.8534825271); mirror it aboutX12. Both branches have round caps. Filled unites those same parts. Visible bounds are x2..22/y2.9248..21.0752. Source: `home-eaves-authoring.json`, matching live exports and `verify-home-eaves.py`; proof: `home-eaves-original-base-web.png`.

All artifacts above live in `.artifacts/figma-study/`. Checks protect current construction and matching styles; they do not grant visual approval. Earlier connected marks, narrowed shells and tapered-door artifacts remain historical recovery sources. No enclosing frame or production promotion is included.

### Heart — local notch refinement, 2026-10-28

The new Heart pair is `20:265`/`20:270`, x96/128,y384, native24×24 with1.5 base stroke. Independently authored lobes and rounded lower tip use eight centerline cubics mirrored aboutX12. The owner first requested a sharper upper V, then slight rounding of its inner Outline tip, and finally slight rounding of the visible exterior notch. Preserve this latest local refinement rather than restoring the initial broad U-shaped top or globally rounding the Heart.

Keep all eight centerline cubics unchanged. The round stroke join softens the inward Outline tip. A small tangent-fit cubic replaces only the exterior notch tip between(11.7777129744,4.8722457270) and its mirror; handles are(11.9259043248,5.0617868151)/(12.0740956752,5.0617868151). This raises the deepest exterior point by approximately.147 native units, from y5.16113 to5.0144. Union this local patch with the expanded Outline and the solid Filled so both have exactly the same exterior. The Outline remains a transparent compound path, with its previous inner counter preserved; this tiny owner-requested local join is a deliberate exception to the regular offset, not a new weight or universal corner recipe. All other exterior segments, lobes, lower tip and bounds x2..22/y2.75..21 stay unchanged.

Current sources: `.artifacts/figma-study/heart-authoring.json`, `heart-outline.svg`, `heart-filled-parts.svg`, and `heart-{outline,filled}-live.svg`. `verify-heart.py` and `heart-verification.json` verify native size, identical style exteriors, all fourteen complete exterior segments outside the notch retained, all eight source centerline cubics retained, and local export fitting error below.000413. Evidence: `heart-lightly-softened-v-web.png`. Earlier rounded-top and sharp-V exports remain recovery history. **The owner approved both Heart styles on2026-10-28 after the local notch refinement.** No production Core, adapter, Lab or morph change is included.

**Current grid:** thirty-eight drawings, four columns/ten row positions, independent white background `18:160` at176×432. The owner subsequently removed Home Eaves; row10 now contains Heart in the right pair and a vacant left pair. The120×168 artwork parent `11:30` stays unclipped and unchanged. `icon-grid-layout.json` and `icon-grid-settings.json` record this layout; dated counts in older study notes are historical.

### Preserve the squircle body; attach the downward tail locally — latest correction

The owner rejected the `chat-bubble-center-flow-*` trial: reshaping the entire lower body to flow into a tail loses the squircle language and creates unnecessary redesign. **Start with the existing independently authored squircle body, compare it against the other current studies, then attach the semantic feature only where needed. Do not pull the whole body toward the feature.** When asked to polish a local curve, preserve the approved family body and unchanged parts; do not improvise a new silhouette or present a mathematically smooth curve as an adequate visual review.

Current Compact frames remain `20:2`/`20:5`. The replacement uses the original compact body: both complete lower side-to-corner cubics and all four upper cubics are unchanged. Its two original bottom cubics are retained exactly up to the central tail attachment by De Casteljau subdivision at t.6441148086031543. The right attachment is(15.2,18.1847441176), mirrored left about x12. Fit only the small central connector and a native1.1-radius rounded tip about(12,19.5), with the downward centerline tip(12,20.6). The complete drawing has twelve editable cubics and native1.5 stroke. This is a squircle body with a local downward tail; it is not a globally tapered base. Filled is the exact closed interior united with its outlined stroke. The same body-preservation rule now applies to Slant as specified below; left-edge and mirrored Right identities stay unchanged.

Current editable source and evidence under `.artifacts/figma-study/`: `chat-bubble-center-squircle-authoring.json`, `author-chat-bubble-center-squircle.py`, `chat-bubble-center-squircle-{outline,filled}-live.svg`, `chat-bubble-center-squircle-verification.json`, and `chat-bubble-center-squircle-web.png`. The pre-edit live pair is retained as `chat-bubble-center-before-squircle-{outline,filled}-live.svg`; the rejected flow trial is not a current master. Live exports verify target error below.000049, sampled Filled exterior offset error below.001231, minimum sampled centerline radius.9533 above.75, tangent mismatch below.00185 degrees, and no sampled self-intersection. These are construction checks, not owner visual approval or a whole-contour G2 claim. The numerical snapshot below predates this correction wherever it says Compact remains unchanged. No production promotion, unrelated icon revision, grid layout change or stroke change is implied.

### Chat Bubble directions and local slanted tail — current, 2026-10-28

The owner clarified that “the right side” means **a horizontal Flip of the whole first bubble**, not an inward deformation of its right wall. Both inward-wall experiments are rejected and reverted. Preserve the original left-edge silhouette from `chat-bubble-left-tail-authoring.json`; its live Outline/Filled frames remain `19:344`/`19:347`, x24/56,y224. A separate **Chat Bubble Right** pair (`20:81`/`20:74`, x96/128,y264) is a native horizontal Flip of those restored drawings. Each retains ten cubics and native1.5 weight. Do not use inward-wall experiments as masters. Their current live exports are `chat-bubble-restored-left-{outline,filled}-live.svg` and `chat-bubble-right-flip-{outline,filled}-live.svg`.

**Chat Bubble Compact** (`20:2`/`20:5`, x96/128,y224) uses the centered downward-tail construction above. **Chat Bubble Slant** (`20:49`/`20:55`, x24/56,y264) keeps a bottom-center tail whose tip leans left, as explicitly confirmed by the owner. The latest request applies the same squircle-body correction to this pair: retain the Compact body's complete lower side-to-corner cubics and all four upper cubics, trim only the original bottom curves where the local tail attaches, then fit the two connectors to the existing Slant tip. The right trimmed bottom curve is identical to Compact, ending at(15.2,18.1847441176); the left bottom curve is trimmed at(7.7,18.0739620400). Preserve both previous tip arc cubics exactly, radius.9 about(10,20.3). Do not scale the body or change the tip direction to fix an attachment. The drawing remains twelve editable cubics with1.5 stroke. Filled is the exact closed interior united with its outlined stroke, without a dash, frame or white overlay.

Current Slant sources and evidence under `.artifacts/figma-study/`: `chat-bubble-slant-squircle-authoring.json`, `author-chat-bubble-slant-squircle.py`, `chat-bubble-slant-squircle-{outline,filled}-live.svg`, `verify-chat-bubble-slant-squircle.py`, `chat-bubble-slant-squircle-verification.json`, and `chat-bubble-slant-squircle-web.png`. The older `chat-bubble-slant-wider-*` artifacts are recovery references, superseded for the body and connectors; they remain the source of the unchanged tip arcs. Live exports verify native24×24, target coordinate error below.000047, sampled Filled exterior offset error below.000575, minimum sampled centerline radius.8980 above the.75 half-stroke, join tangent mismatch below.00185 degrees and no sampled self-intersection. Exact authoring comparisons verify the retained body segments and tip arcs. These checks do not establish whole-contour G2 continuity or owner visual approval.

The owner then requested the right-leaning counterpart. **Chat Bubble Slant Right** is a native horizontal Flip of the current Slant squircle pair, preserving every curve, tip, proportion and native1.5 stroke; do not independently redraw its tail. New native24×24 frames are `20:119`/`20:121`, x24/56,y304. Current exports and evidence are `chat-bubble-slant-right-{outline,filled}-live.svg`, `chat-bubble-slant-right-authoring.json`, `verify-chat-bubble-slant-right.py`, `chat-bubble-slant-right-verification.json`, and `chat-bubble-slant-right-web.png`. Exported Outline and Filled mirror-coordinate errors are below.000051 native units. This verifies construction parity, not owner visual approval.

The plain white background is now an independent176×352 frame, with the120×168 artwork parent unclipped and unchanged. At that stage the grid had36 drawings in four columns/nine rows: Slant Right and Home occupied row8; Home Door and Home Door Closed occupied row9, with176×392 background. The current Home/Heart section above supersedes that historical count. Production Core artwork, adapter, Lab and morphs remain unchanged. Direction confirmation does not approve the complete drawings; retain draft status until the owner passes them.

### Chat Bubble tail placement — current scoped revision, 2026-10-28

The owner rejected the triangular tail treatment and requested **two distinct positions**: move the newer Compact tail to the exact horizontal center, and rebuild the older Chat Bubble with the same clean construction but have its tail continue directly from the far-left wall. This supersedes the two earlier Chat Bubble construction snapshots below. Do not restore the owner-edited jagged old tail or the first offset Compact tail. All four existing frame IDs, names, grid positions and native24×24 dimensions are retained. The unmodified live drawings immediately before this revision are recoverable as `.artifacts/figma-study/chat-bubble-{left,center}-before-tail-position-{outline,filled}-live.svg`.

Both use our own compact squircle body proportions and native1.5 stroke. The centered version in Compact frames `20:2`/`20:5` has a symmetric downward tail centered at x12. Its right root is(16.5,18.25); four editable tail cubics join through a horizontal tip tangent at(12,21), mirrored exactly to the left. Twelve cubics form the complete closed silhouette. The left-edge version in Chat Bubble frames `19:344`/`19:347` replaces the previous lower-left contour with a rounded tail that rises directly into the wall at x2.75. Its tip turns through a native1.1-radius quarter curve about(3.85,19.55). Ten cubics form the complete closed silhouette. Neither uses an overlapping triangle, a separate tail component or an interior dash. Preserve tangent flow and adequate curvature radius around each fitted tail rather than forcing full-body squircle proportions into a small semantic feature.

Filled in each pair is the union of the exact closed interior and its outlined1.5 stroke, yielding a single opaque black exterior and transparency outside. Live exports verify target coordinate error below.000047; maximum sampled Filled offset errors below.000449 for center and.000520 for left; sampled minimum centerline radii1.0776 and1.0912, both above the.75 half-stroke; maximum tangent mismatch.00185 degrees; and no sampled self-intersection. These checks do not imply whole-contour G2 or owner visual approval. Both retain visible x2..22/y2 top bounds; bottom is21.75 centered and21.4004 left-edge. Evidence and editable construction are in `chat-bubble-{center,left}-tail-authoring.json`, `chat-bubble-{center,left}-tail-position-{outline,filled}-live.svg`, `chat-bubble-{center,left}-tail-position-verification.json`, `author-chat-bubble-tail-positions.py`, and `chat-bubble-tail-positions-web.png` under `.artifacts/figma-study/`. These remain Figma drafts; unrelated artwork, the24-drawing grid, production Core, adapter, Lab and morphs are unchanged.

### Chat Bubble — prior owner-edited upright tail and fuller lower body, 2026-10-28

The owner requested Chat Bubble to test the semantic tail before the later design-language synthesis. The initial eleven-cubic body adapted **our own Camera Simple** quarter ratios and used a short lower-left tail. That first shape is historical: the owner subsequently revised its lower outline and made the tail more upright, with two successive live edits. **Read the latest live owner drawing before further revisions; do not restore the first diagonal-tail authoring script.** Current native24×24 frames remain Outline **`19:344`** and Filled **`19:347`**, at x24/56,y224 in row6 of artwork parent `11:30`. Stroke stays1.5, with no added frame or interior marks.

The latest owner baseline is `.artifacts/figma-study/chat-bubble-owner-latest-outline.svg`; the preceding edit is retained separately as `chat-bubble-owner-edit-outline.svg`. Polish retains the owner's upright tail, body proportions and all four upper cubics exactly. Align the owner-edited lower tangent joins. The previously pinched tail tip is resolved by an independently fitted native1-radius arc in two cubic intervals, connected into the owner root and tip positions. A quintic transition relaxing the tip into the retained left-side anchor is fitted to four editable cubics. Body and tail remain one closed continuous silhouette. This uses sixteen practical cubic segments, with five additional tail anchors relative to the first owner drawing; it is not dense export sampling or a triangle overlay. The owner then requested a slightly fuller bottom: lower the middle body and tail root by.4 native units, blend the lower-right shoulder by.15/.25, and retain the roof, tail tip, side anchors and1.5 stroke. This body-only fullness change does not thicken the stroke or scale the icon.

Filled is the exact revised closed interior united with its native outlined stroke, black only with transparency outside. Live exports verify a single closed silhouette in both styles, all four upper cubics unchanged exactly, target coordinate error below.000053, exterior offset error below.001049 across234 samples, no sampled self-intersection, maximum authoring tangent mismatch below.0017 degrees and minimum sampled centerline radius.9778 above the.75 half-stroke. Local curvature fitting is approximate at the quintic-to-cubic transition; do not claim the whole contour is G2. The owner's asymmetric side edit and tail are retained: current Filled bounds are approximately x1.79883..22/y2.96289..21.94932. Do not rescale or recenter this owner-edited draft merely to restore the earlier2px/balanced margins without a scoped review.

Current evidence in `.artifacts/figma-study/`: `chat-bubble-owner-polished-{outline,filled}-live.svg`, `chat-bubble-owner-polished-authoring.json`, `chat-bubble-owner-polish-verification.json` and `chat-bubble-owner-fuller-bottom-web.png`. Earlier `chat-bubble-*` initial-trial artifacts remain recoverable. The pair is a draft awaiting owner visual review; checks are not approval. The grid remains twenty-two drawings in four columns/six rows, with independent176×272 white background and unchanged120×168 unclipped artwork parent. Other icons, production Core artwork, adapter, Lab and morphs are unchanged. Do not infer a Home/Heart or six-icon-batch request from this focused study.

### Chat Bubble Compact — prior separate short-tail study, 2026-10-28

The owner supplied a compact speech-bubble reference and requested another identity without its interior dash. The reference supplies semantic direction only: do not trace its contours or extract a proportion recipe. Preserve the existing owner-edited Chat Bubble. The new independently authored **Chat Bubble Compact / Outline** (`20:2`) and **Chat Bubble Compact / Filled** (`20:5`) are native24×24 at x96/128,y224 in artwork parent `11:30`. There are no interior marks or added frame. Both remain drafts pending owner visual review.

Adapt our own Camera Simple quarter ratios to a body with center(12,10.5), centerline half-width9.25 and half-height7.75. Fit a short lower-left tail into the continuous boundary, with a native.9-radius tip centered at(8,20.3). Twelve deliberate editable cubics form the closed contour. Keep the native1.5 Outline stroke. Filled unites the exact closed interior with the outlined stroke, giving one solid black silhouette with transparency outside. It contains no dash or painted background.

Current exports verify target coordinate error below.000047, maximum sampled Filled exterior offset error below.000777 over207 samples, minimum sampled centerline radius.898 above the.75 half-stroke, maximum tangent mismatch.00185 degrees, and no sampled self-intersection. These are local numerical checks, not visual approval or a whole-contour G2 claim. Visible Filled bounds are approximately x2..22/y2..21.94976. Evidence: `.artifacts/figma-study/chat-bubble-compact-{outline,filled}-live.svg`, `chat-bubble-compact-authoring.json`, `chat-bubble-compact-verification.json`, `chat-bubble-compact-web.png`, and `chat-bubble-compact-grid-web.png`. The grid now holds24 drawings in four columns/six rows; its independent176×272 white background and120×168 unclipped artwork parent remain unchanged. No production artwork, adapter, Lab or morph promotion is implied.

### Figma design workspace — original editable studies

**Latest editing direction:** provide a plain black-and-white icon list without explanatory canvas text or colored cards. The owner edits vectors directly, so editable authoring paths must have a small, deliberate set of anchors; do not hand over dense export-fitting samples as a practical drawing master. Keep exact Core artwork as a recoverable reference and do not silently promote an editable approximation. Figma is an editing tool, not a substitute for independently drafting a coherent silhouette.

**Latest upper-right correction:** after reviewing the other corners, the owner authorized smoothing the upper-right joint. Live vector `16:8` retains all anchor positions, the accepted lower contour, the new upper-left fit and the owner's tab shape. Only four upper-right handles changed. The target cubics are `(15,7.5) → (17,7.5) → (18.75,7.5) → (20,8.5)` and `(20,8.5) → (21,9.3) → (21,10.196) → (21,11)`, with native1.5 stroke. Their common corner has continuous tangent and curvature; X/Y remain monotone and the local endpoints have zero curvature. These are local corner checks, not a claim that every neighboring curve in the full drawing is G2. Figma stores small floating-point rounding. The target and checks are recorded in `.artifacts/figma-study/folder-upper-right-verification.json`; the current visual reference is `.artifacts/figma-study/folder-upper-right-web.png`. No anchors or unrelated artwork were changed. The owner subsequently approved this exterior as Folder Simple; see the current semantic contract above.

**Latest upper-left correction:** the owner explicitly requested the Square curve language at this one Folder corner while retaining their edited silhouette. Live vector `16:8` was edited in place, with no replacement of the other live segments. The left endpoint remains approximately2.750012,10.549997 and the roof endpoint8.183784,3.8. Only the intermediate corner anchor and four handles changed. The two-cubic authoring fit derives its diagonal and edge-handle ratios from our accepted Balanced Square quarter, constrains controls to prevent overshoot, and adapts geometry to these fixed endpoints while preserving native1.5 stroke. Its target has zero endpoint curvature, continuous tangent/curvature at the internal corner join, and monotone X/Y; Figma stores coordinates with small floating-point rounding. The target curves and checks are recorded in `.artifacts/figma-study/folder-square-corner-verification.json`; the visual check is `.artifacts/figma-study/folder-square-corner-web.png`. This is an editable fit, not an assertion of exact identity to the dense Square export. The tab, lower body, right edge, other icons and total anchor count remain unchanged by this scoped correction. Earlier complete SVG artifacts predate the owner's latest edits and must not overwrite the live vector. Retrieve the current complete vector before a later Core promotion. The owner subsequently approved the exterior as Folder Simple.

The accepted **Folder Simple** master is **outer boundary only**, with no middle divider. The owner's sketch communicates a broad upper-left tab flowing into the body; its accidental skew is not a shape requirement. Draft balanced linework independently. The owner now explicitly prefers **Figma web**. The current native24×24,1.5-stroke draft container is `16:2` (**Folder Simple / Outline**) inside the simple editing list `11:30`; its visible corrected artwork is `16:6` (**Folder - even roof**) with13 cubic segments. The owner rejected the earlier sharp tab joints, so the upper transition began as a five-segment spline with continuous first and second derivatives internally and horizontal endpoint tangents. The owner then rejected a wave along the top roof. One roof control handle is now constrained to the starting roof height, eliminating its overshoot and keeping the roof monotone while retaining the tangent direction into the next segment. The remaining transition segments are unchanged. Do not describe the corrected first internal join as C2; its tangent direction is continuous, while the monotone roof takes priority over the previous unconstrained spline fit. The owner's six lower/left segments and two right-side segments remain unchanged. The previous11-segment draft `11:59` is hidden for recovery; it changed only three upper control handles and did not resolve the owner's visual objection. The owner's exact edit remains in hidden `11:56` (**Folder - your edit**) and `.artifacts/figma-study/folder-owner-edited.svg`. Snap to pixel grid and Snap to geometry were explicitly disabled in both the desktop client and web client at the owner's request; these settings did not automatically carry between clients. Dense original masters `4:5` and the prior divider drawing remain hidden for recovery. The owner has now approved this exterior as Folder Simple. Its solid counterpart and the separate Folder-with-seam drafts follow the current semantic contract above.

**Current owner priority:** work on only Square, Camera and Folder in Figma first, after the owner rejected the current object designs. This supersedes the earlier instruction to finish Lab prototypes before moving to Figma. Use this focused editable workspace for visual revision; do not expand the collection or continue speculative Lab geometry trials before resolving these three. Both Folder identities are now accepted; the new Camera continuation remains a draft, and the accepted Square reference remains protected.

The owner asked to use Figma for direct shape design. The working [Shape & Icon Studies file](https://www.figma.com/design/5H3BjvQHvoTlkqp73YNx17?node-id=4-26) contains original editable24×24 Square, Camera and Folder masters in Outline/Filled, with linked enlarged comparison instances. The accepted Balanced Square is a locked reference. Camera housing and Folder tab remain separately editable draft parts. Visible Outline strokes stay at1.5 native units; an enlarged preview is not a new stroke specification.

Use Figma to explore and review the design, with the accepted Square as a family reference and the part-by-part judgment above. Do not copy external artwork or force every detail into the same curve. This file is an explicit snapshot of the Core study, not automatic two-way synchronization. After an owner-approved edit, translate the accepted vector construction back into Core, record its rationale and review status, verify it, then promote through the pinned Svelte adapter to the standalone Lab. Core remains the source for shipped artwork. Lab remains the check for actual16/20/24/48px rendering, native margins, weights, style contours and application behavior. A Figma review does not bypass those checks or approve unrelated production icons.

The active page is `0:1`, named **01 — Three icons**, with comparison board `4:26` and24px master area `4:5`. The current editable Camera/Folder artwork is a snapshot of Core `2c45b56`; previous master artwork is hidden and retained for recovery. Original SVG paths were imported as native vectors; Outline semantic parts remain separately editable and Filled counters remain transparent compound paths. Keep linked comparison instances and native dimensions intact when editing. Importing a draft does not constitute a redesign or visual approval. The handoff preview is `.artifacts/figma-study/three-icons-current.png`.

### Shared prototype grammar: Square, Camera and Folder

Square remains the exact owner-accepted Balanced whole-contour base. Camera and Folder are **semantic object drawings**, not stretched copies of that square. The earlier anisotropic-superellipse bodies, additive bumps and subsequent low-roof adjustments are rejected study history. Do not use those silhouettes as the starting point again.

Camera currently starts from the project's own original silhouette at Core `310b780`, with selective main-body corner transitions. Its dimensions are a draft, not a height constraint. Folder now follows the owner's cut-Square direction above. Retain meaningful straight sections, housing, tabs and clear detail placement where appropriate; do not force the same mathematical contour onto every semantic part. The controls may compare curve character across subjects while semantic subparts stay stable within each current design. All construction is authored independently from our own sources.

Camera's current experimental main-body corner is a quintic with collinear endpoint controls, zero curvature at adjoining straight sections and coefficient `k = .26 + .035 × (exponent − 2)`; Balanced3.2 uses.302. Its original housing stays stable within this curve-only control. These are current draft choices, not permanent height/proportion constraints or a universal corner recipe.

Folder retains **our own Square's accepted lower half**, with its native curve shape unchanged. Build the upper front panel and smaller rear squircle as separate meaningful forms, resolve which edges remain visible, then construct the combined transparent drawing. The earlier cut-only levels and−1.9 Y shift are historical draft values. They do not constrain the new front/rear proportions or optical placement. A uniform Y recenter is allowed; the accepted lower shape must not be squashed or refit.

Use1.5 native stroke and primary visiblex2..22 margins. Camera is built Outline-first with a native.75 outward normal offset for Filled. Folder's visible combined exterior is built from our own forms, with its Outline body.75 inward along the native normal and visible front-layer edges resolved separately. Preserve transparent compound-path counters and finite, non-cusping joins across profiles2..5. Retained Square cubic intervals stay aligned to its original sampling grid. Camera remains unchanged in this Folder-only revision; its lens/indicator keep the currently recorded study construction.

The previous cut-only Folder placed its divider at nativey10.3 with a1.5-high inset rounded Filled slot. That is a historical draft measurement; the overlapping-form model now determines the visible front layer boundary and Filled seam. It is intentionally inset rather than subtracting the entire full-width Outline divider and splitting the body. Current cut heights, divider position and slot span describe the draft; update them deliberately when the design changes rather than treating historical values as immutable. Tests verify retained Square lower geometry, stroke/contour correspondence, counter clearance, finite joins and the agreed primary margins. They must not lock the rejected Folder's height or every old control point.

The Lab compares all three subjects at the same body-curve setting, style and scale, fixed1.5 stroke and actual16/20/24/48px output. The public Core study contract remains `prototypeStudy(subject, exponent)`, returning native Outline/Filled path data. These subjects stay outside production icon counts, review records and six-icon batching. Existing production SVGs and morphs remain untouched. Square and the current Folder lower portion are accepted in their scoped reference settings; Camera and the complete Folder remain drafts pending visual review. Figma is now the focused design workspace; owner-approved edits return through Core and the adapter to Lab for rendering verification.

## Camera original-squircle trial — 2026-10-28

**Historical production trial:** this earlier Camera-only draft remains separate from the active1.5 three-subject study. The latest prototype work restores the earlier own-source silhouette as described above; it does not change this production SVG.

Camera is the first scoped artwork redesign. Its semantic structure remains a horizontal camera with a low raised housing, circular lens and indicator. The independently authored body uses a progressive corner profile: curvature starts at zero beside a straight side, increases through the turn and returns to zero at the next side. The lens remains circular because it describes an optical aperture. The shallow housing is integrated into the body rather than adding a generic enclosing frame.

The Camera-only construction is recorded in its source metadata and [authoring reference](tools/camera-design.ts). It uses quintic profiles, with cubic Hermite source fitting and an analytical outward normal offset for the Filled exterior. Curve-fitting position error must stay below0.0001 native units; sampled joins preserve tangent/zero-curvature contact with straight sections. The Regular visible bounds are x2..22/y3.625..20.375, centered at12,12. The Filled lens is an intentional solid-style counter at the shared lens centerline radius, not a requirement to fill or copy every Outline interior.

Both revised Camera styles are **drafts awaiting owner visual review**. Other artwork and approval records remain unchanged. These profile proportions are an experiment for this subject, not a newly approved universal recipe. Review the real Lab and actual16/20/24/48px output before extending the grammar to other subjects. Camera has no current morph endpoint; no animation change is part of this trial.

## Current static approval — 2026-10-27

The owner explicitly approved **all current static icons**, including every available style and requested Square/Circle drawing. This covers51 authoring families and121 separately exported static icons after the frame split. Preserve every existing SVG path and prior review history while recording the approval. The Camera-only trial above reopens its two style reviews. Current `metadata.review` is authoritative; earlier draft statements in historical construction notes are superseded. New or changed artwork must reopen the affected review. Static approval does not approve any morph or motion.

## Start here

1. Read this playbook and the applicable `AGENTS.md` and `CONTRIBUTING.md` files.
2. Inspect the user's request and the working state of the three source repositories and standalone local app. Preserve unrelated work.
3. Identify the icon family, required styles/frames, current source geometry and approval status.
4. Use the workflow in section 4, the verification criteria in section 5 and the test plan in section 6.
5. Deliver a working, checked Lab result and the evidence in section 7. Do not stop at a plan when implementation is requested.

A named icon request authorizes its necessary implementation and preview. Choose routine details within the established rules. Ask when an unresolved choice would materially change identity, scope, geometry, styles, frames or an accepted result; continue independent work while waiting. A brief or checklist records decisions and is not a mandatory approval checkpoint.

Apply current user instructions within the applicable higher-priority instructions. This document records the current icon contract; older dated trials in supporting documents are history, not alternative specifications. If the request, this guide and the source disagree materially, identify the conflict and resolve it before making dependent changes. Do not silently restore an older design.

### Quick task map

| Request                                           | Start with                                                                 | Required result                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| New icon or ordinary add-icons batch              | Semantic brief and our own shape grammar, Outline source, Filled treatment | Original SVG/metadata, requested variants, packed exports and Lab preview                        |
| Size, rounding, spacing or orientation correction | Existing source and acceptance record                                      | Revised native geometry; corresponding styles remain aligned; affected checks updated            |
| Frame or style extension                          | Shared glyph, frame geometry and style semantics                           | Separate named icons/components for each requested frame, with consistent styles and checks      |
| Adapter/API change                                | Core contract and generator                                                | Deterministic outputs, direct-import isolation, compatibility and consumer checks                |
| Lab-only change                                   | Current packed Lab dependency                                              | Correct controls, measurements, accessible interaction and responsive preview                    |
| Morph                                             | [Core MORPH.md](MORPH.md)                                                  | Follow that canonical motion playbook in addition to these static rules                          |
| Documentation-only change                         | Current rules, source and package scripts                                  | Clear current instructions, valid links/commands and consistent entry points; no artwork changes |

## 1. Goal

Create an independently designed squircle icon family with a recognizable identity of its own, readable at actual UI sizes. A completed implementation must:

- Express our own coordinated silhouette, corner transitions, proportions and negative-space rhythm; rounded caps or a larger circular corner radius alone do not establish the identity.
- Keep the correct geometric relationship between Outline, Bold, Filled and frames; matching bounding boxes alone is insufficient.
- Preserve accepted artwork and motion outside the requested revision.
- Keep core framework-independent, static imports lightweight and morphs opt-in.
- Reach the real Lab through traceable core → Svelte → local Lab promotion, preserving every draft and the separate public package pin.
- Include reproducible checks and visual evidence, with implementation completion separate from owner approval.

In this project's intended squircle language, the transition from a straighter side into a corner develops progressively, rather than relying only on a constant-radius circular fillet. This describes the intended main-body language where it fits, not a mandate for every small corner or semantic subpart, and not a claim that the current collection already meets it. Keep meaningful circles, straight segments, open forms and distinguishing features where the icon's meaning requires them. A shared language does not mean forcing every subject into the same outline.

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

An ordinary request to add icons means **six total**. Named icons occupy places in that six; choose the remainder automatically. Do not ask the owner to fill the remaining places. **A new identity defaults to None only. Add Square/Circle variants only when the owner explicitly requests frames; another family having frames is not authorization to add them everywhere.**

Explicit family extensions and construction revisions follow their requested scope. Adding frames does not create another six-icon batch. The Plus/Minus/X family revision adds Minus to the existing symbols; it does not authorize unrelated additions. Outline/Filled are styles of one icon. Each requested Square/Circle drawing is a separate named static icon, exported component and sidebar entry. A frame extension still does not trigger an unrelated six-icon batch.

### 2.3 Preserve contracts

- **Develop the design independently.** Define the subject, action and essential features first, then construct our own silhouette, spacing and curves. External collections are not construction templates or a source of design ideas to transplant. Replacing points, changing a radius or mirroring someone else's drawing does not make it our design.

- **Reuse before adding an identity.** When the drawing already exists as a named icon or style and only the action name differs, reuse that existing icon. Record the semantic mapping and add discovery tags; do not duplicate SVG geometry, generated components or alias exports. New Tab = Plus Square is the current example. Do not invent a duplicate identity merely to fill a six-action batch.
- Author original geometry and keep metadata authorship accurate.
- Use stable kebab-case icon names and stable `data-part` names. Preserve existing public names unless a rename is requested.
- Keep direct Svelte imports independent of barrels, catalogs, unrelated icon geometry and animation runtime.
- Keep the published public package and the development Lab package separate. A Lab update must retain draft icons and must not silently replace the public dependency.
- New/revised drawings remain `draft` until explicitly accepted. Preserve approval history and reopen the affected review when construction changes.
- Do not publish a package or deploy a website unless requested. A local Lab preview is the normal review deliverable.

### 2.4 Standalone local review app

`repos/lab` is a private local app, not a new Git/GitHub repository. It owns its package manifest, lockfile, packed review artifact, catalog generation, dev server, production build and tests. Its runtime, check and build must work without Homepage or sibling source checkouts. Only an explicit package-sync operation needs the Svelte source checkout.

The canonical icon rules are this file in Core. Local-app agents read `../core/ICON_RULES.md`; no copied rule body is maintained in the app. The root workspace file is an entry link. Homepage must have no review routes, preview helpers, development icon dependency, review-specific tests or sync tools. Its public package pin remains independent.

The icon-production agent owns static artwork and the shared icon concept. Hand static endpoint changes and their construction contract to the separate icon morph owner for animation work; a static design request does not transfer motion implementation into this role.

Core → Svelte → local Lab is the icon-development path. Updating the published website is a separate task, using a released package.

## 3. Design contract

Use the following current rules to design the source. Family exceptions are intentional; do not apply one family's Filled construction or margin rule to every other icon.

### 3.1 Artboard, weight and shape

For the existing collection, use a native **24 × 24** artboard, centered at **12,12**. The new-design study uses the scoped1.5 base above; the following weight palette remains the existing collection baseline. Native SVG units correspond to pixels when rendered at 24px.

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

**Approved circular-corner baseline:** the existing comparable full-size object corners and L elbows use tangent centerline arcs of radius3.25 at Regular1.75, with round cap radius0.875. Maximize/Minimize Filled follows Bold2.50, with cap radius1.25 and elbow outer/inner radii4.5/2. Preserve these exact sources when verifying or maintaining the approved baseline. A sharp H/V centerline with only a round stroke join does not reproduce that baseline.

These circular-arc values are not a universal squircle construction rule for future redesigns. The earlier instruction to apply radius3.25 automatically to every new comparable corner is superseded by the current conceptual direction. A later artwork task must first establish our independently designed silhouette and progressive corner profile, with its own rationale and review evidence. Do not guess a numeric replacement or silently refit the whole collection now.

Camera/Folder fitted bodies, small semantic details and the current Square frame exterior radius6 remain approved baseline references. Preserve their approved baseline outside an explicitly requested revision; Camera is now the first scoped trial. Future profiles must respect the subject's meaning and scale; neither a single fixed radius nor one universal outline should be imposed on every feature.

### 3.2 Margins and optical size

Measure the **visible edge**, including stroke and rounded caps, rather than only the centerline bounds.

- Use **2px on the primary opposing edge pair** when an icon is fitted to that pair.
- Camera and Folder use left/right, retaining their horizontal proportions. Another object may use top/bottom. The remaining pair may have larger margins.
- Naturally filled objects use their own silhouette; do not add an unnecessary box.
- Square/Circle frame exteriors have 2px on all four sides.
- **Where frames are explicitly supported, None is deliberately larger than Square/Circle.** Author larger native standalone geometry while preserving the existing compact framed glyphs. Fit the primary visible extent to20px at the family reference weight: Regular1.75 for directional/natural geometry and Bold2.50 for Bold-style Filled marks. The latter therefore has19.25px Regular Outline extent (2.375px primary margins). Arrow diagonals retain the same physical axial size, rather than being independently fitted to both artboard axes.
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
| Plus, Minus and X, unframed            | Unboxed Bold 2.50, matching the explicit Bold style                    |
| Plus, Minus and X, Square/Circle       | Solid frame with the exact Regular 1.75 symbol cut out                 |
| Arrow and Chevron, no frame            | Solid rounded triangular head; preserve the shared source construction |
| Arrow and Chevron, Square/Circle       | Solid frame with its compact Filled glyph silhouette cut out           |
| Check, no frame                        | Unboxed Bold 2.50 expansion of the shared check centerline             |
| Check, Square/Circle                   | Solid frame with its compact Bold silhouette cut out                   |

For natural dual-style objects, match the Filled exterior to the visible Regular Outline exterior. For Menu/Search, Check, alignment bars and unframed math symbols, compare Filled to **Bold 2.50**, not Regular. For boxed math marks, compare the hole to the corresponding Regular mark. Framed Menu, Check and alignment bars use the compact framed glyph expanded at Bold as their cutouts. Maximize and Minimize are None-only. Directional families likewise use their compact framed solid-head geometry. Compare within the selected frame variant; the larger None silhouette is a separate source.

Keep the compact glyph identical between Square and Circle. None uses its separately authored larger geometry. Never enlarge a Filled path by scaling its stroke, and never simulate this size distinction with Lab-only transforms. This owner correction supersedes older same-size-None/frame instructions in historical metadata and supporting notes.

### 3.4 Frame construction

**Frames are separate static icons and components.** Export `Plus`, `PlusSquare` and `PlusCircle` as independent geometry, using paths `plus`, `plus-square` and `plus-circle`. Do not combine these drawings inside one component or expose a static `frame` prop. Each named drawing has its own Lab sidebar entry; Outline/Filled remain styles of that drawing. Add framed icons only when the owner requests them. External Link, Maximize and Minimize have no added framed icons. New Tab reuses `PlusSquare`, with no duplicate New Tab export.

Core may keep related artwork nested under its authoring family for source ownership and pure morph builders. The adapter flattens the current51 authoring families and70 framed drawings into121 separate static icons. Each generated component includes only its selected drawing, with no hidden sibling-frame geometry. Catalog `baseIcon` and fixed `frame` fields describe provenance; they are not runtime switching props. Morph pair controls may select corresponding explicit static endpoint components without restoring a combined static component.

The following measurements describe the current approved baseline, not the unestablished future squircle profile:

| Measurement                  | Square                                   | Circle                     |
| ---------------------------- | ---------------------------------------- | -------------------------- |
| Filled exterior              | Bounds 2..22, corner radius6             | Center 12,12, radius 10    |
| Outline centerline           | Bounds 2.875..21.125, corner radius5.125 | Center 12,12, radius 9.125 |
| Default frame stroke         | 1.75                                     | 1.75                       |
| Default visible outer margin | 2 on all sides                           | 2 on all sides             |

The Square stays upright when a directional glyph rotates. Its current radius6 exterior / radius5.125 Outline centerline is the owner-approved rounder construction, replacing the previous radius4/3.125 enclosing frame. Change only the enclosing contour: glyph paths, cutouts, positions and local radii remain unchanged unless separately requested. Cutouts are transparent negative space; preserve exact unions and correct fill rules.

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

Compact framed Up–Down vertices remain `(8,10.5) → (12,6.5) → (16,10.5)` and `(16,13.5) → (12,17.5) → (8,13.5)`. Its None centerlines scale uniformly by73/44 about12,12, keeping Regular1.75 fixed and giving20px visible primary extent. Chevron Line keeps the existing V size but moves its stop line closer by balanced repositioning. Compact Line Up uses `(8,15.25) → (12,11.25) → (16,15.25)` with bar `(8,8.75) → (16,8.75)`, giving a2.5-unit centerline gap. None retains V half-width9.125, with bar y5.9375, tip y8.9375 and base y18.0625, giving a3-unit gap and20×13.875px Regular visible bounds. Both references remain centered; other directions are rigid rotations.

Filled closes and expands each triangle at radius0.875 and adds a matching fixed-radius capsule where needed. Opposed None gaps grow with its centerline proportions; its compact framed gaps remain1.25px at Regular and0.5px at Bold. Line None keeps1.25px Regular /0.5px Bold separation; compact Line keeps0.75px Regular separation and intentionally reaches tangency at Bold2.50, without overlap. Frame Filled uses the unchanged compact silhouette as its cutout. The current static drawings and framed icons are owner-approved; future geometry revisions reopen only their affected review.

#### Plus / Minus / X

These retain three styles: Outline / Bold / Filled. None Filled equals unboxed Bold2.50. Larger None centerlines use extent8.75 about12,12: Plus `M3.25 12 H20.75 M12 3.25 V20.75`, Minus the horizontal segment, and X the two diagonals between3.25 and20.75. None Bold/Filled visible bounds are2..22; Regular Outline primary margins are2.375.

Square/Circle keep their original compact centerline extent4.5: Plus `M7.5 12 H16.5 M12 7.5 V16.5`, Minus the horizontal segment, and X the two diagonals between7.5 and16.5. Framed Filled uses the compact Regular1.75 cutout. Bold remains explicitly unboxed and ignores frame selection. Do not substitute the larger None mark into a frame.

New Tab is a semantic use of the existing Plus Square variant, in either supported style. Keep `new-tab` and `newtab` as discovery tags on Plus and its Square metadata. Do not create another `new-tab` identity, source SVG, component, or alias export for the same drawing. New Window remains the separate overlapping-window identity described below.

#### Check

Check supports Outline/Filled and all three frame choices. Larger None vertices are `(3.25,12.67307692) → (8.63461539,18.05769231) → (20.75,5.94230769)`. Compact Square/Circle vertices remain `(7,12.38461538) → (10.07692308,15.46153846) → (17,8.53846154)`. Both preserve the original4:9 arm ratio and45-degree slopes.

Regular Outline is1.75. None Filled is the exact larger Bold2.50 expansion; framed Filled cuts out the compact Bold mark. Use one analytical union contour with radius1.25 caps/outer join and an intersected inner offset corner, never overlapping evenodd capsules. None Filled has20px primary width; compact frame geometry stays unchanged. The earlier standalone boxed Filled is superseded. Preserve prior approval history; the owner has approved this current static drawing.

#### Corner and entry/exit controls

`corner-up-right`, `log-in` and `log-out` retain Outline/Filled and all frames. Their compact framed references remain unchanged:

- Corner uses `M8 16.75 V13.75 A3 3 0 0 1 11 10.75 H16`, with head `(12.5,7.25) → (16,10.75) → (12.5,14.25)`. None centerlines uniformly scale by18.25/9.5 about12,12, keeping1.75 stroke and rebuilding Filled with0.875 expansion. Its visible top/bottom are2..22; left/right are3.44078947..20.55921053.
- Entry/Exit compact rounded C doors occupy y7.5..16.5 with radius1.5. Entry bounds x12.5..16.5 open left; Exit mirrors the door to x7.5..11.5 and opens right. Both arrows point right. Entry shaft x7.5..12.5 has head base x9.5; Exit shaft x11.5..16.5 has head base x13.5; both heads use y9/15. None scales centerlines by18.25/9 about12,12 and rebuilds the natural Filled doorway/solid-head union at0.875, yielding Regular visible bounds2..22. Never reverse the exit arrow merely because its doorway is mirrored.

#### Alignment

Alignment uses unboxed Bold2.50 Filled and retains its explicitly requested Square/Circle variants with compact Bold cutouts. Every None reference has20px primary extent at Bold and19.25px at Regular.

- Alignment None rows are y3.25,9.08333333,14.91666667,20.75. Long bars span x3.25..20.75; short bars are11.66666667 units with their Left/Center/Right anchors preserved. Compact rows remain y7.5,10.5,13.5,16.5, with long9-unit bars x7.5..16.5 and short6-unit bars x7.5..13.5 / x9..15 / x10.5..16.5 respectively.

#### Maximize and Minimize

These are a related pair of natural four-corner marks with Outline/Filled and no enclosing Square/Circle variants. The approved baseline uses actual rounded elbows and a separate inward-facing Minimize drawing; these circular arcs do not define the future squircle grammar. Keep their centerline extrema3.25..20.75 and arm span5.46875.

- Maximize points each rounded L toward its artboard corner. Elbow centerline radius is3.25 with straight tangent lead-ins, not a sharp H/V turn. Regular Outline remains1.75 with round end caps.
- Minimize turns each Maximize L by180 degrees about that corner's local center: `(5.984375,5.984375)`, `(18.015625,5.984375)`, `(18.015625,18.015625)` and `(5.984375,18.015625)`. This changes the corner's direction while retaining placement, arm span, roundness and bounds; it is not a whole-icon rotation or a duplicate alias.
- Filled is an exact Bold2.50 stroked union: radius1.25 end caps and elbow outer/inner radii4.5/2. Use tangent circular arcs and one closed contour per corner, without overlapping evenodd seams. Bold/Filled visible bounds remain2..22; Regular Outline margins are2.375.
- Preserve prior Maximize review history; both current rounded static endpoints are owner-approved. For the named Maximize↔Minimize morph, follow [MORPH.md](MORPH.md), derive both static endpoints exactly and preserve the shared source weight/tangent construction; static implementation and motion approval remain separate.

#### More controls

Compact `more-horizontal/vertical` references remain three centers7.5/12/16.5 along their axis, Outline circle radius1 and natural Filled radius1.875. Larger None scales the centers/circle centerlines by73/44: centers12±7.46590909, Outline radius1.65909091 and Filled radius2.53409091. Stroke stays1.75; Filled is a freshly rebuilt visible exterior, not Bold. None primary bounds are2..22 and perpendicular visible size5.06818182. Frames retain their exact compact three-dot cutouts.

#### Copy and New Window

Copy places its foreground sheet bottom-left and background sheet top-right, by a baked horizontal reflection about x12. Every endpoint/control point maps x→24−x, elliptical-axis rotations negate and arc sweep flags reverse. Preserve original object roundness, rear-junction breaks, exposed parallel-border spacing and combined Regular visible bounds2..22. Filled is the natural silhouette with a solid foreground sheet.

`new-window` preserves both former Copy SVG files byte-for-byte, with foreground bottom-right and background top-left. Neither identity has additional Square/Circle variants, so this None-versus-frame enlargement does not resize them. New Window does not inherit Copy approval; revised Copy keeps previous approval in history. Both current static drawings were included in the owner's collection-wide approval.

#### External Link

External Link is explicitly None-only; do not add enclosing Square/Circle variants.

- External Link uses a natural open window with centerline radius5.125, Filled outer/inner radii6/4.25 and visible bounds2..22. Quarter-circle centers are `(8,8)`, `(8,16)` and `(16,16)`; the top arm ends at `(8,2.875)` and right arm at `(21.125,16)`. Keep the diagonal shaft and arrowhead geometry unchanged when revising the window's corner rounding. Filled unites the same natural window expansion and solid-head arrow; do not add a second box.

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
Meaning, action and essential distinguishing features:
Requested change and preserved references:
Our independently developed silhouette and corner/negative-space decisions:
Required styles and frames:
Native center, primary margin pair and intended visible bounds:
Filled treatment and its comparison reference:
Shared geometry, optical exception or direction mapping:
Affected exports, Lab controls and morph endpoints:
Verification and test plan:
Review status:
```

Use the established family rules for routine choices. If a missing decision materially affects the result, ask the owner while progressing work that does not depend on the answer.

For a later redesign request, build the brief from the subject and our own design goals. Establish our shape grammar independently before proposing an artwork trial. Record why the proportions and corner progression belong to this family, without using another collection's geometry or stylistic solution as the target. Review a concrete trial before proposing a collection-wide migration. The Camera-only trial below is the first owner-requested application; it does not establish approval for other icons.

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
4. Add frames only when explicitly requested. For supported frame families, author the larger None glyph and preserve the compact shared Square/Circle glyphs as separate native variants. Keep Square upright, rebuild Filled at fixed family weight for each size, and verify compact Circle clearance.
5. Write/update metadata: name, description, tags, authorship, construction, parts and review status. Use `filledTreatment` consistently (`bold-stroke`, `boxed-cutout`, `solid-head` where applicable). The current math family uses `supportsBold: true`.
6. Update meaningful static source/geometry checks when behavior changes. If a static endpoint changes, give the morph owner the accepted source version and construction contract for endpoint updates and motion verification; preserve accepted timing and unrelated pairs.
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

| Check                      | Method                                                                                          | Pass criterion                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Identity and silhouette    | Compare with our semantic brief and our own family at 16/20/24/48px                             | Recognizable, balanced and consistent; defining features survive at small sizes                                   |
| Original squircle language | For a later redesign, inspect our own side-to-corner progression, silhouette and negative space | A coherent original grammar; neither round caps alone nor similarity to an external collection establishes a pass |
| Native placement           | Measure at 24×24, X/Y 100/100, rotation 0, Regular 1.75                                         | Correct center and primary margin pair; opposite margins balanced                                                 |
| Visible bounds             | Include half-stroke, caps and joins in measurements                                             | Specified dimensions/margins match the current family; no hidden clipping                                         |
| Contour relationship       | Overlay/vector-sample or compare raster masks from actual packed exports                        | Objects match Regular exterior; Bold Filled matches 2.50; frame holes match their specified glyph                 |
| Frame consistency          | Toggle None/Square/Circle at equal scale and pose                                               | Square/Circle share the compact glyph; None is natively larger; fixed stroke and correct per-frame treatment      |
| Frame clearance            | Inspect nearest glyph/border points at Regular and Bold                                         | Positive clearance except a deliberately requested contact; default frame exterior has 2px margins                |
| Directional consistency    | Compare the source reference under rigid rotations                                              | Same physical construction; no independently enlarged diagonal directions; Square stays upright                   |
| Rounding and overlaps      | Inspect caps, joins, corners and intersections at enlarged and actual sizes                     | Smooth, intentional contours; no doubled edges, seams, accidental holes or unequal stroke weight                  |
| Lab behavior               | Select each named icon (including framed icons), switch style, edit/reset X/Y and rotation      | Correct supported options, preserved independent drafts, accurate measurements and native defaults                |
| Accessibility/layout       | Keyboard controls, accessible labels, desktop and mobile widths                                 | Usable controls, decorative SVGs hidden appropriately, meaningful icons named, no unintended page overflow        |
| Affected morphs            | Compare both packed endpoints and reverse during playback                                       | Correct source/style/frame endpoints; accepted motion, timing and continuity remain intact                        |

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

### Baseline corner checks and future squircle verification

When maintaining the approved circular-corner baseline, verify actual source arcs, tangent continuity and the packed rendering. Its existing radius3.25 centerlines, Regular1.75 weight, radius0.875 caps and Maximize/Minimize Bold offsets remain covered by the [static corner regression](tests/unit/maximize-minimize-static.test.ts). Passing these checks proves baseline compatibility, not that an icon has the future squircle identity.

When an artwork redesign is later requested, add tests for the independently chosen profile: intended side-to-corner curvature progression, tangent continuity, finite/non-self-intersecting contours, visible bounds, weight and Outline/Filled relationships. State the intended continuity and numerical tolerances in that design's construction notes; do not invent universal values in advance. Inspect native sizes and the whole family visually as well. Neither automated geometry tests nor comparison with another library grants design approval.

### Choose tests by the change

| Change                             | Regression evidence to add or update                                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline/Filled geometry            | Packed contour comparison at native proportions and rotated poses, plus actual-size visual review                                                               |
| Frame construction                 | Exact shared glyph, correct default outer bounds, correct transparent cutout and clearance at relevant weights                                                  |
| Directional family                 | Rigid-rotation/equal-size contract and complete direction/frame coverage                                                                                        |
| Public props, exports or generator | Generation check, direct-import graph/bundle checks, packed consumer and compatibility suite                                                                    |
| Static endpoint used by a morph    | Regenerated endpoint data, packed endpoint comparison and affected reversal/intermediate-frame tests                                                            |
| Lab controls or measurements       | Named icon/style switching, resets, local edits, displayed spacing, keyboard access and affected viewport checks                                                |
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
