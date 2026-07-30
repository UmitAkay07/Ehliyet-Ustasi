/**
 * Trafik levhası görselli soru havuzu üretir.
 * Çalıştır: node scripts/generate-isaret-sorulari.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ISARETLER = path.join(ROOT, "src", "data", "isaretler.ts");
const IMAGE_MAP = path.join(ROOT, "src", "data", "isaretImageMap.ts");
const OUT = path.join(ROOT, "src", "data", "sorular", "isaret-sorulari.ts");

/** Aynı anlama gelen tekrar levhalardan yalnızca birini soruya dahil et */
const SKIP_IDS = new Set([
  "kgm-p-3b", "kgm-p-3c", "kgm-p-3d", "kgm-p-3e",
  "kgm-tt-29-140", "kgm-tt-33-30", "kgm-tt-33-40", "kgm-tt-33-60",
  "kgm-tt-33-70", "kgm-tt-33-80", "kgm-tt-33-90",
]);

/** Elle yazılmış sınav kalitesi sorular (öncelikli levha id) */
const OZEL = {
  "is-08": {
    metin: "Görseldeki levhanın anlamı nedir?",
    secenekler: ["Dur", "Yol ver", "Giriş yasak", "Park yeri"],
    dogruIndex: 1,
    aciklama: "Ters üçgen kırmızı kenarlı levha 'Yol ver' işaretidir; ana yoldaki araçlara geçiş hakkı verilir.",
    konuId: "gecis-ustunlugu",
  },
  "is-15": {
    metin: "Görseldeki levha sürücüye ne emreder?",
    secenekler: ["Yavaşla ve devam et", "Tam dur, yol ver, sonra geç", "Sadece yayalara yol ver", "Park et"],
    dogruIndex: 1,
    aciklama: "Sekizgen DUR levhasında tam durulur; güvenli ise geçilir.",
    konuId: "gecis-ustunlugu",
  },
  "is-16": {
    metin: "Bu levha ne anlama gelir?",
    secenekler: ["Park serbest", "Bu yönden giriş yasak", "Tek yön zorunlu", "Yaya geçidi"],
    dogruIndex: 1,
    aciklama: "Kırmızı daire içinde yatay beyaz şerit: girişi olmayan yol.",
    konuId: "trafik-isaretleri",
  },
  "is-13": {
    metin: "Görseldeki işaret bulunduğu yolda ne yasaklar?",
    secenekler: ["Duraklamayı", "Öndeki taşıtı geçmeyi (sollamayı)", "Sola dönmeyi", "Korna kullanmayı"],
    dogruIndex: 1,
    aciklama: "İki araba sembollü yasak levhası sollama yasağını bildirir.",
    konuId: "sollama",
  },
  "is-26": {
    metin: "Bu levhanın bulunduğu yerde hangisi yasaktır?",
    secenekler: ["Sadece park", "Duraklama ve park", "Sadece sollama", "U dönüşü"],
    dogruIndex: 1,
    aciklama: "Mavi zemin, kırmızı çarpı (X): hem duraklama hem park yasaktır.",
    konuId: "duraklama-park",
  },
  "is-27": {
    metin: "Görseldeki levha yalnızca neyi yasaklar?",
    secenekler: ["Sollamayı", "Park etmeyi", "Durmayı", "U dönüşünü"],
    dogruIndex: 1,
    aciklama: "Tek çapraz çizgi: park yasaktır; kısa duraklama trafik düzenine engel değilse mümkün olabilir.",
    konuId: "duraklama-park",
  },
  "is-28": {
    metin: "Görseldeki trafik ışığı yanarken sürücü ne yapmalıdır?",
    secenekler: ["Hızlanarak geçmeli", "Dur çizgisinde tam durmalı", "Korna çalıp geçmeli", "Yavaşlayıp geçmeli"],
    dogruIndex: 1,
    aciklama: "Kırmızı ışık 'dur' anlamındadır.",
    konuId: "isikli-isaretler",
  },
  "is-29": {
    metin: "Sarı ışık yanıyorsa doğru davranış hangisidir?",
    secenekler: ["Hızlanıp geçmek", "Güvenle durmak; yeni yola çıkmamak", "Selektör yapmak", "Geri gitmek"],
    dogruIndex: 1,
    aciklama: "Sarı ışık kırmızıya geçileceğini bildirir; güvenle durulur.",
    konuId: "isikli-isaretler",
  },
  "is-30": {
    metin: "Yeşil ışık yanıyorsa ne yapılabilir?",
    secenekler: ["Kontrol etmeden hızlanmak", "Kavşak güvenliyse geçmek", "Durup beklemek", "Geri manevra yapmak"],
    dogruIndex: 1,
    aciklama: "Yeşil ışık geç anlamındadır; yine de kavşak güvenliği kontrol edilir.",
    konuId: "isikli-isaretler",
  },
  "is-50": {
    metin: "Yanıp sönen kırmızı ışıkta nasıl davranılır?",
    secenekler: ["Durmadan geçilir", "DUR levhası gibi: dur, yol ver, güvenliyse geç", "Sadece gece geçer", "Hızlanılır"],
    dogruIndex: 1,
    aciklama: "Yanıp sönen kırmızı, DUR levhası ile aynı anlamdadır.",
    konuId: "isikli-isaretler",
  },
  "is-05": {
    metin: "Görseldeki uyarı levhası sürücüyü neye karşı uyarır?",
    secenekler: ["Kaygan yola", "Yaya geçidine", "Demiryoluna", "Okula"],
    dogruIndex: 1,
    aciklama: "T-11 yaya geçidi tehlike uyarı levhasıdır.",
    konuId: "yaya-gecit",
  },
  "is-04": {
    metin: "Bu levha görüldüğünde sürücü ne yapmalıdır?",
    secenekler: ["Hızlanmalı", "Hızı düşürüp çocuklara dikkat etmeli", "Sollama yapmalı", "Korna çalmalı"],
    dogruIndex: 1,
    aciklama: "Okul geçidi levhasında hız düşürülür; çocuklara öncelik verilir.",
    konuId: "yaya-gecit",
  },
  "is-17": {
    metin: "Mavi yuvarlak levha sürücüye ne söyler?",
    secenekler: ["Sola dön", "Yalnızca ileri git", "Park et", "Dur"],
    dogruIndex: 1,
    aciklama: "Mavi daire içinde beyaz ok: mecburi yön (ileri).",
    konuId: "trafik-isaretleri",
  },
  "is-19": {
    metin: "Görseldeki mavi levha ne emreder?",
    secenekler: ["Düz git", "Ada etrafında belirtilen yönde dön", "Park et", "Dur"],
    dogruIndex: 1,
    aciklama: "Dönel kavşakta ada etrafında dönme zorunluluğu bildirir.",
    konuId: "gecis-ustunlugu",
  },
  "is-44": {
    metin: "Bu bilgi levhası neyi bildirir?",
    secenekler: ["Otoyol başlangıcı", "Yerleşim yerine girildiği", "Hastane yakını", "Park alanı"],
    dogruIndex: 1,
    aciklama: "B-9 meskun mahal (yerleşim yeri) başlangıç levhasıdır; yerleşim içi hız kuralları geçerlidir.",
    konuId: "hiz-kurallari",
  },
  "is-45": {
    metin: "Bu levha ne anlama gelir?",
    secenekler: ["Yerleşim başlangıcı", "Yerleşim yeri sonu", "Otoyol sonu", "Dur"],
    dogruIndex: 1,
    aciklama: "Yerleşim yeri sonu levhası; şehir dışı hız kuralları geçerli olur.",
    konuId: "hiz-kurallari",
  },
  "is-25": {
    metin: "Otoyol başlangıç levhası görüldüğünde hangisi doğrudur?",
    secenekler: ["50 km/s hız sınırı", "Otoyol kuralları ve hız sınırları geçerlidir", "U dönüşü serbesttir", "Yaya geçidi zorunludur"],
    dogruIndex: 1,
    aciklama: "Otoyola girildiğinde otoyol hız ve şerit kuralları uygulanır.",
    konuId: "hiz-kurallari",
  },
};

const KONU_BY_KAT = {
  tehlike: "trafik-isaretleri",
  yasak: "trafik-isaretleri",
  mecburiyet: "trafik-isaretleri",
  bilgi: "trafik-isaretleri",
  durakPark: "duraklama-park",
  isikDurum: "isikli-isaretler",
};

function parseSigns() {
  const src = fs.readFileSync(ISARETLER, "utf8");
  const signs = [];
  const re = /id:\s*"([^"]+)"[\s\S]*?ad:\s*"([^"]+)"[\s\S]*?kategori:\s*"([^"]+)"[\s\S]*?anlam:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    const ad = m[2];
    const anlam = m[4];
    // Jenerik levhaları testlerden ve şıklardan tamamen çıkar
    if (/\([BTP]+-/.test(ad) || anlam.includes("kodlu trafik")) {
      continue;
    }
    signs.push({ id: m[1], ad: m[2], kategori: m[3], anlam: m[4] });
  }
  return signs;
}

function parseImageIds() {
  const src = fs.readFileSync(IMAGE_MAP, "utf8");
  const ids = new Set();
  const re = /"([^"]+)":\s*require/g;
  let m;
  while ((m = re.exec(src))) ids.add(m[1]);
  return ids;
}

function karistir(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function yanlisSecenekler(sign, all, count = 3) {
  const pool = all.filter(
    (s) => s.id !== sign.id && s.kategori === sign.kategori && s.ad !== sign.ad
  );
  const genel = all.filter((s) => s.id !== sign.id && s.ad !== sign.ad && !pool.includes(s));
  const kaynak = pool.length >= count ? pool : [...pool, ...genel];
  return karistir(kaynak)
    .slice(0, count)
    .map((s) => s.ad);
}

function otomatikSoru(sign, all) {
  const yanlis = yanlisSecenekler(sign, all);
  const sablonlar = [
    `Görseldeki trafik levhasının adı hangisidir?`,
    `Bu levha sürücüye ne bildirir?`,
    `Görseldeki işaret hangi anlama gelir?`,
  ];
  const metin = sablonlar[Math.abs(hash(sign.id)) % sablonlar.length];
  const secenekler = karistir([sign.ad, ...yanlis]);
  const dogruIndex = secenekler.indexOf(sign.ad);
  return {
    metin,
    secenekler,
    dogruIndex,
    aciklama: sign.anlam,
    konuId: KONU_BY_KAT[sign.kategori] ?? "trafik-isaretleri",
    zorluk: sign.kategori === "bilgi" ? "orta" : "kolay",
  };
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

function main() {
  const signs = parseSigns();
  const imageIds = parseImageIds();
  const sorular = [];
  let n = 1;

  for (const sign of signs) {
    if (SKIP_IDS.has(sign.id)) continue;
    const hasGorsel =
      imageIds.has(sign.id) ||
      sign.kategori === "isikDurum" ||
      sign.id.startsWith("is-");
    if (!hasGorsel) continue;

    const ozel = OZEL[sign.id];
    const base = ozel ?? otomatikSoru(sign, signs);
    sorular.push({
      id: `s-is-${String(n++).padStart(3, "0")}`,
      dersId: "trafik",
      gorselIsaretId: sign.id,
      ...base,
    });
  }

  const lines = [
    `import type { Soru } from "@/types";`,
    ``,
    `/** Levha görselli sorular — otomatik üretildi (scripts/generate-isaret-sorulari.mjs) */`,
    `export const ISARET_SORULARI: Soru[] = [`,
    ...sorular.map((s, i) => {
      const opts = JSON.stringify(s.secenekler);
      return `  {
    id: "${s.id}",
    dersId: "trafik",
    konuId: "${s.konuId}",
    metin: ${JSON.stringify(s.metin)},
    secenekler: ${opts},
    dogruIndex: ${s.dogruIndex},
    aciklama: ${JSON.stringify(s.aciklama)},
    zorluk: "${s.zorluk ?? "kolay"}",
    gorselIsaretId: "${s.gorselIsaretId}",
  }${i < sorular.length - 1 ? "," : ""}`;
    }),
    `];`,
    ``,
  ];

  fs.writeFileSync(OUT, lines.join("\n"));
  console.log("Üretildi:", sorular.length, "görselli levha sorusu →", OUT);
}

main();
