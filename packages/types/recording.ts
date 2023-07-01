import { OptionalExcept } from "./util";

interface Recording {
  id: number;
  artistId: number | null;
  parentId: number | null;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
export type Selectable = Recording;

export type Gettable = Recording;

export type Postable = OptionalExcept<
  Omit<Recording, "id" | "createdAt" | "updatedAt">,
  "title" | "url"
>;

export type Puttable = Partial<
  Omit<Recording, "id" | "createdAt" | "updatedAt">
>;
