import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen, ScreenHeader, Button, Card, ProgressBar } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { provaSorulariUret } from "@/data/sorular";
import { provaDetayKaydet } from "@/utils/provaSonuc";

const SINAV_SANIYE = 45 * 60;

function sureBicimle(saniye: number): string {
  const dk = Math.floor(saniye / 60);
  const sn = saniye % 60;
  return `${dk.toString().padStart(2, "0")}:${sn.toString().padStart(2, "0")}`;
}

export default function ProvaScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const soruCevapla = useAppStore((s) => s.soruCevapla);
  const provaKaydet = useAppStore((s) => s.provaKaydet);

  const [basladi, setBasladi] = useState(false);
  const sorular = useMemo(() => provaSorulariUret(), []);
  const [cevaplar, setCevaplar] = useState<(number | null)[]>(() =>
    new Array(sorular.length).fill(null)
  );
  const [index, setIndex] = useState(0);
  const [kalan, setKalan] = useState(SINAV_SANIYE);
  const bitirildi = useRef(false);
  const cevaplarRef = useRef<(number | null)[]>(cevaplar);
  cevaplarRef.current = cevaplar;
  const kalanRef = useRef(kalan);
  kalanRef.current = kalan;

  useEffect(() => {
    if (!basladi) return;
    const timer = setInterval(() => {
      setKalan((k) => {
        if (k <= 1) {
          clearInterval(timer);
          bitir(true);
          return 0;
        }
        return k - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [basladi]);

  const cevaplananSayisi = cevaplar.filter((c) => c !== null).length;

  const secim = (i: number) => {
    setCevaplar((prev) => {
      const kopya = [...prev];
      kopya[index] = i;
      return kopya;
    });
  };

  const bitir = (otomatik = false) => {
    if (bitirildi.current) return;
    bitirildi.current = true;

    const anlikCevaplar = cevaplarRef.current;
    let dogru = 0;
    let yanlis = 0;
    let bos = 0;
    sorular.forEach((soru, i) => {
      const cevap = anlikCevaplar[i];
      if (cevap === null || cevap === undefined) {
        bos += 1;
      } else {
        const d = soruCevapla(soru, cevap);
        if (d) dogru += 1;
        else yanlis += 1;
      }
    });

    const puan = dogru * 2;
    const gecti = puan >= 70;
    const sureSaniye = SINAV_SANIYE - kalanRef.current;

    provaKaydet({ dogru, yanlis, bos, puan, gecti, sureSaniye });
    provaDetayKaydet({ sorular, cevaplar: anlikCevaplar, dogru, yanlis, bos, puan, gecti, sureSaniye });
    router.replace("/prova-sonuc");
  };

  const bitirOnayi = () => {
    Alert.alert(
      "Provayı Bitir",
      `${cevaplananSayisi}/${sorular.length} soru cevapladın. Bitirmek istediğine emin misin?`,
      [
        { text: "Devam Et", style: "cancel" },
        { text: "Bitir", style: "destructive", onPress: () => bitir(false) },
      ]
    );
  };

  if (!basladi) {
    return (
      <Screen>
        <ScreenHeader title="Sınav Provası" />
        <Card elevated style={{ gap: spacing.md }}>
          <View style={{ alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ribbon" size={38} color={colors.primary} />
            </View>
            <Text style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>
              Gerçek Sınav Provası
            </Text>
          </View>
          {[
            { ikon: "help-circle", metin: "50 soru (Trafik 23, İlk Yardım 12, Motor 9, Adab 6)" },
            { ikon: "time", metin: "45 dakika süre" },
            { ikon: "trophy", metin: "Geçme barajı: 70 puan (en az 35 doğru)" },
            { ikon: "information-circle", metin: "Yanlış cevaplar doğruyu götürmez" },
          ].map((m, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <Ionicons name={m.ikon as any} size={20} color={colors.primary} />
              <Text style={{ color: colors.text, fontSize: fontSize.md, flex: 1 }}>{m.metin}</Text>
            </View>
          ))}
        </Card>
        <Button label="Provaya Başla" icon="play" onPress={() => setBasladi(true)} />
        <Button label="Vazgeç" variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }

  const soru = sorular[index];
  const azaldi = kalan <= 5 * 60;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Üst bar: süre + ilerleme */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
            {cevaplananSayisi}/{sorular.length} cevaplandı
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: azaldi ? colors.dangerSoft : colors.surfaceAlt,
              paddingHorizontal: spacing.md,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Ionicons name="time" size={16} color={azaldi ? colors.danger : colors.text} />
            <Text
              style={{
                color: azaldi ? colors.danger : colors.text,
                fontFamily: fontFamily.bold,
                fontVariant: ["tabular-nums"],
              }}
            >
              {sureBicimle(kalan)}
            </Text>
          </View>
        </View>
        <ProgressBar progress={(index + 1) / sorular.length} height={5} />
      </View>

      {/* Soru numaraları */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 48 }}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 6, alignItems: "center" }}
      >
        {sorular.map((_, i) => {
          const aktif = i === index;
          const cevaplandi = cevaplar[i] !== null;
          return (
            <Pressable
              key={i}
              onPress={() => setIndex(i)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: aktif ? colors.primary : cevaplandi ? colors.successSoft : colors.surface,
                borderWidth: 1,
                borderColor: aktif ? colors.primary : cevaplandi ? colors.success : colors.border,
              }}
            >
              <Text
                style={{
                  color: aktif ? colors.onPrimary : cevaplandi ? colors.success : colors.textMuted,
                  fontSize: fontSize.xs,
                  fontFamily: fontFamily.bold,
                }}
              >
                {i + 1}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <SoruBileseni
          soru={soru}
          secilenIndex={cevaplar[index]}
          cevaplandi={cevaplar[index] !== null}
          geriBildirimGoster={false}
          onSecim={secim}
          siraNo={index + 1}
          toplam={sorular.length}
        />
      </ScrollView>

      {/* Alt navigasyon */}
      <View
        style={{
          flexDirection: "row",
          gap: spacing.md,
          padding: spacing.lg,
          paddingTop: spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Button
          label="Önceki"
          icon="arrow-back"
          variant="secondary"
          fullWidth={false}
          disabled={index === 0}
          onPress={() => setIndex((v) => Math.max(0, v - 1))}
          style={{ flex: 1 }}
        />
        {index + 1 >= sorular.length ? (
          <Button label="Bitir" icon="flag" onPress={bitirOnayi} style={{ flex: 1 }} />
        ) : (
          <Button
            label="Sonraki"
            iconRight="arrow-forward"
            onPress={() => setIndex((v) => Math.min(sorular.length - 1, v + 1))}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
