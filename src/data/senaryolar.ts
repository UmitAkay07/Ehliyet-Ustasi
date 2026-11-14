/**
 * Senaryo sorularının animasyonlu sahneleri (soru kimliği → sahne).
 *
 * Koordinatlar: 100 x 60 birimlik kuşbakışı sahne.
 *   Doğuya (sağa) giden şerit  y = 34.5   (sağdan trafik)   Batıya giden şerit  y = 25.5
 *   Kuzeye (yukarı) giden şerit x = 54.5                     Güneye giden şerit  x = 45.5
 *   İki şeritli yolda sağ şerit y = 36, sol şerit y = 24 (ikisi de doğuya)
 * Renkler: yeşil = sürücü (soruda "yeşil araç"), kırmızı/mavi = diğer araçlar.
 *
 * Sahneler sorunun doğru cevabıyla çelişmeyecek şekilde tasarlanmıştır; çarpışma ve görünürlük
 * kontrolleri scripts/test-sahne.mjs içindedir. Bu dosya yalnızca tür içe aktarır (Node'da doğrudan çalışsın diye).
 */
import type { KF, Sahne, SahnePrim } from "../animations/sahne";

const R = { uyari: "#EF4444", yasak: "#F97316", cizgi: "#E5E7EB", sari: "#FBBF24", uygun: "#10B981", mavi: "#3B82F6", beyaz: "#FFFFFF" };

function sekizgen(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 8 }, (_, i) => {
    const a = Math.PI / 8 + (i * Math.PI) / 4;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
}

function yasakIsareti(x: number, y: number, zaman?: [number, number]): SahnePrim[] {
  return [
    { tip: "daire", cx: x, cy: y, r: 3, dolgu: "#111827", kenar: R.uyari, kenarKalinlik: 0.9, opaklik: 0.92, zaman },
    { tip: "cizgi", x1: x - 2.1, y1: y + 2.1, x2: x + 2.1, y2: y - 2.1, renk: R.uyari, kalinlik: 0.9, zaman },
  ];
}

function uyari(x: number, y: number, zaman: [number, number]): SahnePrim[] {
  return [
    { tip: "cokgen", noktalar: [[x, y - 3.4], [x + 3.4, y + 2.8], [x - 3.4, y + 2.8]], dolgu: R.uyari, kenar: R.beyaz, kenarKalinlik: 0.4, zaman },
    { tip: "metin", x, y: y + 2.1, s: "!", boyut: 4.2, renk: R.beyaz, hizala: "middle", kalin: true, zaman },
  ];
}

function yasakAlan(x: number, y: number, w: number, h: number): SahnePrim[] {
  const cizgiler: SahnePrim[] = [];
  for (let cx = x; cx < x + w - 1; cx += 4) {
    cizgiler.push({ tip: "cizgi", x1: cx, y1: y + h, x2: Math.min(cx + h, x + w), y2: y + h - Math.min(h, x + w - cx), renk: R.yasak, kalinlik: 0.4, opaklik: 0.7 });
  }
  return [{ tip: "rect", x, y, w, h, dolgu: R.yasak, opaklik: 0.3, kenar: R.yasak, kenarKalinlik: 0.4 }, ...cizgiler];
}

const devamliCizgi: SahnePrim[] = [
  { tip: "cizgi", x1: 0, y1: 29.4, x2: 100, y2: 29.4, renk: R.sari, kalinlik: 0.55 },
  { tip: "cizgi", x1: 0, y1: 30.6, x2: 100, y2: 30.6, renk: R.sari, kalinlik: 0.55 },
];

/** Halka kavşakta (merkez 50,30, yarıçap 11.5) verilen açıdaki konum */
function halka(t: number, derece: number): KF {
  const a = (derece * Math.PI) / 180;
  return [t, 50 + 11.5 * Math.cos(a), 30 + 11.5 * Math.sin(a)];
}

// ---------------------------------------------------------------- kavşak

const kavsakSagdan: Sahne = {
  zemin: "kavsak",
  araclar: [
    { renk: "yesil", kareler: [[0, 4, 34.5], [0.3, 31, 34.5], [0.62, 31, 34.5], [1, 96, 34.5]] },
    { renk: "kirmizi", kareler: [[0, 54.5, 66], [0.62, 54.5, -6], [1, 54.5, -6]] },
  ],
  lejant: ["Yeşil araç: sürücü", "Kırmızı araç: sağdan gelen"],
};

const kavsakIkiArac: Sahne = {
  zemin: "kavsak",
  araclar: [
    { renk: "yesil", kareler: [[0, 4, 34.5], [0.35, 32, 34.5], [0.7, 32, 34.5], [1, 96, 34.5]] },
    { renk: "kirmizi", kareler: [[0, 54.5, 66], [0.35, 54.5, 46], [0.5, 54.5, 46], [0.85, 54.5, -6], [1, 54.5, -6]] },
  ],
  lejant: ["Yeşil araç: sürücü", "Kırmızı araç: sağdan gelen"],
};

const taliYol: Sahne = {
  zemin: "kavsak",
  araclar: [
    { renk: "yesil", kareler: [[0, 4, 34.5], [1, 96, 34.5]] },
    { renk: "kirmizi", kareler: [[0, 54.5, 66], [0.3, 54.5, 46], [0.68, 54.5, 46], [1, 54.5, -6]] },
  ],
  lejant: ["Yeşil araç: ana yolda", "Kırmızı araç: tali yoldan çıkıyor"],
};

const durLevhasi: Sahne = {
  zemin: "kavsak",
  araclar: [
    { renk: "yesil", kareler: [[0, 4, 34.5], [0.32, 35, 34.5], [0.62, 35, 34.5], [1, 96, 34.5]] },
    { renk: "kirmizi", kareler: [[0, 54.5, 66], [0.7, 54.5, -6], [1, 54.5, -6]] },
  ],
  altEkler: [
    { tip: "cizgi", x1: 40.5, y1: 30, x2: 40.5, y2: 39, renk: R.cizgi, kalinlik: 1.1 },
    { tip: "cokgen", noktalar: sekizgen(37.5, 43.5, 2.8), dolgu: R.uyari, kenar: R.beyaz, kenarKalinlik: 0.4 },
    { tip: "metin", x: 37.5, y: 44.3, s: "DUR", boyut: 2, renk: R.beyaz, hizala: "middle", kalin: true },
  ],
  lejant: ["Yeşil araç: dur levhasında", "Kırmızı araç: kavşaktan geçiyor"],
};

const donel: Sahne = {
  zemin: "donel-kavsak",
  araclar: [
    {
      renk: "yesil",
      kareler: [
        [0, 2, 34.5], [0.2, 34, 34.5],
        halka(0.3, 160), halka(0.38, 135), halka(0.46, 110), halka(0.52, 90),
        halka(0.58, 65), halka(0.65, 40), halka(0.72, 20),
        [0.8, 70, 34.5], [1, 98, 34.5],
      ],
    },
  ],
  lejant: ["Yeşil araç: adanın etrafında saat yönünün tersine döner"],
};

// ---------------------------------------------------------------- yaya geçidi

const yayaDur: Sahne = {
  zemin: "yaya-gecidi",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.35, 34, 34.5], [0.8, 34, 34.5], [1, 96, 34.5]] }],
  yayalar: [{ kareler: [[0, 50, 14], [0.2, 50, 14], [0.9, 50, 46], [1, 50, 46]] }],
  lejant: ["Yeşil araç: sürücü", "Beyaz nokta: geçitteki yaya"],
};

const yayaHazir: Sahne = {
  zemin: "yaya-gecidi",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.5, 32, 34.5], [0.85, 32, 34.5], [1, 60, 34.5]] }],
  yayalar: [{ kareler: [[0, 50, 16], [0.45, 50, 16], [0.95, 50, 46], [1, 50, 46]] }],
  lejant: ["Yeşil araç: sürücü", "Beyaz nokta: geçmek üzere olan yaya"],
};

const yayaIhlal: Sahne = {
  zemin: "yaya-gecidi",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.5, 37, 34.5], [1, 37, 34.5]] }],
  yayalar: [{ kareler: [[0, 50, 14], [0.15, 50, 14], [0.85, 50, 46], [1, 50, 46]] }],
  ustEkler: uyari(30, 25, [0.45, 1]),
  lejant: ["Yeşil araç: geçide hızla yaklaşıyor", "Beyaz nokta: geçitte yürüyen yaya"],
};

const okulGecidi: Sahne = {
  zemin: "yaya-gecidi",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.45, 30, 34.5], [1, 30, 34.5]] }],
  yayalar: [
    { cocuk: true, kareler: [[0, 46, 15], [0.25, 46, 15], [0.9, 46, 47], [1, 46, 47]] },
    { cocuk: true, kareler: [[0, 50, 15], [0.35, 50, 15], [1, 50, 47]] },
    { cocuk: true, kareler: [[0, 54, 15], [0.45, 54, 15], [1, 54, 47]] },
  ],
  lejant: ["Yeşil araç: sürücü", "Sarı noktalar: yola çıkan çocuklar"],
};

// ---------------------------------------------------------------- sollama

const sollamaYasak: Sahne = {
  zemin: "duz-yol",
  araclar: [
    { renk: "yesil", kareler: [[0, 6, 34.5], [1, 44, 34.5]] },
    { renk: "kirmizi", kareler: [[0, 30, 34.5], [1, 70, 34.5]] },
  ],
  altEkler: devamliCizgi,
  ustEkler: [
    ...yasakIsareti(50, 13),
    { tip: "metin", x: 50, y: 6.5, s: "Devamlı çizgi", boyut: 3, renk: R.sari, hizala: "middle", kalin: true },
  ],
  lejant: ["Yeşil araç: öndeki aracı sollamak istiyor", "Sarı çizgi: devamlı çizgi"],
};

const sollamaVazgec: Sahne = {
  zemin: "duz-yol",
  araclar: [
    { renk: "kirmizi", kareler: [[0, 36, 34.5], [1, 96, 34.5]] },
    { renk: "yesil", kareler: [[0, 8, 34.5], [0.28, 30, 34.5], [0.42, 42, 28], [0.52, 47, 34.5], [1, 72, 34.5]] },
    { renk: "mavi", kareler: [[0, 104, 25.5], [1, -4, 25.5]] },
  ],
  ustEkler: uyari(66, 13, [0.3, 0.55]),
  lejant: ["Yeşil araç: sollamaya başlar, karşıdan araç görünce vazgeçer", "Mavi araç: karşıdan gelen"],
};

function sollamaRiski(devamli: boolean): Sahne {
  return {
    zemin: "duz-yol",
    araclar: [
      { renk: "kirmizi", kareler: [[0, 36, 34.5], [1, 96, 34.5]] },
      { renk: "yesil", kareler: [[0, 8, 34.5], [0.28, 30, 34.5], [0.45, 48, 25.5], [0.7, 58, 25.5], [1, 58, 25.5]] },
      { renk: "mavi", kareler: [[0, 104, 25.5], [0.7, 76, 25.5], [1, 76, 25.5]] },
    ],
    altEkler: devamli ? devamliCizgi : undefined,
    ustEkler: [
      ...uyari(67, 13, [0.7, 1]),
      ...(devamli ? [{ tip: "metin", x: 50, y: 6.5, s: "Devamlı çizgi", boyut: 3, renk: R.sari, hizala: "middle", kalin: true } as SahnePrim] : []),
    ],
    lejant: ["Yeşil araç: karşı şeritte sollar", "Mavi araç: karşıdan gelen"],
  };
}

const sollamaSonrasi: Sahne = {
  zemin: "duz-yol",
  araclar: [
    { renk: "kirmizi", kareler: [[0, 30, 34.5], [1, 70, 34.5]] },
    { renk: "yesil", kareler: [[0, 8, 34.5], [0.2, 22, 34.5], [0.33, 34, 25.5], [0.62, 64, 25.5], [0.78, 80, 34.5], [1, 96, 34.5]], sinyal: { taraf: "sag", zaman: [0.6, 0.78] } },
  ],
  lejant: ["Yeşil araç: sollar, güvenli mesafe bırakıp sağ şeride döner", "Kırmızı araç: sollanan araç"],
};

// ---------------------------------------------------------------- şerit değiştirme

const seritDegistir: Sahne = {
  zemin: "iki-serit",
  araclar: [
    { renk: "mavi", kareler: [[0, -12, 24], [0.5, 62, 24], [1, 112, 24]] },
    { renk: "yesil", kareler: [[0, 6, 36], [0.45, 36, 36], [0.8, 62, 24], [1, 90, 24]], sinyal: { taraf: "sol", zaman: [0.25, 0.8] } },
  ],
  lejant: ["Yeşil araç: sinyal verip şerit değiştirir", "Turuncu ışık: sinyal"],
};

const seritKorNokta: Sahne = {
  zemin: "iki-serit",
  araclar: [
    { renk: "mavi", kareler: [[0, -10, 24], [1, 52, 24]] },
    { renk: "yesil", kareler: [[0, 6, 36], [0.5, 34, 36], [0.75, 46, 32.5], [1, 46, 32.5]] },
  ],
  ustEkler: uyari(40, 11, [0.7, 1]),
  lejant: ["Yeşil araç: aynaya bakmadan şerit değiştirir", "Mavi araç: kör noktada"],
};

// ---------------------------------------------------------------- park

const parkYasak: Sahne = {
  zemin: "duz-yol",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.5, 47, 34.5], [1, 96, 34.5]] }],
  altEkler: yasakAlan(24, 39, 46, 8),
  ustEkler: yasakIsareti(47, 43),
  lejant: ["Turuncu alan: park / duraklama yasak", "Yeşil araç: yasak alanın yanından geçer"],
};

const parkKavsak: Sahne = {
  zemin: "kavsak",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.5, 64, 34.5], [0.72, 80, 43], [0.85, 86, 43], [1, 86, 43]] }],
  altEkler: [
    ...yasakAlan(20, 39, 21, 8),
    { tip: "rect", x: 72, y: 39, w: 22, h: 8, dolgu: R.uygun, opaklik: 0.22, kenar: R.uygun, kenarKalinlik: 0.4 },
  ],
  ustEkler: yasakIsareti(30.5, 43),
  lejant: ["Turuncu alan: kavşak yakını, park yasak", "Yeşil alan: uygun park yeri"],
};

const parkEngelli: Sahne = {
  zemin: "duz-yol",
  araclar: [{ renk: "yesil", kareler: [[0, 4, 34.5], [0.45, 34, 34.5], [0.7, 47, 43], [0.78, 49, 43], [1, 49, 43]] }],
  altEkler: [
    { tip: "rect", x: 40, y: 39, w: 14, h: 8, dolgu: R.mavi, opaklik: 0.3, kenar: R.mavi, kenarKalinlik: 0.4 },
    { tip: "metin", x: 47, y: 45.8, s: "Engelli", boyut: 2.4, renk: R.beyaz, hizala: "middle", kalin: true },
  ],
  ustEkler: [{ tip: "metin", x: 50, y: 55, s: "Para cezası + araç çekimi", boyut: 3.2, renk: R.uyari, hizala: "middle", kalin: true, zaman: [0.8, 1] }],
  lejant: ["Mavi alan: engelli park yeri", "Yeşil araç: izinsiz park eder"],
};

export const SENARYO_SAHNELERI: Record<string, Sahne> = {
  "sen-01": kavsakSagdan,
  "sen-02": sollamaYasak,
  "sen-03": parkYasak,
  "sen-04": yayaDur,
  "sen-05": seritDegistir,
  "sen-06": kavsakIkiArac,
  "sen-07": sollamaVazgec,
  "sen-08": yayaHazir,
  "sen-09": taliYol,
  "sen-10": sollamaRiski(false),
  "sen-11": parkKavsak,
  "sen-12": yayaIhlal,
  "sen-13": seritKorNokta,
  "sen-14": donel,
  "sen-15": sollamaRiski(true),
  "sen-16": parkEngelli,
  "sen-17": okulGecidi,
  "sen-18": seritDegistir,
  "sen-19": durLevhasi,
  "sen-20": sollamaSonrasi,
};
