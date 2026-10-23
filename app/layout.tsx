import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import FeedbackFloatingBadge from '@/components/FeedbackFloatingBadge';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
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
  metadataBase: new URL('https://anttrail.vercel.app'),
  title: 'AntTrail — Privacy-First Academic Operating System for UC Irvine',
  description:
    'AntTrail is the unified academic workstation for UC Irvine: deterministic prerequisite AST solver, WebReg seat drop radar, California CC transfer articulation, and Canvas task matrix. 100% free and open-source with zero server retention.',
  keywords: [
    'AntTrail',
    'UCI',
    'UC Irvine',
    'everyUCI',
    'ZotSniper',
    'ZotCanvas',
    'Degree Planning',
    'Canvas LMS',
    'Prerequisite Engine',
    'WebReg',
    'DegreeWorks',
    'UCI GPA Calculator',
    'Transfer Articulation',
    'STEM Study Cards',
    'IVC to UCI',
    'OCC to UCI'
  ],
  authors: [{ name: 'AntTrail Community', url: 'https://github.com/rchau8502/AntTrail' }],
  creator: 'AntTrail Team',
  publisher: 'AntTrail',
  openGraph: {
    title: 'AntTrail — Academic Operating System for UC Irvine',
    description:
      'Deterministic prerequisite tree solver, WebReg seat drop radar, CC transfer calculator & Canvas tactical dashboard.',
    url: 'https://anttrail.vercel.app',
    siteName: 'AntTrail',
    images: [
      {
        url: '/marketing/anttrail-instagram-promo.jpg',
        width: 1024,
        height: 1024,
        alt: 'AntTrail — Academic Operating System for UC Irvine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AntTrail — Academic Operating System for UC Irvine',
    description:
      'WebReg Tactical Drop Radar, 4-Year Schedule Engine & Transfer Articulation.',
    images: ['/marketing/anttrail-instagram-promo.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AntTrail',
  },
  manifest: '/manifest.json',
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
            <FeedbackFloatingBadge />
            <ServiceWorkerRegister />
          </LanguageProvider>
        </StorageProvider>
      </body>
    </html>
  );
}
