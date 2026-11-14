const fs = require("fs");
const path = require("path");
const { withAppBuildGradle, withDangerousMod, withGradleProperties } = require("@expo/config-plugins");

// RN/Expo'nun bare şablonu minifyEnabled açık olsa da R8 optimizasyon
// geçişini devre dışı bırakan "proguard-android.txt" dosyasını kullanıyor.
// Google Play Console bunu "Optimizasyon etkin değil" olarak flagliyor.
// Android Studio'nun varsayılanı olan optimize edilmiş dosyaya geçiyoruz.
function withOptimizeProfili(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      'getDefaultProguardFile("proguard-android.txt")',
      'getDefaultProguardFile("proguard-android-optimize.txt")'
    );
    return config;
  });
}

// Play Console: "Optimize edilmiş, kullanılmayan kaynakları kaldırma etkin değil".
// Kaynak küçültme (shrinkResources) zaten açık; bu bayrak onu R8'e bağlar (AGP 8.6+, AGP 9'da varsayılan).
const OPTIMIZE_KAYNAK = "android.r8.optimizedResourceShrinking";
function withOptimizeKaynakKucultme(config) {
  return withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter((o) => !(o.type === "property" && o.key === OPTIMIZE_KAYNAK));
    config.modResults.push({ type: "property", key: OPTIMIZE_KAYNAK, value: "true" });
    return config;
  });
}

// React Native, JS'te require edilen resim ve sesleri release derlemesinde res/drawable* ve res/raw
// altına koyar ve çalışırken adıyla (getIdentifier) bulur. Koddan doğrudan başvuru olmadığı için
// kaynak küçültücü bunları "kullanılmıyor" sanıp silebilir (işaret resimleri, simülasyon sesleri).
// Bu dosya hepsini açıkça korur.
const KORUMA_XML = `<?xml version="1.0" encoding="utf-8"?>
<!-- withProguardOptimize.js üretir: JS paketindeki resim ve sesler kaynak küçültmede silinmesin -->
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@drawable/assets_*,@drawable/node_modules_*,@raw/assets_*,@raw/node_modules_*" />
`;
function withPaketKaynaklariniKoru(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const klasor = path.join(config.modRequest.platformProjectRoot, "app", "src", "main", "res", "raw");
      fs.mkdirSync(klasor, { recursive: true });
      fs.writeFileSync(path.join(klasor, "ehliyet_ustasi_keep.xml"), KORUMA_XML);
      return config;
    },
  ]);
}

module.exports = function withProguardOptimize(config) {
  config = withOptimizeProfili(config);
  config = withOptimizeKaynakKucultme(config);
  config = withPaketKaynaklariniKoru(config);
  return config;
};
