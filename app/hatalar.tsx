import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, Card, Badge } from "@/components/ui";
import { QuizRunner } from "@/components/QuizRunner";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { soruBul } from "@/data/sorular";
import { konuBul } from "@/data/konular";
import { dersBul } from "@/data/dersler";
import type { Soru } from "@/types";

export default function HatalarScreen() {
  const { colors, fontSize, fontWeight, spacing } = useTheme();
  const router = useRouter();
  const hatalar = useAppStore((s) => s.hatalar);
  const hataSil = useAppStore((s) => s.hataSil);

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
        <Card style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.xxl }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.successSoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="checkmark-done" size={38} color={colors.success} />
          </View>
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.bold }}>
            Hata defterin tertemiz!
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, textAlign: "center" }}>
            Yanlış yaptığın sorular burada birikir ve konu açıklamasıyla birlikte tekrar çözebilirsin.
          </Text>
        </Card>
        <Button label="Test Çözmeye Başla" icon="clipboard" onPress={() => router.push("/(tabs)/testler")} />
      </Screen>
    );
  }

  return (
    <Screen
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
      <ScreenHeader title="Hata Defteri" subtitle={`${hataSorulari.length} soru`} />
      <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
        Doğru cevapladığında soru bu listeden otomatik çıkar.
      </Text>

      <View style={{ gap: spacing.md }}>
        {hataSorulari.map((soru) => {
          const konu = konuBul(soru.konuId);
          const ders = dersBul(soru.dersId);
          return (
            <Card key={soru.id}>
              <View style={{ gap: spacing.sm }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {ders && (
                    <Badge label={konu?.baslik ?? ders.kisaAd} color={ders.renk} bg={ders.renk + "22"} icon={ders.ikon} />
                  )}
                  <Pressable onPress={() => hataSil(soru.id)} hitSlop={8}>
                    <Ionicons name="trash-outline" size={18} color={colors.textFaint} />
                  </Pressable>
                </View>
                <Text style={{ color: colors.text, fontSize: fontSize.md, lineHeight: 22 }} numberOfLines={3}>
                  {soru.metin}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: spacing.sm,
                    backgroundColor: colors.successSoft,
                    padding: spacing.sm,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} style={{ marginTop: 1 }} />
                  <Text style={{ color: colors.text, fontSize: fontSize.sm, flex: 1 }}>
                    Doğru cevap: {soru.secenekler[soru.dogruIndex]}
                  </Text>
                </View>
                {konu && (
                  <Pressable
                    onPress={() => router.push(`/konu/${konu.id}`)}
                    style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                  >
                    <Ionicons name="book-outline" size={15} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }}>
                      Konu anlatımını oku
                    </Text>
                  </Pressable>
                )}
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
