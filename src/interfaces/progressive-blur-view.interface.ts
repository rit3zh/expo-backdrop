import type { ColorValue } from 'react-native';

import type { TBlurTint, TProgressiveBlurEdge } from '../types';
import type { IBlurSurfaceProps } from './blur-surface.interface';

interface IProgressiveBlurViewProps extends IBlurSurfaceProps {
  /**
   * Blur strength at the fully blurred edge, from `0` to `100`. It ramps down to no blur at the
   * opposite edge.
   * @default 25
   */
  intensity?: number;
  /**
   * Material the blur layers are built from. Without private API every material carries some
   * tint, and lighter ones carry less. The tint fades along with the blur.
   * @default 'systemUltraThinMaterial'
   */
  tint?: TBlurTint;
  /**
   * Colour washed over the blur, rising with it to full at the blurred edge, as on iOS 26's
   * navigation bars. Its alpha sets the wash at the edge. Pass `'transparent'` to turn it off.
   *
   * Defaults to the background colour behind the content, at 85%.
   */
  tintColor?: ColorValue;
  /**
   * The edge where the blur is strongest. It fades to fully clear at the opposite edge.
   * @default 'top'
   */
  edge?: TProgressiveBlurEdge;
  /**
   * Fraction of the view, from `0` to `1` and measured from `edge`, that stays at full strength
   * before the fade begins.
   * @default 0
   */
  startOffset?: number;
  /**
   * Swaps the blur for a plain gradient of `fallbackColor` while the scroll view behind it moves
   * fast, and fades back to the blur as it slows, hiding the blur layers in between. The
   * nearest scroll view rendered behind this view is found automatically.
   * @default true
   */
  scrollFallback?: boolean;
  /**
   * Colour of the gradient shown in place of the blur during fast scrolling. Its alpha is the
   * gradient's opacity at the blurred edge, scaled by `intensity`.
   *
   * Defaults to the background colour behind the content, so the hand-over reads as content
   * fading into the page.
   */
  fallbackColor?: ColorValue;
}

export type { IProgressiveBlurViewProps };
