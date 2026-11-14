import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import type { IconName } from "@/types";

const OZELLIKLER: { ikon: IconName; baslik: string; altBaslik: string }[] = [
  { ikon: "book-outline", baslik: "32 Konu", altBaslik: "Sade anlatım" },
  { ikon: "help-circle-outline", baslik: "595 Soru", altBaslik: "Gerçek havuz" },
  { ikon: "car-sport-outline", baslik: "9 Ders", altBaslik: "İnteraktif direksiyon" },
  { ikon: "checkmark-done-outline", baslik: "Prova Sınavı", altBaslik: "MEB formatında" },
];

export default function OnboardingScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const onboardingiTamamla = useAppStore((s) => s.onboardingiTamamla);

  const basla = () => {
    onboardingiTamamla();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: spacing.xl, paddingTop: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.textFaint,
            fontSize: 12,
            fontFamily: fontFamily.extrabold,
            letterSpacing: 3,
            marginBottom: spacing.xxxl + spacing.md,
          }}
        >
          EHLİYET USTASI
        </Text>

        <View style={{ gap: spacing.md, marginBottom: spacing.xxl }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 34,
              fontFamily: fontFamily.extrabold,
              lineHeight: 40,
              letterSpacing: -0.5,
            }}
          >
            Direksiyona{"\n"}özgüvenle otur.
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: fontSize.md,
              lineHeight: 22,
              maxWidth: 300,
            }}
          >
            595 soruluk gerçek soru havuzu, MEB formatında prova sınavları ve interaktif
            direksiyon dersleriyle sınava tam hazırlan.
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {OZELLIKLER.map((o, i) => {
            const rotasyon = [colors.primary, colors.success, colors.warning, colors.danger];
            const renk = rotasyon[i % rotasyon.length];
            return (
              <View
                key={o.baslik}
                style={{
                  flexBasis: "47%",
                  flexGrow: 1,
                  backgroundColor: renk,
                  borderRadius: radius.xl,
                  padding: spacing.lg,
                  minHeight: 108,
                  justifyContent: "space-between",
                }}
              >
                <Ionicons name={o.ikon} size={22} color="#FFFFFF" />
                <View>
                  <Text style={{ color: "#FFFFFF", fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                    {o.baslik}
                  </Text>
                  <Text style={{ color: "#FFFFFF", fontSize: fontSize.xs, fontFamily: fontFamily.bold, opacity: 0.85, marginTop: 1 }}>
                    {o.altBaslik}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ flex: 1, minHeight: spacing.xxl }} />

        <View style={{ gap: spacing.lg }}>
          <Button label="Hemen Başla" size="lg" icon="rocket-outline" onPress={basla} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>Çevrimdışı çalışır</Text>
            <Text style={{ color: colors.border, fontSize: fontSize.xs }}>·</Text>
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>Kayıt gerekmez</Text>
            <Text style={{ color: colors.border, fontSize: fontSize.xs }}>·</Text>
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>Ücretsiz</Text>
          </View>
          <Text style={{ color: colors.textFaint, fontSize: 10, textAlign: "center", marginTop: spacing.sm }}>
            Bu uygulama resmi bir devlet kurumu (MEB vb.) uygulaması değildir.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
