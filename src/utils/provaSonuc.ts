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

let sonDetay: ProvaDetay | null = null;

export function provaDetayKaydet(detay: ProvaDetay) {
  sonDetay = detay;
}

export function provaDetayAl(): ProvaDetay | null {
  return sonDetay;
}
