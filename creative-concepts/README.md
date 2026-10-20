# O₂ Axolotl · Creative App Concepts

Three isolated, static design explorations. Open any `index.html` through an HTTP server:

- `immersive-studio/`: smoked glass, ambient light and a central digital atelier.
- `modular-playground/`: tactile colour blocks, an asymmetric bento and expressive typography.
- `spatial-workspace/`: calm architectural layers, editorial typography and a paper-like Notebook.

Each includes dark/light, Dashboard, ten contextual widget previews, simulated tool states and an editable in-memory Notebook. Tool results are sample data, QR is a stylized illustration, and notes reset on reload. No backend or production code is used. The shared HTML header adapts the approved Axolotl pill navigation, URL well, clock and controls as the requested functional reference.

Inspiration: `axolotl-knowledge/Axolotl Inspiration Library.md` — spotlight/border glow, bento composition, file collections, card tabs and semantic feedback. The external live references were unavailable under this session's network policy. No external component implementation was copied. Office scenes and illustrations were drawn specifically for these concepts.

Self-hosted Manrope and Space Grotesk are distributed under the included SIL Open Font Licenses. O₂ mark is the existing project brand asset.

For a short smoke: run an HTTP server at port 4188 in the repository, then `node scripts/check-concepts.cjs` with `PLAYWRIGHT_MODULE` pointing to an installed Playwright package. Publication preserves every pre-existing preview file outside `creative-concepts/` byte-for-byte.
