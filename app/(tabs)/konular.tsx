import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Badge } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { konularByDers } from "@/data/konular";
import { konuIstatistigi } from "@/utils/progress";
import { KONU_KAPAK_RESIMLERI } from "@/data/konuKapakResimleri";
import type { DersId } from "@/types";

export default function KonularScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ ders?: string }>();
  const [aktifDers, setAktifDers] = useState<DersId>((params.ders as DersId) || "trafik");

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);

  const konular = konularByDers(aktifDers);
  const ders = DERSLER.find((d) => d.id === aktifDers)!;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: spacing.md }}>
        <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
          Konu Anlatımları
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}
        >
          {DERSLER.map((d) => {
            const aktif = d.id === aktifDers;
            return (
              <Pressable
                key={d.id}
                onPress={() => setAktifDers(d.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: aktif ? d.renk : colors.surface,
                  borderColor: aktif ? d.renk : colors.border,
                  borderWidth: 1,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: radius.pill,
                }}
              >
                <Ionicons name={d.ikon} size={16} color={aktif ? "#fff" : d.renk} />
                <Text
                  style={{
                    color: aktif ? "#fff" : colors.text,
                    fontSize: fontSize.sm,
                    fontWeight: fontWeight.semibold,
                  }}
                >
                  {d.kisaAd}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>{ders.aciklama}</Text>
        {konular.map((konu) => {
          const okundu = Boolean(okunanKonular[konu.id]);
          const ist = konuIstatistigi(konu.id, cozulenSorular);
          return (
            <Card key={konu.id} onPress={() => router.push(`/konu/${konu.id}`)}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: ders.renk + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={konu.ikon} size={22} color={ders.renk} />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold }}
                    numberOfLines={2}
                  >
                    {konu.baslik}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flexWrap: "wrap" }}>
                    <Ionicons name="time-outline" size={13} color={colors.textFaint} />
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
                      {konu.okumaSuresiDk} dk · {ist.toplamSoru} soru
                    </Text>
                    {konu.kapakGorsel || KONU_KAPAK_RESIMLERI[konu.id] ? (
                      <Text style={{ color: colors.info, fontSize: fontSize.xs }}>görselli</Text>
                    ) : null}
                  </View>
                </View>
                {okundu ? (
                  <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                ) : (
                  <Ionicons name="chevron-forward" size={22} color={colors.textFaint} />
                )}
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
