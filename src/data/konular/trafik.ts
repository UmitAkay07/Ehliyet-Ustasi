import type { Konu } from "@/types";

export const TRAFIK_KONULARI: Konu[] = [
  {
    id: "trafik-kavramlar",
    dersId: "trafik",
    baslik: "Temel Trafik Kavramları ve Tanımlar",
    ozet:
      "Trafik, karayolu, taşıt, sürücü, yerleşim yeri gibi sınavda sık geçen temel tanımlar ve yol yapı elemanları.",
    ikon: "book",
    okumaSuresiDk: 10,
    kapakGorsel: "yol-kesit",
    bolumler: [
      {
        baslik: "Trafik ve karayolu nedir?",
        metin:
          "Trafik; yayaların, hayvanların ve araçların karayolları üzerindeki hâl ve hareketleridir. Karayolu ise trafik için kamunun yararlanmasına açık olan, arazi şeridi, köprüler ve alanların tümüdür. Karayolu Trafik Kanunu'na göre bu tanımların bilinmesi, hem sınavda hem gerçek sürüşte kuralların doğru yorumlanması için gereklidir. Karayolu yalnızca asfalt yol değildir; kaldırım hariç, taşıtların ve yayaların ortak kullanımına açık her bölüm bu tanımın içine girer.",
      },
      {
        baslik: "Trafiğin üç temel unsuru",
        metin:
          "Trafiğin üç temel unsuru vardır: insan (sürücü ve yaya), araç (taşıt) ve yol (çevre). Yapılan kaza istatistiklerinde en büyük pay her zaman insan kaynaklı kusurlara aittir; hız, dikkatsizlik, kural ihlali ve yorgunluk bu grubun başlıca nedenleridir. Araçtan kaynaklanan kusurlar (fren arızası, lastik patlaması) ve yoldan kaynaklanan kusurlar (kaygan zemin, bozuk asfalt, yetersiz aydınlatma) diğer iki unsuru oluşturur. Bu nedenle bir sürücünün kendi davranışını kontrol etmesi, kazaların önlenmesinde en belirleyici etkendir.",
      },
      {
        baslik: "Sürücü, yaya ve yolcu tanımları",
        metin:
          "Sürücü: Karayolunda, motorlu veya motorsuz bir aracı sevk ve idare eden kişidir.\nYaya: Taşıt trafiğinde bulunmayan, yürüyerek hareket eden kişidir; elle taşınan araçları (bisiklet iterek yürüyen kişi gibi) kullananlar da bazı hükümlerde yaya sayılır.\nYolcu: Sürücü dışında araçta bulunan kişidir.\nBu üç kavram sınavda genellikle karıştırılan sorularda birlikte sorulur; sürücü aracı 'idare eden', yolcu ise sadece 'bulunan' kişidir.",
      },
      {
        baslik: "Taşıt türleri",
        metin:
          "Taşıt: Karayolunda insan, hayvan ve yük taşımaya yarayan araçtır. İki ana grupta incelenir:\n1. Motorlu taşıt: Motor gücüyle hareket eden taşıtlardır (otomobil, motosiklet, otobüs, kamyon).\n2. Motorsuz taşıt: İnsan veya hayvan gücüyle hareket eden taşıtlardır (bisiklet, at arabası, el arabası).\nAyrıca özel amaçlı taşıtlar (iş makinesi, traktör) ve okul taşıtı gibi özel kurallara tabi araç sınıfları da mevcuttur.",
      },
      {
        baslik: "Yol yapı elemanları: banket, şerit, platform",
        metin:
          "Banket: Yaya ve zorunlu hâllerde araçların da kullanabileceği, taşıt yolu dışında kalan kısımdır; genellikle yol kenarındaki toprak veya stabilize şerittir.\nŞerit: Taşıtların bir dizi hâlinde güvenle gidebilmesi için yol çizgileriyle ayrılmış bölümdür.\nPlatform: Taşıt yolu ile bunun dışında kalan banketlerden oluşan yol bölümüdür.\nTaşıt yolu (kaplama): Karayolunun, taşıtların gidiş-gelişine ayrılmış kısmıdır ve bir veya birden çok şerit içerebilir.",
      },
      {
        baslik: "Yerleşim yeri, geçiş yolu ve bölünmüş yol",
        metin:
          "Yerleşim yeri: Kavşak, tünel, köprü gibi yerlerin bulunduğu, giriş ve çıkışı 'yerleşim yeri başlıyor/bitiyor' levhalarıyla belirlenmiş yerdir. Yerleşim yeri içinde hız sınırları daha düşüktür.\nGeçiş yolu: Araçların karayolundan bir mülke (bina, tesis, arazi) girip çıkması için yapılmış yoldur.\nBölünmüş yol: Gidiş ve gelişin, orta refüj, ada veya benzer bir tertiple birbirinden ayrıldığı yoldur; bu yollarda karşı yönden araç gelme riski yoktur, bu nedenle hız sınırı daha yüksektir (otomobil için 110 km/s).",
      },
      {
        baslik: "Kavşak, ada ve refüj",
        metin:
          "Kavşak: İki veya daha fazla karayolunun kesişmesi, birleşmesi veya ayrılması ile oluşan ortak alandır. Kavşaklarda geçiş önceliği kuralları özellikle önemlidir.\nAda: Yayaların ve/veya taşıtların güvenliği için düzenlenmiş, kot veya çizgilerle ayrılmış alandır.\nRefüj: Karayolunu, gidiş ve geliş yönünden ayıran, üzerinde çoğunlukla bitki veya bariyer bulunan bölümdür. Bu terimlerin karışıklığı sınavda görsel sorularla test edilir; şekil üzerinde tanıma çalışmak faydalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Trafiğin üç unsuru: insan, araç, yol; kazaların çoğu insan kaynaklıdır.",
      "Sürücü aracı idare eden, yolcu ise araçta sadece bulunan kişidir.",
      "Banket, yayaların ve zorunlu hâllerde araçların kullandığı kısımdır.",
      "Şerit çizgilerle ayrılmış tek dizi taşıt yoludur, platform ise taşıt yolu + banket toplamıdır.",
      "Yerleşim yerinin başı ve sonu özel levhalarla belirtilir.",
      "Bölünmüş yolda karşı yön ayrıldığından hız sınırı daha yüksektir.",
      "Kavşak, ada ve refüj tanımları görsel sorularda sık test edilir.",
    ],
  },
  {
    id: "trafik-isaretleri",
    dersId: "trafik",
    baslik: "Trafik İşaretleri ve Levhalar",
    ozet:
      "Levhaların şekil ve renklerine göre anlamları: tehlike uyarı, yasaklama, mecburiyet ve bilgi işaretleri.",
    ikon: "warning",
    okumaSuresiDk: 12,
    kapakGorsel: "levha-sekilleri",
    bolumler: [
      {
        baslik: "Şekle ve renge göre anlam",
        metin:
          "Trafik levhaları, karayolunda trafiği düzenleyen en görünür araçlardır ve şekil-renk kombinasyonuyla anlam kazanır. Bu dört grubu ayırt etmek soruların büyük bölümünü çözer:\n1. Üçgen, kırmızı çerçeveli, beyaz zemin → Tehlike uyarı işaretleri\n2. Yuvarlak, kırmızı çerçeveli, beyaz zemin → Yasaklama ve kısıtlama işaretleri\n3. Yuvarlak, mavi zemin → Mecburiyet (yapma zorunluluğu) işaretleri\n4. Kare veya dikdörtgen, mavi/yeşil zemin → Bilgi işaretleri\nBu genel kurala iki istisna vardır: 'Dur' işareti sekizgen, 'Yol ver' işareti ters üçgendir; ikisi de kırmızı renklidir ve karıştırılmaması özellikle önemlidir.",
        gorsel: "levha-sekilleri",
      },
      {
        baslik: "Tehlike uyarı işaretleri",
        metin:
          "Tehlike uyarı işaretleri, yolda ileride karşılaşılabilecek bir tehlikeyi önceden bildirir; sürücüyü yavaşlamaya, dikkatli olmaya ve gerektiğinde durmaya hazır olmaya çağırır. Yaygın örnekler: kasisli yol, kaygan yol, sağa/sola tehlikeli viraj, öndeyaya geçidi, okul geçidi, yayaların dolaştığı yol, gizli buzlanma, taşıt trafiğine kapalı yol devamı. Şehir dışı yollarda bu levhalar tehlikenin başlangıcından belirli bir mesafe önce (genellikle 150-250 m), şehir içinde daha yakın mesafede konulur.",
      },
      {
        baslik: "Trafik tanzim (yasaklama) işaretleri",
        metin:
          "Bir hareketi tamamen yasaklar veya belirli bir şekilde sınırlar. Örnekler: taşıt trafiğine kapalı yol, sağa/sola dönülmez, öndeki taşıtı geçmek yasaktır, azami hız sınırı, duraklamak ve park etmek yasaktır. Bu grup genellikle yuvarlak biçimli, kırmızı çerçeveli, beyaz zeminlidir; üzerindeki sembol kırmızı veya siyah olabilir. Grubun en özel üyesi olan 'Dur' işareti sekizgen biçimiyle diğerlerinden ayrılır ve önündeki her aracın tam olarak durmasını mecbur kılar; sadece yavaşlamak yeterli değildir.",
      },
      {
        baslik: "Mecburiyet işaretleri",
        metin:
          "Mecburiyet işaretleri bir yöne dönmeyi, bir şeridi kullanmayı veya belirli bir davranışı zorunlu kılar; mavi zemin üzerine beyaz ok veya sembol ile gösterilir. Örnekler: ileri mecburi yön, sağa mecburi yön, taşıt yolu ayrımı, zincir takma mecburiyeti, asgari hız sınırı. Bu işaretler yasaklama işaretlerinden farklı olarak 'yapmayı zorunlu kılar', 'yapmayı yasaklamaz'.",
      },
      {
        baslik: "Bilgi işaretleri",
        metin:
          "Bilgi işaretleri sürücüye yol, yerleşim yeri, hastane, park yeri, otoyol girişi-çıkışı gibi bilgileri verir; genellikle mavi (şehir içi/otoyol) veya yeşil (şehirler arası) dikdörtgen biçimlidir. Bu grup yasaklama veya mecburiyet doğurmaz, sadece yönlendirme ve bilgilendirme amaçlıdır. Otoyollarda yeşil renk, şehir içi anayollarda mavi renk kullanılması tercih edilir.",
      },
      {
        baslik: "Levhaların yerleşim mantığı",
        metin:
          "Levhalar, etkili oldukları bölgenin başında konulur ve etkisi aksi belirtilmedikçe bir sonraki kavşağa veya levhaya kadar sürer. Bir levhanın altına eklenen ek levha (örneğin mesafe veya 'kamyonlar hariç' yazısı), üstteki levhanın kapsamını daraltır ya da açıklar. Sınavda 'levha hangi mesafede geçerlidir' türü sorularda bu mantık kullanılır.",
      },
    ],
    anahtarNoktalar: [
      "Üçgen = tehlike uyarısı, yuvarlak kırmızı çerçeveli = yasak.",
      "Mavi yuvarlak = mecburiyet, mavi/yeşil dikdörtgen = bilgi.",
      "'Dur' levhası sekizgendir ve tam durmayı gerektirir; 'Yol ver' ters üçgendir.",
      "Levhanın rengi ve şekli anlamını, ek levha ise kapsamını belirler.",
      "Tehlike levhaları tehlikeden belirli bir mesafe önce konulur.",
      "Mecburiyet işaretleri bir davranışı zorunlu kılar, yasaklamaz.",
      "Levha etkisi aksi belirtilmedikçe bir sonraki kavşağa kadar sürer.",
    ],
  },
  {
    id: "yer-isaretlemeleri",
    dersId: "trafik",
    baslik: "Yer İşaretlemeleri (Yol Çizgileri)",
    ozet:
      "Devamlı, kesik ve yaya çizgilerinin anlamı; şerit değiştirme ve sollama kurallarıyla ilişkisi.",
    ikon: "reorder-four",
    okumaSuresiDk: 9,
    kapakGorsel: "yol-cizgileri",
    bolumler: [
      {
        baslik: "Yer işaretlemesi nedir ve hukuki değeri",
        metin:
          "Yer işaretlemeleri, karayolu yüzeyine çizilen çizgi, ok, yazı ve sembollerdir; levhalar ve ışıklı işaretlerle aynı hukuki bağlayıcılığa sahiptir. Gece ve yağmurda görünürlüğü artırmak için genellikle yansıtıcı (reflektif) boya kullanılır. Bir yerde levha ile yer işaretlemesi çakışırsa öncelik sıralamasında yer işaretlemesi en sonda yer alır; ama pratikte ikisi birbirini destekleyecek şekilde uygulanır.",
        gorsel: "yol-cizgileri",
      },
      {
        baslik: "Devamlı (tek/çift) çizgi",
        metin:
          "Devamlı çizgiyi geçmek, üzerinden gitmek ve bu çizgiyi izleyerek şerit değiştirmek yasaktır. Tek devamlı çizgi bir yönü diğerinden ayırırken, çift devamlı çizgi iki yönlü yolda karşı şeride kesinlikle geçilemeyeceğini ve sollama yapılamayacağını gösterir. Devamlı çizgi genellikle görüşün kısıtlı olduğu viraj, tepe üstü ve kavşak yaklaşımlarında kullanılır.",
      },
      {
        baslik: "Kesik çizgi ve kombine çizgiler",
        metin:
          "Kesik çizgi, trafik ve görüş şartları uygun olduğunda şerit değiştirmeye ve öndeki aracı geçmeye (sollamaya) izin verir. Bir yönde kesik, diğer yönde devamlı olan kombine çizgilerde; çizgi kendi tarafınıza göre kesikse geçiş yapabilir, devamlıysa yapamazsınız. Kesik çizginin devamlı çizgiye yaklaştığı ve sıklaştığı bölüm, ileride devamlı çizginin başlayacağını, dolayısıyla sollamanın bitmesi gerektiğini haber verir.",
      },
      {
        baslik: "Yaya geçidi ve dur çizgisi",
        metin:
          "Yol üzerine çizilen kalın beyaz paralel şeritler (zebra) yaya geçidini gösterir; buralarda geçen veya geçmek üzere olan yayaya ilk geçiş hakkı verilir, araç durdurulmaz. Işıklı kavşaklarda yaya geçidinden önce çizilen enine çizgi 'dur çizgisi'dir; kırmızı ışıkta veya dur levhasında araç bu çizgiyi geçmeden durmalıdır.",
      },
      {
        baslik: "Yön okları ve şerit yazıları",
        metin:
          "Şeritler üzerine çizilen yön okları, o şeritten hangi yöne gidilebileceğini gösterir; ok bir yöne işaret ediyorsa sürücü sadece o yöne gitmek zorundadır. Ayrıca yol yüzeyine 'DUR', 'YAVAŞ', 'OKUL' gibi yazılar ile hız kasişleri öncesi uyarı işaretlemeleri de bulunur. Bisiklet şeridi genellikle yeşil zeminle ve bisiklet sembolüyle ayrılır; motorlu araçlar bu şeride giremez.",
      },
      {
        baslik: "Kenar çizgileri ve otoyol uygulamaları",
        metin:
          "Yolun her iki kenarında bulunan kenar çizgileri, taşıt yolunun sınırını gösterir ve gece sürüşte yön bulmaya yardımcı olur. Otoyollarda şerit değiştirmeyi kolaylaştırmak için kesik çizgiler daha uzun aralıklı çizilir; şerit daralması öncesinde ise sıklaşan, huni biçimli çizgilerle sürücü uyarılır.",
      },
    ],
    anahtarNoktalar: [
      "Devamlı çizgi geçilemez, üzerinden sollama yapılamaz.",
      "Kesik çizgide kurallara uygun şerit değişimi ve sollama serbesttir.",
      "Kombine çizgide kendi tarafınızdaki çizgi türü geçerlidir.",
      "Yaya geçidinde (zebra) yayaya ilk geçiş hakkı verilir.",
      "Dur çizgisi, kırmızı ışıkta veya dur levhasında geçilmemesi gereken sınırdır.",
      "Şerit yön okları o şeritten gidilebilecek yönü zorunlu kılar.",
      "Yer işaretlemeleri levhalarla aynı hukuki bağlayıcılığa sahiptir.",
    ],
  },
  {
    id: "isikli-isaretler",
    dersId: "trafik",
    baslik: "Işıklı Trafik İşaretleri",
    ozet:
      "Kırmızı, sarı, yeşil ışıkların anlamı, oklu ışık düzenleri ve trafik görevlisi önceliği.",
    ikon: "flashlight",
    okumaSuresiDk: 9,
    kapakGorsel: "gecis-onceligi",
    bolumler: [
      {
        baslik: "Üç renkli ışık sistemi",
        metin:
          "Kırmızı ışık 'dur' anlamındadır; araç dur çizgisinden önce tam olarak durmalıdır, çizgi yoksa kavşağa girmeden durulur.\nSarı ışık, kırmızıya geçileceğini haber verir; bu ışıkta yola çıkılmaz, güvenle durulabiliyorsa durulur. Kırmızı ile birlikte yanan sarı ışık ise 'yeşile hazırlan, harekete geçmeye hazır ol' anlamındadır.\nYeşil ışık 'geç' anlamındadır; ancak kavşak boşsa, güvenliyse ve geçiş yaparken kavşakta tıkanıklık oluşturmayacaksa geçilir. Kavşak doluysa yeşil yansa bile girilmez.",
      },
      {
        baslik: "Oklu ışıklar ve yön kısıtlaması",
        metin:
          "Ok biçimli ışıklar, yalnızca gösterdikleri yön için geçerlidir ve o şerit için normal dairesel ışığın yerini alır. Örneğin sola dönüş oku yeşilse, o şeritten sadece sola dönülebilir; düz gidilemez. Birden fazla ok aynı anda yanabilir; bu durumda her ok kendi yönü için ayrı bir izin niteliğindedir.",
      },
      {
        baslik: "Yanıp sönen ışıklar",
        metin:
          "Yanıp sönen sarı ışık, ışıklandırmanın devre dışı olduğu veya trafiğin az olduğu saatlerde kullanılır; sürücü kavşağa yaklaşırken yavaşlamalı ve dikkatle geçmelidir, bu bir 'kontrolsüz kavşak' uyarısı gibi değerlendirilir. Yanıp sönen kırmızı ışık ise 'dur' anlamındadır ve dur işareti gibi davranılır; genellikle hemzemin geçit ve özel tesis çıkışlarında görülür.",
      },
      {
        baslik: "Yaya ışıkları",
        metin:
          "Yaya sinyalizasyonunda kırmızı insan figürü 'geçme', yeşil insan figürü 'geçebilirsin' anlamına gelir. Yeşil figür yanıp sönmeye başladığında yeni geçişe başlanmaz, geçiş yapmakta olan tamamlar. Bu sistem özellikle okul ve kalabalık kavşaklarda yaya güvenliğini artırır.",
      },
      {
        baslik: "Öncelik sıralaması: görevli, ışık, levha, çizgi",
        metin:
          "Trafiği düzenlemede kesin bir öncelik hiyerarşisi vardır:\n1. Trafik görevlisinin (polis/zabıta) işaret ve talimatları\n2. Işıklı trafik işaretleri\n3. Trafik işaret levhaları\n4. Yer işaretlemeleri (yol çizgileri)\nBu sıralamada üstte olan, alttakini geçersiz kılar. Yani kavşakta bir trafik görevlisi varsa, ışık kırmızı bile olsa görevlinin işareti geçerlidir; görevli 'geç' derse sürücü geçer.",
        gorsel: "gecis-onceligi",
      },
      {
        baslik: "Arıza ve elektrik kesintisi durumları",
        metin:
          "Işıklı işaretin arızalı olduğu veya elektrik kesintisi yaşanan kavşaklarda, kavşak 'kontrolsüz kavşak' gibi değerlendirilir; sürücüler yavaşlar, sağdan gelene ve ana yoldaki araca öncelik verilerek dikkatle geçilir. Bu tür durumlarda hız kesmemek ciddi kazalara yol açar.",
      },
    ],
    anahtarNoktalar: [
      "Öncelik sırası: trafik görevlisi > ışıklı işaret > levha > yer işaretlemesi.",
      "Sarı ışıkta yola çıkılmaz; güvenle durulabiliyorsa durulur.",
      "Yeşilde bile kavşak doluysa girilmez.",
      "Oklu yeşil ışık sadece gösterdiği yöne izin verir.",
      "Yanıp sönen sarı = dikkatle yavaşlayarak geç, yanıp sönen kırmızı = dur.",
      "Yeşil yaya figürü yanıp sönerken yeni geçişe başlanmaz.",
      "Işık arızalıysa kavşak kontrolsüz kavşak kuralına göre geçilir.",
    ],
  },
  {
    id: "gecis-ustunlugu",
    dersId: "trafik",
    baslik: "Geçiş Hakkı ve Geçiş Üstünlüğü",
    ozet:
      "Kavşaklarda kimin önce geçeceği, kontrolsüz kavşak kuralları ve öncelikli araçlara yol verme.",
    ikon: "git-compare",
    okumaSuresiDk: 11,
    kapakGorsel: "gecis-onceligi",
    bolumler: [
      {
        baslik: "Geçiş hakkı ve geçiş üstünlüğü ayrımı",
        metin:
          "Geçiş hakkı, belirli trafik kurallarına göre bir yaya veya sürücünün diğerlerinden önce geçme hakkıdır (örneğin kontrolsüz kavşakta sağdaki araç). Geçiş üstünlüğü ise kanunla tanınmış, görev hâlindeki bazı araçların normal kuralların dışında öncelikli geçebilmesidir. İkisi farklı kavramlardır: geçiş hakkı durum bağımlıdır, geçiş üstünlüğü ise araca (görevliyse) tanınan sabit bir ayrıcalıktır.",
      },
      {
        baslik: "Kontrolsüz kavşak kuralları",
        metin:
          "Işık, levha veya görevli bulunmayan kontrolsüz kavşaklarda uygulanan temel kurallar:\n1. Ana yol - tali yol ilişkisi varsa, ana yoldaki araç geçiş hakkına sahiptir.\n2. Taşıtlar aynı önemde yoldaysa, sağdan gelen araca yol verilir.\n3. Dönüş yapan araç, doğrultusunu değiştirmeyen (düz giden) araca yol verir.\n4. Bölünmüş yola çıkan araç, bölünmüş yoldaki araca yol verir.\n5. Dar yoldan gelen araç, geniş yoldaki araca yol verir (eşit önemde yol varsayımı geçerli değilse).",
      },
      {
        baslik: "Kavşakta dönüş öncelikleri",
        metin:
          "Kavşakta sola dönecek araç, karşıdan gelen ve düz geçecek veya sağa dönecek araca yol vermelidir. Kavşağa yaklaşırken şerit değiştirmeden, doğru şeritten ve zamanında sinyal vererek dönüş yapılmalıdır. Dönel (göbekli) kavşaklarda ise göbekteki (dönel kavşak içindeki) araç, göbeğe girmek isteyen araca göre önceliklidir.",
      },
      {
        baslik: "Yayaya geçiş hakkı",
        metin:
          "Taşıt yoluna girmiş veya girmek üzere olan yayaya, özellikle yaya geçidinde, dönüş yapan tüm araçlar yol vermek zorundadır. Bu kural kırmızı ışıkta sağa dönüşe izin verilen kavşaklarda özellikle kritik önem taşır; sağa dönerken karşıdan gelen yayaya öncelik verilmelidir.",
      },
      {
        baslik: "Geçiş üstünlüğü olan araçlar",
        metin:
          "Görev hâlindeyken şu araçlar geçiş üstünlüğüne sahiptir: ambulans, itfaiye, polis ve jandarma araçları, sivil savunma araçları, cenaze ve kan/organ/doku taşıyan araçlar. Bu araçlar sesli (siren) ve/veya ışıklı (led/flaşör) uyarı verdiğinde, diğer tüm sürücüler hızını azaltıp mümkünse sağa yanaşarak yol vermek zorundadır. Bu araçlar görev hâlinde kırmızı ışıkta bile, kavşağı kontrol ederek dikkatli biçimde geçebilir; ancak bu, diğer sürücülere onlara yol verme yükümlülüğünü kaldırmaz.",
      },
      {
        baslik: "Geçiş üstünlüğünün sınırları",
        metin:
          "Geçiş üstünlüğü, o aracın her türlü kural ihlaline hakkı olduğu anlamına gelmez; sürücü yine de dikkatli olmalı ve trafik güvenliğini tehlikeye atmamalıdır. Diğer sürücüler ise siren/flaşör sesini duyduklarında panik yapmadan, aniden fren yapmadan güvenli şekilde sağa çekilmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Kontrolsüz kavşakta eşit yollarda sağdaki araca öncelik verilir.",
      "Ana yoldaki araç, tali yoldaki araca göre her zaman önceliklidir.",
      "Dönüş yapan araç, düz gidene ve karşıdan gelene yol verir.",
      "Ambulans, itfaiye, polis görevdeyken geçiş üstünlüğüne sahiptir.",
      "Öncelikli araç sireni duyulduğunda sağa yanaşıp yol verilir.",
      "Sağa dönerken karşıdan gelen yayaya her zaman öncelik verilir.",
      "Dönel kavşakta göbekteki araç, girmek isteyene göre önceliklidir.",
    ],
  },
  {
    id: "hiz-kurallari",
    dersId: "trafik",
    baslik: "Hız Kuralları ve Takip Mesafesi",
    ozet:
      "Yol ve araç türüne göre hız sınırları, güvenli takip mesafesi ve fren/duruş mesafesi hesabı.",
    ikon: "speedometer",
    okumaSuresiDk: 12,
    kapakGorsel: "hiz-tablosu",
    bolumler: [
      {
        baslik: "Otomobil için azami hız sınırları",
        metin:
          "Otomobiller için Karayolu Trafik Yönetmeliği'nde belirlenen genel azami hızlar şöyledir:\n• Yerleşim yeri içi: 50 km/s\n• Yerleşim yeri dışı, şehirler arası çift yönlü (bölünmemiş) yol: 90 km/s\n• Bölünmüş yol (yön ayrımı yapılmış yol): 110 km/s\n• Otoyol: 120 km/s\nBu sınırlar 'azami', yani en fazla izin verilen hızlardır; hava, yol ve trafik durumu kötüyse (sis, yağmur, kar, yoğun trafik) bu sınırların altına inilmesi zorunludur.",
        gorsel: "hiz-tablosu",
      },
      {
        baslik: "Diğer araç türlerinde hız",
        metin:
          "Minibüs, kamyonet gibi araçlarda hız sınırları otomobile göre biraz daha düşük olabilir; kamyon, otobüs ve römork çeken araçlarda ise otoyol ve bölünmüş yollarda daha da düşük sınırlar uygulanır çünkü bu araçların durma mesafesi ve devrilme riski daha yüksektir. Motosikletler otomobil ile aynı genel sınırlara tabidir. Yeni sürücüler (ilk 1 yıl) için bazı hız sınırları daha da düşük tutulabilir.",
      },
      {
        baslik: "Asgari (minimum) hız sınırı",
        metin:
          "Otoyollarda ve bazı bölünmüş yollarda çok düşük hızla seyretmek de trafiği tehlikeye atar; bu nedenle asgari hız sınırı konulabilir ve mavi mecburiyet levhasıyla gösterilir. Asgari hızın altında seyretmek gerektiğinde (arıza, yavaş araç) dörtlü flaşör yakılıp sağ şeride geçilmelidir.",
      },
      {
        baslik: "Takip mesafesi ve 2 saniye kuralı",
        metin:
          "Takip mesafesi, öndeki araca güvenle tepki verilebilecek uzaklıktır. Klasik kural, aracın hızının en az yarısı kadar metre bırakılmasıdır (örneğin 90 km/s'te en az 45 metre). Günümüzde daha pratik olan '2 saniye kuralı' kullanılır: öndeki araç sabit bir noktayı (levha, direk) geçtiğinde zihinden '1000-bir, 1000-iki' diye sayılır; siz o noktaya bu süre dolmadan ulaşıyorsanız takip mesafesi yetersizdir. Yağmur, sis, kar gibi olumsuz koşullarda bu süre 4-6 saniyeye çıkarılmalıdır.",
        gorsel: "takip-mesafesi",
      },
      {
        baslik: "Duruş mesafesinin bileşenleri",
        metin:
          "Duruş mesafesi iki bölümden oluşur:\n1. Tepki (algılama-karar) mesafesi: Tehlikeyi görüp fren pedalına basana kadar geçen sürede alınan yoldur; sürücünün dikkat düzeyine, yorgunluğuna ve hıza bağlıdır.\n2. Fren mesafesi: Frene basıldıktan sonra aracın tamamen durana kadar aldığı yoldur; hız arttıkça bu mesafe hızın karesiyle orantılı olarak (kat kat) artar.\nBu iki mesafenin toplamı toplam duruş mesafesini verir. Örneğin 50 km/s'te birkaç metre olan fren mesafesi, 120 km/s'te çok daha fazla artar.",
      },
      {
        baslik: "Zemin durumunun etkisi",
        metin:
          "Islak asfaltta fren mesafesi kuru asfalta göre belirgin şekilde uzar; buzlu veya karlı zeminde bu mesafe kat kat daha da artar ve lastik-yol tutunması ciddi biçimde azalır. Bu koşullarda hem hız düşürülmeli hem takip mesafesi artırılmalıdır. Yağışın ilk dakikalarında yol yüzeyindeki yağ ve toz kalıntıları suyla karışıp yolu daha da kaygan hâle getirebilir.",
      },
      {
        baslik: "Hız ve çarpma etkisi",
        metin:
          "Hız arttıkça çarpma anındaki kinetik enerji karesel olarak büyür; bu yüzden hızı iki katına çıkarmak, çarpma etkisini yaklaşık dört katına çıkarır. Bu fiziksel gerçek, hız sınırlarının neden bu kadar sıkı uygulandığını ve şehir içinde 50 km/s sınırının neden hayat kurtardığını açıklar.",
      },
    ],
    anahtarNoktalar: [
      "Yerleşim yeri içi otomobil hızı 50 km/s.",
      "Bölünmüş yolda 110 km/s, otoyolda azami 120 km/s.",
      "Takip mesafesi için pratik yöntem: 2 saniye kuralı.",
      "Duruş mesafesi = tepki mesafesi + fren mesafesi.",
      "Hız iki katına çıkınca çarpma etkisi yaklaşık dört katına çıkar.",
      "Islak/buzlu yolda fren mesafesi uzar; hız düşürülmelidir.",
      "Kötü hava/yol/trafik koşulunda azami hızın altına inilmesi zorunludur.",
    ],
  },
  {
    id: "sollama",
    dersId: "trafik",
    baslik: "Geçme (Sollama) Kuralları",
    ozet:
      "Sollamanın güvenli yapılış sırası, yasak olduğu yerler ve sollanan aracın sorumlulukları.",
    ikon: "swap-horizontal",
    okumaSuresiDk: 9,
    kapakGorsel: "sollama-kural",
    bolumler: [
      {
        baslik: "Sollama nedir ve genel kural",
        metin:
          "Sollama (geçme), aynı yönde seyreden ve önde bulunan bir aracın yanından geçilerek önüne geçilmesidir. Türkiye'de trafik sağdan akar, bu nedenle sollama kural olarak soldan yapılır. Sağdan geçme yalnızca öndeki aracın sola dönüş sinyali verip yavaşladığı veya şerit sayısı buna uygun olduğu özel durumlarda mümkündür.",
      },
      {
        baslik: "Doğru sollama sırası",
        metin:
          "Güvenli bir sollama şu adımlarla yapılır:\n1. Arka ve yan aynalar ile kör nokta kontrol edilir.\n2. Sol sinyal verilir.\n3. Karşı yön ve sol şerit tamamen boşsa hızlanarak şeride geçilir.\n4. Öndeki araç güvenle geçildikten sonra sağ sinyal verilerek eski şeride dönülür.\n5. Şeride dönüldükten sonra sinyal kapatılır.\nSollama sırasında hız, geri dönüşü güvenle tamamlayacak kadar yeterli olmalıdır; yetersiz hızla başlanan sollama karşıdan gelen araçla çarpışma riski oluşturur.",
      },
      {
        baslik: "Sollamanın yasak olduğu yerler",
        metin:
          "Sollama şu yerlerde yasaktır:\n1. Dönemeç (viraj) ve tepe üstü gibi görüşün kısıtlı olduğu yerlerde\n2. Yaya ve okul geçitlerinde\n3. Kavşaklarda (ışıklı kavşaklarda geçiş serbestse istisna olabilir)\n4. Köprü ve tünellerde, bunlara yaklaşım bölgelerinde\n5. Devamlı yer işaretlemesi (çizgi) bulunan yerlerde\n6. Görüş mesafesinin yetersiz olduğu sis, kar, şiddetli yağmur gibi hava koşullarında\nBu yerlerin ortak özelliği, karşıdan gelebilecek bir aracın önceden görülememesi veya ani hareket riskinin yüksek olmasıdır.",
      },
      {
        baslik: "Sollanan aracın görevleri",
        metin:
          "Sollanmakta olan araç sürücüsü hızını artırmamalı, mümkünse sağa yanaşarak sollayan aracın işini kolaylaştırmalıdır. Sollama tamamlanana kadar şerit değiştirmemeli ve ani manevralardan kaçınmalıdır. Karşıdan araç geliyorsa veya sollayan araç henüz güvenle tamamlayamamışsa, sollanan araç hız kesip yol vermelidir.",
      },
      {
        baslik: "Kolon (sıra) hâlinde sollama",
        metin:
          "Birden fazla aracın art arda gittiği bir kolonu sollarken, tüm kolonu bir kerede geçmeye çalışmak yerine karşı şeridin uzun süre boş olduğundan kesin emin olunmalıdır. Kalabalık kolonlarda sollamaya başlamak, ortada karşıdan araç çıkması hâlinde geri dönüşü zorlaştırdığından yüksek risklidir.",
      },
      {
        baslik: "Motosiklet ve bisikletlileri sollama",
        metin:
          "Motosiklet ve bisikletlileri sollarken normal bir otomobile göre daha fazla yanal boşluk (en az 1-1,5 metre) bırakılmalıdır; çünkü bu araçlar rüzgâr, çukur gibi etkenlerle ani denge kaybedebilir. Sollama sonrası hemen öne kesmek yerine güvenli mesafe bırakılarak şeride dönülmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Sollama kural olarak soldan yapılır.",
      "Doğru sıra: aynaları kontrol et, sinyal ver, geç, sinyal ver, dön.",
      "Viraj, tepe üstü, kavşak, köprü ve tünelde sollama yasaktır.",
      "Devamlı çizgi bulunan yerde sollama yapılamaz.",
      "Sollanan araç hızını artırmaz, sağa yanaşarak kolaylaştırır.",
      "Motosiklet/bisiklet sollarken en az 1-1,5 m yanal boşluk bırakılır.",
      "Kalabalık kolon sollamada karşı şeridin uzun süre boş olması gerekir.",
    ],
  },
  {
    id: "duraklama-park",
    dersId: "trafik",
    baslik: "Duraklama ve Park Etme Kuralları",
    ozet:
      "Duraklama ile park arasındaki fark, yasak olan yerler ve park etme tekniklerinde dikkat edilecekler.",
    ikon: "car",
    okumaSuresiDk: 9,
    kapakGorsel: "park-yasak",
    bolumler: [
      {
        baslik: "Duraklama ve park etme farkı",
        metin:
          "Duraklama, trafik ve yol durumunun gerektirdiği hâller dışında; yolcu indirme/bindirme, yükleme/boşaltma gibi nedenlerle aracın kısa süreli (genellikle sürücüsü araçtan ayrılmadan) durdurulmasıdır. Park etme ise sürücünün araçtan ayrılarak aracı belirsiz bir süre için bırakmasıdır. Bu ayrım, hangi yerlerde hangi yasakların uygulanacağını belirlemede önemlidir; duraklama yasağı olan her yerde park da yasaktır ama bunun tersi değildir (bazı yerlerde kısa duraklama serbestken park yasak olabilir).",
      },
      {
        baslik: "Duraklamanın yasak olduğu yerler",
        metin:
          "Duraklamak şu yerlerde yasaktır:\n1. Yaya ve okul geçitleri üzerinde\n2. Kavşaklar, kavşak yakını ve dönemeçlerde\n3. Tünel, köprü ve bunlara yaklaşım bölgelerinde\n4. Görüş mesafesinin yetersiz olduğu tepe üstü ve viraj gibi yerlerde\n5. Duraklamanın yasaklandığını belirten levha bulunan yerlerde\n6. Işıklı veya işaretli kavşaklarda geçişi engelleyecek şekilde",
        gorsel: "park-yasak",
      },
      {
        baslik: "Park etmenin ek yasakları",
        metin:
          "Duraklamanın yasak olduğu her yerde park etmek de yasaktır. Bunlara ek olarak park etmek şu yerlerde de yasaktır:\n1. Yangın musluğu, hidrant çevresinde belirli bir mesafe içinde\n2. Engelli park yerlerinde (yetkisiz kullanım)\n3. Otobüs, taksi ve dolmuş duraklarında\n4. Bina ve tesislerin araç giriş-çıkış (geçiş) yolları önünde\n5. Başka bir aracın çıkışını veya trafik akışını engelleyecek şekilde\n6. Taşıt yolunun karşı tarafında park edilmiş araçla çift sıra oluşturarak",
      },
      {
        baslik: "Engelli ve yaşlı bireylere yönelik park kuralları",
        metin:
          "Engelli park yerleri, üzerinde tekerlekli sandalye sembolü bulunan alanlardır ve sadece uygun engelli park kartı olan araçlar için ayrılmıştır. Bu alanları yetkisiz kullanmak trafik cezasına tabidir. Bazı yerleşim yerlerinde ücretli/kontrollü park alanları (mavi kart, parkomat) bulunur; süre aşımı ayrıca cezalandırılır.",
      },
      {
        baslik: "Doğru park teknikleri",
        metin:
          "Park ederken araç, yol kenarına paralel, dik veya çapraz olacak şekilde levha ve çizgilerle belirtilen düzene uygun bırakılmalıdır. Yokuş yukarı park ederken ön tekerlekler yola doğru (yoldan uzağa) çevrilir; yokuş aşağı park ederken tekerlekler kaldırıma doğru çevrilir; bu, el freni boşalsa bile aracın kontrolsüz kaymasını önler. Park sonrası el freni çekilmeli, vites (özellikle manuel araçlarda) uygun konuma alınmalıdır.",
      },
      {
        baslik: "Gece park etme kuralları",
        metin:
          "Yerleşim yeri dışındaki yollarda gece park edilen araçlarda park lambaları (veya yansıtıcı işaretler) açık bırakılmalı, mümkünse araç yol dışına çekilmelidir; aksi hâlde geceleyin fark edilmeyen park edilmiş araç ciddi kazalara neden olabilir.",
      },
    ],
    anahtarNoktalar: [
      "Duraklama kısa süreli beklemedir, park ise aracı bırakmaktır.",
      "Duraklamanın yasak olduğu her yerde park da yasaktır.",
      "Kavşak, geçit, köprü, tünel ve virajlarda duraklama yasaktır.",
      "Yangın musluğu, engelli yeri ve durak önüne park edilmez.",
      "Başkasının çıkışını engelleyecek park yapılamaz.",
      "Yokuşta park ederken tekerlekler yola veya kaldırıma çevrilir.",
      "Yerleşim yeri dışında gece park edilen araçta park lambası açılır.",
    ],
  },
  {
    id: "yaya-gecit",
    dersId: "trafik",
    baslik: "Yaya, Okul ve Hemzemin Geçitler",
    ozet:
      "Yaya önceliği, okul geçidinde dikkatli davranış ve demir yolu geçitlerinde güvenlik kuralları.",
    ikon: "walk",
    okumaSuresiDk: 8,
    kapakGorsel: "yaya-gecit-diyagram",
    bolumler: [
      {
        baslik: "Yaya geçidinde temel kural",
        metin:
          "Yaya geçidine yaklaşan sürücü hızını azaltmalı; geçitte olan veya geçmek üzere olan yayaya her koşulda ilk geçiş hakkını vermelidir. Yaya geçidi üzerine hiçbir şekilde araç durdurulamaz, park edilemez; trafik sıkışıklığında bile geçit boş tutulmalıdır. Işıksız yaya geçitlerinde sürücü, yaya geçitten geçmeye başlamamış olsa da yaklaşan yayanın niyetini gözeterek yavaşlamalıdır.",
        gorsel: "yol-cizgileri",
      },
      {
        baslik: "Görme ve hareket engelli yayalar",
        metin:
          "Beyaz baston kullanan görme engelli yayalar geçitte veya yol kenarında görüldüğünde araç tamamen durdurulmalı ve güvenle geçmesi sağlanmalıdır. Tekerlekli sandalye kullanan veya yürümekte güçlük çeken yayalara da ekstra süre ve öncelik tanınmalıdır.",
      },
      {
        baslik: "Okul geçidi ve okul taşıtı kuralları",
        metin:
          "Okul geçidi levhası veya yer işaretlemesi bulunan bölgelerde çocukların ani ve öngörülemez hareketlerine karşı hız iyice düşürülmeli, gerekirse tam olarak durulmalıdır. Okul geçiş görevlisi (trafik gönüllüsü öğrenci veya öğretmen) geçiş yaptırırken kesinlikle beklenmelidir. Duran bir okul servisinin önünde/yanında dörtlü flaşörü yanıyorsa, karşı yönden gelen araçlar dahil dikkatle ve düşük hızla geçilmelidir çünkü çocuklar servisin önünden veya arkasından aniden çıkabilir.",
      },
      {
        baslik: "Hemzemin (demir yolu) geçidi genel kuralları",
        metin:
          "Hemzemin geçit, karayolu ile demir yolunun aynı seviyede kesiştiği yerdir. Bariyerli (bekçili) geçitte bariyer kapanmaya başladığı anda veya kapalıyken kesinlikle geçit üzerine girilmez ve beklenir. Işıklı-sesli uyarı (çan sesi, kırmızı yanıp sönen ışık) aktifse de aynı şekilde durulur.",
      },
      {
        baslik: "Bariyersiz geçitlerde davranış",
        metin:
          "Bariyer ve görevli bulunmayan hemzemin geçitlerde sürücü, geçide yaklaşırken yavaşlamalı, her iki yöne de bakarak tren gelip gelmediğini kontrol etmeli ve emin olduktan sonra dikkatle geçmelidir. Geçit üzerinde asla durulmaz, vites değiştirilmez ve geçit tamamen boşaltılmadan bir sonraki araç geçide girmemelidir; trafik sıkışıksa geçit üzerinde kalma riski varsa geçide hiç girilmemelidir.",
      },
      {
        baslik: "Geçit üzerinde arıza durumu",
        metin:
          "Araç hemzemin geçit üzerinde arızalanır veya durursa, öncelik yolcuların ve sürücünün hemen araçtan inip güvenli bölgeye çekilmesidir; ardından mümkünse araç iteklenerek geçit dışına çıkarılmalı, mümkün değilse yetkililer ve tren idaresi en hızlı şekilde bilgilendirilmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Yaya geçidinde yayaya her koşulda ilk geçiş hakkı verilir.",
      "Görme engelli yaya görüldüğünde araç tam olarak durdurulur.",
      "Okul geçidinde hız iyice düşürülür, görevli varsa beklenir.",
      "Duran okul servisi yanından çok dikkatli ve yavaş geçilir.",
      "Hemzemin geçitte bariyer kapalı/kapanıyorsa kesinlikle beklenir.",
      "Geçit üzerinde asla durulmaz veya vites değiştirilmez.",
      "Geçitte arıza olursa önce yolcular güvenli bölgeye alınır.",
    ],
  },
  {
    id: "aydinlatma-sinyal",
    dersId: "trafik",
    baslik: "Aydınlatma ve Sinyal Kullanımı",
    ozet:
      "Far, sinyal, dörtlü flaşör ve korna kullanım kuralları; gündüz ve gece sürüşte görünürlük yönetimi.",
    ikon: "sunny",
    okumaSuresiDk: 10,
    kapakGorsel: "far-turleri",
    bolumler: [
      {
        baslik: "Far çeşitleri ve görevleri",
        metin:
          "Kısa far (yakın far): Karanlıkta, yerleşim yeri içinde ve görüşün azaldığı her durumda kullanılan standart aydınlatmadır; karşıdan gelen sürücüyü kamaştırmaz.\nUzun far (selektör/far ışıldatma): Yerleşim yeri dışında, karşıdan veya önden araç yokken, kısa farın yeterli görüş sağlayamadığı boş yollarda kullanılır. Karşıdan araç gelince veya öndeki araca yaklaşınca hemen kısa fara geçilmelidir; aksi hâlde karşı sürücünün gözü kamaşır ve ciddi kaza riski oluşur.\nSis farı: Yalnızca sis, kar, şiddetli yağmur veya toz gibi görüşü ciddi biçimde azaltan hava koşullarında yakılır; hava açıkken kullanılması diğer sürücüleri yanıltır ve yasaktır.",
        gorsel: "far-turleri",
      },
      {
        baslik: "Gündüz far kullanımı",
        metin:
          "Gündüz normal koşullarda far kullanımı zorunlu değildir; ancak uzun tünel, yoğun sis, şiddetli yağmur veya toz fırtınası gibi görüşün belirgin biçimde azaldığı durumlarda gündüz de kısa far yakılmalıdır. Bazı araçlarda bulunan gündüz sürüş lambaları (DRL), aracın diğer sürücüler tarafından fark edilirliğini artırır.",
      },
      {
        baslik: "Sinyal (dönüş göstergesi) kullanımı",
        metin:
          "Sağa/sola dönüş, şerit değiştirme, park manevrası ve yoldan çıkış öncesinde ilgili yönde sinyal verilmesi zorunludur. Sinyal, manevraya başlamadan yeterli bir süre önce (yaklaşık 30 metre veya birkaç saniye önce) verilmeli, manevra tamamlanınca hemen kapatılmalıdır. Sinyali açık unutmak veya manevradan hemen önce vermek diğer sürücüleri yanıltır ve tehlikelidir; bu nedenle sinyal, niyetin erkenden ve doğru şekilde bildirilmesi anlamına gelir.",
      },
      {
        baslik: "Dörtlü flaşör (dörtlü ikaz) kullanımı",
        metin:
          "Dörtlü flaşör; ani arıza, kaza, trafik kazası sonrası bekleme, çekilen araç veya zorunlu ani duruş gibi durumlarda diğer sürücüleri uyarmak için kullanılır. Bazı sürücüler yoğun sis veya ani yavaşlama durumunda arkadan gelenleri uyarmak için de kısa süreli dörtlü flaşör kullanır. Normal seyir hâlinde sürekli dörtlü flaşör yakmak (örneğin park hâlinde değilken) yanlış bir alışkanlıktır ve diğer sürücülerin sinyal niyetini anlamasını zorlaştırır.",
      },
      {
        baslik: "Korna kullanımı",
        metin:
          "Korna yalnızca tehlike anında diğer yol kullanıcılarını uyarmak amacıyla ve kısa süreli olarak kullanılır. Yerleşim yeri içinde, gece saatlerinde ve hastane/okul gibi yerlerde gereksiz korna kullanımı hem yasal hem de görgü açısından uygunsuzdur; gürültü kirliliği yaratır. Kavşakta sıkışan trafikte sabırsızlıkla korna çalmak nezaketsizliktir ve genellikle hiçbir sorunu çözmez.",
      },
      {
        baslik: "Gece sürüşte far disiplini",
        metin:
          "Gece yerleşim yeri içinde kısa far tercih edilmelidir. Şehirler arası boş yollarda uzun far kullanılabilir ancak arkadan/karşıdan gelen bir araç fark edildiğinde vakit geçirmeden kısa fara dönülmelidir. Öndeki aracı takip ederken de uzun far kapatılmalı; aksi hâlde öndeki sürücünün dikiz aynasından gözü kamaşır.",
      },
    ],
    anahtarNoktalar: [
      "Karşıdan veya önden araç gelince uzun far kapatılıp kısa fara geçilir.",
      "Sis farı yalnızca sis/kar/şiddetli yağmur gibi görüş azlığında kullanılır.",
      "Sinyal manevradan yeterince önce verilir, bitince kapatılır.",
      "Dörtlü flaşör arıza, kaza veya zorunlu ani duruş uyarısıdır.",
      "Korna sadece tehlike anında ve kısa süreli kullanılır.",
      "Gündüz görüş azalırsa (tünel, sis) far yakılmalıdır.",
      "Öndeki aracı takip ederken uzun far kapatılmalıdır.",
    ],
  },
  {
    id: "cevre-guvenlik",
    dersId: "trafik",
    baslik: "Çevreye Duyarlılık ve Trafik Güvenliği",
    ozet:
      "Yakıt tasarrufu, gürültü ve egzoz kirliliği ile emniyet kemeri, kask gibi güvenli sürüş alışkanlıkları.",
    ikon: "leaf",
    okumaSuresiDk: 8,
    kapakGorsel: "emniyet-kemeri",
    bolumler: [
      {
        baslik: "Çevreci (ekonomik) sürüş alışkanlıkları",
        metin:
          "Düzenli bakım, doğru lastik basıncı ve dengeli, öngörülü hız yönetimi yakıt tüketimini ve egzoz emisyonunu belirgin şekilde azaltır. Ani hızlanma ve ani frenleme, sabit hızlı sürüşe göre çok daha fazla yakıt tüketir ve motor/fren aşınmasını hızlandırır. Trafik ışığında veya uzun beklemelerde gereksiz yere rölantide çalıştırmak da hem yakıt kaybı hem de gereksiz emisyon anlamına gelir.",
      },
      {
        baslik: "Egzoz emisyonu ve hava kalitesi",
        metin:
          "Motorlu taşıtların egzoz gazları karbonmonoksit, azot oksitler ve partikül madde içerir; bu kirleticiler hava kalitesini düşürür ve sağlığı olumsuz etkiler. Düzenli motor bakımı, temiz hava filtresi ve uygun yakıt kullanımı emisyonu azaltır. Egzoz muayenesi periyodik araç muayenesinin önemli bir parçasıdır.",
      },
      {
        baslik: "Gürültü kirliliği",
        metin:
          "Gereksiz korna kullanımı, modifiye edilmiş (susturucusuz veya değiştirilmiş egzoz) araçlar ve yüksek sesle müzik çalma gürültü kirliliği yaratır; özellikle gece saatlerinde ve yerleşim bölgelerinde bu davranışlar hem yasal hem toplumsal açıdan uygunsuzdur.",
      },
      {
        baslik: "Atık ve çevre temizliği",
        metin:
          "Araçtan dışarı çöp, sigara izmariti veya herhangi bir atık atmak yasaktır; bu davranış çevreyi kirletir, yangın riskini artırır ve diğer sürücüler için trafik güvenliğini tehlikeye atabilir (örneğin fırlatılan bir cisim başka bir aracın camını kırabilir).",
      },
      {
        baslik: "Emniyet kemeri kullanımı",
        metin:
          "Emniyet kemeri, kaza anında sürücü ve yolcunun aracın içinde savrulmasını, ön cama veya direksiyona çarpmasını önler; hayatta kalma ve yaralanmayı azaltma şansını büyük ölçüde artırır. Kemer, tüm koltuklardaki (ön ve arka) yolcular için zorunludur; kısa mesafe veya şehir içi sürüşte de takılmalıdır çünkü kazaların büyük bölümü kısa mesafelerde meydana gelir.",
        gorsel: "emniyet-kemeri",
      },
      {
        baslik: "Kask ve çocuk koruyucu sistemleri",
        metin:
          "Motosiklet ve moped kullanan sürücü ve arkasındaki yolcu için kask kullanımı zorunludur; kask baş ve kafatası yaralanmalarını büyük oranda azaltır. Küçük çocuklar için boy ve kiloya uygun çocuk koltuğu (oto koltuğu) kullanılmalı, çocuk asla ön koltukta hava yastığına karşı korumasız taşınmamalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Dengeli hız, düzenli bakım yakıt tüketimini ve kirliliği azaltır.",
      "Ani hızlanma/frenleme yakıt tüketimini artırır.",
      "Gereksiz korna ve modifiye egzoz gürültü kirliliği yaratır.",
      "Araçtan dışarı atık/çöp atmak yasaktır ve tehlikelidir.",
      "Emniyet kemeri ön ve arka koltukta tüm yolcular için zorunludur.",
      "Motosiklette sürücü ve yolcu için kask kullanımı zorunludur.",
      "Çocuklar boy/kiloya uygun çocuk koltuğunda taşınmalıdır.",
    ],
  },
  {
    id: "belgeler-cezalar",
    dersId: "trafik",
    baslik: "Sürücü Belgeleri ve Trafik Cezaları",
    ozet:
      "Ehliyet sınıfları, araç belgeleri, ceza puanı sistemi ve alkol/madde kullanımına ilişkin yasal sınırlar.",
    ikon: "document-text",
    okumaSuresiDk: 10,
    kapakGorsel: "belge-kontrol",
    bolumler: [
      {
        baslik: "Araçta bulundurulması gereken belgeler",
        metin:
          "Araç kullanırken yanında bulunması gereken temel belgeler:\n1. Sürücü belgesi (ehliyet): İlgili araç sınıfını kullanma yetkisini gösterir.\n2. Araç tescil belgesi (ruhsat): Aracın kayıtlı sahibini ve teknik bilgilerini gösterir.\n3. Zorunlu mali sorumluluk sigortası (trafik sigortası): Kazada üçüncü şahıslara verilecek zararları karşılar.\nBu belgeler trafik denetimlerinde görevliye ibraz edilmek zorundadır; eksikliği idari para cezasına yol açar.",
      },
      {
        baslik: "Sürücü belgesi sınıfları",
        metin:
          "Sürücü belgeleri kullanılacak araç türüne göre sınıflandırılır (örneğin M, A1/A2, B, C, D, E gibi sınıflar); her sınıf farklı asgari yaş ve araç ağırlığı/kapasitesi şartına bağlıdır. B sınıfı otomobil, C sınıfı kamyon, D sınıfı otobüs, E sınıfı ise römork çekebilen ağır araç sürücülerini kapsar. Sürücü belgesi olmadan veya sınıfı uymayan araç kullanmak ağır idari ve cezai sonuçlar doğurur.",
      },
      {
        baslik: "Ceza puanı sistemi",
        metin:
          "Trafik kurallarını ihlal eden sürücüye, ihlalin ağırlığına göre belirlenen ceza puanı yazılır. Bir yıl içinde toplam 100 ceza puanını dolduran sürücünün belgesi belirli bir süre için geri alınır; tekrarında bu süre uzar ve sürücü psikoteknik değerlendirme/eğitim programına yönlendirilebilir. Bu sistem, tekrarlanan kural ihlallerini caydırmayı amaçlar.",
      },
      {
        baslik: "Alkol ve madde kullanımı sınırları",
        metin:
          "Alkollü araç kullanmak trafik güvenliğini doğrudan tehdit eder ve yasaktır; belirlenen promil sınırının üzerinde alkol tespit edilen sürücüye idari para cezası uygulanır, belgesi geçici olarak geri alınır ve tekrarında ceza ağırlaşır. Yeni sürücülerde (belirli bir süre) ve toplu taşıma/ticari araç sürücülerinde alkol sınırı sıfırdır, yani hiç alkol tespit edilmemelidir. Uyuşturucu/uyarıcı madde etkisinde araç kullanmak ise çok daha ağır yaptırımlara (belge iptali, cezai kovuşturma) tabidir.",
      },
      {
        baslik: "Belge iptali ve geri alma süreci",
        metin:
          "Ağır kusurlu kazaya sebep olma, alkollü/uyuşturucu etkisinde araç kullanma, hız limitini çok aşma gibi ciddi ihlallerde belge belirli bir süre geri alınabilir veya tamamen iptal edilebilir. Belgesi geri alınan sürücü, bu süre boyunca hiçbir sınıf araç kullanamaz; buna uymamak ayrı bir suç oluşturur.",
      },
      {
        baslik: "Denetim ve teknik muayene",
        metin:
          "Araçların periyodik teknik muayeneden geçmesi zorunludur; muayenesi geçmiş araç trafiğe çıkarılamaz ve idari para cezası uygulanır. Denetimlerde sürücü belgesi, ruhsat, sigorta poliçesi ve muayene durumu birlikte kontrol edilir.",
      },
    ],
    anahtarNoktalar: [
      "Ehliyet, ruhsat ve trafik sigortası her zaman araçta bulundurulmalıdır.",
      "Sürücü belgesi sınıfları kullanılan araç türüne göre değişir.",
      "Bir yılda 100 ceza puanı dolunca belge belirli süre geri alınır.",
      "Alkollü araç kullanmak yasaktır; yeni ve ticari sürücülerde sınır sıfırdır.",
      "Uyuşturucu etkisinde araç kullanmak çok ağır yaptırımlara tabidir.",
      "Ağır ihlallerde sürücü belgesi iptal edilebilir.",
      "Muayenesi geçmiş araç trafiğe çıkarılamaz.",
    ],
  },
];
