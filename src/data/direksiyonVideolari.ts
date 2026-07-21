import { VideoSource } from "expo-video";

/**
 * Direksiyon dersi videoları.
 * AI ile üretilen MP4 dosyalarını assets/videos/direksiyon/ altına koyun.
 * Dosya adları scripts/direksiyon-video-spec.json ile eşleşmeli.
 *
 * Video yoksa uygulama otomatik olarak ManevraAnimasyonu gösterir.
 */
export const DIREKSIYON_VIDEO_KAYNAKLARI: Partial<Record<string, VideoSource>> = {
  "dr-temel-kumanda": require("../../assets/videos/direksiyon/dr-temel-kumanda.mp4"),
  "dr-l-park": require("../../assets/videos/direksiyon/dr-l-park.mp4"),
  // "dr-rampa-kalkis": require("../../assets/videos/direksiyon/dr-rampa-kalkis.mp4"),
  // "dr-u-donusu": require("../../assets/videos/direksiyon/dr-u-donusu.mp4"),
  // "dr-ani-fren": require("../../assets/videos/direksiyon/dr-ani-fren.mp4"),
  // "dr-sinyal-ayna": require("../../assets/videos/direksiyon/dr-sinyal-ayna.mp4"),
  // "dr-geri-manevra": require("../../assets/videos/direksiyon/dr-geri-manevra.mp4"),
};

export function direksiyonVideosuVar(dersId: string): boolean {
  return dersId in DIREKSIYON_VIDEO_KAYNAKLARI;
}

export function direksiyonVideoKaynagi(dersId: string): VideoSource | undefined {
  return DIREKSIYON_VIDEO_KAYNAKLARI[dersId];
}
