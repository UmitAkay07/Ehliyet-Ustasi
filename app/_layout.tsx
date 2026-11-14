import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, View, LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { useHydration } from "@/store/useHydration";
import { tumBildirimleriKur } from "@/services/notifications";
import { widgetiGuncelle } from "@/widget/widgetiGuncelle";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AcilisPerdesi, BrandBootScreen } from "@/components/BrandBootScreen";
import { PuanIstegi } from "@/components/PuanIstegi";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

SplashScreen.preventAutoHideAsync().catch(() => {});
// Android açılış ekranı, altındaki aynı logolu kendi açılış ekranımıza yumuşak geçsin
SplashScreen.setOptions({ fade: true, duration: 200 });
LogBox.ignoreLogs(["expo-notifications: Android Push notifications"]);
SystemUI.setBackgroundColorAsync("#131313").catch(() => {});
/**
 * Uygulama hazır olduktan sonra marka ekranı en az bu kadar görünsün (logo bir anlık parlayıp kaybolmasın).
 * Android'in açılış ekranı JS yüklenirken zaten logoyu gösteriyor; sahibin isteğiyle 1600'den kısaltıldı.
 */
const SPLASH_MIN_MS = 600;
const BRAND_BG = "#131313";

function RootNavigator() {
  const { colors, scheme } = useTheme();
  const hydrated = useHydration();
  const onboardingTamam = useAppStore((s) => s.settings.onboardingTamam);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const router = useRouter();
  const segments = useSegments();
  const mountTime = useRef(Date.now());
  const [hazir, setHazir] = useState(false);
  const [perdeAcik, setPerdeAcik] = useState(true);
  const perdeyiKaldir = useCallback(() => setPerdeAcik(false), []);

  // Tema değiştiğinde sistem arkaplanını da güncelle (Light modda koyu flash önler)
  useEffect(() => {
    if (!hazir) {
      SystemUI.setBackgroundColorAsync(BRAND_BG).catch(() => {});
      return;
    }
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});
  }, [colors.background, hazir]);

  // Hydration bitince doğru rotaya git — hepsi native splash perdesinin altında olur
  useEffect(() => {
    if (!hydrated) return;
    const ilkSegment = segments[0];
    if (!onboardingTamam && ilkSegment !== "onboarding") {
      router.replace("/onboarding");
    } else if (onboardingTamam && ilkSegment === "onboarding") {
      router.replace("/(tabs)");
    }
  }, [hydrated, onboardingTamam, segments, router]);

  // Rota hazır olunca kısa bir marka anından sonra native splash'ı gizle
  useEffect(() => {
    if (!hydrated) return;
    const elapsed = Date.now() - mountTime.current;
    const remaining = Math.max(0, SPLASH_MIN_MS - elapsed);
    const t = setTimeout(() => {
      setHazir(true);
      SplashScreen.hideAsync().catch(() => {});
    }, remaining);
    return () => clearTimeout(t);
  }, [hydrated]);

  // İzin varsa yeniden planla; soğuk açılışta sistem diyaloğu açma (Apple 5.1.1)
  useEffect(() => {
    if (!hazir || !onboardingTamam) return;
    tumBildirimleriKur(sinavTarihi, { izinIste: false }).catch((e) => console.warn("[bildirim] kurulamadı:", String(e)));
  }, [hazir, onboardingTamam, sinavTarihi]);

  // Uygulama arka plana giderken widget'ı ve plan bildirimlerini güncel veriyle yenile (hata verirse uygulamayı etkilemez)
  useEffect(() => {
    const abone = AppState.addEventListener("change", (durum) => {
      if (durum !== "background") return;
      widgetiGuncelle().catch(() => {});
      const { settings } = useAppStore.getState();
      if (settings.onboardingTamam)
        tumBildirimleriKur(settings.sinavTarihi, { izinIste: false }).catch((e) =>
          console.warn("[bildirim] kurulamadı:", String(e))
        );
    });
    return () => abone.remove();
  }, []);

  // Expo Go native splash'i göstermez; JS yüklenene kadar / hazır olana kadar kendi marka ekranımız.
  if (!hazir) {
    return (
      <>
        <StatusBar style="light" />
        <BrandBootScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="konu/[id]" />
        <Stack.Screen name="test/[konuId]" />
        <Stack.Screen name="ders-test/[dersId]" />
        <Stack.Screen name="prova" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="prova-sonuc" />
        <Stack.Screen name="hatalar" />
        <Stack.Screen name="tekrar" />
        <Stack.Screen name="basarilar" />
        <Stack.Screen name="ara" />
        <Stack.Screen name="favoriler" />
        <Stack.Screen name="yol-haritasi" />
        <Stack.Screen name="direksiyon/[id]" />
        <Stack.Screen name="isaretler" />
        <Stack.Screen name="gunun-sorusu" />
        <Stack.Screen name="cezalar" />
        <Stack.Screen name="bilgi-bankasi" />
        <Stack.Screen name="pratik-sinav-simulasyonu" />
      </Stack>
      <PuanIstegi />
      {perdeAcik && <AcilisPerdesi onBitti={perdeyiKaldir} />}
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontHatasi] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontHatasi) console.warn("[font] Nunito yüklenemedi, sistem yazı tipiyle devam ediliyor:", String(fontHatasi));
  }, [fontHatasi]);

  // null dönme → sistem/Expo Go beyaz ekran gösterir. Font beklerken koyu marka ekranı.
  // Font yüklenemezse sistem yazı tipiyle devam edilir; yoksa açılış ekranında sonsuza dek kalınırdı.
  if (!fontsLoaded && !fontHatasi) {
    return (
      <View style={{ flex: 1, backgroundColor: BRAND_BG }}>
        <BrandBootScreen />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: BRAND_BG }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
