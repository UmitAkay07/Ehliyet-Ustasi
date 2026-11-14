import { useCallback, useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "expo-router";
import { useAppStore } from "@/store/useAppStore";
import { SORULAR } from "@/data/sorular";
import { kalanGunHesapla, tekrarDurumu } from "@/utils/tekrar";
import type { TekrarDurumu } from "@/utils/tekrar";

// Her hesaplamada 595 elemanlı listede arama yapmamak için geçerli soru kimlikleri bir kez çıkarılır
const GECERLI_SORU_KIMLIKLERI = new Set(SORULAR.map((s) => s.id));
const soruVarMi = (soruId: string) => GECERLI_SORU_KIMLIKLERI.has(soruId);

/** Dakikaya yuvarlar: aynı dakika içindeki odaklanmalar gereksiz yeniden çizim yaratmaz */
const dakikayaYuvarla = (zaman: number) => Math.floor(zaman / 60000) * 60000;

export type TekrarDurumuSonucu = TekrarDurumu & {
  /** Hesabın yapıldığı an; ekranda "yarın / 3 gün sonra" gibi metinler bununla üretilmeli */
  simdi: number;
};

/**
 * Bugün tekrar edilecek soruları verir.
 * "Bugün" bilgisi, uygulama arka plandan dönünce ve ekran odaklanınca yenilenir;
 * böylece gece yarısından sonra açılan ekranda eski sayı kalmaz.
 * (Ekran ön planda açık kalırsa sayı kendiliğinden güncellenmez.)
 */
export function useTekrarDurumu(): TekrarDurumuSonucu {
  const tekrar = useAppStore((s) => s.tekrar);
  const hatalar = useAppStore((s) => s.hatalar);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const [simdi, setSimdi] = useState(() => dakikayaYuvarla(Date.now()));

  useEffect(() => {
    const abone = AppState.addEventListener("change", (durum) => {
      if (durum === "active") setSimdi(dakikayaYuvarla(Date.now()));
    });
    return () => abone.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSimdi(dakikayaYuvarla(Date.now()));
    }, [])
  );

  return useMemo(
    () => ({
      ...tekrarDurumu(tekrar, hatalar, simdi, kalanGunHesapla(sinavTarihi, simdi), soruVarMi),
      simdi,
    }),
    [tekrar, hatalar, sinavTarihi, simdi]
  );
}
