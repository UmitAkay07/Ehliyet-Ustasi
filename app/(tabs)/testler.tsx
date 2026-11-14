import React, { useState } from "react";
import { Pressable, Text, View, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { DERSLER } from "@/data/dersler";
import { sorularByDers } from "@/data/sorular";
import type { IconName } from "@/types";

/** Bu yüksekliğin altındaki telefonlarda kart açıklaması gizlenir, boşluklar daralır */
const KISA_EKRAN_DP = 720;
/** Liste satırı bundan kısaysa alt yazı gizlenir (başlık yine okunur, dokunma alanı yeterli kalır) */
const ALT_YAZI_ICIN_MIN_SATIR = 54;
const SATIR_MIN = 44;
const SATIR_MAX = 74;

function TestSatiri({
  ikon,
  ikonRenk,
  baslik,
  altYazi,
  altYaziGoster,
  ilk,
  onPress,
  onYukseklik,
}: {
  ikon: IconName;
  ikonRenk: string;
  baslik: string;
  altYazi: string;
  altYaziGoster: boolean;
  ilk: boolean;
  onPress: () => void;
  onYukseklik?: (h: number) => void;
}) {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${baslik}. ${altYazi}`}
      onLayout={onYukseklik ? (e) => onYukseklik(e.nativeEvent.layout.height) : undefined}
      style={({ pressed }) => ({
        flex: 1,
        minHeight: SATIR_MIN,
        maxHeight: SATIR_MAX,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        borderTopWidth: ilk ? 1 : 0,
        borderBottomWidth: 1,
        borderColor: colors.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Ionicons name={ikon} size={22} color={ikonRenk} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
          {baslik}
        </Text>
        {altYaziGoster && (
          <Text
            numberOfLines={1}
            style={{ color: colors.textFaint, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}
          >
            {altYazi}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
    </Pressable>
  );
}

/**
 * Testler sekmesi. Ekran yüksekliğine göre kendini ayarlar: satırlar kalan alanı paylaşır
 * (en az 44, en çok 74 dp), kısa ekranda açıklamalar gizlenir; böylece Favori Sorularım dahil
 * her şey kaydırmadan görünür. Yazı çok büyütülmüşse yine de kaydırılabilir.
 */
export default function TestlerScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const { height: ekranH } = useWindowDimensions();
  const kisa = ekranH < KISA_EKRAN_DP;
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const favoriSayisi = useAppStore((s) => Object.keys(s.favoriler ?? {}).length);
  const sonProva = provaGecmisi[0];
  const [satirH, setSatirH] = useState(SATIR_MAX);
  const altYaziGoster = satirH >= ALT_YAZI_ICIN_MIN_SATIR;
  const bosluk = kisa ? spacing.lg : spacing.xl;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: spacing.lg, paddingBottom: spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: bosluk }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Test Çöz
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: 2 }}>
            Pratik yap, kendini dene
          </Text>
        </View>

        {/* Hero: full mock exam — dolu renk blok; son sonuç sağ üstte küçük etiket */}
        <Pressable
          onPress={() => router.push("/prova")}
          accessibilityRole="button"
          accessibilityLabel="Gerçek Sınav Provası, 50 soru, 45 dakika. Başla"
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: kisa ? spacing.lg : spacing.xl,
            marginBottom: bosluk,
            gap: kisa ? 6 : spacing.sm,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Text style={{ color: colors.onPrimary, fontSize: fontSize.xs, fontFamily: fontFamily.extrabold, opacity: 0.8 }}>
              50 SORU · 45 DAKİKA
            </Text>
            <View style={{ flex: 1 }} />
            {sonProva && (
              <View
                accessibilityLabel={`Son sonucun ${sonProva.puan} puan, ${sonProva.gecti ? "geçtin" : "kaldın"}`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.14)",
                }}
              >
                <Ionicons name={sonProva.gecti ? "trophy" : "trophy-outline"} size={12} color={colors.onPrimary} />
                <Text style={{ color: colors.onPrimary, fontSize: 11, fontFamily: fontFamily.extrabold }}>
                  Son: {sonProva.puan} · {sonProva.gecti ? "Geçtin" : "Kaldın"}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{ color: colors.onPrimary, fontSize: kisa ? 22 : 26, fontFamily: fontFamily.extrabold, letterSpacing: -0.5 }}
          >
            Gerçek Sınav Provası
          </Text>
          {!kisa && (
            <Text
              style={{ color: colors.onPrimary, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 20, opacity: 0.85 }}
            >
              Gerçek sınav formatında kendini test et. 70 puan ve üzeri geçer.
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: "rgba(0,0,0,0.14)",
              paddingVertical: kisa ? 10 : 14,
              borderRadius: 999,
              marginTop: kisa ? 4 : spacing.sm,
            }}
          >
            <Ionicons name="play" size={18} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
              Başla
            </Text>
          </View>
        </Pressable>

        {/* Konu testleri ve favoriler: kalan alanı eşit paylaşan satırlar */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginBottom: spacing.xs }}>
            Konu Testleri
          </Text>
          {DERSLER.map((ders, i) => (
            <TestSatiri
              key={ders.id}
              ikon={ders.ikon}
              ikonRenk={ders.renk}
              baslik={ders.ad}
              altYazi={`${sorularByDers(ders.id).length} soru havuzundan rastgele`}
              altYaziGoster={altYaziGoster}
              ilk={i === 0}
              onPress={() => router.push(`/ders-test/${ders.id}`)}
              onYukseklik={i === 0 ? setSatirH : undefined}
            />
          ))}

          <View style={{ height: kisa ? spacing.md : spacing.lg }} />
          <TestSatiri
            ikon="star"
            ikonRenk={colors.warning}
            baslik="Favori Sorularım"
            altYazi={favoriSayisi > 0 ? `${favoriSayisi} soru` : "Yıldızladığın sorular burada toplanır"}
            altYaziGoster={altYaziGoster}
            ilk
            onPress={() => router.push("/favoriler")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
