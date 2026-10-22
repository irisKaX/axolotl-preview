// Builds a review artifact only. No deploy, Git mutation or production writes.
import {readFileSync, mkdirSync, cpSync, existsSync} from 'node:fs';
import path from 'node:path';
const library = path.resolve(process.argv[2] || '../axolotl-2/dist');
const output = path.resolve(process.argv[3] || '/tmp/axolotl-consolidated-preview');
const provenance=JSON.parse(readFileSync(path.join(library,'provenance.json'),'utf8'));
if (!provenance.consolidation || !provenance.categories.includes('dashboard') || !provenance.categories.includes('brand')) throw Error('Build the consolidated Library first');
if (existsSync(output)) throw Error('Output must be a new directory; preserve existing review files');
mkdirSync(output,{recursive:true});
cpSync(library,path.join(output,'ds-library-v1-1'),{recursive:true});
for (const route of JSON.parse(readFileSync('retired-routes.json','utf8'))) {
  const target=path.join(output,route);mkdirSync(path.dirname(target),{recursive:true});cpSync(route,target);
}
console.log(`Review artifact: ${output}. No publication performed.`);
