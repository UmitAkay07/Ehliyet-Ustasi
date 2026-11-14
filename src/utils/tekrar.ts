/**
 * Aralıklı tekrar (Leitner) — saf mantık, hiçbir import yok.
 *
 * Amaç: yanlış bilinen soru unutulmadan önce, giderek açılan aralıklarla
 * yeniden sorulsun; art arda doğru bilinince "öğrenildi" sayılıp kuyruktan çıksın.
 *
 * Kutu = art arda kaç ARALIKLI tekrar doğru bilindi (0 = son cevap yanlış).
 *
 *   yanlış          → kutu 0, en erken ertesi gün (en az 12 saat sonra)
 *   1. doğru tekrar → kutu 1, 3 gün sonra
 *   2. doğru tekrar → kutu 2, 7 gün sonra
 *   3. doğru tekrar → kutu 3, 14 gün sonra
 *   4. doğru tekrar → öğrenildi (kayıt silinir)
 *
 * Sınav tarihi yakınsa aralıklar kısaltılır. Sınav tarihi sonradan girilse
 * ya da değişse bile, planlı tekrarlar sınavdan en geç 1 gün öncesine çekilir.
 */

export interface TekrarKaydi {
  /** Art arda kaç aralıklı tekrar doğru bilindi (0 = son cevap yanlış) */
  kutu: number;
  /** Bu zamandan itibaren tekrar sırası gelir (ms) */
  sonraki: number;
  /** Son cevap zamanı (ms) */
  son: number;
}

export type TekrarHaritasi = Record<string, TekrarKaydi>;

/** Eski sürümden kalan hata defteri kaydı (yalnızca ihtiyacımız olan alan) */
export interface EskiHataKaydi {
  eklenme: number;
}

export interface TekrarDurumu {
  /** Tekrar sırası gelen soru kimlikleri (en eskiden yeniye, zor olan önce) */
  simdiIds: string[];
  /** Planlanmış ama vakti henüz gelmemiş soru sayısı */
  sonraSayisi: number;
  /** Gelecekteki en yakın tekrar zamanı (ms) veya null */
  siradakiZaman: number | null;
}

export const ARALIKLAR_GUN: readonly number[] = [1, 3, 7, 14];
export const MEZUN_KUTU = ARALIKLAR_GUN.length;
/** Tek oturumda sorulacak en fazla tekrar sorusu */
export const OTURUM_LIMITI = 20;
/** Bir cevaptan sonra, takvim günü ne olursa olsun en az bu kadar beklenir (gece yarısı sınırı için) */
export const MIN_BEKLEME_MS = 12 * 60 * 60 * 1000;

const GUN_MS = 24 * 60 * 60 * 1000;

/** Yerel saate göre günün başlangıcı (+ gunEkle gün) */
export function gunBaslangici(zaman: number, gunEkle = 0): number {
  const d = new Date(zaman);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + gunEkle);
  return d.getTime();
}

/** "2026-11-20" veya ISO metin → sınava kalan gün; geçersizse null */
export function kalanGunHesapla(sinavTarihi: string | null | undefined, simdi: number): number | null {
  if (!sinavTarihi || typeof sinavTarihi !== "string") return null;
  const [y, m, g] = sinavTarihi.split("T")[0].split("-").map(Number);
  if (!y || !m || !g) return null;
  const hedef = new Date(y, m - 1, g).getTime();
  const sonuc = Math.round((hedef - gunBaslangici(simdi)) / GUN_MS);
  return Number.isFinite(sonuc) ? sonuc : null;
}

/** Verilen kutu için bekleme süresi (gün); sınav yakınsa kısaltılır */
export function aralikGun(kutu: number, kalanGun: number | null): number {
  const sinirli = Math.min(Math.max(kutu, 0), ARALIKLAR_GUN.length - 1);
  const temel = ARALIKLAR_GUN[sinirli];
  if (kalanGun === null || kalanGun <= 0) return temel;
  return Math.max(1, Math.min(temel, kalanGun - 1));
}

/**
 * Bozuk ya da eksik kayıtları güvenli hale getirir (kalıcı veri elle/yanlışlıkla bozulmuş olabilir).
 * Bozuk `sonraki` → hemen sırası gelsin; bozuk `kutu` → 0.
 */
function temizKayit(ham: unknown): TekrarKaydi | null {
  if (!ham || typeof ham !== "object") return null;
  const k = ham as Partial<TekrarKaydi>;
  return {
    kutu: Number.isFinite(k.kutu) ? (k.kutu as number) : 0,
    sonraki: Number.isFinite(k.sonraki) ? (k.sonraki as number) : 0,
    son: Number.isFinite(k.son) ? (k.son as number) : 0,
  };
}

/**
 * Kaydın gerçekte ne zaman sırasının geleceği.
 * Sınava `kalanGun >= 1` gün varken planlı tekrar, sınavdan en geç 1 gün öncesine çekilir
 * (sınav tarihi sonradan girildiyse ya da yaklaştıysa). Yeni cevaplanan sorunun
 * minimum bekleme süresi (MIN_BEKLEME_MS) bu çekmeyle bozulmaz.
 */
export function etkinSonraki(kayit: TekrarKaydi, simdi: number, kalanGun: number | null): number {
  if (kalanGun === null || kalanGun < 1) return kayit.sonraki;
  const sinir = Math.max(gunBaslangici(simdi, kalanGun - 1), kayit.son + MIN_BEKLEME_MS);
  return Math.min(kayit.sonraki, sinir);
}

function kayitOlustur(kutu: number, simdi: number, kalanGun: number | null): TekrarKaydi {
  const sonraki = Math.max(gunBaslangici(simdi, aralikGun(kutu, kalanGun)), simdi + MIN_BEKLEME_MS);
  return { kutu, sonraki, son: simdi };
}

/** Tekrar kaydı olmayan eski hata defteri girdisi → ertesi gün sırası gelen kayıt */
function eskiHatadanKayit(eklenme: number): TekrarKaydi {
  const e = Number.isFinite(eklenme) ? eklenme : 0;
  return { kutu: 0, sonraki: Math.max(gunBaslangici(e, 1), e + MIN_BEKLEME_MS), son: e };
}

/**
 * Bir soru cevaplandıktan sonra tekrar haritasını (yeni nesne olarak) günceller.
 *
 * - Yanlış: her zaman kutu 0'a döner, en erken ertesi gün sırası gelir.
 * - Doğru ve soru takipte değil: planlanmaz (ilk seferde bilinen soru tekrar gerektirmez).
 * - Doğru ama vakti gelmeden (aynı gün hemen yeniden çözüldü): takvim değişmez,
 *   böylece aynı günde tekrar tekrar çözmek soruyu "öğrenilmiş" göstermez.
 * - Doğru ve vakti gelmiş: bir kutu ilerler; son kutuyu geçerse kayıt silinir.
 *
 * `eskiHataEklenme`: bu soru eski sürümden hata defterinde duruyor ama tekrar kaydı yoksa
 * eklenme zamanı verilir; kayıt oradan türetilir.
 */
export function tekrarGuncelle(
  tekrar: TekrarHaritasi,
  soruId: string,
  dogru: boolean,
  simdi: number,
  kalanGun: number | null,
  eskiHataEklenme?: number
): TekrarHaritasi {
  if (!dogru) {
    return { ...tekrar, [soruId]: kayitOlustur(0, simdi, kalanGun) };
  }

  const kayitli = temizKayit(tekrar[soruId]);
  const mevcut = kayitli ?? (eskiHataEklenme !== undefined ? eskiHatadanKayit(eskiHataEklenme) : null);
  if (!mevcut) return tekrar;

  if (etkinSonraki(mevcut, simdi, kalanGun) > simdi) {
    // Vakti gelmemiş; eski hata defteri girdisinden türetildiyse kaybolmasın diye yazılır.
    return tekrar[soruId] ? tekrar : { ...tekrar, [soruId]: mevcut };
  }

  const kopya: TekrarHaritasi = { ...tekrar };
  const yeniKutu = mevcut.kutu + 1;
  if (yeniKutu >= MEZUN_KUTU) {
    delete kopya[soruId];
  } else {
    kopya[soruId] = kayitOlustur(yeniKutu, simdi, kalanGun);
  }
  return kopya;
}

/**
 * Bugün tekrar edilecekleri ve sonraya planlananları hesaplar.
 * Tekrar kaydı olmayan eski hata defteri girdileri de hesaba katılır.
 * `kalanGun`: sınava kalan gün (sınav tarihi yoksa null).
 * `gecerli`: verisi artık var olmayan soruları ayıklamak için.
 */
export function tekrarDurumu(
  tekrar: TekrarHaritasi,
  hatalar: Record<string, EskiHataKaydi>,
  simdi: number,
  kalanGun: number | null,
  gecerli?: (soruId: string) => boolean
): TekrarDurumu {
  const tumu: Array<{ id: string; kutu: number; vakit: number }> = [];

  for (const [id, ham] of Object.entries(tekrar)) {
    const k = temizKayit(ham);
    if (k) tumu.push({ id, kutu: k.kutu, vakit: etkinSonraki(k, simdi, kalanGun) });
  }
  for (const id of Object.keys(hatalar)) {
    if (tekrar[id]) continue;
    const k = eskiHatadanKayit(hatalar[id]?.eklenme);
    tumu.push({ id, kutu: k.kutu, vakit: etkinSonraki(k, simdi, kalanGun) });
  }

  const simdiListe: Array<{ id: string; kutu: number; vakit: number }> = [];
  let sonraSayisi = 0;
  let siradakiZaman: number | null = null;

  for (const girdi of tumu) {
    if (gecerli && !gecerli(girdi.id)) continue;
    if (girdi.vakit <= simdi) {
      simdiListe.push(girdi);
    } else {
      sonraSayisi += 1;
      if (siradakiZaman === null || girdi.vakit < siradakiZaman) siradakiZaman = girdi.vakit;
    }
  }

  simdiListe.sort((a, b) => a.vakit - b.vakit || a.kutu - b.kutu);
  return { simdiIds: simdiListe.map((g) => g.id), sonraSayisi, siradakiZaman };
}

/** Bir zamanın bugünden kaç gün sonra olduğu (0 = bugün, 1 = yarın) */
export function kacGunSonra(zaman: number, simdi: number): number {
  return Math.round((gunBaslangici(zaman) - gunBaslangici(simdi)) / GUN_MS);
}

export interface KalanOzeti {
  /** Sınava kalan gün (tarih yoksa / geçersizse null) */
  kalanGun: number | null;
  /** Şu an tekrar sırası gelen soru sayısı */
  tekrarSayisi: number;
}

function nesneMi(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

/**
 * Kalıcı depo (zustand persist) JSON metninden sınava kalan gün ve tekrar sayısı.
 * Widget gibi uygulama arayüzü dışındaki yerler içindir. Boş, bozuk ya da eksik veri çökmez; sıfır döner.
 * Beklenen biçim: {"state": {"settings": {"sinavTarihi": ...}, "tekrar": {...}, "hatalar": {...}}, "version": 0}
 */
export function kalanOzetiDepodan(
  depoMetni: string | null | undefined,
  simdi: number,
  gecerli?: (soruId: string) => boolean
): KalanOzeti {
  let durum: unknown = null;
  try {
    durum = depoMetni ? (JSON.parse(depoMetni) as { state?: unknown }).state : null;
  } catch {
    durum = null;
  }
  if (!nesneMi(durum)) return { kalanGun: null, tekrarSayisi: 0 };

  const ayarlar = nesneMi(durum.settings) ? durum.settings : {};
  const sinavTarihi = typeof ayarlar.sinavTarihi === "string" ? ayarlar.sinavTarihi : null;
  const tekrar = (nesneMi(durum.tekrar) ? durum.tekrar : {}) as TekrarHaritasi;
  const hatalar = (nesneMi(durum.hatalar) ? durum.hatalar : {}) as Record<string, EskiHataKaydi>;

  const kalanGun = kalanGunHesapla(sinavTarihi, simdi);
  const tekrarSayisi = tekrarDurumu(tekrar, hatalar, simdi, kalanGun, gecerli).simdiIds.length;
  return { kalanGun, tekrarSayisi };
}
