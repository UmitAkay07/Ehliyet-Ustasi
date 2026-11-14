import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, ProgressBar } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { YOL_ADIMLARI, YOL_HARITASI_ONAYLI, yolIlerlemesi } from "@/data/yolHaritasi";

export default function YolHaritasiScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const tamamlanan = useAppStore((s) => s.yolHaritasi);
  const adimDegistir = useAppStore((s) => s.yolAdimiDegistir);
  const ilerleme = yolIlerlemesi(tamamlanan);

  // İçerik doğrulanıp bayrak açılana kadar hiçbir adım gösterilmez (bkz. data/yolHaritasi.ts)
  if (!YOL_HARITASI_ONAYLI) {
    return (
      <Screen>
        <ScreenHeader title="Ehliyet Yol Haritası" />
        <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, lineHeight: 22 }}>
          Bu bölüm henüz yayında değil.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader title="Ehliyet Yol Haritası" subtitle="Başvurudan sürücü belgesine genel adımlar" />

      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
            {ilerleme.tamamlanan}/{ilerleme.toplam} adım tamamlandı
          </Text>
          {ilerleme.siradaki ? (
            <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.bold }} numberOfLines={1}>
              Sıradaki: {ilerleme.siradaki.baslik}
            </Text>
          ) : null}
        </View>
        <ProgressBar progress={ilerleme.oran} height={6} />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
          backgroundColor: colors.warningSoft,
          borderRadius: radius.md,
          padding: spacing.md,
        }}
      >
        <Ionicons name="information-circle" size={18} color={colors.warning} style={{ marginTop: 1 }} />
        <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, lineHeight: 20 }}>
          Bu genel bir rehberdir. Evrak, ücret, randevu ve sınav ayrıntıları değişebilir; güncel bilgiyi sürücü kursundan ve
          resmî kaynaklardan (MEB, e-Devlet) kontrol et.
        </Text>
      </View>

      <View>
        {YOL_ADIMLARI.map((adim, i) => {
          const bitti = Boolean(tamamlanan?.[adim.id]);
          return (
            <View
              key={adim.id}
              style={{
                flexDirection: "row",
                gap: spacing.md,
                paddingVertical: spacing.md,
                borderTopWidth: i === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Pressable
                onPress={() => adimDegistir(adim.id)}
                hitSlop={10}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: bitti }}
                accessibilityLabel={`${adim.baslik}${bitti ? ", tamamlandı" : ""}`}
              >
                <Ionicons
                  name={bitti ? "checkmark-circle" : "ellipse-outline"}
                  size={26}
                  color={bitti ? colors.success : colors.textFaint}
                />
              </Pressable>
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{
                    color: bitti ? colors.textMuted : colors.text,
                    fontSize: fontSize.md,
                    fontFamily: fontFamily.extrabold,
                    textDecorationLine: bitti ? "line-through" : "none",
                  }}
                >
                  {i + 1}. {adim.baslik}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>{adim.aciklama}</Text>
                {adim.rota ? (
                  <Pressable
                    onPress={() => router.push(adim.rota as never)}
                    accessibilityRole="button"
                    style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}
                  >
                    <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                      {adim.rotaEtiketi}
                    </Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                  </Pressable>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}
