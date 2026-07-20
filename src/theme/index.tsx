import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { ColorScheme, Palette, palettes } from "./colors";
import { fontSize, fontWeight, radius, spacing } from "./tokens";
import { useAppStore } from "@/store/useAppStore";

export interface Theme {
  scheme: ColorScheme;
  colors: Palette;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
}

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const themeMode = useAppStore((s) => s.settings.themeMode);

  const scheme: ColorScheme = useMemo(() => {
    if (themeMode === "light") return "light";
    if (themeMode === "dark") return "dark";
    return systemScheme === "light" ? "light" : "dark";
  }, [themeMode, systemScheme]);

  const theme: Theme = useMemo(
    () => ({
      scheme,
      colors: palettes[scheme],
      spacing,
      radius,
      fontSize,
      fontWeight,
    }),
    [scheme]
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export * from "./colors";
export * from "./tokens";
