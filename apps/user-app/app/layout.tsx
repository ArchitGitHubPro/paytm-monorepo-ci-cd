import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/provide";
import { AppbarClient } from "@/components/AppbarClient";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple Wallet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
            <body className={inter.className}>
              <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
                  <AppbarClient />
                  {children}
              </div>
            </body>
      </Provider>
    </html>
  );
}
