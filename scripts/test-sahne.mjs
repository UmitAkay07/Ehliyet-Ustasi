// Senaryo sahneleri testleri.  Çalıştır: npm run test:sahne
// Telefonda göremediğimiz animasyonların geometrik olarak doğru olduğunu kontrol eder.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ARAC_UZUNLUK,
  COCUK_YARICAP,
  YAYA_YARICAP,
  aciHesapla,
  aracDaireleri,
  enYakinMesafe,
  konumHesapla,
  sahneKaresi,
  sinyalAcikMi,
  svgMetni,
} from "../src/animations/sahne.ts";
import { SENARYO_SAHNELERI } from "../src/data/senaryolar.ts";

const ORNEK = 400;
const adimlar = Array.from({ length: ORNEK + 1 }, (_, i) => i / ORNEK);
const sahne = (id) => SENARYO_SAHNELERI[id];
const yesil = (id) => sahne(id).araclar.find((a) => a.renk === "yesil");
const dolu = (a) => a * 1;

// ---------------------------------------------------------------- motor

test("konumHesapla: uç noktalar, duraklama ve sınır dışı t", () => {
  const k = [[0, 0, 10], [0.4, 40, 10], [0.6, 40, 10], [1, 100, 10]];
  assert.deepEqual(konumHesapla(k, 0), { x: 0, y: 10 });
  assert.deepEqual(konumHesapla(k, 1), { x: 100, y: 10 });
  assert.deepEqual(konumHesapla(k, -5), { x: 0, y: 10 });
  assert.deepEqual(konumHesapla(k, 7), { x: 100, y: 10 });
  assert.equal(konumHesapla(k, 0.5).x, 40, "duraklama süresince konum sabit");
  assert.deepEqual(konumHesapla([], 0.5), { x: 0, y: 0 });
  assert.deepEqual(konumHesapla([[0, 3, 4]], 0.5), { x: 3, y: 4 });
});

test("konumHesapla: hareket tek yönlü (geri gitmez) ve süreklidir", () => {
  const k = [[0, 4, 34.5], [0.3, 31, 34.5], [0.62, 31, 34.5], [1, 96, 34.5]];
  let onceki = -Infinity;
  for (const t of adimlar) {
    const { x } = konumHesapla(k, t);
    assert.ok(x >= onceki - 1e-9, `t=${t}: geri gitti`);
    if (onceki !== -Infinity) assert.ok(x - onceki < 3, `t=${t}: zıpladı (${x - onceki})`);
    onceki = x;
  }
});

test("aciHesapla: doğuya 0, kuzeye -90 derece, dururken son yönü korur", () => {
  const dogu = [[0, 0, 30], [1, 100, 30]];
  assert.ok(Math.abs(aciHesapla(dogu, 0.5)) < 1e-6);
  const kuzey = [[0, 50, 60], [1, 50, 0]];
  assert.ok(Math.abs(aciHesapla(kuzey, 0.5) + Math.PI / 2) < 1e-6);
  const dur = [[0, 0, 30], [0.4, 40, 30], [1, 40, 30]];
  assert.ok(Math.abs(aciHesapla(dur, 0.9)) < 1e-6, "durduktan sonra yön korunur");
});

test("sinyal: pencere dışında kapalı, içinde yanıp söner", () => {
  const arac = { renk: "yesil", kareler: [[0, 0, 0], [1, 1, 1]], sinyal: { taraf: "sol", zaman: [0.2, 0.6] } };
  assert.equal(sinyalAcikMi(arac, 0.1), false);
  assert.equal(sinyalAcikMi(arac, 0.9), false);
  const acik = adimlar.filter((t) => t >= 0.2 && t <= 0.6 && sinyalAcikMi(arac, t)).length;
  const kapali = adimlar.filter((t) => t >= 0.2 && t <= 0.6 && !sinyalAcikMi(arac, t)).length;
  assert.ok(acik > 20 && kapali > 20, "yanıp sönmeli");
});

// ---------------------------------------------------------------- veri bütünlüğü

test("20 senaryo sorusunun hepsinin sahnesi var ve fazladan sahne yok", () => {
  const metin = readFileSync(new URL("../src/data/sorular/senaryo.ts", import.meta.url), "utf8");
  const idler = [...metin.matchAll(/id:\s*"(sen-\d+)"/g)].map((m) => m[1]);
  assert.equal(idler.length, 20);
  for (const id of idler) assert.ok(SENARYO_SAHNELERI[id], `${id} için sahne yok`);
  for (const id of Object.keys(SENARYO_SAHNELERI)) assert.ok(idler.includes(id), `${id} soru dosyasında yok`);
});

test("her sahne geçerli: zaman anahtarları sıralı, 0'dan 1'e, sonlu sayılar, lejant var", () => {
  for (const [id, s] of Object.entries(SENARYO_SAHNELERI)) {
    assert.ok(s.araclar.length >= 1, `${id}: araç yok`);
    assert.ok(s.lejant.length >= 1, `${id}: lejant yok`);
    const hareketliler = [...s.araclar, ...(s.yayalar ?? [])];
    for (const h of hareketliler) {
      const k = h.kareler;
      assert.equal(k[0][0], 0, `${id}: ilk anahtar t=0 olmalı`);
      assert.equal(k[k.length - 1][0], 1, `${id}: son anahtar t=1 olmalı`);
      for (let i = 0; i < k.length; i++) {
        assert.ok(k[i].every(Number.isFinite), `${id}: sonlu olmayan sayı`);
        if (i > 0) assert.ok(k[i][0] >= k[i - 1][0], `${id}: t sıralı değil (${k[i - 1][0]} > ${k[i][0]})`);
      }
    }
  }
});

test("sahneKaresi ve svgMetni her sahne ve anda sonlu sayılarla çalışır", () => {
  for (const [id, s] of Object.entries(SENARYO_SAHNELERI)) {
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const primler = sahneKaresi(s, t);
      assert.ok(primler.length > 5, `${id}: çok az şekil`);
      const svg = svgMetni(primler);
      assert.ok(svg.startsWith("<svg") && svg.endsWith("</svg>"));
      assert.ok(!svg.includes("NaN") && !svg.includes("Infinity"), `${id} t=${t}: NaN`);
    }
  }
});

// ---------------------------------------------------------------- çarpışma

test("araçlar birbirine girmez (tüm sahneler, tüm anlar)", () => {
  const ihlaller = [];
  for (const [id, s] of Object.entries(SENARYO_SAHNELERI)) {
    for (let i = 0; i < s.araclar.length; i++) {
      for (let j = i + 1; j < s.araclar.length; j++) {
        for (const t of adimlar) {
          const bosluk = enYakinMesafe(aracDaireleri(s.araclar[i], t), aracDaireleri(s.araclar[j], t));
          if (bosluk < 0.3) ihlaller.push(`${id} t=${t.toFixed(2)} ${s.araclar[i].renk}/${s.araclar[j].renk} boşluk=${bosluk.toFixed(2)}`);
        }
      }
    }
  }
  assert.deepEqual(ihlaller.slice(0, 8), []);
});

test("yayalar araçların üstüne basmaz", () => {
  const ihlaller = [];
  for (const [id, s] of Object.entries(SENARYO_SAHNELERI)) {
    for (const arac of s.araclar) {
      for (const yaya of s.yayalar ?? []) {
        const r = yaya.cocuk ? COCUK_YARICAP : YAYA_YARICAP;
        for (const t of adimlar) {
          const p = konumHesapla(yaya.kareler, t);
          const bosluk = enYakinMesafe(aracDaireleri(arac, t), [{ x: p.x, y: p.y, r }]);
          if (bosluk < 0.3) ihlaller.push(`${id} t=${t.toFixed(2)} boşluk=${bosluk.toFixed(2)}`);
        }
      }
    }
  }
  assert.deepEqual(ihlaller.slice(0, 8), []);
});

// ---------------------------------------------------------------- sahne cevapla tutarlı mı

const KAVSAK_KUTU = { x0: 41, x1: 59, y0: 21, y1: 39 };
const kutuda = (x, y, pay = 0) => x > KAVSAK_KUTU.x0 - pay && x < KAVSAK_KUTU.x1 + pay && y > KAVSAK_KUTU.y0 - pay && y < KAVSAK_KUTU.y1 + pay;
const YARIM = ARAC_UZUNLUK / 2;

test("sen-01 / sen-06: sağdan gelen kavşakta iken yeşil araç kavşağın dışında bekler", () => {
  for (const id of ["sen-01", "sen-06"]) {
    const s = sahne(id);
    const kirmizi = s.araclar.find((a) => a.renk === "kirmizi");
    let kesisti = false;
    for (const t of adimlar) {
      const k = konumHesapla(kirmizi.kareler, t);
      if (kutuda(k.x, k.y)) {
        kesisti = true;
        const g = konumHesapla(yesil(id).kareler, t);
        assert.ok(g.x + YARIM <= KAVSAK_KUTU.x0 + 0.2, `${id} t=${t.toFixed(2)}: yeşil araç kırmızı kavşaktayken kavşağa girmiş (x=${g.x.toFixed(1)})`);
      }
    }
    assert.ok(kesisti, `${id}: kırmızı araç kavşaktan geçmeli`);
  }
});

test("sen-09: ana yoldaki yeşil kavşaktan geçerken tali yoldaki kırmızı kavşağın dışında bekler", () => {
  const s = sahne("sen-09");
  const kirmizi = s.araclar.find((a) => a.renk === "kirmizi");
  let gecti = false;
  for (const t of adimlar) {
    const g = konumHesapla(yesil("sen-09").kareler, t);
    if (kutuda(g.x, g.y)) {
      gecti = true;
      const k = konumHesapla(kirmizi.kareler, t);
      assert.ok(k.y - YARIM >= KAVSAK_KUTU.y1 - 0.2, `t=${t.toFixed(2)}: kırmızı araç kavşağa girmiş (y=${k.y.toFixed(1)})`);
    }
  }
  assert.ok(gecti);
});

test("sen-19: yeşil araç dur çizgisinden önce tamamen durur, kırmızı geçtikten sonra devam eder", () => {
  const s = sahne("sen-19");
  const k = yesil("sen-19").kareler;
  const durus = adimlar.filter((t) => {
    const a = konumHesapla(k, t);
    const b = konumHesapla(k, Math.min(1, t + 0.0025));
    return Math.hypot(b.x - a.x, b.y - a.y) < 1e-6 && t > 0.05 && t < 0.95;
  });
  assert.ok(durus.length >= 0.2 * ORNEK, "yeterince uzun süre durmalı");
  const durX = konumHesapla(k, durus[0]).x;
  assert.ok(durX + YARIM <= 40.5, `dur çizgisini (x=40.5) geçmiş: ${durX + YARIM}`);

  const kirmizi = s.araclar.find((a) => a.renk === "kirmizi");
  const ilkHareket = durus[durus.length - 1];
  const kr = konumHesapla(kirmizi.kareler, ilkHareket);
  assert.ok(!kutuda(kr.x, kr.y, 3), "yeşil kalkarken kırmızı hâlâ kavşakta");
});

test("yaya geçidi (sen-04, 08, 12, 17): yaya yeşil aracın şeridindeyken araç geçidin önünde durur", () => {
  const SERIT = { y0: 32.2, y1: 36.8 };
  const GECIT_X0 = 44;
  for (const id of ["sen-04", "sen-08", "sen-12", "sen-17"]) {
    const s = sahne(id);
    let seridinde = false;
    for (const t of adimlar) {
      const g = konumHesapla(yesil(id).kareler, t);
      for (const y of s.yayalar) {
        const p = konumHesapla(y.kareler, t);
        if (p.y > SERIT.y0 - 1.5 && p.y < SERIT.y1 + 1.5 && p.x > 44 && p.x < 56) {
          seridinde = true;
          assert.ok(g.x + YARIM <= GECIT_X0 + 0.2, `${id} t=${t.toFixed(2)}: araç geçide girmiş iken yaya şeritte (araç önü ${(g.x + YARIM).toFixed(1)})`);
        }
      }
    }
    assert.ok(seridinde, `${id}: yaya aracın şeridini geçmeli`);
  }
});

test("sen-07: yeşil araç sollamadan vazgeçer ve kırmızının gerisinde kendi şeridine döner", () => {
  const s = sahne("sen-07");
  const k = yesil("sen-07").kareler;
  const kirmizi = s.araclar.find((a) => a.renk === "kirmizi");
  const enSol = Math.min(...adimlar.map((t) => konumHesapla(k, t).y));
  assert.ok(enSol < 31, "sollamaya başlamalı (karşı şeride taşmalı)");
  const son = konumHesapla(k, 1);
  assert.ok(Math.abs(son.y - 34.5) < 0.01, "kendi şeridine dönmeli");
  assert.ok(son.x < konumHesapla(kirmizi.kareler, 1).x, "kırmızının önüne geçmemeli");
});

test("sen-10 / sen-15: yeşil araç karşı şeritte, karşıdan gelenle arada kısa mesafe kalır (uyarı gösterilir)", () => {
  for (const id of ["sen-10", "sen-15"]) {
    const s = sahne(id);
    const mavi = s.araclar.find((a) => a.renk === "mavi");
    const bosluk = enYakinMesafe(aracDaireleri(yesil(id), 1), aracDaireleri(mavi, 1));
    assert.ok(bosluk > 0.3 && bosluk < 14, `${id}: son kareda boşluk ${bosluk.toFixed(1)}`);
    assert.ok(s.ustEkler.some((p) => p.tip === "cokgen" && p.zaman && p.zaman[1] === 1), `${id}: uyarı işareti yok`);
  }
});

test("sen-20: yeşil araç sollayıp kırmızının belirgin biçimde önünde sağ şeride döner", () => {
  const s = sahne("sen-20");
  const k = yesil("sen-20").kareler;
  const kirmizi = s.araclar.find((a) => a.renk === "kirmizi");
  const son = konumHesapla(k, 1);
  const kr = konumHesapla(kirmizi.kareler, 1);
  assert.ok(Math.abs(son.y - 34.5) < 0.01, "sağ şeritte bitmeli");
  assert.ok(son.x - kr.x > 15, "güvenli mesafe (>15 birim) bırakmalı");
  const yanYana = adimlar.some((t) => Math.abs(konumHesapla(k, t).x - konumHesapla(kirmizi.kareler, t).x) < 3);
  assert.ok(yanYana, "sollama sırasında yan yana gelmeli");
});

test("sen-14: halka kavşakta yeşil araç saat yönünün tersine (ekranda sol → alt → sağ) döner", () => {
  const k = yesil("sen-14").kareler;
  const acilar = adimlar
    .map((t) => konumHesapla(k, t))
    .filter((p) => Math.hypot(p.x - 50, p.y - 30) > 10 && Math.hypot(p.x - 50, p.y - 30) < 13)
    .map((p) => Math.atan2(p.y - 30, p.x - 50));
  assert.ok(acilar.length > 20, "halkada yeterince dolaşmalı");
  // ekran koordinatında (y aşağı) açı azalıyorsa saat yönünün tersi
  for (let i = 1; i < acilar.length; i++) assert.ok(acilar[i] <= acilar[i - 1] + 1e-6, "saat yönünde dönüyor");
});
