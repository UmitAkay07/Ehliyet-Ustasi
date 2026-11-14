import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useTheme } from "@/theme";
import { ManevraAnimasyonu } from "@/animations/ManevraAnimasyonu";
import { MANEVRALAR } from "@/animations/keyframes";
import { simSes } from "@/services/simSes";
import { useSimSesi } from "@/store/useSimSesi";
import { useEkranUyanik } from "@/services/ekranUyanik";
import type { ManevraTipi } from "@/types";

interface Props {
  dersId: string;
  animasyon: ManevraTipi;
  baslik: string;
}

type Durum = "hazir" | "oynuyor" | "duraklatildi" | "bitti";

/** Manevra simülasyonu oynatıcısı: kapak, oynat/duraklat, ilerleme çubuğu, baştan başlat, ses aç/kapat */
export function DireksiyonVideoOynatici({ animasyon }: Props) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const { sesAcik, sesDegistir } = useSimSesi();
  const [durum, setDurum] = useState<Durum>("hazir");
  const [tur, setTur] = useState(0);
  const ilerleme = useSharedValue(0);
  const saniye = Math.round(MANEVRALAR[animasyon].sureMs / 1000);
  // Manevra oynarken ekran kararmasın
  useEkranUyanik(durum === "oynuyor", "manevra-oynatici");

  const ilerlemeStili = useAnimatedStyle(() => ({ width: `${Math.min(1, Math.max(0, ilerleme.value)) * 100}%` }));

  const bastan = () => {
    setTur((n) => n + 1);
    setDurum("oynuyor");
  };
  const oynatDuraklat = () => {
    if (durum === "oynuyor") setDurum("duraklatildi");
    else if (durum === "bitti" || durum === "hazir") bastan();
    else setDurum("oynuyor");
  };
  const bitti = () => {
    setDurum("bitti");
    simSes.efekt("basari");
  };

  const ortuVar = durum === "hazir" || durum === "bitti";
  const yuvarlakDugme = {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  };

  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: colors.border }}>
        <ManevraAnimasyonu
          tip={animasyon}
          oynuyor={durum === "oynuyor"}
          dongu={false}
          sesli={sesAcik}
          yenidenBaslat={tur}
          ilerleme={ilerleme}
          onBitti={bitti}
          kapak
        />
        <Pressable
          onPress={oynatDuraklat}
          accessibilityRole="button"
          accessibilityLabel={durum === "oynuyor" ? "Duraklat" : "Oynat"}
          style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
        >
          {ortuVar ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.sm,
                backgroundColor: "rgba(8, 10, 12, 0.5)",
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.primary,
                }}
              >
                <Ionicons name={durum === "bitti" ? "refresh" : "play"} size={30} color={colors.onPrimary} style={{ marginLeft: durum === "bitti" ? 0 : 3 }} />
              </View>
              <Text style={{ color: "#FFFFFF", fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>
                {durum === "bitti" ? "Tekrar izle" : "Manevrayı izle"}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
                {durum === "bitti" ? "Manevra tamamlandı" : `${sesAcik ? "Sesli" : "Sessiz"} simülasyon · ${saniye} sn`}
              </Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable
          onPress={sesDegistir}
          accessibilityRole="button"
          accessibilityLabel={sesAcik ? "Sesi kapat" : "Sesi aç"}
          hitSlop={8}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(10, 12, 14, 0.66)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Ionicons name={sesAcik ? "volume-high" : "volume-mute"} size={17} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <Pressable onPress={oynatDuraklat} accessibilityRole="button" accessibilityLabel={durum === "oynuyor" ? "Duraklat" : "Oynat"} style={yuvarlakDugme}>
          <Ionicons name={durum === "oynuyor" ? "pause" : "play"} size={18} color={colors.text} />
        </Pressable>
        <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.surfaceAlt, overflow: "hidden" }}>
          <Animated.View style={[{ height: 6, borderRadius: 3, backgroundColor: colors.primary }, ilerlemeStili]} />
        </View>
        <Pressable onPress={bastan} accessibilityRole="button" accessibilityLabel="Baştan oynat" style={yuvarlakDugme}>
          <Ionicons name="refresh" size={18} color={colors.text} />
        </Pressable>
      </View>

    </View>
  );
}
