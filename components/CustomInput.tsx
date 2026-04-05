import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label?: string;
  colors: {
    inputBg: string;
    border: string;
    textMain: string;
    textMuted: string;
  };
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: React.ReactNode;
}

export default function CustomInput({ label, colors, icon, rightIcon, ...props }: CustomInputProps) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={[styles.label, { color: colors.textMain }]}>{label}</Text>}
      <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: '#e2e8f0' }]}>
        {icon && (
          <Ionicons name={icon} size={20} color="#3b82f6" style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, { color: colors.textMain }]}
          placeholderTextColor="#a0aec0"
          {...props}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  rightIconContainer: {
    marginLeft: 10,
  }
});
