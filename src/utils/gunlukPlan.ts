/**
 * Günlük plan — saf mantık, hiçbir import yok.
 *
 * Plan, kalıcı yeni veri tutmadan, o güne ait mevcut verilerden türetilir:
 * bugün çözülen soru sayısı, bugün okunan konu, bugünkü prova ve tekrar kuyruğu.
 * Görevlerin sırası: tekrar → soru hedefi → yeni konu → prova.
 *
 * Bilinen sınır: bugün "öğrenildi" sayılıp takipten çıkan tekrar soruları
 * `tekrarBugunYapilan` içinde görünmez (kayıt silindiği için); tekrar görevi bu yüzden
 * nadiren olduğundan biraz düşük sayabilir.
 */

export type PlanTipi = "tekrar" | "soru" | "konu" | "prova";

export interface PlanKonu {
  konuId: string;
  baslik: string;
}

export interface PlanGirdisi {
  /** Sınava kalan gün (tarih yoksa null) */
  kalanGun: number | null;
  /** Şu an tekrar sırası gelen soru sayısı */
  tekrarBekleyen: number;
  /** Bugün tekrarı ilerleyen soru sayısı (kutu >= 1 ve bugün cevaplanmış) */
  tekrarBugunYapilan: number;
  /** Bugün çözülen toplam soru */
  bugunCozulen: number;
  /** Hiç çözülmemiş soru sayısı */
  toplamKalanSoru: number;
  /** Bugün okunan konu sayısı */
  bugunOkunanKonu: number;
  /** Henüz okunmamış konular, öncelik sırasıyla */
  okunmamisKonular: PlanKonu[];
  /** Önce çalışılması gereken konu (varsa) */
  zayifKonu: PlanKonu | null;
  /** Bugün prova sınavı çözüldü mü */
  bugunProva: boolean;
  /** Son prova kaç gün önce (hiç yoksa null) */
  sonProvaGunOnce: number | null;
}

export interface PlanGorevi {
  id: string;
  tip: PlanTipi;
  baslik: string;
  aciklama: string;
  hedef: number;
  yapilan: number;
  /** 0..1 */
  ilerleme: number;
  tamam: boolean;
  /** expo-router yolu */
  rota: string;
}

export interface GunlukPlan {
  /** "sinav-gunu": bugün sınav, görev yok */
  mod: "normal" | "sinav-gunu";
  gorevler: PlanGorevi[];
  tamamlanan: number;
}

export const MIN_GUNLUK_SORU = 10;
export const MAX_GUNLUK_SORU = 40;
export const VARSAYILAN_UFUK_GUN = 14;
export const TEKRAR_GUNLUK_HEDEF = 20;

function sinirla(x: number, alt: number, ust: number): number {
  return Math.min(ust, Math.max(alt, x));
}

function oran(yapilan: number, hedef: number): number {
  if (hedef <= 0) return 1;
  return sinirla(yapilan / hedef, 0, 1);
}

/** Hiç çözülmemiş soruları sınava kadar eşit dağıtır; 10..40 arasında tutar */
export function gunlukSoruHedefi(toplamKalanSoru: number, kalanGun: number | null): number {
  if (kalanGun === 1) return MIN_GUNLUK_SORU; // sınavdan önceki gün: yeni içerik yerine pekiştirme
  const ufuk = kalanGun !== null && kalanGun > 1 ? kalanGun - 1 : VARSAYILAN_UFUK_GUN;
  const ham = Math.ceil(Math.max(0, toplamKalanSoru) / Math.max(1, ufuk));
  return sinirla(ham, MIN_GUNLUK_SORU, MAX_GUNLUK_SORU);
}

function provaDahilMi(g: PlanGirdisi): boolean {
  if (g.bugunProva) return true;
  const gun = g.kalanGun !== null && g.kalanGun >= 0 ? g.kalanGun : null;
  if (gun === null) return g.sonProvaGunOnce === null || g.sonProvaGunOnce >= 7;
  if (gun > 14) return false;
  if (gun <= 7) return true;
  return g.sonProvaGunOnce === null || g.sonProvaGunOnce >= 3;
}

export function gunlukPlanUret(g: PlanGirdisi): GunlukPlan {
  if (g.kalanGun === 0) {
    return { mod: "sinav-gunu", gorevler: [], tamamlanan: 0 };
  }

  const gorevler: PlanGorevi[] = [];

  // 1) Tekrar
  const tekrarHedef = Math.min(Math.max(0, g.tekrarBugunYapilan) + Math.max(0, g.tekrarBekleyen), TEKRAR_GUNLUK_HEDEF);
  if (tekrarHedef > 0) {
    const yapilan = Math.min(Math.max(0, g.tekrarBugunYapilan), tekrarHedef);
    const tamam = yapilan >= tekrarHedef;
    gorevler.push({
      id: "tekrar",
      tip: "tekrar",
      baslik: tamam ? "Tekrar tamam" : `${tekrarHedef - yapilan} soruyu tekrar et`,
      aciklama: "Unutmadan pekiştir",
      hedef: tekrarHedef,
      yapilan,
      ilerleme: oran(yapilan, tekrarHedef),
      tamam,
      rota: "/tekrar",
    });
  }

  // 2) Soru hedefi
  const soruHedef = gunlukSoruHedefi(g.toplamKalanSoru, g.kalanGun);
  const soruYapilan = Math.max(0, g.bugunCozulen);
  const soruTamam = soruYapilan >= soruHedef;
  gorevler.push({
    id: "soru",
    tip: "soru",
    baslik: soruTamam ? "Soru hedefi tamam" : `Bugün ${soruHedef} soru çöz`,
    aciklama: g.zayifKonu ? `Önce: ${g.zayifKonu.baslik}` : "Konu testlerinden devam et",
    hedef: soruHedef,
    yapilan: Math.min(soruYapilan, soruHedef),
    ilerleme: oran(soruYapilan, soruHedef),
    tamam: soruTamam,
    rota: g.zayifKonu ? `/test/${g.zayifKonu.konuId}` : "/(tabs)/testler",
  });

  // 3) Yeni konu (sınava çok az kala yeni içerik önerilmez)
  const konuUygun = g.kalanGun === null || g.kalanGun < 0 || g.kalanGun > 3;
  const konuTamam = g.bugunOkunanKonu > 0;
  if (konuUygun && (konuTamam || g.okunmamisKonular.length > 0)) {
    const siradaki = g.okunmamisKonular[0];
    gorevler.push({
      id: "konu",
      tip: "konu",
      baslik: konuTamam ? "Bugünkü konu okundu" : `Yeni konu: ${siradaki.baslik}`,
      aciklama: "Konu anlatımını oku",
      hedef: 1,
      yapilan: konuTamam ? 1 : 0,
      ilerleme: konuTamam ? 1 : 0,
      tamam: konuTamam,
      rota: konuTamam || !siradaki ? "/(tabs)/konular" : `/konu/${siradaki.konuId}`,
    });
  }

  // 4) Prova sınavı
  if (provaDahilMi(g)) {
    gorevler.push({
      id: "prova",
      tip: "prova",
      baslik: g.bugunProva ? "Prova sınavı çözüldü" : "Prova sınavı çöz",
      aciklama: "50 soru, 45 dakika",
      hedef: 1,
      yapilan: g.bugunProva ? 1 : 0,
      ilerleme: g.bugunProva ? 1 : 0,
      tamam: g.bugunProva,
      rota: "/prova",
    });
  }

  return { mod: "normal", gorevler, tamamlanan: gorevler.filter((x) => x.tamam).length };
}
