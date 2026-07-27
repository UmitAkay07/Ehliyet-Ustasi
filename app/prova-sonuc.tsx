import React, { useMemo } from "react";
import { Alert, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, Card, ProgressRing } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { provaDetayAl } from "@/utils/provaSonuc";
import { DERSLER } from "@/data/dersler";
import type { DersId } from "@/types";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function ProvaSonucScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const detay = provaDetayAl();
  const viewShotRef = React.useRef<ViewShot>(null);

  const paylas = async () => {
    try {
      if (!viewShotRef.current?.capture) {
        Alert.alert("Paylaşım", "Sonuç görseli henüz hazır değil. Biraz sonra tekrar dene.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Paylaşım", "Bu cihazda paylaşım desteklenmiyor.");
        return;
      }
      await Sharing.shareAsync(uri, {
        dialogTitle: "Sınav Sonucumu Paylaş",
        mimeType: "image/jpeg",
      });
    } catch (err) {
      console.error("Paylaşım hatası:", err);
      Alert.alert("Paylaşım", "Sonuç paylaşılamadı. Lütfen tekrar dene.");
    }
  };

  const dersOzet = useMemo(() => {
    if (!detay) return [];
    return DERSLER.map((ders) => {
      let dogru = 0;
      let toplam = 0;
      detay.sorular.forEach((soru, i) => {
        if (soru.dersId === (ders.id as DersId)) {
          toplam += 1;
          if (detay.cevaplar[i] === soru.dogruIndex) dogru += 1;
        }
      });
      return { ders, dogru, toplam };
    });
  }, [detay]);

  if (!detay) {
    return (
      <Screen>
        <ScreenHeader title="Sonuç" showBack={false} />
        <Card>
          <Text style={{ color: colors.textMuted }}>
            Sonuç verisi bellekte bulunamadı. Uygulama yeniden başlatılmış olabilir. Lütfen yeni bir prova başlatın.
          </Text>
        </Card>
        <Button label="Ana Sayfa" onPress={() => router.replace("/(tabs)")} />
      </Screen>
    );
  }

  const oran = detay.puan / 100;

  return (
    <Screen>
      <ScreenHeader title="Prova Sonucun" showBack={false} />

      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <View style={{ backgroundColor: colors.background, paddingBottom: spacing.md }}>
          <View style={{ alignItems: "center", marginBottom: spacing.md, paddingVertical: spacing.md, backgroundColor: colors.primary, borderRadius: radius.xl }}>
            <Text style={{ color: "#FFF", fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
              Ehliyet Ustası Sınav Provası
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
              Sürücü Adayı Ehliyet Sınavı Denemesi
            </Text>
          </View>
          <Card elevated style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.xl }}>
            <ProgressRing
              progress={oran}
              size={150}
              strokeWidth={13}
              label={`${detay.puan}`}
              sublabel="puan / 100"
              color={detay.gecti ? colors.success : colors.danger}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: detay.gecti ? colors.successSoft : colors.dangerSoft,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                borderRadius: 999,
              }}
            >
              <Ionicons
                name={detay.gecti ? "checkmark-circle" : "close-circle"}
                size={22}
                color={detay.gecti ? colors.success : colors.danger}
              />
              <Text
                style={{
                  color: detay.gecti ? colors.success : colors.danger,
                  fontSize: fontSize.lg,
                  fontFamily: fontFamily.bold,
                }}
              >
                {detay.gecti ? "Tebrikler, geçtin!" : "Baraj altında kaldın"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: spacing.xl }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.success, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.dogru}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>Doğru</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.danger, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.yanlis}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>Yanlış</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.bos}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>Boş</Text>
              </View>
            </View>
          </Card>
        </View>
      </ViewShot>

      <Button
        label="Sonucumu Paylaş"
        icon="share-social"
        variant="primary"
        onPress={paylas}
      />

      <Card>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold, marginBottom: spacing.md }}>
          Derslere Göre
        </Text>
        <View style={{ gap: spacing.md }}>
          {dersOzet.map(({ ders, dogru, toplam }) => (
            <View key={ders.id} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <Ionicons name={ders.ikon} size={18} color={ders.renk} />
              <Text style={{ color: colors.text, fontSize: fontSize.sm, flex: 1 }}>{ders.kisaAd}</Text>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
                {dogru}/{toplam} doğru
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Button
        label="Yanlışları Tekrar Et"
        icon="refresh-circle"
        variant="secondary"
        onPress={() => router.replace("/hatalar")}
      />
      <Button label="Ana Sayfaya Dön" icon="home" onPress={() => router.replace("/(tabs)")} />

      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold, marginTop: spacing.md }}>
        Soru İncelemesi
      </Text>
      <View style={{ gap: spacing.xxl }}>
        {detay.sorular.map((soru, i) => (
          <SoruBileseni
            key={`${soru.id}-${i}`}
            soru={soru}
            secilenIndex={detay.cevaplar[i]}
            cevaplandi
            geriBildirimGoster
            onSecim={() => {}}
            siraNo={i + 1}
            toplam={detay.sorular.length}
          />
        ))}
      </View>
    </Screen>
  );
}
