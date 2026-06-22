import { mkdirSync } from "node:fs";
const pw = await import("file:///C:/GitHub/UNLIMITED_Web/node_modules/playwright/index.js");
const chromium = pw.chromium ?? pw.default?.chromium;

const OUT = "C:/GitHub/backstageproductions/scripts/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "C:/Users/Yago/AppData/Local/ms-playwright/chromium-1148/chrome-win/chrome.exe",
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.waitForTimeout(600);

// Abrir el panel Tweaks (FAB flotante)
const fab = p.locator(".twk-fab").first();
await fab.click();
await p.waitForTimeout(700);
await p.screenshot({ path: `${OUT}/tweaks-panel.png` });
console.log("ok panel abierto");

// Cambiar a paleta clara "acero" para probar re-tematizado en vivo
const acero = p.locator('[data-palette-swatch="acero"], button:has-text("Acero")').first();
const cnt = await acero.count();
if (cnt > 0) {
  await acero.click();
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/tweaks-acero.png` });
  console.log("ok paleta acero");
} else {
  // Fallback: forzar atributos como hace el provider, para ver el re-tematizado
  await p.evaluate(() => {
    const h = document.documentElement;
    h.setAttribute("data-palette", "acero");
    h.setAttribute("data-theme", "light");
    h.style.setProperty("--accent-shift", "26deg");
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/tweaks-acero.png` });
  console.log("ok paleta acero (via atributos)");
}

await browser.close();
console.log("DONE");
