import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JobCardProps {
  job: { title: string; company_name: string; location: string; type?: string; };
  colors: any;
}

export default function JobCard({ job, colors }: JobCardProps) {
  return (
    <View style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, { color: colors.textMain }]}>{job.title || "Job Title"}</Text>
        <Text style={[styles.jobType, { color: colors.primary, backgroundColor: colors.iconBg }]}>
          {job.type || "Full Time"}
        </Text>
      </View>
      <Text style={[styles.jobCompany, { color: colors.textMuted }]}>{job.company_name || "Company"}</Text>
      <Text style={[styles.jobLocation, { color: colors.textMuted }]}>📍 {job.location || "Location"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  jobCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 12,
    elevation: 1,
    borderWidth: 1,
  },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', flex: 1, paddingRight: 10 },
  jobType: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden' },
  jobCompany: { fontSize: 14, marginBottom: 8 },
  jobLocation: { fontSize: 13 },
});
