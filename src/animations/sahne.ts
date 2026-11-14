/**
 * Senaryo sahnesi motoru — saf geometri, hiçbir import yok.
 *
 * Kuşbakışı 2D sahne (100 x 60 birim). Araçlar ve yayalar zaman anahtarlı konumlarla (KF) tarif edilir;
 * motor, verilen anda çizilecek ilkel şekilleri (Prim) üretir. Aynı ilkel şekiller hem
 * react-native-svg ile uygulamada hem de svgMetni() ile Node'da (PNG kontrolü / testler) çizilir.
 *
 * Yön kuralı: Türkiye'de sağdan trafik. Doğuya (sağa) giden aracın şeridi yolun alt yarısıdır.
 */

export type Nokta = [number, number];
/** Zaman anahtarı: [t (0..1), x, y] */
export type KF = [number, number, number];
export type AracRengi = "yesil" | "kirmizi" | "mavi" | "sari";

export const SAHNE_GENISLIK = 100;
export const SAHNE_YUKSEKLIK = 60;
export const ARAC_UZUNLUK = 9;
export const ARAC_GENISLIK = 4.6;
export const YAYA_YARICAP = 1.5;
export const COCUK_YARICAP = 1.2;

export const SAHNE_RENK = {
  arkaplan: "#1F2937",
  yol: "#374151",
  cizgi: "#E5E7EB",
  sari: "#FBBF24",
  yaya: "#F8FAFC",
  cocuk: "#FDE68A",
  ada: "#065F46",
  govdeKenar: "#0B1220",
  cam: "#0F172A",
  sinyal: "#FB923C",
  arac: {
    yesil: "#10B981",
    kirmizi: "#EF4444",
    mavi: "#3B82F6",
    sari: "#F59E0B",
  },
} as const;

export type Prim =
  | { tip: "rect"; x: number; y: number; w: number; h: number; dolgu: string; kenar?: string; kenarKalinlik?: number; opaklik?: number }
  | { tip: "cizgi"; x1: number; y1: number; x2: number; y2: number; renk: string; kalinlik: number; kesik?: string; opaklik?: number }
  | { tip: "daire"; cx: number; cy: number; r: number; dolgu?: string; kenar?: string; kenarKalinlik?: number; opaklik?: number }
  | { tip: "cokgen"; noktalar: Nokta[]; dolgu: string; kenar?: string; kenarKalinlik?: number; opaklik?: number }
  | { tip: "metin"; x: number; y: number; s: string; boyut: number; renk: string; hizala?: "start" | "middle" | "end"; kalin?: boolean };

/** `zaman` verilirse yalnızca bu t aralığında görünür */
export type SahnePrim = Prim & { zaman?: [number, number] };

export interface SahneArac {
  renk: AracRengi;
  kareler: KF[];
  /** Belirtilen t aralığında sinyal yanıp söner */
  sinyal?: { taraf: "sol" | "sag"; zaman: [number, number] };
}

export interface SahneYaya {
  kareler: KF[];
  cocuk?: boolean;
}

export type SahneZemin = "duz-yol" | "iki-serit" | "kavsak" | "yaya-gecidi" | "donel-kavsak";

export interface Sahne {
  zemin: SahneZemin;
  araclar: SahneArac[];
  yayalar?: SahneYaya[];
  /** Araçların altında çizilen ek şekiller (yasak alan, çizgi, levha...) */
  altEkler?: SahnePrim[];
  /** Araçların üstünde çizilen ek şekiller (uyarı işareti, yazı...) */
  ustEkler?: SahnePrim[];
  /** Sahne altındaki açıklama satırları */
  lejant: string[];
  /** Bir döngünün süresi (ms); varsayılan 7000 */
  sureMs?: number;
}

const EPS = 1e-9;

function durgunMu(a: KF, b: KF): boolean {
  return Math.abs(a[1] - b[1]) < EPS && Math.abs(a[2] - b[2]) < EPS;
}

function gecis(u: number, girisYumusak: boolean, cikisYumusak: boolean): number {
  if (girisYumusak && cikisYumusak) return u * u * (3 - 2 * u);
  if (girisYumusak) return u * u;
  if (cikisYumusak) return 1 - (1 - u) * (1 - u);
  return u;
}

/**
 * Zaman anahtarlarından t anındaki konum.
 * Duruştan kalkış / durmaya yaklaşış yumuşatılır; sabit hızlı geçişler doğrusal kalır.
 */
export function konumHesapla(kareler: KF[], t: number): { x: number; y: number } {
  const n = kareler.length;
  if (n === 0) return { x: 0, y: 0 };
  if (n === 1 || t <= kareler[0][0]) return { x: kareler[0][1], y: kareler[0][2] };
  if (t >= kareler[n - 1][0]) return { x: kareler[n - 1][1], y: kareler[n - 1][2] };

  let i = 0;
  while (i < n - 2 && t > kareler[i + 1][0]) i++;
  const a = kareler[i];
  const b = kareler[i + 1];
  const sure = b[0] - a[0];
  const u = sure <= EPS ? 1 : (t - a[0]) / sure;
  const girisYumusak = i === 0 || durgunMu(kareler[i - 1], a);
  const cikisYumusak = i === n - 2 || durgunMu(b, kareler[i + 2]);
  const e = gecis(u, girisYumusak, cikisYumusak);
  return { x: a[1] + (b[1] - a[1]) * e, y: a[2] + (b[2] - a[2]) * e };
}

/** Bakış yönü (radyan). Küçük bir pencerede ortalama hız yönü alınır; dururken son hareket yönü korunur. */
export function aciHesapla(kareler: KF[], t: number): number {
  const h = 0.04;
  const p1 = konumHesapla(kareler, Math.min(1, t + h));
  const p0 = konumHesapla(kareler, Math.max(0, t - h));
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  if (Math.hypot(dx, dy) > 1e-3) return Math.atan2(dy, dx);

  const yon = (j: number) => Math.atan2(kareler[j + 1][2] - kareler[j][2], kareler[j + 1][1] - kareler[j][1]);
  const hareketli = (j: number) => !durgunMu(kareler[j], kareler[j + 1]);
  let simdiki = -1;
  for (let j = 0; j < kareler.length - 1; j++) if (kareler[j][0] <= t) simdiki = j;
  for (let j = simdiki; j >= 0; j--) if (hareketli(j)) return yon(j);
  for (let j = 0; j < kareler.length - 1; j++) if (hareketli(j)) return yon(j);
  return 0;
}

export function sinyalAcikMi(arac: SahneArac, t: number): boolean {
  if (!arac.sinyal) return false;
  const [t0, t1] = arac.sinyal.zaman;
  if (t < t0 || t > t1) return false;
  return Math.floor(t * 24) % 2 === 0;
}

export function zeminPrimleri(zemin: SahneZemin): Prim[] {
  const R = SAHNE_RENK;
  const p: Prim[] = [{ tip: "rect", x: 0, y: 0, w: SAHNE_GENISLIK, h: SAHNE_YUKSEKLIK, dolgu: R.arkaplan }];
  const yatayYol = (y: number, h: number): Prim => ({ tip: "rect", x: 0, y, w: 100, h, dolgu: R.yol });
  const kesik = (x1: number, y1: number, x2: number, y2: number): Prim => ({
    tip: "cizgi", x1, y1, x2, y2, renk: R.cizgi, kalinlik: 0.5, kesik: "3 3", opaklik: 0.8,
  });

  switch (zemin) {
    case "duz-yol":
      p.push(yatayYol(21, 18), kesik(0, 30, 100, 30));
      break;
    case "iki-serit":
      p.push(
        yatayYol(18, 24),
        kesik(0, 30, 100, 30),
        { tip: "cizgi", x1: 0, y1: 19, x2: 100, y2: 19, renk: R.cizgi, kalinlik: 0.4, opaklik: 0.7 },
        { tip: "cizgi", x1: 0, y1: 41, x2: 100, y2: 41, renk: R.cizgi, kalinlik: 0.4, opaklik: 0.7 }
      );
      break;
    case "kavsak":
      p.push(
        yatayYol(21, 18),
        { tip: "rect", x: 41, y: 0, w: 18, h: 60, dolgu: R.yol },
        kesik(0, 30, 41, 30), kesik(59, 30, 100, 30), kesik(50, 0, 50, 21), kesik(50, 39, 50, 60)
      );
      break;
    case "yaya-gecidi":
      p.push(yatayYol(21, 18), kesik(0, 30, 43, 30), kesik(57, 30, 100, 30));
      for (let y = 22; y <= 37.5; y += 3) {
        p.push({ tip: "rect", x: 44, y, w: 12, h: 1.8, dolgu: R.cizgi, opaklik: 0.9 });
      }
      break;
    case "donel-kavsak":
      p.push(
        yatayYol(21, 18),
        { tip: "rect", x: 41, y: 0, w: 18, h: 60, dolgu: R.yol },
        { tip: "daire", cx: 50, cy: 30, r: 15, dolgu: R.yol },
        { tip: "daire", cx: 50, cy: 30, r: 8, dolgu: R.ada, kenar: R.cizgi, kenarKalinlik: 0.4 }
      );
      break;
  }
  return p;
}

export function aracPrimleri(arac: SahneArac, t: number): Prim[] {
  const { x, y } = konumHesapla(arac.kareler, t);
  const a = aciHesapla(arac.kareler, t);
  return aracPrimleriKonumdan(x, y, a, arac.renk, sinyalAcikMi(arac, t) && arac.sinyal ? arac.sinyal.taraf : null);
}

/** Verilen merkez konumu ve yönde (radyan; 0 = doğu) bir aracı çizen şekiller. `sinyal`: yanan sinyal tarafı. */
export function aracPrimleriKonumdan(
  x: number,
  y: number,
  a: number,
  renk: AracRengi,
  sinyal: "sol" | "sag" | null = null
): Prim[] {
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const don = (lx: number, ly: number): Nokta => [x + lx * cos - ly * sin, y + lx * sin + ly * cos];
  const L = ARAC_UZUNLUK / 2;
  const W = ARAC_GENISLIK / 2;

  const primler: Prim[] = [
    {
      tip: "cokgen",
      noktalar: [don(-L, -W), don(L, -W), don(L, W), don(-L, W)],
      dolgu: SAHNE_RENK.arac[renk],
      kenar: SAHNE_RENK.govdeKenar,
      kenarKalinlik: 0.35,
    },
    { tip: "cokgen", noktalar: [don(L - 3.4, -W + 0.7), don(L - 1.6, -W + 0.9), don(L - 1.6, W - 0.9), don(L - 3.4, W - 0.7)], dolgu: SAHNE_RENK.cam, opaklik: 0.85 },
    { tip: "cokgen", noktalar: [don(-L + 1, -W + 0.8), don(-L + 2.2, -W + 0.8), don(-L + 2.2, W - 0.8), don(-L + 1, W - 0.8)], dolgu: SAHNE_RENK.cam, opaklik: 0.7 },
  ];
  for (const yanal of [-1.5, 1.5]) {
    const [hx, hy] = don(L - 0.3, yanal);
    primler.push({ tip: "daire", cx: hx, cy: hy, r: 0.55, dolgu: "#FEF9C3" });
    const [tx, ty] = don(-L + 0.3, yanal);
    primler.push({ tip: "daire", cx: tx, cy: ty, r: 0.45, dolgu: "#7F1D1D" });
  }

  if (sinyal) {
    const yan = sinyal === "sol" ? -W : W;
    for (const lx of [L - 0.7, -L + 0.7]) {
      const [sx, sy] = don(lx, yan);
      primler.push({ tip: "daire", cx: sx, cy: sy, r: 0.85, dolgu: SAHNE_RENK.sinyal });
    }
  }
  return primler;
}

export function yayaPrimleri(yaya: SahneYaya, t: number): Prim[] {
  const { x, y } = konumHesapla(yaya.kareler, t);
  return [
    {
      tip: "daire",
      cx: x,
      cy: y,
      r: yaya.cocuk ? COCUK_YARICAP : YAYA_YARICAP,
      dolgu: yaya.cocuk ? SAHNE_RENK.cocuk : SAHNE_RENK.yaya,
      kenar: "#475569",
      kenarKalinlik: 0.3,
    },
  ];
}

function gorunur(p: SahnePrim, t: number): boolean {
  return !p.zaman || (t >= p.zaman[0] && t <= p.zaman[1]);
}

/** t anındaki tüm çizilecek şekiller (alttan üste sıralı) */
export function sahneKaresi(sahne: Sahne, t: number): Prim[] {
  const t01 = Math.min(1, Math.max(0, t));
  return [
    ...zeminPrimleri(sahne.zemin),
    ...(sahne.altEkler ?? []).filter((p) => gorunur(p, t01)),
    ...sahne.araclar.flatMap((a) => aracPrimleri(a, t01)),
    ...(sahne.yayalar ?? []).flatMap((y) => yayaPrimleri(y, t01)),
    ...(sahne.ustEkler ?? []).filter((p) => gorunur(p, t01)),
  ];
}

// ---- Doğrulama yardımcıları (testler ve PNG önizleme için) ----

/** Araç gövdesini uzunluğu boyunca 3 daireyle yaklaşık temsil eder */
export function aracDaireleri(arac: SahneArac, t: number): Array<{ x: number; y: number; r: number }> {
  const { x, y } = konumHesapla(arac.kareler, t);
  const a = aciHesapla(arac.kareler, t);
  return [-3, 0, 3].map((d) => ({ x: x + d * Math.cos(a), y: y + d * Math.sin(a), r: ARAC_GENISLIK / 2 }));
}

export function enYakinMesafe(a: Array<{ x: number; y: number; r: number }>, b: Array<{ x: number; y: number; r: number }>): number {
  let en = Infinity;
  for (const p of a) for (const q of b) en = Math.min(en, Math.hypot(p.x - q.x, p.y - q.y) - p.r - q.r);
  return en;
}

function kacis(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Şekilleri SVG metnine çevirir (Node'da PNG üretmek için) */
export function svgMetni(primler: Prim[], olcek = 3): string {
  const ac = (v: number | undefined) => (v === undefined ? "" : ` opacity="${v}"`);
  const govde = primler
    .map((p) => {
      switch (p.tip) {
        case "rect":
          return `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="${p.dolgu}"${p.kenar ? ` stroke="${p.kenar}" stroke-width="${p.kenarKalinlik ?? 0.3}"` : ""}${ac(p.opaklik)}/>`;
        case "cizgi":
          return `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${p.renk}" stroke-width="${p.kalinlik}"${p.kesik ? ` stroke-dasharray="${p.kesik}"` : ""}${ac(p.opaklik)}/>`;
        case "daire":
          return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.dolgu ?? "none"}"${p.kenar ? ` stroke="${p.kenar}" stroke-width="${p.kenarKalinlik ?? 0.3}"` : ""}${ac(p.opaklik)}/>`;
        case "cokgen":
          return `<polygon points="${p.noktalar.map((n) => `${n[0].toFixed(2)},${n[1].toFixed(2)}`).join(" ")}" fill="${p.dolgu}"${p.kenar ? ` stroke="${p.kenar}" stroke-width="${p.kenarKalinlik ?? 0.3}"` : ""}${ac(p.opaklik)}/>`;
        case "metin":
          return `<text x="${p.x}" y="${p.y}" font-size="${p.boyut}" fill="${p.renk}" text-anchor="${p.hizala ?? "start"}" font-family="Arial, sans-serif"${p.kalin ? ' font-weight="bold"' : ""}>${kacis(p.s)}</text>`;
      }
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SAHNE_GENISLIK} ${SAHNE_YUKSEKLIK}" width="${SAHNE_GENISLIK * olcek}" height="${SAHNE_YUKSEKLIK * olcek}">${govde}</svg>`;
}
