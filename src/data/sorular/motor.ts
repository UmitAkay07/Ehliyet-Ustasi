import type { Soru } from "@/types";

export const MOTOR_SORULARI: Soru[] = [
  {
    id: "s-mt-001",
    dersId: "motor",
    konuId: "mt-motor-calisma",
    metin: "Dört zamanlı bir motorun çalışma sırası aşağıdakilerden hangisidir?",
    secenekler: [
      "Emme - Ateşleme - Sıkıştırma - Egzoz",
      "Emme - Sıkıştırma - Ateşleme - Egzoz",
      "Sıkıştırma - Emme - Egzoz - Ateşleme",
      "Egzoz - Emme - Sıkıştırma - Ateşleme",
    ],
    dogruIndex: 1,
    aciklama:
      "Dört zamanlı motorun çalışma sırası: Emme, Sıkıştırma, Ateşleme (iş), Egzoz şeklindedir.",
    zorluk: "orta",
  },
  {
    id: "s-mt-002",
    dersId: "motor",
    konuId: "mt-motor-calisma",
    metin: "Benzinli motorlarda yakıt-hava karışımını ateşleyen parça hangisidir?",
    secenekler: ["Enjektör", "Buji", "Distribütör kapağı", "Karbüratör"],
    dogruIndex: 1,
    aciklama: "Benzinli motorlarda sıkıştırılan yakıt-hava karışımını buji kıvılcımı ateşler.",
    zorluk: "kolay",
  },
  {
    id: "s-mt-003",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Araç çalışırken gösterge panelinde yağ basıncı (kırmızı yağdanlık) lambası yanarsa ne yapılmalıdır?",
    secenekler: [
      "Yola devam edilir",
      "Motor derhal durdurulur ve kontrol ettirilir",
      "Klima kapatılır",
      "Hız artırılır",
    ],
    dogruIndex: 1,
    aciklama:
      "Yağ basıncı ikaz lambası yanarsa motor derhal durdurulmalıdır; aksi hâlde motor ciddi zarar görür.",
    zorluk: "orta",
  },
  {
    id: "s-mt-004",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Motoru aşırı ısınmadan koruyan ve donmayı önleyen sıvı hangisidir?",
    secenekler: ["Fren hidroliği", "Motor yağı", "Antifriz (soğutma suyu)", "Cam suyu"],
    dogruIndex: 2,
    aciklama:
      "Soğutma sisteminde kullanılan antifrizli su, motoru aşırı ısınmadan korur; donmayı ve kaynamayı önler.",
    zorluk: "kolay",
  },
  {
    id: "s-mt-005",
    dersId: "motor",
    konuId: "mt-yakit-atesleme",
    metin: "Hava filtresinin kirli olması araçta hangi soruna yol açar?",
    secenekler: [
      "Yakıt tüketimini azaltır",
      "Yakıt tüketimini artırır ve motor gücünü düşürür",
      "Fren sistemini bozar",
      "Aküyü boşaltır",
    ],
    dogruIndex: 1,
    aciklama:
      "Kirli hava filtresi motora yeterli temiz hava girmesini engeller; yakıt tüketimini artırır ve gücü düşürür.",
    zorluk: "orta",
  },
  {
    id: "s-mt-006",
    dersId: "motor",
    konuId: "mt-aktarma",
    metin: "Motorun hareketini vites kutusuna bağlayan veya kesen güç aktarma parçası hangisidir?",
    secenekler: ["Diferansiyel", "Debriyaj (kavrama)", "Şaft", "Rot"],
    dogruIndex: 1,
    aciklama:
      "Debriyaj (kavrama), motorun hareketini vites kutusuna bağlar veya keser; kalkış ve vites değişiminde kullanılır.",
    zorluk: "orta",
  },
  {
    id: "s-mt-007",
    dersId: "motor",
    konuId: "mt-aktarma",
    metin: "Virajlarda iç ve dış tekerleklerin farklı hızlarda dönmesini sağlayan parça hangisidir?",
    secenekler: ["Diferansiyel", "Debriyaj", "Alternatör", "Marş motoru"],
    dogruIndex: 0,
    aciklama:
      "Diferansiyel, dönüşlerde tekerleklerin farklı hızlarda dönmesini sağlayarak virajın güvenle alınmasına yardımcı olur.",
    zorluk: "zor",
  },
  {
    id: "s-mt-008",
    dersId: "motor",
    konuId: "mt-fren",
    metin: "ABS fren sisteminin temel görevi nedir?",
    secenekler: [
      "Yakıt tüketimini azaltmak",
      "Ani frende tekerleklerin kilitlenmesini önleyerek direksiyon hâkimiyetini korumak",
      "Motoru soğutmak",
      "Aracı hızlandırmak",
    ],
    dogruIndex: 1,
    aciklama:
      "ABS, ani ve sert frende tekerleklerin kilitlenmesini önler; böylece araç kaymadan durur ve yönlendirilebilir.",
    zorluk: "orta",
  },
  {
    id: "s-mt-009",
    dersId: "motor",
    konuId: "mt-fren",
    metin: "Aracı park hâlinde sabit tutmak için kullanılan fren hangisidir?",
    secenekler: ["Ayak (servis) freni", "El (park) freni", "Motor freni", "ABS"],
    dogruIndex: 1,
    aciklama:
      "El (park) freni, genellikle arka tekerleklere etki eder ve aracı park hâlinde sabitler.",
    zorluk: "kolay",
  },
  {
    id: "s-mt-010",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Motor çalışırken aküyü şarj eden parça hangisidir?",
    secenekler: ["Marş motoru", "Alternatör (şarj dinamosu)", "Buji", "Enjektör"],
    dogruIndex: 1,
    aciklama:
      "Alternatör (şarj dinamosu), motor çalışırken elektrik üreterek aküyü şarj eder ve elektrikli donanımları besler.",
    zorluk: "orta",
  },
  {
    id: "s-mt-011",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Akü takviyesi (start) yapılırken bağlantı sırası nasıl olmalıdır?",
    secenekler: [
      "Önce eksi (–) uçlar bağlanır",
      "Önce artı (+) uçlar bağlanır",
      "Sıralamanın önemi yoktur",
      "Her iki uç aynı anda bağlanır",
    ],
    dogruIndex: 1,
    aciklama:
      "Takviyede önce artı (+) uçlar bağlanır; sökme işleminde ise önce eksi (–) uç çıkarılır.",
    zorluk: "zor",
  },
  {
    id: "s-mt-012",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Lastik hava basıncının olması gerekenden düşük olması hangi sonuca yol açar?",
    secenekler: [
      "Yakıt tüketimi azalır",
      "Yakıt tüketimi artar ve lastik daha çabuk aşınır",
      "Fren mesafesi kısalır",
      "Yol tutuşu artar",
    ],
    dogruIndex: 1,
    aciklama:
      "Düşük lastik basıncı yuvarlanma direncini artırır; yakıt tüketimini yükseltir ve lastiğin yıpranmasını hızlandırır.",
    zorluk: "orta",
  },
  {
    id: "s-mt-013",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Aşınmış (diş derinliği yetersiz) lastik trafik güvenliğini nasıl etkiler?",
    secenekler: [
      "Fren mesafesini kısaltır",
      "Fren mesafesini uzatır ve kayma riskini artırır",
      "Hiç etkilemez",
      "Yakıt tüketimini azaltır",
    ],
    dogruIndex: 1,
    aciklama:
      "Diş derinliği yetersiz lastik, özellikle ıslak zeminde fren mesafesini uzatır ve kayma (kızaklama) riskini artırır.",
    zorluk: "kolay",
  },
  {
    id: "s-mt-014",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Gösterge panelinde yanan kırmızı ikaz lambaları genel olarak neyi ifade eder?",
    secenekler: [
      "Bir sistemin normal çalıştığını",
      "Acil ve tehlikeli bir durumu, aracın durdurulması gerektiğini",
      "Yalnızca bilgi amaçlı olduğunu",
      "Yakıtın dolu olduğunu",
    ],
    dogruIndex: 1,
    aciklama:
      "Kırmızı ikaz lambaları acil/tehlikeli durumu gösterir; araç güvenli şekilde durdurulup kontrol edilmelidir.",
    zorluk: "orta",
  },
  {
    id: "s-mt-015",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Hava yastığının (airbag) tam koruma sağlaması için hangi koşul gereklidir?",
    secenekler: [
      "Camların açık olması",
      "Emniyet kemerinin takılı olması",
      "Klimanın çalışması",
      "Farların açık olması",
    ],
    dogruIndex: 1,
    aciklama:
      "Hava yastığı, ancak emniyet kemeri takılıyken tam koruma sağlar; kemer takılı değilken tek başına yeterli değildir.",
    zorluk: "orta",
  },
];
