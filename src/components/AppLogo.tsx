import React from "react";
import { Text, View, Image } from "react-native";

type LogoSize = "sm" | "md" | "lg" | "xl" | "hero";

const SIZES: Record<LogoSize, number> = {
  sm: 52,
  md: 72,
  lg: 96,
  xl: 120,
  hero: 144,
};

/** Ehliyet Ustası — premium uygulama ikonu tarzı logo */
export function AppLogo({
  size = "lg",
  variant = "default",
}: {
  size?: LogoSize;
  showGlow?: boolean;
  variant?: "default" | "flat";
}) {
  const dim = SIZES[size];
  const flat = variant === "flat";

  return (
    <View style={{ width: dim, height: dim, alignItems: "center", justifyContent: "center" }}>
      {!flat && (
        <View
          style={{
            position: "absolute",
            width: dim * 0.9,
            height: dim * 0.9,
            backgroundColor: "rgba(99,102,241,0.25)",
            borderRadius: dim * 0.25,
            transform: [{ scale: 1.1 }],
          }}
        />
      )}
      <Image
        source={require("../../assets/icon-brand.png")}
        style={{
          width: dim * 0.9,
          height: dim * 0.9,
          borderRadius: dim * 0.2, // To give a nice rounded rectangle look to the flat image
        }}
        resizeMode="contain"
      />
    </View>
  );
}

/** Marka başlığı — splash / onboarding */
export function BrandTitle({ large = false }: { large?: boolean }) {
  const mainSize = large ? 36 : 32;
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}>
      <Text
        style={{
          color: "#F8FAFC",
          fontSize: mainSize,
          fontWeight: "800",
          letterSpacing: -1.2,
        }}
      >
        Ehliyet
      </Text>
      <Text
        style={{
          fontSize: mainSize,
          fontWeight: "800",
          letterSpacing: -1.2,
          color: "#C4B5FD",
        }}
      >
        Ustası
      </Text>
    </View>
  );
}
