import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  colors: {
    inputBg: string;
    border: string;
    textMain: string;
    textMuted: string;
  };
}

export default function CustomInput({ label, colors, ...props }: CustomInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.textMain }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
});
