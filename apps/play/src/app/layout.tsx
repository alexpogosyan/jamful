"use client";
import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Header } from "../components/Header/Header";
import { createContext, useState, ReactNode } from "react";
import {} from "react";

export const metadata = {
  title: "jamful",
  description: "jamful: music collaboration",
};

const fira = Fira_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
});

interface IAuth {
  userId: string;
}
interface IAuthContext {
  auth: IAuth;
  setAuth: any;
}

export const AuthContext = createContext<IAuthContext>({
  auth: { userId: "" },
  setAuth: () => {},
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState({ userId: "" });
  const value = { auth, setAuth };

  return (
    <html lang="en">
      <body className={fira.className}>
        <AuthContext.Provider value={value}>
          <Header />
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
