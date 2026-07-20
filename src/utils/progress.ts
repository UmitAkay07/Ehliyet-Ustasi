import type { DersId } from "@/types";
import { KONULAR, konularByDers } from "@/data/konular";
import { SORULAR, sorularByDers, sorularByKonu } from "@/data/sorular";
import type { CozulenSoru } from "@/store/useAppStore";

export interface DersIlerleme {
  dersId: DersId;
  toplamKonu: number;
  okunanKonu: number;
  toplamSoru: number;
  cozulenSoru: number;
  dogruSoru: number;
  konuOrani: number; // 0..1
  soruOrani: number; // 0..1 (çözülen / toplam)
  basariOrani: number; // 0..1 (doğru / çözülen)
}

export function dersIlerlemesi(
  dersId: DersId,
  okunanKonular: Record<string, number>,
  cozulenSorular: Record<string, CozulenSoru>
): DersIlerleme {
  const konular = konularByDers(dersId);
  const sorular = sorularByDers(dersId);
  const okunanKonu = konular.filter((k) => okunanKonular[k.id]).length;
  const cozulen = sorular.filter((s) => cozulenSorular[s.id]);
  const dogru = cozulen.filter((s) => cozulenSorular[s.id]?.dogru).length;

  return {
    dersId,
    toplamKonu: konular.length,
    okunanKonu,
    toplamSoru: sorular.length,
    cozulenSoru: cozulen.length,
    dogruSoru: dogru,
    konuOrani: konular.length ? okunanKonu / konular.length : 0,
    soruOrani: sorular.length ? cozulen.length / sorular.length : 0,
    basariOrani: cozulen.length ? dogru / cozulen.length : 0,
  };
}

export function konuOkunduMu(konuId: string, okunanKonular: Record<string, number>): boolean {
  return Boolean(okunanKonular[konuId]);
}

export interface KonuIstatistik {
  toplamSoru: number;
  cozulen: number;
  dogru: number;
}

export function konuIstatistigi(
  konuId: string,
  cozulenSorular: Record<string, CozulenSoru>
): KonuIstatistik {
  const sorular = sorularByKonu(konuId);
  const cozulen = sorular.filter((s) => cozulenSorular[s.id]);
  const dogru = cozulen.filter((s) => cozulenSorular[s.id]?.dogru).length;
  return { toplamSoru: sorular.length, cozulen: cozulen.length, dogru };
}

export interface GenelIlerleme {
  toplamKonu: number;
  okunanKonu: number;
  toplamSoru: number;
  cozulenSoru: number;
  dogruSoru: number;
  hazirlikOrani: number; // 0..1 genel hazırlık skoru
  basariOrani: number;
}

export function genelIlerleme(
  okunanKonular: Record<string, number>,
  cozulenSorular: Record<string, CozulenSoru>
): GenelIlerleme {
  const toplamKonu = KONULAR.length;
  const okunanKonu = KONULAR.filter((k) => okunanKonular[k.id]).length;
  const toplamSoru = SORULAR.length;
  const cozulenList = SORULAR.filter((s) => cozulenSorular[s.id]);
  const dogru = cozulenList.filter((s) => cozulenSorular[s.id]?.dogru).length;

  const konuOrani = toplamKonu ? okunanKonu / toplamKonu : 0;
  const soruOrani = toplamSoru ? cozulenList.length / toplamSoru : 0;
  // Hazırlık: konu okuma %40 + soru çözme %30 + başarı %30
  const basari = cozulenList.length ? dogru / cozulenList.length : 0;
  const hazirlik = konuOrani * 0.4 + soruOrani * 0.3 + basari * 0.3;

  return {
    toplamKonu,
    okunanKonu,
    toplamSoru,
    cozulenSoru: cozulenList.length,
    dogruSoru: dogru,
    hazirlikOrani: hazirlik,
    basariOrani: basari,
  };
}
