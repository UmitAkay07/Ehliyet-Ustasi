# Tuzak notları incelemesi

20 not onay bekliyor. Her notu resmî kaynakla karşılaştırıp doğruysa onaylayın:

`npm run notlar:onayla -- <kimlik> ...` veya `npm run notlar:onayla -- --hepsi`

## sen-01 (onay bekliyor)

**Soru:** Senaryoda yeşil araç kavşağa yaklaşırken sağdan gelen kırmızı araç da kavşağa giriyor. Yeşil araç ne yapmalıdır?

**Doğru cevap:** Yavaşlayıp geçiş hakkına uymalı / gerekirse durmalı

- **İpucu:** İşaret ve ışık yoksa sağdan gelene yol ver; emin değilsen yavaşla, gerekirse dur.
- **Şık 0 (Hızlanıp önce geçmeli) neden yanlış:** Hızlanmak çarpışma riskini artırır; geçiş hakkı olanın önüne atlanmaz.
- **Şık 1 (Korna çalıp geçmeli) neden yanlış:** Korna geçiş hakkı vermez; hak sahibi araca yol verilmesi gerekir.
- **Şık 3 (Sola dönerek kaçmalı) neden yanlış:** Ani yön değiştirmek yeni bir çarpışma riski yaratır; çözüm yavaşlamak veya durmaktır.

- [ ] Doğruladım

## sen-02 (onay bekliyor)

**Soru:** Senaryoda yeşil araç öndeki aracı sollamaya çalışıyor. Devamlı çizgi / yasak bölgede sollama hakkında doğru olan hangisidir?

**Doğru cevap:** Yasak yerde sollama yapılmaz

- **İpucu:** Devamlı çizgi, kavşak, köprü, viraj: sollama yok.
- **Şık 0 (Tehlikeli değilse her yerde sollanabilir) neden yanlış:** Yasak yerlerde (devamlı çizgi, kavşak, köprü, viraj) tehlike görünmese de sollama yapılmaz.
- **Şık 2 (Sadece gece yasaktır) neden yanlış:** Yasak, günün saatine bağlı değildir; yasak yer her zaman yasaktır.
- **Şık 3 (Sadece otobüs yollarında yasaktır) neden yanlış:** Sollama yasağı belirli bir yol türüne değil, devamlı çizgi, kavşak, köprü, viraj gibi yerlere bağlıdır.

- [ ] Doğruladım

## sen-03 (onay bekliyor)

**Soru:** Senaryoda yeşil araç turuncu yasak alana (ör. durak / engelli / kavşak yakını) yanaşıyor. Doğru davranış nedir?

**Doğru cevap:** Yasak alanda park / duraklama yapılmaz

- **İpucu:** Yasak alanda ne park ne duraklama; ceza ve çekici riski var.
- **Şık 0 (Kısa süre park edilebilir) neden yanlış:** Yasak alanda süre fark etmez; kısa süreli park da ihlaldir.
- **Şık 1 (Sadece gece park edilebilir) neden yanlış:** Yasak alanda park, günün saatine bakılmadan ihlaldir.
- **Şık 3 (Korna çalarak park edilir) neden yanlış:** Korna park hakkı vermez; yasak alanda park kornayla meşru olmaz.

- [ ] Doğruladım

## sen-04 (onay bekliyor)

**Soru:** Senaryoda yaya geçidinde yaya geçerken yeşil araç yaklaşıyor. Sürücü ne yapmalıdır?

**Doğru cevap:** Yayaya yol vermeli / gerekirse durmalı

- **İpucu:** Yaya geçidinde yaya önce; gerekirse dur.
- **Şık 0 (Hızlanıp geçitten önce geçmeli) neden yanlış:** Yayadan önce geçmek için hızlanmak yaya geçidinde ağır bir ihlal ve ciddi kaza riskidir.
- **Şık 2 (Sadece korna çalmalı) neden yanlış:** Korna, yayaya yol vermenin yerini tutmaz; geçitteki yayaya yol vermek zorunludur.
- **Şık 3 (Şerit değiştirip devam etmeli) neden yanlış:** Şerit değiştirip devam etmek yayaya yol vermek değildir; yaya geçerken geçide girilmez.

- [ ] Doğruladım

## sen-05 (onay bekliyor)

**Soru:** Senaryoda yeşil araç şerit değiştirirken diğer araçlara yaklaşıyor. Doğru sıra hangisidir?

**Doğru cevap:** Ayna — sinyal — omuz kontrolü — uygun boşlukta geç

- **İpucu:** Sırayla: ayna, sinyal, omuz kontrolü, güvenli boşlukta geç.
- **Şık 0 (Direkt şerit değiştir, sonra sinyal ver) neden yanlış:** Sinyal manevradan önce verilir; önce şerit değiştirip sonra sinyal vermek diğer sürücülere haber vermez.
- **Şık 2 (Sadece korna yeterli) neden yanlış:** Korna, sinyalin ve kör nokta kontrolünün yerini tutmaz.
- **Şık 3 (Hızlanarak zorla gir) neden yanlış:** Hızlanıp zorla girmek, diğer araçlara tepki süresi bırakmaz ve kaza riski doğurur.

- [ ] Doğruladım

## sen-06 (onay bekliyor)

**Soru:** Kavşak senaryosunda iki araç aynı anda yaklaşıyor. Genel güvenlik ilkesi nedir?

**Doğru cevap:** İşaret, ışık ve geçiş hakkı kurallarına uy; şüphede yavaşla

- **İpucu:** Önce işaret ve ışık, sonra geçiş hakkı; şüphede yavaşla.
- **Şık 0 (Kim önce görürse o geçer) neden yanlış:** Geçiş, kimin önce gördüğüne değil, işaret, ışık ve geçiş hakkı kurallarına göre belirlenir.
- **Şık 1 (Her zaman sağdakine yol verilir, istisnasız) neden yanlış:** 'İstisnasız' ifadesi yanlıştır: ışık ve levhalar sağdan gelen kuralının önüne geçer.
- **Şık 3 (Büyük araç her zaman önceliklidir) neden yanlış:** Aracın büyüklüğü geçiş hakkı vermez; öncelik kurallarla belirlenir.

- [ ] Doğruladım

## sen-07 (onay bekliyor)

**Soru:** Sollama senaryosunda karşı yönden veya önden risk varsa sürücü ne yapmalıdır?

**Doğru cevap:** Sollamadan vazgeçip güvenli şeritte kalmalıdır

- **İpucu:** Sollama güvenli değilse vazgeç; yarım kalan sollama kaza yapar.
- **Şık 0 (Sollamayı tamamlamak zorundadır) neden yanlış:** Sollama güvenli değilse vazgeçilir; tamamlamak için tehlikeye girilmez.
- **Şık 2 (Far yakıp devam etmelidir) neden yanlış:** Far yakmak karşıdan gelen aracın varlığını değiştirmez; tehlike sürer.
- **Şık 3 (Acil şeride geçmelidir) neden yanlış:** Acil durum şeridi sollama için kullanılmaz.

- [ ] Doğruladım

## sen-08 (onay bekliyor)

**Soru:** Yaya geçidi senaryosunda yaya henüz geçide basmamış ama geçmek üzere görünüyor. En doğru yaklaşım?

**Doğru cevap:** Yavaşlamak, hazır olmak ve gerekirse durmak

- **İpucu:** Yaya geçmek üzereyse yavaşla, hazır ol, gerekirse dur.
- **Şık 0 (Hızlanıp önce geçmek) neden yanlış:** Hızlanıp yayanın önüne geçmek onu tehlikeye atar; öncelik yayadadır.
- **Şık 2 (Korna ile uyarmak yeterli) neden yanlış:** Yalnızca kornayla uyarmak yayayı korumaz; hızı düşürmek ve durmaya hazır olmak gerekir.
- **Şık 3 (Sadece ışık yoksa umursamamak) neden yanlış:** Işık olmaması, yayaya karşı dikkat yükümlülüğünü kaldırmaz.

- [ ] Doğruladım

## sen-09 (onay bekliyor)

**Soru:** Kavşak senaryosunda yeşil araç ana yolda, kırmızı araç tali yoldan çıkıyor. Tali yoldaki sürücü ne yapmalıdır?

**Doğru cevap:** Ana yoldaki araçlara yol vermeli

- **İpucu:** Tali yoldan ana yola çıkarken ana yoldakine yol ver.
- **Şık 0 (Hızlanıp önce geçmeli) neden yanlış:** Tali yoldaki sürücü, ana yoldaki araçlardan önce geçmeye çalışmaz; yol verir.
- **Şık 2 (Korna çalmalı) neden yanlış:** Korna geçiş hakkı kazandırmaz.
- **Şık 3 (Selektör yapmalı) neden yanlış:** Selektör geçiş hakkı kazandırmaz; ana yoldaki araçlara yol verilir.

- [ ] Doğruladım

## sen-10 (onay bekliyor)

**Soru:** Sollama senaryosunda karşı şeritten araç yaklaşıyor. Yeşil araç sollamaya devam ederse ne olabilir?

**Doğru cevap:** Karşıdan çarpışma riski oluşur

- **İpucu:** Karşıdan araç varken sollama: kafa kafaya çarpışma riski.
- **Şık 0 (Ceza puanı düşer) neden yanlış:** Tehlikeli sollama bir kazanç değil kural ihlalidir; asıl risk karşıdan çarpışmadır.
- **Şık 2 (Yakıt tasarrufu sağlanır) neden yanlış:** Sollamanın amacı yakıt tasarrufu değildir; riskli sollama kazaya yol açar.
- **Şık 3 (Park yasağı uygulanır) neden yanlış:** Park yasağı, sollamayla ilgili bir sonuç değildir.

- [ ] Doğruladım

## sen-11 (onay bekliyor)

**Soru:** Park yasağı senaryosunda sürücü kavşak yakınına park etmeye çalışıyor. Doğru davranış?

**Doğru cevap:** Kavşak yakınında park etmemeli, uygun yere gitmeli

- **İpucu:** Kavşak, durak ve yaya geçidi yakınında park etme.
- **Şık 0 (Flaşör yakıp park edebilir) neden yanlış:** Flaşör (dörtlü) yasak yerde park etme izni vermez.
- **Şık 2 (5 dakikadan kısa kalırsa serbest) neden yanlış:** Yasak yerde kısa süreli park da ihlaldir; böyle bir muafiyet yoktur.
- **Şık 3 (Gece park serbesttir) neden yanlış:** Kavşak yakınındaki yasak gece de geçerlidir; saate bağlı bir serbestlik yoktur.

- [ ] Doğruladım

## sen-12 (onay bekliyor)

**Soru:** Yaya geçidi senaryosunda yaya geçitte yürürken araç hızlanıyor. Bu davranış?

**Doğru cevap:** Kural ihlali; yayaya yol verilmeli

- **İpucu:** Yaya geçidinde yayaya mutlaka yol ver; hızlanmak ağır ihlaldir.
- **Şık 0 (Uygun, yaya hızlı yürüyorsa) neden yanlış:** Yayanın hızı, hızlanmak için izin vermez; geçitteki yayaya yol verilir.
- **Şık 2 (Sadece gece yasaktır) neden yanlış:** Yayaya yol verme yükümlülüğü gece gündüz geçerlidir.
- **Şık 3 (Korna yeterlidir) neden yanlış:** Korna, yayaya yol vermenin yerini tutmaz.

- [ ] Doğruladım

## sen-13 (onay bekliyor)

**Soru:** Şerit değişim senaryosunda sürücü aynayı kontrol etmeden geçiş yapıyor. Risk nedir?

**Doğru cevap:** Kör noktadaki araca çarpma riski

- **İpucu:** Ayna ve omuz kontrolü yapmazsan kör noktadaki aracı göremezsin.
- **Şık 0 (Yakıt artar) neden yanlış:** Kontrolsüz şerit değiştirmenin riski yakıt değil, kör noktadaki araca çarpmaktır.
- **Şık 2 (Ceza puanı düşer) neden yanlış:** Kontrolsüz manevra bir kazanç getirmez; asıl risk kör noktadaki araca çarpmaktır.
- **Şık 3 (Park yasağı) neden yanlış:** Park yasağı, şerit değiştirmeyle ilgili bir risk değildir.

- [ ] Doğruladım

## sen-14 (onay bekliyor)

**Soru:** Dönel kavşak senaryosunda ada etrafında dönme kuralı geçerliyse sürücü ne yapmalı?

**Doğru cevap:** Adanın etrafında belirtilen yönde dönmeli

- **İpucu:** Dönel kavşakta adanın etrafında belirtilen yönde dön; ters yöne gitme.
- **Şık 0 (Düz geçmeli) neden yanlış:** Adanın üzerinden düz geçilmez; adanın etrafından dolaşılır.
- **Şık 2 (Durup geri gitmeli) neden yanlış:** Dönel kavşakta geri gidilmez; akışa uyulur.
- **Şık 3 (Sollama yapmalı) neden yanlış:** Dönel kavşakta amaç sollama değil, akışa uyup adanın etrafında dönmektir.

- [ ] Doğruladım

## sen-15 (onay bekliyor)

**Soru:** Devamlı çizgi olan bölgede sollama yapmak neden yasaktır?

**Doğru cevap:** Karşı yönden görüş kısıtlı, çarpışma riski yüksek

- **İpucu:** Devamlı çizgi, karşıdan geleni göremediğin tehlikeli yerlere çizilir.
- **Şık 0 (Yakıt israfı) neden yanlış:** Yasağın nedeni yakıt değil, karşıdan gelen aracı göremeyip çarpışma riskidir.
- **Şık 2 (Lastik aşınır) neden yanlış:** Yasağın nedeni lastik aşınması değil, çarpışma riskidir.
- **Şık 3 (Sadece gece yasaktır) neden yanlış:** Devamlı çizgide sollama yasağı gece gündüz geçerlidir.

- [ ] Doğruladım

## sen-16 (onay bekliyor)

**Soru:** Engelli park yerine izinsiz park eden sürücü hangi sonuçla karşılaşabilir?

**Doğru cevap:** Para cezası ve araç çekimi

- **İpucu:** Engelli park yerine izinsiz park: para cezası ve araç çekimi.
- **Şık 0 (Teşekkür edilir) neden yanlış:** İzinsiz park teşekkürle değil, yaptırımla karşılanır.
- **Şık 2 (Hız sınırı artar) neden yanlış:** Park ihlalinin hız sınırıyla ilgisi yoktur.
- **Şık 3 (Ceza puanı düşer) neden yanlış:** İhlal ödüllendirilmez; sonuç para cezası ve çekim gibi idari yaptırımdır.

- [ ] Doğruladım

## sen-17 (onay bekliyor)

**Soru:** Okul geçidi yakınında çocuklar yola çıkıyorsa sürücünün ilk tepkisi ne olmalıdır?

**Doğru cevap:** Hızı düşürmek ve durmaya hazır olmak

- **İpucu:** Okul geçidinde hızı düşür, çocuklara mutlak öncelik ver.
- **Şık 0 (Korna çalıp hızlanmak) neden yanlış:** Hızlanmak çocuklar için ölümcül risk yaratır; hız düşürülür.
- **Şık 2 (Sollama yapmak) neden yanlış:** Çocukların yola çıkabildiği bir yerde sollama için hızlanmak güvenli değildir.
- **Şık 3 (Selektör yapmak) neden yanlış:** Selektör çocukları durdurmaz; sürücü hızını düşürüp durmaya hazır olmalıdır.

- [ ] Doğruladım

## sen-18 (onay bekliyor)

**Soru:** Şerit değiştirirken sinyal vermenin temel amacı nedir?

**Doğru cevap:** Diğer sürücüleri manevradan haberdar etmek

- **İpucu:** Sinyal, niyetini diğer sürücülere manevradan önce bildirir.
- **Şık 1 (Hız artırmak) neden yanlış:** Sinyalin amacı hız artırmak değil, niyeti bildirmektir.
- **Şık 2 (Park etmek) neden yanlış:** Sinyalin temel amacı park etmek değil, manevrayı diğerlerine bildirmektir.
- **Şık 3 (Far yakmak) neden yanlış:** Far aydınlatma içindir; manevra niyetini sinyal bildirir.

- [ ] Doğruladım

## sen-19 (onay bekliyor)

**Soru:** Dur levhası olan kavşakta yeşil araç ne yapmalıdır?

**Doğru cevap:** Tam durup yol verdikten sonra geçmeli

- **İpucu:** DUR levhasında tam dur; yol ver; güvenliyse geç.
- **Şık 0 (Yavaşlayıp geçmeli) neden yanlış:** DUR levhasında yavaşlamak yetmez; tam durmak gerekir.
- **Şık 2 (Korna çalmalı) neden yanlış:** Korna, DUR levhasının gereğini yerine getirmez; tam durulur.
- **Şık 3 (Selektör yeterli) neden yanlış:** Selektör durmanın yerini tutmaz; tam durmak şarttır.

- [ ] Doğruladım

## sen-20 (onay bekliyor)

**Soru:** Sollama sonrası hangi davranış doğrudur?

**Doğru cevap:** Güvenli mesafe bırakıp sağ şeride dönmek

- **İpucu:** Sollamadan sonra güvenli mesafe bırak, sinyal ver, sağ şeride dön.
- **Şık 0 (Sol şeritte kalmak) neden yanlış:** Sollama bitince sağ şeride dönülür; sollama şeridinde kalınmaz.
- **Şık 2 (Hızlanmaya devam etmek) neden yanlış:** Hızlanmaya devam etmek yerine güvenli mesafe bırakıp sağ şeride dönmek gerekir.
- **Şık 3 (Selektör açık bırakmak) neden yanlış:** Selektör sollama sonrası bir gereklilik değildir; sinyal kapatılıp sağ şeride güvenle dönülür.

- [ ] Doğruladım

