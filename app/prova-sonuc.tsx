import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, Card, ProgressRing, ConfirmDialog } from "@/components/ui";
import type { DialogButton } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { provaDetayAl } from "@/utils/provaSonuc";
import { usePuanIstegiTetikle } from "@/store/usePuanIstegi";
import { DERSLER } from "@/data/dersler";
import { konuBul } from "@/data/konular";
import { konuKaybiHesapla } from "@/utils/provaAnaliz";
import type { DersId } from "@/types";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function ProvaSonucScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const detay = provaDetayAl();
  const viewShotRef = React.useRef<ViewShot>(null);
  const [dialog, setDialog] = useState<{ title: string; message?: string; buttons: DialogButton[] } | null>(null);
  const bilgiVer = (title: string, message: string) => setDialog({ title, message, buttons: [{ text: "Tamam" }] });

  const paylas = async () => {
    try {
      if (!viewShotRef.current?.capture) {
        bilgiVer("Paylaşım", "Sonuç görseli henüz hazır değil. Biraz sonra tekrar dene.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        bilgiVer("Paylaşım", "Bu cihazda paylaşım desteklenmiyor.");
        return;
      }
      await Sharing.shareAsync(uri, {
        dialogTitle: "Sınav Sonucumu Paylaş",
        mimeType: "image/jpeg",
      });
    } catch (err) {
      console.error("Paylaşım hatası:", err);
      bilgiVer("Paylaşım", "Sonuç paylaşılamadı. Lütfen tekrar dene.");
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

  // Hangi konulardan kaç puan kaybedildi (en çok kayıptan başlayarak, en fazla 5)
  const kayipKonular = useMemo(
    () => (detay ? konuKaybiHesapla(detay.sorular, detay.cevaplar).slice(0, 5) : []),
    [detay]
  );

  usePuanIstegiTetikle(detay != null);

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

  // Soru incelemesinin üstündeki her şey listenin başlığı olur
  const ust = (
    <View style={{ gap: spacing.lg, paddingBottom: spacing.lg }}>
      <ScreenHeader title="Prova Sonucun" showBack={false} />

      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <View style={{ backgroundColor: colors.background, paddingBottom: spacing.md, paddingTop: spacing.sm }}>
          <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
            <Text style={{ color: colors.textFaint, fontSize: 11, fontFamily: fontFamily.bold, letterSpacing: 1 }}>
              EHLİYET USTASI · SINAV PROVASI
            </Text>
          </View>
          <View style={{ alignItems: "center", gap: spacing.lg }}>
            <ProgressRing
              progress={oran}
              size={150}
              strokeWidth={10}
              label={`${detay.puan}`}
              sublabel="puan / 100"
              color={detay.gecti ? colors.success : colors.danger}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons
                name={detay.gecti ? "checkmark-circle" : "close-circle"}
                size={20}
                color={detay.gecti ? colors.success : colors.danger}
              />
              <Text
                style={{
                  color: detay.gecti ? colors.success : colors.danger,
                  fontSize: fontSize.lg,
                  fontFamily: fontFamily.extrabold,
                }}
              >
                {detay.gecti ? "Tebrikler, geçtin!" : "Baraj altında kaldın"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: spacing.xl, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, width: "100%", justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.dogru}
                </Text>
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>Doğru</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.yanlis}
                </Text>
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>Yanlış</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
                  {detay.bos}
                </Text>
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>Boş</Text>
              </View>
            </View>
          </View>
        </View>
      </ViewShot>

      <Button
        label="Sonucumu Paylaş"
        icon="share-social"
        variant="primary"
        onPress={paylas}
      />

      <View>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginBottom: spacing.sm }}>
          Derslere Göre
        </Text>
        {dersOzet.map(({ ders, dogru, toplam }, i) => (
          <View
            key={ders.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              paddingVertical: 12,
              borderTopWidth: i === 0 ? 1 : 0,
              borderBottomWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ders.renk }} />
            <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold, flex: 1 }}>{ders.kisaAd}</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
              {dogru}/{toplam} doğru
            </Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginBottom: spacing.sm }}>
          Puan Kaybettiğin Konular
        </Text>
        {kayipKonular.length === 0 ? (
          <Text style={{ color: colors.success, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
            Hiç puan kaybetmedin, kusursuz bir prova!
          </Text>
        ) : (
          kayipKonular.map((k, i) => {
            const konu = konuBul(k.konuId);
            const ders = DERSLER.find((d) => d.id === k.dersId);
            return (
              <Pressable
                key={k.konuId}
                onPress={() => router.push(`/konu/${k.konuId}`)}
                accessibilityRole="button"
                accessibilityLabel={`${konu?.baslik ?? k.konuId}: ${k.kayipPuan} puan kaybı. Konuyu aç`}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  paddingVertical: 12,
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ders?.renk ?? colors.primary }} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold }} numberOfLines={2}>
                    {konu?.baslik ?? k.konuId}
                  </Text>
                  <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
                    {k.yanlis} yanlış · {k.bos} boş · {k.toplam} sorudan
                  </Text>
                </View>
                <Text style={{ color: colors.danger, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                  −{k.kayipPuan}
                </Text>
                <Ionicons name="chevron-forward" size={15} color={colors.textFaint} />
              </Pressable>
            );
          })
        )}
      </View>

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
    </View>
  );

  // 50 soru (ve içlerindeki sahneler) bir arada çizilmez: ekrana yaklaştıkça parça parça çizilir,
  // uzaklaşanlar bırakılır. Sahneler kendiliğinden oynamaz, dokununca oynar (zayıf telefonda kaydırma takılmasın).
  return (
    <Screen scroll={false} padded={false}>
      <FlatList
        data={detay.sorular}
        keyExtractor={(soru, i) => `${soru.id}-${i}`}
        ListHeaderComponent={ust}
        renderItem={({ item: soru, index: i }) => (
          <SoruBileseni
            soru={soru}
            secilenIndex={detay.cevaplar[i]}
            cevaplandi
            geriBildirimGoster
            onSecim={() => {}}
            siraNo={i + 1}
            toplam={detay.sorular.length}
            sahneOtomatik={false}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.xxl }} />}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={7}
        style={{ flex: 1 }}
      />

      <ConfirmDialog
        visible={dialog != null}
        onRequestClose={() => setDialog(null)}
        title={dialog?.title ?? ""}
        message={dialog?.message}
        buttons={dialog?.buttons ?? [{ text: "Tamam" }]}
      />
    </Screen>
  );
}
