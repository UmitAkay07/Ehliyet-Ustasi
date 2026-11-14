// Tuzak notları için ortak yardımcılar (soruları okuma, onay bayrağını çevirme).
import { readdirSync, readFileSync } from "node:fs";

const SORU_DIZINI = new URL("../src/data/sorular/", import.meta.url);

/** Tüm soru dosyalarından kimlik → { metin, secenekler, dogruIndex } */
export function sorulariOku() {
  const harita = new Map();
  const re =
    /id:\s*"([^"]+)"[\s\S]*?metin:\s*\n?\s*"((?:[^"\\]|\\.)*)"[\s\S]*?secenekler:\s*\[([\s\S]*?)\][\s\S]*?dogruIndex:\s*(\d)/g;
  for (const dosya of readdirSync(SORU_DIZINI)) {
    if (!dosya.endsWith(".ts") || dosya === "index.ts") continue;
    const metin = readFileSync(new URL(dosya, SORU_DIZINI), "utf8");
    for (const m of metin.matchAll(re)) {
      const secenekler = [...m[3].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
      harita.set(m[1], { metin: m[2], secenekler, dogruIndex: Number(m[4]) });
    }
  }
  return harita;
}

/**
 * Not dosyası metninde verilen kimliklerin `onayli: false` bayrağını `true` yapar.
 * `idler` boşsa hiçbir şey değiştirmez. Bulunamayan kimlik için hata fırlatır.
 */
export function onaylaMetni(metin, idler) {
  let sonuc = metin;
  for (const id of idler) {
    const basla = sonuc.indexOf(`"${id}": {`);
    if (basla < 0) throw new Error(`Not bulunamadı: ${id}`);
    const sonraki = sonuc.slice(basla + 1).search(/\n {2}"[a-z0-9-]+": \{/);
    const bitis = sonraki < 0 ? sonuc.length : basla + 1 + sonraki;
    const govde = sonuc.slice(basla, bitis);
    if (!govde.includes("onayli: false")) continue; // zaten onaylı
    sonuc = sonuc.slice(0, basla) + govde.replace("onayli: false", "onayli: true") + sonuc.slice(bitis);
  }
  return sonuc;
}
