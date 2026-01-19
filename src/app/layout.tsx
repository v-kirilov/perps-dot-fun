import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import SideNavigation from "@/components/SideNavigation";

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
          <div className="grid grid-cols-[16rem_1fr] min-h-[calc(100vh-64px)] gap-12">
            <SideNavigation />
            <div className="py-1">{children}</div>
          </div>
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
// npm install @heroicons/react
// npm install @supabase/supabase-js

