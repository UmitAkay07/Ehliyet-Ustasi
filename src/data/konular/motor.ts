import type { Konu } from "@/types";

export const MOTOR_KONULARI: Konu[] = [
  {
    id: "mt-motor-calisma",
    dersId: "motor",
    baslik: "Motorun Çalışma Prensibi",
    ozet:
      "Dört zamanlı motorun çalışma sırası, temel görevleri ve benzinli-dizel motor farkları.",
    ikon: "cog",
    okumaSuresiDk: 10,
    kapakGorsel: "dort-zaman",
    bolumler: [
      {
        baslik: "Motor nedir, temel görevi",
        metin:
          "Motor, yakıtın yanmasıyla açığa çıkan ısı (kimyasal) enerjiyi hareket (mekanik) enerjisine çeviren makinedir. Araçlarda yaygın olarak kullanılan içten yanmalı motorlarda yanma, silindir içinde gerçekleşir ve pistonun hareketiyle bu enerji krank miline, oradan da güç aktarma organları aracılığıyla tekerleklere iletilir. Motorun temel yapı elemanları arasında silindir bloğu, piston, krank mili, kam mili, supaplar (valfler) ve silindir kapağı bulunur.",
      },
      {
        baslik: "Dört zamanlı çalışma çevrimi",
        metin:
          "Dört zamanlı motorun çalışma sırası şu şekildedir:\n1. Emme zamanı: Emme supabı açılır, piston aşağı hareket ederken silindire yakıt-hava karışımı (veya sadece hava) emilir.\n2. Sıkıştırma zamanı: Supaplar kapanır, piston yukarı çıkarak karışımı sıkıştırır; sıkışma karışımın sıcaklığını ve enerjisini artırır.\n3. Ateşleme (iş/genişleme) zamanı: Sıkışan karışım ateşlenir (benzinli motorda buji kıvılcımıyla, dizelde kendiliğinden), oluşan patlama pistonu aşağı iterek gerçek işi üretir.\n4. Egzoz zamanı: Egzoz supabı açılır, piston yukarı çıkarak yanma sonucu oluşan gazları dışarı atar.\nBu dört zaman bir tam çevrimi oluşturur ve krank mili iki tam tur döner; çevrim sürekli tekrarlanarak motor gücü sağlanır.",
        gorsel: "dort-zaman",
      },
      {
        baslik: "Benzinli motorlarda ateşleme",
        metin:
          "Benzinli motorlarda silindire alınan yakıt-hava karışımı, sıkıştırma zamanının sonunda buji tarafından üretilen elektrik kıvılcımıyla ateşlenir. Ateşleme zamanlaması motorun performansı ve emisyonu için kritik önemdedir; modern araçlarda bu zamanlama elektronik kontrol ünitesi (ECU) tarafından otomatik ayarlanır.",
      },
      {
        baslik: "Dizel motorlarda ateşleme",
        metin:
          "Dizel motorlarda önce sadece hava silindire alınır ve çok yüksek oranda sıkıştırılır; bu sıkıştırma havanın sıcaklığını dizel yakıtın kendiliğinden tutuşma noktasının üzerine çıkarır. Sıkıştırmanın sonunda yakıt yüksek basınçla püskürtülür ve sıcak havayla temas ettiğinde kendiliğinden tutuşur (kompresyon ateşlemesi). Dizel motorlarda buji yerine, özellikle soğuk havada çalışmayı kolaylaştırmak için kızdırma bujisi (glow plug) bulunur.",
      },
      {
        baslik: "Motor gücü ve tork kavramları",
        metin:
          "Motor gücü (beygir gücü/kW), motorun birim zamanda yapabileceği iş miktarını; tork (moment) ise motorun döndürme kuvvetini ifade eder. Yüksek tork, özellikle kalkışta ve yokuşta aracın güçlü hızlanmasını sağlar; yüksek güç ise yüksek devirde sürekli performansı belirler. Dizel motorlar genellikle düşük devirde yüksek tork üretirken, benzinli motorlar yüksek devirde daha fazla güç üretme eğilimindedir.",
      },
      {
        baslik: "Silindir düzeni ve motor hacmi",
        metin:
          "Motorlar silindir sayısına (3, 4, 6, 8 gibi) ve dizilimine (sıra, V, yatay karşıt) göre sınıflandırılır. Motor hacmi (silindir hacimlerinin toplamı, litre veya cc olarak) motorun genel kapasitesini gösterir; daha büyük hacim genellikle daha fazla güç anlamına gelir ama yakıt tüketimini de artırabilir. Turbo veya süperşarj gibi zorlamalı hava besleme sistemleri, aynı hacimden daha fazla güç almayı sağlar.",
      },
    ],
    anahtarNoktalar: [
      "Motor ısı enerjisini mekanik harekete çevirir.",
      "Dört zaman sırasıyla: emme, sıkıştırma, ateşleme, egzoz.",
      "Bir tam çevrimde krank mili iki tur döner.",
      "Benzinli motorda ateşleme buji kıvılcımıyla olur.",
      "Dizel motorda yakıt sıkıştırılmış sıcak havada kendiliğinden tutuşur.",
      "Dizelde buji yerine kızdırma bujisi (glow plug) bulunur.",
      "Tork kalkış/yokuş gücünü, motor gücü yüksek devir performansını belirler.",
    ],
  },
  {
    id: "mt-yaglama-sogutma",
    dersId: "motor",
    baslik: "Yağlama ve Soğutma Sistemi",
    ozet:
      "Motor yağının görevleri, yağ ikaz lambasının anlamı ve soğutma sisteminin çalışma mantığı.",
    ikon: "thermometer",
    okumaSuresiDk: 9,
    kapakGorsel: "gosterge-renkler",
    bolumler: [
      {
        baslik: "Yağlama sisteminin görevleri",
        metin:
          "Yağlama sistemi motorun düzgün ve uzun ömürlü çalışması için hayati önemdedir. Görevleri:\n1. Hareketli parçalar (piston, krank mili, kam mili) arasındaki sürtünmeyi azaltmak.\n2. Aşınmayı ve ısınmayı azaltmak.\n3. Isıyı bir ölçüde uzaklaştırarak soğutmaya yardımcı olmak.\n4. Yanma sonucu oluşan tortu ve kirleri yıkayıp filtreye taşımak.\n5. Metal yüzeyler arasında ince bir film tabakası oluşturarak korozyonu önlemek.",
      },
      {
        baslik: "Yağ seviyesi ve kalitesi kontrolü",
        metin:
          "Yağ seviyesi periyodik olarak yağ çubuğu (dipstick) ile kontrol edilir; motor durmuş ve düz bir yüzeydeyken çubuk çıkarılıp silinir, tekrar takılıp çekilerek seviye min-max işaretleri arasında olup olmadığına bakılır. Yağ üreticinin belirttiği kilometre veya süre aralığında (genellikle 5.000-15.000 km) değiştirilmelidir; eski/kirli yağ yağlama etkinliğini kaybeder ve motor aşınmasını hızlandırır.",
      },
      {
        baslik: "Yağ ikaz lambası: acil durum",
        metin:
          "Gösterge panelindeki kırmızı yağdanlık şeklindeki yağ basıncı ikaz lambası, motor çalışırken yanarsa yağlama sisteminde ciddi bir basınç düşüşü olduğunu gösterir. Bu lamba yandığında motor derhal (güvenli bir şekilde kenara çekilerek) durdurulmalıdır; yağsız veya düşük basınçla çalışmaya devam etmek, hareketli parçaların birbirine kaynaması (motor sıkışması) gibi kalıcı ve çok maliyetli hasara yol açar.",
        gorsel: "gosterge-renkler",
      },
      {
        baslik: "Soğutma sisteminin bileşenleri",
        metin:
          "Soğutma sistemi, yanma sonucu oluşan aşırı ısıyı motordan uzaklaştırarak motoru güvenli sıcaklık aralığında tutar. Ana bileşenleri:\n1. Radyatör: Sıcak soğutma suyunun hava ile ısı değişimi yaparak soğutulduğu petek yapıdır.\n2. Su pompası: Soğutma suyunu sistemde sürekli dolaştırır.\n3. Termostat: Motor soğukken suyun radyatöre gitmesini keserek motorun hızlı ısınmasını sağlar, motor ısınınca açılır.\n4. Fan: Araç düşük hızdayken veya dururken radyatöre ek hava akışı sağlar.",
      },
      {
        baslik: "Soğutma suyu (antifriz) ve hararet",
        metin:
          "Soğutma suyuna eklenen antifriz, suyun donma noktasını düşürür (kışın donmasını önler) ve kaynama noktasını yükseltir (yazın kaynamasını önler); ayrıca sistemi korozyondan korur. Gösterge panelindeki hararet (sıcaklık) göstergesi kırmızı bölgeye yaklaşırsa veya hararet ikaz lambası yanarsa araç güvenli bir yere çekilip motor durdurulmalı, soğuması beklenmelidir.",
      },
      {
        baslik: "Hararet yapan araçta doğru davranış",
        metin:
          "Motor hararet yaptığında (aşırı ısındığında) izlenmesi gereken adımlar:\n1. Aracı güvenli bir yere çekip motoru durdurun.\n2. Motor kaputunu açarak ısının dağılmasına yardımcı olun.\n3. Motor sıcakken radyatör kapağını asla açmayın; basınç altındaki kaynar su/buhar fışkırarak ciddi yanıklara yol açabilir.\n4. Motor tamamen soğuduktan sonra soğutma suyu seviyesi kontrol edilmeli, gerekirse ilave yapılmalı ve bir servise başvurulmalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Yağlama sürtünmeyi/aşınmayı azaltır, soğutmaya ve temizliğe yardımcı olur.",
      "Yağ seviyesi yağ çubuğuyla, motor durur ve düz yüzeydeyken kontrol edilir.",
      "Yağ ikaz lambası yanınca motor derhal durdurulmalıdır.",
      "Termostat motoru hızlı ısıtır, belirli sıcaklıkta açılır.",
      "Antifriz donmayı ve kaynamayı önler, korozyonu azaltır.",
      "Hararet ikazında araç durdurulur, radyatör kapağı sıcakken açılmaz.",
      "Kırmızı ikaz lambaları acil, sarı/turuncu lambalar kontrol gerektiren uyarıdır.",
    ],
  },
  {
    id: "mt-yakit-atesleme",
    dersId: "motor",
    baslik: "Yakıt ve Ateşleme Sistemi",
    ozet:
      "Yakıt sisteminin bileşenleri, hava/yakıt filtresinin önemi ve ateşleme sistemi parçaları.",
    ikon: "flame",
    okumaSuresiDk: 8,
    kapakGorsel: "dort-zaman",
    bolumler: [
      {
        baslik: "Yakıt sisteminin görevi",
        metin:
          "Yakıt sistemi, yakıt deposundan aldığı yakıtı, doğru basınç ve oranda motora iletmekle görevlidir. Modern araçlarda yakıt pompası yakıtı depodan çeker, yakıt hattı üzerinden enjektörlere (püskürtücülere) iletir; enjektörler yakıtı ince bir sis hâlinde silindire veya emme manifolduna püskürtür. Yakıt sisteminin doğru çalışması, hem motor performansı hem yakıt ekonomisi için belirleyicidir.",
      },
      {
        baslik: "Yakıt ve hava filtrelerinin rolü",
        metin:
          "Yakıt filtresi, yakıt içindeki kir, pas ve su gibi yabancı maddeleri tutarak enjektörlerin tıkanmasını önler; tıkalı bir yakıt filtresi güç kaybına ve düzensiz çalışmaya yol açar.\nHava filtresi, motora giren havayı toz ve kirden temizler. Kirli/tıkalı bir hava filtresi motora giden hava miktarını azaltır; bu durumda yakıt-hava karışımı dengesi bozulur, yakıt tüketimi artar ve motor gücü düşer, egzozdan siyah duman çıkabilir.",
      },
      {
        baslik: "Karbüratör ve enjeksiyon sistemleri",
        metin:
          "Eski araçlarda yakıt-hava karışımını mekanik olarak hazırlayan karbüratör kullanılırken, günümüz araçlarında elektronik yakıt enjeksiyon sistemleri (EFI) kullanılır. Enjeksiyon sistemleri, motorun çalışma koşullarına (devir, yük, sıcaklık) göre yakıt miktarını hassas olarak ayarlayarak daha verimli yanma, düşük emisyon ve düzenli çalışma sağlar.",
      },
      {
        baslik: "Ateşleme sisteminin görevi",
        metin:
          "Benzinli motorlarda ateşleme sistemi, sıkıştırılmış yakıt-hava karışımını doğru zamanda tutuşturmakla görevlidir. Sistem, akü tarafından sağlanan düşük voltajı bobin aracılığıyla yüksek voltaja çevirir; bu yüksek voltaj bujiye iletilerek kıvılcım oluşturulur. Elektronik ateşleme sistemlerinde distribütör yerine, her silindire ait ayrı bobin (coil-on-plug) kullanılabilir.",
      },
      {
        baslik: "Bujilerin durumu ve motor performansı",
        metin:
          "Bujiler, belirli aralıklarla (üreticinin önerdiği kilometrede) kontrol edilip gerekirse değiştirilmelidir; aşınmış veya kirli bujiler düzensiz ateşlemeye, güç kaybına, yakıt tüketiminin artmasına ve motorun sarsıntılı çalışmasına (kaba rölanti) yol açar. Ateşleme ve yakıt sisteminde oluşan arızalar genellikle gösterge panelindeki 'motor arıza' (check engine) ikaz lambasının yanmasına neden olur.",
      },
    ],
    anahtarNoktalar: [
      "Yakıt sistemi depodan alınan yakıtı temiz ve doğru oranda motora iletir.",
      "Yakıt filtresi tıkanırsa güç kaybı ve düzensiz çalışma görülür.",
      "Kirli hava filtresi yakıt tüketimini artırır, gücü düşürür, siyah duman çıkarır.",
      "Modern araçlarda karbüratör yerine elektronik enjeksiyon kullanılır.",
      "Ateşleme sistemi buji kıvılcımıyla yakıt-hava karışımını tutuşturur.",
      "Ateşleme için gereken elektrik enerjisini akü ve bobin sağlar.",
      "Aşınmış bujiler güç kaybı ve kaba rölantiye yol açar.",
    ],
  },
  {
    id: "mt-aktarma",
    dersId: "motor",
    baslik: "Güç Aktarma Organları",
    ozet:
      "Debriyaj, vites kutusu, şaft ve diferansiyelin görevleri ve motordan tekerleğe güç akışı.",
    ikon: "git-network",
    okumaSuresiDk: 8,
    kapakGorsel: "vites-akisi",
    bolumler: [
      {
        baslik: "Güç aktarma organlarının genel görevi",
        metin:
          "Motorda üretilen dönme hareketi ve gücü tekerleklere ileten sisteme güç aktarma organları (transmisyon) denir. Bu sistem sayesinde motorun sabit devir aralığındaki gücü, aracın hız ve yük ihtiyacına göre uygun tork ve hıza dönüştürülerek tekerleklere iletilir. Sıralama genellikle şu şekildedir: motor → debriyaj (kavrama) → vites kutusu → şaft (kardan mili) → diferansiyel → tekerlekler.",
      },
      {
        baslik: "Debriyaj (kavrama) sistemi",
        metin:
          "Debriyaj, motorun dönme hareketini vites kutusuna bağlar veya tamamen keser. Manuel vitesli araçlarda debriyaj pedalına basıldığında motor ile vites kutusu birbirinden ayrılır; bu sayede vites değiştirme, duraklama ve yumuşak kalkış mümkün olur. Debriyaj balatası aşındıkça kavrama zayıflar, güç kaybı ve kayma hissi (yüksek devirde araç yavaş hızlanma) oluşur.",
      },
      {
        baslik: "Vites kutusu (şanzıman)",
        metin:
          "Vites kutusu, farklı dişli oranları kullanarak motorun sabit gücünü, yol ve yük durumuna göre uygun hız ve tork kombinasyonuna dönüştürür. Düşük viteste tork artırılır (kalkış, yokuş, yük taşıma için uygundur), yüksek viteste ise hız artırılır ama tork düşer (düz yolda ekonomik seyir için uygundur). Manuel ve otomatik vites kutuları farklı çalışma mantığına sahiptir; otomatik kutularda debriyaj pedalı yerine hidrolik tork konvertörü veya kavrama paketleri kullanılır.",
      },
      {
        baslik: "Şaft (kardan mili)",
        metin:
          "Şaft (kardan mili), vites kutusundan aldığı dönme hareketini arka veya ön diferansiyele (aracın çekiş düzenine bağlı olarak) ileten, üzerinde açı değişimlerine izin veren mafsallar bulunan çelik bir mildir. Özellikle arkadan itişli ve dört çeker araçlarda önemli bir bileşendir.",
      },
      {
        baslik: "Diferansiyelin görevi",
        metin:
          "Diferansiyel, bir aracın dönüşler sırasında iç ve dış tekerleklerin farklı mesafe kat etmesi gerektiği gerçeğine çözüm üretir; iç tekerlek daha kısa, dış tekerlek daha uzun yol kat eder. Diferansiyel, güç aktarımını bozmadan bu iki tekerleğin farklı hızlarda dönmesine izin verir; bu sayede viraj güvenle ve lastiklerde aşırı sürtünme/aşınma olmadan alınabilir. Diferansiyel olmadan viraja giren bir araçta tekerlekler kayar veya zorlanır.",
      },
      {
        baslik: "Çekiş düzenleri (önden/arkadan/dört çeker)",
        metin:
          "Önden çekişli araçlarda güç ön tekerleklere, arkadan itişli araçlarda arka tekerleklere, dört çeker (4x4) araçlarda ise tüm tekerleklere iletilir. Her düzenin yol tutuş, kalkış ve zor arazi koşullarındaki performansı farklıdır; dört çekişli sistemler kar, çamur ve tırmanma gibi zorlu koşullarda daha fazla çekiş gücü ve denge sağlar.",
      },
    ],
    anahtarNoktalar: [
      "Güç akışı: motor → debriyaj → vites kutusu → şaft → diferansiyel → tekerlek.",
      "Debriyaj motor ile vites kutusu bağlantısını kurar veya keser.",
      "Vites kutusu yol/yük durumuna göre tork ve hız dengesini ayarlar.",
      "Düşük vitesde tork, yüksek vitesde hız avantajı sağlanır.",
      "Şaft, dönme hareketini vites kutusundan diferansiyele iletir.",
      "Diferansiyel virajda iç ve dış tekerlek hız farkını dengeler.",
      "Dört çekişli sistemler zorlu arazi koşullarında daha fazla çekiş sağlar.",
    ],
  },
  {
    id: "mt-fren",
    dersId: "motor",
    baslik: "Fren Sistemi ve ABS",
    ozet:
      "Fren sisteminin çalışma mantığı, el freni, ABS'nin faydası ve fren arızası belirtileri.",
    ikon: "hand-right",
    okumaSuresiDk: 10,
    kapakGorsel: "abs-sema",
    bolumler: [
      {
        baslik: "Fren sisteminin görevi ve çalışma mantığı",
        metin:
          "Fren sistemi, aracın kinetik enerjisini sürtünme yoluyla ısıya dönüştürerek aracı yavaşlatır ve durdurur. Hidrolik fren sistemlerinde fren pedalına basıldığında ana silindirde oluşan basınç, fren hidroliği aracılığıyla her tekerlekteki fren kaliperine (veya silindirine) iletilir; bu basınç fren balatasını disk veya kampanaya bastırarak sürtünme oluşturur.",
      },
      {
        baslik: "Ayak (servis) freni ve el (park) freni",
        metin:
          "Ayak freni (servis freni): Pedal ile kontrol edilir, normalde tüm tekerleklere etki eder; sürüş sırasında yavaşlama ve durma için kullanılan ana fren sistemidir.\nEl freni (park freni): Genellikle sadece arka tekerleklere mekanik olarak etki eder; aracı park hâlinde sabit tutmak ve bazı acil durumlarda yardımcı fren olarak kullanılır. Yokuşta park ederken el freninin çekilmesi ve uygun vitese (veya P konumuna) alınması aracın kaymasını önler.",
      },
      {
        baslik: "Disk ve kampana fren farkı",
        metin:
          "Disk frenler, balataların bir metal diski sıkıştırdığı sistemdir; ısıyı daha hızlı dağıtır ve genellikle daha tutarlı fren performansı sağlar, bu nedenle ön tekerleklerde yaygın kullanılır. Kampana frenler, balataların bir tamburun iç yüzeyine bastığı sistemdir; maliyeti daha düşüktür ama ısınmaya karşı disk frene göre daha az dayanıklıdır, genellikle arka tekerleklerde tercih edilir.",
      },
      {
        baslik: "ABS (kilitlenmeyi önleyici fren sistemi) nedir?",
        metin:
          "ABS, ani ve sert fren yapıldığında tekerleklerin kilitlenip kaymasını önleyen elektronik bir sistemdir. Her tekerleğin dönüş hızını sensörlerle izler; bir tekerlek kilitlenmeye (aşırı yavaşlamaya) başladığında o tekerleğe uygulanan fren basıncını otomatik olarak, saniyede birçok kez azaltıp artırır. Bu sayede tekerlek tamamen kaymadan durmaya devam eder, araç kaymadan durabilir ve sürücü fren sırasında direksiyon hâkimiyetini (yön verebilme becerisini) kaybetmez.",
        gorsel: "abs-sema",
      },
      {
        baslik: "ABS'li araçta doğru fren tekniği",
        metin:
          "ABS'li bir araçta acil frende yapılması gereken, fren pedalına sert ve kararlı biçimde basıp basılı tutmaktır; sistem kendi kendine hızlı aralıklarla basıncı ayarlayacağı için sürücünün pedala 'pompalama' yapmasına (basıp bırakıp basmasına) gerek yoktur, aksine bu ABS'nin etkinliğini azaltabilir. Fren sırasında pedaldan gelen titreşim hissi, ABS'nin normal çalıştığının işaretidir ve endişeye yer yoktur.",
      },
      {
        baslik: "Fren arızası belirtileri ve önlemler",
        metin:
          "Şu belirtiler fren sisteminde bir sorun olduğuna işaret eder:\n1. Fren pedalının aşırı boşalması veya yumuşak/derin basması.\n2. Frene basınca metalik sürtünme veya gıcırtı sesi.\n3. Fren yapılırken aracın bir tarafa çekmesi.\n4. Gösterge panelinde fren veya ABS ikaz lambasının yanması.\nFren hidroliği eksikse veya sisteme hava girmişse frenler tutmayabilir; bu durumda araç kesinlikle kullanılmamalı, en yakın servise çektirilmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Ayak freni tüm tekerleklere, el freni genellikle arkaya etki eder.",
      "Disk fren ısıyı daha hızlı dağıtır, kampana fren daha ekonomiktir.",
      "ABS ani frende tekerlek kilitlenmesini/kaymasını önler.",
      "ABS'li araçta pedal sert basılıp basılı tutulur, pompalanmaz.",
      "Fren titremesi ABS çalışıyor demektir, normaldir.",
      "Pedal boşalması, ses, çekme veya ikaz lambası fren arızasını gösterir.",
      "Fren hidroliği eksik/havalıysa araç kesinlikle kullanılmamalıdır.",
    ],
  },
  {
    id: "mt-elektrik-aku",
    dersId: "motor",
    baslik: "Elektrik Sistemi ve Akü",
    ozet:
      "Akünün görevi, şarj sistemi, akü bakımı, takviye yapma ve şarj ikaz lambasının anlamı.",
    ikon: "battery-charging",
    okumaSuresiDk: 8,
    kapakGorsel: "gosterge-renkler",
    bolumler: [
      {
        baslik: "Akünün görevi",
        metin:
          "Akü (batarya), aracın elektrik enerjisini kimyasal enerji olarak depolayan ve gerektiğinde elektrik enerjisine geri dönüştüren bir cihazdır. Marş anında, motoru döndürecek yüksek akımı sağlayan tek kaynak aküdür. Motor çalışırken elektrikli donanımların (far, radyo, klima) enerjisi büyük ölçüde alternatörden gelir, ancak akü hâlâ voltaj dengesini sağlamada ve ani yük artışlarında devrededir.",
      },
      {
        baslik: "Şarj sistemi: alternatör",
        metin:
          "Alternatör, motor çalışırken kayış aracılığıyla döndürülen ve mekanik enerjiyi elektrik enerjisine çeviren bir jeneratördür. Alternatör, hem aküyü sürekli şarj eder hem de motor çalışırken araçtaki tüm elektrikli sistemlerin enerji ihtiyacını karşılar. Alternatör arızalanırsa araç bir süre akünün depoladığı enerjiyle çalışabilir ama akü hızla boşalır ve sonunda araç durur.",
      },
      {
        baslik: "Akü bakımı",
        metin:
          "Akü kutup başları (terminaller) temiz, sıkı ve oksitlenmeden (beyaz/mavimsi tortu) arındırılmış olmalıdır; kirli terminaller elektrik akışını zayıflatır ve marş sorunlarına yol açar. Bakımlı (sıvı seviyesi görülebilen) akülerde sıvı seviyesi azaldıysa yalnızca saf su ilave edilmelidir, musluk suyu içindeki mineraller aküye zarar verebilir. Akü ömrü genellikle 3-5 yıl arasındadır; aşırı sıcak/soğuk ve düzensiz kullanım bu ömrü kısaltır.",
      },
      {
        baslik: "Takviye (start) yapma sırası",
        metin:
          "Aküsü biten bir aracı takviye ile çalıştırırken doğru sıra hayati önemdedir:\n1. Önce iki aracın artı (+) uçları birbirine kablo ile bağlanır.\n2. Sonra dolu akünün eksi (–) ucu, boş akülü araçta motor bloğu üzerinde uygun bir metal noktaya (akünün eksi ucuna değil) bağlanır; bu kıvılcım riskini azaltır.\n3. Dolu akülü araç çalıştırılır, birkaç dakika beklenir.\n4. Boş akülü araç çalıştırılmaya çalışılır.\nKabloları sökme sırası bağlama sırasının tam tersidir: önce eksi (–), sonra artı (+) uç çıkarılır.",
      },
      {
        baslik: "Şarj ikaz lambası",
        metin:
          "Gösterge panelindeki akü/şarj ikaz lambası (genellikle bir akü sembolü), motor çalışırken yanmaya devam ediyorsa şarj sisteminde bir arıza olduğunu gösterir; en yaygın nedenler alternatör arızası, kopmuş/gevşemiş alternatör kayışı veya bağlantı sorunudur. Bu lamba yanarken araç kısa süre kullanılabilir ama en kısa sürede kontrol ettirilmelidir; aksi hâlde akü tükenip araç yolda kalabilir.",
        gorsel: "gosterge-renkler",
      },
      {
        baslik: "Elektrik sistemindeki diğer bileşenler",
        metin:
          "Marş motoru, akünün sağladığı yüksek akımla krank milini döndürerek motoru ilk kez çalıştırır. Sigortalar, elektrik devrelerini kısa devre ve aşırı akıma karşı korur; bir sigorta attığında ilgili elektrikli donanım (örneğin sinyal veya radyo) çalışmaz hâle gelir ve sigortanın aynı amper değeriyle değiştirilmesi gerekir.",
      },
    ],
    anahtarNoktalar: [
      "Akü elektrik enerjisini depolar, marş anında yüksek akım sağlar.",
      "Alternatör motor çalışırken aküyü şarj eder ve sistemleri besler.",
      "Akü terminalleri temiz ve sıkı tutulmalı, gerekirse saf su ilave edilmelidir.",
      "Takviyede önce artı (+) uçlar, sonra eksi (–) uç bağlanır.",
      "Kabloları sökerken önce eksi (–), sonra artı (+) çıkarılır.",
      "Şarj ikaz lambası sürekli yanıyorsa şarj sistemi arızalıdır.",
      "Sigortalar devreleri korur, atan sigorta aynı amperle değiştirilir.",
    ],
  },
  {
    id: "mt-lastik-bakim",
    dersId: "motor",
    baslik: "Lastikler ve Araç Bakımı",
    ozet:
      "Lastik basıncı, diş derinliği, kış lastiği/zincir kullanımı ve periyodik bakımın önemi.",
    ikon: "ellipse",
    okumaSuresiDk: 9,
    kapakGorsel: "lastik-basinc",
    bolumler: [
      {
        baslik: "Lastik basıncının önemi",
        metin:
          "Doğru lastik basıncı; yol tutuşu, fren performansı, yakıt tasarrufu ve lastik ömrü için son derece önemlidir. Üreticinin önerdiği basınç değeri genellikle sürücü kapı kenarındaki etikette veya kullanım kılavuzunda belirtilir. Düşük basınçlı lastik yol ile daha fazla temas alanı oluşturduğundan sürtünme artar; bu durum yakıt tüketimini yükseltir, lastiği aşırı ısıtır ve kenarlarından hızla aşındırır. Aşırı şişirilmiş lastik ise yolla teması azaltarak fren mesafesini uzatabilir ve konforu düşürür.",
      },
      {
        baslik: "Lastik diş derinliği ve aşınma",
        metin:
          "Lastik diş derinliği, özellikle yağışlı havada suyu tahliye ederek yola tutunmayı sağlayan yapıdır. Yasal minimum diş derinliğinin altına inen (aşınmış) lastikler, ıslak zeminde su tahliyesini yeterince yapamaz; bu durum 'akvaplanning' (su üstünde kayma) riskini artırır ve fren mesafesini önemli ölçüde uzatır. Lastik yanaklarında çatlama, şişkinlik veya düzensiz aşınma görülmesi de değişim gerektiren işaretlerdir.",
      },
      {
        baslik: "Lastik rotasyonu ve balans",
        metin:
          "Lastikler zamanla eşit aşınmaz; ön ve arka tekerlekler farklı yük ve yönlendirme kuvvetlerine tabidir. Periyodik lastik rotasyonu (yer değiştirme) aşınmayı dengeler ve lastik ömrünü uzatır. Balans ayarı bozulmuş bir lastik, direksiyon titremesine ve düzensiz aşınmaya yol açar; rot ayarı bozuk bir araç ise düz gitmez ve lastikleri anormal şekilde aşındırır.",
      },
      {
        baslik: "Kış lastiği ve zincir kullanımı",
        metin:
          "Kış lastikleri, düşük sıcaklıklarda yaz lastiklerine göre daha yumuşak kalan kauçuk bileşimi ve daha derin/yoğun diş desenleri sayesinde kar, buz ve soğuk zeminde çok daha iyi yol tutuşu sağlar. Bazı il ve karayollarında belirli tarihler arasında (genellikle kış aylarında) kış lastiği kullanımı zorunlu tutulabilir. Kar zinciri, çekiş tekerleklerine takılan ve derin kar/buzda ekstra tutunma sağlayan bir donanımdır; zincir yalnızca gerektiğinde takılmalı, kuru asfaltta kullanılmamalıdır çünkü hem zincire hem yola zarar verir.",
      },
      {
        baslik: "Periyodik bakımın kapsamı",
        metin:
          "Düzenli periyodik bakım kapsamında değiştirilmesi/kontrol edilmesi gereken başlıca kalemler:\n1. Motor yağı ve yağ filtresi\n2. Hava ve yakıt filtreleri\n3. Fren balataları ve fren hidroliği\n4. Triger/kayış-zincir sistemi\n5. Buji ve ateşleme sistemi\n6. Lastik basıncı ve diş derinliği\n7. Akü durumu ve şarj sistemi\nBu bakımların üreticinin belirttiği aralıklarla yapılması, hem güvenliği hem de aracın ekonomik ömrünü doğrudan artırır.",
      },
      {
        baslik: "Bakımsızlığın sonuçları",
        metin:
          "İhmal edilen periyodik bakım, beklenmedik arızalara (yolda kalma), artan yakıt tüketimine, düşük ikinci el değerine ve en önemlisi ciddi güvenlik risklerine yol açar. Örneğin aşınmış fren balatası fren mesafesini uzatır, eskimiş triger kayışı koparsa motor ağır hasar görebilir. Bu nedenle bakım takibi bir lüks değil, temel güvenlik gereğidir.",
      },
    ],
    anahtarNoktalar: [
      "Doğru lastik basıncı yol tutuşunu, yakıt tasarrufunu ve lastik ömrünü artırır.",
      "Aşınmış lastik ıslak zeminde fren mesafesini ciddi şekilde uzatır.",
      "Lastik rotasyonu aşınmayı dengeler, balans/rot ayarı direksiyon sağlığı için önemlidir.",
      "Kış lastiği soğuk/kar/buzda çok daha iyi tutunma sağlar.",
      "Kar zinciri sadece kar/buzda takılır, kuru asfaltta kullanılmaz.",
      "Periyodik bakım yağ, filtre, fren, triger ve lastikleri kapsar.",
      "Bakım ihmali beklenmedik arıza ve ciddi güvenlik riski oluşturur.",
    ],
  },
  {
    id: "mt-gosterge-guvenlik",
    dersId: "motor",
    baslik: "Gösterge Paneli ve Güvenlik Donanımları",
    ozet:
      "İkaz lambalarının renk anlamı, önemli gösterge sembolleri ve hava yastığı, kemer gibi güvenlik sistemleri.",
    ikon: "speedometer-outline",
    okumaSuresiDk: 10,
    kapakGorsel: "gosterge-renkler",
    bolumler: [
      {
        baslik: "İkaz lambalarının renk kodlaması",
        metin:
          "Gösterge panelindeki ikaz lambaları evrensel bir renk mantığıyla tasarlanır:\n1. Kırmızı: Acil ve tehlikeli durum; genellikle aracın hemen durdurulup kontrol edilmesi gerekir (yağ basıncı, hararet, fren sistemi, akü/şarj gibi).\n2. Sarı/turuncu: Uyarı niteliğindedir; hemen durmayı gerektirmez ama en kısa sürede kontrol/servise gidilmelidir (motor arıza, lastik basıncı, ABS uyarısı gibi).\n3. Yeşil/mavi: Bir sistemin aktif/çalışır durumda olduğunu bildirir (sinyal, uzun far, vites göstergesi gibi); tehlike anlamı taşımaz.",
        gorsel: "gosterge-renkler",
      },
      {
        baslik: "Kritik kırmızı ikaz lambaları",
        metin:
          "Yağ basıncı (yağdanlık sembolü): Yağlama sisteminde basınç düşüklüğü; motor derhal durdurulmalıdır.\nHararet (termometre sembolü): Motor aşırı ısınmış; araç güvenli yere çekilip motor durdurulmalıdır.\nFren sistemi (ünlem işaretli daire): Fren hidroliği düşük veya el freni çekili; kontrol edilmelidir.\nAkü/şarj (akü sembolü): Şarj sisteminde arıza; en kısa sürede kontrol gerekir.\nBu lambalardan biri sürüş sırasında yanarsa panik yapmadan, güvenli bir şekilde kenara çekilip durum değerlendirilmelidir.",
      },
      {
        baslik: "Sık görülen sarı/turuncu ikazlar",
        metin:
          "Motor arıza (check engine, motor şekli): Motor yönetim sisteminde bir sorun tespit edildiğini gösterir; araç genellikle sürülebilir ama en kısa sürede servise gidilmelidir.\nABS ikazı: ABS sisteminde bir arıza var; normal fren çalışır ama ABS devre dışı olabilir.\nLastik basıncı (TPMS): Bir veya daha fazla lastiğin basıncı önerilenden düşük; en kısa sürede kontrol edilmelidir.\nEl freni/fren aşınma ikazı: Fren balatalarının aşınma sınırına yaklaştığını gösterebilir.",
      },
      {
        baslik: "Gösterge panelindeki diğer bilgiler",
        metin:
          "Hız göstergesi (km/s), devir göstergesi (RPM, dakikadaki motor devri), yakıt seviye göstergesi ve kilometre sayacı sürüş sırasında sürekli takip edilmesi gereken temel göstergelerdir. Devir göstergesindeki kırmızı bölge (redline), motorun güvenli çalışma sınırının üst noktasını gösterir; bu bölgede uzun süre çalıştırmak motor ömrünü kısaltır.",
      },
      {
        baslik: "Pasif güvenlik donanımları",
        metin:
          "Pasif güvenlik donanımları, kaza gerçekleştiğinde etkiye giren ve yaralanmayı azaltmayı hedefleyen sistemlerdir: emniyet kemeri, hava yastığı (airbag), baş desteği, gövde kafesinin darbe emici yapısı ve çocuk koltuğu bağlantı noktaları (ISOFIX) bu gruba girer. Hava yastığı, çarpma sensörleri tarafından tetiklenir ve saniyenin çok küçük bir bölümünde şişerek sürücü/yolcunun sert yüzeylere çarpmasını yumuşatır; ancak hava yastığı yalnızca emniyet kemeri takılıyken tam koruma sağlar, kemersiz bir yolcuda hava yastığı yeterli koruma sağlamaz ve hatta yaralanmaya yol açabilir.",
        gorsel: "emniyet-kemeri",
      },
      {
        baslik: "Aktif güvenlik donanımları",
        metin:
          "Aktif güvenlik donanımları, kazayı önlemeye yönelik sistemlerdir: ABS (kilitlenmeyi önleyici fren), ESP/ESC (elektronik stabilite kontrolü, savrulmayı önler), TCS (çekiş kontrolü, tekerlek patinajını önler) ve modern araçlardaki şerit takip/çarpışma uyarı sistemleri bu gruba girer. Bu sistemler sürücünün kontrolünü tamamen elinden almaz, kritik anlarda destek sağlayarak kaza riskini azaltır.",
      },
    ],
    anahtarNoktalar: [
      "Kırmızı ikaz = acil, aracı güvenli yere çekip durdur.",
      "Sarı/turuncu ikaz = en kısa sürede kontrol/servise git.",
      "Yeşil/mavi ikaz sadece bir sistemin aktif olduğunu bildirir.",
      "Yağ basıncı lambası yanınca motor derhal durdurulmalıdır.",
      "Hava yastığı, emniyet kemeri takılıyken tam koruma sağlar.",
      "ABS/ESP/TCS gibi aktif sistemler kazayı önlemeye yardımcı olur.",
      "Devir göstergesindeki kırmızı bölgede uzun çalışmak motor ömrünü kısaltır.",
    ],
  },
];
