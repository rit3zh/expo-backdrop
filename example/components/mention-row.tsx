import { View, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppText from './app-text';
import { _COLORS } from '../constants/theme';

interface IMentionRow {
  label: string;
  detail?: string;
}

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export default function MentionRow({ label, detail }: IMentionRow) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withTiming(expanded ? 1 : 0);
  }, [expanded]);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  const detailStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      maxHeight: interpolate(progress.value, [0, 1], [0, 100], Extrapolation.CLAMP),
    };
  });

  return (
    <Pressable onPress={() => setExpanded((v) => !v)}>
      <View style={styles.row}>
        <Ionicons name="ribbon-outline" size={22} color={_COLORS.accent} />

        <AppText style={styles.label} numberOfLines={expanded ? undefined : 1} ellipsizeMode="tail">
          {label}
        </AppText>

        <AnimatedIonicons
          style={chevronStyle}
          name="chevron-down"
          size={18}
          color={_COLORS.muted}
        />
      </View>

      <Animated.View style={[styles.detailContainer, detailStyle]}>
        <AppText style={styles.detail}>{detail}</AppText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    flex: 1,
  },
  detailContainer: {
    overflow: 'hidden',
  },
  detail: {
    color: _COLORS.muted,
    paddingTop: 8,
    paddingLeft: 32,
  },
});
