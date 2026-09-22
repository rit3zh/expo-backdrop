import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { _COLORS } from '../constants';
import type { IEventMetaProps } from '../interfaces';
import FeedText from './feed-text';

export default function EventMeta({ event }: IEventMetaProps) {
  return (
    <View style={styles.container}>
      <FeedText weight="medium" style={styles.text}>
        {event.when}
      </FeedText>
      <View style={styles.dot} />
      <FeedText weight="medium" style={styles.text}>
        {event.date}
      </FeedText>
      {event.location ? (
        <>
          <View style={styles.dot} />
          <View style={styles.locationChip}>
            <Ionicons name="location" size={12} color={_COLORS.pin} />
            <FeedText weight="bold" style={styles.locationText} numberOfLines={1}>
              {event.location}
            </FeedText>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  text: {
    fontSize: 13,
    color: _COLORS.muted,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: _COLORS.muted,
  },
  locationChip: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: _COLORS.chip,
  },
  locationText: {
    flexShrink: 1,
    fontSize: 12,
  },
});
