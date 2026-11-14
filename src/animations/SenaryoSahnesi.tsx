import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Line, Polygon, Rect, Text as SvgText } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { SAHNE_GENISLIK, SAHNE_YUKSEKLIK, sahneKaresi } from "./sahne";
import type { Prim, Sahne } from "./sahne";

const VARSAYILAN_SURE_MS = 7000;
/** Döngü sonunda son karede bekleme süresi */
const BEKLEME_MS = 1400;
const KARE_ARALIGI_MS = 50; // ~20 kare/sn: birkaç şekil için yeterli, pil dostu

export function PrimElemani({ p }: { p: Prim }) {
  switch (p.tip) {
    case "rect":
      return (
        <Rect
          x={p.x}
          y={p.y}
          width={p.w}
          height={p.h}
          fill={p.dolgu}
          stroke={p.kenar}
          strokeWidth={p.kenar ? p.kenarKalinlik ?? 0.3 : undefined}
          opacity={p.opaklik}
        />
      );
    case "cizgi":
      return (
        <Line
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke={p.renk}
          strokeWidth={p.kalinlik}
          strokeDasharray={p.kesik}
          opacity={p.opaklik}
        />
      );
    case "daire":
      return (
        <Circle
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={p.dolgu ?? "none"}
          stroke={p.kenar}
          strokeWidth={p.kenar ? p.kenarKalinlik ?? 0.3 : undefined}
          opacity={p.opaklik}
        />
      );
    case "cokgen":
      return (
        <Polygon
          points={p.noktalar.map((n) => `${n[0].toFixed(2)},${n[1].toFixed(2)}`).join(" ")}
          fill={p.dolgu}
          stroke={p.kenar}
          strokeWidth={p.kenar ? p.kenarKalinlik ?? 0.3 : undefined}
          opacity={p.opaklik}
        />
      );
    case "metin":
      return (
        <SvgText
          x={p.x}
          y={p.y}
          fontSize={p.boyut}
          fill={p.renk}
          textAnchor={p.hizala ?? "start"}
          fontWeight={p.kalin ? "bold" : "normal"}
        >
          {p.s}
        </SvgText>
      );
  }
}

/**
 * Soru üstünde gösterilen animasyonlu senaryo sahnesi.
 * Kareler JS zamanlayıcısıyla ilerler (az sayıda şekil olduğu için yeterlidir); ekrandan çıkınca durur.
 * Sahneye dokunmak oynat/duraklat, sağdaki düğme baştan oynatır.
 * `otomatikOynat={false}`: sahne ilk karede durur, ortadaki düğmeye dokununca oynar (uzun listelerde
 * onlarca sahne aynı anda dönüp telefonu yormasın).
 */
export function SenaryoSahnesi({ sahne, otomatikOynat = true }: { sahne: Sahne; otomatikOynat?: boolean }) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const sureMs = sahne.sureMs ?? VARSAYILAN_SURE_MS;
  const dongu = sureMs + BEKLEME_MS;

  const [oynuyor, setOynuyor] = useState(otomatikOynat);
  /** Hiç oynatılmadıysa ortada büyük oynat düğmesi görünür */
  const [basladi, setBasladi] = useState(otomatikOynat);
  const [t, setT] = useState(0);
  const fazRef = useRef(0); // döngü içindeki ms

  useEffect(() => {
    if (!oynuyor) return;
    let son = Date.now();
    const id = setInterval(() => {
      const simdi = Date.now();
      // Uygulama arka plana gidip dönerse animasyon sıçramasın
      const gecen = Math.min(simdi - son, 200);
      son = simdi;
      fazRef.current = (fazRef.current + gecen) % dongu;
      setT(Math.min(1, fazRef.current / sureMs));
    }, KARE_ARALIGI_MS);
    return () => clearInterval(id);
  }, [oynuyor, dongu, sureMs]);

  const basaSar = () => {
    fazRef.current = 0;
    setT(0);
    setOynuyor(true);
    setBasladi(true);
  };
  const oynatDuraklat = () => {
    setBasladi(true);
    setOynuyor((o) => !o);
  };

  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={oynatDuraklat}
        accessibilityRole="button"
        accessibilityLabel={oynuyor ? "Animasyonu duraklat" : "Animasyonu oynat"}
        style={{ aspectRatio: SAHNE_GENISLIK / SAHNE_YUKSEKLIK, width: "100%" }}
      >
        <Svg width="100%" height="100%" viewBox={`0 0 ${SAHNE_GENISLIK} ${SAHNE_YUKSEKLIK}`}>
          {sahneKaresi(sahne, t).map((p, i) => (
            <PrimElemani key={i} p={p} />
          ))}
        </Svg>
        {!basladi ? (
          <View
            pointerEvents="none"
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: radius.pill,
                backgroundColor: colors.primary,
              }}
            >
              <Ionicons name="play" size={16} color={colors.onPrimary} />
              <Text style={{ color: colors.onPrimary, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>Sahneyi oynat</Text>
            </View>
          </View>
        ) : null}
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          {sahne.lejant.map((satir) => (
            <Text key={satir} style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
              {satir}
            </Text>
          ))}
        </View>
        <Pressable
          onPress={oynatDuraklat}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={oynuyor ? "Duraklat" : "Oynat"}
        >
          <Ionicons name={oynuyor ? "pause-circle" : "play-circle"} size={26} color={colors.primary} />
        </Pressable>
        <Pressable onPress={basaSar} hitSlop={10} accessibilityRole="button" accessibilityLabel="Baştan oynat">
          <Ionicons name="refresh-circle" size={26} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}
