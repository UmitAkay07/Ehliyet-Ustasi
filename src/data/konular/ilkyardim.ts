import type { Konu } from "@/types";

export const ILKYARDIM_KONULARI: Konu[] = [
  {
    id: "iy-temel-kavramlar",
    dersId: "ilkyardim",
    baslik: "İlk Yardımın Temel Kavramları",
    ozet:
      "İlk yardım ile tıbbi yardım farkı, ilk yardımcının öncelikleri, amaçları ve temel değerlendirme sırası (ABC).",
    ikon: "information-circle",
    okumaSuresiDk: 10,
    kapakGorsel: "abc-diyagram",
    bolumler: [
      {
        baslik: "İlk yardım ve tıbbi yardım tanımları",
        metin:
          "İlk yardım: Herhangi bir kaza veya yaşamı tehlikeye düşüren durumda, sağlık görevlileri gelene kadar, hasta veya yaralıya olay yerinde, tıbbi araç-gereç aranmaksızın, mevcut araç ve gereçlerle yapılan ilaçsız uygulamalardır.\nAcil tedavi (tıbbi yardım): Olay yerinde uzman kişi (paramedik, hekim vb.) tarafından tıbbi araç-gereç ile yapılan müdahaledir.\nBu ayrım önemlidir çünkü ilk yardımcı asla ilaç uygulamaz veya tıbbi bir tedavi girişiminde bulunmaz; amacı yaşamı sürdürmek ve durumun kötüleşmesini önlemektir.",
      },
      {
        baslik: "İlk yardımın öncelik sırası",
        metin:
          "Bir olay yerinde ilk yardımcının izlemesi gereken mantıksal sıra şudur:\n1. Kendi güvenliğini sağla (trafik, yangın, elektrik gibi tehlikeleri kontrol et).\n2. Olay yerini güvenli hâle getir (motor kapat, üçgen reflektör koy, dörtlü flaşör yak).\n3. Hastanın/yaralının bilincini ve genel durumunu değerlendir.\n4. Gerekiyorsa 112'yi ara veya arattır.\n5. Hayati tehlikeye yönelik ilk yardımı uygula.\nBu sıralamaya uyulmadan doğrudan hastaya koşmak, ikinci bir kazaya (örneğin trafiğe çıkıp araç çarpması) yol açabilir.",
      },
      {
        baslik: "ABC değerlendirmesi",
        metin:
          "Bilinci kapalı bir hastada hızlı ve sistematik değerlendirme için ABC yöntemi kullanılır:\nA (Airway - Hava yolu): Hava yolu açık mı? Ağız içinde tıkayıcı bir cisim var mı?\nB (Breathing - Solunum): Hasta soluk alıp veriyor mu? Göğüs hareketi var mı?\nC (Circulation - Dolaşım): Nabız var mı? Ciddi bir dış kanama var mı?\nBu üç harf, ilk yardımda hangi müdahalenin önce yapılacağını belirleyen evrensel bir kontrol listesidir; sırayla değerlendirilmeden atlama yapılmamalıdır.",
        gorsel: "abc-diyagram",
      },
      {
        baslik: "İlk yardımcının temel amaçları",
        metin:
          "İlk yardım uygulamalarının üç temel amacı vardır:\n1. Yaşamsal fonksiyonların (solunum, dolaşım) sürdürülmesini sağlamak.\n2. Hastanın/yaralının durumunun daha da kötüleşmesini önlemek.\n3. İyileşme sürecini kolaylaştırmak ve acı/rahatsızlığı en aza indirmek.\nBu amaçlara ulaşmak için ilk yardımcının kendi bilgi ve becerisinin sınırını bilmesi, yapamayacağı bir müdahaleyi denememesi ve profesyonel yardımı (112) mutlaka çağırması gerekir.",
      },
      {
        baslik: "İyi bir ilk yardımcının nitelikleri",
        metin:
          "Sakin kalabilmek, hızlı ama doğru karar verebilmek, hasta ve çevredekilerle etkili iletişim kurabilmek, temel yaşam desteği (TYD) bilgisine sahip olmak ve kendi güvenliğini asla ihmal etmemek, iyi bir ilk yardımcının temel özellikleridir. Panik hâlinde yapılan yanlış bir müdahale, hiçbir müdahale yapmamaktan daha kötü sonuçlar doğurabilir.",
      },
      {
        baslik: "112 acil çağrı sistemi",
        metin:
          "Türkiye'de tüm acil durumlar için tek çağrı numarası 112'dir; bu numara ambulans, itfaiye ve polis hizmetlerine yönlendirme yapar. Arama sırasında olay yeri adresi, olayın türü, yaralı/hasta sayısı ve durumu net biçimde bildirilmelidir. Görevli 'kapatabilirsiniz' demeden telefon kapatılmamalı, çünkü ek bilgi istenebilir veya telefon üzerinden yönlendirme yapılabilir.",
      },
    ],
    anahtarNoktalar: [
      "İlk yardım ilaçsız, olay yerinde ve mevcut imkânlarla yapılır.",
      "Öncelik sırası: kendi güvenliği, olay yeri güvenliği, hasta değerlendirme, 112, müdahale.",
      "Değerlendirme sırası ABC: hava yolu, solunum, dolaşım.",
      "İlk yardımın amacı yaşamı sürdürmek, kötüleşmeyi önlemek, iyileşmeyi kolaylaştırmaktır.",
      "İlk yardımcı bilmediği/yapamayacağı müdahaleyi denememelidir.",
      "Acil çağrı numarası 112'dir ve görevli kapat demeden telefon kapatılmaz.",
      "Panik hâlinde yapılan yanlış müdahale durumu kötüleştirebilir.",
    ],
  },
  {
    id: "iy-olay-yeri",
    dersId: "ilkyardim",
    baslik: "Olay Yerinin Değerlendirilmesi",
    ozet:
      "Kaza yerinde güvenlik sağlama, ikincil kazaların önlenmesi ve 112'ye doğru ve etkili bilgi verme.",
    ikon: "alert-circle",
    okumaSuresiDk: 9,
    kapakGorsel: "ilk-yardim-oncelik",
    bolumler: [
      {
        baslik: "Neden önce güvenlik?",
        metin:
          "Bir kaza yerine ilk ulaşan kişinin en büyük hatası, doğrudan yaralıya koşmaktır. Oysa güvenliği sağlanmamış bir ortamda hem ilk yardımcı hem de yaralı yeni bir tehlikeyle (geçen araç, yangın, elektrik teli) karşı karşıya kalabilir. Bu nedenle 'önce güvenlik, sonra müdahale' ilkesi ilk yardımın temelini oluşturur.",
        gorsel: "ilk-yardim-oncelik",
      },
      {
        baslik: "Kendi güvenliğini sağlama adımları",
        metin:
          "Olay yerine yaklaşırken şu adımlar izlenir:\n1. Aracınızı olay yerinden güvenli bir mesafede, yol kenarına, mümkünse görüş açısı yeterli bir yere park edin.\n2. Kontağı kapatın ve el frenini çekin.\n3. Dörtlü flaşörü yakın.\n4. Reflektör (ikaz üçgeni) uzağa (şehir içi 50 m, şehir dışı 100-150 m) yerleştirerek diğer sürücüleri uyarın.\n5. Yangın/patlama riski nedeniyle olay yerinde asla sigara içmeyin veya ateş yakmayın.",
      },
      {
        baslik: "Olay yerini güvenli hâle getirme",
        metin:
          "Trafik akışını kontrol altına alacak şekilde başka kişilerden yardım isteyin; mümkünse biri gelen araçları yavaşlatmak için işaret versin. Sızan yakıt, kopan elektrik kabloları veya devrilme riski olan yükler varsa bu alandan uzak durulmalı, gerekirse itfaiyeye haber verilmelidir. Meraklı kalabalık, yaralıya erişimi ve hava akışını engelleyeceğinden nazikçe uzaklaştırılmalıdır.",
      },
      {
        baslik: "İkincil kazaların önlenmesi",
        metin:
          "Yaralılar, hayati tehlike (yangın, araç patlaması, yeniden çarpışma riski) olmadıkça bulundukları yerden oynatılmamalıdır; yanlış taşıma özellikle omurga yaralanmalarında kalıcı sakatlığa yol açabilir. Trafik güvenliği tam olarak alınmadan yola çıkılmamalı, panik yaratacak davranışlardan (bağırma, koşuşturma) kaçınılmalıdır.",
      },
      {
        baslik: "112'yi doğru arama",
        metin:
          "112 aranırken sakin bir ses tonuyla şu bilgiler net olarak verilmelidir:\n1. Olayın kesin yeri/adresi (yol adı, kilometre taşı, yakın bir işaret noktası).\n2. Olayın türü (trafik kazası, yangın, düşme vb.).\n3. Yaralı sayısı ve genel durumları (bilinç, solunum, kanama var mı).\n4. Alınan önlemler (reflektör konuldu mu, trafik durduruldu mu).\nGörevli ek soru sorabileceği veya telefon üzerinden yönlendirme yapabileceği için 'kapatabilirsiniz' denilmeden arama sonlandırılmamalıdır.",
      },
      {
        baslik: "Çoklu yaralı durumunda triyaj mantığı",
        metin:
          "Birden fazla yaralının bulunduğu olaylarda, ilk yardımcı önce en ciddi durumdaki (bilinci kapalı, solunumu/dolaşımı bozulmuş) kişilere yönelmelidir. Yüksek sesle yardım isteyen, hareket edebilen kişiler genellikle daha az kritik durumdadır; sessiz kalan veya hareketsiz yaralılar öncelikli olarak kontrol edilmelidir.",
      },
    ],
    anahtarNoktalar: [
      "Önce kendi güvenliğin, sonra olay yeri güvenliği sağlanır.",
      "Kontak kapatılır, el freni çekilir, dörtlü flaşör yakılır, reflektör konur.",
      "Yaralı zorunlu olmadıkça yerinden oynatılmaz.",
      "112'ye kesin adres, olay türü ve yaralı durumu net bildirilir.",
      "Görevli 'kapatabilirsiniz' demeden telefon kapatılmaz.",
      "Meraklı kalabalık ve trafik riski olay yerinden uzaklaştırılır.",
      "Çoklu yaralıda sessiz/hareketsiz kişiler önce kontrol edilir.",
    ],
  },
  {
    id: "iy-tyd",
    dersId: "ilkyardim",
    baslik: "Temel Yaşam Desteği (TYD) ve CPR",
    ozet:
      "Bilinç ve solunum kontrolü, göğüs (kalp) basısı ve suni solunum uygulamasının doğru sırası ve teknikleri.",
    ikon: "heart",
    okumaSuresiDk: 13,
    kapakGorsel: "tyd-30-2",
    bolumler: [
      {
        baslik: "Bilinç kontrolü",
        metin:
          "Hastaya yaklaşılınca önce omzuna hafifçe dokunulur ve yüksek sesle 'İyi misiniz? Beni işitiyor musunuz?' diye seslenilir. Tepki yoksa bilinç kapalı kabul edilir ve hemen yardım çağrılır (112 veya çevredekilerden biri aratılır). Bilinç açıksa hasta sakinleştirilir ve şikâyetleri değerlendirilir.",
      },
      {
        baslik: "Hava yolunun açılması",
        metin:
          "Bilinç kapalıysa hava yolu 'baş geri-çene yukarı' (head tilt-chin lift) tekniğiyle açılır: bir el hastanın alnına konularak başı hafifçe geriye itilir, diğer elin iki parmağıyla çene kemiğinden tutularak çene yukarı doğru kaldırılır. Bu, dilin geriye kaçarak hava yolunu tıkamasını önler. Ağız içinde görünür bir yabancı cisim varsa dikkatlice çıkarılır.",
      },
      {
        baslik: "Solunum kontrolü: bak-dinle-hisset",
        metin:
          "Hava yolu açıldıktan sonra en fazla 10 saniye içinde solunum değerlendirilir: Bak (göğüs kafesinin inip kalkmasına), Dinle (nefes sesine kulak vererek), Hisset (yanaklarınızla hava akımını hissederek). Solunum yoksa veya anormal (gasping - iç çekme benzeri) ise solunum yokmuş gibi kabul edilir ve TYD'ye hemen başlanır.",
      },
      {
        baslik: "Göğüs (kalp) basısı tekniği",
        metin:
          "Solunum ve/veya dolaşım bulgusu yoksa temel yaşam desteğine (TYD/CPR) başlanır. Yetişkinde uygulama:\n1. Hasta sırtüstü, sert bir yüzeye yatırılır.\n2. Göğüs kemiğinin (sternum) alt yarısına, bir elin topuğu konur, diğer el üzerine kenetlenir.\n3. Dirsekler kilitli, kollar dik tutularak vücut ağırlığıyla bası yapılır.\n4. Bası derinliği yaklaşık 5-6 cm, hız dakikada 100-120 bastırmadır.\n5. Her bastan sonra göğüsün tam olarak geri gelmesine (göğüs duvarının eski hâline dönmesine) izin verilir.",
      },
      {
        baslik: "30:2 döngüsü ve suni solunum",
        metin:
          "Standart yetişkin TYD döngüsü 30 göğüs basısı + 2 suni solunum şeklindedir. Suni solunum verirken hava yolu açık tutulur, burun kapatılır ve ağızdan ağıza (veya maske ile) 1 saniyelik iki nefes verilir; her nefeste göğsün hafifçe kalktığı gözlenmelidir. Eğitimsiz kişiler yalnızca göğüs basısına (hands-only CPR) devam edebilir; bu da hayat kurtarıcıdır.",
        gorsel: "tyd-30-2",
      },
      {
        baslik: "Yaş gruplarına göre farklar",
        metin:
          "Bebeklerde (1 yaş altı) bası iki parmakla, çocuklarda (1 yaş - ergenlik) tek veya iki elle yapılır; bası derinliği her iki grupta da göğüs kalınlığının yaklaşık üçte biri kadar olmalıdır. Bebek ve çocukta oran yine 30:2'dir (tek kurtarıcı için); iki kurtarıcı varsa çocukta 15:2 oranı tercih edilebilir.",
      },
      {
        baslik: "TYD'nin sona erdirilmesi",
        metin:
          "Temel yaşam desteği; sağlık ekibi olay yerine gelip devralana kadar, hasta yaşam belirtisi (kendiliğinden solunum, hareket, öksürük) gösterene kadar veya ilk yardımcı fiziksel olarak devam edemeyecek kadar tükenene kadar aralıksız sürdürülmelidir. Otomatik eksternal defibrilatör (OED) bulunuyorsa cihazın sesli talimatlarına uyularak kullanılmalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Bilinç kontrolü: omuza dokun, yüksek sesle seslen.",
      "Hava yolu 'baş geri-çene yukarı' tekniğiyle açılır.",
      "Solunum en fazla 10 saniyede bak-dinle-hisset ile değerlendirilir.",
      "Yetişkinde bası derinliği ~5-6 cm, hız 100-120/dk.",
      "Standart döngü: 30 göğüs basısı + 2 suni solunum.",
      "Bebekte iki parmak, çocukta tek/iki el; derinlik göğsün 1/3'ü.",
      "TYD, ekip gelene veya yaşam belirtisi çıkana kadar aralıksız sürdürülür.",
    ],
  },
  {
    id: "iy-tikanma",
    dersId: "ilkyardim",
    baslik: "Solunum Yolu Tıkanıklığı (Heimlich)",
    ozet:
      "Tam ve kısmi tıkanıklık ayrımı, Heimlich manevrasının doğru uygulanışı ve bebeklerde özel teknik.",
    ikon: "hand-left",
    okumaSuresiDk: 9,
    kapakGorsel: "heimlich",
    bolumler: [
      {
        baslik: "Tıkanma nedenleri ve türleri",
        metin:
          "Yabancı cisim aspirasyonu (yemek lokması, küçük oyuncak, sakız gibi cisimlerin nefes borusuna kaçması), solunum yolunu kısmen veya tamamen tıkayabilir. İki tür tıkanma ayırt edilir:\nKısmi tıkanma: Hava yolunda bir daralma vardır ama tamamen kapalı değildir; kişi öksürebilir, konuşabilir, ses çıkarabilir.\nTam tıkanma: Hava yolu tamamen kapalıdır; kişi konuşamaz, öksüremez, ses çıkaramaz ve genellikle elini boğazına götürerek panikler.",
      },
      {
        baslik: "Kısmi tıkanmada müdahale",
        metin:
          "Kısmi tıkanmada kişi öksürebiliyorsa, vücudun kendi doğal refleksiyle cismi çıkarmasına izin verilmeli, kişi öksürmeye teşvik edilmelidir. Bu aşamada sırta vurmak veya Heimlich uygulamak gerekmez, çünkü cismi daha derine kaçırma riski vardır. Kişi yakından gözlemlenir; durum tam tıkanmaya dönüşürse hemen müdahaleye geçilir.",
      },
      {
        baslik: "Tam tıkanmanın belirtileri",
        metin:
          "Tam tıkanmada kişi: konuşamaz, öksüremez, nefes alamaz, elini/ellerini boğazına götürür (evrensel tıkanma işareti), yüzü ve dudakları morarmaya (siyanoz) başlar ve kısa sürede bilincini kaybedebilir. Bu tablo görüldüğünde derhal Heimlich manevrasına başlanmalıdır; zaman kritik önemdedir.",
      },
      {
        baslik: "Heimlich manevrası (yetişkin ve büyük çocuk)",
        metin:
          "Bilinci açık, ayakta duran bir kişide tam tıkanma durumunda uygulama sırası:\n1. Kişinin arkasına geçilir ve bel hizasından sarılır.\n2. Bir el yumruk yapılır, göbek deliği ile göğüs kemiği (sternum) arasına, orta hatta yerleştirilir.\n3. Diğer el yumruğun üzerine kapatılır.\n4. İçe ve yukarı doğru, hızlı ve kuvvetli şekilde bastırılır (5 kez).\n5. Cisim çıkana veya kişi bilincini kaybedene kadar bu bası tekrarlanır.\nKişi bilincini kaybederse hemen yere yatırılır ve TYD (göğüs basısı) başlatılır; her bası döngüsü öncesinde ağız içi kontrol edilerek görünen cisim çıkarılmaya çalışılır.",
        gorsel: "heimlich",
      },
      {
        baslik: "Hamile ve obez bireylerde farklı uygulama",
        metin:
          "Hamile kadınlarda veya karın bölgesine bası yapılamayacak kadar iri bireylerde Heimlich, karın yerine göğüs kemiğinin ortasına (göğüs basısı şeklinde) uygulanır; kollar koltuk altından dolaştırılarak göğüs kemiğine içe doğru bası yapılır.",
      },
      {
        baslik: "Bebeklerde (1 yaş altı) uygulama",
        metin:
          "Bebeklerde karın bölgesine kesinlikle bası yapılmaz; iç organ hasarı riski çok yüksektir. Doğru teknik:\n1. Bebek yüzü aşağı bakacak şekilde kurtarıcının kol/önkolu üzerine, baş gövdeden aşağıda olacak şekilde yatırılır.\n2. Kürek kemikleri arasına elin topuğuyla 5 kez sırt vuruşu yapılır.\n3. Cisim çıkmazsa bebek sırtüstü çevrilir, iki parmakla göğüs kemiğinin alt yarısına 5 kez bası (göğüs basısı) yapılır.\n4. Cisim çıkana veya bebek bilincini kaybedene kadar sırt vuruşu + göğüs basısı döngüsü tekrarlanır.",
      },
      {
        baslik: "Kendi kendine Heimlich",
        metin:
          "Yalnız başına tam tıkanma yaşayan bir kişi, yumruğunu göbek üstüne yerleştirip sert bir sandalye/masa kenarına karnını hızla bastırarak kendi kendine Heimlich uygulamayı deneyebilir; ancak mümkünse hemen yakınındaki birinden yardım istemesi çok daha güvenlidir.",
      },
    ],
    anahtarNoktalar: [
      "Kişi öksürüp konuşabiliyorsa (kısmi tıkanma) öksürmeye teşvik edilir, dokunulmaz.",
      "Tam tıkanmada kişi konuşamaz, öksüremez ve morarmaya başlar.",
      "Heimlich'te bası göbek ile göğüs kemiği arasına, içe ve yukarı yöndedir.",
      "Bilinç kaybolursa hemen yere yatırıp TYD (göğüs basısı) başlatılır.",
      "Hamilelerde bası karın yerine göğüs kemiğine uygulanır.",
      "Bebekte karına asla bası yapılmaz; sırta vurma + göğüs basısı uygulanır.",
      "Bebekte sırt vuruşu ve göğüs basısı 5'er kez döngü hâlinde tekrarlanır.",
    ],
  },
  {
    id: "iy-kanama-sok",
    dersId: "ilkyardim",
    baslik: "Kanamalar ve Şok",
    ozet:
      "Kanama türleri, kanamayı durdurma yöntemleri, turnike kullanımı ve şok pozisyonunun uygulanması.",
    ikon: "water",
    okumaSuresiDk: 11,
    kapakGorsel: "sok-pozisyonu",
    bolumler: [
      {
        baslik: "Kanama türleri",
        metin:
          "Kanamalar kaynaklandığı damara göre üçe ayrılır:\nAtardamar (arter) kanaması: Kalple aynı ritimde, fışkırarak, açık kırmızı renkte akar; en hızlı kan kaybına yol açar ve en tehlikelisidir.\nToplardamar (ven) kanaması: Sürekli, sızıntı şeklinde, koyu kırmızı renktedir.\nKılcal damar kanaması: Sızıntı şeklinde, az miktarda kanamadır, genellikle kendiliğinden durur.\nAyrıca kanamalar dış kanama (görülebilir) ve iç kanama (vücut boşluklarına, dışarıdan görülmeyen) olarak da ikiye ayrılır.",
      },
      {
        baslik: "Dış kanamayı durdurma adımları",
        metin:
          "Dış kanamada uygulama sırası:\n1. Mümkünse eldiven takılır veya araya temiz bir bez konur (bulaşıcı hastalık riskine karşı).\n2. Kanayan bölgeye temiz bir bez ile doğrudan ve sürekli bası yapılır.\n3. Bası yeterli olmazsa, kanayan bölge mümkünse kalp seviyesinden yukarı kaldırılır.\n4. Bası bezi kanla dolarsa üzerine yeni bez eklenir, ilk bezi çıkarmadan üstüne konur.\n5. Kanama durduktan sonra bölge sabit bir bandajla tespit edilir.",
      },
      {
        baslik: "Turnike kullanımı",
        metin:
          "Turnike, doğrudan bası ve yükseltme ile durdurulamayan, uzuv kopması veya çok ciddi kanama gibi hayati tehlike oluşturan durumlarda son çare olarak uygulanır. Turnike, yaranın 5-7 cm yukarısına, kemik üzerine sıkıca bağlanır ve uygulama saati not edilir; turnike bir kez bağlandıktan sonra sağlık ekibine teslim edilene kadar gevşetilmez, çünkü gevşetmek ani ve ciddi kan kaybına yol açabilir.",
      },
      {
        baslik: "İç kanama belirtileri",
        metin:
          "İç kanamada dışarıdan görülür bir yara olmayabilir; ancak şu belirtiler görülür: ciltte ve dudaklarda solukluk, soğuk ve nemli terleme, hızlı ve zayıf (filiform) nabız, huzursuzluk veya bilinç bulanıklığı, karın bölgesinde şişlik/sertlik ve ağrı. İç kanamadan şüphelenilen kişi acilen sağlık kuruluşuna ulaştırılmalı, ağızdan hiçbir şey (su, yiyecek, ilaç) verilmemelidir çünkü ameliyat gerekebilir.",
      },
      {
        baslik: "Şok nedir?",
        metin:
          "Şok, ciddi kan kaybı, yanık, alerjik reaksiyon veya kalp yetmezliği gibi nedenlerle dokulara ve organlara yeterli kan ve oksijen gitmemesi durumudur. Belirtileri: solukluk, soğuk terli cilt, hızlı-yüzeysel nabız, hızlı solunum, üşüme hissi, bulantı ve giderek artan huzursuzluktur. Tedavi edilmezse şok, organ yetmezliği ve ölümle sonuçlanabilir.",
      },
      {
        baslik: "Şok pozisyonu ve bakımı",
        metin:
          "Şok bulguları olan hastaya şu bakım uygulanır:\n1. Hasta sırtüstü düz bir yere yatırılır.\n2. Ayaklar kalp seviyesinden yaklaşık 30 cm yukarı kaldırılır (şok pozisyonu); bu, beyne ve hayati organlara kan akışını artırır.\n3. Sıkan giysiler (kemer, yaka) gevşetilir.\n4. Hasta battaniye ile örtülerek ısı kaybı önlenir.\n5. Bilinç, solunum ve nabız düzenli aralıklarla izlenir.\nBaş, boyun veya bacak yaralanması şüphesi varsa ayaklar kaldırılmaz; hasta olduğu pozisyonda desteklenir.",
        gorsel: "sok-pozisyonu",
      },
      {
        baslik: "Ağızdan bir şey verilmemesi ilkesi",
        metin:
          "Kanaması olan, şok bulgusu gösteren veya bilinci bulanık hastaya asla ağızdan su, yiyecek veya ilaç verilmemelidir; hem aspirasyon (soluk borusuna kaçma) riski hem de olası ameliyat öncesi anestezi komplikasyonu riski vardır.",
      },
    ],
    anahtarNoktalar: [
      "Atardamar kanaması fışkırır ve en hızlı kan kaybına yol açar.",
      "Dış kanamada önce temiz bezle doğrudan ve sürekli bası yapılır.",
      "Turnike yalnızca son çare olarak uygulanır, gevşetilmez, saati not edilir.",
      "İç kanamada solukluk, soğuk terleme ve zayıf nabız görülür.",
      "Şokta ayaklar kalpten ~30 cm yukarı kaldırılır (baş/bacak yaralanması yoksa).",
      "Şoktaki hasta battaniyeyle örtülür, vital bulguları izlenir.",
      "Kanamalı/şoktaki/bilinci bulanık hastaya ağızdan hiçbir şey verilmez.",
    ],
  },
  {
    id: "iy-kirik-yanik",
    dersId: "ilkyardim",
    baslik: "Kırık, Çıkık, Burkulma ve Yanıklar",
    ozet:
      "Kemik-eklem yaralanmalarında doğru tespit yöntemleri ve yanık, donma, sıcak çarpmasında ilk müdahale.",
    ikon: "bandage",
    okumaSuresiDk: 10,
    kapakGorsel: "kirik-turleri",
    bolumler: [
      {
        baslik: "Kırık, çıkık ve burkulma ayrımı",
        metin:
          "Kırık: Kemiğin bütünlüğünün bozulmasıdır; şiddetli ağrı, şekil bozukluğu, şişlik ve bazen kemik ucunun deriden görünmesi (açık kırık) ile kendini gösterir.\nÇıkık: Eklem yüzeylerinin normal konumundan ayrılmasıdır; eklemde şekil bozukluğu ve hareket kısıtlılığı görülür.\nBurkulma: Eklemi saran bağ dokularının aşırı gerilmesi veya kısmen yırtılmasıdır; ağrı, şişlik ve morarma ile seyreder.\nBu üç durumun kesin ayrımı genellikle görüntüleme (röntgen) ile yapılır; ilk yardımcı için önemli olan hepsine benzer şekilde 'olduğu gibi tespit' yaklaşımını uygulamaktır.",
      },
      {
        baslik: "Tespit (atelleme) ilkeleri",
        metin:
          "Şüpheli kırık/çıkık/burkulma bölgesi şu ilkelerle tespit edilir:\n1. Bölge, bulunduğu şekilde ve pozisyonda hareket ettirilmeden tespit edilir; düzeltmeye veya yerine oturtmaya çalışılmaz.\n2. Tespit, yaralanan bölgenin bir alt ve bir üst eklemini de içine alacak şekilde yapılır (örneğin ön kol kırığında bilek ve dirsek birlikte sabitlenir).\n3. Sert ve düz bir cisim (tahta, gazete rulosu, karton) atel olarak kullanılabilir; atel önce yumuşak bir bezle sarılır.\n4. Şişme ihtimaline karşı yüzük, saat, bilezik gibi sıkan eşyalar çıkarılır.\n5. Tespit sonrası parmak ucu renk ve ısısı (dolaşım kontrolü) izlenir.",
      },
      {
        baslik: "Kırıkta ek önlemler",
        metin:
          "Kırık bölgesi mümkünse kalp seviyesinin üzerine kaldırılır ve üzerine bir bez arasına konmuş soğuk uygulama (buz torbası) yapılabilir; bu şişliği ve ağrıyı azaltır. Açık kırıkta (kemik dışarı çıkmışsa) kemiği yerine itmeye çalışılmaz; yara temiz bir bezle örtülüp bölge olduğu gibi desteklenir.",
      },
      {
        baslik: "Omurga yaralanması şüphesi",
        metin:
          "Yüksekten düşme, trafik kazası gibi ciddi travmalarda omurga yaralanması şüphesi varsa hasta kesinlikle gerekmedikçe hareket ettirilmemeli, boyun ve sırt hizası düz tutulmalıdır. Yanlış taşıma omuriliğe zarar vererek kalıcı felce yol açabilir; bu nedenle profesyonel ekip (112) beklenmelidir.",
      },
      {
        baslik: "Yanıklarda ilk müdahale",
        metin:
          "Yanık bölgesi derhal en az 15-20 dakika bol soğuk (buzsuz, musluk sıcaklığında) su altında tutulmalıdır; bu ısı yayılımını durdurur ve doku hasarını sınırlar. Yanık üzerine diş macunu, yoğurt, salça, yağ gibi ev usulü maddeler kesinlikle sürülmemelidir; bunlar enfeksiyon riskini artırır ve tıbbi müdahaleyi geciktirir. Su toplamış kabarcıklar patlatılmamalı, yaraya yapışmış giysiler zorla çıkarılmaya çalışılmamalıdır.",
      },
      {
        baslik: "Yanık derecelendirmesi ve sevk kararı",
        metin:
          "Birinci derece yanık (sadece kızarıklık) genellikle evde soğuk su ile rahatlar. İkinci derece yanık (kabarcıklı) ve üçüncü derece yanık (deri katmanlarının tahrip olduğu, beyaz/kömürleşmiş görünüm) mutlaka sağlık kuruluşuna götürülmelidir. Geniş yüzeyli, yüz-el-genital bölge yanıkları ve solunum yolu yanığı şüphesi (kapalı alan yangını) her zaman acil sevk gerektirir.",
      },
      {
        baslik: "Donma ve sıcak çarpması",
        metin:
          "Donmada (soğuğa aşırı maruziyet) kişi derhal ılık bir ortama alınmalı, ıslak giysiler çıkarılmalı, vücut yavaşça ısıtılmalıdır; donan bölge asla ovulmamalı veya doğrudan ateşe/sıcak suya tutulmamalıdır çünkü doku hasarı artar.\nSıcak çarpmasında (aşırı sıcağa maruziyet) kişi serin ve gölge bir yere alınmalı, bol sıvı verilmeli (bilinç açıksa), ıslak bezle vücut serinletilmeli ve gerekirse 112 aranmalıdır.",
      },
    ],
    anahtarNoktalar: [
      "Kırıkta bölge olduğu gibi, hareket ettirilmeden tespit edilir (atel).",
      "Tespit, yaralanan bölgenin bir alt ve bir üst eklemini kapsar.",
      "Açık kırıkta kemik yerine itilmeye çalışılmaz, yara örtülür.",
      "Omurga şüphesinde hasta hareket ettirilmez, profesyonel ekip beklenir.",
      "Yanığa en az 15-20 dakika bol soğuk su uygulanır.",
      "Yanığa macun/yoğurt/yağ sürülmez, kabarcıklar patlatılmaz.",
      "Donmada bölge ovulmaz; sıcak çarpmasında bol sıvı ve serinletme yapılır.",
    ],
  },
  {
    id: "iy-bilinc-tasima",
    dersId: "ilkyardim",
    baslik: "Bilinç Bozuklukları ve Yaralı Taşıma",
    ozet:
      "Koma pozisyonu, bayılma müdahalesi, nöbet sırasında güvenlik ve güvenli yaralı taşıma teknikleri.",
    ikon: "body",
    okumaSuresiDk: 10,
    kapakGorsel: "koma-pozisyonu",
    bolumler: [
      {
        baslik: "Bilinç düzeyi değerlendirmesi",
        metin:
          "Bilinç düzeyi basitçe şu sırayla değerlendirilir: kişi kendiliğinden uyanık mı (A-alert), sesli uyarıya tepki veriyor mu (V-verbal), ağrılı uyarana tepki veriyor mu (P-pain), hiç tepki yok mu (U-unresponsive). Bu AVPU sistemi, hastanın bilinç kaybının derecesini hızlıca sınıflandırmaya yarar ve zaman içindeki değişimi takip etmek için tekrar tekrar uygulanabilir.",
      },
      {
        baslik: "Koma (yarı yüzükoyun/yan yatış) pozisyonu",
        metin:
          "Bilinci kapalı ancak kendiliğinden solunumu ve nabzı olan bir hastaya koma pozisyonu (yan yatış pozisyonu) verilir. Bu pozisyonun amacı, dilin geriye kaçarak hava yolunu tıkamasını ve olası kusmuk/salgının akciğerlere kaçarak boğulmaya (aspirasyon) yol açmasını önlemektir. Uygulama: hasta yan çevrilir, alttaki kol öne uzatılır, üstteki el yanağın altına yerleştirilerek baş desteklenir, üstteki bacak dizden bükülerek öne yerleştirilir; baş hafifçe arkaya ve aşağıya bakacak şekilde konumlandırılır.",
        gorsel: "koma-pozisyonu",
      },
      {
        baslik: "Koma pozisyonunun uygulanamayacağı durumlar",
        metin:
          "Omurga (boyun/sırt) yaralanması şüphesi olan bilinci kapalı hastada koma pozisyonu, kesin gereklilik olmadıkça verilmez; çünkü çevirme sırasında omurga hasarı ağırlaşabilir. Bu durumda hava yolu açıklığı, baş sabit tutularak ve mümkünse çene kaldırma tekniğiyle korunur, sağlık ekibi beklenir.",
      },
      {
        baslik: "Bayılma (senkop) müdahalesi",
        metin:
          "Bayılma, beyne giden kan akışının kısa süreli azalmasıyla oluşan geçici bilinç kaybıdır. Bayılan kişi sırtüstü yatırılır, ayakları hafifçe yukarı kaldırılır, boyun ve bel bölgesini sıkan giysiler gevşetilir, temiz hava sağlanır (kalabalık dağıtılır, pencere açılır). Kişi genellikle kısa sürede (birkaç dakika içinde) kendine gelir; gelmezse veya tekrarlarsa 112 aranmalıdır.",
      },
      {
        baslik: "Nöbet (konvülziyon) sırasında güvenlik",
        metin:
          "Epileptik nöbet geçiren bir kişiye asla fiziksel olarak müdahale edilmemeli, ağzına bir şey (kaşık, bez) sokulmaya çalışılmamalıdır; bu dişlerin kırılmasına veya boğulmaya yol açabilir. Yapılması gereken: kişinin çevresindeki sert/kesici eşyaları uzaklaştırmak, başının altına yumuşak bir şey koymak ve nöbet süresini not etmektir. Nöbet bittiğinde hasta bilinci açılana kadar koma pozisyonunda izlenmelidir.",
      },
      {
        baslik: "Yaralı taşıma ilkeleri",
        metin:
          "Yaralı, hayati tehlike (yangın, patlama riski, yola devrilme) yoksa kesinlikle yerinden oynatılmaz; sağlık ekibinin gelmesi beklenir. Taşıma zorunluysa omurga düz hatta tutularak, birden fazla kişiyle birlikte ve senkronize hareketle yapılır; asla tek bir uzuv veya bölgeden çekiştirilerek taşınmaz.",
      },
      {
        baslik: "Acil çıkarma teknikleri",
        metin:
          "Araç içinde yangın gibi acil ve hayati tehlike varsa tek kişilik acil çıkarmada 'Rentek (Rautek) manevrası' kullanılır: kurtarıcı hastanın arkasından koltuk altlarından geçirdiği kollarla hastanın önkolunu kavrar ve hastayı sırtına yaslayarak dışarı çeker. Birden fazla kurtarıcı varsa sedye veya sert taşıma tahtası kullanılması, omurgayı düz tutarak taşımak açısından çok daha güvenlidir.",
      },
    ],
    anahtarNoktalar: [
      "AVPU: uyanık, sesli uyarana, ağrıya tepki veya hiç tepkisiz bilinç düzeyini sınıflar.",
      "Bilinci kapalı, solunumu olan hastaya koma (yan yatış) pozisyonu verilir.",
      "Koma pozisyonu dilin kaçmasını ve boğulmayı önler.",
      "Omurga şüphesinde koma pozisyonu zorunlu olmadıkça verilmez.",
      "Bayılan kişi sırtüstü yatırılır, ayakları yukarı kaldırılır.",
      "Nöbet sırasında ağza hiçbir şey sokulmaz, çevre güvenliği sağlanır.",
      "Zorunlu acil çıkarmada Rentek manevrası, çoklu kurtarıcıda sedye kullanılır.",
    ],
  },
];
