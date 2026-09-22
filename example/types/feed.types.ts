import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import type { _FONTS } from '../constants';

type TIconName = ComponentProps<typeof Ionicons>['name'];
type TFontWeight = keyof typeof _FONTS;

export type { TIconName, TFontWeight };
