# Ehliyet Ustasi - Proje Kilavuzu

## Genel Bakis

**Ehliyet Ustasi**, Turkiye'deki MEB ehliyet sinavina hazirlik amaciyla gelistirilmis kapsamli bir mobil uygulamadir. Kullanicilar konu anlatimlarini okuyabilir, 595 sorudan olusan soru havuzundan test cozebilir, 50 soruluk prova sinavina girebilir, direksiyon sinavi manevralarini interaktif 2D animasyonlarla ogrenebilir ve trafik isaretlerini gorsel kataloguyla inceleyebilir.

- **Paket adi:** `com.ehliyetustasi.app`
- **Google Play durumu:** Uretimde yayinlandi
- **Expo hesabi:** `umitakay07s-team`
- **EAS Project ID:** `0ac5b87e-b70d-408c-ad4c-5ea9f14c7023`

---

## Teknoloji Yigini

| Katman | Teknoloji | Versiyon |
|--------|-----------|----------|
| Framework | **Expo (Managed Workflow)** | SDK 54 |
| Runtime | **React Native** | 0.81.5 |
| Dil | **TypeScript** (strict mode) | 5.7 |
| Navigasyon | **Expo Router** (file-based routing) | 6.x |
| State Management | **Zustand** + AsyncStorage persist | 5.x |
| Animasyonlar | **React Native Reanimated** | 4.x |
| SVG Grafikleri | **react-native-svg** | 15.x |
| Font | **Nunito** (@expo-google-fonts/nunito) | - |
| Bildirimler | **expo-notifications** | 0.32.x |
| Build/Deploy | **EAS Build** + **EAS Submit** | - |
| Ikonlar | **@expo/vector-icons** (Ionicons) | - |

### Onemli Bagimliliklar

- `react-native-gesture-handler` - Kaydirma ve dokunma etkilesimleri
- `react-native-safe-area-context` - Guvenli alan yonetimi
- `react-native-screens` - Yerel ekran yonetimi
- `react-native-view-shot` - Ekran goruntusu alma (paylasim)
- `react-native-calendars` - Sinav tarihi secimi
- `expo-speech` - Metin okuma (TTS)
- `expo-audio` - Simulasyon ses efektleri (mikrofon izni kapali; modul yoksa sessiz calisir)
- `expo-sharing` - Sonuc paylasimi
- `expo-keep-awake` - Simulasyon oynarken ekran kararmaz (`src/services/ekranUyanik.ts`; native modul expo ile zaten geliyordu)

---

## Proje Yapisi

`
EhliyetUstasi/
+-- app/                          # Expo Router sayfa dosyalari (file-based routing)
|   +-- _layout.tsx               # Root layout: font yukleme, ThemeProvider, ErrorBoundary
|   +-- onboarding.tsx            # Ilk acilis tanitim ekrani
|   +-- (tabs)/                   # Alt tab navigasyonu
|   |   +-- _layout.tsx           # Tab bar layout (5 tab)
|   |   +-- index.tsx             # Ana sayfa (dashboard)
|   |   +-- konular.tsx           # Konu anlatimlari listesi
|   |   +-- testler.tsx           # Test/quiz listesi
|   |   +-- direksiyon.tsx        # Direksiyon dersleri listesi
|   |   +-- profil.tsx            # Profil ve ayarlar
|   +-- konu/[id].tsx             # Konu detay sayfasi
|   +-- test/[konuId].tsx         # Konu bazli test
|   +-- ders-test/[dersId].tsx    # Ders bazli test
|   +-- direksiyon/[id].tsx       # Direksiyon ders detayi
|   +-- prova.tsx                 # 50 soruluk prova sinavi
|   +-- prova-sonuc.tsx           # Prova sonuc ekrani
|   +-- pratik-sinav-simulasyonu.tsx  # Pratik sinav simulasyonu
|   +-- hatalar.tsx               # Yanlis cevaplanan sorular listesi
|   +-- isaretler.tsx             # Trafik isaretleri katalogu
|   +-- gunun-sorusu.tsx          # Gunun sorusu
|   +-- bilgi-bankasi.tsx         # Bilgi bankasi
|   +-- cezalar.tsx               # Trafik cezalari tablosu
|
+-- src/
|   +-- animations/               # Reanimated tabanli animasyonlar
|   |   +-- shared.ts             # Ortak animasyon sabitleri (CAR_W, CAR_H, EASE, interpolateKeyframes)
|   |   +-- keyframes.ts          # Keyframe tanimlari
|   |   +-- KonuAnimasyonu.tsx    # Konu anlatimlarindaki 2D interaktif animasyonlar
|   |   +-- ManevraAnimasyonu.tsx  # Direksiyon manevra animasyonlari
|   |   +-- simGorsel.ts          # Ortak simulasyon cizimi (araba, zemin, duba; SVG metni, saf)
|   |   +-- SimArac.tsx           # Ortak araba (donen on tekerlek, sinyal/fren/geri lambalari)
|   |   +-- manevraVerisi.ts      # Manevradan geri vites, tekerlek acisi, hiz (saf)
|   |
|   +-- components/               # Paylasilan bilesenler
|   |   +-- ui/                   # Temel UI primitifleri
|   |   |   +-- Badge.tsx
|   |   |   +-- Button.tsx
|   |   |   +-- Card.tsx
|   |   |   +-- ProgressBar.tsx
|   |   |   +-- ProgressRing.tsx
|   |   |   +-- Screen.tsx        # Sayfa wrapper
|   |   |   +-- ScreenHeader.tsx  # Geri butonu olan baslik
|   |   |   +-- Typography.tsx
|   |   +-- AppLogo.tsx           # Marka logosu
|   |   +-- BrandAuroraBackground.tsx  # Gradyanli arkaplan efekti
|   |   +-- BrandBootScreen.tsx   # Uygulama acilis ekrani (splash yedegi)
|   |   +-- DireksiyonVideoOynatici.tsx  # Manevra animasyon oynatici
|   |   +-- ErrorBoundary.tsx     # Hata yakalayici
|   |   +-- IsaretGorseli.tsx     # Trafik isareti gorseli (PNG)
|   |   +-- KonuGorseli.tsx       # SVG tabanli statik konu gorselleri + animasyon kontrolu
|   |   +-- ManevraIcons.tsx      # Manevra ikon bilesenleri
|   |   +-- QuizRunner.tsx        # Quiz motoru (soru gecisleri, zamanlayici, sonuc)
|   |   +-- SoruBileseni.tsx      # Tek soru karti (metin + 4 sik + geri bildirim)
|   |
|   +-- data/                     # Tum statik veri (TypeScript dosyalari)
|   |   +-- dersler.ts            # 4 ana ders tanimi (trafik, ilkyardim, motor, adab)
|   |   +-- direksiyon.ts         # 9 direksiyon dersi
|   |   +-- isaretler.ts          # Trafik isaretleri listesi
|   |   +-- isaretImageMap.ts     # Isaret PNG require map'i
|   |   +-- isaretSvgMap.ts       # Isaret SVG fallback map'i
|   |   +-- cezalar.ts            # Trafik cezalari verileri
|   |   +-- bilgiBankasi.ts       # Bilgi bankasi icerikleri
|   |   +-- konuKapakResimleri.ts # Konu kapak gorselleri (require)
|   |   +-- konular/              # Konu anlatimlari (ders bazli)
|   |   |   +-- index.ts          # KONULAR export + yardimci fonksiyonlar
|   |   |   +-- trafik.ts, ilkyardim.ts, motor.ts, adab.ts
|   |   +-- sorular/              # Soru havuzu (ders/kategori bazli)
|   |       +-- index.ts          # SORULAR birlesik export + provaSorulariUret()
|   |       +-- trafik.ts, ilkyardim.ts, motor.ts, adab.ts
|   |       +-- ekstra.ts, senaryo.ts, isaret-sorulari.ts
|   |
|   +-- services/
|   |   +-- notifications.ts     # Bildirim yonetimi (motivasyon + sinav geri sayimi)
|   |
|   +-- store/
|   |   +-- useAppStore.ts        # Zustand global store
|   |   +-- useHydration.ts       # AsyncStorage hydration hook
|   |
|   +-- theme/
|   |   +-- colors.ts             # Dark/Light palette tanimlari + ders renkleri
|   |   +-- tokens.ts             # Spacing, radius, fontSize, fontWeight, fontFamily
|   |   +-- index.tsx             # ThemeProvider + useTheme hook
|   |
|   +-- types/
|   |   +-- index.ts              # Tum TypeScript tip tanimlari
|   |
|   +-- utils/
|       +-- gununSorusu.ts        # Gunun sorusu (deterministik hash) + sinav geri sayim
|       +-- progress.ts           # Ilerleme hesaplamalari (ders, konu, genel)
|       +-- provaSonuc.ts         # Prova sonuc hesaplama
|
+-- assets/                       # Statik varliklar
+-- scripts/                      # Yardimci build/gelistirme scriptleri (Node.js)
+-- app.json                      # Expo yapilandirmasi
+-- eas.json                      # EAS Build profilleri
+-- tsconfig.json                 # TypeScript yapilandirmasi (strict, @/* -> ./src/*)
+-- package.json
`

---

## Mimari ve Tasarim Kararlari

### Navigasyon (Expo Router - File-based)

- `app/_layout.tsx` -> Root layout: Font yukleme, ThemeProvider, ErrorBoundary, SafeAreaProvider, onboarding yonlendirmesi
- `app/(tabs)/_layout.tsx` -> Alt tab navigasyonu (Ana Sayfa, Konular, Testler, Direksiyon, Profil)
- Dinamik rotalar: `[id]`, `[konuId]`, `[dersId]` parametreleri ile konu/test/ders detay sayfalari

### State Management (Zustand)

Tek bir `useAppStore` store'u tum uygulama durumunu yonetir:

- **settings**: Tema modu (auto/light/dark), onboarding durumu, sinav tarihi
- **okunanKonular**: Kullanicinin okudugu konular (konuId -> timestamp)
- **cozulenSorular**: Cozulen sorular (soruId -> {dogru, tarih, deneme})
- **hatalar**: Yanlis cevaplanan sorular listesi
- **provaGecmisi**: Son 50 prova sinavi sonucu
- **gunlukAktivite**: Gunluk cozulen soru sayisi (streak hesabi icin)
- **gununSorusuCevap**: Gunun sorusu cevaplari

Store, `zustand/middleware/persist` ile `AsyncStorage`'a otomatik kaydedilir. Store adi: `ehliyet-ustasi-store-v1`.

### Tema Sistemi

Iki tam palette (dark/light) + Nunito font ailesi:

- Dark: background=#0F172A, surface=#1E293B, primary=#6366F1 (Indigo)
- Light: background=#F8FAFC, surface=#FFFFFF, primary=#4F46E5 (Indigo)

Kullanim: `const { colors, spacing, fontSize, radius, fontFamily } = useTheme();`

Tema modu `settings.themeMode` ile kontrol edilir:
- `"auto"` -> Sistem temasini takip eder
- `"dark"` -> Sabit karanlik (VARSAYILAN)
- `"light"` -> Sabit aydinlik

### Ders Renkleri

- Trafik: #3B82F6 (Mavi)
- Ilk Yardim: #EF4444 (Kirmizi)
- Motor: #F59E0B (Amber)
- Trafik Adabi: #10B981 (Yesil)

### Soru Yapisi

`	ypescript
interface Soru {
  id: string;           // Benzersiz kimlik (or: "trafik-kavramlar-01")
  dersId: DersId;       // "trafik" | "ilkyardim" | "motor" | "adab"
  konuId: string;       // Ilgili konu kimligi
  metin: string;        // Soru metni
  secenekler: string[]; // 4 sik (A, B, C, D)
  dogruIndex: number;   // Dogru cevabin indeksi (0-3)
  aciklama: string;     // Dogru cevabin aciklamasi
  zorluk: Zorluk;       // "kolay" | "orta" | "zor"
  gorselIsaretId?: string; // Trafik isareti gorseli (varsa)
}
`

**Toplam: 595 soru** (130 gorsel trafik isareti sorusu dahil)

### Prova Sinavi Dagilimi (MEB formati)

- Trafik: 23 soru (en az 12 gorsel isaret sorusu)
- Ilk Yardim: 12 soru
- Motor: 9 soru
- Trafik Adabi: 6 soru
- **Toplam: 50 soru** (provaSorulariUret() fonksiyonu ile rastgele secilir)

### Animasyonlar

Iki ana animasyon kategorisi vardir:

1. **Konu Animasyonlari** (KonuAnimasyonu.tsx): Konu anlatimlarinda kullanilan interaktif SVG+Reanimated animasyonlari
   - Kayitli animasyonlar: takip-mesafesi, 2-saniye, yaya-gecit-diyagram, sollama-kural, tyd-30-2, heimlich, vites-akisi, abs-sema, gecis-onceligi
   - Her biri play/pause toggle'a sahip

2. **Manevra Animasyonlari** (ManevraAnimasyonu.tsx): Direksiyon derslerindeki manevra simulasyonlari. Ders sayfasi ve pratik sinav ayni bileseni ve ayni araba/zemin cizimini kullanir (`simGorsel.ts`, `SimArac.tsx`). Elle surulen direksiyon simulatoru 2026-11-11'de sahibin karariyla kaldirildi. Ses efektleri: `src/services/simSes.ts` (`assets/sesler/*.wav`, `npm run sesler:uret` ile sentezlenir); ayar `settings.simulasyonSesi`. Onizleme: `npm run simulasyon:onizle -- <klasor>`.
   - 9 manevra tipi: paralelPark, lPark, rampaKalkis, aniFren, sinyal, uDonusu, seritDegistirme, temelKumanda, geriManevra

### Bildirimler

`src/services/notifications.ts` iki tur bildirim planlar:

1. **Gunluk plan bildirimleri** (gunluk plana bagli): bugun + 14 gun, her sabah 10:00'da o gunun plani ("Bugun 7 tekrarin var" ya da "Bugunku hedefin: 20 soru" + motivasyon). Bugunku soru hedefi bitmediyse yalnizca bugun icin 20:00'de hatirlatma. Sinav gunu gonderilmez. Icerik: `src/utils/bildirimPlani.ts` (saf, testli); gunluk veriler: `src/services/planGunleri.ts` (ana sayfadaki plan ile ayni fonksiyonlar).
2. **Sinav geri sayimi**: Sinav tarihine kadar her gun saat 13:00'te kalan gun bildirimi (maks 40 gun)

Yeniden kurulum: acilista, sinav tarihi degisince ve uygulama arka plana gecince (`app/_layout.tsx`). Kurulacak liste son kurulanla ayniysa ve kurulu sayi tutuyorsa hicbir sey yapilmaz.

**Race condition korumasi**: `isScheduling` flag'i ile coklu bildirim planlamasi onlenir.

---

## Veri Akisi

`
Statik Veri (TypeScript dosyalari)
  +-- DERSLER (4 ders)
  +-- KONULAR (32 konu)
  +-- SORULAR (595 soru)
  +-- DIREKSIYON_DERSLERI (9 manevra)
  +-- TRAFIK_ISARETLERI (~130 isaret)
         |
    Zustand Store (useAppStore)
    +-- Kullanici ilerlemesi
    +-- Cozulen sorular
    +-- Hata defteri
    +-- Prova gecmisi
         |
    AsyncStorage (cihazda persist)
`

---

## Build ve Deploy

### EAS Build Profilleri (eas.json)

| Profil | Cikti | Kullanim |
|--------|-------|----------|
| development | Development client | Gelistirme |
| preview | APK | Test (telefondan dogrudan kurulum) |
| production | AAB | Google Play Console'a yukleme |

### Sik Kullanilan Komutlar

`ash
# Gelistirme sunucusu
npx expo start

# TypeScript kontrolu
npx tsc --noEmit

# Saf mantik testleri (node --test, scripts/test-*.mjs; 165 test)
npm test

# OTA guncelleme (JS degisikligi; native degisiklikte yeni build gerekir)
npm run guncelle:onizleme

# Test APK'si olusturma
eas build -p android --profile preview

# Production AAB olusturma (Google Play icin)
eas build -p android --profile production --non-interactive

# Soru sayisi kontrolu
node scripts/count-questions.js

# Trafik isaret katalogu olusturma
npm run isaretler:build

# Isaret sorularini otomatik uretme
npm run isaretler:sorular
`

### Version Code Yonetimi

`app.json` -> `expo.android.versionCode` her production build'de artirilmalidir. `eas.json` dosyasinda `"autoIncrement": true` ayari vardir ancak bazen manuel artirim gerekebilir. **Guncel: version 1.1.0, versionCode 10** (production build autoIncrement ile artirir).

`runtimeVersion` politikasi `appVersion`: native paket eklenen her surumde `expo.version` artirilmalidir, yoksa eski kurulumlara uyumsuz OTA gidebilir.

---

## Stil ve Kodlama Kurallari

1. **Dil**: Tum degisken, fonksiyon ve dosya isimleri Turkce'dir (or: soruCevapla, konuOkundu, cozulenSorular). Yalnizca teknik/framework terimleri (theme, store, provider, layout) Ingilizce'dir.

2. **Path alias**: `@/*` -> `./src/*` (tsconfig.json'da tanimli). Import'larda `@/` prefix'i kullanilir:
   `	ypescript
   import { useTheme } from "@/theme";
   import { useAppStore } from "@/store/useAppStore";
   import type { Soru, DersId } from "@/types";
   `

3. **Tema kullanimi**: Hicbir yerde hardcoded renk kullanilmaz. Her zaman `useTheme()` hook'undan gelen colors, spacing, fontSize, radius kullanilir.

4. **Font**: Yalnizca Nunito font ailesi kullanilir (fontFamily.regular, fontFamily.bold vb.).

5. **Bilesen yapisi**: Fonksiyonel bilesenler + hooks. Class bileseni yoktur.

6. **Export**: Named export tercih edilir (export function, export const). Default export yalnizca sayfa layout'larinda kullanilir.

---

## Bilinen Kisitlamalar ve Notlar

- **Veri tamamen statik**: Tum sorular, konular ve dersler TypeScript dosyalarinda embedded olarak tutulur. Backend/API yoktur.
- **iOS henuz yayinlanmadi**: Sadece Android uzerinde Google Play'de yayinda.
- **Expo Managed Workflow**: Native modul eklenmesi gerekirse `expo prebuild` ile eject edilmeli.
- **Android 15/16 uyarilari**: Status bar (edge-to-edge) API uyarilari React Native ve material kutuphanesinden gelir; framework guncellemesinde cozulecek. Yon kisiti manifestten kaldirildi (`orientation: default`); telefonda dikey kilidi `plugins/withTelefondaDikey.js` MainActivity'de koyar (smallestScreenWidthDp < 600). Genis ekranda sayfalar `ICERIK_MAX_GENISLIK` (720 dp) ile ortalanir.
- **Izinler**: `app.json` -> `android.blockedPermissions` mikrofon (expo-audio kendi manifestinde bildiriyor), medya oynatma on plan servisi, eski depolama ve SYSTEM_ALERT_WINDOW izinlerini kaldirir; `plugins/withKullanilmayanSesServisleri.js` expo-audio'nun kullanilmayan iki on plan servisini manifestten cikarir (Play'in Android 14 on plan servis beyanini onlemek icin). Kilit ekrani medya kontrolu ya da ses kaydi eklenirse ikisini de geri al.
- **expo-dev-client yok**: yayin build'ine ML Kit, Compose vb. tasiyordu; cikarildi. Gelistirme build'i gerekirse gecici olarak geri eklenir.
- **R8 kaynak kucultme**: `plugins/withProguardOptimize.js` optimize profil + `android.r8.optimizedResourceShrinking` + `res/raw/ehliyet_ustasi_keep.xml` (JS paketindeki `assets_*`, `node_modules_*` resim/ses/fontlari korur). Native/R8 degisikligini her zaman release build'de dene.
- **Soru dengeleme**: `scripts/balance_questions.js` scripti ile Gemini API kullanilarak yanlis siklarin uzunluk dengesi iyilestirildi.
- **Proje yolu Turkce karakter iceriyor** (`Masaüstü`): yerel `expo prebuild`/Gradle bu yolda calismaz. Native derleme EAS bulutunda yapilir.
- **Saf mantik modulleri** (`src/utils/*.ts`, `src/animations/sahne.ts`, `src/data/yolHaritasi.ts` vb.) calisma zamaninda hicbir sey import etmez; boylece `node --test` ile dogrudan test edilir. Bu kurali bozma.

### Yol haritasi ozellikleri (docs/YOL-HARITASI.md)

| Ozellik | Ana dosyalar |
|---------|--------------|
| OTA guncelleme | `app.json` (updates, runtimeVersion), `eas.json` (channel), `docs/OTA-GUNCELLEME.md` |
| Aralikli tekrar (Leitner 1-3-7-14 gun) | `src/utils/tekrar.ts`, `src/store/useTekrarDurumu.ts`, `app/tekrar.tsx` |
| Zayif konu tespiti (gunluk plandaki "Once: ..." onerisi) | `src/utils/gecmeOlasiligi.ts`, `src/store/useGecmeOlasiligi.ts`. Tahmini gecme ihtimali karti ve Gecme Analizi ekrani 2026-11-11'de sahibin karariyla kaldirildi; yuzde hicbir yerde gosterilmez. |
| Gunluk plan (ana sayfada tek satir, dokununca asagi acilir; varsayilan kapali) | `src/utils/gunlukPlan.ts`, `src/components/GunlukPlanKarti.tsx` |
| Plana bagli bildirimler | `src/utils/bildirimPlani.ts`, `src/services/planGunleri.ts`, `src/services/notifications.ts` |
| Puan istegi (hayatta bir kez, test/simulasyon bitince; Play Store sayfasini acar) | `src/components/PuanIstegi.tsx` (kok duzende), `src/store/usePuanIstegi.ts` (`usePuanIstegiTetikle`), store: `puanIstegiGosterildi` (sifirlamada korunur) |
| Animasyonlu senaryo sorulari (sen-01..20) | `src/animations/sahne.ts`, `src/data/senaryolar.ts`, `src/animations/SenaryoSahnesi.tsx` |
| Tuzak notlari (onay kapili) | `src/data/tuzakNotlari.ts` (`onayli`), `npm run notlar:onayla` |
| Premium simulasyon (ortak gorsel + ses) | `src/animations/simGorsel.ts`, `SimArac.tsx`, `ManevraAnimasyonu.tsx`, `src/components/DireksiyonVideoOynatici.tsx`, `src/services/simSes.ts`, `scripts/ses-uret.mjs` |
| Android widget (2x2 varsayilan, boyuta gore serit/kare/genis duzen) | `index.ts` (giris noktasi), `src/widget/*`, `src/utils/widgetDuzeni.ts`, `assets/widget/*`, `docs/WIDGET.md`; onizleme: `npm run widget:onizle -- <klasor>` |
| Oyunlastirma (XP, seviye, rozet) | `src/utils/oyun.ts`, `app/basarilar.tsx` |
| Prova isaretleme/ozet | `src/utils/provaAnaliz.ts`, `src/components/ProvaOzeti.tsx` |
| Arama ve favoriler | `src/utils/arama.ts`, `app/ara.tsx`, `app/favoriler.tsx` |
| Ehliyet yol haritasi (onay kapili) | `src/data/yolHaritasi.ts` (`YOL_HARITASI_ONAYLI`) |

Store'a yalnizca eklemeler yapildi: `tekrar`, `favoriler`, `yolHaritasi`, `puanIstegiGosterildi`. XP/rozetler mevcut kayitlardan turetilir, saklanmaz. Dogrulanmamis icerik (tuzak notlari, yol haritasi) bayrakla gizlidir; bayraklari kaynak dogrulamasi olmadan acma.

---

## Kritik Dosyalar (Degisiklik yaparken dikkat!)

| Dosya | Aciklama |
|-------|----------|
| `index.ts` | Uygulama giris noktasi (`package.json` -> `main`): expo-router + widget gorev isleyicisi. Bozulursa uygulama hic acilmaz |
| `app/_layout.tsx` | Uygulama kok layout'u - font, tema, splash, onboarding yonlendirmesi |
| `src/store/useAppStore.ts` | Tum kullanici verisi burada - store yapisini degistirmek migration gerektirir |
| `src/services/notifications.ts` | Bildirim race condition korumasi kritik |
| `src/animations/KonuAnimasyonu.tsx` | Animasyon registry - silme/ekleme yaparken KONU_ANIM_IDS set'ini guncelle |
| `src/data/sorular/index.ts` | Prova sinavi dagilim algoritmasi burada |
| `app.json` | versionCode, paket adi, plugin'ler - production build oncesi kontrol et |
