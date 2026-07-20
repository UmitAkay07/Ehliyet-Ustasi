import type { Soru } from "@/types";

export const ILKYARDIM_SORULARI: Soru[] = [
  {
    id: "s-iy-001",
    dersId: "ilkyardim",
    konuId: "iy-temel-kavramlar",
    metin: "İlk yardımın tanımı aşağıdakilerden hangisidir?",
    secenekler: [
      "Hastaya doktor tarafından yapılan ilaçlı tedavi",
      "Olay yerinde, ilaçsız ve mevcut imkânlarla yapılan müdahale",
      "Hastanede yapılan ameliyat",
      "Sadece kanamayı durdurmak",
    ],
    dogruIndex: 1,
    aciklama:
      "İlk yardım; olay yerinde, tıbbi araç gereç olmadan, mevcut imkânlarla yapılan ilaçsız müdahaledir.",
    zorluk: "kolay",
  },
  {
    id: "s-iy-002",
    dersId: "ilkyardim",
    konuId: "iy-temel-kavramlar",
    metin: "Hasta/yaralı değerlendirmesinde kullanılan ABC sıralamasında 'A' neyi ifade eder?",
    secenekler: ["Dolaşım", "Solunum", "Hava yolu", "Bilinç"],
    dogruIndex: 2,
    aciklama:
      "ABC: A (Airway) hava yolu, B (Breathing) solunum, C (Circulation) dolaşım. Önce hava yolu değerlendirilir.",
    zorluk: "orta",
  },
  {
    id: "s-iy-003",
    dersId: "ilkyardim",
    konuId: "iy-temel-kavramlar",
    metin: "Ülkemizde acil sağlık yardımı için aranması gereken telefon numarası hangisidir?",
    secenekler: ["110", "112", "155", "156"],
    dogruIndex: 1,
    aciklama: "Acil sağlık yardımı için 112 numarası aranır.",
    zorluk: "kolay",
  },
  {
    id: "s-iy-004",
    dersId: "ilkyardim",
    konuId: "iy-olay-yeri",
    metin: "Trafik kazasında ilk yapılması gereken aşağıdakilerden hangisidir?",
    secenekler: [
      "Yaralıları hemen araçtan çıkarmak",
      "Olay yeri güvenliğini sağlamak (kontağı kapatmak, reflektör koymak)",
      "Yaralılara su vermek",
      "Kaza fotoğrafı çekmek",
    ],
    dogruIndex: 1,
    aciklama:
      "Önce olay yeri güvenliği sağlanır: kontak kapatılır, el freni çekilir ve reflektörle diğer sürücüler uyarılır.",
    zorluk: "kolay",
  },
  {
    id: "s-iy-005",
    dersId: "ilkyardim",
    konuId: "iy-olay-yeri",
    metin: "112 aranırken aşağıdakilerden hangisi yapılmamalıdır?",
    secenekler: [
      "Kesin adres bildirmek",
      "Yaralı sayısını bildirmek",
      "Görevli 'kapat' demeden telefonu kapatmak",
      "Olayın türünü bildirmek",
    ],
    dogruIndex: 2,
    aciklama:
      "112 aranırken sakin olunmalı, adres ve yaralı durumu bildirilmeli; görevli kapatmadan telefon kapatılmamalıdır.",
    zorluk: "orta",
  },
  {
    id: "s-iy-006",
    dersId: "ilkyardim",
    konuId: "iy-tyd",
    metin: "Yetişkin bir kişiye uygulanan temel yaşam desteğinde göğüs basısı derinliği yaklaşık ne kadar olmalıdır?",
    secenekler: ["1-2 cm", "5 cm", "10 cm", "Derinlik önemli değildir"],
    dogruIndex: 1,
    aciklama:
      "Yetişkinde göğüs basısı derinliği yaklaşık 5 cm olmalı ve dakikada 100-120 bası hızıyla uygulanmalıdır.",
    zorluk: "orta",
  },
  {
    id: "s-iy-007",
    dersId: "ilkyardim",
    konuId: "iy-tyd",
    metin: "Yetişkinde temel yaşam desteğinde göğüs basısı ve suni solunum oranı nasıl olmalıdır?",
    secenekler: ["15 bası - 1 solunum", "30 bası - 2 solunum", "5 bası - 5 solunum", "10 bası - 2 solunum"],
    dogruIndex: 1,
    aciklama: "Yetişkinde döngü 30 göğüs basısı ve ardından 2 suni solunum şeklindedir.",
    zorluk: "orta",
  },
  {
    id: "s-iy-008",
    dersId: "ilkyardim",
    konuId: "iy-tikanma",
    metin:
      "Yediği bir cisimle tam solunum yolu tıkanması yaşayan (konuşamayan, öksüremeyen) bir yetişkine hangi uygulama yapılır?",
    secenekler: [
      "Su içirilir",
      "Sırtına sertçe vurulur ve beklenir",
      "Heimlich manevrası uygulanır",
      "Öksürmesi için beklenir",
    ],
    dogruIndex: 2,
    aciklama:
      "Tam tıkanmada Heimlich manevrası uygulanır; göbek ile göğüs kemiği arasına içe ve yukarı doğru bası yapılır.",
    zorluk: "orta",
  },
  {
    id: "s-iy-009",
    dersId: "ilkyardim",
    konuId: "iy-tikanma",
    metin: "Solunum yolu kısmen tıkanmış, öksürebilen bir kişiye ilk yardımcı ne yapmalıdır?",
    secenekler: [
      "Hemen Heimlich uygulamalı",
      "Öksürmeye teşvik edip izlemeli",
      "Sırtına vurmalı",
      "Yatırıp bekletmeli",
    ],
    dogruIndex: 1,
    aciklama:
      "Kısmi tıkanmada kişi öksürebiliyorsa müdahale edilmez; öksürmeye teşvik edilerek izlenir.",
    zorluk: "orta",
  },
  {
    id: "s-iy-010",
    dersId: "ilkyardim",
    konuId: "iy-kanama-sok",
    metin: "Dış kanamayı durdurmak için ilk uygulanması gereken yöntem hangisidir?",
    secenekler: [
      "Hemen turnike uygulamak",
      "Kanayan yere temiz bezle doğrudan bası yapmak",
      "Yarayı su ile yıkamak",
      "Kanayan bölgeyi ovmak",
    ],
    dogruIndex: 1,
    aciklama:
      "Dış kanamada ilk uygulama, kanayan yere temiz bezle doğrudan bası yapmaktır. Turnike son çaredir.",
    zorluk: "kolay",
  },
  {
    id: "s-iy-011",
    dersId: "ilkyardim",
    konuId: "iy-kanama-sok",
    metin: "Şok durumundaki bir hastaya hangi pozisyon verilir?",
    secenekler: [
      "Oturur pozisyon",
      "Yüzüstü yatırma",
      "Sırtüstü yatırıp ayakları yaklaşık 30 cm yukarı kaldırma",
      "Baş aşağı asma",
    ],
    dogruIndex: 2,
    aciklama:
      "Şokta hasta sırtüstü yatırılır, ayaklar yaklaşık 30 cm yukarı kaldırılır (şok pozisyonu) ve sıcak tutulur.",
    zorluk: "orta",
  },
  {
    id: "s-iy-012",
    dersId: "ilkyardim",
    konuId: "iy-kirik-yanik",
    metin: "Yanık bölgesine ilk müdahale nasıl yapılmalıdır?",
    secenekler: [
      "Diş macunu veya yoğurt sürülür",
      "Bol soğuk (buzsuz) su altında 15-20 dk tutulur",
      "Su kabarcıkları patlatılır",
      "Sıcak su dökülür",
    ],
    dogruIndex: 1,
    aciklama:
      "Yanan bölge en az 15-20 dakika bol soğuk su altında tutulur; üzerine macun/yoğurt sürülmez, kabarcık patlatılmaz.",
    zorluk: "kolay",
  },
  {
    id: "s-iy-013",
    dersId: "ilkyardim",
    konuId: "iy-kirik-yanik",
    metin: "Kol veya bacakta kırık şüphesi olan yaralıya ilk yardımda ne yapılır?",
    secenekler: [
      "Kırık düzeltilmeye çalışılır",
      "Bölge olduğu gibi, bir alt ve bir üst eklemi içine alacak şekilde tespit edilir (atellenir)",
      "Yaralı yürütülür",
      "Sıcak uygulama yapılır",
    ],
    dogruIndex: 1,
    aciklama:
      "Kırıkta bölge hareket ettirilmeden, bir alt ve bir üst eklemi kapsayacak şekilde tespit edilir.",
    zorluk: "orta",
  },
  {
    id: "s-iy-014",
    dersId: "ilkyardim",
    konuId: "iy-bilinc-tasima",
    metin: "Bilinci kapalı ancak solunumu olan bir hastaya hangi pozisyon verilmelidir?",
    secenekler: [
      "Şok pozisyonu",
      "Koma (yarı yüzükoyun / yan yatış) pozisyonu",
      "Oturma pozisyonu",
      "Sırtüstü düz yatış",
    ],
    dogruIndex: 1,
    aciklama:
      "Bilinci kapalı, solunumu olan hastaya koma pozisyonu verilir; bu, dilin kaçmasını ve kusmukla boğulmayı önler.",
    zorluk: "orta",
  },
  {
    id: "s-iy-015",
    dersId: "ilkyardim",
    konuId: "iy-bilinc-tasima",
    metin:
      "Yangın veya patlama gibi hayati tehlike olmadıkça trafik kazasındaki yaralıya taşıma konusunda nasıl davranılmalıdır?",
    secenekler: [
      "Hemen araçtan çıkarılmalı",
      "Zorunlu olmadıkça yerinden oynatılmamalı",
      "Ayağa kaldırılıp yürütülmeli",
      "Sırtına alınıp taşınmalı",
    ],
    dogruIndex: 1,
    aciklama:
      "Yaralı, hayati tehlike (yangın, patlama) yoksa yerinden oynatılmaz; gereksiz hareket omurga yaralanmasını ağırlaştırabilir.",
    zorluk: "kolay",
  },
];
