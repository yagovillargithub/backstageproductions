import { mkdirSync } from "node:fs";
const pw = await import("file:///C:/GitHub/UNLIMITED_Web/node_modules/playwright/index.js");
const chromium = pw.chromium ?? pw.default?.chromium;

const OUT = "C:/GitHub/backstageproductions/scripts/shots";
mkdirSync(OUT, { recursive: true });
const URL = "https://brecords.unlimited-systems.net/";

const browser = await chromium.launch({
  executablePath:
    "C:/Users/Yago/AppData/Local/ms-playwright/chromium-1148/chrome-win/chrome.exe",
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(600);
await p.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await sleep(120);
  }
  window.scrollTo(0, 0);
  await sleep(250);
});
await p.waitForTimeout(400);
await p.screenshot({ path: `${OUT}/live-home.png`, fullPage: true });
console.log("ok live home");
await browser.close();
console.log("DONE");
