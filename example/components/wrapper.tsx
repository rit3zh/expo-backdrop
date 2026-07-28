import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { _GUTTER } from '../constants/theme';

interface IWrapper {
  children: React.ReactNode;
}

export default function Wrapper(props: IWrapper) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top * 0.4,
          paddingHorizontal: _GUTTER,
        },
      ]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
