"use strict";
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
fs.mkdirSync("screenshots", { recursive: true });
const server = spawn("python3", ["-m", "http.server", "8768", "--bind", "127.0.0.1"], { stdio: "ignore" });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  await sleep(1100);
  const browser = await chromium.launch({ headless: true });
  const sizes = [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1366, height: 768 }, { width: 1600, height: 900 }];
  const results = [];
  try {
    for (const viewport of sizes) {
      const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      page.on("response", response => { if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:8768/")) errors.push(response.status() + " " + response.url()); });
      try {
        const res = await page.goto("http://127.0.0.1:8768/", { waitUntil: "load" });
        if (res.status() !== 200) errors.push("HTTP " + res.status());
        await page.getByRole("heading", { name: /Um pequeno amigo/i }).waitFor();
        const meter = page.locator("#saciedade");
        if (await meter.evaluate((el) => el.value) !== 75) errors.push("Estado inicial incorreto");
        await page.getByRole("button", { name: "Alimentar" }).click();
        if (await meter.evaluate((el) => el.value) !== 100) errors.push("Alimentar falhou");
        await page.getByRole("button", { name: "Dormir" }).click();
        if (await page.locator("#energia").evaluate((el) => el.value) !== 100) errors.push("Dormir falhou");
        await page.reload();
        if (await meter.evaluate((el) => el.value) !== 96) errors.push("Estado não persistiu após recarregar");
        page.once("dialog", dialog => dialog.accept());
        await page.getByRole("button", { name: "Reiniciar exemplo" }).click();
        if (await meter.evaluate((el) => el.value) !== 75) errors.push("Reiniciar falhou");
        const img = await page.request.get("http://127.0.0.1:8768/sprits/char1.png");
        if (img.status() !== 200) errors.push("Sprite ausente");
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)) errors.push("Overflow");
        await page.screenshot({ path: "screenshots/baby-" + viewport.width + "x" + viewport.height + ".png", fullPage: true, animations: "disabled" });
        results.push({ viewport, passed: errors.length === 0, errors });
      } catch (error) { errors.push(error.message); results.push({ viewport, passed: false, errors }); }
      finally { await context.close(); }
    }
  } finally { await browser.close(); server.kill(); }
  fs.writeFileSync("screenshots/diagnostics.json", JSON.stringify(results, null, 2));
  results.forEach(result => console.log(JSON.stringify(result)));
  if (results.length !== sizes.length || results.some(result => !result.passed)) process.exitCode = 1;
})().catch(error => { console.error(error); server.kill(); process.exitCode = 1; });
