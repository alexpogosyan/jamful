"use client";

import * as User from "@jamful/types/user";
import { useState } from "react";

export default function LoginPage() {
  let [userId, setUserId] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: userId,
        password: password,
      }),
    });

    if (!res.ok) {
      console.log("not ok");
      console.error(res.json());
    } else {
      const user: User.Gettable = await res.json();
      console.log("Success: ", user.userId, " logged in");
    }
  };

  return (
    <main>
      <div>
        <h1>Please login</h1>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
}
