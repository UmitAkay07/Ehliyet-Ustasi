import React, { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui";
import { useTheme } from "@/theme";
import { provaOzetiHesapla, sonrakiDikkatIndeksi } from "@/utils/provaAnaliz";

interface ProvaOzetiProps {
  gorunur: boolean;
  onKapat: () => void;
  cevaplar: (number | null)[];
  isaretli: boolean[];
  /** Şu an ekranda olan soru (0'dan) */
  aktifIndex: number;
  onGit: (index: number) => void;
  onBitir: () => void;
}

const SUTUN = 5;

/** Gerçek e-sınavdaki gibi: tüm soruların durumu, boş ve işaretli sorulara atlama, sınavı bitirme */
export function ProvaOzeti({ gorunur, onKapat, cevaplar, isaretli, aktifIndex, onGit, onBitir }: ProvaOzetiProps) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const { height } = useWindowDimensions();
  const ozet = useMemo(() => provaOzetiHesapla(cevaplar, isaretli), [cevaplar, isaretli]);
  const dikkat = sonrakiDikkatIndeksi(ozet, aktifIndex);
  const dikkatBos = dikkat !== null && ozet.bosIndeksler.includes(dikkat);
  // Hücre boyu ızgara genişliğinden hesaplanır: yüzde genişlik + aspectRatio Android'de
  // hücreyi kare yapmıyor, numarayı da alta itiyordu.
  const [izgaraW, setIzgaraW] = useState(0);
  const hucreW = izgaraW > 0 ? Math.floor((izgaraW - spacing.sm * (SUTUN - 1)) / SUTUN) : 0;
  const hucreH = Math.round(hucreW * 0.8);

  return (
    <Modal visible={gorunur} transparent animationType="fade" onRequestClose={onKapat}>
      <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "center", padding: spacing.lg }}>
        <View
          style={{
            backgroundColor: colors.surfaceElevated,
            borderRadius: radius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.lg,
            gap: spacing.md,
            maxHeight: height * 0.88,
          }}
        >
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>Sınav Özeti</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.success, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Cevaplanan: {ozet.cevaplanan}
            </Text>
            <Text style={{ color: ozet.bos > 0 ? colors.danger : colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              Boş: {ozet.bos}
            </Text>
            <Text style={{ color: ozet.isaretli > 0 ? colors.warning : colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
              İşaretli: {ozet.isaretli}
            </Text>
          </View>

          <ScrollView style={{ flexGrow: 0 }} showsVerticalScrollIndicator={false}>
            <View
              onLayout={(e) => setIzgaraW(e.nativeEvent.layout.width)}
              style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
            >
              {hucreW > 0 && cevaplar.map((c, i) => {
                const cevaplandi = c !== null && c !== undefined;
                const aktif = i === aktifIndex;
                const flag = Boolean(isaretli[i]);
                return (
                  <Pressable
                    key={i}
                    onPress={() => {
                      onGit(i);
                      onKapat();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`${i + 1}. soru, ${cevaplandi ? "cevaplandı" : "boş"}${flag ? ", işaretli" : ""}`}
                    style={{
                      width: hucreW,
                      height: hucreH,
                      borderRadius: radius.md,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: cevaplandi ? colors.successSoft : colors.surface,
                      borderWidth: aktif || flag ? 2 : 1,
                      borderColor: aktif ? colors.primary : flag ? colors.warning : cevaplandi ? colors.success : colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: cevaplandi ? colors.success : colors.textMuted,
                        fontSize: fontSize.sm,
                        fontFamily: fontFamily.bold,
                      }}
                    >
                      {i + 1}
                    </Text>
                    {flag ? <Ionicons name="bookmark" size={11} color={colors.warning} style={{ position: "absolute", top: 2, right: 3 }} /> : null}
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View style={{ gap: spacing.sm }}>
            {dikkat !== null ? (
              <Button
                label={`${dikkatBos ? "Boş" : "İşaretli"} soruya git: ${dikkat + 1}. soru`}
                icon="arrow-forward-circle"
                variant="secondary"
                onPress={() => {
                  onGit(dikkat);
                  onKapat();
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              <Button label="Devam Et" variant="secondary" fullWidth={false} onPress={onKapat} style={{ flex: 1 }} />
              <Button
                label="Sınavı Bitir"
                icon="flag"
                fullWidth={false}
                onPress={() => {
                  onKapat();
                  onBitir();
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
