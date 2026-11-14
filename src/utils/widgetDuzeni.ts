/**
 * Ana ekran widget'ının saf mantığı: boyuta göre düzen ve ölçek, ekrandaki metinler, depodan bugünkü sayılar.
 * Çalışma zamanında hiçbir şey import etmez (node --test ile doğrudan test edilir).
 */

export type WidgetDuzeni = "serit" | "kare" | "genis";

/** Telefonlarda tek sıra widget ~60-140dp, iki sıra ~150dp ve üstü yüksekliktedir */
export const SERIT_UST_SINIR = 150;
/** İki sütunlu geniş düzen için en az genişlik (dp); 2 hücre genişliğinde kare düzen kalır */
export const GENIS_ALT_SINIR = 250;

export function widgetDuzeniSec(genislik: number, yukseklik: number): WidgetDuzeni {
  if (yukseklik < SERIT_UST_SINIR) return "serit";
  return genislik >= GENIS_ALT_SINIR ? "genis" : "kare";
}

function sinirla(deger: number, alt: number, ust: number): number {
  if (!Number.isFinite(deger)) return 1;
  return Math.min(ust, Math.max(alt, deger));
}

/** Yazı ve boşlukların çarpanı; tasarım 2x2 için ~165x185dp, 4x2 için ~340x185dp, 4x1 için ~90dp yükseklik üzerine kurulu */
export function widgetOlcegi(duzen: WidgetDuzeni, genislik: number, yukseklik: number): number {
  if (duzen === "serit") return sinirla(yukseklik / 90, 0.8, 1.2);
  if (duzen === "genis") return sinirla(Math.min(genislik / 280, yukseklik / 185), 0.85, 1.3);
  return sinirla(Math.min(genislik / 165, yukseklik / 185), 0.78, 1.3);
}

export type SinavDurumu = "yok" | "geri-sayim" | "bugun" | "gecti";

export function sinavDurumu(kalanGun: number | null): SinavDurumu {
  if (kalanGun === null || !Number.isFinite(kalanGun)) return "yok";
  if (kalanGun > 0) return "geri-sayim";
  return kalanGun === 0 ? "bugun" : "gecti";
}

/** Bugünkü soru hedefinde gidilen yol, 0..1 (hedef yoksa tamam sayılır) */
export function ilerlemeOrani(yapilan: number, hedef: number): number {
  if (!(hedef > 0)) return 1;
  return sinirla(yapilan / hedef, 0, 1);
}

/** Uygulamanın günlük sayaç anahtarı (yerel saat, YYYY-AA-GG); useAppStore'daki bugunAnahtar ile aynı olmalı */
export function gunAnahtari(zaman: number): string {
  const tarih = new Date(zaman);
  return new Date(zaman - tarih.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export interface GunlukSayilar {
  /** Bugün çözülen soru sayısı */
  bugunCozulen: number;
  /** Şimdiye kadar en az bir kez çözülen farklı soru sayısı */
  cozulenSayisi: number;
}

function nesneMi(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

/**
 * Kalıcı depodan (zustand persist JSON'u) bugünkü sayıları okur. Boş, bozuk ya da eski veride sıfır döner.
 * Beklenen biçim: {"state": {"gunlukAktivite": {"2026-11-11": 12}, "cozulenSorular": {...}}}
 */
export function gunlukSayilarDepodan(depoMetni: string | null | undefined, simdi: number): GunlukSayilar {
  let durum: unknown = null;
  try {
    durum = depoMetni ? (JSON.parse(depoMetni) as { state?: unknown }).state : null;
  } catch {
    durum = null;
  }
  if (!nesneMi(durum)) return { bugunCozulen: 0, cozulenSayisi: 0 };

  const aktivite = nesneMi(durum.gunlukAktivite) ? durum.gunlukAktivite : {};
  const bugun = aktivite[gunAnahtari(simdi)];
  const bugunCozulen = typeof bugun === "number" && Number.isFinite(bugun) ? Math.max(0, Math.floor(bugun)) : 0;
  const cozulenSayisi = nesneMi(durum.cozulenSorular) ? Object.keys(durum.cozulenSorular).length : 0;
  return { bugunCozulen, cozulenSayisi };
}
