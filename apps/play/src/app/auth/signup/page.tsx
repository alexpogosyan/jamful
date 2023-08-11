"use client";
import * as User from "@jamful/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Text from "../../../components/Text/Text";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import styles from "./page.module.css";
import { Spacer } from "../../../components/Spacer/Spacer";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../../store/slices/authService";
import { setAuth } from "../../../store/slices/authSlice";

export default function SignUp() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const handleLogin = async () => {
    setError("");

    try {
      const user = await register({ email, password }).unwrap();
      dispatch(setAuth(user));

      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <main>
      <div className={styles.mainWrapper}>
        <Text size="h1">Sign up</Text>
        <Spacer h="1rem" />
        {error && <p className={styles.error}>{error}</p>}
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="What's your email?"
          placeholder="Enter your email"
        />
        <Spacer h="1rem" />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Create a password"
          placeholder="Enter your password"
          type="password"
        />
        <Spacer h="1.5rem" />
        <Button
          label="Sign up"
          onClick={handleLogin}
          fullwidth={true}
          disabled={isLoading}
        />
      </div>
    </main>
  );
}
