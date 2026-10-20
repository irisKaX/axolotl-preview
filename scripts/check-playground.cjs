// One short preview check: original header, centred Office, themes and navigation.
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROME_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROME_EXECUTABLE}:{})});try{
 const page=await browser.newPage({viewport:{width:1366,height:768},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.PLAYGROUND_URL||'http://127.0.0.1:4190/creative-concepts/modular-playground/');
 await page.locator('#approved-header .axolotl-pill-nav').waitFor();
 const theme=page.getByRole('checkbox',{name:'Tmavý režim',exact:true});
 for(const dark of [true,false]){await theme.setChecked(dark);await page.waitForFunction(t=>document.documentElement.dataset.theme===t,dark?'dark':'light');const boxes=await page.evaluate(()=>Object.fromEntries(['office','find-card','qr-card','metadata-card'].map(c=>{const r=document.querySelector('.'+c).getBoundingClientRect();return[c,{x:r.x,y:r.y,w:r.width,h:r.height}]})));assert(boxes.office.x>boxes['find-card'].x&&boxes.office.x<boxes['qr-card'].x);assert(boxes.office.h>boxes['find-card'].h);assert(Math.abs(boxes.office.x+boxes.office.w/2-683)<2);}
 assert.notEqual(await page.locator('.axolotl-logo-art').evaluate(e=>getComputedStyle(e).maskImage),'none');
 await page.getByRole('button',{name:'Kontrola',exact:true}).hover();await page.locator('[data-header-panel="group:kontrola"]').waitFor();
 await page.locator('[data-header-panel="group:kontrola"]').getByRole('link',{name:'Hledání na webu',exact:true}).click();await page.locator('main[data-view=tools]').waitFor();assert.equal(await page.locator('main h1').innerText(),'Find Phrase');
 await page.locator('.workspace-nav a[href="#workspace"]').click();await page.locator('#note-body').waitFor();assert.equal(await theme.isChecked(),false);
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Otevřít navigaci',exact:true}).click();await page.locator('[data-header-panel="navigation"]').waitFor();await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Otevřít navigaci',exact:true}).isVisible());
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log('Playground: centred Office, original Header, dark/light and mobile navigation OK.');
}finally{await browser.close();}})().catch(e=>{console.error(`::error title=Playground check::${String(e.stack||e).replaceAll('%','%25').replaceAll('\n','%0A')}`);process.exitCode=1;});
