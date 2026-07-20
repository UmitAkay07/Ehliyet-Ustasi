import type { ManevraTipi } from "@/types";

export interface KeyFrame {
  x: number; // merkez x (tasarım uzayı)
  y: number; // merkez y
  a: number; // açı (derece), 0 = burun yukarı
}

export interface ManevraTanim {
  keyframes: KeyFrame[];
  yoyo: boolean; // ileri-geri döngü
  sureMs: number;
}

export const DESIGN_W = 300;
export const DESIGN_H = 220;

export const MANEVRALAR: Record<ManevraTipi, ManevraTanim> = {
  temelKumanda: {
    yoyo: false,
    sureMs: 3200,
    keyframes: [
      { x: 150, y: 185, a: 0 },
      { x: 150, y: 120, a: 0 },
      { x: 150, y: 45, a: 0 },
    ],
  },
  paralelPark: {
    yoyo: true,
    sureMs: 4500,
    keyframes: [
      { x: 110, y: 28, a: 180 },
      { x: 110, y: 145, a: 180 },
      { x: 128, y: 128, a: 215 },
      { x: 158, y: 112, a: 195 },
      { x: 172, y: 108, a: 180 },
      { x: 172, y: 108, a: 180 },
    ],
  },
  lPark: {
    yoyo: true,
    sureMs: 4200,
    keyframes: [
      { x: 30, y: 60, a: 90 },
      { x: 150, y: 60, a: 90 },
      { x: 190, y: 92, a: 140 },
      { x: 182, y: 140, a: 178 },
      { x: 182, y: 165, a: 180 },
    ],
  },
  rampaKalkis: {
    yoyo: false,
    sureMs: 3800,
    keyframes: [
      { x: 150, y: 175, a: 0 },
      { x: 150, y: 182, a: 0 },
      { x: 150, y: 120, a: 0 },
      { x: 150, y: 45, a: 0 },
    ],
  },
  aniFren: {
    yoyo: false,
    sureMs: 2600,
    keyframes: [
      { x: 150, y: 20, a: 180 },
      { x: 150, y: 110, a: 180 },
      { x: 150, y: 135, a: 180 },
      { x: 150, y: 138, a: 180 },
    ],
  },
  uDonusu: {
    yoyo: false,
    sureMs: 4200,
    keyframes: [
      { x: 108, y: 25, a: 180 },
      { x: 108, y: 110, a: 180 },
      { x: 150, y: 145, a: 255 },
      { x: 192, y: 110, a: 330 },
      { x: 192, y: 25, a: 360 },
    ],
  },
  seritDegistirme: {
    yoyo: true,
    sureMs: 4000,
    keyframes: [
      { x: 195, y: 195, a: 0 },
      { x: 195, y: 140, a: 0 },
      { x: 155, y: 110, a: 300 },
      { x: 105, y: 95, a: 0 },
      { x: 105, y: 40, a: 0 },
    ],
  },
  sinyal: {
    yoyo: true,
    sureMs: 3600,
    keyframes: [
      { x: 185, y: 28, a: 180 },
      { x: 185, y: 95, a: 180 },
      { x: 118, y: 140, a: 180 },
      { x: 118, y: 195, a: 180 },
    ],
  },
  geriManevra: {
    yoyo: true,
    sureMs: 3800,
    keyframes: [
      { x: 150, y: 40, a: 180 },
      { x: 150, y: 90, a: 180 },
      { x: 150, y: 140, a: 180 },
      { x: 150, y: 185, a: 180 },
    ],
  },
};
