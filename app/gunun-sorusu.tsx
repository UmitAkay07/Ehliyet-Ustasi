import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Screen, ScreenHeader, Button, Card } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { useAppStore, bugunAnahtar } from "@/store/useAppStore";
import { gununSorusunuAl } from "@/utils/gununSorusu";

export default function GununSorusuScreen() {
  const { colors, fontSize, fontWeight, spacing } = useTheme();
  const soru = useMemo(() => gununSorusunuAl(), []);
  const gun = bugunAnahtar();
  const oncekiCevapId = useAppStore((s) => s.gununSorusuCevap[gun]);
  const oncekiDogru = useAppStore((s) => s.cozulenSorular[soru.id]?.dogru);
  const soruCevapla = useAppStore((s) => s.soruCevapla);
  const gununSorusuIsaretle = useAppStore((s) => s.gununSorusuIsaretle);

  const [secilen, setSecilen] = useState<number | null>(null);
  const [cevaplandi, setCevaplandi] = useState(Boolean(oncekiCevapId));
  const [dogruMu, setDogruMu] = useState<boolean | null>(
    oncekiCevapId ? oncekiDogru ?? null : null
  );

  const cevapla = () => {
    if (secilen == null || cevaplandi) return;
    const dogru = soruCevapla(soru, secilen);
    gununSorusuIsaretle(gun, soru.id);
    setDogruMu(dogru);
    setCevaplandi(true);
  };

  return (
    <Screen>
      <ScreenHeader title="Günün Sorusu" subtitle="Her gün bir yeni soru" />

      <Card>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
          Aynı gün içinde soru değişmez. Cevabın ilerlemene ve hata defterine işlenir.
        </Text>
      </Card>

      <SoruBileseni
        soru={soru}
        secilenIndex={secilen}
        cevaplandi={cevaplandi}
        geriBildirimGoster={cevaplandi}
        onSecim={(i) => {
          if (!cevaplandi) setSecilen(i);
        }}
      />

      {!cevaplandi ? (
        <Button label="Cevabı Kontrol Et" onPress={cevapla} disabled={secilen == null} icon="checkmark-circle" />
      ) : (
        <Card style={{ backgroundColor: dogruMu ? colors.successSoft : colors.dangerSoft }}>
          <View style={{ gap: spacing.sm }}>
            <Text
              style={{
                color: dogruMu ? colors.success : colors.danger,
                fontSize: fontSize.lg,
                fontWeight: fontWeight.bold,
              }}
            >
              {dogruMu ? "Doğru!" : "Yanlış"}
            </Text>
            {soru.aciklama ? (
              <Text style={{ color: colors.text, fontSize: fontSize.sm, lineHeight: 20 }}>{soru.aciklama}</Text>
            ) : null}
            <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
              Yarın yeni bir günün sorusu seni bekliyor.
            </Text>
          </View>
        </Card>
      )}
    </Screen>
  );
}
