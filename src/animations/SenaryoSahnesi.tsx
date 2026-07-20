import React from "react";
import Svg, { Circle, G, Line, Polygon, Rect, Text as SvgText } from "react-native-svg";
import type { SenaryoAnimId } from "@/types";
import { SENARYO_H, SENARYO_W } from "./senaryoKeyframes";

const ASFALT = "#334155";
const YOL = "#475569";
const CIZGI = "#E2E8F0";
const KALDIRIM = "#64748B";
const YAYA = "#F8FAFC";

function KavşakCizgileri() {
  return (
    <>
      <Rect x={118} y={0} width={64} height={SENARYO_H} fill={YOL} />
      <Rect x={0} y={68} width={SENARYO_W} height={44} fill={YOL} />
      <Line x1={150} y1={0} x2={150} y2={68} stroke={CIZGI} strokeWidth={2} strokeDasharray="8 6" />
      <Line x1={150} y1={112} x2={150} y2={SENARYO_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="8 6" />
      <Line x1={0} y1={90} x2={118} y2={90} stroke={CIZGI} strokeWidth={2} strokeDasharray="8 6" />
      <Line x1={182} y1={90} x2={SENARYO_W} y2={90} stroke={CIZGI} strokeWidth={2} strokeDasharray="8 6" />
    </>
  );
}

function YayaGecidiCizgileri({ x }: { x: number }) {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Rect key={i} x={x - 14 + i * 5} y={72} width={3} height={44} fill={YAYA} opacity={0.85} />
      ))}
    </>
  );
}

export function SenaryoSahnesi({ tip }: { tip: SenaryoAnimId }) {
  return (
    <Svg width={SENARYO_W} height={SENARYO_H} viewBox={`0 0 ${SENARYO_W} ${SENARYO_H}`}>
      <Rect x={0} y={0} width={SENARYO_W} height={SENARYO_H} rx={12} fill={ASFALT} />

      {tip === "kavsakOncelik" && (
        <>
          <KavşakCizgileri />
          <Polygon points="138,108 150,96 162,108" fill="#FBBF24" />
          <SvgText x={150} y={22} fill="#94A3B8" fontSize={10} textAnchor="middle">
            Kavşak
          </SvgText>
        </>
      )}

      {tip === "anaYolTali" && (
        <>
          <Rect x={0} y={78} width={SENARYO_W} height={34} fill={YOL} />
          <Rect x={138} y={0} width={24} height={SENARYO_H} fill={YOL} opacity={0.7} />
          <Line x1={0} y1={95} x2={SENARYO_W} y2={95} stroke="#FBBF24" strokeWidth={3} />
          <Line x1={150} y1={0} x2={150} y2={78} stroke={CIZGI} strokeWidth={2} strokeDasharray="6 6" />
          <Line x1={150} y1={112} x2={150} y2={SENARYO_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="6 6" />
          <SvgText x={55} y={72} fill="#FBBF24" fontSize={9} fontWeight="bold">
            ANA YOL
          </SvgText>
          <SvgText x={228} y={130} fill="#94A3B8" fontSize={9}>
            tali yol
          </SvgText>
        </>
      )}

      {tip === "donelKavsak" && (
        <>
          <Circle cx={150} cy={100} r={58} fill="none" stroke={YOL} strokeWidth={34} />
          <Circle cx={150} cy={100} r={28} fill="#1E293B" stroke={KALDIRIM} strokeWidth={2} />
          <SvgText x={150} y={104} fill="#94A3B8" fontSize={8} textAnchor="middle">
            ADA
          </SvgText>
          <Polygon points="142,168 150,156 158,168" fill="#FBBF24" />
        </>
      )}

      {tip === "durLevhasi" && (
        <>
          <KavşakCizgileri />
          <Polygon points="135,108 150,88 165,108 150,128" fill="#EF4444" />
          <SvgText x={150} y={108} fill="#FFF" fontSize={9} fontWeight="bold" textAnchor="middle">
            DUR
          </SvgText>
        </>
      )}

      {tip === "sollama" && (
        <>
          <Rect x={20} y={55} width={260} height={70} fill={YOL} rx={4} />
          <Line x1={20} y1={90} x2={280} y2={90} stroke={CIZGI} strokeWidth={2} strokeDasharray="10 8" />
          <Line x1={20} y1={72} x2={280} y2={72} stroke="#EF4444" strokeWidth={3} opacity={0.45} />
          <SvgText x={150} y={22} fill="#FCA5A5" fontSize={9} textAnchor="middle">
            karşı şerit — sollama yasak bölge
          </SvgText>
        </>
      )}

      {tip === "parkYasak" && (
        <>
          <Rect x={0} y={70} width={SENARYO_W} height={50} fill={YOL} />
          <Rect x={188} y={20} width={112} height={SENARYO_H} fill={KALDIRIM} />
          <Line x1={188} y1={20} x2={188} y2={SENARYO_H} stroke={CIZGI} strokeWidth={2} />
          <Rect x={200} y={58} width={88} height={64} rx={6} fill="#EF4444" opacity={0.25} stroke="#EF4444" strokeWidth={2} />
          <Circle cx={244} cy={48} r={12} fill="#EF4444" />
          <Line x1={236} y1={40} x2={252} y2={56} stroke="#FFF" strokeWidth={3} />
          <Line x1={252} y1={40} x2={236} y2={56} stroke="#FFF" strokeWidth={3} />
          <SvgText x={244} y={132} fill="#FCA5A5" fontSize={9} textAnchor="middle">
            park yasak
          </SvgText>
        </>
      )}

      {tip === "yayaGecidi" && (
        <>
          <Rect x={0} y={78} width={SENARYO_W} height={34} fill={YOL} />
          <YayaGecidiCizgileri x={178} />
          <SvgText x={178} y={68} fill="#FBBF24" fontSize={9} textAnchor="middle" fontWeight="bold">
            yaya geçidi
          </SvgText>
        </>
      )}

      {tip === "seritDegisim" && (
        <>
          <Rect x={60} y={30} width={180} height={120} fill={YOL} />
          <Line x1={150} y1={30} x2={150} y2={150} stroke={CIZGI} strokeWidth={2} strokeDasharray="12 8" />
          <SvgText x={105} y={22} fill="#94A3B8" fontSize={9} textAnchor="middle">
            sol şerit
          </SvgText>
          <SvgText x={195} y={22} fill="#94A3B8" fontSize={9} textAnchor="middle">
            sağ şerit
          </SvgText>
          <G opacity={0.8}>
            <Circle cx={42} cy={90} r={14} fill="#1E293B" stroke="#6366F1" strokeWidth={2} />
            <SvgText x={42} y={94} fill="#A5B4FC" fontSize={8} textAnchor="middle">
              ayna
            </SvgText>
          </G>
        </>
      )}
    </Svg>
  );
}
