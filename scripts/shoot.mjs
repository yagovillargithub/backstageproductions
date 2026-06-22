import { mkdirSync } from "node:fs";
const pw = await import("file:///C:/GitHub/UNLIMITED_Web/node_modules/playwright/index.js");
const chromium = pw.chromium ?? pw.default?.chromium;

const OUT = "C:/GitHub/backstageproductions/scripts/shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "/"],
  ["artistas", "/artistas"],
  ["sesiones", "/sesiones"],
  ["eventos", "/eventos"],
  ["contacto", "/contacto"],
];

/* Las secciones entran con data-reveal (opacity:0 hasta que el
   IntersectionObserver las cruza). Recorremos la página en pasos de viewport
   para disparar todos los observers, luego volvemos arriba: así la captura
   refleja el estado revelado real, no un fullPage congelado. */
async function revealAll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(120);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(250);
    window.scrollTo(0, 0);
    await sleep(250);
  });
}

const browser = await chromium.launch({
  executablePath:
    "C:/Users/Yago/AppData/Local/ms-playwright/chromium-1148/chrome-win/chrome.exe",
});

// Desktop full-page
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [name, path] of pages) {
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(600);
  await revealAll(p);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log("ok desktop", name);
  await p.close();
}
await ctx.close();

// Mobile home
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
await mp.waitForTimeout(600);
await revealAll(mp);
await mp.waitForTimeout(500);
await mp.screenshot({ path: `${OUT}/home-mobile.png`, fullPage: true });
console.log("ok mobile home");
await m.close();

await browser.close();
console.log("DONE");
