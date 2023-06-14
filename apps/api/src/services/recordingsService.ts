import db from "../db";
import { Recording } from "../models/recording";

export const getAll = async (): Promise<Recording[]> => {
  const result = await db.query("select * from recordings order by created_at");
  return result.rows;
};

export const getById = async (id: number): Promise<Recording> => {
  const result = await db.query("select * from recordings where id = $1", [id]);
  return result.rows[0];
};
