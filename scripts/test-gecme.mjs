// Geçme olasılığı mantığı testleri.  Çalıştır: npm run test:gecme
// Node 22.18+ .ts dosyasını doğrudan içe aktarabilir (gecmeOlasiligi.ts hiçbir import içermez).
import test from "node:test";
import assert from "node:assert/strict";
import {
  GECME_BARAJI,
  MIN_VERI,
  SINAV_SORU_SAYISI,
  cekilmisBasari,
  dersBasariTahmini,
  dogruSayisiDagilimi,
  gecmeOlasiligiHesapla,
  guvenDuzeyi,
  yuzdeMetni,
  zayifKonular,
} from "../src/utils/gecmeOlasiligi.ts";

// Gerçek ders dağılımı: 23 / 12 / 9 / 6
const DAGILIM = { trafik: 23, ilkyardim: 12, motor: 9, adab: 6 };
const HAVUZ = { trafik: 250, ilkyardim: 150, motor: 100, adab: 95 };

/** Her derste havuzun `kapsam` kadarını çözmüş ve `basari` oranında doğru bilmiş biri */
function ogrenci(kapsam, basari) {
  return Object.keys(DAGILIM).map((dersId) => {
    const cozulen = Math.round(HAVUZ[dersId] * kapsam);
    return {
      dersId,
      toplamSoru: HAVUZ[dersId],
      cozulen,
      dogru: Math.round(cozulen * basari),
      sinavSoruSayisi: DAGILIM[dersId],
    };
  });
}

function binom(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

test("dağılım: olasılıklar toplamı 1, uzunluk soru sayısı + 1", () => {
  const d = dogruSayisiDagilimi(Object.entries(DAGILIM).map(([_, n], i) => ({ soruSayisi: n, p: [0.9, 0.5, 0.7, 0.3][i] })));
  assert.equal(d.length, SINAV_SORU_SAYISI + 1);
  assert.ok(Math.abs(d.reduce((a, b) => a + b, 0) - 1) < 1e-9);
});

test("dağılım: tüm sorularda aynı p ise binom ile birebir aynı", () => {
  const p = 0.7;
  const d = dogruSayisiDagilimi([{ soruSayisi: 50, p }]);
  for (const k of [0, 10, 25, 35, 40, 50]) {
    const beklenen = binom(50, k) * p ** k * (1 - p) ** (50 - k);
    assert.ok(Math.abs(d[k] - beklenen) < 1e-12, `k=${k}`);
  }
});

test("ders bölünmesi, aynı ortalama p için binomla aynı sonucu verir", () => {
  const bolunmus = dogruSayisiDagilimi([
    { soruSayisi: 23, p: 0.7 },
    { soruSayisi: 12, p: 0.7 },
    { soruSayisi: 9, p: 0.7 },
    { soruSayisi: 6, p: 0.7 },
  ]);
  const tek = dogruSayisiDagilimi([{ soruSayisi: 50, p: 0.7 }]);
  for (let k = 0; k <= 50; k++) assert.ok(Math.abs(bolunmus[k] - tek[k]) < 1e-12);
});

test("bilinen değerler: 50 sorudan en az 35 doğru (bağımsız binom toplamıyla hesaplanmış referanslar)", () => {
  const ust = (p) => dogruSayisiDagilimi([{ soruSayisi: 50, p }]).slice(GECME_BARAJI).reduce((a, b) => a + b, 0);
  // Referanslar: sum_{k=35..50} C(50,k) p^k (1-p)^(50-k)
  assert.ok(Math.abs(ust(0.6) - 0.095502) < 1e-5, String(ust(0.6)));
  assert.ok(Math.abs(ust(0.7) - 0.569178) < 1e-5, String(ust(0.7)));
  assert.ok(Math.abs(ust(0.8) - 0.969197) < 1e-5, String(ust(0.8)));
});

test("veri yokken: güven 'yok', yeterliVeri false, olasılık düşük", () => {
  const s = gecmeOlasiligiHesapla(ogrenci(0, 0));
  assert.equal(s.guven, "yok");
  assert.equal(s.yeterliVeri, false);
  assert.equal(s.toplamCozulen, 0);
  assert.ok(s.olasilik < 0.05, `veri yokken yüksek çıkmamalı: ${s.olasilik}`);
});

test("az veride çok iyi cevap bile yüksek olasılık vermez (aşırı güven yok)", () => {
  // her dersten 3 soru çözüldü, hepsi doğru
  const girdi = ogrenci(0, 1).map((d) => ({ ...d, cozulen: 3, dogru: 3 }));
  const s = gecmeOlasiligiHesapla(girdi);
  assert.ok(s.olasilik < 0.2, `12 doğru cevap 'geçersin' demek için çok az: ${s.olasilik}`);
  assert.equal(s.yeterliVeri, false);
});

test("tüm havuzu çözüp hepsini doğru bilen kişi neredeyse kesin geçer", () => {
  const s = gecmeOlasiligiHesapla(ogrenci(1, 1));
  assert.ok(s.olasilik > 0.99, String(s.olasilik));
  assert.ok(s.beklenenPuan >= 90);
  assert.equal(s.guven, "yuksek");
});

test("tüm havuzu çözüp çoğunu yanlış bilen kişi neredeyse kesin kalır", () => {
  const s = gecmeOlasiligiHesapla(ogrenci(1, 0.2));
  assert.ok(s.olasilik < 0.01, String(s.olasilik));
});

test("tekdüzelik: başarı arttıkça olasılık azalmaz", () => {
  let onceki = -1;
  for (const basari of [0.2, 0.4, 0.55, 0.7, 0.85, 1]) {
    const o = gecmeOlasiligiHesapla(ogrenci(0.8, basari)).olasilik;
    assert.ok(o >= onceki - 1e-12, `basari=${basari}: ${o} < ${onceki}`);
    onceki = o;
  }
});

test("tekdüzelik: aynı başarıyla daha çok soru çözmek olasılığı düşürmez (başarı > 0.5 iken)", () => {
  let onceki = -1;
  for (const kapsam of [0.1, 0.3, 0.6, 1]) {
    const o = gecmeOlasiligiHesapla(ogrenci(kapsam, 0.85)).olasilik;
    assert.ok(o >= onceki - 1e-12, `kapsam=${kapsam}: ${o} < ${onceki}`);
    onceki = o;
  }
});

test("ağırlıklı ders: trafik zayıfsa, adab güçlü olsa da olasılık daha düşüktür", () => {
  const trafikZayif = ogrenci(0.8, 0.9).map((d) => (d.dersId === "trafik" ? { ...d, dogru: Math.round(d.cozulen * 0.4) } : d));
  const adabZayif = ogrenci(0.8, 0.9).map((d) => (d.dersId === "adab" ? { ...d, dogru: Math.round(d.cozulen * 0.4) } : d));
  assert.ok(gecmeOlasiligiHesapla(trafikZayif).olasilik < gecmeOlasiligiHesapla(adabZayif).olasilik);
});

test("bozuk girdi (negatif, NaN, çözülen > toplam) çökmez ve 0..1 verir", () => {
  const s = gecmeOlasiligiHesapla([
    { dersId: "a", toplamSoru: 10, cozulen: 99, dogru: 500, sinavSoruSayisi: 23 },
    { dersId: "b", toplamSoru: -5, cozulen: -1, dogru: NaN, sinavSoruSayisi: 12 },
    { dersId: "c", toplamSoru: 0, cozulen: 0, dogru: 0, sinavSoruSayisi: 15 },
  ]);
  assert.ok(s.olasilik >= 0 && s.olasilik <= 1);
  for (const d of s.dersler) assert.ok(d.basariTahmini >= 0 && d.basariTahmini <= 1);
});

test("çekilmiş başarı: az veride ön kabule yakın, çok veride gerçek orana yakın", () => {
  assert.ok(Math.abs(cekilmisBasari(0, 0) - 0.6) < 1e-12);
  assert.ok(cekilmisBasari(3, 3) < 0.9); // 3/3 doğru ama hâlâ temkinli
  assert.ok(Math.abs(cekilmisBasari(90, 100) - 0.9) < 0.02);
});

test("yuzdeMetni: kesinlik iddia etmez", () => {
  assert.equal(yuzdeMetni(0.78), "%78");
  assert.equal(yuzdeMetni(0.5), "%50");
  assert.equal(yuzdeMetni(0.999), ">%99");
  assert.equal(yuzdeMetni(1), ">%99");
  assert.equal(yuzdeMetni(0.002), "<%1");
  assert.equal(yuzdeMetni(0), "<%1");
  assert.equal(yuzdeMetni(NaN), "<%1");
});

test("güven düzeyi eşikleri", () => {
  assert.equal(guvenDuzeyi(0), "yok");
  assert.equal(guvenDuzeyi(MIN_VERI - 1), "yok");
  assert.equal(guvenDuzeyi(MIN_VERI), "dusuk");
  assert.equal(guvenDuzeyi(59), "dusuk");
  assert.equal(guvenDuzeyi(60), "orta");
  assert.equal(guvenDuzeyi(150), "yuksek");
});

test("dersBasariTahmini: kapsam hesabı ve sınırlar", () => {
  const t = dersBasariTahmini({ dersId: "x", toplamSoru: 100, cozulen: 50, dogru: 40, sinavSoruSayisi: 10 });
  assert.equal(t.kapsam, 0.5);
  assert.ok(t.basariTahmini > 0.4 && t.basariTahmini < 1);
});

test("zayifKonular: düşük başarılılar önce, sonra hiç çözülmeyenler; az örneklem hesaba katılmaz", () => {
  const konular = [
    { konuId: "iyi", dersId: "trafik", baslik: "İyi", toplamSoru: 20, cozulen: 10, dogru: 10 },
    { konuId: "kotu", dersId: "trafik", baslik: "Kötü", toplamSoru: 20, cozulen: 10, dogru: 2 },
    { konuId: "orta", dersId: "motor", baslik: "Orta", toplamSoru: 20, cozulen: 10, dogru: 5 },
    { konuId: "azveri", dersId: "motor", baslik: "Az", toplamSoru: 20, cozulen: 2, dogru: 0 },
    { konuId: "hic1", dersId: "adab", baslik: "Hiç1", toplamSoru: 10, cozulen: 0, dogru: 0 },
    { konuId: "hic2", dersId: "adab", baslik: "Hiç2", toplamSoru: 10, cozulen: 0, dogru: 0 },
    { konuId: "bos", dersId: "adab", baslik: "Boş", toplamSoru: 0, cozulen: 0, dogru: 0 },
  ];
  const z = zayifKonular(konular, 4);
  assert.deepEqual(z.map((k) => k.konuId), ["kotu", "orta", "hic1", "hic2"]);
  assert.equal(z[0].neden, "dusuk-basari");
  assert.equal(z[2].neden, "hic-cozulmedi");
  assert.equal(z[2].basari, null);
  assert.ok(!z.some((k) => k.konuId === "azveri"), "3'ten az soru çözülen konu 'düşük başarı' sayılmaz");
  assert.ok(!z.some((k) => k.konuId === "bos"), "sorusu olmayan konu önerilmez");
});

test("zayifKonular: limit uygulanır, hiç sorun yoksa boş döner", () => {
  assert.deepEqual(zayifKonular([], 3), []);
  const cok = Array.from({ length: 10 }, (_, i) => ({ konuId: `k${i}`, dersId: "t", baslik: `K${i}`, toplamSoru: 5, cozulen: 5, dogru: 0 }));
  assert.equal(zayifKonular(cok, 3).length, 3);
});
