import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "@/theme";

interface ProgressRingProps {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 12,
  color,
  trackColor,
  label,
  sublabel,
}: ProgressRingProps) {
  const { colors, fontFamily, fontSize, fontWeight } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped);
  const ringColor = color ?? colors.primary;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor ?? colors.surfaceAlt}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {(label || sublabel) && (
        <View style={{ alignItems: "center" }}>
          {label && (
            <Text
              style={{
                color: colors.text,
                fontSize: size > 100 ? fontSize.xxl : fontSize.lg,
                fontFamily: fontFamily.extrabold,
              }}
            >
              {label}
            </Text>
          )}
          {sublabel && (
            <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, marginTop: 2 }}>
              {sublabel}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
