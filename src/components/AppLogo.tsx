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

  const logoSize = dim * 0.9;
  const logoRadius = dim * 0.2;

  return (
    <View style={{ width: dim, height: dim, alignItems: "center", justifyContent: "center" }}>
      {!flat && (
        <View
          style={{
            position: "absolute",
            width: logoSize,
            height: logoSize,
            backgroundColor: "rgba(99,102,241,0.25)",
            borderRadius: logoRadius,
            transform: [{ scale: 1.1 }],
          }}
        />
      )}
      <View
        style={{
          width: logoSize,
          height: logoSize,
          borderRadius: logoRadius,
          overflow: "hidden",
          backgroundColor: "#0B1224",
        }}
      >
        <Image
          source={require("../../assets/icon-brand.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

/**
 * Marka başlığı — onboarding / boot.
 * Temadan bağımsız sabit renkler: açık yazı, koyu zemin. Theme light olsa bile okunur.
 */
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
          color: "#A5B4FC",
        }}
      >
        Ustası
      </Text>
    </View>
  );
}
