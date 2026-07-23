import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  showBack?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
  showBack = true,
}: ScreenHeaderProps) {
  const { colors, fontSize, fontWeight, fontFamily, radius, spacing } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) return onBack();
    if (router.canGoBack()) router.back();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginBottom: spacing.xs,
      }}
    >
      {showBack && (
        <Pressable
          onPress={handleBack}
          hitSlop={10}
          style={{
            width: 42,
            height: 42,
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
      )}
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.text, fontSize: fontSize.xl, fontFamily: fontFamily.extrabold }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
            {subtitle}
          </Text>
        )}
      </View>
      {right}
    </View>
  );
}
