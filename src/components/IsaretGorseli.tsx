import React from "react";
import { Image } from "react-native";
import Svg, {
  Circle,
  Polygon,
  Rect,
  Line,
  Text as SvgText,
  Path,
  Ellipse,
  SvgXml,
} from "react-native-svg";
import type { IsaretKategori } from "@/types";
import { TRAFIK_ISARETLERI } from "@/data/isaretler";
import { ISARET_IMAGES } from "@/data/isaretImageMap";
import { ISARET_SVG } from "@/data/isaretSvgMap";

const VB = "0 0 48 48";





function TehlikeUcgen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Polygon points="24,3 45,43 3,43" fill="#FFFFFF" stroke="#DC2626" strokeWidth={3.5} strokeLinejoin="round" />
      {children}
    </>
  );
}

function YasakDaire({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Circle cx={24} cy={24} r={20} fill="#FFFFFF" stroke="#DC2626" strokeWidth={4.5} />
      {children}
    </>
  );
}

function MecburiDaire({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Circle cx={24} cy={24} r={20} fill="#1D4ED8" />
      {children}
    </>
  );
}

function BilgiKare({ children, fill = "#1D4ED8" }: { children: React.ReactNode; fill?: string }) {
  return (
    <>
      <Rect x={5} y={5} width={38} height={38} rx={3} fill={fill} />
      {children}
    </>
  );
}

function IsikGovde({ aktif }: { aktif: "kirmizi" | "sari" | "yesil" | "hepsi" | "yanipKirmizi" }) {
  const k = aktif === "kirmizi" || aktif === "hepsi" || aktif === "yanipKirmizi" ? "#EF4444" : "#374151";
  const s = aktif === "sari" || aktif === "hepsi" ? "#FBBF24" : "#374151";
  const y = aktif === "yesil" || aktif === "hepsi" ? "#22C55E" : "#374151";
  return (
    <>
      <Rect x={15} y={3} width={18} height={42} rx={4} fill="#111827" />
      <Circle
        cx={24}
        cy={13}
        r={aktif === "kirmizi" || aktif === "yanipKirmizi" ? 5.2 : 4.2}
        fill={k}
        opacity={aktif === "yanipKirmizi" ? 0.5 : 1}
      />
      {aktif === "yanipKirmizi" && <Circle cx={24} cy={13} r={3} fill="#FECACA" />}
      <Circle cx={24} cy={24} r={aktif === "sari" ? 5.2 : 4.2} fill={s} />
      <Circle cx={24} cy={35} r={aktif === "yesil" ? 5.2 : 4.2} fill={y} />
      {aktif === "yanipKirmizi" && (
        <SvgText x={24} y={46} fill="#DC2626" fontSize={5} fontWeight="bold" textAnchor="middle">
          YANIP SÖNER
        </SvgText>
      )}
    </>
  );
}

function IsaretCizim({ id }: { id: string }): React.ReactElement | null {
  switch (id) {
    case "is-01":
      return (
        <TehlikeUcgen>
          <Path d="M30 36 Q30 22 18 18" stroke="#111827" strokeWidth={2.8} fill="none" strokeLinecap="round" />
          <Polygon points="14,16 20,14 18,20" fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-31":
      return (
        <TehlikeUcgen>
          <Path d="M18 36 Q18 22 30 18" stroke="#111827" strokeWidth={2.8} fill="none" strokeLinecap="round" />
          <Polygon points="34,16 28,14 30,20" fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-32":
      return (
        <TehlikeUcgen>
          <Path
            d="M14 36 Q16 26 22 24 Q28 22 26 16 Q24 12 32 14"
            stroke="#111827"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
        </TehlikeUcgen>
      );
    case "is-02":
      return (
        <TehlikeUcgen>
          <Path d="M10 34 Q16 22 24 34 Q32 22 38 34" stroke="#111827" strokeWidth={2.8} fill="none" strokeLinecap="round" />
        </TehlikeUcgen>
      );
    case "is-03":
      return (
        <TehlikeUcgen>
          <Path
            d="M16 34 L20 22 L24 30 L28 20 L32 34"
            stroke="#111827"
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </TehlikeUcgen>
      );
    case "is-04":
      return (
        <TehlikeUcgen>
          <Circle cx={17} cy={24} r={2.3} fill="#111827" />
          <Circle cx={27} cy={22} r={2.3} fill="#111827" />
          <Path
            d="M15 34 L17 27 L19 34 M25 34 L27 25 L29 34"
            stroke="#111827"
            strokeWidth={1.9}
            fill="none"
            strokeLinecap="round"
          />
        </TehlikeUcgen>
      );
    case "is-05":
      return (
        <TehlikeUcgen>
          <Circle cx={24} cy={20} r={2.6} fill="#111827" />
          <Path
            d="M24 24 L24 32 M19 27 L29 27 M21 38 L24 32 L27 38"
            stroke="#111827"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </TehlikeUcgen>
      );
    case "is-06":
      return (
        <TehlikeUcgen>
          <Ellipse cx={24} cy={28} rx={9} ry={5.5} fill="#111827" />
          <Circle cx={32} cy={24} r={3.2} fill="#111827" />
          <Path
            d="M16 33 L14 38 M20 34 L19 39 M28 34 L29 39 M32 33 L34 38"
            stroke="#111827"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </TehlikeUcgen>
      );
    case "is-07":
      return (
        <TehlikeUcgen>
          <Circle cx={24} cy={28} r={7} stroke="#111827" strokeWidth={2.4} fill="none" />
          <Polygon points="24,18 27,23 21,23" fill="#111827" />
          <Polygon points="31,31 26,29 28,34" fill="#111827" />
          <Polygon points="17,31 20,34 22,29" fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-33":
      return (
        <TehlikeUcgen>
          <Path d="M12 36 L18 20 L30 20 L36 36" stroke="#111827" strokeWidth={2.6} fill="none" strokeLinejoin="round" />
          <Line x1={18} y1={20} x2={30} y2={20} stroke="#111827" strokeWidth={2.6} />
        </TehlikeUcgen>
      );
    case "is-34":
      return (
        <TehlikeUcgen>
          <Polygon points="24,16 28,24 20,24" fill="#111827" />
          <Line x1={24} y1={24} x2={24} y2={30} stroke="#111827" strokeWidth={2.5} />
          <Polygon points="24,40 20,32 28,32" fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-35":
      return (
        <TehlikeUcgen>
          <Path d="M14 34 L18 22 L22 34 M20 26 L26 26" stroke="#111827" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Polygon points="28,34 32,24 36,34" fill="#F59E0B" stroke="#111827" strokeWidth={1.5} />
        </TehlikeUcgen>
      );
    case "is-51":
      return (
        <TehlikeUcgen>
          <Line x1={24} y1={16} x2={24} y2={30} stroke="#111827" strokeWidth={3.5} strokeLinecap="round" />
          <Circle cx={24} cy={35} r={2.5} fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-52":
      return (
        <TehlikeUcgen>
          <Rect x={19} y={16} width={10} height={18} rx={2} fill="#111827" />
          <Circle cx={24} cy={20} r={2} fill="#FBBF24" />
          <Circle cx={24} cy={26} r={2} fill="#374151" />
          <Circle cx={24} cy={32} r={2} fill="#374151" />
        </TehlikeUcgen>
      );
    case "is-55":
      return (
        <TehlikeUcgen>
          <Line x1={14} y1={16} x2={34} y2={36} stroke="#111827" strokeWidth={2.5} />
          <Rect x={18} y={28} width={10} height={6} rx={1} fill="#111827" />
          <Polygon points="28,28 32,24 32,32" fill="#111827" />
        </TehlikeUcgen>
      );
    case "is-56":
      return (
        <TehlikeUcgen>
          <Line x1={24} y1={14} x2={24} y2={36} stroke="#111827" strokeWidth={3} />
          <Line x1={14} y1={24} x2={36} y2={24} stroke="#111827" strokeWidth={3} />
        </TehlikeUcgen>
      );
    case "is-36":
      return (
        <TehlikeUcgen>
          <Circle cx={16} cy={32} r={4.5} stroke="#111827" strokeWidth={2} fill="none" />
          <Circle cx={32} cy={32} r={4.5} stroke="#111827" strokeWidth={2} fill="none" />
          <Path
            d="M16 32 L22 22 L28 32 M22 22 L26 22 M24 26 L32 32"
            stroke="#111827"
            strokeWidth={2}
            fill="none"
            strokeLinejoin="round"
          />
        </TehlikeUcgen>
      );
    case "is-37":
      return (
        <TehlikeUcgen>
          <Rect x={14} y={18} width={20} height={4} fill="#111827" />
          <Rect x={14} y={26} width={20} height={4} fill="#111827" />
          <Rect x={14} y={34} width={20} height={4} fill="#111827" />
          <Line x1={18} y1={18} x2={18} y2={38} stroke="#111827" strokeWidth={1.5} />
          <Line x1={30} y1={18} x2={30} y2={38} stroke="#111827" strokeWidth={1.5} />
        </TehlikeUcgen>
      );

    case "is-08":
      return <Polygon points="24,44 3,6 45,6" fill="#FFFFFF" stroke="#DC2626" strokeWidth={3.5} strokeLinejoin="round" />;
    case "is-15":
      return (
        <>
          <Polygon
            points="16,4 32,4 44,16 44,32 32,44 16,44 4,32 4,16"
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth={1.5}
          />
          <SvgText x={24} y={28} fill="#FFFFFF" fontSize={11} fontWeight="bold" textAnchor="middle">
            DUR
          </SvgText>
        </>
      );
    case "is-09":
      return (
        <YasakDaire>
          <Rect x={14} y={18} width={14} height={10} rx={1.5} fill="#111827" />
          <Circle cx={17} cy={30} r={2.2} fill="#111827" />
          <Circle cx={25} cy={30} r={2.2} fill="#111827" />
          <Rect x={24} y={20} width={6} height={5} rx={1} fill="#111827" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-16":
      return (
        <YasakDaire>
          <Rect x={11} y={20} width={26} height={8} rx={1} fill="#DC2626" />
        </YasakDaire>
      );
    case "is-54":
      return (
        <>
          <Rect x={10} y={6} width={28} height={36} rx={2} fill="#FFFFFF" stroke="#DC2626" strokeWidth={3.5} />
          <Rect x={14} y={18} width={20} height={10} rx={1} fill="#111827" />
          <Polygon points="24,12 20,18 28,18" fill="#DC2626" />
        </>
      );
    case "is-10":
      return (
        <YasakDaire>
          <Path d="M30 32 V18 H18" stroke="#111827" strokeWidth={2.8} fill="none" strokeLinecap="round" />
          <Polygon points="18,18 23,15 23,21" fill="#111827" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-11":
      return (
        <YasakDaire>
          <Path d="M18 32 V18 H30" stroke="#111827" strokeWidth={2.8} fill="none" strokeLinecap="round" />
          <Polygon points="30,18 25,15 25,21" fill="#111827" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-12":
      return (
        <YasakDaire>
          <Path
            d="M17 32 V17 A7 7 0 0 1 31 17 V30"
            stroke="#111827"
            strokeWidth={2.6}
            fill="none"
            strokeLinecap="round"
          />
          <Polygon points="31,30 27,26 35,26" fill="#111827" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-13":
      return (
        <YasakDaire>
          <Rect x={12} y={20} width={9} height={12} rx={1.5} fill="#111827" />
          <Rect x={24} y={16} width={9} height={12} rx={1.5} fill="#111827" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-14":
      return (
        <YasakDaire>
          <SvgText x={24} y={29} fill="#111827" fontSize={15} fontWeight="bold" textAnchor="middle">
            50
          </SvgText>
        </YasakDaire>
      );
    case "is-38":
      return (
        <>
          <Circle cx={24} cy={24} r={20} fill="#FFFFFF" stroke="#6B7280" strokeWidth={3} />
          <SvgText x={24} y={29} fill="#9CA3AF" fontSize={14} fontWeight="bold" textAnchor="middle">
            50
          </SvgText>
          <Line x1={8} y1={8} x2={40} y2={40} stroke="#6B7280" strokeWidth={3.2} strokeLinecap="round" />
          <Line x1={10} y1={14} x2={38} y2={42} stroke="#6B7280" strokeWidth={2.2} strokeLinecap="round" />
        </>
      );
    case "is-39":
      return (
        <>
          <Circle cx={24} cy={24} r={20} fill="#FFFFFF" stroke="#6B7280" strokeWidth={3} />
          <Rect x={12} y={20} width={9} height={12} rx={1.5} fill="#9CA3AF" />
          <Rect x={24} y={16} width={9} height={12} rx={1.5} fill="#9CA3AF" />
          <Line x1={8} y1={8} x2={40} y2={40} stroke="#6B7280" strokeWidth={3.2} strokeLinecap="round" />
          <Line x1={10} y1={14} x2={38} y2={42} stroke="#6B7280" strokeWidth={2.2} strokeLinecap="round" />
        </>
      );
    case "is-48":
      return (
        <YasakDaire>
          <Path d="M14 22 H20 L26 16 V32 L20 26 H14 Z" fill="#111827" />
          <Path d="M28 18 Q34 24 28 30" stroke="#111827" strokeWidth={2} fill="none" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </YasakDaire>
      );
    case "is-57":
      return (
        <YasakDaire>
          <Circle cx={24} cy={24} r={14} fill="#111827" />
          <Line x1={12} y1={12} x2={36} y2={36} stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
        </YasakDaire>
      );

    case "is-17":
      return (
        <MecburiDaire>
          <Polygon points="24,10 32,24 26,24 26,36 22,36 22,24 16,24" fill="#FFFFFF" />
        </MecburiDaire>
      );
    case "is-18":
      return (
        <MecburiDaire>
          <Polygon points="38,24 24,16 24,21 12,21 12,27 24,27 24,32" fill="#FFFFFF" />
        </MecburiDaire>
      );
    case "is-40":
      return (
        <MecburiDaire>
          <Polygon points="10,24 24,16 24,21 36,21 36,27 24,27 24,32" fill="#FFFFFF" />
        </MecburiDaire>
      );
    case "is-19":
      return (
        <MecburiDaire>
          <Circle cx={24} cy={24} r={8} stroke="#FFFFFF" strokeWidth={2.8} fill="none" />
          <Polygon points="24,12 28,18 20,18" fill="#FFFFFF" />
          <Polygon points="36,24 30,20 30,28" fill="#FFFFFF" />
        </MecburiDaire>
      );
    case "is-20":
      return (
        <MecburiDaire>
          <SvgText x={24} y={29} fill="#FFFFFF" fontSize={15} fontWeight="bold" textAnchor="middle">
            30
          </SvgText>
        </MecburiDaire>
      );
    case "is-41":
      return (
        <MecburiDaire>
          <Circle cx={16} cy={30} r={4} stroke="#FFFFFF" strokeWidth={1.8} fill="none" />
          <Circle cx={32} cy={30} r={4} stroke="#FFFFFF" strokeWidth={1.8} fill="none" />
          <Path d="M16 30 L22 18 L30 30 M22 18 L27 18 M24 23 L32 30" stroke="#FFFFFF" strokeWidth={1.8} fill="none" />
        </MecburiDaire>
      );

    case "is-21":
      return (
        <BilgiKare>
          <SvgText x={24} y={33} fill="#FFFFFF" fontSize={24} fontWeight="bold" textAnchor="middle">
            P
          </SvgText>
        </BilgiKare>
      );
    case "is-22":
      return (
        <BilgiKare>
          <Rect x={14} y={12} width={6} height={24} fill="#FFFFFF" />
          <Rect x={28} y={12} width={6} height={24} fill="#FFFFFF" />
          <Rect x={14} y={20} width={20} height={6} fill="#FFFFFF" />
        </BilgiKare>
      );
    case "is-23":
      return (
        <>
          <Rect x={5} y={5} width={38} height={38} rx={3} fill="#FFFFFF" stroke="#DC2626" strokeWidth={2.5} />
          <Rect x={20} y={12} width={8} height={24} fill="#DC2626" />
          <Rect x={12} y={20} width={24} height={8} fill="#DC2626" />
        </>
      );
    case "is-24":
      return (
        <BilgiKare>
          <Circle cx={24} cy={16} r={3} fill="#FFFFFF" />
          <Path
            d="M24 21 L24 30 M18 24 L30 24 M20 38 L24 30 L28 38"
            stroke="#FFFFFF"
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
          />
        </BilgiKare>
      );
    case "is-53":
      return (
        <BilgiKare>
          <Circle cx={18} cy={18} r={2.5} fill="#FFFFFF" />
          <Circle cx={30} cy={18} r={2.5} fill="#FFFFFF" />
          <Path d="M16 34 L20 26 L24 34 M28 34 L32 24 L34 34" stroke="#FFFFFF" strokeWidth={2} fill="none" />
        </BilgiKare>
      );
    case "is-25":
      return (
        <BilgiKare>
          <Path d="M10 38 L18 10 H30 L38 38 Z" fill="#FFFFFF" />
          <Line x1={24} y1={14} x2={24} y2={34} stroke="#1D4ED8" strokeWidth={2.2} strokeDasharray="4 3" />
        </BilgiKare>
      );
    case "is-58":
      return (
        <BilgiKare>
          <Path d="M10 38 L18 10 H30 L38 38 Z" fill="#FFFFFF" />
          <Line x1={10} y1={10} x2={38} y2={38} stroke="#DC2626" strokeWidth={3} strokeLinecap="round" />
        </BilgiKare>
      );
    case "is-42":
      return (
        <BilgiKare>
          <Polygon points="24,10 36,28 28,28 28,38 20,38 20,28 12,28" fill="#FFFFFF" />
        </BilgiKare>
      );
    case "is-43":
      return (
        <BilgiKare>
          <Rect x={12} y={14} width={14} height={22} rx={2} fill="#FFFFFF" />
          <Path d="M26 18 H32 V30 H28" stroke="#FFFFFF" strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Circle cx={32} cy={32} r={2} fill="#FFFFFF" />
        </BilgiKare>
      );
    case "is-44":
      return (
        <>
          <Rect x={4} y={14} width={40} height={20} rx={2} fill="#FFFFFF" stroke="#111827" strokeWidth={2} />
          <SvgText x={24} y={28} fill="#111827" fontSize={8} fontWeight="bold" textAnchor="middle">
            ŞEHİR
          </SvgText>
        </>
      );
    case "is-45":
      return (
        <>
          <Rect x={4} y={14} width={40} height={20} rx={2} fill="#FFFFFF" stroke="#111827" strokeWidth={2} />
          <SvgText x={24} y={28} fill="#9CA3AF" fontSize={8} fontWeight="bold" textAnchor="middle">
            ŞEHİR
          </SvgText>
          <Line x1={6} y1={12} x2={42} y2={36} stroke="#111827" strokeWidth={2.5} strokeLinecap="round" />
        </>
      );
    case "is-46":
      return (
        <BilgiKare>
          <Circle cx={24} cy={18} r={3} fill="#FFFFFF" />
          <Path d="M24 22 L24 28 M20 25 L28 25 M18 36 Q24 28 30 36" stroke="#FFFFFF" strokeWidth={2.2} fill="none" />
          <Circle cx={30} cy={34} r={3.5} stroke="#FFFFFF" strokeWidth={1.8} fill="none" />
        </BilgiKare>
      );
    case "is-47":
      return (
        <BilgiKare>
          <Rect x={11} y={14} width={26} height={16} rx={2} fill="#FFFFFF" />
          <Circle cx={17} cy={34} r={3} fill="#FFFFFF" />
          <Circle cx={31} cy={34} r={3} fill="#FFFFFF" />
          <Rect x={14} y={17} width={8} height={6} fill="#1D4ED8" />
          <Rect x={26} y={17} width={8} height={6} fill="#1D4ED8" />
        </BilgiKare>
      );

    case "is-26":
      return (
        <>
          <Circle cx={24} cy={24} r={20} fill="#1D4ED8" stroke="#DC2626" strokeWidth={3.5} />
          <Line x1={12} y1={12} x2={36} y2={36} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
          <Line x1={36} y1={12} x2={12} y2={36} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </>
      );
    case "is-27":
      return (
        <>
          <Circle cx={24} cy={24} r={20} fill="#1D4ED8" stroke="#DC2626" strokeWidth={3.5} />
          <Line x1={12} y1={12} x2={36} y2={36} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </>
      );

    case "is-28":
      return <IsikGovde aktif="kirmizi" />;
    case "is-29":
      return <IsikGovde aktif="sari" />;
    case "is-30":
      return <IsikGovde aktif="yesil" />;
    case "is-50":
      return <IsikGovde aktif="yanipKirmizi" />;

    default:
      return null;
  }
}

function KategoriVarsayilan({ kategori }: { kategori: IsaretKategori }) {
  switch (kategori) {
    case "tehlike":
      return (
        <TehlikeUcgen>
          <Line x1={24} y1={16} x2={24} y2={30} stroke="#111827" strokeWidth={3} strokeLinecap="round" />
          <Circle cx={24} cy={35} r={2.2} fill="#111827" />
        </TehlikeUcgen>
      );
    case "yasak":
      return (
        <YasakDaire>
          <Line x1={11} y1={11} x2={37} y2={37} stroke="#DC2626" strokeWidth={4.5} strokeLinecap="round" />
        </YasakDaire>
      );
    case "mecburiyet":
      return (
        <MecburiDaire>
          <Polygon points="24,10 32,24 26,24 26,36 22,36 22,24 16,24" fill="#FFFFFF" />
        </MecburiDaire>
      );
    case "bilgi":
      return (
        <BilgiKare>
          <SvgText x={24} y={30} fill="#FFFFFF" fontSize={18} fontWeight="bold" textAnchor="middle">
            i
          </SvgText>
        </BilgiKare>
      );
    case "durakPark":
      return (
        <>
          <Circle cx={24} cy={24} r={20} fill="#1D4ED8" stroke="#DC2626" strokeWidth={3.5} />
          <Line x1={12} y1={12} x2={36} y2={36} stroke="#DC2626" strokeWidth={4} strokeLinecap="round" />
        </>
      );
    case "isikDurum":
      return <IsikGovde aktif="hepsi" />;
    default:
      return <Circle cx={24} cy={24} r={20} fill="#94A3B8" />;
  }
}

export function IsaretGorseli({
  kategori,
  isaretId,
  boyut = 48,
}: {
  kategori?: IsaretKategori;
  isaretId?: string;
  boyut?: number;
}) {
  const resmi = isaretId ? ISARET_IMAGES[isaretId] : undefined;
  if (resmi) {
    return (
      <Image
        source={resmi}
        style={{ width: boyut, height: boyut, resizeMode: "contain" }}
        accessibilityLabel={isaretId}
      />
    );
  }

  const resmiSvg = isaretId ? ISARET_SVG[isaretId] : undefined;
  if (resmiSvg) {
    return <SvgXml xml={resmiSvg} width={boyut} height={boyut} />;
  }

  const cizim = isaretId ? IsaretCizim({ id: isaretId }) : null;
  const kayit = isaretId ? TRAFIK_ISARETLERI.find((i) => i.id === isaretId) : undefined;
  const yedekKategori = kayit?.kategori ?? kategori ?? "bilgi";

  return (
    <Svg width={boyut} height={boyut} viewBox={VB}>
      {cizim ?? <KategoriVarsayilan kategori={yedekKategori} />}
    </Svg>
  );
}
