'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Route,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
  GraduationCap,
  SlidersHorizontal,
  Info,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import AntTrailBanner from '@/components/AntTrailBanner';

const InteractiveAntTrailApp = dynamic(
  () => import('@/src/App').then((mod) => mod.App),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-slate-900/40 p-12 text-center shadow-xs">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0064a4] border-t-transparent" />
        <p className="text-sm font-semibold text-white">Initializing AntTrail Academic Engine...</p>
        <p className="text-xs text-slate-400">Loading prerequisite AST rules, degree catalog, and student record state...</p>
      </div>
    ),
  }
);

export default function DegreePlanningPage() {
  const [activeMode, setActiveMode] = useState<'WORKSTATION' | 'GUIDE'>('WORKSTATION');

  return (
    <div className="py-6 sm:py-10 space-y-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 text-[#0064a4] border border-sky-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider mb-2">
              <Route className="w-3.5 h-3.5 text-[#0064a4]" />
              <span>Academic Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              UCI Degree &amp; Prerequisite Workstation
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Interactive 4-year schedule solver, prerequisite chain validator, and official degree requirements.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveMode('WORKSTATION')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === 'WORKSTATION'
                  ? 'bg-white text-[#0064a4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Workstation</span>
            </button>
            <button
              onClick={() => setActiveMode('GUIDE')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === 'GUIDE'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Planning Guide &amp; Rules</span>
            </button>
          </div>
        </div>

        {/* MODE 1: Interactive Workstation */}
        {activeMode === 'WORKSTATION' && (
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <InteractiveAntTrailApp />
          </div>
        )}

        {/* MODE 2: Educational Guide & Golden Rules */}
        {activeMode === 'GUIDE' && (
          <div className="space-y-12">
            {/* Banner */}
            <AntTrailBanner variant="full" />

            {/* Core Rules of UCI Degree Planning */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  The 5 Golden Rules of UCI Course Planning
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Every undergraduate Anteater degree rests upon these foundational requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    1
                  </div>
                  <h3 className="text-base font-bold text-slate-900">The 180-Unit Minimum</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    To receive a Bachelor&apos;s degree from UCI, you must earn at least 180.0 quarter units. Completing all major courses alone is not enough if your overall unit tally is only 172.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    2
                  </div>
                  <h3 className="text-base font-bold text-slate-900">60 Upper-Division Units</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At least 60.0 units must come from upper-division coursework (courses numbered 100 through 199). Lower-division courses (1–99) do not count toward this 60-unit threshold.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    3
                  </div>
                  <h3 className="text-base font-bold text-slate-900">8 General Education Categories</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every student completes GE Categories I through VIII (Writing, Science &amp; Tech, Social Sciences, Arts/Humanities, Math/Logic, Language, Multicultural, and Global Issues).
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    4
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Quarter Sequencing</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    STEM sequences (like Math 2A-2B, Chem 1A-1C, or ICS 31-33) are strictly serialized. Failing or missing the Fall start can delay graduation by a full year if off-quarter sections aren&apos;t offered.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    5
                  </div>
                  <h3 className="text-base font-bold text-slate-900">12-Quarter Time Cap</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    UCI enforces a maximum time-to-degree cap (typically 12 regular quarters / 216 units for freshmen; 9 quarters for transfers). Graduating past this requires an approved dean petition.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0064a4] font-bold text-sm mb-3">
                    6
                  </div>
                  <h3 className="text-base font-bold text-slate-900">DegreeWorks Audit Checks</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Always verify your audit on DegreeWorks before your enrollment window opens to confirm that taken courses counted towards the GE or major category you expected.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button to Launch Workstation */}
            <div className="rounded-3xl border border-sky-200 bg-sky-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Ready to construct your quarterly schedule?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Use the AntTrail interactive workstation to input your courses and auto-generate clean degree roadmaps.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveMode('WORKSTATION')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0064a4] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0c2340] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Switch to Interactive Workstation</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
