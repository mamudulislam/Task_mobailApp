import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import CustomInput from '../components/CustomInput';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dev.bhcjobs.com';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Validation Error", "Please enter both mobile number and password.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('password', password);

      const response = await fetch(`${API_URL}/api/job_seeker/login`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert("Success", data.message || "Logged in successfully!");
        router.replace('/');
      } else {
        let errorMsg = data.message || "Invalid credentials. Please try again.";
        Alert.alert("Login Failed", errorMsg);
      }
    } catch (error) {
      console.error("Login error: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={[styles.formContainer, { backgroundColor: colors.card }, isMobile ? styles.formContainerMobile : null]}>
            <View style={styles.headerTitleContainer}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="lock-open" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.headerTitle, { color: colors.textMain }]}>Welcome Back</Text>
              <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>Enter your credentials to access your account</Text>
            </View>

            <CustomInput
              label="Mobile Number"
              colors={colors}
              placeholder="e.g. 01XXXXXXXXX"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
              icon="call-outline"
            />

            <CustomInput
              label="Password"
              colors={colors}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              icon="lock-closed-outline"
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.primary} />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>SIGN IN</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerInner}>
              <Text style={[styles.footerText, { color: colors.textMuted }]}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={[styles.registerLink, { color: colors.primary }]}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: 450,
    maxWidth: '90%',
    padding: 35,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  formContainerMobile: {
    width: '92%',
    padding: 24,
  },
  headerTitleContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryButton: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});
