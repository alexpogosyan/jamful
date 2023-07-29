import { OptionalExcept } from "./util";

interface User {
  id: number;
  userId: string;
  email: string;
  passwordHash: string;
  displayName: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export type Selectable = User;

export type Gettable = Omit<User, "id" | "passwordHash">;

export type Puttable = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt" | "passwordHash">
> & { password: string };

export type Postable = OptionalExcept<
  Omit<User, "id" | "createdAt" | "updatedAt" | "passwordHash"> & {
    password: string;
  },
  "userId" | "email" | "password"
>;
