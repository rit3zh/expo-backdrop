import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { _width } from '../constants/dimensions';

const _DOT_SIZE = 7;
const _DOT_GAP = 5;
const _DOT_SLOT = _DOT_SIZE + _DOT_GAP / 2;
const _VISIBLE_DOTS = 3;

interface IHeaderPagination<T> {
  items: T[];
  scrollX: SharedValue<number>;
}

function shiftFor(page: number, count: number) {
  'worklet';
  const maxShift = Math.max(0, count - _VISIBLE_DOTS);
  return Math.min(Math.max(page - (_VISIBLE_DOTS - 1) / 2, 0), maxShift);
}

function Dot({
  index,
  scrollX,
  count,
}: {
  index: number;
  scrollX: SharedValue<number>;
  count: number;
}) {
  const style = useAnimatedStyle(() => {
    const page = scrollX.value / _width;
    const slot = index - shiftFor(page, count);
    const edge = Math.max(0, Math.max(-slot, slot - (_VISIBLE_DOTS - 1)));
    const active = interpolate(Math.abs(index - page), [0, 1], [1, 0], Extrapolation.CLAMP);

    return {
      opacity:
        interpolate(edge, [0, 1, 2], [1, 0.9, 0], Extrapolation.CLAMP) * (0.45 + 0.55 * active),
      transform: [{ scale: interpolate(edge, [0, 1, 2], [1, 0.6, 0.3], Extrapolation.CLAMP) }],
    };
  });

  return <Animated.View style={[styles.dot, style]} />;
}

export default function HeaderPagination<T>(props: IHeaderPagination<T>) {
  const count = props.items?.length ?? 0;

  const trackStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -shiftFor(props.scrollX.value / _width, count) * _DOT_SLOT }],
  }));

  if (count === 0) return null;

  return (
    <View style={[styles.container]}>
      <View style={styles.pill}>
        <View style={[styles.mask, { width: Math.min(count, _VISIBLE_DOTS + 2) * _DOT_SLOT }]}>
          <Animated.View style={[styles.track, trackStyle]}>
            {props.items.map((_, index) => (
              <Dot key={index} index={index} scrollX={props.scrollX} count={count} />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 22,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  pill: {
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: '#0000002E',
  },
  mask: {
    height: _DOT_SIZE,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: _DOT_SIZE,
    height: _DOT_SIZE,
    borderRadius: _DOT_SIZE / 2,
    marginHorizontal: _DOT_GAP / 2,
    backgroundColor: '#fff',
  },
});
