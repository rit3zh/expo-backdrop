import * as React from 'react';
import { memo } from 'react';
import { COMPONENT_NAMES } from '../../constants';
import type { IBlurViewProps } from '../../interfaces';
import { NativeBlurView } from '../../views/NativeBlurView';

const BlurViewBase: React.FC<IBlurViewProps> & React.FunctionComponent = ({
  children,
  ...props
}: IBlurViewProps): React.JSX.Element & React.ReactElement & React.ReactNode => {
  return <NativeBlurView {...props}>{children}</NativeBlurView>;
};

BlurViewBase.displayName = `${COMPONENT_NAMES.BLUR_VIEW}Base`;

const BlurView: React.NamedExoticComponent<IBlurViewProps> = memo<IBlurViewProps>(BlurViewBase);

export { BlurView };
