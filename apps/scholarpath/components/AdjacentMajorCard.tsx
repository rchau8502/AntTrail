'use client'

import React from 'react'
import { getAdjacentMajors } from '@/lib/admissionsGuidance'

interface AdjacentMajorCardProps {
  currentFocus: string
  currentCampus: string
  currentAdmitRate: number | null
  onSelectMajor?: (major: string) => void
}

export default function AdjacentMajorCard({
  currentFocus,
  currentCampus,
  currentAdmitRate,
  onSelectMajor
}: AdjacentMajorCardProps) {
  const adjacentMajors = getAdjacentMajors(currentFocus)

  if (!adjacentMajors.length) return null

  return (
    <div className="double-bezel-outer">
      <div className="double-bezel-inner p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            Admissions Arbitrage & Alternate Pathways
          </div>
          {currentAdmitRate != null && currentAdmitRate < 25 && (
            <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              Current {currentFocus} Admit Rate: {currentAdmitRate.toFixed(1)}%
            </div>
          )}
        </div>

        <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-white">
          Higher-Acceptance Adjacent Majors at {currentCampus}
        </h3>
        <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
          Over 80% of applicants apply to the same crowded flagship majors. These related programs share core prerequisites with {currentFocus} but typically offer 2x to 5x higher admission odds.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {adjacentMajors.map((alt) => (
            <div
              key={alt.name}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-purple-500/40 hover:bg-slate-950/90"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-white text-base tracking-tight">{alt.name}</h4>
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
                  </svg>
                  <span>{alt.admitRateNote}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {alt.reason}
                </p>
                <div className="mt-3.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Shared Prerequisites:
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {alt.overlappingPrereqs.map((prereq) => (
                      <span
                        key={prereq}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {onSelectMajor && (
                <button
                  type="button"
                  onClick={() => onSelectMajor(alt.name)}
                  className="group/btn mt-4 flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 text-xs font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500/20 active:scale-[0.98]"
                >
                  <span>Switch Planner to {alt.name}</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-400/20 text-purple-300 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
