/**
 * scripts/direksiyon-video-spec.json → üretim promptları (Markdown)
 * Çalıştır: node scripts/export-direksiyon-video-prompts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(
  fs.readFileSync(path.join(__dirname, "direksiyon-video-spec.json"), "utf8")
);
const out = path.join(__dirname, "..", "assets", "videos", "direksiyon", "URETIM-PROMPTLARI.md");

const lines = [
  "# Direksiyon Dersi — AI Video Üretim Promptları",
  "",
  `MEB direksiyon sınav müfredatına uygun. ${spec.dersler.length} ders.`,
  "",
  "## Genel kurallar",
  "",
  `- **Kamera:** ${spec.meta.camera}`,
  `- **Araç:** ${spec.meta.vehicle}`,
  `- **Format:** ${spec.meta.format}`,
  `- **Kaçınılacak:** ${spec.meta.negative}`,
  "",
  "---",
  "",
];

for (const d of spec.dersler) {
  lines.push(`## ${d.baslik}`, "");
  lines.push(`- **ID:** \`${d.id}\``);
  lines.push(`- **Dosya:** \`${d.dosya}\``);
  lines.push(`- **Süre:** ~${d.sureSn} sn`);
  lines.push(`- **Sahne:** ${d.sahne}`);
  lines.push("");
  lines.push("### Adımlar (videoda sırayla gösterilmeli)");
  d.adimlar.forEach((a, i) => lines.push(`${i + 1}. ${a}`));
  lines.push("");
  lines.push("### Sınav kontrol listesi");
  d.kritikKontrol.forEach((k) => lines.push(`- [ ] ${k}`));
  lines.push("");
  lines.push("### AI Prompt (İngilizce — Runway / Kling / Pika)");
  lines.push("```");
  lines.push(d.prompt);
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
}

fs.writeFileSync(out, lines.join("\n"));
console.log("Yazıldı:", out);
