import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen, ScreenHeader, Button, Card, ProgressBar, ProgressRing } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import type { Soru } from "@/types";

interface QuizRunnerProps {
  sorular: Soru[];
  baslik: string;
  altBaslik?: string;
}

export function QuizRunner({ sorular, baslik, altBaslik }: QuizRunnerProps) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const soruCevapla = useAppStore((s) => s.soruCevapla);

  const [index, setIndex] = useState(0);
  const [secilen, setSecilen] = useState<number | null>(null);
  const [cevaplandi, setCevaplandi] = useState(false);
  const [dogruSayisi, setDogruSayisi] = useState(0);
  const [bitti, setBitti] = useState(false);

  if (sorular.length === 0) {
    return (
      <Screen>
        <ScreenHeader title={baslik} />
        <View style={{ flex: 1, justifyContent: "center", paddingBottom: spacing.xxxl }}>
          <Card style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.xxxl, marginHorizontal: spacing.lg, borderRadius: radius["3xl"], borderWidth: 1, borderColor: colors.border, shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: radius.pill,
                backgroundColor: colors.infoSoft,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: spacing.sm,
              }}
            >
              <Text style={{ fontSize: 40 }}>🤔</Text>
            </View>
            <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
              Soru Bulunamadı
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, textAlign: "center", paddingHorizontal: spacing.md, lineHeight: 22 }}>
              Bu bölüm için henüz soru eklenmemiş. Lütfen daha sonra tekrar kontrol et.
            </Text>
            <View style={{ width: "100%", paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
              <Button label="Geri Dön" variant="secondary" icon="arrow-back" onPress={() => router.back()} />
            </View>
          </Card>
        </View>
      </Screen>
    );
  }

  const soru = sorular[index];

  const secim = (i: number) => {
    if (cevaplandi) return;
    setSecilen(i);
    setCevaplandi(true);
    if (soruCevapla(soru, i)) setDogruSayisi((d) => d + 1);
  };

  const sonraki = () => {
    if (index + 1 >= sorular.length) return setBitti(true);
    setIndex((v) => v + 1);
    setSecilen(null);
    setCevaplandi(false);
  };

  const bastanBasla = () => {
    setIndex(0);
    setSecilen(null);
    setCevaplandi(false);
    setDogruSayisi(0);
    setBitti(false);
  };

  if (bitti) {
    const oran = dogruSayisi / sorular.length;
    return (
      <Screen>
        <ScreenHeader title="Test Tamamlandı" subtitle={baslik} />
        <Card elevated style={{ alignItems: "center", gap: spacing.lg, paddingVertical: spacing.xl }}>
          <ProgressRing
            progress={oran}
            size={140}
            label={`${dogruSayisi}/${sorular.length}`}
            sublabel="doğru"
            color={oran >= 0.7 ? colors.success : oran >= 0.5 ? colors.warning : colors.danger}
          />
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            {oran >= 0.7 ? "Tebrikler, çok iyi!" : oran >= 0.5 ? "Fena değil, tekrar dene!" : "Konuyu tekrar oku."}
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
            Başarı oranın: %{Math.round(oran * 100)}
          </Text>
        </Card>
        <Button label="Tekrar Çöz" icon="refresh" onPress={bastanBasla} />
        <Button label="Geri Dön" variant="secondary" icon="arrow-back" onPress={() => router.back()} />
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
          <Button
            label={index + 1 >= sorular.length ? "Testi Bitir" : "Sonraki Soru"}
            iconRight={index + 1 >= sorular.length ? "flag" : "arrow-forward"}
            disabled={!cevaplandi}
            onPress={sonraki}
          />
        </View>
      }
    >
      <ScreenHeader title={baslik} subtitle={altBaslik} />
      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
            İlerleme: {index + 1}/{sorular.length}
          </Text>
          <Text style={{ color: colors.success, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
            {dogruSayisi} doğru
          </Text>
        </View>
        <ProgressBar progress={(index + (cevaplandi ? 1 : 0)) / sorular.length} height={6} />
      </View>

      <SoruBileseni
        soru={soru}
        secilenIndex={secilen}
        cevaplandi={cevaplandi}
        geriBildirimGoster
        onSecim={secim}
        siraNo={index + 1}
        toplam={sorular.length}
      />
    </Screen>
  );
}
