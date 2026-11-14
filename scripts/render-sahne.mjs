// Senaryo sahnelerinin kare görüntülerini PNG olarak üretir (animasyonu telefonsuz gözle kontrol etmek için).
// Kullanım:  node scripts/render-sahne.mjs <çıktı-klasörü> [sahne başına satır sayısı]
// Çıktı: sheet-1.png, sheet-2.png ... Her satır bir sahnedir; sütunlar zaman içindeki kareleridir.
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import { sahneKaresi, svgMetni } from "../src/animations/sahne.ts";
import { SENARYO_SAHNELERI } from "../src/data/senaryolar.ts";

const cikti = process.argv[2];
if (!cikti) {
  console.error("Kullanım: node scripts/render-sahne.mjs <çıktı-klasörü>");
  process.exit(1);
}
mkdirSync(cikti, { recursive: true });

const ZAMANLAR = [0.05, 0.3, 0.55, 0.8, 1];
const OLCEK = 2.4; // kare = 240 x 144
const KARE_W = 100 * OLCEK;
const KARE_H = 60 * OLCEK;
const ETIKET_W = 70;
const SAHNE_SAYISI = 5; // bir sayfada
const idler = Object.keys(SENARYO_SAHNELERI);

for (let sayfa = 0; sayfa * SAHNE_SAYISI < idler.length; sayfa++) {
  const grup = idler.slice(sayfa * SAHNE_SAYISI, (sayfa + 1) * SAHNE_SAYISI);
  const toplamW = ETIKET_W + ZAMANLAR.length * (KARE_W + 4);
  const toplamH = grup.length * (KARE_H + 4);
  const katmanlar = [];

  for (let r = 0; r < grup.length; r++) {
    const id = grup[r];
    const etiket = `<svg xmlns="http://www.w3.org/2000/svg" width="${ETIKET_W}" height="${KARE_H}"><rect width="100%" height="100%" fill="#111827"/><text x="6" y="${KARE_H / 2}" font-size="16" fill="#F9FAFB" font-family="Arial, sans-serif">${id}</text></svg>`;
    katmanlar.push({ input: Buffer.from(etiket), left: 0, top: r * (KARE_H + 4) });
    for (let c = 0; c < ZAMANLAR.length; c++) {
      const svg = svgMetni(sahneKaresi(SENARYO_SAHNELERI[id], ZAMANLAR[c]), OLCEK);
      const png = await sharp(Buffer.from(svg)).png().toBuffer();
      katmanlar.push({ input: png, left: ETIKET_W + c * (KARE_W + 4), top: r * (KARE_H + 4) });
    }
  }

  const dosya = `${cikti}/sheet-${sayfa + 1}.png`;
  await sharp({ create: { width: toplamW, height: toplamH, channels: 3, background: "#000000" } })
    .composite(katmanlar)
    .png()
    .toFile(dosya);
  console.log("yazıldı:", dosya, grup.join(", "));
}
