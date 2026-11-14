import type { Soru } from "@/types";

export interface ProvaDetay {
  sorular: Soru[];
  cevaplar: (number | null)[];
  dogru: number;
  yanlis: number;
  bos: number;
  puan: number;
  gecti: boolean;
  sureSaniye: number;
}

import { useAppStore } from "@/store/useAppStore";

export function provaDetayKaydet(detay: ProvaDetay) {
  useAppStore.getState().setSonProvaDetayi(detay);
}

export function provaDetayAl(): ProvaDetay | null {
  const detay: unknown = useAppStore.getState().sonProvaDetayi;
  // Eski ya da bozuk kayıtta sonuç ekranı çökmesin: beklenen biçimde değilse yok sayılır
  if (!detay || typeof detay !== "object") return null;
  const { sorular, cevaplar } = detay as Partial<ProvaDetay>;
  if (!Array.isArray(sorular) || !Array.isArray(cevaplar)) return null;
  return detay as ProvaDetay;
}
