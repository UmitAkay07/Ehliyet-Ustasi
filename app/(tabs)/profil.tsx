import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View, Modal, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTheme } from "@/theme";
import { useAppStore, seriHesapla } from "@/store/useAppStore";
import { genelIlerleme } from "@/utils/progress";
import { tarihGoster } from "@/utils/gununSorusu";
import { bildirimIzniVarMi, tumBildirimleriKur } from "@/services/notifications";

LocaleConfig.locales['tr'] = {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: "Bugün"
};
LocaleConfig.defaultLocale = 'tr';

export default function ProfilScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const settings = useAppStore((s) => s.settings);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const setSinavTarihi = useAppStore((s) => s.setSinavTarihi);
  const herseyiSifirla = useAppStore((s) => s.herseyiSifirla);

  const [tarihSeciciAcik, setTarihSeciciAcik] = useState(false);
  const [sifirlaModalAcik, setSifirlaModalAcik] = useState(false);

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const basariOraniStr = `%${Math.round(genel.basariOrani * 100)}`;
  const puan = Math.round(genel.cozulenSoru * 1.5 + genel.okunanKonu * 10);
  const seviye = Math.floor(puan / 500) + 1;

  const handleSifirlaClick = () => {
    setSifirlaModalAcik(true);
  };

  const gercektenSifirla = () => {
    setSifirlaModalAcik(false);
    herseyiSifirla();
    router.replace("/");
  };

  const setTarih = async (day: any) => {
    const iso = new Date(day.dateString).toISOString();
    setSinavTarihi(iso);
    setTarihSeciciAcik(false);

    // Bildirim iznini yalnızca sınav tarihi seçilince (bağlamlı) iste — Apple 5.1.1
    const izinVar = await bildirimIzniVarMi();
    if (izinVar) {
      tumBildirimleriKur(iso, { izinIste: false }).catch(() => {});
      return;
    }
    Alert.alert(
      "Sınav hatırlatması",
      "Sınav gününüze yaklaşırken ve günlük çalışma için bildirim gönderebiliriz. İzin vermek ister misiniz?",
      [
        {
          text: "Şimdi değil",
          style: "cancel",
        },
        {
          text: "İzin ver",
          onPress: () => {
            tumBildirimleriKur(iso, { izinIste: true }).catch(() => {});
          },
        },
      ]
    );
  };

  const toggleTema = () => {
    if (settings.themeMode === "auto") setThemeMode("light");
    else if (settings.themeMode === "light") setThemeMode("dark");
    else setThemeMode("auto");
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

        {/* Hata defterine dayalı çalışma önerisi */}
        <View style={{ backgroundColor: colors.surfaceAlt, borderRadius: radius["3xl"], padding: spacing.xl, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
            <View style={{ width: 44, height: 44, borderRadius: radius.xl, backgroundColor: colors.warningSoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="bulb" size={24} color={colors.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                Çalışma Önerisi
              </Text>
              <Text style={{ color: colors.warning, fontSize: 12, fontFamily: fontFamily.bold, marginTop: 2 }}>
                Hata defterine göre
              </Text>
            </View>
          </View>
          
          <View style={{ backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 22 }}>
              {(() => {
                const hataKayitlari = Object.values(useAppStore.getState().hatalar);
                if (hataKayitlari.length === 0) {
                  return "Şu an hata defterin tertemiz! Bol bol deneme çözerek zayıf noktalarını burada görebilirsin.";
                }
                const sayilar = hataKayitlari.reduce((acc, h) => {
                  acc[h.dersId] = (acc[h.dersId] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const enCok = Object.entries(sayilar).sort((a, b) => b[1] - a[1])[0];
                
                const dersIsimleri: Record<string, string> = {
                  ilkyardim: "İlk Yardım",
                  trafik: "Trafik ve Çevre",
                  motor: "Araç Tekniği (Motor)",
                  adab: "Trafik Adabı"
                };
                const dersAdi = dersIsimleri[enCok[0]] || enCok[0];
                
                return `Verilerine göre en çok "${dersAdi}" konularında hata yapıyorsun (${enCok[1]} hata). Sınavda sürpriz yaşamamak için bu konulara ağırlık vermelisin!`;
              })()}
            </Text>
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
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={settings.themeMode === "auto" ? "color-wand" : settings.themeMode === "dark" ? "moon" : "sunny"} size={20} color={colors.primary} />
            </View>
            <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Tema ({settings.themeMode === "auto" ? "Sistem" : settings.themeMode === "dark" ? "Koyu" : "Açık"})
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("mailto:iletisim@ehliyetustasi.com")}
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
            <View style={{ width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.warningSoft, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="mail" size={20} color={colors.warning} />
            </View>
            <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Destek / İletişim
            </Text>
            <Ionicons name="open-outline" size={16} color={colors.textFaint} />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("https://ehliyetustasi.com/gizlilik")}
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
              <Ionicons name="shield-checkmark" size={20} color={colors.info} />
            </View>
            <Text style={{ flex: 1, color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Gizlilik Politikası
            </Text>
            <Ionicons name="open-outline" size={16} color={colors.textFaint} />
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
            onPress={handleSifirlaClick}
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

        {/* Legal Disclaimer */}
        <View style={{ marginTop: spacing.md, paddingHorizontal: spacing.md, opacity: 0.7 }}>
          <Text style={{ color: colors.textMuted, fontSize: 11, fontFamily: fontFamily.medium, textAlign: "center", lineHeight: 16 }}>
            Bu uygulama resmi bir MEB uygulaması değildir. Sınavlara hazırlık amacıyla oluşturulmuş özgün bir eğitim aracıdır.
          </Text>
        </View>

        <Modal
          visible={tarihSeciciAcik}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setTarihSeciciAcik(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
            <View style={{ backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.lg, width: "100%", overflow: "hidden" }}>
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, textAlign: "center", marginBottom: spacing.md }}>
                Sınav Tarihini Seç
              </Text>
              <Calendar
                current={settings.sinavTarihi ? settings.sinavTarihi.split("T")[0] : new Date().toISOString().split("T")[0]}
                minDate={new Date().toISOString().split("T")[0]}
                onDayPress={setTarih}
                theme={{
                  calendarBackground: colors.surface,
                  textSectionTitleColor: colors.textMuted,
                  selectedDayBackgroundColor: colors.primary,
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: colors.primary,
                  dayTextColor: colors.text,
                  textDisabledColor: colors.textFaint,
                  arrowColor: colors.primary,
                  monthTextColor: colors.text,
                  textDayFontFamily: fontFamily.bold,
                  textMonthFontFamily: fontFamily.extrabold,
                  textDayHeaderFontFamily: fontFamily.semibold,
                  textDayFontSize: 15,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 13,
                  "stylesheet.calendar.header": {
                     header: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 6,
                        alignItems: 'center'
                     }
                  }
               } as any}
              />
              <Pressable
                onPress={() => setTarihSeciciAcik(false)}
                style={({ pressed }) => ({
                  backgroundColor: colors.surfaceAlt,
                  paddingVertical: spacing.md,
                  borderRadius: radius.pill,
                  alignItems: "center",
                  marginTop: spacing.lg,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                  İptal
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          visible={sifirlaModalAcik}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSifirlaModalAcik(false)}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
            <View style={{ backgroundColor: colors.surface, borderRadius: radius["3xl"], padding: spacing.xl, width: "100%", alignItems: "center" }}>
              <View style={{ width: 64, height: 64, borderRadius: radius.pill, backgroundColor: colors.dangerSoft, alignItems: "center", justifyContent: "center", marginBottom: spacing.lg }}>
                <Ionicons name="warning" size={32} color={colors.danger} />
              </View>
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, textAlign: "center", marginBottom: spacing.sm }}>
                Verileri Sıfırlamak İstediğine Emin Misin?
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, textAlign: "center", marginBottom: spacing.xl }}>
                Bu işlem tüm ilerlemeni, puanlarını ve serini kalıcı olarak silecek. Bu işlem geri alınamaz.
              </Text>
              <View style={{ flexDirection: "row", gap: spacing.md, width: "100%" }}>
                <Pressable
                  onPress={() => setSifirlaModalAcik(false)}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: colors.surfaceAlt,
                    paddingVertical: spacing.md,
                    borderRadius: radius.pill,
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                    Vazgeç
                  </Text>
                </Pressable>
                <Pressable
                  onPress={gercektenSifirla}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: colors.danger,
                    paddingVertical: spacing.md,
                    borderRadius: radius.pill,
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text style={{ color: "#FFF", fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                    Evet, Sıfırla
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
