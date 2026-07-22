import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { sorularByDers } from "@/data/sorular";

export default function TestlerScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const sonProva = provaGecmisi[0];

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Test Çöz
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
            Pratik yap, kendini dene
          </Text>
        </View>

        {/* Hero: Full mock exam */}
        <Pressable
          onPress={() => router.push("/prova")}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: radius["3xl"],
            padding: spacing.xl,
            opacity: pressed ? 0.9 : 1,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
          })}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.md }}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill }}>
              <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: fontFamily.extrabold }}>
                50 Soru
              </Text>
            </View>
            <View style={{ backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill }}>
              <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: fontFamily.extrabold }}>
                45 Dakika
              </Text>
            </View>
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Gerçek Sınav Provası
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
            Gerçek sınav formatında kendini test et. 70 puan ve üzeri geçer!
          </Text>
          <View
            style={{
              marginTop: spacing.lg,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: colors.surface,
              paddingVertical: 14,
              borderRadius: radius.pill,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name="play" size={20} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 16, fontFamily: fontFamily.extrabold }}>
              Başla
            </Text>
          </View>
        </Pressable>

        {/* Last result */}
        {sonProva && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              backgroundColor: colors.surface,
              borderRadius: radius["3xl"],
              padding: spacing.lg,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: radius.xl,
                backgroundColor: sonProva.gecti ? colors.successSoft : colors.dangerSoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="trophy" size={24} color={sonProva.gecti ? colors.success : colors.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                Sonucun: {sonProva.puan} Puan
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                {sonProva.dogru}D {sonProva.yanlis}Y {sonProva.bos}B
              </Text>
            </View>
            <View
              style={{
                backgroundColor: sonProva.gecti ? colors.successSoft : colors.dangerSoft,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: radius.pill,
              }}
            >
              <Text
                style={{
                  color: sonProva.gecti ? colors.success : colors.danger,
                  fontSize: 12,
                  fontFamily: fontFamily.extrabold,
                }}
              >
                {sonProva.gecti ? "Geçtin!" : "Kaldın"}
              </Text>
            </View>
          </View>
        )}

        {/* Scenario tests */}
        <Pressable
          onPress={() => router.push("/senaryo-test")}
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
              backgroundColor: colors.warningSoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="film" size={24} color={colors.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
              Senaryo Testi
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
              Animasyonlu trafik senaryolarını çöz
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
        </Pressable>

        {/* Category quizzes */}
        <View>
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, marginBottom: spacing.md }}>
            Konu Testleri
          </Text>
          <View style={{ gap: spacing.sm }}>
            {DERSLER.map((ders) => (
              <Pressable
                key={ders.id}
                onPress={() => router.push(`/ders-test/${ders.id}`)}
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
                    backgroundColor: ders.renk + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={ders.ikon} size={24} color={ders.renk} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                    {ders.ad}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                    {sorularByDers(ders.id).length} soru havuzundan rastgele
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
