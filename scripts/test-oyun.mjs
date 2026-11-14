// Oyunlaştırma (XP, seviye, rozet) testleri.  Çalıştır: npm run test:oyun
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SEVIYE_ADLARI,
  XP_DENEME,
  XP_DOGRU_SORU,
  XP_KONU,
  XP_PROVA,
  XP_PROVA_GECTI,
  enUzunSeri,
  rozetleriHesapla,
  seviyeBaslangicXp,
  seviyeBilgisi,
  xpHesapla,
} from "../src/utils/oyun.ts";

const bos = {
  cozulenSoru: 0, dogruSoru: 0, toplamDeneme: 0, toplamSoru: 595,
  okunanKonu: 0, toplamKonu: 32, provaSayisi: 0, gecilenProva: 0, enYuksekProva: 0,
  seri: 0, enUzunSeri: 0, hataSayisi: 0,
};
const g = (ek) => ({ ...bos, ...ek });
const rozetler = (ek) => Object.fromEntries(rozetleriHesapla(g(ek)).map((r) => [r.id, r]));

// ---------------------------------------------------------------- XP

test("XP: hiç veri yoksa 0, formül ağırlıkları doğru", () => {
  assert.equal(xpHesapla(bos), 0);
  assert.equal(xpHesapla(g({ toplamDeneme: 10 })), 10 * XP_DENEME);
  assert.equal(xpHesapla(g({ dogruSoru: 10 })), 10 * XP_DOGRU_SORU);
  assert.equal(xpHesapla(g({ okunanKonu: 3 })), 3 * XP_KONU);
  assert.equal(xpHesapla(g({ provaSayisi: 2, gecilenProva: 1 })), 2 * XP_PROVA + XP_PROVA_GECTI);
  assert.equal(xpHesapla(g({ toplamDeneme: 100, dogruSoru: 80, okunanKonu: 10, provaSayisi: 3, gecilenProva: 2 })), 100 * 2 + 80 * 8 + 10 * 25 + 3 * 40 + 2 * 60);
});

test("XP: bozuk girdi (negatif, NaN, sonsuz) çökmez ve sonuç sonlu, negatif olmaz", () => {
  const xp = xpHesapla(g({ toplamDeneme: -5, dogruSoru: NaN, okunanKonu: Infinity, provaSayisi: -1 }));
  assert.ok(Number.isFinite(xp) && xp >= 0, String(xp));
});

test("XP: bir şey artınca puan azalmaz (tekdüzelik)", () => {
  const alanlar = ["toplamDeneme", "dogruSoru", "okunanKonu", "provaSayisi", "gecilenProva"];
  const taban = g({ toplamDeneme: 50, dogruSoru: 30, okunanKonu: 5, provaSayisi: 2, gecilenProva: 1 });
  for (const a of alanlar) {
    assert.ok(xpHesapla({ ...taban, [a]: taban[a] + 1 }) > xpHesapla(taban), `${a} artınca XP artmalı`);
  }
});

test("XP: bütün havuzu doğru çözmek makul bir seviyeye çıkarır (11-13 arası)", () => {
  const xp = xpHesapla(g({ cozulenSoru: 595, dogruSoru: 595, toplamDeneme: 595, okunanKonu: 32, provaSayisi: 5, gecilenProva: 5 }));
  const s = seviyeBilgisi(xp).seviye;
  assert.ok(s >= 11 && s <= 13, `seviye ${s}, xp ${xp}`);
});

// ---------------------------------------------------------------- seviye

test("seviye eşikleri: 0, 50, 200, 450 ... tam sınırda atlar", () => {
  assert.equal(seviyeBaslangicXp(1), 0);
  assert.equal(seviyeBaslangicXp(2), 50);
  assert.equal(seviyeBaslangicXp(3), 200);
  assert.equal(seviyeBaslangicXp(4), 450);
  assert.equal(seviyeBilgisi(0).seviye, 1);
  assert.equal(seviyeBilgisi(49).seviye, 1);
  assert.equal(seviyeBilgisi(50).seviye, 2);
  assert.equal(seviyeBilgisi(199).seviye, 2);
  assert.equal(seviyeBilgisi(200).seviye, 3);
  assert.equal(seviyeBilgisi(449).seviye, 3);
  assert.equal(seviyeBilgisi(450).seviye, 4);
});

test("seviye bilgisi: ilerleme 0..1, kalan XP tutarlı, XP arttıkça seviye azalmaz", () => {
  let onceki = 0;
  for (let xp = 0; xp <= 12000; xp += 7) {
    const b = seviyeBilgisi(xp);
    assert.ok(b.ilerleme >= 0 && b.ilerleme < 1, `xp=${xp} ilerleme=${b.ilerleme}`);
    assert.equal(b.kalanXp, b.sonrakiXp - xp);
    assert.ok(b.seviye >= onceki, `xp=${xp}: seviye düştü`);
    assert.ok(xp >= b.baslangicXp && xp < b.sonrakiXp);
    onceki = b.seviye;
  }
});

test("seviye adları: ilk seviye 'Çırak', 10 ve üzeri son ad", () => {
  assert.equal(seviyeBilgisi(0).ad, "Çırak");
  assert.equal(seviyeBilgisi(seviyeBaslangicXp(10)).ad, SEVIYE_ADLARI[9]);
  assert.equal(seviyeBilgisi(seviyeBaslangicXp(25)).ad, SEVIYE_ADLARI[9], "10'un üstünde son ad kalır");
  assert.equal(seviyeBilgisi(-50).seviye, 1);
  assert.equal(seviyeBilgisi(NaN).seviye, 1);
});

// ---------------------------------------------------------------- en uzun seri

test("enUzunSeri: boş, tek gün, boşluklu günler", () => {
  assert.equal(enUzunSeri({}), 0);
  assert.equal(enUzunSeri({ "2026-11-10": 3 }), 1);
  assert.equal(enUzunSeri({ "2026-11-01": 2, "2026-11-02": 5, "2026-11-03": 1, "2026-11-05": 9, "2026-11-06": 1 }), 3);
});

test("enUzunSeri: sıradan bağımsız, 0 sayılı günler seriyi böler, ay ve yıl geçişi, artık yıl", () => {
  const karisik = { "2026-11-03": 1, "2026-11-01": 1, "2026-11-02": 1 };
  assert.equal(enUzunSeri(karisik), 3);
  assert.equal(enUzunSeri({ "2026-11-01": 1, "2026-11-02": 0, "2026-11-03": 1 }), 1, "0 soru çözülen gün seriyi böler");
  assert.equal(enUzunSeri({ "2026-10-30": 1, "2026-10-31": 1, "2026-11-01": 1 }), 3, "ay geçişi");
  assert.equal(enUzunSeri({ "2026-12-31": 1, "2027-01-01": 1 }), 2, "yıl geçişi");
  assert.equal(enUzunSeri({ "2028-02-28": 1, "2028-02-29": 1, "2028-03-01": 1 }), 3, "artık yıl");
  assert.equal(enUzunSeri({ "2027-02-28": 1, "2027-03-01": 1 }), 2, "artık olmayan yıl");
  assert.equal(enUzunSeri({ bozuk: 5, "2026-13-xx": 1, "": 1 }), 0, "geçersiz anahtarlar yok sayılır");
});

// ---------------------------------------------------------------- rozetler

test("rozetler: kimlikler benzersiz, ilerleme 0..1, hiç veri yokken hiçbiri kazanılmamış", () => {
  const liste = rozetleriHesapla(bos);
  assert.equal(new Set(liste.map((r) => r.id)).size, liste.length);
  for (const r of liste) {
    assert.ok(r.ilerleme >= 0 && r.ilerleme <= 1, r.id);
    assert.ok(r.baslik && r.aciklama && r.ikon && r.durum.includes("/"), r.id);
  }
  // "Tertemiz Defter" boş defter + 0 çözülen soruyla da kazanılmamalı
  assert.equal(liste.filter((r) => r.kazanildi).length, 0);
});

test("rozetler: eşik değerleri tam sınırda kazanılır", () => {
  assert.equal(rozetler({ cozulenSoru: 0 })["ilk-adim"].kazanildi, false);
  assert.equal(rozetler({ cozulenSoru: 1 })["ilk-adim"].kazanildi, true);
  assert.equal(rozetler({ dogruSoru: 99 })["yuz-dogru"].kazanildi, false);
  assert.equal(rozetler({ dogruSoru: 100 })["yuz-dogru"].kazanildi, true);
  assert.equal(rozetler({ cozulenSoru: 297 })["havuz-yarisi"].kazanildi, false);
  assert.equal(rozetler({ cozulenSoru: 298 })["havuz-yarisi"].kazanildi, true); // ceil(595/2)
  assert.equal(rozetler({ cozulenSoru: 594 })["tam-havuz"].kazanildi, false);
  assert.equal(rozetler({ cozulenSoru: 595 })["tam-havuz"].kazanildi, true);
  assert.equal(rozetler({ enUzunSeri: 2 })["seri-3"].kazanildi, false);
  assert.equal(rozetler({ enUzunSeri: 7 })["seri-7"].kazanildi, true);
  assert.equal(rozetler({ enUzunSeri: 7 })["seri-30"].kazanildi, false);
  assert.equal(rozetler({ enYuksekProva: 89 })["prova-90"].kazanildi, false);
  assert.equal(rozetler({ enYuksekProva: 90 })["prova-90"].kazanildi, true);
  assert.equal(rozetler({ enYuksekProva: 98 })["prova-100"].kazanildi, false);
  assert.equal(rozetler({ enYuksekProva: 100 })["prova-100"].kazanildi, true);
  assert.equal(rozetler({ okunanKonu: 31 })["konu-avcisi"].kazanildi, false);
  assert.equal(rozetler({ okunanKonu: 32 })["konu-avcisi"].kazanildi, true);
});

test("rozetler: 'Geçtin!' yalnızca geçilen prova varsa; ilk prova yalnızca prova varsa", () => {
  assert.equal(rozetler({ provaSayisi: 3, gecilenProva: 0 })["prova-gecti"].kazanildi, false);
  assert.equal(rozetler({ provaSayisi: 3, gecilenProva: 1 })["prova-gecti"].kazanildi, true);
  assert.equal(rozetler({ provaSayisi: 0 })["ilk-prova"].kazanildi, false);
  assert.equal(rozetler({ provaSayisi: 1 })["ilk-prova"].kazanildi, true);
});

test("rozetler: tertemiz defter — hata varsa kazanılmaz ve ilerleme 0, hata yoksa çözülen soruya göre dolar", () => {
  const hatali = rozetler({ cozulenSoru: 200, hataSayisi: 3 })["temiz-defter"];
  assert.equal(hatali.kazanildi, false);
  assert.equal(hatali.ilerleme, 0);
  const yarim = rozetler({ cozulenSoru: 25, hataSayisi: 0 })["temiz-defter"];
  assert.equal(yarim.kazanildi, false);
  assert.equal(yarim.ilerleme, 0.5);
  assert.equal(rozetler({ cozulenSoru: 50, hataSayisi: 0 })["temiz-defter"].kazanildi, true);
  assert.equal(rozetler({ cozulenSoru: 0, hataSayisi: 0 })["temiz-defter"].kazanildi, false, "hiç soru çözmeden 'temiz defter' olmaz");
});

test("rozetler: girdi arttıkça kazanılmış rozet geri alınmaz (tekdüzelik)", () => {
  const alanlar = ["cozulenSoru", "dogruSoru", "okunanKonu", "provaSayisi", "gecilenProva", "enYuksekProva", "enUzunSeri"];
  let tohum = 7;
  const rastgele = () => ((tohum = (tohum * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let i = 0; i < 300; i++) {
    const taban = g(Object.fromEntries(alanlar.map((a) => [a, Math.floor(rastgele() * 120)])));
    const buyuk = { ...taban, ...Object.fromEntries(alanlar.map((a) => [a, taban[a] + Math.floor(rastgele() * 50)])) };
    const once = rozetleriHesapla(taban);
    const sonra = rozetleriHesapla(buyuk);
    for (let k = 0; k < once.length; k++) {
      if (once[k].kazanildi) assert.ok(sonra[k].kazanildi, `${once[k].id} geri alındı`);
      assert.ok(sonra[k].ilerleme >= once[k].ilerleme - 1e-9, `${once[k].id} ilerlemesi düştü`);
    }
  }
});

test("rozet simgeleri gerçekten var olan Ionicons adlarıdır", () => {
  const harita = JSON.parse(readFileSync(new URL("../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json", import.meta.url), "utf8"));
  for (const r of rozetleriHesapla(bos)) assert.ok(r.ikon in harita, `${r.id}: '${r.ikon}' Ionicons'ta yok`);
});

test("bozuk girdiyle rozet hesabı çökmez", () => {
  const liste = rozetleriHesapla(g({ cozulenSoru: NaN, dogruSoru: -10, toplamSoru: 0, toplamKonu: 0, okunanKonu: Infinity }));
  for (const r of liste) assert.ok(r.ilerleme >= 0 && r.ilerleme <= 1 && !r.durum.includes("NaN"), r.id);
});
