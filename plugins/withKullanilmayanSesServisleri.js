const { withAndroidManifest } = require("@expo/config-plugins");

// expo-audio kendi manifestinde iki ön plan servisi bildiriyor: kilit ekranı medya kontrolü
// (foregroundServiceType="mediaPlayback") ve arka planda ses kaydı ("microphone"). Uygulama ikisini de
// kullanmıyor (setActiveForLockScreen ve kayıt yok); servisler yalnızca bunlar çağrılınca başlar.
// Manifestte kalırlarsa Play Console, Android 14+ için ön plan servis beyanı (gerekçe + video) ister
// ve uygulama sayfasında gereksiz izinler görünür. İlgili izinler app.json → android.blockedPermissions ile
// kaldırılıyor; bu eklenti de servis kayıtlarını birleştirilmiş manifestten çıkarır.
const KALDIRILACAK = [
  "expo.modules.audio.service.AudioControlsService",
  "expo.modules.audio.service.AudioRecordingService",
];

module.exports = function withKullanilmayanSesServisleri(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    manifest.$ = { ...manifest.$, "xmlns:tools": "http://schemas.android.com/tools" };
    const uygulama = manifest.application && manifest.application[0];
    if (!uygulama) throw new Error("withKullanilmayanSesServisleri: <application> bulunamadı");
    const servisler = (uygulama.service || []).filter((s) => !KALDIRILACAK.includes(s.$["android:name"]));
    for (const ad of KALDIRILACAK) servisler.push({ $: { "android:name": ad, "tools:node": "remove" } });
    uygulama.service = servisler;
    return config;
  });
};
