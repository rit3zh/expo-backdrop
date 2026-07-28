import { BLUR_TINTS } from '../constants';
import type { TBlurTint } from '../types';

const isBlurTint = (value: unknown): value is TBlurTint => {
  if (typeof value !== 'string') {
    return false;
  }

  return (BLUR_TINTS as readonly string[]).includes(value);
};

export { isBlurTint };
