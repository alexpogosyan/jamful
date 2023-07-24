import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Header } from "../components/Header/Header";

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
        <Header user={null} />
        {children}
      </body>
    </html>
  );
}
