const _FONTS = {
  regular: 'SFRounded-Regular',
  medium: 'SFRounded-Medium',
  bold: 'SFRounded-Bold',
} as const;

const _FONT_SOURCES = {
  [_FONTS.regular]: require('../assets/fonts/sf-pro-rounded/regular.otf'),
  [_FONTS.medium]: require('../assets/fonts/sf-pro-rounded/medium.otf'),
  [_FONTS.bold]: require('../assets/fonts/sf-pro-rounded/bold.otf'),
};

const _COLORS = {
  background: '#ecebeb',
  text: '#16151A',
  btn: '#16151a99',
  muted: '#8A8791',
  soft: '#5B5862',
  hairline: '#EFEDF2',
  chip: '#F4F2F7',
  brand: '#4F9A6C',
  plum: '#B23A74',
  plumSoft: '#FCEFF5',
  pin: '#8B4DE0',
  white: '#FFFFFF',
  fabTint: '#232323bc',
  footerBlurTint: 'rgba(255,255,255,0.7)',
} as const;

const _GUTTER = 20;

export { _COLORS, _FONTS, _FONT_SOURCES, _GUTTER };
