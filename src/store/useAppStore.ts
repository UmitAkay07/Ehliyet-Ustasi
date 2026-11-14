import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as Notifications from "expo-notifications";
import type { DersId, Soru } from "@/types";
import { kalanGunHesapla, tekrarGuncelle } from "@/utils/tekrar";
import type { TekrarKaydi } from "@/utils/tekrar";
import { kayitliDurumuAyikla, type AlanTuru } from "@/utils/depoDogrula";

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
  /** Simülasyon ses efektleri (sinyal, park sensörü, anons...) */
  simulasyonSesi: boolean;
}

interface AppState {
  settings: Settings;
  okunanKonular: Record<string, number>; // konuId -> okunma zamanı
  cozulenSorular: Record<string, CozulenSoru>;
  hatalar: Record<string, HataKaydi>;
  /** Aralıklı tekrar takvimi: soruId -> kutu ve sıradaki tekrar zamanı (bkz. utils/tekrar.ts) */
  tekrar: Record<string, TekrarKaydi>;
  provaGecmisi: ProvaSonucu[];
  gunlukAktivite: Record<string, number>; // YYYY-MM-DD -> çözülen soru sayısı
  /** Günün sorusu cevaplandı mı: YYYY-MM-DD -> soruId */
  gununSorusuCevap: Record<string, string>;
  /** Favori sorular: soruId -> eklenme zamanı */
  favoriler: Record<string, number>;
  /** Ehliyet yol haritasında tamamlanan adımlar: adım kimliği -> tamamlanma zamanı */
  yolHaritasi: Record<string, number>;
  /** Uygulamayı puanlama isteği gösterildi mi (kabul ya da ret fark etmez, bir daha sorulmaz; sıfırlamada da korunur) */
  puanIstegiGosterildi: boolean;
  sonProvaDetayi: any | null;

  setThemeMode: (mode: ThemeMode) => void;
  setSimulasyonSesi: (acik: boolean) => void;
  puanIstegiGosterildiIsaretle: () => void;
  setSinavTarihi: (tarih: string | null) => void;
  gununSorusuIsaretle: (gun: string, soruId: string) => void;
  favoriDegistir: (soruId: string) => void;
  yolAdimiDegistir: (adimId: string) => void;
  onboardingiTamamla: () => void;
  konuOkundu: (konuId: string) => void;
  soruCevapla: (soru: Soru, secilenIndex: number) => boolean;
  hataSil: (soruId: string) => void;
  provaKaydet: (sonuc: Omit<ProvaSonucu, "id" | "tarih">) => void;
  setSonProvaDetayi: (detay: any | null) => void;
  herseyiSifirla: () => void;
}

function bugunAnahtar(d = new Date()): string {
  // Use local timezone instead of UTC so streaks don't break based on midnight offsets
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const baslangicSettings: Settings = {
  themeMode: "dark",
  onboardingTamam: false,
  sinavTarihi: null,
  simulasyonSesi: true,
};

const DEPO_ADI = "ehliyet-ustasi-store-v1";

/** Kayıttaki alanların beklenen türleri; türü bozuk alan varsayılana döner (merge) */
const KAYIT_SEMASI: Record<string, AlanTuru> = {
  settings: "nesne",
  okunanKonular: "nesne",
  cozulenSorular: "nesne",
  hatalar: "nesne",
  tekrar: "nesne",
  provaGecmisi: "dizi",
  gunlukAktivite: "nesne",
  gununSorusuCevap: "nesne",
  favoriler: "nesne",
  yolHaritasi: "nesne",
  puanIstegiGosterildi: "mantiksal",
  sonProvaDetayi: "nesneVeyaNull",
};

/**
 * Kayıt okunamazsa (bozuk JSON, depolama hatası) zustand "yüklendi" demez ve uygulama açılış ekranında
 * sonsuza dek kalırdı. Önce iki kez yeniden denenir (geçici hata olabilir; ilerleme silinmesin diye
 * hemen varsayılana geçilmez). Yine okunamazsa ham kayıt ayrı bir anahtara yedeklenir ve uygulama
 * varsayılanlarla açılır.
 */
let okumaHatasiSayisi = 0;
let depoKurtarmaBitti = false;
const kurtarmaDinleyicileri = new Set<() => void>();

function depoOkumaHatasi(hata: unknown): void {
  okumaHatasiSayisi += 1;
  console.warn(`[depo] kayıtlı veri okunamadı (deneme ${okumaHatasiSayisi}):`, String(hata));
  if (okumaHatasiSayisi <= 2) {
    setTimeout(() => {
      useAppStore.persist.rehydrate();
    }, okumaHatasiSayisi * 700);
    return;
  }
  AsyncStorage.getItem(DEPO_ADI)
    .then((ham) => (ham ? AsyncStorage.setItem(`${DEPO_ADI}-okunamayan-${Date.now()}`, ham) : undefined))
    .catch((e) => console.warn("[depo] okunamayan kayıt yedeklenemedi:", String(e)))
    .finally(() => {
      depoKurtarmaBitti = true;
      kurtarmaDinleyicileri.forEach((dinleyici) => dinleyici());
    });
}

/** Kayıt okunamadığı için uygulama varsayılanlarla açılmaya karar verdi mi */
export function depoKurtarildi(): boolean {
  return depoKurtarmaBitti;
}

export function depoKurtarildiginda(dinleyici: () => void): () => void {
  kurtarmaDinleyicileri.add(dinleyici);
  return () => {
    kurtarmaDinleyicileri.delete(dinleyici);
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      settings: baslangicSettings,
      okunanKonular: {},
      cozulenSorular: {},
      hatalar: {},
      tekrar: {},
      provaGecmisi: [],
      gunlukAktivite: {},
      gununSorusuCevap: {},
      favoriler: {},
      yolHaritasi: {},
      puanIstegiGosterildi: false,
      sonProvaDetayi: null,

      puanIstegiGosterildiIsaretle: () => set({ puanIstegiGosterildi: true }),

      setThemeMode: (mode) =>
        set((s) => ({ settings: { ...s.settings, themeMode: mode } })),

      setSimulasyonSesi: (acik) =>
        set((s) => ({ settings: { ...s.settings, simulasyonSesi: acik } })),

      setSinavTarihi: (tarih) =>
        set((s) => ({ settings: { ...s.settings, sinavTarihi: tarih } })),

      gununSorusuIsaretle: (gun, soruId) =>
        set((s) => ({
          gununSorusuCevap: { ...s.gununSorusuCevap, [gun]: soruId },
        })),

      favoriDegistir: (soruId) =>
        set((s) => {
          const kopya = { ...(s.favoriler ?? {}) };
          if (kopya[soruId]) delete kopya[soruId];
          else kopya[soruId] = Date.now();
          return { favoriler: kopya };
        }),

      yolAdimiDegistir: (adimId) =>
        set((s) => {
          const kopya = { ...(s.yolHaritasi ?? {}) };
          if (kopya[adimId]) delete kopya[adimId];
          else kopya[adimId] = Date.now();
          return { yolHaritasi: kopya };
        }),

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

        const simdi = Date.now();
        // Tekrar takvimi yardımcı bir özelliktir: bir hata olsa bile cevap, hata defteri ve
        // günlük aktivite kaydedilmeye devam etmeli.
        let yeniTekrar = state.tekrar;
        try {
          yeniTekrar = tekrarGuncelle(
            state.tekrar,
            soru.id,
            dogru,
            simdi,
            kalanGunHesapla(state.settings.sinavTarihi, simdi),
            // eski sürümden kalan, tekrar kaydı olmayan hata girdisi kaybolmasın
            state.hatalar[soru.id]?.eklenme
          );
        } catch (hata) {
          console.warn("Tekrar takvimi güncellenemedi", hata);
        }

        set({
          cozulenSorular: {
            ...state.cozulenSorular,
            [soru.id]: {
              dogru,
              tarih: simdi,
              deneme: (oncekiCozum?.deneme ?? 0) + 1,
            },
          },
          hatalar: yeniHatalar,
          tekrar: yeniTekrar,
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
          // Yalnızca listeden kaldırır; aralıklı tekrar takvimi sürer (hatalar.tsx'teki metinle tutarlı)
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

      setSonProvaDetayi: (detay) => set({ sonProvaDetayi: detay }),

      herseyiSifirla: () => {
        Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
        set((s) => ({
          okunanKonular: {},
          cozulenSorular: {},
          hatalar: {},
          tekrar: {},
          provaGecmisi: [],
          gunlukAktivite: {},
          gununSorusuCevap: {},
          favoriler: {},
          yolHaritasi: {},
          sonProvaDetayi: null,
          settings: { ...baslangicSettings, themeMode: s.settings.themeMode },
        }));
      },
    }),
    {
      name: DEPO_ADI,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (_durum, hata) => {
        if (hata) depoOkumaHatasi(hata);
      },
      partialize: (s) => ({
        settings: s.settings,
        okunanKonular: s.okunanKonular,
        cozulenSorular: s.cozulenSorular,
        hatalar: s.hatalar,
        tekrar: s.tekrar,
        provaGecmisi: s.provaGecmisi,
        gunlukAktivite: s.gunlukAktivite,
        gununSorusuCevap: s.gununSorusuCevap,
        favoriler: s.favoriler,
        yolHaritasi: s.yolHaritasi,
        puanIstegiGosterildi: s.puanIstegiGosterildi,
        sonProvaDetayi: s.sonProvaDetayi,
      }),
      merge: (persisted, current) => {
        const { gecerli, atilan } = kayitliDurumuAyikla(persisted, KAYIT_SEMASI);
        if (atilan.length > 0) console.warn("[depo] türü bozuk alanlar varsayılana döndü:", atilan.join(", "));
        const p = gecerli as Partial<AppState>;
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
