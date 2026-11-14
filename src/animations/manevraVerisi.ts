/**
 * Manevra anahtar karelerinden türetilen sürüş verisi (saf mantık; çalışma zamanında hiçbir şey import etmez).
 * Her kare için: geri vites, ön tekerlek açısı (derece), göreli hız (0..1) ve aracın izleyeceği rota.
 */

export interface SurusKaresi {
  x: number;
  y: number;
  /** Derece, 0 = burun yukarı, saat yönünde artar */
  a: number;
}

export interface SurusVerisi {
  /** 1: geri gidiyor (dururken son hareket korunur) */
  geri: number[];
  /** Ön tekerlek açısı (derece; + sağa) */
  teker: number[];
  /** 0..1 göreli hız */
  hiz: number[];
}

/** Ön ve arka aks arası (araba çiziminde 38,5 - 12 birim) */
export const AKS_ARASI = 26.5;
export const MAX_TEKER_DERECE = 34;
/** Bir kare adımında bu kadar yol "tam hız" sayılır */
export const TAM_HIZ_ADIMI = 7;
const DURGUN = 0.05;

function aciFarki(a: number, b: number): number {
  let d = b - a;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

export function surusVerisi(kareler: ReadonlyArray<SurusKaresi>): SurusVerisi {
  const n = kareler.length;
  const geri: number[] = new Array(n).fill(0);
  const ham: number[] = new Array(n).fill(0);
  const hiz: number[] = new Array(n).fill(0);
  const hareketli: boolean[] = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    const j = i < n - 1 ? i + 1 : i;
    const k = i < n - 1 ? i : i - 1;
    if (k < 0) break;
    const dx = kareler[j].x - kareler[k].x;
    const dy = kareler[j].y - kareler[k].y;
    const yol = Math.hypot(dx, dy);
    hiz[i] = Math.min(1, yol / TAM_HIZ_ADIMI);
    if (yol < DURGUN) {
      geri[i] = i > 0 ? geri[i - 1] : 0;
      ham[i] = i > 0 ? ham[i - 1] : 0;
      continue;
    }
    hareketli[i] = true;
    const aci = (kareler[k].a * Math.PI) / 180;
    const ileriMi = Math.sin(aci) * dx - Math.cos(aci) * dy >= 0;
    geri[i] = ileriMi ? 0 : 1;
    const egrilik = (aciFarki(kareler[k].a, kareler[j].a) * Math.PI) / 180 / yol;
    const delta = Math.atan(AKS_ARASI * egrilik * (ileriMi ? 1 : -1));
    ham[i] = Math.max(-MAX_TEKER_DERECE, Math.min(MAX_TEKER_DERECE, (delta * 180) / Math.PI));
  }

  // Direksiyon ani sıçramasın: hareketli karelerde 5'li kayan ortalama
  const teker = ham.map((v, i) => {
    if (!hareketli[i]) return v;
    let toplam = 0;
    let adet = 0;
    for (let d = -2; d <= 2; d++) {
      const m = i + d;
      if (m >= 0 && m < n && hareketli[m]) {
        toplam += ham[m];
        adet++;
      }
    }
    return adet ? toplam / adet : v;
  });
  for (let i = 1; i < n; i++) if (!hareketli[i]) teker[i] = teker[i - 1];

  return { geri, teker, hiz };
}

/** Arabanın sahnede tamamen göründüğü ilk kare (kapak görüntüsü için); hiç yoksa 0 */
export function ilkGorunurKare(
  kareler: ReadonlyArray<SurusKaresi>,
  genislik: number,
  yukseklik: number,
  yariGenislik = 14,
  yariUzunluk = 25
): number {
  const i = kareler.findIndex(
    (k) => k.x >= yariGenislik && k.x <= genislik - yariGenislik && k.y >= yariUzunluk && k.y <= yukseklik - yariUzunluk
  );
  return i < 0 ? 0 : i;
}

/** Rota çizgisi için yinelenen noktaları atar ve sahne dışına taşan uçları kırpar */
export function rotaNoktalari(
  kareler: ReadonlyArray<SurusKaresi>,
  genislik: number,
  yukseklik: number
): Array<[number, number]> {
  const sonuc: Array<[number, number]> = [];
  for (const k of kareler) {
    const x = Math.max(-4, Math.min(genislik + 4, k.x));
    const y = Math.max(-4, Math.min(yukseklik + 4, k.y));
    const son = sonuc[sonuc.length - 1];
    if (!son || Math.hypot(son[0] - x, son[1] - y) > 0.5) sonuc.push([x, y]);
  }
  return sonuc;
}
