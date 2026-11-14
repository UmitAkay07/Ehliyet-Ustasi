import React, { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { Screen, ScreenHeader, Button, ProgressBar, ConfirmDialog } from "@/components/ui";
import type { DialogButton } from "@/components/ui";
import { useTheme } from "@/theme";
import { useOyun } from "@/store/useOyun";
import type { IconName } from "@/types";

export default function BasarilarScreen() {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();
  const oyun = useOyun();
  const viewShotRef = useRef<ViewShot>(null);
  const [dialog, setDialog] = useState<{ title: string; message?: string; buttons: DialogButton[] } | null>(null);
  const bilgiVer = (title: string, message: string) => setDialog({ title, message, buttons: [{ text: "Tamam" }] });

  // Kazanılanlar önce; kendi içinde tanım sırası korunur
  const siraliRozetler = useMemo(
    () => [...oyun.rozetler].sort((a, b) => Number(b.kazanildi) - Number(a.kazanildi)),
    [oyun.rozetler]
  );

  const paylas = async () => {
    try {
      if (!viewShotRef.current?.capture) {
        bilgiVer("Paylaşım", "Görsel henüz hazır değil. Biraz sonra tekrar dene.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      if (!(await Sharing.isAvailableAsync())) {
        bilgiVer("Paylaşım", "Bu cihazda paylaşım desteklenmiyor.");
        return;
      }
      await Sharing.shareAsync(uri, { dialogTitle: "Başarılarımı Paylaş", mimeType: "image/jpeg" });
    } catch {
      bilgiVer("Paylaşım", "Paylaşılamadı. Lütfen tekrar dene.");
    }
  };

  const { seviye } = oyun;

  return (
    <Screen>
      <ScreenHeader title="Başarılarım" subtitle="Çalıştıkça seviye atla, rozet kazan" />

      {/* Paylaşılan kart: arka planı açıkça dolu olmalı (görsele çevrilirken saydam kalmasın) */}
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <View
          style={{
            backgroundColor: colors.surfaceElevated,
            borderRadius: radius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.xl,
            gap: spacing.md,
          }}
        >
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>Ehliyet Ustası</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: spacing.sm }}>
            <Text style={{ color: colors.text, fontSize: 44, fontFamily: fontFamily.extrabold, letterSpacing: -1 }}>
              Seviye {seviye.seviye}
            </Text>
          </View>
          <Text style={{ color: colors.primary, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}>{seviye.ad}</Text>
          <ProgressBar progress={seviye.ilerleme} height={8} />
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold }}>
            {oyun.xp} XP · sonraki seviyeye {Math.ceil(seviye.kalanXp)} XP
          </Text>
          <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.bold }}>
            {oyun.kazanilan}/{oyun.rozetler.length} rozet · {oyun.girdi.dogruSoru} doğru · {oyun.girdi.seri} gün seri
          </Text>
        </View>
      </ViewShot>

      <Button label="Paylaş" icon="share-social" variant="secondary" onPress={paylas} />

      <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.bold }}>Rozetler</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {siraliRozetler.map((r) => (
          <View
            key={r.id}
            accessible
            accessibilityLabel={`${r.baslik}. ${r.aciklama}. ${r.kazanildi ? "Kazanıldı" : `İlerleme ${r.durum}`}`}
            style={{
              width: "48%",
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: r.kazanildi ? colors.primary : colors.border,
              padding: spacing.md,
              gap: spacing.xs,
              opacity: r.kazanildi ? 1 : 0.8,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: r.kazanildi ? colors.primary : colors.surfaceAlt,
              }}
            >
              <Ionicons name={r.ikon as IconName} size={20} color={r.kazanildi ? colors.onPrimary : colors.textFaint} />
            </View>
            <Text style={{ color: colors.text, fontSize: fontSize.md, fontFamily: fontFamily.extrabold }}>{r.baslik}</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.semibold, lineHeight: 16 }}>
              {r.aciklama}
            </Text>
            {r.kazanildi ? (
              <Text style={{ color: colors.success, fontSize: fontSize.xs, fontFamily: fontFamily.extrabold }}>Kazanıldı</Text>
            ) : (
              <View style={{ gap: 4 }}>
                <ProgressBar progress={r.ilerleme} height={4} />
                <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, fontFamily: fontFamily.semibold }}>{r.durum}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <ConfirmDialog
        visible={dialog != null}
        onRequestClose={() => setDialog(null)}
        title={dialog?.title ?? ""}
        message={dialog?.message}
        buttons={dialog?.buttons ?? [{ text: "Tamam" }]}
      />
    </Screen>
  );
}
