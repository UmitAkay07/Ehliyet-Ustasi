/**
 * KGM levha kodu → Türkçe ad ve anlam (KGM / Wikipedia TR).
 * Eksik kodlar için şablon kullanılır.
 */
const LABELS = {
  "T-1a": ["Tehlikeli viraj (sağa)", "İleride sağa doğru tehlikeli viraj vardır; hız düşürülmeli, şerit korunmalıdır."],
  "T-1b": ["Tehlikeli viraj (sola)", "İleride sola doğru tehlikeli viraj vardır; hız düşürülmeli, şerit korunmalıdır."],
  "T-2a": ["Çift taraflı tehlikeli viraj (ilk sağ)", "Ardışık tehlikeli virajlar; ilk viraj sağa doğrudur."],
  "T-2b": ["Çift taraflı tehlikeli viraj (ilk sol)", "Ardışık tehlikeli virajlar; ilk viraj sola doğrudur."],
  "T-3a": ["Tehlikeli eğim (iniş)", "İleride dik iniş vardır; vites düşürülmeli, uzun süre frende kalınmamalıdır."],
  "T-3b": ["Tehlikeli eğim (çıkış)", "İleride dik çıkış vardır; uygun vites ve sabit hız kullanılmalıdır."],
  "T-4a": ["Daralan yol (iki taraf)", "Yol her iki taraftan daralmaktadır; hız düşürülmelidir."],
  "T-4b": ["Daralan yol (sağdan)", "Yol sağdan daralmaktadır; hız düşürülmelidir."],
  "T-4c": ["Daralan yol (soldan)", "Yol soldan daralmaktadır; hız düşürülmelidir."],
  "T-5": ["Açılır köprü", "İleride açılır köprü vardır; köprü kurallarına uyulmalıdır."],
  "T-6": ["Deniz veya nehir kıyısında biten yol", "Yol su kıyısında sona ermektedir; dikkatli olunmalıdır."],
  "T-7": ["Kasisli yol", "Yolda kasis vardır; yavaşlanmalı, ani fren ve manevradan kaçınılmalıdır."],
  "T-8": ["Kaygan yol", "Yol kaygan olabilir; hız azaltılmalı, ani direksiyon ve fren yapılmamalıdır."],
  "T-9": ["Gevşek malzemeli zemin", "Yolda gevşek malzeme vardır; hız düşürülmelidir."],
  "T-10": ["Gevşek şev", "Yol kenarında şev çökmesi riski vardır; dikkatli gidilmelidir."],
  "T-11": ["Yaya geçidi (uyarı)", "İleride yaya geçidi vardır; yayalara öncelik verilmelidir."],
  "T-12": ["Okul geçidi", "İleride okul geçidi vardır; çocuklara karşı çok dikkatli olunmalıdır."],
  "T-13": ["Bisiklet geçebilir", "Yola bisiklet çıkabilir; bisikletlilere dikkat edilmelidir."],
  "T-14a": ["Ehli hayvanlar geçebilir", "Yola ehli hayvan çıkabilir; yavaş ve dikkatli gidilmelidir."],
  "T-14b": ["Vahşi hayvanlar geçebilir", "Yola vahşi hayvan çıkabilir; dikkatli olunmalıdır."],
  "T-15": ["Yolda çalışma", "Yol yapım/bakım çalışması vardır; hız düşürülmeli, işçilere dikkat edilmelidir."],
  "T-16": ["Işıklı işaret cihazı", "İleride trafik ışığı vardır; ışığa hazırlıklı olunmalıdır."],
  "T-17": ["Havalimanı (alçak uçuş)", "Uçak alçak uçuş yapabilir; dikkat dağıtıcı etkiye karşı dikkatli olunmalıdır."],
  "T-18": ["Yandan rüzgar", "Güçlü yandan rüzgar olabilir; direksiyon kontrolüne dikkat edilmelidir."],
  "T-19": ["İki yönlü trafik", "Tek yön sona ermiş, karşıdan araç gelebilir; sol şeritte kalınmalıdır."],
  "T-20": ["Dikkat", "Yakında özel tehlike olabilir; hız düşürülmeli, dikkatli gidilmelidir."],
  "T-21": ["Kontrolsüz kavşak", "İleride kontrolsüz kavşak vardır; yavaşlanmalı, önceliğe dikkat edilmelidir."],
  "T-24": ["Dönel kavşak", "İleride dönel kavşak vardır; kavşak kurallarına uyulmalıdır."],
  "T-25": ["Kontrollü demiryolu geçidi", "Bariyerli/ışıklı demiryolu geçidi yaklaşımıdır."],
  "T-26": ["Kontrolsüz demiryolu geçidi", "Bariyersiz demiryolu geçidi; durup bakılmalıdır."],
  "T-27a": ["Kontrolsüz demiryolu geçidi (tek hat)", "Tek hatlı kontrolsüz demiryolu geçidi yaklaşımıdır."],
  "T-27b": ["Kontrolsüz demiryolu geçidi (çift hat)", "Çift hatlı kontrolsüz demiryolu geçidi yaklaşımıdır."],
  "T-32": ["Engel işareti", "Yolda engel veya tehlike vardır; dikkatli olunmalıdır."],
  "T-35": ["Dönüş adası ek levhası", "Dönüş adasına yaklaşıldığını bildirir."],
  "T-36": ["Düşük banket", "Yol kenarı banketi alçaktır; taşmaya karşı dikkat edilmelidir."],
  "T-37": ["Gizli buzlanma", "Yolda görünmeyen buzlanma olabilir; dikkatli gidilmelidir."],
  "T-38": ["Olası trafik sıkışıklığı", "İleride yoğunluk olabilir; hazırlıklı olunmalıdır."],
  "T-39": ["Tramvay hattı kavşağı", "Tramvay hattı ile kavşak oluşmaktadır; tramvaya dikkat edilmelidir."],

  "TT-1": ["Yol ver", "Ana yoldaki / öncelikli araçlara yol verilmesi gerekir."],
  "TT-2": ["Dur", "Tamamen durulur; yol verdikten sonra geçilir."],
  "TT-2a": ["Çocuklar için dur", "Okul geçidinde durulması gerektiğini bildirir."],
  "TT-3": ["Karşıdan gelene yol ver", "Dar yolda karşıdan gelene geçiş hakkı verilmelidir."],
  "TT-4": ["Girişi olmayan yol", "Bu yönden giriş yasaktır."],
  "TT-5": ["Taşıt trafiğine kapalı yol", "Motorlu taşıtların girmesi yasaktır."],
  "TT-6": ["Araba giremez", "Otomobil girişi yasaktır."],
  "TT-7": ["Motosiklet giremez", "Motosiklet girişi yasaktır."],
  "TT-8": ["Bisiklet giremez", "Bisiklet girişi yasaktır."],
  "TT-9": ["Motorlu bisiklet giremez", "Motorlu bisiklet girişi yasaktır."],
  "TT-10a": ["Kamyon giremez", "Kamyon girişi yasaktır."],
  "TT-10b": ["Otobüs giremez", "Otobüs girişi yasaktır."],
  "TT-11": ["Treyler giremez", "Römorklu araç girişi yasaktır."],
  "TT-12": ["Yaya giremez", "Yaya girişi yasaktır."],
  "TT-13": ["At arabası giremez", "At arabası girişi yasaktır."],
  "TT-14": ["El arabası giremez", "El arabası girişi yasaktır."],
  "TT-15": ["Traktör giremez", "Traktör girişi yasaktır."],
  "TT-16a": ["Patlayıcı madde taşıyan taşıt giremez", "Belirli miktardan fazla patlayıcı madde taşıyan araç giremez."],
  "TT-16b": ["Tehlikeli madde taşıyan taşıt giremez", "Tehlikeli madde taşıyan araç girişi yasaktır."],
  "TT-17": ["Su kirletici madde taşıyan taşıt giremez", "Su kirletici madde taşıyan araç giremez."],
  "TT-18": ["Motorlu taşıt giremez", "Motorlu taşıt girişi yasaktır."],
  "TT-19": ["Taşıt giremez", "Tüm taşıt girişi yasaktır."],
  "TT-20": ["Genişlik sınırlaması", "Belirtilen genişlikten büyük araç giremez."],
  "TT-21": ["Yükseklik sınırlaması", "Belirtilen yükseklikten büyük araç giremez."],
  "TT-22": ["Uzunluk sınırlaması", "Belirtilen uzunluktan büyük araç giremez."],
  "TT-23": ["Dingil başına yük sınırlaması", "Dingil başına düşen yük sınırı aşılamaz."],
  "TT-24": ["Yüklü ağırlık sınırlaması", "Belirtilen yüklü ağırlık aşılamaz."],
  "TT-25": ["Takip mesafesi sınırlaması", "Öndeki araç belirtilen mesafeden yakın takip edilemez."],
  "TT-26a": ["Sağa dönülemez", "Sağa dönüş yasaktır."],
  "TT-26b": ["Sola dönülemez", "Sola dönüş yasaktır."],
  "TT-26c": ["U dönüşü yapılamaz", "Geri (U) dönüş yasaktır."],
  "TT-27": ["Öndeki taşıtı geçmek yasaktır", "Sollama yasaktır."],
  "TT-28": ["Kamyonlar için geçme yasağı", "Kamyonların öndeki aracı geçmesi yasaktır."],
  "TT-29-50": ["Azami hız sınırlaması (50)", "Saatte 50 km'den hızlı gidilemez."],
  "TT-29-30": ["Azami hız sınırlaması (30)", "Saatte 30 km'den hızlı gidilemez."],
  "TT-29-40": ["Azami hız sınırlaması (40)", "Saatte 40 km'den hızlı gidilemez."],
  "TT-29-60": ["Azami hız sınırlaması (60)", "Saatte 60 km'den hızlı gidilemez."],
  "TT-29-70": ["Azami hız sınırlaması (70)", "Saatte 70 km'den hızlı gidilemez."],
  "TT-29-80": ["Azami hız sınırlaması (80)", "Saatte 80 km'den hızlı gidilemez."],
  "TT-29-90": ["Azami hız sınırlaması (90)", "Saatte 90 km'den hızlı gidilemez."],
  "TT-29-130": ["Azami hız sınırlaması (130)", "Saatte 130 km'den hızlı gidilemez."],
  "TT-29-140": ["Azami hız sınırlaması (140)", "Saatte 140 km'den hızlı gidilemez."],
  "TT-29b": ["Okul bölgesi azami hız", "Okul bölgesinde azami hız sınırı geçerlidir."],
  "TT-30": ["Korna çalmak yasaktır", "Sesli uyarı cihazı kullanımı yasaktır."],
  "TT-31": ["Gümrük", "Gümrük noktasına yaklaşıldığını bildirir."],
  "TT-32": ["Bütün yasaklama ve kısıtlamaların sonu", "Önceki yasakların geçerliliği sona erer."],
  "TT-33-50": ["Hız sınırlaması sonu (50)", "50 km/s hız sınırı sona erer."],
  "TT-33-30": ["Hız sınırlaması sonu (30)", "30 km/s hız sınırı sona erer."],
  "TT-33-40": ["Hız sınırlaması sonu (40)", "40 km/s hız sınırı sona erer."],
  "TT-33-60": ["Hız sınırlaması sonu (60)", "60 km/s hız sınırı sona erer."],
  "TT-33-70": ["Hız sınırlaması sonu (70)", "70 km/s hız sınırı sona erer."],
  "TT-33-80": ["Hız sınırlaması sonu (80)", "80 km/s hız sınırı sona erer."],
  "TT-33-90": ["Hız sınırlaması sonu (90)", "90 km/s hız sınırı sona erer."],
  "TT-33b": ["Azami hız bölgesi sonu", "Azami hız bölgesi sona erer."],
  "TT-34a": ["Geçme yasağı sonu", "Sollama yasağı sona erer."],
  "TT-34b": ["Kamyonlar için geçme yasağı sonu", "Kamyon sollama yasağı sona erer."],
  "TT-35a": ["Sağa mecburi yön", "Yalnızca sağa gidilebilir."],
  "TT-35b": ["Sola mecburi yön", "Yalnızca sola gidilebilir."],
  "TT-35c": ["İleri mecburi yön", "Yalnızca ileri gidilebilir."],
  "TT-35d": ["İleri ve sağa mecburi yön", "İleri veya sağa gidilebilir."],
  "TT-35e": ["İleri ve sola mecburi yön", "İleri veya sola gidilebilir."],
  "TT-35f": ["Sağa ve sola mecburi yön", "Sağa veya sola gidilebilir."],
  "TT-35g": ["İleriden sağa mecburi yön", "İleride sağa dönüş zorunludur."],
  "TT-35h": ["İleriden sola mecburi yön", "İleride sola dönüş zorunludur."],
  "TT-36a": ["Sağdan gidiniz", "Sağ şeritten devam edilmelidir."],
  "TT-36b": ["Soldan gidiniz", "Sol şeritten devam edilmelidir."],
  "TT-36c": ["Her iki yandan gidiniz", "Her iki yandan da gidilebilir."],
  "TT-37": ["Ada etrafında dönünüz", "Dönel kavşakta ada etrafında dönülmesi zorunludur."],
  "TT-38a": ["Mecburi bisiklet yolu", "Bisikletler bu yolu kullanmak zorundadır."],
  "TT-38b": ["Mecburi bisiklet yolu sonu", "Mecburi bisiklet yolu sona erer."],
  "TT-39a": ["Mecburi yaya yolu", "Yayalar bu yolu kullanmak zorundadır."],
  "TT-39b": ["Mecburi yaya yolu sonu", "Mecburi yaya yolu sona erer."],
  "TT-40a": ["Mecburi atlı yolu", "Atlılar bu yolu kullanmak zorundadır."],
  "TT-40b": ["Mecburi atlı yolu sonu", "Mecburi atlı yolu sona erer."],
  "TT-41a-30": ["Mecburi asgari hız (30)", "En az 30 km/s hızla gidilmelidir."],
  "TT-41b-30": ["Mecburi asgari hız sonu (30)", "Asgari hız zorunluluğu sona erer."],
  "TT-42a": ["Zincir takmak mecburidir", "Zincir takılması zorunludur."],
  "TT-42b": ["Zincir mecburiyeti sonu", "Zincir takma zorunluluğu sona erer."],

  "P-1": ["Park etmek yasaktır", "Park yasaktır; kısa duraklama farklı olabilir."],
  "P-2": ["Duraklamak ve park etmek yasaktır", "Hem duraklama hem park yasaktır."],
  "P-3a": ["Park yeri", "Park edilebilecek alanı gösterir."],
  "P-3b": ["Park yeri", "Park edilebilecek alanı gösterir."],
  "P-3c": ["Park yeri", "Park edilebilecek alanı gösterir."],
  "P-3d": ["Park yeri", "Park edilebilecek alanı gösterir."],
  "P-3e": ["Park yeri", "Park edilebilecek alanı gösterir."],
  "P-3f": ["Kapalı park yeri", "Kapalı otoparkı gösterir."],
  "P-3g": ["Park yeri (metro)", "Metro istasyonu park alanını gösterir."],
  "P-3h": ["Park yeri (tramvay)", "Tramvay hattı park alanını gösterir."],

  "B-9": ["Yerleşim yeri başlangıcı", "Meskun mahal başlar; yerleşim içi hız kuralları geçerlidir."],
  "B-10": ["Yerleşim yeri sonu", "Meskun mahal biter; şehir dışı kurallar geçerlidir."],
  "B-14a": ["Yaya geçidi (bilgi)", "Yaya geçidinin yerini gösterir."],
  "B-14b": ["Okul geçidi (bilgi)", "Okul geçidinin yerini gösterir."],
  "B-14c": ["Yaya bölgesi", "Yaya bölgesi başlangıcını gösterir."],
  "B-14d": ["Yaya bölgesi", "Yaya bölgesi başlangıcını gösterir."],
  "B-14e": ["Yaya bölgesi", "Yaya bölgesi başlangıcını gösterir."],
  "B-14f": ["Yaya bölgesi", "Yaya bölgesi başlangıcını gösterir."],
  "B-15": ["Hastane", "Yakında hastane vardır."],
  "B-16": ["Tek yön", "Yol tek yönlüdür."],
  "B-16b": ["İleri tek yön", "İleride tek yön başlar."],
  "B-17": ["İleri çıkmaz yol", "İleride çıkmaz yol vardır."],
  "B-18": ["Otoyol başlangıcı", "Otoyol başlar; otoyol kuralları geçerlidir."],
  "B-19": ["Otoyol sonu", "Otoyol biter."],
  "B-20": ["Motorlu taşıt yolu başlangıcı", "Motorlu taşıt yolu başlar."],
  "B-21": ["Motorlu taşıt yolu sonu", "Motorlu taşıt yolu biter."],
  "B-22": ["Durak", "Toplu taşıma durağını gösterir."],
  "B-23": ["İlk yardım", "İlk yardım istasyonunu gösterir."],
  "B-24": ["Tamirhane", "Tamirhane bulunduğunu gösterir."],
  "B-25": ["Telefon", "Telefon bulunduğunu gösterir."],
  "B-26": ["Akaryakıt istasyonu", "Yakıt istasyonunu gösterir."],
  "B-27": ["Otel veya motel", "Konaklama tesisi bulunduğunu gösterir."],
  "B-28": ["Lokanta", "Lokanta bulunduğunu gösterir."],
  "B-29": ["Çayhane veya kafeterya", "Çayhane/kafeterya bulunduğunu gösterir."],
  "B-30": ["Çeşme", "İçme suyu çeşmesi bulunduğunu gösterir."],
  "B-31": ["Piknik yeri", "Piknik alanını gösterir."],
  "B-32": ["Yürüyüş başlangıcı", "Yürüyüş parkurunu gösterir."],
  "B-33": ["Kamp yeri", "Kamp alanını gösterir."],
  "B-37": ["Önceliği olan yol", "Bu yolda öncelik vardır."],
  "B-38": ["Anayol", "Ana yol başlar."],
  "B-39": ["Anayol sonu", "Ana yol sona erer."],
  "B-40": ["Jandarma", "Jandarma karakolu yakındadır."],
  "B-41": ["Polis", "Polis merkezi yakındadır."],
  "B-42": ["Yangın tehlikesi", "Yangın riski olan bölgedir."],
  "B-43": ["Radyo", "Radyo frekans bilgisi verir."],
  "B-44": ["Turizm danışma", "Turizm danışma noktasını gösterir."],
  "B-45a": ["Üst geçit", "Yaya üst geçidini gösterir."],
  "B-45b": ["Alt geçit", "Yaya alt geçidini gösterir."],
  "B-46": ["Yüzme yeri", "Yüzülebilir alanı gösterir."],
  "B-47": ["Yüzülmez", "Yüzmek tehlikelidir."],
  "B-48": ["Bölünmüş yol öncesi yol levhası", "Bölünmüş yola yaklaşıldığını bildirir."],
  "B-49": ["Tünel", "Tünel yaklaşımını gösterir."],
  "B-52": ["İki yönlü yol", "Karşılıklı trafik akışını gösterir."],
  "B-54": ["Karayolları bilgi levhası", "KGM bölge bilgisi verir."],
  "B-56": ["Yaya öncelikli yol", "Yayalara öncelik verilmelidir."],
  "B-57": ["Yaya öncelikli yolun sonu", "Yaya öncelikli yol sona erer."],
  "B-58a": ["İstasyon", "Tren istasyonunu gösterir."],
  "B-58b": ["Otogar", "Otobüs terminalini gösterir."],
  "B-59": ["Tramvay durağı", "Tramvay durağını gösterir."],
  "B-60": ["Sanayi bölgesi (OSB)", "Organize sanayi bölgesini gösterir."],

  "PL-11.1": ["Anayol paneli", "Ana yol olduğunu tamamlayıcı panel ile bildirir."],
  "PL-11.2": ["Anayol paneli", "Ana yol olduğunu tamamlayıcı panel ile bildirir."],
};

/** Eski soru uyumluluğu: is-XX → KGM kodu */
const LEGACY_IDS = {
  "is-01": "T-1b", "is-31": "T-1a", "is-32": "T-2a", "is-02": "T-7", "is-03": "T-8",
  "is-04": "T-12", "is-05": "T-11", "is-06": "T-14a", "is-07": "T-24", "is-33": "T-4a",
  "is-34": "T-19", "is-35": "T-15", "is-51": "T-20", "is-52": "T-16", "is-55": "T-3a", "is-56": "T-21",
  "is-36": "T-13", "is-37": "T-26",
  "is-08": "TT-1", "is-15": "TT-2", "is-16": "TT-4", "is-54": "TT-3", "is-09": "TT-5",
  "is-10": "TT-26b", "is-11": "TT-26a", "is-12": "TT-26c", "is-13": "TT-27", "is-14": "TT-29-50",
  "is-38": "TT-33-50", "is-39": "TT-34a", "is-48": "TT-30", "is-57": "TT-32",
  "is-17": "TT-35c", "is-18": "TT-35a", "is-40": "TT-35b", "is-19": "TT-37", "is-20": "TT-41a-30", "is-41": "TT-38a",
  "is-21": "P-3a", "is-26": "P-2", "is-27": "P-1",
  "is-22": "B-15", "is-23": "B-23", "is-24": "B-14a", "is-53": "B-14b",
  "is-25": "B-18", "is-58": "B-19", "is-42": "B-16", "is-43": "B-26",
  "is-44": "B-9", "is-45": "B-10", "is-47": "B-22",
};

const SYNTHETIC_LIGHTS = [
  { id: "is-28", ad: "Kırmızı ışık", anlam: "Dur anlamındadır; dur çizgisinin gerisinde tam olarak durulur." },
  { id: "is-29", ad: "Sarı ışık", anlam: "Kırmızıya geçileceğini bildirir; güvenle durulur." },
  { id: "is-30", ad: "Yeşil ışık", anlam: "Geç anlamındadır; kavşak güvenliyse geçilir." },
  { id: "is-50", ad: "Yanıp sönen kırmızı ışık", anlam: "DUR levhası gibi; durulur, yol verilir, güvenliyse geçilir." },
];

const SYNTHETIC_OTHER = [
  { id: "is-46", kgm: null, ad: "Engelli park yeri", kategori: "durakPark",
    anlam: "Engelli sürücü/yolculara ayrılmış park yerini gösterir." },
];

function normalizeCode(raw) {
  return raw
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/--+/g, "-");
}

function extractCode(fileName) {
  const m = fileName.match(/(?:Turkey road sign |TR road sign )(.+)\.svg$/i);
  if (!m) return null;
  let code = m[1].trim();
  code = code.replace(/\s+\(\d+\)$/, ""); // B-18 (2) -> B-18
  return normalizeCode(code);
}

function kategoriFromCode(code) {
  if (code.startsWith("T-")) return "tehlike";
  if (code.startsWith("TT-35") || code.startsWith("TT-36") || code.startsWith("TT-37") ||
      code.startsWith("TT-38") || code.startsWith("TT-39") || code.startsWith("TT-40") ||
      code.startsWith("TT-41") || code.startsWith("TT-42") || code.startsWith("TT-43") ||
      code.startsWith("TT-44") || code.startsWith("TT-45")) return "mecburiyet";
  if (code.startsWith("TT-") || code.startsWith("PL-")) return "yasak";
  if (code.startsWith("P-")) return code.includes("3") ? "durakPark" : "durakPark";
  if (code.startsWith("B-")) return "bilgi";
  return "bilgi";
}

function labelFor(code) {
  if (LABELS[code]) return LABELS[code];
  const kat = kategoriFromCode(code);
  const prefix =
    kat === "tehlike" ? "Tehlike uyarı levhası" :
    kat === "yasak" ? "Yasaklama levhası" :
    kat === "mecburiyet" ? "Mecburiyet levhası" :
    kat === "durakPark" ? "Duraklama/park levhası" : "Bilgi levhası";
  return [`${prefix} (${code})`, `KGM ${code} kodlu trafik işaret levhasıdır.`];
}

function toId(code) {
  return "kgm-" + code.toLowerCase().replace(/\./g, "-");
}

module.exports = {
  LABELS,
  LEGACY_IDS,
  SYNTHETIC_LIGHTS,
  SYNTHETIC_OTHER,
  normalizeCode,
  extractCode,
  kategoriFromCode,
  labelFor,
  toId,
};
