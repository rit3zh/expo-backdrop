import { ScrollView, StyleSheet } from 'react-native';

import { _GUTTER } from '../constants';
import type { IStoryRowProps } from '../interfaces';
import StoryBubble from './story-bubble';
import { isAndroid } from '../constants/platform.constant';

export default function StoryRow({ stories }: IStoryRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {stories.map((story) => (
        <StoryBubble key={story.id} story={story} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: _GUTTER,
    gap: 14,
    paddingTop: isAndroid ? 8 : 6,
    paddingBottom: 10,
  },
});
