interface IFeedLayout {
  topInset: number;
  bottomInset: number;
  /** Status bar plus the title row. The feed scrolls underneath it. */
  headerHeight: number;
  /** Floating button plus the space the bottom blur fades over. */
  footerHeight: number;
}

export type { IFeedLayout };
