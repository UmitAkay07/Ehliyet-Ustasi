import { SORULAR } from "@/data/sorular";
import { kalanOzetiDepodan } from "@/utils/tekrar";
import { gunlukSoruHedefi } from "@/utils/gunlukPlan";
import { gunlukSayilarDepodan } from "@/utils/widgetDuzeni";

/** zustand persist'in AsyncStorage anahtarı (src/store/useAppStore.ts ile aynı olmalı) */
export const STORE_ANAHTARI = "ehliyet-ustasi-store-v1";

/** app.json içindeki widget adıyla aynı olmalı */
export const WIDGET_ADI = "GunlukDurum";

let gecerliKimlikler: Set<string> | null = null;

/** Verisi hâlâ var olan sorular (silinmiş kimlikler sayıma girmesin) */
export function gecerliSoru(soruId: string): boolean {
  gecerliKimlikler ??= new Set(SORULAR.map((s) => s.id));
  return gecerliKimlikler.has(soruId);
}

export interface WidgetVerisi {
  /** Sınava kalan gün (tarih seçilmediyse null) */
  kalanGun: number | null;
  /** Şu an tekrar sırası gelen soru sayısı */
  tekrarSayisi: number;
  /** Bugün çözülen soru sayısı */
  bugunCozulen: number;
  /** Bugünkü soru hedefi (ana sayfadaki "Bugünün planı" ile aynı hesap) */
  gunlukHedef: number;
}

export function widgetVerisiDepodan(depoMetni: string | null, simdi: number): WidgetVerisi {
  const { kalanGun, tekrarSayisi } = kalanOzetiDepodan(depoMetni, simdi, gecerliSoru);
  const { bugunCozulen, cozulenSayisi } = gunlukSayilarDepodan(depoMetni, simdi);
  const gunlukHedef = gunlukSoruHedefi(Math.max(0, SORULAR.length - cozulenSayisi), kalanGun);
  return { kalanGun, tekrarSayisi, bugunCozulen, gunlukHedef };
}
