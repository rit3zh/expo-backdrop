import * as React from 'react';
import { memo } from 'react';
import { COMPONENT_NAMES } from '../../constants';
import type { IBlurViewProps } from '../../interfaces';
import { createWebUnsupportedError } from '../../utils';

const BlurViewBase: React.FC<IBlurViewProps> & React.FunctionComponent = (
  _props: IBlurViewProps
): React.JSX.Element & React.ReactElement & React.ReactNode => {
  throw createWebUnsupportedError(COMPONENT_NAMES.BLUR_VIEW);
};

const BlurView: React.NamedExoticComponent<IBlurViewProps> = memo<IBlurViewProps>(BlurViewBase);

export { BlurView };
