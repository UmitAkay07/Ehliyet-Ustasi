/**
 * Prova sınavı analizi — saf mantık, hiçbir import yok.
 * - konuKaybiHesapla: sınav sonunda hangi konulardan kaç puan kaybedildi
 * - provaOzetiHesapla: sınav sırasında cevaplanan / boş / işaretli sorular (bitirmeden önceki özet ekranı için)
 */

export interface AnalizSorusu {
  konuId: string;
  dersId: string;
  dogruIndex: number;
}

export interface KonuKaybi {
  konuId: string;
  dersId: string;
  /** Sınavdaki bu konudan soru sayısı */
  toplam: number;
  dogru: number;
  yanlis: number;
  bos: number;
  /** Bu konudan kaybedilen puan: (yanlış + boş) × soru puanı */
  kayipPuan: number;
}

/** Bir soru 2 puandır (50 soru = 100 puan). */
export const SORU_PUANI = 2;

/**
 * Sınavda puan kaybedilen konuları, en çok kaybedilenden başlayarak döndürür.
 * Hiç puan kaybedilmeyen konular listeye girmez. `cevaplar` kısa kalırsa eksik cevaplar boş sayılır.
 */
export function konuKaybiHesapla(
  sorular: AnalizSorusu[],
  cevaplar: Array<number | null | undefined>,
  soruPuani: number = SORU_PUANI
): KonuKaybi[] {
  const harita = new Map<string, KonuKaybi>();
  sorular.forEach((soru, i) => {
    let k = harita.get(soru.konuId);
    if (!k) {
      k = { konuId: soru.konuId, dersId: soru.dersId, toplam: 0, dogru: 0, yanlis: 0, bos: 0, kayipPuan: 0 };
      harita.set(soru.konuId, k);
    }
    k.toplam += 1;
    const cevap = cevaplar[i];
    if (cevap === null || cevap === undefined) k.bos += 1;
    else if (cevap === soru.dogruIndex) k.dogru += 1;
    else k.yanlis += 1;
  });
  const liste = [...harita.values()];
  for (const k of liste) k.kayipPuan = (k.yanlis + k.bos) * soruPuani;
  return liste
    .filter((k) => k.kayipPuan > 0)
    .sort((a, b) => b.kayipPuan - a.kayipPuan || b.yanlis - a.yanlis || a.konuId.localeCompare(b.konuId));
}

export interface ProvaOzeti {
  cevaplanan: number;
  bos: number;
  isaretli: number;
  /** Cevaplanmamış soruların indeksleri (0'dan) */
  bosIndeksler: number[];
  /** İşaretli soruların indeksleri (0'dan) */
  isaretliIndeksler: number[];
}

export function provaOzetiHesapla(cevaplar: Array<number | null>, isaretli: boolean[]): ProvaOzeti {
  const bosIndeksler: number[] = [];
  const isaretliIndeksler: number[] = [];
  cevaplar.forEach((c, i) => {
    if (c === null || c === undefined) bosIndeksler.push(i);
    if (isaretli[i]) isaretliIndeksler.push(i);
  });
  return {
    cevaplanan: cevaplar.length - bosIndeksler.length,
    bos: bosIndeksler.length,
    isaretli: isaretliIndeksler.length,
    bosIndeksler,
    isaretliIndeksler,
  };
}

/** Bir sonraki "dikkat edilecek" (boş ya da işaretli) sorunun indeksi; yoksa null. Sona gelince başa sarar. */
export function sonrakiDikkatIndeksi(ozet: ProvaOzeti, simdiki: number): number | null {
  const adaylar = [...new Set([...ozet.bosIndeksler, ...ozet.isaretliIndeksler])].sort((a, b) => a - b);
  if (adaylar.length === 0) return null;
  return adaylar.find((i) => i > simdiki) ?? adaylar[0];
}
