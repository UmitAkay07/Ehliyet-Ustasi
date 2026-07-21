import React from "react";
import Svg, { Circle, Line, Rect, G, Polygon, Text as SvgText, Defs, LinearGradient, Stop, Path } from "react-native-svg";
import type { ManevraTipi } from "@/types";
import { DESIGN_H, DESIGN_W } from "./keyframes";

// Renk Paleti
const ASFALT = "#333A4D";
const ASFALT_ACIK = "#40485C";
const CIZGI = "#CBD5E1";
const SARI_CIZGI = "#FBBF24";
const KALDIRIM = "#94A3B8";
const KALDIRIM_KENAR = "#64748B";
const CIMS = "#22C55E";
const KONI_TURUNCU = "#EA580C";
const KONI_BEYAZ = "#F8FAFC";
const KONI_GOLGE = "rgba(0,0,0,0.4)";

function Koni({ x, y }: { x: number; y: number }) {
  return (
    <G>
      {/* Gölge */}
      <Ellipse cx={x + 2} cy={y + 3} rx={7} ry={4} fill={KONI_GOLGE} />
      {/* Taban */}
      <Circle cx={x} cy={y} r={6} fill={KONI_TURUNCU} />
      {/* Beyaz şerit */}
      <Circle cx={x} cy={y} r={4.5} fill={KONI_BEYAZ} />
      {/* Üst Kısım */}
      <Circle cx={x} cy={y} r={3} fill={KONI_TURUNCU} />
      <Circle cx={x} cy={y} r={1.5} fill="#FED7AA" />
    </G>
  );
}

// Basit Ellipse komponentini Svg import etmeyi unutmamak için (react-native-svg destekliyor ama yukarıda destructuring de koyalım)
import { Ellipse } from "react-native-svg";

function ParkedCar({ x, y, w = 42, h = 76 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <G>
      <Rect x={x - w / 2 - 2} y={y - h / 2 - 2} width={w + 4} height={h + 4} rx={10} fill="rgba(0,0,0,0.3)" />
      <Rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8} fill="#64748B" />
      <Rect x={x - w / 2 + 5} y={y - h / 2 + 10} width={w - 10} height={14} rx={3} fill="#1E293B" />
      <Rect x={x - w / 2 + 5} y={y + h / 2 - 24} width={w - 10} height={14} rx={3} fill="#1E293B" />
      <Rect x={x - w / 2 + 4} y={y - h / 2 + 22} width={w - 8} height={20} fill="#475569" />
    </G>
  );
}

function KaldirimUstu({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <G>
      <Rect x={x} y={y} width={w} height={h} fill={KALDIRIM} />
      <Rect x={x} y={y} width={w} height={4} fill={KALDIRIM_KENAR} />
    </G>
  );
}

export function ManevraSahnesi({ tip }: { tip: ManevraTipi }) {
  return (
    <Svg width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
      <Defs>
        <LinearGradient id="gradAsfalt" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={ASFALT} stopOpacity="1" />
          <Stop offset="1" stopColor={ASFALT_ACIK} stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Zemin Asfaltı */}
      <Rect x={0} y={0} width={DESIGN_W} height={DESIGN_H} rx={12} fill="url(#gradAsfalt)" />

      {/* Manevra Tipine Göre Çevre */}
      {tip === "paralelPark" && (
        <>
          <KaldirimUstu x={205} y={0} w={95} h={DESIGN_H} />
          {/* Çizgiler */}
          <Line x1={205} y1={0} x2={205} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={3} />
          <Line x1={145} y1={60} x2={205} y2={60} stroke={CIZGI} strokeWidth={2} strokeDasharray="6 6" />
          <Line x1={145} y1={175} x2={205} y2={175} stroke={CIZGI} strokeWidth={2} strokeDasharray="6 6" />
          
          {/* Üstteki araba yerine 4 duba */}
          <Koni x={145} y={5} />
          <Koni x={200} y={5} />
          <Koni x={145} y={60} />
          <Koni x={200} y={60} />
          
          {/* Alttaki araba yerine 4 duba */}
          <Koni x={145} y={175} />
          <Koni x={200} y={175} />
          <Koni x={145} y={235} />
          <Koni x={200} y={235} />
          
          <Line x1={80} y1={0} x2={80} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
        </>
      )}

      {tip === "lPark" && (
        <>
          <Rect x={0} y={118} width={DESIGN_W} height={102} fill={KALDIRIM} opacity={0.6} />
          <Line x1={0} y1={118} x2={DESIGN_W} y2={118} stroke={SARI_CIZGI} strokeWidth={3} />
          <Line x1={110} y1={118} x2={110} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={3} />
          <Line x1={155} y1={118} x2={155} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={3} />
          <Line x1={210} y1={118} x2={210} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={3} />
          
          <ParkedCar x={132} y={175} />
          
          <Koni x={155} y={124} />
          <Koni x={210} y={124} />
          <Koni x={155} y={180} />
          <Koni x={210} y={180} />
        </>
      )}

      {tip === "rampaKalkis" && (
        <>
          {/* Yokuş hissi vermek için gölgeli zemin (Rampa boyası) */}
          <Polygon points={`0,${DESIGN_H} ${DESIGN_W},${DESIGN_H} ${DESIGN_W},100 0,160`} fill="#293040" />
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} strokeDasharray="14 14" />
          <Line x1={100} y1={120} x2={200} y2={120} stroke={SARI_CIZGI} strokeWidth={4} />
          <Line x1={100} y1={170} x2={200} y2={170} stroke={SARI_CIZGI} strokeWidth={4} />
          <SvgText x={220} y={148} fill={SARI_CIZGI} fontSize={14} fontWeight="900" transform="rotate(-90 220 148)">
            YOKUŞ
          </SvgText>
        </>
      )}

      {tip === "aniFren" && (
        <>
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} strokeDasharray="14 14" />
          <Rect x={110} y={70} width={80} height={18} rx={6} fill="#EF4444" />
          <Rect x={115} y={73} width={70} height={12} rx={3} fill="#F87171" />
          <SvgText x={150} y={60} fill="#EF4444" fontSize={16} fontWeight="bold" textAnchor="middle">
            DUR!
          </SvgText>
        </>
      )}

      {tip === "uDonusu" && (
        <>
          {/* Dubalı U dönüşü alanı */}
          {/* Dış çerçeve dubaları */}
          {[20, 50, 80, 110, 140, 170, 200, 230].map(y => (
            <React.Fragment key={`left-${y}`}>
              <Koni x={80} y={y} />
              <Koni x={210} y={y} />
            </React.Fragment>
          ))}
          {[100, 120, 140, 160, 180].map(x => (
            <Koni key={`top-${x}`} x={x} y={20} />
          ))}
          
          {/* Orta ayrım dubaları (Araç 180'den gelip 110'dan çıkıyor, ayrım 145'te) */}
          {[90, 120, 150, 180, 210].map(y => (
            <Koni key={`mid-${y}`} x={145} y={y} />
          ))}
          
          {/* Yol Çizgisi */}
          <Line x1={145} y1={90} x2={145} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={2} strokeDasharray="8 8" />
        </>
      )}

      {tip === "seritDegistirme" && (
        <>
          <Line x1={100} y1={0} x2={100} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} strokeDasharray="16 16" />
          <Line x1={200} y1={0} x2={200} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} strokeDasharray="16 16" />
          
          <Polygon points="150,110 145,125 155,125" fill={CIZGI} opacity={0.5} />
          <Polygon points="150,160 145,175 155,175" fill={CIZGI} opacity={0.5} />
        </>
      )}

      {tip === "temelKumanda" && (
        <>
          <Line x1={90} y1={0} x2={90} y2={DESIGN_H} stroke={CIZGI} strokeWidth={4} />
          <Line x1={210} y1={0} x2={210} y2={DESIGN_H} stroke={CIZGI} strokeWidth={4} />
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={SARI_CIZGI} strokeWidth={2} strokeDasharray="16 16" />
        </>
      )}

      {tip === "geriManevra" && (
        <>
          <Line x1={90} y1={0} x2={90} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} />
          <Line x1={210} y1={0} x2={210} y2={DESIGN_H} stroke={CIZGI} strokeWidth={3} />
          
          {/* Başlangıç ve Bitiş çizgileri */}
          <Line x1={110} y1={40} x2={190} y2={40} stroke={SARI_CIZGI} strokeWidth={4} />
          <Line x1={110} y1={185} x2={190} y2={185} stroke={SARI_CIZGI} strokeWidth={4} />
          <SvgText x={150} y={100} fill="rgba(255,255,255,0.2)" fontSize={24} fontWeight="bold" textAnchor="middle" transform="rotate(-90 150 100)">
            25 METRE
          </SvgText>
        </>
      )}
    </Svg>
  );
}
