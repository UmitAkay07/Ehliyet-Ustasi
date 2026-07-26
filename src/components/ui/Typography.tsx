import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";

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
