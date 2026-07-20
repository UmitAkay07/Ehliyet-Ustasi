import type { Soru } from "@/types";

export const ADAB_SORULARI: Soru[] = [
  {
    id: "s-ad-001",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin: "Trafik adabı kavramı en doğru şekilde nasıl tanımlanır?",
    secenekler: [
      "Sadece trafik cezalarından kaçınmak",
      "Kurallara uymanın yanında trafikte saygı, nezaket ve sorumluluk gösterme kültürü",
      "Hızlı araç kullanma becerisi",
      "Sadece kırmızı ışıkta durmak",
    ],
    dogruIndex: 1,
    aciklama:
      "Trafik adabı; kurallara uymanın ötesinde, diğer yol kullanıcılarına saygı, nezaket ve sorumluluk gösterme kültürüdür.",
    zorluk: "kolay",
  },
  {
    id: "s-ad-002",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin:
      "Kendini diğer yol kullanıcısının yerine koyarak onun duygularını anlamaya çalışmak hangi değere karşılık gelir?",
    secenekler: ["Öfke", "Empati", "Bencillik", "Acelecilik"],
    dogruIndex: 1,
    aciklama:
      "Empati, kendini diğerinin yerine koyabilmektir ve trafikte güvenli, saygılı davranışın temelidir.",
    zorluk: "kolay",
  },
  {
    id: "s-ad-003",
    dersId: "adab",
    konuId: "ad-temel-degerler",
    metin:
      "Kişinin kendi çıkarından önce başkalarının güvenliğini düşünmesi hangi kavramla ifade edilir?",
    secenekler: ["Diğergamlık (özgecilik)", "Saldırganlık", "Kayıtsızlık", "Rekabet"],
    dogruIndex: 0,
    aciklama:
      "Diğergamlık (özgecilik), kişinin kendi çıkarından önce başkalarının güvenlik ve iyiliğini gözetmesidir.",
    zorluk: "orta",
  },
  {
    id: "s-ad-004",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Trafikte öfkenin sürüş üzerindeki etkisi aşağıdakilerden hangisidir?",
    secenekler: [
      "Dikkati artırır",
      "Doğru karar vermeyi kolaylaştırır",
      "Dikkati dağıtır ve kaza riskini artırır",
      "Refleksleri güçlendirir",
    ],
    dogruIndex: 2,
    aciklama:
      "Öfke, dikkati dağıtır, hatalı kararlar aldırır ve kaza riskini önemli ölçüde artırır.",
    zorluk: "kolay",
  },
  {
    id: "s-ad-005",
    dersId: "adab",
    konuId: "ad-ofke-stres",
    metin: "Aşağıdakilerden hangisi saldırgan sürücü davranışıdır?",
    secenekler: [
      "Takip mesafesini korumak",
      "Öndeki araca çok yakın (dip) takip yapmak ve makas atmak",
      "Sinyalleri zamanında kullanmak",
      "Yayaya yol vermek",
    ],
    dogruIndex: 1,
    aciklama:
      "Yakın takip (dip yapma), makas atma, gereksiz korna/selektör saldırgan sürücü davranışlarıdır.",
    zorluk: "kolay",
  },
  {
    id: "s-ad-006",
    dersId: "adab",
    konuId: "ad-takip-mesafesi",
    metin: "Normal hava ve yol koşullarında öndeki araçla en az kaç saniyelik takip mesafesi önerilir?",
    secenekler: ["1 saniye", "2 saniye", "5 saniye", "Süre önemli değildir"],
    dogruIndex: 1,
    aciklama:
      "Güvenli takip için '2 saniye kuralı' uygulanır; kötü hava ve gece koşullarında bu süre artırılır.",
    zorluk: "orta",
  },
  {
    id: "s-ad-007",
    dersId: "adab",
    konuId: "ad-takip-mesafesi",
    metin: "Sıkışık trafikte iki şeridin birleştiği yerde uygulanan nezaket kuralı hangisidir?",
    secenekler: [
      "Zorla öne geçmek",
      "Sırayla (fermuar sistemi) geçiş yapmak",
      "Korna çalarak beklemek",
      "Banketten gitmek",
    ],
    dogruIndex: 1,
    aciklama:
      "Şeritlerin birleştiği yerde 'fermuar sistemi' ile sırayla geçiş yapmak hem güvenli hem de nezaket kuralıdır.",
    zorluk: "orta",
  },
  {
    id: "s-ad-008",
    dersId: "adab",
    konuId: "ad-alkol-yorgunluk",
    metin: "Alkolün sürücü üzerindeki etkisi aşağıdakilerden hangisidir?",
    secenekler: [
      "Refleksleri hızlandırır",
      "Dikkati ve karar verme yeteneğini bozar, refleksleri yavaşlatır",
      "Görüşü keskinleştirir",
      "Hiçbir etkisi yoktur",
    ],
    dogruIndex: 1,
    aciklama:
      "Alkol; refleksleri yavaşlatır, dikkati ve karar verme yeteneğini bozar. Alkollü araç kullanmak yasaktır.",
    zorluk: "kolay",
  },
  {
    id: "s-ad-009",
    dersId: "adab",
    konuId: "ad-alkol-yorgunluk",
    metin: "Uzun yol sürüşünde yorgunluk ve uykululuk için en doğru davranış hangisidir?",
    secenekler: [
      "Kahve içip devam etmek yeterlidir",
      "Belirli aralıklarla (yaklaşık her 2 saatte) mola verip dinlenmek",
      "Camı açıp hızlanmak",
      "Radyoyu açıp devam etmek",
    ],
    dogruIndex: 1,
    aciklama:
      "Yorgunluk alkol kadar tehlikelidir; uzun yolda yaklaşık her 2 saatte bir mola verilmeli, uyku bastığında durulmalıdır.",
    zorluk: "orta",
  },
  {
    id: "s-ad-010",
    dersId: "adab",
    konuId: "ad-kaza-davranis",
    metin: "Sadece maddi hasarlı bir trafik kazasında taraflar anlaşıyorsa ne yapılmalıdır?",
    secenekler: [
      "Araçlar olay yerinde bırakılıp gidilir",
      "Kaza tespit tutanağı doldurulup araçlar trafiği aksatmayacak şekilde kenara çekilir",
      "Araçlar olduğu yerde bırakılır ve haftalarca beklenir",
      "Hiçbir işlem yapılmadan ayrılınır",
    ],
    dogruIndex: 1,
    aciklama:
      "Maddi hasarlı kazada taraflar anlaşıyorsa kaza tespit tutanağı doldurulup imzalanır ve araçlar kenara çekilir.",
    zorluk: "orta",
  },
];
