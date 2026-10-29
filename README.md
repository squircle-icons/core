# Squircle Icons · core

Original source for the current **94 icons / 188 Outline and Filled drawings**, plus five morph pairs and Trash motion. Core is a private build package; the public package is [`@squircle-icons/svelte`](https://github.com/squircle-icons/svelte).

## Current artwork

`icons/figma-study/manifest.json` records source IDs and SHA-256 hashes for every native SVG. Those files are the editable artwork source. `src/design/figma-catalog.ts` is generated from them; `dist/catalog.json` exposes the same current collection to adapters. Legacy icons, enclosing-frame variants and superseded prototype datasets are removed. Published older npm versions remain immutable.

Drawings use native24×24 and a1.5 Outline baseline. Thin1.25, Regular1.5 and Bold2.5 previews apply only to real stroked Outlines. Heart/Pen have authored expanded Outlines and retain fixed geometry. Filled preserves its source paint, counters and semantic stroke treatment. No drawing is resized, rounded again or silently promoted to approved by packaging.

Four pairs currently retain explicit visual approval; the others remain drafts. The owner authorized publishing the current collection as an alpha. That release authorization is separate from visual or motion approval. See [ICON_RULES.md](ICON_RULES.md), [DESIGN_RULES.md](DESIGN_RULES.md) and [MORPH.md](MORPH.md).

## Develop and verify

Use Node24.19.0 and pnpm10.10.0.

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm pack --pack-destination .artifacts
```

Validation checks source hashes, safe SVG/XML, finite geometry, native viewports, paint and current endpoints. Generation retains path coordinates and authored transforms. Redundant full24×24 clip definitions become root viewport clipping, avoiding duplicate SVG IDs across component instances. Build clears generated output so removed datasets cannot ship accidentally. Tests cover invalid inputs and source-derived geometry; successful tests grant no visual approval.

## Adapter promotion

Commit verified Core changes, then run `pnpm sync:core /path/to/core` in Svelte. The adapter records the exact Core commit and artifact SHA-256. Commit and verify Svelte before syncing the independent private Lab. Public consumers do not install Core.

Core stays framework independent. SVGs are original project artwork; do not copy third-party paths. Original artwork and code use the [MIT license](LICENSE).
