import { SORULAR } from "@/data/sorular";
import type { Soru } from "@/types";
import { bugunAnahtar } from "@/store/useAppStore";

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

/** YYYY-MM-DD veya null → kalan gün sayısı */
export function sinavGunKalan(sinavTarihi: string | null | undefined): number | null {
  if (!sinavTarihi) return null;
  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);
  const [y, m, d] = sinavTarihi.split("-").map(Number);
  if (!y || !m || !d) return null;
  const hedef = new Date(y, m - 1, d);
  return Math.round((hedef.getTime() - bugun.getTime()) / (1000 * 60 * 60 * 24));
}

export function tarihGoster(isoGun: string): string {
  const [y, m, d] = isoGun.split("-");
  return `${d}.${m}.${y}`;
}
