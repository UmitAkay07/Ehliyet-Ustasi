/**
 * Ehliyet yol haritası: sürücü adayının izleyeceği genel adımlar (B sınıfı için genel bir kılavuz).
 *
 * ÖNEMLİ — İÇERİK POLİTİKASI:
 * - Bu dosya bilerek GENEL tutulmuştur: kesin sayı, ücret, süre, evrak listesi, sınav hakkı sayısı ya da yönetmelik
 *   maddesi İÇERMEZ (bunlar sık değişir). scripts/test-yol-haritasi.mjs bu kuralı denetler.
 * - Yol haritası, `YOL_HARITASI_ONAYLI` true yapılana kadar uygulamada GÖRÜNMEZ. Adımların sırası ve açıklamaları
 *   resmî kaynaklarla (MEB, e-Devlet, sürücü kursu) doğrulandıktan sonra bayrak true yapılır.
 *
 * Bu dosya hiçbir şey içe aktarmaz (Node'da doğrudan test edilebilsin diye).
 */

export const YOL_HARITASI_ONAYLI = false;

export interface YolAdimi {
  id: string;
  baslik: string;
  aciklama: string;
  /** Uygulamada bu adıma yardımcı olan ekranın yolu (varsa) */
  rota?: string;
  rotaEtiketi?: string;
}

export const YOL_ADIMLARI: YolAdimi[] = [
  {
    id: "kurs-sec",
    baslik: "Sürücü kursunu seç",
    aciklama: "Bölgendeki onaylı sürücü kurslarını karşılaştır. Kayıt koşullarını ve güncel evrak listesini kurstan öğren.",
  },
  {
    id: "evrak",
    baslik: "Evraklarını hazırla",
    aciklama: "Kursun istediği belgeleri eksiksiz topla. Liste zamanla değişebilir; güncel hâlini kursundan ve resmî kaynaklardan doğrula.",
  },
  {
    id: "saglik",
    baslik: "Sağlık raporunu al",
    aciklama: "Sürücü adayları için gereken sağlık raporunu yetkili sağlık kuruluşundan temin et.",
  },
  {
    id: "kayit",
    baslik: "Kursa kayıt ol",
    aciklama: "Evrakların tamamlanınca kursa kaydını yaptır ve eğitim takvimini öğren.",
  },
  {
    id: "teori",
    baslik: "Konuları çalış, test çöz",
    aciklama: "Trafik, ilk yardım, motor ve trafik adabı konularını oku; testlerle ve günlük tekrarla pekiştir.",
    rota: "/(tabs)/konular",
    rotaEtiketi: "Konulara git",
  },
  {
    id: "prova",
    baslik: "Prova sınavlarıyla hazırlan",
    aciklama: "Gerçek sınav düzenindeki provayı çöz, puan kaybettiğin konuları tekrar et.",
    rota: "/prova",
    rotaEtiketi: "Provaya başla",
  },
  {
    id: "e-sinav",
    baslik: "Yazılı e-Sınava gir",
    aciklama: "Sınav randevusu ve geçme koşulları için güncel duyuruları (MEB, e-Devlet, kursun) takip et.",
  },
  {
    id: "direksiyon-egitimi",
    baslik: "Direksiyon eğitimini tamamla",
    aciklama: "Park ve manevraları uygulamadaki derslerle incele, kursta uygulamalı eğitimini tamamla.",
    rota: "/(tabs)/direksiyon",
    rotaEtiketi: "Direksiyon derslerine git",
  },
  {
    id: "direksiyon-sinavi",
    baslik: "Direksiyon sınavına gir",
    aciklama: "Sınav gününe hata kriterlerini ve manevra sırasını tekrar ederek git; sakin ol.",
    rota: "/pratik-sinav-simulasyonu",
    rotaEtiketi: "Sınav simülasyonu",
  },
  {
    id: "belge",
    baslik: "Sürücü belgeni teslim al",
    aciklama: "Sınavları geçtikten sonra belgenin nasıl ve nereden teslim alınacağını kursundan ve resmî kaynaklardan öğren.",
  },
];

export interface YolIlerlemesi {
  tamamlanan: number;
  toplam: number;
  /** 0..1 */
  oran: number;
  /** Henüz tamamlanmamış ilk adım (hepsi bittiyse null) */
  siradaki: YolAdimi | null;
}

/** `tamamlanan`: adım kimliği → tamamlanma zamanı (store'daki yolHaritasi). Bilinmeyen kimlikler sayılmaz. */
export function yolIlerlemesi(tamamlanan: Record<string, number> | null | undefined): YolIlerlemesi {
  const kayit = tamamlanan ?? {};
  const bitti = YOL_ADIMLARI.filter((a) => Boolean(kayit[a.id]));
  return {
    tamamlanan: bitti.length,
    toplam: YOL_ADIMLARI.length,
    oran: YOL_ADIMLARI.length ? bitti.length / YOL_ADIMLARI.length : 0,
    siradaki: YOL_ADIMLARI.find((a) => !kayit[a.id]) ?? null,
  };
}
