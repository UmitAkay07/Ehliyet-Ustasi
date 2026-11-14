// Sesli anlatım süre tahmini testleri.  Çalıştır: node --test scripts/test-okuma-suresi.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { enGecOkumaBitisMs, OKUMA_PAYI_MS, ORTALAMA_HARF_SN, tahminiOkumaMs } from "../src/utils/okumaSuresi.ts";

test("boş metinde yalnızca başlangıç payı kalır", () => {
  assert.equal(enGecOkumaBitisMs(""), OKUMA_PAYI_MS);
  assert.equal(enGecOkumaBitisMs("   "), OKUMA_PAYI_MS);
});

test("üst sınır, gerçek okuma süresinin rahatça üstünde (anlatım kesilmez)", () => {
  const metin = "Sıradaki alanımız U dönüşü istasyonu. Sola sinyalinizi vererek dubalarla çevrili alana girin ve güvenli bir şekilde U dönüşünüzü gerçekleştirin.";
  for (const hiz of [0.9, 1]) {
    const gercek = (metin.length / (ORTALAMA_HARF_SN * hiz)) * 1000;
    assert.ok(enGecOkumaBitisMs(metin, hiz) > gercek * 1.5, `hiz ${hiz}`);
  }
});

test("yavaş okuma daha uzun bekler; aşırı hız değerleri sınırlanır", () => {
  const m = "a".repeat(100);
  assert.ok(enGecOkumaBitisMs(m, 0.8) > enGecOkumaBitisMs(m, 1));
  assert.equal(enGecOkumaBitisMs(m, 0.1), enGecOkumaBitisMs(m, 0.5));
  assert.equal(enGecOkumaBitisMs(m, 9), enGecOkumaBitisMs(m, 2));
});

test("tahmini okuma: harf sayısıyla orantılı, en geç bitişten kısa, hız sınırlı", () => {
  const metin = "a".repeat(140);
  assert.equal(tahminiOkumaMs(metin, 1), 10000);
  assert.ok(tahminiOkumaMs(metin, 0.9) > tahminiOkumaMs(metin, 1));
  assert.ok(tahminiOkumaMs(metin, 0.9) < enGecOkumaBitisMs(metin, 0.9));
  assert.equal(tahminiOkumaMs("  "), 0);
  assert.equal(tahminiOkumaMs(metin, 9), tahminiOkumaMs(metin, 2));
  assert.equal(ORTALAMA_HARF_SN, 14);
});
