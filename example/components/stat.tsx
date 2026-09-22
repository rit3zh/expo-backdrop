import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { _COLORS } from '../constants';
import type { IStatProps } from '../interfaces';
import { FeedText } from './feed-text';

export default function Stat({ icon, children }: IStatProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={16} color={_COLORS.soft} />
      <FeedText weight="medium" style={styles.label}>
        {children}
      </FeedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: _COLORS.soft,
  },
});
