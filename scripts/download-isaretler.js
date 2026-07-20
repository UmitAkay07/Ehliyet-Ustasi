/**
 * 1) API ile tüm URL'leri bir kerede çöz
 * 2) SVG'leri uzun aralıklarla indir
 * 3) isaretSvgMap.ts üret
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT = path.join(__dirname, "..", "assets", "isaretler");
const INDEX = path.join(OUT, "_commons_index.json");
const URLS_CACHE = path.join(OUT, "_urls.json");

const MAP = {
  "is-01": "Turkey road sign T-1b.svg",
  "is-31": "Turkey road sign T-1a.svg",
  "is-32": "Turkey road sign T-2a.svg",
  "is-02": "Turkey road sign T-7.svg",
  "is-03": "Turkey road sign T-8.svg",
  "is-04": "Turkey road sign T-12.svg",
  "is-05": "Turkey road sign T-11.svg",
  "is-06": "Turkey road sign T-14a.svg",
  "is-07": "Turkey road sign T-24.svg",
  "is-33": "Turkey road sign T-4a.svg",
  "is-34": "Turkey road sign T-19.svg",
  "is-35": "Turkey road sign T-12.svg",
  "is-36": "Turkey road sign T-13.svg",
  "is-37": "Turkey road sign T-26.svg",
  "is-08": "Turkey road sign TT-1.svg",
  "is-15": "Turkey road sign TT-2.svg",
  "is-16": "Turkey road sign TT-3.svg",
  "is-09": "Turkey road sign TT-5.svg",
  "is-10": "Turkey road sign TT-20.svg",
  "is-11": "Turkey road sign TT-21.svg",
  "is-12": "Turkey road sign TT-22.svg",
  "is-13": "Turkey road sign TT-23.svg",
  "is-14": "Turkey road sign TT-29-50.svg",
  "is-38": "Turkey road sign TT-33-50.svg",
  "is-39": "Turkey road sign TT-33b.svg",
  "is-48": "Turkey road sign TT-25.svg",
  "is-17": "Turkey road sign TT-36a.svg",
  "is-18": "Turkey road sign TT-36b.svg",
  "is-40": "Turkey road sign TT-36c.svg",
  "is-19": "Turkey road sign TT-37.svg",
  "is-20": "Turkey road sign TT-41a-30.svg",
  "is-41": "TR road sign TT-35a.svg",
  "is-21": "Turkey road sign B-14a.svg",
  "is-22": "Turkey road sign B-8a.svg",
  "is-23": "Turkey road sign B-8b.svg",
  "is-24": "Turkey road sign B-12a.svg",
  "is-25": "Turkey road sign B-1a 01.svg",
  "is-42": "Turkey road sign B-2a.svg",
  "is-43": "Turkey road sign B-9.svg",
  "is-44": "Turkey road sign B-20.svg",
  "is-45": "Turkey road sign B-21.svg",
  "is-46": "Turkey road sign B-14c.svg",
  "is-47": "Turkey road sign B-15.svg",
  "is-26": "Turkey road sign P-1.svg",
  "is-27": "Turkey road sign P-2.svg",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "EhliyetUstasi/1.0 (edu offline; commons reuse)" } }, (res) => {
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

async function resolveAllUrls() {
  if (fs.existsSync(URLS_CACHE)) {
    return JSON.parse(fs.readFileSync(URLS_CACHE, "utf8"));
  }
  const index = JSON.parse(fs.readFileSync(INDEX, "utf8"));
  const allFiles = new Set(Object.values(index).flat());
  const urls = {};

  // Batch titles in groups of 40 (API allows multiple)
  const entries = Object.entries(MAP).filter(([, f]) => allFiles.has(f));
  for (let i = 0; i < entries.length; i += 20) {
    const batch = entries.slice(i, i + 20);
    const titles = batch.map(([, f]) => `File:${f}`).join("|");
    const api =
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}` +
      `&prop=imageinfo&iiprop=url&format=json`;
    let attempt = 0;
    for (;;) {
      const { status, body } = await get(api);
      const text = body.toString("utf8");
      if (status === 429 || text.startsWith("You are making")) {
        attempt++;
        console.log("API rate limit, sleep", 10 * attempt, "s");
        await sleep(10000 * attempt);
        continue;
      }
      const j = JSON.parse(text);
      const pages = Object.values(j.query.pages);
      for (const page of pages) {
        const title = (page.title || "").replace(/^File:/, "");
        const url = page.imageinfo?.[0]?.url;
        const id = batch.find(([, f]) => f === title)?.[0];
        if (id && url) urls[id] = url;
        else if (!page.missing) {
          // title normalization
          for (const [bid, bf] of batch) {
            if (page.title && page.title.includes(bf.replace(".svg", ""))) {
              if (url) urls[bid] = url;
            }
          }
        }
      }
      // Match by normalized titles from query.normalized
      const norm = j.query.normalized || [];
      // Also map via pages titles back to MAP
      for (const [id, file] of batch) {
        if (urls[id]) continue;
        const page = pages.find((p) => p.title === `File:${file}` || (p.title || "").endsWith(file));
        if (page?.imageinfo?.[0]?.url) urls[id] = page.imageinfo[0].url;
      }
      break;
    }
    console.log("Resolved batch", i / 20 + 1, "total urls", Object.keys(urls).length);
    await sleep(3000);
  }

  // Fallback: resolve missing one-by-one with Special:FilePath is not in urls
  for (const [id, file] of entries) {
    if (urls[id]) continue;
    console.log("Resolve single", id);
    await sleep(5000);
    const api =
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent("File:" + file)}` +
      `&prop=imageinfo&iiprop=url&format=json`;
    const { body } = await get(api);
    try {
      const j = JSON.parse(body.toString("utf8"));
      const page = Object.values(j.query.pages)[0];
      if (page.imageinfo?.[0]?.url) urls[id] = page.imageinfo[0].url;
    } catch {
      /* ignore */
    }
  }

  fs.writeFileSync(URLS_CACHE, JSON.stringify(urls, null, 2));
  return urls;
}

async function downloadFile(id, url) {
  const dest = path.join(OUT, `${id}.svg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 100) {
    console.log("SKIP", id);
    return true;
  }
  for (let a = 0; a < 6; a++) {
    const { status, body } = await get(url);
    if (status === 429) {
      console.log("429", id, "wait", 15 * (a + 1), "s");
      await sleep(15000 * (a + 1));
      continue;
    }
    if (status === 200 && body.length > 80 && body.toString("utf8", 0, 40).includes("svg")) {
      fs.writeFileSync(dest, body);
      console.log("OK", id, body.length);
      return true;
    }
    // sometimes svg without xml declaration check
    if (status === 200 && body.length > 80 && body.includes("<svg")) {
      fs.writeFileSync(dest, body);
      console.log("OK", id, body.length);
      return true;
    }
    console.log("FAIL", id, status, body.length);
    await sleep(5000);
  }
  return false;
}

async function buildTs(okIds) {
  const lines = [
    "/** Auto-generated from Wikimedia Commons (CC BY-SA). */",
    "export const ISARET_SVG: Record<string, string> = {",
  ];
  for (const id of okIds.sort()) {
    const svg = fs.readFileSync(path.join(OUT, `${id}.svg`), "utf8").replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(svg)},`);
  }
  lines.push("};");
  lines.push("");
  lines.push(
    'export const ISARET_SVG_ATTRIBUTION = "Levha görselleri: Wikimedia Commons (CC BY-SA) — Turkey road signs.";'
  );
  fs.writeFileSync(path.join(__dirname, "..", "src", "data", "isaretSvgMap.ts"), lines.join("\n"));
  console.log("Wrote isaretSvgMap.ts", okIds.length);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  console.log("Resolving URLs…");
  const urls = await resolveAllUrls();
  console.log("URLs:", Object.keys(urls).length);

  const ok = [];
  for (const [id, url] of Object.entries(urls)) {
    const fine = await downloadFile(id, url);
    if (fine) ok.push(id);
    await sleep(8000); // upload.wikimedia.org nazik
  }
  // include previously downloaded
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith(".svg")) {
      const id = f.replace(".svg", "");
      if (!ok.includes(id)) ok.push(id);
    }
  }
  await buildTs(ok);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
