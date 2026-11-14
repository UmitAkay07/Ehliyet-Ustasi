import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { konularByDers } from "@/data/konular";

export default function KonularScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ ders?: string }>();
  const [openId, setOpenId] = useState<string | null>(params.ders || null);

  const okunanKonular = useAppStore((s) => s.okunanKonular);

  React.useEffect(() => {
    if (params.ders) {
      setOpenId(params.ders);
    }
  }, [params.ders]);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xxl }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Ders Çalış
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
            Konuları öğren, sınava hazır ol
          </Text>
        </View>

        {DERSLER.map((ders, dersIndex) => {
          const isOpen = openId === ders.id;
          const konular = konularByDers(ders.id);
          const tamamlanan = konular.filter((k) => okunanKonular[k.id]).length;
          const toplam = konular.length;

          return (
            <View
              key={ders.id}
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.border,
                borderBottomWidth: dersIndex === DERSLER.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <Pressable
                onPress={() => setOpenId(isOpen ? null : ders.id)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  gap: spacing.md,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Ionicons name={ders.ikon} size={22} color={ders.renk} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                    {ders.ad}
                  </Text>
                  <Text style={{ color: colors.textFaint, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                    {tamamlanan}/{toplam} konu tamamlandı
                  </Text>
                </View>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.textFaint}
                />
              </Pressable>

              {isOpen && (
                <View style={{ paddingBottom: spacing.md }}>
                  {konular.map((konu) => {
                    const okundu = Boolean(okunanKonular[konu.id]);
                    return (
                      <Pressable
                        key={konu.id}
                        onPress={() => router.push(`/konu/${konu.id}`)}
                        style={({ pressed }) => ({
                          flexDirection: "row",
                          alignItems: "center",
                          gap: spacing.md,
                          paddingVertical: 12,
                          paddingLeft: spacing.lg,
                          opacity: pressed ? 0.6 : 1,
                        })}
                      >
                        <Ionicons
                          name={okundu ? "checkmark-circle" : "ellipse-outline"}
                          size={17}
                          color={okundu ? colors.success : colors.textFaint}
                        />
                        <Text
                          style={{
                            flex: 1,
                            color: okundu ? colors.textMuted : colors.text,
                            fontSize: fontSize.sm,
                            fontFamily: fontFamily.bold,
                          }}
                          numberOfLines={2}
                        >
                          {konu.baslik}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
