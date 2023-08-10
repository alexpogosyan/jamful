"use client";
import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { useState, ReactNode } from "react";
import App from "../components/App/App";

const fira = Fira_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Jamful</title>
      </head>
      <body className={fira.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
