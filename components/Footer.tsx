'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { ShieldAlert, Route, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white pt-14 pb-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Important Independent Disclaimer Box (Multilingual) */}
        <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 sm:p-5 mb-12 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            <span className="font-bold">{t.disclaimer.title} </span>
            {t.disclaimer.text}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0064a4] to-[#0c2340] text-white shadow-xs">
                <span className="font-extrabold text-base tracking-tighter">AT</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Ant<span className="text-[#0064a4]">Trail</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#ffd200] ml-0.5" />
              </span>
            </Link>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              The unified academic planning engine, Canvas LMS command center, and campus guide for UC Irvine. Zot zot zot! Built by Anteaters for Anteaters.
            </p>

            <div className="mt-4 flex flex-col gap-2 text-xs">
              <a
                href="https://github.com/rchau8502/AntTrail"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1 font-bold text-slate-800 hover:bg-slate-200 transition-colors shadow-2xs w-fit"
              >
                <span>⭐ Star on GitHub</span>
              </a>
              <a
                href="https://github.com/rchau8502/AntTrail/issues/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1 font-bold text-amber-900 hover:bg-amber-100 transition-colors shadow-2xs w-fit"
              >
                <span>💡 Report Course / Feedback</span>
              </a>
            </div>
          </div>

          {/* Col 2: Flagship Workstations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Workstations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/degree-planning" className="hover:text-[#0064a4] transition-colors font-medium">
                  Degree &amp; Prereq Planner
                </Link>
              </li>
              <li>
                <Link href="/webreg" className="hover:text-amber-700 transition-colors font-medium text-amber-900">
                  ZotSniper WebReg Radar
                </Link>
              </li>
              <li>
                <Link href="/transfer" className="hover:text-emerald-700 transition-colors font-medium text-emerald-900">
                  CC Transfer Articulation
                </Link>
              </li>
              <li>
                <Link href="/canvas" className="hover:text-rose-700 transition-colors font-medium">
                  Canvas LMS Command Center
                </Link>
              </li>
              <li>
                <Link href="/study" className="hover:text-indigo-700 transition-colors font-medium">
                  STEM Study Cards (Bubble)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-orange-700 transition-colors font-medium">
                  Alumni Water Courses (水课)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Survival Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Survival Guides
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.id}`} className="hover:text-[#0064a4] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/guides" className="font-semibold text-[#0064a4] hover:underline">
                  All 42+ Campus Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Deadlines & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Deadlines &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/deadlines" className="hover:text-[#0064a4] transition-colors">
                  Registrar Deadlines &amp; iCal
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-[#0064a4] transition-colors">
                  UCI Official Tools Index
                </Link>
              </li>
              <li>
                <Link href="/i-need-to" className="hover:text-[#0064a4] transition-colors">
                  &quot;I Need To...&quot; Task Solver
                </Link>
              </li>
              <li>
                <Link href="/bubblegum" className="hover:text-[#0064a4] transition-colors">
                  Bubblegum Speed Drills
                </Link>
              </li>
              <li>
                <Link href="/memory-hooks" className="hover:text-[#0064a4] transition-colors">
                  STEM Memory Hooks
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#0064a4] transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Official UCI Systems */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Official UCI Systems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.reg.uci.edu/registrar/soc/webreg.html"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0064a4] transition-colors inline-flex items-center gap-1"
                >
                  <span>WebReg</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://zotaccount.uci.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0064a4] transition-colors inline-flex items-center gap-1"
                >
                  <span>ZotAccount</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://zotaid.uci.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0064a4] transition-colors inline-flex items-center gap-1"
                >
                  <span>ZotAid</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://canvas.eee.uci.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0064a4] transition-colors inline-flex items-center gap-1"
                >
                  <span>Canvas LMS</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://parking.uci.edu/mycommute/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0064a4] transition-colors inline-flex items-center gap-1"
                >
                  <span>myCommute Parking</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="pt-1">
                <Link href="/tools" className="font-semibold text-[#0064a4] hover:underline">
                  {t.sections.exploreAllTools} →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} AntTrail. 100% Free &amp; Open-Source Academic Operating System for UC Irvine.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/guides" className="hover:text-slate-600">{t.nav.exploreGuides}</Link>
            <Link href="/courses" className="hover:text-slate-600">{t.nav.courses}</Link>
            <Link href="/deadlines" className="hover:text-slate-600">{t.nav.deadlines}</Link>
            <Link href="/i-need-to" className="hover:text-slate-600">{t.nav.iNeedTo}</Link>
            <Link href="/tools" className="hover:text-slate-600">{t.nav.uciTools}</Link>
            <Link href="/degree-planning" className="hover:text-slate-600">{t.nav.degreePlanning}</Link>
            <Link href="/transfer" className="hover:text-[#0064a4] font-semibold text-sky-700">Transfer Prep</Link>
            <Link href="/webreg" className="hover:text-amber-600 font-semibold text-amber-700">ZotSniper WebReg</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
