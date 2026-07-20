import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, Card, ProgressRing, ProgressBar, Badge, SectionTitle } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore, seriHesapla, bugunAnahtar } from "@/store/useAppStore";
import { genelIlerleme, dersIlerlemesi } from "@/utils/progress";
import { DERSLER } from "@/data/dersler";
import { sinavGunKalan, tarihGoster } from "@/utils/gununSorusu";
import type { IconName } from "@/types";

function selamla(): string {
  const s = new Date().getHours();
  if (s < 6) return "İyi geceler";
  if (s < 12) return "Günaydın";
  if (s < 18) return "İyi günler";
  return "İyi akşamlar";
}

function HizliErisim({
  ikon,
  baslik,
  renk,
  onPress,
}: {
  ikon: IconName;
  baslik: string;
  renk: string;
  onPress: () => void;
}) {
  const { colors, radius, fontSize, fontWeight, spacing } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.sm,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radius.md,
          backgroundColor: renk + "22",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={ikon} size={22} color={renk} />
      </View>
      <Text style={{ color: colors.text, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }}>
        {baslik}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { colors, fontSize, fontWeight, spacing } = useTheme();
  const router = useRouter();

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const gununCevap = useAppStore((s) => s.gununSorusuCevap[bugunAnahtar()]);
  const hatalar = useAppStore((s) => s.hatalar);

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const hataSayisi = Object.keys(hatalar).length;
  const kalanGun = sinavGunKalan(sinavTarihi);

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>{selamla()},</Text>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
            Ehliyet Ustası
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: colors.warningSoft,
            paddingHorizontal: spacing.md,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Ionicons name="flame" size={18} color={colors.warning} />
          <Text style={{ color: colors.warning, fontWeight: fontWeight.bold }}>{seri} gün</Text>
        </View>
      </View>

      {sinavTarihi && kalanGun != null ? (
        <Card
          elevated
          onPress={() => router.push("/(tabs)/profil")}
          style={{
            backgroundColor: kalanGun <= 7 && kalanGun >= 0 ? colors.warningSoft : undefined,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="calendar" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.bold }}>
                {kalanGun > 0
                  ? `Sınava ${kalanGun} gün`
                  : kalanGun === 0
                    ? "Sınav bugün!"
                    : `Sınav ${Math.abs(kalanGun)} gün önceydi`}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                {tarihGoster(sinavTarihi)} · Profilde değiştir
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </View>
        </Card>
      ) : null}

      <Card onPress={() => router.push("/gunun-sorusu")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: colors.info + "22",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="today" size={24} color={colors.info} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
              Günün Sorusu
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              {gununCevap ? "Bugünkü soruyu çözdün" : "Bugünkü soruyu çöz, serini bozma"}
            </Text>
          </View>
          <Badge
            label={gununCevap ? "Tamam" : "Yeni"}
            color={gununCevap ? colors.success : colors.info}
            bg={gununCevap ? colors.successSoft : colors.info + "22"}
          />
        </View>
      </Card>

      <Card elevated>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.lg }}>
          <ProgressRing
            progress={genel.hazirlikOrani}
            size={104}
            strokeWidth={11}
            label={`%${Math.round(genel.hazirlikOrani * 100)}`}
            sublabel="hazırlık"
          />
          <View style={{ flex: 1, gap: spacing.sm }}>
            <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.bold }}>
              Sınava Hazırlık
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
              {genel.okunanKonu}/{genel.toplamKonu} konu okundu · {genel.cozulenSoru} soru çözüldü
            </Text>
            <Badge
              label={`Başarı: %${Math.round(genel.basariOrani * 100)}`}
              color={colors.success}
              bg={colors.successSoft}
              icon="trophy"
            />
          </View>
        </View>
      </Card>

      <View style={{ gap: spacing.md }}>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <HizliErisim
            ikon="ribbon"
            baslik="Sınav Provası"
            renk={colors.primary}
            onPress={() => router.push("/prova")}
          />
          <HizliErisim
            ikon="alert-circle"
            baslik={`Hata Defteri${hataSayisi ? ` (${hataSayisi})` : ""}`}
            renk={colors.danger}
            onPress={() => router.push("/hatalar")}
          />
        </View>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <HizliErisim
            ikon="images"
            baslik="Trafik İşaretleri"
            renk={colors.info}
            onPress={() => router.push("/isaretler")}
          />
          <HizliErisim
            ikon="library"
            baslik="Bilgi Bankası"
            renk={colors.success}
            onPress={() => router.push("/bilgi-bankasi")}
          />
        </View>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <HizliErisim
            ikon="cash"
            baslik="Trafik Cezaları"
            renk={colors.warning}
            onPress={() => router.push("/cezalar")}
          />
          <HizliErisim
            ikon="clipboard"
            baslik="Sınav Rehberi"
            renk={colors.primary}
            onPress={() => router.push("/sinav-rehberi")}
          />
        </View>
      </View>

      <SectionTitle
        title="Derslere Göre İlerleme"
        action={
          <Pressable onPress={() => router.push("/(tabs)/konular")}>
            <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }}>
              Tümü
            </Text>
          </Pressable>
        }
      />
      <View style={{ gap: spacing.md }}>
        {DERSLER.map((ders) => {
          const ilerleme = dersIlerlemesi(ders.id, okunanKonular, cozulenSorular);
          return (
            <Card key={ders.id} onPress={() => router.push(`/(tabs)/konular?ders=${ders.id}`)}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    backgroundColor: ders.renk + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={ders.ikon} size={24} color={ders.renk} />
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold }}>
                      {ders.kisaAd}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
                      {ilerleme.okunanKonu}/{ilerleme.toplamKonu} konu
                    </Text>
                  </View>
                  <ProgressBar progress={ilerleme.konuOrani} color={ders.renk} height={6} />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
