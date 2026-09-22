import { Ionicons } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Pressable, StyleSheet } from 'react-native';

import { _COLORS } from '../constants';
import type { IGlassButtonProps } from '../interfaces';

// Android (and iOS < 26) render GlassView as a plain view, so give it a solid chip instead.
const _HAS_GLASS = isLiquidGlassAvailable();

export default function GlassButton({ icon }: IGlassButtonProps) {
  return (
    <Pressable hitSlop={6}>
      <GlassView style={[styles.button, !_HAS_GLASS && styles.fallback]} isInteractive glassEffectStyle="clear">
        <Ionicons name={icon} size={18} color={_COLORS.text} />
      </GlassView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    backgroundColor: _COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },
});
