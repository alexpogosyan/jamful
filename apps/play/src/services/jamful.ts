import axios from "axios";
import * as User from "@jamful/types/user";
import { getErrorMessage } from "../utils/error";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (loginId: string, password: string) => {
  try {
    const res = await axios.post("/users/login", { loginId, password });
    return res.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
