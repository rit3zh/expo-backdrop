import { Ionicons } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Pressable, StyleSheet } from 'react-native';

import { _COLORS, _FAB_HEIGHT } from '../constants';
import FeedText from './feed-text';

// Android (and iOS < 26) render GlassView as a plain view, so fall back to a solid pill.
const _HAS_GLASS = isLiquidGlassAvailable();

export default function CreateEventButton() {
  return (
    <Pressable>
      <GlassView
        style={[styles.button, !_HAS_GLASS && styles.fallback]}
        glassEffectStyle="clear"
        tintColor={_COLORS.fabTint}
        isInteractive>
        <Ionicons name="add" size={20} color={_COLORS.white} />
        <FeedText weight="medium" style={styles.label}>
          Create New Event
        </FeedText>
      </GlassView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: _FAB_HEIGHT,
    paddingHorizontal: 26,
    borderRadius: _FAB_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fallback: {
    backgroundColor: _COLORS.btn,
    overflow: 'hidden',
    elevation: 6,
    borderRadius: 999,
  },
  label: {
    fontSize: 16,
    color: _COLORS.white,
  },
});
