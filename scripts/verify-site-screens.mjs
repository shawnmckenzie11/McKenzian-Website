import playwright from '/Users/shawnscomputer/Documents/iaw-saas/node_modules/playwright/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const { chromium } = playwright;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../tmp-verify');

/**
 * Renders key marketing routes for visual verification.
 */
async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const routes = [
    ['home', 'http://127.0.0.1:5173/#/'],
    ['contact', 'http://127.0.0.1:5173/#/contact'],
    ['legacy-work-redirect', 'http://127.0.0.1:5173/#/work'],
  ];
  for (const [name, url] of routes) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true, type: 'png' });
    console.log(name, page.url());
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
