# Modular Playground · Final Bento Dashboard

The Dashboard contains only the approved Header and one viewport-filling bento: fixed Office on the left, four placeholder cards in a 2 × 2 grid on the right, and two wide cards below. On narrow screens it reflows into two columns. No layout editing or persistence is introduced. Other Playground views are unchanged.

Astra's completed visual refinement (`2d2dcc9131934ddb6ed6c115a7a95a2787c0ee3c`) is the baseline. `refinement.css` is retained byte-for-byte; `final-bento.css` changes geometry only. The existing card material classes also provide the six placeholders' colors and shadows.

The real AppHeader, PillNav, dropdowns, URL control and settings are bundled from `irisKaX/axolotl-2/main` at `02a2ff32b8da590d0d7232c063a43d62bc736e7d`. Production source is not edited. `header-entry.tsx` supplies preview navigation, isolated preferences and an in-memory URL context. `evolution.css` provides the original global logo/accessibility primitives and system font, plus the explicitly requested neutral inactive hover; the selected navigation remains purple.

Rebuild the checked-in header bundle with `node scripts/build-playground-header.mjs` (set `AXOLOTL_SOURCE` to an axolotl-2 checkout containing that commit and its installed dependencies). The content adapter is the prior shared prototype copied into `playground.js`, so concepts 01 and 03 remain unchanged. All published files outside this Playground directory are preserved byte-for-byte.
