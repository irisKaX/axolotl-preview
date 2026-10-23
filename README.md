# Axolotl Design System Library V1.1

Only catalog: https://iriskax.github.io/axolotl-preview/ds-library-v1-1/#design-system

The application repository owns React, theme, Header/logo and extension sources.
This repository assembles one complete preview site plus the 18 compatibility
redirects in retired-routes.json. No cross-repository Header patch is applied.

Release authority remains `design-system/header-final-polish`, `.github/workflows/preview.yml`.
The local cleanup branch does not authorize publishing. GitHub Pages environment
policy restriction was explicitly approved on 2026-10-23, but the first DELETE
returned GitHub 403 `Resource not accessible by integration`. No policies changed;
obsolete branches still hold remote permission until an authorized administrator
applies the six approved removals. Do not disable the workflow
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
Approved reference commit: `119fc3995442dff4dffee91372bcef570ac0c3f0`.
Manifest SHA-256: `4f288b9ae75e87ee9960e770f0a385e80bf5bd914b33bb7a7bca5ac3a0ac68d6`.
Canonical source/harness: `c4b47d40574537b6f516bfdcf385248894f9c7ec`.
The user approved the exact 96 PNG + 96 computed/geometry JSON set on 2026-10-23;
all bytes are unchanged from independent candidate `a6db36e`. This does not approve
every catalog design variant or production adoption. No snapshot auto-update or tolerance exists.
Production deployment in axolotl-2 remains independent and unchanged.

## Approved preparation; publication still pending

Restrict preview environment `github-pages` to `design-system/header-final-polish`;
remove permissions for main, consolidate-v1-1, dark-veil, header-responsive,
living-catalog and the `esign-system/header-final-polish` typo. Preserve branches
and Git history. The six policy removals are authorized by the 2026-10-23 user request; applying them
is blocked by GitHub integration permissions. Publishing is NOT authorized.
Authorized review branches are `clean-foundation/milestone-a` in both repositories;
use GitHub compare links for review without changing main or the release branch.

Historical patch/runner restoration: commit 44b7bdad76ae6a924c1f254c8b3e3a6575685b6f.
Restore the whole historical recipe and source, never apply its patch to canonical
Header source. Original public artifact: source 63bda318f5556b12b629016e821e08feb7374281,
preview 0c2bfdcd4ed1a206c23d0988f0c0661c58397f3a.

## Final release preparation verification — 2026-10-23

The approved baseline metadata is published on both review branches. The fresh
strict local gate compared 96 states: 94 exact PNG matches, 96 computed/geometry
matches. Light Settings differed by 31 pixels (maximum channel delta 4/255),
mobile dark Brand by 35 pixels (2/255). A bounded three-capture diagnostic per
case on both the original and candidate build subsequently matched exactly,
but does not override the failed full gate. No tolerance, mask, snapshot update,
or release marker was introduced.

TypeScript, 111 unit, 24 legacy, 335 tools, 20 baseline/bridge contracts, 43 Chromium
integration tests, 208 contrast checks and 10 negative guards passed. The actual
ZIP was installed and verified on allowed/denied origins; two clean Library builds
matched exactly; all 18 redirects passed. The technical payload remains unchanged.

**BLOCKED:** six Pages policy removals require integration permissions (HTTP 403),
and the strict visual gate must pass without exceptions before release. The local
artifact is review-only (`releaseAuthorized:false`); public Library and production
remain unchanged. Review uses GitHub compare links, with no PR merge or deployment.
