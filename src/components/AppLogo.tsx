import React from "react";
import { Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

type LogoSize = "sm" | "md" | "lg" | "xl" | "hero";

const SIZES: Record<LogoSize, number> = {
  sm: 52,
  md: 72,
  lg: 96,
  xl: 120,
  hero: 144,
};

let logoInstance = 0;

/** Ehliyet Ustası — premium uygulama ikonu tarzı logo */
export function AppLogo({
  size = "lg",
  variant = "default",
}: {
  size?: LogoSize;
  showGlow?: boolean;
  variant?: "default" | "flat";
}) {
  const dim = SIZES[size];
  const uid = React.useMemo(() => `lg${++logoInstance}`, []);
  const flat = variant === "flat";

  return (
    <View style={{ width: dim, height: dim, alignItems: "center", justifyContent: "center" }}>
      <Svg width={dim} height={dim} viewBox="0 0 120 120">
        <Defs>
          <LinearGradient id={`${uid}bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#7C3AED" />
            <Stop offset="45%" stopColor="#6366F1" />
            <Stop offset="100%" stopColor="#2563EB" />
          </LinearGradient>
          <LinearGradient id={`${uid}shine`} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <Stop offset="35%" stopColor="rgba(255,255,255,0.08)" />
            <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </LinearGradient>
          <LinearGradient id={`${uid}ring`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <Stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
          </LinearGradient>
          <LinearGradient id={`${uid}road`} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FDE68A" />
            <Stop offset="50%" stopColor="#FBBF24" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </LinearGradient>
        </Defs>

        {!flat && (
          <Rect x={4} y={4} width={112} height={112} rx={32} fill="rgba(99,102,241,0.25)" />
        )}

        <Rect x={10} y={10} width={100} height={100} rx={28} fill={`url(#${uid}bg)`} />
        <Rect x={10} y={10} width={100} height={52} rx={28} fill={`url(#${uid}shine)`} />
        <Rect
          x={10.5}
          y={10.5}
          width={99}
          height={99}
          rx={27.5}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth={1}
        />

        {/* Direksiyon halkası */}
        <G transform="translate(60, 58)" fill="none" stroke={`url(#${uid}ring)`} strokeLinecap="round">
          <Circle r={26} strokeWidth={3} />
          <Path d="M -21 11 L -8 4.5" strokeWidth={3} />
          <Path d="M 21 11 L 8 4.5" strokeWidth={3} />
          <Circle r={5.5} fill="rgba(255,255,255,0.95)" stroke="none" />
        </G>

        {/* Yukarı uzanan altın yol — başarıya giden yol */}
        <Path
          d="M 51 90 Q 55 66 60 48 Q 63 40 66 34"
          fill="none"
          stroke={`url(#${uid}road)`}
          strokeWidth={11}
          strokeLinecap="round"
        />
        <Path
          d="M 55 86 L 58 70 M 60 60 L 62 48"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Circle cx={66} cy={33} r={2.4} fill="#FEF3C7" />

        {/* Onay rozeti */}
        <Circle cx={92} cy={28} r={13} fill="#22C55E" />
        <Path
          d="M 87.5 28 L 90.5 31.5 L 97 24"
          fill="none"
          stroke="#FFF"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/** Marka başlığı — splash / onboarding */
export function BrandTitle({ large = false }: { large?: boolean }) {
  const mainSize = large ? 36 : 32;
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}>
      <Text
        style={{
          color: "#F8FAFC",
          fontSize: mainSize,
          fontWeight: "800",
          letterSpacing: -1.2,
        }}
      >
        Ehliyet
      </Text>
      <Text
        style={{
          fontSize: mainSize,
          fontWeight: "800",
          letterSpacing: -1.2,
          color: "#C4B5FD",
        }}
      >
        Ustası
      </Text>
    </View>
  );
}
