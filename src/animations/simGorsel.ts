/**
 * Simülasyonların ortak görsel dili (saf fonksiyonlar, SVG metni üretir; çalışma zamanında hiçbir şey import etmez).
 * Uygulamada react-native-svg'nin SvgXml'i ile, bilgisayarda önizleme betiğiyle birebir aynı çizilir.
 *
 * Araba kuşbakışı ve burnu yukarıdadır: gövde 28 x 50 birim, tuval (gölge ve aynalar dahil) 44 x 66 birim,
 * tuvalin merkezi arabanın merkezidir. Manevra sahneleri 300 x 220 birimdir.
 */

export const ARAC_W = 28;
export const ARAC_H = 50;
export const TUVAL_PAY = 8;
export const TUVAL_W = ARAC_W + TUVAL_PAY * 2;
export const TUVAL_H = ARAC_H + TUVAL_PAY * 2;
/** Ön tekerleklerin merkezi (araba koordinatı) ve tekerlek ölçüsü */
export const ON_TEKER_Y = 12;
export const ARKA_TEKER_Y = 38.5;
export const TEKER_W = 4.6;
export const TEKER_H = 10;
export const TEKER_X = [0.6, ARAC_W - 0.6] as const;

export const SAHNE_W = 300;
export const SAHNE_H = 220;

export type AracBoyasi = "turuncu" | "gumus" | "lacivert" | "beyaz";

const BOYALAR: Record<AracBoyasi, { koyu: string; ana: string; acik: string; tavan: string }> = {
  turuncu: { koyu: "#A8381A", ana: "#E5532B", acik: "#F98A5F", tavan: "#C94522" },
  gumus: { koyu: "#5E6670", ana: "#9AA3AD", acik: "#D3D9DF", tavan: "#7F8892" },
  lacivert: { koyu: "#1C2638", ana: "#33486B", acik: "#5E7AA6", tavan: "#29395A" },
  beyaz: { koyu: "#A9AFB6", ana: "#E4E7EA", acik: "#FFFFFF", tavan: "#C9CED3" },
};

export const PALET = {
  asfalt: "#30353B",
  asfaltAcik: "#3A4047",
  cizgi: "#ECEAE4",
  sari: "#F2C14E",
  beton: "#A9AFB5",
  betonKoyu: "#7E858D",
  bordurKirmizi: "#C8473F",
  bordurBeyaz: "#EEEEEE",
  cim: "#3F7E4B",
  cimKoyu: "#2F6339",
  duba: "#EC6A2E",
  dubaKoyu: "#B9481A",
  cam: "#16222B",
  camAcik: "#33505F",
  lastik: "#121417",
  fren: "#FF3326",
  sinyal: "#FFAE1F",
  geri: "#FFFFFF",
  rota: "#FFFFFF",
} as const;

const n = (v: number) => String(Math.round(v * 100) / 100);

function rastgele(tohum: number): () => number {
  let a = tohum >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------- Araba ----------------

const GOVDE_YOLU =
  "M5 0.8 C9 0 19 0 23 0.8 Q27.6 2 27.8 9 L28 41 Q28 49 22 49.6 C18 50 10 50 6 49.6 Q0 49 0 41 L0.2 9 Q0.4 2 5 0.8 Z";

/** Gövdenin tanımları (gradyanlar). `on`: belgede benzersiz kimlik öneki */
function aracTanimlari(on: string, boya: AracBoyasi): string {
  const b = BOYALAR[boya];
  return (
    `<linearGradient id="${on}g" x1="0" y1="0" x2="1" y2="0">` +
    `<stop offset="0" stop-color="${b.koyu}"/><stop offset="0.17" stop-color="${b.ana}"/>` +
    `<stop offset="0.5" stop-color="${b.acik}"/><stop offset="0.83" stop-color="${b.ana}"/>` +
    `<stop offset="1" stop-color="${b.koyu}"/></linearGradient>` +
    `<linearGradient id="${on}t" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${b.acik}" stop-opacity="0.55"/><stop offset="0.6" stop-color="${b.tavan}"/>` +
    `<stop offset="1" stop-color="${b.koyu}"/></linearGradient>` +
    `<linearGradient id="${on}c" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${PALET.camAcik}"/><stop offset="1" stop-color="${PALET.cam}"/></linearGradient>` +
    `<radialGradient id="${on}p" cx="0.5" cy="0.5" r="0.5">` +
    `<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.35"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>`
  );
}

/** Gölge ve arka tekerlekler (gövdenin altında kalan katman) */
export function aracAltGrubu(on: string): string {
  const arka = TEKER_X.map((x) => tekerGrubu(x, ARKA_TEKER_Y)).join("");
  return (
    `<defs><radialGradient id="${on}s" cx="0.5" cy="0.5" r="0.5">` +
    `<stop offset="0.55" stop-color="#000000" stop-opacity="0.42"/><stop offset="1" stop-color="#000000" stop-opacity="0"/>` +
    `</radialGradient></defs>` +
    `<rect x="-4.5" y="-3" width="${ARAC_W + 9}" height="${ARAC_H + 8}" rx="14" fill="url(#${on}s)" transform="translate(1.6 2.6)"/>` +
    arka
  );
}

function tekerGrubu(cx: number, cy: number): string {
  const x = cx - TEKER_W / 2;
  const y = cy - TEKER_H / 2;
  let dis = "";
  for (let i = 1; i < 5; i++) {
    dis += `<line x1="${n(x + 0.6)}" y1="${n(y + i * 2)}" x2="${n(x + TEKER_W - 0.6)}" y2="${n(y + i * 2)}" stroke="#2C3137" stroke-width="0.5"/>`;
  }
  return `<rect x="${n(x)}" y="${n(y)}" width="${TEKER_W}" height="${TEKER_H}" rx="1.6" fill="${PALET.lastik}"/>${dis}`;
}

/** Tek tekerleğin kendi tuvali (döndürülebilmesi için ayrı çizilir) */
export function tekerSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TEKER_W} ${TEKER_H}" preserveAspectRatio="none">${tekerGrubu(TEKER_W / 2, TEKER_H / 2)}</svg>`;
}

/** Gövde: kaporta, camlar, farlar, stoplar (kapalı), aynalar */
export function aracGovdeGrubu(onEk: string, boya: AracBoyasi): string {
  const b = BOYALAR[boya];
  const W = ARAC_W;
  const on = `${onEk}${boya}`;
  return (
    `<defs>${aracTanimlari(on, boya)}</defs>` +
    `<ellipse cx="-1.7" cy="15.6" rx="2.1" ry="1.5" fill="${b.koyu}"/>` +
    `<ellipse cx="${W + 1.7}" cy="15.6" rx="2.1" ry="1.5" fill="${b.koyu}"/>` +
    `<path d="${GOVDE_YOLU}" fill="url(#${on}g)" stroke="#000000" stroke-opacity="0.45" stroke-width="0.7"/>` +
    `<line x1="8.4" y1="2.6" x2="7.6" y2="12.6" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="0.6"/>` +
    `<line x1="19.6" y1="2.6" x2="20.4" y2="12.6" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="0.6"/>` +
    `<ellipse cx="14" cy="6.8" rx="7.5" ry="3.2" fill="url(#${on}p)"/>` +
    `<path d="M4.2 14.5 Q14 11.2 23.8 14.5 L22.2 21.5 Q14 20.3 5.8 21.5 Z" fill="url(#${on}c)"/>` +
    `<path d="M7 15.2 L11.5 13.4 L9.3 20.7 L6.6 20.9 Z" fill="#FFFFFF" fill-opacity="0.13"/>` +
    `<rect x="4.1" y="16" width="1.5" height="24.6" rx="0.7" fill="${PALET.cam}" opacity="0.9"/>` +
    `<rect x="${W - 5.6}" y="16" width="1.5" height="24.6" rx="0.7" fill="${PALET.cam}" opacity="0.9"/>` +
    `<rect x="5.6" y="21.3" width="16.8" height="14.8" rx="3" fill="url(#${on}t)"/>` +
    `<ellipse cx="11.6" cy="25.4" rx="4.6" ry="3.4" fill="url(#${on}p)"/>` +
    `<path d="M5.9 36 Q14 37 22.1 36 L23 41.5 Q14 43.2 5 41.5 Z" fill="url(#${on}c)"/>` +
    `<path d="M2.2 4.6 Q3.2 2.2 7 1.7 L7.6 3.6 Q4.4 4.3 3.2 6.4 Z" fill="#F4F1E8"/>` +
    `<path d="M${W - 2.2} 4.6 Q${W - 3.2} 2.2 ${W - 7} 1.7 L${W - 7.6} 3.6 Q${W - 4.4} 4.3 ${W - 3.2} 6.4 Z" fill="#F4F1E8"/>` +
    `<rect x="1.5" y="45.3" width="5.6" height="2.5" rx="1.1" fill="#6B1717"/>` +
    `<rect x="${W - 7.1}" y="45.3" width="5.6" height="2.5" rx="1.1" fill="#6B1717"/>`
  );
}

function tuval(ic: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-TUVAL_PAY} ${-TUVAL_PAY} ${TUVAL_W} ${TUVAL_H}" preserveAspectRatio="none">${ic}</svg>`;
}

/** Gölge + arka tekerlekler katmanı (tuval ölçüsünde) */
export function aracAltSvg(on = "a"): string {
  return tuval(aracAltGrubu(on));
}

/** Gövde katmanı (tuval ölçüsünde) */
export function aracGovdeSvg(boya: AracBoyasi, on = "a"): string {
  return tuval(aracGovdeGrubu(on, boya));
}

/** Tüm araba tek parça (park halindeki araçlar ve önizleme için) */
export function aracSvg(boya: AracBoyasi, on = "a"): string {
  const onTeker = TEKER_X.map((x) => tekerGrubu(x, ON_TEKER_Y)).join("");
  return tuval(aracAltGrubu(on) + onTeker + aracGovdeGrubu(on, boya));
}

export type IsikTuru = "fren" | "sinyalSol" | "sinyalSag" | "geri";

function parilti(on: string, cx: number, cy: number, r: number, renk: string, guc: number): string {
  const id = `${on}${Math.round(cx * 10)}_${Math.round(cy * 10)}`;
  return (
    `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">` +
    `<stop offset="0" stop-color="${renk}" stop-opacity="${guc}"/>` +
    `<stop offset="0.35" stop-color="${renk}" stop-opacity="${n(guc * 0.45)}"/>` +
    `<stop offset="1" stop-color="${renk}" stop-opacity="0"/></radialGradient></defs>` +
    `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="url(#${id})"/>`
  );
}

/** Yanan ışık katmanı (tuval ölçüsünde, opaklığı dışarıdan canlandırılır) */
export function isikSvg(tur: IsikTuru, on = "i"): string {
  const W = ARAC_W;
  let ic = "";
  if (tur === "fren") {
    ic =
      parilti(on, 4.3, 46.6, 9, PALET.fren, 0.85) +
      parilti(on, W - 4.3, 46.6, 9, PALET.fren, 0.85) +
      `<rect x="1.5" y="45.3" width="5.6" height="2.5" rx="1.1" fill="#FF5446"/>` +
      `<rect x="${W - 7.1}" y="45.3" width="5.6" height="2.5" rx="1.1" fill="#FF5446"/>`;
  } else if (tur === "geri") {
    ic =
      parilti(on, 9.5, 49.6, 6.5, PALET.geri, 0.75) +
      parilti(on, W - 9.5, 49.6, 6.5, PALET.geri, 0.75) +
      `<rect x="8" y="48.4" width="3" height="1.2" rx="0.5" fill="#FFFFFF"/>` +
      `<rect x="${W - 11}" y="48.4" width="3" height="1.2" rx="0.5" fill="#FFFFFF"/>`;
  } else {
    const sol = tur === "sinyalSol";
    const x1 = sol ? 2.6 : W - 2.6;
    const x2 = sol ? 2.2 : W - 2.2;
    const ayna = sol ? -1.7 : W + 1.7;
    ic =
      parilti(on, x1, 3.4, 8, PALET.sinyal, 0.95) +
      parilti(on, x2, 46.8, 8, PALET.sinyal, 0.95) +
      parilti(on, ayna, 15.6, 4, PALET.sinyal, 0.9) +
      `<circle cx="${n(x1)}" cy="3.4" r="1.4" fill="#FFD27A"/>` +
      `<circle cx="${n(x2)}" cy="46.8" r="1.4" fill="#FFD27A"/>`;
  }
  return tuval(ic);
}

// ---------------- Zemin parçaları ----------------

function zeminTabani(on: string, w: number, h: number, tohum: number, benekSayisi: number): string {
  const r = rastgele(tohum);
  let benek = "";
  for (let i = 0; i < benekSayisi; i++) {
    const acik = r() < 0.5;
    benek += `<circle cx="${n(r() * w)}" cy="${n(r() * h)}" r="${n((0.25 + r() * 0.75) * (w / 300))}" fill="${acik ? "#FFFFFF" : "#000000"}" opacity="${n(acik ? 0.03 + r() * 0.05 : 0.08 + r() * 0.08)}"/>`;
  }
  return (
    `<defs><linearGradient id="${on}z" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${PALET.asfalt}"/><stop offset="1" stop-color="${PALET.asfaltAcik}"/></linearGradient>` +
    `<radialGradient id="${on}v" cx="0.5" cy="0.45" r="0.75">` +
    `<stop offset="0.6" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.32"/></radialGradient></defs>` +
    `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#${on}z)"/>` +
    benek
  );
}

function vinyet(on: string, w: number, h: number): string {
  return `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#${on}v)"/>`;
}

function cizgi(x1: number, y1: number, x2: number, y2: number, renk: string, kalinlik: number, kesik?: string): string {
  return (
    `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${renk}" stroke-width="${n(kalinlik)}"` +
    `${kesik ? ` stroke-dasharray="${kesik}"` : ""} stroke-linecap="butt" opacity="0.92"/>`
  );
}

/** Beton kaldırım; yol tarafındaki kenarında kırmızı-beyaz bordür */
function kaldirim(x: number, y: number, w: number, h: number, kenar: "sol" | "ust", olcek = 1): string {
  let s = `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${PALET.beton}"/>`;
  const adim = 12 * olcek;
  const r = rastgele(Math.round(x * 7 + y * 13));
  for (let i = 0; i < (w * h) / (60 * olcek * olcek); i++) {
    s += `<circle cx="${n(x + r() * w)}" cy="${n(y + r() * h)}" r="${n(0.5 * olcek)}" fill="#000000" opacity="0.07"/>`;
  }
  if (kenar === "sol") {
    const derz = Math.ceil(h / (24 * olcek));
    for (let i = 1; i < derz; i++) s += cizgi(x, y + i * 24 * olcek, x + w, y + i * 24 * olcek, PALET.betonKoyu, 0.6 * olcek);
    for (let yy = y, i = 0; yy < y + h; yy += adim, i++) {
      s += `<rect x="${n(x)}" y="${n(yy)}" width="${n(5 * olcek)}" height="${n(Math.min(adim, y + h - yy))}" fill="${i % 2 ? PALET.bordurBeyaz : PALET.bordurKirmizi}"/>`;
    }
    s += `<rect x="${n(x + 5 * olcek)}" y="${n(y)}" width="${n(1.4 * olcek)}" height="${n(h)}" fill="#000000" opacity="0.18"/>`;
  } else {
    const derz = Math.ceil(w / (24 * olcek));
    for (let i = 1; i < derz; i++) s += cizgi(x + i * 24 * olcek, y, x + i * 24 * olcek, y + h, PALET.betonKoyu, 0.6 * olcek);
    for (let xx = x, i = 0; xx < x + w; xx += adim, i++) {
      s += `<rect x="${n(xx)}" y="${n(y)}" width="${n(Math.min(adim, x + w - xx))}" height="${n(5 * olcek)}" fill="${i % 2 ? PALET.bordurBeyaz : PALET.bordurKirmizi}"/>`;
    }
    s += `<rect x="${n(x)}" y="${n(y + 5 * olcek)}" width="${n(w)}" height="${n(1.4 * olcek)}" fill="#000000" opacity="0.18"/>`;
  }
  return s;
}

/** Kuşbakışı trafik dubası: kare taban, yansıtıcı bant, gölge */
export function dubaGrubu(on: string, x: number, y: number, olcek = 1): string {
  const s = olcek;
  return (
    `<ellipse cx="${n(x + 1.8 * s)}" cy="${n(y + 2.6 * s)}" rx="${n(7 * s)}" ry="${n(5.2 * s)}" fill="url(#${on}dg)"/>` +
    `<rect x="${n(x - 6 * s)}" y="${n(y - 6 * s)}" width="${n(12 * s)}" height="${n(12 * s)}" rx="${n(2.2 * s)}" fill="${PALET.dubaKoyu}"/>` +
    `<circle cx="${n(x)}" cy="${n(y)}" r="${n(5 * s)}" fill="url(#${on}dk)"/>` +
    `<circle cx="${n(x)}" cy="${n(y)}" r="${n(3.6 * s)}" fill="#F4F4F2"/>` +
    `<circle cx="${n(x)}" cy="${n(y)}" r="${n(2.4 * s)}" fill="url(#${on}dk)"/>` +
    `<circle cx="${n(x - 0.7 * s)}" cy="${n(y - 0.7 * s)}" r="${n(0.9 * s)}" fill="#FFE2CC" opacity="0.9"/>`
  );
}

function dubaTanimlari(on: string): string {
  return (
    `<defs><radialGradient id="${on}dg" cx="0.5" cy="0.5" r="0.5">` +
    `<stop offset="0.4" stop-color="#000000" stop-opacity="0.38"/><stop offset="1" stop-color="#000000" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${on}dk" cx="0.4" cy="0.38" r="0.65">` +
    `<stop offset="0" stop-color="#FF9A5E"/><stop offset="0.7" stop-color="${PALET.duba}"/><stop offset="1" stop-color="${PALET.dubaKoyu}"/></radialGradient></defs>`
  );
}

/** Park halindeki araba: merkez (x, y), açı derece (0 = burun yukarı), en ve boy ölçeği */
export function parkliAracGrubu(
  on: string,
  x: number,
  y: number,
  aciDerece: number,
  boya: AracBoyasi,
  olcekX = 1,
  olcekY = olcekX
): string {
  const onTeker = TEKER_X.map((tx) => tekerGrubu(tx, ON_TEKER_Y)).join("");
  return (
    `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(aciDerece)}) scale(${n(olcekX)} ${n(olcekY)}) translate(${-ARAC_W / 2} ${-ARAC_H / 2})">` +
    aracAltGrubu(on) +
    onTeker +
    aracGovdeGrubu(on, boya) +
    `</g>`
  );
}

function yazi(x: number, y: number, s: string, boyut: number, renk: string, aci = 0, opaklik = 1): string {
  return (
    `<text x="${n(x)}" y="${n(y)}" font-size="${boyut}" fill="${renk}" opacity="${opaklik}" text-anchor="middle"` +
    ` font-family="Nunito_800ExtraBold" font-weight="800" letter-spacing="1.5"${aci ? ` transform="rotate(${aci} ${n(x)} ${n(y)})"` : ""}>${s}</text>`
  );
}

/** Aracın izleyeceği yol: ince, kesik, yarı saydam rehber çizgi */
function rotaCizgisi(rota: ReadonlyArray<readonly [number, number]>): string {
  if (rota.length < 2) return "";
  const d = rota.map(([x, y], i) => `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`).join(" ");
  return `<path d="${d}" fill="none" stroke="${PALET.rota}" stroke-opacity="0.2" stroke-width="1.6" stroke-dasharray="3 5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// ---------------- Manevra sahneleri ----------------

export type ManevraSahneTipi =
  | "temelKumanda"
  | "paralelPark"
  | "lPark"
  | "rampaKalkis"
  | "aniFren"
  | "uDonusu"
  | "seritDegistirme"
  | "sinyal"
  | "geriManevra";

/** Manevra sahnesinin zemini (300 x 220). Geometri, manevra anahtar karelerindeki konumlarla aynıdır. */
export function manevraZeminSvg(tip: ManevraSahneTipi, rota: ReadonlyArray<readonly [number, number]> = []): string {
  const on = `m${tip}`;
  const W = SAHNE_W;
  const H = SAHNE_H;
  let ic = zeminTabani(on, W, H, tip.length * 97 + 11, 320) + dubaTanimlari(on);
  const B = PALET.cizgi;
  const S = PALET.sari;
  const duba = (x: number, y: number) => dubaGrubu(on, x, y);

  switch (tip) {
    case "paralelPark":
      ic += kaldirim(205, 0, 95, H, "sol");
      ic += cizgi(80, 0, 80, H, B, 2, "14 14");
      ic += cizgi(145, 60, 205, 60, B, 2, "6 6") + cizgi(145, 175, 205, 175, B, 2, "6 6");
      ic += rotaCizgisi(rota);
      ic += [[145, 5], [200, 5], [145, 60], [200, 60], [145, 175], [200, 175], [145, 235], [200, 235]].map(([x, y]) => duba(x, y)).join("");
      break;
    case "lPark":
      ic += kaldirim(0, 118, W, 102, "ust");
      ic += `<rect x="110" y="124" width="100" height="96" fill="${PALET.asfalt}"/>`;
      ic += cizgi(110, 124, 110, H, S, 3) + cizgi(155, 124, 155, H, S, 3) + cizgi(210, 124, 210, H, S, 3);
      ic += parkliAracGrubu(`${on}p`, 132.5, 176, 0, "gumus");
      ic += rotaCizgisi(rota);
      ic += [[155, 124], [210, 124], [155, 180], [210, 180]].map(([x, y]) => duba(x, y)).join("");
      break;
    case "rampaKalkis":
      ic += `<defs><linearGradient id="${on}r" x1="0" y1="1" x2="0" y2="0">` +
        `<stop offset="0" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.28"/></linearGradient></defs>`;
      ic += `<polygon points="0,${H} ${W},${H} ${W},100 0,160" fill="#000000" opacity="0.12"/>`;
      ic += `<rect x="96" y="0" width="108" height="${H}" fill="url(#${on}r)"/>`;
      for (let y = 8; y < H; y += 16) ic += cizgi(98, y, 104, y + 5, "#FFFFFF", 0.8) + cizgi(196, y, 202, y + 5, "#FFFFFF", 0.8);
      ic += cizgi(150, 0, 150, H, B, 3, "14 14");
      ic += cizgi(100, 120, 200, 120, S, 4) + cizgi(100, 170, 200, 170, S, 4);
      ic += rotaCizgisi(rota);
      ic += yazi(232, 148, "YOKUŞ", 14, S, -90);
      break;
    case "aniFren":
      ic += cizgi(150, 0, 150, H, B, 3, "14 14");
      ic += rotaCizgisi(rota);
      ic += `<rect x="110" y="70" width="80" height="18" rx="6" fill="#B91C1C"/>`;
      for (let i = 0; i < 5; i++) ic += `<rect x="${118 + i * 14}" y="72.5" width="8" height="13" rx="1.5" fill="#FFFFFF" opacity="0.9"/>`;
      ic += yazi(150, 60, "DUR!", 16, "#F87171");
      break;
    case "uDonusu": {
      ic += cizgi(145, 90, 145, H, S, 2, "8 8");
      ic += rotaCizgisi(rota);
      const dubalar: Array<[number, number]> = [];
      for (const y of [20, 50, 80, 110, 140, 170, 200, 230]) dubalar.push([80, y], [210, y]);
      for (const x of [100, 120, 140, 160, 180]) dubalar.push([x, 20]);
      for (const y of [90, 120, 150, 180, 210]) dubalar.push([145, y]);
      ic += dubalar.map(([x, y]) => duba(x, y)).join("");
      break;
    }
    case "seritDegistirme":
      ic += cizgi(100, 0, 100, H, B, 3, "16 16") + cizgi(200, 0, 200, H, B, 3, "16 16");
      ic += rotaCizgisi(rota);
      ic += `<path d="M150 108 L143 124 L148 124 L148 134 L152 134 L152 124 L157 124 Z" fill="${B}" opacity="0.4"/>`;
      ic += `<path d="M150 158 L143 174 L148 174 L148 184 L152 184 L152 174 L157 174 Z" fill="${B}" opacity="0.4"/>`;
      break;
    case "temelKumanda":
    case "sinyal":
      ic += cizgi(90, 0, 90, H, B, 4) + cizgi(210, 0, 210, H, B, 4);
      if (tip === "temelKumanda") ic += cizgi(150, 0, 150, H, S, 2, "16 16");
      else ic += cizgi(150, 0, 150, H, B, 3, "14 14");
      ic += rotaCizgisi(rota);
      break;
    case "geriManevra":
      ic += cizgi(90, 0, 90, H, B, 3) + cizgi(210, 0, 210, H, B, 3);
      ic += cizgi(110, 40, 190, 40, S, 4) + cizgi(110, 185, 190, 185, S, 4);
      ic += yazi(150, 112, "25 METRE", 22, "#FFFFFF", -90, 0.16);
      ic += rotaCizgisi(rota);
      break;
  }

  ic += vinyet(on, W, H);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${ic}</svg>`;
}
