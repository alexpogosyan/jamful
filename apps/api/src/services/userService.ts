import pool from "../pgPool";
import * as User from "@jamful/types/user";
import { hash } from "argon2";

export const getByUserIdOrEmail = async (
  loginId: string
): Promise<User.Selectable | null> => {
  const result = await pool.query(
    `select * from users where "userId" = $1 or "email" = $1`,
    [loginId]
  );

  return result.rows[0];
};

export const createUser = async (
  userId: string,
  email: string,
  password: string
): Promise<User.Selectable> => {
  const hashed = await hash(password);
  const result = await pool.query(
    `insert into users ("userId", "email", "passwordHash") values ($1, $2, $3) returning *`,
    [userId, email, hashed]
  );
  return result.rows[0];
};
