import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { _COLORS, _PHOTO_TILTS } from '../constants';
import type { IPhotoStackProps } from '../interfaces';

export default function PhotoStack({ photos }: IPhotoStackProps) {
  if (photos.length === 0) {
    return (
      <Pressable style={styles.addPhoto}>
        <Ionicons name="add" size={26} color={_COLORS.plum} />
      </Pressable>
    );
  }

  return (
    <View style={styles.stack}>
      {photos.map((uri, index) => (
        <View
          key={uri}
          style={[
            styles.frame,
            {
              marginLeft: index === 0 ? 0 : -14,
              zIndex: index,
              transform: [{ rotate: `${_PHOTO_TILTS[index % _PHOTO_TILTS.length]}deg` }],
            },
          ]}>
          <Image source={{ uri }} style={styles.photo} contentFit="cover" transition={200} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  addPhoto: {
    marginTop: 18,
    marginLeft: 4,
    width: 92,
    height: 118,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: _COLORS.plum,
    backgroundColor: _COLORS.plumSoft,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-5deg' }],
  },
  stack: {
    marginTop: 18,
    flexDirection: 'row',
    paddingLeft: 4,
  },
  frame: {
    width: 92,
    height: 118,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: _COLORS.background,
    backgroundColor: _COLORS.chip,
    boxShadow: '0px 6px 14px rgba(22, 21, 26, 0.14)',
  },
  photo: {
    flex: 1,
    borderRadius: 19,
  },
});
