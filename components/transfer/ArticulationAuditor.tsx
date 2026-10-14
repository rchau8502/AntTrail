'use client'

import React, { useMemo, useState } from 'react'
import {
  auditCourseArticulation,
  type MajorPreparationAudit
} from '@/lib/articulation'

interface ArticulationAuditorProps {
  campus: string
  major: string
  courses: Array<{
    code: string
    title?: string
    units?: number
    grade?: string
    term?: string
  }>
  originSchool?: string | null
}

export default function ArticulationAuditor({
  campus,
  major,
  courses,
  originSchool
}: ArticulationAuditorProps) {
  const [activeTab, setActiveTab] = useState<'articulation' | 'checklist'>('articulation')

  const audit: MajorPreparationAudit = useMemo(() => {
    return auditCourseArticulation({
      targetCampus: campus,
      targetMajor: major,
      courses
    })
  }, [campus, major, courses])

  // Build ASSIST search URL for quick student verification
  const assistUrl = 'https://assist.org/'

  return (
    <div className="double-bezel-outer transition-spring">
      <div className="double-bezel-inner p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Course-to-Course Articulation & Major Prep
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Course Equivalency to {campus}
            </h3>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-400">
              Cross-references your schedule and completed coursework against official lower-division major requirements for <strong className="text-white">{major}</strong>.
              {originSchool && (
                <span className="ml-1 text-emerald-300 font-mono">({originSchool} mapping)</span>
              )}
            </p>
          </div>

          <a
            href={assistUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <span>Verify on ASSIST.org</span>
            <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Top Summary Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Major Prep Satisfied</div>
            <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">
              {audit.satisfiedCount} <span className="text-sm font-normal text-slate-500">/ {audit.totalRequirements}</span>
            </div>
            <div className="text-[10px] text-slate-500">{audit.completionPercentage}% of core prereqs</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">In Progress / Planned</div>
            <div className="mt-1 text-2xl font-bold font-mono text-sky-400">
              {audit.plannedCount}
            </div>
            <div className="text-[10px] text-slate-500">upcoming terms</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Missing Requirements</div>
            <div className={`mt-1 text-2xl font-bold font-mono ${audit.missingCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {audit.missingCount}
            </div>
            <div className="text-[10px] text-slate-500">{audit.missingCount > 0 ? 'action needed' : 'all fulfilled!'}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Course Equivalencies</div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">
              {audit.articulatedCourses.length}
            </div>
            <div className="text-[10px] text-slate-500">courses evaluated</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span>Major Preparation Completion Progress</span>
            <span className="font-semibold text-emerald-400">{audit.completionPercentage}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, audit.completionPercentage))}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('articulation')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'articulation'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Course-by-Course Equivalency ({audit.articulatedCourses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'checklist'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {campus} Major Prep Checklist ({audit.satisfiedCount}/{audit.totalRequirements})
          </button>
        </div>

        {/* Tab 1: Course-by-Course Articulation View */}
        {activeTab === 'articulation' && (
          <div className="mt-4 space-y-3">
            {audit.articulatedCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-xs text-slate-400">
                No courses entered yet. Use the Transcript Auditor above or enter courses into your Semester Schedule to view direct course-to-course equivalencies.
              </div>
            ) : (
              audit.articulatedCourses.map((match, idx) => (
                <div
                  key={`${match.originCourseCode}-${idx}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-all hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Origin Course */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">
                          {match.originCourseCode}
                        </span>
                        {match.originGrade && (
                          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-sky-300">
                            Grade: {match.originGrade}
                          </span>
                        )}
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                          {match.originUnits} units
                        </span>
                        {match.originTerm && (
                          <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                            {match.originTerm}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">{match.originCourseTitle}</div>
                    </div>

                    {/* Transfer Arrow */}
                    <div className="flex items-center justify-center text-slate-500 sm:px-3">
                      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-400">
                        <span>transfers as</span>
                        <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Destination Course Equivalent */}
                    <div className="flex-1 text-left sm:text-right">
                      <div className="flex items-center gap-2 sm:justify-end">
                        <span className="font-mono text-sm font-bold text-emerald-300">
                          {match.targetCourseCode}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            match.requirementType === 'major_prep_critical'
                              ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                              : match.requirementType === 'ge_foundation'
                                ? 'border border-sky-500/30 bg-sky-500/20 text-sky-300'
                                : 'border border-slate-700 bg-slate-800 text-slate-300'
                          }`}
                        >
                          {match.fulfillsRequirementName}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-400">{match.targetCourseTitle}</div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{match.notes}</span>
                    {match.cIdCode && (
                      <span className="font-mono text-[10px] text-slate-500">{match.cIdCode}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Major Preparation Checklist View */}
        {activeTab === 'checklist' && (
          <div className="mt-4 space-y-3">
            {audit.requirements.map(({ requirement, status, matchedCourse }) => {
              const isSatisfied = status === 'satisfied'
              const isPlanned = status === 'planned'

              return (
                <div
                  key={requirement.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isSatisfied
                      ? 'border-emerald-500/30 bg-emerald-950/20'
                      : isPlanned
                        ? 'border-sky-500/30 bg-sky-950/20'
                        : 'border-amber-500/30 bg-amber-950/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                            isSatisfied
                              ? 'bg-emerald-500/30 text-emerald-300'
                              : isPlanned
                                ? 'bg-sky-500/30 text-sky-300'
                                : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {isSatisfied ? '✓' : isPlanned ? '◷' : '!'}
                        </span>
                        <h4 className="font-mono text-sm font-bold text-white">
                          {requirement.targetCourseCode} — {requirement.name}
                        </h4>
                        {requirement.isCritical && (
                          <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-rose-300">
                            Required for Admission
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{requirement.description}</p>
                    </div>

                    <div className="sm:text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isSatisfied
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isPlanned
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {isSatisfied
                          ? 'Satisfied'
                          : isPlanned
                            ? 'Planned in Schedule'
                            : 'Missing Prerequisite'}
                      </span>
                      {matchedCourse && (
                        <div className="mt-1 font-mono text-[11px] text-slate-300">
                          Fulfilled by: <strong>{matchedCourse.code}</strong>
                          {matchedCourse.grade && ` (${matchedCourse.grade})`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Actionable Recommendations */}
        {audit.recommendations.length > 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Articulation Guidance & Next Steps
            </h5>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-400">
              {audit.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
