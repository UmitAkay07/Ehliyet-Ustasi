// Ana ekran widget'ının saf mantık testleri (düzen seçimi, ölçek, metin durumu, depodan sayılar, SVG çizimleri).
// Çalıştır: npm run test:widget
import test from "node:test";
import assert from "node:assert/strict";
import {
  GENIS_ALT_SINIR,
  SERIT_UST_SINIR,
  gunAnahtari,
  gunlukSayilarDepodan,
  ilerlemeOrani,
  sinavDurumu,
  widgetDuzeniSec,
  widgetOlcegi,
} from "../src/utils/widgetDuzeni.ts";
import { koseYaricapi, yolOlculeri, yolSvg, zeminSvg } from "../src/widget/cizimler.ts";

test("düzen: tek sıra şerit, 2 hücre genişliğinde kare, daha genişse geniş", () => {
  assert.equal(widgetDuzeniSec(160, 80), "serit");
  assert.equal(widgetDuzeniSec(340, 110), "serit");
  assert.equal(widgetDuzeniSec(165, 185), "kare");
  assert.equal(widgetDuzeniSec(140, 152), "kare");
  assert.equal(widgetDuzeniSec(165, 285), "kare");
  assert.equal(widgetDuzeniSec(255, 185), "genis");
  assert.equal(widgetDuzeniSec(340, 185), "genis");
});

test("düzen sınırları", () => {
  assert.equal(widgetDuzeniSec(200, SERIT_UST_SINIR - 1), "serit");
  assert.equal(widgetDuzeniSec(200, SERIT_UST_SINIR), "kare");
  assert.equal(widgetDuzeniSec(GENIS_ALT_SINIR - 1, 200), "kare");
  assert.equal(widgetDuzeniSec(GENIS_ALT_SINIR, 200), "genis");
});

test("ölçek tasarım boyutunda 1, uçlarda sınırlı", () => {
  assert.equal(widgetOlcegi("kare", 165, 185), 1);
  assert.equal(widgetOlcegi("serit", 340, 90), 1);
  assert.equal(widgetOlcegi("kare", 60, 60), 0.78);
  assert.equal(widgetOlcegi("kare", 600, 600), 1.3);
  assert.equal(widgetOlcegi("genis", 255, 185), 255 / 280);
  assert.equal(widgetOlcegi("serit", 300, 40), 0.8);
  for (const duzen of ["serit", "kare", "genis"]) {
    const k = widgetOlcegi(duzen, Number.NaN, 100);
    assert.ok(Number.isFinite(k));
  }
});

test("sınav durumu", () => {
  assert.equal(sinavDurumu(null), "yok");
  assert.equal(sinavDurumu(23), "geri-sayim");
  assert.equal(sinavDurumu(0), "bugun");
  assert.equal(sinavDurumu(-3), "gecti");
});

test("ilerleme oranı 0..1, hedef yoksa tamam", () => {
  assert.equal(ilerlemeOrani(5, 20), 0.25);
  assert.equal(ilerlemeOrani(30, 20), 1);
  assert.equal(ilerlemeOrani(-2, 20), 0);
  assert.equal(ilerlemeOrani(0, 0), 1);
});

test("gün anahtarı yerel tarihe göre (uygulamanın sayaç anahtarıyla aynı)", () => {
  assert.equal(gunAnahtari(new Date(2026, 10, 11, 0, 5).getTime()), "2026-11-11");
  assert.equal(gunAnahtari(new Date(2026, 10, 11, 23, 55).getTime()), "2026-11-11");
  assert.equal(gunAnahtari(new Date(2026, 0, 1, 12, 0).getTime()), "2026-01-01");
});

test("depodan bugünkü sayılar", () => {
  const simdi = new Date(2026, 10, 11, 15, 0).getTime();
  const depo = JSON.stringify({
    state: {
      gunlukAktivite: { "2026-11-10": 30, "2026-11-11": 12 },
      cozulenSorular: { a: {}, b: {}, c: {} },
    },
    version: 0,
  });
  assert.deepEqual(gunlukSayilarDepodan(depo, simdi), { bugunCozulen: 12, cozulenSayisi: 3 });
});

test("depo boş, bozuk ya da beklenmedik biçimdeyse sıfır", () => {
  const simdi = Date.now();
  const sifir = { bugunCozulen: 0, cozulenSayisi: 0 };
  assert.deepEqual(gunlukSayilarDepodan(null, simdi), sifir);
  assert.deepEqual(gunlukSayilarDepodan("", simdi), sifir);
  assert.deepEqual(gunlukSayilarDepodan("{bozuk", simdi), sifir);
  assert.deepEqual(gunlukSayilarDepodan(JSON.stringify({ state: [] }), simdi), sifir);
  const tuhaf = JSON.stringify({ state: { gunlukAktivite: { [gunAnahtari(simdi)]: "on" }, cozulenSorular: [1, 2] } });
  assert.deepEqual(gunlukSayilarDepodan(tuhaf, simdi), sifir);
});

test("yol: araba ilerlemeyle sağa gider, bayrağı geçmez, yolun dışına taşmaz", () => {
  const g = { genislik: 137, yukseklik: 18 };
  const bas = yolOlculeri({ ...g, ilerleme: 0 });
  const orta = yolOlculeri({ ...g, ilerleme: 0.5 });
  const son = yolOlculeri({ ...g, ilerleme: 1 });
  assert.ok(bas.aracArka >= 0);
  assert.ok(bas.aracOn < orta.aracOn && orta.aracOn < son.aracOn);
  assert.ok(son.aracOn <= son.bayrakX);
  assert.ok(son.bayrakX < g.genislik);
  assert.deepEqual(yolOlculeri({ ...g, ilerleme: 5 }), son);
  assert.deepEqual(yolOlculeri({ ...g, ilerleme: Number.NaN }), bas);
});

test("yol ve zemin SVG'leri her boyutta geçerli sayılar içerir", () => {
  for (const [w, h] of [
    [20, 6],
    [88, 12],
    [137, 18],
    [400, 24],
  ]) {
    for (const ilerleme of [0, 0.4, 1]) {
      const svg = yolSvg({ genislik: w, yukseklik: h, ilerleme });
      assert.ok(svg.startsWith("<svg"), svg);
      assert.ok(!/NaN|Infinity/.test(svg), svg);
      assert.ok(svg.includes(`viewBox="0 0 ${w} ${h}"`));
    }
  }
  for (const duzen of ["serit", "kare", "genis"]) {
    for (const [w, h] of [
      [160, 80],
      [165, 185],
      [340, 185],
    ]) {
      const svg = zeminSvg({ genislik: w, yukseklik: h, duzen });
      assert.ok(!/NaN|Infinity/.test(svg), svg);
      assert.ok(svg.includes("clipPath"));
    }
  }
});

test("köşe yarıçapı 16..24 dp", () => {
  assert.equal(koseYaricapi(160, 60), 16);
  assert.equal(koseYaricapi(340, 185), 24);
  assert.ok(koseYaricapi(165, 140) >= 16 && koseYaricapi(165, 140) <= 24);
});
