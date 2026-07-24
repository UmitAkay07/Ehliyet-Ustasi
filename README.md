# Ehliyet Ustası

MEB 2026 e-sınav müfredatına uygun, tamamen **çevrimdışı** çalışan ehliyet ve direksiyon hazırlık uygulaması. React Native (Expo) ile geliştirilmiştir; hem iOS hem Android için tek kod tabanından derlenir.

## Özellikler

- **Konu Anlatımları** — 4 dersin (Trafik ve Çevre, İlk Yardım, Motor/Araç Tekniği, Trafik Adabı) tüm konuları, anahtar noktalarla.
- **Konu Testleri** — Konu bazlı, açıklamalı ve anında geri bildirimli test sistemi.
- **Sınav Provası** — Gerçek e-sınav formatı: 50 soru, 45 dakika sayaç, 23/12/9/6 ders dağılımı, 70 puan barajı ve detaylı sonuç analizi.
- **Hata Defteri** — Yanlış yapılan sorular otomatik toplanır; konu anlatımına bağlanır ve tekrar çözülebilir.
- **Direksiyon Dersleri** — Paralel park, L park, rampa kalkışı, ani fren, U dönüşü, sinyal/şerit değiştirme için adım adım anlatım ve 2D kuş bakışı animasyonlar. Kırmızı/sarı/mavi hata kriterleri.
- **Trafik İşaretleri Kütüphanesi** — Kategorilere ayrılmış işaretler ve anlamları.
- **İlerleme ve İstatistik** — Seri (streak), ders bazlı başarı; tüm veriler cihazda (AsyncStorage) saklanır.
- **Açık / Koyu tema** desteği.

## Teknoloji

- Expo SDK 52 + TypeScript
- expo-router (dosya tabanlı navigasyon)
- Zustand + AsyncStorage (offline durum yönetimi)
- react-native-svg + react-native-reanimated (animasyonlar ve grafikler)

## Kurulum ve Çalıştırma

```bash
npm install
npm start          # Expo geliştirme sunucusu (QR ile Expo Go veya dev build)
npm run android    # Android'de çalıştır
npm run ios        # iOS'te çalıştır (macOS gerekir)
npm run typecheck  # TypeScript kontrolü
```

## Proje Yapısı

```
app/                # Ekranlar (expo-router)
  (tabs)/           # Sekmeler: ana sayfa, konular, testler, direksiyon, profil
  konu/[id]         # Konu okuyucu
  test/[konuId]     # Konu testi
  ders-test/[dersId]# Ders karışık testi
  prova / prova-sonuc
  hatalar / isaretler / direksiyon/[id] / onboarding
src/
  data/             # Müfredat içeriği (dersler, konular, sorular, direksiyon, işaretler)
  components/       # UI bileşenleri
  animations/       # 2D manevra animasyonları
  store/            # Zustand store + hydration
  theme/            # Renk, tipografi, tema
  utils/            # İlerleme/istatistik hesaplamaları
assets/             # İkon, splash
```

## Mağazaya Yayınlama (Özet)

1. Bir [Expo](https://expo.dev) hesabı oluştur ve `npm i -g eas-cli` ile EAS CLI'yi kur.
2. `eas login` ve `eas build:configure` çalıştır.
3. Derleme: `eas build -p android --profile production` ve `eas build -p ios --profile production`.
4. Gönderim: `eas submit -p android` / `eas submit -p ios`.

**Gerekli hesaplar:** Apple Developer Program (99 USD/yıl) ve Google Play Developer (25 USD tek seferlik).

Detaylı içerik ekleme ve mağaza notları için `PRIVACY.md`, `STORE.md` ve `app.json` dosyalarına bakın.

## İçerik Ekleme

Yeni soru veya konu eklemek için `src/data/sorular/*.ts` ve `src/data/konular/*.ts` dosyalarındaki tip güvenli dizilere yeni nesne eklemeniz yeterlidir. Soru havuzu büyüdükçe sınav provası otomatik olarak zenginleşir.

## Not

Bu uygulama resmî bir MEB uygulaması değildir; içerikler MEB e-sınav müfredatına uygun olarak hazırlanmış **özgün** eğitim materyalleridir ve hazırlık amaçlıdır.
