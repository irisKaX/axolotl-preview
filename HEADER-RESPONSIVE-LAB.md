> Archivní podklad. Aktivní katalog je pouze Design System Library V1.1. Historické preview přesměrovává do Library po schváleném nasazení.

# Header Responsive Lab preview

Experiment only; C2 accordion interaction is approved. No visual variant or production rollout is approved.

Source: irisKaX/axolotl-2, feat/header-responsive-lab, commit 5bc0bd8fc6463fa8ad7d8e051e181386da2af486.

Preview path: https://iriskax.github.io/axolotl-preview/header-responsive-lab.html

This branch runs the existing GitHub Pages preview workflow against the pinned source commit. Both main branches remain unchanged. The root preview app remains available; the Lab is an additional page.

No environment protection, permissions or Pages configuration changes are included. If deployment is blocked by branch restrictions, request user approval before changing those settings.

C2 iteration: the original C remains available. C2 overlays the workspace without layout shifts. Use the C2 selector or direct C / C2 comparison; keyboard, touch, reduced motion and short viewport regression tests pass.

C2 accordion update (2026-10-17): Dashboard opens collapsed; tool pages open their owning group, with at most one group expanded. Reopening follows the current route. Active items have a visible checkmark; selecting even the current route closes navigation. Layout and original C remain preserved. Build, 50 unit tests and 31 browser tests pass, including navigation/history, touch, keyboard and zero-shift checks.
