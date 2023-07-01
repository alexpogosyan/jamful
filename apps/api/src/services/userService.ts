import pool from "../pgPool";
import * as User from "@jamful/types/user";

export const getByUserIdOrEmail = async (
  loginId: string
): Promise<User.Selectable | null> => {
  const result = await pool.query(
    `select * from users where "userId" = $1 or "email" = $1`,
    [loginId]
  );
  return result.rows[0];
};
