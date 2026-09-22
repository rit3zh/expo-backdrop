import type { IEvent, IStory } from '../interfaces';
import { getUnsplashURL } from '../utils';

const _PROFILE_IMAGE_URL =
  'https://pbs.twimg.com/profile_images/2064564663019569152/5k4DbNsp_400x400.jpg';

const _STORIES: IStory[] = [
  { id: 'own', label: 'Your story', isOwn: true, imageURL: _PROFILE_IMAGE_URL },
  {
    id: 's1',
    label: 'Bryan',
    imageURL: 'https://i.pinimg.com/736x/fd/a5/3d/fda53d3a740a97f5f7dedd2e2561dd07.jpg',
  },
  {
    id: 's2',
    label: 'Beach',
    imageURL: 'https://i.pinimg.com/736x/e2/52/40/e2524035b14eef4e013041a7e4710328.jpg',
  },
  {
    id: 's3',
    label: 'Aesthetics',
    imageURL: 'https://i.pinimg.com/736x/4e/6b/32/4e6b32ac1b3f6f51ac1449eab1ece11f.jpg',
    seen: true,
  },
  {
    id: 's4',
    label: 'Food',
    imageURL: 'https://i.pinimg.com/736x/d6/d1/a8/d6d1a8397db24ae95c48c3ea4ec71f63.jpg',
  },
  {
    id: 's5',
    label: 'Outfit Check',
    imageURL: 'https://i.pinimg.com/736x/5e/34/fc/5e34fcf24d844340201bc37b80ac51ee.jpg',
    seen: true,
  },
  {
    id: 's6',
    label: 'Office',
    imageURL: 'https://i.pinimg.com/736x/29/fd/31/29fd3170e3d44860d35044a430181c58.jpg',
  },
];

const _EVENTS: IEvent[] = [
  {
    id: 'beach',
    title: 'Beach Party',
    subtitle: 'Weekend with family and friends',
    when: 'In 2 Days',
    date: 'Aug 28',
    location: 'Takwa Bay Beach',
    photos: [],
    comments: 34,
    guests: 6,
  },
  {
    id: 'life',
    title: 'Life Lately',
    subtitle: 'A collection of little moments, memories, and everything in between',
    when: 'Today',
    date: '26/08/2025',
    photos: [
      'https://i.pinimg.com/736x/02/97/1b/02971b2262a83c859a8edf10132bcb8c.jpg',
      'https://i.pinimg.com/736x/e7/43/fb/e743fb568dd5965cac731289e83b079d.jpg',
      'https://i.pinimg.com/736x/e7/2d/be/e72dbe6f15c839c252a36c95b1533b8b.jpg',
      'https://i.pinimg.com/736x/dd/cc/1e/ddcc1e5c98cf8b45e507a222ab63537c.jpg',
    ],
    comments: 20,
    guests: 14,
  },
  {
    id: 'jazz',
    title: 'Rooftop Jazz Night',
    subtitle: 'Sunset sets, cold drinks and good company',
    when: 'Next Fri',
    date: 'Sep 05',
    location: 'Eko Hotel Rooftop',
    photos: [
      getUnsplashURL('photo-1514525253161-7a46d19cd819'),
      getUnsplashURL('photo-1470229722913-7c0e2dbbafd3'),
      getUnsplashURL('photo-1506157786151-b8491531f063'),
    ],
    comments: 58,
    guests: 22,
  },
  {
    id: 'dinner',
    title: 'Friendsgiving',
    subtitle: 'Bring a dish, bring a friend, bring your appetite',
    when: 'In 3 Weeks',
    date: 'Sep 19',
    location: "Tolu's Place",
    photos: [
      getUnsplashURL('photo-1414235077428-338989a2e8c0'),
      getUnsplashURL('photo-1559339352-11d035aa65de'),
      getUnsplashURL('photo-1527529482837-4698179dc6ce'),
      getUnsplashURL('photo-1511795409834-ef04bbd61622'),
    ],
    comments: 12,
    guests: 9,
  },
  {
    id: 'wedding',
    title: 'Ada & Kene',
    subtitle: 'Two families, one very long dance floor',
    when: 'Oct 11',
    date: '11/10/2025',
    location: 'Lagos Oriental',
    photos: [
      getUnsplashURL('photo-1519741497674-611481863552'),
      getUnsplashURL('photo-1464366400600-7168b8af9bc3'),
      getUnsplashURL('photo-1492684223066-81342ee5ff30'),
    ],
    comments: 104,
    guests: 180,
  },
];

export { _EVENTS, _PROFILE_IMAGE_URL, _STORIES };
