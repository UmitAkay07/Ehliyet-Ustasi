import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button } from "@/components/ui";
import { useTheme } from "@/theme";

/** Bilinmeyen bir bağlantı açılınca (ör. ehliyetustasi://olmayan) İngilizce varsayılan ekran yerine */
export default function BulunamadiScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <ScreenHeader title="Sayfa bulunamadı" />
      <View style={{ alignItems: "center", gap: spacing.md, paddingTop: spacing.xxl }}>
        <Ionicons name="compass-outline" size={48} color={colors.textMuted} />
        <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold, textAlign: "center" }}>
          Aradığın sayfa burada değil
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, textAlign: "center" }}>
          Bağlantı eski ya da hatalı olabilir.
        </Text>
        <View style={{ alignSelf: "stretch", marginTop: spacing.md }}>
          <Button label="Ana sayfaya dön" icon="home" onPress={() => router.replace("/(tabs)")} />
        </View>
      </View>
    </Screen>
  );
}
