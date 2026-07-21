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
  Extrapolation,
} from "react-native-reanimated";
import Svg, { Rect, Path, Circle, G, Ellipse } from "react-native-svg";
import type { ManevraTipi } from "@/types";
import { useTheme } from "@/theme";
import { DESIGN_H, DESIGN_W, MANEVRALAR } from "./keyframes";
import { ManevraSahnesi } from "./ManevraSahnesi";

const CAR_W = 28;
const CAR_H = 50;

function AnimatedCar({ tip }: { tip: ManevraTipi }) {
  const tanim = MANEVRALAR[tip];
  const t = useSharedValue(0);
  const pulse = useSharedValue(0);
  const segments = tanim.keyframes.length - 1;

  useEffect(() => {
    t.value = 0;
    // Sinyal yanıp sönmesi için sürekli pulse
    pulse.value = withRepeat(withTiming(1, { duration: 350 }), -1, true);

    t.value = withRepeat(
      withTiming(segments, { duration: tanim.sureMs, easing: Easing.linear }),
      -1,
      tanim.yoyo
    );
    return () => {
      cancelAnimation(t);
      cancelAnimation(pulse);
    };
  }, [tip]);

  const inputRange = tanim.keyframes.map((_, i) => i);
  const xs = tanim.keyframes.map((k) => k.x);
  const ys = tanim.keyframes.map((k) => k.y);
  const as = tanim.keyframes.map((k) => k.a);
  const brake = tanim.keyframes.map((k) => k.brake);
  const sigL = tanim.keyframes.map((k) => k.signalLeft);
  const sigR = tanim.keyframes.map((k) => k.signalRight);

  const style = useAnimatedStyle(() => {
    const cx = interpolate(t.value, inputRange, xs, Extrapolation.CLAMP);
    const cy = interpolate(t.value, inputRange, ys, Extrapolation.CLAMP);
    const angle = interpolate(t.value, inputRange, as, Extrapolation.CLAMP);
    return {
      transform: [
        { translateX: cx - CAR_W / 2 },
        { translateY: cy - CAR_H / 2 },
        { rotate: `${angle}deg` },
      ],
    };
  });

  const brakeStyle = useAnimatedStyle(() => {
    const isBraking = interpolate(t.value, inputRange, brake, Extrapolation.CLAMP);
    return { opacity: isBraking > 0.5 ? 1 : 0.3 };
  });

  const leftSignalStyle = useAnimatedStyle(() => {
    const isOn = interpolate(t.value, inputRange, sigL, Extrapolation.CLAMP);
    return { opacity: isOn > 0.5 && pulse.value > 0.5 ? 1 : 0 };
  });

  const rightSignalStyle = useAnimatedStyle(() => {
    const isOn = interpolate(t.value, inputRange, sigR, Extrapolation.CLAMP);
    return { opacity: isOn > 0.5 && pulse.value > 0.5 ? 1 : 0 };
  });

  // SVG Animasyonlu sarmalayıcı (Bileşenleri ayırmak için Animated.createAnimatedComponent kullanabilirdik ama G yerine doğrudan View sarmalıyoruz)
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          width: CAR_W,
          height: CAR_H,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Svg width={CAR_W + 10} height={CAR_H + 10} viewBox={`-5 -5 ${CAR_W + 10} ${CAR_H + 10}`}>
        {/* Gölgelik */}
        <Rect x={-2} y={-2} width={CAR_W + 4} height={CAR_H + 4} rx={10} fill="rgba(0,0,0,0.3)" />
        
        {/* Tekerlekler */}
        <Rect x={-3} y={8} width={4} height={10} rx={1} fill="#111" />
        <Rect x={CAR_W - 1} y={8} width={4} height={10} rx={1} fill="#111" />
        <Rect x={-3} y={CAR_H - 16} width={4} height={10} rx={1} fill="#111" />
        <Rect x={CAR_W - 1} y={CAR_H - 16} width={4} height={10} rx={1} fill="#111" />
        
        {/* Ana Gövde */}
        <Rect x={0} y={0} width={CAR_W} height={CAR_H} rx={8} fill="#2563EB" />
        
        {/* Ön Cam */}
        <Path d={`M 3 12 Q ${CAR_W / 2} 8 ${CAR_W - 3} 12 L ${CAR_W - 4} 20 L 4 20 Z`} fill="#0F172A" />
        
        {/* Arka Cam */}
        <Path d={`M 4 38 L ${CAR_W - 4} 38 L ${CAR_W - 5} 44 Q ${CAR_W / 2} 46 5 44 Z`} fill="#0F172A" />
        
        {/* Tavan Çizgisi */}
        <Rect x={4} y={20} width={CAR_W - 8} height={18} fill="#1D4ED8" />

        {/* Aynalar */}
        <Ellipse cx={-2} cy={16} rx={2} ry={4} fill="#1E3A8A" transform="rotate(-15 -2 16)" />
        <Ellipse cx={CAR_W + 2} cy={16} rx={2} ry={4} fill="#1E3A8A" transform="rotate(15 30 16)" />

        {/* Farlar (Beyaz) */}
        <Circle cx={4} cy={2} r={2} fill="#F8FAFC" />
        <Circle cx={CAR_W - 4} cy={2} r={2} fill="#F8FAFC" />
      </Svg>

      {/* Ön ve Arka Işıklar (View ile overlay yapıyoruz çünkü opacity animasyonu reanimated ile SVG içinde zorlanabilir) */}
      
      {/* Sol Sinyaller (Ön ve Arka) */}
      <Animated.View style={[{ position: "absolute", left: 1, top: -1, width: 4, height: 4, borderRadius: 2, backgroundColor: "#FBBF24" }, leftSignalStyle]} />
      <Animated.View style={[{ position: "absolute", left: 1, bottom: -1, width: 4, height: 4, borderRadius: 2, backgroundColor: "#FBBF24" }, leftSignalStyle]} />
      
      {/* Sağ Sinyaller (Ön ve Arka) */}
      <Animated.View style={[{ position: "absolute", right: 1, top: -1, width: 4, height: 4, borderRadius: 2, backgroundColor: "#FBBF24" }, rightSignalStyle]} />
      <Animated.View style={[{ position: "absolute", right: 1, bottom: -1, width: 4, height: 4, borderRadius: 2, backgroundColor: "#FBBF24" }, rightSignalStyle]} />

      {/* Fren Lambaları (Arka Sol ve Arka Sağ) */}
      <Animated.View style={[{ position: "absolute", left: 4, bottom: -1, width: 5, height: 3, borderTopLeftRadius: 2, borderBottomLeftRadius: 2, backgroundColor: "#EF4444" }, brakeStyle]} />
      <Animated.View style={[{ position: "absolute", right: 4, bottom: -1, width: 5, height: 3, borderTopRightRadius: 2, borderBottomRightRadius: 2, backgroundColor: "#EF4444" }, brakeStyle]} />

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
