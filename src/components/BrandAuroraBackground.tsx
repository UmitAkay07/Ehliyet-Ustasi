import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width: W, height: H } = Dimensions.get("window");

/** Yumuşak gradient arka plan — splash ve onboarding */
export function BrandAuroraBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={W} height={H}>
        <Defs>
          <LinearGradient id="bgBase" x1="0%" y1="0%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor="#030712" />
            <Stop offset="50%" stopColor="#0A0F1E" />
            <Stop offset="100%" stopColor="#0F172A" />
          </LinearGradient>
          <RadialGradient id="glow1" cx="30%" cy="22%" rx="45%" ry="35%">
            <Stop offset="0%" stopColor="rgba(6,182,212,0.35)" />
            <Stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </RadialGradient>
          <RadialGradient id="glow2" cx="75%" cy="55%" rx="40%" ry="35%">
            <Stop offset="0%" stopColor="rgba(245,158,11,0.25)" />
            <Stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </RadialGradient>
          <RadialGradient id="glow3" cx="50%" cy="85%" rx="50%" ry="30%">
            <Stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
            <Stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </RadialGradient>
        </Defs>
        <Rect width={W} height={H} fill="url(#bgBase)" />
        <Rect width={W} height={H} fill="url(#glow1)" />
        <Rect width={W} height={H} fill="url(#glow2)" />
        <Rect width={W} height={H} fill="url(#glow3)" />
        <Circle cx={W * 0.5} cy={H * 0.38} r={W * 0.55} fill="rgba(99,102,241,0.04)" />
      </Svg>
    </View>
  );
}
