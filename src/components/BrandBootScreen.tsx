import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { YEREL_ACILIS_LOGO_DP } from "@/utils/acilisLogosu";

const MARKA_ZEMIN = "#131313";
const SOLMA_MS = 260;

/**
 * Uygulamanın kendi açılış ekranı. Android'in açılış ekranındaki logoyla birebir aynı yerde ve boyutta
 * (YEREL_ACILIS_LOGO_DP) durur; ilk karede Android'in ekranı kapatılır, aynı logo altta durduğu için geçiş
 * görünmez. Logo uygulama açılana kadar sabit kalır (sahibin isteği: açılmadan hemen önce büyümesin).
 * Logonun kendi zemini yoktur (köşeleri saydam), arkası uygulamanın zemin rengidir.
 * Tema kullanmaz: açık temada bile beyaz parlama olmasın.
 */
export function BrandBootScreen() {
  return (
    <View
      style={styles.kok}
      // İlk kare çizildi: Android'in açılış ekranı kapanır, altında aynı logo durduğu için geçiş görünmez
      onLayout={() => SplashScreen.hideAsync().catch(() => {})}
    >
      <Image
        source={require("../../assets/icon-brand.png")}
        style={{ width: YEREL_ACILIS_LOGO_DP, height: YEREL_ACILIS_LOGO_DP }}
        resizeMode="contain"
        accessibilityLabel="Ehliyet Ustası"
      />
    </View>
  );
}

/**
 * Uygulama hazır olunca açılış ekranı ani kesilmesin: uygulamanın üstünde aynı ekran olarak durur ve solar.
 */
export function AcilisPerdesi({ onBitti }: { onBitti: () => void }) {
  const gorunurluk = useSharedValue(1);
  useEffect(() => {
    // Ekrana bağlanırken atanan Reanimated animasyonu bazen hiç başlamıyor (ManevraAnimasyonu); bir kare sonra
    const kare = requestAnimationFrame(() => {
      gorunurluk.value = withTiming(0, { duration: SOLMA_MS, easing: Easing.out(Easing.quad) }, (bitti) => {
        if (bitti) runOnJS(onBitti)();
      });
    });
    // Animasyon ne olursa olsun perde kalkar; uygulamanın üstünde asılı kalmasın
    const yedek = setTimeout(onBitti, SOLMA_MS + 600);
    return () => {
      cancelAnimationFrame(kare);
      clearTimeout(yedek);
    };
  }, [gorunurluk, onBitti]);
  const stil = useAnimatedStyle(() => ({ opacity: gorunurluk.value }));
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, stil]}>
      <BrandBootScreen />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  kok: {
    flex: 1,
    backgroundColor: MARKA_ZEMIN,
    alignItems: "center",
    justifyContent: "center",
  },
});
