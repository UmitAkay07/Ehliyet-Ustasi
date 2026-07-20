const https = require("https");
const fs = require("fs");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "EhliyetUstasiBot/1.0 (educational app; contact local)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
      })
      .on("error", reject);
  });
}

async function listCategory(cmtitle) {
  let cont = "";
  const titles = [];
  for (;;) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(cmtitle)}` +
      `&cmtype=file&cmlimit=500&format=json` +
      (cont ? `&cmcontinue=${encodeURIComponent(cont)}` : "");
    const { body, status } = await get(url);
    if (status !== 200) throw new Error(`${cmtitle} ${status}`);
    const j = JSON.parse(body.toString("utf8"));
    for (const m of j.query?.categorymembers || []) titles.push(m.title.replace(/^File:/, ""));
    cont = j.continue?.cmcontinue;
    if (!cont) break;
    await new Promise((r) => setTimeout(r, 800));
  }
  return titles;
}

async function main() {
  const cats = [
    "Category:SVG warning road signs of Turkey",
    "Category:SVG prohibitory road signs of Turkey",
    "Category:SVG mandatory road signs of Turkey",
    "Category:SVG priority road signs of Turkey",
    "Category:SVG information road signs of Turkey",
    "Category:SVG parking road signs of Turkey",
  ];
  const all = {};
  for (const c of cats) {
    console.log("Listing", c);
    try {
      all[c] = await listCategory(c);
      console.log(" ", all[c].length, "files");
    } catch (e) {
      console.log(" ", e.message);
      all[c] = [];
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  const out = path.join(__dirname, "..", "assets", "isaretler", "_commons_index.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(all, null, 2));
  const flat = Object.values(all).flat().sort();
  console.log("\nSample:", flat.slice(0, 40).join("\n"));
  console.log("Total unique:", new Set(flat).size);
}

main();
