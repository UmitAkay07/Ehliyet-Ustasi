import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import type { IconName } from "@/types";

export default function TabLayout() {
  const { colors, fontSize } = useTheme();

  const ikon = (aktif: IconName, pasif: IconName) => ({
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
      <Ionicons name={focused ? aktif : pasif} size={size} color={color} />
    ),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Ana Sayfa", ...ikon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="konular"
        options={{ title: "Konular", ...ikon("book", "book-outline") }}
      />
      <Tabs.Screen
        name="testler"
        options={{ title: "Testler", ...ikon("clipboard", "clipboard-outline") }}
      />
      <Tabs.Screen
        name="direksiyon"
        options={{ title: "Direksiyon", ...ikon("car-sport", "car-sport-outline") }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: "Profil", ...ikon("person", "person-outline") }}
      />
    </Tabs>
  );
}
