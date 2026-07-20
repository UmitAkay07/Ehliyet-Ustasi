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
  background: "#0B1220",
  surface: "#131C2E",
  surfaceAlt: "#1B2740",
  surfaceElevated: "#1F2B45",
  border: "#26324A",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textFaint: "#64748B",
  primary: "#6366F1",
  primarySoft: "rgba(99,102,241,0.16)",
  onPrimary: "#FFFFFF",
  success: "#22C55E",
  successSoft: "rgba(34,197,94,0.16)",
  danger: "#F87171",
  dangerSoft: "rgba(248,113,113,0.16)",
  warning: "#FBBF24",
  warningSoft: "rgba(251,191,36,0.16)",
  info: "#38BDF8",
  infoSoft: "rgba(56,189,248,0.16)",
  shadow: "#000000",
  overlay: "rgba(5,9,18,0.7)",
};

export const lightPalette: Palette = {
  background: "#F4F7FC",
  surface: "#FFFFFF",
  surfaceAlt: "#EEF2F9",
  surfaceElevated: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#5A6B85",
  textFaint: "#94A3B8",
  primary: "#4F46E5",
  primarySoft: "rgba(79,70,229,0.10)",
  onPrimary: "#FFFFFF",
  success: "#16A34A",
  successSoft: "rgba(22,163,74,0.10)",
  danger: "#DC2626",
  dangerSoft: "rgba(220,38,38,0.10)",
  warning: "#D97706",
  warningSoft: "rgba(217,119,6,0.12)",
  info: "#0284C7",
  infoSoft: "rgba(2,132,199,0.10)",
  shadow: "#1E293B",
  overlay: "rgba(15,23,42,0.5)",
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
