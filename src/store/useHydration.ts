import { useEffect, useState } from "react";
import { depoKurtarildi, depoKurtarildiginda, useAppStore } from "./useAppStore";

/**
 * Kayıtlı veri yüklendi mi. Kayıt okunamadıysa ve uygulama varsayılanlarla açılmaya karar verdiyse
 * (depoKurtarildi) de true olur; yoksa açılış ekranında sonsuza dek kalınırdı.
 */
export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(
    () => useAppStore.persist.hasHydrated() || depoKurtarildi()
  );

  useEffect(() => {
    const unsubFinish = useAppStore.persist.onFinishHydration(() => setHydrated(true));
    const unsubKurtarma = depoKurtarildiginda(() => setHydrated(true));
    setHydrated(useAppStore.persist.hasHydrated() || depoKurtarildi());
    return () => {
      unsubFinish();
      unsubKurtarma();
    };
  }, []);

  return hydrated;
}
