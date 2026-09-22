interface IStory {
  id: string;
  label: string;
  imageURL?: string;
  /** Seen stories get a muted ring instead of the accent one. */
  seen?: boolean;
  /** The viewer's own story, drawn as the logo with an add badge instead of a photo. */
  isOwn?: boolean;
}

export type { IStory };
