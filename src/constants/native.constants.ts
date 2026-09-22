const NATIVE_MODULE_NAME = 'BlurView';
const NATIVE_VIEW_NAMES = {
  GAUSSIAN_BLUR_VIEW: 'GaussianBlurView',
  PROGRESSIVE_BLUR_VIEW: 'ProgressiveBlurView',
} as const;
const COMPONENT_NAMES = {
  BLUR_VIEW: 'BlurView',
  GAUSSIAN_BLUR_VIEW: 'GaussianBlurView',
  PROGRESSIVE_BLUR_VIEW: 'ProgressiveBlurView',
} as const;

export { NATIVE_MODULE_NAME, NATIVE_VIEW_NAMES, COMPONENT_NAMES };
