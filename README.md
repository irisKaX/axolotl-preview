# Axolotl · Design System Library V1.1

Jediný cílový katalog: https://iriskax.github.io/axolotl-preview/ds-library-v1-1/#design-system

Zdroje katalogu jsou v `irisKaX/axolotl-2`, větev `design-system/consolidate-v1-1`. Header a bento z revize `523c983` jsou převzaté do `src/design-system/dashboard/` (React, bez iframe; sdílený původní AppHeader) a zobrazené přímo v Library. Tento repozitář uchovává přesměrování starých preview a sestavení výstupu pro kontrolu.

1. V axolotl-2: `npm ci && node scripts/ds-library/build.mjs`.
2. Zde: `node scripts/assemble-library.mjs ../axolotl-2/dist /tmp/axolotl-consolidated-preview` (nový výstupní adresář).

`retired-routes.json` eviduje historické veřejné adresy. Git historie uchovává původní podklady. Zadání V2 povoluje experimentální publikaci. Workflow z konsolidační větve sestaví připnutý zdrojový commit, ověří registr a základní ovládání/přístupnost a publikuje jedinou Library spolu s přesměrováními. Používá stávající prostředí `github-pages` a respektuje jeho ochranu větví. Žádný merge ani produkční deployment není součástí změny. Modular Playground se po ověřené vizuální shodě přesměruje přímo na Dashboard.

Starý katalog na `axolotl-2/#design-system` je vyřazený jako vizuální autorita. Jeho produkční routa zůstává beze změny. Soukromá Inspiration Library se nezveřejňuje ani nemění.
