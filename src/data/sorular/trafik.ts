import type { Soru } from "@/types";

export const TRAFIK_SORULARI: Soru[] = [
  {
    id: "tr-001",
    dersId: "trafik",
    konuId: "hiz-kurallari",
    metin: "Aksine bir işaret bulunmadıkça, yerleşim yeri dışındaki bölünmüş karayollarında otomobiller için azami (en yüksek) hız sınırı saatte kaç kilometredir?",
    secenekler: ["90", "110", "120", "130"],
    dogruIndex: 1,
    aciklama: "Otomobiller için hız sınırları: Yerleşim yeri içi 50 km/s, Şehirler arası çift yönlü yollar 90 km/s, Bölünmüş yollar 110 km/s, Otoyollar (otoban) 130 km/s'dir.",
    zorluk: "kolay"
  },
  {
    id: "tr-002",
    dersId: "trafik",
    konuId: "isikli-isaretler",
    metin: "Kırmızı ışıkla birlikte yanan sarı ışık sürücüye neyi bildirir?",
    secenekler: ["Yolun trafiğe kapanmak üzere olduğunu", "Kalkışa (harekete) hazırlanılması gerektiğini", "Yavaşlayıp durulması gerektiğini", "Sadece sağa dönüş yapılabileceğini"],
    dogruIndex: 1,
    aciklama: "Kırmızı ışıkla birlikte yanan sarı ışık, yeşil ışığın yanmak üzere olduğunu ve sürücünün kalkışa hazırlanması gerektiğini bildirir.",
    zorluk: "kolay"
  },
  {
    id: "tr-003",
    dersId: "trafik",
    konuId: "cevre-guvenlik",
    metin: "Sürücülerin önlerinde giden araçları güvenli bir mesafeden takip etmeleri zorunludur. Bu 'takip mesafesi' aracın kilometre cinsinden saatteki hızının en az ne kadarı olmalıdır?",
    secenekler: ["Hızın yarısı kadar metre", "Hızın tamamı kadar metre", "Hızın üçte biri kadar metre", "Sabit olarak 50 metre"],
    dogruIndex: 0,
    aciklama: "Normal hava ve yol şartlarında güvenli takip mesafesi, aracın kilometre cinsinden saatteki hızının en az yarısı kadar (örneğin 90 km/s hızla giden aracın takip mesafesi 45 metre) olmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "tr-004",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Kavşaklarda geçiş hakkı kurallarına göre, trafik polisi, ışık veya işaret levhası bulunmayan kontrolsüz bir kavşakta karşılaşan araçlardan hangisi ilk geçiş hakkına sahiptir?",
    secenekler: ["Hızı en yüksek olan araç", "Dönüş yapan araç", "Sağdan gelen araç", "Ağır vasıta olan araç"],
    dogruIndex: 2,
    aciklama: "Eşdeğer yolların kesiştiği kontrolsüz kavşaklarda, aksine bir kural yoksa, her sürücü kendi sağından gelen araca ilk geçiş hakkını vermek zorundadır.",
    zorluk: "orta"
  },
  {
    id: "tr-005",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Aşağıdaki araçlardan hangisi, görev halindeyken (sirenleri ve tepe lambaları açıkken) trafik kurallarına (kırmızı ışık, hız limiti) uymak zorunda DEĞİLDİR?",
    secenekler: ["Yolcu otobüsü", "Makam aracı", "İtfaiye aracı", "Öğrenci servisi"],
    dogruIndex: 2,
    aciklama: "Cankurtaran (Ambulans), İtfaiye, Polis ve Sivil Savunma araçları görev halindeyken can ve mal güvenliğini tehlikeye atmamak şartıyla geçiş üstünlüğüne sahiptir.",
    zorluk: "kolay"
  },
  {
    id: "tr-006",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Aşağıdaki yerlerden hangisinde öndeki aracı geçmek (sollama yapmak) YASAK değildir?",
    secenekler: ["Yaya ve okul geçitlerine yaklaşırken", "Görüşün yetersiz olduğu tepe üstleri ve dönemeçlerde", "İki yönlü trafiğin kullanıldığı köprü ve tünellerde", "Bölünmüş yollarda ve otoyollarda"],
    dogruIndex: 3,
    aciklama: "Yaya geçitleri, tepe üstleri, virajlar, köprüler ve tüneller gibi görüşün kısıtlı veya yaya riskinin yüksek olduğu yerlerde sollama yapmak yasaktır. Bölünmüş yollarda ise kurallara uygun sollama yapılabilir.",
    zorluk: "kolay"
  },
  {
    id: "tr-007",
    dersId: "trafik",
    konuId: "yer-isaretlemeleri",
    metin: "Yol üzerine çizilmiş olan 'Kesikli (Tırtıklı) Çizgi' sürücülere neyi bildirir?",
    secenekler: ["Hiçbir şekilde şerit değiştirilemeyeceğini", "Karşı yönden gelen trafiğin olmadığını", "Kurallara uymak şartıyla öndeki aracın geçilebileceğini (şerit değiştirilebileceğini)", "Park etmenin yasak olduğunu"],
    dogruIndex: 2,
    aciklama: "Devamlı (düz) çizgi sollama ve şerit değiştirme yasağını; kesikli çizgi ise uygun şartlarda öndeki aracın geçilebileceğini bildirir.",
    zorluk: "kolay"
  },
  {
    id: "tr-008",
    dersId: "trafik",
    konuId: "aydinlatma-sinyal",
    metin: "Geceleri karşıdan gelen bir araçla karşılaşıldığında veya öndeki araç yakından takip edildiğinde hangi farların kullanılması zorunludur?",
    secenekler: ["Uzun hüzmeli (uzun) farların", "Kısa hüzmeli (kısa) farların", "Sis farlarının", "Dörtlü ikaz flaşörlerinin"],
    dogruIndex: 1,
    aciklama: "Karşıdan gelen sürücünün ve öndeki sürücünün dikiz aynasından gözünün kamaşmasını önlemek için karşılaşmalarda ve takiplerde mutlaka kısa farlar kullanılmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "tr-009",
    dersId: "trafik",
    konuId: "belgeler-cezalar",
    metin: "Otomobil sürücülerinin, alkolmetre ile yapılan denetimlerde kandaki alkol oranının yasal sınırı en fazla kaç promil olmalıdır?",
    secenekler: ["0.00 promil (Sıfır tolerans)", "0.20 promil", "0.50 promil", "1.00 promil"],
    dogruIndex: 2,
    aciklama: "Hususi otomobil sürücüleri için yasal alkol sınırı 0.50 promildir. Ticari araç sürücüleri için ise sınır 0.20 promildir.",
    zorluk: "orta"
  },
  {
    id: "tr-010",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Geçiş üstünlüğüne sahip araçların (Ambulans, İtfaiye, Polis) bir kavşakta aynı anda karşılaşması durumunda ilk geçiş hakkı sırası nasıl olmalıdır?",
    secenekler: ["1. İtfaiye, 2. Ambulans, 3. Polis", "1. Ambulans, 2. İtfaiye, 3. Polis", "1. Polis, 2. İtfaiye, 3. Ambulans", "Hepsi aynı anda geçer"],
    dogruIndex: 1,
    aciklama: "Geçiş üstünlüğü sırası (CİPS kuralı): 1-Cankurtaran (Ambulans), 2-İtfaiye, 3-Polis, 4-Sivil Savunma aracı şeklindedir. Hayat kurtaran araç daima ilk sıradadır.",
    zorluk: "zor"
  },
  {
    id: "tr-011",
    dersId: "trafik",
    konuId: "duraklama-park",
    metin: "Park etmenin yasak olduğu yerleri belirten işaret levhasının bulunmadığı bir yolda, yangın musluklarına her iki yönden kaç metre mesafe içinde park etmek yasaktır?",
    secenekler: ["5 metre", "10 metre", "15 metre", "20 metre"],
    dogruIndex: 0,
    aciklama: "Yangın musluklarına (hidrantlara) acil durumlarda itfaiyenin yanaşabilmesi için her iki yönden 5 metrelik mesafe içinde araç park etmek yasaktır.",
    zorluk: "zor"
  },
  {
    id: "tr-012",
    dersId: "trafik",
    konuId: "belgeler-cezalar",
    metin: "Aşağıdakilerden hangisi trafik kazalarında 'asli kusur' (kesin suçlu olma) sayılan hallerden biridir?",
    secenekler: ["Kırmızı ışıkta geçmek", "Gündüz farları açık araç kullanmak", "Hız sınırını %10 aşmak", "Araçta ilk yardım çantası bulundurmamak"],
    dogruIndex: 0,
    aciklama: "Kırmızı ışıkta geçmek, dur levhasında durmamak, ters yöne girmek, arkadan çarpmak gibi ihlaller kazalarda doğrudan asli (tam) kusur sayılır.",
    zorluk: "kolay"
  },
  {
    id: "tr-013",
    dersId: "trafik",
    konuId: "trafik-isaretleri",
    metin: "Trafik görevlisinin her iki kolunu veya tek kolunu omuz hizasında yere paralel olarak uzattığı duruş pozisyonu sürücülere neyi ifade eder?",
    secenekler: ["Bütün yönler için trafiğin açık olduğunu", "Görevlinin kollarının gösterdiği istikametteki (ön ve arka) araçların durması gerektiğini, yan taraflardaki trafiğin açık olduğunu", "Sadece görevlinin arkasından gelenlerin geçebileceğini", "Tüm araçların motoru durdurması gerektiğini"],
    dogruIndex: 1,
    aciklama: "Polisin kollarını uzattığı yöne bakan araçlar (polisin önü ve arkasında kalanlar) durmak zorundadır. Polisin omuz hizasına (sağ ve soluna) denk gelen yollar ise trafiğe açıktır.",
    zorluk: "orta"
  },
  {
    id: "tr-014",
    dersId: "trafik",
    konuId: "sollama",
    metin: "Trafikte arkasından yaklaşan bir aracın kendisini geçmek (sollamak) istediğini bildiren ışıklı veya sesli işaretini (selektör veya korna) alan bir sürücü ne yapmalıdır?",
    secenekler: ["Hızını artırıp öndeki araca yaklaşmalıdır", "Kornaya basarak diğer sürücüyü engellemelidir", "Hızını artırmadan bulunduğu şeridi korumalı, gerekirse hafif sağa yanaşarak geçişi kolaylaştırmalıdır", "Hemen fren yapıp durmalıdır"],
    dogruIndex: 2,
    aciklama: "Sollanan araç sürücüsü hızını sabit tutmalı, bulunduğu şeridi izlemeli ve geçiş yapan araca engel olmamalıdır.",
    zorluk: "kolay"
  },
  {
    id: "tr-015",
    dersId: "trafik",
    konuId: "belgeler-cezalar",
    metin: "B Sınıfı sürücü belgesi alan bir kişi, aşağıdaki araçlardan hangisini KULLANAMAZ?",
    secenekler: ["Otomobil", "Kamyonet", "Traktör", "Motosiklet (A Sınıfı)"],
    dogruIndex: 3,
    aciklama: "B sınıfı ehliyet; Otomobil, Kamyonet ve Traktör kullanabilir. Ancak A sınıfı (Motor) kullanabilmek için özel motosiklet ehliyeti gereklidir (Moped hariç).",
    zorluk: "orta"
  },
  {
    id: "tr-016",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "Döner kavşaklara yaklaşan bir sürücü nasıl davranmalıdır?",
    secenekler: ["Kavşak içindeki araca ilk geçiş hakkını vermeli ve yavaşlamalıdır", "Hızını artırarak kavşağa ilk giren olmaya çalışmalıdır", "Kavşak içindeki aracı kornayla durdurmalıdır", "Durup dörtlükleri yakmalıdır"],
    dogruIndex: 0,
    aciklama: "Döner kavşaklarda aksine bir işaret (örneğin yol ver levhası) yoksa, ilk geçiş hakkı her zaman kavşak İÇİNDE dönmekte olan aracındır.",
    zorluk: "orta"
  },
  {
    id: "tr-017",
    dersId: "trafik",
    konuId: "duraklama-park",
    metin: "Aşağıdaki yerlerin hangisinde duraklama yapmak yasaktır?",
    secenekler: ["Taşıt yolu kenarındaki ceplerde", "Trafik işaret levhalarına yerleşim yeri içinde 15 metre mesafe içinde", "Banketlerde", "Açık otoparklarda"],
    dogruIndex: 1,
    aciklama: "Trafik işaret levhalarına; yerleşim yeri içinde 15 metre, yerleşim yeri dışında 100 metre mesafe içinde duraklamak ve park etmek yasaktır.",
    zorluk: "zor"
  },
  {
    id: "tr-018",
    dersId: "trafik",
    konuId: "belgeler-cezalar",
    metin: "Yeni alınan 0 km (Sıfır) bir hususi otomobilin ilk muayenesi kaç yaş (yıl) sonunda yaptırılmalıdır?",
    secenekler: ["1 yıl", "2 yıl", "3 yıl", "5 yıl"],
    dogruIndex: 2,
    aciklama: "Sıfır alınan hususi otomobillerin ilk muayenesi 3. yılın sonunda yapılır, ondan sonra ise her 2 yılda bir tekrarlanır. (Ticari araçlarda her yıldır.)",
    zorluk: "orta"
  },
  {
    id: "tr-019",
    dersId: "trafik",
    konuId: "gecis-ustunlugu",
    metin: "İki yönlü dar bir dağ yolunda (eğimli yolda) karşılaşan inen araç ile çıkan araç sürücüleri arasında geçiş hakkı kuralı nasıldır?",
    secenekler: ["Çıkan araç inen araca yol vermelidir", "İnen araç (yokuş aşağı giden), çıkan araca (yokuş yukarı gidene) yol vermelidir", "Ağır olan araç hafif olana yol vermelidir", "Hızlı olan araç önce geçmelidir"],
    dogruIndex: 1,
    aciklama: "Eğimli (yokuşlu) iki yönlü dar yollarda aksi bir işaret yoksa, daima inen araç, çıkan araca yol vermek, gerekirse sağa yanaşıp durmak veya geri gitmek zorundadır.",
    zorluk: "orta"
  },
  {
    id: "tr-020",
    dersId: "trafik",
    konuId: "cevre-guvenlik",
    metin: "Çocuk bağlama sistemleri (Çocuk Koltuğu) kullanımıyla ilgili olarak aşağıdakilerden hangisi doğrudur?",
    secenekler: ["Sadece uzun yollarda kullanılması mecburidir", "Boyu 150 cm'den ve kilosu 36 kg'dan az olan çocukların araçlarda özel çocuk koltuğunda seyahat etmesi zorunludur", "Arka koltukta annesinin kucağında taşınması daha güvenlidir", "Sadece 3 yaşından küçükler için zorunludur"],
    dogruIndex: 1,
    aciklama: "Mevzuata göre boyu 1.50 metreden kısa ve 36 kilogramın altındaki çocukların araç içerisinde çocuk bağlama sistemleriyle (çocuk koltuğu vb.) taşınması zorunludur.",
    zorluk: "orta"
  },
  {
    id: "tr-021",
    dersId: "trafik",
    konuId: "yaya-gecit",
    metin: "Yaya geçitlerine yaklaşan sürücülerin yapması gereken en doğru hareket nedir?",
    secenekler: ["Hızını artırıp geçitten hemen geçmek", "Korna çalarak yayaları uyarmak", "Hızını azaltmak ve geçitten geçen veya geçmek üzere olan yayalara ilk geçiş hakkını vermek", "Sadece trafik polisi varsa durmak"],
    dogruIndex: 2,
    aciklama: "Yaya geçitlerinde ilk geçiş hakkı mutlak suretle yayalarındır. Sürücüler yaklaşırken hızını azaltmalı ve yayalara yol vermelidir.",
    zorluk: "kolay"
  },
  {
    id: "tr-022",
    dersId: "trafik",
    konuId: "belgeler-cezalar",
    metin: "Ülkemizde araçların tescil belgesi (ruhsat) ve plakası olmadan karayoluna çıkarılması durumunda uygulanacak yaptırım nedir?",
    secenekler: ["Sadece sözlü uyarı yapılır", "Araç trafikten men edilir", "Sürücünün ehliyetine ömür boyu el konur", "Araç yeniden boyanır"],
    dogruIndex: 1,
    aciklama: "Plakasız ve ruhsatsız trafiğe çıkmak yasaktır; tespit edilmesi halinde araç çekici ile otoparka çekilerek trafikten men edilir.",
    zorluk: "orta"
  },
  {
    id: "tr-023",
    dersId: "trafik",
    konuId: "isikli-isaretler",
    metin: "Aralıklı (fasılalı) olarak yanıp sönen kırmızı ışık, sürücüye hangi trafik işaret levhası ile aynı anlamı taşır?",
    secenekler: ["Yol Ver levhası", "Dur levhası", "Girişi Olmayan Yol levhası", "İleri Mecburi Yön levhası"],
    dogruIndex: 1,
    aciklama: "Fasılalı yanan kırmızı ışık 'DUR' levhası ile aynı anlamdadır. Sürücü mutlaka durmalı, yolu kontrol ettikten sonra geçmelidir.",
    zorluk: "kolay"
  },
  {
    id: "tr-024",
    dersId: "trafik",
    konuId: "aydinlatma-sinyal",
    metin: "Sisli, karlı ve sağanak yağmurlu havalarda (görüşün yetersiz olduğu durumlarda) gündüz vakti bile araçlarda hangi farların kullanılması zorunludur?",
    secenekler: ["Sadece park lambalarının", "Sadece uzun farların", "Yakını gösteren (kısa) farların ve varsa sis farlarının", "Dörtlü flaşörlerin"],
    dogruIndex: 2,
    aciklama: "Görüş mesafesinin azaldığı sis, kar veya şiddetli yağmur gibi durumlarda, gündüz bile olsa aracın fark edilebilmesi için kısa farlar ve sis farları yakılmalıdır.",
    zorluk: "orta"
  },
  {
    id: "tr-025",
    dersId: "trafik",
    konuId: "cevre-guvenlik",
    metin: "Otoyollarda (Erişme Kontrollü Karayollarında) aşağıdakilerden hangisinin yapılması YASAKTIR?",
    secenekler: ["Şerit değiştirmek", "Asgari (en az) 40 km/s hızın altına düşmek, duraklamak ve geri gitmek", "Sollama yapmak", "Kısa farları kullanmak"],
    dogruIndex: 1,
    aciklama: "Otoyollarda trafiğin akışını tehlikeye atacak şekilde durmak, duraklamak, park etmek, geri gitmek, U dönüşü yapmak ve 40 km/s asgari hızın altında gitmek yasaktır.",
    zorluk: "kolay"
  }
];
