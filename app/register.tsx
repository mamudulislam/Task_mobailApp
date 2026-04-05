import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';

export default function Register() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
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

  const colors = {
    bg: isDark ? '#121212' : '#f8f9fc',
    card: isDark ? '#1e1e1e' : '#fff',
    textMain: isDark ? '#ffffff' : '#111111',
    textMuted: isDark ? '#aaaaaa' : '#666666',
    primary: isDark ? '#3d8eee' : '#0056b3',
    border: isDark ? '#333333' : '#e1e5eb',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
    noteBg: isDark ? '#1e3323' : '#e6f4ea',
    noteBorder: isDark ? '#2e4c36' : '#cce8d6',
    noteText: isDark ? '#66de93' : '#137333',
  };

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill in the required fields.");
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
        Alert.alert("Registration Successful", data.message || "Please check the OTP.");
        const exactOtp = data.data?.otp;
        if (exactOtp) setReceivedOtp(exactOtp.toString());
        setStep(2);
      } else {
        let errorMsg = data.message || "Failed to register.";
        if (data.error && typeof data.error === 'object') {
          const firstErrorKey = Object.keys(data.error)[0];
          if (firstErrorKey && Array.isArray(data.error[firstErrorKey])) {
            errorMsg = data.error[firstErrorKey][0];
          } else if (typeof data.error === 'string') {
            errorMsg = data.error;
          }
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
        Alert.alert("Verification Successful", data.message || "Signed in successfully.");
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
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={[styles.headerTitle, { color: colors.textMain }]}>{step === 1 ? 'Create Account' : 'Verify Phone'}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            {step === 1 ? 'Join BhcJobs to find your next opportunity' : `We've sent an OTP to \n${phone}`}
          </Text>

          {step === 1 ? (
            <>
              <CustomInput label="Name" colors={colors} placeholder="test" value={name} onChangeText={setName} editable={!loading} />
              <CustomInput label="Phone Number" colors={colors} placeholder="01724171556" keyboardType="phone-pad" value={phone} onChangeText={setPhone} editable={!loading} />
              <CustomInput label="Email" colors={colors} placeholder="test@gmil.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} editable={!loading} />
              <CustomInput label="Password" colors={colors} placeholder="111111" secureTextEntry value={password} onChangeText={setPassword} editable={!loading} />
              <CustomInput label="Confirm Password" colors={colors} placeholder="111111" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} editable={!loading} />
              <CustomInput label="Passport Number (Optional)" colors={colors} placeholder="A12345674" value={passportNumber} onChangeText={setPassportNumber} editable={!loading} />
              <CustomInput label="Date of Birth" colors={colors} placeholder="2002-12-12" value={dob} onChangeText={setDob} editable={!loading} />
              <CustomInput label="Gender" colors={colors} placeholder="male or female" autoCapitalize="none" value={gender} onChangeText={setGender} editable={!loading} />

              <PrimaryButton title="Register" loading={loading} color={colors.primary} onPress={handleRegister} />
              
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.textMuted }]}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={[styles.linkText, { color: colors.primary }]}> Login here</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {receivedOtp && (
                <View style={[styles.devNote, { backgroundColor: colors.noteBg, borderColor: colors.noteBorder }]}>
                  <Text style={[styles.devNoteText, { color: colors.noteText }]}>Task Hint: Received OTP is {receivedOtp}</Text>
                </View>
              )}
              
              <CustomInput label="OTP Code" colors={colors} placeholder="Enter OTP" keyboardType="number-pad" maxLength={6} value={otp} onChangeText={setOtp} editable={!loading} style={{ textAlign: "center", fontSize: 24, borderWidth: 1, padding: 14, borderRadius: 8, color: colors.textMain, backgroundColor: colors.inputBg, borderColor: colors.border }} />

              <PrimaryButton title="Verify & Complete" loading={loading} color={colors.primary} onPress={handleVerify} />
              
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(1)} disabled={loading}>
                <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Go Back</Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingVertical: 20 },
  formContainer: { padding: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, marginBottom: 32, lineHeight: 24 },
  secondaryButton: { marginTop: 15, padding: 16, alignItems: 'center' },
  secondaryButtonText: { fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14 },
  linkText: { fontSize: 14, fontWeight: 'bold' },
  devNote: { padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1 },
  devNoteText: { fontSize: 14, fontWeight: '500', textAlign: 'center' }
});
