import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useTheme } from "@/theme";

export interface DialogButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons: DialogButton[];
  onRequestClose: () => void;
}

/**
 * Alert.alert yerine kullanılan, tasarım sistemine uygun düz/premium modal.
 * Native Alert.alert özelleştirilemediği için buton dizisiyle aynı API şeklini taşır.
 */
export function ConfirmDialog({ visible, title, message, buttons, onRequestClose }: ConfirmDialogProps) {
  const { colors, fontSize, fontFamily, spacing, radius } = useTheme();

  const handlePress = (btn: DialogButton) => {
    onRequestClose();
    btn.onPress?.();
  };

  const stacked = buttons.length > 2;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <Pressable
        onPress={onRequestClose}
        style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "center", padding: spacing.xxl }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: colors.surfaceElevated,
            borderRadius: radius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.xl,
          }}
        >
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontFamily: fontFamily.extrabold, marginBottom: message ? 8 : spacing.lg }}>
            {title}
          </Text>
          {message && (
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, fontFamily: fontFamily.semibold, lineHeight: 20, marginBottom: spacing.xl }}>
              {message}
            </Text>
          )}
          <View style={{ flexDirection: stacked ? "column" : "row", gap: spacing.sm }}>
            {buttons.map((btn, i) => {
              const destructive = btn.style === "destructive";
              const cancel = btn.style === "cancel";
              return (
                <Pressable
                  key={btn.text + i}
                  onPress={() => handlePress(btn)}
                  style={({ pressed }) => ({
                    flex: stacked ? undefined : 1,
                    paddingVertical: 13,
                    borderRadius: radius.pill,
                    alignItems: "center",
                    backgroundColor: destructive ? colors.danger : cancel ? "transparent" : colors.primary,
                    borderWidth: cancel ? 1.5 : 0,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text
                    style={{
                      color: destructive ? "#FFFFFF" : cancel ? colors.text : colors.onPrimary,
                      fontSize: fontSize.sm,
                      fontFamily: fontFamily.extrabold,
                    }}
                  >
                    {btn.text}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
