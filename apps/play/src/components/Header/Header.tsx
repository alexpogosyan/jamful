"use client";
import Image from "next/image";
import Link from "next/link";
import * as User from "@jamful/types/user";
import styles from "./Header.module.css";
import logo from "../../../public/jamful.svg";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../app/layout";

// interface HeaderProps {
//   user: User.Gettable | null;
// }

export const Header = () => {
  const router = useRouter();

  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="logo" width={134} height={50} />
      </Link>
      {auth?.userId ? (
        <div>Hello, {auth.userId}</div>
      ) : (
        <div className={styles.authButtons}>
          <Button
            variant="secondary"
            label="Sign up"
            onClick={() => {
              router.push("/auth/signup");
            }}
          />
          <Button
            variant="primary"
            label="Log In"
            onClick={() => {
              router.push("/auth/login");
            }}
          />
        </div>
      )}
    </header>
  );
};
