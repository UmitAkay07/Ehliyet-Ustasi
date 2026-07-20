import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import type { IconName } from "@/types";

interface BadgeProps {
  label: string;
  color?: string;
  bg?: string;
  icon?: IconName;
}

export function Badge({ label, color, bg, icon }: BadgeProps) {
  const { colors, radius, fontSize, fontWeight, spacing } = useTheme();
  const fg = color ?? colors.primary;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: bg ?? colors.primarySoft,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: 4,
        alignSelf: "flex-start",
      }}
    >
      {icon && <Ionicons name={icon} size={fontSize.xs + 1} color={fg} />}
      <Text style={{ color: fg, fontSize: fontSize.xs, fontWeight: fontWeight.semibold }}>
        {label}
      </Text>
    </View>
  );
}
