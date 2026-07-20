import React from "react";
import { Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { ManevraAnimasyonu } from "@/animations/ManevraAnimasyonu";
import type { ManevraTipi } from "@/types";
import { direksiyonVideoKaynagi, direksiyonVideosuVar } from "@/data/direksiyonVideolari";

interface Props {
  dersId: string;
  animasyon: ManevraTipi;
  baslik: string;
}

function VideoIcerik({ dersId, baslik }: { dersId: string; baslik: string }) {
  const { colors, fontSize, spacing, radius } = useTheme();
  const kaynak = direksiyonVideoKaynagi(dersId)!;

  const player = useVideoPlayer(kaynak, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={{ gap: spacing.sm }}>
      <View
        style={{
          borderRadius: radius.lg,
          overflow: "hidden",
          backgroundColor: "#000",
          aspectRatio: 16 / 9,
        }}
      >
        <VideoView
          style={{ width: "100%", height: "100%" }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture={false}
          contentFit="contain"
          nativeControls
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: spacing.xs }}>
        <Ionicons name="film" size={14} color={colors.primary} />
        <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, flex: 1 }}>
          {baslik} — MEB direksiyon müfredatına uygun eğitim videosu
        </Text>
      </View>
    </View>
  );
}

export function DireksiyonVideoOynatici({ dersId, animasyon, baslik }: Props) {
  const { colors, fontSize, spacing } = useTheme();
  const videoVar = direksiyonVideosuVar(dersId);

  if (videoVar) {
    return <VideoIcerik dersId={dersId} baslik={baslik} />;
  }

  return (
    <View style={{ gap: spacing.sm }}>
      <ManevraAnimasyonu tip={animasyon} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: spacing.sm }}>
        <Ionicons name="videocam-outline" size={14} color={colors.textFaint} />
        <Text style={{ color: colors.textFaint, fontSize: fontSize.xs, flex: 1 }}>
          HD eğitim videosu yakında — şimdilik animasyonlu önizleme
        </Text>
      </View>
    </View>
  );
}
