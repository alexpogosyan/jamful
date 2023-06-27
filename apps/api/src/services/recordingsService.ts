import pool from "../pgPool";
import * as Recording from "@jamful/types/recording";

export const getAll = async (): Promise<Recording.Selectable[]> => {
  const result = await pool.query(
    `select * from recordings order by "createdAt"`
  );
  return result.rows;
};

export const getById = async (id: number): Promise<Recording.Selectable> => {
  const result = await pool.query(`select * from recordings where "id" = $1`, [
    id,
  ]);
  return result.rows[0];
};
