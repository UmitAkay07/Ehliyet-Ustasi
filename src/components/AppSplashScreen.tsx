import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AppLogo, BrandTitle } from "@/components/AppLogo";
import { BrandAuroraBackground } from "@/components/BrandAuroraBackground";

const TRACK_W = Dimensions.get("window").width - 96;

function ProgressBar() {
  const progress = useSharedValue(0.15);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(0.92, { duration: 1200, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0.15, { duration: 400, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      false
    );
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: progress.value * TRACK_W,
  }));

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, fillStyle]} />
    </View>
  );
}

type Props = { onReady?: () => void };

/**
 * Marka açılış ekranı.
 * İçerik baştan görünür (opacity 0 yok) — native blank splash ile aynı zeminde tek geçiş.
 */
export function AppSplashScreen({ onReady }: Props) {
  return (
    <View style={styles.root} onLayout={() => onReady?.()}>
      <StatusBar style="light" />
      <BrandAuroraBackground />

      <View style={styles.center}>
        <View style={styles.logoGlow} />
        <View style={styles.logoCard}>
          <AppLogo size="hero" variant="flat" />
        </View>

        <View style={styles.textBlock}>
          <BrandTitle large />
          <Text style={styles.tagline}>E-sınav · Direksiyon · 900+ Soru</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MEB uyumlu · Çevrimdışı</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <ProgressBar />
        <Text style={styles.loadingLabel}>Yükleniyor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#030712",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logoGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(99,102,241,0.18)",
  },
  logoCard: {
    padding: 12,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  textBlock: {
    alignItems: "center",
    marginTop: 28,
    gap: 10,
  },
  tagline: {
    color: "rgba(203,213,225,0.85)",
    fontSize: 15,
    fontWeight: "500",
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(99,102,241,0.2)",
    borderWidth: 1,
    borderColor: "rgba(129,140,248,0.35)",
  },
  badgeText: {
    color: "#C7D2FE",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    paddingBottom: 52,
    paddingHorizontal: 48,
    alignItems: "center",
    gap: 12,
  },
  progressTrack: {
    width: "100%",
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#818CF8",
  },
  loadingLabel: {
    color: "rgba(148,163,184,0.7)",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
