# Direksiyon dersi videoları

Bu klasöre AI ile üretilmiş MP4 dosyalarını ekleyin.

## Dosya adları

| Dosya | Ders |
|-------|------|
| `dr-temel-kumanda.mp4` | Araç Tanıma ve Temel Kumandalar |
| `dr-paralel-park.mp4` | Paralel Park |
| `dr-l-park.mp4` | L (Dik) Park |
| `dr-rampa-kalkis.mp4` | Rampa Kalkışı |
| `dr-u-donusu.mp4` | U Dönüşü |
| `dr-ani-fren.mp4` | Ani Fren |
| `dr-sinyal-ayna.mp4` | Sinyal, Ayna ve Şerit Değiştirme |
| `dr-geri-manevra.mp4` | Geri Manevra |

## Teknik gereksinimler

- Format: MP4 (H.264)
- Çözünürlük: 1280×720
- Süre: 35–60 saniye
- Ses: Sessiz veya hafif arka plan (uygulama varsayılan sessiz oynatır)

## Üretim

Detaylı AI promptları ve MEB kriterleri: `scripts/direksiyon-video-spec.json`

Prompt listesi üretmek için:

```bash
npm run direksiyon:prompts
```

Video eklendikten sonra `src/data/direksiyonVideolari.ts` içindeki ilgili `require` satırlarının yorumunu kaldırın.
