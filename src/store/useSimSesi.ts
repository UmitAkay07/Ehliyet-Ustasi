import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { simSes } from "@/services/simSes";

/** Simülasyon sesi ayarı (kalıcı). Ekran kapanınca döngü sesleri susar. */
export function useSimSesi(): { sesAcik: boolean; sesDegistir: () => void } {
  const sesAcik = useAppStore((s) => s.settings.simulasyonSesi);
  const setSimulasyonSesi = useAppStore((s) => s.setSimulasyonSesi);

  useEffect(() => {
    simSes.ayarla(sesAcik);
  }, [sesAcik]);

  useEffect(() => () => simSes.sustur(), []);

  return { sesAcik, sesDegistir: () => setSimulasyonSesi(!sesAcik) };
}
