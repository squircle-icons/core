# Squircle Icons · core

**Alpha stage · Open source · MIT license**

The single editable source of original Squircle artwork, metadata, and framework-independent types. This repository contains no homepage or framework component implementation.

## Design direction

Read [the design rules](DESIGN_RULES.md) before changing artwork. Rounded rectangular outer construction must preserve the real object; interior details follow the icon’s meaning. Crisp strokes and an approved static family come before expanding the collection or adding new behavior. Folder, Camera, Heart and Settings (Outline/Filled), plus Search (Outline only), are owner-approved. Bell is also approved after its solid Filled clapper correction; all six static icons have owner approval. Search now includes an owner-requested boxed Filled variant aligned to a resized Outline; the revised Search pair and both Copy styles were owner-approved on 2026-10-27.

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

The grid, default 1.70 stroke, and curvature remain a proposal awaiting visual review. Do not copy or adapt third-party icon paths and claim them as original. Original artwork and code are licensed under [MIT](LICENSE). See [migration provenance](MIGRATION.md).
