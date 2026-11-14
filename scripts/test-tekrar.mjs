// Aralıklı tekrar mantığı testleri.  Çalıştır: npm run test:tekrar
// Node 22.18+ .ts dosyasını doğrudan içe aktarabilir (tekrar.ts hiçbir import içermez).
// Kapsam: yalnızca saf mantık. Store bağlantısı (soruCevapla, hataSil, herseyiSifirla) AsyncStorage'a
// bağlı olduğu için burada test edilmez.
import test from "node:test";
import assert from "node:assert/strict";
import {
  MIN_BEKLEME_MS,
  MEZUN_KUTU,
  aralikGun,
  etkinSonraki,
  gunBaslangici,
  kacGunSonra,
  kalanGunHesapla,
  kalanOzetiDepodan,
  tekrarDurumu,
  tekrarGuncelle,
} from "../src/utils/tekrar.ts";

// Yerel saatle sabit anlar: saat dilimine bağımlı olmasın diye hep yerel kurulur.
const an = (y, a, g, s = 12, d = 0) => new Date(y, a - 1, g, s, d).getTime();
const gun = (y, a, g) => new Date(y, a - 1, g).getTime();

const NOW = an(2026, 11, 10, 15, 30);

test("yanlış cevap sabahtan: ertesi günün başında sırası gelir", () => {
  const sabah = an(2026, 11, 10, 10, 0);
  const t = tekrarGuncelle({}, "s1", false, sabah, null);
  assert.deepEqual(t.s1, { kutu: 0, sonraki: gun(2026, 11, 11), son: sabah });
});

test("yanlış cevap öğleden sonra: en az 12 saat sonra", () => {
  const t = tekrarGuncelle({}, "s1", false, NOW, null);
  assert.equal(t.s1.sonraki, NOW + MIN_BEKLEME_MS); // 11 Kasım 03:30
});

test("gece yarısından hemen önceki yanlış (23:58) 2 dakika sonra sırasına girmez", () => {
  const gece = an(2026, 11, 10, 23, 58);
  const t = tekrarGuncelle({}, "s1", false, gece, null);
  assert.equal(t.s1.sonraki, gece + MIN_BEKLEME_MS); // ertesi gün 11:58
  // gece yarısı geçtikten sonra doğru basmak kutuyu ilerletmemeli
  const sonra = tekrarGuncelle(t, "s1", true, an(2026, 11, 11, 0, 5), null);
  assert.equal(sonra, t);
});

test("ilk seferde doğru bilinen soru takibe alınmaz", () => {
  assert.deepEqual(tekrarGuncelle({}, "s1", true, NOW, null), {});
});

test("yanlıştan hemen sonra aynı gün doğru: takvim değişmez", () => {
  const yanlis = tekrarGuncelle({}, "s1", false, NOW, null);
  const sonra = tekrarGuncelle(yanlis, "s1", true, NOW + 60_000, null);
  assert.equal(sonra, yanlis); // aynı nesne, hiç dokunulmadı
  assert.equal(sonra.s1.kutu, 0);
});

test("vakti gelen doğru cevaplar 1-3-7-14 aralığıyla ilerler, sonra öğrenilir", () => {
  let t = tekrarGuncelle({}, "s1", false, an(2026, 11, 10), null); // 11 Kasım 00:00

  let simdi = an(2026, 11, 11, 9);
  t = tekrarGuncelle(t, "s1", true, simdi, null);
  assert.equal(t.s1.kutu, 1);
  assert.equal(t.s1.sonraki, gun(2026, 11, 14)); // +3 gün

  simdi = an(2026, 11, 14, 9);
  t = tekrarGuncelle(t, "s1", true, simdi, null);
  assert.equal(t.s1.kutu, 2);
  assert.equal(t.s1.sonraki, gun(2026, 11, 21)); // +7 gün

  simdi = an(2026, 11, 21, 9);
  t = tekrarGuncelle(t, "s1", true, simdi, null);
  assert.equal(t.s1.kutu, 3);
  assert.equal(t.s1.sonraki, gun(2026, 12, 5)); // +14 gün

  simdi = an(2026, 12, 5, 9);
  t = tekrarGuncelle(t, "s1", true, simdi, null);
  assert.equal(t.s1, undefined, "4. doğru tekrarda kayıt silinmeli (öğrenildi)");
  assert.equal(MEZUN_KUTU, 4);
});

test("tam sınır: sonraki === simdi ise vakti gelmiş sayılır, 1 ms önce sayılmaz", () => {
  const kayit = (sonraki) => ({ a: { kutu: 0, sonraki, son: NOW - 86_400_000 } });

  const tam = tekrarDurumu(kayit(NOW), {}, NOW, null);
  assert.deepEqual(tam.simdiIds, ["a"]);
  const bir_once = tekrarDurumu(kayit(NOW + 1), {}, NOW, null);
  assert.deepEqual(bir_once.simdiIds, []);
  assert.equal(bir_once.sonraSayisi, 1);

  assert.equal(tekrarGuncelle(kayit(NOW), "a", true, NOW, null).a.kutu, 1);
  assert.equal(tekrarGuncelle(kayit(NOW + 1), "a", true, NOW, null).a.kutu, 0);
});

test("ileri kutudaki soru yanlış bilinirse başa döner", () => {
  const t0 = { s1: { kutu: 2, sonraki: an(2026, 11, 1), son: an(2026, 10, 25) } };
  const t = tekrarGuncelle(t0, "s1", false, NOW, null);
  assert.equal(t.s1.kutu, 0);
  assert.equal(t.s1.sonraki, NOW + MIN_BEKLEME_MS);
});

test("giriş nesnesi değiştirilmez (immutable)", () => {
  const t0 = { s1: { kutu: 0, sonraki: an(2026, 11, 1), son: an(2026, 10, 31) } };
  const kopya = JSON.parse(JSON.stringify(t0));
  tekrarGuncelle(t0, "s1", true, NOW, null);
  tekrarGuncelle(t0, "s2", false, NOW, null);
  assert.deepEqual(t0, kopya);
});

test("sınav yakınsa aralıklar kısalır", () => {
  assert.equal(aralikGun(1, null), 3);
  assert.equal(aralikGun(2, 0), 7); // sınav günü/geçmiş: sınır uygulanmaz
  assert.equal(aralikGun(2, 5), 4); // 7 gün ama sınava 5 gün var → en geç sınavdan 1 gün önce
  assert.equal(aralikGun(3, 2), 1);
  assert.equal(aralikGun(3, 1), 1); // alt sınır 1 gün
  assert.equal(aralikGun(3, 60), 14); // uzak sınav: normal aralık
});

test("sınav yakınken yeni tarih sınavdan önceye çekilir (doğru cevap)", () => {
  const t0 = { s1: { kutu: 1, sonraki: an(2026, 11, 10, 0), son: an(2026, 11, 7) } };
  const t = tekrarGuncelle(t0, "s1", true, NOW, 5); // kutu 2 → normalde 7 gün, sınava 5 gün var
  assert.equal(t.s1.kutu, 2);
  assert.equal(t.s1.sonraki, gun(2026, 11, 14)); // +4 gün
});

test("yanlış cevapta da sınav yakınlığı uygulanır", () => {
  // sınava 2 gün kala yanlış: ertesi gün (sınavdan 1 gün önce), 14 gün sonra değil
  const sabah = an(2026, 11, 10, 9, 0);
  const t = tekrarGuncelle({}, "s1", false, sabah, 2);
  assert.equal(t.s1.sonraki, gun(2026, 11, 11));
});

test("sınav tarihi sonradan girilirse uzak planlı tekrar sınavdan 1 gün önceye çekilir", () => {
  const kayit = { kutu: 3, sonraki: gun(2026, 11, 24), son: NOW };

  // tarih yok ya da sınav geçmiş/bugün: kayıt olduğu gibi
  assert.equal(etkinSonraki(kayit, NOW, null), gun(2026, 11, 24));
  assert.equal(etkinSonraki(kayit, NOW, 0), gun(2026, 11, 24));
  // sınava 5 gün var: 14 Kasım (sınavdan 1 gün önce) gelir
  assert.equal(etkinSonraki(kayit, NOW, 5), gun(2026, 11, 14));

  const d = tekrarDurumu({ a: kayit }, {}, NOW, 5);
  assert.deepEqual(d.simdiIds, []);
  assert.equal(d.siradakiZaman, gun(2026, 11, 14));
});

test("sınavdan 1 gün önce (kalanGun = 1) kayıt uzak tarihine geri dönüp kaybolmaz", () => {
  // Önceki günlerde kalanGun=5 iken çekilmişti; sınava 1 gün kala hâlâ sırada olmalı
  const kayit = { kutu: 1, sonraki: gun(2026, 11, 24), son: NOW };
  const sinavOncesi = an(2026, 11, 14, 9, 0);
  const d = tekrarDurumu({ a: kayit }, {}, sinavOncesi, 1);
  assert.deepEqual(d.simdiIds, ["a"]);

  // doğru bilince erken sayılmaz, kutu ilerler; sonraki en az 12 saat sonrasına planlanır
  const t = tekrarGuncelle({ a: kayit }, "a", true, sinavOncesi, 1);
  assert.equal(t.a.kutu, 2);
  assert.equal(t.a.sonraki, gun(2026, 11, 15)); // 21:00 (12 saat) ile ertesi gün 00:00'ın büyüğü
});

test("sınav yakınken yeni cevaplanan sorunun 12 saatlik beklemesi çekmeyle bozulmaz", () => {
  const gece = an(2026, 11, 13, 23, 50);
  const t = tekrarGuncelle({}, "s1", false, gece, 1); // sınava 1 gün
  const durum = tekrarDurumu(t, {}, an(2026, 11, 14, 0, 10), 1);
  assert.deepEqual(durum.simdiIds, [], "20 dakika sonra tekrar sırasına girmemeli");
});

test("eski hata defteri girdisi (tekrar kaydı yok) doğru bilinince ilerler", () => {
  const dun = an(2026, 11, 9, 20);
  const t = tekrarGuncelle({}, "eski", true, NOW, null, dun);
  assert.equal(t.eski.kutu, 1);
  assert.equal(t.eski.sonraki, gun(2026, 11, 13));
});

test("bugün eklenen eski hata girdisi erken doğru bilinirse kaybolmaz, yarına planlanır", () => {
  const bugun = an(2026, 11, 10, 9);
  const t = tekrarGuncelle({}, "eski", true, NOW, null, bugun);
  assert.equal(t.eski.kutu, 0);
  assert.equal(t.eski.sonraki, gun(2026, 11, 11));
});

test("tekrarDurumu: sıralı kuyruk, sonraki sayısı ve eski hatalar", () => {
  const tekrar = {
    gec: { kutu: 2, sonraki: an(2026, 11, 8, 0), son: an(2026, 11, 1) },
    eski_sira: { kutu: 0, sonraki: an(2026, 11, 8, 0), son: an(2026, 11, 7) },
    yarin: { kutu: 1, sonraki: gun(2026, 11, 11), son: an(2026, 11, 10, 8) },
    hafta: { kutu: 3, sonraki: gun(2026, 11, 17), son: an(2026, 11, 10, 8) },
    kayip: { kutu: 0, sonraki: an(2026, 11, 1, 0), son: an(2026, 10, 31) },
  };
  const hatalar = {
    // tekrar kaydı yok: dün eklendi → bugün sırada
    eskiHata: { eklenme: an(2026, 11, 9, 18) },
    // bugün eklendi → yarın sırada, "sonra"ya sayılır
    yeniHata: { eklenme: an(2026, 11, 10, 9) },
    // tekrar kaydı da var: çift sayılmamalı
    gec: { eklenme: an(2026, 11, 1) },
  };
  const d = tekrarDurumu(tekrar, hatalar, NOW, null, (id) => id !== "kayip");

  // aynı vakit olanlarda düşük kutu (zor olan) önce
  assert.deepEqual(d.simdiIds, ["eski_sira", "gec", "eskiHata"]);
  assert.equal(d.sonraSayisi, 3); // yarin, hafta, yeniHata
  assert.equal(d.siradakiZaman, gun(2026, 11, 11));
});

test("tekrarDurumu: boş veri", () => {
  assert.deepEqual(tekrarDurumu({}, {}, NOW, null), { simdiIds: [], sonraSayisi: 0, siradakiZaman: null });
});

test("bozuk kayıtlar çökmez, NaN üretmez, hemen sırasına girer", () => {
  const bozuk = {
    a: { kutu: NaN },
    b: null,
    c: { kutu: 1 }, // sonraki yok
    d: "metin",
  };
  const d = tekrarDurumu(bozuk, { x: { eklenme: undefined } }, NOW, null);
  assert.deepEqual(d.simdiIds.sort(), ["a", "c", "x"]);
  assert.equal(d.sonraSayisi, 0);
  assert.equal(d.siradakiZaman, null);

  const t = tekrarGuncelle({ a: { kutu: NaN } }, "a", true, NOW, null);
  assert.ok(Number.isFinite(t.a.sonraki), "sonraki sonlu bir sayı olmalı");
  assert.equal(t.a.kutu, 1);
});

test("kalanGunHesapla: ISO ve düz tarih, geçersiz girdi", () => {
  assert.equal(kalanGunHesapla("2026-11-20T00:00:00.000Z", NOW), 10);
  assert.equal(kalanGunHesapla("2026-11-10", NOW), 0);
  assert.equal(kalanGunHesapla("2026-11-05", NOW), -5);
  assert.equal(kalanGunHesapla(null, NOW), null);
  assert.equal(kalanGunHesapla("bozuk", NOW), null);
  assert.equal(kalanGunHesapla(12345, NOW), null); // metin olmayan değer çökmemeli
});

test("gunBaslangici ve kacGunSonra", () => {
  assert.equal(gunBaslangici(NOW), gun(2026, 11, 10));
  assert.equal(gunBaslangici(NOW, 1), gun(2026, 11, 11));
  assert.equal(kacGunSonra(gun(2026, 11, 11), NOW), 1);
  assert.equal(kacGunSonra(an(2026, 11, 10, 23, 59), NOW), 0);
  assert.equal(kacGunSonra(gun(2026, 11, 17), NOW), 7);
});

// ---------------------------------------------------------------- widget / depo özeti

const depo = (state) => JSON.stringify({ state, version: 0 });

test("kalanOzetiDepodan: sınav günü ve tekrar sayısını depodan okur", () => {
  const metin = depo({
    settings: { sinavTarihi: "2026-11-20T00:00:00.000Z" },
    tekrar: {
      a: { kutu: 1, sonraki: an(2026, 11, 9, 0), son: an(2026, 11, 8) }, // sırası gelmiş
      b: { kutu: 0, sonraki: an(2026, 11, 8, 0), son: an(2026, 11, 7) }, // sırası gelmiş
      c: { kutu: 2, sonraki: gun(2026, 11, 14), son: an(2026, 11, 10, 9) }, // ileride
    },
    hatalar: { eskiHata: { eklenme: an(2026, 11, 9, 18) } }, // tekrar kaydı yok, dün eklendi → sırada
  });
  assert.deepEqual(kalanOzetiDepodan(metin, NOW), { kalanGun: 10, tekrarSayisi: 3 });
});

test("kalanOzetiDepodan: geçersiz soru kimlikleri sayıma girmez", () => {
  const metin = depo({ tekrar: { a: { kutu: 0, sonraki: 1, son: 0 }, b: { kutu: 0, sonraki: 1, son: 0 } } });
  assert.equal(kalanOzetiDepodan(metin, NOW, (id) => id === "a").tekrarSayisi, 1);
});

test("kalanOzetiDepodan: boş, bozuk ve eksik veri çökmez", () => {
  const sifir = { kalanGun: null, tekrarSayisi: 0 };
  assert.deepEqual(kalanOzetiDepodan(null, NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan(undefined, NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan("", NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan("{bozuk json", NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan("123", NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan('"metin"', NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan("null", NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan(JSON.stringify({ version: 0 }), NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan(depo({}), NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan(depo({ settings: null, tekrar: [], hatalar: "x" }), NOW), sifir);
  assert.deepEqual(kalanOzetiDepodan(depo({ settings: { sinavTarihi: 42 } }), NOW), sifir);
});

test("kalanOzetiDepodan: eski kullanıcı verisi (tekrar alanı yok, yalnızca hatalar) çalışır", () => {
  const metin = depo({ settings: { sinavTarihi: null }, hatalar: { x: { eklenme: an(2026, 11, 1) } } });
  assert.deepEqual(kalanOzetiDepodan(metin, NOW), { kalanGun: null, tekrarSayisi: 1 });
});
