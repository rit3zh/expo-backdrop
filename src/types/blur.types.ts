import type { BLUR_TINTS, NATIVE_VIEW_NAMES, COMPONENT_NAMES } from '../constants';

type TBlurTint = (typeof BLUR_TINTS)[number];
type TNativeViewName = (typeof NATIVE_VIEW_NAMES)[keyof typeof NATIVE_VIEW_NAMES];
type TComponentName = (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];

export type { TBlurTint, TNativeViewName, TComponentName };
