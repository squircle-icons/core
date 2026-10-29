# Contributing to Core

Read [ICON_RULES.md](ICON_RULES.md), [DESIGN_RULES.md](DESIGN_RULES.md) and [MORPH.md](MORPH.md). Core owns original artwork and pure geometry; Svelte owns components and the private Lab owns preview UI.

Edit source SVGs under `icons/figma-study/`, update their hashes in the manifest, run `pnpm generate:figma`, then `pnpm verify`. Never edit generated catalog geometry. Preserve native source coordinates, authored paint, semantic counters and review status. The current catalog has94 pairs with no legacy frame variants. New numerical decisions belong in the canonical playbook.

Inspect Outline/Filled at native16/20/24/48px on light/dark surfaces. Compare actual packed components to literal sources; automated checks do not grant owner approval. Keep Core framework independent and free of import-time DOM work. Source validation must reject unsafe XML, scripts, external references and unsupported clipping.

Commit validated Core changes before adapter sync. In Svelte run `pnpm sync:core ../core`, verify and commit the adapter, then update the private Lab with `pnpm sync:svelte ../svelte` and verify its actual installed artifact. Preserve unrelated work and keep Homepage on its separately verified published npm pin. Coordinate exclusive downstream ownership during sync.

The owner authorized the94-pair alpha publication without changing draft visual status. Future stable releases require approved artwork. Original code and artwork contributions use the [MIT license](LICENSE).
