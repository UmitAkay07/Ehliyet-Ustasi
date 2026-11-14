/**
 * Tahmini sınav geçme olasılığı ve zayıf konu listesi — saf mantık, hiçbir import yok.
 *
 * YÖNTEM (sezgisel, gerçek sınav sonuçlarıyla DOĞRULANMAMIŞTIR; yalnızca yönlendirici):
 * 1. Her ders için "rastgele bir sınav sorusunu doğru bilme ihtimali" (p) tahmin edilir:
 *    - Çözülmüş sorularda son cevaplara bakılır; az veride sonuç bir ön kabule (0.6) doğru çekilir.
 *    - Hiç çözülmemiş sorular için başarı, ön kabul 0.4 ile gözlenen başarı arasında yarı yarıya karıştırılır
 *      (iyi çözen biri görmediği sorularda da bir miktar iyidir).
 *    - Kapsam (çözülen / toplam) bu ikisini ağırlıklandırır.
 * 2. Sınav dağılımı (23/12/9/6 = 50 soru) üzerinde, soruların bağımsız olduğu varsayılarak
 *    toplam doğru sayısının dağılımı hesaplanır (Poisson-binom, tam hesap).
 * 3. En az 35 doğru (70 puan) gelme olasılığı döner.
 *
 * Hesap yalnızca uygulamadaki soru havuzundaki performansı yansıtır; gerçek sınav soruları farklıdır.
 */

export const SINAV_SORU_SAYISI = 50;
export const GECME_BARAJI = 35; // 70 puan, soru başına 2 puan
/** Bu kadar soru çözülmeden yüzde gösterilmez */
export const MIN_VERI = 20;

export const ONSEL_ORTALAMA = 0.6;
export const ONSEL_AGIRLIK = 4;
export const BILINMEYEN_SORU_BASARISI = 0.4;
const GENELLEME = 0.5;

export type GuvenDuzeyi = "yok" | "dusuk" | "orta" | "yuksek";

export interface DersGirdisi {
  dersId: string;
  toplamSoru: number;
  /** Çözülmüş soru sayısı */
  cozulen: number;
  /** Son cevabı doğru olan soru sayısı */
  dogru: number;
  /** Sınavda bu dersten çıkan soru sayısı */
  sinavSoruSayisi: number;
}

export interface DersTahmini {
  dersId: string;
  /** Rastgele bir sınav sorusunu doğru bilme tahmini (0..1) */
  basariTahmini: number;
  /** Çözülen / toplam (0..1) */
  kapsam: number;
  cozulen: number;
  toplamSoru: number;
}

export interface GecmeSonucu {
  /** Tahmini geçme olasılığı (0..1) */
  olasilik: number;
  /** Beklenen sınav puanı (0..100) */
  beklenenPuan: number;
  guven: GuvenDuzeyi;
  toplamCozulen: number;
  /** Yüzde gösterilmesi için yeterli veri var mı */
  yeterliVeri: boolean;
  dersler: DersTahmini[];
}

export interface KonuGirdisi {
  konuId: string;
  dersId: string;
  baslik: string;
  toplamSoru: number;
  cozulen: number;
  dogru: number;
}

export interface ZayifKonu {
  konuId: string;
  dersId: string;
  baslik: string;
  /** Küçük örneklemde ön kabule çekilmiş başarı (0..1); hiç çözülmediyse null */
  basari: number | null;
  cozulen: number;
  toplamSoru: number;
  neden: "dusuk-basari" | "hic-cozulmedi";
}

function sinirla01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  return Math.min(1, Math.max(0, x));
}

/** Küçük örneklemde ön kabule doğru çekilmiş başarı oranı */
export function cekilmisBasari(dogru: number, cozulen: number): number {
  return (dogru + ONSEL_ORTALAMA * ONSEL_AGIRLIK) / (cozulen + ONSEL_AGIRLIK);
}

export function dersBasariTahmini(d: DersGirdisi): DersTahmini {
  const sayi = (x: number) => (Number.isFinite(x) ? x : 0);
  const toplam = Math.max(0, sayi(d.toplamSoru));
  const cozulen = Math.min(Math.max(0, sayi(d.cozulen)), toplam);
  const dogru = Math.min(Math.max(0, sayi(d.dogru)), cozulen);
  const kapsam = toplam > 0 ? cozulen / toplam : 0;

  const goren = cekilmisBasari(dogru, cozulen);
  const bilinmeyen = BILINMEYEN_SORU_BASARISI + GENELLEME * (goren - BILINMEYEN_SORU_BASARISI);
  const p = sinirla01(kapsam * goren + (1 - kapsam) * bilinmeyen);

  return { dersId: d.dersId, basariTahmini: p, kapsam, cozulen, toplamSoru: toplam };
}

/** Her biri farklı başarı ihtimaline sahip bağımsız soruların toplam doğru sayısı dağılımı */
export function dogruSayisiDagilimi(gruplar: Array<{ soruSayisi: number; p: number }>): number[] {
  let dagilim: number[] = [1];
  for (const { soruSayisi, p } of gruplar) {
    const q = 1 - p;
    for (let i = 0; i < soruSayisi; i++) {
      const yeni: number[] = new Array(dagilim.length + 1).fill(0);
      for (let k = 0; k < dagilim.length; k++) {
        yeni[k] += dagilim[k] * q;
        yeni[k + 1] += dagilim[k] * p;
      }
      dagilim = yeni;
    }
  }
  return dagilim;
}

export function guvenDuzeyi(toplamCozulen: number): GuvenDuzeyi {
  if (toplamCozulen < MIN_VERI) return "yok";
  if (toplamCozulen < 60) return "dusuk";
  if (toplamCozulen < 150) return "orta";
  return "yuksek";
}

export function guvenEtiketi(guven: GuvenDuzeyi): string {
  switch (guven) {
    case "yok":
      return "Yeterli veri yok";
    case "dusuk":
      return "Düşük güven";
    case "orta":
      return "Orta güven";
    default:
      return "Yüksek güven";
  }
}

/** Ekranda gösterim: model kesinlik iddia etmez, uçlar "%99'dan fazla / %1'den az" diye yazılır */
export function yuzdeMetni(olasilik: number): string {
  const yuzde = Math.round(sinirla01(olasilik) * 100);
  if (yuzde >= 99) return ">%99";
  if (yuzde <= 1) return "<%1";
  return `%${yuzde}`;
}

export function gecmeOlasiligiHesapla(dersler: DersGirdisi[]): GecmeSonucu {
  const tahminler = dersler.map(dersBasariTahmini);
  const gruplar = dersler.map((d, i) => ({
    soruSayisi: Math.max(0, Math.round(d.sinavSoruSayisi)),
    p: tahminler[i].basariTahmini,
  }));

  const dagilim = dogruSayisiDagilimi(gruplar);
  let olasilik = 0;
  for (let k = GECME_BARAJI; k < dagilim.length; k++) olasilik += dagilim[k];

  const beklenenDogru = gruplar.reduce((t, g) => t + g.soruSayisi * g.p, 0);
  const toplamCozulen = tahminler.reduce((t, d) => t + d.cozulen, 0);
  const guven = guvenDuzeyi(toplamCozulen);

  return {
    olasilik: sinirla01(olasilik),
    beklenenPuan: Math.round(beklenenDogru * 2),
    guven,
    toplamCozulen,
    yeterliVeri: guven !== "yok",
    dersler: tahminler,
  };
}

/**
 * Önce çalışılması gereken konular:
 * 1) en az 3 soru çözülmüş ve çekilmiş başarısı %70'in altında olanlar (en düşükten),
 * 2) yer kalırsa hiç çözülmemiş konular (verilen sırayla).
 */
export function zayifKonular(konular: KonuGirdisi[], limit = 3): ZayifKonu[] {
  const dusukler: ZayifKonu[] = konular
    .filter((k) => k.toplamSoru > 0 && k.cozulen >= 3)
    .map((k) => ({
      konuId: k.konuId,
      dersId: k.dersId,
      baslik: k.baslik,
      basari: cekilmisBasari(k.dogru, k.cozulen),
      cozulen: k.cozulen,
      toplamSoru: k.toplamSoru,
      neden: "dusuk-basari" as const,
    }))
    .filter((k) => (k.basari as number) < 0.7)
    .sort((a, b) => (a.basari as number) - (b.basari as number));

  const sonuc = dusukler.slice(0, limit);
  if (sonuc.length >= limit) return sonuc;

  for (const k of konular) {
    if (sonuc.length >= limit) break;
    if (k.toplamSoru > 0 && k.cozulen === 0) {
      sonuc.push({
        konuId: k.konuId,
        dersId: k.dersId,
        baslik: k.baslik,
        basari: null,
        cozulen: 0,
        toplamSoru: k.toplamSoru,
        neden: "hic-cozulmedi",
      });
    }
  }
  return sonuc;
}
