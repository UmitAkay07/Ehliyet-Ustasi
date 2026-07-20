import React, { useMemo, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Screen, Card, ProgressRing, ProgressBar, SectionTitle, Badge, Button } from "@/components/ui";
import { useTheme } from "@/theme";
import { useAppStore, seriHesapla, ThemeMode } from "@/store/useAppStore";
import { genelIlerleme, dersIlerlemesi } from "@/utils/progress";
import { DERSLER } from "@/data/dersler";
import { sinavGunKalan, tarihGoster } from "@/utils/gununSorusu";
import { sinavBildirimleriniKur } from "@/services/notifications";

function tarihBicimle(ts: number): string {
  const d = new Date(ts);
  return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${d.getFullYear()}`;
}

function isoFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dateFromIso(iso: string | null): Date {
  if (!iso) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 30);
    return d;
  }
  const [y, m, day] = iso.split("-").map(Number);
  return new Date(y, m - 1, day);
}

export default function ProfilScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const router = useRouter();

  const okunanKonular = useAppStore((s) => s.okunanKonular);
  const cozulenSorular = useAppStore((s) => s.cozulenSorular);
  const gunlukAktivite = useAppStore((s) => s.gunlukAktivite);
  const provaGecmisi = useAppStore((s) => s.provaGecmisi);
  const settings = useAppStore((s) => s.settings);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const setSinavTarihi = useAppStore((s) => s.setSinavTarihi);
  const herseyiSifirla = useAppStore((s) => s.herseyiSifirla);

  const [pickerAcik, setPickerAcik] = useState(Platform.OS === "ios");
  const [taslakTarih, setTaslakTarih] = useState(() => dateFromIso(settings.sinavTarihi));

  const genel = genelIlerleme(okunanKonular, cozulenSorular);
  const seri = seriHesapla(gunlukAktivite);
  const gecilenProva = provaGecmisi.filter((p) => p.gecti).length;
  const kalanGun = sinavGunKalan(settings.sinavTarihi);

  const kalanMetin = useMemo(() => {
    if (kalanGun == null) return null;
    if (kalanGun > 1) return `${kalanGun} gün kaldı`;
    if (kalanGun === 1) return "1 gün kaldı";
    if (kalanGun === 0) return "Sınav bugün";
    return `${Math.abs(kalanGun)} gün geçti`;
  }, [kalanGun]);

  const temaSecenekleri: { id: ThemeMode; ad: string; ikon: any }[] = [
    { id: "auto", ad: "Otomatik", ikon: "phone-portrait" },
    { id: "light", ad: "Açık", ikon: "sunny" },
    { id: "dark", ad: "Koyu", ikon: "moon" },
  ];

  const tarihKaydet = async (d: Date) => {
    const iso = isoFromDate(d);
    setSinavTarihi(iso);
    setTaslakTarih(d);
    try {
      await sinavBildirimleriniKur(iso);
    } catch {
      /* izin reddedilebilir */
    }
  };

  const onPickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      setPickerAcik(false);
      if (event.type === "dismissed" || !selected) return;
    }
    if (!selected) return;
    const temiz = new Date(selected);
    temiz.setHours(0, 0, 0, 0);
    if (Platform.OS === "ios") {
      setTaslakTarih(temiz);
    } else {
      void tarihKaydet(temiz);
    }
  };

  const tarihiTemizle = async () => {
    setSinavTarihi(null);
    await sinavBildirimleriniKur(null).catch(() => {});
  };

  const sifirlaOnayi = () => {
    Alert.alert("Verileri Sıfırla", "Tüm ilerleme, istatistik ve hatalar silinecek. Emin misin?", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Sıfırla",
        style: "destructive",
        onPress: () => {
          herseyiSifirla();
          void sinavBildirimleriniKur(null);
        },
      },
    ]);
  };

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold }}>
        Profil ve İstatistik
      </Text>

      <Card elevated>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.lg }}>
          <ProgressRing
            progress={genel.hazirlikOrani}
            size={92}
            strokeWidth={10}
            label={`%${Math.round(genel.hazirlikOrani * 100)}`}
          />
          <View style={{ flex: 1, gap: spacing.sm }}>
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              <Badge label={`${seri} gün seri`} color={colors.warning} bg={colors.warningSoft} icon="flame" />
            </View>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
              {genel.cozulenSoru} soru çözüldü · {genel.dogruSoru} doğru{"\n"}
              {gecilenProva} provada baraj geçildi
            </Text>
          </View>
        </View>
      </Card>

      <SectionTitle title="Sınav Tarihi" />
      <Card>
        <View style={{ gap: spacing.md }}>
          {settings.sinavTarihi ? (
            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: radius.md,
                padding: spacing.md,
                gap: 4,
              }}
            >
              <Text style={{ color: colors.primary, fontSize: fontSize.xs, fontWeight: fontWeight.semibold }}>
                Seçili tarih
              </Text>
              <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: fontWeight.extrabold }}>
                {tarihGoster(settings.sinavTarihi)}
              </Text>
              {kalanMetin ? (
                <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.bold }}>
                  {kalanMetin}
                </Text>
              ) : null}
              <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, marginTop: 4 }}>
                Her gün sabah 09:00’da “X gününüz kaldı” bildirimi gönderilir.
              </Text>
            </View>
          ) : (
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
              Gün, ay ve yıl seçerek sınav tarihini kaydet. Ana sayfada geri sayım görünür; her gün bildirim
              alırsın.
            </Text>
          )}

          {Platform.OS === "android" && (
            <Button
              label={settings.sinavTarihi ? "Tarihi Değiştir" : "Gün / Ay / Yıl Seç"}
              icon="calendar"
              variant="secondary"
              onPress={() => {
                setTaslakTarih(dateFromIso(settings.sinavTarihi));
                setPickerAcik(true);
              }}
            />
          )}

          {(pickerAcik || Platform.OS === "ios") && (
            <DateTimePicker
              value={taslakTarih}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date(2020, 0, 1)}
              maximumDate={new Date(2035, 11, 31)}
              onChange={onPickerChange}
              locale="tr-TR"
            />
          )}

          {Platform.OS === "ios" && (
            <Button label="Tarihi Kaydet" icon="checkmark" onPress={() => void tarihKaydet(taslakTarih)} />
          )}

          {settings.sinavTarihi ? (
            <Pressable onPress={() => void tarihiTemizle()}>
              <Text style={{ color: colors.danger, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }}>
                Sınav tarihini temizle
              </Text>
            </Pressable>
          ) : null}
        </View>
      </Card>

      <SectionTitle title="Derslere Göre Başarı" />
      <View style={{ gap: spacing.md }}>
        {DERSLER.map((ders) => {
          const il = dersIlerlemesi(ders.id, okunanKonular, cozulenSorular);
          return (
            <Card key={ders.id}>
              <View style={{ gap: spacing.sm }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                  <Ionicons name={ders.ikon} size={18} color={ders.renk} />
                  <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold, flex: 1 }}>
                    {ders.kisaAd}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                    {il.cozulenSoru > 0 ? `%${Math.round(il.basariOrani * 100)} başarı` : "Henüz çözülmedi"}
                  </Text>
                </View>
                <ProgressBar progress={il.basariOrani} color={ders.renk} height={6} />
              </View>
            </Card>
          );
        })}
      </View>

      {provaGecmisi.length > 0 && (
        <>
          <SectionTitle title="Prova Geçmişi" />
          <View style={{ gap: spacing.sm }}>
            {provaGecmisi.slice(0, 5).map((p) => (
              <Card key={p.id}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: p.gecti ? colors.successSoft : colors.dangerSoft,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: p.gecti ? colors.success : colors.danger, fontWeight: fontWeight.extrabold }}>
                      {p.puan}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }}>
                      {p.dogru} doğru · {p.yanlis} yanlış · {p.bos} boş
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>{tarihBicimle(p.tarih)}</Text>
                  </View>
                  <Ionicons
                    name={p.gecti ? "checkmark-circle" : "close-circle"}
                    size={22}
                    color={p.gecti ? colors.success : colors.danger}
                  />
                </View>
              </Card>
            ))}
          </View>
        </>
      )}

      <SectionTitle title="Ayarlar" />
      <Card>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.md,
            fontWeight: fontWeight.semibold,
            marginBottom: spacing.md,
          }}
        >
          Tema
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {temaSecenekleri.map((t) => {
            const secili = settings.themeMode === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setThemeMode(t.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  gap: 6,
                  paddingVertical: spacing.md,
                  borderRadius: radius.md,
                  backgroundColor: secili ? colors.primarySoft : colors.surfaceAlt,
                  borderWidth: 1.5,
                  borderColor: secili ? colors.primary : "transparent",
                }}
              >
                <Ionicons name={t.ikon} size={20} color={secili ? colors.primary : colors.textMuted} />
                <Text
                  style={{
                    color: secili ? colors.primary : colors.textMuted,
                    fontSize: fontSize.xs,
                    fontWeight: fontWeight.semibold,
                  }}
                >
                  {t.ad}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card onPress={() => router.push("/bilgi-bankasi")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Ionicons name="library" size={20} color={colors.primary} />
          <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold, flex: 1 }}>
            Bilgi Bankası
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
        </View>
      </Card>

      <Card onPress={sifirlaOnayi}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Ionicons name="trash" size={20} color={colors.danger} />
          <Text style={{ color: colors.danger, fontSize: fontSize.md, fontWeight: fontWeight.semibold, flex: 1 }}>
            Tüm Verileri Sıfırla
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
        </View>
      </Card>

      <Card>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: fontWeight.semibold }}>
            Ehliyet Ustası hakkında
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
            Bu uygulama tamamen çevrimdışı çalışır ve hiçbir kişisel veri toplamaz. İçerikler MEB e-sınav
            müfredatına uygun olarak hazırlanmış özgün eğitim materyalleridir. Resmî MEB kaynağı değildir;
            hazırlık amaçlıdır.
          </Text>
          <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, marginTop: spacing.sm }}>
            Sürüm 1.0.0
          </Text>
        </View>
      </Card>
    </Screen>
  );
}
