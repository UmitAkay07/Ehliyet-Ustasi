import React, { useDeferredValue, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen, ScreenHeader } from "@/components/ui";
import { IsaretGorseli } from "@/components/IsaretGorseli";
import { useTheme } from "@/theme";
import { KONULAR } from "@/data/konular";
import { SORULAR } from "@/data/sorular";
import { TRAFIK_ISARETLERI } from "@/data/isaretler";
import { TRAFIK_CEZALARI } from "@/data/cezalar";
import { MIN_SORGU_UZUNLUGU, aramaDizini, dizindeAra } from "@/utils/arama";
import type { AramaDizini } from "@/utils/arama";

/**
 * 595 soru, konular, işaretler ve cezaların sadeleştirilmiş metinleri ilk aramada bir kez hazırlanır;
 * sonraki her harfte yalnızca bu hazır metinlerde aranır (zayıf telefonda yazarken takılmasın).
 */
let dizinler: {
  konular: AramaDizini<(typeof KONULAR)[number]>;
  sorular: AramaDizini<(typeof SORULAR)[number]>;
  isaretler: AramaDizini<(typeof TRAFIK_ISARETLERI)[number]>;
  cezalar: AramaDizini<(typeof TRAFIK_CEZALARI)[number]>;
} | null = null;
function dizinleriAl() {
  if (!dizinler) {
    dizinler = {
      konular: aramaDizini(KONULAR, (k) => [k.baslik, k.ozet, ...k.anahtarNoktalar]),
      sorular: aramaDizini(SORULAR, (s) => [s.metin, ...s.secenekler, s.aciklama]),
      isaretler: aramaDizini(TRAFIK_ISARETLERI, (i) => [i.ad, i.anlam]),
      cezalar: aramaDizini(TRAFIK_CEZALARI, (c) => [c.ihlal, c.aciklama, c.tipikSonuc]),
    };
  }
  return dizinler;
}

function Baslik({ metin, sayi }: { metin: string; sayi: number }) {
  const { colors, fontSize, fontFamily, spacing } = useTheme();
  return (
    <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold, marginTop: spacing.md }}>
      {metin} ({sayi})
    </Text>
  );
}

export default function AraScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const router = useRouter();
  const [sorgu, setSorgu] = useState("");
  const [acikSoru, setAcikSoru] = useState<string | null>(null);
  // Yazarken tuş vuruşları takılmasın diye arama gecikmeli değerle yapılır
  const gecikmeli = useDeferredValue(sorgu);

  const aranabilir = gecikmeli.trim().length >= MIN_SORGU_UZUNLUGU;
  // Boş ya da tek harfli sorguda dizin hiç hazırlanmaz (ekran anında açılır)
  const konular = useMemo(() => (aranabilir ? dizindeAra(dizinleriAl().konular, gecikmeli, 6) : []), [aranabilir, gecikmeli]);
  const sorular = useMemo(() => (aranabilir ? dizindeAra(dizinleriAl().sorular, gecikmeli, 20) : []), [aranabilir, gecikmeli]);
  const isaretler = useMemo(() => (aranabilir ? dizindeAra(dizinleriAl().isaretler, gecikmeli, 8) : []), [aranabilir, gecikmeli]);
  const cezalar = useMemo(() => (aranabilir ? dizindeAra(dizinleriAl().cezalar, gecikmeli, 6) : []), [aranabilir, gecikmeli]);

  const toplam = konular.length + sorular.length + isaretler.length + cezalar.length;

  const satirStil = (ilk: boolean) => ({
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.md,
    paddingVertical: 13,
    borderTopWidth: ilk ? 1 : 0,
    borderBottomWidth: 1,
    borderColor: colors.border,
  });

  return (
    <Screen>
      <ScreenHeader title="Ara" subtitle="Konu, soru, trafik işareti ve ceza" />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          backgroundColor: colors.surface,
          borderRadius: radius.pill,
          borderWidth: 1.5,
          borderColor: colors.border,
          paddingHorizontal: spacing.md,
        }}
      >
        <Ionicons name="search" size={18} color={colors.textFaint} />
        <TextInput
          value={sorgu}
          onChangeText={setSorgu}
          placeholder="Örn. yaya geçidi, ışık, hız"
          placeholderTextColor={colors.textFaint}
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          accessibilityLabel="Arama kutusu"
          style={{ flex: 1, color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.semibold, paddingVertical: 12 }}
        />
        {sorgu.length > 0 ? (
          <Pressable onPress={() => setSorgu("")} hitSlop={10} accessibilityRole="button" accessibilityLabel="Aramayı temizle">
            <Ionicons name="close-circle" size={18} color={colors.textFaint} />
          </Pressable>
        ) : null}
      </View>

      {!aranabilir ? (
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 20 }}>
          En az {MIN_SORGU_UZUNLUGU} harf yaz. Türkçe karakter kullanmak zorunda değilsin: "isik" yazınca "ışık" da bulunur.
        </Text>
      ) : toplam === 0 ? (
        <Text style={{ color: colors.textMuted, fontSize: fontSize.md, fontFamily: fontFamily.semibold }}>Sonuç bulunamadı.</Text>
      ) : (
        <View>
          {konular.length > 0 ? (
            <>
              <Baslik metin="Konular" sayi={konular.length} />
              {konular.map(({ oge: k }, i) => (
                <Pressable
                  key={k.id}
                  onPress={() => router.push(`/konu/${k.id}`)}
                  accessibilityRole="button"
                  style={({ pressed }) => ({ ...satirStil(i === 0), opacity: pressed ? 0.6 : 1 })}
                >
                  <Ionicons name={k.ikon} size={20} color={colors.primary} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>{k.baslik}</Text>
                    <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }} numberOfLines={1}>
                      {k.ozet}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={15} color={colors.textFaint} />
                </Pressable>
              ))}
            </>
          ) : null}

          {sorular.length > 0 ? (
            <>
              <Baslik metin="Sorular" sayi={sorular.length} />
              {sorular.map(({ oge: s }, i) => {
                const acik = acikSoru === s.id;
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => setAcikSoru(acik ? null : s.id)}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: acik }}
                    style={{ ...satirStil(i === 0), alignItems: "flex-start" }}
                  >
                    <Ionicons name={acik ? "chevron-down" : "chevron-forward"} size={16} color={colors.textFaint} style={{ marginTop: 3 }} />
                    <View style={{ flex: 1, gap: spacing.xs }}>
                      <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold, lineHeight: 20 }} numberOfLines={acik ? undefined : 3}>
                        {s.metin}
                      </Text>
                      {acik ? (
                        <View style={{ gap: spacing.xs }}>
                          <Text style={{ color: colors.success, fontSize: fontSize.sm, fontFamily: fontFamily.extrabold }}>
                            Doğru cevap: {s.secenekler[s.dogruIndex]}
                          </Text>
                          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>{s.aciklama}</Text>
                        </View>
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </>
          ) : null}

          {isaretler.length > 0 ? (
            <>
              <Baslik metin="Trafik İşaretleri" sayi={isaretler.length} />
              {isaretler.map(({ oge: i }, n) => (
                <View key={i.id} style={satirStil(n === 0)}>
                  <IsaretGorseli isaretId={i.id} kategori={i.kategori} boyut={44} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>{i.ad}</Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.semibold, lineHeight: 17 }} numberOfLines={3}>
                      {i.anlam}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          {cezalar.length > 0 ? (
            <>
              <Baslik metin="Trafik Cezaları" sayi={cezalar.length} />
              {cezalar.map(({ oge: c }, n) => (
                <View key={c.id} style={{ ...satirStil(n === 0), alignItems: "flex-start" }}>
                  <Ionicons name="cash-outline" size={18} color={colors.warning} style={{ marginTop: 2 }} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>{c.ihlal}</Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.semibold, lineHeight: 17 }}>
                      {c.tipikSonuc}
                    </Text>
                  </View>
                </View>
              ))}
              <Text style={{ color: colors.textFaint, fontSize: 11, fontFamily: fontFamily.medium, marginTop: spacing.xs }}>
                Cezalar bilgilendirme amaçlıdır; tutarlar değişebilir, resmî kaynaktan kontrol et.
              </Text>
            </>
          ) : null}
        </View>
      )}
    </Screen>
  );
}
