import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/app/navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Cozy Threads",
  description: "Ethically Sourced Apparel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
