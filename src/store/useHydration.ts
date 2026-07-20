import { useEffect, useState } from "react";
import { useAppStore } from "./useAppStore";

export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(
    useAppStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubFinish = useAppStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    setHydrated(useAppStore.persist.hasHydrated());
    return () => {
      unsubFinish();
    };
  }, []);

  return hydrated;
}
