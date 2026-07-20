import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "sorular");
const ids = [];
for (const f of readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  const t = readFileSync(join(dir, f), "utf8");
  for (const m of t.matchAll(/id:\s*["']([^"']+)["']/g)) {
    ids.push({ id: m[1], file: f });
  }
}
const counts = new Map();
for (const { id, file } of ids) {
  if (!counts.has(id)) counts.set(id, []);
  counts.get(id).push(file);
}
const dups = [...counts.entries()].filter(([, files]) => files.length > 1);
console.log(`Toplam: ${ids.length}, Benzersiz: ${counts.size}, Tekrar: ${dups.length}`);
for (const [id, files] of dups.slice(0, 30)) {
  console.log(`  ${id}: ${files.join(", ")}`);
}
