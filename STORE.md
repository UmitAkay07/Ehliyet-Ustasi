# Mağaza Yayınlama Rehberi — Ehliyet Ustası

Bu belge, App Store ve Google Play’e yükleme adımlarını özetler. Kod tarafı (EAS, bundle id, gizlilik metni) hazırdır; kalan iş hesabınız ve mağaza materyalleridir.

## 1) Gerekli hesaplar

| Platform | Maliyet | Not |
|---|---|---|
| Apple Developer Program | ~99 USD / yıl | iOS yayın için zorunlu |
| Google Play Console | 25 USD tek seferlik | Android yayın için zorunlu |
| Expo hesabı | Ücretsiz başlangıç | `eas` build için |

## 2) Derleme (EAS)

```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
eas build -p ios --profile production
```

Preview APK (test için):

```bash
eas build -p android --profile preview
```

## 3) Gönderim

```bash
eas submit -p android --latest
eas submit -p ios --latest
```

## 4) Mağaza metinleri (öneri)

**Uygulama adı:** Ehliyet Ustası  
**Kısa açıklama (Android):** MEB e-sınav ve direksiyon için çevrimdışı konu, test ve prova.  
**Uzun açıklama özeti:**
- 4 ders konu anlatımı (Trafik, İlk Yardım, Motor, Trafik Adabı)
- Konu bazlı testler ve açıklamalar
- Gerçek format sınav provası (50 soru / 45 dk)
- Hata defteri
- 2D animasyonlu direksiyon dersleri
- Trafik işaretleri kütüphanesi
- Tamamen çevrimdışı, hesap yok, reklam yok

**Anahtar kelimeler:** ehliyet, e-sınav, meb, direksiyon, trafik, ilk yardım

## 5) Ekran görüntüleri

Emülatör veya gerçek cihazda şu ekranlardan en az 4–8 görsel alın:
1. Ana sayfa / ilerleme
2. Konu anlatımı
3. Test sorusu (görselli bir soru tercih edin)
4. Sınav provası
5. Direksiyon animasyonu
6. Trafik işaretleri

Boyut: Google Play genelde telefon 1080x1920; App Store 6.7" ekran boyutları.

## 6) Gizlilik URL’si ve Destek

`PRIVACY.md` içeriğini bir web sayfasına (Notion / GitHub Pages / kendi siteniz) koyup mağazada “Privacy Policy URL” alanına yapıştırın.

> Not: Gizlilik URL'si ve Destek e-postası mağaza panelinde formlara doğru girilmelidir (Örn: ehliyetustasi.destek@gmail.com ve https://sites.google.com/view/ehliyetustasi-gizlilik/ana-sayfa).

## 7) Yasal uyarı (mağaza açıklamasına ekleyin)

> Bu uygulama resmi bir MEB uygulaması değildir. İçerikler MEB e-sınav müfredatına uygun özgün eğitim materyalleridir; hazırlık amaçlıdır.

## 8) Yayın öncesi kontrol listesi

- [ ] Emülatör / cihazda onboarding → ana akış testi
- [ ] Prova: 50 soru, sayaç, sonuç ekranı
- [ ] Hata defteri ve konu bağlantısı
- [ ] Direksiyon animasyonları
- [ ] Açık / koyu tema
- [ ] Gizlilik URL’si canlı
- [ ] Destek e-postası gerçek adresle güncellendi
- [ ] İkon / splash son hali onaylandı
- [ ] `eas build` production başarılı
