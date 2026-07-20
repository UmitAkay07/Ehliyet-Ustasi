const fs = require("fs");
const svg = fs
  .readFileSync("assets/isaretler/is-32.svg", "utf8")
  .replace(/\r?\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const out = `/** Local Wikimedia SVG fallbacks (CC BY-SA). */
export const ISARET_SVG: Record<string, string> = {
  "is-32": ${JSON.stringify(svg)},
};
export const ISARET_SVG_ATTRIBUTION = "Wikimedia Commons CC BY-SA";
`;
fs.writeFileSync("src/data/isaretSvgMap.ts", out);
console.log("ok", svg.length);
