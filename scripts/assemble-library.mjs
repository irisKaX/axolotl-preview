// One complete site. --review creates a local, explicitly non-release artifact.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
const [libraryArg,outputArg,...flags]=process.argv.slice(2);
assert(flags.every(x=>x==='--review'),'Unknown assembler option');
const review=flags.includes('--review');
const library=path.resolve(libraryArg||'../axolotl-2/dist'),output=path.resolve(outputArg||'/tmp/axolotl-consolidated-preview');
const hash=x=>createHash('sha256').update(x).digest('hex');
const provenance=JSON.parse(readFileSync(path.join(library,'provenance.json'),'utf8'));
assert.equal(provenance.architecture,'react-canonical-v2');assert.equal(provenance.theme,'tweakcn-v1');
assert.equal(provenance.categories.length,11);for(const name of ['dashboard','brand','foundations'])assert(provenance.categories.includes(name));
assert(/^[a-f0-9]{40}$/.test(provenance.sourceCommit));assert.equal(provenance.sourceClean,true,'Assemble only a clean canonical source build');assert(!provenance.previewPatch,'Cross-repository patches are retired');
if(process.env.SOURCE_COMMIT)assert.equal(provenance.sourceCommit,process.env.SOURCE_COMMIT);
const actual={};function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else {const rel=path.relative(library,file);if(!['provenance.json','release-validation.json'].includes(rel))actual[rel]=hash(readFileSync(file));}}}walk(library);
assert.deepEqual(actual,provenance.fileHashes,'Artifact changed after build');
assert.equal(hash(JSON.stringify(provenance.fileHashes)),provenance.artifactDigest);
assert.equal(actual['downloads/axolotl-prohlizec.zip'],provenance.extension.sha256);
if(!review){
 assert(process.env.SOURCE_COMMIT&&process.env.BASELINE_SHA256,'Release requires external source and baseline pins');
 const gate=JSON.parse(readFileSync(path.join(library,'release-validation.json'),'utf8'));
 assert.equal(gate.approved,true);assert.equal(gate.sourceCommit,provenance.sourceCommit);assert.equal(gate.artifactDigest,provenance.artifactDigest);assert.equal(gate.baselineSha256,process.env.BASELINE_SHA256);
 assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim(),'','Publisher must be clean');
}
const routesBytes=readFileSync('retired-routes.json'),routes=JSON.parse(routesBytes);assert.equal(routes.length,18);assert.equal(new Set(routes).size,18);
for(const route of routes){assert(!route.split('/').includes('..')&&!path.isAbsolute(route));const html=readFileSync(route,'utf8');assert(html.includes('/axolotl-preview/ds-library-v1-1/'),`Noncanonical redirect ${route}`);}
assert(!existsSync(output),'Output must be new; preserve review files');mkdirSync(output,{recursive:true});cpSync(library,path.join(output,'ds-library-v1-1'),{recursive:true});
for(const route of routes){const target=path.join(output,route);mkdirSync(path.dirname(target),{recursive:true});cpSync(route,target);}
Object.assign(provenance,{previewRepositoryCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),redirectManifestSha256:hash(routesBytes),releaseAuthorized:!review});
writeFileSync(path.join(output,'ds-library-v1-1/provenance.json'),JSON.stringify(provenance,null,2)+'\n');
console.log(`Assembled ${review?'LOCAL REVIEW ONLY':'validated release candidate'}: ${output}. No publication performed.`);
