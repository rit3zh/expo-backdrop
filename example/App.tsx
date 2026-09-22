import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { EventCard, FeedFooter, FeedHeader, StoryRow } from './components';
import { _COLORS, _EVENTS, _FONT_SOURCES, _GUTTER, _STORIES } from './constants';
import { useFeedLayout } from './hooks';

function Feed() {
  const { headerHeight, footerHeight } = useFeedLayout();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: headerHeight + 8, paddingBottom: footerHeight + 12 }}>
        <StoryRow stories={_STORIES} />

        {_EVENTS.map((event, index) => (
          <View key={event.id}>
            {index > 0 && <View style={styles.separator} />}
            <EventCard event={event} />
          </View>
        ))}
      </ScrollView>

      <FeedHeader />
      <FeedFooter />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(_FONT_SOURCES);

  if (!fontsLoaded) return <View style={styles.root} />;

  return (
    <SafeAreaProvider style={styles.root}>
      <Feed />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _COLORS.background,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: _GUTTER,
    backgroundColor: _COLORS.hairline,
  },
});
