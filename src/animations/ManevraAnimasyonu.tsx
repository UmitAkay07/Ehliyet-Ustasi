import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useFocusEffect } from "expo-router";
import type { ManevraTipi } from "@/types";
import { useTheme } from "@/theme";
import { simSes } from "@/services/simSes";
import { DESIGN_H, DESIGN_W, MANEVRALAR } from "./keyframes";
import { ilkGorunurKare, rotaNoktalari, surusVerisi } from "./manevraVerisi";
import { TUVAL_H, TUVAL_W, manevraZeminSvg } from "./simGorsel";
import { SimArac } from "./SimArac";

/** Sinyalin bir yanıp sönme turu; sinyal rölesi sesi de bu ritimdedir (assets/sesler/sinyal.wav) */
const SINYAL_TURU_MS = 700;
/** Döngüde manevra bitince araba son konumunda bu kadar bekler, sonra baştan başlar */
const DONGU_BEKLEME_MS = 700;
const KILIT = Extrapolation.CLAMP;

export interface ManevraAnimasyonuProps {
  tip: ManevraTipi;
  /** false iken araba olduğu yerde durur */
  oynuyor?: boolean;
  /** true: bitince baştan başlar */
  dongu?: boolean;
  /** Ses efektleri (genel ses ayarı da açık olmalı) */
  sesli?: boolean;
  /** Değiştikçe manevra baştan başlar */
  yenidenBaslat?: number;
  /** Oynatma ilerlemesi 0..1 (dışarıdaki ilerleme çubuğu için) */
  ilerleme?: SharedValue<number>;
  /** Döngü kapalıyken manevra bitince */
  onBitti?: () => void;
  /** Manevra her tamamlandığında (döngüde her turun sonunda da) */
  onTurBitti?: () => void;
  /** Henüz oynatılmadıysa arabayı ilk göründüğü karede gösterir (oynatıcı kapağı) */
  kapak?: boolean;
}

/**
 * Direksiyon manevrasının kuşbakışı simülasyonu: ortak sahne ve araba çizimi, dönen ön tekerlekler,
 * sinyal/fren/geri vites lambaları ve hareketle eşzamanlı ses efektleri.
 */
export function ManevraAnimasyonu({
  tip,
  oynuyor = true,
  dongu = true,
  sesli = false,
  yenidenBaslat = 0,
  ilerleme,
  onBitti,
  onTurBitti,
  kapak = false,
}: ManevraAnimasyonuProps) {
  const { radius } = useTheme();
  const tanim = MANEVRALAR[tip];
  const kareler = tanim.keyframes;
  const sonKare = kareler.length - 1;
  const veri = useMemo(() => surusVerisi(kareler), [kareler]);
  const zemin = useMemo(() => manevraZeminSvg(tip, rotaNoktalari(kareler, DESIGN_W, DESIGN_H)), [tip, kareler]);

  const [genislik, setGenislik] = useState(DESIGN_W);
  const k = genislik / DESIGN_W;
  const aracW = TUVAL_W * k;
  const aracH = TUVAL_H * k;

  const dizi = useMemo(
    () => ({
      i: kareler.map((_, i) => i),
      x: kareler.map((f) => f.x),
      y: kareler.map((f) => f.y),
      a: kareler.map((f) => f.a),
      fren: kareler.map((f) => f.brake),
      sol: kareler.map((f) => f.signalLeft),
      sag: kareler.map((f) => f.signalRight),
      geri: veri.geri,
      teker: veri.teker,
    }),
    [kareler, veri]
  );

  const t = useSharedValue(kapak ? ilkGorunurKare(kareler, DESIGN_W, DESIGN_H) : 0);
  const yanip = useSharedValue(0);

  const ayar = useRef({ dongu, onBitti, onTurBitti, sesAktif: sesli && oynuyor });
  ayar.current = { dongu, onBitti, onTurBitti, sesAktif: sesli && oynuyor };
  /**
   * Ekran odakta ve bağlı mı. Geri tuşuyla çıkılırken animasyondan gelen son bir kare, susturulmuş
   * sinyal/geri döngüsünü yeniden başlatıyor ve ses ekran kapandıktan sonra da sürüyordu.
   */
  const sesIzinli = useRef(true);
  const sonDurum = useRef({ sinyal: -1, geri: -1, fren: -1, hiz: 0 });

  const yanipBaslat = useCallback(() => {
    yanip.value = 0;
    yanip.value = withRepeat(withTiming(1, { duration: SINYAL_TURU_MS, easing: Easing.linear }), -1, false);
  }, [yanip]);

  useEffect(() => {
    yanipBaslat();
    return () => cancelAnimation(yanip);
  }, [yanipBaslat, yanip]);

  const kareDegisti = useCallback(
    (ham: number) => {
      const i = Math.max(0, Math.min(sonKare, ham));
      const kare = kareler[i];
      const geri = veri.geri[i];

      const s = sonDurum.current;
      const a = ayar.current;
      if (!a.sesAktif || !sesIzinli.current) return;
      const sinyal = kare.signalLeft || kare.signalRight ? 1 : 0;
      if (sinyal !== s.sinyal) {
        if (sinyal) yanipBaslat();
        simSes.sinyal(sinyal === 1);
      }
      if (geri !== s.geri) {
        if (geri && s.geri === 0) simSes.efekt("vites");
        simSes.geri(geri === 1);
      }
      if (tip === "aniFren" && kare.brake && s.fren === 0 && s.hiz > 0.3) simSes.efekt("lastik");
      sonDurum.current = { sinyal, geri, fren: kare.brake, hiz: veri.hiz[i] };
    },
    [kareler, sonKare, veri, tip, yanipBaslat]
  );

  useAnimatedReaction(
    () => Math.floor(t.value),
    (i, onceki) => {
      if (i !== onceki) runOnJS(kareDegisti)(i);
    },
    [kareDegisti]
  );

  useAnimatedReaction(
    () => t.value / sonKare,
    (v) => {
      if (ilerleme) ilerleme.value = v;
    },
    [ilerleme, sonKare]
  );

  const turBittiRef = useRef<() => void>(() => {});
  const turBittiCagir = useCallback(() => turBittiRef.current(), []);

  /**
   * bastan: manevrayı 0'dan başlatır. Başa sarma da aynı animasyonun ilk adımıdır; önce `t.value = 0`
   * yazıp hemen ardından `t.value` okumak eski değeri (son kareyi) döndürüyordu, bu yüzden döngü
   * hiç başa dönmüyor ve araba manevranın sonunda kalıyordu.
   */
  const oynat = useCallback(
    (bastan = false, bekleMs = 0) => {
      const mevcut = t.value;
      const sondaMi = sonKare - mevcut <= 1e-3;
      if (sondaMi && !bastan && !ayar.current.dongu) return;
      const sifirdan = bastan || sondaMi;
      const kalan = sifirdan ? sonKare : sonKare - mevcut;
      const tur = withTiming(
        sonKare,
        { duration: Math.max(1, (tanim.sureMs * kalan) / sonKare), easing: Easing.linear },
        (bitti) => {
          if (bitti) runOnJS(turBittiCagir)();
        }
      );
      t.value = sifirdan ? withSequence(withDelay(bekleMs, withTiming(0, { duration: 0 })), tur) : tur;
    },
    [sonKare, t, tanim.sureMs, turBittiCagir]
  );

  turBittiRef.current = () => {
    ayar.current.onTurBitti?.();
    if (ayar.current.dongu) {
      sonDurum.current = { sinyal: -1, geri: -1, fren: -1, hiz: 0 };
      oynat(true, DONGU_BEKLEME_MS);
    } else {
      simSes.sustur();
      ayar.current.onBitti?.();
    }
  };

  const oncekiBaslatma = useRef({ yenidenBaslat, tip });
  useEffect(() => {
    const o = oncekiBaslatma.current;
    const bastan = o.yenidenBaslat !== yenidenBaslat || o.tip !== tip;
    if (bastan) {
      oncekiBaslatma.current = { yenidenBaslat, tip };
      cancelAnimation(t);
      t.value = 0;
      sonDurum.current = { sinyal: -1, geri: -1, fren: -1, hiz: 0 };
    }
    if (!oynuyor) {
      cancelAnimation(t);
      return;
    }
    // Bileşen ekrana bağlanırken atanan animasyon Reanimated'da hiç başlamıyordu; bir kare sonra başlatılır
    const kare = requestAnimationFrame(() => oynat(bastan));
    return () => cancelAnimationFrame(kare);
  }, [oynuyor, yenidenBaslat, tip, oynat, t]);

  useEffect(() => {
    if (sesli && oynuyor) {
      sonDurum.current = { sinyal: -1, geri: -1, fren: -1, hiz: 0 };
      kareDegisti(Math.floor(t.value));
    } else {
      simSes.sustur();
    }
  }, [sesli, oynuyor, kareDegisti, t]);

  // Ekrandan çıkılınca (geri tuşu dahil, geçiş animasyonunu beklemeden) ses hemen kesilir
  useFocusEffect(
    useCallback(() => {
      sesIzinli.current = true;
      sonDurum.current = { sinyal: -1, geri: -1, fren: -1, hiz: 0 };
      return () => {
        sesIzinli.current = false;
        simSes.sustur();
      };
    }, [])
  );

  useEffect(
    () => () => {
      sesIzinli.current = false;
      cancelAnimation(t);
      simSes.sustur();
    },
    [t]
  );

  const aracStili = useAnimatedStyle(() => {
    const cx = interpolate(t.value, dizi.i, dizi.x, KILIT);
    const cy = interpolate(t.value, dizi.i, dizi.y, KILIT);
    const aci = interpolate(t.value, dizi.i, dizi.a, KILIT);
    return {
      transform: [{ translateX: cx * k - aracW / 2 }, { translateY: cy * k - aracH / 2 }, { rotate: `${aci}deg` }],
    };
  });
  const tekerStili = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(t.value, dizi.i, dizi.teker, KILIT)}deg` }],
  }));
  const acikMi = (deger: number) => {
    "worklet";
    return deger > 0.5;
  };
  const frenStili = useAnimatedStyle(() => ({ opacity: acikMi(interpolate(t.value, dizi.i, dizi.fren, KILIT)) ? 1 : 0 }));
  const geriStili = useAnimatedStyle(() => ({ opacity: acikMi(interpolate(t.value, dizi.i, dizi.geri, KILIT)) ? 1 : 0 }));
  const solStili = useAnimatedStyle(() => ({
    opacity: acikMi(interpolate(t.value, dizi.i, dizi.sol, KILIT)) && yanip.value < 0.5 ? 1 : 0,
  }));
  const sagStili = useAnimatedStyle(() => ({
    opacity: acikMi(interpolate(t.value, dizi.i, dizi.sag, KILIT)) && yanip.value < 0.5 ? 1 : 0,
  }));

  return (
    <View
      onLayout={(e) => setGenislik(e.nativeEvent.layout.width)}
      style={{ width: "100%", height: DESIGN_H * k, borderRadius: radius.lg, overflow: "hidden" }}
    >
      <SvgXml xml={zemin} width={DESIGN_W * k} height={DESIGN_H * k} />
      <Animated.View style={[{ position: "absolute", left: 0, top: 0, width: aracW, height: aracH }, aracStili]}>
        <SimArac
          olcekX={k}
          olcekY={k}
          tekerStili={tekerStili}
          frenStili={frenStili}
          geriStili={geriStili}
          solSinyalStili={solStili}
          sagSinyalStili={sagStili}
        />
      </Animated.View>
    </View>
  );
}
