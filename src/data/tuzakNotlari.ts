/**
 * Tuzak notları: cevaplandıktan sonra gösterilen "neden bu şık yanlış?" ve "akılda kalsın" ipuçları.
 *
 * ÖNEMLİ: Uygulama yalnızca `onayli: true` olan notları gösterir. Yeni yazılan ya da üretilen
 * notlar `onayli: false` ile girer; resmî kaynaklarla doğrulandıktan sonra onaylanır:
 *   npm run notlar:liste        → onay bekleyen notları okunabilir listeler
 *   npm run notlar:onayla -- sen-01 sen-02   (ya da --hepsi)
 *
 * `yanlis` anahtarları sorunun ÖZGÜN şık sırasındaki indekstir (arayüz şıkları karıştırsa da).
 * Bu dosya hiçbir şey içe aktarmaz (Node'da doğrudan test edilebilsin diye).
 */

export interface TuzakNotu {
  /** Akılda kalıcı kısa ipucu */
  ipucu?: string;
  /** Yanlış şıkların (özgün indeks) neden yanlış olduğu */
  yanlis?: Record<number, string>;
  /** Yalnızca onaylı notlar uygulamada gösterilir */
  onayli: boolean;
}

export const TUZAK_NOTLARI: Record<string, TuzakNotu> = {
  "sen-01": {
    ipucu: "İşaret ve ışık yoksa sağdan gelene yol ver; emin değilsen yavaşla, gerekirse dur.",
    yanlis: {
      0: "Hızlanmak çarpışma riskini artırır; geçiş hakkı olanın önüne atlanmaz.",
      1: "Korna geçiş hakkı vermez; hak sahibi araca yol verilmesi gerekir.",
      3: "Ani yön değiştirmek yeni bir çarpışma riski yaratır; çözüm yavaşlamak veya durmaktır.",
    },
    onayli: false,
  },
  "sen-02": {
    ipucu: "Devamlı çizgi, kavşak, köprü, viraj: sollama yok.",
    yanlis: {
      0: "Yasak yerlerde (devamlı çizgi, kavşak, köprü, viraj) tehlike görünmese de sollama yapılmaz.",
      2: "Yasak, günün saatine bağlı değildir; yasak yer her zaman yasaktır.",
      3: "Sollama yasağı belirli bir yol türüne değil, devamlı çizgi, kavşak, köprü, viraj gibi yerlere bağlıdır.",
    },
    onayli: false,
  },
  "sen-03": {
    ipucu: "Yasak alanda ne park ne duraklama; ceza ve çekici riski var.",
    yanlis: {
      0: "Yasak alanda süre fark etmez; kısa süreli park da ihlaldir.",
      1: "Yasak alanda park, günün saatine bakılmadan ihlaldir.",
      3: "Korna park hakkı vermez; yasak alanda park kornayla meşru olmaz.",
    },
    onayli: false,
  },
  "sen-04": {
    ipucu: "Yaya geçidinde yaya önce; gerekirse dur.",
    yanlis: {
      0: "Yayadan önce geçmek için hızlanmak yaya geçidinde ağır bir ihlal ve ciddi kaza riskidir.",
      2: "Korna, yayaya yol vermenin yerini tutmaz; geçitteki yayaya yol vermek zorunludur.",
      3: "Şerit değiştirip devam etmek yayaya yol vermek değildir; yaya geçerken geçide girilmez.",
    },
    onayli: false,
  },
  "sen-05": {
    ipucu: "Sırayla: ayna, sinyal, omuz kontrolü, güvenli boşlukta geç.",
    yanlis: {
      0: "Sinyal manevradan önce verilir; önce şerit değiştirip sonra sinyal vermek diğer sürücülere haber vermez.",
      2: "Korna, sinyalin ve kör nokta kontrolünün yerini tutmaz.",
      3: "Hızlanıp zorla girmek, diğer araçlara tepki süresi bırakmaz ve kaza riski doğurur.",
    },
    onayli: false,
  },
  "sen-06": {
    ipucu: "Önce işaret ve ışık, sonra geçiş hakkı; şüphede yavaşla.",
    yanlis: {
      0: "Geçiş, kimin önce gördüğüne değil, işaret, ışık ve geçiş hakkı kurallarına göre belirlenir.",
      1: "'İstisnasız' ifadesi yanlıştır: ışık ve levhalar sağdan gelen kuralının önüne geçer.",
      3: "Aracın büyüklüğü geçiş hakkı vermez; öncelik kurallarla belirlenir.",
    },
    onayli: false,
  },
  "sen-07": {
    ipucu: "Sollama güvenli değilse vazgeç; yarım kalan sollama kaza yapar.",
    yanlis: {
      0: "Sollama güvenli değilse vazgeçilir; tamamlamak için tehlikeye girilmez.",
      2: "Far yakmak karşıdan gelen aracın varlığını değiştirmez; tehlike sürer.",
      3: "Acil durum şeridi sollama için kullanılmaz.",
    },
    onayli: false,
  },
  "sen-08": {
    ipucu: "Yaya geçmek üzereyse yavaşla, hazır ol, gerekirse dur.",
    yanlis: {
      0: "Hızlanıp yayanın önüne geçmek onu tehlikeye atar; öncelik yayadadır.",
      2: "Yalnızca kornayla uyarmak yayayı korumaz; hızı düşürmek ve durmaya hazır olmak gerekir.",
      3: "Işık olmaması, yayaya karşı dikkat yükümlülüğünü kaldırmaz.",
    },
    onayli: false,
  },
  "sen-09": {
    ipucu: "Tali yoldan ana yola çıkarken ana yoldakine yol ver.",
    yanlis: {
      0: "Tali yoldaki sürücü, ana yoldaki araçlardan önce geçmeye çalışmaz; yol verir.",
      2: "Korna geçiş hakkı kazandırmaz.",
      3: "Selektör geçiş hakkı kazandırmaz; ana yoldaki araçlara yol verilir.",
    },
    onayli: false,
  },
  "sen-10": {
    ipucu: "Karşıdan araç varken sollama: kafa kafaya çarpışma riski.",
    yanlis: {
      0: "Tehlikeli sollama bir kazanç değil kural ihlalidir; asıl risk karşıdan çarpışmadır.",
      2: "Sollamanın amacı yakıt tasarrufu değildir; riskli sollama kazaya yol açar.",
      3: "Park yasağı, sollamayla ilgili bir sonuç değildir.",
    },
    onayli: false,
  },
  "sen-11": {
    ipucu: "Kavşak, durak ve yaya geçidi yakınında park etme.",
    yanlis: {
      0: "Flaşör (dörtlü) yasak yerde park etme izni vermez.",
      2: "Yasak yerde kısa süreli park da ihlaldir; böyle bir muafiyet yoktur.",
      3: "Kavşak yakınındaki yasak gece de geçerlidir; saate bağlı bir serbestlik yoktur.",
    },
    onayli: false,
  },
  "sen-12": {
    ipucu: "Yaya geçidinde yayaya mutlaka yol ver; hızlanmak ağır ihlaldir.",
    yanlis: {
      0: "Yayanın hızı, hızlanmak için izin vermez; geçitteki yayaya yol verilir.",
      2: "Yayaya yol verme yükümlülüğü gece gündüz geçerlidir.",
      3: "Korna, yayaya yol vermenin yerini tutmaz.",
    },
    onayli: false,
  },
  "sen-13": {
    ipucu: "Ayna ve omuz kontrolü yapmazsan kör noktadaki aracı göremezsin.",
    yanlis: {
      0: "Kontrolsüz şerit değiştirmenin riski yakıt değil, kör noktadaki araca çarpmaktır.",
      2: "Kontrolsüz manevra bir kazanç getirmez; asıl risk kör noktadaki araca çarpmaktır.",
      3: "Park yasağı, şerit değiştirmeyle ilgili bir risk değildir.",
    },
    onayli: false,
  },
  "sen-14": {
    ipucu: "Dönel kavşakta adanın etrafında belirtilen yönde dön; ters yöne gitme.",
    yanlis: {
      0: "Adanın üzerinden düz geçilmez; adanın etrafından dolaşılır.",
      2: "Dönel kavşakta geri gidilmez; akışa uyulur.",
      3: "Dönel kavşakta amaç sollama değil, akışa uyup adanın etrafında dönmektir.",
    },
    onayli: false,
  },
  "sen-15": {
    ipucu: "Devamlı çizgi, karşıdan geleni göremediğin tehlikeli yerlere çizilir.",
    yanlis: {
      0: "Yasağın nedeni yakıt değil, karşıdan gelen aracı göremeyip çarpışma riskidir.",
      2: "Yasağın nedeni lastik aşınması değil, çarpışma riskidir.",
      3: "Devamlı çizgide sollama yasağı gece gündüz geçerlidir.",
    },
    onayli: false,
  },
  "sen-16": {
    ipucu: "Engelli park yerine izinsiz park: para cezası ve araç çekimi.",
    yanlis: {
      0: "İzinsiz park teşekkürle değil, yaptırımla karşılanır.",
      2: "Park ihlalinin hız sınırıyla ilgisi yoktur.",
      3: "İhlal ödüllendirilmez; sonuç para cezası ve çekim gibi idari yaptırımdır.",
    },
    onayli: false,
  },
  "sen-17": {
    ipucu: "Okul geçidinde hızı düşür, çocuklara mutlak öncelik ver.",
    yanlis: {
      0: "Hızlanmak çocuklar için ölümcül risk yaratır; hız düşürülür.",
      2: "Çocukların yola çıkabildiği bir yerde sollama için hızlanmak güvenli değildir.",
      3: "Selektör çocukları durdurmaz; sürücü hızını düşürüp durmaya hazır olmalıdır.",
    },
    onayli: false,
  },
  "sen-18": {
    ipucu: "Sinyal, niyetini diğer sürücülere manevradan önce bildirir.",
    yanlis: {
      1: "Sinyalin amacı hız artırmak değil, niyeti bildirmektir.",
      2: "Sinyalin temel amacı park etmek değil, manevrayı diğerlerine bildirmektir.",
      3: "Far aydınlatma içindir; manevra niyetini sinyal bildirir.",
    },
    onayli: false,
  },
  "sen-19": {
    ipucu: "DUR levhasında tam dur; yol ver; güvenliyse geç.",
    yanlis: {
      0: "DUR levhasında yavaşlamak yetmez; tam durmak gerekir.",
      2: "Korna, DUR levhasının gereğini yerine getirmez; tam durulur.",
      3: "Selektör durmanın yerini tutmaz; tam durmak şarttır.",
    },
    onayli: false,
  },
  "sen-20": {
    ipucu: "Sollamadan sonra güvenli mesafe bırak, sinyal ver, sağ şeride dön.",
    yanlis: {
      0: "Sollama bitince sağ şeride dönülür; sollama şeridinde kalınmaz.",
      2: "Hızlanmaya devam etmek yerine güvenli mesafe bırakıp sağ şeride dönmek gerekir.",
      3: "Selektör sollama sonrası bir gereklilik değildir; sinyal kapatılıp sağ şeride güvenle dönülür.",
    },
    onayli: false,
  },
};

/** Uygulamada gösterilecek not (yalnızca onaylı olanlar) */
export function gorunenNot(soruId: string): TuzakNotu | undefined {
  const not = TUZAK_NOTLARI[soruId];
  return not && not.onayli ? not : undefined;
}
