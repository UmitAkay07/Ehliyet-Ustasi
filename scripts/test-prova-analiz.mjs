// Prova analizi testleri.  Çalıştır: npm run test:prova
import test from "node:test";
import assert from "node:assert/strict";
import { konuKaybiHesapla, provaOzetiHesapla, sonrakiDikkatIndeksi, SORU_PUANI } from "../src/utils/provaAnaliz.ts";

const soru = (konuId, dersId, dogruIndex = 0) => ({ konuId, dersId, dogruIndex });

test("konuKaybiHesapla: doğru/yanlış/boş ayrımı ve puan kaybı", () => {
  const sorular = [soru("a", "trafik", 1), soru("a", "trafik", 2), soru("a", "trafik", 0), soru("b", "motor", 3)];
  const cevaplar = [1, 0, null, 3]; // a: doğru, yanlış, boş  /  b: doğru
  const sonuc = konuKaybiHesapla(sorular, cevaplar);
  assert.equal(sonuc.length, 1, "kayıpsız konu (b) listeye girmez");
  assert.deepEqual(sonuc[0], { konuId: "a", dersId: "trafik", toplam: 3, dogru: 1, yanlis: 1, bos: 1, kayipPuan: 4 });
});

test("konuKaybiHesapla: en çok kaybedilen önce; eşitlikte yanlış sayısı, sonra kimlik", () => {
  const sorular = [
    soru("x", "t"), soru("x", "t"),            // x: 2 yanlış → 4
    soru("y", "t"), soru("y", "t"),            // y: 2 boş → 4  (eşit puan, daha az yanlış)
    soru("z", "t"),                            // z: 1 yanlış → 2
    soru("w", "t"), soru("w", "t"), soru("w", "t"), // w: 3 yanlış → 6
  ];
  const cevaplar = [9, 9, null, null, 9, 9, 9, 9];
  assert.deepEqual(konuKaybiHesapla(sorular, cevaplar).map((k) => k.konuId), ["w", "x", "y", "z"]);
});

test("konuKaybiHesapla: toplam kayıp = (soru sayısı − doğru) × 2 ve yanlış/boş toplamları sınav sonucuyla tutar", () => {
  let tohum = 99;
  const rastgele = () => ((tohum = (tohum * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let deneme = 0; deneme < 200; deneme++) {
    const konular = ["k1", "k2", "k3", "k4", "k5", "k6"];
    const sorular = Array.from({ length: 50 }, () => soru(konular[Math.floor(rastgele() * 6)], "t", Math.floor(rastgele() * 4)));
    const cevaplar = sorular.map((s) => {
      const r = rastgele();
      return r < 0.15 ? null : r < 0.65 ? s.dogruIndex : (s.dogruIndex + 1) % 4;
    });
    const dogru = cevaplar.filter((c, i) => c === sorular[i].dogruIndex).length;
    const bos = cevaplar.filter((c) => c === null).length;
    const yanlis = 50 - dogru - bos;
    const sonuc = konuKaybiHesapla(sorular, cevaplar);
    assert.equal(sonuc.reduce((t, k) => t + k.kayipPuan, 0), (50 - dogru) * SORU_PUANI);
    assert.equal(sonuc.reduce((t, k) => t + k.yanlis, 0), yanlis);
    assert.equal(sonuc.reduce((t, k) => t + k.bos, 0), bos);
    for (const k of sonuc) assert.equal(k.dogru + k.yanlis + k.bos, k.toplam);
  }
});

test("konuKaybiHesapla: boş girdi, kusursuz sınav, eksik cevap dizisi", () => {
  assert.deepEqual(konuKaybiHesapla([], []), []);
  assert.deepEqual(konuKaybiHesapla([soru("a", "t", 1)], [1]), [], "hiç puan kaybedilmedi");
  const kisa = konuKaybiHesapla([soru("a", "t", 1), soru("a", "t", 1)], [1]); // ikinci cevap yok → boş
  assert.equal(kisa[0].bos, 1);
  assert.equal(kisa[0].kayipPuan, 2);
  assert.equal(konuKaybiHesapla([soru("a", "t")], [null], 5)[0].kayipPuan, 5, "soru puanı ayarlanabilir");
});

test("provaOzetiHesapla: cevaplanan, boş ve işaretli sayıları ile indeksleri", () => {
  const ozet = provaOzetiHesapla([0, null, 2, null, 1], [false, true, false, true, true]);
  assert.equal(ozet.cevaplanan, 3);
  assert.equal(ozet.bos, 2);
  assert.equal(ozet.isaretli, 3);
  assert.deepEqual(ozet.bosIndeksler, [1, 3]);
  assert.deepEqual(ozet.isaretliIndeksler, [1, 3, 4]);
});

test("provaOzetiHesapla: hiçbir şey yapılmamış, her şey cevaplanmış, işaretli dizisi kısa", () => {
  const bos = provaOzetiHesapla(new Array(50).fill(null), new Array(50).fill(false));
  assert.equal(bos.bos, 50);
  assert.equal(bos.cevaplanan, 0);
  assert.equal(bos.isaretli, 0);
  const tam = provaOzetiHesapla([1, 2, 3], []);
  assert.equal(tam.bos, 0);
  assert.equal(tam.cevaplanan, 3);
  assert.equal(tam.isaretli, 0, "işaretli dizisi kısaysa işaretsiz sayılır");
});

test("sonrakiDikkatIndeksi: sıradaki boş/işaretli soruya gider, sona gelince başa sarar, yoksa null", () => {
  const ozet = provaOzetiHesapla([0, null, 2, 0, null, 1], [false, false, true, false, false, false]);
  // dikkat: 1 (boş), 2 (işaretli), 4 (boş)
  assert.equal(sonrakiDikkatIndeksi(ozet, 0), 1);
  assert.equal(sonrakiDikkatIndeksi(ozet, 1), 2);
  assert.equal(sonrakiDikkatIndeksi(ozet, 2), 4);
  assert.equal(sonrakiDikkatIndeksi(ozet, 4), 1, "sona gelince başa sarar");
  assert.equal(sonrakiDikkatIndeksi(ozet, 5), 1);
  const temiz = provaOzetiHesapla([0, 1, 2], [false, false, false]);
  assert.equal(sonrakiDikkatIndeksi(temiz, 0), null);
});

test("sonrakiDikkatIndeksi: hem boş hem işaretli olan soru tek sayılır", () => {
  const ozet = provaOzetiHesapla([null, 1], [true, false]);
  assert.equal(sonrakiDikkatIndeksi(ozet, 1), 0);
  assert.equal(sonrakiDikkatIndeksi(ozet, 0), 0, "tek aday varken kendine sarar");
});
