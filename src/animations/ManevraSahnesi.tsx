import React from "react";
import Svg, { Circle, Line, Rect, G, Polygon, Text as SvgText } from "react-native-svg";
import type { ManevraTipi } from "@/types";
import { DESIGN_H, DESIGN_W } from "./keyframes";

const ASFALT = "#39425A";
const CIZGI = "#E2E8F0";
const KALDIRIM = "#5B6478";
const PARK_CIZGI = "#FBBF24";
const KONI = "#F97316";

function ParkedCar({ x, y, w = 40, h = 66 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <G>
      <Rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={7} fill="#64748B" />
      <Rect x={x - w / 2 + 5} y={y - h / 2 + 8} width={w - 10} height={16} rx={3} fill="#94A3B8" />
      <Rect x={x - w / 2 + 5} y={y + h / 2 - 24} width={w - 10} height={16} rx={3} fill="#94A3B8" />
    </G>
  );
}

function Koni({ x, y }: { x: number; y: number }) {
  return (
    <G>
      <Circle cx={x} cy={y} r={6} fill={KONI} />
      <Circle cx={x} cy={y} r={2.5} fill="#FED7AA" />
    </G>
  );
}

export function ManevraSahnesi({ tip }: { tip: ManevraTipi }) {
  return (
    <Svg width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
      <Rect x={0} y={0} width={DESIGN_W} height={DESIGN_H} rx={16} fill={ASFALT} />
      {tip === "paralelPark" && (
        <>
          <Rect x={205} y={0} width={95} height={DESIGN_H} fill={KALDIRIM} />
          <Line x1={205} y1={0} x2={205} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} />
          <ParkedCar x={176} y={40} />
          <ParkedCar x={176} y={182} />
          <Line x1={110} y1={0} x2={110} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="12 12" />
        </>
      )}
      {tip === "lPark" && (
        <>
          <Rect x={0} y={118} width={DESIGN_W} height={102} fill={KALDIRIM} opacity={0.35} />
          <Line x1={0} y1={118} x2={DESIGN_W} y2={118} stroke={PARK_CIZGI} strokeWidth={2} />
          <Line x1={110} y1={118} x2={110} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} />
          <Line x1={155} y1={118} x2={155} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} />
          <Line x1={210} y1={118} x2={210} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} />
          <ParkedCar x={132} y={168} w={38} h={78} />
          <Koni x={155} y={124} />
          <Koni x={210} y={124} />
        </>
      )}
      {tip === "rampaKalkis" && (
        <>
          <Polygon points={`0,${DESIGN_H} ${DESIGN_W},${DESIGN_H} ${DESIGN_W},40 0,120`} fill="#4A5570" />
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="12 12" />
          <Polygon points="150,55 142,72 158,72" fill={PARK_CIZGI} />
          <Polygon points="150,90 142,107 158,107" fill={PARK_CIZGI} />
        </>
      )}
      {tip === "aniFren" && (
        <>
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
          <Rect x={110} y={168} width={80} height={14} rx={4} fill="#EF4444" />
          <SvgText x={150} y={200} fill="#FCA5A5" fontSize={13} fontWeight="bold" textAnchor="middle">
            ENGEL
          </SvgText>
        </>
      )}
      {tip === "uDonusu" && (
        <>
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} />
          <Line x1={70} y1={0} x2={70} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="10 10" opacity={0.5} />
          <Line x1={230} y1={0} x2={230} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="10 10" opacity={0.5} />
        </>
      )}
      {tip === "seritDegistirme" && (
        <>
          <Line x1={100} y1={0} x2={100} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
          <Line x1={200} y1={0} x2={200} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
        </>
      )}
      {tip === "temelKumanda" && (
        <>
          <Line x1={90} y1={0} x2={90} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} />
          <Line x1={210} y1={0} x2={210} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} />
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} strokeDasharray="16 16" />
        </>
      )}
      {tip === "geriManevra" && (
        <>
          <Line x1={90} y1={0} x2={90} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} />
          <Line x1={210} y1={0} x2={210} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} />
          <Line x1={150} y1={0} x2={150} y2={DESIGN_H} stroke={PARK_CIZGI} strokeWidth={2} strokeDasharray="10 10" />
          <SvgText x={150} y={28} fill="#FBBF24" fontSize={12} fontWeight="bold" textAnchor="middle">
            GERİ
          </SvgText>
          <Polygon points="150,205 142,190 158,190" fill="#FBBF24" />
        </>
      )}
      {tip === "sinyal" && (
        <>
          <Line x1={100} y1={0} x2={100} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
          <Line x1={200} y1={0} x2={200} y2={DESIGN_H} stroke={CIZGI} strokeWidth={2} strokeDasharray="14 14" />
          <Circle cx={220} cy={70} r={8} fill="#22C55E" />
          <SvgText x={150} y={30} fill="#A5B4FC" fontSize={11} fontWeight="bold" textAnchor="middle">
            SİNYAL + AYNALAR
          </SvgText>
        </>
      )}
    </Svg>
  );
}
