import * as User from "@jamful/types/user";

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

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};
