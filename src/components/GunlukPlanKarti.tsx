import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ProgressBar } from "@/components/ui";
import { useTheme } from "@/theme";
import { useGunlukPlan } from "@/store/useGunlukPlan";
import type { PlanTipi } from "@/utils/gunlukPlan";
import type { IconName } from "@/types";

const TIP_IKONU: Record<PlanTipi, IconName> = {
  tekrar: "repeat",
  soru: "help-circle-outline",
  konu: "book-outline",
  prova: "clipboard-outline",
};

const ACILMA_MS = 280;

/** Ana ekrandaki "Bugünün planı": tek satırlık başlık, dokununca görevler aşağı doğru açılır */
export function GunlukPlanKarti() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const plan = useGunlukPlan();
  const [acik, setAcik] = useState(false);
  const acilma = useSharedValue(0);
  const icYukseklik = useSharedValue(0);

  const degistir = () => {
    const yeni = !acik;
    setAcik(yeni);
    acilma.value = withTiming(yeni ? 1 : 0, { duration: ACILMA_MS, easing: Easing.out(Easing.cubic) });
  };

  const kapStili = useAnimatedStyle(() => ({ height: icYukseklik.value * acilma.value, opacity: acilma.value }));
  const okStili = useAnimatedStyle(() => ({ transform: [{ rotate: `${acilma.value * 180}deg` }] }));

  const sinavGunu = plan.mod === "sinav-gunu";
  const hepsiTamam = plan.gorevler.length > 0 && plan.tamamlanan === plan.gorevler.length;
  const ozet = sinavGunu ? "Sınav günü" : hepsiTamam ? "Bugünlük tamam" : `${plan.tamamlanan}/${plan.gorevler.length}`;

  return (
    <View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
      <Pressable
        onPress={degistir}
        accessibilityRole="button"
        accessibilityState={{ expanded: acik }}
        accessibilityLabel={`Bugünün planı, ${ozet}. ${acik ? "Kapat" : "Aç"}`}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
          paddingVertical: 17,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Ionicons name="calendar-outline" size={19} color={colors.primary} />
        <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
          Bugünün planı
        </Text>
        <Text
          style={{
            color: hepsiTamam ? colors.success : colors.textMuted,
            fontSize: fontSize.sm,
            fontFamily: fontFamily.extrabold,
          }}
        >
          {ozet}
        </Text>
        <Animated.View style={okStili}>
          <Ionicons name="chevron-down" size={17} color={colors.textMuted} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[{ overflow: "hidden" }, kapStili]}>
        <View
          onLayout={(e) => {
            icYukseklik.value = e.nativeEvent.layout.height;
          }}
          accessibilityElementsHidden={!acik}
          importantForAccessibility={acik ? "auto" : "no-hide-descendants"}
          pointerEvents={acik ? "auto" : "none"}
          style={{ paddingBottom: spacing.sm }}
        >
          {sinavGunu ? (
            <View style={{ gap: 4, paddingBottom: spacing.sm }}>
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold }}>
                Bugün sınav günün
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 20 }}>
                Sakin ol, belgelerini ve kimliğini unutma. Başarılar!
              </Text>
            </View>
          ) : (
            plan.gorevler.map((g) => (
              <Pressable
                key={g.id}
                onPress={() => router.push(g.rota as never)}
                accessibilityRole="button"
                accessibilityLabel={`${g.baslik}, ${g.tamam ? "tamamlandı" : "yapılacak"}`}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  paddingVertical: spacing.md,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Ionicons
                  name={g.tamam ? "checkmark-circle" : TIP_IKONU[g.tip]}
                  size={22}
                  color={g.tamam ? colors.success : colors.primary}
                />
                <View style={{ flex: 1, gap: 3 }}>
                  <Text
                    style={{
                      color: g.tamam ? colors.textMuted : colors.text,
                      fontSize: fontSize.md,
                      fontFamily: fontFamily.bold,
                      textDecorationLine: g.tamam ? "line-through" : "none",
                    }}
                    numberOfLines={1}
                  >
                    {g.baslik}
                  </Text>
                  <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }} numberOfLines={1}>
                    {g.aciklama}
                  </Text>
                  {!g.tamam && g.hedef > 1 && g.yapilan > 0 ? <ProgressBar progress={g.ilerleme} height={3} /> : null}
                </View>
                {g.hedef > 1 ? (
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.extrabold }}>
                    {g.yapilan}/{g.hedef}
                  </Text>
                ) : null}
                <Ionicons name="chevron-forward" size={15} color={colors.textFaint} />
              </Pressable>
            ))
          )}
        </View>
      </Animated.View>
    </View>
  );
}
