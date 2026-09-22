import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { _COLORS, _GUTTER } from '../constants';
import type { IEventCardProps } from '../interfaces';
import EventMeta from './event-meta';
import FeedText from './feed-text';
import PhotoStack from './photo-stack';
import Stat from './stat';

export default function EventCard({ event }: IEventCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FeedText weight="bold" style={styles.title} numberOfLines={1}>
          {event.title}
        </FeedText>
        <Pressable hitSlop={10} style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={16} color={_COLORS.text} />
        </Pressable>
      </View>

      <FeedText style={styles.subtitle} numberOfLines={1}>
        {event.subtitle}
      </FeedText>

      <EventMeta event={event} />

      <PhotoStack photos={event.photos} />

      <View style={styles.stats}>
        <Stat icon="chatbubble">{event.comments}</Stat>
        <Stat icon="people">{event.guests}</Stat>
        <Stat icon="share-outline">Share Invite</Stat>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: _GUTTER,
    paddingVertical: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    letterSpacing: -0.3,
  },
  moreButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: _COLORS.soft,
  },
  stats: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
