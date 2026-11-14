import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ProgressBar } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore, seriHesapla, bugunAnahtar } from "@/store/useAppStore";
import { GunlukPlanKarti } from "@/components/GunlukPlanKarti";
import { dersIlerlemesi } from "@/utils/progress";
import { DERSLER } from "@/data/dersler";
import { sinavGunKalan, tarihGoster } from "@/utils/gununSorusu";
import type { IconName } from "@/types";

function selamla(): string {
  const s = new Date().getHours();
  if (s >= 5 && s < 12) return "Günaydın";
  if (s >= 12 && s < 18) return "İyi günler";
  if (s >= 18 && s < 23) return "İyi akşamlar";
  return "İyi geceler";
}

function HizliKutu({
  ikon,
  baslik,
  altBaslik,
  bg,
  fg,
  onPress,
}: {
  ikon: IconName;
  baslik: string;
  altBaslik: string;
  bg: string;
  fg: string;
  onPress: () => void;
}) {
  const { fontFamily, fontSize, spacing, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: bg,
        borderRadius: radius.xl,
        padding: spacing.lg,
        minHeight: 108,
        justifyContent: "space-between",
        opacity: pressed ? 0.82 : 1,
      })}
    >
      <Ionicons name={ikon} size={22} color={fg} />
      <View>
        <Text style={{ color: fg, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>{baslik}</Text>
        <Text style={{ color: fg, fontSize: fontSize.xs, fontFamily: fontFamily.bold, opacity: 0.75, marginTop: 1 }}>
          {altBaslik}
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const sinavTarihi = useAppStore((s) => s.settings.sinavTarihi);
  const gununCevap = useAppStore((s) => s.gununSorusuCevap[bugunAnahtar()]);
  const hatalar = useAppStore((s) => s.hatalar);

  const seri = seriHesapla(gunlukAktivite);
  const hataSayisi = Object.keys(hatalar).length;
  const kalanGun = sinavGunKalan(sinavTarihi);

  return (
    <Screen contentStyle={{ gap: 0, paddingTop: spacing.sm }}>
      {/* Header: selamlama solda, seri sağda */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
          minHeight: 28,
          marginBottom: spacing.md,
        }}
      >
        <Text
          numberOfLines={1}
          style={{ flexShrink: 1, color: colors.textMuted, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}
        >
          {selamla()}
        </Text>
        {seri > 0 && (
          <View
            accessibilityLabel={`${seri} gün seri`}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <Ionicons name="flame" size={15} color={colors.warning} />
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              {seri} gün seri
            </Text>
          </View>
        )}
      </View>

      {/* Arama: kutu görünümlü düğme, dokununca arama ekranı klavyesi açık gelir */}
      <Pressable
        onPress={() => router.push("/ara")}
        accessibilityRole="search"
        accessibilityLabel="Konu, soru veya işaret ara"
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          minHeight: 46,
          paddingHorizontal: spacing.lg,
          marginBottom: spacing.xl,
          borderRadius: radius.pill,
          backgroundColor: colors.surfaceAlt,
          borderWidth: 1,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.textFaint, fontSize: fontSize.md, fontFamily: fontFamily.semibold }}
        >
          Konu, soru veya işaret ara
        </Text>
      </Pressable>

      {/* Countdown: plain typography, no card */}
      <Pressable onPress={() => router.push("/(tabs)/profil")} style={{ marginBottom: spacing.xxl }}>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginBottom: 2 }}>
          Sınava kalan süre
        </Text>
        {sinavTarihi && kalanGun != null ? (
          <>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
              <Text style={{ color: colors.text, fontSize: 64, fontFamily: fontFamily.extrabold, letterSpacing: -1 }}>
                {Math.max(kalanGun, 0)}
              </Text>
              <Text style={{ color: colors.primary, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
                {kalanGun === 0 ? "bugün" : kalanGun < 0 ? "gün geçti" : "gün"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: 6 }}>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
                {tarihGoster(sinavTarihi)}
              </Text>
              <Text style={{ color: colors.border, fontSize: fontSize.sm }}>·</Text>
              <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
                Tarihi değiştir
              </Text>
            </View>
          </>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
              Sınav tarihini belirle
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        )}
      </Pressable>

      {/* Bugünün planı: tek satır, dokununca açılır */}
      <GunlukPlanKarti />

      {/* Question of the day */}
      <Pressable
        onPress={() => router.push("/gunun-sorusu")}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
          paddingVertical: 17,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Ionicons name="sparkles" size={19} color={colors.primary} />
        <View style={{ flex: 1, gap: 1 }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
            Günün sorusu
          </Text>
          <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
            {gununCevap ? "Bugün tamamlandı" : "Bugünkü soruyu çöz"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={15} color={colors.textFaint} />
      </Pressable>

      {/* Quick access: renkli kutular */}
      <View style={{ paddingTop: spacing.xxl, gap: spacing.md }}>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
          Hızlı Erişim
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <HizliKutu
            ikon="clipboard-outline"
            baslik="Prova Sınavı"
            altBaslik="50 soru"
            bg={colors.primary}
            fg={colors.onPrimary}
            onPress={() => router.push("/prova")}
          />
          <HizliKutu
            ikon="journal-outline"
            baslik="Hata Defteri"
            altBaslik={`${hataSayisi} soru`}
            bg={colors.danger}
            fg="#FFFFFF"
            onPress={() => router.push("/hatalar")}
          />
        </View>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <HizliKutu
            ikon="warning-outline"
            baslik="Trafik İşaretleri"
            altBaslik="Katalog"
            bg={colors.warning}
            fg="#FFFFFF"
            onPress={() => router.push("/isaretler")}
          />
          <HizliKutu
            ikon="cash-outline"
            baslik="Trafik Cezaları"
            altBaslik="Güncel liste"
            bg={colors.success}
            fg="#FFFFFF"
            onPress={() => router.push("/cezalar")}
          />
        </View>
      </View>

      {/* Subject progress */}
      <View style={{ paddingTop: spacing.xxl, gap: spacing.lg }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
            Derslere göre ilerleme
          </Text>
          <Pressable onPress={() => router.push("/(tabs)/konular")}>
            <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
              Tümü
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: spacing.md }}>
          {DERSLER.map((ders) => {
            const ilerleme = dersIlerlemesi(ders.id, okunanKonular, cozulenSorular);
            const yuzde = Math.round(ilerleme.konuOrani * 100);
            return (
              <Pressable
                key={ders.id}
                onPress={() => router.push(`/(tabs)/konular?ders=${ders.id}`)}
                style={{ gap: 6 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: ders.renk }} />
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                      {ders.ad}
                    </Text>
                  </View>
                  <Text style={{ color: ders.renk, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                    %{yuzde}
                  </Text>
                </View>
                <ProgressBar progress={ilerleme.konuOrani} color={ders.renk} height={4} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}
