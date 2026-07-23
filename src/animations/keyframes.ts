import type { ManevraTipi } from "@/types";

export interface KeyFrame {
  x: number;
  y: number;
  a: number; // açı (derece), 0 = burun yukarı (Kuzey)
  signalLeft: number; // 0 veya 1
  signalRight: number; // 0 veya 1
  brake: number; // 0 veya 1
}

export interface ManevraTanim {
  keyframes: KeyFrame[];
  yoyo: boolean;
  sureMs: number;
}

export const DESIGN_W = 300;
export const DESIGN_H = 220;

// Yön (Açı) düzeltmesi: Reanimated'in 359'dan 1'e dönerken etrafında fırıldak gibi dönmesini engeller
function unwrapAngles(frames: KeyFrame[]) {
  for (let i = 1; i < frames.length; i++) {
    let diff = frames[i].a - frames[i - 1].a;
    while (diff > 180) {
      frames[i].a -= 360;
      diff = frames[i].a - frames[i - 1].a;
    }
    while (diff < -180) {
      frames[i].a += 360;
      diff = frames[i].a - frames[i - 1].a;
    }
  }
  return frames;
}

// Düz hat oluşturucu
function straight(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  steps: number,
  isReverse: boolean = false,
  signal: "none" | "left" | "right" = "none",
  brakeAtEnd: boolean = false
): KeyFrame[] {
  const frames: KeyFrame[] = [];
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (isReverse) a += 180;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    frames.push({
      x: p0.x + dx * t,
      y: p0.y + dy * t,
      a,
      signalLeft: signal === "left" ? 1 : 0,
      signalRight: signal === "right" ? 1 : 0,
      brake: brakeAtEnd && i >= steps - 3 ? 1 : 0 // son 3 adımda frene bas
    });
  }
  return frames;
}

// Cubic Bezier (Kavis) oluşturucu - Gerçekçi dönüş fiziği için
function bezier(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  steps: number,
  isReverse: boolean = false,
  signal: "none" | "left" | "right" = "none",
  brakeAtEnd: boolean = false
): KeyFrame[] {
  const frames: KeyFrame[] = [];
  let lastA = 0;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const inv = 1 - t;
    
    // Konum
    const x = inv * inv * inv * p0.x + 3 * inv * inv * t * p1.x + 3 * inv * t * t * p2.x + t * t * t * p3.x;
    const y = inv * inv * inv * p0.y + 3 * inv * inv * t * p1.y + 3 * inv * t * t * p2.y + t * t * t * p3.y;

    // Türev (Hız vektörü) -> Aracın burnunun tam yola teğet olmasını sağlar
    const dx = 3 * inv * inv * (p1.x - p0.x) + 6 * inv * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
    const dy = 3 * inv * inv * (p1.y - p0.y) + 6 * inv * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);

    let a = lastA;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      a = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (isReverse) a += 180;
      lastA = a;
    } else if (i === 0 && frames.length === 0) {
      // Eğer en başta hız sıfırsa ve açı yoksa p0'dan p3'e genel yönü al
      a = (Math.atan2(p3.y - p0.y, p3.x - p0.x) * 180) / Math.PI + 90;
      if (isReverse) a += 180;
      lastA = a;
    }

    frames.push({ 
      x, y, a, 
      signalLeft: signal === "left" ? 1 : 0,
      signalRight: signal === "right" ? 1 : 0, 
      brake: brakeAtEnd && i >= steps - 3 ? 1 : 0 
    });
  }
  return frames;
}

// Bekleme (Durma) oluşturucu
function wait(lastFrame: KeyFrame, steps: number, brake: boolean = true, signal: "none" | "left" | "right" = "none"): KeyFrame[] {
  const frames: KeyFrame[] = [];
  const sl = signal === "left" ? 1 : (signal === "none" ? lastFrame.signalLeft : 0);
  const sr = signal === "right" ? 1 : (signal === "none" ? lastFrame.signalRight : 0);
  
  for (let i = 0; i < steps; i++) {
    frames.push({ ...lastFrame, brake: brake ? 1 : 0, signalLeft: sl, signalRight: sr });
  }
  return frames;
}

function joinPaths(...paths: KeyFrame[][]): KeyFrame[] {
  const result: KeyFrame[] = [];
  paths.forEach(p => result.push(...p));
  return unwrapAngles(result);
}


// MANEVRA TANIMLARI
export const MANEVRALAR: Record<ManevraTipi, ManevraTanim> = {
  
  temelKumanda: {
    yoyo: false,
    sureMs: 4000,
    keyframes: joinPaths(
      wait({ x: 150, y: 195, a: 0, signalLeft: 1, signalRight: 0, brake: 1 }, 10, true, "left"), // Sinyal ve kalkış bekleme
      straight({ x: 150, y: 195 }, { x: 150, y: 160 }, 15, false, "left"), // Sinyalli kalkış
      straight({ x: 150, y: 160 }, { x: 150, y: -20 }, 40, false, "none", true) // Düz gidiş
    ),
  },

  paralelPark: {
    yoyo: false,
    sureMs: 9000,
    keyframes: joinPaths(
      straight({ x: 100, y: 240 }, { x: 100, y: 15 }, 30, false, "right", true), // Daha ileri yanaşma (Açı: 0)
      wait({ x: 100, y: 15, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 10, true, "right"), // Durup vitese takma
      // Önce biraz düz geri gelerek manevraya yer açıyoruz (Fiziksel gerçeklik)
      straight({ x: 100, y: 15 }, { x: 100, y: 40 }, 15, true, "right", false),
      // Geri S-Çizme (Paralel Park)
      bezier({ x: 100, y: 40 }, { x: 100, y: 65 }, { x: 120, y: 85 }, { x: 138, y: 95 }, 30, true, "right"), // İlk kırma (Yumuşak)
      bezier({ x: 138, y: 95 }, { x: 156, y: 105 }, { x: 176, y: 120 }, { x: 176, y: 140 }, 30, true, "right", true), // İkinci kırma ve toparlama (Tam teğet)
      wait({ x: 176, y: 140, a: 0, signalLeft: 0, signalRight: 0, brake: 1 }, 15, true, "none"), // Park tamamlandı
      // Çıkış
      wait({ x: 176, y: 140, a: 0, signalLeft: 1, signalRight: 0, brake: 1 }, 10, true, "left"), // Sol sinyal
      bezier({ x: 176, y: 140 }, { x: 176, y: 120 }, { x: 110, y: 90 }, { x: 110, y: 15 }, 40, false, "left"), // Çıkış kavis (Daha keskin, dubaya değmemesi için erken manevra)
      straight({ x: 110, y: 15 }, { x: 110, y: -20 }, 20, false, "none")
    ),
  },

  lPark: {
    yoyo: false,
    sureMs: 8000,
    keyframes: joinPaths(
      straight({ x: -20, y: 70 }, { x: 230, y: 70 }, 40, false, "right", true), // L parka geliş (sağa doğru)
      wait({ x: 230, y: 70, a: 90, signalLeft: 0, signalRight: 1, brake: 1 }, 10, true, "right"), // Duruş (Açı: 90)
      // 90 derece geri kavis
      bezier({ x: 230, y: 70 }, { x: 200, y: 70 }, { x: 182.5, y: 100 }, { x: 182.5, y: 170 }, 40, true, "right", true),
      wait({ x: 182.5, y: 170, a: 0, signalLeft: 0, signalRight: 0, brake: 1 }, 15, true, "none"), // L Park Tamam (Açı: 0)
      // Çıkış
      wait({ x: 182.5, y: 170, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 5, true, "right"),
      bezier({ x: 182.5, y: 170 }, { x: 182.5, y: 100 }, { x: 200, y: 70 }, { x: 250, y: 70 }, 30, false, "right"),
      straight({ x: 250, y: 70 }, { x: 320, y: 70 }, 20, false, "none")
    ),
  },

  rampaKalkis: {
    yoyo: false,
    sureMs: 5000,
    keyframes: joinPaths(
      straight({ x: 150, y: 220 }, { x: 150, y: 140 }, 20, false, "right", true), // Sağ sinyalle geliş
      wait({ x: 150, y: 140, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 10, true, "right"), // Sağ sinyalle bekleme
      wait({ x: 150, y: 140, a: 0, signalLeft: 1, signalRight: 0, brake: 1 }, 10, true, "left"), // Sol sinyal yakıp kalkışa hazırlık
      straight({ x: 150, y: 140 }, { x: 150, y: 145 }, 5, true, "left", false), // Yarım metre geri kaçırma (hata payı veya titreme)
      straight({ x: 150, y: 145 }, { x: 150, y: -20 }, 30, false, "left", false) // Sol sinyalle başarılı kalkış
    ),
  },

  aniFren: {
    yoyo: false,
    sureMs: 5000,
    keyframes: joinPaths(
      straight({ x: 150, y: 220 }, { x: 150, y: 100 }, 30, false, "right", false), // Sağ sinyalle hızlanma
      straight({ x: 150, y: 100 }, { x: 150, y: 80 }, 5, false, "right", true), // Sağ sinyalle sert fren
      wait({ x: 150, y: 80, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 15, true, "right"), // Durma ve fren
      wait({ x: 150, y: 80, a: 0, signalLeft: 1, signalRight: 0, brake: 1 }, 10, true, "left"), // Sol sinyal açık bekleme
      straight({ x: 150, y: 80 }, { x: 150, y: -20 }, 30, false, "left", false) // Sol sinyalle kalkış ve devam
    ),
  },

  uDonusu: {
    yoyo: false,
    sureMs: 6500,
    keyframes: joinPaths(
      straight({ x: 180, y: 220 }, { x: 180, y: 120 }, 20, false, "left", true), // Kavşağa yaklaşma
      wait({ x: 180, y: 120, a: 0, signalLeft: 1, signalRight: 0, brake: 1 }, 10, true, "left"), // Kontrol için bekleme
      // U Dönüşü (180 derece kavis)
      bezier({ x: 180, y: 120 }, { x: 180, y: 50 }, { x: 110, y: 50 }, { x: 110, y: 120 }, 40, false, "left"),
      straight({ x: 110, y: 120 }, { x: 110, y: 240 }, 25, false, "none") // Dönüş tamam
    ),
  },

  seritDegistirme: {
    yoyo: false,
    sureMs: 5000,
    keyframes: joinPaths(
      straight({ x: 200, y: 240 }, { x: 200, y: 150 }, 15, false, "left"), // Sağ şeritte gidiş, sol sinyal
      straight({ x: 200, y: 150 }, { x: 100, y: 70 }, 30, false, "left"), // Sola doğru çapraz geçiş
      straight({ x: 100, y: 70 }, { x: 100, y: -20 }, 20, false, "none") // Sol şeritte devam
    ).map((f) => ({ ...f, a: 0 })), // Aracın burnu hep düz kalsın
  },

  sinyal: {
    yoyo: false,
    sureMs: 4000,
    keyframes: joinPaths(
      straight({ x: 150, y: 240 }, { x: 150, y: -20 }, 60, false, "right") // Sadece sinyal yanarak düz gidiş (test amaçlı)
    ),
  },

  geriManevra: {
    yoyo: false,
    sureMs: 6000,
    keyframes: joinPaths(
      straight({ x: 150, y: 240 }, { x: 150, y: 40 }, 30, false, "right", true), // İleri gelip durma (Aşağıdan yukarıya, Açı: 0)
      wait({ x: 150, y: 40, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 10, true, "right"), // Duruş
      straight({ x: 150, y: 40 }, { x: 150, y: 185 }, 50, true, "right", true), // 25 Metre geri, sağ sinyal açık!
      wait({ x: 150, y: 185, a: 0, signalLeft: 0, signalRight: 1, brake: 1 }, 15, true, "right"), // Duruş, sağ sinyal açık!
      straight({ x: 150, y: 185 }, { x: 150, y: -20 }, 30, false, "left") // İleriye çıkış
    ),
  },
};
