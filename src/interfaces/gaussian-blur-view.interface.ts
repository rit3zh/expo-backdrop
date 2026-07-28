import type { IBlurSurfaceProps } from './blur-surface.interface';

interface IGaussianBlurViewProps extends IBlurSurfaceProps {
  /**
   * Blur strength, in points on iOS and dp on Android. Matches SwiftUI's `.blur(radius:)`.
   * @default 0
   */
  blurRadius?: number;
  /**
   * Matches SwiftUI's `.blur(radius:opaque:)` `opaque` flag. False lets the blur sample
   * transparent pixels beyond the content so the edges fade out — the signature look of `.blur`.
   * True holds the edge pixels instead, keeping them solid.
   *
   * @default false
   */
  opaque?: boolean;
}

export type { IGaussianBlurViewProps };
