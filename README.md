# Axolotl Preview

Oddělené testovací nasazení aplikace Axolotl. Produkční repozitář `irisKaX/axolotl-2` a jeho větev `main` zůstávají nedotčené.

Zdroj: `irisKaX/axolotl-2` / `fix/mobile-disclosure-pointer-leave` (pull request #2).

## Nastavení GitHub Pages

Settings > Pages > Build and deployment > Source: **GitHub Actions**.

Workflow v `.github/workflows/preview.yml` sestaví aktuální opravnou větev a nasadí ji na https://iriskax.github.io/axolotl-preview/.

Větev lze změnit úpravou hodnoty `ref` u `actions/checkout` ve workflow. Veřejná testovací verze nesmí obsahovat tajné údaje, přihlašovací tokeny ani soukromé dokumenty.
