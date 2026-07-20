import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, Card, Badge, SectionTitle, ProgressRing } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { sorularByDers } from "@/data/sorular";

export default function TestlerScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const sonProva = provaGecmisi[0];

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
        Testler
      </Text>

      {/* Sınav provası büyük kart */}
      <Pressable onPress={() => router.push("/prova")}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.xl,
            padding: spacing.xl,
            overflow: "hidden",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1, gap: spacing.sm }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                }}
              >
                <Ionicons name="ribbon" size={14} color="#fff" />
                <Text style={{ color: "#fff", fontSize: fontSize.xs, fontWeight: fontWeight.bold }}>
                  GERÇEK SINAV FORMATI
                </Text>
              </View>
              <Text style={{ color: "#fff", fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
                Sınav Provası
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.sm, lineHeight: 20 }}>
                50 soru · 45 dakika · 70 puan barajı{"\n"}Trafik 23 · İlk Yardım 12 · Motor 9 · Adab 6
              </Text>
            </View>
            <Ionicons name="timer-outline" size={40} color="rgba(255,255,255,0.9)" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: "#fff",
              borderRadius: radius.md,
              paddingVertical: spacing.md,
              marginTop: spacing.lg,
            }}
          >
            <Ionicons name="play" size={18} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
              Provaya Başla
            </Text>
          </View>
        </View>
      </Pressable>

      {sonProva && (
        <Card onPress={() => router.push("/(tabs)/profil")}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.lg }}>
            <ProgressRing
              progress={sonProva.puan / 100}
              size={64}
              strokeWidth={7}
              label={`${sonProva.puan}`}
              color={sonProva.gecti ? colors.success : colors.danger}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: fontWeight.semibold, fontSize: fontSize.md }}>
                Son Prova Sonucun
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                {sonProva.dogru} doğru · {sonProva.yanlis} yanlış · {sonProva.bos} boş
              </Text>
              <Badge
                label={sonProva.gecti ? "Geçtin" : "Kaldın"}
                color={sonProva.gecti ? colors.success : colors.danger}
                bg={sonProva.gecti ? colors.successSoft : colors.dangerSoft}
                icon={sonProva.gecti ? "checkmark-circle" : "close-circle"}
              />
            </View>
          </View>
        </Card>
      )}

      <Card onPress={() => router.push("/senaryo-test")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: colors.info + "22",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="film" size={24} color={colors.info} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold }}>
              Senaryo Testi
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
              Animasyonlu kavşak, sollama, yaya ve park soruları
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.textFaint} />
        </View>
      </Card>

      <SectionTitle title="Derse Göre Karışık Test" />
      <View style={{ gap: spacing.md }}>
        {DERSLER.map((ders) => (
          <Card key={ders.id} onPress={() => router.push(`/ders-test/${ders.id}`)}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  backgroundColor: ders.renk + "22",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={ders.ikon} size={24} color={ders.renk} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold }}>
                  {ders.ad}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
                  {sorularByDers(ders.id).length} soru havuzundan rastgele
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textFaint} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
