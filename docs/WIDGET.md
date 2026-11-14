# Android ana ekran widget'ı

Ana ekrana eklenen "Ehliyet Ustası" widget'ı **sınava kalan günü**, **bekleyen tekrar sayısını** ve **bugünkü soru hedefini** gösterir. Bugünkü hedef, kesik çizgili bir yolda bitiş bayrağına ilerleyen turuncu bir arabayla çizilir. Dokununca tekrar varsa tekrar ekranı, yoksa uygulama açılır.

## Boyut ve düzen

- Varsayılan boyut **2x2** hücre (Android 12 ve üstü). En küçük boyut **2x1**. Her yöne büyütülüp küçültülebilir (`app.json` → `minWidth: 110dp`, `minHeight: 40dp`, `targetCell 2x2`).
- Android 11 ve altında varsayılan boyut en küçük boyuttur (2x1); kullanıcı büyütebilir.
- Widget her çizimde kendi gerçek boyutunu (dp) alır ve üç düzenden birini seçer (`src/utils/widgetDuzeni.ts`):
  - **Şerit** (tek sıra, yükseklik 150dp altı): logo, "23 gün kaldı", genişse tekrar rozeti ve ince yol.
  - **Kare** (2x2 civarı): logo, tekrar rozeti, büyük gösterge, yol, alt satır.
  - **Geniş** (3x2 ve üstü, genişlik 250dp ve üstü): solda sınav, sağda bugünkü hedef, altta tam genişlik yol.
- Yazılar widget boyutuyla ölçeklenir. Sistem yazı boyutu ayarı bilerek uygulanmaz; uygulansa küçük widget'larda yazılar taşardı.

## Tasarım

- Koyu zemin ve bebek mavisi vurgu uygulamanın koyu temasından, turuncu araba uygulama ikonundaki direksiyondan gelir. Zemin ve yol SVG olarak çizilir (`src/widget/cizimler.ts`): köşe yuvarlaklığı ve renkler her telefonda aynı çıkar.
- Yazı tipi Nunito (800 ve 700). `app.json`'da widget eklentisinin `fonts` listesiyle APK'ya eklenir.
- Logo: `assets/widget/logo.png` (uygulama ikonunun 144 piksellik kopyası).
- Widget seçim ekranındaki resim: `assets/widget/onizleme.png`.

## Tasarımı telefonsuz görmek

```bash
npm run widget:onizle -- <çıktı-klasörü>
```

Gerçek bileşeni çalıştırıp her boyutun ve her veri durumunun resmini üretir (`boyutlar.png`, `durumlar.png`). Başsız Chrome ya da Edge kullanır. Tasarımı değiştirirsen seçim ekranı resmini de yenile:

```bash
npm run widget:onizle -- <çıktı-klasörü> --onizleme-resmi
```

Bu resimler Android'in çizimine çok yakındır ama birebir değildir; son kontrol telefonda yapılır.

## Nasıl çalışır

- Veriyi uygulamanın kalıcı deposundan (`ehliyet-ustasi-store-v1`, AsyncStorage) okur (`widgetVerisiDepodan`, `src/widget/ortak.ts`). Bugünkü hedef, ana sayfadaki "Bugünün planı" ile aynı fonksiyonla hesaplanır (`gunlukSoruHedefi`). Boş, bozuk ya da eski veri çökmez, sıfır gösterir.
- Güncellenme: widget eklenince, yeniden boyutlandırılınca, her 30 dakikada bir ve **uygulama arka plana gidince** (`app/_layout.tsx`).
- Kütüphane: `react-native-android-widget` 0.26.0 + Expo config plugin (`app.json`). Widget'ın tamamı tek bir resim olarak çizilip ana ekrana konur.
- Testler: `npm run test:widget` (düzen seçimi, ölçek, depodan sayılar, SVG çizimleri).

## Dikkat: giriş dosyası değişti

Widget görev işleyicisinin kaydı için uygulamanın giriş noktası `index.ts` oldu (`package.json` → `main`). Widget kaydı yalnızca Android'de ve `try/catch` içinde yapılır; widget ile ilgili bir sorun uygulamanın açılmasını engellemez.

**Sorun olursa geri alma:** `package.json` içinde `"main": "expo-router/entry"` yapıp `index.ts`'i silmek widget dışındaki her şeyi eski haline getirir.

## Yeni sürüm gerekir

Widget boyutu, yazı tipi ve seçim ekranı resmi APK'nın içindeki ayarlardır. Bu yüzden widget değişiklikleri OTA güncellemeyle gitmez, **yeni build** gerekir.

## Bu bilgisayarda yerel derleme

Yolun adındaki `Masaüstü` (Türkçe karakter) yüzünden yerel Gradle derlemesi çalışmaz. Native derlemeyi EAS'te yap:

```bash
eas build -p android --profile preview
```
