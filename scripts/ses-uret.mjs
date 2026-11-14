// Simülasyon ses efektlerini sentezler (lisans gerektirmez, tamamen bize ait). Çıktı: assets/sesler/*.wav
// Kullanım: node scripts/ses-uret.mjs
// Döngü sesleri (sinyal, geri) dairesel üretilir: son örnek ilk örneğe dikişsiz bağlanır.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const KLASOR = join(KOK, "assets", "sesler");
const SR = 44100;
const TAU = Math.PI * 2;

// ---------- Yardımcılar ----------

function rastgele(tohum) {
  let a = tohum >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bos = (saniye) => new Float64Array(Math.round(saniye * SR));

/** RBJ biquad; tur: "alcak" | "yuksek" | "bant" */
function biquad(girdi, tur, frekans, q = 0.707) {
  const w = (TAU * frekans) / SR;
  const cos = Math.cos(w);
  const alfa = Math.sin(w) / (2 * q);
  let b0, b1, b2;
  if (tur === "alcak") [b0, b1, b2] = [(1 - cos) / 2, 1 - cos, (1 - cos) / 2];
  else if (tur === "yuksek") [b0, b1, b2] = [(1 + cos) / 2, -(1 + cos), (1 + cos) / 2];
  else [b0, b1, b2] = [alfa, 0, -alfa];
  const a0 = 1 + alfa;
  const a1 = -2 * cos;
  const a2 = 1 - alfa;
  const cikti = new Float64Array(girdi.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < girdi.length; i++) {
    const x = girdi[i];
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    cikti[i] = y;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
  }
  return cikti;
}

/** t0 anında başlayan sönümlü sinüs ekler (dongu: sonu başa sarılır) */
function sonumluSinus(hedef, t0, frekans, tau, genlik, dongu = false, faz = 0) {
  const n = hedef.length;
  const bas = t0 * SR;
  const uzunluk = Math.ceil(tau * 7 * SR);
  for (let i = 0; i < uzunluk; i++) {
    const idx = Math.floor(bas) + i;
    const t = (idx - bas) / SR;
    if (t < 0) continue;
    const yumusak = Math.min(1, t / 0.0006);
    const deger = genlik * yumusak * Math.exp(-t / tau) * Math.sin(TAU * frekans * t + faz);
    if (dongu) hedef[((idx % n) + n) % n] += deger;
    else if (idx < n) hedef[idx] += deger;
  }
}

/** Kısa gürültü patlaması (tık sesi gövdesi) */
function gurultuPatlamasi(hedef, t0, tau, genlik, r, dongu = false) {
  const n = hedef.length;
  const bas = Math.floor(t0 * SR);
  const uzunluk = Math.ceil(tau * 6 * SR);
  for (let i = 0; i < uzunluk; i++) {
    const idx = bas + i;
    const deger = genlik * Math.exp(-i / SR / tau) * (r() * 2 - 1);
    if (dongu) hedef[idx % n] += deger;
    else if (idx < n) hedef[idx] += deger;
  }
}

/** Basit Schroeder yankısı (premium "parlaklık" için hafif oda) */
function yanki(girdi, islak = 0.2, kuyruk = 1.2) {
  const n = girdi.length + Math.round(kuyruk * SR);
  const kuru = new Float64Array(n);
  kuru.set(girdi);
  const tarak = (x, gecikmeMs, geri) => {
    const d = Math.round((gecikmeMs / 1000) * SR);
    const y = new Float64Array(x.length);
    for (let i = 0; i < x.length; i++) y[i] = x[i] + (i >= d ? geri * y[i - d] : 0);
    return y;
  };
  const tumGecis = (x, gecikmeMs, g) => {
    const d = Math.round((gecikmeMs / 1000) * SR);
    const y = new Float64Array(x.length);
    for (let i = 0; i < x.length; i++) {
      const xd = i >= d ? x[i - d] : 0;
      const yd = i >= d ? y[i - d] : 0;
      y[i] = -g * x[i] + xd + g * yd;
    }
    return y;
  };
  const taraklar = [29.7, 37.1, 41.1, 43.7].map((ms) => tarak(kuru, ms, 0.78));
  let islakSes = new Float64Array(n);
  for (const t of taraklar) for (let i = 0; i < n; i++) islakSes[i] += t[i] / 4;
  islakSes = tumGecis(tumGecis(islakSes, 5, 0.7), 1.7, 0.7);
  islakSes = biquad(islakSes, "alcak", 5000);
  const cikti = new Float64Array(n);
  for (let i = 0; i < n; i++) cikti[i] = kuru[i] * (1 - islak) + islakSes[i] * islak;
  return cikti;
}

/** Çan tınısı: temel + kısmi tonlar, yumuşak atak */
function can(hedef, t0, frekans, sure, genlik, kismiler = [[1, 1, 1], [2, 0.32, 0.45], [3, 0.12, 0.3], [4.2, 0.06, 0.2]]) {
  for (const [oran, g, sonum] of kismiler) sonumluSinus(hedef, t0, frekans * oran, sure * sonum, genlik * g);
}

function sonaKadarSus(x, saniye) {
  const kesim = Math.round(saniye * SR);
  for (let i = 0; i < x.length; i++) {
    const kalan = x.length - i;
    if (kalan < kesim) x[i] *= kalan / kesim;
  }
  return x;
}

function normallestir(x, tepe = 0.8) {
  let m = 0;
  for (const v of x) m = Math.max(m, Math.abs(v));
  return m > 0 ? x.map((v) => (v / m) * tepe) : x;
}

function wavYaz(ad, ornekler) {
  const veri = Buffer.alloc(ornekler.length * 2);
  for (let i = 0; i < ornekler.length; i++) {
    const v = Math.max(-1, Math.min(1, ornekler[i]));
    veri.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const baslik = Buffer.alloc(44);
  baslik.write("RIFF", 0);
  baslik.writeUInt32LE(36 + veri.length, 4);
  baslik.write("WAVE", 8);
  baslik.write("fmt ", 12);
  baslik.writeUInt32LE(16, 16);
  baslik.writeUInt16LE(1, 20);
  baslik.writeUInt16LE(1, 22);
  baslik.writeUInt32LE(SR, 24);
  baslik.writeUInt32LE(SR * 2, 28);
  baslik.writeUInt16LE(2, 32);
  baslik.writeUInt16LE(16, 34);
  baslik.write("data", 36);
  baslik.writeUInt32LE(veri.length, 40);
  writeFileSync(join(KLASOR, `${ad}.wav`), Buffer.concat([baslik, veri]));

  let tepe = 0, kare = 0;
  for (const v of ornekler) { tepe = Math.max(tepe, Math.abs(v)); kare += v * v; }
  const rms = Math.sqrt(kare / ornekler.length);
  const dikis = Math.abs(ornekler[ornekler.length - 1] - ornekler[0]);
  console.log(
    `${ad.padEnd(8)} ${(ornekler.length / SR).toFixed(2)} sn  tepe ${(20 * Math.log10(tepe)).toFixed(1)} dBFS  ` +
      `RMS ${(20 * Math.log10(rms)).toFixed(1)} dBFS  dikiş ${dikis.toFixed(4)}  ${((44 + veri.length) / 1024).toFixed(0)} KB`
  );
}

// ---------- Sesler ----------

/** Sinyal rölesi: açılışta "tık", 0,35 sn sonra kapanışta daha pes "tak" (görseldeki yanıp sönmeyle aynı ritim) */
function sinyal() {
  const x = bos(0.7);
  const r = rastgele(11);
  const tik = (t0, oran, g) => {
    gurultuPatlamasi(x, t0, 0.0012, 0.5 * g, r);
    sonumluSinus(x, t0, 2450 * oran, 0.0055, 0.65 * g);
    sonumluSinus(x, t0, 1320 * oran, 0.009, 0.5 * g, false, 0.8);
    sonumluSinus(x, t0, 540 * oran, 0.014, 0.32 * g, false, 1.7);
  };
  tik(0.002, 1, 1);
  tik(0.352, 0.82, 0.78);
  return normallestir(biquad(x, "yuksek", 180), 0.8);
}

/** Park sensörü: yumuşak kısa bip + sessizlik (döngü) */
function geri() {
  const x = bos(0.6);
  const sure = 0.11;
  for (let i = 0; i < sure * SR; i++) {
    const t = i / SR;
    const atak = Math.min(1, t / 0.004);
    const birakma = t > sure - 0.025 ? 0.5 + 0.5 * Math.cos((Math.PI * (t - (sure - 0.025))) / 0.025) : 1;
    x[i] = atak * birakma * (Math.sin(TAU * 1760 * t) + 0.12 * Math.sin(TAU * 3520 * t) + 0.05 * Math.sin(TAU * 880 * t));
  }
  return normallestir(x, 0.8);
}

/** Ani frende lastik sesi: aşağı kayan tiz ıslık + rezonanslı gürültü */
function lastik() {
  const sure = 0.85;
  const x = bos(sure);
  const r = rastgele(23);
  const gurultu = new Float64Array(x.length).map(() => r() * 2 - 1);
  const b1 = biquad(gurultu, "bant", 1500, 7);
  const b2 = biquad(gurultu, "bant", 2650, 9);
  let faz = 0;
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    const zarf = Math.min(1, t / 0.04) * (t > sure - 0.32 ? Math.max(0, (sure - t) / 0.32) : 1);
    const f = 1750 - 320 * t + 45 * Math.sin(TAU * 7 * t);
    faz += (TAU * f) / SR;
    const puruz = 0.75 + 0.25 * Math.sin(TAU * 43 * t + Math.sin(TAU * 3 * t));
    x[i] = zarf * (0.38 * Math.sin(faz) * puruz + 0.9 * b1[i] + 0.7 * b2[i]);
  }
  return normallestir(biquad(x, "yuksek", 400), 0.75);
}

/** Vites: tok mekanik klonk */
function vites() {
  const x = bos(0.3);
  const r = rastgele(31);
  sonumluSinus(x, 0.003, 140, 0.028, 0.6);
  sonumluSinus(x, 0.003, 320, 0.02, 0.9, false, 0.9);
  sonumluSinus(x, 0.003, 620, 0.012, 0.6, false, 0.3);
  sonumluSinus(x, 0.003, 1350, 0.006, 0.4, false, 1.9);
  gurultuPatlamasi(x, 0.003, 0.004, 0.55, r);
  return normallestir(sonaKadarSus(biquad(x, "yuksek", 70), 0.05), 0.8);
}

/** Çarpma: boğuk darbe */
function carpma() {
  const x = bos(0.42);
  const r = rastgele(41);
  sonumluSinus(x, 0.002, 88, 0.05, 0.6);
  sonumluSinus(x, 0.002, 230, 0.035, 0.8, false, 0.5);
  sonumluSinus(x, 0.002, 410, 0.02, 0.75, false, 1.1);
  sonumluSinus(x, 0.002, 690, 0.012, 0.5, false, 2.3);
  gurultuPatlamasi(x, 0.002, 0.02, 0.9, r);
  return normallestir(sonaKadarSus(biquad(biquad(x, "alcak", 2600), "yuksek", 60), 0.08), 0.8);
}

/** Başarı: yukarı çıkan üç notalı çan arpeji, hafif yankılı */
function basari() {
  const x = bos(1.0);
  can(x, 0.0, 1046.5, 0.55, 0.8);
  can(x, 0.09, 1318.5, 0.55, 0.75);
  can(x, 0.18, 1568.0, 0.75, 0.8);
  return normallestir(sonaKadarSus(yanki(x, 0.2, 0.6), 0.25), 0.8);
}

/** Hata: yumuşak, inen iki nota */
function hata() {
  const x = bos(0.6);
  const nota = (t0, f) => {
    sonumluSinus(x, t0, f, 0.14, 1);
    sonumluSinus(x, t0, f * 3, 0.06, 0.12);
    sonumluSinus(x, t0, f * 2, 0.08, 0.1);
  };
  nota(0.0, 440);
  nota(0.17, 349.2);
  return normallestir(sonaKadarSus(yanki(x, 0.12, 0.3), 0.15), 0.75);
}

/** Sınav anonsu: iki tonlu "ding-dong" */
function duyuru() {
  const x = bos(1.4);
  const kismiler = [[1, 1, 1], [2, 0.18, 0.5], [3.98, 0.08, 0.25]];
  can(x, 0.0, 659.25, 0.9, 0.85, kismiler);
  can(x, 0.42, 523.25, 1.0, 0.85, kismiler);
  return normallestir(sonaKadarSus(yanki(x, 0.22, 0.6), 0.3), 0.8);
}

mkdirSync(KLASOR, { recursive: true });
for (const [ad, uret] of Object.entries({ sinyal, geri, lastik, vites, carpma, basari, hata, duyuru })) {
  wavYaz(ad, uret());
}
