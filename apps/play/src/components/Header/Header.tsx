"use client";
import Image from "next/image";
import Link from "next/link";
import * as User from "@jamful/types/user";
import styles from "./Header.module.css";
import logo from "../../../public/jamful.png";
import { Button } from "../Button/Button";

interface HeaderProps {
  user: User.Gettable | null;
}

export const Header = (props: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="logo" width={134} height={50} />
      </Link>
      <div className={styles.authButtons}>
        <Button variant="secondary" label="Sign up" onClick={() => {}} />
        <Button variant="primary" label="Sign in" onClick={() => {}} />
      </div>
    </header>
  );
};
