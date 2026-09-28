import React from 'react'
import { ShieldCheck, BookOpen, Calendar, Award, Calculator, Download, RefreshCw } from 'lucide-react'

interface NavbarProps {
  onReset: () => void
  onExport: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, onExport }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-anteater-blue via-blue-600 to-anteater-darkBlue shadow-md shadow-blue-500/20 ring-1 ring-white/20">
            <span className="text-xl font-black text-anteater-gold tracking-tighter">AT</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">AntTrail</span>
              <span className="rounded-full bg-anteater-blue/20 px-2 py-0.5 text-xs font-semibold text-sky-300 ring-1 ring-sky-500/30">
                UCI Prototype
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Privacy-First Academic Planner for UC Irvine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
            <BookOpen className="h-3.5 w-3.5" />
            Course Eligibility
          </button>
          <button
            title="Coming in Phase 2"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Calendar className="h-3.5 w-3.5" />
            Quarter Planner
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">Ph. 2</span>
          </button>
          <button
            title="Coming in Phase 2"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Award className="h-3.5 w-3.5" />
            Degree Audit
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">Ph. 2</span>
          </button>
          <button
            title="Coming in Phase 6"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            GPA Tracker
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">Ph. 6</span>
          </button>
        </nav>

        {/* Privacy & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zero Server Retention</span>
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors"
            title="Export profile JSON"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Reset to Fresh Profile"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  )
}
