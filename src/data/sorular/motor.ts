import type { Soru } from "@/types";

export const MOTOR_SORULARI: Soru[] = [
  {
    id: "mt-001",
    dersId: "motor",
    konuId: "mt-motor-calisma",
    metin: "Yakıtı doğrudan silindirler içerisinde yakarak ısı enerjisini mekanik enerjiye dönüştüren motorlara ne ad verilir?",
    secenekler: ["Dıştan yanmalı motor", "İçten yanmalı motor", "Elektrik motoru", "Buhar motoru"],
    dogruIndex: 1,
    aciklama: "Günümüzdeki otomobillerin (benzinli ve dizel) kullandığı motor tipi içten yanmalı motordur. Yakıt silindirin içinde yanar.",
    zorluk: "kolay"
  },
  {
    id: "mt-002",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Seyir halindeyken aracın gösterge panelinde 'Akü (Şarj) İkaz Işığı' yanarsa sürücünün yapması gereken ilk işlem aşağıdakilerden hangisidir?",
    secenekler: ["Hızını artırıp en yakın servise gitmek", "Aracı güvenli bir şekilde sağa çekip derhal motoru durdurmak", "Farları kapatarak yola devam etmek", "Kaloriferi açarak aküyü soğutmak"],
    dogruIndex: 1,
    aciklama: "Akü (Şarj) lambası, Yağ lambası veya Hararet lambası seyir halindeyken yanarsa araç trafik kurallarına uyarak derhal sağa çekilmeli ve motor durdurulmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "mt-003",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Motor çalışır durumdayken gösterge panelinde 'Yağdanlık' sembolü yanıyorsa bu durum neyin göstergesidir?",
    secenekler: ["Motor yağ basıncının çok düştüğünün", "Fren hidroliğinin bittiğinin", "Yakıtın bitmek üzere olduğunun", "Motorun çok soğuk olduğunun"],
    dogruIndex: 0,
    aciklama: "Yağ ikaz lambası, motor yağ basıncının yetersiz olduğunu ve motorun yağlanamadığını gösterir. Hemen durulmazsa motor yatak sarar (ağır hasar görür).",
    zorluk: "kolay"
  },
  {
    id: "mt-004",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Motorun hararet yapmasını önleyen ve motoru ideal çalışma sıcaklığında tutan sisteme ne ad verilir?",
    secenekler: ["Ateşleme sistemi", "Şarj sistemi", "Soğutma sistemi", "Güç aktarma organları"],
    dogruIndex: 2,
    aciklama: "Soğutma sistemi (radyatör, vantilatör, termostat vb.) motorun aşırı ısınmasını (hararet yapmasını) önler.",
    zorluk: "kolay"
  },
  {
    id: "mt-005",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Aşağıdakilerden hangisi motor soğutma suyu sıcaklığını (harareti) sürücüye bildiren göstergedir?",
    secenekler: ["Hız göstergesi", "Devir göstergesi", "Hararet göstergesi", "Yakıt göstergesi"],
    dogruIndex: 2,
    aciklama: "Hararet (derece veya termometre sembolü olan) göstergesi, motor soğutma suyunun sıcaklığını gösterir. İdeal olan genelde 90 derece civarıdır.",
    zorluk: "kolay"
  },
  {
    id: "mt-006",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Kış aylarında motor soğutma suyunun donmasını engellemek, yaz aylarında ise kaynama noktasını yükselterek harareti önlemek için radyatör suyuna hangi madde ilave edilir?",
    secenekler: ["Motor yağı", "Antifriz", "Fren hidroliği", "Saf su"],
    dogruIndex: 1,
    aciklama: "Antifriz, radyatör suyunun donmasını ve kaynamasını önleyen, aynı zamanda pas ve korozyonu engelleyen çok önemli bir kimyasal maddedir.",
    zorluk: "kolay"
  },
  {
    id: "mt-007",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Aracın aküsünün bakımında, akü içerisindeki sıvı (elektrolit) seviyesi azalmışsa ne ilave edilmelidir?",
    secenekler: ["Antifriz", "Saf su", "Asit", "Motor yağı"],
    dogruIndex: 1,
    aciklama: "Aküdeki elektrolit seviyesi (plakaların boyu) azaldığında sadece 'Saf Su' ilave edilir. Asla asit veya çeşme suyu konulmaz.",
    zorluk: "orta"
  },
  {
    id: "mt-008",
    dersId: "motor",
    konuId: "mt-aktarma",
    metin: "Motorlu araçlarda hareketin motordan tekerleklere aktarılmasını sağlayan sistemin genel adı nedir?",
    secenekler: ["Güç aktarma organları (Aktarma organları)", "Ateşleme sistemi", "Soğutma sistemi", "Fren sistemi"],
    dogruIndex: 0,
    aciklama: "Motordan alınan mekanik enerjiyi debriyaj (kavrama), vites kutusu (şanzıman), şaft, diferansiyel ve akslar aracılığıyla tekerleklere ileten sisteme güç aktarma organları denir.",
    zorluk: "orta"
  },
  {
    id: "mt-009",
    dersId: "motor",
    konuId: "mt-yakit-atesleme",
    metin: "Aşağıdakilerden hangisi benzinli motorların yakıt sisteminin bir parçasıdır ve silindir içerisindeki yakıt-hava karışımını ateşlemekle görevlidir?",
    secenekler: ["Enjektör", "Buji", "Karbüratör", "Alternatör"],
    dogruIndex: 1,
    aciklama: "Benzinli ve LPG'li motorlarda yakıt-hava karışımını ateşleyen (kıvılcım çıkaran) parça Buji'dir. Dizel motorlarda buji yerine enjektörlerden püskürtme ile yanma sağlanır.",
    zorluk: "orta"
  },
  {
    id: "mt-010",
    dersId: "motor",
    konuId: "mt-aktarma",
    metin: "Vites değiştirirken motorla vites kutusu (şanzıman) arasındaki bağlantıyı keserek vitesin kolayca değiştirilmesini sağlayan güç aktarma organı aşağıdakilerden hangisidir?",
    secenekler: ["Diferansiyel", "Şaft", "Kavrama (Debriyaj)", "Aks"],
    dogruIndex: 2,
    aciklama: "Debriyaj (Kavrama), motorun hareketini vites kutusuna iletip kesmeye yarayan sistemdir. Vites değiştirmek için debriyaja basılarak bağlantı kesilir.",
    zorluk: "orta"
  },
  {
    id: "mt-011",
    dersId: "motor",
    konuId: "mt-aktarma",
    metin: "Aracın virajları dönerken iç ve dış tekerleklerin farklı hızlarda dönmesini sağlayarak virajın güvenle dönülmesine yardımcı olan aktarma organı hangisidir?",
    secenekler: ["Diferansiyel", "Vites kutusu", "Şaft", "Amortisör"],
    dogruIndex: 0,
    aciklama: "Diferansiyel, dönüşlerde iç tekerleğin yavaş, dış tekerleğin hızlı dönmesini sağlayarak aracın savrulmadan virajı almasını sağlayan dişli grubudur.",
    zorluk: "zor"
  },
  {
    id: "mt-012",
    dersId: "motor",
    konuId: "mt-gosterge-guvenlik",
    metin: "Gösterge panelinde yanmakta olan 'El Freni' lambası (ünlem veya P işareti) aracın hangi durumda olduğunu gösterir?",
    secenekler: ["Fren hidroliğinin bittiğini", "El freninin çekili olduğunu veya tam indirilmediğini", "Fren balatalarının ısındığını", "Aracın frenlerinin bozulduğunu"],
    dogruIndex: 1,
    aciklama: "El freni lambası, el freni çekiliyken yanar. Eğer el frenini indirdiğiniz halde sönmüyorsa fren hidroliği eksikliği veya sistemde bir sorun olabilir.",
    zorluk: "kolay"
  },
  {
    id: "mt-013",
    dersId: "motor",
    konuId: "mt-motor-calisma",
    metin: "Dört zamanlı dizel bir motorda, emme zamanında silindirin içine aşağıdakilerden hangisi alınır?",
    secenekler: ["Sadece hava", "Hava ve motorin karışımı", "Sadece motorin (mazot)", "Hava ve benzin karışımı"],
    dogruIndex: 0,
    aciklama: "Dizel motorlarda emme zamanında silindire SADECE HAVA alınır. Sıkıştırılan bu sıcak havanın üzerine ateşleme (iş) zamanında enjektör ile mazot püskürtülerek yanma sağlanır.",
    zorluk: "zor"
  },
  {
    id: "mt-014",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Aracın lastik hava basıncı normalden düşük (lastik inik) ise araçta hangi olumsuz durum gözlemlenir?",
    secenekler: ["Yakıt tüketimi azalır", "Direksiyon daha hafif (kolay) döner", "Yakıt tüketimi artar ve lastik kenarlardan aşınır", "Fren mesafesi kısalır"],
    dogruIndex: 2,
    aciklama: "Lastik havaları düşük olursa sürtünme artacağı için yakıt tüketimi artar, lastikler yanaklardan (kenarlardan) daha çabuk aşınır ve sürüş güvenliği tehlikeye girer.",
    zorluk: "orta"
  },
  {
    id: "mt-015",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Yolda giderken araçtan yanık kablo kokusu geldiğinde sürücünün yapması gereken doğru hareket nedir?",
    secenekler: ["Camları açarak havalandırmak", "Durmadan yola devam edip ilk servise gitmek", "Trafiği tehlikeye düşürmeden sağa yanaşıp motoru durdurmak ve kontak anahtarını çekmek", "Kaloriferi kapatmak"],
    dogruIndex: 2,
    aciklama: "Elektrik kontağı kaynaklı bir yangını önlemek için derhal güvenli bir şekilde sağa çekilmeli, motor durdurulmalı ve kontak kapatılmalıdır.",
    zorluk: "kolay"
  },
  {
    id: "mt-016",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Aracın motoru çalışırken aküyü şarj eden (elektrik üreten) parçanın adı nedir?",
    secenekler: ["Marş motoru", "Distribütör", "Karbüratör", "Alternatör (Şarj dinamosu)"],
    dogruIndex: 3,
    aciklama: "Alternatör (Şarj Dinamosu), motor çalıştığı sürece mekanik enerjiyi elektrik enerjisine çevirerek aracın elektrik ihtiyacını karşılar ve aküyü şarj eder.",
    zorluk: "orta"
  },
  {
    id: "mt-017",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Araca her binildiğinde sürücü tarafından rutin olarak dışarıdan kontrol edilmesi gereken donanım hangisidir?",
    secenekler: ["Antifriz seviyesi", "Lastiklerin havaları ve durumu", "Buji tırnak aralığı", "Fren balata kalınlığı"],
    dogruIndex: 1,
    aciklama: "Sürücü araca her binmeden önce dışarıdan lastiklerin inik olup olmadığını mutlaka gözle kontrol etmelidir. Diğerleri periyodik bakımlarda yapılır.",
    zorluk: "kolay"
  },
  {
    id: "mt-018",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Kış mevsimine hazırlık amacıyla araçta aşağıdakilerden hangisinin yapılması kışın güvenli sürüş sağlar?",
    secenekler: ["Yaz lastiklerinin havalarının indirilmesi", "Radyatör suyuna antifriz eklenmesi ve kışlık lastik takılması", "Motor yağının daha kalın yağ ile değiştirilmesi", "Akünün saf su ile tamamen doldurulması"],
    dogruIndex: 1,
    aciklama: "Kışa girerken motor suyunun donmaması için antifriz konur, cam silecek suyu antifrizli sıvı ile değiştirilir ve +7 derecenin altında kış lastikleri takılır.",
    zorluk: "kolay"
  },
  {
    id: "mt-019",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Motor yağının motordaki temel görevi aşağıdakilerden hangisidir?",
    secenekler: ["Motoru soğutmak ve yakıt tüketimini artırmak", "Parçalar arasındaki sürtünmeyi azaltarak aşınmayı önlemek ve motor ömrünü uzatmak", "Ateşlemeyi hızlandırmak", "Vites geçişlerini zorlaştırmak"],
    dogruIndex: 1,
    aciklama: "Motor yağı, motor içindeki hareketli metal parçalar arasında bir film tabakası oluşturarak sürtünmeyi, aşınmayı ve ısınmayı minimuma indirir.",
    zorluk: "kolay"
  },
  {
    id: "mt-020",
    dersId: "motor",
    konuId: "mt-yaglama-sogutma",
    metin: "Motor hararet yaptığında (su kaynattığında) radyatör kapağı hemen açılırsa aşağıdakilerden hangisinin olması beklenir?",
    secenekler: ["Motorun aniden soğuması", "Basınçlı ve kaynar suyun fışkırarak ciddi yanıklara sebep olması", "Akünün şarj olması", "Yakıt sarfiyatının düşmesi"],
    dogruIndex: 1,
    aciklama: "Hararet yapmış bir aracın radyatör kapağı motor sıcakken kesinlikle açılmaz. İçerideki yüksek basınçlı kaynar su fışkırarak ağır yanıklara neden olur.",
    zorluk: "kolay"
  },
  {
    id: "mt-021",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Marşa basıldığında marş motoru hiç dönmüyor veya çok yavaş (tık tık ederek) dönüyorsa, arıza genellikle hangi parçadan kaynaklanır?",
    secenekler: ["Buji", "Akü (Batarya)", "Radyatör", "Fren hidroliği"],
    dogruIndex: 1,
    aciklama: "Marş motorunun dönmemesi, akünün bitmiş (boşalmış) olduğunu veya kutup başlarının gevşediğini gösterir.",
    zorluk: "orta"
  },
  {
    id: "mt-022",
    dersId: "motor",
    konuId: "mt-fren",
    metin: "Fren pedalına basıldığında aracın hızını düşüren ve durmasını sağlayan sistemin düzgün çalışması için hangi sıvının seviyesi düzenli kontrol edilmelidir?",
    secenekler: ["Antifriz", "Motor yağı", "Fren hidrolik yağı", "Saf su"],
    dogruIndex: 2,
    aciklama: "Fren sisteminin düzgün çalışması için fren hidrolik sıvısının kutusundaki seviyesinin (MAX-MIN arasında) yeterli olması gerekir.",
    zorluk: "orta"
  },
  {
    id: "mt-023",
    dersId: "motor",
    konuId: "mt-yakit-atesleme",
    metin: "Dizel motorlu bir araca yanlışlıkla benzin konulursa ne yapılmalıdır?",
    secenekler: ["Depoya biraz daha mazot eklenerek seyreltilmelidir", "Araç çalıştırılmadan yakıt deposu tamamen boşaltılmalı ve temizlenmelidir", "Motor yüksek devirde kullanılarak yakıt bitirilmelidir", "Sadece kış aylarında sorun olmaz"],
    dogruIndex: 1,
    aciklama: "Yanlış yakıt konulduğunda (dizele benzin, benzine dizel), motor kesinlikle çalıştırılmamalı ve yakıt deposu ile yakıt hatları serviste tamamen temizlenmelidir.",
    zorluk: "zor"
  },
  {
    id: "mt-024",
    dersId: "motor",
    konuId: "mt-lastik-bakim",
    metin: "Lastiklerin üzerinde bulunan rakamlar ve harfler (örneğin 205/55 R16) lastiğin hangi özelliğini belirtir?",
    secenekler: ["Üretim tarihini", "Ebatlarını (Genişlik, yanak yüksekliği, jant çapı)", "Sadece hız limitini", "Hangi mevsimde kullanılacağını"],
    dogruIndex: 1,
    aciklama: "Lastik yanaklarındaki bu standart rakamlar lastiğin ebatlarını (genişlik, kesit oranı ve jant çapı gibi) gösterir.",
    zorluk: "orta"
  },
  {
    id: "mt-025",
    dersId: "motor",
    konuId: "mt-elektrik-aku",
    metin: "Bir araca takviye (aküden aküye şarj) yapılırken kabloların bağlantısı nasıl olmalıdır?",
    secenekler: ["Artı (+) kutup eksi (-) kutba bağlanır", "Artı (+) kutup artı (+) kutba, eksi (-) kutup eksi (-) kutba bağlanır", "Kutupların yönü fark etmez", "Sadece eksi kutuplar bağlanır"],
    dogruIndex: 1,
    aciklama: "Akü takviyesinde (Jumper kablosu ile) mutlaka paralel bağlantı yapılır; yani Artı (+) kutup Artıya, Eksi (-) kutup Eksiye bağlanmalıdır. Aksi takdirde kısa devre olur.",
    zorluk: "orta"
  }
];
