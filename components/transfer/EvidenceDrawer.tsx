'use client'

import { useEffect, useMemo, useState } from 'react'
import { getProfile, getProvenance } from '@/lib/api'
import { getOfficialResources } from '@/lib/admissionsGuidance'
import type { ProvenanceEntry, ProfileResponse } from '@/lib/types'

interface EvidenceDrawerProps {
  open: boolean
  onClose: () => void
  campus: string
  cohort: 'transfer' | 'freshman'
  focus: string
  years: number[]
  sourceSchool?: string | null
  schoolType?: string | null
}

export default function EvidenceDrawer({
  open,
  onClose,
  campus,
  cohort,
  focus,
  years,
  sourceSchool,
  schoolType
}: EvidenceDrawerProps) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [provenance, setProvenance] = useState<ProvenanceEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    setError(null)

    const targetYear = years.length ? years[0] : undefined
    Promise.all([
      getProfile(cohort, {
        campus,
        ...(cohort === 'transfer' ? { major: focus } : { discipline: focus }),
        ...(sourceSchool ? { source_school: sourceSchool } : {}),
        ...(schoolType ? { school_type: schoolType } : {}),
        years
      }),
      getProvenance({
        campus,
        year: targetYear,
        ...(sourceSchool ? { source_school: sourceSchool } : {})
      })
    ])
      .then(([profileData, provenanceData]) => {
        if (!cancelled) {
          setProfile(profileData)
          setProvenance(provenanceData)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err)
          setError('Unable to load evidence right now')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [open, campus, cohort, focus, years, sourceSchool, schoolType])

  const outdatedWarning = useMemo(() => {
    if (!profile) return null
    const cutoff = new Date().getFullYear() - 3
    return profile.metrics.some((metric) => metric.year <= cutoff)
      ? 'Warning: Some evidence is older than three years.'
      : null
  }, [profile])
  const officialResources = useMemo(() => getOfficialResources(campus, cohort), [campus, cohort])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex items-start justify-between border-b border-white/5 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-amber-300">
              Audit Data & Sources
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Evidence Drawer</h3>
            <p className="mt-0.5 text-xs font-mono text-slate-400">{campus} · {cohort}</p>
            {sourceSchool && <p className="mt-1 text-xs font-mono text-amber-300">{sourceSchool}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-spring hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {loading && (
          <div className="flex items-center gap-3 py-8 text-sm text-slate-400">
            <svg className="h-5 w-5 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading evidence…</span>
          </div>
        )}
        {error && <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
        {outdatedWarning && (
          <p className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
            {outdatedWarning}
          </p>
        )}
        {profile && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Profile Reporting Years</p>
              <p className="mt-1 text-base font-mono font-semibold text-white">{profile.years.join(', ') || 'n/a'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-300">Official Planning Links</p>
              <div className="mt-3 space-y-3">
                {officialResources.map((resource) => (
                  <div key={resource.url} className="border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 hover:underline"
                    >
                      <span>{resource.label}</span>
                      <svg className="h-3 w-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{resource.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {profile.metrics.map((metric) => (
                <div key={metric.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-spring hover:border-white/20">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">{metric.stat_name}</p>
                  <p className="mt-1 text-2xl font-mono font-bold text-white">
                    {metric.stat_value_numeric != null ? metric.stat_value_numeric.toFixed(2) : metric.stat_value_text ?? '—'}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className="rounded-md bg-white/5 px-2 py-0.5">{metric.year} · {metric.term}</span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5">Unit: {metric.unit ?? 'n/a'}</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    {metric.citations.map((cite) => (
                      <p key={cite.source_url} className="mt-1">
                        <a href={cite.source_url} target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                          {cite.title}
                        </a>{' '}
                        · <span className="text-slate-500">{cite.publisher}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {provenance.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">Data Provenance</h4>
            {provenance.map((entry) => (
              <div key={entry.dataset.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-xs text-slate-400">
                <p className="font-semibold text-white">{entry.dataset.title}</p>
                <p className="mt-0.5 font-mono text-slate-500">Year {entry.dataset.year} · {entry.dataset.term}</p>
                {entry.citations.map((cite) => (
                  <p key={cite.source_url} className="mt-2 text-xs">
                    {cite.title} (
                    <a className="text-amber-300 hover:underline" href={cite.source_url} target="_blank" rel="noreferrer">
                      source
                    </a>
                    )
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
