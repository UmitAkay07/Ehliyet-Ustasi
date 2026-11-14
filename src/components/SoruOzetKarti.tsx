import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge } from "@/components/ui";
import { useTheme } from "@/theme";
import { konuBul } from "@/data/konular";
import { dersBul } from "@/data/dersler";
import type { Soru } from "@/types";

interface Props {
  soru: Soru;
  /** Sağ üstteki düğme (hata defterinde çöp kutusu, favorilerde yıldız) */
  eylemIkon: React.ComponentProps<typeof Ionicons>["name"];
  eylemRenk: string;
  eylemBoyut?: number;
  eylemEtiket: string;
  onEylem: (soruId: string) => void;
  /** Soru metninin en fazla kaç satır görüneceği */
  satirSayisi: number;
}

/** Hata defteri ve favorilerdeki soru kartı: konu rozeti, soru, doğru cevap, konuya git */
export const SoruOzetKarti = memo(function SoruOzetKarti({
  soru,
  eylemIkon,
  eylemRenk,
  eylemBoyut = 18,
  eylemEtiket,
  onEylem,
  satirSayisi,
}: Props) {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const konu = konuBul(soru.konuId);
  const ders = dersBul(soru.dersId);
  return (
    <Card>
      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          {ders ? <Badge label={konu?.baslik ?? ders.kisaAd} color={ders.renk} bg={ders.renk + "22"} icon={ders.ikon} /> : <View />}
          <Pressable onPress={() => onEylem(soru.id)} hitSlop={12} accessibilityRole="button" accessibilityLabel={eylemEtiket}>
            <Ionicons name={eylemIkon} size={eylemBoyut} color={eylemRenk} />
          </Pressable>
        </View>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold, lineHeight: 22 }} numberOfLines={satirSayisi}>
          {soru.metin}
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm, backgroundColor: colors.successSoft, padding: spacing.sm, borderRadius: 10 }}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} style={{ marginTop: 1 }} />
          <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold, flex: 1 }}>
            Doğru cevap: {soru.secenekler[soru.dogruIndex]}
          </Text>
        </View>
        {konu ? (
          <Pressable onPress={() => router.push(`/konu/${konu.id}`)} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="book-outline" size={15} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>Konu anlatımını oku</Text>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
});
