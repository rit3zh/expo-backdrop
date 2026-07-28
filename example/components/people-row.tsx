import { View, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import AppText from './app-text';
import { PersonData } from '../constants/mock';
import { _COLORS, _GUTTER, _RADIUS } from '../constants/theme';

const _AVATAR_SIZE = 58;

interface IPeopleRow {
  people: PersonData[];
}

export default function PeopleRow({ people }: IPeopleRow) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bleed}
        contentContainerStyle={styles.track}>
        {people.map((person) => (
          <View key={person.id} style={styles.person}>
            <Image source={{ uri: person.avatarURL }} style={styles.avatar} transition={200} />
            <AppText style={styles.name} numberOfLines={1}>
              {person.name}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bleed: {
    marginHorizontal: -_GUTTER,
  },
  track: {
    gap: 18,
    paddingHorizontal: _GUTTER,
  },
  person: {
    width: _AVATAR_SIZE,
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: _AVATAR_SIZE,
    height: _AVATAR_SIZE,
    borderRadius: _RADIUS.pill,
    backgroundColor: _COLORS.hairline,
  },
  name: {
    fontSize: 12,
    color: _COLORS.muted,
  },
});
