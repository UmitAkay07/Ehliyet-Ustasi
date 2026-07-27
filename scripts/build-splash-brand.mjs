/**
 * Tam ekran splash üretir: koyu zemin + logo + "Ehliyet Ustası" yazısı.
 * Böylece Expo Go / native splash JS yüklenmeden önce bile yazı okunur.
 *
 * Çalıştır: node scripts/build-splash-brand.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assets = path.join(__dirname, "..", "assets");
const iconPath = path.join(assets, "icon-brand.png");
const outPath = path.join(assets, "splash-brand.png");

const W = 1284;
const H = 2778;
const BG = "#030712";
const LOGO = 420;

const logo = await sharp(iconPath)
  .resize(LOGO, LOGO, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const logoTop = Math.round(H * 0.34 - LOGO / 2);
const logoLeft = Math.round((W - LOGO) / 2);
const textY = logoTop + LOGO + 72;

// SVG metin katmanı — beyaz/indigo, koyu zeminde yüksek kontrast
const textSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BG}"/>
  <text x="50%" y="${textY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#F8FAFC">Ehliyet</text>
  <text x="50%" y="${textY + 88}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#A5B4FC">Ustası</text>
  <text x="50%" y="${textY + 150}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600" fill="#94A3B8">E-sınav &amp; direksiyon hazırlık</text>
</svg>
`);

await sharp(textSvg)
  .composite([{ input: logo, top: logoTop, left: logoLeft }])
  .png()
  .toFile(outPath);

console.log("Yazıldı:", outPath, `(${W}x${H}, zemin ${BG})`);
