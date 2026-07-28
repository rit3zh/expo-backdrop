import * as React from 'react';
import { memo } from 'react';
import { COMPONENT_NAMES } from '../../constants';
import type { IGaussianBlurViewProps } from '../../interfaces';
import { createWebUnsupportedError } from '../../utils';

const GaussianBlurViewBase: React.FC<IGaussianBlurViewProps> & React.FunctionComponent = (
  _props: IGaussianBlurViewProps
): React.JSX.Element & React.ReactElement & React.ReactNode => {
  throw createWebUnsupportedError(COMPONENT_NAMES.GAUSSIAN_BLUR_VIEW);
};

const GaussianBlurView: React.NamedExoticComponent<IGaussianBlurViewProps> =
  memo<IGaussianBlurViewProps>(GaussianBlurViewBase);

GaussianBlurView.displayName = COMPONENT_NAMES.GAUSSIAN_BLUR_VIEW;

export { GaussianBlurView };
