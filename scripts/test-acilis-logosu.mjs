// Açılış ekranı logo boyutu testleri.  Çalıştır: node --test scripts/test-acilis-logosu.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { YEREL_ACILIS_LOGO_DP } from "../src/utils/acilisLogosu.ts";

test("logo Android 12 açılış dairesine (192 dp) kesilmeden sığar", () => {
  const KOSE_ORANI = 0.612; // assets/icon-brand.png: en uzak dolu nokta / kenar
  assert.ok(YEREL_ACILIS_LOGO_DP * KOSE_ORANI <= 96);
});

test("app.json açılış logosu genişliği koddaki sabitle aynı (yoksa geçişte logo zıplar)", () => {
  const app = JSON.parse(readFileSync(new URL("../app.json", import.meta.url), "utf8")).expo;
  const eklenti = app.plugins.find((p) => Array.isArray(p) && p[0] === "expo-splash-screen")[1];
  assert.equal(eklenti.imageWidth, YEREL_ACILIS_LOGO_DP);
  assert.equal(eklenti.image, "./assets/icon-brand.png");
  assert.equal(eklenti.dark.image, "./assets/icon-brand.png");
  assert.equal(eklenti.backgroundColor, "#131313");
});
