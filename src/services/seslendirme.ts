import * as Speech from "expo-speech";

let hazirlik: Promise<void> | null = null;

/**
 * Seslendirme motorunu önceden uyandırır. Android'de motor ilk konuşma isteğinde bağlanır ve bu
 * birkaç saniye sürdüğü için anlatım geç başlıyordu. Ekran açılırken çağrılır; ikinci çağrı aynı
 * sözü döndürür.
 */
export function seslendirmeHazirla(): Promise<void> {
  if (!hazirlik) {
    hazirlik = Speech.getAvailableVoicesAsync()
      .then(() => undefined)
      .catch((e) => {
        console.warn("[seslendirme] motor hazırlanamadı:", String(e));
        hazirlik = null;
      });
  }
  return hazirlik;
}

/**
 * Türkçe metni cihazın varsayılan Türkçe sesiyle okur. Belirli bir ses seçilmez: listede görünen
 * bir ses cihazda yüklü olmayabiliyor ve o zaman motor hiç konuşmuyordu (emülatörde görüldü).
 */
export function seslendir(metin: string, secenekler: Speech.SpeechOptions = {}): void {
  Speech.speak(metin, { language: "tr", ...secenekler });
}
