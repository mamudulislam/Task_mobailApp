import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IndustryCardProps {
  item: { name: string; jobs_count?: number; };
  colors: any;
}

export default function IndustryCard({ item, colors }: IndustryCardProps) {
  return (
    <View style={[styles.cardHorizontal, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.iconPlaceholder, { backgroundColor: colors.iconBg }]}>
        <Text style={[styles.iconText, { color: colors.primary }]}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: colors.textMain }]} numberOfLines={1}>{item.name}</Text>
      {item.jobs_count !== undefined && (
        <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>{item.jobs_count} Jobs</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardHorizontal: {
    width: 140,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    marginRight: 10,
    borderWidth: 1,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: { fontSize: 22, fontWeight: 'bold' },
  cardTitle: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  cardSubtitle: { fontSize: 12, marginTop: 4 },
});
