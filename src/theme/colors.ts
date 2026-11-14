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
  background: "#131313",
  surface: "#131313",
  surfaceAlt: "#1C1C1C",
  surfaceElevated: "#1F1F1F",
  border: "rgba(255,255,255,0.09)",
  text: "#F2F2F0",
  textMuted: "#8A8A87",
  textFaint: "#5C5C59",
  primary: "#7DD0F0", // tek marka vurgusu — bebek mavisi
  primarySoft: "rgba(125,208,240,0.16)",
  onPrimary: "#062733",
  success: "#4CAF6D",
  successSoft: "rgba(76,175,109,0.14)",
  danger: "#E5534B",
  dangerSoft: "rgba(229,83,75,0.14)",
  warning: "#D9A441",
  warningSoft: "rgba(217,164,65,0.14)",
  info: "#6B93B5",
  infoSoft: "rgba(107,147,181,0.14)",
  shadow: "#000000",
  overlay: "rgba(0,0,0,0.6)",
};

export const lightPalette: Palette = {
  background: "#FAFAF8",
  surface: "#FAFAF8",
  surfaceAlt: "#F0EFEB",
  surfaceElevated: "#FFFFFF",
  border: "#E3E1DB",
  text: "#171715",
  textMuted: "#6E6D68",
  textFaint: "#9A9994",
  primary: "#1E8FC7", // tek marka vurgusu — bebek mavisi (açık modda koyulaştırılmış)
  primarySoft: "rgba(30,143,199,0.12)",
  onPrimary: "#FFFFFF",
  success: "#2E8F53",
  successSoft: "rgba(46,143,83,0.10)",
  danger: "#C23B34",
  dangerSoft: "rgba(194,59,52,0.10)",
  warning: "#B5701F",
  warningSoft: "rgba(181,112,31,0.10)",
  info: "#3F6E8E",
  infoSoft: "rgba(63,110,142,0.10)",
  shadow: "#9A9994",
  overlay: "rgba(23,23,21,0.35)",
};

// Ders (ders) renkleri - kucuk nokta/cubuk olarak kullanilan mutedimsi tonlar
export const dersColors: Record<string, string> = {
  trafik: "#6B93B5",
  ilkyardim: "#C1685F",
  motor: "#B98F4E",
  adab: "#6FA184",
};

export const palettes: Record<ColorScheme, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};
