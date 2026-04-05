import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Animated,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Reusable Components
import JobCard from '../components/JobCard';
import IndustryCard from '../components/IndustryCard';
import CompanyCard from '../components/CompanyCard';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

interface Industry { id: number; name: string; image: string; jobs_count?: number; }
interface Job { id: number; title: string; company_name: string; location: string; type?: string; company_logo?: string; salary?: string; deadline?: string; }
interface Company { id: number; name: string; logo: string; }

export default function Index() {
  const router = useRouter();
  const { isDark, colors } = useTheme();
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dev.bhcjobs.com';
  
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'title' | 'company' | 'location'>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    setSearchLoading(true);
    try {
      const params = new URLSearchParams({
        keyword: query,
        ...(searchType !== 'all' && { type: searchType }),
      });
      
      const response = await fetch(`${API_URL}/api/job/search?${params}`);
      const data = await response.json();
      const searchResults = data.data?.data || data.data || [];
      setFilteredJobs(searchResults);
    } catch (error) {
      const filtered = jobs.filter(job => 
        (job.title || '').toLowerCase().includes(query.toLowerCase()) ||
        (job.company_name || '').toLowerCase().includes(query.toLowerCase()) ||
        (job.location || '').toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    performSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredJobs(jobs);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
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
        const allJobs = jobData.data?.data || jobData.data || [];
        setJobs(allJobs);
        setFilteredJobs(allJobs);
        setCompanies(compData.data?.data || compData.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fadeAnim, slideAnim]);

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
      <Header />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={[styles.heroBanner, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroTitle}>Find Your Dream Job Today</Text>
          <Text style={styles.heroSubtitle}>Browse thousands of jobs from leading companies and take the next step in your career.</Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Job title, keywords, or company"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.searchButton, { backgroundColor: colors.primary }]} 
              onPress={handleSearchSubmit}
              disabled={searchLoading}
            >
              {searchLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.searchButtonText}>Search</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textMain }]}>Popular Industries</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
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
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textMain }]}>Top Companies</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
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

      <View style={[styles.sectionHeader, { marginTop: 30, marginBottom: 5 }]}>
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>Recommended Jobs</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
        </TouchableOpacity>
      </View>
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
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJob}
        ListHeaderComponent={RenderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={60} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No jobs available right now.
            </Text>
          </View>
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
  
  heroBanner: {
    padding: 30,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  heroSubtitle: { color: '#e0f0ff', fontSize: 14, marginBottom: 25, textAlign: 'center', lineHeight: 20 },
  
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 55,
  },
  searchIcon: { marginRight: 10 },
  clearButton: { padding: 5, marginRight: 5 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, color: '#333' },
  searchButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  section: { marginTop: 30 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  listPadding: { paddingHorizontal: 15, gap: 12 },
  
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 50, 
    paddingHorizontal: 40 
  },
  emptyText: { 
    marginTop: 15, 
    fontSize: 16, 
    textAlign: 'center', 
    fontStyle: 'italic' 
  },
});
