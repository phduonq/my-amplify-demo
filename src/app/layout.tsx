"use client";

import { Amplify } from "aws-amplify";
import { Inter } from "next/font/google";
import config from "./config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(config);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
