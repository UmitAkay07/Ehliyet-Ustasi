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
  return useAppStore.getState().sonProvaDetayi;
}
