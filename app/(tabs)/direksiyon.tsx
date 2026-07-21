import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, Card, Badge } from "@/components/ui";
import { useTheme } from "@/theme";
import { DIREKSIYON_DERSLERI } from "@/data/direksiyon";
import type { Zorluk } from "@/types";

const zorlukRenk: Record<Zorluk, string> = {
  kolay: "#22C55E",
  orta: "#F59E0B",
  zor: "#EF4444",
};
const zorlukAd: Record<Zorluk, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" };

export default function DireksiyonScreen() {
  const { colors, fontSize, fontWeight, spacing } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <View>
        <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
          Direksiyon Dersleri
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginTop: 4 }}>
          Her manevra için adım adım anlatım ve 2D kuş bakışı animasyon.
        </Text>
      </View>

      <Card elevated onPress={() => router.push("/pratik-sinav-simulasyonu")} style={{ backgroundColor: colors.primarySoft }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="play-circle" size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.primary, fontSize: fontSize.md, fontWeight: fontWeight.extrabold }}>
              Tam Sınav Simülasyonu
            </Text>
            <Text style={{ color: colors.text, fontSize: fontSize.xs, marginTop: 2 }}>
              Hızlandırılmış sınav videosu ve sesli anlatım
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </View>
      </Card>

      <View style={{ gap: spacing.md }}>
        {DIREKSIYON_DERSLERI.map((ders) => (
          <Card key={ders.id} onPress={() => router.push(`/direksiyon/${ders.id}`)}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 15,
                  backgroundColor: colors.primarySoft,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={ders.ikon} size={26} color={colors.primary} />
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
                  {ders.baslik}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, lineHeight: 18 }} numberOfLines={2}>
                  {ders.ozet}
                </Text>
                <Badge
                  label={zorlukAd[ders.zorluk]}
                  color={zorlukRenk[ders.zorluk]}
                  bg={zorlukRenk[ders.zorluk] + "22"}
                  icon="speedometer"
                />
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textFaint} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
