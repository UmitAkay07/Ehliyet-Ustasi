import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gorseller = path.join(kok, "metadata/android/tr-TR/images");
const W = 1024;
const H = 500;

const telefon = async (dosya, yukseklik) => {
  const meta = await sharp(path.join(gorseller, "phoneScreenshots", dosya)).metadata();
  const genislik = Math.round((meta.width / meta.height) * yukseklik);
  const maske = Buffer.from(
    `<svg width="${genislik}" height="${yukseklik}"><rect width="${genislik}" height="${yukseklik}" rx="26" ry="26" fill="#fff"/></svg>`
  );
  const ekran = await sharp(path.join(gorseller, "phoneScreenshots", dosya))
    .resize(genislik, yukseklik)
    .composite([{ input: maske, blend: "dest-in" }])
    .png()
    .toBuffer();
  const cerceve = 6;
  const kaplama = Buffer.from(
    `<svg width="${genislik + cerceve * 2}" height="${yukseklik + cerceve * 2}"><rect x="1.5" y="1.5" width="${genislik + cerceve * 2 - 3}" height="${yukseklik + cerceve * 2 - 3}" rx="32" ry="32" fill="#0B0F14" stroke="#334155" stroke-width="3"/></svg>`
  );
  return sharp(kaplama)
    .composite([{ input: ekran, left: cerceve, top: cerceve }])
    .png()
    .toBuffer();
};

const arkaPlan = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0F172A"/>
      <stop offset="1" stop-color="#1E1B4B"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="900" cy="40" r="220" fill="#7DD0F0" opacity="0.10"/>
  <circle cx="60" cy="520" r="200" fill="#6366F1" opacity="0.14"/>
  <text x="184" y="196" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="#F8FAFC">Ehliyet Ustası</text>
  <text x="48" y="286" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#7DD0F0">E-sınav • Direksiyon</text>
  <text x="48" y="336" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#7DD0F0">Trafik İşaretleri</text>
  <rect x="48" y="376" width="318" height="52" rx="26" fill="#F59E0B"/>
  <text x="207" y="411" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#1C1917">Ücretsiz • Çevrimdışı</text>
</svg>`);

const ikon = await sharp(path.join(kok, "assets/icon-brand.png")).resize(120, 120).png().toBuffer();
const sol = await telefon("07-park.png", 390);
const orta = await telefon("04-soru.png", 390);
const solMeta = await sharp(sol).metadata();

await sharp(arkaPlan)
  .composite([
    { input: ikon, left: 48, top: 130 },
    { input: sol, left: 584, top: 50 },
    { input: orta, left: 584 + solMeta.width + 14, top: 50 },
  ])
  .flatten({ background: "#0F172A" })
  .removeAlpha()
  .png()
  .toFile(path.join(gorseller, "featureGraphic.png"));

console.log("featureGraphic.png", W + "x" + H);
