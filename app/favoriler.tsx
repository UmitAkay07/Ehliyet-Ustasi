import React, { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button } from "@/components/ui";
import { SoruOzetKarti } from "@/components/SoruOzetKarti";
import { QuizRunner } from "@/components/QuizRunner";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { soruBul } from "@/data/sorular";
import type { Soru } from "@/types";

function Ayirici() {
  const { spacing } = useTheme();
  return <View style={{ height: spacing.md }} />;
}

export default function FavorilerScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const favoriler = useAppStore((s) => s.favoriler);
  const favoriDegistir = useAppStore((s) => s.favoriDegistir);

  const [mod, setMod] = useState<"liste" | "coz">("liste");
  // Çözerken liste değişmesin diye başlarken anlık kopya alınır
  const [oturum, setOturum] = useState<Soru[]>([]);

  // En son eklenen en üstte; verisi artık var olmayan sorular ayıklanır
  const sorular = useMemo(
    () =>
      Object.entries(favoriler ?? {})
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => soruBul(id))
        .filter((s): s is Soru => Boolean(s)),
    [favoriler]
  );

  if (mod === "coz") {
    return <QuizRunner sorular={oturum} baslik="Favori Sorularım" altBaslik="Seçtiğin sorular" />;
  }

  if (sorular.length === 0) {
    return (
      <Screen>
        <ScreenHeader title="Favori Sorularım" />
        <View style={{ flex: 1, justifyContent: "center", paddingBottom: spacing.xxxl, paddingHorizontal: spacing.lg, gap: spacing.md, alignItems: "center" }}>
          <Ionicons name="star-outline" size={40} color={colors.textFaint} />
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            Henüz favorin yok
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, textAlign: "center", lineHeight: 22 }}>
            Test çözerken zor ya da önemli bulduğun sorulardaki yıldıza dokun, burada toplansın.
          </Text>
          <View style={{ width: "100%", marginTop: spacing.lg }}>
            <Button label="Test Çözmeye Başla" onPress={() => router.push("/(tabs)/testler")} />
          </View>
        </View>
      </Screen>
    );
  }

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
            label={`${sorular.length} Favoriyi Çöz`}
            icon="star"
            onPress={() => {
              setOturum([...sorular]);
              setMod("coz");
            }}
          />
        </View>
      }
    >
      <FlatList
        data={sorular}
        keyExtractor={(soru) => soru.id}
        ListHeaderComponent={
          <View style={{ paddingBottom: spacing.lg }}>
            <ScreenHeader title="Favori Sorularım" subtitle={`${sorular.length} soru`} />
          </View>
        }
        renderItem={({ item }) => (
          <SoruOzetKarti
            soru={item}
            eylemIkon="star"
            eylemRenk={colors.warning}
            eylemBoyut={20}
            eylemEtiket="Favorilerden çıkar"
            onEylem={favoriDegistir}
            satirSayisi={4}
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
