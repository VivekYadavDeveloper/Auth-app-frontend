import type { Metadata } from "next";
import { Outfit, Ovo, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("antialiased", "leading-8", "overflow-x-hidden", "min-h-screen", "flex", "flex-col", outfit.className, ovo.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
