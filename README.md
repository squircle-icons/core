# Squircle Icons · core

**Alpha stage · Open source · MIT license**

The single editable source of original Squircle artwork, metadata, and framework-independent types. This repository contains no homepage or framework component implementation.

## Design direction

Read [the design rules](DESIGN_RULES.md) before changing artwork. Rounded rectangular outer construction must preserve the real object; interior details follow the icon’s meaning. All 51 current authoring families and their supported static styles are owner-approved as of 2026-10-27. The adapter exposes 121 independent static icons, including 35 Square and 35 Circle drawings. Static approval is separate from the motion statuses in [MORPH.md](MORPH.md). Moon's accepted minus-30-degree pose is baked into its native zero-degree source. Current metadata records the approved artwork; earlier review counts and construction experiments in the design history are superseded.

Menu and Search use unboxed Filled geometry matching Outline at fixed Bold 2.50. Other matching exterior comparisons use Regular 1.75, with the documented boxed-cutout and solid arrow-head treatments. Read [the construction guide](BOXED_ICON_RULES.md) for the accepted exceptions and [margin rules](ICON_MARGIN_RULES.md) for native spacing.

## Develop

Use Node.js 24.19.0 and pnpm 10.10.0.

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm pack --pack-destination .artifacts
```

`icons/` contains the original SVGs and adjacent authorship/construction metadata. `src/` contains shared stroke weights, types, and an internal catalog type.

`pnpm build` validates/optimizes artwork conservatively, compiles types, and writes `dist/catalog.json` for adapter generation. `pnpm test` covers invalid XML/geometry, stable parts, filled contours, and cutout contracts. Generated catalog data must not be edited manually.

## Updating an adapter

Commit the reviewed core change, then run `pnpm sync:core /path/to/core` in the Svelte repository. That command builds a local core artifact and records its source commit and SHA-256. No npm account or publication is needed during this alpha. Future framework adapters should consume the same versioned core input.

The packed catalog/source exports are an **internal build contract**, not a stable public core API. The core dependency is development-only in adapters; icon consumers do not install it separately.

The approved family uses a 24×24 grid and default 1.75 stroke. New or revised artwork still needs owner review; automated tests do not grant visual approval. Do not copy or adapt third-party icon paths and claim them as original. Original artwork and code are licensed under [MIT](LICENSE). See [migration provenance](MIGRATION.md).
