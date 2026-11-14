// Tuzak notlarını listeler ve onaylar.
//   node scripts/tuzak-notlari.mjs liste              → onay bekleyen notlar (markdown)
//   node scripts/tuzak-notlari.mjs liste --hepsi      → tüm notlar
//   node scripts/tuzak-notlari.mjs onayla sen-01 ...  → verilen notları onaylar
//   node scripts/tuzak-notlari.mjs onayla --hepsi     → bekleyen tüm notları onaylar
import { readFileSync, writeFileSync } from "node:fs";
import { onaylaMetni, sorulariOku } from "./tuzak-yardimci.mjs";

const DOSYA = new URL("../src/data/tuzakNotlari.ts", import.meta.url);
const [komut, ...args] = process.argv.slice(2);

const { TUZAK_NOTLARI } = await import("../src/data/tuzakNotlari.ts");

if (komut === "liste") {
  const hepsi = args.includes("--hepsi");
  const sorular = sorulariOku();
  const secili = Object.entries(TUZAK_NOTLARI).filter(([, n]) => hepsi || !n.onayli);
  console.log("# Tuzak notları incelemesi\n");
  console.log(`${secili.length} not ${hepsi ? "" : "onay bekliyor"}. Her notu resmî kaynakla karşılaştırıp doğruysa onaylayın:\n`);
  console.log("`npm run notlar:onayla -- <kimlik> ...` veya `npm run notlar:onayla -- --hepsi`\n");
  for (const [id, not] of secili) {
    const s = sorular.get(id);
    console.log(`## ${id} ${not.onayli ? "(onaylı)" : "(onay bekliyor)"}\n`);
    if (s) {
      console.log(`**Soru:** ${s.metin}\n`);
      console.log(`**Doğru cevap:** ${s.secenekler[s.dogruIndex]}\n`);
    }
    if (not.ipucu) console.log(`- **İpucu:** ${not.ipucu}`);
    for (const [i, neden] of Object.entries(not.yanlis ?? {})) {
      console.log(`- **Şık ${i}${s ? ` (${s.secenekler[Number(i)]})` : ""} neden yanlış:** ${neden}`);
    }
    console.log("\n- [ ] Doğruladım\n");
  }
} else if (komut === "onayla") {
  const hepsi = args.includes("--hepsi");
  const idler = hepsi ? Object.keys(TUZAK_NOTLARI) : args.filter((a) => !a.startsWith("--"));
  if (idler.length === 0) {
    console.error("Kimlik verin ya da --hepsi kullanın.");
    process.exit(1);
  }
  const eski = readFileSync(DOSYA, "utf8");
  const yeni = onaylaMetni(eski, idler);
  writeFileSync(DOSYA, yeni);
  const onceki = (eski.match(/onayli: true,/g) ?? []).length;
  const sonraki = (yeni.match(/onayli: true,/g) ?? []).length;
  console.log(`${sonraki - onceki} not onaylandı (toplam onaylı: ${sonraki}).`);
} else {
  console.error("Kullanım: liste [--hepsi] | onayla <kimlik...|--hepsi>");
  process.exit(1);
}
