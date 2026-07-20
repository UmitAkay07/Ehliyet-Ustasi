import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import type { SenaryoAnimId } from "@/types";
import { CAR_H, CAR_W, EASE, interpolateKeyframes } from "./shared";
import { SENARYO_H, SENARYO_TANIMLAR, SENARYO_W } from "./senaryoKeyframes";
import { SenaryoSahnesi } from "./SenaryoSahnesi";

function Araba({ renk, style }: { renk: string; style: object }) {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: CAR_W,
          height: CAR_H,
          borderRadius: 6,
          backgroundColor: renk,
          borderWidth: 1.5,
          borderColor: "#0F172A",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 4,
        },
        style,
      ]}
    >
      <View
        style={{
          width: CAR_W - 8,
          height: 9,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.65)",
        }}
      />
      <View
        style={{
          width: CAR_W - 10,
          height: 6,
          borderRadius: 2,
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      />
    </Animated.View>
  );
}

function Yaya({ style }: { style: object }) {
  return (
    <Animated.View style={[{ position: "absolute", alignItems: "center" }, style]}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#FCD34D",
          borderWidth: 1,
          borderColor: "#92400E",
        }}
      />
      <View
        style={{
          width: 12,
          height: 16,
          marginTop: 1,
          borderRadius: 4,
          backgroundColor: "#3B82F6",
        }}
      />
    </Animated.View>
  );
}

function useAktorStili(
  anim: { keyframes: { x: number; y: number; a: number }[] },
  t: SharedValue<number>
) {
  return useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, anim.keyframes);
    return {
      transform: [
        { translateX: k.x - CAR_W / 2 },
        { translateY: k.y - CAR_H / 2 },
        { rotate: `${k.a}deg` },
      ],
    };
  });
}

function useYayaStili(
  anim: { keyframes: { x: number; y: number; a: number }[] },
  t: SharedValue<number>
) {
  return useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, anim.keyframes);
    return {
      transform: [{ translateX: k.x - 6 }, { translateY: k.y - 14 }],
    };
  });
}

function AktorAraba({
  aktor,
  t,
}: {
  aktor: { renk: string; anim: { keyframes: { x: number; y: number; a: number }[] } };
  t: SharedValue<number>;
}) {
  const stil = useAktorStili(aktor.anim, t);
  return <Araba renk={aktor.renk} style={stil} />;
}

function AktorYaya({
  anim,
  t,
}: {
  anim: { keyframes: { x: number; y: number; a: number }[] };
  t: SharedValue<number>;
}) {
  const stil = useYayaStili(anim, t);
  return <Yaya style={stil} />;
}

export function SenaryoAnimasyonu({ tip }: { tip: SenaryoAnimId }) {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const tanim = SENARYO_TANIMLAR[tip];
  const t = useSharedValue(0);
  const [playing, setPlaying] = useState(true);
  const segments = Math.max(
    ...tanim.aktorler.map((a) => a.anim.keyframes.length - 1),
    tanim.yaya ? tanim.yaya.keyframes.length - 1 : 1
  );

  useEffect(() => {
    cancelAnimation(t);
    t.value = 0;
    if (playing) {
      t.value = withRepeat(
        withTiming(segments, { duration: tanim.sureMs, easing: EASE }),
        -1,
        tanim.yoyo
      );
    }
    return () => cancelAnimation(t);
  }, [playing, tip, segments, tanim.sureMs, tanim.yoyo, t]);

  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.lg,
        padding: spacing.md,
        gap: spacing.sm,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: colors.textMuted,
            fontSize: fontSize.xs,
            fontWeight: fontWeight.semibold,
            flex: 1,
          }}
        >
          {tanim.baslik}
        </Text>
        <Pressable
          onPress={() => setPlaying((p) => !p)}
          hitSlop={8}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Ionicons name={playing ? "pause" : "play"} size={16} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: fontSize.xs }}>
            {playing ? "Duraklat" : "Oynat"}
          </Text>
        </Pressable>
      </View>

      <View style={{ width: SENARYO_W, height: SENARYO_H, borderRadius: 12, overflow: "hidden" }}>
        <SenaryoSahnesi tip={tip} />
        {tanim.aktorler.map((aktor, i) => (
          <AktorAraba key={`${tip}-${i}`} aktor={aktor} t={t} />
        ))}
        {tanim.yaya ? <AktorYaya anim={tanim.yaya} t={t} /> : null}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {tanim.aktorler.map((a) => (
          <View key={a.etiket} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: a.renk }} />
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>{a.etiket}</Text>
          </View>
        ))}
        {tanim.yaya ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#FCD34D" }} />
            <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>Yaya</Text>
          </View>
        ) : null}
      </View>

      <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, textAlign: "center" }}>
        {tanim.ipucu}
      </Text>
    </View>
  );
}
