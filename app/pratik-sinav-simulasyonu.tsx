import React, { useEffect, useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, Card, Button, ProgressBar } from "@/components/ui";
import { useTheme } from "@/theme";
import * as Speech from "expo-speech";
import { ManevraAnimasyonu } from "@/animations/ManevraAnimasyonu";
import type { ManevraTipi } from "@/types";

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
    metin: "Sıradaki istasyonumuz L park alanı. Çizgilere ve dubalara çarpmadan geri geri dik şekilde parkı tamamlayın." 
  },
  { 
    tip: "paralelPark", 
    baslik: "3. Paralel Park", 
    metin: "Şimdi paralel park alanına geçiyoruz. Sağ sinyalinizi unutmayın. Dubalar arasına paralel olarak park edin." 
  },
  { 
    tip: "uDonusu", 
    baslik: "4. U Dönüşü", 
    metin: "Sıradaki alanımız U dönüşü istasyonu. Sola sinyalinizi vererek dubalarla çevrili alana girin ve güvenli bir şekilde U dönüşünüzü gerçekleştirin." 
  },
  { 
    tip: "aniFren", 
    baslik: "5. Ani Fren", 
    metin: "Hızlanın ve komutla beraber ani fren yaparak aracı savurmadan durdurun. Durduğunuzda sağ sinyalinizin açık olduğundan emin olun." 
  },
  { 
    tip: "geriManevra", 
    baslik: "6. 25 Metre Geri Gelme", 
    metin: "Şimdi şeridinizi bozmadan ve direksiyonu fazla kırmadan 25 metre düz bir hatta geri geri gelin." 
  },
  { 
    tip: "rampaKalkis", 
    baslik: "7. Yokuş Kalkış", 
    metin: "Son olarak yokuş kalkış alanındayız. Aracı yarım debriyajla ayarlayıp, en fazla 50 santim geri kaçırarak kalkış yapın ve sınavı tamamlayın. Tebrikler." 
  },
];

export default function PratikSinavSimulasyonuScreen() {
  const { colors, fontSize, fontWeight, spacing, radius } = useTheme();
  const [oynuyor, setOynuyor] = useState(false);
  const [adimIndex, setAdimIndex] = useState(0);
  const [bitti, setBitti] = useState(false);
  const durdurulduRef = useRef(false);

  const aktifAdim = SINAV_ADIMLARI[adimIndex];
  const ilerlemeOrani = (adimIndex + 1) / SINAV_ADIMLARI.length;

  const adimiOynat = async (index: number) => {
    if (durdurulduRef.current || index >= SINAV_ADIMLARI.length) {
      if (index >= SINAV_ADIMLARI.length) {
        setOynuyor(false);
        setBitti(true);
      }
      return;
    }

    setAdimIndex(index);
    const adim = SINAV_ADIMLARI[index];

    Speech.speak(adim.metin, {
      language: "tr-TR",
      rate: 0.9,
      pitch: 1.0,
      onDone: () => {
        if (!durdurulduRef.current) {
          // Seslendirme bitince 1.5 saniye bekle ve diğer manevraya geç
          setTimeout(() => adimiOynat(index + 1), 1500);
        }
      },
      onStopped: () => {
        setOynuyor(false);
      },
      onError: () => {
        // Hata olursa yine de devam etsin
        setTimeout(() => adimiOynat(index + 1), 2000);
      }
    });
  };

  const baslat = () => {
    durdurulduRef.current = false;
    setOynuyor(true);
    setBitti(false);
    
    // Baştan başlıyorsa
    if (adimIndex === 0 || bitti) {
      setAdimIndex(0);
      adimiOynat(0);
    } else {
      // Kaldığı yerden devam
      adimiOynat(adimIndex);
    }
  };

  const durdur = () => {
    durdurulduRef.current = true;
    setOynuyor(false);
    Speech.stop();
  };

  const bastanSifirla = () => {
    durdur();
    setAdimIndex(0);
    setBitti(false);
  };

  useEffect(() => {
    return () => {
      durdurulduRef.current = true;
      Speech.stop();
    };
  }, []);

  return (
    <Screen scroll>
      <Stack.Screen options={{ title: "Sınav Simülasyonu" }} />
      
      <View style={{ marginBottom: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: fontWeight.extrabold }}>
          Pratik Sınav Simülasyonu
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.xs }}>
          Tüm sınav parkuru boyunca 2D kuş bakışı animasyonlar ve sesli komutlarla pratik yapın.
        </Text>
      </View>

      <Card elevated style={{ backgroundColor: colors.surfaceAlt, marginBottom: spacing.md, paddingBottom: spacing.lg }}>
        
        <View style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ color: colors.primary, fontSize: fontSize.xs, fontWeight: fontWeight.bold }}>
              Manevra {adimIndex + 1} / {SINAV_ADIMLARI.length}
            </Text>
            {bitti && (
               <Text style={{ color: colors.success, fontSize: fontSize.xs, fontWeight: fontWeight.bold }}>
                 Sınav Tamamlandı
               </Text>
            )}
          </View>
          <ProgressBar progress={bitti ? 1 : ilerlemeOrani} color={colors.primary} height={6} />
        </View>

        <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.extrabold, textAlign: "center", marginBottom: spacing.md }}>
          {aktifAdim.baslik}
        </Text>

        <View style={{ 
          backgroundColor: colors.surface, 
          borderRadius: radius.lg, 
          overflow: "hidden", 
          borderWidth: 1, 
          borderColor: colors.border,
          height: 230,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <ManevraAnimasyonu tip={aktifAdim.tip} />
        </View>

        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 22, marginTop: spacing.md, textAlign: "center", fontStyle: "italic" }}>
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
            <Text style={{ color: colors.danger, fontSize: fontSize.sm, fontWeight: fontWeight.bold }}>
              Başa Dön
            </Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}
