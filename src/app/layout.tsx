import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LayoutContainer from "@/components/LayoutContainer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LayoutContainer>
        <body
          className={cn(
            "min-h-screen w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white/90",
            inter.className
          )}
        >
          <Navbar />
          <div className="max-w-screen-2xl mx-auto p-4 md:px-12">
            {children}
          </div>
        </body>
      </LayoutContainer>
    </html>
  );
}
