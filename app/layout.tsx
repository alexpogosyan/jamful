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
        <div className="flex w-full flex-1 flex-col items-center gap-20">
          <Header />
          {children}
          <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
            &copy;Jamful
          </footer>
        </div>
      </body>
    </html>
  );
}
