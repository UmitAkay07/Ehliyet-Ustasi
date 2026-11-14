import { useMemo } from "react";
import { useAppStore, bugunAnahtar } from "@/store/useAppStore";
import { useTekrarDurumu } from "@/store/useTekrarDurumu";
import { useGecmeAnalizi } from "@/store/useGecmeOlasiligi";
import { KONULAR } from "@/data/konular";
import { SORULAR } from "@/data/sorular";
import { dersBul } from "@/data/dersler";
import { gunBaslangici, kacGunSonra, kalanGunHesapla } from "@/utils/tekrar";
import { gunlukPlanUret } from "@/utils/gunlukPlan";
import type { GunlukPlan } from "@/utils/gunlukPlan";

/**
 * Bugünün planı. Yeni kalıcı veri tutmaz; mevcut kayıtlardan türetilir.
 * "Bugün" bilgisi tekrar hook'undan gelir (ekran odağında / uygulama öne gelince yenilenir).
 */
export function useGunlukPlan(): GunlukPlan {
  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const tekrar = useAppStore((s) => s.tekrar);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const tekrarDurumu = useTekrarDurumu();
  const { zayif } = useGecmeAnalizi();

  return useMemo(() => {
    const simdi = tekrarDurumu.simdi;
    const gunBasi = gunBaslangici(simdi);

    // Sınavda en çok soru çıkan dersten başla (sıralama kararlıdır, ders içi sıra korunur)
    const okunmamisKonular = KONULAR.filter((k) => !okunanKonular[k.id])
      .sort((a, b) => (dersBul(b.dersId)?.sinavSoruSayisi ?? 0) - (dersBul(a.dersId)?.sinavSoruSayisi ?? 0))
      .map((k) => ({ konuId: k.id, baslik: k.baslik }));

    const sonProva = provaGecmisi[0]?.tarih;
    const enZayif = zayif[0];

    return gunlukPlanUret({
      kalanGun: kalanGunHesapla(sinavTarihi, simdi),
      tekrarBekleyen: tekrarDurumu.simdiIds.length,
      tekrarBugunYapilan: Object.values(tekrar).filter((k) => k.son >= gunBasi && k.kutu >= 1).length,
      bugunCozulen: gunlukAktivite[bugunAnahtar(new Date(simdi))] ?? 0,
      toplamKalanSoru: Math.max(0, SORULAR.length - Object.keys(cozulenSorular).length),
      bugunOkunanKonu: Object.values(okunanKonular).filter((t) => t >= gunBasi).length,
      okunmamisKonular,
      zayifKonu: enZayif ? { konuId: enZayif.konuId, baslik: enZayif.baslik } : null,
      bugunProva: sonProva !== undefined && sonProva >= gunBasi,
      sonProvaGunOnce: sonProva !== undefined ? Math.max(0, kacGunSonra(simdi, sonProva)) : null,
    });
  }, [okunanKonular, cozulenSorular, gunlukAktivite, provaGecmisi, tekrar, sinavTarihi, tekrarDurumu, zayif]);
}
