import React from "react";
import { Image, Linking, Modal, Platform, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as StoreReview from "expo-store-review";
import { Button } from "@/components/ui";
import { useTheme } from "@/theme";
import { usePuanPenceresi } from "@/store/usePuanIstegi";

const PAKET_ADI = "com.ehliyetustasi.app";

async function magazayiAc(): Promise<void> {
  if (Platform.OS !== "android") {
    await StoreReview.requestReview().catch(() => {});
    return;
  }
  try {
    await Linking.openURL(`market://details?id=${PAKET_ADI}`);
  } catch {
    await Linking.openURL(`https://play.google.com/store/apps/details?id=${PAKET_ADI}`).catch(() => {});
  }
}

/**
 * Uygulamayı puanlama isteği (kök düzende bir kez bulunur, usePuanIstegiTetikle ile açılır).
 * Görüş sorusu sormaz ve puanı filtrelemez: "Puan ver" herkesi doğrudan Play Store sayfasına götürür.
 */
export function PuanIstegi() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const acik = usePuanPenceresi((s) => s.acik);
  const kapat = usePuanPenceresi((s) => s.kapat);

  const puanVer = () => {
    kapat();
    magazayiAc();
  };

  return (
    <Modal visible={acik} transparent animationType="fade" onRequestClose={kapat} statusBarTranslucent>
      <Pressable
        onPress={kapat}
        accessibilityLabel="Kapat"
        style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "center", padding: spacing.xl }}
      >
        <Pressable
          onPress={() => {}}
          accessibilityViewIsModal
          style={{
            width: "100%",
            maxWidth: 380,
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: colors.surfaceElevated,
            borderRadius: radius["3xl"],
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.xxl,
            paddingBottom: spacing.lg,
          }}
        >
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 26,
              backgroundColor: colors.primarySoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/icon-brand.png")}
              resizeMethod="resize"
              style={{ width: 66, height: 66, borderRadius: 16 }}
              accessibilityIgnoresInvertColors
            />
          </View>

          <View
            style={{ flexDirection: "row", gap: 6, marginTop: spacing.lg }}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Ionicons key={i} name="star" size={24} color={colors.warning} />
            ))}
          </View>

          <Text
            accessibilityRole="header"
            style={{
              color: colors.text,
              fontSize: fontSize.xl,
              fontFamily: fontFamily.extrabold,
              textAlign: "center",
              marginTop: spacing.lg,
            }}
          >
            Bize puan verir misin?
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: fontSize.md,
              fontFamily: fontFamily.semibold,
              textAlign: "center",
              lineHeight: 22,
              marginTop: spacing.sm,
            }}
          >
            Yorumun, başka adayların Ehliyet Ustası'nı bulmasına yardım eder. Birkaç saniye sürer.
          </Text>

          <View style={{ width: "100%", gap: spacing.sm, marginTop: spacing.xl }}>
            <Button label="Puan ver" icon="star" onPress={puanVer} />
            <Button label="Şimdi değil" variant="ghost" onPress={kapat} />
          </View>

          <Text
            style={{
              color: colors.textMuted,
              fontSize: fontSize.xs,
              fontFamily: fontFamily.semibold,
              textAlign: "center",
              marginTop: spacing.sm,
            }}
          >
            Bunu yalnızca bir kez soruyoruz.
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
