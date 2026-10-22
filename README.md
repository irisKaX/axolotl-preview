# Axolotl · Design System Library V1.1

Jediný cílový katalog: https://iriskax.github.io/axolotl-preview/ds-library-v1-1/#design-system

Zdroje katalogu jsou v `irisKaX/axolotl-2`, větev `design-system/consolidate-v1-1`. Header a bento z revize `523c983` jsou převzaté do `public/library/dashboard/` a zobrazené přímo v Library. Tento repozitář uchovává přesměrování starých preview a sestavení výstupu pro kontrolu.

1. V axolotl-2: `npm ci && node scripts/ds-library/build.mjs`.
2. Zde: `node scripts/assemble-library.mjs ../axolotl-2/dist /tmp/axolotl-consolidated-preview` (nový výstupní adresář).

`retired-routes.json` eviduje historické veřejné adresy. Git historie uchovává původní podklady. Automatický deployment je v této pracovní větvi nahrazen ručně spustitelnou kontrolou, která pouze vytvoří artifact. Žádný merge nebo deployment není součástí konsolidace. Živé adresy se změní až po výslovně schválené publikaci.

Starý katalog na `axolotl-2/#design-system` je vyřazený jako vizuální autorita. Jeho produkční routa zůstává beze změny. Soukromá Inspiration Library se nezveřejňuje ani nemění.
