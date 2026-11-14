// Ehliyet yol haritası testleri.  Çalıştır: npm run test:yol
// Bu testler içerik politikasını da denetler: metinlerde sayı, ücret, süre ya da yönetmelik bilgisi olmamalı.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { YOL_ADIMLARI, YOL_HARITASI_ONAYLI, yolIlerlemesi } from "../src/data/yolHaritasi.ts";

const tumMetinler = YOL_ADIMLARI.flatMap((a) => [a.baslik, a.aciklama, a.rotaEtiketi ?? ""]);

test("onay bayrağı bilinçli olarak kapalıdır (içerik doğrulanana kadar uygulamada görünmez)", () => {
  assert.equal(typeof YOL_HARITASI_ONAYLI, "boolean");
  assert.equal(YOL_HARITASI_ONAYLI, false, "içerik doğrulanmadan bayrak açılmamalı; açıldıysa bu test bilinçli güncellenmeli");
});

test("adımlar: kimlikler benzersiz, metinler dolu, sıra mantıklı", () => {
  const idler = YOL_ADIMLARI.map((a) => a.id);
  assert.equal(new Set(idler).size, idler.length);
  for (const a of YOL_ADIMLARI) {
    assert.ok(a.baslik.trim().length >= 5 && a.aciklama.trim().length >= 20, a.id);
    assert.ok(a.baslik.length <= 50, `${a.id}: başlık uzun`);
    assert.ok(a.aciklama.length <= 200, `${a.id}: açıklama uzun`);
  }
  // Yazılı sınav direksiyon sınavından önce, belge teslimi en sonda
  const sira = (id) => idler.indexOf(id);
  assert.ok(sira("e-sinav") < sira("direksiyon-sinavi"));
  assert.ok(sira("kayit") < sira("teori"));
  assert.equal(idler[idler.length - 1], "belge");
});

// JavaScript'te \b Türkçe harfleri "kelime karakteri" saymaz; bu yüzden Unicode duyarlı sınırlar kullanılır.
const KELIME = (desen) => new RegExp(String.raw`(?<![\p{L}])(?:${desen})(?![\p{L}])`, "iu");
// Türkçe ekli hâller ("ücretini", "kanunun") için kök eşleştirme: kelime başı sabit, sonu serbest
const KOK = (desen) => new RegExp(String.raw`(?<![\p{L}])(?:${desen})\p{L}*`, "iu");
const SAYI_YAZIYLA = "bir|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on|yirmi|otuz|kırk|elli|yüz";
// "ay" gibi kısa birimler "ayna" gibi masum sözcükleri yakalamasın diye ekler açıkça listelenir
const BIRIM = "gün|günlük|günde|hafta|haftalık|haftada|ay|aylık|ayda|saat|saatlik|dakika|dakikada|yıl|yıllık|puan|soru|hak|hakkı|deneme|kez|defa";
const YASAKLAR = [
  ["rakam", /\d/],
  ["para birimi", KOK("₺|tl|lira|ücret|harç|bedel|fiyat")],
  // yazıyla yazılmış sayı + süre/miktar birimi (ör. "iki hafta", "otuz gün", "elli soru")
  ["süre ya da miktar", KELIME(String.raw`(?:${SAYI_YAZIYLA})\s+(?:${BIRIM})`)],
  ["mevzuat atfı", KOK("madde|yönetmelik|kanun|sayılı")],
];
// "İ" büyük/küçük harf duyarsız eşleşmede "i" ile eşleşmez ("İki hafta" kaçardı); bu yüzden önce Türkçe kurallarıyla küçültülür.
const yakalayan = (metin) => {
  const kucuk = metin.toLocaleLowerCase("tr");
  return YASAKLAR.filter(([, desen]) => desen.test(kucuk)).map(([ad]) => ad);
};

test("içerik politikası: metinlerde rakam, ücret, süre/miktar ya da mevzuat atfı yok", () => {
  for (const metin of tumMetinler) {
    assert.deepEqual(yakalayan(metin), [], `yasak içerik: "${metin}"`);
  }
});

test("içerik politikası denetleyicisi gerçekten yakalar (olumsuz örnekler)", () => {
  assert.deepEqual(yakalayan("Sınav ücreti 1250 TL"), ["rakam", "para birimi"]);
  assert.deepEqual(yakalayan("İki hafta içinde başvur"), ["süre ya da miktar"]);
  assert.deepEqual(yakalayan("Kanun gereği gereklidir"), ["mevzuat atfı"]);
  assert.deepEqual(yakalayan("Elli soru çözülür"), ["süre ya da miktar"]);
  assert.deepEqual(yakalayan("Harç yatırılır"), ["para birimi"]);
  assert.deepEqual(yakalayan("Yönetmelik maddesine göre"), ["mevzuat atfı"]);
  assert.deepEqual(yakalayan("Sınav 3 gün sonra"), ["rakam"]);
  // Türkçe ekli hâller
  assert.deepEqual(yakalayan("Kursun ücretini karşılaştır"), ["para birimi"]);
  assert.deepEqual(yakalayan("Kanunun gereği"), ["mevzuat atfı"]);
  assert.deepEqual(yakalayan("Maddesine bak"), ["mevzuat atfı"]);
  assert.deepEqual(yakalayan("Otuz günlük süre"), ["süre ya da miktar"]);
  assert.deepEqual(yakalayan("İki haftada tamamlanır"), ["süre ya da miktar"]);
});

test("içerik politikası denetleyicisi masum cümleleri yakalamaz (yanlış alarm yok)", () => {
  for (const iyi of [
    "Sınav gününe hazırlan",
    "Sürücü kursunu seç",
    "Günlük tekrarı unutma",
    "Bir sürücü kursu seç",
    "Doğru cevabı işaretle",
    "Ayrıntıları kursundan öğren",
    "Aynayı kontrol et ve bir ayna ayarı yap",
    "Atlas gibi ayrıntılı bir harita",
  ]) {
    assert.deepEqual(yakalayan(iyi), [], `yanlış alarm: "${iyi}"`);
  }
});

test("her adım dış kaynağı doğrulamaya yönlendirir ya da uygulama içi bir ekrana bağlıdır", () => {
  for (const a of YOL_ADIMLARI) {
    const yonlendirir = /(kurs|resmî|MEB|e-Devlet|yetkili)/i.test(a.aciklama);
    assert.ok(yonlendirir || a.rota, `${a.id}: ne doğrulama yönlendirmesi ne uygulama bağlantısı var`);
  }
});

test("uygulama içi bağlantılar gerçekten var olan ekranlara gider", () => {
  for (const a of YOL_ADIMLARI.filter((x) => x.rota)) {
    assert.ok(a.rotaEtiketi, `${a.id}: rota var ama etiket yok`);
    const yol = a.rota.replace(/^\//, "").split("?")[0];
    const dosya = new URL(`../app/${yol}.tsx`, import.meta.url);
    assert.ok(existsSync(dosya), `${a.id}: ${a.rota} için app/${yol}.tsx yok`);
  }
});

test("yolIlerlemesi: boş, kısmi, tam, bilinmeyen kimlikler ve bozuk girdi", () => {
  const bos = yolIlerlemesi({});
  assert.equal(bos.tamamlanan, 0);
  assert.equal(bos.oran, 0);
  assert.equal(bos.siradaki.id, YOL_ADIMLARI[0].id);

  const kismi = yolIlerlemesi({ [YOL_ADIMLARI[0].id]: 1, [YOL_ADIMLARI[1].id]: 2 });
  assert.equal(kismi.tamamlanan, 2);
  assert.equal(kismi.siradaki.id, YOL_ADIMLARI[2].id);
  assert.ok(Math.abs(kismi.oran - 2 / YOL_ADIMLARI.length) < 1e-12);

  const atlayan = yolIlerlemesi({ [YOL_ADIMLARI[3].id]: 5 }); // ortadan bir adım işaretlendi
  assert.equal(atlayan.siradaki.id, YOL_ADIMLARI[0].id, "sıradaki, tamamlanmamış İLK adımdır");

  const tam = yolIlerlemesi(Object.fromEntries(YOL_ADIMLARI.map((a) => [a.id, 1])));
  assert.equal(tam.oran, 1);
  assert.equal(tam.siradaki, null);

  assert.equal(yolIlerlemesi({ "yok-adim": 123, baska: 5 }).tamamlanan, 0, "bilinmeyen kimlikler sayılmaz");
  assert.equal(yolIlerlemesi(null).tamamlanan, 0);
  assert.equal(yolIlerlemesi(undefined).toplam, YOL_ADIMLARI.length);
});
