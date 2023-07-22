import "./globals.css";
import Image from "next/image";
import { Fira_Sans } from "next/font/google";
import Link from "next/link";

export const metadata = {
  title: "jamful",
  description: "jamful: music collaboration",
};

const fira = Fira_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <header>
          <Link href="/">
            <Image src="/jamful.png" alt="logo" width={134} height={50} />
          </Link>
          <Link href="/auth/login">Login</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
