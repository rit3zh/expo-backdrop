import { ProgressiveBlurView } from 'expo-backdrop';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { _BLUR_INTENSITY, _BLUR_START_OFFSET, _GUTTER, _PROFILE_IMAGE_URL } from '../constants';
import { useFeedLayout } from '../hooks';
import FeedText from './feed-text';
import GlassButton from './glass-button';

export default function FeedHeader() {
  const { topInset, headerHeight } = useFeedLayout();

  return (
    <>
      <ProgressiveBlurView
        edge="top"
        intensity={_BLUR_INTENSITY}
        startOffset={_BLUR_START_OFFSET}
        style={[styles.blur, { height: headerHeight + 28 }]}
      />
      <View style={[styles.header, { paddingTop: topInset, height: headerHeight }]}>
        <Image source={{ uri: _PROFILE_IMAGE_URL }} style={styles.logo} contentFit="cover" />
        <FeedText weight="medium" style={styles.title} numberOfLines={1}>
          What’s your next event?
        </FeedText>
        <GlassButton icon="search" />
        <GlassButton icon="notifications" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: _GUTTER,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  title: {
    flex: 1,
    fontSize: 17,
  },
});
