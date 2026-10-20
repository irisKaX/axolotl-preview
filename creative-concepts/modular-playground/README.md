# Modular Playground · Evolution V1

The existing Playground palette, materials, type, tools and Notebook continue unchanged. A single dashboard composition centres Office vertically between two supporting bento columns; no layout editor is introduced.

The real AppHeader, PillNav, dropdowns, URL control and settings are bundled from `irisKaX/axolotl-2/main` at `02a2ff32b8da590d0d7232c063a43d62bc736e7d`. Production source is not edited. `header-entry.tsx` supplies preview navigation, isolated preferences and an in-memory URL context. `evolution.css` provides the original global logo/accessibility primitives and system font, plus the explicitly requested neutral inactive hover; the selected navigation remains purple.

Rebuild the checked-in header bundle with `node scripts/build-playground-header.mjs` (set `AXOLOTL_SOURCE` to an axolotl-2 checkout containing that commit and its installed dependencies). The content adapter is the prior shared prototype copied into `playground.js`, so concepts 01 and 03 remain unchanged. All published files outside this Playground directory are preserved byte-for-byte.
