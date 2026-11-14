import React, { useState, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Button, ProgressBar, ProgressRing } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { usePuanIstegiTetikle } from "@/store/usePuanIstegi";
import type { Soru } from "@/types";

interface QuizRunnerProps {
  sorular: Soru[];
  baslik: string;
  altBaslik?: string;
  /** Bitiş ekranında "Tekrar Çöz" düğmesi gösterilsin mi (varsayılan: evet) */
  yenidenBaslatilabilir?: boolean;
}

export function QuizRunner({ sorular, baslik, altBaslik, yenidenBaslatilabilir = true }: QuizRunnerProps) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const soruCevapla = useAppStore((s) => s.soruCevapla);
  const favoriler = useAppStore((s) => s.favoriler);
  const favoriDegistir = useAppStore((s) => s.favoriDegistir);

  const [index, setIndex] = useState(0);
  const [secilen, setSecilen] = useState<number | null>(null);
  const [cevaplandi, setCevaplandi] = useState(false);
  const cevapKilidi = useRef(false);
  const [dogruSayisi, setDogruSayisi] = useState(0);
  const [bitti, setBitti] = useState(false);
  usePuanIstegiTetikle(bitti);

  if (sorular.length === 0) {
    return (
      <Screen>
        <ScreenHeader title={baslik} />
        <View style={{ flex: 1, justifyContent: "center", paddingBottom: spacing.xxxl, paddingHorizontal: spacing.lg, gap: spacing.md, alignItems: "center" }}>
          <Ionicons name="help-circle-outline" size={40} color={colors.textFaint} />
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold, textAlign: "center" }}>
            Soru Bulunamadı
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold, textAlign: "center", lineHeight: 22 }}>
            Bu bölüm için henüz soru eklenmemiş. Lütfen daha sonra tekrar kontrol et.
          </Text>
          <View style={{ width: "100%", marginTop: spacing.lg }}>
            <Button label="Geri Dön" variant="secondary" onPress={() => router.back()} />
          </View>
        </View>
      </Screen>
    );
  }

  const soru = sorular[index];

  const secim = (i: number) => {
    // cevaplandi state'i bir sonraki çizime kadar güncellenmez; aynı karedeki ikinci dokunuş kilitten döner
    if (cevaplandi || cevapKilidi.current) return;
    cevapKilidi.current = true;
    setSecilen(i);
    setCevaplandi(true);
    if (soruCevapla(soru, i)) setDogruSayisi((d) => d + 1);
  };

  const sonraki = () => {
    if (index + 1 >= sorular.length) return setBitti(true);
    setIndex((v) => v + 1);
    setSecilen(null);
    setCevaplandi(false);
    cevapKilidi.current = false;
  };

  const bastanBasla = () => {
    cevapKilidi.current = false;
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
        <View style={{ alignItems: "center", gap: spacing.lg, paddingVertical: spacing.xl }}>
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
        </View>
        {yenidenBaslatilabilir ? <Button label="Tekrar Çöz" icon="refresh" onPress={bastanBasla} /> : null}
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

      <Pressable
        onPress={() => favoriDegistir(soru.id)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={favoriler?.[soru.id] ? "Favorilerden çıkar" : "Favorilere ekle"}
        style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", gap: 6 }}
      >
        <Ionicons
          name={favoriler?.[soru.id] ? "star" : "star-outline"}
          size={20}
          color={favoriler?.[soru.id] ? colors.warning : colors.textMuted}
        />
        <Text style={{ color: favoriler?.[soru.id] ? colors.warning : colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
          {favoriler?.[soru.id] ? "Favori" : "Favorile"}
        </Text>
      </Pressable>

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
