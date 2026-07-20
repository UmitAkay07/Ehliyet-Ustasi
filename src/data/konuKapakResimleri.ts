import { ImageSourcePropType } from "react-native";

/** Konu kapak fotoğrafları (AI üretilmiş eğitim görselleri) */
export const KONU_KAPAK_RESIMLERI: Record<string, ImageSourcePropType> = {
  // Trafik
  "trafik-isaretleri": require("../../assets/lesson-signs.png"),
  "isikli-isaretler": require("../../assets/lesson-lights.png"),
  "hiz-kurallari": require("../../assets/lesson-distance.png"),
  "duraklama-park": require("../../assets/lesson-parallel.png"),
  "aydinlatma-sinyal": require("../../assets/lesson-lights.png"),
  "cevre-guvenlik": require("../../assets/lesson-courtesy.png"),
  "sollama": require("../../assets/lesson-distance.png"),
  "gecis-ustunlugu": require("../../assets/lesson-lights.png"),
  "yaya-gecit": require("../../assets/lesson-courtesy.png"),
  "trafik-kavramlar": require("../../assets/lesson-signs.png"),
  "yer-isaretlemeleri": require("../../assets/lesson-signs.png"),
  "belgeler-cezalar": require("../../assets/lesson-signs.png"),

  // İlk yardım
  "iy-tyd": require("../../assets/lesson-cpr.png"),
  "iy-tikanma": require("../../assets/lesson-heimlich.png"),
  "iy-kanama-sok": require("../../assets/lesson-shock.png"),
  "iy-kirik-yanik": require("../../assets/lesson-burn.png"),
  "iy-bilinc-tasima": require("../../assets/lesson-shock.png"),
  "iy-olay-yeri": require("../../assets/lesson-cpr.png"),
  "iy-temel-kavramlar": require("../../assets/lesson-cpr.png"),

  // Motor
  "mt-motor-calisma": require("../../assets/lesson-engine.png"),
  "mt-fren": require("../../assets/lesson-abs.png"),
  "mt-gosterge-guvenlik": require("../../assets/lesson-dashboard.png"),
  "mt-yaglama-sogutma": require("../../assets/lesson-dashboard.png"),
  "mt-lastik-bakim": require("../../assets/lesson-abs.png"),
  "mt-elektrik-aku": require("../../assets/lesson-dashboard.png"),
  "mt-aktarma": require("../../assets/lesson-engine.png"),
  "mt-yakit-atesleme": require("../../assets/lesson-engine.png"),

  // Trafik adabı
  "ad-temel-degerler": require("../../assets/lesson-courtesy.png"),
  "ad-takip-mesafesi": require("../../assets/lesson-distance.png"),
  "ad-ofke-stres": require("../../assets/lesson-courtesy.png"),
  "ad-alkol-yorgunluk": require("../../assets/lesson-courtesy.png"),
  "ad-kaza-davranis": require("../../assets/lesson-cpr.png"),
};
