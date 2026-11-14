import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import {
  ON_TEKER_Y,
  TEKER_H,
  TEKER_W,
  TEKER_X,
  TUVAL_H,
  TUVAL_PAY,
  TUVAL_W,
  aracAltSvg,
  aracGovdeSvg,
  isikSvg,
  tekerSvg,
} from "./simGorsel";
import type { AracBoyasi, IsikTuru } from "./simGorsel";

type Stil = React.ComponentProps<typeof Animated.View>["style"];

const ALT = aracAltSvg();
const TEKER = tekerSvg();
const GOVDE: Partial<Record<AracBoyasi, string>> = {};
const ISIK: Record<IsikTuru, string> = {
  fren: isikSvg("fren"),
  sinyalSol: isikSvg("sinyalSol"),
  sinyalSag: isikSvg("sinyalSag"),
  geri: isikSvg("geri"),
};

function govde(boya: AracBoyasi): string {
  return (GOVDE[boya] ??= aracGovdeSvg(boya));
}

interface SimAracProps {
  boya?: AracBoyasi;
  /** Çizim birimi başına piksel (en / boy); simülatörde araba çarpışma kutusuna göre farklı ölçeklenir */
  olcekX: number;
  olcekY: number;
  /** Ön tekerleklerin dönüşü (transform rotate) */
  tekerStili?: Stil;
  frenStili?: Stil;
  solSinyalStili?: Stil;
  sagSinyalStili?: Stil;
  geriStili?: Stil;
}

/**
 * Simülasyonların ortak arabası. Konum ve yön dışarıdan (kapsayıcının transform'u) verilir;
 * bu bileşen yalnızca katmanları çizer. Işıklar ve tekerlekler canlandırılabilir stil alır.
 */
export function SimArac({
  boya = "turuncu",
  olcekX,
  olcekY,
  tekerStili,
  frenStili,
  solSinyalStili,
  sagSinyalStili,
  geriStili,
}: SimAracProps) {
  const w = TUVAL_W * olcekX;
  const h = TUVAL_H * olcekY;
  const tam = { position: "absolute" as const, left: 0, top: 0, width: w, height: h };
  const isik = (tur: IsikTuru, stil: Stil) => (
    <Animated.View style={[tam, stil]} pointerEvents="none">
      <SvgXml xml={ISIK[tur]} width={w} height={h} />
    </Animated.View>
  );

  return (
    <View style={{ width: w, height: h }} pointerEvents="none">
      <SvgXml xml={ALT} width={w} height={h} style={tam} />
      {TEKER_X.map((tx) => (
        <Animated.View
          key={tx}
          style={[
            {
              position: "absolute",
              left: (TUVAL_PAY + tx - TEKER_W / 2) * olcekX,
              top: (TUVAL_PAY + ON_TEKER_Y - TEKER_H / 2) * olcekY,
              width: TEKER_W * olcekX,
              height: TEKER_H * olcekY,
            },
            tekerStili,
          ]}
        >
          <SvgXml xml={TEKER} width={TEKER_W * olcekX} height={TEKER_H * olcekY} />
        </Animated.View>
      ))}
      <SvgXml xml={govde(boya)} width={w} height={h} style={tam} />
      {frenStili !== undefined ? isik("fren", frenStili) : null}
      {geriStili !== undefined ? isik("geri", geriStili) : null}
      {solSinyalStili !== undefined ? isik("sinyalSol", solSinyalStili) : null}
      {sagSinyalStili !== undefined ? isik("sinyalSag", sagSinyalStili) : null}
    </View>
  );
}
