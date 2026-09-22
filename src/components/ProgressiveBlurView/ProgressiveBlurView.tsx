import * as React from 'react';
import { memo } from 'react';
import { COMPONENT_NAMES } from '../../constants';
import type { IProgressiveBlurViewProps } from '../../interfaces';
import { NativeProgressiveBlurView } from '../../views/NativeProgressiveBlurView';

const ProgressiveBlurViewBase: React.FC<IProgressiveBlurViewProps> & React.FunctionComponent = ({
  children,
  ...props
}: IProgressiveBlurViewProps): React.JSX.Element & React.ReactElement & React.ReactNode => {
  return <NativeProgressiveBlurView {...props}>{children}</NativeProgressiveBlurView>;
};

ProgressiveBlurViewBase.displayName = `${COMPONENT_NAMES.PROGRESSIVE_BLUR_VIEW}Base`;

const ProgressiveBlurView: React.NamedExoticComponent<IProgressiveBlurViewProps> =
  memo<IProgressiveBlurViewProps>(ProgressiveBlurViewBase);

export { ProgressiveBlurView };
