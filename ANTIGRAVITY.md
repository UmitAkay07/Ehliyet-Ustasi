# Antigravity — Proje El Değiştirme Rehberi

Bu belge **Ehliyet Ustası** projesine devam edecek yapay zeka asistanı (Antigravity) için yazılmıştır. Kod tabanına tam hakimiyet, sık yapılan işler, tuzaklar ve kullanıcı beklentileri burada toplanmıştır.

> **Özet:** MEB 2026 e-sınav + direksiyon hazırlık uygulaması. Expo SDK 52, TypeScript, tamamen çevrimdışı, Türkçe arayüz. Resmî MEB uygulaması **değil** — özgün eğitim içeriği.

---

## 1. Kullanıcı ve hedefler

- **Dil:** Türkçe arayüz ve içerik; kod yorumları ve commit mesajları Türkçe veya İngilizce olabilir.
- **Kalite beklentisi:** Mağazaya çıkabilecek profesyonel seviye — doğru trafik işaretleri, zengin soru havuzu, görsel/animasyonlu içerik, direksiyon videoları.
- **Platform:** Windows geliştirme ortamı; Android emülatör ile test (`npm run android`).
- **Git:** Kullanıcı commit istemedikçe commit atma.
- **Video üretimi:** Kling AI (ücretsiz katman) ile MP4 üretiliyor; promptlar `scripts/direksiyon-video-spec.json` → `assets/videos/direksiyon/URETIM-PROMPTLARI.md`.
- **Logo / marka (ÖNEMLİ):** Kullanıcı mevcut logo tasarımlarından (özellikle v2: direksiyon + altın yol) **memnun değil**. Daha modern, sade, premium bir logo istiyor. Yeni logo üretirken önce birkaç konsept sun veya minimal/modern yönde git; eski mavi basit direksiyon ikonuna dönme.

---

## 2. Teknoloji yığını

| Katman | Seçim |
|--------|--------|
| Framework | Expo ~52, React Native 0.76.9, React 18.3 |
| Navigasyon | expo-router (dosya tabanlı) |
| Dil | TypeScript (`strict: true`) |
| State | Zustand + AsyncStorage persist |
| Animasyon | react-native-reanimated ~3.16 |
| Vektör | react-native-svg |
| Video | expo-video |
| TTS | expo-speech (Windows'ta patch gerekir) |
| Bildirim | expo-notifications (sınav geri sayımı) |
| Sistem UI | expo-system-ui (arka plan rengi) |

**Path alias:** `@/*` → `./src/*` (`tsconfig.json`)

**New Architecture:** `app.json` içinde `newArchEnabled: true`

**Test:** Sadece `npm run typecheck` — Jest/Vitest yok.

---

## 3. Hızlı başlangıç

```bash
cd "c:\Users\Victus\OneDrive\Masaüstü\iboMotoLastikci"
npm install          # postinstall: patch-expo-speech çalışır
npm run typecheck
npm run android      # veya npm start
npx expo start -c    # splash/asset değişikliği sonrası cache temizle
```

**Android emülatör sorunu:** `Can't find service: package` → emülatörü cold boot, `adb kill-server`, sonra `npx expo start`.

**Expo Go cache:** Splash/ikon değişince eski görsel görünebilir → uygulamayı tamamen kapat, `npx expo start -c`, gerekirse Expo Go önbelleğini temizle.

---

## 4. Proje yapısı

```
app/
  _layout.tsx           # Root: native splash + hydration + onboarding yönlendirme
  onboarding.tsx        # İlk açılış (bir kez), aurora arka plan + AppLogo
  (tabs)/               # 5 sekme: ana, konular, testler, direksiyon, profil
  konu/[id].tsx, test/[konuId].tsx, ders-test/[dersId].tsx
  prova.tsx, prova-sonuc.tsx, hatalar.tsx, isaretler.tsx
  direksiyon/[id].tsx, gunun-sorusu.tsx, cezalar.tsx
  bilgi-bankasi.tsx, sinav-rehberi.tsx, senaryo-test.tsx

src/
  components/
    ui/                 # Button, Card, Screen, …
    IsaretGorseli.tsx   # Levha: PNG → SVG → çizim → varsayılan
    KonuGorseli.tsx     # Konu diyagramları
    DireksiyonVideoOynatici.tsx
    AppLogo.tsx         # SVG marka logosu (onboarding vb.)
    AppSplashScreen.tsx # VAR ama _layout'ta KULLANILMIYOR (yedek)
    BrandAuroraBackground.tsx  # Koyu gradient arka plan (onboarding)
    QuizRunner.tsx, SoruBileseni.tsx
  data/                 # Müfredat
  animations/           # Manevra, senaryo, konu animasyonları
  store/                # useAppStore, useHydration
  theme/, services/, utils/, types/

assets/
  icon-brand.png        # app.json'da aktif ikon
  splash-brand.png      # app.json'da aktif splash
  icon-v2.png, splash-v2.png   # alternatif marka görselleri (v2)
  splash-blank.png      # tek renk splash üretim çıktısı
  icon.png, splash.png, adaptive-icon.png, favicon.png  # senkron kopyalar
  isaretler/, videos/direksiyon/, lesson-*.png

scripts/                # İçerik pipeline + make-blank-splash.mjs
ANTIGRAVITY.md          # Bu dosya
```

---

## 5. Uygulama açılış akışı (KRİTİK)

**Tek açılış ekranı** — kullanıcı bunu özellikle istedi; çift splash olmamalı.

```
1. Native splash (expo-splash-screen)
   → splash-brand.png + arka plan #030712
   → JS yüklenene kadar görünür (Metro "Bundling" sırasında da bu)

2. app/_layout.tsx
   → SplashScreen.preventAutoHideAsync()
   → Zustand hydration bitene kadar native splash AÇIK kalır
   → Arka planda router.replace ile doğru rota hazırlanır
   → SPLASH_MIN_MS (1400ms) sonra SplashScreen.hideAsync()
   → Doğrudan onboarding veya ana sayfa (fade geçiş)

3. AppSplashScreen.tsx
   → Kodda var ama _layout.tsx'te RENDER EDİLMİYOR
   → Tekrar çift ekran olmasın diye kaldırıldı; silmeden bırakıldı
```

**Onboarding:** `settings.onboardingTamam === false` ise `/onboarding`. Tekrar görmek için uygulamayı sil-yükle veya store'da `onboardingTamam: false`.

---

## 6. Marka ve görsel varlıklar

| Dosya | Kullanım |
|-------|----------|
| `assets/icon-brand.png` | `app.json` → icon, adaptiveIcon, notifications, favicon |
| `assets/splash-brand.png` | `app.json` → splash + expo-splash-screen plugin |
| `assets/icon-v2.png` | Alternatif logo (direksiyon + altın yol) — kullanıcı beğenmedi |
| `assets/splash-v2.png` | v2 splash (logo + "Ehliyet Ustası" yazısı) |
| `assets/splash-blank.png` | `scripts/make-blank-splash.mjs` çıktısı — sadece #030712 |
| `src/components/AppLogo.tsx` | Uygulama içi SVG logo (onboarding hero) |

**Marka renkleri:**
- Arka plan: `#030712` (splash, SystemUI, root layout)
- Primary: `#6366F1` (indigo)
- Gradient: `#7C3AED` → `#6366F1` → `#2563EB`
- Onay: `#22C55E` | Yol vurgusu: `#FBBF24`

**Logo değiştirirken:** `app.json` içindeki `icon-brand.png` ve `splash-brand.png` yollarını güncelle; `npx expo start -c` ile test et.

---

## 7. İçerik envanteri

### Dersler ve konular
- **4 ders:** trafik, ilkyardim, motor, adab
- **32 konu:** trafik 12, ilkyardim 7, motor 8, adab 5

### Sorular — toplam **910**
| Dosya | Adet |
|-------|------|
| trafik.ts | 32 |
| ilkyardim.ts | 15 |
| motor.ts | 15 |
| adab.ts | 10 |
| genis-havuz.ts | 268 |
| konu-havuz.ts | 303 |
| senaryo.ts | 20 |
| isaret-sorulari.ts | 247 |

**Prova:** 23/12/9/6 dağılımı; trafikte min 12 görselli soru.

### Trafik işaretleri — **316**
- `src/data/isaretler.ts` (otomatik)
- `assets/isaretler/kgm-map.json`
- ~251 PNG diskte
- **KRİTİK:** `isaretImageMap.ts` şu an neredeyse boş (`is-15` only) → `node scripts/build-isaret-map.js` çalıştır

### Direksiyon — **8 ders**
| ID | Video |
|----|-------|
| dr-temel-kumanda | ✅ MP4 |
| dr-l-park | ✅ MP4 |
| dr-paralel-park | ❌ animasyon |
| dr-rampa-kalkis, dr-u-donusu, dr-ani-fren, dr-sinyal-ayna, dr-geri-manevra | ❌ |

---

## 8. Kritik bileşenler

### IsaretGorseli — 4 katman fallback
PNG → SVG → IsaretCizim → KategoriVarsayilan

### KonuGorseli
Animasyonlu (9 konu) → statik SVG registry → null

### DireksiyonVideoOynatici
`direksiyonVideolari.ts` require varsa video; yoksa ManevraAnimasyonu

### AppLogo + BrandAuroraBackground
Onboarding hero bölümünde kullanılır. Splash'ta kullanılmaz.

### Animasyonlar
- Manevra: keyframes.ts + ManevraAnimasyonu
- Senaryo: 8 tip (kavsakOncelik, anaYolTali, donelKavsak, durLevhasi, sollama, parkYasak, yayaGecidi, seritDegisim)
- Konu: KonuAnimasyonu (9 ID)
- **Türkiye sağdan trafik** — araç yönlerine dikkat

---

## 9. Script'ler

| Komut | Ne yapar |
|-------|----------|
| `npm run isaretler:build` | isaretler.ts + kgm-map.json üret |
| `npm run isaretler:download` | PNG indir |
| `npm run isaretler:sorular` | isaret-sorulari.ts üret |
| `npm run direksiyon:prompts` | URETIM-PROMPTLARI.md üret |
| `node scripts/build-isaret-map.js` | isaretImageMap.ts üret |
| `node scripts/make-blank-splash.mjs` | Tek renk splash PNG üret |
| `node scripts/check-soru-ids.mjs` | Duplicate soru ID |
| `postinstall` | patch-expo-speech (Windows) |

**Elle düzenleme:** isaretler.ts, isaret-sorulari.ts, isaretSvgMap.ts, genis-havuz.ts

---

## 10. Direksiyon video iş akışı

1. `npm run direksiyon:prompts`
2. Kling'de üret (negative prompt'ları da kullan)
3. `assets/videos/direksiyon/<id>.mp4` — çift uzantıya dikkat (`.mp4.mp4`)
4. `direksiyonVideolari.ts` require aç

**Paralel vs L park:** Spec'te negativePrompt var. Paralel = kaldırım boyunca iki araç arası; L = 90° dik cebe.

---

## 11. Zustand store

**Key:** `ehliyet-ustasi-store-v1`

Persist: settings, okunanKonular, cozulenSorular, hatalar, provaGecmisi (max 50), gunlukAktivite, gununSorusuCevap

`herseyiSifirla()` → themeMode korunur

---

## 12. Expo yapılandırması

```json
// app.json özeti
"icon": "./assets/icon-brand.png"
"splash": { "image": "./assets/splash-brand.png", "backgroundColor": "#030712" }
"expo-splash-screen": { backgroundColor, image, imageWidth: 200, resizeMode: "contain" }
```

- Bundle: `com.ehliyetustasi.app`
- `experiments.typedRoutes: false`
- babel: reanimated plugin en sonda

---

## 13. Bilinen tuzaklar

| Tuzak | Çözüm |
|-------|--------|
| Çift splash ekranı | `_layout.tsx` AppSplashScreen render etme; sadece native splash |
| Eski logo görünmesi | Expo Go cache; `npx expo start -c`; icon-brand.png güncel mi kontrol |
| Metro Bundling ekranı | Expo Go JS yüklerken native splash/icon gösterir — normal |
| Windows expo-speech | postinstall patch |
| isaretImageMap boş | `node scripts/build-isaret-map.js` |
| Video .mp4.mp4 | Dosya adını düzelt |
| Paralel/L park karışıklığı | ID ve prompt negativePrompt kontrol |
| Büyük MP4 commit | Repo boyutu artar; kullanıcı bilinçli ekliyor |

---

## 14. Yapılacaklar (öncelik)

1. **Logo yeniden tasarımı** — kullanıcı mevcut v2'den memnun değil; modern/minimal konseptler sun
2. **Kalan 6 direksiyon videosu** (paralel park dahil)
3. **isaretImageMap.ts yenile** — build-isaret-map.js
4. **Eksik işaret PNG'leri** — isaretler:download
5. **Mağaza hazırlığı** — STORE.md, ekran görüntüleri, privacy URL

---

## 15. Yeni içerik ekleme

### Soru
```ts
{ id: "benzersiz", dersId, konuId, metin, secenekler, dogruIndex, aciklama,
  gorselIsaretId?, senaryoAnimId? }
```

### Konu diyagramı
KonuGorseli REGISTRY + konu dosyasında kapakGorsel/gorsel ID

### Direksiyon videosu
MP4 ekle → direksiyonVideolari.ts require aç

---

## 16. Önemli dosyalar

| Konu | Dosya |
|------|-------|
| Açılış akışı | `app/_layout.tsx` |
| Onboarding | `app/onboarding.tsx` |
| Native splash config | `app.json` |
| SVG logo | `src/components/AppLogo.tsx` |
| Video haritası | `src/data/direksiyonVideolari.ts` |
| Video prompt spec | `scripts/direksiyon-video-spec.json` |
| El değiştirme | `ANTIGRAVITY.md` (bu dosya) |

---

## 17. Kod yazarken dikkat

1. Minimal diff — gereksiz refactor yok
2. Commit — kullanıcı istemedikçe atma
3. Markdown — kullanıcı istemedikçe yeni .md oluşturma
4. Türkçe UI metinleri
5. Sağdan trafik animasyonları
6. `npm run typecheck` değişiklik sonrası
7. React Native'de statik `require()` — dinamik path çalışmaz
8. **Çift splash ekleme** — kullanıcı tek ekran istedi, AppSplashScreen'i _layout'a geri ekleme

---

## 18. Faydalı komutlar

```bash
npm run typecheck
npm run android
npx expo start -c
npm run isaretler:build && npm run isaretler:download
node scripts/build-isaret-map.js
npm run isaretler:sorular
npm run direksiyon:prompts
node scripts/make-blank-splash.mjs
node scripts/check-soru-ids.mjs
```

---

*Antigravity: Bu dosyayı okuyarak başla. Büyük değişikliklerden önce mevcut pattern'leri (`src/components/ui`, `src/data`, `src/animations`) incele.*
