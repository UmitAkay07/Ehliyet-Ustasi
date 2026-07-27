/**
 * icon-brand.png (aslında JPEG) → gerçek PNG + şeffaf köşeler.
 * 1) Yuvarlatılmış kare maske  2) Kenardaki açık anti-alias erozyonu
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rename } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconPath = path.join(__dirname, "..", "assets", "icon-brand.png");
const tmpPath = iconPath + ".tmp.png";

const meta = await sharp(iconPath).metadata();
const size = meta.width ?? 1024;
const radius = 236; // üst kenar + anti-alias payı

const mask = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
</svg>
`);

const masked = await sharp(iconPath)
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = masked;
const { width, height } = info;

function pix(x, y) {
  return (y * width + x) * 4;
}
function isTransparent(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return true;
  return data[pix(x, y) + 3] < 20;
}
function touchesTransparent(x, y) {
  for (const [dx, dy] of [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ]) {
    if (isTransparent(x + dx, y + dy)) return true;
  }
  return false;
}
function isFringe(x, y) {
  const i = pix(x, y);
  if (data[i + 3] < 20) return false;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Marka mavisi ~ (18,78,164); kenar hale beyaz/açık-mavi
  const lightBlueHalo = b > 185 && g > 145 && r < 190 && lum > 130;
  if (lum < 155 && !lightBlueHalo) return false;
  if (r > 180 && g < 160 && b < 120) return false; // turuncu
  if (r > 200 && g < 80 && b < 80) return false;
  if (g > 180 && r < 120 && b < 120) return false;
  return touchesTransparent(x, y);
}

let eroded = 0;
for (let pass = 0; pass < 12; pass++) {
  const kill = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isFringe(x, y)) kill.push(x, y);
    }
  }
  if (!kill.length) break;
  for (let i = 0; i < kill.length; i += 2) {
    data[pix(kill[i], kill[i + 1]) + 3] = 0;
    eroded++;
  }
}

await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(tmpPath);
await rename(tmpPath, iconPath);

const after = await sharp(iconPath).metadata();
console.log(
  `OK: ${after.format} alpha=${after.hasAlpha} ${after.width}x${after.height} | mask rx=${radius} | erode=${eroded}`
);
