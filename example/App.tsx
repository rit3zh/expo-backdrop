import { Button, StyleSheet, View } from 'react-native';
import Carousel from './components/carousel';
import {
  _AMENITIES,
  _CAROUSEL_IMAGES,
  _HOURS,
  _NEARBY,
  _PEOPLE,
  _PLACE,
  _REVIEWS,
} from './constants/mock';
import HeaderNav from './components/header-nav';
import Wrapper from './components/wrapper';
import HeadingTitle from './components/heading-title';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from './components/app-text';
import Divider from './components/divider';
import MentionRow from './components/mention-row';
import PeopleRow from './components/people-row';
import ActionBar from './components/action-bar';
import Section from './components/section';
import HoursList from './components/hours-list';
import AmenityGrid from './components/amenity-grid';
import ReviewList from './components/review-list';
import RatingSummary from './components/rating-summary';
import NearbyRow from './components/nearby-row';
import { BlurView } from 'expo-backdrop';
import MetaLine from './components/meta-line';
import { _COLORS } from './constants/theme';
import { StatusBar } from 'expo-status-bar';
import { _width } from './constants/dimensions';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { useCallback, useState } from 'react';

const _FLOATING_BAR_HEIGHT = 130;

function PlaceScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const animatedBlurViewStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, _width / 1], [0, 1], Extrapolation.CLAMP),
    };
  });

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: _FLOATING_BAR_HEIGHT + insets.bottom }}>
        <Carousel items={_CAROUSEL_IMAGES} />

        <Wrapper>
          <HeadingTitle>{_PLACE.name}</HeadingTitle>

          <MetaLine
            items={[
              { icon: 'star', label: `${_PLACE.rating}`, accent: true },
              { icon: 'chatbubble-outline', label: `${_PLACE.reviewCount}` },
              { icon: 'pricetag-outline', label: _PLACE.priceLevel },
            ]}
          />

          <AppText variant="caption" style={styles.locality}>
            {_PLACE.locality} · {_PLACE.category}
          </AppText>

          <Divider />

          <AppText style={styles.description}>{_PLACE.description}</AppText>

          <Divider />

          <Section title="Hours" icon="calendar-outline">
            <HoursList hours={_HOURS} />
          </Section>

          <Divider />

          <MentionRow label={_PLACE.mention} detail={_PLACE.mentionDetail} />

          <Divider />

          <Section title="People you follow" icon="people-outline" trailing={`${_PEOPLE.length}`}>
            <PeopleRow people={_PEOPLE} />
          </Section>

          <Divider />

          <Section title="Good to know" icon="sparkles-outline">
            <AmenityGrid amenities={_AMENITIES} />
          </Section>

          <Divider />

          <Section title="Reviews" icon="star-outline" trailing={`${_PLACE.reviewCount}`}>
            <RatingSummary
              rating={_PLACE.rating}
              count={_PLACE.reviewCount}
              distribution={_PLACE.ratingDistribution}
            />
            <View style={styles.reviewList}>
              <ReviewList reviews={_REVIEWS} />
            </View>
          </Section>

          <Divider />

          <Section title="Nearby" icon="compass-outline">
            <NearbyRow places={_NEARBY} />
          </Section>
        </Wrapper>
      </Animated.ScrollView>
      <View style={[styles.floating, { bottom: insets.bottom + 10 }]}>
        <ActionBar phone="+82212345678" website="https://halcyongoods.kr" />
      </View>
      <Animated.View style={[styles.blurContainer, animatedBlurViewStyle]}>
        <BlurView style={styles.blur} intensity={40} tint="systemMaterial" />
      </Animated.View>
      <HeaderNav />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.root}>
      <PlaceScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _COLORS.background,
  },
  locality: {
    paddingTop: 6,
  },
  description: {
    color: _COLORS.muted,
    fontSize: 16,
    lineHeight: 25,
  },
  reviewList: {
    paddingTop: 22,
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  blurContainer: {
    top: 0,
    bottom: 0,
    width: _width,
    height: 120,
    position: 'absolute',
  },
  blur: {
    width: _width,
    height: 120,
  },
});
