import * as React from 'react';
import { memo } from 'react';
import { COMPONENT_NAMES } from '../../constants';
import type { IProgressiveBlurViewProps } from '../../interfaces';
import { createWebUnsupportedError } from '../../utils';

const ProgressiveBlurViewBase: React.FC<IProgressiveBlurViewProps> & React.FunctionComponent = (
  _props: IProgressiveBlurViewProps
): React.JSX.Element & React.ReactElement & React.ReactNode => {
  throw createWebUnsupportedError(COMPONENT_NAMES.PROGRESSIVE_BLUR_VIEW);
};

const ProgressiveBlurView: React.NamedExoticComponent<IProgressiveBlurViewProps> =
  memo<IProgressiveBlurViewProps>(ProgressiveBlurViewBase);

ProgressiveBlurView.displayName = COMPONENT_NAMES.PROGRESSIVE_BLUR_VIEW;

export { ProgressiveBlurView };
