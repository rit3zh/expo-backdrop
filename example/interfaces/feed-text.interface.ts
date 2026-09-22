import type { TextProps } from 'react-native';

import type { TFontWeight } from '../types';

interface IFeedTextProps extends TextProps {
  /** @default 'regular' */
  weight?: TFontWeight;
}

export type { IFeedTextProps };
