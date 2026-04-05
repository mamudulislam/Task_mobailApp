import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Animated,
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

// Reusable Components
import JobCard from '../components/JobCard';
import IndustryCard from '../components/IndustryCard';
import CompanyCard from '../components/CompanyCard';

interface Industry { id: number; name: string; image: string; jobs_count?: number; }
interface Job { id: number; title: string; company_name: string; location: string; type?: string; }
interface Company { id: number; name: string; logo: string; }

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dev.bhcjobs.com';
  
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
    ]).start();

    const fetchData = async () => {
      try {
        const [indRes, jobRes, compRes] = await Promise.all([
          fetch(`${API_URL}/api/industry/get`),
          fetch(`${API_URL}/api/job/get`),
          fetch(`${API_URL}/api/company/get`),
        ]);
        
        const indData = await indRes.json();
        const jobData = await jobRes.json();
        const compData = await compRes.json();

        setIndustries(indData.data || []);
        setJobs(jobData.data?.data || jobData.data || []); 
        setCompanies(compData.data?.data || compData.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fadeAnim, slideAnim]);

  // Theming Colors
  const colors = {
    bg: isDark ? '#121212' : '#f8f9fc',
    card: isDark ? '#1e1e1e' : '#fff',
    textMain: isDark ? '#ffffff' : '#111111',
    textMuted: isDark ? '#aaaaaa' : '#666666',
    primary: isDark ? '#3d8eee' : '#0056b3',
    headerBg: isDark ? '#1e1e1e' : '#ffffff',
    iconBg: isDark ? '#233342' : '#e6f0fa',
    border: isDark ? '#333333' : '#eeeeee'
  };

  const renderIndustry = useCallback(({ item }: { item: Industry }) => (
    <IndustryCard item={item} colors={colors} />
  ), [colors]);

  const renderCompany = useCallback(({ item }: { item: Company }) => (
    <CompanyCard item={item} colors={colors} isDark={isDark} />
  ), [colors, isDark]);

  const renderJob = useCallback(({ item }: { item: Job }) => (
    <JobCard job={item} colors={colors} />
  ), [colors]);

  const RenderHeader = () => (
    <>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.logoText, { color: colors.primary }]}>BhcJobs</Text>
        <View style={styles.authButtons}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/login')}>
            <Text style={[styles.loginText, { color: colors.primary }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.registerBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/register')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={[styles.heroBanner, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroTitle}>Find Your Dream Job</Text>
          <Text style={styles.heroSubtitle}>Explore opportunities from top companies</Text>
        </View>
      </Animated.View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>Popular Industries</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={industries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderIndustry}
          contentContainerStyle={styles.listPadding}
          initialNumToRender={5}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>Top Companies</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={companies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCompany}
          contentContainerStyle={styles.listPadding}
          initialNumToRender={5}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.textMain, marginTop: 25 }]}>Recommended Jobs</Text>
    </>
  );

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <FlatList 
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJob}
        ListHeaderComponent={RenderHeader}
        ListEmptyComponent={
          <Text style={{ paddingHorizontal: 20, color: colors.textMuted, fontStyle: 'italic' }}>
            No jobs available right now.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
        initialNumToRender={8}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  logoText: { fontSize: 22, fontWeight: 'bold' },
  authButtons: { flexDirection: 'row', gap: 10 },
  loginBtn: { paddingVertical: 8, paddingHorizontal: 15 },
  loginText: { fontWeight: '600' },
  registerBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  registerText: { color: '#fff', fontWeight: 'bold' },

  heroBanner: {
    padding: 30,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
  },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  heroSubtitle: { color: '#e0f0ff', fontSize: 14 },

  section: { marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, paddingHorizontal: 20 },
  listPadding: { paddingHorizontal: 15, gap: 12 },
});
