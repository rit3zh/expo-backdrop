import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { StarIcon } from './star-icon';
import { _COLORS } from '../constants/theme';
interface IHeadingLabel {
  children: React.ReactNode;
}
export default function HeadingTitle(props: IHeadingLabel) {
  const [fontLoaded] = useFonts({
    Riccione: require('../assets/fonts/riccione/light.ttf'),
  });
  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.title,
          {
            fontFamily: fontLoaded ? 'Riccione' : undefined,
          },
        ]}>
        {props.children}
      </Text>
      <StarIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 40,
    color: _COLORS.text,
  },
});
