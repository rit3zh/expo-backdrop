import { ProgressiveBlurView } from 'expo-backdrop';
import { StyleSheet, View } from 'react-native';

import { _BLUR_INTENSITY, _COLORS } from '../constants';
import { useFeedLayout } from '../hooks';
import CreateEventButton from './create-event-button';

export default function FeedFooter() {
  const { bottomInset, footerHeight } = useFeedLayout();

  return (
    <>
      <ProgressiveBlurView
        edge="bottom"
        intensity={_BLUR_INTENSITY}
        tintColor={_COLORS.footerBlurTint}
        style={[styles.blur, { height: footerHeight }]}
      />
      <View style={[styles.buttonWrap, { bottom: bottomInset + 18 }]} pointerEvents="box-none">
        <CreateEventButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  buttonWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
