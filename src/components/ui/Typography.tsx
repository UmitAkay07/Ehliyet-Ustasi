import React from "react";
import { Text, TextProps, View } from "react-native";
import { useTheme } from "@/theme";

export function Title({ children, style, ...rest }: TextProps) {
  const { colors, fontSize, fontFamily } = useTheme();
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSize.xxl, fontFamily: fontFamily.extrabold },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Subtitle({ children, style, ...rest }: TextProps) {
  const { colors, fontSize, fontFamily } = useTheme();
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Body({ children, style, muted, ...rest }: TextProps & { muted?: boolean }) {
  const { colors, fontSize, fontFamily } = useTheme();
  return (
    <Text
      style={[
        { color: muted ? colors.textMuted : colors.text, fontSize: fontSize.md, fontFamily: fontFamily.regular, lineHeight: 22 },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function Caption({ children, style, ...rest }: TextProps) {
  const { colors, fontSize, fontFamily } = useTheme();
  return (
    <Text style={[{ color: colors.textMuted, fontSize: fontSize.xs, fontFamily: fontFamily.medium }, style]} {...rest}>
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
  const { colors, fontSize, fontFamily } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.bold }}>
        {title}
      </Text>
      {action}
    </View>
  );
}
