import Link from 'next/link'

const strategicFeatures = [
  {
    tag: 'Automated Audit',
    title: 'Zero-Typing Transcript Auditor',
    detail:
      'Paste raw unofficial coursework text from any California Community College portal. Instantly calculates UC/CSU transferable GPA, tracks units toward the 60-unit junior threshold, audits the UC 7-Course Pattern and CSU Golden Four, and populates the planner with one click.',
    linkText: 'Try Transcript Auditor',
    href: '/planner'
  },
  {
    tag: 'Admissions Arbitrage',
    title: 'Adjacent Major Discovery',
    detail:
      'Identifies high-acceptance alternative majors that share 80%+ of lower-division prerequisites with impacted programs (e.g. Cognitive Science or Applied Math instead of CS; Managerial Economics instead of Business). Maximize admit odds with zero extra classes.',
    linkText: 'Explore Adjacent Majors',
    href: '/planner'
  },
  {
    tag: 'Guaranteed Entry',
    title: 'UC TAG & CSU ADT Intelligence',
    detail:
      'Know where you are guaranteed before you submit applications. Tracks Transfer Admission Guarantee (TAG) GPA thresholds across 6 UC campuses and Associate Degree for Transfer (ADT) junior standing benefits across the CSU system.',
    linkText: 'Check Guarantees',
    href: '/planner'
  }
]

const productRoutes = [
  {
    href: '/planner',
    title: 'Planner & Auditor',
    detail: 'Instant transcript auditing, adjacent major arbitrage, UC TAG checks, and multi-campus portfolio chancing.',
    tag: 'Interactive'
  },
  {
    href: '/colleges',
    title: 'Colleges Directory',
    detail: 'Browse national universities backed by official College Scorecard data with zero-config offline fallback.',
    tag: 'Directory'
  },
  {
    href: '/search',
    title: 'Source Schools',
    detail: 'Find California feeder community colleges and high schools with real transfer volume and historical outcomes.',
    tag: 'Feeder Analytics'
  },
  {
    href: '/ingest',
    title: 'AI Ingest',
    detail: 'Turn raw admissions tables and institutional research PDFs into structured, cited metrics via the Responses API.',
    tag: 'Harvester'
  }
]

const proofPoints = [
  'Zero-typing CCC transcript auditor with transferable GPA calculation',
  'Admissions arbitrage: high-acceptance adjacent major recommendations',
  'Multi-campus Reach/Target/Safety portfolio chancer with TAG guarantees',
  'Automated UC TAG & CSU ADT transfer guarantee verification',
  'ASSIST-aligned transfer planning without fragile web scrapers',
  'National college directory backed by official College Scorecard data'
]

const platformPillars = [
  {
    title: 'ScholarHarvester',
    subtitle: 'Python 3.11 Ingestion',
    body: 'Guarded adapters collect UC, CSU, and CCCCO data from official endpoints and admin exports, strictly enforcing robots.txt decisions and recording provenance.'
  },
  {
    title: 'ScholarStack Engine',
    subtitle: 'Next.js 15 Platform',
    body: 'Turns harvested admissions signals into interactive planning tools, transcript auditing, adjacent major arbitrage, and portfolio chancing without drop-offs.'
  },
  {
    title: 'Evidence Layer',
    subtitle: 'Live Verified Citations',
    body: 'Live Supabase storage and provenance ledgers ensure every admissions statistic remains tied to its official publisher, year, term, and legal citation.'
  }
]

const workflowSteps = [
  {
    num: '01',
    title: 'Harvest Official Data',
    detail: 'Deterministic extraction from official UC Info Center, CSU Data Center, CCCCO Data Mart, and College Scorecard APIs.'
  },
  {
    num: '02',
    title: 'Normalize & Preserve Provenance',
    detail: 'Every metric is normalized with percentiles, year/term metadata, and persistent publisher citations.'
  },
  {
    num: '03',
    title: 'Strategic Admissions Execution',
    detail: 'Empowers students with instant transcript audits, adjacent major arbitrage, and balanced multi-campus portfolio chancing.'
  }
]

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Headline */}
            <div className="fade-up">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/25 bg-sky-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                Next-Gen California Admissions Engine
              </div>

              <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.04]">
                Evidence-backed college planning with official requirements.
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                ScholarStack pairs official-source California admissions harvesting with intelligent advising tools: instant transcript auditing, admissions arbitrage, and guaranteed transfer pathways.
              </p>

              {/* Button-in-Button CTA Cluster */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/planner"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400 pl-6 pr-2 py-2.5 text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/25 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-110 active:scale-[0.98]"
                >
                  <span>Open California Planner</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sky-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </Link>

                <Link
                  href="/colleges"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-5 pr-2 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 active:scale-[0.98]"
                >
                  <span>Explore Colleges</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>

                <Link
                  href="/search"
                  className="rounded-full px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Browse Source Schools
                </Link>
              </div>

              {/* Proof Points Grid */}
              <div className="mt-10 grid gap-2.5 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5 text-xs text-slate-300 shadow-inner"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 flex-shrink-0">
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Preview: Double-Bezel Hardware Architecture */}
            <div className="fade-up [animation-delay:150ms]">
              <div className="double-bezel-outer float-card">
                <div className="double-bezel-inner p-6 md:p-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-slate-400">
                        Platform Preview
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white tracking-tight">
                        ScholarStack Intelligence
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Verified
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {/* Simulated KPI Snapshot */}
                    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-inner">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Audited Transfer Profile</span>
                        <span className="text-emerald-400 font-bold">60 / 60 Units Done</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl border border-white/5 bg-white/5 p-2">
                          <div className="text-[10px] text-slate-400">GPA</div>
                          <div className="text-lg font-bold text-sky-400">3.86</div>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/5 p-2">
                          <div className="text-[10px] text-slate-400">UCI TAG</div>
                          <div className="text-lg font-bold text-emerald-400">Locked</div>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/5 p-2">
                          <div className="text-[10px] text-slate-400">Arbitrage</div>
                          <div className="text-lg font-bold text-purple-400">+28%</div>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Multi-Campus Chancer Tiers */}
                    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-2.5 shadow-inner">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Evaluated Portfolio (Sample List)
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs">
                        <div className="font-semibold text-white">UC Irvine &bull; Mathematics</div>
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                          Guaranteed TAG
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-xs">
                        <div className="font-semibold text-white">UC San Diego &bull; Applied Math</div>
                        <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-[10px] font-bold text-sky-300">
                          Target (56% admit)
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-xs">
                        <div className="font-semibold text-white">UCLA &bull; Applied Math</div>
                        <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
                          Reach (24% admit)
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex-shrink-0">
                        !
                      </div>
                      <span>
                        Every calculation is backed by official UC Information Center, CSU Data Center, and CCCCO datasets. Zero synthetic hallucinations.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Transfer & Admissions Automation Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              Advising Intelligence
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Strategic Transfer & Admissions Automation
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Beyond simple lookup tables, ScholarStack automates high-friction advising workflows: audit raw transcripts in seconds, uncover high-acceptance adjacent majors, and track transfer guarantees.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {strategicFeatures.map((feat) => (
              <div key={feat.title} className="double-bezel-outer">
                <div className="double-bezel-inner flex h-full flex-col justify-between p-6 sm:p-7">
                  <div>
                    <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                      {feat.tag}
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{feat.title}</h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">{feat.detail}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href={feat.href}
                      className="group inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                    >
                      <span>{feat.linkText}</span>
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Pillars Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Architectural Pillars
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Built for Complete Legal & Data Provenance</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {platformPillars.map((pillar) => (
              <div key={pillar.title} className="double-bezel-outer">
                <div className="double-bezel-inner p-6 sm:p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-sky-400">
                      {pillar.subtitle}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">{pillar.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-slate-400">
                    Proven Pipeline
                  </div>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                    A rigorous data-to-product workflow, not another generic chatbot.
                  </h2>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                    ScholarStack starts with strict crawler compliance rules, normalizes official admissions metrics with citations, and delivers clear interfaces that help students make life-changing decisions with certainty.
                  </p>
                </div>

                <div className="space-y-4">
                  {workflowSteps.map((step) => (
                    <div
                      key={step.num}
                      className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-inner"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-sky-500/20 px-2.5 py-1 font-mono text-xs font-bold text-sky-300">
                          {step.num}
                        </span>
                        <h4 className="font-bold text-white text-base">{step.title}</h4>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Routes Directory */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-8 md:p-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-slate-400">
                    Application Modules
                  </div>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Start with the tool tailored to your goal.
                  </h2>
                </div>
                <div className="max-w-md text-xs leading-relaxed text-slate-400">
                  All routes operate out-of-the-box with zero configuration and live resilience.
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {productRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-sky-500/40 hover:bg-slate-950/90"
                  >
                    <div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {route.tag}
                      </span>
                      <h4 className="mt-3 font-bold text-white text-lg tracking-tight group-hover:text-sky-300 transition-colors">
                        {route.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">{route.detail}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold text-sky-400">
                      <span>Open {route.title}</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/10 transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
