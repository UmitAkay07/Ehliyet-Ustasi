import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Circle, G, Line, Rect, Text as SvgText } from "react-native-svg";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { CAR_H, CAR_W, EASE, interpolateKeyframes } from "./shared";

const W = 300;

function KonuFrame({
  title,
  height,
  children,
  playing,
  onToggle,
}: {
  title: string;
  height: number;
  children: React.ReactNode;
  playing: boolean;
  onToggle: () => void;
}) {
  const { colors, fontSize, spacing, radius } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
        marginVertical: spacing.sm,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm,
        }}
      >
        <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontWeight: "600", flex: 1 }}>
          {title}
        </Text>
        <Pressable onPress={onToggle} hitSlop={8} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name={playing ? "pause" : "play"} size={14} color={colors.primary} />
        </Pressable>
      </View>
      <View style={{ alignItems: "center", padding: spacing.sm, height: height + spacing.sm * 2 }}>
        {children}
      </View>
    </View>
  );
}

function useLoop(segments: number, sureMs: number, playing: boolean) {
  const t = useSharedValue(0);
  useEffect(() => {
    cancelAnimation(t);
    t.value = 0;
    if (playing) {
      t.value = withRepeat(withTiming(segments, { duration: sureMs, easing: EASE }), -1, true);
    }
    return () => cancelAnimation(t);
  }, [playing, segments, sureMs, t]);
  return t;
}

function TakipMesafesiAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(3, 3600, playing);
  const arka = useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, [
      { x: 200, y: 64, a: 0 },
      { x: 200, y: 64, a: 0 },
    ]);
    return { transform: [{ translateX: k.x - 25 }, { translateY: k.y - 14 }] };
  });
  const on = useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, [
      { x: 45, y: 64, a: 0 },
      { x: 95, y: 64, a: 0 },
      { x: 130, y: 64, a: 0 },
      { x: 130, y: 64, a: 0 },
    ]);
    return { transform: [{ translateX: k.x - 25 }, { translateY: k.y - 14 }] };
  });

  return (
    <KonuFrame title="Takip mesafesi — güvenli mesafe koru" height={120} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={120} viewBox={`0 0 ${W} 120`}>
        <Rect x={10} y={10} width={280} height={100} rx={10} fill="#1E293B" />
        <Line x1={70} y1={64} x2={195} y2={64} stroke="#FBBF24" strokeWidth={3} strokeDasharray="8 6" />
        <SvgText x={150} y={38} fill="#FBBF24" fontSize={11} textAnchor="middle" fontWeight="bold">
          takip mesafesi
        </SvgText>
        <SvgText x={150} y={105} fill="#CBD5E1" fontSize={10} textAnchor="middle">
          Öndeki araç yavaşlayınca mesafe korunur
        </SvgText>
      </Svg>
      <Animated.View style={[{ position: "absolute", width: 50, height: 28, borderRadius: 5, backgroundColor: "#6366F1", top: 54, left: 0 }, on]} />
      <Animated.View style={[{ position: "absolute", width: 50, height: 28, borderRadius: 5, backgroundColor: "#94A3B8", top: 54, left: 0 }, arka]} />
    </KonuFrame>
  );
}

function IkiSaniyeAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(2, 3000, playing);
  const onStil = useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, [
      { x: 50, y: 70, a: 0 },
      { x: 120, y: 70, a: 0 },
      { x: 180, y: 70, a: 0 },
    ]);
    return { transform: [{ translateX: k.x - 25 }, { translateY: k.y - 14 }] };
  });

  return (
    <KonuFrame title="2 saniye kuralı" height={120} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={120} viewBox={`0 0 ${W} 120`}>
        <Rect x={10} y={10} width={280} height={100} rx={10} fill="#1E293B" />
        <Rect x={120} y={30} width={60} height={36} rx={8} fill="#334155" stroke="#6366F1" strokeWidth={2} />
        <SvgText x={150} y={54} fill="#A5B4FC" fontSize={14} textAnchor="middle" fontWeight="bold">
          2 sn
        </SvgText>
        <SvgText x={150} y={105} fill="#CBD5E1" fontSize={10} textAnchor="middle">
          Sabit cisme ulaşmadan en az 2 saniye geçmeli
        </SvgText>
      </Svg>
      <Animated.View style={[{ position: "absolute", width: 50, height: 28, borderRadius: 5, backgroundColor: "#6366F1", top: 60, left: 0 }, onStil]} />
    </KonuFrame>
  );
}

function YayaGecitAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(4, 4000, playing);
  const araba = useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, [
      { x: 50, y: 75, a: 90 },
      { x: 120, y: 75, a: 90 },
      { x: 145, y: 75, a: 90 },
      { x: 145, y: 75, a: 90 },
      { x: 210, y: 75, a: 90 },
    ]);
    return { transform: [{ translateX: k.x - CAR_W / 2 }, { translateY: k.y - CAR_H / 2 }, { rotate: `${k.a}deg` }] };
  });
  const yaya = useAnimatedStyle(() => {
    const k = interpolateKeyframes(t.value, [
      { x: 165, y: 40, a: 0 },
      { x: 165, y: 55, a: 0 },
      { x: 165, y: 75, a: 0 },
      { x: 165, y: 95, a: 0 },
      { x: 165, y: 110, a: 0 },
    ]);
    return { transform: [{ translateX: k.x - 6 }, { translateY: k.y - 14 }] };
  });

  return (
    <KonuFrame title="Yaya geçidi önceliği" height={130} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={130} viewBox={`0 0 ${W} 130`}>
        <Rect x={10} y={30} width={280} height={50} rx={6} fill="#475569" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Rect key={i} x={158 + i * 5} y={52} width={3} height={30} fill="#F8FAFC" opacity={0.85} />
        ))}
        <SvgText x={150} y={115} fill="#CBD5E1" fontSize={10} textAnchor="middle">
          Geçitteki yayaya mutlaka yol verilir
        </SvgText>
      </Svg>
      <Animated.View style={[{ position: "absolute", width: CAR_W, height: CAR_H, borderRadius: 6, backgroundColor: "#22C55E", top: 0, left: 0 }, araba]} />
      <Animated.View style={[{ position: "absolute", alignItems: "center", top: 0, left: 0 }, yaya]}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#FCD34D" }} />
        <View style={{ width: 12, height: 16, borderRadius: 4, backgroundColor: "#3B82F6" }} />
      </Animated.View>
    </KonuFrame>
  );
}

function useHighlight(t: SharedValue<number>, count: number) {
  const [idx, setIdx] = useState(0);
  useAnimatedReaction(
    () => Math.floor(t.value) % count,
    (cur, prev) => {
      if (cur !== prev) runOnJS(setIdx)(cur);
    },
    [count]
  );
  return idx;
}

function SollamaKuralAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(3, 3600, playing);
  const idx = useHighlight(t, 4);
  const zones = ["Viraj", "Köprü/tünel", "Yaya geçidi", "Kavşak"];

  return (
    <KonuFrame title="Sollama yasağı olan yerler" height={120} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={120} viewBox={`0 0 ${W} 120`}>
        <Rect x={10} y={10} width={280} height={100} rx={10} fill="#1E293B" />
        {zones.map((z, i) => (
          <G key={z}>
            <Rect x={18 + i * 70} y={35} width={62} height={36} rx={8} fill="#7F1D1D" opacity={i === idx ? 0.95 : 0.35} />
            <SvgText x={49 + i * 70} y={58} fill="#FECACA" fontSize={9} textAnchor="middle">{z}</SvgText>
          </G>
        ))}
        <SvgText x={150} y={95} fill="#94A3B8" fontSize={10} textAnchor="middle">
          Devamlı çizgi + görüş kısıtlı bölgeler
        </SvgText>
      </Svg>
    </KonuFrame>
  );
}

function TydAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(1, 2000, playing);
  const basi = useAnimatedStyle(() => ({
    transform: [{ scaleY: 1 + (Math.sin(t.value * Math.PI) * 0.15) }],
  }));

  return (
    <KonuFrame title="Yetişkin TYD döngüsü — 30:2" height={120} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={120} viewBox={`0 0 ${W} 120`}>
        <Rect x={30} y={30} width={100} height={55} rx={10} fill="#EF4444" />
        <SvgText x={80} y={55} fill="#fff" fontSize={18} textAnchor="middle" fontWeight="bold">30</SvgText>
        <SvgText x={80} y={72} fill="#FEE2E2" fontSize={11} textAnchor="middle">göğüs basısı</SvgText>
        <SvgText x={150} y={60} fill="#FBBF24" fontSize={22} textAnchor="middle">+</SvgText>
        <Rect x={170} y={30} width={100} height={55} rx={10} fill="#3B82F6" />
        <SvgText x={220} y={55} fill="#fff" fontSize={18} textAnchor="middle" fontWeight="bold">2</SvgText>
        <SvgText x={220} y={72} fill="#DBEAFE" fontSize={11} textAnchor="middle">suni solunum</SvgText>
      </Svg>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 68,
            left: 55,
            width: 50,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#FCA5A5",
          },
          basi,
        ]}
      />
    </KonuFrame>
  );
}

function HeimlichAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(1, 1800, playing);
  const el = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.sin(t.value * Math.PI) * -8 }],
  }));

  return (
    <KonuFrame title="Heimlich — karına yukarı bası" height={140} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={140} viewBox={`0 0 ${W} 140`}>
        <Circle cx={150} cy={45} r={16} fill="#FCD34D" />
        <Rect x={130} y={60} width={40} height={55} rx={8} fill="#60A5FA" />
        <SvgText x={150} y={130} fill="#CBD5E1" fontSize={10} textAnchor="middle">
          Yumruk göbek üstü · yukarı-itme hareketi
        </SvgText>
      </Svg>
      <Animated.View
        style={[
          { position: "absolute", top: 78, left: 138, width: 24, height: 14, borderRadius: 4, backgroundColor: "#F97316" },
          el,
        ]}
      />
    </KonuFrame>
  );
}

function VitesAkisiAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(4, 4000, playing);
  const idx = useHighlight(t, 5);
  const labels = ["Motor", "Debriyaj", "Vites", "Diferansiyel", "Tekerlek"];

  return (
    <KonuFrame title="Motordan tekerleğe güç aktarımı" height={100} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={100} viewBox={`0 0 ${W} 100`}>
        {labels.map((lb, i) => (
          <G key={lb}>
            <Rect x={20 + i * 52} y={40} width={44} height={28} rx={4} fill={i === idx ? "#6366F1" : "#334155"} />
            <SvgText x={42 + i * 52} y={58} fill="#E2E8F0" fontSize={7} textAnchor="middle">{lb}</SvgText>
            {i < 4 && <Line x1={64 + i * 52} y1={54} x2={72 + i * 52} y2={54} stroke="#64748B" strokeWidth={2} />}
          </G>
        ))}
      </Svg>
    </KonuFrame>
  );
}

function AbsSemaAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(1, 2400, playing);
  const teker = useAnimatedStyle(() => ({
    opacity: 0.4 + Math.abs(Math.sin(t.value * Math.PI)) * 0.6,
  }));

  return (
    <KonuFrame title="ABS — tekerlek kilitlenmesini önler" height={130} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={130} viewBox={`0 0 ${W} 130`}>
        <Rect x={20} y={20} width={260} height={90} rx={10} fill="#1E293B" />
        <SvgText x={150} y={45} fill="#E2E8F0" fontSize={11} textAnchor="middle">Fren basıldığında ABS devreye girer</SvgText>
        <SvgText x={150} y={105} fill="#94A3B8" fontSize={10} textAnchor="middle">Tekerlek kilitlenmez · direksiyon kontrolü korunur</SvgText>
      </Svg>
      <Animated.View style={[{ position: "absolute", top: 58, left: 80, width: 36, height: 36, borderRadius: 18, borderWidth: 4, borderColor: "#22C55E" }, teker]} />
      <Animated.View style={[{ position: "absolute", top: 58, left: 184, width: 36, height: 36, borderRadius: 18, borderWidth: 4, borderColor: "#22C55E" }, teker]} />
    </KonuFrame>
  );
}

function GecisOncelikAnim() {
  const [playing, setPlaying] = useState(true);
  const t = useLoop(3, 4800, playing);
  const idx = useHighlight(t, 4);
  const items = [
    ["1", "Trafik görevlisi", "#EF4444"],
    ["2", "Işıklı işaret", "#F59E0B"],
    ["3", "Trafik levhası", "#3B82F6"],
    ["4", "Yer işaretlemesi", "#10B981"],
  ];

  return (
    <KonuFrame title="Öncelik sırası" height={140} playing={playing} onToggle={() => setPlaying((p) => !p)}>
      <Svg width={W} height={140} viewBox={`0 0 ${W} 140`}>
        {items.map(([n, label, c], i) => (
          <G key={n as string} opacity={i === idx ? 1 : 0.35}>
            <Circle cx={36} cy={28 + i * 28} r={12} fill={c as string} />
            <SvgText x={36} y={32 + i * 28} fill="#fff" fontSize={12} textAnchor="middle" fontWeight="bold">{n as string}</SvgText>
            <SvgText x={60} y={32 + i * 28} fill="#E2E8F0" fontSize={13}>{label as string}</SvgText>
          </G>
        ))}
      </Svg>
    </KonuFrame>
  );
}

export const KONU_ANIM_IDS = new Set([
  "takip-mesafesi",
  "2-saniye",
  "yaya-gecit-diyagram",
  "sollama-kural",
  "tyd-30-2",
  "heimlich",
  "vites-akisi",
  "abs-sema",
  "gecis-onceligi",
]);

const REGISTRY: Record<string, () => React.ReactElement> = {
  "takip-mesafesi": TakipMesafesiAnim,
  "2-saniye": IkiSaniyeAnim,
  "yaya-gecit-diyagram": YayaGecitAnim,
  "sollama-kural": SollamaKuralAnim,
  "tyd-30-2": TydAnim,
  heimlich: HeimlichAnim,
  "vites-akisi": VitesAkisiAnim,
  "abs-sema": AbsSemaAnim,
  "gecis-onceligi": GecisOncelikAnim,
};

export function KonuAnimasyonu({ id }: { id: string }) {
  const Comp = REGISTRY[id];
  if (!Comp) return null;
  return <Comp />;
}

export function konuAnimasyonluMu(id: string): boolean {
  return KONU_ANIM_IDS.has(id);
}
