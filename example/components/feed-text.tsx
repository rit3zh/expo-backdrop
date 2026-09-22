import { StyleSheet, Text } from 'react-native';

import { _COLORS, _FONTS } from '../constants';
import type { IFeedTextProps } from '../interfaces';

export default function FeedText({ weight = 'regular', style, ...rest }: IFeedTextProps) {
  return <Text {...rest} style={[styles.text, style, { fontFamily: _FONTS[weight] }]} />;
}

export { FeedText };

const styles = StyleSheet.create({
  text: {
    color: _COLORS.text,
    fontWeight: 'normal',
    includeFontPadding: false,
  },
});
