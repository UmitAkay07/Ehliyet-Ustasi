// Arama testleri.  Çalıştır: npm run test:arama
import test from "node:test";
import assert from "node:assert/strict";
import { MIN_SORGU_UZUNLUGU, ara, aramaDizini, dizindeAra, normalize } from "../src/utils/arama.ts";

test("normalize: Türkçe harfler, büyük/küçük harf, nokta ve boşluk", () => {
  assert.equal(normalize("Işık"), "isik");
  assert.equal(normalize("ışık"), "isik");
  assert.equal(normalize("IŞIK"), "isik");
  assert.equal(normalize("İstanbul"), "istanbul");
  assert.equal(normalize("ISTANBUL"), "istanbul");
  assert.equal(normalize("ÇĞİÖŞÜ çğıöşü"), "cgiosu cgiosu");
  assert.equal(normalize("  yaya   geçidi  "), "yaya gecidi");
  assert.equal(normalize(""), "");
});

test("normalize: kendi kendine tutarlı (idempotent) ve İ'nin birleşik nokta işaretini siler", () => {
  for (const s of ["Işık", "İlk Yardım", "ÖĞÜT", "kırmızı ışık", "i̇stanbul"]) {
    assert.equal(normalize(normalize(s)), normalize(s));
  }
  assert.equal(normalize("i̇stanbul"), "istanbul");
});

const konular = [
  { baslik: "Yaya Geçidi Kuralları", ozet: "Geçitte yayaya öncelik" },
  { baslik: "Işık ve Sinyal", ozet: "Kırmızı ışıkta durmak" },
  { baslik: "Hız Sınırları", ozet: "Yerleşim yeri dışında hız ve ışık" },
  { baslik: "Park Etme", ozet: "Yaya yolu üzerinde park yasak" },
];
const alan = (k) => [k.baslik, k.ozet];

test("ara: Türkçe karaktersiz yazılan sorgu Türkçe karakterli metni bulur", () => {
  assert.deepEqual(ara(konular, alan, "isik").map((r) => r.oge.baslik), ["Işık ve Sinyal", "Hız Sınırları"]);
  assert.equal(ara(konular, alan, "ISIK").length, 2);
  assert.equal(ara(konular, alan, "yaya gecidi")[0].oge.baslik, "Yaya Geçidi Kuralları");
  assert.equal(ara(konular, alan, "hiz")[0].oge.baslik, "Hız Sınırları");
});

test("ara: bütün kelimeler eşleşmeli (VE), sırası önemsiz", () => {
  assert.deepEqual(ara(konular, alan, "yaya park").map((r) => r.oge.baslik), ["Park Etme"]);
  assert.deepEqual(ara(konular, alan, "park yaya").map((r) => r.oge.baslik), ["Park Etme"]);
  assert.deepEqual(ara(konular, alan, "yaya kirmizi"), [], "hiçbir öğede ikisi birden yok");
});

test("ara: başlıkta eşleşen, yalnızca gövdede eşleşenden önce gelir (girdi sırasından bağımsız)", () => {
  // Gövdede eşleşen öğe girdi sırasında ÖNDE: sıralama puanla yapılmazsa bu test kırılır
  const ters = [
    { baslik: "Park Etme", ozet: "Yaya yolu üzerinde park yasak" },
    { baslik: "Hız Sınırları", ozet: "Yerleşim yeri dışında ışık ve hız" },
    { baslik: "Yaya Geçidi Kuralları", ozet: "Geçitte yayaya öncelik" },
    { baslik: "Işık ve Sinyal", ozet: "Kırmızı ışıkta durmak" },
  ];
  const s = ara(ters, alan, "yaya").map((r) => r.oge.baslik);
  assert.deepEqual(s, ["Yaya Geçidi Kuralları", "Park Etme"], "başlığında 'yaya' olan önce, gövdede olan sonra");
  const isik = ara(ters, alan, "ışık").map((r) => r.oge.baslik);
  assert.equal(isik[0], "Işık ve Sinyal", "başlıkta 'ışık' olan, özetinde geçenden önce");
  assert.equal(isik[1], "Hız Sınırları");
});

test("ara: kelime başı eşleşmesi, kelime ortasındakinden önce gelir", () => {
  const liste = [{ b: "Kavşakta durma" }, { b: "Yan şerit uyarısı" }, { b: "Şeritli yol" }];
  // "serit": 'Yan şerit' (kelime başı) ve 'Şeritli' (kelime başı), 'Kavşakta' hiç içermez
  const r = ara(liste, (x) => [x.b], "erit").map((x) => x.oge.b);
  assert.equal(r.length, 2, "'erit' iki başlıkta kelime ortasında geçer");
  const basi = ara([{ b: "Yoldaki serit" }, { b: "Seritli yol" }], (x) => [x.b], "serit").map((x) => x.oge.b);
  assert.deepEqual(basi, ["Yoldaki serit", "Seritli yol"], "ikisi de kelime başı: girdi sırası");
  const karisik = ara([{ b: "Kavsakserit" }, { b: "Serit cizgisi" }], (x) => [x.b], "serit").map((x) => x.oge.b);
  assert.deepEqual(karisik, ["Serit cizgisi", "Kavsakserit"], "kelime başında eşleşen, ortada eşleşenden önce");
});

test("ara: tam başlık eşleşmesi en üstte; eşit puanda girdi sırası korunur", () => {
  // Tam eşleşme girdi sırasında SONDA: puanlama yoksa kırılır
  const liste = [{ b: "Fren Mesafesi" }, { b: "ABS ve Fren" }, { b: "Fren" }];
  assert.equal(ara(liste, (x) => [x.b], "fren")[0].oge.b, "Fren");
  const esit = [{ b: "Kavşak A" }, { b: "Kavşak B" }, { b: "Kavşak C" }];
  assert.deepEqual(ara(esit, (x) => [x.b], "kavsak").map((r) => r.oge.b), ["Kavşak A", "Kavşak B", "Kavşak C"]);
});

test("ara: kısa/boş sorgu, limit, boş alan listesi", () => {
  assert.equal(MIN_SORGU_UZUNLUGU, 2);
  assert.deepEqual(ara(konular, alan, ""), []);
  assert.deepEqual(ara(konular, alan, "   "), []);
  assert.deepEqual(ara(konular, alan, "y"), [], "tek harfle aranmaz");
  assert.equal(ara(konular, alan, "ya", 1).length, 1, "limit uygulanır");
  assert.deepEqual(ara(konular, alan, "ya", 0), []);
  assert.deepEqual(ara([{ a: 1 }], () => [], "abc"), [], "alanı olmayan öğe bulunmaz");
  assert.deepEqual(ara([], alan, "yaya"), []);
});

test("ara: girdi dizisini değiştirmez; çok sayıda öğede hızlıdır", () => {
  const kopya = JSON.stringify(konular);
  ara(konular, alan, "yaya");
  assert.equal(JSON.stringify(konular), kopya);

  const buyuk = Array.from({ length: 5000 }, (_, i) => ({ baslik: `Soru ${i} yaya geçidi ışık`, ozet: "metin ".repeat(20) }));
  const t0 = Date.now();
  const r = ara(buyuk, alan, "yaya isik 42", 20);
  assert.ok(Date.now() - t0 < 500, "5000 öğede 500 ms'yi aşmamalı");
  assert.ok(r.length >= 1 && r.length <= 20);
});

test("ara: noktalama ve rakam içeren sorgular", () => {
  const liste = [{ b: "Hız sınırı 50 km/s" }, { b: "Hız sınırı 90 km/s" }];
  assert.deepEqual(ara(liste, (x) => [x.b], "50 km").map((r) => r.oge.b), ["Hız sınırı 50 km/s"]);
  assert.equal(ara(liste, (x) => [x.b], "km/s").length, 2);
});

test("dizindeAra: hazır dizinle aynı sonuçlar, dizin tekrar tekrar kullanılabilir", () => {
  const dizin = aramaDizini(konular, alan);
  for (const sorgu of ["isik", "ISIK", "yaya gecidi", "hiz", "yaya park", "park", "x", "", "olmayan kelime"]) {
    assert.deepEqual(dizindeAra(dizin, sorgu), ara(konular, alan, sorgu), sorgu);
    assert.deepEqual(dizindeAra(dizin, sorgu, 1), ara(konular, alan, sorgu, 1), sorgu);
  }
  assert.equal(dizin.hepsi.length, konular.length);
});
