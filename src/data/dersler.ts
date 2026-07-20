import type { Ders } from "@/types";
import { dersColors } from "@/theme/colors";

export const DERSLER: Ders[] = [
  {
    id: "trafik",
    ad: "Trafik ve Çevre Bilgisi",
    kisaAd: "Trafik",
    aciklama:
      "Trafik işaretleri, geçiş kuralları, hız, sollama ve park kuralları. Sınavın en ağırlıklı bölümü.",
    renk: dersColors.trafik,
    ikon: "car-sport",
    sinavSoruSayisi: 23,
  },
  {
    id: "ilkyardim",
    ad: "İlk Yardım Bilgisi",
    kisaAd: "İlk Yardım",
    aciklama:
      "Kaza anında hayat kurtaran temel müdahaleler: TYD, kanama, şok, kırık ve yaralı taşıma.",
    renk: dersColors.ilkyardim,
    ikon: "medkit",
    sinavSoruSayisi: 12,
  },
  {
    id: "motor",
    ad: "Araç Tekniği (Motor)",
    kisaAd: "Motor",
    aciklama:
      "Motorun çalışması, fren, aktarma, elektrik sistemi, lastik bakımı ve gösterge uyarıları.",
    renk: dersColors.motor,
    ikon: "construct",
    sinavSoruSayisi: 9,
  },
  {
    id: "adab",
    ad: "Trafik Adabı",
    kisaAd: "Trafik Adabı",
    aciklama:
      "Trafikte sorumluluk, sabır, öfke yönetimi, güvenli takip mesafesi ve doğru sürücü davranışları.",
    renk: dersColors.adab,
    ikon: "people",
    sinavSoruSayisi: 6,
  },
];

export function dersBul(id: string): Ders | undefined {
  return DERSLER.find((d) => d.id === id);
}
