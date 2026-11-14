import { useAppStore, bugunAnahtar } from "@/store/useAppStore";
import { SORULAR } from "@/data/sorular";
import { kalanGunHesapla, tekrarDurumu } from "@/utils/tekrar";
import { gunlukSoruHedefi } from "@/utils/gunlukPlan";
import { SABAH_SAATI, gunSaati } from "@/utils/bildirimPlani";
import type { GunPlani } from "@/utils/bildirimPlani";

let gecerliKimlikler: Set<string> | null = null;
const soruVarMi = (soruId: string) => (gecerliKimlikler ??= new Set(SORULAR.map((s) => s.id))).has(soruId);

/**
 * Bugünden itibaren (0..gunSayisi) her günün planı, kayıtlı ilerlemeye göre.
 * Gelecek günler için o güne kadar yeni çalışma yapılmadığı varsayılır; uygulama her kullanımda yeniden hesaplar.
 * Hesaplar ana sayfadaki "Bugünün planı" ile aynı fonksiyonları kullanır.
 */
export function gunPlanlari(simdi: number, sinavTarihi: string | null, gunSayisi: number): GunPlani[] {
  const durum = useAppStore.getState();
  const toplamKalanSoru = Math.max(0, SORULAR.length - Object.keys(durum.cozulenSorular).length);
  const bugunCozulen = durum.gunlukAktivite[bugunAnahtar(new Date(simdi))] ?? 0;

  const planlar: GunPlani[] = [];
  for (let gunOfseti = 0; gunOfseti <= gunSayisi; gunOfseti++) {
    const sabah = gunSaati(simdi, gunOfseti, SABAH_SAATI);
    const an = gunOfseti === 0 ? Math.max(simdi, sabah) : sabah;
    const kalanGun = kalanGunHesapla(sinavTarihi, an);
    planlar.push({
      gunOfseti,
      kalanGun,
      tekrar: tekrarDurumu(durum.tekrar, durum.hatalar, an, kalanGun, soruVarMi).simdiIds.length,
      soruHedefi: gunlukSoruHedefi(toplamKalanSoru, kalanGun),
      cozulen: gunOfseti === 0 ? bugunCozulen : 0,
    });
  }
  return planlar;
}
