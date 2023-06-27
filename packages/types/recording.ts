interface Recording {
  artistId: number | null;
  parentId: number | null;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Selectable extends Recording {
  id: number;
}

export type Updateable = Partial<Pick<Recording, "title" | "url">>;

export type Creatable = Omit<Recording, "createdAt" | "updatedAt">;
