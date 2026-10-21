# Modular Playground · Final Bento Dashboard

The Dashboard contains only the approved Header and one viewport-filling bento: fixed Office on the left, four placeholder cards in a 2 × 2 grid on the right, and two wide cards below. On narrow screens it reflows into two columns. No layout editing or persistence is introduced. Other Playground views are unchanged.

Astra's completed visual refinement (`2d2dcc9131934ddb6ed6c115a7a95a2787c0ee3c`) is the baseline. `refinement.css` is retained byte-for-byte; `final-bento.css` changes geometry only. The existing card material classes also provide the six placeholders' colors and shadows.

The real AppHeader, PillNav, dropdowns, URL control and settings are bundled from `irisKaX/axolotl-2/main` at `02a2ff32b8da590d0d7232c063a43d62bc736e7d`. Production source is not edited. `header-entry.tsx` supplies preview navigation, isolated preferences and an in-memory URL context. `evolution.css` provides the original global logo/accessibility primitives and system font, plus the explicitly requested neutral inactive hover; the selected navigation remains purple.

Rebuild the checked-in header bundle with `node scripts/build-playground-header.mjs` (set `AXOLOTL_SOURCE` to an axolotl-2 checkout containing that commit and its installed dependencies). The content adapter is the prior shared prototype copied into `playground.js`, so concepts 01 and 03 remain unchanged. All published files outside this Playground directory are preserved byte-for-byte.


## UI Polish V1

Branch `preview/ui-polish-v1-20261021`, based on the published final bento `f14b69c`.
`ui-polish.css` reuses Widget 3/4 materials, exact DS paints, 38px visible header controls and an opaque scroll backing. Widget IDs and layout stay intact. GooseUI's MIT Border Beam is adapted to CSS on 1/3/4, with 20-second animation and reduced-motion support. All six widgets lift 3px on pointer hover without changing their borders.

`header-ui-polish.patch` is applied only to the temporary build copy: ordinary desktop menus omit their close action; compact/touch menus and deeper settings retain it. The production source checkout is never edited. `header-entry.tsx` measures the approved header for the scroll backing. Rebuild with the script above; smoke-check with `node scripts/check-playground.cjs`.
