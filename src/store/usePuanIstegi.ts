import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { useAppStore } from "@/store/useAppStore";

/** Sonuç ekranı önce görünsün, istek ardından açılsın */
const GECIKME_MS = 1200;
/** 1.0.x sürümlerindeki puan isteğinin (yalnızca prova geçilince, Google'ın penceresi) kaydı; görmüş olana yenisi gösterilmez */
const ESKI_ISTEK_ANAHTARI = "ehliyet-ustasi-puan-istegi-v1";

async function eskiIstekGosterildiMi(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ESKI_ISTEK_ANAHTARI)) !== null;
  } catch {
    return false;
  }
}

interface PuanPenceresi {
  acik: boolean;
  kapat: () => void;
}

/** Puan isteği penceresinin açık olup olmadığı (kalıcı değil) */
export const usePuanPenceresi = create<PuanPenceresi>()((set) => ({
  acik: false,
  kapat: () => set({ acik: false }),
}));

/**
 * `tamamlandi` true olunca (test bitti, simülasyon bitti) puan isteğini hayatta bir kez açar.
 * Açıldığı anda gösterildi olarak işaretlenir: kullanıcı puan verse de, kapatsa da bir daha sorulmaz.
 * Kullanıcı gecikme dolmadan ekrandan çıkarsa açılmaz; bir sonraki tamamlamada açılır.
 */
export function usePuanIstegiTetikle(tamamlandi: boolean): void {
  useEffect(() => {
    if (!tamamlandi || useAppStore.getState().puanIstegiGosterildi) return;
    let iptal = false;
    const zamanlayici = setTimeout(async () => {
      const eskisiGosterildi = await eskiIstekGosterildiMi();
      const magaza = useAppStore.getState();
      if (iptal || magaza.puanIstegiGosterildi) return;
      magaza.puanIstegiGosterildiIsaretle();
      if (!eskisiGosterildi) usePuanPenceresi.setState({ acik: true });
    }, GECIKME_MS);
    return () => {
      iptal = true;
      clearTimeout(zamanlayici);
    };
  }, [tamamlandi]);
}
