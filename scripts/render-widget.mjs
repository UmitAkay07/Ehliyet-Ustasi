// Ana ekran widget'ının görüntülerini telefonsuz üretir (tasarımı ve farklı boyutları gözle kontrol etmek için).
// Kullanım:  node scripts/render-widget.mjs <çıktı-klasörü> [--onizleme-resmi]
// Çıktı: boyutlar.png (her boyut, iki farklı duvar kâğıdında), durumlar.png (her veri durumu, dört boyutta).
// --onizleme-resmi: widget seçim ekranında görünen assets/widget/onizleme.png dosyasını da yeniden üretir.
//
// Gerçek bileşen (src/widget/GunlukDurumWidget.tsx) çalıştırılır; çıkan ağaç Android LinearLayout/FrameLayout
// kurallarına yakın HTML'e çevrilip başsız Chrome ile çekilir. Sonuç gerçek cihaza çok yakındır ama birebir değildir;
// son kontrol her zaman telefonda yapılmalı. Chrome yolu bulunamazsa CHROME_YOLU ortam değişkeniyle verilebilir.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const KOK = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { transform } = require("sucrase");
const React = require("react");

const argumanlar = process.argv.slice(2);
const cikti = argumanlar.find((a) => !a.startsWith("--"));
if (!cikti) {
  console.error("Kullanım: node scripts/render-widget.mjs <çıktı-klasörü> [--onizleme-resmi]");
  process.exit(1);
}
const ciktiKlasoru = resolve(cikti);
mkdirSync(ciktiKlasoru, { recursive: true });

// ---------- Bileşeni yükle (TSX -> CJS, kütüphane yerine işaretli sahte bileşenler) ----------

const sahteKutuphane = {};
for (const ad of ["FlexWidget", "TextWidget", "SvgWidget", "ImageWidget", "OverlapWidget", "IconWidget", "ListWidget"]) {
  const bilesen = () => null;
  bilesen.__name__ = ad;
  sahteKutuphane[ad] = bilesen;
}

const onbellek = new Map();
function modulYukle(dosya) {
  if (onbellek.has(dosya)) return onbellek.get(dosya).exports;
  const modul = { exports: {} };
  onbellek.set(dosya, modul);
  const { code } = transform(readFileSync(dosya, "utf8"), {
    transforms: ["typescript", "jsx", "imports"],
    production: true,
    filePath: dosya,
  });
  const yerelRequire = (istek) => {
    if (istek === "react") return React;
    if (istek === "react-native-android-widget") return sahteKutuphane;
    const yol = istek.startsWith("@/") ? join(KOK, "src", istek.slice(2)) : resolve(dirname(dosya), istek);
    if ([".png", ".jpg"].includes(extname(yol))) return { __resim: yol };
    for (const uzanti of ["", ".ts", ".tsx"]) {
      if (existsSync(yol + uzanti) && extname(yol + uzanti)) return modulYukle(yol + uzanti);
    }
    throw new Error(`Önizlemede çözülemeyen import: ${istek} (${dosya})`);
  };
  new Function("require", "module", "exports", code)(yerelRequire, modul, modul.exports);
  return modul.exports;
}

const { GunlukDurumWidget } = modulYukle(join(KOK, "src", "widget", "GunlukDurumWidget.tsx"));

// ---------- Ağacı HTML'e çevir ----------

const kac = (metin) => String(metin).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function cocuklar(props) {
  const c = props.children;
  return (Array.isArray(c) ? c.flat(Infinity) : [c]).filter((x) => !!x);
}

function coz(eleman) {
  while (typeof eleman.type === "function" && !eleman.type.__name__) eleman = eleman.type(eleman.props);
  return eleman;
}

const YON = { TL_BR: "to bottom right", TOP_BOTTOM: "to bottom", LEFT_RIGHT: "to right", TR_BL: "to bottom left" };

function boyut(deger) {
  if (deger === "match_parent") return "100%";
  if (typeof deger === "number") return `${deger}px`;
  return null;
}

function ortakStil(st = {}) {
  const css = [];
  for (const [anahtar, ozellik] of [
    ["padding", "padding"],
    ["paddingTop", "padding-top"],
    ["paddingBottom", "padding-bottom"],
    ["paddingLeft", "padding-left"],
    ["paddingRight", "padding-right"],
    ["margin", "margin"],
    ["marginTop", "margin-top"],
    ["marginBottom", "margin-bottom"],
    ["marginLeft", "margin-left"],
    ["marginRight", "margin-right"],
    ["borderRadius", "border-radius"],
  ]) {
    if (typeof st[anahtar] === "number") css.push(`${ozellik}:${st[anahtar]}px`);
  }
  if (typeof st.paddingHorizontal === "number") css.push(`padding-left:${st.paddingHorizontal}px;padding-right:${st.paddingHorizontal}px`);
  if (typeof st.paddingVertical === "number") css.push(`padding-top:${st.paddingVertical}px;padding-bottom:${st.paddingVertical}px`);
  if (typeof st.marginHorizontal === "number") css.push(`margin-left:${st.marginHorizontal}px;margin-right:${st.marginHorizontal}px`);
  if (typeof st.marginVertical === "number") css.push(`margin-top:${st.marginVertical}px;margin-bottom:${st.marginVertical}px`);
  if (st.backgroundColor) css.push(`background-color:${st.backgroundColor}`);
  if (st.backgroundGradient) {
    const g = st.backgroundGradient;
    css.push(`background-image:linear-gradient(${YON[g.orientation] ?? "to bottom"},${g.from},${g.to})`);
  }
  if (typeof st.borderWidth === "number") css.push(`border:${st.borderWidth}px solid ${st.borderColor ?? "transparent"}`);
  if (st.overflow === "hidden") css.push("overflow:hidden");
  const w = boyut(st.width);
  const h = boyut(st.height);
  if (w) css.push(`width:${w}`);
  if (h) css.push(`height:${h}`);
  // Sabit boyutlu öğe küçülmez; diğerleri yer kalmayınca daralır (Android kalan genişliği AT_MOST olarak verir)
  const sabit = typeof st.width === "number";
  css.push(st.flex ? `flex:${st.flex} 1 0%;min-width:0;min-height:0` : `flex:0 ${sabit ? 0 : 1} auto;min-width:0`);
  return css;
}

const HIZA = { "flex-start": "flex-start", center: "center", "flex-end": "flex-end" };

function html(eleman, ustYatay = false) {
  const e = coz(eleman);
  const p = e.props;
  const st = p.style ?? {};
  const tur = e.type.__name__;

  if (tur === "TextWidget") {
    const css = ortakStil(st);
    css.push(
      `font-family:'${st.fontFamily ?? "sans-serif"}'`,
      `font-size:${st.fontSize ?? 12}px`,
      `color:${st.color ?? "#000"}`,
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:normal",
      "flex-shrink:1;min-width:0"
    );
    if (typeof st.letterSpacing === "number") css.push(`letter-spacing:${st.letterSpacing}px`);
    if (st.textAlign) css.push(`text-align:${st.textAlign}`);
    return `<div style="${css.join(";")}">${kac(p.text)}</div>`;
  }

  if (tur === "SvgWidget") {
    const css = ortakStil(st);
    css.push("display:block;object-fit:contain");
    return `<img style="${css.join(";")}" src="data:image/svg+xml;utf8,${encodeURIComponent(p.svg)}">`;
  }

  if (tur === "ImageWidget") {
    const css = ortakStil(st);
    css.push(`width:${p.imageWidth}px;height:${p.imageHeight}px;object-fit:contain;display:block`);
    if (p.radius) css.push(`border-radius:${p.radius}px`);
    return `<img style="${css.join(";")}" src="${pathToFileURL(p.image.__resim).href}">`;
  }

  if (tur === "OverlapWidget") {
    const css = ortakStil(st);
    css.push("position:relative");
    const ic = cocuklar(p)
      .map((c) => `<div style="position:absolute;left:0;top:0;width:100%;height:100%;display:flex">${html(c)}</div>`)
      .join("");
    return `<div style="${css.join(";")}">${ic}</div>`;
  }

  if (tur === "FlexWidget") {
    const yatay = st.flexDirection === "row";
    const liste = cocuklar(p);
    const css = ortakStil(st);
    // ViewGroup'lar varsayılan olarak çocuklarını kendi sınırlarında kırpar (clipChildren)
    css.push("display:flex", `flex-direction:${yatay ? "row" : "column"}`, "overflow:hidden");
    if (st.justifyContent) css.push(`justify-content:${st.justifyContent}`);
    // LinearLayout çocukları esnetmez; yatayda hizalama verilmemişse yazılar taban çizgisine hizalanır
    const yaziSayisi = liste.filter((c) => coz(c).type.__name__ === "TextWidget").length;
    const hiza = HIZA[st.alignItems] ?? (yatay && yaziSayisi >= 2 ? "baseline" : "flex-start");
    css.push(`align-items:${hiza}`);
    return `<div style="${css.join(";")}">${liste.map((c) => html(c, yatay)).join("")}</div>`;
  }

  throw new Error(`Önizlemede desteklenmeyen widget: ${tur}`);
}

function widgetHtml(veri, genislik, yukseklik) {
  const agac = React.createElement(GunlukDurumWidget, { veri, genislik, yukseklik });
  return `<div class="widget" style="width:${genislik}px;height:${yukseklik}px">${html(agac)}</div>`;
}

// ---------- Sayfalar ----------

const FONTLAR = ["Nunito_800ExtraBold", "Nunito_700Bold"];
const fontCss = FONTLAR.map((ad) => {
  const klasor = ad.replace("Nunito_", "");
  const yol = join(KOK, "node_modules", "@expo-google-fonts", "nunito", klasor, `${ad}.ttf`);
  return `@font-face{font-family:'${ad}';src:url('${pathToFileURL(yol).href}')}`;
}).join("\n");

const etiketFontu = "font-family:'Nunito_700Bold';font-size:12px;color:#E5E7EB";

function sayfa(govde, arkaPlan = "#0B0D10") {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
body{background:${arkaPlan};padding:24px;${etiketFontu}}
.widget{flex:none;display:flex}
.satir{display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap}
.hucre{display:flex;flex-direction:column;gap:8px}
.duvar{padding:22px;border-radius:28px;display:flex;flex-wrap:wrap;gap:22px;align-items:flex-start}
h2{font-family:'Nunito_800ExtraBold';font-size:16px;color:#F9FAFB;margin:4px 0 12px}
</style></head><body>${govde}</body></html>`;
}

const ORNEK = { kalanGun: 23, tekrarSayisi: 5, bugunCozulen: 12, gunlukHedef: 20 };
const DURUMLAR = [
  ["23 gün, 5 tekrar, 12/20", ORNEK],
  ["Tarih yok, tekrar yok, 0/20", { kalanGun: null, tekrarSayisi: 0, bugunCozulen: 0, gunlukHedef: 20 }],
  ["3 gün, hedef tamam (25/20)", { kalanGun: 3, tekrarSayisi: 0, bugunCozulen: 25, gunlukHedef: 20 }],
  ["Sınav günü, 2 tekrar", { kalanGun: 0, tekrarSayisi: 2, bugunCozulen: 4, gunlukHedef: 10 }],
  ["Tarih geçti, 12 tekrar, 7/14", { kalanGun: -4, tekrarSayisi: 12, bugunCozulen: 7, gunlukHedef: 14 }],
  ["142 gün, 120 tekrar, 3/40", { kalanGun: 142, tekrarSayisi: 120, bugunCozulen: 3, gunlukHedef: 40 }],
];

// Telefonlarda ölçülen tipik hücre boyutları (dp): 1 sıra ~80-110, 2 sıra ~170-200 yükseklik
const BOYUTLAR = [
  ["2x1", 160, 80],
  ["3x1", 245, 90],
  ["4x1", 340, 90],
  ["2x2 (varsayılan)", 165, 185],
  ["2x2 sık ızgara", 140, 152],
  ["3x2", 255, 185],
  ["4x2", 340, 185],
  ["2x3", 165, 285],
];

const DUVARLAR = [
  ["Koyu duvar kâğıdı", "linear-gradient(160deg,#243B55,#141E30)"],
  ["Açık duvar kâğıdı", "linear-gradient(160deg,#F6D9C4,#B9D7EA)"],
];

const boyutlarGovde = DUVARLAR.map(
  ([ad, zemin]) =>
    `<h2>${ad}</h2><div class="duvar" style="background:${zemin}">` +
    BOYUTLAR.map(([etiket, w, h]) => `<div class="hucre">${widgetHtml(ORNEK, w, h)}<div style="${etiketFontu};color:#1F2937;background:rgba(255,255,255,.75);padding:2px 8px;border-radius:8px;align-self:flex-start">${etiket} · ${w}x${h}dp</div></div>`).join("") +
    `</div>`
).join("<div style='height:20px'></div>");

const DURUM_BOYUTLARI = [BOYUTLAR[0], BOYUTLAR[2], BOYUTLAR[3], BOYUTLAR[6]];
const durumlarGovde = DURUMLAR.map(
  ([ad, veri]) =>
    `<h2>${ad}</h2><div class="satir">` +
    DURUM_BOYUTLARI.map(([, w, h]) => `<div class="hucre">${widgetHtml(veri, w, h)}</div>`).join("") +
    `</div>`
).join("");

// ---------- Chrome ile çek ----------

const CHROME_ADAYLARI = [
  process.env.CHROME_YOLU,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = CHROME_ADAYLARI.find((y) => existsSync(y));
if (!chrome) {
  console.error("Chrome/Edge bulunamadı; CHROME_YOLU ortam değişkeniyle yolunu ver.");
  process.exit(1);
}

function cek(ad, icerik, genislik, yukseklik, { olcek = 2, saydam = false } = {}) {
  const htmlYolu = join(ciktiKlasoru, `${ad}.html`);
  const pngYolu = join(ciktiKlasoru, `${ad}.png`);
  writeFileSync(htmlYolu, icerik);
  const bayraklar = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--virtual-time-budget=3000",
    `--force-device-scale-factor=${olcek}`,
    `--window-size=${genislik},${yukseklik}`,
    `--screenshot=${pngYolu}`,
    `--user-data-dir=${join(ciktiKlasoru, ".chrome-profil")}`,
  ];
  if (saydam) bayraklar.push("--default-background-color=00000000");
  execFileSync(chrome, [...bayraklar, pathToFileURL(htmlYolu).href], { stdio: "ignore" });
  console.log(pngYolu);
  return pngYolu;
}

cek("boyutlar", sayfa(boyutlarGovde), 1240, 1290);
cek("durumlar", sayfa(durumlarGovde), 1340, 1640);

if (argumanlar.includes("--onizleme-resmi")) {
  const [, w, h] = BOYUTLAR[3];
  const tekil = `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}*{box-sizing:border-box;margin:0;padding:0}html,body{background:transparent}.widget{display:flex}</style></head><body>${widgetHtml(ORNEK, w, h)}</body></html>`;
  const png = cek("onizleme", tekil, w, h, { olcek: 3, saydam: true });
  const sharp = require("sharp");
  await sharp(readFileSync(png)).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(join(KOK, "assets", "widget", "onizleme.png"));
  console.log("assets/widget/onizleme.png güncellendi");
}
