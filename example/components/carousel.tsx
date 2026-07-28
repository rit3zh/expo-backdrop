import { View, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { _height, _width } from '../constants/dimensions';
import { Image } from 'expo-image';
import HeaderPagination from './header-pagination';

const _CAROUSEL_HEIGHT = _height * 0.5;

interface ICarousel {
  items: CarouselItems[];
}

interface CarouselItems {
  id: string;
  imageURL: string;
}

function CarouselItem(props: CarouselItems) {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: props.imageURL }} style={styles.image} transition={220} />
    </View>
  );
}

export default function Carousel(props: ICarousel) {
  const scrollX = useSharedValue<number>(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {props.items?.map((item) => (
          <CarouselItem {...item} key={item.id} />
        ))}
      </Animated.ScrollView>

      <HeaderPagination items={props.items} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: _CAROUSEL_HEIGHT,
  },
  slide: {
    width: _width,
    height: _CAROUSEL_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
