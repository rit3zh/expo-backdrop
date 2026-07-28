import type { ColorValue } from 'react-native';

import type { TBlurTint } from '../types';
import type { IBlurSurfaceProps } from './blur-surface.interface';

interface IBlurViewCornerRadii {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}

interface IBlurViewProps extends IBlurSurfaceProps {
  /**
   * Blur strength from `0` to `100`.
   * @default 50
   */
  intensity?: number;
  /**
   * Material style applied over the blur.
   * @default 'default'
   */
  tint?: TBlurTint;
  /**
   * A custom colour washed over the blur, replacing `tint` when set. Not part of the `expo-blur`
   * API — use it when none of the system materials match your design.
   */
  tintColor?: ColorValue;
  /**
   * Divides the radius that `intensity` maps to. Android blur reads stronger than iOS at the same
   * intensity, so this is the dial for matching them.
   *
   * @platform android
   * @default 4
   */
  blurReductionFactor?: number;
  /**
   * Explicit blur radius in dp, overriding the radius derived from `intensity`.
   *
   * iOS has no equivalent: `UIVisualEffectView` fixes the radius per material, and reaching in to
   * change it needs private API.
   *
   * @platform android
   */
  blurRadius?: number;
  /**
   * How much the backdrop is downsampled before being blurred. Higher values are cheaper and
   * softer. Leave at 0 to let the native side derive a factor from the radius.
   *
   * @platform android
   * @default 0
   */
  downsampleFactor?: number;
  /**
   * Blur passes over the capture. More passes soften further, at a roughly linear cost.
   *
   * @platform android
   * @default 2
   */
  blurRounds?: number;
  /**
   * Set to false to stop blurring and render only the tint.
   * @default true
   */
  blurEnabled?: boolean;
  /**
   * Whether the backdrop re-captures every frame. Set to false to freeze it over static content.
   * iOS backdrop capture is handled by the compositor and is always live.
   *
   * @platform android
   * @default true
   */
  autoUpdate?: boolean;
  /** Uniform corner radius. Clips both the blur and the view's children. */
  cornerRadius?: number;
  /** Per-corner radii. Takes precedence over `cornerRadius` when both are set. */
  cornerRadii?: IBlurViewCornerRadii;
}

export type { IBlurViewProps, IBlurViewCornerRadii };
