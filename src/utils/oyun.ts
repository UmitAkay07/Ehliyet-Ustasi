/**
 * Oyunlaştırma — saf mantık, hiçbir import yok.
 *
 * XP, seviye ve rozetler YENİ KALICI VERİ TUTMADAN, mevcut kayıtlardan türetilir
 * (çözülen sorular, okunan konular, prova geçmişi, günlük aktivite). Böylece store'a dokunulmaz,
 * eski kullanıcının verisi bozulmaz ve geçmiş çalışması otomatik olarak puana dönüşür.
 *
 * Bilinen sınır: "seri dondurma" gibi kalıcı durum gerektiren özellikler bu sürümde yoktur.
 */

export interface OyunGirdisi {
  /** En az bir kez cevaplanmış farklı soru sayısı */
  cozulenSoru: number;
  /** Son cevabı doğru olan soru sayısı */
  dogruSoru: number;
  /** Toplam cevap denemesi (aynı soruyu yeniden çözmek dahil) */
  toplamDeneme: number;
  toplamSoru: number;
  okunanKonu: number;
  toplamKonu: number;
  provaSayisi: number;
  /** 70 ve üzeri puan alınan prova sayısı */
  gecilenProva: number;
  /** En yüksek prova puanı (prova yoksa 0) */
  enYuksekProva: number;
  /** Şu anki günlük seri */
  seri: number;
  /** Geçmişteki en uzun günlük seri */
  enUzunSeri: number;
  /** Hata defterindeki soru sayısı */
  hataSayisi: number;
}

export const XP_DENEME = 2;
export const XP_DOGRU_SORU = 8;
export const XP_KONU = 25;
export const XP_PROVA = 40;
export const XP_PROVA_GECTI = 60;

const pozitif = (x: number) => (Number.isFinite(x) && x > 0 ? x : 0);

export function xpHesapla(g: OyunGirdisi): number {
  return Math.round(
    pozitif(g.toplamDeneme) * XP_DENEME +
      pozitif(g.dogruSoru) * XP_DOGRU_SORU +
      pozitif(g.okunanKonu) * XP_KONU +
      pozitif(g.provaSayisi) * XP_PROVA +
      pozitif(g.gecilenProva) * XP_PROVA_GECTI
  );
}

export const SEVIYE_ADLARI: readonly string[] = [
  "Çırak",
  "Acemi",
  "Yeni Sürücü",
  "Deneyimli Sürücü",
  "Yol Bilgesi",
  "Trafik Kurdu",
  "Direksiyon Ustası",
  "Usta Sürücü",
  "Yol Efsanesi",
  "Ehliyet Ustası",
];

export interface SeviyeBilgisi {
  seviye: number;
  ad: string;
  xp: number;
  /** Bu seviyenin başladığı XP */
  baslangicXp: number;
  /** Sonraki seviyenin başladığı XP */
  sonrakiXp: number;
  /** Bu seviye içindeki ilerleme (0..1) */
  ilerleme: number;
  /** Sonraki seviyeye kalan XP */
  kalanXp: number;
}

/** Seviye n, 50·(n−1)² XP'de başlar: 0, 50, 200, 450, 800, 1250 ... */
export function seviyeBaslangicXp(seviye: number): number {
  return 50 * (seviye - 1) * (seviye - 1);
}

export function seviyeBilgisi(xp: number): SeviyeBilgisi {
  const guvenli = pozitif(xp);
  const seviye = Math.floor(Math.sqrt(guvenli / 50)) + 1;
  const baslangicXp = seviyeBaslangicXp(seviye);
  const sonrakiXp = seviyeBaslangicXp(seviye + 1);
  return {
    seviye,
    ad: SEVIYE_ADLARI[Math.min(seviye, SEVIYE_ADLARI.length) - 1],
    xp: guvenli,
    baslangicXp,
    sonrakiXp,
    ilerleme: (guvenli - baslangicXp) / (sonrakiXp - baslangicXp),
    kalanXp: sonrakiXp - guvenli,
  };
}

/** gunlukAktivite anahtarlarından (YYYY-MM-DD, değer > 0) en uzun art arda gün sayısı */
export function enUzunSeri(gunlukAktivite: Record<string, number>): number {
  const gunler = new Set<number>();
  for (const [anahtar, sayi] of Object.entries(gunlukAktivite)) {
    if (!(sayi > 0)) continue;
    const [y, a, g] = anahtar.split("-").map(Number);
    if (!y || !a || !g) continue;
    gunler.add(Math.round(Date.UTC(y, a - 1, g) / 86_400_000));
  }
  const sirali = [...gunler].sort((x, y) => x - y);
  let en = 0;
  let su = 0;
  for (let i = 0; i < sirali.length; i++) {
    su = i > 0 && sirali[i] === sirali[i - 1] + 1 ? su + 1 : 1;
    en = Math.max(en, su);
  }
  return en;
}

export interface Rozet {
  id: string;
  baslik: string;
  aciklama: string;
  /** Ionicons adı */
  ikon: string;
  kazanildi: boolean;
  /** 0..1 */
  ilerleme: number;
  /** "37/100" gibi durum metni */
  durum: string;
}

function rozet(id: string, baslik: string, aciklama: string, ikon: string, mevcut: number, hedef: number): Rozet {
  const m = pozitif(mevcut);
  const kazanildi = m >= hedef;
  return {
    id,
    baslik,
    aciklama,
    ikon,
    kazanildi,
    ilerleme: hedef > 0 ? Math.min(1, m / hedef) : 1,
    durum: `${Math.min(Math.floor(m), hedef)}/${hedef}`,
  };
}

export function rozetleriHesapla(g: OyunGirdisi): Rozet[] {
  const yarim = Math.max(1, Math.ceil(g.toplamSoru / 2));
  const tam = Math.max(1, g.toplamSoru);
  const tumKonu = Math.max(1, g.toplamKonu);
  const defter = g.hataSayisi === 0 ? g.cozulenSoru : 0;
  return [
    rozet("ilk-adim", "İlk Adım", "İlk sorunu çöz", "footsteps", g.cozulenSoru, 1),
    rozet("yuz-dogru", "Yüz Doğru", "100 soruyu doğru bil", "checkmark-done", g.dogruSoru, 100),
    rozet("havuz-yarisi", "Havuzun Yarısı", "Soruların yarısını çöz", "albums", g.cozulenSoru, yarim),
    rozet("tam-havuz", "Tam Havuz", "Bütün soruları en az bir kez çöz", "trophy", g.cozulenSoru, tam),
    rozet("seri-3", "3 Gün Seri", "3 gün art arda çalış", "flame", g.enUzunSeri, 3),
    rozet("seri-7", "Haftalık Seri", "7 gün art arda çalış", "flame", g.enUzunSeri, 7),
    rozet("seri-30", "Aylık Seri", "30 gün art arda çalış", "flame", g.enUzunSeri, 30),
    rozet("ilk-prova", "İlk Prova", "İlk prova sınavını bitir", "clipboard", g.provaSayisi, 1),
    rozet("prova-gecti", "Geçtin!", "Provada 70 puan ve üzeri al", "ribbon", g.gecilenProva, 1),
    rozet("prova-90", "90 Üstü", "Provada 90 puan ve üzeri al", "medal", g.enYuksekProva, 90),
    rozet("prova-100", "Kusursuz", "Provadan 100 puan al", "star", g.enYuksekProva, 100),
    rozet("konu-avcisi", "Konu Avcısı", "Bütün konuları oku", "book", g.okunanKonu, tumKonu),
    rozet("temiz-defter", "Tertemiz Defter", "50 soru çöz ve hata defterini boşalt", "shield-checkmark", defter, 50),
  ];
}
