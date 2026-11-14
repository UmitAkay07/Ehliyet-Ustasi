/**
 * Arama — saf mantık, hiçbir import yok.
 * Türkçe karakterlere ve büyük/küçük harfe duyarsız (ör. "isik" → "Işık", "ISIK" → "ışık"),
 * sorgudaki bütün kelimeler eşleşmeli, ilk alanda (başlık) eşleşenler öne çıkar.
 */

/** Karşılaştırma için metni sadeleştirir: küçük harf, Türkçe harfler ASCII'ye, fazla boşluk silinir */
export function normalize(metin: string): string {
  return metin
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface AramaSonucu<T> {
  oge: T;
  puan: number;
}

/** Bu kadar karakterden kısa sorgular aranmaz (tek harfle her şey eşleşir) */
export const MIN_SORGU_UZUNLUGU = 2;

/** Öğelerin sadeleştirilmiş metinleri; bir kez hazırlanır, her tuş vuruşunda yeniden sadeleştirilmez */
export interface AramaDizini<T> {
  ogeler: readonly T[];
  /** Her öğenin sadeleştirilmiş alanları (ilki başlık) */
  alanlar: string[][];
  /** Her öğenin bütün alanları tek metinde */
  hepsi: string[];
}

/** `alanlar`: öğenin aranabilir metinleri; İLK alan başlık sayılır ve daha yüksek puan alır */
export function aramaDizini<T>(ogeler: readonly T[], alanlar: (oge: T) => string[]): AramaDizini<T> {
  const sade = ogeler.map((oge) => alanlar(oge).map(normalize));
  return { ogeler, alanlar: sade, hepsi: sade.map((a) => a.join(" ")) };
}

/** Hazır dizinde arar. Sonuçlar puana göre azalan, eşitlikte girdi sırasıyla döner. */
export function dizindeAra<T>(dizin: AramaDizini<T>, sorgu: string, limit = 20): AramaSonucu<T>[] {
  const temiz = normalize(sorgu);
  if (temiz.length < MIN_SORGU_UZUNLUGU || limit <= 0) return [];
  const kelimeler = temiz.split(" ");

  const sonuc: Array<AramaSonucu<T> & { sira: number }> = [];
  dizin.ogeler.forEach((oge, sira) => {
    const alan = dizin.alanlar[sira];
    if (alan.length === 0) return;
    const hepsi = dizin.hepsi[sira];
    if (!kelimeler.every((k) => hepsi.includes(k))) return;

    const baslik = alan[0];
    let puan = 0;
    for (const k of kelimeler) {
      if (` ${baslik}`.includes(` ${k}`)) puan += 100; // başlıkta kelime başlangıcı
      else if (baslik.includes(k)) puan += 60; // başlıkta herhangi bir yerde
      else puan += 20; // yalnızca diğer alanlarda
    }
    if (kelimeler.length > 1 && baslik.includes(temiz)) puan += 50; // tüm ifade başlıkta
    if (baslik === temiz) puan += 100; // başlık tam eşleşme
    sonuc.push({ oge, puan, sira });
  });

  return sonuc
    .sort((a, b) => b.puan - a.puan || a.sira - b.sira)
    .slice(0, limit)
    .map(({ oge, puan }) => ({ oge, puan }));
}

/** Tek seferlik arama (dizini her çağrıda yeniden hazırlar; sık aramada `aramaDizini` + `dizindeAra`) */
export function ara<T>(ogeler: readonly T[], alanlar: (oge: T) => string[], sorgu: string, limit = 20): AramaSonucu<T>[] {
  return dizindeAra(aramaDizini(ogeler, alanlar), sorgu, limit);
}
