# Direksiyon Dersi — AI Video Üretim Promptları

MEB direksiyon sınav müfredatına uygun. 8 ders.

## Genel kurallar

- **Kamera:** Kuş bakışı 45° veya sabit yan açı; eğitim amaçlı, gerçekçi ama sade
- **Araç:** Beyaz hatchback eğitim aracı, sol direksiyon, Türkiye sağdan trafik
- **Format:** MP4 H.264, 1280x720, 24fps, sessiz veya hafif arka plan
- **Kaçınılacak:** Yanlış şerit, sol şerit kullanımı (Türkiye dışı), çarpışma, dramatik kaza, bulanık levha, yanlış park çizgisi ihlali

---

## Araç Tanıma ve Temel Kumandalar

- **ID:** `dr-temel-kumanda`
- **Dosya:** `dr-temel-kumanda.mp4`
- **Süre:** ~45 sn
- **Sahne:** Boş eğitim sahası, düz asfalt, şerit çizgileri

### Adımlar (videoda sırayla gösterilmeli)
1. Sürücü koltuğa oturur, emniyet kemeri takılır
2. İç ve dış aynalar ayarlanır
3. Debriyaj basılı, 1. vites, el freni indirilir
4. Kavrama noktasında yavaş kalkış, düz ilerleme

### Sınav kontrol listesi
- [ ] Emniyet kemeri
- [ ] Ayna ayarı
- [ ] Yumuşak kalkış
- [ ] Debriyaj-gaz uyumu

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Professional driver education video, top-down 45 degree angle, empty Turkish driving school practice lot, white training car with L plate, driver adjusts mirrors and seat belt, clutch bite point start, smooth forward movement in first gear, clear daylight, instructional clean style, no text overlay, realistic asphalt markings, right-hand traffic Turkey
```

---

## Paralel Park

- **ID:** `dr-paralel-park`
- **Dosya:** `dr-paralel-park.mp4`
- **Süre:** ~60 sn
- **Sahne:** İki gri parklı araç arası boşluk, kaldırım sağda, sarı park çizgisi

### Adımlar (videoda sırayla gösterilmeli)
1. Öndeki araca paralel hizalanma (~50 cm)
2. Geri manevra, sağa tam direksiyon
3. 45° açıyla boşluğa giriş
4. Sola kırarak önü içeri alma, kaldırıma paralel bitiş

### Sınav kontrol listesi
- [ ] 50 cm kaldırım mesafesi
- [ ] En fazla 2 hamle
- [ ] Dubaya çarpmama
- [ ] Paralel bitiş

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Driver exam parallel parking tutorial video, bird eye view, white car parks between two gray parked cars beside curb, reverse maneuver step by step, steering wheel turns clearly visible through roof cutaway style OR clear car path overlay, yellow parking lines, maximum 2 maneuver feel, car ends parallel within 50cm of curb, Turkish driving test standard, instructional, no collision, clean sunny day
```

---

## L (Dik) Park

- **ID:** `dr-l-park`
- **Dosya:** `dr-l-park.mp4`
- **Süre:** ~55 sn
- **Sahne:** Sarı çizgili dik park cebi, turuncu dubalar köşede

### Adımlar (videoda sırayla gösterilmeli)
1. Cebin yanından paralel ilerleme
2. Omuz hizasında durma, geri vites
3. Direksiyon cebhe yönüne tam kırılır
4. Cebe düzgün giriş, çizgilerle paralel ortalama

### Sınav kontrol listesi
- [ ] Çizgi ihlali yok
- [ ] Hamle sınırı
- [ ] Cebe ortalı park
- [ ] El freni sonrası

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Driving test perpendicular L parking video, overhead instructional view, white car backs into marked perpendicular parking bay with yellow lines and orange cones, reverse into slot smoothly, wheels stay inside lines, centered in bay, Turkish exam course style, slow controlled movement, educational animation-like clarity
```

---

## Rampa (Yokuş) Kalkışı

- **ID:** `dr-rampa-kalkis`
- **Dosya:** `dr-rampa-kalkis.mp4`
- **Süre:** ~40 sn
- **Sahne:** Eğimli rampa, yol işareti eğim göstergesi

### Adımlar (videoda sırayla gösterilmeli)
1. Yokuşta duruş, fren ve el freni
2. 1. vites, debriyaj kavrama noktası
3. Hafif gaz, el freni kademeli indirme
4. Geri kaçırmadan ileri kalkış

### Sınav kontrol listesi
- [ ] 50 cm geri kaçırma sınırı
- [ ] El freni koordinasyonu
- [ ] Kavrama noktası
- [ ] Stop etmeden kalkış

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Hill start driving lesson video, side angle showing incline ramp, white manual car on slope, handbrake release coordinated with clutch bite and throttle, car moves forward without rolling back more than few centimeters, Turkish driving school ramp, instructional clear demonstration, daylight
```

---

## U Dönüşü

- **ID:** `dr-u-donusu`
- **Dosya:** `dr-u-donusu.mp4`
- **Süre:** ~45 sn
- **Sahne:** Geniş iki yönlü yol, kesikli orta çizgi, görüş açık

### Adımlar (videoda sırayla gösterilmeli)
1. Sinyal ve ayna kontrolü
2. Yavaşlama, sola tam direksiyon
3. Karşı şeride güvenli dönüş
4. Gerekirse tek geri-ileri düzeltme

### Sınav kontrol listesi
- [ ] Sinyal
- [ ] Karşı trafik kontrolü
- [ ] Doğru şerit
- [ ] Yasak yerde dönmeme

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
U-turn driving exam video, wide road with dashed center line, white car signals left, checks mirrors, performs safe U-turn when no oncoming traffic, returns to opposite direction in correct lane, right-hand traffic Turkey, instructional overhead angle, smooth controlled turn
```

---

## Ani (Acil) Fren

- **ID:** `dr-ani-fren`
- **Dosya:** `dr-ani-fren.mp4`
- **Süre:** ~35 sn
- **Sahne:** Düz yol, önde koni veya yaya silüeti (eğitim)

### Adımlar (videoda sırayla gösterilmeli)
1. Normal sürüş, ani engel
2. Fren pedalına kararlı basış, ABS titreşimi
3. Araç kontrollü duruş, direksiyon hâkimiyeti
4. Dörtlü flaşör

### Sınav kontrol listesi
- [ ] ABS'de ayak çekilmez
- [ ] Direksiyon kontrolü
- [ ] Takip mesafesi
- [ ] Dörtlü flaşör

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Emergency braking driver training video, car approaches obstacle cone on straight road, firm brake application, ABS activation subtle vibration, car stops in controlled distance, hazard lights on after stop, instructional side-front angle, no crash, Turkish driving school practice
```

---

## Sinyal, Ayna ve Şerit Değiştirme

- **ID:** `dr-sinyal-ayna`
- **Dosya:** `dr-sinyal-ayna.mp4`
- **Süre:** ~40 sn
- **Sahne:** İki şeritli düz yol

### Adımlar (videoda sırayla gösterilmeli)
1. Sinyal yakma (3+ saniye)
2. İç ve dış ayna kontrolü
3. Omuz üstü kör nokta bakışı
4. Yumuşak şerit değişimi, sinyal kapatma

### Sınav kontrol listesi
- [ ] Sinyal önceliği
- [ ] Kör nokta
- [ ] Yumuşak geçiş
- [ ] Sinyal kapatma

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Lane change driver education video, dual lane road, white car uses turn signal before moving left, mirror check and shoulder check clearly shown with subtle driver head movement, smooth lane change into gap, signal off after merge, bird eye instructional view, Turkey right-hand traffic
```

---

## Geri Manevra

- **ID:** `dr-geri-manevra`
- **Dosya:** `dr-geri-manevra.mp4`
- **Süre:** ~45 sn
- **Sahne:** Düz park alanı, arka hedef çizgisi

### Adımlar (videoda sırayla gösterilmeli)
1. Durma, çevre ve sinyal kontrolü
2. Geri vites, omuz üstü bakış
3. Çok yavaş geri hareket, düz hat
4. Hedefte duruş, boş vites, el freni

### Sınav kontrol listesi
- [ ] Omuz kontrolü
- [ ] Düz hat
- [ ] Yavaş hız
- [ ] Çevre kontrolü

### AI Prompt (İngilizce — Runway / Kling / Pika)
```
Reverse driving maneuver training video, white car reverses slowly in straight line on driving school lot, driver looks over shoulder, mirrors as secondary, constant slow speed using clutch control, stops at marked line, handbrake on, instructional overhead angle, no swerving left or right
```

---
