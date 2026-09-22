import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { _COLORS } from '../constants';
import type { IStoryBubbleProps } from '../interfaces';
import FeedText from './feed-text';

export default function StoryBubble({ story }: IStoryBubbleProps) {
  const ringColor = story.isOwn ? 'transparent' : story.seen ? _COLORS.hairline : _COLORS.plum;

  return (
    <View style={styles.container}>
      <View style={[styles.ring, { borderColor: ringColor }]}>
        <Image source={{ uri: story.imageURL }} style={styles.image} contentFit="cover" />
        {story.isOwn && (
          <View style={styles.badge}>
            <Ionicons name="add" size={13} color={_COLORS.white} />
          </View>
        )}
      </View>
      <FeedText weight="medium" style={styles.label} numberOfLines={1}>
        {story.label}
      </FeedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72,
    alignItems: 'center',
    gap: 6,
  },
  ring: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    padding: 3,
  },
  image: {
    flex: 1,
    borderRadius: 999,
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: _COLORS.background,
    backgroundColor: _COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: _COLORS.soft,
  },
});
