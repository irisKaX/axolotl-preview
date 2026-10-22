> Archivní podklad. Aktivní katalog je pouze Design System Library V1.1. Historické preview přesměrovává do Library po schváleném nasazení.

# Header Visual Unification Lab

Visual exploration only. No variant is approved for production.

Source: irisKaX/axolotl-2, feat/header-visual-unification-lab, commit f25ab73bfb4f7d1de6bc63215c6247dc91bd29d6.

URL: https://iriskax.github.io/axolotl-preview/header-visual-lab.html

Three PillNav-based systems: A Precision, B Refined Spatial, C Experimental.
Real iframe comparison, viewport sizing, dark/light, standalone pages, actual
header controls and tools. The approved C2 interaction is preserved.

Original Responsive Lab A/B/C/C2 remains at its existing URL; its source
files are unchanged from 5bc0bd8. This pinned build includes both lab pages.
The application root remains available. No production/main or security
settings changes. Uses the previously authorized preview/header-responsive-lab
environment branch only.

Validation: build/typecheck, 50 unit tests, 64 browser tests, 24 legacy tests and 335 tool tests. Computed-style
audit covers 24 scenes. Audit method, design rationale and token proposals
are documented in the source branch under docs/design-lab/.

Visual regression correction: restored neutral C2 compact hover and original
PillNav palette, focus, active states and row geometry. A/B/C dimensions and
carrier materials remain distinct. Eight new regression tests compare real
paint and tokens to untouched C2 in both themes. Before/after evidence is in
docs/design-lab/header-pillnav-regression.json in the source branch.
