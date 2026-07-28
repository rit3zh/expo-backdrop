import * as React from 'react';

import { memo } from 'react';
import type { IGaussianBlurViewProps } from '../../interfaces';
import { NativeGaussianBlurView } from '../../views/NativeGaussianBlurView';

const GaussianBlurViewBase: React.FC<IGaussianBlurViewProps> & React.FunctionComponent = ({
  children,
  ...props
}: IGaussianBlurViewProps): React.JSX.Element & React.ReactElement & React.ReactNode => {
  return <NativeGaussianBlurView {...props}>{children}</NativeGaussianBlurView>;
};

const GaussianBlurView: React.NamedExoticComponent<IGaussianBlurViewProps> =
  memo<IGaussianBlurViewProps>(GaussianBlurViewBase);

export { GaussianBlurView };
