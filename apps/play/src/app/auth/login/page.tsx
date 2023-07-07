"use client";
import * as User from "@jamful/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../jamful";

export default function LoginPage() {
  let [loginId, setLoginId] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await login(loginId, password);
      console.log("nextjs got user ", user);
      router.push("/");
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      setError(message);
    }
  };

  return (
    <main>
      <div>
        <h1>Please login</h1>
        <p>Error: {error}</p>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
}
