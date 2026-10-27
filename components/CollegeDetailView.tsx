'use client'

import Link from 'next/link'
import React from 'react'
import type { Institution } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowLeft, ExternalLink, School, MapPin, Calculator, Award } from 'lucide-react'

function formatInteger(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value?: number | null) {
  return value == null ? 'N/A' : `${Math.round(value * 100)}%`
}

function formatCurrency(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export default function CollegeDetailView({ institution }: { institution: Institution }) {
  const { t } = useLanguage()
  const loc = t.collegesHub

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:py-10">
      {/* Header */}
      <header className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0064a4]">
          <Award className="w-3.5 h-3.5" />
          <span>{loc.auditBadge}</span>
        </div>
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
          {loc.profileTitle}
        </p>
        <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {institution.name}
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-600 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {institution.city}, {institution.state}
          </span>
          <span>•</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            {institution.control ?? 'Unknown'}
          </span>
          {institution.locale && (
            <>
              <span>•</span>
              <span className="text-slate-500 text-xs">{institution.locale}</span>
            </>
          )}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{loc.backToExplorer}</span>
          </Link>
          {institution.website && (
            <a
              href={institution.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0064a4] px-4 py-2 text-xs font-bold text-white hover:bg-[#0c2340] transition-colors shadow-2xs"
            >
              <span>{loc.visitOfficialSite}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* 4 Big Metrics */}
      <section className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{loc.students}</div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-slate-900">
            {formatInteger(institution.student_size)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{loc.admitRate}</div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-emerald-700">
            {formatPercent(institution.admission_rate)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{loc.netPrice}</div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-[#0064a4]">
            {formatCurrency(institution.avg_net_price)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{loc.completion}</div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-sky-700">
            {formatPercent(institution.completion_rate)}
          </div>
        </div>
      </section>

      {/* Detailed Tables */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <School className="w-4 h-4 text-[#0064a4]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {loc.admissionsScaleTitle}
            </h2>
          </div>
          <dl className="mt-4 space-y-3.5 text-sm">
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.satAverage}</dt>
              <dd className="font-mono font-semibold text-slate-900">{formatInteger(institution.sat_average)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.actMidpoint}</dt>
              <dd className="font-mono font-semibold text-slate-900">{institution.act_midpoint ?? 'N/A'}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.retentionRate}</dt>
              <dd className="font-mono font-semibold text-emerald-700">{formatPercent(institution.retention_rate)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.highestDegree}</dt>
              <dd className="font-medium text-slate-800">{institution.highest_degree ?? 'N/A'}</dd>
            </div>
            <div className="flex justify-between items-center gap-4">
              <dt className="text-slate-500">{loc.carnegieBasic}</dt>
              <dd className="text-right font-medium text-slate-800">{institution.carnegie_basic ?? 'N/A'}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calculator className="w-4 h-4 text-[#0064a4]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {loc.costsOutcomesTitle}
            </h2>
          </div>
          <dl className="mt-4 space-y-3.5 text-sm">
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.inStateTuition}</dt>
              <dd className="font-mono font-semibold text-slate-900">{formatCurrency(institution.tuition_in_state)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.outOfStateTuition}</dt>
              <dd className="font-mono font-semibold text-slate-900">{formatCurrency(institution.tuition_out_of_state)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.federalAidRate}</dt>
              <dd className="font-mono font-semibold text-sky-700">{formatPercent(institution.federal_aid_rate)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2">
              <dt className="text-slate-500">{loc.medianEarnings}</dt>
              <dd className="font-mono font-semibold text-emerald-700">{formatCurrency(institution.median_earnings_10yr)}</dd>
            </div>
            <div className="flex justify-between items-center gap-4">
              <dt className="text-slate-500">{loc.priceCalculator}</dt>
              <dd className="text-right">
                {institution.price_calculator_url ? (
                  <a
                    href={institution.price_calculator_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0064a4] hover:underline"
                  >
                    <span>{loc.openCalculator}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">N/A</span>
                )}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  )
}
