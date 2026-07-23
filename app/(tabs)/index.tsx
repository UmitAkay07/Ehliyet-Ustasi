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
  altBaslik,
  bgRenk,
  textRenk,
  onPress,
}: {
  ikon: IconName;
  baslik: string;
  altBaslik: string;
  bgRenk: string;
  textRenk: string;
  onPress: () => void;
}) {
  const { fontFamily, spacing, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: bgRenk,
        borderRadius: radius["3xl"],
        padding: spacing.lg,
        gap: spacing.sm,
        justifyContent: "space-between",
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.xl,
          backgroundColor: "rgba(255,255,255,0.25)",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: spacing.sm,
        }}
      >
        <Ionicons name={ikon} size={24} color={textRenk} />
      </View>
      <View>
        <Text style={{ color: textRenk, fontSize: 16, fontFamily: fontFamily.extrabold, lineHeight: 20 }}>
          {baslik}
        </Text>
        <Text style={{ color: textRenk, fontSize: 12, fontFamily: fontFamily.semibold, opacity: 0.85, marginTop: 2 }}>
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

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const hataSayisi = Object.keys(hatalar).length;
  const kalanGun = sinavGunKalan(sinavTarihi);

  return (
    <Screen contentStyle={{ gap: spacing.xl, paddingBottom: spacing.xxxl }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: spacing.sm }}>
        <View>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Günaydın!
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
            Bugün de harika gidiyorsun
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.warningSoft,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            borderRadius: radius.pill,
          }}
        >
          <Ionicons name="flame" size={20} color={colors.warning} />
          <Text style={{ color: colors.warning, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
            {seri} Gün
          </Text>
        </View>
      </View>

      {/* Exam Countdown */}
      <Pressable
        onPress={() => router.push("/(tabs)/profil")}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.lg,
          backgroundColor: colors.primary,
          borderRadius: radius["3xl"],
          padding: spacing.xl,
          opacity: pressed ? 0.9 : 1,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        })}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: radius.xl,
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="calendar" size={28} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          {sinavTarihi && kalanGun != null ? (
            <>
              <Text style={{ color: "#FFFFFF", fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                {kalanGun > 0 ? `Sınava ${kalanGun} Gün Kaldı!` : kalanGun === 0 ? "Sınav bugün!" : "Sınav geçti"}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                Hedefine çok yaklaştın, devam et!
              </Text>
            </>
          ) : (
            <>
              <Text style={{ color: "#FFFFFF", fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                Sınav Tarihi Belirle
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                Geri sayımı başlatmak için dokun
              </Text>
            </>
          )}
        </View>
      </Pressable>

      {/* Question of the Day */}
      <Pressable
        onPress={() => router.push("/gunun-sorusu")}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
          backgroundColor: colors.surface,
          borderRadius: radius["3xl"],
          padding: spacing.lg,
          opacity: pressed ? 0.9 : 1,
          borderWidth: 1,
          borderColor: colors.border,
        })}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, flex: 1 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: radius.xl,
              backgroundColor: colors.primarySoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="sparkles" size={24} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
              Günün Sorusu
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
              Bugünkü meydan okumayı çöz!
            </Text>
          </View>
        </View>
        {gununCevap ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.successSoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill }}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={{ color: colors.success, fontSize: 12, fontFamily: fontFamily.extrabold }}>Tamamlandı</Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.infoSoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill }}>
            <Text style={{ color: colors.info, fontSize: 12, fontFamily: fontFamily.extrabold }}>Yeni</Text>
          </View>
        )}
      </Pressable>

      {/* Overall Progress */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.xl,
          backgroundColor: colors.surface,
          borderRadius: radius["3xl"],
          padding: spacing.xl,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <ProgressRing
          progress={genel.hazirlikOrani}
          size={110}
          strokeWidth={12}
          label={`%${Math.round(genel.hazirlikOrani * 100)}`}
        />
        <View style={{ flex: 1, gap: spacing.md }}>
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold }}>
            Sınava Hazırlık
          </Text>
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="speedometer" size={16} color={colors.primary} />
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
                {genel.cozulenSoru} soru çözüldü
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="book" size={16} color={colors.success} />
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
                {genel.okunanKonu} ders okundu
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View>
        <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, marginBottom: spacing.md }}>
          Hızlı Erişim
        </Text>
        <View style={{ gap: spacing.md }}>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <HizliErisim
              ikon="clipboard"
              baslik="Sınav Provası"
              altBaslik="50 soru"
              bgRenk={colors.primary}
              textRenk="#FFFFFF"
              onPress={() => router.push("/prova")}
            />
            <HizliErisim
              ikon="journal"
              baslik="Hata Defteri"
              altBaslik={`${hataSayisi} soru`}
              bgRenk={colors.danger}
              textRenk="#FFFFFF"
              onPress={() => router.push("/hatalar")}
            />
          </View>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <HizliErisim
              ikon="warning"
              baslik="Trafik İşaretleri"
              altBaslik="Tüm işaretler"
              bgRenk={colors.success}
              textRenk="#FFFFFF"
              onPress={() => router.push("/isaretler")}
            />
            <HizliErisim
              ikon="cash"
              baslik="Trafik Cezaları"
              altBaslik="Güncel liste"
              bgRenk={colors.warning}
              textRenk={colors.background === "#0F172A" ? "#1E293B" : "#FFFFFF"} // Koyu temada uyumlu olsun
              onPress={() => router.push("/cezalar")}
            />
          </View>
        </View>
      </View>

      {/* Subject Progress */}
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold }}>
            Konu İlerlemen
          </Text>
          <Pressable onPress={() => router.push("/(tabs)/konular")}>
            <Text style={{ color: colors.primary, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Tümü
            </Text>
          </Pressable>
        </View>
        
        <View style={{ gap: spacing.md }}>
          {DERSLER.map((ders) => {
            const ilerleme = dersIlerlemesi(ders.id, okunanKonular, cozulenSorular);
            return (
              <Pressable
                key={ders.id}
                onPress={() => router.push(`/(tabs)/konular?ders=${ders.id}`)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  backgroundColor: colors.surface,
                  borderRadius: radius["3xl"],
                  padding: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radius.xl,
                    backgroundColor: ders.renk + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={ders.ikon} size={24} color={ders.renk} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                      {ders.ad}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.extrabold }}>
                      %{Math.round(ilerleme.konuOrani * 100)}
                    </Text>
                  </View>
                  <ProgressBar progress={ilerleme.konuOrani} color={ders.renk} height={10} style={{ borderRadius: radius.pill }} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}
