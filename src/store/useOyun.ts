import { useMemo } from "react";
import { useAppStore, seriHesapla } from "@/store/useAppStore";
import { SORULAR } from "@/data/sorular";
import { KONULAR } from "@/data/konular";
import { enUzunSeri, rozetleriHesapla, seviyeBilgisi, xpHesapla } from "@/utils/oyun";
import type { OyunGirdisi, Rozet, SeviyeBilgisi } from "@/utils/oyun";

export interface OyunDurumu {
  xp: number;
  seviye: SeviyeBilgisi;
  rozetler: Rozet[];
  kazanilan: number;
  girdi: OyunGirdisi;
}

/** XP, seviye ve rozetler. Yeni kalıcı veri yoktur; mevcut kayıtlardan türetilir (bkz. utils/oyun.ts). */
export function useOyun(): OyunDurumu {
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const hatalar = useAppStore((s) => s.hatalar);

  return useMemo(() => {
    const cevaplar = Object.values(cozulenSorular);
    const girdi: OyunGirdisi = {
      cozulenSoru: cevaplar.length,
      dogruSoru: cevaplar.filter((c) => c.dogru).length,
      toplamDeneme: cevaplar.reduce((t, c) => t + (c.deneme ?? 1), 0),
      toplamSoru: SORULAR.length,
      okunanKonu: Object.keys(okunanKonular).length,
      toplamKonu: KONULAR.length,
      provaSayisi: provaGecmisi.length,
      gecilenProva: provaGecmisi.filter((p) => p.gecti).length,
      enYuksekProva: provaGecmisi.reduce((m, p) => Math.max(m, p.puan), 0),
      seri: seriHesapla(gunlukAktivite),
      enUzunSeri: enUzunSeri(gunlukAktivite),
      hataSayisi: Object.keys(hatalar).length,
    };
    const xp = xpHesapla(girdi);
    const rozetler = rozetleriHesapla(girdi);
    return { xp, seviye: seviyeBilgisi(xp), rozetler, kazanilan: rozetler.filter((r) => r.kazanildi).length, girdi };
  }, [cozulenSorular, okunanKonular, provaGecmisi, gunlukAktivite, hatalar]);
}
