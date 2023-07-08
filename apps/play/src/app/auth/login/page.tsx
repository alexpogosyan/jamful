"use client";
import * as User from "@jamful/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../services/jamful";
import { getErrorMessage } from "../../../utils/error";

export default function LoginPage() {
  let [loginId, setLoginId] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await login(loginId, password);
      router.push("/");
    } catch (e) {
      setError(getErrorMessage(e));
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
