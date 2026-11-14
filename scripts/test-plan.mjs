// Günlük plan mantığı testleri.  Çalıştır: npm run test:plan
import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_GUNLUK_SORU,
  MIN_GUNLUK_SORU,
  TEKRAR_GUNLUK_HEDEF,
  gunlukPlanUret,
  gunlukSoruHedefi,
} from "../src/utils/gunlukPlan.ts";

const KONULAR = [
  { konuId: "k1", baslik: "Birinci" },
  { konuId: "k2", baslik: "İkinci" },
];

const temel = (ek = {}) => ({
  kalanGun: null,
  tekrarBekleyen: 0,
  tekrarBugunYapilan: 0,
  bugunCozulen: 0,
  toplamKalanSoru: 140,
  bugunOkunanKonu: 0,
  okunmamisKonular: KONULAR,
  zayifKonu: null,
  bugunProva: false,
  sonProvaGunOnce: null,
  ...ek,
});

const gorev = (plan, id) => plan.gorevler.find((g) => g.id === id);
const idler = (plan) => plan.gorevler.map((g) => g.id);

test("soru hedefi: kalan soruları sınava kadar dağıtır, 10..40 arasında kalır", () => {
  assert.equal(gunlukSoruHedefi(500, 11), MAX_GUNLUK_SORU); // 500/10 = 50 → 40
  assert.equal(gunlukSoruHedefi(500, 61), MIN_GUNLUK_SORU); // 500/60 → 9 → 10
  assert.equal(gunlukSoruHedefi(300, 16), 20); // 300/15
  assert.equal(gunlukSoruHedefi(140, null), 10); // tarih yok: 14 günlük ufuk, 140/14
  assert.equal(gunlukSoruHedefi(0, 20), MIN_GUNLUK_SORU);
  assert.equal(gunlukSoruHedefi(500, 1), MIN_GUNLUK_SORU); // sınavdan önceki gün
  assert.equal(gunlukSoruHedefi(500, -3), 36); // tarih geçmiş: tarihsiz gibi, 500/14 = 36
});

test("sınav günü: görev yok", () => {
  const p = gunlukPlanUret(temel({ kalanGun: 0 }));
  assert.equal(p.mod, "sinav-gunu");
  assert.deepEqual(p.gorevler, []);
});

test("hiçbir şey yapılmamış, tarih yok: soru + konu + (prova hiç çözülmediği için) prova", () => {
  const p = gunlukPlanUret(temel());
  assert.deepEqual(idler(p), ["soru", "konu", "prova"]);
  assert.equal(p.tamamlanan, 0);
  assert.equal(gorev(p, "konu").baslik, "Yeni konu: Birinci");
  assert.equal(gorev(p, "konu").rota, "/konu/k1");
});

test("tekrar görevi: bekleyen varsa çıkar, ilerledikçe dolar, bitince tamam olur", () => {
  let p = gunlukPlanUret(temel({ tekrarBekleyen: 5 }));
  assert.equal(gorev(p, "tekrar").hedef, 5);
  assert.equal(gorev(p, "tekrar").tamam, false);
  assert.equal(gorev(p, "tekrar").baslik, "5 soruyu tekrar et");
  assert.equal(gorev(p, "tekrar").rota, "/tekrar");
  assert.equal(idler(p)[0], "tekrar", "tekrar her zaman en üstte");

  p = gunlukPlanUret(temel({ tekrarBekleyen: 2, tekrarBugunYapilan: 3 }));
  assert.equal(gorev(p, "tekrar").hedef, 5);
  assert.equal(gorev(p, "tekrar").yapilan, 3);
  assert.equal(gorev(p, "tekrar").ilerleme, 0.6);

  p = gunlukPlanUret(temel({ tekrarBekleyen: 0, tekrarBugunYapilan: 4 }));
  assert.equal(gorev(p, "tekrar").tamam, true);
  assert.equal(gorev(p, "tekrar").baslik, "Tekrar tamam");
});

test("tekrar görevi: bekleyen de yapılan da yoksa hiç görünmez", () => {
  assert.equal(gorev(gunlukPlanUret(temel()), "tekrar"), undefined);
});

test("tekrar hedefi günlük sınırı aşmaz", () => {
  const p = gunlukPlanUret(temel({ tekrarBekleyen: 80 }));
  assert.equal(gorev(p, "tekrar").hedef, TEKRAR_GUNLUK_HEDEF);
  const bitmis = gunlukPlanUret(temel({ tekrarBekleyen: 60, tekrarBugunYapilan: 20 }));
  assert.equal(gorev(bitmis, "tekrar").tamam, true, "20 yapıldıysa kalan 60 olsa da bugünün hedefi tamam");
});

test("soru görevi: ilerleme ve tamamlanma", () => {
  let p = gunlukPlanUret(temel({ bugunCozulen: 5 })); // hedef 10
  assert.equal(gorev(p, "soru").hedef, 10);
  assert.equal(gorev(p, "soru").ilerleme, 0.5);
  assert.equal(gorev(p, "soru").tamam, false);

  p = gunlukPlanUret(temel({ bugunCozulen: 37 }));
  assert.equal(gorev(p, "soru").tamam, true);
  assert.equal(gorev(p, "soru").yapilan, 10, "yapılan hedefi aşmaz");
  assert.equal(gorev(p, "soru").ilerleme, 1);
});

test("soru görevi: zayıf konu varsa oraya yönlendirir", () => {
  const p = gunlukPlanUret(temel({ zayifKonu: { konuId: "zk", baslik: "Zayıf Konu" } }));
  assert.equal(gorev(p, "soru").aciklama, "Önce: Zayıf Konu");
  assert.equal(gorev(p, "soru").rota, "/test/zk");
  assert.equal(gorev(gunlukPlanUret(temel()), "soru").rota, "/(tabs)/testler");
});

test("konu görevi: sınava ≤3 gün kala önerilmez; bugün okunduysa tamam görünür", () => {
  assert.equal(gorev(gunlukPlanUret(temel({ kalanGun: 3 })), "konu"), undefined);
  assert.ok(gorev(gunlukPlanUret(temel({ kalanGun: 4 })), "konu"));

  const okundu = gunlukPlanUret(temel({ bugunOkunanKonu: 1, okunmamisKonular: [] }));
  assert.equal(gorev(okundu, "konu").tamam, true);
  assert.equal(gorev(okundu, "konu").baslik, "Bugünkü konu okundu");

  const hepsiOkunmus = gunlukPlanUret(temel({ okunmamisKonular: [] }));
  assert.equal(gorev(hepsiOkunmus, "konu"), undefined, "okunacak konu kalmadıysa ve bugün okunmadıysa görünmez");
});

test("prova: sınava ≤7 gün kala her gün, 8-14 gün arası 3 günde bir, 14'ten uzakta yok", () => {
  assert.ok(gorev(gunlukPlanUret(temel({ kalanGun: 5, sonProvaGunOnce: 1 })), "prova"));
  assert.ok(gorev(gunlukPlanUret(temel({ kalanGun: 10, sonProvaGunOnce: 3 })), "prova"));
  assert.equal(gorev(gunlukPlanUret(temel({ kalanGun: 10, sonProvaGunOnce: 1 })), "prova"), undefined);
  assert.equal(gorev(gunlukPlanUret(temel({ kalanGun: 30, sonProvaGunOnce: null })), "prova"), undefined);
});

test("prova: tarih yoksa haftalık; bugün çözüldüyse tamam olarak görünür", () => {
  assert.ok(gorev(gunlukPlanUret(temel({ kalanGun: null, sonProvaGunOnce: 7 })), "prova"));
  assert.equal(gorev(gunlukPlanUret(temel({ kalanGun: null, sonProvaGunOnce: 2 })), "prova"), undefined);

  const cozuldu = gunlukPlanUret(temel({ kalanGun: 30, bugunProva: true }));
  assert.equal(gorev(cozuldu, "prova").tamam, true);
  assert.equal(gorev(cozuldu, "prova").baslik, "Prova sınavı çözüldü");
});

test("sınav tarihi geçmişse (negatif) tarihsiz gibi davranır", () => {
  const p = gunlukPlanUret(temel({ kalanGun: -4 }));
  assert.equal(p.mod, "normal");
  assert.ok(gorev(p, "konu"));
});

test("sıra ve tamamlanan sayısı", () => {
  const p = gunlukPlanUret(
    temel({ kalanGun: 5, tekrarBekleyen: 3, bugunCozulen: 50, bugunOkunanKonu: 1, bugunProva: false })
  );
  assert.deepEqual(idler(p), ["tekrar", "soru", "konu", "prova"]);
  assert.equal(p.tamamlanan, 2); // soru + konu
});

test("sınavdan önceki gün: yeni konu yok, soru hedefi 10", () => {
  const p = gunlukPlanUret(temel({ kalanGun: 1, toplamKalanSoru: 500 }));
  assert.equal(gorev(p, "soru").hedef, 10);
  assert.equal(gorev(p, "konu"), undefined);
});
