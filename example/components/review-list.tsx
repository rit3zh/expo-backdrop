import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { ReviewData } from '../constants/mock';
import { _COLORS, _RADIUS } from '../constants/theme';

interface IReviewList {
  reviews: ReviewData[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((step) => (
        <Ionicons
          key={step}
          name={step <= rating ? 'star' : 'star-outline'}
          size={11}
          color={step <= rating ? _COLORS.accent : _COLORS.muted}
        />
      ))}
    </View>
  );
}

export default function ReviewList({ reviews }: IReviewList) {
  return (
    <View style={styles.list}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.review}>
          <View style={styles.header}>
            <Image source={{ uri: review.avatarURL }} style={styles.avatar} transition={200} />
            <View style={styles.headerText}>
              <AppText variant="medium" style={styles.author}>
                {review.author}
              </AppText>
              <View style={styles.meta}>
                <Stars rating={review.rating} />
                <AppText style={styles.timeAgo}>{review.timeAgo}</AppText>
              </View>
            </View>
          </View>
          <AppText style={styles.body}>{review.body}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 22,
  },
  review: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: _RADIUS.pill,
    backgroundColor: _COLORS.hairline,
  },
  headerText: {
    gap: 3,
  },
  author: {
    fontSize: 15,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  timeAgo: {
    fontSize: 12,
    color: _COLORS.muted,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: _COLORS.muted,
  },
});
