import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {existsSync,readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const source=resolve(process.argv[2]||'/tmp/axolotl-header-preview-source');
const require=createRequire(resolve(source,'package.json'));
const {chromium}=require('playwright');
const base=process.env.LIBRARY_URL||'http://127.0.0.1:4186/axolotl-preview/ds-library-v1-1/';
assert.equal(process.argv.length,3,'Usage: check-header-polish.mjs SOURCE; --record is forbidden');
const {BASELINE_DIR,BASELINE_SHA256,VISUAL_HARNESS_DIR,BASELINE_OUTPUT}=process.env;
assert(BASELINE_DIR&&BASELINE_SHA256&&VISUAL_HARNESS_DIR&&BASELINE_OUTPUT,'Pinned BASELINE_DIR, BASELINE_SHA256, VISUAL_HARNESS_DIR and new BASELINE_OUTPUT are mandatory');
// Validate integrity before any browser work. The strict runner also checks the actual toolchain.
const {loadReference}=await import(pathToFileURL(resolve(VISUAL_HARNESS_DIR,'contract.mjs')));
const declaredToolchain=JSON.parse(readFileSync(resolve(BASELINE_DIR,'manifest.json'),'utf8')).toolchain;
loadReference(BASELINE_DIR,BASELINE_SHA256,declaredToolchain);
let proxy;if(base.startsWith('https:')&&process.env.HTTPS_PROXY){const u=new URL(process.env.HTTPS_PROXY);proxy={server:u.origin,username:decodeURIComponent(u.username),password:decodeURIComponent(u.password)};}
const browser=await chromium.launch({executablePath:existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined,proxy});
const page=await browser.newPage({viewport:{width:1366,height:768},ignoreHTTPSErrors:!!proxy,reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const readPaint=()=>page.locator('#approved-header header').evaluate(el=>{
 const s=getComputedStyle(el);const p=document.createElement('span');el.append(p);
 const resolveColor=value=>{p.style.color=value;return getComputedStyle(p).color;};
 const result={primary:resolveColor('var(--primary)'),ring:resolveColor('var(--ring)'),hover:resolveColor('var(--axo-hover)'),hoverInk:resolveColor('var(--axo-hover-ink)')};p.remove();return result;
});
try {
 await page.goto(base+'?catalog=library&section=dashboard#design-system');await page.locator('#approved-header header').waitFor();await page.evaluate(()=>document.fonts.ready);
 const paints={};
 for(const mode of ['light','dark']) {
  await page.getByRole('checkbox',{name:'Tmavý režim',exact:true}).setChecked(mode==='dark');await page.waitForFunction(m=>document.documentElement.dataset.theme===m,mode);
  await page.locator('.ds-dashboard').evaluate(e=>e.scrollIntoView());
  paints[mode]=await readPaint();
  const logo=page.locator('#approved-header .axo-animated-mark');assert.equal(await logo.count(),1,'Header reuses AnimatedAxolotlLogo');
  assert.equal(await logo.locator('[data-gill]').count(),6);assert.equal(await logo.getAttribute('data-size'),'small');
  assert(await logo.locator('svg').evaluate(e=>{const s=getComputedStyle(e);return s.width==='50px'&&s.height==='42px'&&s.fill==='rgb(255, 255, 255)';}),'Header icon rules must not shrink/recolor the canonical SVG');
  const input=page.getByRole('textbox',{name:'Aktuální URL'});await input.fill('https://example.cz/');await input.click();
  assert.equal(await input.locator('..').evaluate(e=>getComputedStyle(e).borderTopColor),paints.light.ring);
  assert.equal(await page.locator('[data-header-url] label').evaluate(e=>getComputedStyle(e).color),paints.light.ring);
  await input.press('Enter');
  for(const title of ['Můj workspace','Média','Kontrola','Upozornění','Nastavení']) {
   const button=page.getByRole('button',{name:title,exact:true});await button.hover();await page.locator('[data-header-panel]').waitFor();
   const color=await button.evaluate(e=>{const fill=e.querySelector('.axolotl-pill-nav__fill');return fill?getComputedStyle(fill).backgroundColor:getComputedStyle(e,'::before').backgroundColor;});
   assert.equal(color,paints.light.primary,`${mode} ${title} open color follows Light reference`);
   await page.keyboard.press('Escape');await page.mouse.move(1,1);await button.focus();
   assert(await button.evaluate(e=>getComputedStyle(e).outlineStyle!=='none'));
  }
  if(mode==='dark') {
   await page.getByRole('button',{name:'Nastavení',exact:true}).click();
   await page.getByRole('button',{name:'Vzhled a prostředí',exact:true}).click();
   const field=page.locator('[data-header-select-trigger]').first();await field.focus();
   assert.equal(await field.evaluate(e=>getComputedStyle(e).backgroundColor),paints.light.hover);
   assert.equal(await field.evaluate(e=>getComputedStyle(e).outlineColor),paints.light.ring);
   assert.equal(await field.evaluate(e=>getComputedStyle(e).outlineOffset),'-2px');
   await page.keyboard.press('Escape');
  }
  // URL actions have hover and pressed states without opening a navigation panel.
  const copy=page.getByRole('button',{name:'Kopírovat URL'});await input.focus();await copy.hover();
  assert.equal(await copy.evaluate(e=>getComputedStyle(e).backgroundColor),paints.light.hover);
  assert.equal(await copy.evaluate(e=>getComputedStyle(e).color),paints.light.hoverInk);
  await page.mouse.down();assert.equal(await copy.evaluate(e=>getComputedStyle(e).backgroundColor),paints.light.primary);await page.mouse.up();
  await page.mouse.move(1,1);await page.locator('.ds-dashboard').screenshot({path:`/tmp/header-polish-${mode}.png`});
 }
  assert.deepEqual(paints.dark,paints.light,'All Header interaction paints match Light, including hover pair');
  const reference=readFileSync(resolve(source,'src/design-system/tokens/tweakcn.export.css'),'utf8').match(/--primary:\s*([^;]+)/)[1];
  const resolvedReference=await page.evaluate(value=>{const el=document.createElement('span');el.style.color=value;document.body.append(el);const color=getComputedStyle(el).color;el.remove();return color;},reference);
  assert.equal(paints.light.primary,resolvedReference);
  await page.emulateMedia({reducedMotion:'no-preference'});
  const link=page.getByRole('link',{name:'O₂ Axolotl – dashboard',exact:true});await link.hover();await page.waitForTimeout(300);
  assert(await link.evaluate(e=>e.getAnimations({subtree:true}).every(a=>a.effect.target.classList.contains('axo-animated-mark__orbit'))),'PillNav must not add a second whole-logo animation');
  await link.click();await page.getByRole('status').filter({hasText:'Navigační ukázka: dashboard.'}).waitFor();
  for(const width of [1180,768,390,320]) {
   await page.setViewportSize({width,height:844});const link=page.getByRole('link',{name:'O₂ Axolotl – dashboard',exact:true});await link.waitFor();
   assert.equal(await link.locator('.axo-animated-mark').count(),1);
   assert(await link.evaluate(e=>{const a=e.getBoundingClientRect(),b=e.querySelector('.axo-animated-mark').getBoundingClientRect();return Math.abs(a.x+a.width/2-b.x-b.width/2)<.5&&Math.abs(a.y+a.height/2-b.y-b.height/2)<.5&&b.width<=a.width+.5;}),'Compact logo centered inside unchanged link');
   assert(await page.locator('#approved-header header').evaluate(e=>e.scrollWidth<=e.clientWidth));
   await link.click();
  }
  await page.screenshot({path:'/tmp/header-polish-mobile.png'});
  assert.deepEqual(errors,[]);console.log('PASS: Light reference colors in both Header themes, canonical SVG/animation reuse, interactions, navigation and responsive logo.');
} finally {await browser.close();}
// No diagnostic flag in the publication path: a candidate reference fails closed.
execFileSync(process.execPath,[resolve(VISUAL_HARNESS_DIR,'check.mjs'),'--baseline',BASELINE_DIR,'--sha256',BASELINE_SHA256,'--url',base,'--output',BASELINE_OUTPUT],{stdio:'inherit'});
