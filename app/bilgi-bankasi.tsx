import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Card, SectionTitle } from "@/components/ui";
import { useTheme } from "@/theme";
import { EHLIYET_SINIFLARI, HIZ_SINIRLARI, PLAKA_LISTESI } from "@/data/bilgiBankasi";
import type { IconName } from "@/types";

type Sekme = "siniflar" | "hiz" | "plaka";

export default function BilgiBankasiScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
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
                  fontWeight: fontWeight.semibold,
                }}
              >
                {s.ad}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {sekme === "siniflar" && (
        <View style={{ gap: spacing.md }}>
          <Card>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
              Yaş ve şartlar dönemsel yönetmeliğe göre değişebilir. Kursunda doğrula.
            </Text>
          </Card>
          {EHLIYET_SINIFLARI.map((s) => (
            <Card key={s.kod}>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: radius.md,
                    backgroundColor: colors.primarySoft,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: colors.primary, fontWeight: fontWeight.extrabold, fontSize: fontSize.lg }}>
                    {s.kod}
                  </Text>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
                    {s.ad}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>{s.aciklama}</Text>
                  <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>
                    Min. yaş: {s.minYas} · Örnek: {s.ornekArac}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}

      {sekme === "hiz" && (
        <View style={{ gap: spacing.md }}>
          <Card>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
              Tablodaki değerler genel azami hız özetidir. Yol işaretleri ve özel durumlar geçerlidir. * değişkenlik
              gösterir.
            </Text>
          </Card>
          <Card>
            <View style={{ gap: spacing.sm }}>
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
                  <Text style={{ flex: 1.4, color: colors.text, fontSize: fontSize.xs, fontWeight: fontWeight.semibold }}>
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
          </Card>
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
          <SectionTitle title={`${plakalar.length} il`} />
          <View style={{ gap: spacing.sm }}>
            {plakalar.map((p) => (
              <Card key={p.kod}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View
                    style={{
                      minWidth: 48,
                      paddingHorizontal: spacing.sm,
                      paddingVertical: 8,
                      borderRadius: radius.md,
                      backgroundColor: colors.surfaceAlt,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: colors.text, fontWeight: fontWeight.extrabold }}>{p.kod}</Text>
                  </View>
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold, flex: 1 }}>
                    {p.il}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
}

function HizBaslik() {
  const { colors, fontSize, fontWeight } = useTheme();
  const stil = {
    flex: 1,
    color: colors.textFaint,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textAlign: "center" as const,
  };
  return (
    <View style={{ flexDirection: "row", paddingBottom: 4 }}>
      <Text style={{ flex: 1.4, color: colors.textFaint, fontSize: fontSize.xs, fontWeight: fontWeight.semibold }}>
        Araç
      </Text>
      <Text style={stil}>Yerleşim</Text>
      <Text style={stil}>Çift yön</Text>
      <Text style={stil}>Bölünmüş</Text>
      <Text style={stil}>Otoyol</Text>
    </View>
  );
}
