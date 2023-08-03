"use client";
import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { useState, ReactNode } from "react";
import App from "../components/App/App";

export const metadata = {
  title: "jamful",
  description: "jamful: music collaboration",
};

const fira = Fira_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState({ userId: "" });
  const value = { auth, setAuth };

  return (
    <html lang="en">
      <body className={fira.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
