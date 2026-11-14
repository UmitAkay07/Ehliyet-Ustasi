import { AppState } from "react-native";
import type { AudioPlayer } from "expo-audio";

type DonguSesi = "sinyal" | "geri";
export type SimEfekti = "lastik" | "vites" | "carpma" | "basari" | "hata" | "duyuru";
type SesAdi = DonguSesi | SimEfekti;

const KAYNAKLAR: Record<SesAdi, number> = {
  sinyal: require("../../assets/sesler/sinyal.wav"),
  geri: require("../../assets/sesler/geri.wav"),
  lastik: require("../../assets/sesler/lastik.wav"),
  vites: require("../../assets/sesler/vites.wav"),
  carpma: require("../../assets/sesler/carpma.wav"),
  basari: require("../../assets/sesler/basari.wav"),
  hata: require("../../assets/sesler/hata.wav"),
  duyuru: require("../../assets/sesler/duyuru.wav"),
};

const SEVIYE: Record<SesAdi, number> = {
  sinyal: 0.55,
  geri: 0.32,
  lastik: 0.55,
  vites: 0.5,
  carpma: 0.7,
  basari: 0.6,
  hata: 0.5,
  duyuru: 0.7,
};

type AudioModulu = typeof import("expo-audio");
let modulDurumu: AudioModulu | null | undefined;

/** Ses modülü olmayan eski bir derlemede ses çalınmaz ama uygulama çökmez */
function audio(): AudioModulu | null {
  if (modulDurumu !== undefined) return modulDurumu;
  try {
    modulDurumu = require("expo-audio") as AudioModulu;
    modulDurumu
      .setAudioModeAsync({ playsInSilentMode: false, interruptionMode: "mixWithOthers", shouldPlayInBackground: false })
      .catch(() => {});
    AppState.addEventListener("change", (durum) => {
      if (durum !== "active") simSes.sustur();
    });
  } catch (e) {
    console.warn("[simSes] ses modülü yüklenemedi:", String(e));
    modulDurumu = null;
  }
  return modulDurumu;
}

const oynaticilar = new Map<SesAdi, AudioPlayer>();

function oynatici(ad: SesAdi): AudioPlayer | null {
  const mevcut = oynaticilar.get(ad);
  if (mevcut) return mevcut;
  const modul = audio();
  if (!modul) return null;
  try {
    const p = modul.createAudioPlayer(KAYNAKLAR[ad]);
    p.loop = ad === "sinyal" || ad === "geri";
    p.volume = SEVIYE[ad];
    oynaticilar.set(ad, p);
    return p;
  } catch (e) {
    console.warn(`[simSes] ${ad} oynatıcısı oluşturulamadı:`, String(e));
    return null;
  }
}

let acik = true;
const calisiyor: Record<DonguSesi, boolean> = { sinyal: false, geri: false };

function donguAyarla(ad: DonguSesi, calis: boolean): void {
  if (calisiyor[ad] === calis) return;
  calisiyor[ad] = calis;
  const p = oynatici(ad);
  if (!p) return;
  try {
    if (calis) {
      p.seekTo(0).catch(() => {});
      p.play();
    } else {
      p.pause();
    }
  } catch {
    // ses çalınamadı; simülasyon sessiz devam eder
  }
}

/**
 * Simülasyon ses efektleri. Tüm çağrılar güvenlidir: ses kapalıysa, modül yoksa ya da bir hata olursa hiçbir şey yapmaz.
 * Döngü sesleri (sinyal rölesi, park sensörü) açık/kapalı durumla, efektler tek seferlik çalınır.
 * Motor sesi sahibin isteğiyle kaldırıldı (2026-11-12): rahatsız ediyordu.
 */
export const simSes = {
  /** Genel ses ayarı (kapanınca çalan her şey susar) */
  ayarla(sesAcik: boolean): void {
    acik = sesAcik;
    if (!sesAcik) simSes.sustur();
  },


  sinyal(calis: boolean): void {
    donguAyarla("sinyal", acik && calis);
  },

  /** Park sensörü bip'i (geri giderken) */
  geri(calis: boolean): void {
    donguAyarla("geri", acik && calis);
  },

  efekt(ad: SimEfekti): void {
    if (!acik) return;
    const p = oynatici(ad);
    if (!p) return;
    try {
      p.seekTo(0).catch(() => {});
      p.play();
    } catch {
      // efekt çalınamadı
    }
  },

  /** Döngü seslerini durdurur (ekrandan çıkarken, duraklatınca) */
  sustur(): void {
    (Object.keys(calisiyor) as DonguSesi[]).forEach((ad) => donguAyarla(ad, false));
  },
};
