import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DersId, Soru } from "@/types";

export type ThemeMode = "auto" | "light" | "dark";

export interface CozulenSoru {
  dogru: boolean;
  tarih: number;
  deneme: number;
}

export interface HataKaydi {
  soruId: string;
  dersId: DersId;
  konuId: string;
  eklenme: number;
}

export interface ProvaSonucu {
  id: string;
  tarih: number;
  dogru: number;
  yanlis: number;
  bos: number;
  puan: number;
  gecti: boolean;
  sureSaniye: number;
}

interface Settings {
  themeMode: ThemeMode;
  onboardingTamam: boolean;
  /** ISO gün (YYYY-MM-DD) veya null */
  sinavTarihi: string | null;
}

interface AppState {
  settings: Settings;
  okunanKonular: Record<string, number>; // konuId -> okunma zamanı
  cozulenSorular: Record<string, CozulenSoru>;
  hatalar: Record<string, HataKaydi>;
  provaGecmisi: ProvaSonucu[];
  gunlukAktivite: Record<string, number>; // YYYY-MM-DD -> çözülen soru sayısı
  /** Günün sorusu cevaplandı mı: YYYY-MM-DD -> soruId */
  gununSorusuCevap: Record<string, string>;

  setThemeMode: (mode: ThemeMode) => void;
  setSinavTarihi: (tarih: string | null) => void;
  gununSorusuIsaretle: (gun: string, soruId: string) => void;
  onboardingiTamamla: () => void;
  konuOkundu: (konuId: string) => void;
  soruCevapla: (soru: Soru, secilenIndex: number) => boolean;
  hataSil: (soruId: string) => void;
  provaKaydet: (sonuc: Omit<ProvaSonucu, "id" | "tarih">) => void;
  herseyiSifirla: () => void;
}

function bugunAnahtar(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

const baslangicSettings: Settings = {
  themeMode: "auto",
  onboardingTamam: false,
  sinavTarihi: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      settings: baslangicSettings,
      okunanKonular: {},
      cozulenSorular: {},
      hatalar: {},
      provaGecmisi: [],
      gunlukAktivite: {},
      gununSorusuCevap: {},

      setThemeMode: (mode) =>
        set((s) => ({ settings: { ...s.settings, themeMode: mode } })),

      setSinavTarihi: (tarih) =>
        set((s) => ({ settings: { ...s.settings, sinavTarihi: tarih } })),

      gununSorusuIsaretle: (gun, soruId) =>
        set((s) => ({
          gununSorusuCevap: { ...s.gununSorusuCevap, [gun]: soruId },
        })),

      onboardingiTamamla: () =>
        set((s) => ({ settings: { ...s.settings, onboardingTamam: true } })),

      konuOkundu: (konuId) =>
        set((s) => ({
          okunanKonular: { ...s.okunanKonular, [konuId]: Date.now() },
        })),

      soruCevapla: (soru, secilenIndex) => {
        const dogru = secilenIndex === soru.dogruIndex;
        const state = get();
        const oncekiCozum = state.cozulenSorular[soru.id];
        const gun = bugunAnahtar();

        const yeniHatalar = { ...state.hatalar };
        if (dogru) {
          delete yeniHatalar[soru.id];
        } else {
          yeniHatalar[soru.id] = {
            soruId: soru.id,
            dersId: soru.dersId,
            konuId: soru.konuId,
            eklenme: yeniHatalar[soru.id]?.eklenme ?? Date.now(),
          };
        }

        set({
          cozulenSorular: {
            ...state.cozulenSorular,
            [soru.id]: {
              dogru,
              tarih: Date.now(),
              deneme: (oncekiCozum?.deneme ?? 0) + 1,
            },
          },
          hatalar: yeniHatalar,
          gunlukAktivite: {
            ...state.gunlukAktivite,
            [gun]: (state.gunlukAktivite[gun] ?? 0) + 1,
          },
        });
        return dogru;
      },

      hataSil: (soruId) =>
        set((s) => {
          const kopya = { ...s.hatalar };
          delete kopya[soruId];
          return { hatalar: kopya };
        }),

      provaKaydet: (sonuc) =>
        set((s) => ({
          provaGecmisi: [
            {
              ...sonuc,
              id: `prova-${Date.now()}`,
              tarih: Date.now(),
            },
            ...s.provaGecmisi,
          ].slice(0, 50),
        })),

      herseyiSifirla: () =>
        set((s) => ({
          okunanKonular: {},
          cozulenSorular: {},
          hatalar: {},
          provaGecmisi: [],
          gunlukAktivite: {},
          gununSorusuCevap: {},
          settings: { ...baslangicSettings, themeMode: s.settings.themeMode },
        })),
    }),
    {
      name: "ehliyet-ustasi-store-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        settings: s.settings,
        okunanKonular: s.okunanKonular,
        cozulenSorular: s.cozulenSorular,
        hatalar: s.hatalar,
        provaGecmisi: s.provaGecmisi,
        gunlukAktivite: s.gunlukAktivite,
        gununSorusuCevap: s.gununSorusuCevap,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return {
          ...current,
          ...p,
          settings: {
            ...baslangicSettings,
            ...current.settings,
            ...(p.settings ?? {}),
          },
        };
      },
    }
  )
);

// Türetilmiş yardımcılar (selector değil, saf fonksiyon)
export function seriHesapla(gunlukAktivite: Record<string, number>): number {
  let seri = 0;
  const d = new Date();
  for (;;) {
    const anahtar = bugunAnahtar(d);
    if ((gunlukAktivite[anahtar] ?? 0) > 0) {
      seri += 1;
      d.setDate(d.getDate() - 1);
    } else if (seri === 0 && anahtar === bugunAnahtar()) {
      // bugün henüz çözülmediyse dünden devam edebilir
      d.setDate(d.getDate() - 1);
      const dunAnahtar = bugunAnahtar(d);
      if ((gunlukAktivite[dunAnahtar] ?? 0) > 0) {
        continue;
      }
      break;
    } else {
      break;
    }
  }
  return seri;
}

export { bugunAnahtar };
