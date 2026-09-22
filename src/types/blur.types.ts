import type {
  BLUR_TINTS,
  NATIVE_VIEW_NAMES,
  COMPONENT_NAMES,
  PROGRESSIVE_BLUR_EDGES,
} from '../constants';

type TBlurTint = (typeof BLUR_TINTS)[number];
type TProgressiveBlurEdge = (typeof PROGRESSIVE_BLUR_EDGES)[number];
type TNativeViewName = (typeof NATIVE_VIEW_NAMES)[keyof typeof NATIVE_VIEW_NAMES];
type TComponentName = (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];

export type { TBlurTint, TProgressiveBlurEdge, TNativeViewName, TComponentName };
