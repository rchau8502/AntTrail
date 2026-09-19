import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionFromSupabase } from '@/lib/server/institutions'

function formatInteger(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value?: number | null) {
  return value == null ? 'N/A' : `${Math.round(value * 100)}%`
}

function formatCurrency(value?: number | null) {
  return value == null ? 'N/A' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export default async function CollegeProfilePage({ params }: { params: Promise<{ externalId: string }> }) {
  const { externalId } = await params
  const institution = await getInstitutionFromSupabase(externalId)

  if (!institution) {
    notFound()
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <header className="double-bezel-outer">
        <div className="double-bezel-inner p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-300">
            Institutional Audit
          </div>
          <p className="mt-2 text-xs font-mono uppercase tracking-[0.24em] text-slate-400">College profile</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{institution.name}</h1>
          <p className="mt-2 text-sm font-mono text-slate-400">
            {institution.city}, {institution.state} • {institution.control ?? 'Unknown control'}
            {institution.locale ? ` • ${institution.locale}` : ''}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/colleges"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition-spring hover:border-white/25 hover:bg-white/10 active:scale-95"
            >
              <svg className="h-3.5 w-3.5 transition-spring group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to explorer</span>
            </Link>
            {institution.website && (
              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 pl-4 pr-1.5 py-1 text-xs font-semibold text-amber-200 transition-spring hover:border-amber-400 hover:bg-amber-400/20 active:scale-95"
              >
                <span>Visit official site</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 transition-spring group-hover:scale-105">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="double-bezel-outer transition-spring hover:-translate-y-0.5">
          <div className="double-bezel-inner flex h-full flex-col justify-between p-5">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">Students</div>
            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white">{formatInteger(institution.student_size)}</div>
          </div>
        </div>
        <div className="double-bezel-outer transition-spring hover:-translate-y-0.5">
          <div className="double-bezel-inner flex h-full flex-col justify-between p-5">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">Admission rate</div>
            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-emerald-400">{formatPercent(institution.admission_rate)}</div>
          </div>
        </div>
        <div className="double-bezel-outer transition-spring hover:-translate-y-0.5">
          <div className="double-bezel-inner flex h-full flex-col justify-between p-5">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">Average net price</div>
            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-amber-300">{formatCurrency(institution.avg_net_price)}</div>
          </div>
        </div>
        <div className="double-bezel-outer transition-spring hover:-translate-y-0.5">
          <div className="double-bezel-inner flex h-full flex-col justify-between p-5">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">Completion rate</div>
            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-sky-300">{formatPercent(institution.completion_rate)}</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Admissions and scale</p>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex justify-between gap-4">
              <dt>SAT average</dt>
              <dd className="text-white">{formatInteger(institution.sat_average)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>ACT midpoint</dt>
              <dd className="text-white">{institution.act_midpoint ?? 'N/A'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Retention rate</dt>
              <dd className="text-white">{formatPercent(institution.retention_rate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Highest degree</dt>
              <dd className="text-white">{institution.highest_degree ?? 'N/A'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Carnegie basic</dt>
              <dd className="text-right text-white">{institution.carnegie_basic ?? 'N/A'}</dd>
            </div>
          </dl>
        </article>

        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Costs and outcomes</p>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex justify-between gap-4">
              <dt>In-state tuition</dt>
              <dd className="text-white">{formatCurrency(institution.tuition_in_state)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Out-of-state tuition</dt>
              <dd className="text-white">{formatCurrency(institution.tuition_out_of_state)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Federal aid rate</dt>
              <dd className="text-white">{formatPercent(institution.federal_aid_rate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Median earnings (10y)</dt>
              <dd className="text-white">{formatCurrency(institution.median_earnings_10yr)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Price calculator</dt>
              <dd className="text-right text-white">
                {institution.price_calculator_url ? (
                  <a href={institution.price_calculator_url} target="_blank" rel="noreferrer" className="text-amber-200 underline-offset-4 hover:underline">
                    Open
                  </a>
                ) : (
                  'N/A'
                )}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  )
}
