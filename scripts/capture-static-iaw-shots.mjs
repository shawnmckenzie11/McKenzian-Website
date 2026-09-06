import playwright from '/Users/shawnscomputer/Documents/iaw-saas/node_modules/playwright/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const { chromium } = playwright;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/images/work/iaw');

/**
 * Screenshots static IAW UI fixtures (synthetic seed names only — no login).
 */
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto(`file://${path.join(__dirname, 'snapshot-fixtures/signoff.html')}`);
  await page.screenshot({ path: path.join(OUT, '05-signoff.png'), type: 'png' });
  console.log('wrote 05-signoff.png');

  await page.goto(`file://${path.join(__dirname, 'snapshot-fixtures/accounting.html')}`);
  await page.screenshot({ path: path.join(OUT, '07-accounting.png'), type: 'png' });
  console.log('wrote 07-accounting.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
