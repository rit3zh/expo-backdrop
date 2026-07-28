import type React from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface CarouselData {
  id: string;
  imageURL: string;
}

interface PersonData {
  id: string;
  name: string;
  avatarURL: string;
}

interface HourData {
  day: string;
  opens: string | null;
  closes: string | null;
  today?: boolean;
}

interface AmenityData {
  label: string;
  icon: IconName;
}

interface ReviewData {
  id: string;
  author: string;
  avatarURL: string;
  timeAgo: string;
  rating: number;
  body: string;
}

interface NearbyData {
  id: string;
  name: string;
  category: string;
  distance: string;
  imageURL: string;
}

interface PlaceData {
  name: string;
  locality: string;
  category: string;
  description: string;
  mention: string;
  mentionDetail: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  ratingDistribution: number[];
}

const _CAROUSEL_IMAGES: CarouselData[] = [
  {
    id: 'storefront',
    imageURL: 'https://i.pinimg.com/1200x/93/f3/23/93f32334501c090a5ed6be121077498d.jpg',
  },
  {
    id: 'counter',
    imageURL: 'https://i.pinimg.com/1200x/18/f1/af/18f1af2885fbe8887a46b0e10d134a57.jpg',
  },
  {
    id: 'other_front',
    imageURL: 'https://i.pinimg.com/1200x/0b/ea/8a/0bea8a9f45aaa2c15edbb49933c4ca59.jpg',
  },
  {
    id: '__cafe',
    imageURL: 'https://i.pinimg.com/736x/a9/14/40/a91440b797508be325dc1bf45fd786a3.jpg',
  },
  {
    id: 'cozy-aesthetic',
    imageURL: 'https://i.pinimg.com/736x/1d/22/0f/1d220ff9cf8b10fc48587a380cd9990e.jpg',
  },

  {
    id: '_cozy-frontend',
    imageURL: 'https://i.pinimg.com/736x/da/19/a0/da19a0a14b756d8da70b14adaa46f347.jpg',
  },
  {
    id: 'ded',
    imageURL: 'https://i.pinimg.com/1200x/13/ea/eb/13eaeb20dd3185dd7e03a0b000c8d7d4.jpg',
  },
];

const _PLACE: PlaceData = {
  name: 'Halcyon Goods',
  locality: 'Hannam-dong, Seoul',
  category: 'Apothecary & studio',
  description:
    'A small-batch apothecary built around slow rituals — cold-pressed oils, hand-poured candles and a short line of body care made with unhurried ingredients. The shop doubles as a studio, so most of what sits on the shelf was mixed in the room behind it.',
  mention: 'Mentioned by Kinfolk, Monocle and three others',
  mentionDetail:
    'Picked as one of the ten quiet retail rooms worth the detour in the 2025 city guide.',
  rating: 4.8,
  reviewCount: 212,
  priceLevel: '₩₩',
  ratingDistribution: [0.82, 0.12, 0.04, 0.01, 0.01],
};

const _PEOPLE: PersonData[] = [
  { id: 'imogen', name: 'Imogen R.', avatarURL: 'https://i.pravatar.cc/200?img=45' },
  { id: 'theo', name: 'Theo B.', avatarURL: 'https://i.pravatar.cc/200?img=12' },
  { id: 'saoirse', name: 'Saoirse L.', avatarURL: 'https://i.pravatar.cc/200?img=31' },
  { id: 'august', name: 'August P.', avatarURL: 'https://i.pravatar.cc/200?img=15' },
  { id: 'noor', name: 'Noor H.', avatarURL: 'https://i.pravatar.cc/200?img=33' },
  { id: 'wren', name: 'Wren D.', avatarURL: 'https://i.pravatar.cc/200?img=26' },
  { id: 'kasper', name: 'Kasper V.', avatarURL: 'https://i.pravatar.cc/200?img=51' },
];

const _HOURS: HourData[] = [
  { day: 'Monday', opens: null, closes: null },
  { day: 'Tuesday', opens: '11:00', closes: '20:00' },
  { day: 'Wednesday', opens: '11:00', closes: '20:00' },
  { day: 'Thursday', opens: '11:00', closes: '20:00', today: true },
  { day: 'Friday', opens: '11:00', closes: '21:00' },
  { day: 'Saturday', opens: '10:00', closes: '21:00' },
  { day: 'Sunday', opens: '12:00', closes: '18:00' },
];

const _AMENITIES: AmenityData[] = [
  { label: 'Studio visits', icon: 'color-palette-outline' },
  { label: 'Refill bar', icon: 'water-outline' },
  { label: 'Step-free access', icon: 'accessibility-outline' },
  { label: 'Card only', icon: 'card-outline' },
  { label: 'Gift wrapping', icon: 'gift-outline' },
  { label: 'Free wifi', icon: 'wifi-outline' },
];

const _REVIEWS: ReviewData[] = [
  {
    id: 'linnea',
    author: 'Linnea Ostrom',
    avatarURL: 'https://i.pravatar.cc/200?img=20',
    timeAgo: '2 weeks ago',
    rating: 5,
    body: 'The refill bar alone is worth the trip. Staff walked me through every oil without once trying to sell me anything.',
  },
  {
    id: 'mateo',
    author: 'Mateo Ferreira',
    avatarURL: 'https://i.pravatar.cc/200?img=59',
    timeAgo: '1 month ago',
    rating: 4,
    body: 'Beautiful room and genuinely good products. Gets tight on weekends — go on a weekday morning if you can.',
  },
];

const _NEARBY: NearbyData[] = [
  {
    id: 'ember',
    name: 'Ember & Rye',
    category: 'Bakery',
    distance: '190 m',
    imageURL: 'https://i.pinimg.com/1200x/18/f1/af/18f1af2885fbe8887a46b0e10d134a57.jpg',
  },
  {
    id: 'atlas',
    name: 'Atlas Press',
    category: 'Bookshop',
    distance: '400 m',
    imageURL: 'https://i.pinimg.com/1200x/93/f3/23/93f32334501c090a5ed6be121077498d.jpg',
  },
  {
    id: 'sable',
    name: 'Sable Room',
    category: 'Coffee',
    distance: '650 m',
    imageURL: 'https://i.pinimg.com/1200x/18/f1/af/18f1af2885fbe8887a46b0e10d134a57.jpg',
  },
];

export { _AMENITIES, _CAROUSEL_IMAGES, _HOURS, _NEARBY, _PEOPLE, _PLACE, _REVIEWS };
export type {
  AmenityData,
  CarouselData,
  HourData,
  IconName,
  NearbyData,
  PersonData,
  PlaceData,
  ReviewData,
};
