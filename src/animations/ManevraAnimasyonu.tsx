import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import type { ManevraTipi } from "@/types";
import { useTheme } from "@/theme";
import { DESIGN_H, DESIGN_W, MANEVRALAR } from "./keyframes";
import { ManevraSahnesi } from "./ManevraSahnesi";

const CAR_W = 26;
const CAR_H = 46;

function AnimatedCar({ tip }: { tip: ManevraTipi }) {
  const tanim = MANEVRALAR[tip];
  const t = useSharedValue(0);
  const segments = tanim.keyframes.length - 1;

  useEffect(() => {
    t.value = 0;
    t.value = withRepeat(
      withTiming(segments, { duration: tanim.sureMs, easing: Easing.inOut(Easing.ease) }),
      -1,
      tanim.yoyo
    );
    return () => cancelAnimation(t);
  }, [tip]);

  const inputRange = tanim.keyframes.map((_, i) => i);
  const xs = tanim.keyframes.map((k) => k.x);
  const ys = tanim.keyframes.map((k) => k.y);
  const as = tanim.keyframes.map((k) => k.a);

  const style = useAnimatedStyle(() => {
    const cx = interpolate(t.value, inputRange, xs);
    const cy = interpolate(t.value, inputRange, ys);
    const angle = interpolate(t.value, inputRange, as);
    return {
      transform: [
        { translateX: cx - CAR_W / 2 },
        { translateY: cy - CAR_H / 2 },
        { rotate: `${angle}deg` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          width: CAR_W,
          height: CAR_H,
          borderRadius: 7,
          backgroundColor: "#6366F1",
          alignItems: "center",
          justifyContent: "flex-start",
          borderWidth: 1.5,
          borderColor: "#312E81",
        },
        style,
      ]}
    >
      {/* ön cam (burun göstergesi) */}
      <View
        style={{
          width: CAR_W - 10,
          height: 10,
          borderRadius: 3,
          backgroundColor: "#C7D2FE",
          marginTop: 5,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 5,
          width: CAR_W - 12,
          height: 8,
          borderRadius: 3,
          backgroundColor: "#4338CA",
        }}
      />
    </Animated.View>
  );
}

export function ManevraAnimasyonu({ tip }: { tip: ManevraTipi }) {
  const { colors, radius } = useTheme();
  const [genislik, setGenislik] = useState(DESIGN_W);
  const [nonce, setNonce] = useState(0);

  const scale = Math.min(1, genislik / DESIGN_W);

  return (
    <View
      onLayout={(e) => setGenislik(e.nativeEvent.layout.width)}
      style={{
        width: "100%",
        height: DESIGN_H * scale + 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: [{ scale }],
          borderRadius: radius.lg,
          overflow: "hidden",
        }}
      >
        <ManevraSahnesi tip={tip} />
        <AnimatedCar key={`${tip}-${nonce}`} tip={tip} />
      </View>

      <Pressable
        onPress={() => setNonce((n) => n + 1)}
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="refresh" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}
