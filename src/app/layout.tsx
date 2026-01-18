import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Perps.fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

// npm i react-icons
// npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
// npm install @metamask/sdk
// npm i @wagmi/core

// npm install lightweight-charts
