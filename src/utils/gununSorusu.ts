import { SORULAR } from "@/data/sorular";
import type { Soru } from "@/types";
import { bugunAnahtar } from "@/store/useAppStore";
import { kalanGunHesapla } from "@/utils/tekrar";

/** Gün bazlı deterministik soru seçimi (aynı gün aynı soru) */
export function gununSorusunuAl(tarih = new Date()): Soru {
  const anahtar = bugunAnahtar(tarih);
  let hash = 0;
  for (let i = 0; i < anahtar.length; i++) {
    hash = (hash * 31 + anahtar.charCodeAt(i)) >>> 0;
  }
  const index = SORULAR.length ? hash % SORULAR.length : 0;
  return SORULAR[index];
}

/** YYYY-MM-DD veya null → kalan gün sayısı (hesap utils/tekrar.ts ile ortaktır) */
export function sinavGunKalan(sinavTarihi: string | null | undefined): number | null {
  return kalanGunHesapla(sinavTarihi, Date.now());
}

export function tarihGoster(isoGun: string): string {
  if (!isoGun) return "Belirlenmedi";
  try {
    const parts = isoGun.split("T")[0].split("-");
    if (parts.length < 3) return "Belirlenmedi";
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(date.getTime())) return "Belirlenmedi";
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return "Belirlenmedi";
  }
}
