import type { Metadata } from "next";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bubble",
  description: "Bubble is a math learning app.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
