import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Card } from "@/components/ui";
import { DireksiyonVideoOynatici } from "@/components/DireksiyonVideoOynatici";
import { useTheme } from "@/theme";
import { direksiyonBul } from "@/data/direksiyon";
import type { HataKriteri } from "@/types";

const hataRenkleri = {
  kirmizi: { renk: "#EF4444", ad: "Kırmızı Hata", aciklama: "Tek seferde sınavdan kalma sebebi" },
  sari: { renk: "#F59E0B", ad: "Sarı Hata", aciklama: "2 tanesi başarısızlık getirir" },
  mavi: { renk: "#3B82F6", ad: "Mavi Hata", aciklama: "5 tanesi başarısızlık getirir" },
};

export default function DireksiyonDetayScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const ders = direksiyonBul(id);

  if (!ders) {
    return (
      <Screen>
        <ScreenHeader title="Bulunamadı" />
      </Screen>
    );
  }

  const gruplananHatalar = ders.hatalar.reduce<Record<string, HataKriteri[]>>((acc, h) => {
    (acc[h.seviye] ||= []).push(h);
    return acc;
  }, {});

  return (
    <Screen>
      <ScreenHeader title={ders.baslik} subtitle="Direksiyon dersi" />

      <Card padded={false} style={{ padding: spacing.sm, backgroundColor: colors.surface }}>
        <DireksiyonVideoOynatici dersId={ders.id} animasyon={ders.animasyon} baslik={ders.baslik} />
      </Card>

      <Text style={{ color: colors.textMuted, fontSize: fontSize.md, lineHeight: 22 }}>{ders.ozet}</Text>

      {/* Adımlar */}
      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
        Adım Adım Uygulama
      </Text>
      <View style={{ gap: spacing.md }}>
        {ders.adimlar.map((adim, i) => (
          <View key={i} style={{ flexDirection: "row", gap: spacing.md }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.onPrimary, fontFamily: fontFamily.bold }}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.semibold }}>
                {adim.baslik}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 21 }}>
                {adim.aciklama}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* İpuçları */}
      <Card style={{ backgroundColor: colors.successSoft, borderColor: colors.success + "44" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md }}>
          <Ionicons name="bulb" size={20} color={colors.success} />
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
            İpuçları
          </Text>
        </View>
        <View style={{ gap: spacing.sm }}>
          {ders.ipuclari.map((ipucu, i) => (
            <View key={i} style={{ flexDirection: "row", gap: spacing.sm }}>
              <Ionicons name="star" size={16} color={colors.success} style={{ marginTop: 2 }} />
              <Text style={{ color: colors.text, fontSize: fontSize.sm, lineHeight: 21, flex: 1 }}>
                {ipucu}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Hata kriterleri */}
      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
        Sınavda Dikkat Edilecek Hatalar
      </Text>
      <View style={{ gap: spacing.md }}>
        {(["kirmizi", "sari", "mavi"] as const).map((seviye) => {
          const grup = gruplananHatalar[seviye];
          if (!grup || grup.length === 0) return null;
          const meta = hataRenkleri[seviye];
          return (
            <Card key={seviye} style={{ borderLeftWidth: 4, borderLeftColor: meta.renk }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: meta.renk }} />
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
                  {meta.ad}
                </Text>
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>· {meta.aciklama}</Text>
              </View>
              <View style={{ gap: 6 }}>
                {grup.map((h, i) => (
                  <View key={i} style={{ flexDirection: "row", gap: spacing.sm }}>
                    <Ionicons name="alert-circle" size={15} color={meta.renk} style={{ marginTop: 2 }} />
                    <Text style={{ color: colors.text, fontSize: fontSize.sm, lineHeight: 20, flex: 1 }}>
                      {h.metin}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
