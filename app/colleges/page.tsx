'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getInstitutionDirectoryStatus, searchInstitutions } from '@/lib/api'
import type { Institution, InstitutionDirectoryStatus } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { School, Search, MapPin, ArrowRight, ExternalLink, Sparkles, Building2 } from 'lucide-react'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
  'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
  'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
]

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
  const { t } = useLanguage()
  const loc = t.collegesHub

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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      {/* Header */}
      <header className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0064a4]">
          <School className="w-3.5 h-3.5" />
          <span>{loc.badge}</span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {loc.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
          {loc.subtitle}
        </p>
      </header>

      {/* Filter Toolbar */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-end gap-3 sm:gap-4">
          <label className="flex min-w-[220px] flex-1 flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {loc.searchLabel}
            </span>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(event) => {
                  setPage(1)
                  setQuery(event.target.value)
                }}
                placeholder={loc.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
              />
            </div>
          </label>

          <label className="flex min-w-[130px] flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {loc.stateLabel}
            </span>
            <select
              value={state}
              onChange={(event) => {
                setPage(1)
                setState(event.target.value)
              }}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
            >
              <option value="">{loc.allStates}</option>
              {US_STATES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-[200px] flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {loc.controlLabel}
            </span>
            <select
              value={control}
              onChange={(event) => {
                setPage(1)
                setControl(event.target.value)
              }}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
            >
              <option value="">{loc.allControls}</option>
              <option value="Public">{loc.public}</option>
              <option value="Private nonprofit">{loc.privateNonprofit}</option>
              <option value="Private for-profit">{loc.privateForProfit}</option>
            </select>
          </label>
        </div>

        {/* Status badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
            {loading ? loc.loading : `${total} ${loc.collegesMatched}`}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-500">
            {loc.sourceText}
          </span>
          {status && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-600">
              {status.is_fallback ? loc.curatedBadge : `Directory: ${status.institution_count}`}
            </span>
          )}
          {status?.is_fallback && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {loc.zeroConfigActive}
            </span>
          )}
        </div>
      </section>

      {/* Fallback info banner */}
      {status?.is_fallback && (
        <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 text-xs text-sky-900 flex items-start gap-2.5">
          <Building2 className="w-4 h-4 text-[#0064a4] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{loc.zeroConfigBannerTitle}</span>{' '}
            <span>{loc.zeroConfigBannerDesc}</span>
          </div>
        </section>
      )}

      {/* No results message */}
      {!loading && !results.length && (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-xs">
          {loc.noResults}
        </section>
      )}

      {/* College Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((institution) => (
          <article
            key={institution.external_id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-[#0064a4]/40 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0064a4] transition-colors truncate">
                    {institution.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{institution.city}, {institution.state}</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {institution.control ?? 'Unknown'}
                </span>
              </div>

              {/* 4 Key Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {loc.students}
                  </div>
                  <div className="mt-0.5 font-mono text-base font-bold text-slate-900">
                    {formatInteger(institution.student_size)}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {loc.admitRate}
                  </div>
                  <div className="mt-0.5 font-mono text-base font-bold text-emerald-700">
                    {formatPercent(institution.admission_rate)}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {loc.netPrice}
                  </div>
                  <div className="mt-0.5 font-mono text-base font-bold text-[#0064a4]">
                    {formatCurrency(institution.avg_net_price)}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {loc.completion}
                  </div>
                  <div className="mt-0.5 font-mono text-base font-bold text-sky-700">
                    {formatPercent(institution.completion_rate)}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-2">
                {institution.highest_degree ?? loc.degreeProfileUnavailable}
                {institution.locale ? ` • ${institution.locale}` : ''}
                {institution.carnegie_basic ? ` • ${institution.carnegie_basic}` : ''}
              </p>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
              <Link
                href={`/colleges/${encodeURIComponent(institution.external_id)}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3.5 py-1.5 text-xs font-bold text-[#0064a4] hover:bg-[#0064a4] hover:text-white transition-colors"
              >
                <span>{loc.viewProfile}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {institution.website && (
                <a
                  href={institution.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0064a4] transition-colors"
                >
                  <span>{loc.officialSite}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-200/80 pt-4">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1 || loading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors shadow-2xs"
        >
          {loc.previous}
        </button>
        <p className="text-xs font-semibold text-slate-500">
          {loc.pageOf.replace('{page}', String(page)).replace('{total}', String(totalPages))}
        </p>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages || loading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors shadow-2xs"
        >
          {loc.next}
        </button>
      </div>
    </div>
  )
}
