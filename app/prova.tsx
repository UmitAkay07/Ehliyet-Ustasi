import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, ScreenHeader, Button, ProgressBar, ConfirmDialog } from "@/components/ui";
import type { DialogButton } from "@/components/ui";
import { SoruBileseni } from "@/components/SoruBileseni";
import { ProvaOzeti } from "@/components/ProvaOzeti";
import { useTheme, ICERIK_MAX_GENISLIK } from "@/theme";
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
  const insets = useSafeAreaInsets();
  const soruCevapla = useAppStore((s) => s.soruCevapla);
  const provaKaydet = useAppStore((s) => s.provaKaydet);

  const [basladi, setBasladi] = useState(false);
  const [dialog, setDialog] = useState<{ title: string; message?: string; buttons: DialogButton[] } | null>(null);
  const sorular = useMemo(() => provaSorulariUret(), []);
  const [cevaplar, setCevaplar] = useState<(number | null)[]>(() =>
    new Array(sorular.length).fill(null)
  );
  const [index, setIndex] = useState(0);
  // Gerçek e-sınavdaki gibi: soruyu işaretleyip sonra dönebilirsin; bitirmeden önce özet gösterilir
  const [isaretli, setIsaretli] = useState<boolean[]>(() => new Array(sorular.length).fill(false));
  const [ozetAcik, setOzetAcik] = useState(false);
  const [kalan, setKalan] = useState(SINAV_SANIYE);
  const bitirildi = useRef(false);
  const cevaplarRef = useRef<(number | null)[]>(cevaplar);
  cevaplarRef.current = cevaplar;
  const kalanRef = useRef(kalan);
  kalanRef.current = kalan;
  /**
   * Sınavın bitiş anı (gerçek saat). Süre her tikte buradan hesaplanır: JS sayacı uygulama arka
   * plandayken durduğu için eskiden arka plana alınan sınavda süre işlemiyor, aday fazladan süre alıyordu.
   */
  const bitisZamani = useRef<number | null>(null);

  useEffect(() => {
    if (!basladi) return;
    if (bitisZamani.current === null) bitisZamani.current = Date.now() + SINAV_SANIYE * 1000;
    const bitis = bitisZamani.current;
    const timer = setInterval(() => {
      const kalanSn = Math.max(0, Math.ceil((bitis - Date.now()) / 1000));
      setKalan(kalanSn);
      if (kalanSn <= 0) {
        clearInterval(timer);
        // bitir'i setState sırasında değil, hemen ardından çağır
        queueMicrotask(() => bitir(true));
      }
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
    const gecenSn =
      bitisZamani.current === null
        ? SINAV_SANIYE - kalanRef.current
        : SINAV_SANIYE - Math.max(0, (bitisZamani.current - Date.now()) / 1000);
    // Süre dolarak bitince tam süre yazılır (eskiden 2699 sn / "44:59" kaydoluyordu)
    const sureSaniye = otomatik ? SINAV_SANIYE : Math.min(SINAV_SANIYE, Math.round(gecenSn));

    provaKaydet({ dogru, yanlis, bos, puan, gecti, sureSaniye });
    provaDetayKaydet({ sorular, cevaplar: anlikCevaplar, dogru, yanlis, bos, puan, gecti, sureSaniye });
    router.replace("/prova-sonuc");
  };

  // Bitirmeden önce özet penceresi açılır (boş / işaretli sorulara dönülebilir)
  const bitirOnayi = () => setOzetAcik(true);

  const isaretiDegistir = () =>
    setIsaretli((onceki) => {
      const kopya = [...onceki];
      kopya[index] = !kopya[index];
      return kopya;
    });

  if (!basladi) {
    return (
      <Screen contentStyle={{ gap: spacing.xxl }}>
        <ScreenHeader title="Sınav Provası" />
        <Text style={{ color: colors.text, fontSize: 26, fontFamily: fontFamily.extrabold, letterSpacing: -0.5 }}>
          Gerçek Sınav Provası
        </Text>
        <View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
          {[
            { ikon: "help-circle", metin: "50 soru (Trafik 23, İlk Yardım 12, Motor 9, Adab 6)", renk: colors.primary },
            { ikon: "time", metin: "45 dakika süre", renk: colors.warning },
            { ikon: "trophy", metin: "Geçme barajı: 70 puan (en az 35 doğru)", renk: colors.success },
            { ikon: "alert-circle", metin: "Yanlış cevaplar doğruyu götürmez", renk: colors.danger },
          ].map((m, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Ionicons name={m.ikon as any} size={19} color={m.renk} />
              <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, flex: 1 }}>{m.metin}</Text>
            </View>
          ))}
        </View>
        <View style={{ gap: spacing.sm }}>
          <Button label="Provaya Başla" onPress={() => setBasladi(true)} />
          <Button label="Vazgeç" variant="ghost" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const soru = sorular[index];
  const azaldi = kalan <= 5 * 60;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, width: "100%", maxWidth: ICERIK_MAX_GENISLIK, alignSelf: "center", backgroundColor: colors.background }}>
      {/* Üst bar: süre + ilerleme */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Pressable
              onPress={() => {
                setDialog({
                  title: "Sınavdan Çık",
                  message: "Sınavı yarıda bırakmak istediğinize emin misiniz? İlerlemeniz kaydedilmeyecek.",
                  buttons: [
                    { text: "İptal", style: "cancel" },
                    { text: "Çık", style: "destructive", onPress: () => router.back() },
                  ],
                });
              }}
              hitSlop={8}
              style={{ width: 24, height: 24, alignItems: "center", justifyContent: "center" }}
            >
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
              {cevaplananSayisi}/{sorular.length} cevaplandı
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Pressable
              onPress={isaretiDegistir}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={isaretli[index] ? "Soru işaretini kaldır" : "Soruyu işaretle"}
              style={{ marginRight: 4 }}
            >
              <Ionicons
                name={isaretli[index] ? "bookmark" : "bookmark-outline"}
                size={20}
                color={isaretli[index] ? colors.warning : colors.textMuted}
              />
            </Pressable>
            <Pressable
              onPress={() => setOzetAcik(true)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Sınav özetini aç"
              style={{ marginRight: 6 }}
            >
              <Ionicons name="grid-outline" size={20} color={colors.textMuted} />
            </Pressable>
            <Ionicons name="time-outline" size={16} color={azaldi ? colors.danger : colors.textMuted} />
            <Text
              style={{
                color: azaldi ? colors.danger : colors.text,
                fontFamily: fontFamily.extrabold,
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
          const isaretliMi = isaretli[i];
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
                borderWidth: isaretliMi ? 2 : 1,
                borderColor: aktif ? colors.primary : isaretliMi ? colors.warning : cevaplandi ? colors.success : colors.border,
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
          paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : spacing.lg,
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

      <ProvaOzeti
        gorunur={ozetAcik}
        onKapat={() => setOzetAcik(false)}
        cevaplar={cevaplar}
        isaretli={isaretli}
        aktifIndex={index}
        onGit={setIndex}
        onBitir={() => bitir(false)}
      />

      <ConfirmDialog
        visible={dialog != null}
        onRequestClose={() => setDialog(null)}
        title={dialog?.title ?? ""}
        message={dialog?.message}
        buttons={dialog?.buttons ?? [{ text: "Tamam" }]}
      />
    </SafeAreaView>
  );
}
