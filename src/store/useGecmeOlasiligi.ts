import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { KONULAR } from "@/data/konular";
import { dersIlerlemesi, konuIstatistigi } from "@/utils/progress";
import { gecmeOlasiligiHesapla, zayifKonular } from "@/utils/gecmeOlasiligi";
import type { GecmeSonucu, ZayifKonu } from "@/utils/gecmeOlasiligi";

export interface GecmeAnalizi {
  sonuc: GecmeSonucu;
  /** Önce çalışılması gereken konular (en fazla 5) */
  zayif: ZayifKonu[];
}

/** Çözülen sorulardan tahmini geçme olasılığı ve zayıf konular. Yalnızca `cozulenSorular` değişince yeniden hesaplanır. */
export function useGecmeAnalizi(): GecmeAnalizi {
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);

  return useMemo(() => {
    const dersGirdileri = DERSLER.map((d) => {
      const i = dersIlerlemesi(d.id, {}, cozulenSorular);
      return {
        dersId: d.id,
        toplamSoru: i.toplamSoru,
        cozulen: i.cozulenSoru,
        dogru: i.dogruSoru,
        sinavSoruSayisi: d.sinavSoruSayisi,
      };
    });

    const konuGirdileri = KONULAR.map((k) => {
      const s = konuIstatistigi(k.id, cozulenSorular);
      return {
        konuId: k.id,
        dersId: k.dersId,
        baslik: k.baslik,
        toplamSoru: s.toplamSoru,
        cozulen: s.cozulen,
        dogru: s.dogru,
      };
    });

    return {
      sonuc: gecmeOlasiligiHesapla(dersGirdileri),
      zayif: zayifKonular(konuGirdileri, 5),
    };
  }, [cozulenSorular]);
}
