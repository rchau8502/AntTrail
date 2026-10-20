import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { StorageProvider } from '@/context/storage-context';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0064a4',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AntTrail — The Master Academic Planner & Campus Workstation for UC Irvine',
  description:
    'AntTrail is the unified academic operating system for UC Irvine: degree audits, deterministic prerequisite planner, Canvas LMS workstation, campus survival guides, easy courses (水课), transfer articulation, and STEM Bubble cards.',
  keywords: [
    'AntTrail',
    'UCI',
    'UC Irvine',
    'everyUCI',
    'ZotCanvas',
    'Bubble',
    'Degree Planning',
    'Canvas LMS',
    'Prerequisite Engine',
    'WebReg',
    'DegreeWorks',
    'UCI GPA Calculator',
    'Transfer Articulation',
    'STEM Study Cards'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans`}
      >
        <StorageProvider>
          <LanguageProvider>
            <Navbar />
            <SearchModal />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </StorageProvider>
      </body>
    </html>
  );
}
