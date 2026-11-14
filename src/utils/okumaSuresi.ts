/**
 * Sesli anlatım için süre tahmini (saf, testli: scripts/test-okuma-suresi.mjs).
 *
 * Türkçe seslendirme 1.0 hızında saniyede yaklaşık 14 harf okur. Bu üst sınır bilerek cömerttir:
 * normal bir anlatımı asla kesmemeli, yalnızca seslendirme motoru hiç cevap vermediğinde
 * (ses verisi eksik ya da motor takıldığında) sınavın sonsuza dek beklemesini önlemeli.
 */
export const OKUMA_PAYI_MS = 4000;
export const HARF_BASINA_MS = 110;
/** Türkçe seslendirmenin 1.0 hızında saniyede okuduğu ortalama harf */
export const ORTALAMA_HARF_SN = 14;

const hizSinirla = (hiz: number) => Math.min(2, Math.max(0.5, hiz));

/** Bu sürede okuma bitmediyse bitmiş sayılır (ms). hiz: seslendirme hızı (1 = normal). */
export function enGecOkumaBitisMs(metin: string, hiz = 1): number {
  return Math.round(OKUMA_PAYI_MS + (metin.trim().length * HARF_BASINA_MS) / hizSinirla(hiz));
}

/**
 * Metnin normalde okunma süresi (ms). Seslendirme yarıda hata verirse (ör. internet sesi zayıf ağda
 * zaman aşımına uğradı ama ses çalmaya devam ediyor) bu süre dolmadan sonraki komuta geçilmez;
 * hiç ses çıkmadıysa kullanıcı aynı sürede ekrandaki metni okur.
 */
export function tahminiOkumaMs(metin: string, hiz = 1): number {
  return Math.round((metin.trim().length * 1000) / (ORTALAMA_HARF_SN * hizSinirla(hiz)));
}
