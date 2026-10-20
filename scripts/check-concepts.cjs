// A short interaction smoke for the static creative previews. No application test suite.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.CONCEPTS_URL || 'http://127.0.0.1:4188/creative-concepts/';
(async () => {
  const browser = await chromium.launch({ ...(process.env.PLAYWRIGHT_CHROME_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROME_EXECUTABLE } : {}), headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const overflow = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal overflow');
    for (const slug of ['immersive-studio', 'modular-playground', 'spatial-workspace']) {
      await page.goto(base + slug + '/');
      await page.locator('.office').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const theme of ['dark', 'light']) {
        if (await page.locator('html').getAttribute('data-theme') !== theme) await page.getByRole('switch', { name: 'Tmavý režim' }).click();
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
        await overflow();
        if (process.env.CONCEPT_SCREENSHOTS) await page.screenshot({ path: `${process.env.CONCEPT_SCREENSHOTS}/${slug}-${theme}.png`, fullPage: true });
      }
      await page.locator('.workspace-nav a[href="#widgets"]').click();
      await page.locator('main[data-view=widgets]').waitFor();
      assert.equal(await page.locator('.widget-tile').count(), 10);
      await page.getByRole('button', { name: 'Média', exact: true }).click();
      assert.equal(await page.locator('.widget-tile').count(), 4);
      await page.locator('.workspace-nav a[href="#tools/find"]').click();
      await page.locator('#phrase').fill('dobré spojení');
      await page.locator('#tool-form button[type=submit], #tool-form .primary').click();
      await page.locator('.loading-card').waitFor();
      await page.locator('.results-card').waitFor();
      assert.match(await page.locator('.results-card').innerText(), /dobré spojení/);
      await page.getByRole('button', { name: 'Zobrazit chybový stav' }).click();
      await page.locator('.error-card').waitFor();
      await page.getByRole('button', { name: 'Zkusit znovu' }).click();
      await page.locator('.results-card').waitFor();
      await page.locator('.tool-topline [data-action=pin]').click();
      await page.locator('.workspace-nav a[href="#workspace"]').click();
      await page.locator('main[data-view=workspace]').waitFor();
      assert.equal(await page.locator('.note-list-item').count(), 4);
      await page.getByRole('button', { name: 'Nová poznámka', exact: true }).click();
      await page.locator('#new-title').fill('Můj nový nápad');
      await page.getByRole('button', { name: 'Vytvořit poznámku' }).click();
      await page.locator('#note-body').fill('Světlo, prostor a souvislosti.');
      await page.locator('.workspace-nav a[href="#dashboard"]').click();
      await page.locator('.notebook-card').click();
      assert.equal(await page.locator('#note-body').inputValue(), 'Světlo, prostor a souvislosti.');
      if (process.env.CONCEPT_SCREENSHOTS) await page.screenshot({ path: `${process.env.CONCEPT_SCREENSHOTS}/${slug}-notebook.png`, fullPage: true });
      await page.getByRole('button', { name: 'Nastavení', exact: true }).click();
      await page.locator('#theme-select').selectOption('dark');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(d=>d.open), false);
      await page.setViewportSize({ width: 390, height: 844 });
      for (const view of ['dashboard','widgets','tools/find','workspace']) {
        await page.locator(`.workspace-nav a[href="#${view}"]`).click();
        await page.locator(`main[data-view="${view.split('/')[0]}"]`).waitFor();
        await overflow();
      }
      if (process.env.CONCEPT_SCREENSHOTS) await page.screenshot({ path: `${process.env.CONCEPT_SCREENSHOTS}/${slug}-mobile.png`, fullPage: true });
      await page.setViewportSize({ width: 1366, height: 768 });
      console.log(`${slug}: dark/light, widgets, loading/results/error, Notebook, dialogs and mobile OK`);
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(`::error title=Creative concepts smoke::${String(error.stack || error).replaceAll('%','%25').replaceAll('\n','%0A').replaceAll('\r','%0D')}`); process.exitCode=1; });
