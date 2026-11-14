// Simülasyon görsellerini telefonsuz görmek için: 9 manevra sahnesi ve arabanın yakın planı.
// Kullanım: node scripts/render-simulasyon.mjs <çıktı-klasörü>
// Uygulamadaki çizimle aynı SVG'ler kullanılır; araba katmanları uygulamadaki gibi konumlanıp döndürülür.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  ARAC_H, ARAC_W, ON_TEKER_Y, SAHNE_H, SAHNE_W, TEKER_H, TEKER_W, TEKER_X, TUVAL_H, TUVAL_PAY, TUVAL_W,
  aracAltSvg, aracGovdeSvg, isikSvg, manevraZeminSvg, tekerSvg,
} from "../src/animations/simGorsel.ts";
import { MANEVRALAR } from "../src/animations/keyframes.ts";
import { rotaNoktalari, surusVerisi } from "../src/animations/manevraVerisi.ts";

const KOK = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cikti = process.argv[2];
if (!cikti) {
  console.error("Kullanım: node scripts/render-simulasyon.mjs <çıktı-klasörü>");
  process.exit(1);
}
mkdirSync(cikti, { recursive: true });

function araba({ x, y, a, teker = 0, isiklar = [], boya = "turuncu", sx = 1, sy = 1 }) {
  const tekerler = TEKER_X.map(
    (tx) =>
      `<div style="position:absolute;left:${TUVAL_PAY + tx - TEKER_W / 2}px;top:${TUVAL_PAY + ON_TEKER_Y - TEKER_H / 2}px;width:${TEKER_W}px;height:${TEKER_H}px;transform:rotate(${teker}deg)">${tekerSvg()}</div>`
  ).join("");
  const katman = (svg) => `<div class="k">${svg}</div>`;
  return (
    `<div style="position:absolute;left:${x - TUVAL_W / 2}px;top:${y - TUVAL_H / 2}px;width:${TUVAL_W}px;height:${TUVAL_H}px;transform:rotate(${a}deg) scale(${sx},${sy})">` +
    katman(aracAltSvg()) + tekerler + katman(aracGovdeSvg(boya)) + isiklar.map((t) => katman(isikSvg(t))).join("") +
    `</div>`
  );
}

function manevraKaresi(tip) {
  const m = MANEVRALAR[tip];
  const v = surusVerisi(m.keyframes);
  const i = Math.floor(m.keyframes.length * (tip === "paralelPark" ? 0.33 : tip === "lPark" ? 0.33 : 0.42));
  const k = m.keyframes[i];
  const isiklar = [];
  if (k.signalLeft) isiklar.push("sinyalSol");
  if (k.signalRight) isiklar.push("sinyalSag");
  if (k.brake) isiklar.push("fren");
  if (v.geri[i]) isiklar.push("geri");
  const rota = rotaNoktalari(m.keyframes, SAHNE_W, SAHNE_H);
  return (
    `<div class="hucre"><div class="etiket">${tip} · kare ${i} · ${isiklar.join(", ") || "ışık yok"} · teker ${v.teker[i].toFixed(0)}°</div>` +
    `<div class="sahne" style="width:${SAHNE_W}px;height:${SAHNE_H}px">${manevraZeminSvg(tip, rota)}${araba({ x: k.x, y: k.y, a: k.a, teker: v.teker[i], isiklar })}</div></div>`
  );
}

const yakinPlan =
  `<div class="hucre"><div class="etiket">Yakın plan: sinyal, fren, geri vites, tekerlek 25°</div>` +
  `<div class="sahne" style="width:200px;height:90px;zoom:4;background:#30353B">` +
  araba({ x: 50, y: 45, a: 0, teker: 25, isiklar: ["sinyalSol", "fren"] }) +
  araba({ x: 150, y: 45, a: 0, teker: 0, isiklar: ["geri"], boya: "gumus" }) +
  `</div></div>`;

const fontYolu = pathToFileURL(join(KOK, "node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")).href;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Nunito_800ExtraBold';src:url('${fontYolu}')}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0B0D10;padding:20px;font-family:'Nunito_800ExtraBold';color:#E5E7EB}
.izgara{display:flex;flex-wrap:wrap;gap:22px}
.hucre{display:flex;flex-direction:column;gap:6px}
.etiket{font-size:12px;opacity:.85}
.sahne{position:relative;overflow:hidden;border-radius:12px}
.sahne > svg{position:absolute;inset:0;width:100%;height:100%}
.k{position:absolute;inset:0}
.k svg, .hucre div > svg{width:100%;height:100%;display:block}
</style></head><body>
<div class="izgara">${Object.keys(MANEVRALAR).map(manevraKaresi).join("")}</div>
<div class="izgara" style="margin-top:22px">${yakinPlan}</div>
</body></html>`;

const htmlYolu = join(cikti, "simulasyon.html");
writeFileSync(htmlYolu, html);
const chrome = [process.env.CHROME_YOLU, "C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].filter(Boolean).find((y) => existsSync(y));
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--virtual-time-budget=3000",
  "--force-device-scale-factor=2", "--window-size=1010,2260", `--screenshot=${join(cikti, "simulasyon.png")}`,
  `--user-data-dir=${join(cikti, ".chrome-profil")}`, pathToFileURL(htmlYolu).href,
], { stdio: "ignore" });
console.log(join(cikti, "simulasyon.png"), ARAC_W, ARAC_H);
