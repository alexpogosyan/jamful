import * as User from "@jamful/types/user";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  loginId: string,
  password: string
): Promise<User.Gettable> => {
  try {
    const res = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    Cookies.set("token", data.token, { expires: 30 });
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  return new Promise((resolve, reject) => {
    Cookies.remove("token");
    return resolve(true);
  });
};

export const addRecording = async (title: string, audio: string) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${baseUrl}/recordings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: "",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};
