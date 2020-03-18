import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../colors";

type Props = { title: string; onPress: () => void; disabled: boolean };

function Button({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textColor,
    fontSize: 25,
    textAlign: "center"
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 8
  },
  disabled: {
    backgroundColor: colors.disabled
  }
});

export default Button;
