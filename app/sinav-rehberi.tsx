import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Card, SectionTitle } from "@/components/ui";
import { useTheme } from "@/theme";

const EVRAK_ESINAV = [
  "Nüfus cüzdanı / T.C. kimlik kartı (asıl)",
  "Sürücü aday belgesi / kurs belgesi (kursunun verdiği)",
  "Randevu / sınav giriş belgesi (varsa çıktı veya ekran)",
  "Kalem (kurs yönlendirmesine göre)",
];

const EVRAK_DIREKSIYON = [
  "Nüfus cüzdanı / T.C. kimlik kartı (asıl)",
  "Sürücü kursu belgesi / ehliyet aday belgesi",
  "Sağlık raporu (geçerli)",
  "Direksiyon dersi / sınav randevu bilgisi",
];

const SINAV_GUNU_IPUCLARI = [
  "Merkeze en az 30–45 dakika önce git.",
  "Telefonu sessize al; sınav alanında kurallara uy.",
  "Soru bankası ezberi yerine kavramları hatırla; süre yönetimini prova ile çalış.",
  "Direksiyonda ayna-sinyal-omuz kontrolü rutinini ezbere bil.",
  "Resmi randevu ve sonuç işlemleri e-Devlet / ilgili kurum üzerinden takip edilir.",
];

export default function SinavRehberiScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();
  const [sekme, setSekme] = useState<"esinav" | "direksiyon" | "ipuclari">("esinav");

  const liste = useMemo(() => {
    if (sekme === "esinav") return EVRAK_ESINAV;
    if (sekme === "direksiyon") return EVRAK_DIREKSIYON;
    return SINAV_GUNU_IPUCLARI;
  }, [sekme]);

  return (
    <Screen>
      <ScreenHeader title="Sınav Rehberi" subtitle="Evrak ve gün ipuçları" />

      <Card>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
          Konum ve randevu bilgileri illere göre değişir. Güncel merkez / randevu için resmi kanalları
          (e-Devlet, MEB, Emniyet) kullan.
        </Text>
      </Card>

      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {(
          [
            { id: "esinav" as const, ad: "e-Sınav", ikon: "desktop" as const },
            { id: "direksiyon" as const, ad: "Direksiyon", ikon: "car" as const },
            { id: "ipuclari" as const, ad: "İpuçları", ikon: "bulb" as const },
          ] as const
        ).map((s) => {
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

      <SectionTitle title={sekme === "ipuclari" ? "Sınav günü" : "Yanında olsun"} />
      <View style={{ gap: spacing.sm }}>
        {liste.map((madde, i) => (
          <Card key={i}>
            <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: colors.primarySoft,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.primary, fontWeight: fontWeight.bold, fontSize: fontSize.xs }}>
                  {i + 1}
                </Text>
              </View>
              <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, lineHeight: 20 }}>{madde}</Text>
            </View>
          </Card>
        ))}
      </View>

      <Card onPress={() => router.push("/prova")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Ionicons name="ribbon" size={22} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: fontWeight.semibold }}>Sınav provası yap</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>50 soru · 45 dk simülasyonu</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
        </View>
      </Card>
    </Screen>
  );
}
