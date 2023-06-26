import pool from "../pgPool";
import { RecordingSelectable } from "@jamful/types/recording";

export const getAll = async (): Promise<RecordingSelectable[]> => {
  const result = await pool.query(
    `select * from recordings order by "createdAt"`
  );
  return result.rows;
};

export const getById = async (id: number): Promise<RecordingSelectable> => {
  const result = await pool.query(`select * from recordings where "id" = $1`, [
    id,
  ]);
  return result.rows[0];
};
