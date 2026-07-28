import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { _height } from '../constants/dimensions';

const ICON_SIZE: number = 20;
const _ICON_COLOR: string = `#e4e3e3`;
export default function HeaderNav() {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-back" size={ICON_SIZE} color={_ICON_COLOR} />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="bookmark-outline" size={ICON_SIZE} color={_ICON_COLOR} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: _height * 0.16,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    // paddingTop: ICON_SIZE * 4.5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#000000ba',
    justifyContent: 'center',

    borderRadius: 99,
    alignItems: 'center',
  },
});
