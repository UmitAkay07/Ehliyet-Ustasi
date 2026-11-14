// Tuzak notları testleri.  Çalıştır: npm run test:tuzak
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TUZAK_NOTLARI, gorunenNot } from "../src/data/tuzakNotlari.ts";
import { onaylaMetni, sorulariOku } from "./tuzak-yardimci.mjs";

const sorular = sorulariOku();
const notMetni = readFileSync(new URL("../src/data/tuzakNotlari.ts", import.meta.url), "utf8");

test("soru dosyaları okunur (şu an 595 soru; ayrıştırıcının hiçbir soruyu kaçırmadığını denetler)", () => {
  assert.ok(sorular.size >= 590, `beklenenden az soru okundu: ${sorular.size}`);
  const s = sorular.get("sen-01");
  assert.equal(s.secenekler.length, 4);
  assert.equal(s.dogruIndex, 2);
});

test("her not var olan bir soruya aittir", () => {
  for (const id of Object.keys(TUZAK_NOTLARI)) assert.ok(sorular.has(id), `${id}: soru bulunamadı`);
});

test("yanlis anahtarları geçerli, doğru şıkkı işaret etmez, metinler boş değil ve kısa", () => {
  for (const [id, not] of Object.entries(TUZAK_NOTLARI)) {
    const s = sorular.get(id);
    assert.equal(typeof not.onayli, "boolean", `${id}: onayli bayrağı yok`);
    assert.ok(not.ipucu || not.yanlis, `${id}: ne ipucu ne yanlış nedeni var`);
    if (not.ipucu) {
      assert.ok(not.ipucu.trim().length > 10 && not.ipucu.length <= 120, `${id}: ipucu uzunluğu (${not.ipucu.length})`);
    }
    for (const [i, neden] of Object.entries(not.yanlis ?? {})) {
      const idx = Number(i);
      assert.ok(Number.isInteger(idx) && idx >= 0 && idx < s.secenekler.length, `${id}: geçersiz şık ${i}`);
      assert.notEqual(idx, s.dogruIndex, `${id}: doğru şık için 'neden yanlış' yazılmış (${i})`);
      assert.ok(neden.trim().length > 10 && neden.length <= 170, `${id}[${i}]: gerekçe uzunluğu (${neden.length})`);
    }
  }
});

test("senaryo notları tüm yanlış şıkları kapsar", () => {
  for (const [id, not] of Object.entries(TUZAK_NOTLARI)) {
    if (!id.startsWith("sen-")) continue;
    const s = sorular.get(id);
    const yanlisIndeksler = s.secenekler.map((_, i) => i).filter((i) => i !== s.dogruIndex);
    const yazilan = Object.keys(not.yanlis ?? {}).map(Number).sort();
    assert.deepEqual(yazilan, yanlisIndeksler, `${id}: eksik/fazla şık`);
  }
});

test("onaysız notlar uygulamada görünmez (varsayılan: hepsi onaysız)", () => {
  const onayli = Object.entries(TUZAK_NOTLARI).filter(([, n]) => n.onayli);
  const gorunen = Object.keys(TUZAK_NOTLARI).filter((id) => gorunenNot(id));
  assert.equal(gorunen.length, onayli.length);
  assert.equal(gorunenNot("olmayan-soru"), undefined);
  for (const [id, n] of Object.entries(TUZAK_NOTLARI)) {
    if (!n.onayli) assert.equal(gorunenNot(id), undefined, `${id}: onaysız not görünüyor`);
  }
});

// Not girdilerindeki bayraklar "onayli: true," / "onayli: false," biçimindedir (dosya başındaki yorum virgülsüzdür).
const bayrak = (m, deger) => (m.match(new RegExp(`onayli: ${deger},`, "g")) ?? []).length;

test("onaylaMetni: yalnızca verilen notu çevirir, geri kalan metin birebir aynı kalır", () => {
  const yeni = onaylaMetni(notMetni, ["sen-03"]);
  assert.equal(bayrak(yeni, true), bayrak(notMetni, true) + 1);
  assert.equal(bayrak(yeni, false), bayrak(notMetni, false) - 1);
  assert.equal(yeni.length, notMetni.length - 1, '"false" → "true" tam olarak 1 karakter kısaltır');

  // sen-03 bloğunun öncesi ve sonrası birebir aynı
  const b0 = notMetni.indexOf('"sen-03": {');
  const b1 = notMetni.indexOf('"sen-04": {');
  assert.equal(yeni.slice(0, b0), notMetni.slice(0, b0));
  assert.equal(yeni.slice(b1 - 1), notMetni.slice(b1));

  const sen03 = yeni.slice(yeni.indexOf('"sen-03": {'), yeni.indexOf('"sen-04": {'));
  assert.ok(sen03.includes("onayli: true,"), "sen-03 onaylanmadı");
});

test("onaylaMetni: son not, zaten onaylı not ve bilinmeyen kimlik", () => {
  const son = onaylaMetni(notMetni, ["sen-20"]);
  assert.ok(son.slice(son.indexOf('"sen-20": {')).includes("onayli: true,"));
  const iki = onaylaMetni(son, ["sen-20"]);
  assert.equal(iki, son, "zaten onaylı olanı değiştirmemeli");
  assert.throws(() => onaylaMetni(notMetni, ["yok-99"]), /bulunamadı/);
  assert.equal(onaylaMetni(notMetni, []), notMetni);
});

test("hepsini onaylamak tüm notları görünür yapar", () => {
  const hepsi = onaylaMetni(notMetni, Object.keys(TUZAK_NOTLARI));
  assert.equal(bayrak(hepsi, false), 0);
  assert.equal(bayrak(hepsi, true), Object.keys(TUZAK_NOTLARI).length);
});
