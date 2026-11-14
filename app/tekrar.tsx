import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, Card } from "@/components/ui";
import { QuizRunner } from "@/components/QuizRunner";
import { useTheme } from "@/theme";
import { useTekrarDurumu } from "@/store/useTekrarDurumu";
import { soruBul } from "@/data/sorular";
import { ARALIKLAR_GUN, OTURUM_LIMITI, kacGunSonra } from "@/utils/tekrar";
import type { Soru } from "@/types";

function sonrakiMetni(zaman: number, simdi: number): string {
  const gun = kacGunSonra(zaman, simdi);
  if (gun <= 0) return "bugün";
  return gun === 1 ? "yarın" : `${gun} gün sonra`;
}

export default function TekrarScreen() {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  const router = useRouter();
  const durum = useTekrarDurumu();

  // Çözerken kuyruk değişmesin diye başlarken anlık kopya alınır
  const [oturum, setOturum] = useState<Soru[] | null>(null);

  const bugunSayisi = Math.min(durum.simdiIds.length, OTURUM_LIMITI);
  const kalanSayisi = durum.simdiIds.length - bugunSayisi;

  if (oturum) {
    return (
      <QuizRunner
        sorular={oturum}
        baslik="Bugünkü Tekrar"
        altBaslik="Unutmadan pekiştir"
        // Aynı soruları hemen yeniden sormak takvimi bozar; yeni oturum canlı kuyruktan başlar
        yenidenBaslatilabilir={false}
      />
    );
  }

  const basla = () => {
    const sorular = durum.simdiIds
      .slice(0, OTURUM_LIMITI)
      .map((id) => soruBul(id))
      .filter((s): s is Soru => Boolean(s));
    if (sorular.length > 0) setOturum(sorular);
  };

  if (durum.simdiIds.length === 0) {
    return (
      <Screen>
        <ScreenHeader title="Bugünkü Tekrar" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingBottom: spacing.xxxl,
            paddingHorizontal: spacing.lg,
            gap: spacing.md,
            alignItems: "center",
          }}
        >
          <Ionicons name="checkmark-done" size={40} color={colors.success} />
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            {durum.sonraSayisi > 0 ? "Bugünlük tekrar tamam!" : "Takipte soru yok"}
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: fontSize.md,
              fontFamily: fontFamily.semibold,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            {durum.siradakiZaman !== null
              ? `Sıradaki tekrar ${sonrakiMetni(durum.siradakiZaman, durum.simdi)}. Toplam ${durum.sonraSayisi} soru planlı.`
              : "Yanlış bildiğin sorular burada otomatik olarak tekrar takvimine girer."}
          </Text>
          <View style={{ width: "100%", marginTop: spacing.lg }}>
            <Button label="Test Çözmeye Başla" onPress={() => router.push("/(tabs)/testler")} />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        <View
          style={{
            padding: spacing.lg,
            paddingTop: spacing.md,
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <Button label={`Tekrarı Başlat (${bugunSayisi})`} icon="refresh" onPress={basla} />
        </View>
      }
    >
      <ScreenHeader title="Bugünkü Tekrar" subtitle="Unutmadan pekiştir" />

      <Card elevated>
        <View style={{ alignItems: "center", gap: spacing.xs, paddingVertical: spacing.md }}>
          <Text style={{ color: colors.text, fontSize: 56, fontFamily: fontFamily.extrabold, letterSpacing: -1 }}>
            {durum.simdiIds.length}
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
            soru bugün seni bekliyor
          </Text>
          {kalanSayisi > 0 && (
            <Text style={{ color: colors.textFaint, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, marginTop: spacing.xs }}>
              Bir oturumda en fazla {OTURUM_LIMITI} soru sorulur, kalan {kalanSayisi} soru sonraki oturumda.
            </Text>
          )}
        </View>
      </Card>

      <View style={{ gap: spacing.sm }}>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
          Nasıl çalışır?
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 21 }}>
          Yanlış bildiğin sorular unutmadan önce {ARALIKLAR_GUN.join(", ")} gün arayla yeniden sorulur. Art arda
          doğru bildikçe aralık açılır, sorular kalıcı öğrenilince takipten çıkar. Sınav tarihin yaklaştıkça
          aralıklar kısalır.
        </Text>
        {durum.sonraSayisi > 0 && durum.siradakiZaman !== null && (
          <Text style={{ color: colors.textFaint, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
            Ayrıca {durum.sonraSayisi} soru ilerideki günlere planlı.
          </Text>
        )}
      </View>
    </Screen>
  );
}
