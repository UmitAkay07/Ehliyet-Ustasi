import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, Modal, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
import { useAppStore, seriHesapla } from "@/store/useAppStore";
import { useOyun } from "@/store/useOyun";
import { YOL_HARITASI_ONAYLI, yolIlerlemesi } from "@/data/yolHaritasi";
import { genelIlerleme } from "@/utils/progress";
import { tarihGoster } from "@/utils/gununSorusu";
import { bildirimIzniVarMi, tumBildirimleriKur } from "@/services/notifications";
import { Card, ConfirmDialog } from "@/components/ui";
import type { DialogButton } from "@/components/ui";
import type { IconName } from "@/types";

LocaleConfig.locales['tr'] = {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: "Bugün"
};
LocaleConfig.defaultLocale = 'tr';

const DESTEK_EMAIL = "ehliyetustasi.destek@gmail.com";
const GIZLILIK_URL = "https://sites.google.com/view/ehliyetustasi-gizlilik/ana-sayfa";

function IstatKutu({
  ikon,
  ikonBg,
  ikonRenk,
  deger,
  etiket,
}: {
  ikon: IconName;
  ikonBg: string;
  ikonRenk: string;
  deger: string | number;
  etiket: string;
}) {
  const { colors, fontFamily } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: ikonBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={ikon} size={16} color={ikonRenk} />
      </View>
      <Text style={{ color: colors.text, fontSize: 15, fontFamily: fontFamily.extrabold }}>{deger}</Text>
      <Text style={{ color: colors.textFaint, fontSize: 10, fontFamily: fontFamily.bold }}>{etiket}</Text>
    </View>
  );
}

function AyarSatiri({
  ikon,
  ikonBg,
  ikonRenk,
  baslik,
  baslikRenk,
  deger,
  onPress,
  ok = true,
  son = false,
}: {
  ikon: IconName;
  ikonBg: string;
  ikonRenk: string;
  baslik: string;
  baslikRenk?: string;
  deger?: string;
  onPress: () => void;
  ok?: boolean;
  son?: boolean;
}) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingVertical: spacing.sm + 2,
        borderBottomWidth: son ? 0 : 1,
        borderBottomColor: colors.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: radius.md,
          backgroundColor: ikonBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={ikon} size={16} color={ikonRenk} />
      </View>
      <Text style={{ flex: 1, color: baslikRenk ?? colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
        {baslik}
      </Text>
      {deger ? (
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
          {deger}
        </Text>
      ) : null}
      {ok && <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />}
    </Pressable>
  );
}

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
  const oyun = useOyun();
  const yolAdimlari = useAppStore((s) => s.yolHaritasi);

  const [tarihSeciciAcik, setTarihSeciciAcik] = useState(false);
  const [sifirlaModalAcik, setSifirlaModalAcik] = useState(false);
  const [dialog, setDialog] = useState<{ title: string; message?: string; buttons: DialogButton[] } | null>(null);

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const basariOraniStr = `%${Math.round(genel.basariOrani * 100)}`;

  const gercektenSifirla = () => {
    setSifirlaModalAcik(false);
    herseyiSifirla();
    router.replace("/");
  };

  const destekAc = async () => {
    const mailto = `mailto:${DESTEK_EMAIL}`;
    try {
      if (await Linking.canOpenURL(mailto)) {
        await Linking.openURL(mailto);
        return;
      }
    } catch {}
    setDialog({
      title: "Destek e-postası",
      message: `Bu cihazda e-posta uygulaması açılamadı.\n\nBize yazın:\n${DESTEK_EMAIL}`,
      buttons: [{ text: "Tamam" }],
    });
  };

  const gizlilikAc = async () => {
    try {
      if (await Linking.canOpenURL(GIZLILIK_URL)) {
        await Linking.openURL(GIZLILIK_URL);
        return;
      }
    } catch {}
    setDialog({
      title: "Gizlilik politikası",
      message: `Sayfa şu an açılamadı.\n\nAdres:\n${GIZLILIK_URL}`,
      buttons: [{ text: "Tamam" }],
    });
  };

  const setTarih = async (day: any) => {
    const iso = new Date(day.dateString).toISOString();
    setSinavTarihi(iso);
    setTarihSeciciAcik(false);

    // Bildirim iznini yalnızca sınav tarihi seçilince (bağlamlı) iste — Apple 5.1.1
    const izinVar = await bildirimIzniVarMi();
    if (izinVar) {
      tumBildirimleriKur(iso, { izinIste: false }).catch((e) => console.warn("[bildirim] kurulamadı:", String(e)));
      return;
    }
    setDialog({
      title: "Sınav hatırlatması",
      message: "Sınav gününüze yaklaşırken ve günlük çalışma için bildirim gönderebiliriz. İzin vermek ister misiniz?",
      buttons: [
        { text: "Şimdi değil", style: "cancel" },
        {
          text: "İzin ver",
          onPress: () => {
            tumBildirimleriKur(iso, { izinIste: true }).catch((e) => console.warn("[bildirim] kurulamadı:", String(e)));
          },
        },
      ],
    });
  };

  const toggleTema = () => {
    if (settings.themeMode === "auto") setThemeMode("light");
    else if (settings.themeMode === "light") setThemeMode("dark");
    else setThemeMode("auto");
  };

  const temaIkon: IconName =
    settings.themeMode === "auto" ? "color-wand-outline" : settings.themeMode === "dark" ? "moon-outline" : "sunny-outline";
  const temaMetin = settings.themeMode === "auto" ? "Sistem" : settings.themeMode === "dark" ? "Koyu" : "Açık";

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, marginBottom: spacing.md }}>
          Profil ve Ayarlar
        </Text>

        {/* İstatistikler */}
        <Card elevated style={{ marginBottom: spacing.md, padding: spacing.md }}>
          <View style={{ flexDirection: "row" }}>
            <IstatKutu ikon="checkmark-done" ikonBg={colors.primarySoft} ikonRenk={colors.primary} deger={genel.cozulenSoru} etiket="Çözülen Soru" />
            <IstatKutu ikon="trophy" ikonBg={colors.successSoft} ikonRenk={colors.success} deger={basariOraniStr} etiket="Başarı Oranı" />
            <IstatKutu ikon="flame" ikonBg={colors.dangerSoft} ikonRenk={colors.danger} deger={`${seri} gün`} etiket="Seri" />
          </View>
        </Card>

        {/* Sınav tarihi — dikkat çekici, oval çerçeve */}
        <Card
          onPress={() => setTarihSeciciAcik(true)}
          style={{
            marginBottom: spacing.md,
            padding: spacing.md,
            backgroundColor: colors.primarySoft,
            borderColor: colors.primary,
            borderWidth: 1.5,
            borderRadius: 26,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="calendar" size={19} color={colors.onPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>Sınav Tarihin</Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, fontFamily: fontFamily.semibold, marginTop: 1 }}>
                {settings.sinavTarihi ? tarihGoster(settings.sinavTarihi) : "Belirlenmedi"}
              </Text>
            </View>
            <View style={{ backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: spacing.sm + 2, paddingVertical: 6 }}>
              <Text style={{ color: colors.onPrimary, fontSize: fontSize.xs, fontFamily: fontFamily.extrabold }}>Değiştir</Text>
            </View>
          </View>
        </Card>

        {/* Çalışma önerisi — dikkat çekici, oval çerçeve */}
        <Card
          style={{
            marginBottom: spacing.md,
            padding: spacing.md,
            backgroundColor: colors.warningSoft,
            borderColor: colors.warning,
            borderWidth: 1.5,
            borderRadius: 26,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: 6 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.warning,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="bulb" size={14} color="#FFFFFF" />
            </View>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
              Çalışma Önerisi
            </Text>
          </View>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 19 }}
          >
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
        </Card>

        {/* Ayarlar grubu — düz liste, yukarıdakilerden ayrışsın */}
        <Text style={{ color: colors.textFaint, fontSize: 11, fontFamily: fontFamily.extrabold, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: spacing.sm, marginLeft: 4 }}>
          Ayarlar
        </Text>
        <Card elevated padded={false} style={{ marginBottom: spacing.md, paddingHorizontal: spacing.lg }}>
          <AyarSatiri
            ikon={temaIkon}
            ikonBg={colors.infoSoft}
            ikonRenk={colors.info}
            baslik="Tema"
            deger={temaMetin}
            onPress={toggleTema}
            ok={false}
          />
          <AyarSatiri
            ikon="mail"
            ikonBg={colors.warningSoft}
            ikonRenk={colors.warning}
            baslik="Destek / İletişim"
            onPress={() => { destekAc().catch(() => {}); }}
          />
          <AyarSatiri
            ikon="shield-checkmark"
            ikonBg={colors.successSoft}
            ikonRenk={colors.success}
            baslik="Gizlilik Politikası"
            onPress={() => { gizlilikAc().catch(() => {}); }}
          />
          {/* İçerik doğrulanıp onay bayrağı açılana kadar görünmez (bkz. data/yolHaritasi.ts) */}
          {YOL_HARITASI_ONAYLI ? (
            <AyarSatiri
              ikon="map"
              ikonBg={colors.infoSoft}
              ikonRenk={colors.info}
              baslik="Ehliyet Yol Haritası"
              deger={`${yolIlerlemesi(yolAdimlari).tamamlanan}/${yolIlerlemesi(yolAdimlari).toplam}`}
              onPress={() => router.push("/yol-haritasi")}
            />
          ) : null}
          <AyarSatiri
            ikon="trophy"
            ikonBg={colors.warningSoft}
            ikonRenk={colors.warning}
            baslik="Başarılarım"
            deger={`Seviye ${oyun.seviye.seviye}`}
            onPress={() => router.push("/basarilar")}
          />
          <AyarSatiri
            ikon="library"
            ikonBg={colors.primarySoft}
            ikonRenk={colors.primary}
            baslik="Bilgi Bankası"
            onPress={() => router.push("/bilgi-bankasi")}
          />
          <AyarSatiri
            ikon="trash"
            ikonBg={colors.danger}
            ikonRenk="#FFFFFF"
            baslik="Verileri Sıfırla"
            baslikRenk={colors.danger}
            onPress={() => setSifirlaModalAcik(true)}
            ok={false}
            son
          />
        </Card>

        <Text style={{ color: colors.textFaint, fontSize: 11, fontFamily: fontFamily.medium, textAlign: "center", lineHeight: 16, marginTop: spacing.sm }}>
          Bu uygulama resmi bir MEB uygulaması değildir. Sınavlara hazırlık amacıyla oluşturulmuş özgün bir eğitim aracıdır.
        </Text>

        <Modal
          visible={tarihSeciciAcik}
          transparent
          animationType="fade"
          onRequestClose={() => setTarihSeciciAcik(false)}
        >
          <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
            <View style={{ backgroundColor: colors.surfaceElevated, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, width: "100%", overflow: "hidden" }}>
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, textAlign: "center", marginBottom: spacing.md }}>
                Sınav Tarihini Seç
              </Text>
              <Calendar
                current={settings.sinavTarihi ? settings.sinavTarihi.split("T")[0] : new Date().toISOString().split("T")[0]}
                minDate={new Date().toISOString().split("T")[0]}
                onDayPress={setTarih}
                theme={{
                  calendarBackground: colors.surfaceElevated,
                  textSectionTitleColor: colors.textMuted,
                  selectedDayBackgroundColor: colors.primary,
                  selectedDayTextColor: colors.onPrimary,
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
                  paddingVertical: spacing.md,
                  borderRadius: radius.pill,
                  borderWidth: 1.5,
                  borderColor: colors.border,
                  alignItems: "center",
                  marginTop: spacing.lg,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                  İptal
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ConfirmDialog
          visible={sifirlaModalAcik}
          onRequestClose={() => setSifirlaModalAcik(false)}
          title="Verileri sıfırlamak istediğine emin misin?"
          message="Bu işlem tüm ilerlemeni, puanlarını ve serini kalıcı olarak silecek. Bu işlem geri alınamaz."
          buttons={[
            { text: "Vazgeç", style: "cancel" },
            { text: "Evet, Sıfırla", style: "destructive", onPress: gercektenSifirla },
          ]}
        />

        <ConfirmDialog
          visible={dialog != null}
          onRequestClose={() => setDialog(null)}
          title={dialog?.title ?? ""}
          message={dialog?.message}
          buttons={dialog?.buttons ?? [{ text: "Tamam" }]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
