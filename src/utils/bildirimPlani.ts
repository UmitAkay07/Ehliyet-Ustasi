/**
 * Günlük plana bağlı bildirimler (saf mantık; çalışma zamanında hiçbir şey import etmez).
 * - Sabah 10:00: o günün planı. Tekrar sırası gelmişse "Bugün N tekrarın var", yoksa "Bugünkü hedefin: N soru".
 * - Akşam 20:00: yalnızca bugün için ve bugünkü soru hedefi tamamlanmadıysa.
 * Sınav günü bu ikisi gönderilmez; 13:00'teki geri sayım bildirimi "bol şans" der.
 * İçerik kurulduğu andaki veriye göre yazılır; uygulama açılınca ve arka plana geçince yeniden kurulur.
 */

export const SABAH_SAATI = 10;
export const AKSAM_SAATI = 20;
/** Ana sayfadaki plan kartıyla aynı sınır (gunlukPlan.ts → TEKRAR_GUNLUK_HEDEF) */
export const GUNLUK_TEKRAR_SINIRI = 20;
/** Zamanı bundan yakın olan bildirim kurulmaz */
export const EN_AZ_ILERI_MS = 30_000;

export interface GunPlani {
  /** 0 = bugün, 1 = yarın ... */
  gunOfseti: number;
  /** O gün sınava kalan gün (tarih yoksa null) */
  kalanGun: number | null;
  /** O sabah sırası gelmiş tekrar sayısı (arada çalışılmazsa) */
  tekrar: number;
  /** O günün soru hedefi */
  soruHedefi: number;
  /** O gün şimdiye kadar çözülen soru (gelecek günler için 0) */
  cozulen: number;
}

export interface BildirimIcerigi {
  baslik: string;
  govde: string;
}

export interface PlanBildirimi extends BildirimIcerigi {
  /** Gönderilme zamanı (ms) */
  zaman: number;
}

/** `simdi`den gunOfseti gün sonra, yerel saatle `saat`:00 */
export function gunSaati(simdi: number, gunOfseti: number, saat: number): number {
  const tarih = new Date(simdi);
  tarih.setDate(tarih.getDate() + gunOfseti);
  tarih.setHours(saat, 0, 0, 0);
  return tarih.getTime();
}

function tekrarSayisi(g: GunPlani): number {
  return Math.min(Math.max(0, g.tekrar), GUNLUK_TEKRAR_SINIRI);
}

export function sabahIcerigi(g: GunPlani, motivasyon: string): BildirimIcerigi | null {
  if (g.kalanGun === 0) return null;
  const tekrar = tekrarSayisi(g);
  if (tekrar > 0) {
    return {
      baslik: `Bugün ${tekrar} tekrarın var`,
      govde: `Unutmadan pekiştir, sonra ${g.soruHedefi} soruluk günlük hedefine geç.`,
    };
  }
  return { baslik: `Bugünkü hedefin: ${g.soruHedefi} soru`, govde: motivasyon };
}

export function aksamIcerigi(g: GunPlani): BildirimIcerigi | null {
  if (g.kalanGun === 0) return null;
  const kalan = g.soruHedefi - Math.max(0, g.cozulen);
  if (kalan <= 0) return null;
  const tekrar = tekrarSayisi(g);
  return {
    baslik: g.cozulen > 0 ? `Hedefine ${kalan} soru kaldı` : `Bugünkü ${g.soruHedefi} soru seni bekliyor`,
    govde: tekrar > 0 ? `Sırada ${tekrar} tekrar da var. Birkaç dakika yeter.` : "Günü tamamlamak için birkaç dakika yeter.",
  };
}

/**
 * Kurulacak plan bildirimleri, zamana göre sıralı.
 * `motivasyon`: tekrar olmayan sabahlarda gövdeye yazılacak mesajı seçer.
 */
export function planBildirimleri(
  gunler: GunPlani[],
  simdi: number,
  motivasyon: (gunOfseti: number) => string
): PlanBildirimi[] {
  const sonuc: PlanBildirimi[] = [];
  for (const g of gunler) {
    const sabah = gunSaati(simdi, g.gunOfseti, SABAH_SAATI);
    if (sabah > simdi + EN_AZ_ILERI_MS) {
      const icerik = sabahIcerigi(g, motivasyon(g.gunOfseti));
      if (icerik) sonuc.push({ zaman: sabah, ...icerik });
    }
    if (g.gunOfseti === 0) {
      const aksam = gunSaati(simdi, 0, AKSAM_SAATI);
      if (aksam > simdi + EN_AZ_ILERI_MS) {
        const icerik = aksamIcerigi(g);
        if (icerik) sonuc.push({ zaman: aksam, ...icerik });
      }
    }
  }
  return sonuc.sort((a, b) => a.zaman - b.zaman);
}
