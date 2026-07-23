import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Screen, ScreenHeader, Card, SectionTitle } from "@/components/ui";
import { useTheme } from "@/theme";
import { CEZA_KATEGORILERI, TRAFIK_CEZALARI } from "@/data/cezalar";
import type { TrafikCezasi } from "@/data/cezalar";

export default function CezalarScreen() {
  const { colors, fontSize, fontWeight, fontFamily, spacing, radius } = useTheme();
  const [arama, setArama] = useState("");
  const [kategori, setKategori] = useState<string | "hepsi">("hepsi");

  const liste = useMemo(() => {
    const q = arama.trim().toLocaleLowerCase("tr");
    return TRAFIK_CEZALARI.filter((c) => {
      if (kategori !== "hepsi" && c.kategori !== kategori) return false;
      if (!q) return true;
      return (
        c.ihlal.toLocaleLowerCase("tr").includes(q) ||
        c.aciklama.toLocaleLowerCase("tr").includes(q)
      );
    });
  }, [arama, kategori]);

  return (
    <Screen>
      <ScreenHeader title="Trafik Cezaları" subtitle="Bilgilendirme rehberi" />

      <Card>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>
          Tutarlar ve puanlar yıldan yıla değişebilir. Güncel resmi bilgi için ilgili kurum
          duyurularını kontrol et. Bu liste eğitim amaçlıdır.
        </Text>
      </Card>

      <TextInput
        value={arama}
        onChangeText={setArama}
        placeholder="İhlal ara…"
        placeholderTextColor={colors.textFaint}
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          color: colors.text,
          fontSize: fontSize.md,
        }}
      />

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        <KategoriChip
          label="Tümü"
          aktif={kategori === "hepsi"}
          renk={colors.primary}
          onPress={() => setKategori("hepsi")}
        />
        {CEZA_KATEGORILERI.map((k) => (
          <KategoriChip
            key={k.id}
            label={k.ad}
            aktif={kategori === k.id}
            renk={k.renk}
            onPress={() => setKategori(k.id)}
          />
        ))}
      </View>

      <SectionTitle title={`${liste.length} ihlal`} />
      <View style={{ gap: spacing.md }}>
        {liste.map((c) => (
          <CezaKart key={c.id} ceza={c} />
        ))}
      </View>
    </Screen>
  );
}

function KategoriChip({
  label,
  aktif,
  renk,
  onPress,
}: {
  label: string;
  aktif: boolean;
  renk: string;
  onPress: () => void;
}) {
  const { colors, fontSize, fontWeight, fontFamily, spacing, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: spacing.md,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: aktif ? renk + "22" : colors.surfaceAlt,
        borderWidth: 1,
        borderColor: aktif ? renk : colors.border,
      }}
    >
      <Text style={{ color: aktif ? renk : colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>
        {label}
      </Text>
    </Pressable>
  );
}

function CezaKart({ ceza }: { ceza: TrafikCezasi }) {
  const { colors, fontSize, fontWeight, fontFamily, spacing } = useTheme();
  const kat = CEZA_KATEGORILERI.find((k) => k.id === ceza.kategori);
  return (
    <Card>
      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: kat?.renk ?? colors.primary }} />
          <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>{kat?.ad}</Text>
        </View>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>{ceza.ihlal}</Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 }}>{ceza.aciklama}</Text>
        <Text style={{ color: colors.text, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
          Tipik sonuç: {ceza.tipikSonuc}
        </Text>
        {ceza.cezaPuani ? (
          <Text style={{ color: colors.warning, fontSize: fontSize.xs }}>Puan: {ceza.cezaPuani}</Text>
        ) : null}
      </View>
    </Card>
  );
}
