/**
 * Commons indeksinden tam levha kataloğu üretir.
 * Sıralama: sınav önceliği (exam-priority.js) → kalanlar KGM kod sırası.
 */
const fs = require("fs");
const path = require("path");
const EXAM_PRIORITY = require("./exam-priority");
const {
  LEGACY_IDS,
  SYNTHETIC_LIGHTS,
  SYNTHETIC_OTHER,
  extractCode,
  kategoriFromCode,
  labelFor,
  toId,
} = require("./kgm-labels");

const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "assets", "isaretler", "_commons_index.json");
const OUT_TS = path.join(ROOT, "src", "data", "isaretler.ts");
const OUT_MAP = path.join(ROOT, "assets", "isaretler", "kgm-map.json");

const SKIP_FILES = new Set([
  "HGS levha.svg",
  "KavşakİsimLevhası1.svg",
  "KavşakİsimLevhası2.svg",
  "Kural levha.svg",
  "TelefonLevha.svg",
  "Turkey road sign TT-2 (old).svg",
]);

function isSkip(file) {
  if (SKIP_FILES.has(file)) return true;
  if (file.startsWith("1952 TR road sign")) return true;
  return false;
}

function collectFiles() {
  const index = JSON.parse(fs.readFileSync(INDEX, "utf8"));
  const byCode = new Map();

  for (const files of Object.values(index)) {
    for (const file of files) {
      if (isSkip(file)) continue;
      const code = extractCode(file);
      if (!code) continue;
      if (!byCode.has(code)) byCode.set(code, file);
      else if (file.startsWith("Turkey road sign") && !byCode.get(code).startsWith("Turkey")) {
        byCode.set(code, file);
      }
    }
  }
  return byCode;
}

function priorityIndex(code) {
  const idx = EXAM_PRIORITY.indexOf(code);
  return idx === -1 ? 10000 + code.charCodeAt(0) * 100 : idx;
}

function buildCatalog(byCode) {
  const legacyByCode = new Map(Object.entries(LEGACY_IDS).map(([id, code]) => [code, id]));
  const usedIds = new Set();
  const catalog = [];
  const kgmMap = { _kaynak: "KGM / Wikimedia Commons — scripts/build-full-isaret-catalog.js" };

  const codes = [...byCode.keys()].sort((a, b) => {
    const pa = priorityIndex(a);
    const pb = priorityIndex(b);
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  for (const code of codes) {
    const file = byCode.get(code);
    const [ad, anlam] = labelFor(code);
    const kategori = kategoriFromCode(code);
    const id = legacyByCode.get(code) ?? toId(code);
    if (usedIds.has(id)) continue;
    usedIds.add(id);

    catalog.push({ id, ad, kategori, anlam, kgm: code, file });
    kgmMap[id] = { kgm: code, file };
  }

  // Işıklı işaretler — sınavda çok çıkar, park yasaklarından hemen sonra
  const parkIdx = catalog.findIndex((s) => s.kgm === "P-3h" || s.kgm === "P-3a");
  const insertAt = parkIdx >= 0 ? parkIdx + 1 : catalog.findIndex((s) => s.kgm?.startsWith("TT-26"));
  const lights = SYNTHETIC_LIGHTS.map((s) => ({
    id: s.id,
    ad: s.ad,
    kategori: "isikDurum",
    anlam: s.anlam,
    kgm: null,
    file: null,
  }));
  catalog.splice(insertAt > 0 ? insertAt : 20, 0, ...lights);
  for (const s of lights) usedIds.add(s.id);

  // Engelli park (görsel yok)
  for (const s of SYNTHETIC_OTHER) {
    if (!usedIds.has(s.id)) {
      catalog.push({ id: s.id, ad: s.ad, kategori: s.kategori, anlam: s.anlam, kgm: null, file: null });
      usedIds.add(s.id);
    }
  }

  return { catalog, kgmMap };
}

function esc(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function writeTs(catalog) {
  const lines = [
    `import type { IsaretKategori, TrafikIsareti } from "@/types";`,
    ``,
    `export const ISARET_KATEGORILERI: { id: IsaretKategori; ad: string; renk: string }[] = [`,
    `  { id: "tehlike", ad: "Tehlike Uyarı", renk: "#F59E0B" },`,
    `  { id: "yasak", ad: "Yasaklama / Öncelik", renk: "#EF4444" },`,
    `  { id: "mecburiyet", ad: "Mecburiyet", renk: "#3B82F6" },`,
    `  { id: "bilgi", ad: "Bilgi", renk: "#10B981" },`,
    `  { id: "durakPark", ad: "Durma-Park", renk: "#8B5CF6" },`,
    `  { id: "isikDurum", ad: "Işıklı İşaret", renk: "#0EA5E9" },`,
    `];`,
    ``,
    `/** Otomatik üretildi: ${catalog.length} levha — sınav önceliğine göre sıralı */`,
    `export const TRAFIK_ISARETLERI: TrafikIsareti[] = [`,
  ];

  for (const s of catalog) {
    lines.push(`  {`);
    lines.push(`    id: "${esc(s.id)}",`);
    lines.push(`    ad: "${esc(s.ad)}",`);
    lines.push(`    kategori: "${s.kategori}",`);
    lines.push(`    anlam: "${esc(s.anlam)}",`);
    lines.push(`  },`);
  }

  lines.push(`];`, ``);
  lines.push(`export function isaretlerByKategori(kategori: IsaretKategori): TrafikIsareti[] {`);
  lines.push(`  return TRAFIK_ISARETLERI.filter((i) => i.kategori === kategori);`);
  lines.push(`}`, ``);
  lines.push(`export function isaretBul(id: string): TrafikIsareti | undefined {`);
  lines.push(`  return TRAFIK_ISARETLERI.find((i) => i.id === id);`);
  lines.push(`}`, ``);

  fs.writeFileSync(OUT_TS, lines.join("\n"));
}

function main() {
  const byCode = collectFiles();
  const { catalog, kgmMap } = buildCatalog(byCode);
  writeTs(catalog);
  fs.writeFileSync(OUT_MAP, JSON.stringify(kgmMap, null, 2));

  const kat = {};
  for (const s of catalog) kat[s.kategori] = (kat[s.kategori] || 0) + 1;
  console.log("Toplam:", catalog.length);
  console.log("Kategori:", kat);
  console.log("Yazıldı:", OUT_TS);
}

main();
