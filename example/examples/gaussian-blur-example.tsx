import { GaussianBlurView, IGaussianBlurViewProps } from 'expo-backdrop';
import { SymbolView } from 'expo-symbols';
import { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { _COLORS } from '../constants/theme';

const AnimatedGaussianBlurView = Animated.createAnimatedComponent(GaussianBlurView);
export default function App() {
  const progress = useSharedValue<number>(0);
  const onPress = useCallback(() => {
    progress.value = withSpring(progress.value === 1 ? 0 : 1);
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(interpolate(progress.value, [0, 1], [0, 50])),
        },
        {
          scale: interpolate(progress.value, [0, 1], [1, 0.5]),
        },
      ],
      opacity: withSpring(interpolate(progress.value, [0, 1], [1, 0])),
    };
  });
  const animatedBlurPropz = useAnimatedProps<Pick<IGaussianBlurViewProps, 'blurRadius'>>(() => {
    return {
      blurRadius: interpolate(progress.value, [0, 1], [0, 12]),
    };
  });
  return (
    <SafeAreaProvider style={styles.root}>
      {/* <PlaceScreen /> */}
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            animatedStyles,
            {
              paddingBottom: 120,
            },
          ]}>
          <AnimatedGaussianBlurView animatedProps={animatedBlurPropz}>
            <SymbolView name={'moon.zzz.fill'} size={100} tintColor={'white'} />
          </AnimatedGaussianBlurView>
        </Animated.View>
        <Button title="Animate" onPress={onPress} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _COLORS.background,
  },
});
