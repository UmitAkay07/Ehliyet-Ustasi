import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, G, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// ==========================================
// Reusable Car Shapes
// ==========================================

const CarTopDown = ({ color }: { color: string }) => (
  <G>
    {/* Car Body */}
    <Rect x={-12} y={-24} width={24} height={48} rx={6} fill={color} />
    {/* Windshield */}
    <Rect x={-10} y={-14} width={20} height={12} rx={2} fill="#0F172A" opacity={0.4} />
    {/* Rear window */}
    <Rect x={-10} y={8} width={20} height={10} rx={2} fill="#0F172A" opacity={0.4} />
    {/* Headlights */}
    <Rect x={-10} y={-24} width={4} height={2} rx={1} fill="#FEF08A" opacity={0.8} />
    <Rect x={6} y={-24} width={4} height={2} rx={1} fill="#FEF08A" opacity={0.8} />
    {/* Taillights */}
    <Rect x={-10} y={22} width={6} height={2} rx={1} fill="#EF4444" opacity={0.8} />
    <Rect x={4} y={22} width={6} height={2} rx={1} fill="#EF4444" opacity={0.8} />
  </G>
);

const CarSideView = ({ color }: { color: string }) => (
  <G>
    {/* Car Body */}
    <Path
      d="M -24 0 L -24 -8 Q -24 -10 -22 -10 L -12 -10 L -6 -20 Q -4 -22 0 -22 L 8 -22 Q 10 -22 12 -20 L 18 -10 L 26 -10 Q 28 -10 28 -8 L 28 0 Z"
      fill={color}
    />
    {/* Windows */}
    <Path d="M -10 -10 L -5 -18 L 0 -18 L 0 -10 Z" fill="#0F172A" opacity={0.4} />
    <Path d="M 2 -10 L 2 -18 L 7 -18 L 11 -10 Z" fill="#0F172A" opacity={0.4} />
    {/* Wheels (background space) */}
    <Circle cx={-14} cy={0} r={6} fill="#ffffff" />
    <Circle cx={18} cy={0} r={6} fill="#ffffff" />
    {/* Wheels (actual) */}
    <Circle cx={-14} cy={0} r={5} fill="#1E293B" />
    <Circle cx={18} cy={0} r={5} fill="#1E293B" />
  </G>
);

// ==========================================
// 1. Temel Kumanda (Steering Wheel)
// ==========================================
const TemelKumandaIcon = ({ color }: { color: string }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(45, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(-45, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedProps(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <AnimatedG animatedProps={animatedStyle} origin="0, 0">
      <Circle cx={0} cy={0} r={24} stroke={color} strokeWidth={4} fill="transparent" />
      <Path d="M -24 0 L 24 0 M 0 0 L 0 24" stroke={color} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={0} cy={0} r={6} fill={color} />
    </AnimatedG>
  );
};

// ==========================================
// 2. Paralel Park
// ==========================================
const ParalelParkIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withDelay(1000, withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }))
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedProps(() => {
    // Moves back and right
    const x = interpolate(progress.value, [0, 0.4, 0.7, 1], [-25, -25, 0, 0]);
    const y = interpolate(progress.value, [0, 0.4, 0.7, 1], [-30, 0, 20, 0]);
    const rot = interpolate(progress.value, [0, 0.4, 0.7, 1], [0, -30, 15, 0]);

    return {
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${rot}deg` }],
    };
  });

  return (
    <G>
      {/* Target box */}
      <Rect x={-15} y={-26} width={30} height={52} rx={4} stroke="#475569" strokeWidth={2} strokeDasharray="4,4" fill="transparent" />
      {/* Front Car */}
      <G transform="translate(0, -60)">
        <CarTopDown color="#64748B" />
      </G>
      {/* Back Car */}
      <G transform="translate(0, 60)">
        <CarTopDown color="#64748B" />
      </G>
      {/* Animated Car */}
      <AnimatedG animatedProps={animatedStyle} origin="0, 0">
        <CarTopDown color={color} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 3. L Park
// ==========================================
const LParkIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withDelay(1000, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedProps(() => {
    const x = interpolate(progress.value, [0, 0.5, 1], [30, 30, 0]);
    const y = interpolate(progress.value, [0, 0.5, 1], [-20, 20, 20]);
    const rot = interpolate(progress.value, [0, 0.5, 1], [-90, -90, 0]);
    
    return {
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${rot}deg` }],
    };
  });

  return (
    <G>
      {/* L Box */}
      <Path d="M -16 40 L -16 -4 L 16 -4 L 16 40" stroke="#475569" strokeWidth={2} fill="transparent" strokeLinecap="round" />
      <Path d="M -30 -6 L 30 -6" stroke="#475569" strokeWidth={2} fill="transparent" strokeLinecap="round" />
      {/* Animated Car */}
      <AnimatedG animatedProps={animatedStyle} origin="0, 0">
        <CarTopDown color={color} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 4. Rampa Kalkış
// ==========================================
const RampaKalkisIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 500, easing: Easing.inOut(Easing.ease) }), // Slight rollback
        withDelay(400, withTiming(1, { duration: 1500, easing: Easing.in(Easing.ease) })), // Zoom up
        withTiming(0, { duration: 0 }) // Reset
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedProps(() => {
    const x = interpolate(progress.value, [0, 0.2, 1], [-15, -18, 25]);
    const y = interpolate(progress.value, [0, 0.2, 1], [5, 6, -11]);

    return {
      transform: [{ translateX: x }, { translateY: y }, { rotate: '-20deg' }],
    };
  });

  return (
    <G>
      {/* Ramp */}
      <Path d="M -35 15 L 35 -10 L 35 15 Z" fill="#334155" />
      {/* Animated Car Side */}
      <AnimatedG animatedProps={animatedStyle} origin="0, 0">
        <CarSideView color={color} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 5. U Dönüşü
// ==========================================
const UDonusuIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withDelay(500, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedProps(() => {
    const x = interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [15, 15, 0, -15, -15]);
    const y = interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [30, 0, -20, 0, 30]);
    const rot = interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0, -90, -180, -180]);

    return {
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${rot}deg` }],
    };
  });

  return (
    <G>
      {/* U Arrow line */}
      <Path d="M 15 30 L 15 0 Q 15 -20 0 -20 Q -15 -20 -15 0 L -15 30" stroke="#475569" strokeWidth={2} strokeDasharray="4,4" fill="transparent" />
      <AnimatedG animatedProps={animatedStyle} origin="0, 0">
        <CarTopDown color={color} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 6. Ani Fren
// ==========================================
const AniFrenIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }),
        withDelay(1000, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );
  }, []);

  const carStyle = useAnimatedProps(() => {
    const x = interpolate(progress.value, [0, 1], [-30, 10]);
    // Dip nose slightly when stopping
    const rot = interpolate(progress.value, [0, 0.8, 1], [0, 3, 0]);

    return {
      transform: [{ translateX: x }, { rotate: `${rot}deg` }],
    };
  });

  const skidStyle = useAnimatedProps(() => {
    const opacity = interpolate(progress.value, [0.5, 1], [0, 0.5]);
    return { opacity };
  });

  const lightStyle = useAnimatedProps(() => {
    const opacity = interpolate(progress.value, [0, 0.8, 1], [0, 0, 1]);
    return { opacity };
  });

  return (
    <G>
      {/* Ground line */}
      <Line x1="-40" y1="9" x2="40" y2="9" stroke="#475569" strokeWidth={2} />
      {/* Skid marks */}
      <AnimatedG animatedProps={skidStyle}>
        <Line x1="-20" y1="9" x2="0" y2="9" stroke="#1E293B" strokeWidth={3} strokeLinecap="round" />
      </AnimatedG>
      
      <AnimatedG animatedProps={carStyle} origin="0, 0">
        <CarSideView color={color} />
        {/* Brake lights */}
        <AnimatedCircle cx={-24} cy={-2} r={3} fill="#EF4444" animatedProps={lightStyle} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 7. Sinyal, Ayna, Şerit
// ==========================================
const SeritDegistirmeIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withDelay(1000, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );
  }, []);

  const carStyle = useAnimatedProps(() => {
    const x = interpolate(progress.value, [0, 0.4, 0.6, 1], [-12, -12, 12, 12]);
    const y = interpolate(progress.value, [0, 1], [30, -30]);
    const rot = interpolate(progress.value, [0, 0.4, 0.5, 0.6, 1], [0, 0, 15, 0, 0]);

    return {
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${rot}deg` }],
    };
  });

  const blinkerStyle = useAnimatedProps(() => {
    // Blink logic during 0 to 0.5
    const isBlinking = progress.value > 0 && progress.value < 0.6;
    const blinkVal = Math.sin(progress.value * Math.PI * 15); // Fast blink
    return {
      opacity: isBlinking && blinkVal > 0 ? 1 : 0,
    };
  });

  return (
    <G>
      {/* Lane line */}
      <Line x1="0" y1="-40" x2="0" y2="40" stroke="#475569" strokeWidth={2} strokeDasharray="6,6" />
      <AnimatedG animatedProps={carStyle} origin="0, 0">
        <CarTopDown color={color} />
        {/* Right Blinker */}
        <AnimatedCircle cx={8} cy={-24} r={4} fill="#F59E0B" animatedProps={blinkerStyle} />
        <AnimatedCircle cx={8} cy={22} r={4} fill="#F59E0B" animatedProps={blinkerStyle} />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// 8. Geri Manevra
// ==========================================
const GeriManevraIcon = ({ color }: { color: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.linear }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const carStyle = useAnimatedProps(() => {
    const y = interpolate(progress.value, [0, 1], [-30, 30]);
    return {
      transform: [{ translateY: y }],
    };
  });

  return (
    <G>
      {/* Path lines */}
      <Line x1="-15" y1="-40" x2="-15" y2="40" stroke="#475569" strokeWidth={1} strokeDasharray="4,4" />
      <Line x1="15" y1="-40" x2="15" y2="40" stroke="#475569" strokeWidth={1} strokeDasharray="4,4" />
      <AnimatedG animatedProps={carStyle}>
        <CarTopDown color={color} />
        {/* Reverse Lights */}
        <Rect x={-6} y={22} width={3} height={2} fill="#ffffff" />
        <Rect x={3} y={22} width={3} height={2} fill="#ffffff" />
      </AnimatedG>
    </G>
  );
};

// ==========================================
// Main Export Wrapper
// ==========================================
interface ManevraIconProps {
  type: string;
  size?: number;
  color?: string;
}

export function ManevraIcon({ type, size = 64, color = '#6366F1' }: ManevraIconProps) {
  // Translate the 100x100 internal coordinate system to the requested size
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="-50 -50 100 100">
        {type === 'dr-temel-kumanda' && <TemelKumandaIcon color={color} />}
        {type === 'dr-paralel-park' && <ParalelParkIcon color={color} />}
        {type === 'dr-l-park' && <LParkIcon color={color} />}
        {type === 'dr-rampa-kalkis' && <RampaKalkisIcon color={color} />}
        {type === 'dr-u-donusu' && <UDonusuIcon color={color} />}
        {type === 'dr-ani-fren' && <AniFrenIcon color={color} />}
        {type === 'dr-sinyal-ayna' && <SeritDegistirmeIcon color={color} />}
        {type === 'dr-geri-manevra' && <GeriManevraIcon color={color} />}
      </Svg>
    </View>
  );
}
