# Squircle Icons · core

**Alpha stage · Public source · License pending**

The single editable source of original Squircle artwork, metadata, motion recipes, and framework-independent runtime types/utilities. There are six original icons and two one-shot motion studies. This repository contains no homepage or framework component implementation.

## Develop

Use Node.js 24.19.0 and pnpm 10.10.0.

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm pack --pack-destination .artifacts
```

`icons/` contains the original SVGs and adjacent authorship/construction metadata. `motions/` contains named-part recipes. `src/` contains the DOM controller, types, and an internal catalog type. Browser APIs are accessed only when a controller is explicitly created, never at import time.

`pnpm build` validates/optimizes artwork conservatively, compiles runtime/types, and writes `dist/catalog.json` for adapter generation. `pnpm test` covers invalid XML/geometry, stable parts, motion references, finite timing/easing, pulse endpoints, and DOM-free import. Generated catalog data must not be edited manually.

## Updating an adapter

Commit the reviewed core change, then run `pnpm sync:core /path/to/core` in the Svelte repository. That command builds a local core artifact and records its source commit and SHA-256. No npm account or publication is needed during this alpha. Future framework adapters should consume the same versioned core input.

The packed catalog/source exports are an **internal build contract**, not a stable public core API. The core dependency is development-only in adapters; icon consumers do not install it separately.

The grid, default 1.75 stroke, and curvature remain a proposal awaiting visual review. Do not copy or adapt third-party icon paths and claim them as original. Licensing remains `UNLICENSED`; no reuse license has been adopted. See [migration provenance](MIGRATION.md).
