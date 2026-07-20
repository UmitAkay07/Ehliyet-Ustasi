const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "EhliyetUstasiBot/1.0 (edu)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

async function desc(file) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=extmetadata&format=json`;
  const j = JSON.parse(await get(url));
  const page = Object.values(j.query.pages)[0];
  const meta = page.imageinfo?.[0]?.extmetadata || {};
  const d = (meta.ImageDescription?.value || meta.ObjectName?.value || "").replace(/<[^>]+>/g, " ").slice(0, 120);
  console.log(file, "=>", d || "(no desc)");
}

(async () => {
  const files = [
    "Turkey road sign TT-1.svg",
    "Turkey road sign TT-2.svg",
    "Turkey road sign TT-3.svg",
    "Turkey road sign TT-4.svg",
    "Turkey road sign TT-5.svg",
    "Turkey road sign TT-19.svg",
    "Turkey road sign TT-20.svg",
    "Turkey road sign TT-21.svg",
    "Turkey road sign TT-22.svg",
    "Turkey road sign TT-23.svg",
    "Turkey road sign TT-24.svg",
    "Turkey road sign TT-25.svg",
    "Turkey road sign TT-26a.svg",
    "Turkey road sign TT-27.svg",
    "Turkey road sign TT-28.svg",
    "Turkey road sign TT-29-50.svg",
    "Turkey road sign TT-30.svg",
    "Turkey road sign TT-31.svg",
    "Turkey road sign TT-32.svg",
    "Turkey road sign TT-33b.svg",
    "Turkey road sign TT-34a.svg",
    "Turkey road sign TT-36a.svg",
    "Turkey road sign TT-41a-30.svg",
    "Turkey road sign P-1.svg",
    "Turkey road sign P-2.svg",
    "Turkey road sign B-12a.svg",
    "Turkey road sign B-14a.svg",
    "Turkey road sign B-8a.svg",
    "Turkey road sign B-8b.svg",
    "Turkey road sign B-9.svg",
    "Turkey road sign B-15.svg",
    "Turkey road sign B-20.svg",
    "Turkey road sign B-2a.svg",
    "Turkey road sign B-1a 01.svg",
    "TR road sign TT-35a.svg",
  ];
  for (const f of files) {
    await desc(f);
    await new Promise((r) => setTimeout(r, 400));
  }
})();
