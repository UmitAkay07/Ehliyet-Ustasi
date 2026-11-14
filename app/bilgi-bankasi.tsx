import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader } from "@/components/ui";
import { useTheme } from "@/theme";
import { EHLIYET_SINIFLARI, HIZ_SINIRLARI, PLAKA_LISTESI } from "@/data/bilgiBankasi";
import type { IconName } from "@/types";

type Sekme = "siniflar" | "hiz" | "plaka";

export default function BilgiBankasiScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const [sekme, setSekme] = useState<Sekme>("siniflar");
  const [plakaArama, setPlakaArama] = useState("");

  const plakalar = useMemo(() => {
    const q = plakaArama.trim().toLocaleLowerCase("tr");
    if (!q) return PLAKA_LISTESI;
    return PLAKA_LISTESI.filter(
      (p) => p.il.toLocaleLowerCase("tr").includes(q) || p.kod.includes(q)
    );
  }, [plakaArama]);

  const sekmeler: { id: Sekme; ad: string; ikon: IconName }[] = [
    { id: "siniflar", ad: "Sınıflar", ikon: "card" },
    { id: "hiz", ad: "Hız", ikon: "speedometer" },
    { id: "plaka", ad: "Plaka", ikon: "map" },
  ];

  return (
    <Screen>
      <ScreenHeader title="Bilgi Bankası" subtitle="Sınıf · hız · plaka" />

      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {sekmeler.map((s) => {
          const aktif = sekme === s.id;
          return (
            <Pressable
              key={s.id}
              onPress={() => setSekme(s.id)}
              style={{
                flex: 1,
                alignItems: "center",
                gap: 4,
                paddingVertical: spacing.md,
                borderRadius: radius.lg,
                backgroundColor: aktif ? colors.primarySoft : colors.surface,
                borderWidth: 1.5,
                borderColor: aktif ? colors.primary : colors.border,
              }}
            >
              <Ionicons name={s.ikon} size={18} color={aktif ? colors.primary : colors.textMuted} />
              <Text
                style={{
                  color: aktif ? colors.primary : colors.textMuted,
                  fontSize: fontSize.xs,
                  fontFamily: fontFamily.semibold,
                }}
              >
                {s.ad}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {sekme === "siniflar" && (
        <View style={{ gap: spacing.lg }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
            Yaş ve şartlar dönemsel yönetmeliğe göre değişebilir. Kursunda doğrula.
          </Text>
          <View>
            {EHLIYET_SINIFLARI.map((s, i) => (
              <View
                key={s.kod}
                style={{
                  flexDirection: "row",
                  gap: spacing.md,
                  alignItems: "center",
                  paddingVertical: spacing.md,
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.primary, fontFamily: fontFamily.extrabold, fontSize: fontSize.lg, width: 44 }}>
                  {s.kod}
                </Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
                    {s.ad}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>{s.aciklama}</Text>
                  <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>
                    Min. yaş: {s.minYas} · Örnek: {s.ornekArac}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {sekme === "hiz" && (
        <View style={{ gap: spacing.lg }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
            Tablodaki değerler genel azami hız özetidir. Yol işaretleri ve özel durumlar geçerlidir. * değişkenlik
            gösterir.
          </Text>
          <View>
            <HizBaslik />
            {HIZ_SINIRLARI.map((h) => (
              <View
                key={h.arac}
                style={{
                  flexDirection: "row",
                  paddingVertical: spacing.sm,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                }}
              >
                <Text style={{ flex: 1.4, color: colors.text, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
                  {h.arac}
                </Text>
                <Text style={{ flex: 1, color: colors.textMuted, fontSize: fontSize.xs, textAlign: "center" }}>
                  {h.yerlesim}
                </Text>
                <Text style={{ flex: 1, color: colors.textMuted, fontSize: fontSize.xs, textAlign: "center" }}>
                  {h.ciftYon}
                </Text>
                <Text style={{ flex: 1, color: colors.textMuted, fontSize: fontSize.xs, textAlign: "center" }}>
                  {h.bolunmus}
                </Text>
                <Text style={{ flex: 1, color: colors.textMuted, fontSize: fontSize.xs, textAlign: "center" }}>
                  {h.otoyol}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {sekme === "plaka" && (
        <View style={{ gap: spacing.md }}>
          <TextInput
            value={plakaArama}
            onChangeText={setPlakaArama}
            placeholder="İl veya plaka kodu ara…"
            placeholderTextColor={colors.textFaint}
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              color: colors.text,
              fontSize: fontSize.md,
            }}
          />
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
            {plakalar.length} il
          </Text>
          <View>
            {plakalar.map((p, i) => (
              <View
                key={p.kod}
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: spacing.md,
                  paddingVertical: 12,
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.primary, fontFamily: fontFamily.extrabold, width: 32 }}>{p.kod}</Text>
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.semibold, flex: 1 }}>
                  {p.il}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
}

function HizBaslik() {
  const { colors, fontSize, fontFamily } = useTheme();
  const stil = {
    flex: 1,
    color: colors.textFaint,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    textAlign: "center" as const,
  };
  return (
    <View style={{ flexDirection: "row", paddingBottom: 4 }}>
      <Text style={{ flex: 1.4, color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
        Araç
      </Text>
      <Text style={stil}>Yerleşim</Text>
      <Text style={stil}>Çift yön</Text>
      <Text style={stil}>Bölünmüş</Text>
      <Text style={stil}>Otoyol</Text>
    </View>
  );
}
