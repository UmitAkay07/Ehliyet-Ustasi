import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader, Card, Button } from "@/components/ui";
import { useTheme } from "@/theme";
import * as Speech from "expo-speech";
import { ManevraAnimasyonu } from "@/animations/ManevraAnimasyonu";
import { usePuanIstegiTetikle } from "@/store/usePuanIstegi";
import { useSimSesi } from "@/store/useSimSesi";
import { simSes } from "@/services/simSes";
import { seslendir, seslendirmeHazirla } from "@/services/seslendirme";
import { useEkranUyanik } from "@/services/ekranUyanik";
import { enGecOkumaBitisMs, tahminiOkumaMs } from "@/utils/okumaSuresi";
import type { ManevraTipi } from "@/types";

/** Anons tonunun (ding-dong) ikinci notası duyulduktan sonra komut okunmaya başlar */
const ANONS_SURESI_MS = 900;
/** Anlatım bitip manevra en az bir kez tamamlanınca sonraki manevraya geçmeden önceki ara */
const GECIS_ARASI_MS = 1500;
/** Seslendirme hata verdikten sonra sonraki komuta geçmeden önce en az bu kadar beklenir */
const HATA_SONRASI_EN_AZ_MS = 1500;
const EN_KISA_TUR_MS = 2000;
const OKUMA_HIZI = 0.9;

interface SinavAdimi {
  tip: ManevraTipi;
  baslik: string;
  metin: string;
}

const SINAV_ADIMLARI: SinavAdimi[] = [
  { 
    tip: "temelKumanda", 
    baslik: "1. Araç Çalıştırma ve Kalkış", 
    metin: "Sınavımız başlıyor. Lütfen aynalarınızı ayarlayın, emniyet kemerinizi takın. Sol sinyalinizi vererek yola çıkın." 
  },
  { 
    tip: "lPark", 
    baslik: "2. L Park", 
    metin: "Sıradaki istasyonumuz L park alanı. Sağ sinyalinizi vererek yanaşın. Çizgilere ve dubalara çarpmadan geri geri dik şekilde parkı tamamlayın. Parktan çıkarken sağ sinyalinizi vererek çıkış yapın." 
  },
  { 
    tip: "paralelPark", 
    baslik: "3. Paralel Park", 
    metin: "Şimdi paralel park alanına geçiyoruz. Sağ sinyalinizi unutmayın. Dubalar arasına paralel olarak park edin. Parktan çıkarken ise sol sinyalinizi vererek çıkış yapın." 
  },
  { 
    tip: "uDonusu", 
    baslik: "4. U Dönüşü", 
    metin: "Sıradaki alanımız U dönüşü istasyonu. Sola sinyalinizi vererek dubalarla çevrili alana girin ve güvenli bir şekilde U dönüşünüzü gerçekleştirin." 
  },
  { 
    tip: "aniFren", 
    baslik: "5. Ani Fren", 
    metin: "Hızlanarak sağ sinyalle ani fren alanına girin ve komutla beraber aracı savurmadan durdurun. Kalkış yapıp devam etmek için sol sinyalinizi verin." 
  },
  { 
    tip: "geriManevra", 
    baslik: "6. 25 Metre Geri Gelme", 
    metin: "Şimdi şeridinizi bozmadan sağ sinyal ile yanaşın ve sağ sinyaliniz açıkken 25 metre düz bir hatta geri geri gelin. Manevra bittikten sonra sol sinyalinizi vererek kalkışınızı yapın." 
  },
  { 
    tip: "rampaKalkis", 
    baslik: "7. Yokuş Kalkış", 
    metin: "Son olarak yokuş kalkış alanındayız. Sağ sinyalinizle yokuşa yanaşıp durun. Kalkarken ise sol sinyalinizi verip, aracı yarım debriyajla en fazla 50 santim geri kaçırarak kalkış yapın ve sınavı tamamlayın." 
  },
];

export default function PratikSinavSimulasyonuScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const [oynuyor, setOynuyor] = useState(false);
  const [duraklatildi, setDuraklatildi] = useState(false);
  const [adimIndex, setAdimIndex] = useState(0);
  /** Her adım başlarken artar; manevra animasyonu baştan başlar */
  const [turAnahtari, setTurAnahtari] = useState(0);
  const [bitti, setBitti] = useState(false);
  const durdurulduRef = useRef(false);
  const zamanlayicilar = useRef<ReturnType<typeof setTimeout>[]>([]);
  /** Aktif adımda anlatım bitti mi, manevra en az bir kez tamamlandı mı */
  const adimDurumu = useRef({ index: -1, baslangic: 0, anlatimBitti: false, turBitti: false, gecildi: false });
  const { sesAcik, sesDegistir } = useSimSesi();
  const sesAcikRef = useRef(sesAcik);
  sesAcikRef.current = sesAcik;
  usePuanIstegiTetikle(bitti);
  // Sınav sürerken ekran kararmasın (duraklatınca ya da bitince telefon yine kendi süresinde uyur)
  useEkranUyanik(oynuyor, "sinav-simulasyonu");

  const aktifAdim = SINAV_ADIMLARI[adimIndex];

  const zamanla = (is: () => void, ms: number) => {
    zamanlayicilar.current.push(setTimeout(is, ms));
  };
  const zamanlayicilariTemizle = () => {
    zamanlayicilar.current.forEach(clearTimeout);
    zamanlayicilar.current = [];
  };

  /** Anlatım bitti ve manevra en az bir tur döndüyse sonraki manevraya geçilir */
  const gecisiDene = () => {
    const d = adimDurumu.current;
    if (durdurulduRef.current || d.gecildi || !d.anlatimBitti || !d.turBitti) return;
    d.gecildi = true;
    const sonraki = d.index + 1;
    zamanla(() => adimiOynat(sonraki), GECIS_ARASI_MS);
  };

  const adimiOynat = (index: number) => {
    if (durdurulduRef.current) return;
    if (index >= SINAV_ADIMLARI.length) {
      setOynuyor(false);
      setBitti(true);
      simSes.sustur();
      simSes.efekt("basari");
      return;
    }

    adimDurumu.current = { index, baslangic: Date.now(), anlatimBitti: false, turBitti: false, gecildi: false };
    setAdimIndex(index);
    setTurAnahtari((k) => k + 1);
    const adim = SINAV_ADIMLARI[index];

    // Sınav anonsu: ding-dong, ardından komut. Manevra anlatım boyunca başa dönerek tekrarlanır.
    if (sesAcikRef.current) simSes.efekt("duyuru");
    zamanla(() => komutuOku(adim, index), sesAcikRef.current ? ANONS_SURESI_MS : 0);
  };

  const anlatimBitti = (index: number) => {
    if (durdurulduRef.current || adimDurumu.current.index !== index) return;
    adimDurumu.current.anlatimBitti = true;
    gecisiDene();
  };

  const komutuOku = (adim: SinavAdimi, index: number) => {
    if (durdurulduRef.current) return;
    // Önceki komut hâlâ okunuyorsa (motor yavaşsa) kesilir; komutlar üst üste binmez
    Speech.stop();
    // Motor hiç cevap vermezse (ses verisi eksik, motor takıldı) sınav bu adımda sonsuza dek beklemesin
    zamanla(() => anlatimBitti(index), enGecOkumaBitisMs(adim.metin, OKUMA_HIZI));
    const okumaBitisi = Date.now() + tahminiOkumaMs(adim.metin, OKUMA_HIZI);
    seslendir(adim.metin, {
      rate: OKUMA_HIZI,
      pitch: 1.0,
      onDone: () => anlatimBitti(index),
      onError: (e) => {
        console.warn("[simulasyon] seslendirme hatası:", String(e));
        // Motor yarıda hata verse de ses çoğu zaman çalmaya devam ediyor (zayıf ağda internet sesi);
        // sonraki komut onu kesmesin diye metnin normal okunma süresi beklenir. Hiç ses yoksa
        // kullanıcı bu sürede ekrandaki metni okur.
        zamanla(() => anlatimBitti(index), Math.max(HATA_SONRASI_EN_AZ_MS, okumaBitisi - Date.now()));
      },
    });
  };

  const turBitti = () => {
    const d = adimDurumu.current;
    // Önceki manevranın geç gelen tur sonu bildirimi sayılmaz (en kısa manevra 4 saniye)
    if (!oynuyor || Date.now() - d.baslangic < EN_KISA_TUR_MS) return;
    d.turBitti = true;
    gecisiDene();
  };

  const baslat = () => {
    durdurulduRef.current = false;
    zamanlayicilariTemizle();
    setOynuyor(true);
    setDuraklatildi(false);
    if (bitti) {
      setBitti(false);
      adimiOynat(0);
    } else {
      // Baştan ya da kaldığı manevranın başından. Manevra bitmiş ve sonrakine geçilirken duraklatıldıysa
      // aynı manevra tekrar oynatılmaz, sonrakiyle devam edilir.
      const d = adimDurumu.current;
      adimiOynat(d.index === adimIndex && d.gecildi ? adimIndex + 1 : adimIndex);
    }
  };

  const durdur = () => {
    durdurulduRef.current = true;
    zamanlayicilariTemizle();
    setOynuyor(false);
    setDuraklatildi(true);
    Speech.stop();
    simSes.sustur();
  };

  const bastanSifirla = () => {
    durdur();
    setDuraklatildi(false);
    setAdimIndex(0);
    setTurAnahtari((k) => k + 1);
    setBitti(false);
  };

  // Geri tuşuyla çıkılırken anlatım ve sesler geçiş animasyonunu beklemeden kesilir
  useFocusEffect(
    useCallback(
      () => () => {
        durdurulduRef.current = true;
        zamanlayicilar.current.forEach(clearTimeout);
        zamanlayicilar.current = [];
        Speech.stop();
        simSes.sustur();
      },
      []
    )
  );

  useEffect(() => {
    // Seslendirme motoru ilk komutta uyanınca anlatım saniyelerce gecikiyordu; ekran açılırken hazırlanır
    seslendirmeHazirla();
    return () => {
      durdurulduRef.current = true;
      zamanlayicilariTemizle();
      Speech.stop();
    };
  }, []);

  return (
    <Screen scroll>
      <ScreenHeader title="Sınav Simülasyonu" subtitle="Pratik Yap" />
      
      <View style={{ marginBottom: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
          Pratik Sınav Simülasyonu
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.xs }}>
          Tüm sınav parkuru boyunca 2D kuş bakışı animasyonlar ve sesli komutlarla pratik yapın.
        </Text>
      </View>

      <Card style={{ marginBottom: spacing.md, paddingBottom: spacing.lg }}>
        
        <View style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: colors.primary, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
              Manevra {adimIndex + 1} / {SINAV_ADIMLARI.length}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              {bitti && (
                <Text style={{ color: colors.success, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
                  Sınav Tamamlandı
                </Text>
              )}
              <Pressable
                onPress={sesDegistir}
                accessibilityRole="button"
                accessibilityLabel={sesAcik ? "Ses efektlerini kapat" : "Ses efektlerini aç"}
                hitSlop={8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: radius.pill,
                  backgroundColor: sesAcik ? colors.primarySoft : colors.surfaceAlt,
                }}
              >
                <Ionicons name={sesAcik ? "volume-high" : "volume-mute"} size={14} color={sesAcik ? colors.primary : colors.textMuted} />
                <Text style={{ color: sesAcik ? colors.primary : colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.bold }}>
                  {sesAcik ? "Efektler açık" : "Efektler kapalı"}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            {SINAV_ADIMLARI.map((adim, i) => (
              <View
                key={adim.baslik}
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: bitti || i < adimIndex ? colors.primary : i === adimIndex ? colors.primarySoft : colors.surfaceAlt,
                  borderWidth: i === adimIndex && !bitti ? 1 : 0,
                  borderColor: colors.primary,
                }}
              />
            ))}
          </View>
        </View>

        <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, textAlign: "center", marginBottom: spacing.md }}>
          {aktifAdim.baslik}
        </Text>

        <View style={{ borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: colors.border }}>
          {/* Başlamadan önce ve sınav bitince sessiz önizleme olarak döner; duraklatınca durur */}
          <ManevraAnimasyonu
            tip={aktifAdim.tip}
            oynuyor={!duraklatildi}
            sesli={oynuyor && sesAcik}
            yenidenBaslat={turAnahtari}
            onTurBitti={turBitti}
          />
        </View>

        {/* En uzun komut kadar yer ayrılır; adım değişince Duraklat düğmesi yerinden oynamaz */}
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 22, minHeight: 22 * 4, marginTop: spacing.md, textAlign: "center", fontStyle: "italic" }}>
          "{aktifAdim.metin}"
        </Text>
      </Card>

      <View style={{ gap: spacing.md, marginBottom: spacing.xxl }}>
        {oynuyor ? (
          <Button 
            label="Simülasyonu Duraklat" 
            onPress={durdur} 
            icon="pause"
            variant="secondary"
          />
        ) : (
          <Button 
            label={bitti ? "Yeniden Başlat" : (adimIndex > 0 ? "Kaldığı Yerden Devam Et" : "Simülasyonu Başlat")} 
            onPress={baslat} 
            icon="play"
            variant="primary"
          />
        )}
        
        {(!oynuyor && adimIndex > 0) && (
          <Pressable onPress={bastanSifirla} style={{ alignItems: "center", padding: spacing.sm }}>
            <Text style={{ color: colors.danger, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>
              Başa Dön
            </Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}
