import { requireNativeView } from 'expo';
import type { ComponentType } from 'react';

import { NATIVE_MODULE_NAME, NATIVE_VIEW_NAMES } from '../constants';
import type { IGaussianBlurViewProps } from '../interfaces';

const NativeGaussianBlurView: ComponentType<IGaussianBlurViewProps> =
  requireNativeView<IGaussianBlurViewProps>(
    NATIVE_MODULE_NAME,
    NATIVE_VIEW_NAMES.GAUSSIAN_BLUR_VIEW
  );

export { NativeGaussianBlurView };
