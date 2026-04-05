import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';

export default function Login() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dev.bhcjobs.com';
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const colors = {
    bg: isDark ? '#121212' : '#f8f9fc',
    card: isDark ? '#1e1e1e' : '#fff',
    textMain: isDark ? '#ffffff' : '#111111',
    textMuted: isDark ? '#aaaaaa' : '#666666',
    primary: isDark ? '#3d8eee' : '#0056b3',
    border: isDark ? '#333333' : '#e1e5eb',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Validation Error", "Please enter both phone number and password.");
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
        if (data.error && typeof data.error === 'object') {
          const firstErrorKey = Object.keys(data.error)[0];
          if (firstErrorKey && Array.isArray(data.error[firstErrorKey])) {
            errorMsg = data.error[firstErrorKey][0];
          } else if (typeof data.error === 'string') {
            errorMsg = data.error;
          }
        }
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
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.formContainer}>
        <Text style={[styles.headerTitle, { color: colors.textMain }]}>Welcome Back!</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>Login to your BhcJobs account</Text>

        <CustomInput 
          label="Phone Number" 
          colors={colors}
          placeholder="01724171556"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!loading}
        />

        <CustomInput 
          label="Password" 
          colors={colors}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <PrimaryButton 
          title="Login" 
          loading={loading} 
          color={colors.primary} 
          onPress={handleLogin} 
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={[styles.registerLink, { color: colors.primary }]}> Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, marginBottom: 32 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14 },
  registerLink: { fontSize: 14, fontWeight: 'bold' }
});
