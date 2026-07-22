export type ColorScheme = "light" | "dark";

export interface Palette {
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceElevated: string;
  border: string;
  text: string;
  textMuted: string;
  textFaint: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  info: string;
  infoSoft: string;
  shadow: string;
  overlay: string;
}

export const darkPalette: Palette = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  surfaceElevated: "#334155",
  border: "#334155",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textFaint: "#64748B",
  primary: "#6366F1", // Indigo 500
  primarySoft: "rgba(99,102,241,0.2)",
  onPrimary: "#FFFFFF",
  success: "#10B981", // Emerald 500
  successSoft: "rgba(16,185,129,0.2)",
  danger: "#F43F5E", // Rose 500
  dangerSoft: "rgba(244,63,94,0.2)",
  warning: "#F59E0B", // Amber 500
  warningSoft: "rgba(245,158,11,0.2)",
  info: "#0EA5E9",
  infoSoft: "rgba(14,165,233,0.2)",
  shadow: "#000000",
  overlay: "rgba(15,23,42,0.7)",
};

export const lightPalette: Palette = {
  background: "#F8FAFC", // soft off-white
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",
  surfaceElevated: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A", // deep slate
  textMuted: "#64748B",
  textFaint: "#94A3B8",
  primary: "#4F46E5", // vibrant indigo
  primarySoft: "rgba(79,70,229,0.12)",
  onPrimary: "#FFFFFF",
  success: "#10B981", // emerald
  successSoft: "rgba(16,185,129,0.12)",
  danger: "#F43F5E", // rose
  dangerSoft: "rgba(244,63,94,0.12)",
  warning: "#F59E0B", // amber
  warningSoft: "rgba(245,158,11,0.15)",
  info: "#0EA5E9",
  infoSoft: "rgba(14,165,233,0.12)",
  shadow: "#94A3B8",
  overlay: "rgba(15,23,42,0.4)",
};

// Ders (ders) renkleri - her iki temada da tutarlı marka aksanları
export const dersColors: Record<string, string> = {
  trafik: "#3B82F6",
  ilkyardim: "#EF4444",
  motor: "#F59E0B",
  adab: "#10B981",
};

export const palettes: Record<ColorScheme, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};
