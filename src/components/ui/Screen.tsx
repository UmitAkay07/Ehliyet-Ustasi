import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView, Edge, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  footer?: React.ReactNode;
}

export function Screen({
  children,
  scroll = true,
  padded = true,
  edges = ["top"],
  contentStyle,
  footer,
}: ScreenProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const inner = (
    <View
      style={[
        {
          padding: padded ? spacing.lg : 0,
          gap: spacing.lg,
          flexGrow: 1,
        },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
          keyboardShouldPersistTaps="handled"
        >
          {inner}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{inner}</View>
      )}
      {footer && (
        <View style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 0 }}>
          {footer}
        </View>
      )}
    </SafeAreaView>
  );
}
