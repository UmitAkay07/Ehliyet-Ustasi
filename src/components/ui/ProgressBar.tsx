import React from "react";
import { View } from "react-native";
import { useTheme } from "@/theme";

interface ProgressBarProps {
  progress: number; // 0..1
  color?: string;
  height?: number;
  trackColor?: string;
}

export function ProgressBar({ progress, color, height = 8, trackColor }: ProgressBarProps) {
  const { colors, radius } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={{
        height,
        borderRadius: radius.pill,
        backgroundColor: trackColor ?? colors.surfaceAlt,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: "100%",
          borderRadius: radius.pill,
          backgroundColor: color ?? colors.primary,
        }}
      />
    </View>
  );
}
