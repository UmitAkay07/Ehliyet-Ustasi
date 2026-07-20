import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import type { IconName } from "@/types";

const OZELLIKLER: { ikon: IconName; renk: string; baslik: string; metin: string }[] = [
  {
    ikon: "book",
    renk: "#3B82F6",
    baslik: "Konu Anlatımları",
    metin: "4 dersin tüm konuları, sade ve anlaşılır anlatımlarla.",
  },
  {
    ikon: "clipboard",
    renk: "#10B981",
    baslik: "Geniş Soru Havuzu",
    metin: "Konu konu ayrılmış, açıklamalı testlerle pratik yap.",
  },
  {
    ikon: "ribbon",
    renk: "#6366F1",
    baslik: "Gerçek Sınav Provası",
    metin: "50 soru, 45 dakika, tam MEB formatında deneme sınavı.",
  },
  {
    ikon: "car-sport",
    renk: "#F59E0B",
    baslik: "Direksiyon Dersleri",
    metin: "Paralel park, L park ve daha fazlası 2D animasyonlarla.",
  },
];

export default function OnboardingScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();
  const onboardingiTamamla = useAppStore((s) => s.onboardingiTamamla);

  const basla = () => {
    onboardingiTamamla();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: spacing.xl, justifyContent: "space-between" }}>
        <View style={{ gap: spacing.xl, marginTop: spacing.xxl }}>
          <View style={{ alignItems: "center", gap: spacing.md }}>
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 26,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="car-sport" size={48} color="#fff" />
            </View>
            <Text style={{ color: colors.text, fontSize: fontSize.display, fontWeight: fontWeight.extrabold }}>
              Ehliyet Ustası
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.md, textAlign: "center" }}>
              E-sınav ve direksiyon için ihtiyacın olan her şey tek uygulamada.
            </Text>
          </View>

          <View style={{ gap: spacing.md }}>
            {OZELLIKLER.map((o) => (
              <View
                key={o.baslik}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  backgroundColor: colors.surface,
                  borderRadius: radius.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: spacing.lg,
                }}
              >
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    backgroundColor: o.renk + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={o.ikon} size={24} color={o.renk} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
                    {o.baslik}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 19 }}>
                    {o.metin}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Button label="Hemen Başla" icon="rocket" size="lg" onPress={basla} />
          <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, textAlign: "center" }}>
            Çevrimdışı çalışır · Kayıt gerekmez · Ücretsiz
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
