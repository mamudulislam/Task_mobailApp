import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface IndustryCardProps {
  item: { name: string; image?: string; jobs_count?: number; };
  colors: any;
}

export default function IndustryCard({ item, colors }: IndustryCardProps) {
  const imageUrl = item.image ? { uri: item.image } : null;

  return (
    <View style={[styles.cardHorizontal, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.imageContainer, { backgroundColor: colors.iconBg }]}>
        {imageUrl ? (
          <Image source={imageUrl} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={[styles.iconText, { color: colors.primary }]}>{item.name.charAt(0)}</Text>
        )}
      </View>
      <Text style={[styles.cardTitle, { color: colors.textMain }]} numberOfLines={1}>{item.name}</Text>
      <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
        <Text style={[styles.cardSubtitle, { color: colors.primary }]}>{item.jobs_count || 0} Jobs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHorizontal: {
    width: 140,
    padding: 15,
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
  imageContainer: {
    width: 54,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden'
  },
  image: {
    width: '70%',
    height: '70%',
  },
  iconText: { fontSize: 24, fontWeight: 'bold' },
  cardTitle: { fontSize: 15, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cardSubtitle: { fontSize: 11, fontWeight: '600' },
});
