import { Text, TextProps, StyleSheet } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { _COLORS } from '../constants/theme';

type Variant = 'body' | 'medium' | 'label' | 'caption';

interface IAppText extends TextProps {
  variant?: Variant;
  children: React.ReactNode;
}

export default function AppText({ variant = 'body', style, ...rest }: IAppText) {
  const [fontLoaded] = useFonts({
    SfProMedium: require('../assets/fonts/sf-pro-rounded/medium.otf'),
    SfProRegular: require('../assets/fonts/sf-pro-rounded/regular.otf'),
  });

  const family = !fontLoaded
    ? undefined
    : variant === 'medium' || variant === 'label'
      ? 'SfProMedium'
      : 'SfProRegular';

  return <Text {...rest} style={[styles.base, styles[variant], { fontFamily: family }, style]} />;
}

const styles = StyleSheet.create({
  base: {
    color: _COLORS.text,
  },
  body: {
    fontSize: 16,
    lineHeight: 23,
  },
  medium: {
    fontSize: 16,
    lineHeight: 23,
  },
  /** small all-caps section headers */
  label: {
    fontSize: 13,
    // textTransform: 'uppercase',
    color: _COLORS.muted,
  },
  caption: {
    fontSize: 13,
    color: _COLORS.muted,
  },
});
