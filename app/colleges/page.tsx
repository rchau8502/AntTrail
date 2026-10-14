'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getInstitutionDirectoryStatus, searchInstitutions } from '@/lib/api'
import type { Institution, InstitutionDirectoryStatus } from '@/lib/types'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
  'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
  'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
]

const CONTROL_OPTIONS = ['Public', 'Private nonprofit', 'Private for-profit']

function formatInteger(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value?: number | null) {
  return value == null ? 'N/A' : `${Math.round(value * 100)}%`
}

function formatCurrency(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export default function CollegesPage() {
  const [query, setQuery] = useState('')
  const [state, setState] = useState('')
  const [control, setControl] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<Institution[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<InstitutionDirectoryStatus | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadStatus() {
      try {
        const payload = await getInstitutionDirectoryStatus()
        if (!cancelled) {
          setStatus(payload)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadStatus()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const payload = await searchInstitutions({
          search: query || undefined,
          state: state || undefined,
          control: control || undefined,
          page,
          per_page: 24
        })
        if (!cancelled) {
          setResults(payload.items)
          setTotal(payload.total)
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setResults([])
          setTotal(0)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [control, page, query, state])

  const totalPages = Math.max(1, Math.ceil(total / 24))

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <header className="glass-panel rounded-[1.75rem] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">National Directory</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">College explorer</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Browse a national institution layer backed by official College Scorecard fields. This sits alongside
          ScholarStack&apos;s California admissions metrics instead of replacing them.
        </p>
      </header>

      <section className="glass-panel rounded-3xl p-4 md:p-5">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-[220px] flex-1 flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Search</span>
            <input
              value={query}
              onChange={(event) => {
                setPage(1)
                setQuery(event.target.value)
              }}
              placeholder="Search college name"
              className="rounded-2xl border border-white/10 bg-[var(--panel-strong)] px-4 py-3 text-white"
            />
          </label>
          <label className="flex min-w-[160px] flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">State</span>
            <select
              value={state}
              onChange={(event) => {
                setPage(1)
                setState(event.target.value)
              }}
              className="rounded-2xl border border-white/10 bg-[var(--panel-strong)] px-4 py-3 text-slate-100"
            >
              <option value="">All states</option>
              {US_STATES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[220px] flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Control</span>
            <select
              value={control}
              onChange={(event) => {
                setPage(1)
                setControl(event.target.value)
              }}
              className="rounded-2xl border border-white/10 bg-[var(--panel-strong)] px-4 py-3 text-slate-100"
            >
              <option value="">All institution types</option>
              {CONTROL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {loading ? 'Loading…' : `${total} colleges matched`}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Source: College Scorecard</span>
          {status && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {status.is_fallback ? 'Curated CA Directory' : `Directory rows: ${status.institution_count}`}
            </span>
          )}
          {status?.is_fallback && (
            <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
              Zero-config mode active
            </span>
          )}
        </div>
      </section>

      {status?.is_fallback && (
        <section className="glass-panel rounded-3xl border border-sky-400/20 bg-[var(--cyan-soft)] p-4 text-xs text-slate-200">
          <span className="font-semibold text-white">Curated Zero-Config Mode:</span> Showing {status.institution_count} top California universities and feeder community colleges. To search all 6,000+ national institutions, connect Supabase credentials and sync the College Scorecard dataset.
        </section>
      )}

      {status && !status.configured && !status.is_fallback && (
        <section className="glass-panel rounded-3xl border border-amber-400/20 bg-[var(--accent-soft)] p-6 text-sm text-slate-100">
          Local college-directory reads are not configured. Missing env: {status.missing_env.join(', ')}.
        </section>
      )}

      {status?.configured && status.missing_table && !status.is_fallback && (
        <section className="glass-panel rounded-3xl border border-amber-400/20 bg-[var(--accent-soft)] p-6 text-sm text-slate-100">
          The `institution` table is not available yet. Run the institution migration before using the college explorer.
        </section>
      )}

      {status?.configured && !status.missing_table && !status.is_fallback && status.institution_count === 0 && (
        <section className="glass-panel rounded-3xl border border-sky-400/20 bg-[var(--cyan-soft)] p-6 text-sm text-slate-100">
          The directory is configured but empty. Run the College Scorecard sync to populate national college records.
        </section>
      )}

      {!loading && !results.length && (
        <section className="glass-panel rounded-3xl p-6 text-sm text-slate-300">
          No colleges are available yet for this filter.
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((institution) => (
          <article key={institution.external_id} className="double-bezel-outer transition-spring hover:-translate-y-1">
            <div className="double-bezel-inner flex h-full flex-col justify-between p-6">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">{institution.name}</h3>
                    <p className="mt-0.5 text-xs font-mono text-slate-400">
                      {institution.city}, {institution.state}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-slate-300">
                    {institution.control ?? 'Unknown'}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Students</div>
                    <div className="mt-1 font-mono text-base font-bold text-white">{formatInteger(institution.student_size)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Admit rate</div>
                    <div className="mt-1 font-mono text-base font-bold text-emerald-400">{formatPercent(institution.admission_rate)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Net price</div>
                    <div className="mt-1 font-mono text-base font-bold text-amber-300">{formatCurrency(institution.avg_net_price)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Completion</div>
                    <div className="mt-1 font-mono text-base font-bold text-sky-300">{formatPercent(institution.completion_rate)}</div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                  {institution.highest_degree ?? 'Degree profile unavailable'}{institution.locale ? ` • ${institution.locale}` : ''}
                  {institution.carnegie_basic ? ` • ${institution.carnegie_basic}` : ''}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <Link
                  href={`/colleges/${encodeURIComponent(institution.external_id)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 pl-3.5 pr-1.5 py-1 text-xs font-semibold text-amber-200 transition-spring hover:border-amber-400 hover:bg-amber-400/20 active:scale-95"
                >
                  <span>View profile</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 transition-spring group-hover:scale-105">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                {institution.website && (
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 transition-spring hover:text-white"
                  >
                    <span>Official site</span>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1 || loading}
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-slate-400">
          Page {page} of {totalPages}
        </p>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages || loading}
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
