import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

/**
 * Simülasyon oynarken telefonun ekranı kararmasın.
 * Yalnızca `aktif` iken ve sayfa ekrandayken açık tutulur; duraklatınca, bitince ya da sayfadan
 * çıkınca telefon yine kendi süresinde uyur (pil boşa gitmez).
 */
export function useEkranUyanik(aktif: boolean, etiket: string): void {
  useFocusEffect(
    useCallback(() => {
      if (!aktif) return;
      activateKeepAwakeAsync(etiket).catch((e) => console.warn("[ekran] açık tutulamadı:", String(e)));
      return () => {
        deactivateKeepAwake(etiket).catch(() => {});
      };
    }, [aktif, etiket])
  );
}
