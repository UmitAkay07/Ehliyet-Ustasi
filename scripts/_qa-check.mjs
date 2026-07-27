import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "src", "data", "sorular");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));

const konuIds = new Set([
  "trafik-kavramlar",
  "trafik-isaretleri",
  "yer-isaretlemeleri",
  "isikli-isaretler",
  "gecis-ustunlugu",
  "hiz-kurallari",
  "sollama",
  "duraklama-park",
  "yaya-gecit",
  "aydinlatma-sinyal",
  "cevre-guvenlik",
  "belgeler-cezalar",
  "mt-motor-calisma",
  "mt-yaglama-sogutma",
  "mt-yakit-atesleme",
  "mt-aktarma",
  "mt-fren",
  "mt-elektrik-aku",
  "mt-lastik-bakim",
  "mt-gosterge-guvenlik",
  "iy-temel-kavramlar",
  "iy-olay-yeri",
  "iy-tyd",
  "iy-tikanma",
  "iy-kanama-sok",
  "iy-kirik-yanik",
  "iy-bilinc-tasima",
  "ad-temel-degerler",
  "ad-ofke-stres",
  "ad-takip-mesafesi",
  "ad-alkol-yorgunluk",
  "ad-kaza-davranis",
]);

const ids = [];
const issues = [];
let total = 0;
const byFile = {};

for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), "utf8");
  // Match object-ish question blocks loosely
  const idMatches = [...c.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]);
  const konuMatches = [...c.matchAll(/konuId:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dogruMatches = [...c.matchAll(/dogruIndex:\s*(\d+)/g)].map((m) => +m[1]);
  const secenekBlocks = [...c.matchAll(/secenekler:\s*\[([^\]]*)\]/gs)].map((m) => {
    const opts = [...m[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((x) => x[1]);
    return opts;
  });

  byFile[f] = {
    ids: idMatches.length,
    konular: konuMatches.length,
    dogru: dogruMatches.length,
    secenek: secenekBlocks.length,
  };

  const n = Math.min(idMatches.length, dogruMatches.length, secenekBlocks.length, konuMatches.length);
  // Prefer pairing by order when counts match
  const count = Math.min(idMatches.length, dogruMatches.length, secenekBlocks.length);
  total += count;

  for (let i = 0; i < count; i++) {
    const id = idMatches[i];
    ids.push(id);
    const opts = secenekBlocks[i];
    const di = dogruMatches[i];
    if (di < 0 || di >= opts.length) {
      issues.push({ type: "OOR", id, di, opts: opts.length, file: f });
    }
    if (konuMatches[i] && !konuIds.has(konuMatches[i])) {
      issues.push({ type: "BAD_KONU", id, konu: konuMatches[i], file: f });
    }
  }

  // orphan konular beyond pair count
  for (let i = count; i < konuMatches.length; i++) {
    if (!konuIds.has(konuMatches[i])) {
      issues.push({ type: "BAD_KONU_ORPHAN", konu: konuMatches[i], file: f });
    }
  }
}

const seen = new Map();
const dups = [];
for (const id of ids) {
  seen.set(id, (seen.get(id) || 0) + 1);
}
for (const [id, n] of seen) {
  if (n > 1) dups.push({ id, n });
}

// also count-questions style
const counts = {};
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), "utf8");
  const matches = content.match(/konuId:\s*["']([^"']+)["']/g) || [];
  matches.forEach((m) => {
    const id = m.match(/["']([^"']+)["']/)[1];
    counts[id] = (counts[id] || 0) + 1;
  });
}
const unknown = Object.keys(counts).filter((k) => !konuIds.has(k));

console.log(JSON.stringify({ total, byFile, dups, issues, unknownKonuIds: unknown, konuCounts: counts }, null, 2));
