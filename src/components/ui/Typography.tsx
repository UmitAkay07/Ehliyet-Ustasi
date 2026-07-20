import React from "react";
import { Text, TextProps, View } from "react-native";
import { useTheme } from "@/theme";

export function Title({ children, style, ...rest }: TextProps) {
  const { colors, fontSize, fontWeight } = useTheme();
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSize.xxl, fontWeight: fontWeight.extrabold },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Subtitle({ children, style, ...rest }: TextProps) {
  const { colors, fontSize, fontWeight } = useTheme();
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Body({ children, style, muted, ...rest }: TextProps & { muted?: boolean }) {
  const { colors, fontSize } = useTheme();
  return (
    <Text
      style={[
        { color: muted ? colors.textMuted : colors.text, fontSize: fontSize.md, lineHeight: 22 },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Caption({ children, style, ...rest }: TextProps) {
  const { colors, fontSize } = useTheme();
  return (
    <Text style={[{ color: colors.textMuted, fontSize: fontSize.xs }, style]} {...rest}>
      {children}
    </Text>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  const { colors, fontSize, fontWeight } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: fontWeight.bold }}>
        {title}
      </Text>
      {action}
    </View>
  );
}
