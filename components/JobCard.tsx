import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface JobCardProps {
  job: { 
    title: string; 
    company_name: string; 
    location: string; 
    type?: string; 
    company_logo?: string; 
    salary?: string; 
    deadline?: string; 
  };
  colors: any;
}

export default function JobCard({ job, colors }: JobCardProps) {
  const logoUrl = job.company_logo ? { uri: job.company_logo } : null;

  return (
    <View style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.topSection}>
        <View style={[styles.logoContainer, { backgroundColor: colors.iconBg }]}>
          {logoUrl ? (
            <Image source={logoUrl} style={styles.logo} resizeMode="contain" />
          ) : (
            <Ionicons name="briefcase" size={24} color={colors.primary} />
          )}
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.jobTitle, { color: colors.textMain }]} numberOfLines={1}>{job.title || "Job Title"}</Text>
          <Text style={[styles.jobCompany, { color: colors.textMuted }]}>{job.company_name || "Company"}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: colors.primary + '10' }]}>
          <Text style={[styles.jobType, { color: colors.primary }]}>
            {job.type || "Full Time"}
          </Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={[styles.detailText, { color: colors.textMuted }]} numberOfLines={1}>{job.location || "Location"}</Text>
        </View>
        {job.salary && (
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={14} color={colors.textMuted} />
            <Text style={[styles.detailText, { color: colors.textMuted }]}>{job.salary}</Text>
          </View>
        )}
        {job.deadline && (
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
            <Text style={[styles.detailText, { color: colors.textMuted }]}>{job.deadline}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.applyBtn, { backgroundColor: colors.primary }]}>
          <Text style={styles.applyBtnText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  jobCard: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },
  logo: { width: '80%', height: '80%' },
  headerText: { flex: 1 },
  jobTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 2 },
  jobCompany: { fontSize: 13, fontWeight: '500' },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  jobType: { fontSize: 11, fontWeight: '700' },
  
  detailsSection: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    paddingTop: 15
  },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 12, marginLeft: 5 },
  
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  applyBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});
