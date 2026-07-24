import type { Soru } from "@/types";

/** Animasyonlu senaryo soruları — kuş bakışı hareket ile durum analizi */
export const SENARYO_SORULARI: Soru[] = [
  {
    id: "sen-01",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin:
      "Senaryoda yeşil araç kavşağa yaklaşırken sağdan gelen kırmızı araç da kavşağa giriyor. Yeşil araç ne yapmalıdır?",
    secenekler: [
      "Hızlanıp önce geçmeli",
      "Korna çalıp geçmeli",
      "Yavaşlayıp geçiş hakkına uymalı / gerekirse durmalı",
      "Sola dönerek kaçmalı",
    ],
    dogruIndex: 2,
    aciklama:
      "Kavşaklarda geçiş hakkı kuralları ve dikkat esastır. Çarpışma riski varsa yavaşlamak veya durmak gerekir.",
    zorluk: "orta",

  },
  {
    id: "sen-02",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Senaryoda yeşil araç öndeki aracı sollamaya çalışıyor. Devamlı çizgi / yasak bölgede sollama hakkında doğru olan hangisidir?",
    secenekler: [
      "Tehlikeli değilse her yerde sollanabilir",
      "Yasak yerde sollama yapılmaz",
      "Sadece gece yasaktır",
      "Sadece otobüs yollarında yasaktır",
    ],
    dogruIndex: 1,
    aciklama: "Devamlı çizgi, kavşak, köprü, viraj gibi yasak yerlerde sollama yapılmaz.",
    zorluk: "kolay",

  },
  {
    id: "sen-03",
    dersId: "trafik",
    konuId: "duraklama-park",
    metin: "Senaryoda yeşil araç turuncu yasak alana (ör. durak / engelli / kavşak yakını) yanaşıyor. Doğru davranış nedir?",
    secenekler: [
      "Kısa süre park edilebilir",
      "Sadece gece park edilebilir",
      "Yasak alanda park / duraklama yapılmaz",
      "Korna çalarak park edilir",
    ],
    dogruIndex: 2,
    aciklama: "Yasak park alanlarında duraklama veya park kural ihlalidir; ceza ve çekici riski vardır.",
    zorluk: "kolay",

  },
  {
    id: "sen-04",
    dersId: "trafik",
    konuId: "yaya-gecit",
    metin: "Senaryoda yaya geçidinde yaya geçerken yeşil araç yaklaşıyor. Sürücü ne yapmalıdır?",
    secenekler: [
      "Hızlanıp geçitten önce geçmeli",
      "Yayaya yol vermeli / gerekirse durmalı",
      "Sadece korna çalmalı",
      "Şerit değiştirip devam etmeli",
    ],
    dogruIndex: 1,
    aciklama: "Yaya geçidinde yayaya öncelik verilir; geçitteki yayaya yol vermek zorunludur.",
    zorluk: "kolay",

  },
  {
    id: "sen-05",
    dersId: "trafik",
    konuId: "aydinlatma-sinyal",
    metin: "Senaryoda yeşil araç şerit değiştirirken diğer araçlara yaklaşıyor. Doğru sıra hangisidir?",
    secenekler: [
      "Direkt şerit değiştir, sonra sinyal ver",
      "Ayna — sinyal — omuz kontrolü — uygun boşlukta geç",
      "Sadece korna yeterli",
      "Hızlanarak zorla gir",
    ],
    dogruIndex: 1,
    aciklama: "Şerit değişiminde ayna, sinyal, kör nokta (omuz) kontrolü ve güvenli boşluk şarttır.",
    zorluk: "orta",

  },
  {
    id: "sen-06",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Kavşak senaryosunda iki araç aynı anda yaklaşıyor. Genel güvenlik ilkesi nedir?",
    secenekler: [
      "Kim önce görürse o geçer",
      "Her zaman sağdakine yol verilir, istisnasız",
      "İşaret, ışık ve geçiş hakkı kurallarına uy; şüphede yavaşla",
      "Büyük araç her zaman önceliklidir",
    ],
    dogruIndex: 2,
    aciklama: "Işık ve levhalar önceliklidir; kural net değilse veya risk varsa yavaşlamak en güvenli yaklaşımdır.",
    zorluk: "orta",

  },
  {
    id: "sen-07",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Sollama senaryosunda karşı yönden veya önden risk varsa sürücü ne yapmalıdır?",
    secenekler: [
      "Sollamayı tamamlamak zorundadır",
      "Sollamadan vazgeçip güvenli şeritte kalmalıdır",
      "Far yakıp devam etmelidir",
      "Acil şeride geçmelidir",
    ],
    dogruIndex: 1,
    aciklama: "Sollama güvenli değilse vazgeçilir; yarım kalan tehlikeli sollama kazaya açıktır.",
    zorluk: "orta",

  },
  {
    id: "sen-08",
    dersId: "trafik",
    konuId: "yaya-gecit",
    metin: "Yaya geçidi senaryosunda yaya henüz geçide basmamış ama geçmek üzere görünüyor. En doğru yaklaşım?",
    secenekler: [
      "Hızlanıp önce geçmek",
      "Yavaşlamak, hazır olmak ve gerekirse durmak",
      "Korna ile uyarmak yeterli",
      "Sadece ışık yoksa umursamamak",
    ],
    dogruIndex: 1,
    aciklama: "Geçitteki veya geçmek üzere olan yayaya karşı dikkat ve öncelik esastır.",
    zorluk: "orta",

  },
  {
    id: "sen-09",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Kavşak senaryosunda yeşil araç ana yolda, kırmızı araç tali yoldan çıkıyor. Tali yoldaki sürücü ne yapmalıdır?",
    secenekler: [
      "Hızlanıp önce geçmeli",
      "Ana yoldaki araçlara yol vermeli",
      "Korna çalmalı",
      "Selektör yapmalı",
    ],
    dogruIndex: 1,
    aciklama: "Tali yoldan ana yola çıkarken ana yoldaki araçlara yol verilir.",
    zorluk: "kolay",

  },
  {
    id: "sen-10",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Sollama senaryosunda karşı şeritten araç yaklaşıyor. Yeşil araç sollamaya devam ederse ne olabilir?",
    secenekler: [
      "Ceza puanı düşer",
      "Karşıdan çarpışma riski oluşur",
      "Yakıt tasarrufu sağlanır",
      "Park yasağı uygulanır",
    ],
    dogruIndex: 1,
    aciklama: "Karşıdan araç varken sollama yapmak ölümcül kafa kafaya çarpışma riski taşır.",
    zorluk: "orta",

  },
  {
    id: "sen-11",
    dersId: "trafik",
    konuId: "duraklama-park",
    metin: "Park yasağı senaryosunda sürücü kavşak yakınına park etmeye çalışıyor. Doğru davranış?",
    secenekler: [
      "Flaşör yakıp park edebilir",
      "Kavşak yakınında park etmemeli, uygun yere gitmeli",
      "5 dakikadan kısa kalırsa serbest",
      "Gece park serbesttir",
    ],
    dogruIndex: 1,
    aciklama: "Kavşak, durak ve yaya geçidi yakınlarında park yasaktır.",
    zorluk: "kolay",

  },
  {
    id: "sen-12",
    dersId: "trafik",
    konuId: "yaya-gecit",
    metin: "Yaya geçidi senaryosunda yaya geçitte yürürken araç hızlanıyor. Bu davranış?",
    secenekler: [
      "Uygun, yaya hızlı yürüyorsa",
      "Kural ihlali; yayaya yol verilmeli",
      "Sadece gece yasaktır",
      "Korna yeterlidir",
    ],
    dogruIndex: 1,
    aciklama: "Yaya geçidindeki yayaya mutlaka yol verilir; hızlanmak ağır ihlaldir.",
    zorluk: "kolay",

  },
  {
    id: "sen-13",
    dersId: "trafik",
    konuId: "aydinlatma-sinyal",
    metin: "Şerit değişim senaryosunda sürücü aynayı kontrol etmeden geçiş yapıyor. Risk nedir?",
    secenekler: [
      "Yakıt artar",
      "Kör noktadaki araca çarpma riski",
      "Ceza puanı düşer",
      "Park yasağı",
    ],
    dogruIndex: 1,
    aciklama: "Ayna ve omuz kontrolü olmadan şerit değişimi kör nokta kazasına yol açar.",
    zorluk: "orta",

  },
  {
    id: "sen-14",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Dönel kavşak senaryosunda ada etrafında dönme kuralı geçerliyse sürücü ne yapmalı?",
    secenekler: [
      "Düz geçmeli",
      "Adanın etrafında belirtilen yönde dönmeli",
      "Durup geri gitmeli",
      "Sollama yapmalı",
    ],
    dogruIndex: 1,
    aciklama: "Dönel kavşakta ada etrafında dönme zorunludur; ters yönde gidilmez.",
    zorluk: "kolay",

  },
  {
    id: "sen-15",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Devamlı çizgi olan bölgede sollama yapmak neden yasaktır?",
    secenekler: [
      "Yakıt israfı",
      "Karşı yönden görüş kısıtlı, çarpışma riski yüksek",
      "Lastik aşınır",
      "Sadece gece yasaktır",
    ],
    dogruIndex: 1,
    aciklama: "Devamlı çizgi karşı yönden geleni göremeyeceğiniz tehlikeli bölgelerde çizilir.",
    zorluk: "orta",

  },
  {
    id: "sen-16",
    dersId: "trafik",
    konuId: "duraklama-park",
    metin: "Engelli park yerine izinsiz park eden sürücü hangi sonuçla karşılaşabilir?",
    secenekler: [
      "Teşekkür edilir",
      "Para cezası ve araç çekimi",
      "Hız sınırı artar",
      "Ceza puanı düşer",
    ],
    dogruIndex: 1,
    aciklama: "Engelli park yerine yetkisiz park ciddi idari yaptırımlara tabidir.",
    zorluk: "kolay",

  },
  {
    id: "sen-17",
    dersId: "trafik",
    konuId: "yaya-gecit",
    metin: "Okul geçidi yakınında çocuklar yola çıkıyorsa sürücünün ilk tepkisi ne olmalıdır?",
    secenekler: [
      "Korna çalıp hızlanmak",
      "Hızı düşürmek ve durmaya hazır olmak",
      "Sollama yapmak",
      "Selektör yapmak",
    ],
    dogruIndex: 1,
    aciklama: "Okul geçidinde hız düşürülür; çocuklara mutlak öncelik verilir.",
    zorluk: "kolay",

  },
  {
    id: "sen-18",
    dersId: "trafik",
    konuId: "aydinlatma-sinyal",
    metin: "Şerit değiştirirken sinyal vermenin temel amacı nedir?",
    secenekler: [
      "Diğer sürücüleri manevradan haberdar etmek",
      "Hız artırmak",
      "Park etmek",
      "Far yakmak",
    ],
    dogruIndex: 0,
    aciklama: "Sinyal, diğer yol kullanıcılarına niyetinizi bildirir; manevra öncesi verilir.",
    zorluk: "kolay",

  },
  {
    id: "sen-19",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Dur levhası olan kavşakta yeşil araç ne yapmalıdır?",
    secenekler: [
      "Yavaşlayıp geçmeli",
      "Tam durup yol verdikten sonra geçmeli",
      "Korna çalmalı",
      "Selektör yeterli",
    ],
    dogruIndex: 1,
    aciklama: "DUR levhasında tam durulur; güvenli ise geçilir.",
    zorluk: "kolay",

  },
  {
    id: "sen-20",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Sollama sonrası hangi davranış doğrudur?",
    secenekler: [
      "Sol şeritte kalmak",
      "Güvenli mesafe bırakıp sağ şeride dönmek",
      "Hızlanmaya devam etmek",
      "Selektör açık bırakmak",
    ],
    dogruIndex: 1,
    aciklama: "Sollama bitince sinyal kapatılır ve sağ şeride güvenle dönülür.",
    zorluk: "orta",

  },
];
