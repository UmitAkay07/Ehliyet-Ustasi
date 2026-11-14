// Günlük plana bağlı bildirimlerin içerik ve zaman testleri.  Çalıştır: npm run test:bildirim
import test from "node:test";
import assert from "node:assert/strict";
import {
  AKSAM_SAATI,
  GUNLUK_TEKRAR_SINIRI,
  SABAH_SAATI,
  aksamIcerigi,
  gunSaati,
  planBildirimleri,
  sabahIcerigi,
} from "../src/utils/bildirimPlani.ts";

const gun = (ek = {}) => ({ gunOfseti: 0, kalanGun: 20, tekrar: 0, soruHedefi: 20, cozulen: 0, ...ek });
const saatte = (saat, dakika = 0, saniye = 0) => new Date(2026, 10, 11, saat, dakika, saniye).getTime();
const motivasyon = (i) => `motivasyon-${i}`;

test("gunSaati: yerel saatle istenen gün ve saat", () => {
  const t = new Date(gunSaati(saatte(15, 30), 2, SABAH_SAATI));
  assert.equal(t.getDate(), 13);
  assert.equal(t.getHours(), 10);
  assert.equal(t.getMinutes(), 0);
  const ayGecisi = new Date(gunSaati(new Date(2026, 10, 30, 9).getTime(), 1, 10));
  assert.equal(ayGecisi.getMonth(), 11);
  assert.equal(ayGecisi.getDate(), 1);
});

test("sabah: tekrar varsa tekrar, yoksa soru hedefi ve motivasyon", () => {
  assert.deepEqual(sabahIcerigi(gun({ tekrar: 7 }), "m"), {
    baslik: "Bugün 7 tekrarın var",
    govde: "Unutmadan pekiştir, sonra 20 soruluk günlük hedefine geç.",
  });
  assert.deepEqual(sabahIcerigi(gun({ soruHedefi: 25 }), "m"), { baslik: "Bugünkü hedefin: 25 soru", govde: "m" });
});

test("sabah: tekrar sayısı plan kartındaki gibi sınırlı", () => {
  assert.equal(sabahIcerigi(gun({ tekrar: 85 }), "m").baslik, `Bugün ${GUNLUK_TEKRAR_SINIRI} tekrarın var`);
});

test("sınav günü plan bildirimi yok (geri sayım bildirimi var)", () => {
  assert.equal(sabahIcerigi(gun({ kalanGun: 0, tekrar: 3 }), "m"), null);
  assert.equal(aksamIcerigi(gun({ kalanGun: 0 })), null);
});

test("akşam: yalnızca hedef tamamlanmadıysa", () => {
  assert.equal(aksamIcerigi(gun({ cozulen: 20 })), null);
  assert.equal(aksamIcerigi(gun({ cozulen: 31 })), null);
  assert.deepEqual(aksamIcerigi(gun({ cozulen: 12 })), {
    baslik: "Hedefine 8 soru kaldı",
    govde: "Günü tamamlamak için birkaç dakika yeter.",
  });
  assert.deepEqual(aksamIcerigi(gun({ tekrar: 4 })), {
    baslik: "Bugünkü 20 soru seni bekliyor",
    govde: "Sırada 4 tekrar da var. Birkaç dakika yeter.",
  });
});

test("sabah 08:00: bugünün sabahı ve akşamı, sonraki günlerin sabahları", () => {
  const simdi = saatte(8);
  const liste = planBildirimleri([gun(), gun({ gunOfseti: 1 }), gun({ gunOfseti: 2 })], simdi, motivasyon);
  assert.deepEqual(
    liste.map((b) => [new Date(b.zaman).getDate(), new Date(b.zaman).getHours()]),
    [
      [11, SABAH_SAATI],
      [11, AKSAM_SAATI],
      [12, SABAH_SAATI],
      [13, SABAH_SAATI],
    ]
  );
  assert.equal(liste[2].govde, "motivasyon-1");
});

test("öğleden sonra bugünün sabahı yok, akşamı var; gece ikisi de yok", () => {
  const gunler = [gun({ cozulen: 5 }), gun({ gunOfseti: 1 })];
  assert.deepEqual(
    planBildirimleri(gunler, saatte(15), motivasyon).map((b) => new Date(b.zaman).getHours()),
    [AKSAM_SAATI, SABAH_SAATI]
  );
  assert.equal(planBildirimleri(gunler, saatte(21), motivasyon).length, 1);
});

test("30 saniyeden yakın bildirim kurulmaz", () => {
  const liste = planBildirimleri([gun({ cozulen: 20 })], saatte(9, 59, 50), motivasyon);
  assert.equal(liste.length, 0);
});

test("sınav günü sabahı atlanır, diğer günler kalır", () => {
  const gunler = [0, 1, 2, 3].map((i) => gun({ gunOfseti: i, kalanGun: 2 - i }));
  const gunlerTarih = planBildirimleri(gunler, saatte(7), motivasyon).map((b) => new Date(b.zaman).getDate());
  assert.deepEqual(gunlerTarih, [11, 11, 12, 14]);
});
