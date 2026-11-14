/**
 * Kayıtlı (AsyncStorage) durumu güvenle ayıklar (saf, testli: scripts/test-depo-dogrula.mjs).
 *
 * Kayıtta bir alanın türü bozuksa (ör. `cozulenSorular: null`, `provaGecmisi: {}`) o alan varsayılana
 * döner; diğer alanlar korunur. Böylece bozuk tek bir alan uygulamayı her açılışta çökertmez.
 */

export type AlanTuru = "nesne" | "dizi" | "mantiksal" | "nesneVeyaNull";

export function nesneMi(deger: unknown): deger is Record<string, unknown> {
  return typeof deger === "object" && deger !== null && !Array.isArray(deger);
}

function uygunMu(deger: unknown, tur: AlanTuru): boolean {
  switch (tur) {
    case "nesne":
      return nesneMi(deger);
    case "dizi":
      return Array.isArray(deger);
    case "mantiksal":
      return typeof deger === "boolean";
    case "nesneVeyaNull":
      return deger === null || nesneMi(deger);
  }
}

export interface AyiklamaSonucu {
  /** Türü doğru olan alanlar */
  gecerli: Record<string, unknown>;
  /** Türü bozuk olduğu için atılan alanların adları ("(tamamı)": kayıt nesne değil) */
  atilan: string[];
}

/** Şemadaki alanlardan türü uyanları alır; şemada olmayan alanlar yok sayılır */
export function kayitliDurumuAyikla(kayitli: unknown, sema: Record<string, AlanTuru>): AyiklamaSonucu {
  const gecerli: Record<string, unknown> = {};
  const atilan: string[] = [];
  if (kayitli === null || kayitli === undefined) return { gecerli, atilan };
  if (!nesneMi(kayitli)) return { gecerli, atilan: ["(tamamı)"] };
  for (const [alan, tur] of Object.entries(sema)) {
    if (!(alan in kayitli)) continue;
    if (uygunMu(kayitli[alan], tur)) gecerli[alan] = kayitli[alan];
    else atilan.push(alan);
  }
  return { gecerli, atilan };
}
