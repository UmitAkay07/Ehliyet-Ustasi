/**
 * Widget'ın SVG çizimleri (renkleri uygulama ikonundan ve koyu temadan):
 * - zemin: yuvarlak köşeli koyu gradyan, hafif mavi ışıma ve silik direksiyon simidi filigranı
 * - yol: asfalt şerit, gidilen kısım mavi, kalan kısım kesik çizgi, sonda damalı bayrak,
 *   bugünkü soru hedefine göre ilerleyen kuşbakışı araba
 * Saf fonksiyonlar; çalışma zamanında hiçbir şey import etmez (node --test ile test edilir).
 */

const RENK = {
  zeminUst: "#202930",
  zeminAlt: "#121417",
  isima: "#7DD0F0",
  kenar: "#FFFFFF",
  asfalt: "#2A3036",
  gidilen: "#7DD0F0",
  serit: "#FFFFFF",
  arac: "#F26B3A",
  tavan: "#FF8F66",
  cam: "#1B2731",
  far: "#FFE08A",
  damaAcik: "#F2F2F0",
  damaKoyu: "#16191C",
} as const;

const s = (n: number) => String(Math.round(n * 100) / 100);

export type ZeminDuzeni = "serit" | "kare" | "genis";

export interface ZeminGirdisi {
  /** dp */
  genislik: number;
  /** dp */
  yukseklik: number;
  duzen: ZeminDuzeni;
}

export function koseYaricapi(genislik: number, yukseklik: number): number {
  return Math.min(24, Math.max(16, Math.min(genislik, yukseklik) * 0.16));
}

export function zeminSvg({ genislik, yukseklik, duzen }: ZeminGirdisi): string {
  const W = Math.max(1, genislik);
  const H = Math.max(1, yukseklik);
  const R = koseYaricapi(W, H);
  const kisa = Math.min(W, H);

  const isimaX = duzen === "serit" ? H * 0.6 : W * 0.18;
  const isimaY = duzen === "serit" ? H * 0.5 : H * 0.45;
  const isimaR = duzen === "serit" ? H * 1.6 : Math.max(W, H) * 0.7;

  const simitR = duzen === "serit" ? H * 0.7 : kisa * 0.5;
  const simitX = W - simitR * 0.15;
  const simitY = duzen === "serit" ? H * 0.5 : H * 0.42;
  const kol = simitR * 0.13;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s(W)}" height="${s(H)}" viewBox="0 0 ${s(W)} ${s(H)}">` +
    `<defs>` +
    `<clipPath id="kose"><rect x="0" y="0" width="${s(W)}" height="${s(H)}" rx="${s(R)}"/></clipPath>` +
    `<linearGradient id="zemin" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${RENK.zeminUst}"/><stop offset="1" stop-color="${RENK.zeminAlt}"/>` +
    `</linearGradient>` +
    `<radialGradient id="isima" cx="${s(isimaX)}" cy="${s(isimaY)}" r="${s(isimaR)}" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="${RENK.isima}" stop-opacity="0.13"/><stop offset="1" stop-color="${RENK.isima}" stop-opacity="0"/>` +
    `</radialGradient>` +
    `</defs>` +
    `<g clip-path="url(#kose)">` +
    `<rect x="0" y="0" width="${s(W)}" height="${s(H)}" fill="url(#zemin)"/>` +
    `<rect x="0" y="0" width="${s(W)}" height="${s(H)}" fill="url(#isima)"/>` +
    `<g opacity="0.035" fill="none" stroke="#FFFFFF" stroke-width="${s(kol)}">` +
    `<circle cx="${s(simitX)}" cy="${s(simitY)}" r="${s(simitR - kol * 0.5)}"/>` +
    `<circle cx="${s(simitX)}" cy="${s(simitY)}" r="${s(simitR * 0.24)}"/>` +
    `<line x1="${s(simitX - simitR + kol)}" y1="${s(simitY)}" x2="${s(simitX - simitR * 0.24)}" y2="${s(simitY)}"/>` +
    `<line x1="${s(simitX + simitR * 0.24)}" y1="${s(simitY)}" x2="${s(simitX + simitR - kol)}" y2="${s(simitY)}"/>` +
    `<line x1="${s(simitX)}" y1="${s(simitY + simitR * 0.24)}" x2="${s(simitX)}" y2="${s(simitY + simitR - kol)}"/>` +
    `</g>` +
    `</g>` +
    `<rect x="0.5" y="0.5" width="${s(W - 1)}" height="${s(H - 1)}" rx="${s(R - 0.5)}" fill="none" stroke="${RENK.kenar}" stroke-opacity="0.08"/>` +
    `</svg>`
  );
}

export interface YolCizimiGirdisi {
  /** dp */
  genislik: number;
  /** dp */
  yukseklik: number;
  /** 0..1 */
  ilerleme: number;
}

export interface YolOlculeri {
  /** Arabanın arka ve ön ucu (x, dp) */
  aracArka: number;
  aracOn: number;
  /** Damalı bayrağın sol kenarı (x, dp) */
  bayrakX: number;
}

export function yolOlculeri({ genislik, yukseklik, ilerleme }: YolCizimiGirdisi): YolOlculeri {
  const p = Number.isFinite(ilerleme) ? Math.min(1, Math.max(0, ilerleme)) : 0;
  const yaricap = yukseklik / 2;
  const kare = (yukseklik - 4) / 4;
  const bayrakX = genislik - yaricap - 2 * kare;
  const baslangic = yukseklik * 0.3;
  const aracBoy = yukseklik * 1.6;
  const bitis = Math.max(baslangic + aracBoy, bayrakX - 3);
  const aracOn = baslangic + aracBoy + p * (bitis - baslangic - aracBoy);
  return { aracArka: aracOn - aracBoy, aracOn, bayrakX };
}

export function yolSvg(girdi: YolCizimiGirdisi): string {
  const W = Math.max(1, girdi.genislik);
  const H = Math.max(1, girdi.yukseklik);
  const { aracArka, aracOn, bayrakX } = yolOlculeri({ ...girdi, genislik: W, yukseklik: H });
  const r = H / 2;
  const kare = (H - 4) / 4;
  const parcalar: string[] = [];

  parcalar.push(`<rect x="0" y="0" width="${s(W)}" height="${s(H)}" rx="${s(r)}" fill="${RENK.asfalt}"/>`);

  const baslangic = H * 0.3;
  const gidilenSon = aracArka + H * 0.5;
  if (gidilenSon > baslangic) {
    parcalar.push(
      `<line x1="${s(baslangic)}" y1="${s(r)}" x2="${s(gidilenSon)}" y2="${s(r)}" stroke="${RENK.gidilen}" stroke-width="${s(H * 0.14)}" stroke-linecap="round"/>`
    );
  }

  const kesikBas = aracOn + H * 0.35;
  const kesikSon = bayrakX - H * 0.3;
  if (kesikSon - kesikBas > H * 0.3) {
    const adim = s(H * 0.32);
    parcalar.push(
      `<line x1="${s(kesikBas)}" y1="${s(r)}" x2="${s(kesikSon)}" y2="${s(r)}" stroke="${RENK.serit}" stroke-opacity="0.32" stroke-width="${s(Math.max(1, H * 0.09))}" stroke-dasharray="${adim} ${adim}"/>`
    );
  }

  for (let sutun = 0; sutun < 2; sutun++) {
    for (let satir = 0; satir < 4; satir++) {
      const renk = (sutun + satir) % 2 === 0 ? RENK.damaAcik : RENK.damaKoyu;
      parcalar.push(
        `<rect x="${s(bayrakX + sutun * kare)}" y="${s(2 + satir * kare)}" width="${s(kare)}" height="${s(kare)}" fill="${renk}"/>`
      );
    }
  }

  const L = H * 1.6;
  const C = H * 0.64;
  parcalar.push(
    `<g transform="translate(${s(aracArka)} ${s((H - C) / 2)})">` +
      `<rect x="0" y="0" width="${s(L)}" height="${s(C)}" rx="${s(C * 0.38)}" fill="${RENK.arac}"/>` +
      `<rect x="${s(L * 0.16)}" y="${s(C * 0.17)}" width="${s(L * 0.12)}" height="${s(C * 0.66)}" rx="${s(C * 0.12)}" fill="${RENK.cam}"/>` +
      `<rect x="${s(L * 0.3)}" y="${s(C * 0.15)}" width="${s(L * 0.3)}" height="${s(C * 0.7)}" rx="${s(C * 0.14)}" fill="${RENK.tavan}"/>` +
      `<rect x="${s(L * 0.62)}" y="${s(C * 0.15)}" width="${s(L * 0.16)}" height="${s(C * 0.7)}" rx="${s(C * 0.12)}" fill="${RENK.cam}"/>` +
      `<circle cx="${s(L - C * 0.14)}" cy="${s(C * 0.22)}" r="${s(C * 0.09)}" fill="${RENK.far}"/>` +
      `<circle cx="${s(L - C * 0.14)}" cy="${s(C * 0.78)}" r="${s(C * 0.09)}" fill="${RENK.far}"/>` +
      `</g>`
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s(W)}" height="${s(H)}" viewBox="0 0 ${s(W)} ${s(H)}">${parcalar.join("")}</svg>`;
}
