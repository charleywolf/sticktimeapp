import "./globals.css";

import Counter from "@/components/Counter";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SticktimeApp",
  description:
    "Discover and access a comprehensive list of local stick times in the Greater Westchester area. Our platform consolidates schedules and availability, making it easy to find your preferred ice time in one convenient location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(
          inter.className,
          "min-h-screen flex flex-col",
          "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
        )}
      >
        {children}

        <Footer />
        <Counter />
        <Toaster />
      </body>
    </html>
  );
}
