// Kayıtlı durum ayıklama testleri.  Çalıştır: node --test scripts/test-depo-dogrula.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { kayitliDurumuAyikla } from "../src/utils/depoDogrula.ts";

const SEMA = {
  settings: "nesne",
  cozulenSorular: "nesne",
  provaGecmisi: "dizi",
  puanIstegiGosterildi: "mantiksal",
  sonProvaDetayi: "nesneVeyaNull",
};

test("sağlam kayıt olduğu gibi geçer", () => {
  const kayit = {
    settings: { onboardingTamam: true },
    cozulenSorular: { a: { dogru: true } },
    provaGecmisi: [{ puan: 80 }],
    puanIstegiGosterildi: false,
    sonProvaDetayi: null,
  };
  const { gecerli, atilan } = kayitliDurumuAyikla(kayit, SEMA);
  assert.deepEqual(gecerli, kayit);
  assert.deepEqual(atilan, []);
});

test("türü bozuk alan atılır, diğerleri korunur", () => {
  const kayit = { settings: { a: 1 }, cozulenSorular: null, provaGecmisi: {}, puanIstegiGosterildi: "evet", sonProvaDetayi: [] };
  const { gecerli, atilan } = kayitliDurumuAyikla(kayit, SEMA);
  assert.deepEqual(gecerli, { settings: { a: 1 } });
  assert.deepEqual(atilan.sort(), ["cozulenSorular", "provaGecmisi", "puanIstegiGosterildi", "sonProvaDetayi"]);
});

test("eksik alanlar sorun değil (eski sürüm kaydı); şemada olmayanlar alınmaz", () => {
  const { gecerli, atilan } = kayitliDurumuAyikla({ settings: {}, eskiAlan: 5 }, SEMA);
  assert.deepEqual(gecerli, { settings: {} });
  assert.deepEqual(atilan, []);
});

test("kayıt yoksa boş, nesne değilse tamamı atılır", () => {
  assert.deepEqual(kayitliDurumuAyikla(undefined, SEMA), { gecerli: {}, atilan: [] });
  assert.deepEqual(kayitliDurumuAyikla(null, SEMA), { gecerli: {}, atilan: [] });
  assert.deepEqual(kayitliDurumuAyikla("bozuk", SEMA), { gecerli: {}, atilan: ["(tamamı)"] });
  assert.deepEqual(kayitliDurumuAyikla([1, 2], SEMA), { gecerli: {}, atilan: ["(tamamı)"] });
});
