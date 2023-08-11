import pool from "../pgPool";
import * as User from "@jamful/types/user";
import { verify, hash } from "argon2";
import * as jwt from "jsonwebtoken";
import { AuthorizationError, DatabaseError, ValidationError } from "../errors";
import { customAlphabet } from "nanoid";

const getByUserIdOrEmail = async (
  loginId: string
): Promise<User.Selectable | null> => {
  const result = await pool.query(
    `select * from users where "userId" = $1 or "email" = $1`,
    [loginId]
  );
  return result.rows[0];
};

// Good enough for up to 1 million users
const generateUserId = () => {
  const alphabet = "0123456789";
  const generator = customAlphabet(alphabet, 14);
  return `user${generator()}`;
};

const insertNewUser = async (
  email: string,
  password: string
): Promise<User.Selectable> => {
  const userId = generateUserId;
  const passwordHash = await hashPassword(password);

  try {
    const result = await pool.query(
      `insert into users ("userId", "email", "passwordHash") values ($1, $2, $3) returning *`,
      [userId, email, passwordHash]
    );
    return result.rows[0];
  } catch (err: any) {
    if (err.constraint === "users_email_key") {
      throw new DatabaseError("email_already_exists");
    }
    throw Error("server_error");
  }
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
    throw new ValidationError("empty_password_not_allowed");
  }
};

export const makeJwtToken = (user: User.Gettable) => {
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const getMe = async (userId: string): Promise<User.Gettable | null> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(userId);

  if (!user) {
    throw new ValidationError("user_does_not_exist");
  }

  return user;
};

export const updateMe = async (
  userId: string,
  displayName: string,
  bio: string,
  avatar: string
): Promise<User.Gettable> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(userId);
  if (!user) {
    throw new ValidationError("user_does_not_exist");
  }

  const updatedUser: User.Selectable = await updateUser(
    userId,
    displayName,
    bio,
    avatar
  );

  return updatedUser;
};

export const authenticate = async (
  loginId: string,
  password: string
): Promise<User.Gettable> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(loginId);

  if (!user || !password) {
    throw new AuthorizationError();
  }

  const passwordMatch = await verify(user.passwordHash, password);

  if (!passwordMatch) {
    throw new AuthorizationError();
  }

  return user;
};

export const create = async (
  email: string,
  password: string
): Promise<User.Gettable> => {
  const user: User.Selectable = await insertNewUser(email, password);
  return user;
};
