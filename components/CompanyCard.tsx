import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CompanyCardProps {
  item: { name: string; };
  colors: any;
  isDark: boolean;
}

export default function CompanyCard({ item, colors, isDark }: CompanyCardProps) {
  return (
    <View style={[styles.companyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
       <View style={[styles.circlePlaceholder, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
         <Text style={[styles.iconText, { color: colors.primary }]}>{item.name?.charAt(0)}</Text>
       </View>
       <Text style={[styles.companyName, { color: colors.textMain }]} numberOfLines={1}>{item.name || "Company"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  companyCard: {
    width: 110,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    marginRight: 10,
    borderWidth: 1
  },
  circlePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: { fontSize: 22, fontWeight: 'bold' },
  companyName: { fontSize: 13, fontWeight: '500', textAlign: 'center' },
});
