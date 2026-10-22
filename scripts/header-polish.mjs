// Preview-owned patch over the pinned, read-only upstream source. No production writes.
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=resolve(process.argv[3]||'../source');
const patch=resolve(root,'patches/header-final-polish.patch');
const git=(...args)=>execFileSync('git',args,{cwd:source,encoding:'utf8'}).trim();
const sourceCommit='63bda318f5556b12b629016e821e08feb7374281';
if(git('rev-parse','HEAD')!==sourceCommit)throw Error('Header polish requires the reviewed upstream source commit');
const hash=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
if(process.argv[2]==='apply'){
 if(git('diff','--name-only'))throw Error('Apply only to a clean, disposable source checkout');
 git('apply','--check',patch);git('apply',patch);
 console.log('Applied preview-only Header colors and shared logo integration.');
}else if(process.argv[2]==='stamp'){
 git('apply','--reverse','--check',patch);
 const path=resolve(source,'dist/provenance.json');
 const provenance=JSON.parse(readFileSync(path,'utf8'));
 if(provenance.previewCommit!==sourceCommit)throw Error('Unexpected build provenance');
 provenance.previewRepositoryCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 provenance.previewPatch={file:'patches/header-final-polish.patch',sha256:hash(patch)};
 for(const file of ['src/components/navigation/PillNav.tsx','src/components/navigation/PillNav.css'])provenance.sourceHashes[file]=hash(resolve(source,file));
 writeFileSync(path,JSON.stringify(provenance,null,2));
 console.log('Recorded exact preview patch and source hashes.');
}else throw Error('Usage: node scripts/header-polish.mjs apply|stamp SOURCE_DIRECTORY');
