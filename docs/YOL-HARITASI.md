# Ehliyet Ustası — Rekabet Yol Haritası

Amaç: pazardaki "çıkmış soru + deneme" kopyalarından ayrışmak. Gerekçeler rakip analizinden gelir:
rakipler çoğunlukla düz yanlış listesi, tek satırlık başarı yüzdesi ve abonelik/reklam sunuyor;
bizim güçlü yanımız direksiyon animasyonları, çevrimdışı/ücretsiz/kayıtsız olmamız ve animasyon altyapımız.

Geri dönüş noktası: `git checkout baseline-oncesi-yol-haritasi` (commit `48b3ad8`).

## Çalışma kuralları

1. Her iş kendi `feature/*` branch'inde yapılır. Bağımsız işler `main`'den açılır; bağımlı işler (aşağıda belirtilir) önceki işin branch'inden açılır.
2. Bir iş bitince: `npx tsc --noEmit` temiz olmalı, kısa rapor verilir (ne yapıldı, hangi dosyalar, nasıl doğrulandı, bilinen sınırlar), sonra commit atılır.
3. `main`'e merge yalnızca kullanıcı onayıyla yapılır. Hiçbir şey push edilmez.
4. Store değişiklikleri **yalnızca eklemelidir** (`useAppStore.ts`): mevcut alanların şekli değişmez, eski kullanıcı verisi bozulmaz.
5. CLAUDE.md kuralları geçerli: Türkçe isimlendirme, `useTheme()` ile renk, Nunito, `@/` alias, named export.
6. Native modül gerektiren işler (OTA, widget) yeni build ve `versionCode` artışı ister; bu açıkça belirtilir.
7. Soru/mevzuat içeriği (ceza tutarı, ücret, yönetmelik) resmi kaynaktan doğrulanmadan uygulamaya girmez.

Durum simgeleri: ⬜ başlanmadı · 🟡 kodlandı, telefonda denenmedi · ✅ telefonda denendi ve onaylandı.
Karar bekleyenler, kritik uyarılar ve senin yapacakların: [SENIN-NOTLARIN.md](SENIN-NOTLARIN.md).

## Sprint 1 — Çekirdek (ana ekranı ve öğrenme motorunu değiştirir)

| # | Branch | İş | Bağımlılık | Durum |
|---|---|---|---|---|
| 1 | `feature/ota-guncelleme` | `expo-updates` ile mağazasız içerik güncellemesi (kanal, runtimeVersion) | — | 🟡 |
| 2 | `feature/akilli-tekrar` | Gerçek aralıklı tekrar (Leitner), "Bugünkü tekrar" kuyruğu ve ekranı | — | 🟡 |
| 3 | `feature/gecme-olasiligi` | Konu bazlı doğruluk + sınav dağılımından "geçme olasılığı" ve zayıf nokta haritası | 2'den açılır | 🟡 |
| 4 | `feature/gunluk-plan` | Sınav tarihine ve zayıflıklara göre "Bugünün planı" | 3'ten açılır | 🟡 |

Kabul ölçütleri:
- **1:** `app.json` ve `eas.json` doğru; `tsc` temiz; native build gerektiği not edilir.
- **2:** Yanlış cevaplanan soru 1-3-7-14 gün aralıklarıyla geri gelir (4 doğru tekrarda öğrenilir, sınav yakınsa kısalır, en az 12 saat bekleme); hata defteri sayısı ve "şimdi tekrar" sayısı ayrı gösterilir; eski `hatalar` kayıtları kayıpsız çalışır; saf mantık node ile test edilir.
- **3:** Ana ekran "Genel hazırlık %"ı yerine tahmini geçme ihtimalini gösterir; az veriyle "tahmin için daha fazla soru çöz" der (yanıltıcı kesinlik yok); en zayıf konu tek dokunuşla çalışılır.
- **4:** Plan eldeki veriden türetilir (yeni kalıcı state yok); sınav tarihi yoksa makul varsayılanla çalışır.

## Sprint 2 — İçerik derinliği

| # | Branch | İş | Durum |
|---|---|---|---|
| 5 | `feature/animasyonlu-sorular` | Veri güdümlü senaryo şablonuyla animasyonlu soru sayısını 20'den 100+'a çıkarma | 🟡 |
| 6 | `feature/tuzak-notlari` | Soruya "neden diğer şıklar yanlış" ve akılda kalıcı ipucu alanları + arayüz (içerik çevrimdışı üretilir, elle doğrulanır) | 🟡 |

## Sprint 3 — Vitrin ve bağlılık

| # | Branch | İş | Durum |
|---|---|---|---|
| 7 | `feature/direksiyon-simulatoru` | Kullanıcının 2D aracı sürdüğü, hata kriterleriyle puanlanan park oyunu | 🟡 |
| 8 | `feature/android-widget` | Günün sorusu / kalan gün / bugünkü tekrar widget'ı (native build gerekir) | 🟡 |
| 9 | `feature/oyunlastirma` | XP, seviye, rozet, seri dondurma, paylaşım kartı (backend'siz) | 🟡 |
| 10 | `feature/sinav-gerceklik` | Soru ızgarası, işaretle, sınav sonu konu bazlı kayıp analizi | 🟡 |
| 11 | `feature/arama-favori` | Global arama, favori soru | 🟡 |
| 12 | `feature/yol-haritasi-rehberi` | Ehliyet süreci kontrol listesi (içerik doğrulaması şart) | 🟡 |

## Mağaza iddiası uyarısı

Mağaza açıklaması "Akıllı Hata Defteri" diyor. İş 2 bitene kadar bu iddia kodla tam örtüşmüyor.

## Gerçekleşen durum (2026-11-10)

12 işin hepsi kodlandı, ayrı branch'lerde ve hepsi `integration/tum-ozellikler` branch'inde birleşik (`tsc` temiz, 149 test geçiyor). Hiçbiri telefonda denenmedi, hiçbiri `main`'e alınmadı.

Plandan sapmalar, karar bekleyenler ve kritik uyarılar: [SENIN-NOTLARIN.md](SENIN-NOTLARIN.md). Telefonda deneme sırası: [TELEFON-TEST-LISTESI.md](TELEFON-TEST-LISTESI.md).
