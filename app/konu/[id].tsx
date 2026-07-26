import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Screen, ScreenHeader, Card, Button, Badge } from "@/components/ui";
import { KonuGorseli } from "@/components/KonuGorseli";
import { useTheme } from "@/theme";
import { useAppStore } from "@/store/useAppStore";
import { konuBul } from "@/data/konular";
import { dersBul } from "@/data/dersler";
import { sorularByKonu } from "@/data/sorular";
import { KONU_KAPAK_RESIMLERI } from "@/data/konuKapakResimleri";

export default function KonuDetayScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const konu = konuBul(id);
  const konuOkundu = useAppStore((s) => s.konuOkundu);
  const [sesli, setSesli] = useState(false);

  useEffect(() => {
    if (konu) konuOkundu(konu.id);
  }, [konu?.id]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  if (!konu) {
    return (
      <Screen>
        <ScreenHeader title="Konu bulunamadı" />
      </Screen>
    );
  }

  const ders = dersBul(konu.dersId)!;
  const soruSayisi = sorularByKonu(konu.id).length;
  const kapakFoto = KONU_KAPAK_RESIMLERI[konu.id];

  const sesMetni = [
    konu.baslik,
    konu.ozet,
    ...konu.bolumler.map((b) => `${b.baslik ? b.baslik + ". " : ""}${b.metin}`),
    "Anahtar noktalar.",
    ...konu.anahtarNoktalar,
  ].join(" ");

  const sesToggle = () => {
    if (sesli) {
      Speech.stop();
      setSesli(false);
      return;
    }
    setSesli(true);
    Speech.speak(sesMetni, {
      language: "tr-TR",
      rate: 0.92,
      onDone: () => setSesli(false),
      onStopped: () => setSesli(false),
      onError: () => setSesli(false),
    });
  };

  return (
    <Screen
      footer={
        soruSayisi > 0 ? (
          <View
            style={{
              padding: spacing.lg,
              paddingTop: spacing.md,
              backgroundColor: colors.background,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Button
              label={`Bu Konudan Test Çöz (${soruSayisi} soru)`}
              icon="clipboard"
              onPress={() => router.push(`/test/${konu.id}`)}
            />
          </View>
        ) : undefined
      }
    >
      <ScreenHeader
        title={ders.kisaAd}
        subtitle={`${konu.okumaSuresiDk} dakikalık okuma`}
        right={
          <Button
            label={sesli ? "Durdur" : "Dinle"}
            icon={sesli ? "stop" : "volume-high"}
            variant={sesli ? "danger" : "secondary"}
            size="sm"
            fullWidth={false}
            onPress={sesToggle}
          />
        }
      />

      <View style={{ gap: spacing.sm }}>
        <Badge label={ders.ad} color={ders.renk} bg={ders.renk + "22"} icon={ders.ikon} />
        <Text style={{ color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold }}>
          {konu.baslik}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.md, lineHeight: 22 }}>{konu.ozet}</Text>
      </View>

      {kapakFoto ? (
        <Image
          source={kapakFoto}
          style={{
            width: "100%",
            height: 180,
            borderRadius: radius.lg,
            backgroundColor: colors.surfaceAlt,
          }}
          resizeMode="cover"
        />
      ) : null}

      {konu.kapakGorsel ? <KonuGorseli id={konu.kapakGorsel} /> : null}

      {konu.bolumler.map((bolum, i) => (
        <View key={i} style={{ gap: spacing.sm }}>
          {bolum.baslik && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <View
                style={{
                  width: 6,
                  height: 20,
                  borderRadius: 3,
                  backgroundColor: ders.renk,
                }}
              />
              <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold, flex: 1 }}>
                {bolum.baslik}
              </Text>
            </View>
          )}
          {bolum.gorsel ? <KonuGorseli id={bolum.gorsel} /> : null}
          <Text style={{ color: colors.text, fontSize: fontSize.md, lineHeight: 24 }}>{bolum.metin}</Text>
        </View>
      ))}

      <Card style={{ backgroundColor: ders.renk + "14", borderColor: ders.renk + "44" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md }}>
          <Ionicons name="key" size={20} color={ders.renk} />
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
            Anahtar Noktalar
          </Text>
        </View>
        <View style={{ gap: spacing.sm }}>
          {konu.anahtarNoktalar.map((nokta, i) => (
            <View key={i} style={{ flexDirection: "row", gap: spacing.sm }}>
              <Ionicons name="checkmark-circle" size={18} color={ders.renk} style={{ marginTop: 2 }} />
              <Text style={{ color: colors.text, fontSize: fontSize.md, lineHeight: 22, flex: 1 }}>
                {nokta}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}
