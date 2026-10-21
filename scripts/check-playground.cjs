// Short visual smoke for the single final bento composition.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
 const browser = await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHROME_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROME_EXECUTABLE} : {})});
 try {
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.PLAYGROUND_URL || 'http://127.0.0.1:4190/creative-concepts/modular-playground/');
  await page.locator('#approved-header .axolotl-pill-nav').waitFor();
  await page.evaluate(() => document.fonts.ready);
  for (const viewport of [{width:1366,height:768},{width:1920,height:1080}]) {
   await page.setViewportSize(viewport);
   for (const dark of [true,false]) {
    await page.getByRole('checkbox',{name:'Tmavý režim',exact:true}).setChecked(dark);
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, dark ? 'dark' : 'light');
    const layout = await page.evaluate(() => {
     const box = el => {const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom};};
     return {cards:[...document.querySelectorAll('.bento-cell')].map(box),header:box(document.querySelector('#approved-header header')),sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight};
    });
    assert.equal(layout.cards.length,7);
    const [office,one,two,three,four,five,six] = layout.cards;
    assert(office.x < one.x && one.x < two.x);
    assert(Math.abs(one.y-two.y)<1 && Math.abs(three.y-four.y)<1);
    assert(Math.abs(office.bottom-three.bottom)<1 && three.y>one.y);
    assert(five.y>office.bottom && Math.abs(five.y-six.y)<1 && five.w>one.w);
    assert(office.y>layout.header.bottom && office.y-layout.header.bottom<=25);
    assert(layout.sw<=viewport.width && layout.sh<=viewport.height,`Overflow at ${viewport.width}: ${layout.sw}×${layout.sh}`);
    assert.equal(await page.locator('main :is(button,input,a),.concept-bar,.workspace-nav,.site-footer').count(),0);
    if(process.env.SCREENSHOT_DIR) await page.screenshot({path:`${process.env.SCREENSHOT_DIR}/final-bento-${viewport.width}-${dark?'dark':'light'}.png`,fullPage:true});
   }
  }
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);
  console.log('Final bento: both desktop sizes fit, dark/light OK, no horizontal mobile overflow.');
 } finally {await browser.close();}
})().catch(e => {console.error(`::error title=Playground check::${String(e.stack||e).replaceAll('%','%25').replaceAll('\n','%0A')}`);process.exitCode=1;});
