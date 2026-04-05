import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { isDark, toggleTheme, colors } = useTheme();
  const isMobile = width < 480;

  return (
    <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.border, paddingHorizontal: isMobile ? 15 : 30 }]}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => router.push('/')}>
        <Ionicons name="briefcase" size={24} color={colors.primary} style={{ marginRight: 6 }} />
        <Text style={[styles.logoText, { color: colors.primary }]}>BHC</Text>
        <Text style={[styles.logoTextDark, { color: colors.textMain }]}>JOBS</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        {!isMobile && (
          <TouchableOpacity style={[styles.jobsBtn, { borderColor: colors.primary }]} onPress={() => router.push('/')}>
            <Text style={[styles.jobsText, { color: colors.primary }]}>Jobs</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.signInBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/login')}>
          <Text style={styles.signInText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBtn, { borderColor: colors.border }]} onPress={toggleTheme}>
          <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    zIndex: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
  },
  logoTextDark: {
    fontSize: 20,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  jobsBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  jobsText: {
    fontWeight: '600',
    fontSize: 14,
  },
  signInBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
