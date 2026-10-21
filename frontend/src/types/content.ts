export interface ContentPosition {
  x: number;
  y: number;
}

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  description?: string;
  position?: ContentPosition;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  order?: number;
  userId?: {
    _id?: string;
    username?: string;
  } | string;
}
