import React from 'react'
import { ShieldCheck, BookOpen, Calendar, Award, Calculator, Download, RefreshCw, PlusCircle, FileText } from 'lucide-react'
import { GoogleAuthButton } from './auth/GoogleAuthButton'
import { GoogleUser, SyncStatus } from '../services/drive/types'

export type NavigationTab = 'ELIGIBILITY' | 'PLANNER' | 'DEGREE' | 'GPA'

interface NavbarProps {
  activeTab: NavigationTab
  onSelectTab: (tab: NavigationTab) => void
  onReset: () => void
  onExport: () => void
  onOpenManualEntry: () => void
  onOpenImportModal: () => void
  googleUser: GoogleUser | null
  syncStatus: SyncStatus
  onConnectGoogle: () => void
  onOpenSyncModal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onReset,
  onExport,
  onOpenManualEntry,
  onOpenImportModal,
  googleUser,
  syncStatus,
  onConnectGoogle,
  onOpenSyncModal
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3 order-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-anteater-blue via-blue-600 to-anteater-darkBlue shadow-md shadow-blue-500/20 ring-1 ring-white/20">
            <span className="text-xl font-black text-anteater-gold tracking-tighter">AT</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">AntTrail</span>
              <span className="rounded-full bg-anteater-blue/20 px-2 py-0.5 text-xs font-semibold text-sky-300 ring-1 ring-sky-500/30">
                Phase 6
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Privacy-First Academic Planner for UC Irvine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="order-3 md:order-2 flex w-full md:w-auto items-center gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-1 scrollbar-none">
          <button
            onClick={() => onSelectTab('ELIGIBILITY')}
            className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'ELIGIBILITY'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Eligibility</span>
          </button>

          <button
            onClick={() => onSelectTab('PLANNER')}
            className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'PLANNER'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Quarter Planner</span>
          </button>

          <button
            onClick={() => onSelectTab('DEGREE')}
            className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'DEGREE'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Degree Audit</span>
          </button>

          <button
            onClick={() => onSelectTab('GPA')}
            className={`flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'GPA'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>GPA Calculator</span>
          </button>
        </nav>

        {/* Privacy & Actions */}
        <div className="order-2 md:order-3 flex items-center gap-2 sm:gap-2.5">
          <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zero Server Retention</span>
          </div>

          <GoogleAuthButton
            user={googleUser}
            syncStatus={syncStatus}
            onConnect={onConnectGoogle}
            onOpenSyncModal={onOpenSyncModal}
          />

          <button
            onClick={onOpenImportModal}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-950/30 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-300 transition-colors"
            title="Import unofficial transcript or DegreeWorks audit"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            onClick={onOpenManualEntry}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-sky-400 hover:bg-slate-800 hover:text-sky-300 transition-colors"
            title="Add completed course manually"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Course</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-colors"
            title="Export profile JSON"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Reset to Fresh Profile"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
