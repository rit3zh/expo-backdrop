import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  FadeIn,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { HourData } from '../constants/mock';
import { _COLORS, _RADIUS } from '../constants/theme';

interface IHoursList {
  hours: HourData[];
}

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

function summarise(today?: HourData) {
  if (!today || !today.opens || !today.closes) {
    return { open: false, label: 'Closed today' };
  }

  return {
    open: true,
    label: `Open now · until ${today.closes}`,
  };
}

export default function HoursList({ hours }: IHoursList) {
  const [expanded, setExpanded] = useState(false);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(expanded ? 1 : 0);
  }, [expanded]);

  const today = hours.find((entry) => entry.today);
  const summary = summarise(today);

  const listStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      maxHeight: interpolate(progress.value, [0, 1], [0, hours.length * 42], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [-8, 0]),
        },
      ],
    };
  });

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View layout={LinearTransition.duration(250)}>
      <Pressable onPress={() => setExpanded((v) => !v)} style={[styles.summary]}>
        <Ionicons name="time-outline" size={19} color={_COLORS.muted} />

        <AppText variant="medium" style={styles.summaryLabel}>
          {summary.label}
        </AppText>

        <AnimatedIonicons
          style={chevronStyle}
          name="chevron-down"
          size={16}
          color={_COLORS.muted}
        />
      </Pressable>

      <Animated.View style={[styles.listContainer, listStyle]}>
        <Animated.View entering={FadeIn.duration(180)} style={styles.list}>
          {hours.map((entry) => {
            const closed = !entry.opens || !entry.closes;

            return (
              <View key={entry.day} style={styles.row}>
                <AppText style={[styles.day, !entry.today && styles.dim]}>{entry.day}</AppText>

                <AppText
                  style={[styles.hours, !entry.today && styles.dim, closed && styles.closed]}>
                  {closed ? 'Closed' : `${entry.opens} – ${entry.closes}`}
                </AppText>
              </View>
            );
          })}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: _RADIUS.item,
    backgroundColor: _COLORS.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 15,
  },
  listContainer: {
    overflow: 'hidden',
  },
  list: {
    paddingTop: 14,
    paddingHorizontal: 14,
    gap: 11,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    fontSize: 15,
  },
  hours: {
    fontSize: 15,
  },
  dim: {
    color: _COLORS.muted,
  },
  closed: {
    color: _COLORS.closed,
  },
});
