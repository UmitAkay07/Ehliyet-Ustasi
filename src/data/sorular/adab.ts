import type { Soru } from "@/types";

export const ADAB_SORULARI: Soru[] = [
  {
    id: "adab-001",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Trafikteki diğer sürücülere, yayalara ve yolculara karşı saygı, hoşgörü, yardımlaşma ve empati gibi değerleri barındıran kurallar bütününe ne ad verilir?",
    secenekler: ["Trafik cezası", "Sürücü belgesi", "Trafik adabı", "Geçiş üstünlüğü"],
    dogruIndex: 2,
    aciklama: "Trafik kurallarının yazılı olmayan, insan ilişkilerine ve ahlaki değerlere dayanan kısmına 'Trafik Adabı' denir.",
    zorluk: "kolay"
  },
  {
    id: "adab-002",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Kırmızı ışıkta beklerken, ışık sarıya döner dönmez önündeki araca kornaya basarak acele ettiren bir sürücünün hangi değeri taşımadığı söylenebilir?",
    secenekler: ["Öfke", "Sabır", "İnatlaşma", "Aşırı hız"],
    dogruIndex: 1,
    aciklama: "Trafikte saniyeler içinde kornaya basıp diğer sürücüleri taciz etmek sabırsızlık örneğidir. Sabırlı bir sürücü yeşil ışığın yanmasını ve öndeki aracın güvenle kalkmasını bekler.",
    zorluk: "kolay"
  },
  {
    id: "adab-003",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Trafikte hata yapan bir sürücüyü uyarmak isteyen diğer sürücünün, el kol hareketleri ve yüksek sesle bağırmak yerine daha nazik bir beden dili kullanması neyin göstergesidir?",
    secenekler: ["Trafik adabına uygun iletişimin", "Sürücünün kuralları bilmediğinin", "Korktuğunun", "Haklı çıkmaya çalıştığının"],
    dogruIndex: 0,
    aciklama: "Trafikte iletişim, sadece kurallarla değil beden diliyle de sağlanır. Nezaket ve yapıcı uyarılar trafik adabının temelidir.",
    zorluk: "orta"
  },
  {
    id: "adab-004",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Aşağıdakilerden hangisi öfkeli bir sürücünün sergileyebileceği tehlikeli davranışlardan biri DEĞİLDİR?",
    secenekler: ["Öndeki aracı çok yakından takip etmek", "Sürekli şerit değiştirerek (makas atarak) ilerlemek", "Hız limitlerine ve trafik işaretlerine uymak", "Gereksiz yere korna kullanmak"],
    dogruIndex: 2,
    aciklama: "Öfkeli sürücüler genellikle kural ihlali yapmaya meyillidir. Hız limitlerine ve işaretlere uymak öfkeli değil, sakin ve kurallara uyan bir sürücünün özelliğidir.",
    zorluk: "kolay"
  },
  {
    id: "adab-005",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Trafikte empati kurabilen bir sürücüden aşağıdakilerden hangisini yapması beklenir?",
    secenekler: ["Yağmurlu havada yayaların yanından geçerken yavaşlayıp su sıçratmamaya özen göstermesi", "Kavşaklarda geçiş hakkını her zaman kendi kullanması", "Arkasından siren çalarak gelen ambulansa yol vermemek için hızlanması", "Engelli park yerine aracını park etmesi"],
    dogruIndex: 0,
    aciklama: "Empati, kendini başkasının yerine koymaktır. Yağmurlu havada yürüyen bir yayanın yerine kendini koyan sürücü, suyu sıçratmamak için yavaşlar.",
    zorluk: "orta"
  },
  {
    id: "adab-006",
    dersId: "adab",
    konuId: "ad-kaza-davranis",
    metin: "Aracının arıza yapması nedeniyle yolda kalmış ve trafiği aksatmış bir sürücüye, oradan geçen diğer bir sürücünün durup yardım etmesi aşağıdaki değerlerden hangisiyle açıklanır?",
    secenekler: ["Bencillik", "Diğerkamlık (Yardımlaşma ve feragat)", "Sorumsuzluk", "İnatlaşma"],
    dogruIndex: 1,
    aciklama: "Diğerkamlık, başkalarının yararını gözetme, onlara yardım etme duygusudur. Trafikte yardımlaşmak, trafik adabının en güzel örneklerinden biridir.",
    zorluk: "orta"
  },
  {
    id: "adab-007",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Sürücülerin trafikteki davranışlarının, sadece cezadan korktukları için değil, içselleştirdikleri ahlaki kurallar çerçevesinde doğru olması gerektiğine inanan bir kişi neye vurgu yapmaktadır?",
    secenekler: ["Trafik denetimlerinin yetersizliğine", "Sürücü belgelerinin zor alınmasına", "Trafik kültürünün ve iç denetimin (vicdanın) önemine", "Cezaların artırılmasına"],
    dogruIndex: 2,
    aciklama: "Trafik adabı sadece polis veya kamera varken kurala uymak değil, iç denetim ve vicdan sayesinde her zaman doğru olanı yapmaktır.",
    zorluk: "zor"
  },
  {
    id: "adab-008",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Aşağıdakilerden hangisi trafikte sürücüler arasında 'dezavantajlı gruplar' olarak adlandırılan ve daha fazla dikkat/hoşgörü gösterilmesi gereken kişilerden biri DEĞİLDİR?",
    secenekler: ["Çocuklar ve yaşlılar", "Hamile kadınlar", "Engelli bireyler", "Genç ve spor otomobil kullanan sürücüler"],
    dogruIndex: 3,
    aciklama: "Çocuklar, yaşlılar, hamileler ve engelliler trafikte fiziksel olarak dezavantajlıdır ve onlara karşı ekstra sabırlı ve dikkatli olunmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "adab-009",
    dersId: "adab",
    konuId: "ad-kaza-davranis",
    metin: "Kaza sonrasında tarafların birbirine hakaret etmesi ve kavgaya tutuşması, trafik ortamında hangi duygunun yönetilemediğini gösterir?",
    secenekler: ["Saygı", "Öfke kontrolü", "Heyecan", "Sevinç"],
    dogruIndex: 1,
    aciklama: "Stresli durumlarda (örneğin kaza anında) sakin kalamayıp kavga etmek, öfke kontrolü eksikliğinin bir sonucudur.",
    zorluk: "kolay"
  },
  {
    id: "adab-010",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Seyir halindeyken telefonuna mesaj gelen bir sürücünün, trafiği tehlikeye atmamak adına telefonuna bakmayıp uygun bir yerde durmayı beklemesi hangi özelliğe sahip olduğunu gösterir?",
    secenekler: ["Sorumluluk bilinci", "Saldırganlık", "Bencillik", "Acelecilik"],
    dogruIndex: 0,
    aciklama: "Kendinin ve başkalarının can güvenliğini riske atmamak, trafikteki kurallara harfiyen uymak yüksek bir sorumluluk bilinci gerektirir.",
    zorluk: "orta"
  },
  {
    id: "adab-011",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Bir sürücünün aracındaki çöpü camdan yola atması, trafik adabı açısından değerlendirildiğinde aşağıdakilerden hangisiyle ifade edilebilir?",
    secenekler: ["Yardımlaşma", "Çevreye karşı saygısızlık ve sorumsuzluk", "Pratik zeka", "Özdenetim"],
    dogruIndex: 1,
    aciklama: "Çevreyi kirletmek, diğer sürücüler ve yayalar için risk oluşturmanın yanı sıra çevreye ve topluma karşı büyük bir saygısızlıktır.",
    zorluk: "kolay"
  },
  {
    id: "adab-012",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Trafik sıkışıklığı nedeniyle uzun süre beklemek zorunda kalan bir sürücünün, stresini azaltmak için sakinleştirici müzik dinlemesi veya derin nefes alması hangi becerisini kullandığını gösterir?",
    secenekler: ["Stresle başa çıkma ve öfke yönetimi", "İletişim becerisi", "Sürüş tekniği", "Zaman yönetimi"],
    dogruIndex: 0,
    aciklama: "Trafikte oluşan stresli anlarda kendini sakinleştirecek yöntemler (müzik, derin nefes) kullanmak başarılı bir stres yönetimidir.",
    zorluk: "orta"
  },
  {
    id: "adab-013",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Geceleri karşıdan gelen bir araç varken uzun farları açık bırakıp karşıdaki sürücünün gözünü kamaştırmak, trafik adabı açısından hangi kavramın ihlal edildiğini gösterir?",
    secenekler: ["Sabır", "Hız kuralı", "Diğer sürücülere karşı saygı", "Araç bakım zorunluluğu"],
    dogruIndex: 2,
    aciklama: "Karşıdaki sürücünün görüşünü engellemek kazaya davetiye çıkarmaktır ve diğer sürücülerin haklarına büyük bir saygısızlıktır. Karşılaşmalarda kısa farlar kullanılmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "adab-014",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Yaya geçidinde bekleyen bir yayaya yol vermek yerine, hızını artırarak onu korkutup geçişini engelleyen bir sürücü için aşağıdakilerden hangisi söylenebilir?",
    secenekler: ["Empati yeteneği gelişmiştir", "Trafik kurallarına çok hakimdir", "Bencil ve hak ihlali yapan bir yapıya sahiptir", "Zamanı çok iyi yönetmektedir"],
    dogruIndex: 2,
    aciklama: "Yaya geçitlerinde ilk geçiş hakkı her zaman yayalarındır. Yayaların bu hakkını gasp etmek bencillik ve hak ihlalidir.",
    zorluk: "orta"
  },
  {
    id: "adab-015",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Hiç kimsenin (polis, kamera vb.) bulunmadığı boş bir yolda dahi, kırmızı ışıkta durup yeşilin yanmasını bekleyen bir sürücü hangi trafik adabı unsuruna sahiptir?",
    secenekler: ["İç denetim (Vicdan)", "Öfke kontrolü", "Sosyal etki", "Ekonomik sürüş"],
    dogruIndex: 0,
    aciklama: "Denetleyen biri olmamasına rağmen kurallara uymak, kişinin yüksek bir iç denetime (vicdan ve sorumluluk duygusuna) sahip olduğunu gösterir.",
    zorluk: "orta"
  },
  {
    id: "adab-016",
    dersId: "adab",
    konuId: "ad-takip-mesafesi",
    metin: "Trafikte öndeki aracı sürekli olarak çok yakından (tampon tampona) takip etmek, hangi trafik adabı ve kuralına aykırıdır?",
    secenekler: ["Hız limitlerine", "Takip mesafesi kuralına ve saygıya", "Geçiş üstünlüğüne", "Duraklama kurallarına"],
    dogruIndex: 1,
    aciklama: "Öndeki aracı yakından takip etmek hem takip mesafesi kuralını ihlal eder hem de öndeki sürücüyü taciz edip strese soktuğu için saygısızlıktır.",
    zorluk: "kolay"
  },
  {
    id: "adab-017",
    dersId: "adab",
    konuId: "ad-alkol-yorgunluk",
    metin: "Alkol almış bir sürücünün direksiyon başına geçmemesi, sadece kanuni bir zorunluluk değil, aynı zamanda aşağıdakilerden hangisinin bir gereğidir?",
    secenekler: ["Bencilliğin", "Trafik adabı ve toplumsal sorumluluğun", "İnatlaşmanın", "Saldırganlığın"],
    dogruIndex: 1,
    aciklama: "Alkollü araç kullanmamak, başkalarının canını tehlikeye atmamak demektir. Bu büyük bir toplumsal sorumluluk ve trafik adabı gereğidir.",
    zorluk: "orta"
  },
  {
    id: "adab-018",
    dersId: "adab",
    konuId: "ad-kaza-davranis",
    metin: "Maddi hasarlı bir trafik kazasına karışan sürücülerin, polisi beklemeden kendi aralarında anlaşıp Tutanak tutarak yolu trafiğe açmaları hangi trafik adabı kavramıyla bağdaşır?",
    secenekler: ["Sorun çözme becerisi ve uzlaşma kültürü", "Sorumluluktan kaçma", "Korkaklık", "Acelecilik"],
    dogruIndex: 0,
    aciklama: "Sürücülerin kavga etmeden, medeni bir şekilde uzlaşarak tutanak tutması ve trafiği tıkamaması çok iyi bir sorun çözme ve uzlaşma örneğidir.",
    zorluk: "orta"
  },
  {
    id: "adab-019",
    dersId: "adab",
    konuId: "ad-alkol-yorgunluk",
    metin: "Uzun yola çıkacak bir sürücünün yorgun ve uykusuz bir şekilde araç kullanmakta ısrar etmesi, aşağıdakilerden hangisinin eksikliğini gösterir?",
    secenekler: ["Özgüven", "Sorumluluk bilinci", "Cesaret", "Sürüş tekniği"],
    dogruIndex: 1,
    aciklama: "Yorgun ve uykusuz araç kullanmak kazaya davetiye çıkarmaktır. Bunu yapan sürücü, hem kendi hem de başkalarının canını hiçe saydığı için sorumluluk bilincinden yoksundur.",
    zorluk: "kolay"
  },
  {
    id: "adab-020",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Trafikte kendisine yol vermeyen veya hatalı sollama yapan bir sürücüye küfür edip el hareketi çeken bir sürücü, hangi alanda eksiklik yaşamaktadır?",
    secenekler: ["Direksiyon hakimiyeti", "Duygu (Öfke) kontrolü", "Araç bilgisi", "İlkyardım bilgisi"],
    dogruIndex: 1,
    aciklama: "Trafikteki hatalara agresif, küfürlü ve kavgacı tepkiler vermek öfke kontrolünün sağlanamadığını gösterir.",
    zorluk: "kolay"
  }
];
