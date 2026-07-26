/**
 * Konu kapak görsellerini uygulama içi gösterim boyutuna indirger.
 * Çalıştır: node scripts/optimize-lesson-images.mjs
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "assets");
const MAX_WIDTH = 900;

const kb = (bytes) => Math.round(bytes / 1024);

const dosyalar = (await readdir(assetsDir)).filter(
  (f) => f.startsWith("lesson-") && f.endsWith(".png")
);

let oncesi = 0;
let sonrasi = 0;

for (const dosya of dosyalar) {
  const tamYol = path.join(assetsDir, dosya);
  const gecici = path.join(assetsDir, `__tmp-${dosya}`);
  const eskiBoyut = (await stat(tamYol)).size;

  const meta = await sharp(tamYol).metadata();
  await sharp(tamYol)
    .resize({ width: Math.min(MAX_WIDTH, meta.width ?? MAX_WIDTH), withoutEnlargement: true })
    .png({ palette: true, quality: 82, effort: 10, compressionLevel: 9 })
    .toFile(gecici);

  const yeniBoyut = (await stat(gecici)).size;
  if (yeniBoyut < eskiBoyut) {
    await unlink(tamYol);
    await rename(gecici, tamYol);
    oncesi += eskiBoyut;
    sonrasi += yeniBoyut;
    console.log(`${dosya}: ${kb(eskiBoyut)} KB -> ${kb(yeniBoyut)} KB (${meta.width}px -> ${Math.min(MAX_WIDTH, meta.width ?? MAX_WIDTH)}px)`);
  } else {
    await unlink(gecici);
    oncesi += eskiBoyut;
    sonrasi += eskiBoyut;
    console.log(`${dosya}: değişmedi (${kb(eskiBoyut)} KB)`);
  }
}

console.log(`\nToplam: ${kb(oncesi)} KB -> ${kb(sonrasi)} KB`);
