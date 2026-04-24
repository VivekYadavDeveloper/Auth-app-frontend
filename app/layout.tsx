import type { Metadata } from "next";
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",

  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],

  variable: "--font-ovo",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Auth App",
  description: "Auth Application with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden min-h-screen flex flex-col`}
    >
      <body className="min-h-full flex flex-col dark">
        <Toaster/>
        <Navbar />
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
