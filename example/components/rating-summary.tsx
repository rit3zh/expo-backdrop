import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { _COLORS, _RADIUS } from '../constants/theme';

interface IRatingSummary {
  rating: number;
  count: number;
  distribution: number[];
}

export default function RatingSummary({ rating, count, distribution }: IRatingSummary) {
  return (
    <View style={styles.card}>
      <View style={styles.score}>
        <AppText variant="medium" style={styles.number}>
          {rating.toFixed(1)}
        </AppText>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((step) => (
            <Ionicons
              key={step}
              name={step <= Math.round(rating) ? 'star' : 'star-outline'}
              size={12}
              color={_COLORS.accent}
            />
          ))}
        </View>
        <AppText style={styles.count}>{count} reviews</AppText>
      </View>

      <View style={styles.bars}>
        {distribution.map((share, index) => (
          <View key={index} style={styles.barRow}>
            <AppText style={styles.barLabel}>{5 - index}</AppText>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${Math.round(share * 100)}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    padding: 16,
    borderRadius: _RADIUS.item,
    backgroundColor: _COLORS.surface,
  },
  score: {
    alignItems: 'center',
    gap: 5,
  },
  number: {
    fontSize: 32,
    lineHeight: 36,
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  count: {
    fontSize: 11,
    color: _COLORS.muted,
  },
  bars: {
    flex: 1,
    gap: 6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barLabel: {
    fontSize: 11,
    width: 8,
    color: _COLORS.muted,
  },
  barTrack: {
    flex: 1,
    height: 4,
    borderRadius: _RADIUS.pill,
    backgroundColor: _COLORS.hairline,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: _RADIUS.pill,
    backgroundColor: _COLORS.accent,
  },
});
