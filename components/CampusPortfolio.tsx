'use client'

import React, { useMemo, useState } from 'react'
import {
  evaluateCampusAdmission,
  calculatePortfolioHealth,
  PRESET_PORTFOLIOS,
  APPLICATION_DEADLINES,
  type CampusAdmissionEvaluation,
  type ChancingTier
} from '@/lib/portfolioAdvisor'
import { TARGET_CAMPUSES } from '@/lib/catalog'

interface CampusPortfolioProps {
  studentGpa: number | null
  cohort: 'transfer' | 'freshman'
  focus: string
  activeCampus: string
  onSelectActiveCampus: (campus: string) => void
  savedCampuses?: string[]
  onUpdateCampuses?: (campuses: string[]) => void
}

const DEFAULT_CAMPUSES = [
  'UC Berkeley',
  'UCLA',
  'UC San Diego',
  'UC Irvine',
  'UC Davis',
  'Cal Poly San Luis Obispo'
]

// Pure Vector SVG Icons (No Emojis)
function IconGuaranteed({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  )
}

function IconTarget({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconReach({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )
}

function IconSafety({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function IconClose({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconCheck({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

export default function CampusPortfolio({
  studentGpa,
  cohort,
  focus,
  activeCampus,
  onSelectActiveCampus,
  savedCampuses,
  onUpdateCampuses
}: CampusPortfolioProps) {
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>(
    savedCampuses && savedCampuses.length > 0 ? savedCampuses : DEFAULT_CAMPUSES
  )
  const [viewMode, setViewMode] = useState<'matrix' | 'deadlines'>('matrix')
  const [copied, setCopied] = useState(false)

  const updateCampuses = (next: string[]) => {
    setSelectedCampuses(next)
    onUpdateCampuses?.(next)
  }

  const evaluations: CampusAdmissionEvaluation[] = useMemo(() => {
    return selectedCampuses.map((campus) =>
      evaluateCampusAdmission({
        campus,
        studentGpa,
        cohort,
        focus
      })
    )
  }, [selectedCampuses, studentGpa, cohort, focus])

  const health = useMemo(() => {
    return calculatePortfolioHealth(evaluations)
  }, [evaluations])

  const tierGroups = useMemo(() => {
    const groups: Record<ChancingTier, CampusAdmissionEvaluation[]> = {
      guaranteed: [],
      target: [],
      reach: [],
      safety: []
    }
    evaluations.forEach((evaluation) => {
      groups[evaluation.tier].push(evaluation)
    })
    return groups
  }, [evaluations])

  const relevantDeadlines = useMemo(() => {
    return APPLICATION_DEADLINES.filter(
      (d) => d.appliesTo === 'both' || d.appliesTo === cohort
    )
  }, [cohort])

  const handleAddCampus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const campus = e.target.value
    if (!campus || selectedCampuses.includes(campus)) return
    updateCampuses([...selectedCampuses, campus])
    e.target.value = ''
  }

  const handleRemoveCampus = (campusToRemove: string) => {
    updateCampuses(selectedCampuses.filter((c) => c !== campusToRemove))
  }

  const handleApplyPreset = (campuses: string[]) => {
    updateCampuses(campuses)
  }

  const handleCopySummary = () => {
    const lines = [
      `ScholarStack Application Portfolio for ${focus} (${cohort.toUpperCase()})`,
      studentGpa ? `Student GPA: ${studentGpa.toFixed(2)}` : 'Student GPA: Not specified',
      `Portfolio Balance Score: ${health.balanceScore}/100 (${health.statusLabel})`,
      '',
      `GUARANTEED (TAG/ADT): ${tierGroups.guaranteed.length}`,
      ...tierGroups.guaranteed.map(
        (e) => `  • ${e.campus} (${e.admitRate.toFixed(1)}% admit) - ${e.tierLabel}`
      ),
      '',
      `TARGET: ${tierGroups.target.length}`,
      ...tierGroups.target.map(
        (e) => `  • ${e.campus} (${e.admitRate.toFixed(1)}% admit, GPA: ${e.gpaP25.toFixed(2)}-${e.gpaP75.toFixed(2)})`
      ),
      '',
      `REACH: ${tierGroups.reach.length}`,
      ...tierGroups.reach.map(
        (e) => `  • ${e.campus} (${e.admitRate.toFixed(1)}% admit, GPA: ${e.gpaP25.toFixed(2)}-${e.gpaP75.toFixed(2)})`
      ),
      '',
      `LIKELY / SAFETY: ${tierGroups.safety.length}`,
      ...tierGroups.safety.map(
        (e) => `  • ${e.campus} (${e.admitRate.toFixed(1)}% admit, GPA: ${e.gpaP25.toFixed(2)}-${e.gpaP75.toFixed(2)})`
      ),
      '',
      `Counselor Recommendations:`,
      ...health.recommendations.map((r) => `  - ${r}`)
    ]

    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const availableToAdd = useMemo(() => {
    return TARGET_CAMPUSES.filter(
      (c) => c.segment !== 'CommunityCollege' && !selectedCampuses.includes(c.name)
    )
  }, [selectedCampuses])

  return (
    <div className="double-bezel-outer">
      <div className="double-bezel-inner p-6 sm:p-8">
        {/* Header with Eyebrow Badge */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Strategic Portfolio Engine
            </div>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              California Admissions Portfolio & Chancer
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
              Evaluate your admissions portfolio across Reach, Target, Safety, and Guaranteed TAG/ADT pathways for {focus}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View switcher */}
            <div className="inline-flex rounded-full border border-white/10 bg-slate-950/90 p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  viewMode === 'matrix'
                    ? 'bg-sky-500/20 text-sky-200 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Portfolio Chancer ({selectedCampuses.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('deadlines')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  viewMode === 'deadlines'
                    ? 'bg-sky-500/20 text-sky-200 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Application Deadlines
              </button>
            </div>

            {/* Button-in-button for copy */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-4 pr-1.5 py-1.5 text-xs font-medium text-slate-200 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 active:scale-[0.98]"
            >
              <span>{copied ? 'Copied Portfolio' : 'Copy Summary'}</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-transform duration-300 group-hover:scale-105">
                {copied ? <IconCheck className="h-3 w-3 text-emerald-400" /> : (
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Health Meter & Summary Banner */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400">Evaluated GPA</span>
                <span className="text-sm font-bold text-white">
                  {studentGpa != null && studentGpa > 0 ? studentGpa.toFixed(2) : 'Unspecified'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400">Balance Score:</span>
                <span
                  className={`text-sm font-bold ${
                    health.balanceScore >= 80
                      ? 'text-emerald-400'
                      : health.balanceScore >= 60
                        ? 'text-sky-400'
                        : 'text-amber-400'
                  }`}
                >
                  {health.balanceScore} / 100
                </span>
                <span className="text-xs font-medium text-slate-400">({health.statusLabel})</span>
              </div>
            </div>

            {/* Strict Vector Tier Counts (No Emojis) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                <IconGuaranteed className="h-3.5 w-3.5 text-emerald-400" />
                {health.guaranteedCount} Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-sky-300">
                <IconTarget className="h-3.5 w-3.5 text-sky-400" />
                {health.targetCount} Target
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-rose-300">
                <IconReach className="h-3.5 w-3.5 text-rose-400" />
                {health.reachCount} Reach
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-teal-300">
                <IconSafety className="h-3.5 w-3.5 text-teal-400" />
                {health.safetyCount} Safety
              </span>
            </div>
          </div>

          {/* Counselor Advice Callout */}
          <div className="mt-4 border-t border-white/10 pt-3.5">
            <p className="text-xs font-medium leading-relaxed text-slate-300">
              {health.summary}
            </p>
            {health.recommendations.length > 0 && (
              <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                {health.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-sky-400 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Preset Templates and Add Dropdown */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Presets:</span>
            {PRESET_PORTFOLIOS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.campuses)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/15 hover:text-white"
              >
                {preset.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value=""
              onChange={handleAddCampus}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-1.5 text-xs text-slate-300 focus:border-sky-500 focus:outline-none"
            >
              <option value="">+ Add Campus to Portfolio...</option>
              {availableToAdd.map((campus) => (
                <option key={campus.name} value={campus.name}>
                  {campus.name} ({campus.segment})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode: Matrix Chancer */}
        {viewMode === 'matrix' && (
          <div className="mt-8 space-y-8">
            {/* Guaranteed Group */}
            {tierGroups.guaranteed.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
                    <IconGuaranteed className="h-3 w-3" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Guaranteed Pathways (UC TAG / CSU ADT) &bull; {tierGroups.guaranteed.length}
                  </h3>
                </div>
                <div className="mt-3.5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tierGroups.guaranteed.map((evaluation) => (
                    <CampusCard
                      key={evaluation.campus}
                      evaluation={evaluation}
                      isActive={evaluation.campus === activeCampus}
                      onSelectActiveCampus={onSelectActiveCampus}
                      onRemove={handleRemoveCampus}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Target Group */}
            {tierGroups.target.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/20 text-sky-400">
                    <IconTarget className="h-3 w-3" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Target (Mid-50% Competitive Match) &bull; {tierGroups.target.length}
                  </h3>
                </div>
                <div className="mt-3.5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tierGroups.target.map((evaluation) => (
                    <CampusCard
                      key={evaluation.campus}
                      evaluation={evaluation}
                      isActive={evaluation.campus === activeCampus}
                      onSelectActiveCampus={onSelectActiveCampus}
                      onRemove={handleRemoveCampus}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Reach Group */}
            {tierGroups.reach.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500/20 text-rose-400">
                    <IconReach className="h-3 w-3" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Reach (High Selectivity or Academic Stretch) &bull; {tierGroups.reach.length}
                  </h3>
                </div>
                <div className="mt-3.5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tierGroups.reach.map((evaluation) => (
                    <CampusCard
                      key={evaluation.campus}
                      evaluation={evaluation}
                      isActive={evaluation.campus === activeCampus}
                      onSelectActiveCampus={onSelectActiveCampus}
                      onRemove={handleRemoveCampus}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Safety Group */}
            {tierGroups.safety.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-500/20 text-teal-400">
                    <IconSafety className="h-3 w-3" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Likely / Safety (High Acceptance Odds) &bull; {tierGroups.safety.length}
                  </h3>
                </div>
                <div className="mt-3.5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tierGroups.safety.map((evaluation) => (
                    <CampusCard
                      key={evaluation.campus}
                      evaluation={evaluation}
                      isActive={evaluation.campus === activeCampus}
                      onSelectActiveCampus={onSelectActiveCampus}
                      onRemove={handleRemoveCampus}
                    />
                  ))}
                </div>
              </div>
            )}

            {evaluations.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-xs text-slate-400">
                No campuses in your portfolio yet. Select a preset above or choose from the dropdown.
              </div>
            )}
          </div>
        )}

        {/* View Mode: California Application Deadlines */}
        {viewMode === 'deadlines' && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-sky-200">
              <strong>California Strategic Application Calendar:</strong> UC and CSU applications follow strict statutory windows. Community college transfer students have earlier TAG deadlines in September and mandatory grade updates in January.
            </div>

            <div className="relative border-l-2 border-white/10 pl-6 space-y-7">
              {relevantDeadlines.map((deadline) => (
                <div key={deadline.id} className="relative">
                  <div
                    className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 ${
                      deadline.critical
                        ? 'border-amber-400 bg-amber-400 shadow-amber-500/50 shadow-sm'
                        : 'border-white/30 bg-slate-900'
                    }`}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{deadline.title}</span>
                      {deadline.critical && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                          Critical
                        </span>
                      )}
                    </div>
                    <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-sky-300">
                      {deadline.dateDisplay}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{deadline.description}</p>
                  <div className="mt-2 text-xs font-medium text-amber-200/90 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>Action item: {deadline.actionItem}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CampusCard({
  evaluation,
  isActive,
  onSelectActiveCampus,
  onRemove
}: {
  evaluation: CampusAdmissionEvaluation
  isActive: boolean
  onSelectActiveCampus: (campus: string) => void
  onRemove: (campus: string) => void
}) {
  const {
    campus,
    segment,
    tier,
    tierLabel,
    tierColor,
    admitRate,
    gpaP25,
    gpaP75,
    studentGpa,
    netPrice,
    medianEarnings,
    summary
  } = evaluation

  const gpaPercent = useMemo(() => {
    if (studentGpa == null || studentGpa <= 0) return null
    const minScale = Math.min(gpaP25 - 0.3, 3.0)
    const maxScale = Math.max(gpaP75 + 0.1, 4.0)
    const range = maxScale - minScale
    const percent = ((studentGpa - minScale) / range) * 100
    return Math.min(Math.max(percent, 5), 95)
  }, [studentGpa, gpaP25, gpaP75])

  const colorClasses = {
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    sky: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    rose: 'border-rose-500/30 bg-rose-500/10 text-rose-300'
  }[tierColor]

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isActive
          ? 'border-sky-500/80 bg-sky-950/20 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/40'
          : 'border-white/10 bg-slate-950/70 hover:border-white/20 hover:bg-slate-950/90'
      }`}
    >
      <div>
        {/* Top bar with Segment & Tier Badges */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">{segment}</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${colorClasses}`}>
                {tierLabel}
              </span>
            </div>
            <h4 className="mt-1.5 font-bold text-white text-base tracking-tight">{campus}</h4>
          </div>

          <button
            type="button"
            onClick={() => onRemove(campus)}
            title="Remove from portfolio"
            aria-label={`Remove ${campus} from portfolio`}
            className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
          >
            <IconClose className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Admit Rate & Mid 50% GPA */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Admit Rate</div>
            <div className="mt-0.5 font-bold text-white text-sm">{admitRate.toFixed(1)}%</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Mid 50% GPA</div>
            <div className="mt-0.5 font-bold text-white text-sm">
              {gpaP25.toFixed(2)} - {gpaP75.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Visual GPA Percentile Bar with Student Pin */}
        <div className="mt-3.5">
          <div className="flex justify-between text-[10px] font-medium text-slate-400">
            <span>25th: {gpaP25.toFixed(2)}</span>
            <span>75th: {gpaP75.toFixed(2)}</span>
          </div>
          <div className="relative mt-1.5 h-2 w-full rounded-full bg-slate-800">
            <div className="absolute left-[25%] right-[25%] h-full rounded-full bg-sky-400/30" />
            {gpaPercent != null && (
              <div
                style={{ left: `${gpaPercent}%` }}
                className="absolute -top-1 h-4 w-2 -translate-x-1/2 rounded-full border border-white bg-sky-400 shadow-md shadow-sky-400/50"
                title={`Your GPA: ${studentGpa?.toFixed(2)}`}
              />
            )}
          </div>
        </div>

        {/* Scorecard Data */}
        {(netPrice != null || medianEarnings != null) && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            {netPrice != null && <span>Net: ${netPrice.toLocaleString()}/yr</span>}
            {medianEarnings != null && <span>Earnings: ${medianEarnings.toLocaleString()}</span>}
          </div>
        )}

        <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{summary}</p>
      </div>

      {/* Button-in-Button Action */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => onSelectActiveCampus(campus)}
          className={`group/btn flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
            isActive
              ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40'
              : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span>{isActive ? 'Active in Planner' : 'Deep-Dive in Planner'}</span>
          <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-300 ${
            isActive ? 'bg-sky-400 text-slate-950' : 'bg-white/10 text-slate-400 group-hover/btn:translate-x-0.5'
          }`}>
            {isActive ? <IconCheck className="h-3 w-3" /> : (
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
