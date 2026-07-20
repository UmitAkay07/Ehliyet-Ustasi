import type { SenaryoAnimId } from "@/types";
import type { AnimKeyFrame, AnimTanim } from "./shared";

export const SENARYO_W = 300;
export const SENARYO_H = 180;

export interface SenaryoAktor {
  renk: string;
  etiket: string;
  anim: AnimTanim;
}

export interface SenaryoTanim {
  baslik: string;
  ipucu: string;
  sureMs: number;
  yoyo: boolean;
  aktorler: SenaryoAktor[];
  yaya?: AnimTanim;
}

export const SENARYO_TANIMLAR: Record<SenaryoAnimId, SenaryoTanim> = {
  kavsakOncelik: {
    baslik: "Kavşak — geçiş hakkı",
    ipucu: "Kırmızı sağdan geliyor · Yeşil yavaşla / dur",
    sureMs: 4200,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4200,
          keyframes: [
            { x: 150, y: 168, a: 0 },
            { x: 150, y: 118, a: 0 },
            { x: 150, y: 108, a: 0 },
            { x: 150, y: 108, a: 0 },
            { x: 150, y: 68, a: 0 },
          ],
        },
      },
      {
        renk: "#EF4444",
        etiket: "Sağdan",
        anim: {
          yoyo: true,
          sureMs: 4200,
          keyframes: [
            { x: 268, y: 80, a: 90 },
            { x: 210, y: 80, a: 90 },
            { x: 178, y: 80, a: 90 },
            { x: 178, y: 80, a: 90 },
            { x: 130, y: 80, a: 90 },
          ],
        },
      },
    ],
  },

  anaYolTali: {
    baslik: "Ana yol — tali yol",
    ipucu: "Tali yoldan çıkan ana yola yol verir",
    sureMs: 4000,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Ana yol",
        anim: {
          yoyo: true,
          sureMs: 4000,
          keyframes: [
            { x: 40, y: 95, a: 90 },
            { x: 120, y: 95, a: 90 },
            { x: 200, y: 95, a: 90 },
            { x: 260, y: 95, a: 90 },
          ],
        },
      },
      {
        renk: "#EF4444",
        etiket: "Tali yol",
        anim: {
          yoyo: true,
          sureMs: 4000,
          keyframes: [
            { x: 150, y: 168, a: 0 },
            { x: 150, y: 130, a: 0 },
            { x: 150, y: 118, a: 0 },
            { x: 150, y: 118, a: 0 },
          ],
        },
      },
    ],
  },

  donelKavsak: {
    baslik: "Dönel kavşak",
    ipucu: "Ada etrafında belirtilen yönde dön",
    sureMs: 5000,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 5000,
          keyframes: [
            { x: 150, y: 168, a: 0 },
            { x: 150, y: 130, a: 0 },
            { x: 120, y: 108, a: 300 },
            { x: 150, y: 72, a: 0 },
            { x: 180, y: 108, a: 60 },
            { x: 150, y: 130, a: 180 },
            { x: 150, y: 168, a: 180 },
          ],
        },
      },
    ],
  },

  durLevhasi: {
    baslik: "DUR levhası",
    ipucu: "Tam dur · yol ver · güvenliyse geç",
    sureMs: 4500,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4500,
          keyframes: [
            { x: 150, y: 168, a: 0 },
            { x: 150, y: 125, a: 0 },
            { x: 150, y: 108, a: 0 },
            { x: 150, y: 108, a: 0 },
            { x: 150, y: 108, a: 0 },
            { x: 150, y: 68, a: 0 },
          ],
        },
      },
    ],
  },

  sollama: {
    baslik: "Sollama manevrası",
    ipucu: "Sol şerit · geç · sağa dön · karşıya dikkat",
    sureMs: 4800,
    yoyo: true,
    aktorler: [
      {
        renk: "#64748B",
        etiket: "Öndeki",
        anim: {
          yoyo: true,
          sureMs: 4800,
          keyframes: [
            { x: 140, y: 90, a: 90 },
            { x: 140, y: 90, a: 90 },
          ],
        },
      },
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4800,
          keyframes: [
            { x: 45, y: 110, a: 90 },
            { x: 85, y: 110, a: 90 },
            { x: 105, y: 72, a: 90 },
            { x: 165, y: 72, a: 90 },
            { x: 210, y: 110, a: 90 },
            { x: 240, y: 110, a: 90 },
          ],
        },
      },
      {
        renk: "#EF4444",
        etiket: "Karşı",
        anim: {
          yoyo: true,
          sureMs: 4800,
          keyframes: [
            { x: 265, y: 72, a: 270 },
            { x: 210, y: 72, a: 270 },
            { x: 165, y: 72, a: 270 },
            { x: 165, y: 72, a: 270 },
          ],
        },
      },
    ],
  },

  parkYasak: {
    baslik: "Park / durak yasağı",
    ipucu: "Yasak alana girme · uygun yere git",
    sureMs: 4000,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4000,
          keyframes: [
            { x: 60, y: 95, a: 90 },
            { x: 130, y: 95, a: 90 },
            { x: 165, y: 95, a: 90 },
            { x: 165, y: 95, a: 90 },
            { x: 165, y: 130, a: 180 },
            { x: 165, y: 148, a: 180 },
          ],
        },
      },
    ],
  },

  yayaGecidi: {
    baslik: "Yaya geçidi",
    ipucu: "Yayaya yol ver · gerekirse dur",
    sureMs: 4500,
    yoyo: true,
    aktorler: [
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4500,
          keyframes: [
            { x: 60, y: 95, a: 90 },
            { x: 130, y: 95, a: 90 },
            { x: 155, y: 95, a: 90 },
            { x: 155, y: 95, a: 90 },
            { x: 155, y: 95, a: 90 },
            { x: 210, y: 95, a: 90 },
          ],
        },
      },
    ],
    yaya: {
      yoyo: true,
      sureMs: 4500,
      keyframes: [
        { x: 178, y: 55, a: 0 },
        { x: 178, y: 72, a: 0 },
        { x: 178, y: 95, a: 0 },
        { x: 178, y: 118, a: 0 },
        { x: 178, y: 135, a: 0 },
      ],
    },
  },

  seritDegisim: {
    baslik: "Şerit değiştirme",
    ipucu: "Ayna · sinyal · omuz · güvenli boşluk",
    sureMs: 4500,
    yoyo: true,
    aktorler: [
      {
        renk: "#94A3B8",
        etiket: "Sol şerit",
        anim: {
          yoyo: true,
          sureMs: 4500,
          keyframes: [
            { x: 105, y: 145, a: 0 },
            { x: 105, y: 55, a: 0 },
          ],
        },
      },
      {
        renk: "#22C55E",
        etiket: "Sen",
        anim: {
          yoyo: true,
          sureMs: 4500,
          keyframes: [
            { x: 195, y: 145, a: 0 },
            { x: 195, y: 115, a: 0 },
            { x: 195, y: 100, a: 0 },
            { x: 150, y: 92, a: 300 },
            { x: 105, y: 100, a: 0 },
            { x: 105, y: 130, a: 0 },
          ],
        },
      },
    ],
  },
};
