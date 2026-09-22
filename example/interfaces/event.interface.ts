interface IEvent {
  id: string;
  title: string;
  subtitle: string;
  /** Relative day shown first in the meta row, such as `'In 2 Days'`. */
  when: string;
  date: string;
  location?: string;
  /** Photo URLs. An empty list shows the add-photo tile instead. */
  photos: string[];
  comments: number;
  guests: number;
}

export type { IEvent };
