import React, { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, Card } from "@/components/ui";
import { SoruOzetKarti } from "@/components/SoruOzetKarti";
import { QuizRunner } from "@/components/QuizRunner";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { useTekrarDurumu } from "@/store/useTekrarDurumu";
import { soruBul } from "@/data/sorular";
import type { Soru } from "@/types";

function Ayirici() {
  const { spacing } = useTheme();
  return <View style={{ height: spacing.md }} />;
}

export default function HatalarScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const hatalar = useAppStore((s) => s.hatalar);
  const hataSil = useAppStore((s) => s.hataSil);
  const tekrarBekleyen = useTekrarDurumu().simdiIds.length;

  const [mod, setMod] = useState<"liste" | "coz">("liste");

  const hataSorulari: Soru[] = useMemo(
    () =>
      Object.values(hatalar)
        .map((h) => soruBul(h.soruId))
        .filter((s): s is Soru => Boolean(s)),
    [hatalar]
  );

  // Çözme modunu başlatırken anlık kopya al (çözerken liste değişmesin)
  const [cozmeSnapshot, setCozmeSnapshot] = useState<Soru[]>([]);

  if (mod === "coz") {
    return <QuizRunner sorular={cozmeSnapshot} baslik="Hatalarını Tekrar Et" altBaslik="Yanlış yaptığın sorular" />;
  }

  if (hataSorulari.length === 0) {
    return (
      <Screen>
        <ScreenHeader title="Hata Defteri" />
        <View style={{ flex: 1, justifyContent: "center", paddingBottom: spacing.xxxl, paddingHorizontal: spacing.lg, gap: spacing.md, alignItems: "center" }}>
          <Ionicons name="checkmark-done" size={40} color={colors.success} />
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            Hata defterin tertemiz!
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, textAlign: "center", lineHeight: 22 }}>
            Mükemmel gidiyorsun. Yanlış yaptığın sorular burada birikir ve sınavdan önce tekrar edebilirsin.
          </Text>
          <View style={{ width: "100%", marginTop: spacing.lg, gap: spacing.sm }}>
            {tekrarBekleyen > 0 ? (
              <Button
                label={`Bugünkü Tekrar (${tekrarBekleyen})`}
                icon="repeat"
                onPress={() => router.push("/tekrar")}
              />
            ) : null}
            <Button
              label="Test Çözmeye Başla"
              variant={tekrarBekleyen > 0 ? "secondary" : "primary"}
              onPress={() => router.push("/(tabs)/testler")}
            />
          </View>
        </View>
      </Screen>
    );
  }

  // Hata defteri yüzlerce soruya çıkabilir: kartlar ekrana yaklaştıkça çizilir
  return (
    <Screen
      scroll={false}
      padded={false}
      footer={
        <View
          style={{
            padding: spacing.lg,
            paddingTop: spacing.md,
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <Button
            label={`${hataSorulari.length} Yanlışı Tekrar Çöz`}
            icon="refresh"
            onPress={() => {
              setCozmeSnapshot([...hataSorulari]);
              setMod("coz");
            }}
          />
        </View>
      }
    >
      <FlatList
        data={hataSorulari}
        keyExtractor={(soru) => soru.id}
        ListHeaderComponent={
          <View style={{ gap: spacing.lg, paddingBottom: spacing.lg }}>
            <ScreenHeader title="Hata Defteri" subtitle={`${hataSorulari.length} soru`} />
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginBottom: spacing.sm }}>
              Doğru cevapladığında soru bu listeden çıkar. Unutmaman için yine de belirli aralıklarla tekrar sorulur. Çöp kutusu yalnızca listeden kaldırır, tekrar takvimi sürer.
            </Text>

            {tekrarBekleyen > 0 ? (
              <Card onPress={() => router.push("/tekrar")}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <Ionicons name="repeat" size={20} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                      Bugünkü tekrar: {tekrarBekleyen} soru
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                      Sırası gelen soruları unutmadan pekiştir
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
                </View>
              </Card>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <SoruOzetKarti
            soru={item}
            eylemIkon="trash-outline"
            eylemRenk={colors.textFaint}
            eylemEtiket="Bu soruyu hata defterinden kaldır"
            onEylem={hataSil}
            satirSayisi={3}
          />
        )}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        ItemSeparatorComponent={Ayirici}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={9}
        style={{ flex: 1 }}
      />
    </Screen>
  );
}
