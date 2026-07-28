const _COLORS = {
  background: '#EFEDE8',
  surface: '#FBFAF7',
  text: '#1B1A17',
  muted: '#6E6A62',
  hairline: '#00000014',
  accent: '#B4632A',
  open: '#5C8A4A',
  closed: '#A8564B',
  overlay: '#3A3A38EB',
  overlayItem: '#5A5A57',
  onOverlay: '#F2F1EE',
} as const;

const _GUTTER = 20;

const _RADIUS = {
  pill: 999,
  card: 22,
  item: 16,
} as const;

export { _COLORS, _GUTTER, _RADIUS };
