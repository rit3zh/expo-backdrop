import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { AmenityData } from '../constants/mock';
import { _COLORS } from '../constants/theme';

interface IAmenityGrid {
  amenities: AmenityData[];
}

export default function AmenityGrid({ amenities }: IAmenityGrid) {
  return (
    <View style={styles.grid}>
      {amenities.map((amenity) => (
        <View key={amenity.label} style={styles.item}>
          <Ionicons name={amenity.icon} size={18} color={_COLORS.muted} />
          <AppText style={styles.label} numberOfLines={1}>
            {amenity.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
  },
  /** two per line, so labels stay on one row */
  item: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: _COLORS.text,
  },
});
