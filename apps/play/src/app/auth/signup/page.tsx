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

  const router = useRouter();

  const dispatch = useDispatch();

  // const [register, { isLoading, error }] = useRegisterMutation();
  const [register, { error, isError, isLoading }] = useRegisterMutation();

  const handleSignup = async () => {
    try {
      const user = await register({ email, password }).unwrap();
      dispatch(setAuth(user));
      router.push("/");
    } catch (e: any) {
      // TODO what goes here?
    }
  };

  let errorMsg;

  if (error) {
    if ("status" in error) {
      errorMsg = "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errorMsg = error.message;
    }
  }

  return (
    <main>
      <div className={styles.mainWrapper}>
        <Text size="h1">Sign up</Text>
        <Spacer h="1rem" />
        {isError && <p className={styles.error}>{errorMsg}</p>}
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
          onClick={handleSignup}
          fullwidth={true}
          disabled={isLoading}
        />
      </div>
    </main>
  );
}
