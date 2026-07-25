import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import type { Soru } from "@/types";
import { TRAFIK_ISARETLERI } from "@/data/isaretler";
import { IsaretGorseli } from "@/components/IsaretGorseli";


interface SoruBileseniProps {
  soru: Soru;
  secilenIndex: number | null;
  cevaplandi: boolean;
  geriBildirimGoster: boolean;
  onSecim: (index: number) => void;
  siraNo?: number;
  toplam?: number;
}

const SIKLAR = ["A", "B", "C", "D", "E"];

export function SoruBileseni({
  soru,
  secilenIndex,
  cevaplandi,
  geriBildirimGoster,
  onSecim,
  siraNo,
  toplam,
}: SoruBileseniProps) {
  const { colors, fontSize, fontWeight, fontFamily, spacing, radius } = useTheme();
  const gorselIsaret = soru.gorselIsaretId
    ? TRAFIK_ISARETLERI.find((i) => i.id === soru.gorselIsaretId)
    : undefined;

  const { shift, L, uiSecenekler, uiDogruIndex, uiSecilenIndex } = useMemo(() => {
    // Soru ID'sinden matematiksel bir hash (kaydırma miktarı) üretiyoruz
    let hash = 0;
    for (let i = 0; i < soru.id.length; i++) {
      hash = (hash << 5) - hash + soru.id.charCodeAt(i);
      hash |= 0;
    }
    const L = soru.secenekler.length;
    const s = Math.abs(hash) % L;

    // Şıkları s kadar kaydır
    const yeniSecenekler = new Array(L);
    for (let i = 0; i < L; i++) {
      yeniSecenekler[(i + s) % L] = soru.secenekler[i];
    }
    
    const yeniDogru = (soru.dogruIndex + s) % L;
    const yeniSecilen = secilenIndex != null ? (secilenIndex + s) % L : null;

    return { shift: s, L, uiSecenekler: yeniSecenekler, uiDogruIndex: yeniDogru, uiSecilenIndex: yeniSecilen };
  }, [soru.id, soru.secenekler, soru.dogruIndex, secilenIndex]);

  return (
    <View style={{ gap: spacing.lg }}>
      {siraNo != null && toplam != null && (
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
          Soru {siraNo} / {toplam}
        </Text>
      )}

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.lg,
          gap: spacing.md,
        }}
      >
        {gorselIsaret && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.surfaceAlt,
              borderRadius: radius.md,
              paddingVertical: spacing.lg,
              gap: spacing.sm,
            }}
          >
            <IsaretGorseli isaretId={gorselIsaret.id} kategori={gorselIsaret.kategori} boyut={88} />
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>Trafik işareti</Text>
          </View>
        )}

        <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.semibold, lineHeight: 26 }}>
          {soru.metin}
        </Text>
      </View>

      <View style={{ gap: spacing.md }}>
        {uiSecenekler.map((secenek, i) => {
          const secili = uiSecilenIndex === i;
          const dogruSik = i === uiDogruIndex;

          let arkaPlan = colors.surface;
          let kenar = colors.border;
          let metinRengi = colors.text;
          let ikon: { ad: any; renk: string } | null = null;

          if (cevaplandi && geriBildirimGoster) {
            if (dogruSik) {
              arkaPlan = colors.successSoft;
              kenar = colors.success;
              metinRengi = colors.text;
              ikon = { ad: "checkmark-circle", renk: colors.success };
            } else if (secili && !dogruSik) {
              arkaPlan = colors.dangerSoft;
              kenar = colors.danger;
              ikon = { ad: "close-circle", renk: colors.danger };
            }
          } else if (secili) {
            arkaPlan = colors.primarySoft;
            kenar = colors.primary;
          }

          return (
            <Pressable
              key={i}
              disabled={cevaplandi && geriBildirimGoster}
              onPress={() => {
                const originalIndex = (i - shift + L) % L;
                onSecim(originalIndex);
              }}
              accessibilityRole="radio"
              accessibilityState={{ checked: secili, disabled: cevaplandi && geriBildirimGoster }}
              accessibilityLabel={`${SIKLAR[i]} şıkkı: ${secenek}`}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
                backgroundColor: arkaPlan,
                borderColor: kenar,
                borderWidth: 1.5,
                borderRadius: radius.md,
                padding: spacing.md,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: secili ? colors.primary : colors.surfaceAlt,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: secili ? colors.onPrimary : colors.textMuted,
                    fontFamily: fontFamily.bold,
                    fontSize: fontSize.sm,
                  }}
                >
                  {SIKLAR[i]}
                </Text>
              </View>
              <Text style={{ color: metinRengi, fontSize: fontSize.md, flex: 1, lineHeight: 22 }}>
                {secenek}
              </Text>
              {ikon && <Ionicons name={ikon.ad} size={22} color={ikon.renk} />}
            </Pressable>
          );
        })}
      </View>

      {cevaplandi && geriBildirimGoster && (
        <View
          style={{
            backgroundColor: colors.infoSoft,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.info + "55",
            padding: spacing.md,
            flexDirection: "row",
            gap: spacing.sm,
          }}
        >
          <Ionicons name="bulb" size={20} color={colors.info} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontFamily: fontFamily.bold, marginBottom: 4 }}>
              Açıklama
            </Text>
            <Text style={{ color: colors.text, fontSize: fontSize.sm, lineHeight: 21 }}>
              {soru.aciklama}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
