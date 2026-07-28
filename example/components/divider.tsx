import { View, StyleSheet } from 'react-native';
import React from 'react';
import { _COLORS } from '../constants/theme';

export default function Divider() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: _COLORS.hairline,
    marginVertical: 26,
  },
});
