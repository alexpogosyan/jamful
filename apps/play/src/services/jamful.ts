import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

import * as User from "@jamful/types/user";

const errorMessages: { [key: string]: string } = {
  wrong_user_or_password: "Incorrect password or user does not exist.",
};

export const login = async (loginId: string, password: string) => {
  try {
    const res = await axios.post("/users/login", { loginId, password });
    return res.data;
  } catch (err: any) {
    throw new Error(errorMessages[err.response?.data?.errorCode]);
  }
};
