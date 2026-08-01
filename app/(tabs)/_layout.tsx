import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import type { IconName } from "@/types";

export default function TabLayout() {
  const { colors, fontSize } = useTheme();
  const insets = useSafeAreaInsets();

  const ikon = (aktif: IconName, pasif: IconName) => ({
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
      <View
        style={{
          width: 48,
          height: 32,
          borderRadius: 16,
          backgroundColor: focused ? colors.primarySoft : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={focused ? aktif : pasif} size={22} color={color} />
      </View>
    ),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 58 + (insets.bottom > 0 ? insets.bottom + 5 : 10),
          paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 10,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarLabelStyle: { fontSize: 10, fontFamily: "Nunito_700Bold", marginTop: 4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Ana Sayfa", tabBarAccessibilityLabel: "Ana Sayfa sekmesi", ...ikon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="konular"
        options={{ title: "Konular", tabBarAccessibilityLabel: "Konular sekmesi", ...ikon("book", "book-outline") }}
      />
      <Tabs.Screen
        name="testler"
        options={{ title: "Testler", tabBarAccessibilityLabel: "Testler sekmesi", ...ikon("clipboard", "clipboard-outline") }}
      />
      <Tabs.Screen
        name="direksiyon"
        options={{ title: "Direksiyon", tabBarAccessibilityLabel: "Direksiyon sekmesi", ...ikon("car-sport", "car-sport-outline") }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: "Profil", tabBarAccessibilityLabel: "Profil sekmesi", ...ikon("person", "person-outline") }}
      />
    </Tabs>
  );
}
