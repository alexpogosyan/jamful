import pool from "../pgPool";
import * as User from "@jamful/types/user";
import { verify, hash } from "argon2";
import * as jwt from "jsonwebtoken";

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

const hashPassword = async (password: string) => {
  if (password && password.length > 0) {
    return await hash(password);
  } else {
    throw new Error("Can't hash empty password");
  }
};

const checkPassword = async (submittedPassword: string, savedHash: string) => {
  const submittedHash = await hashPassword(submittedPassword);
  return verify(submittedHash, savedHash);
};

const makeJwtToken = (user: User.Selectable) => {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
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

export const loginUser = async (
  loginId: string,
  password: string
): Promise<User.Gettable | null> => {
  const user: User.Selectable | null = await getByUserIdOrEmail(loginId);

  const genericAuthError = "Wrong password or user doesn't exist.";

  if (!user) {
    throw new Error(genericAuthError);
  }

  const passwordMatch = checkPassword(password, user.passwordHash);

  if (!passwordMatch) {
    if (!passwordMatch) {
      throw new Error(genericAuthError);
    }
  }

  return makeGettableUser(user);
};

export const createUser = async (
  userId: string,
  email: string,
  password: string
): Promise<User.Gettable> => {
  const user: User.Selectable = await insertNewUser(userId, email, password);

  return makeGettableUser(user);
};
