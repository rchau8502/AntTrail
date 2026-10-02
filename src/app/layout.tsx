import type { Metadata } from "next";
import { StorageProvider } from "@/context/storage-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZotCanvas | Anteater Study & Workload Command Center",
  description: "Privacy-first study organization and workload companion for UC Irvine students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <StorageProvider>
          {children}
        </StorageProvider>
      </body>
    </html>
  );
}
