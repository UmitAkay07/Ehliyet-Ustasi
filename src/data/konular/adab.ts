import type { Konu } from "@/types";

export const ADAB_KONULARI: Konu[] = [
  {
    id: "ad-temel-degerler",
    dersId: "adab",
    baslik: "Trafik Adabı ve Temel Değerler",
    ozet:
      "Trafikte sorumluluk, saygı, nezaket, empati ve diğergamlık kavramları ile örnek sürücü davranışları.",
    ikon: "heart-circle",
    okumaSuresiDk: 9,
    kapakGorsel: "trafik-degerler",
    bolumler: [
      {
        baslik: "Trafik adabı nedir?",
        metin:
          "Trafik adabı; yazılı kuralların ötesinde, trafikte diğer insanlara saygı, nezaket ve sorumluluk gösterme kültürüdür. Bir sürücünün sadece hız sınırına uyması veya kırmızı ışıkta durması yeterli değildir; kuralların açıkça düzenlemediği anlarda (örneğin sıkışık trafikte kimin geçeceği, kimin bekleyeceği gibi durumlarda) nasıl davrandığı, o sürücünün trafik adabını yansıtır. Trafik adabı, aslında toplumun genel ahlak ve nezaket kültürünün karayolundaki yansımasıdır.",
      },
      {
        baslik: "Sorumluluk değeri",
        metin:
          "Sorumluluk, bir sürücünün kendi davranışlarının sonuçlarını üstlenmesi ve bu sonuçları önceden düşünerek hareket etmesidir. Emniyet kemeri takmak, hız sınırına uymak, aracını düzenli bakımdan geçirmek, alkollü araç kullanmamak gibi davranışlar sorumluluk bilincinin somut göstergeleridir. Sorumlu bir sürücü, 'kural ihlali yakalanmazsam sorun olmaz' değil, 'kural ihlali başkasının hayatını tehlikeye atar' mantığıyla hareket eder.",
      },
      {
        baslik: "Saygı ve empati",
        metin:
          "Saygı, diğer sürücü, yaya ve bisikletlilerin haklarını ve güvenliğini gözetmektir; örneğin şerit değiştirirken sinyal vermek, yayaya yol vermek, yaşlı veya engelli bireylere ekstra zaman tanımak saygının göstergeleridir. Empati ise kendini diğer yol kullanıcısının yerine koyarak onun bakış açısından duruma bakabilmektir; örneğin acele eden bir sürücünün, arkasındaki aracın da acelesi olabileceğini düşünmesi empatinin bir örneğidir.",
      },
      {
        baslik: "Sabır ve öngörülülük",
        metin:
          "Sabır, trafikte aceleci ve saldırgan davranışlardan uzak durmayı; öngörülülük ise olası riskleri önceden fark ederek tedbir almayı ifade eder. Trafikte sabırlı bir sürücü, sıkışık bir kavşakta beklemesi gerektiğinde sinirlenip kural ihlaline (örneğin karşı şeride geçme) başvurmaz; bunun yerine sırasını bekler ve genel akışa katkıda bulunur.",
      },
      {
        baslik: "Diğergamlık (özgecilik)",
        metin:
          "Diğergamlık, kişinin kendi çıkarından önce başkalarının iyiliğini ve güvenliğini düşünmesidir. Trafikte diğergam davranış örnekleri: yaya geçidinde bekleyen yayaya durup yol vermek, ambulans veya itfaiyeye hemen yol açmak, dar bir yolda karşıdan gelen araca öncelik vermek, sıkışık trafikte fermuar kuralına (sırayla geçiş) uymak. Bu davranışlar kısa vadede küçük bir zaman kaybı gibi görünse de uzun vadede tüm trafik akışını iyileştirir ve kaza riskini azaltır.",
      },
      {
        baslik: "Örnek sürücü olmanın önemi",
        metin:
          "Bir sürücünün davranışları, özellikle araçtaki çocuklar ve yeni sürücüler için model oluşturur. Trafik kurallarına uyan, nazik ve sakin bir sürücü, çevresindekilere de iyi bir örnek olur ve genel trafik kültürünün gelişmesine katkı sağlar. Toplumsal düzeyde trafik adabının yaygınlaşması, kaza sayılarını ve trafik kaynaklı gerginlikleri azaltan en etkili yöntemlerden biridir.",
      },
    ],
    anahtarNoktalar: [
      "Trafik adabı, kuralların ötesinde bir saygı ve nezaket kültürüdür.",
      "Sorumluluk, davranışın sonucunu önceden düşünüp üstlenmektir.",
      "Empati, kendini diğer yol kullanıcısının yerine koymaktır.",
      "Sabır, aceleci ve saldırgan davranışlardan uzak durmaktır.",
      "Diğergamlık, başkasının güvenliğini kendi çıkarının önüne koymaktır.",
      "Yayaya, ambulansa ve dar yolda karşı araca öncelik vermek diğergam davranıştır.",
      "Örnek sürücü davranışı, çevredekiler için model oluşturur.",
    ],
  },
  {
    id: "ad-ofke-stres",
    dersId: "adab",
    baslik: "Öfke, Stres ve Saldırgan Sürücülük",
    ozet:
      "Yol öfkesinin nedenleri, kontrol yöntemleri ve saldırgan sürüş davranışlarının riskleri.",
    ikon: "flame-outline",
    okumaSuresiDk: 9,
    kapakGorsel: "ofke-kontrol",
    bolumler: [
      {
        baslik: "Yol öfkesi (road rage) nedir?",
        metin:
          "Yol öfkesi, trafikte yaşanan olaylar (başka bir sürücünün hatası, sıkışıklık, gecikme) karşısında kontrolsüz biçimde sinirlenme ve bu sinirin agresif davranışlara dönüşmesidir. Öfke anında beyin, mantıklı karar verme kapasitesini kaybederek dürtüsel tepkiler üretir; bu da hatalı manevralar, riskli sollamalar ve çarpışma riskinin artmasına yol açar.",
      },
      {
        baslik: "Öfkenin sürüşe etkileri",
        metin:
          "Öfke; dikkati dağıtır, görüş alanını (tünel görme etkisiyle) daraltır, tepki süresini uzatır ve risk algısını bozar. Öfkeli bir sürücü, normalde asla yapmayacağı riskli manevraları (ani şerit değiştirme, aşırı hız, tehlikeli sollama) yapma eğilimine girer. Araştırmalar, öfkeli sürüşün kaza olasılığını önemli ölçüde artırdığını göstermektedir.",
      },
      {
        baslik: "Öfkeyle baş etme teknikleri",
        metin:
          "Öfke anında etkili olan bazı teknikler:\n1. Derin ve yavaş nefes almak, birkaç saniye bekleyip tepki vermeden düşünmek.\n2. Olayı büyütmemek; başka bir sürücünün hatasının kişisel bir saldırı olmadığını hatırlamak.\n3. Karşı tarafla göz göze gelmemek, tartışmaya veya kornaya karşılık vermemek.\n4. 'Ben trafikte örnek bir sürücüyüm' gibi kendine hatırlatıcı bir düşünce geliştirmek.\n5. Gerekirse güvenli bir yerde durup birkaç dakika sakinleşmek.",
      },
      {
        baslik: "Stres yönetimi ve sürüş",
        metin:
          "İş, aile veya kişisel sorunlardan kaynaklanan stres, trafiğe taşındığında dikkat dağınıklığına ve sabırsızlığa yol açabilir. Uzun yolculuk öncesi zaman planlaması yapmak (trafiğe erken çıkmak, mola noktaları belirlemek) stresi azaltır. Müzik dinlemek, sakin bir sürüş temposu benimsemek ve gerektiğinde mola vermek stres düzeyini kontrol altında tutmaya yardımcı olur.",
      },
      {
        baslik: "Saldırgan sürücülük davranışları",
        metin:
          "Aşağıdaki davranışlar saldırgan sürücülük kapsamında değerlendirilir ve hem kaza riskini hem trafik gerginliğini artırır:\n1. Ani ve sinyal vermeden şerit değiştirme.\n2. Yakın takip (dip yapma) - güvenli takip mesafesini kasıtlı olarak ihlal etme.\n3. Gereksiz ve uzun süreli korna kullanımı, selektör yakma.\n4. Makas atma (bir araçtan diğerine hızlı şerit değişimleriyle geçme).\n5. Kasıtlı olarak başka bir aracın önünü kesme.\n6. Yol vermeme, kasıtlı hız kesme veya hızlanma ile diğer sürücüyü rahatsız etme.",
      },
      {
        baslik: "Saldırgan sürücüyle karşılaşınca ne yapmalı?",
        metin:
          "Saldırgan bir sürücüyle karşılaşıldığında en güvenli tepki, ona karşılık vermemek, yol açmak ve mesafeyi korumaktır. Tartışmaya girmek veya misilleme yapmak durumu daha da tehlikeli hâle getirebilir. Ciddi bir tehdit hissedildiğinde güvenli, kalabalık bir yere (benzin istasyonu, karakol önü) gidilmeli ve gerekirse yetkililere haber verilmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Yol öfkesi mantıklı karar verme kapasitesini bozar, kaza riskini artırır.",
      "Öfke tepki süresini uzatır ve görüş alanını daraltır.",
      "Derin nefes alma ve olayı büyütmeme öfkeyi kontrol etmeye yardımcı olur.",
      "Yol planlaması ve mola vermek stresi azaltır.",
      "Yakın takip, makas atma ve gereksiz korna saldırgan sürücülüktür.",
      "Saldırgan sürücüye karşılık vermek yerine yol açıp mesafe korunmalıdır.",
      "Sakin sürücü davranışı hem kendi hem başkalarının güvenliğini korur.",
    ],
  },
  {
    id: "ad-takip-mesafesi",
    dersId: "adab",
    baslik: "Güvenli Takip Mesafesi ve Yolu Paylaşma",
    ozet:
      "2 saniye kuralı, yola çıkma sorumluluğu, fermuar sistemi ve farklı yol kullanıcılarıyla paylaşım.",
    ikon: "resize",
    okumaSuresiDk: 9,
    kapakGorsel: "2-saniye",
    bolumler: [
      {
        baslik: "Güvenli takip mesafesinin önemi",
        metin:
          "Güvenli takip mesafesi, öndeki araç aniden fren yaptığında veya beklenmedik bir engelle karşılaşıldığında güvenle tepki verebilmek için gereken uzaklıktır. Yetersiz takip mesafesi, zincirleme kazaların (art arda birden fazla aracın birbirine çarpması) en sık nedenlerinden biridir; bu nedenle takip mesafesi hem yasal bir zorunluluk hem de trafik adabının önemli bir parçasıdır.",
      },
      {
        baslik: "2 saniye kuralının uygulanışı",
        metin:
          "2 saniye kuralı, hıza bağlı olmayan, pratik ve her koşulda uygulanabilen bir yöntemdir:\n1. Öndeki aracın sabit bir referans noktayı (levha, direk, yol çizgisi) geçtiği anı belirleyin.\n2. Zihninizden 'bin bir, bin iki' diye sayın (yaklaşık 2 saniye).\n3. Kendi aracınız o referans noktaya bu süre dolmadan ulaşıyorsa, takip mesafeniz yetersizdir ve mesafeyi artırmalısınız.\nBu yöntem hem şehir içinde hem şehirler arası yolda kolayca uygulanabilir ve sürücüye objektif bir geri bildirim sağlar.",
        gorsel: "2-saniye",
      },
      {
        baslik: "Koşullara göre mesafe artırma",
        metin:
          "Kötü hava koşullarında (yağmur, sis, kar), gece sürüşte, yorgunluk hissedildiğinde veya ağır/büyük araçları takip ederken 2 saniye kuralı 4-6 saniyeye kadar uzatılmalıdır. Bu durumlarda hem görüş mesafesi azalır hem de fren mesafesi uzar; bu nedenle standart mesafe yetersiz kalır.",
      },
      {
        baslik: "Yolu paylaşma bilinci",
        metin:
          "Karayolu, motorlu araçların yanı sıra yayalar, bisikletliler, motosikletliler ve toplu taşıma araçlarının da ortak kullanım alanıdır. Her yol kullanıcısının farklı hız, görünürlük ve manevra kabiliyeti vardır; bir otomobil sürücüsü bisikletlinin ani bir rüzgârla veya çukurla dengesini kaybedebileceğini, motosikletlinin görüş açısının daha kısıtlı olabileceğini bilerek daha dikkatli ve hoşgörülü davranmalıdır.",
      },
      {
        baslik: "Fermuar sistemi",
        metin:
          "Sıkışık trafikte, özellimle şerit daralması veya birleşmesi olan noktalarda, 'fermuar sistemi' denilen nezaket kuralı uygulanır: araçlar sırayla, bir sizden bir karşı şeritten olacak şekilde geçiş yapar. Bu sistem, tüm sürücülerin son ana kadar kendi şeridinde kalıp sırayla geçiş yapmasını, erken şerit değiştirerek öne geçmeye çalışmamayı gerektirir; bu sayede trafik akışı daha düzenli ve hızlı ilerler.",
      },
      {
        baslik: "Toplu taşıma ve ağır araçlara karşı davranış",
        metin:
          "Otobüs, kamyon gibi büyük araçların görüş açısı (özellikle yan ve arka kör noktalar) otomobillere göre daha kısıtlıdır; bu araçların yakınında uzun süre kör noktada kalmaktan kaçınılmalı, dönüşlerde geniş yer ihtiyacı olduğu bilinerek fazladan mesafe bırakılmalıdır. Duraktan kalkan bir otobüse veya dönüş yapan bir kamyona yol vermek, trafik adabının somut bir göstergesidir.",
      },
    ],
    anahtarNoktalar: [
      "Yetersiz takip mesafesi zincirleme kazaların başlıca nedenidir.",
      "2 saniye kuralı: öndeki aracın geçtiği noktaya erken varmak tehlike işaretidir.",
      "Kötü hava/gece/yorgunlukta mesafe 4-6 saniyeye çıkarılmalıdır.",
      "Trafik ortak bir alandır; yaya, bisikletli ve motosikletliye hoşgörü gösterilmelidir.",
      "Fermuar sisteminde araçlar sırayla, karşılıklı geçiş yapar.",
      "Ağır araçların kör noktasında uzun süre kalınmamalıdır.",
      "Otobüs ve kamyona yol vermek trafik adabının somut örneğidir.",
    ],
  },
  {
    id: "ad-alkol-yorgunluk",
    dersId: "adab",
    baslik: "Alkol, İlaç ve Yorgunluğun Etkisi",
    ozet:
      "Alkol ve yorgunluğun sürüş yeteneğine etkisi, ilaç kullanımı ve uyku/dikkat yönetimi.",
    ikon: "wine",
    okumaSuresiDk: 8,
    kapakGorsel: "alkol-etki",
    bolumler: [
      {
        baslik: "Alkolün sürüş üzerindeki etkileri",
        metin:
          "Alkol, kan yoluyla beyne ulaşarak merkezi sinir sistemini doğrudan etkiler. Sürüş açısından en kritik etkileri:\n1. Refleksleri ve tepki süresini yavaşlatır.\n2. Dikkat ve konsantrasyon yeteneğini bozar.\n3. Mesafe ve hız algısını yanıltır.\n4. Karar verme yeteneğini zayıflatır.\n5. Yanlış bir 'kendine güven' (cesaret yanılsaması) yaratır; kişi kendini normalden daha yetenekli sanır.\nBu etkiler, kandaki alkol miktarı arttıkça katlanarak büyür ve düşük miktarlarda alkolde bile fark edilir düzeyde ortaya çıkabilir.",
      },
      {
        baslik: "Yasal sınırlar ve yaptırımlar",
        metin:
          "Alkollü araç kullanmak yasaktır ve belirlenen promil sınırının üzerinde tespit edilen sürücüye idari para cezası, sürücü belgesinin geçici geri alınması gibi yaptırımlar uygulanır. Yeni sürücülerde ve toplu taşıma/ticari araç sürücülerinde alkol sınırı sıfırdır; bu gruplar hiç alkol almadan araç kullanmalıdır. Alkol seviyesi arttıkça yaptırımlar da ağırlaşır.",
      },
      {
        baslik: "İlaç kullanımı ve sürüş",
        metin:
          "Bazı reçeteli veya reçetesiz ilaçlar (özellikle antihistaminikler, bazı ağrı kesiciler, sakinleştiriciler) uyku hâli, dikkat dağınıklığı veya reaksiyon süresinde yavaşlama gibi yan etkiler yaratabilir. İlaç kullanan sürücü, prospektüsteki 'araç ve makine kullanımına etkisi' bölümünü okumalı, gerekiyorsa doktoruna sürüş güvenliği hakkında danışmalıdır. Alkol ile bazı ilaçların birlikte alınması etkileri ciddi biçimde artırabilir.",
      },
      {
        baslik: "Yorgunluk ve uykusuzluğun etkisi",
        metin:
          "Yorgunluk ve uyku eksikliği, birçok çalışmada alkol kadar tehlikeli bulunmuştur; tepki süresini uzatır, dikkati azaltır ve 'mikro uyku' (birkaç saniyelik fark edilmeyen uyuma anları) riskini artırır. Özellikle gece sürüşü, monoton otoyol yolculukları ve uzun mesafeler yorgunluğun etkilerini artırır. Yorgunluk belirtileri arasında sık esneme, göz kapaklarının ağırlaşması, şeritte kayma ve son birkaç kilometreyi hatırlayamama sayılabilir.",
      },
      {
        baslik: "Yorgunlukla mücadele yöntemleri",
        metin:
          "Uzun yolculuklarda her 2 saatte bir veya 150-200 km'de bir mola verilmesi önerilir; mola sırasında araçtan inip kısa yürüyüş yapmak, temiz hava almak faydalıdır. Uyku bastırdığında kafein (kahve) geçici rahatlama sağlayabilir ama kalıcı çözüm değildir; en güvenli çözüm güvenli bir yerde durup kısa süreli (15-20 dakika) şekerleme yapmaktır. Yolculuk öncesi yeterli uyku almak, en etkili önlemdir.",
      },
      {
        baslik: "Sorumlu sürücünün tercihleri",
        metin:
          "Alkol alınacak bir etkinlik öncesinde 'sorumlu sürücü' (o gece alkol almayacak ve diğerlerini evine götürecek kişi) belirlemek, taksi/toplu taşıma kullanmak veya güvenilir birinden yardım istemek, alkollü araç kullanmanın en pratik ve hayat kurtarıcı alternatifleridir.",
      },
    ],
    anahtarNoktalar: [
      "Alkol refleksleri yavaşlatır, dikkati bozar ve yanlış özgüven yaratır.",
      "Alkollü araç kullanmak yasaktır; yeni ve ticari sürücülerde sınır sıfırdır.",
      "Bazı ilaçlar uyku hâli yaparak sürüşü tehlikeli kılar, prospektüs okunmalıdır.",
      "Yorgunluk ve uykusuzluk alkol kadar tehlikeli kabul edilir.",
      "Mikro uyku, fark edilmeden oluşan kısa uyuma anlarıdır ve çok risklidir.",
      "Uzun yolda her 2 saatte/150-200 km'de bir mola verilmelidir.",
      "Alkol alınacak etkinlik öncesi sorumlu sürücü belirlenmelidir.",
    ],
  },
  {
    id: "ad-kaza-davranis",
    dersId: "adab",
    baslik: "Kaza Sonrası Doğru Davranış",
    ozet:
      "Kaza anında sakin kalma, güvenlik alma, doğru bildirim ve maddi/yaralanmalı kaza prosedürleri.",
    ikon: "car-outline",
    okumaSuresiDk: 8,
    kapakGorsel: "ilk-yardim-oncelik",
    bolumler: [
      {
        baslik: "Kaza anında ilk tepki",
        metin:
          "Bir trafik kazası meydana geldiğinde ilk yapılması gereken sakin kalmaya çalışmaktır; panik, doğru karar vermeyi zorlaştırır. Araç hareket ettirilebiliyorsa ve sadece maddi hasar varsa, trafik akışını engellememek için araç güvenli bir yere (yol kenarı, banket) çekilmelidir. Hareket ettirilemiyorsa veya yaralanma varsa araç yerinden kımıldatılmamalıdır.",
      },
      {
        baslik: "Olay yerinde güvenlik önlemleri",
        metin:
          "Kaza sonrası hemen dörtlü flaşör yakılmalı ve ikaz üçgeni (reflektör) aracın arkasına, şehir içinde en az 50 metre, şehir dışında 100-150 metre mesafeye yerleştirilmelidir. Bu, arkadan gelen araçların zamanında fark edip yavaşlamasını sağlar ve zincirleme kazaları önler. Gece veya sisli havada bu mesafeler daha da artırılmalıdır.",
      },
      {
        baslik: "Yaralı varsa yapılması gerekenler",
        metin:
          "Kazada yaralı varsa hemen 112 aranmalı, olay yeri adresi ve yaralı sayısı/durumu net bildirilmelidir. Yaralılar, hayati tehlike (yangın, patlama, yeniden çarpışma riski) olmadıkça yerlerinden oynatılmamalı; sağlık ekibi gelene kadar bilinç ve solunum durumu izlenmelidir. Bu adımlar İlk Yardım dersinde detaylı olarak ele alınan olay yeri güvenliği ilkeleriyle birebir örtüşür.",
      },
      {
        baslik: "Maddi hasarlı kaza prosedürü",
        metin:
          "Sadece maddi hasar olan ve taraflar arasında anlaşmazlık bulunmayan kazalarda, taraflar birlikte 'kaza tespit tutanağı' doldurup imzalayabilir; bu tutanak sigorta şirketine iletilerek hasar süreci başlatılır. Tutanak doldurulduktan sonra araçlar trafiği aksatmayacak şekilde kenara çekilmeli, mümkünse kaza yerinin fotoğrafları çekilmelidir (araçların ilk konumu, hasar detayları, plakalar).",
      },
      {
        baslik: "Yaralanmalı/ölümlü kaza prosedürü",
        metin:
          "Yaralanma veya ölümle sonuçlanan kazalarda araçların yeri, yetkililer (polis/jandarma) gelmeden değiştirilmemelidir; bu, kaza nedeninin doğru tespiti için önemlidir. Zorunlu olmadıkça (yangın, trafik güvenliği gibi acil durumlar dışında) hiçbir şey kaza yerinden kaldırılmamalı veya değiştirilmemelidir. Taraflar sakin kalmalı, tartışmadan kaçınmalı ve yetkilinin talimatlarını izlemelidir.",
      },
      {
        baslik: "Kaza sonrası iletişim ve sorumluluk",
        metin:
          "Kaza sonrası karşı tarafla iletişimde saygılı ve sakin bir dil kullanmak, suçlayıcı veya agresif tavırlardan kaçınmak önemlidir; asıl sorumluluk belirleme süreci sigorta ve yetkililer tarafından yürütülür. Kaza yapan sürücünün kaçması (yardım etmeden veya bildirim yapmadan olay yerinden ayrılması) hem etik hem hukuki açıdan ağır bir sorumluluk doğurur ve kesinlikle yapılmamalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Kaza sonrası önce sakin kalınır, güvenlik alınır (flaşör, reflektör).",
      "Reflektör şehir içi ~50 m, şehir dışı ~100-150 m mesafeye konur.",
      "Yaralı varsa 112 aranır, yaralı zorunlu olmadıkça hareket ettirilmez.",
      "Maddi hasarda anlaşmaya varılırsa tutanak doldurulup araçlar çekilir.",
      "Yaralanmalı/ölümlü kazada araç yeri değiştirilmez, yetkili beklenir.",
      "Kaza sonrası fotoğraf çekmek sigorta sürecine yardımcı olur.",
      "Olay yerinden bildirim yapmadan ayrılmak ağır bir sorumluluktur.",
    ],
  },
];
