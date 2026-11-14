import React from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORE_ANAHTARI, WIDGET_ADI, widgetVerisiDepodan } from "./ortak";

/**
 * Ana ekran widget'ını uygulamadaki güncel veriyle yeniler (uygulama arka plana giderken çağrılır).
 * Widget eklenmemişse, modül yoksa (Expo Go) ya da bir hata olursa sessizce hiçbir şey yapmaz;
 * widget yalnızca yardımcı bir özelliktir ve uygulamanın akışını asla bozmamalıdır.
 * Kütüphane ve widget bileşeni bilerek burada (çağrı anında) yüklenir; böylece uygulama açılışında yüklenmezler.
 */
export async function widgetiGuncelle(): Promise<void> {
  if (Platform.OS !== "android") return;
  try {
    const { requestWidgetUpdate } = await import("react-native-android-widget");
    const { GunlukDurumWidget } = await import("./GunlukDurumWidget");
    const veri = widgetVerisiDepodan(await AsyncStorage.getItem(STORE_ANAHTARI), Date.now());
    await requestWidgetUpdate({
      widgetName: WIDGET_ADI,
      renderWidget: (bilgi) => <GunlukDurumWidget veri={veri} genislik={bilgi.width} yukseklik={bilgi.height} />,
      widgetNotFound: () => {},
    });
  } catch (e) {
    // widget güncellenemedi; uygulama etkilenmez ama iz kalsın
    console.warn("[widget] güncellenemedi:", String(e));
  }
}
