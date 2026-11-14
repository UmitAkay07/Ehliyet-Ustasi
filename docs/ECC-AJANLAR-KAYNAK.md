# ECC ajanları — kaynak ve değişiklikler

`.claude/agents/` altındaki şu 6 ajan [affaan-m/ECC](https://github.com/affaan-m/ECC) deposundan alınmıştır:

| Ajan | Rol | Araçlar |
|---|---|---|
| `planner` | Uygulama planı (salt okunur) | Read, Grep, Glob |
| `typescript-reviewer` | TypeScript kod incelemesi | Read, Grep, Glob, Bash |
| `react-reviewer` | React/RN bileşen incelemesi | Read, Grep, Glob, Bash |
| `silent-failure-hunter` | Yutulan hata avı | Read, Grep, Glob, Bash |
| `tdd-guide` | Önce test yaz yönlendirmesi | Read, Write, Edit, Bash, Grep |
| `security-reviewer` | Güvenlik incelemesi | Read, Grep, Glob, Bash |

- **Kaynak commit:** `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b` (2026-11-06)
- **Lisans:** MIT, Copyright (c) 2026 Affaan Mustafa. Lisans metni: [ECC-LICENSE.txt](ECC-LICENSE.txt)

## Bizim yaptığımız değişiklikler

1. `description` satırı Türkçe ve daha ölçülü bir metinle değiştirildi. Orijinaldeki "MUST BE USED" / "PROACTIVELY" ifadeleri ajanların gereğinden sık devreye girmesine yol açabileceği için çıkarıldı.
2. Dosyaların sonuna "Bu projede geçerli ek kurallar" bölümü eklendi (CLAUDE.md kuralları, React Native bağlamı, sade Türkçe anlatım, salt okunur inceleme).
3. Satır sonları LF'ye çevrildi. Geri kalan içerik orijinalle aynıdır.

## Bilerek kurulmayanlar

ECC'nin hook'ları, skill'leri, komutları, MCP ayarları ve plugin'i **kurulmadı**. Hook'lar her araç çağrısında otomatik çalışır ve çağırdıkları script'ler denetlenmedi.

## Kaldırma

`.claude/agents/` altından ilgili `.md` dosyasını silmek yeterlidir.

## Not

Ajan dosyaları oturum açılırken yüklenir. Yeni eklenen ajanlar, açık olan bir oturumda görünmez; oturumu kapatıp yeniden açmak gerekir.
