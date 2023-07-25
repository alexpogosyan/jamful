"use client";
import * as User from "@jamful/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../services/jamful";
import { getErrorMessage } from "../../../utils/error";
import Text from "../../../components/Text/Text";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import styles from "./page.module.css";

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
      <div className={styles.mainWrapper}>
        <Text size="h1">Log in to jamful</Text>
        {error && <p className={styles.error}>{error}</p>}
        <Input
          value={loginId}
          onChange={(e) => {
            setLoginId(e.target.value);
          }}
          label="Email or username"
          placeholder="Email or username"
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          placeholder="Password"
        />

        <Button label="Log in" onClick={handleLogin} />
      </div>
    </main>
  );
}
