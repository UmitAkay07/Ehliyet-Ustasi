const { withMainActivity } = require("@expo/config-plugins");
const { mergeContents } = require("@expo/config-plugins/build/utils/generateCode");

// app.json "orientation": "default" ile manifestte yön kısıtı yok (Play Console, büyük ekranlarda
// yön/boyut kısıtlarını uyarı olarak gösteriyor; Android 16 bunları tablet ve katlanabilirlerde
// zaten yok sayıyor). Telefonda (en kısa kenarı 600 dp'den küçük) uygulama açılırken dikeye
// kilitlenir, yani telefon kullanıcısı için hiçbir şey değişmez. Tablet ve açık katlanabilirde
// yan çevrilebilir.
const KOD = [
  "    // Telefonlarda dikey; tablet ve katlanabilirlerde (en kısa kenar >= 600 dp) serbest",
  "    if (resources.configuration.smallestScreenWidthDp < 600) {",
  "      requestedOrientation = android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT",
  "    }",
].join("\n");

module.exports = function withTelefondaDikey(config) {
  return withMainActivity(config, (config) => {
    if (config.modResults.language !== "kt") {
      throw new Error("withTelefondaDikey: MainActivity Kotlin bekleniyordu");
    }
    const sonuc = mergeContents({
      tag: "ehliyet-ustasi-telefonda-dikey",
      src: config.modResults.contents,
      newSrc: KOD,
      anchor: /super\.onCreate\(/,
      offset: 0,
      comment: "//",
    });
    if (!sonuc.didMerge && !sonuc.didClear && !config.modResults.contents.includes("ehliyet-ustasi-telefonda-dikey")) {
      throw new Error("withTelefondaDikey: MainActivity içinde super.onCreate bulunamadı");
    }
    config.modResults.contents = sonuc.contents;
    return config;
  });
};
