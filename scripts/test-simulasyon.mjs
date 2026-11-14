// Simülasyon görsel ve sürüş verisi testleri.  Çalıştır: npm run test:simulasyon
import test from "node:test";
import assert from "node:assert/strict";
import { MAX_TEKER_DERECE, ilkGorunurKare, rotaNoktalari, surusVerisi } from "../src/animations/manevraVerisi.ts";
import { MANEVRALAR } from "../src/animations/keyframes.ts";
import { aracSvg, isikSvg, manevraZeminSvg, tekerSvg } from "../src/animations/simGorsel.ts";

const gecersizSayi = /NaN|Infinity|undefined/;

test("düz ileri gidişte geri vites yok, tekerlek düz", () => {
  const v = surusVerisi([0, 1, 2, 3].map((i) => ({ x: 0, y: -i * 5, a: 0 })));
  assert.deepEqual(v.geri, [0, 0, 0, 0]);
  for (const t of v.teker) assert.ok(Math.abs(t) < 1e-9);
  assert.ok(v.hiz[0] > 0.5);
});

test("burun yukarıyken aşağı gidiş geri vitestir; dururken son durum korunur", () => {
  const kareler = [
    { x: 0, y: 0, a: 0 },
    { x: 0, y: 5, a: 0 },
    { x: 0, y: 10, a: 0 },
    { x: 0, y: 10, a: 0 },
    { x: 0, y: 10, a: 0 },
  ];
  assert.deepEqual(surusVerisi(kareler).geri, [1, 1, 1, 1, 1]);
});

test("ileri sağa dönüşte tekerlek sağa, geri giderken aynı dönüş için tekerlek ters", () => {
  const ileri = [0, 1, 2, 3, 4].map((i) => ({ x: i, y: -i * 4, a: i * 6 }));
  const v = surusVerisi(ileri);
  assert.ok(v.teker[2] > 0);
  const geri = [0, 1, 2, 3, 4].map((i) => ({ x: -i, y: i * 4, a: i * 6 }));
  const g = surusVerisi(geri);
  assert.equal(g.geri[2], 1);
  assert.ok(g.teker[2] < 0);
});

test("tekerlek açısı sınırlı, hız 0..1", () => {
  const keskin = [0, 1, 2].map((i) => ({ x: i * 0.2, y: 0, a: i * 90 }));
  const v = surusVerisi(keskin);
  for (const t of v.teker) assert.ok(Math.abs(t) <= MAX_TEKER_DERECE);
  for (const h of v.hiz) assert.ok(h >= 0 && h <= 1);
});

test("tüm manevralar için sürüş verisi geçerli ve geri manevralar geri vites içeriyor", () => {
  for (const [ad, m] of Object.entries(MANEVRALAR)) {
    const v = surusVerisi(m.keyframes);
    assert.equal(v.geri.length, m.keyframes.length, ad);
    for (const d of [...v.teker, ...v.hiz]) assert.ok(Number.isFinite(d), ad);
    const geriVar = v.geri.some((g) => g === 1);
    assert.equal(geriVar, ["paralelPark", "lPark", "geriManevra", "rampaKalkis"].includes(ad), ad);
  }
});

test("paralel parkta direksiyon iki yöne de kırılıyor (S manevrası)", () => {
  const v = surusVerisi(MANEVRALAR.paralelPark.keyframes);
  assert.ok(Math.max(...v.teker) > 8);
  assert.ok(Math.min(...v.teker) < -8);
});

test("kapak karesi: araba sahnede tamamen görünür", () => {
  for (const [ad, m] of Object.entries(MANEVRALAR)) {
    const k = m.keyframes[ilkGorunurKare(m.keyframes, 300, 220)];
    assert.ok(k.x >= 14 && k.x <= 286 && k.y >= 25 && k.y <= 195, ad);
  }
  assert.equal(ilkGorunurKare([{ x: -50, y: -50, a: 0 }], 300, 220), 0);
});

test("rota yinelenen noktaları atar ve sahneye kırpar", () => {
  const r = rotaNoktalari([{ x: 10, y: 300, a: 0 }, { x: 10, y: 300, a: 0 }, { x: 10, y: 100, a: 0 }], 300, 220);
  assert.deepEqual(r, [[10, 224], [10, 100]]);
});

test("çizimler geçerli SVG üretir", () => {
  for (const tip of Object.keys(MANEVRALAR)) {
    const svg = manevraZeminSvg(tip, [[0, 0], [10, 10]]);
    assert.ok(svg.startsWith("<svg"), tip);
    assert.ok(!gecersizSayi.test(svg), tip);
  }
  for (const s of [aracSvg("turuncu"), aracSvg("gumus"), tekerSvg(), isikSvg("fren"), isikSvg("sinyalSol"), isikSvg("sinyalSag"), isikSvg("geri")]) {
    assert.ok(!gecersizSayi.test(s));
  }
});
