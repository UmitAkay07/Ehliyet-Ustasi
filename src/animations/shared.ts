import { Easing } from "react-native-reanimated";

export const CAR_W = 24;
export const CAR_H = 42;

export interface AnimKeyFrame {
  x: number;
  y: number;
  a: number;
}

export interface AnimTanim {
  keyframes: AnimKeyFrame[];
  sureMs: number;
  yoyo: boolean;
}

export const EASE = Easing.inOut(Easing.cubic);

export function interpolateKeyframes(
  t: number,
  keyframes: AnimKeyFrame[]
): AnimKeyFrame {
  "worklet";
  if (keyframes.length === 0) return { x: 0, y: 0, a: 0 };
  if (keyframes.length === 1) return keyframes[0];

  const segments = keyframes.length - 1;
  const clamped = Math.max(0, Math.min(t, segments));
  const idx = Math.floor(clamped);
  const frac = clamped - idx;
  const a = keyframes[Math.min(idx, segments)];
  const b = keyframes[Math.min(idx + 1, segments)];

  return {
    x: a.x + (b.x - a.x) * frac,
    y: a.y + (b.y - a.y) * frac,
    a: a.a + (b.a - a.a) * frac,
  };
}
