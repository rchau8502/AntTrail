import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { StorageProvider } from "@/context/storage-context";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ZotCanvas | Anteater Academic Command Center",
  description: "Privacy-first, zero-storage study organizer & tactical workload engine for UC Irvine students.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen font-sans bg-[#f8fafc] text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        <StorageProvider>
          {children}
        </StorageProvider>
      </body>
    </html>
  );
}
