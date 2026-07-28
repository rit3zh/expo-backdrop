import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import AppText from './app-text';
import { NearbyData } from '../constants/mock';
import { _COLORS, _GUTTER, _RADIUS } from '../constants/theme';

const _CARD_WIDTH = 148;

interface INearbyRow {
  places: NearbyData[];
}

export default function NearbyRow({ places }: INearbyRow) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bleed}
      contentContainerStyle={styles.track}>
      {places.map((place) => (
        <Pressable key={place.id} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
          <Image source={{ uri: place.imageURL }} style={styles.image} transition={200} />
          <View style={styles.caption}>
            <AppText variant="medium" style={styles.name} numberOfLines={1}>
              {place.name}
            </AppText>
            <AppText style={styles.meta} numberOfLines={1}>
              {place.category} · {place.distance}
            </AppText>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bleed: {
    marginHorizontal: -_GUTTER,
  },
  track: {
    gap: 12,
    paddingHorizontal: _GUTTER,
  },
  card: {
    width: _CARD_WIDTH,
    gap: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: _CARD_WIDTH,
    height: _CARD_WIDTH * 0.78,
    borderRadius: _RADIUS.item,
    backgroundColor: _COLORS.hairline,
  },
  caption: {
    gap: 2,
  },
  name: {
    fontSize: 15,
  },
  meta: {
    fontSize: 12,
    color: _COLORS.muted,
  },
});
