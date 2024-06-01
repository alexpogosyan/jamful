import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jamful",
  description: "Music improvisation community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans`}>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <footer className="flex h-16 w-full items-center justify-center border-t border-t-foreground/10 bg-gray-700 text-center text-sm text-gray-100">
            &copy; 2024 Jamful
          </footer>
        </div>
      </body>
    </html>
  );
}
