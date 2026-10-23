# Axolotl Design System Library V1.1

Only catalog: https://iriskax.github.io/axolotl-preview/ds-library-v1-1/#design-system

The application repository owns React, theme, Header/logo and extension sources.
This repository assembles one complete preview site plus the 18 compatibility
redirects in retired-routes.json. No cross-repository Header patch is applied.

Release authority remains `design-system/header-final-polish`, `.github/workflows/preview.yml`.
The local cleanup branch does not authorize publishing. GitHub Pages environment
policies have NOT been changed; obsolete branches can still hold remote permission
until the separately reviewed policy change is applied. Do not disable the workflow
ID globally: historical branches share its path with the current publisher.

## Reproduce locally

Use the locked image from the source `scripts/visual-baseline/Dockerfile` (Node
24.19.0, Playwright 1.64.1, frozen Chromium and fonts). Check out the workflow's full
SOURCE_COMMIT in a clean source directory, `npm ci`, then:

```sh
node scripts/ds-library/build.mjs
```

The Library build typechecks, builds React, packages the extension after Vite,
checks the actual ZIP against source and writes source/file/ZIP provenance.
For local inspection only, in this preview checkout:

```sh
node scripts/assemble-library.mjs ../source/dist ../review-output --review
```

The assembler requires a clean source manifest and unchanged payload. `--review`
marks the artifact `releaseAuthorized:false`; it never publishes or produces a
release validation marker. Without it, the assembler requires external source and
baseline pins and a successful mandatory gate bound to that exact artifact digest.

CI runs unit, legacy/tools, browser behavior and the strict immutable baseline gate.
Missing/corrupt baseline, changed pixels/computed data, or candidate status FAIL.
Current reference remains candidate; no screenshot auto-update or tolerance exists.
Production deployment in axolotl-2 remains independent and unchanged.

## Pending remote approval

Restrict preview environment `github-pages` to `design-system/header-final-polish`;
remove permissions for main, consolidate-v1-1, dark-veil, header-responsive,
living-catalog and the `esign-system/header-final-polish` typo. Preserve branches
and Git history. Applying these permissions and publishing require explicit approval.

Historical patch/runner restoration: commit 44b7bdad76ae6a924c1f254c8b3e3a6575685b6f.
Restore the whole historical recipe and source, never apply its patch to canonical
Header source. Original public artifact: source 63bda318f5556b12b629016e821e08feb7374281,
preview 0c2bfdcd4ed1a206c23d0988f0c0661c58397f3a.
