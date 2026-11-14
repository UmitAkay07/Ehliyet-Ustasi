// Uygulama giriş noktası: Expo Router'ı başlatır ve Android ana ekran widget'ının görev işleyicisini kaydeder.
import "expo-router/entry";
import { Platform } from "react-native";

// Widget yalnızca yardımcı bir özelliktir: kaydı başarısız olursa bile uygulama açılmalıdır.
// Bu yüzden kütüphane yalnızca Android'de ve hata yakalanarak yüklenir.
if (Platform.OS === "android") {
  try {
    const { registerWidgetTaskHandler } = require("react-native-android-widget");
    const { widgetTaskHandler } = require("./src/widget/widgetTaskHandler");
    registerWidgetTaskHandler(widgetTaskHandler);
  } catch (hata) {
    console.warn("Widget görev işleyicisi kaydedilemedi", hata);
  }
}
