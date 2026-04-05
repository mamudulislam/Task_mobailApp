import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CompanyCardProps {
  item: { name: string; logo?: string; };
  colors: any;
  isDark: boolean;
}

export default function CompanyCard({ item, colors, isDark }: CompanyCardProps) {
  const logoUrl = item.logo ? { uri: item.logo } : null;

  return (
    <View style={[styles.companyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
       <View style={[styles.logoContainer, { backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa' }]}>
         {logoUrl ? (
           <Image source={logoUrl} style={styles.logo} resizeMode="contain" />
         ) : (
           <Text style={[styles.iconText, { color: colors.primary }]}>{item.name?.charAt(0)}</Text>
         )}
       </View>
       <Text style={[styles.companyName, { color: colors.textMain }]} numberOfLines={1}>{item.name || "Company"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  companyCard: {
    width: 110,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    marginRight: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  iconText: { fontSize: 22, fontWeight: 'bold' },
  companyName: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
});
