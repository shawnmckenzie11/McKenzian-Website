import playwright from '/Users/shawnscomputer/Documents/iaw-saas/node_modules/playwright/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { chromium } = playwright;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const IAW_ROOT = path.resolve(SITE_ROOT, '../iaw-saas');
const IAW_OUT = path.join(SITE_ROOT, 'public/images/work/iaw');
const RESEARCH_OUT = path.join(SITE_ROOT, 'public/images/work/research');

/**
 * Loads KEY=value pairs from an env file into process.env without overwriting.
 * @param {string} envPath
 */
function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(path.join(IAW_ROOT, 'backend/.env'));
loadEnv(path.join(IAW_ROOT, '.env.test'));

const REAL_LABELS = [
  'Mobile Parts Inc.',
  'Mobile Parts',
  'Toromont',
  'Sandvik Mining',
  'Sandvik',
  'Brankor Trophies',
  'Brankor',
  'Jannetec',
  'Wajax',
  'Redpath (North)',
  'Redpath',
  'Bull Power',
  'Komatsu (260)',
  'Komatsu',
  'Timberland Equipment Limited',
  'Timberland',
];

const DEMO = [
  'Demo Warehouse',
  'North Clinic',
  'Acme Supply',
  'River Depot',
  'Cedar Mill',
  'Lakeside Lab',
  'Pioneer Yard',
  'Summit Parts',
  'Harbor Works',
  'Maple Fabrication',
];

/**
 * Replaces real customer location names before writing a screenshot.
 * @param {import('playwright').Page} page
 */
async function sanitizeDom(page) {
  await page.evaluate(
    ({ labels, demo }) => {
      const replacements = {};
      labels.forEach((label, i) => {
        replacements[label] = demo[i] || `Demo Site ${i + 1}`;
      });
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
          let next = node.nodeValue;
          for (const [from, to] of Object.entries(replacements)) {
            if (next.includes(from)) next = next.split(from).join(to);
          }
          node.nodeValue = next.replace(/\b[\w.+-]+@[\w.-]+\.\w+\b/g, 'dispatcher@example.com');
        }
        node.childNodes.forEach(walk);
      };
      walk(document.body);
      document.querySelectorAll('input').forEach((el) => {
        if (!(el instanceof HTMLInputElement)) return;
        if (el.type === 'password') el.value = '';
        if (el.type === 'email' || /@/.test(el.value)) el.value = 'dispatcher@example.com';
      });
    },
    { labels: REAL_LABELS, demo: DEMO }
  );
}

/**
 * Writes a sanitized PNG of the current viewport.
 * @param {import('playwright').Page} page
 * @param {string} outPath
 */
async function snap(page, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sanitizeDom(page);
  await page.screenshot({ path: outPath, type: 'png' });
  console.log('wrote', outPath);
}

/**
 * Logs a driver in through the IAW PWA login form.
 * @param {import('playwright').Page} page
 * @param {string} username
 * @param {string} pin
 */
async function loginDriver(page, username, pin) {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Driver (PIN)' }).click();
  const inputs = page.locator('.login-card input');
  await inputs.nth(0).fill(username);
  await inputs.nth(1).fill(pin);
  await page.getByText('SIGN IN').click();
}

/**
 * Logs a dispatcher in through the IAW PWA login form.
 * @param {import('playwright').Page} page
 * @param {string} email
 * @param {string} password
 */
async function loginDispatcher(page, email, password) {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Dispatcher' }).click();
  const inputs = page.locator('.login-card input');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
  await page.getByText('SIGN IN').click();
}

/**
 * Captures IAW-SAAS screens from a seeded local instance.
 * @param {import('playwright').Browser} browser
 */
async function captureIaw(browser) {
  const email =
    process.env.E2E_DISPATCHER_EMAIL ||
    process.env.SEED_DISPATCHER_EMAIL ||
    'dispatcher@example.com';
  const password = process.env.E2E_DISPATCHER_PASSWORD || process.env.SEED_DISPATCHER_PASSWORD;
  const pin = (process.env.SEED_DRIVER_PINS || '').split(',')[0]?.trim();
  if (!password || !pin) {
    throw new Error('Missing SEED_DISPATCHER_PASSWORD or SEED_DRIVER_PINS in iaw-saas env');
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Driver (PIN)' }).waitFor();
  await snap(page, path.join(IAW_OUT, '01-login.png'));

  await loginDriver(page, 'driver.o', pin);
  await page.getByText(/driver portal/i).waitFor({ timeout: 15000 });
  await snap(page, path.join(IAW_OUT, '02-driver-dashboard.png'));
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Driver (PIN)' }).waitFor();

  const loginRes = await page.request.post('http://localhost:3000/api/auth/dispatcher/login', {
    data: { email, password },
  });
  if (!loginRes.ok()) {
    throw new Error(`Dispatcher API login failed: ${loginRes.status()}`);
  }
  const { token } = await loginRes.json();
  const auth = { Authorization: `Bearer ${token}` };
  const podWaybill = `POD-${Date.now().toString().slice(-6)}`;
  const quoteWaybill = `PORT-${Date.now().toString().slice(-6)}`;

  await loginDispatcher(page, email, password);
  await page.locator('.dispatch-title').waitFor({ timeout: 15000 });
  await snap(page, path.join(IAW_OUT, '04-dispatch.png'));

  await page.getByRole('button', { name: /new pickup/i }).click();
  await page.getByText('Quick Select Pickup Location:').waitFor();
  await snap(page, path.join(IAW_OUT, '03-pickup.png'));
  await page.locator('.back-header-btn').click();
  await page.locator('.dispatch-title').waitFor({ timeout: 15000 });

  await page.request.post('http://localhost:3000/api/waybills', {
    headers: auth,
    data: {
      clientSideUuid: crypto.randomUUID(),
      waybillNumber: podWaybill,
      pickupLocationName: 'Acme Warehouse',
      pickupAddress: '100 Synthetic St',
      dropoffDestinationName: 'Gamma Depot',
      dropoffAddress: '300 Fixture Rd',
      parcelDescription: 'Portfolio parcel',
      parcelQuantity: 1,
      priority: 'REGULAR',
      vehicleType: 'CAR',
      driverId: 'drv-01',
      podRequired: true,
    },
  });
  await page.request.post(`http://localhost:3000/api/waybills/${podWaybill}/events`, {
    headers: auth,
    data: { eventType: 'WAYBILL_PICKED_UP', data: {} },
  });

  await page.request.post('http://localhost:3000/api/waybills', {
    headers: auth,
    data: {
      clientSideUuid: crypto.randomUUID(),
      waybillNumber: quoteWaybill,
      pickupLocationName: 'Walkthrough Origin',
      pickupAddress: '100 Demo St',
      dropoffDestinationName: 'Walkthrough Destination',
      dropoffAddress: '200 Demo Ave',
      parcelDescription: 'Portfolio quote parcel',
      parcelQuantity: 1,
      priority: 'REGULAR',
      vehicleType: 'CAR',
    },
  });
  await page.request.post(`http://localhost:3000/api/waybills/${quoteWaybill}/events`, {
    headers: auth,
    data: {
      eventType: 'DISPATCHER_OVERRIDE',
      data: { status: 'DELIVERED', pricingTotalCost: 0 },
    },
  });

  await page.reload();
  await page.getByRole('button', { name: /completed pending \$/i }).click();
  await page.getByText(quoteWaybill).click();
  await page.getByText(/pending price/i).first().waitFor();
  await snap(page, path.join(IAW_OUT, '06-pending-price.png'));
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('.modal-overlay').waitFor({ state: 'hidden', timeout: 10000 });

  await page.getByRole('button', { name: /accounting/i }).click();
  await page.getByRole('heading', { name: /accounting/i }).waitFor({ timeout: 10000 });
  await page.getByRole('button', { name: 'Payroll' }).click();
  await page.getByText(/payroll employees/i).waitFor();
  await snap(page, path.join(IAW_OUT, '07-accounting.png'));

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await loginDriver(page, 'driver.o', pin);
  await page.getByText(/driver portal/i).waitFor({ timeout: 15000 });
  const podButton = page.getByRole('button', { name: /deliver w\/ pod/i }).first();
  if (await podButton.count()) {
    await podButton.click();
    await page.getByText(/sign off/i).waitFor({ timeout: 10000 });
    await snap(page, path.join(IAW_OUT, '05-signoff.png'));
  } else {
    const deliverBtn = page.getByRole('button', { name: /^deliver$/i }).first();
    if (await deliverBtn.count()) {
      await deliverBtn.click();
      await page.waitForTimeout(500);
    }
    await snap(page, path.join(IAW_OUT, '05-signoff.png'));
  }

  for (const wb of [quoteWaybill, podWaybill]) {
    await page.request.post(`http://localhost:3000/api/waybills/${wb}/events`, {
      headers: auth,
      data: { eventType: 'WAYBILL_VOIDED', data: {} },
    });
  }
  await page.close();
}

/**
 * Captures a school-safe Academic Research Catalog screenshot via DOM override.
 * @param {import('playwright').Browser} browser
 */
async function captureResearch(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://paperscraper.mckenzian.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    document.title = 'Academic Research Catalog';
    const h1 = document.querySelector('h1');
    if (h1) h1.innerHTML = '<span>Academic</span> Research Catalog';
    document.querySelectorAll('th, td, .filter-header, h4, label, span').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (/cannabis/i.test(text) && text.length < 80) {
        const hide = el.closest('th, .filter-header, h4, .drawer-card, canvas, .chart-card') || el;
        if (hide instanceof HTMLElement) hide.style.display = 'none';
      }
    });
    document.querySelectorAll('[class*="cannabis" i], [id*="cannabis" i]').forEach((el) => {
      if (el instanceof HTMLElement) el.style.display = 'none';
    });
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
        node.nodeValue = node.nodeValue
          .replace(/cannabinoids?/gi, 'compounds')
          .replace(/cannabis/gi, 'compound')
          .replace(/marijuana/gi, 'compound')
          .replace(/\bTHC\b/g, 'analyte')
          .replace(/\bCBD\b/g, 'analyte');
      }
      node.childNodes.forEach(walk);
    };
    walk(document.body);
  });
  fs.mkdirSync(RESEARCH_OUT, { recursive: true });
  const out = path.join(RESEARCH_OUT, 'catalog.png');
  await page.screenshot({ path: out, type: 'png' });
  console.log('wrote', out);
  await page.close();
}

async function main() {
  fs.mkdirSync(IAW_OUT, { recursive: true });
  fs.mkdirSync(RESEARCH_OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    await captureIaw(browser);
  } catch (err) {
    console.error('IAW capture failed:', err);
    throw err;
  } finally {
    try {
      await captureResearch(browser);
    } catch (err) {
      console.error('Research capture failed:', err);
    }
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
