import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

/**
 * Font / hydrate beklerken gösterilen sabit koyu marka ekranı.
 * Tema kullanmaz — beyaz flash ve kontrast kaybını önler.
 */
export function BrandBootScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.logoWrap}>
        <Image
          source={require("../../assets/icon-brand.png")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.titleLight}>Ehliyet</Text>
        <Text style={styles.titleAccent}> Ustası</Text>
      </View>
      <Text style={styles.sub}>E-sınav & direksiyon hazırlık</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#030712",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 128,
    height: 128,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 28,
    backgroundColor: "#0B1224",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  titleLight: {
    color: "#F8FAFC",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.2,
  },
  titleAccent: {
    color: "#A5B4FC",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.2,
  },
  sub: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
});
