import pool from "../pgPool";
import * as User from "@jamful/types/user";
import { verify, hash } from "argon2";
import * as jwt from "jsonwebtoken";
import { ValidationError } from "../errors";

const getByUserIdOrEmail = async (
  loginId: string
): Promise<User.Selectable | null> => {
  const result = await pool.query(
    `select * from users where "userId" = $1 or "email" = $1`,
    [loginId]
  );
  return result.rows[0];
};

const insertNewUser = async (
  userId: string,
  email: string,
  password: string
): Promise<User.Selectable> => {
  const passwordHash = await hashPassword(password);

  const result = await pool.query(
    `insert into users ("userId", "email", "passwordHash") values ($1, $2, $3) returning *`,
    [userId, email, passwordHash]
  );
  return result.rows[0];
};

const updateUser = async (
  userId: string,
  displayName: string,
  bio: string,
  avatar: string
): Promise<User.Selectable> => {
  const result = await pool.query(
    `update users set "displayName" = $1, "bio" = $2, "avatar" = $3 where "userId" = $4 returning *`,
    [displayName, bio, avatar, userId]
  );
  return result.rows[0];
};

const hashPassword = async (password: string) => {
  if (password && password.length > 0) {
    return await hash(password);
  } else {
    throw new ValidationError("Can't use empty password");
  }
};

const makeJwtToken = (user: User.Selectable) => {
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  return token;
};

const makeGettableUser = (user: User.Selectable): User.Gettable => {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    bio: user.bio,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: makeJwtToken(user),
  };
};

export const getMe = async (userId: string): Promise<User.Gettable | null> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(userId);

  if (!user) {
    throw new ValidationError("User doesn't exist.");
  }

  return makeGettableUser(user);
};

export const updateMe = async (
  userId: string,
  displayName: string,
  bio: string,
  avatar: string
) => {
  const user: User.Selectable | null = await getByUserIdOrEmail(userId);
  if (!user) {
    throw new ValidationError("User doesn't exist.");
  }

  const updatedUser: User.Selectable = await updateUser(
    userId,
    displayName,
    bio,
    avatar
  );
  return makeGettableUser(updatedUser);
};

export const login = async (
  loginId: string,
  password: string
): Promise<User.Gettable | null> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(loginId);

  if (!user) {
    throw new ValidationError("Wrong password or user doesn't exist.");
  }

  if (!password) {
    throw new ValidationError("Can't use empty password");
  }

  const passwordMatch = await verify(user.passwordHash, password);

  if (!passwordMatch) {
    throw new ValidationError("Wrong password or user doesn't exist");
  }

  return makeGettableUser(user);
};

export const create = async (
  userId: string,
  email: string,
  password: string
): Promise<User.Gettable> => {
  const user: User.Selectable = await insertNewUser(userId, email, password);

  return makeGettableUser(user);
};
