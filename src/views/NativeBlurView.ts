import { requireNativeView } from 'expo';
import type { ComponentType } from 'react';

import { NATIVE_MODULE_NAME } from '../constants';
import type { IBlurViewProps } from '../interfaces';

const NativeBlurView: ComponentType<IBlurViewProps> =
  requireNativeView<IBlurViewProps>(NATIVE_MODULE_NAME);

export { NativeBlurView };
