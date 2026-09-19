import React from 'react'
import Link from 'next/link'
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body'
})

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display'
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  title: 'ScholarStack | Evidence-Backed California College Planning',
  description: 'Evidence-backed California college planning and admissions intelligence with official provenance.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/icon.svg'
  },
  openGraph: {
    title: 'ScholarStack | California Admissions Intelligence',
    description: 'Evidence-backed California college planning with transparent citations and transfer guarantees.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarStack | California Admissions Intelligence',
    description: 'Evidence-backed California college planning with transparent citations and transfer guarantees.'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} bg-[#030712] text-[#f3f4f6] antialiased`}>
        <div className="relative min-h-[100dvh] flex flex-col justify-between">
          {/* Top Non-Affiliation Micro-Bar */}
          <div className="relative z-50 border-b border-white/5 bg-slate-950/90 py-1.5 px-4 text-center text-[11px] font-medium tracking-wide text-slate-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 mr-2 animate-pulse" />
            Independent research platform. Not affiliated with UC, CSU, or ASSIST. Official data year & term matter.
          </div>

          {/* Floating Island Glass Pill Navbar */}
          <header className="sticky top-3 z-40 mx-auto w-[calc(100%-2rem)] max-w-5xl">
            <div className="rounded-full border border-white/10 bg-slate-950/80 p-1.5 backdrop-blur-2xl shadow-2xl shadow-black/80 ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="flex items-center justify-between px-4 py-1.5">
                {/* Brand */}
                <Link href="/" className="group flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-amber-400 p-[1px] shadow-sm shadow-sky-500/30">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                      <svg className="h-4 w-4 text-sky-400 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    ScholarStack
                  </span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
                  <Link
                    href="/"
                    className="rounded-full px-3.5 py-1.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    href="/planner"
                    className="rounded-full px-3.5 py-1.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    Planner
                  </Link>
                  <Link
                    href="/search"
                    className="rounded-full px-3.5 py-1.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    Source Schools
                  </Link>
                  <Link
                    href="/colleges"
                    className="rounded-full px-3.5 py-1.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    Colleges
                  </Link>
                  <Link
                    href="/ingest"
                    className="rounded-full px-3.5 py-1.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    AI Ingest
                  </Link>
                </nav>

                {/* Button-in-Button Launch Action */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/planner"
                    className="group relative inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/15 pl-4 pr-1.5 py-1.5 text-xs font-semibold text-sky-200 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sky-500/25 active:scale-[0.98]"
                  >
                    <span>Launch Planner</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            {children}
          </div>

          {/* Modern Footer */}
          <footer className="relative z-20 border-t border-white/10 bg-slate-950/80 py-10 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/10 text-sky-400 font-bold text-[10px]">
                  SS
                </div>
                <div>
                  <span className="font-semibold text-slate-200">ScholarStack</span>
                  <span className="ml-2 text-[11px] text-slate-500">Autonomous California Admissions Intelligence</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Official Harvester Active
                </div>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
