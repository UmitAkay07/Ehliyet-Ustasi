import React, { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Screen, ScreenHeader } from "@/components/ui";
import { IsaretGorseli } from "@/components/IsaretGorseli";
import { useTheme } from "@/theme";
import { ISARET_KATEGORILERI, TRAFIK_ISARETLERI } from "@/data/isaretler";
import { ISARET_IMAGE_ATTRIBUTION } from "@/data/isaretImageMap";
import type { IsaretKategori, TrafikIsareti } from "@/types";

export default function IsaretlerScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const [aktif, setAktif] = useState<IsaretKategori | "hepsi">("hepsi");
  const [arama, setArama] = useState("");

  const liste = useMemo(() => {
    const q = arama.trim().toLowerCase();
    return TRAFIK_ISARETLERI.filter((i) => {
      if (aktif !== "hepsi" && i.kategori !== aktif) return false;
      if (!q) return true;
      return (
        i.ad.toLowerCase().includes(q) ||
        i.anlam.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
      );
    });
  }, [aktif, arama]);

  const chip = (id: IsaretKategori | "hepsi", ad: string, renk: string) => {
    const secili = aktif === id;
    return (
      <Pressable
        key={id}
        onPress={() => setAktif(id)}
        style={{
          backgroundColor: secili ? renk : colors.surface,
          borderColor: secili ? renk : colors.border,
          borderWidth: 1,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.pill,
        }}
      >
        <Text
          style={{
            color: secili ? "#fff" : colors.text,
            fontSize: fontSize.sm,
            fontFamily: fontFamily.semibold,
          }}
        >
          {ad}
        </Text>
      </Pressable>
    );
  };

  const renderItem = ({ item: isaret }: { item: TrafikIsareti }) => (
    <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center", paddingVertical: spacing.sm }}>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: radius.md,
          backgroundColor: colors.surfaceAlt,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IsaretGorseli isaretId={isaret.id} kategori={isaret.kategori} boyut={40} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
          {isaret.ad}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
          {isaret.anlam}
        </Text>
      </View>
    </View>
  );

  return (
    <Screen scroll={false} padded={false}>
      <View style={{ padding: spacing.lg, paddingBottom: spacing.sm, gap: spacing.md }}>
        <ScreenHeader
          title="Trafik İşaretleri"
          subtitle={`${TRAFIK_ISARETLERI.length} levha · sınav önceliğine göre sıralı`}
        />
        <TextInput
          value={arama}
          onChangeText={setArama}
          placeholder="Levha ara (ör. yol ver, park, yaya)..."
          placeholderTextColor={colors.textFaint}
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            color: colors.text,
            fontSize: fontSize.md,
          }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}
        >
          {chip("hepsi", "Tümü", colors.primary)}
          {ISARET_KATEGORILERI.map((k) => chip(k.id, k.ad, k.renk))}
        </ScrollView>
      </View>

      <FlatList
        data={liste}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: 48,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
        ListEmptyComponent={
          <Text style={{ color: colors.textMuted, textAlign: "center", marginTop: spacing.xl }}>
            Sonuç bulunamadı.
          </Text>
        }
        ListFooterComponent={
          <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, lineHeight: 18, marginTop: spacing.md }}>
            {ISARET_IMAGE_ATTRIBUTION}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        maxToRenderPerBatch={16}
        windowSize={8}
      />
    </Screen>
  );
}
