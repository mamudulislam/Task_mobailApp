import Header from '@/components/Header';
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
  View
} from 'react-native';
import CustomInput from '../components/CustomInput';
import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const router = useRouter();
  const { colors } = useTheme();
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dev.bhcjobs.com';
  
  const [step, setStep] = useState<1 | 2>(1);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);
      formData.append('passport_number', passportNumber);
      formData.append('dob', dob);
      formData.append('gender', gender);

      const response = await fetch(`${API_URL}/api/job_seeker/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.status) {
        Alert.alert("Success", data.message || "OTP sent to your phone.");
        const exactOtp = data.data?.otp;
        if (exactOtp) setReceivedOtp(exactOtp.toString());
        setStep(2);
      } else {
        let errorMsg = data.message || "Failed to register.";
        if (data.error && typeof data.error === 'object') {
          const firstErrorKey = Object.keys(data.error)[0];
          errorMsg = data.error[firstErrorKey][0] || errorMsg;
        }
        Alert.alert("Registration Failed", errorMsg);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Validation Error", "Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('otp', otp);

      const response = await fetch(`${API_URL}/api/job_seeker/phone_verify`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.status) {
        Alert.alert("Verified", data.message || "Registration complete!");
        router.replace('/login');
      } else {
        Alert.alert("Verification Failed", data.message || "Invalid OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Header />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
            <View style={styles.headerTitleContainer}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={step === 1 ? "person-add" : "shield-checkmark"} size={24} color={colors.primary} />
              </View>
              <Text style={[styles.headerTitle, { color: colors.textMain }]}>
                {step === 1 ? 'Create Account' : 'Verify Phone'}
              </Text>
              <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
                {step === 1 ? 'Fill in your details to get started' : `Enter the OTP sent to ${phone}`}
              </Text>
            </View>

            {step === 1 ? (
              <>
                <CustomInput label="Full Name" colors={colors} placeholder="Your full name" value={name} onChangeText={setName} icon="person-outline" />
                <CustomInput label="Phone Number" colors={colors} placeholder="01XXXXXXXXX" keyboardType="phone-pad" value={phone} onChangeText={setPhone} icon="call-outline" />
                <CustomInput label="Email Address" colors={colors} placeholder="yourname@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} icon="mail-outline" />
                <View style={styles.row}>
                   <View style={{ flex: 1, marginRight: 10 }}>
                     <CustomInput label="Password" colors={colors} placeholder="******" secureTextEntry value={password} onChangeText={setPassword} icon="lock-closed-outline" />
                   </View>
                   <View style={{ flex: 1 }}>
                     <CustomInput label="Confirm" colors={colors} placeholder="******" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} icon="lock-closed-outline" />
                   </View>
                </View>
                <CustomInput label="Passport (Optional)" colors={colors} placeholder="AXXXXXXXX" value={passportNumber} onChangeText={setPassportNumber} icon="document-text-outline" />
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <CustomInput label="Date of Birth" colors={colors} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} icon="calendar-outline" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput label="Gender" colors={colors} placeholder="male/female" value={gender} onChangeText={setGender} icon="transgender-outline" />
                  </View>
                </View>

                <TouchableOpacity 
                  style={[styles.primaryButton, { backgroundColor: colors.primary }]} 
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>REGISTER</Text>}
                </TouchableOpacity>
                
                <View style={styles.footer}>
                  <Text style={[styles.footerText, { color: colors.textMuted }]}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {receivedOtp && (
                  <View style={[styles.devNote, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
                    <Text style={[styles.devNoteText, { color: colors.primary }]}>Task Hint: OTP is {receivedOtp}</Text>
                  </View>
                )}
                
                <CustomInput 
                  label="OTP Code" 
                  colors={colors} 
                  placeholder="Enter 6-digit code" 
                  keyboardType="number-pad" 
                  maxLength={6} 
                  value={otp} 
                  onChangeText={setOtp} 
                  style={styles.otpInput}
                />

                <TouchableOpacity 
                  style={[styles.primaryButton, { backgroundColor: colors.primary }]} 
                  onPress={handleVerify}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>VERIFY & JOIN</Text>}
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)} disabled={loading}>
                  <Text style={[styles.backButtonText, { color: colors.primary }]}>Back to Edit Info</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingVertical: 40, alignItems: 'center' },
  formContainer: { 
    width: 500, 
    maxWidth: '92%', 
    padding: 30, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  headerTitleContainer: { alignItems: 'center', marginBottom: 30 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { fontSize: 14, textAlign: 'center' },
  row: { flexDirection: 'row' },
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
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  backButton: { marginTop: 20, padding: 10, alignItems: 'center' },
  backButtonText: { fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { fontSize: 14 },
  linkText: { fontSize: 14, fontWeight: 'bold' },
  devNote: { padding: 15, borderRadius: 10, marginBottom: 25, borderWidth: 1, alignItems: 'center' },
  devNoteText: { fontSize: 14, fontWeight: '600' },
  otpInput: { textAlign: "center", fontSize: 24, letterSpacing: 5 }
});
