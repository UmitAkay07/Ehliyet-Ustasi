import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { konularByDers } from "@/data/konular";

export default function KonularScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
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
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Ders Çalış
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 4 }}>
            Konuları öğren, sınava hazır ol
          </Text>
        </View>

        <View style={{ gap: spacing.md }}>
          {DERSLER.map((ders) => {
            const isOpen = openId === ders.id;
            const konular = konularByDers(ders.id);
            const tamamlanan = konular.filter((k) => okunanKonular[k.id]).length;
            const toplam = konular.length;

            return (
              <View
                key={ders.id}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radius["3xl"],
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Pressable
                  onPress={() => setOpenId(isOpen ? null : ders.id)}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    padding: spacing.lg,
                    gap: spacing.md,
                    backgroundColor: pressed ? "rgba(0,0,0,0.02)" : "transparent",
                  })}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: radius.xl,
                      backgroundColor: ders.renk + "22",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name={ders.ikon} size={24} color={ders.renk} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                      {ders.ad}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                      {tamamlanan}/{toplam} konu tamamlandı
                    </Text>
                  </View>
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={colors.textFaint}
                  />
                </Pressable>

                {isOpen && (
                  <View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
                    {konular.map((konu, index) => {
                      const okundu = Boolean(okunanKonular[konu.id]);
                      return (
                        <Pressable
                          key={konu.id}
                          onPress={() => router.push(`/konu/${konu.id}`)}
                          style={({ pressed }) => ({
                            flexDirection: "row",
                            alignItems: "center",
                            gap: spacing.md,
                            paddingVertical: 14,
                            paddingHorizontal: spacing.lg,
                            backgroundColor: pressed ? "rgba(0,0,0,0.02)" : "transparent",
                            borderTopWidth: index === 0 ? 0 : 1,
                            borderTopColor: colors.background, // Subtle separator
                          })}
                        >
                          <Ionicons
                            name={okundu ? "checkmark-circle" : "ellipse-outline"}
                            size={20}
                            color={okundu ? colors.success : colors.border}
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
                          {okundu && (
                            <View
                              style={{
                                backgroundColor: colors.successSoft,
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: radius.pill,
                              }}
                            >
                              <Text style={{ color: colors.success, fontSize: 10, fontFamily: fontFamily.extrabold }}>
                                Bitti
                              </Text>
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
