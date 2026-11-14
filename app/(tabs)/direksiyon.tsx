import React from "react";
import { Pressable, Text, View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ManevraIcon } from "@/components/ManevraIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
import { DIREKSIYON_DERSLERI } from "@/data/direksiyon";

function zorlukRengi(zorluk: string, colors: any) {
  switch (zorluk) {
    case "kolay":
      return colors.success;
    case "orta":
      return colors.warning;
    case "zor":
      return colors.danger;
    default:
      return colors.textMuted;
  }
}

export default function DireksiyonScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      <FlatList
        data={DIREKSIYON_DERSLERI}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        windowSize={3}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <View>
            <View style={{ marginBottom: spacing.xxl }}>
              <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
                Direksiyon Sınavı
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
                Manevra animasyonlarını izle ve kuralları öğren.
              </Text>
            </View>

            {/* Hero: full simulation — dolu renk blok */}
            <Pressable
              onPress={() => router.push("/pratik-sinav-simulasyonu")}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
                backgroundColor: colors.success,
                borderRadius: 20,
                padding: spacing.lg,
                marginBottom: spacing.xl,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.14)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="play" size={22} color="#FFFFFF" style={{ marginLeft: 2 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#FFFFFF", fontSize: fontSize.lg, fontFamily: fontFamily.extrabold }}>
                  Tam Sınav Simülasyonu
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 2, opacity: 0.85 }}>
                  Sınav güzergahını baştan sona deneyimle
                </Text>
              </View>
            </Pressable>

            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginBottom: spacing.sm }}>
              Manevralar
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
        renderItem={({ item: manevra, index }) => {
          const rotasyon = [colors.primary, colors.success, colors.warning, colors.danger];
          const renk = rotasyon[index % rotasyon.length];
          return (
            <Pressable
              onPress={() => router.push(`/direksiyon/${manevra.id}`)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
                paddingVertical: spacing.md,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <View style={{ width: 52, height: 52, alignItems: "center", justifyContent: "center" }}>
                <ManevraIcon type={manevra.id} size={44} color={renk} animated={false} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                  {manevra.baslik}
                </Text>
                <Text style={{ color: colors.textFaint, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                  {manevra.ozet}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: zorlukRengi(manevra.zorluk, colors) + "22",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                }}
              >
                <Text style={{ color: zorlukRengi(manevra.zorluk, colors), fontSize: 11, fontFamily: fontFamily.extrabold }}>
                  {manevra.zorluk.charAt(0).toUpperCase() + manevra.zorluk.slice(1)}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
