import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import { DIREKSIYON_DERSLERI } from "@/data/direksiyon";

function getDifficultyColors(zorluk: string, colors: any) {
  switch (zorluk) {
    case "kolay":
      return { bg: colors.successSoft, text: colors.success };
    case "orta":
      return { bg: colors.warningSoft, text: colors.warning };
    case "zor":
      return { bg: colors.dangerSoft, text: colors.danger };
    default:
      return { bg: colors.surfaceAlt, text: colors.text };
  }
}

export default function DireksiyonScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Direksiyon Sınavı
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
            Manevra animasyonlarını izle ve kuralları öğren.
          </Text>
        </View>

        {/* Hero: Full simulation */}
        <Pressable
          onPress={() => router.push("/pratik-sinav-simulasyonu")}
          style={({ pressed }) => ({
            backgroundColor: colors.success,
            borderRadius: radius["3xl"],
            padding: spacing.xl,
            alignItems: "center",
            opacity: pressed ? 0.9 : 1,
            shadowColor: colors.success,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
          })}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: radius.pill,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.md,
            }}
          >
            <Ionicons name="play" size={40} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            Tam Sınav Simülasyonu
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.sm, fontFamily: fontFamily.semibold, textAlign: "center", marginTop: 4 }}>
            Sınav güzergahını baştan sona deneyimle
          </Text>
        </Pressable>

        {/* Maneuvers */}
        <View style={{ marginTop: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, marginBottom: spacing.md }}>
            Manevralar
          </Text>
          <View style={{ gap: spacing.sm }}>
            {DIREKSIYON_DERSLERI.map((manevra) => {
              const diffColors = getDifficultyColors(manevra.zorluk, colors);
              return (
                <Pressable
                  key={manevra.id}
                  onPress={() => router.push(`/direksiyon/${manevra.id}`)}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: radius["3xl"],
                    padding: spacing.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: radius.xl,
                      backgroundColor: colors.infoSoft,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name={manevra.ikon} size={24} color={colors.info} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                      {manevra.baslik}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                      {manevra.aciklama}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: diffColors.bg,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: radius.pill,
                    }}
                  >
                    <Text style={{ color: diffColors.text, fontSize: 12, fontFamily: fontFamily.extrabold }}>
                      {manevra.zorluk.charAt(0).toUpperCase() + manevra.zorluk.slice(1)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
