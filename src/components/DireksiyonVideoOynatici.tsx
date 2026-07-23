import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { ManevraAnimasyonu } from "@/animations/ManevraAnimasyonu";
import type { ManevraTipi } from "@/types";

interface Props {
  dersId: string;
  animasyon: ManevraTipi;
  baslik: string;
}

export function DireksiyonVideoOynatici({ animasyon }: Props) {
  const { colors, fontSize, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      <ManevraAnimasyonu tip={animasyon} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: spacing.sm }}>
        <Ionicons name="sparkles" size={14} color={colors.primary} />
        <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, flex: 1 }}>
          MB tasarrufu için etkileşimli vektörel animasyon kullanılıyor
        </Text>
      </View>
    </View>
  );
}
