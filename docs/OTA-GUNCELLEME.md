# OTA (mağazasız) güncelleme

`expo-updates` ile JavaScript ve asset değişiklikleri (sorular, konular, ceza tutarları, ekranlar) Google Play incelemesini beklemeden kullanıcılara gider.

## Nasıl çalışır

- Uygulama açılırken yeni güncellemeyi arka planda indirir, **bir sonraki açılışta** uygular (`fallbackToCacheTimeout: 0`). Sınav çözerken ekran yenilenmez.
- Güncelleme yalnızca **aynı `expo.version`** değerine sahip yüklemelere gider (`runtimeVersion` politikası `appVersion`). Native değişiklik yaptığında (yeni native paket, plugin, izin) `app.json` içindeki `version` değerini artır; eski yüklemeler uyumsuz güncelleme almaz.
- Kanallar: `development`, `preview`, `production` (`eas.json`). Bir build, kendi kanalındaki güncellemeleri alır.

## İlk kurulum (bir kez)

1. `expo-updates` native kod ekler, bu yüzden **yeni bir build** şarttır. Mevcut Play sürümü güncelleme alamaz.
2. Önce APK ile dene:
   ```bash
   eas build -p android --profile preview
   ```
3. APK'yi cihaza kur, uygulamayı bir kez aç ve kapat.
4. Küçük bir değişiklik yap (örneğin bir konu metni) ve yayınla:
   ```bash
   npm run guncelle:onizleme -- --message "deneme"
   ```
5. Uygulamayı kapatıp aç. Bir kez daha kapatıp açınca değişiklik görünmeli. Görünüyorsa üretime geç:
   ```bash
   eas build -p android --profile production --non-interactive
   ```

## Üretimde güncelleme yayınlama

```bash
npm run guncelle:uretim -- --message "Ceza tutarları 2026 güncellemesi"
```

Geri almak için önceki güncellemeyi yeniden yayınla: `eas update:republish`.

## Dikkat

- Yalnızca JS/asset değişiklikleri OTA ile gider. Native paket, `app.json` ayarı veya izin eklemek yeni build ister.
- İçerik (ceza tutarı, yönetmelik) resmi kaynaktan doğrulanmadan yayınlanmamalı. OTA hızlıdır, hatalı içerik de aynı hızla yayılır.
- Yerel `expo prebuild` proje klasöründe çalışmıyor (`MainApplication` bulunamıyor). **Nedeni doğrulandı: klasör yolundaki `Masaüstü` (Türkçe karakter).** Projeyi Türkçe karakter içermeyen bir yola kopyalayınca `prebuild` başarılı oluyor; orada `AndroidManifest.xml`'de `expo.modules.updates.ENABLED=true`, çalışma sürümü ve güncelleme adresi (`https://u.expo.dev/<proje-kimliği>`) görüldü. EAS Build bulutta çalıştığı için bu sorundan etkilenmez.
- Hâlâ doğrulanmayan: gerçek bir `eas update` yayını ve cihazda güncellemenin uygulanması. Bunu belgedeki "İlk kurulum" adımlarıyla sen denemelisin.
