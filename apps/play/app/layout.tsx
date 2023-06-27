import Image from "next/image";
import "./globals.css";
import { Fira_Sans } from "next/font/google";
import Link from "next/link";

export const metadata = {
  title: "Jamful",
  description: "Jamful: music collaboration",
};

const fira = Fira_Sans({
  weight: "400",
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
            <Image src="/jamful.svg" height={40} width={94} alt="logo" />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
