import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo, BrandTitle } from "@/components/AppLogo";
import { BrandAuroraBackground } from "@/components/BrandAuroraBackground";
import { Button } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import type { IconName } from "@/types";

const OZELLIKLER: { ikon: IconName; renk: string; baslik: string; metin: string }[] = [
  {
    ikon: "book",
    renk: "#3B82F6",
    baslik: "Konu Anlatımları",
    metin: "4 ders, sade anlatım ve görseller.",
  },
  {
    ikon: "clipboard",
    renk: "#10B981",
    baslik: "900+ Soru",
    metin: "Konu testleri ve açıklamalı cevaplar.",
  },
  {
    ikon: "ribbon",
    renk: "#6366F1",
    baslik: "Gerçek Prova",
    metin: "50 soru · 45 dk · MEB formatı.",
  },
  {
    ikon: "car-sport",
    renk: "#F59E0B",
    baslik: "Direksiyon",
    metin: "Park, rampa ve manevra videoları.",
  },
];

function DekorDaire({
  size,
  top,
  left,
  right,
  bottom,
  color,
}: {
  size: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color: string;
}) {
  return (
    <View
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        top,
        left,
        right,
        bottom,
      }}
    />
  );
}

export default function OnboardingScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();
  const onboardingiTamamla = useAppStore((s) => s.onboardingiTamamla);

  const basla = () => {
    onboardingiTamamla();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#030712" }}>
      <BrandAuroraBackground />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: spacing.xl, paddingBottom: spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: spacing.xxl,
            paddingHorizontal: spacing.lg,
            marginBottom: spacing.xl,
            borderRadius: radius.xl,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <DekorDaire size={140} top={-50} right={-40} color="rgba(99,102,241,0.15)" />
          <DekorDaire size={90} bottom={-30} left={-25} color="rgba(56,189,248,0.1)" />

          <AppLogo size="xl" variant="flat" />
          <View style={{ alignItems: "center", marginTop: spacing.lg, gap: spacing.sm }}>
            <BrandTitle />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: "rgba(99,102,241,0.2)",
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: "rgba(129,140,248,0.3)",
              }}
            >
              <Ionicons name="shield-checkmark" size={14} color="#C7D2FE" />
              <Text style={{ color: "#C7D2FE", fontSize: fontSize.xs, fontWeight: fontWeight.semibold }}>
                E-sınav & direksiyon hazırlık
              </Text>
            </View>
            <Text
              style={{
                color: "rgba(203,213,225,0.8)",
                fontSize: fontSize.md,
                textAlign: "center",
                lineHeight: 22,
                marginTop: spacing.xs,
                maxWidth: 300,
              }}
            >
              Sınavı ve direksiyonu tek uygulamada, adım adım hazırlan.
            </Text>
          </View>
        </View>

        {/* Özellikler — 2 sütun grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.xl }}>
          {OZELLIKLER.map((o) => (
            <View
              key={o.baslik}
              style={{
                width: "47%",
                flexGrow: 1,
                minWidth: 140,
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: spacing.md,
                gap: spacing.sm,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: o.renk + "18",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={o.ikon} size={22} color={o.renk} />
              </View>
              <Text style={{ color: colors.text, fontSize: fontSize.sm, fontWeight: fontWeight.bold }}>
                {o.baslik}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, lineHeight: 17 }}>
                {o.metin}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ gap: spacing.sm, marginTop: "auto" }}>
          <Button label="Hemen Başla" icon="rocket" size="lg" onPress={basla} />
          <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.lg }}>
            {[
              { ikon: "cloud-offline" as IconName, metin: "Çevrimdışı" },
              { ikon: "person-outline" as IconName, metin: "Kayıtsız" },
              { ikon: "gift-outline" as IconName, metin: "Ücretsiz" },
            ].map((b) => (
              <View key={b.metin} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons name={b.ikon} size={13} color={colors.textFaint} />
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>{b.metin}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
