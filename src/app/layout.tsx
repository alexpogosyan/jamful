import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/ui/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jamful",
  description: "Learn and practice music improvisation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center">
          <nav className="border-b-foreground/10 mb-4 flex h-12 w-full items-center border-b p-4">
            <Logo />
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
