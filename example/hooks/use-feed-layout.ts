import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { _FAB_HEIGHT, _HEADER_ROW_HEIGHT } from '../constants';
import type { IFeedLayout } from '../interfaces';
import { isAndroid } from '../constants/platform.constant';

export default function useFeedLayout(): IFeedLayout {
  const insets = useSafeAreaInsets();

  return {
    topInset: isAndroid ? insets.top * 1.1 : insets.top,
    bottomInset: insets.bottom,
    headerHeight: insets.top + _HEADER_ROW_HEIGHT,
    footerHeight: insets.bottom + _FAB_HEIGHT + 56,
  };
}
