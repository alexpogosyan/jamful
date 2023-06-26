interface Recording {
  artistId: number | null;
  parentId: number | null;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecordingSelectable extends Recording {
  id: number;
}

export type RecordingUpdateable = Partial<Pick<Recording, "title" | "url">>;

export type RecordingCreatable = Omit<Recording, "createdAt" | "updatedAt">;
