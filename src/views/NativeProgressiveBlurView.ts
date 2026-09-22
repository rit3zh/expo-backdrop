import { requireNativeView } from 'expo';
import type { ComponentType } from 'react';

import { NATIVE_MODULE_NAME, NATIVE_VIEW_NAMES } from '../constants';
import type { IProgressiveBlurViewProps } from '../interfaces';

const NativeProgressiveBlurView: ComponentType<IProgressiveBlurViewProps> =
  requireNativeView<IProgressiveBlurViewProps>(
    NATIVE_MODULE_NAME,
    NATIVE_VIEW_NAMES.PROGRESSIVE_BLUR_VIEW
  );

export { NativeProgressiveBlurView };
