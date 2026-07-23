import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import type { IconName } from "@/types";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled,
  loading,
  fullWidth = true,
  style,
}: ButtonProps) {
  const { colors, radius, fontFamily, fontSize, fontWeight, spacing } = useTheme();

  const heights: Record<Size, number> = { sm: 40, md: 50, lg: 58 };
  const fonts: Record<Size, number> = {
    sm: fontSize.sm,
    md: fontSize.md,
    lg: fontSize.lg,
  };

  const bg: Record<Variant, string> = {
    primary: colors.primary,
    secondary: colors.surfaceAlt,
    ghost: "transparent",
    danger: colors.danger,
    success: colors.success,
  };
  const fg: Record<Variant, string> = {
    primary: colors.onPrimary,
    secondary: colors.text,
    ghost: colors.primary,
    danger: "#FFFFFF",
    success: "#FFFFFF",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height: heights[size],
          borderRadius: radius.md,
          backgroundColor: bg[variant],
          borderWidth: variant === "ghost" ? 1.5 : 0,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: spacing.lg,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg[variant]} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon && <Ionicons name={icon} size={fonts[size] + 3} color={fg[variant]} />}
          <Text
            style={{
              color: fg[variant],
              fontSize: fonts[size],
              fontFamily: fontFamily.semibold,
            }}
          >
            {label}
          </Text>
          {iconRight && (
            <Ionicons name={iconRight} size={fonts[size] + 3} color={fg[variant]} />
          )}
        </View>
      )}
    </Pressable>
  );
}
