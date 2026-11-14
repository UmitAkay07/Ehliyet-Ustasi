import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { GunlukDurumWidget } from "./GunlukDurumWidget";
import { STORE_ANAHTARI, WIDGET_ADI, widgetVerisiDepodan } from "./ortak";

async function depoOku(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORE_ANAHTARI);
  } catch {
    return null;
  }
}

/**
 * Widget olayları (eklendi, güncelleme, yeniden boyutlandı). Uygulama kapalıyken de çalışır.
 * Hata olsa bile widget boş kalmasın diye veri okunamazsa sıfır değerlerle çizilir.
 * Her çizimde widget'ın o anki boyutu kullanılır; düzen ve yazı boyutları ona göre seçilir.
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps): Promise<void> {
  if (props.widgetInfo.widgetName !== WIDGET_ADI) return;

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED": {
      let veri = widgetVerisiDepodan(null, Date.now());
      try {
        veri = widgetVerisiDepodan(await depoOku(), Date.now());
      } catch (e) {
        // Kayıt okunamadı ya da çözülemedi: widget boş kalmasın, sıfır değerlerle çizilir
        console.warn("[widget] veri okunamadı:", String(e));
      }
      props.renderWidget(
        <GunlukDurumWidget veri={veri} genislik={props.widgetInfo.width} yukseklik={props.widgetInfo.height} />
      );
      break;
    }
    default:
      break;
  }
}
