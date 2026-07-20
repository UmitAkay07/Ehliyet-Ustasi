import React, { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { useHydration } from "@/store/useHydration";
import { sinavBildirimleriniKur } from "@/services/notifications";

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { colors, scheme } = useTheme();
  const hydrated = useHydration();
  const onboardingTamam = useAppStore((s) => s.settings.onboardingTamam);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (hydrated) SplashScreen.hideAsync().catch(() => {});
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const ilkSegment = segments[0];
    if (!onboardingTamam && ilkSegment !== "onboarding") {
      router.replace("/onboarding");
    } else if (onboardingTamam && ilkSegment === "onboarding") {
      router.replace("/(tabs)");
    }
  }, [hydrated, onboardingTamam, segments]);

  useEffect(() => {
    if (!hydrated || !onboardingTamam) return;
    sinavBildirimleriniKur(sinavTarihi).catch(() => {});
  }, [hydrated, onboardingTamam, sinavTarihi]);

  if (!hydrated) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
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
        <Stack.Screen name="direksiyon/[id]" />
        <Stack.Screen name="isaretler" />
        <Stack.Screen name="gunun-sorusu" />
        <Stack.Screen name="cezalar" />
        <Stack.Screen name="bilgi-bankasi" />
        <Stack.Screen name="sinav-rehberi" />
        <Stack.Screen name="senaryo-test" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
