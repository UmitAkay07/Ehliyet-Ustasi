import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View, Switch, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/theme";
import { useAppStore, seriHesapla } from "@/store/useAppStore";
import { genelIlerleme } from "@/utils/progress";
import { tarihGoster } from "@/utils/gununSorusu";

export default function ProfilScreen() {
  const { colors, fontSize, fontFamily, spacing, radius, scheme } = useTheme();
  const router = useRouter();

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const settings = useAppStore((s) => s.settings);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const setSinavTarihi = useAppStore((s) => s.setSinavTarihi);
  const herseyiSifirla = useAppStore((s) => s.herseyiSifirla);

  const [tarihSeciciAcik, setTarihSeciciAcik] = useState(false);

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const basariOraniStr = `%${Math.round(genel.basariOrani * 100)}`;
  const puan = Math.round(genel.cozulenSoru * 1.5 + genel.okunanKonu * 10);
  const seviye = Math.floor(puan / 500) + 1;

  const handleSifirla = () => {
    Alert.alert(
      "Verileri Sıfırla",
      "Tüm ilerlemen, çözdüğün testler ve istatistiklerin silinecek. Emin misin?",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Sıfırla",
          style: "destructive",
          onPress: () => {
            herseyiSifirla();
            router.replace("/");
          },
        },
      ]
    );
  };

  const setTarih = (event: any, selectedDate?: Date) => {
    setTarihSeciciAcik(Platform.OS === "ios");
    if (selectedDate) {
      setSinavTarihi(selectedDate.toISOString());
    }
  };

  const toggleTema = () => {
    setThemeMode(settings.themeMode === "dark" ? "light" : "dark");
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
            Profil ve Ayarlar
          </Text>
        </View>

        {/* User Card */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.md,
            backgroundColor: colors.surface,
            borderRadius: radius["3xl"],
            padding: spacing.xl,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: radius.pill,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 24, fontFamily: fontFamily.extrabold }}>
              EU
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold }}>
              Ehliyet Ustası
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: 4 }}>
              <View style={{ backgroundColor: colors.infoSoft, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill }}>
                <Text style={{ color: colors.info, fontSize: 12, fontFamily: fontFamily.extrabold }}>
                  Seviye {seviye}
                </Text>
              </View>
              <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.bold }}>
                {puan.toLocaleString()} Puan
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          {/* Soru */}
          <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border }}>
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm }}>
              <Ionicons name="disc" size={20} color={colors.primary} />
            </View>
            <Text style={{ color: colors.text, fontSize: 16, fontFamily: fontFamily.extrabold }}>{genel.cozulenSoru}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 10, fontFamily: fontFamily.bold }}>Çözülen Soru</Text>
          </View>
          {/* Başarı */}
          <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border }}>
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm }}>
              <Ionicons name="trophy" size={20} color={colors.success} />
            </View>
            <Text style={{ color: colors.text, fontSize: 16, fontFamily: fontFamily.extrabold }}>{basariOraniStr}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 10, fontFamily: fontFamily.bold }}>Başarı Oranı</Text>
          </View>
          {/* Seri */}
          <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border }}>
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.warningSoft, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm }}>
              <Ionicons name="flame" size={20} color={colors.warning} />
            </View>
            <Text style={{ color: colors.text, fontSize: 16, fontFamily: fontFamily.extrabold }}>{seri} Gün</Text>
            <Text style={{ color: colors.textMuted, fontSize: 10, fontFamily: fontFamily.bold }}>Seri</Text>
          </View>
        </View>

        {/* Exam Date */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.xl, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
            <View style={{ width: 44, height: 44, borderRadius: radius.xl, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                Sınav Tarihin
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 2 }}>
                Geri sayım için tarihini ayarla
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.xl }}>
            <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              {settings.sinavTarihi ? tarihGoster(settings.sinavTarihi) : "Belirlenmedi"}
            </Text>
            <Pressable
              onPress={() => setTarihSeciciAcik(true)}
              style={({ pressed }) => ({
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: radius.pill,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={{ color: "#FFF", fontSize: 12, fontFamily: fontFamily.extrabold }}>Değiştir</Text>
            </Pressable>
          </View>
        </View>

        {/* Settings */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius["3xl"], overflow: "hidden", borderWidth: 1, borderColor: colors.border }}>
          <Pressable
            onPress={toggleTema}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              padding: spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              backgroundColor: pressed ? "rgba(0,0,0,0.02)" : "transparent",
            })}
          >
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.infoSoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="moon" size={20} color={colors.info} />
            </View>
            <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Tema (Koyu / Açık)
            </Text>
            <Switch
              value={settings.themeMode === "dark"}
              onValueChange={toggleTema}
              trackColor={{ false: colors.border, true: colors.primarySoft }}
              thumbColor={settings.themeMode === "dark" ? colors.primary : "#f4f3f4"}
            />
          </Pressable>
          <Pressable
            onPress={() => router.push("/bilgi-bankasi")}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              padding: spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              backgroundColor: pressed ? "rgba(0,0,0,0.02)" : "transparent",
            })}
          >
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="library" size={20} color={colors.success} />
            </View>
            <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Bilgi Bankası
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </Pressable>
          <Pressable
            onPress={handleSifirla}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              padding: spacing.lg,
              backgroundColor: pressed ? colors.dangerSoft : "transparent",
            })}
          >
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.dangerSoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="trash" size={20} color={colors.danger} />
            </View>
            <Text style={{ flex: 1, color: colors.danger, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Verileri Sıfırla
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </Pressable>
        </View>

        {tarihSeciciAcik && (
          <DateTimePicker
            value={settings.sinavTarihi ? new Date(settings.sinavTarihi) : new Date()}
            mode="date"
            display="default"
            onChange={setTarih}
            minimumDate={new Date()}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
