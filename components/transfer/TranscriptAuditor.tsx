'use client'

import React, { useState } from 'react'
import { parseTranscriptText, type TranscriptAuditResult } from '@/lib/transcriptParser'

interface TranscriptAuditorProps {
  onApplyToPlanner?: (data: {
    gpa: number
    totalUnits: number
    courses: string[]
    detailedCourses?: Array<{
      code: string
      title?: string
      units?: number
      grade?: string
    }>
    detectedSchool?: string | null
    transferProgress: 'early' | 'in_progress' | 'mostly_complete' | 'complete'
  }) => void
}

const SAMPLE_TRANSCRIPT = `Irvine Valley College - Unofficial Student Record
ENGL 1A College Composition 4.0 A
MATH 1 Calculus I 5.0 B+
CHEM 1A General Chemistry 5.0 A
HIST 17A US History 3.0 A
COMM 1 Public Speaking 3.0 A
PHIL 106 Critical Thinking 3.0 A
PSYC 101 General Psychology 3.0 A
MATH 2 Calculus II 5.0 A`

function IconCheck({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function IconSchool({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333M4.5 21V10.333" />
    </svg>
  )
}

export default function TranscriptAuditor({ onApplyToPlanner }: TranscriptAuditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rawText, setRawText] = useState('')
  const [auditResult, setAuditResult] = useState<TranscriptAuditResult | null>(null)
  const [applied, setApplied] = useState(false)

  const handleAudit = (text: string) => {
    setRawText(text)
    setApplied(false)
    if (!text.trim()) {
      setAuditResult(null)
      return
    }
    const result = parseTranscriptText(text)
    setAuditResult(result)
  }

  const handleLoadSample = () => {
    handleAudit(SAMPLE_TRANSCRIPT)
  }

  const handleApply = () => {
    if (!auditResult || !onApplyToPlanner) return

    let transferProgress: 'early' | 'in_progress' | 'mostly_complete' | 'complete' = 'early'
    if (auditResult.totalUnits >= 60 && auditResult.ucSevenCoursePattern.isSatisfied) {
      transferProgress = 'complete'
    } else if (auditResult.totalUnits >= 45) {
      transferProgress = 'mostly_complete'
    } else if (auditResult.totalUnits >= 20) {
      transferProgress = 'in_progress'
    }

    onApplyToPlanner({
      gpa: auditResult.gpa,
      totalUnits: auditResult.totalUnits,
      courses: auditResult.courses.map((c) => c.code),
      detailedCourses: auditResult.courses.map((c) => ({
        code: c.code,
        title: c.title,
        units: c.units,
        grade: c.grade
      })),
      detectedSchool: auditResult.detectedSchool,
      transferProgress
    })
    setApplied(true)
  }

  return (
    <div className="double-bezel-outer">
      <div className="double-bezel-inner p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Automated Course & GPA Auditor
            </div>
            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Paste Transcript for Instant Transfer Audit
            </h3>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
              Paste raw coursework text from Canvas, your CCC portal, or an unofficial transcript. We calculate your transfer GPA, check the 60-unit threshold, and verify UC 7-Course & CSU Golden 4 patterns.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-5 pr-2 py-2 text-xs font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 active:scale-[0.98]"
          >
            <span>{isOpen ? 'Close Auditor' : 'Open Transcript Auditor'}</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-transform duration-300 group-hover:scale-105">
              <svg
                className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Raw Transcript or Course List
                  </label>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Load Sample CCC Transcript
                  </button>
                </div>
                <textarea
                  value={rawText}
                  onChange={(e) => handleAudit(e.target.value)}
                  placeholder="Example:&#10;ENGL 1A College Composition 4.0 A&#10;MATH 1 Calculus I 5.0 B&#10;COMM 1 Public Speaking 3.0 A..."
                  rows={8}
                  className="mt-2.5 w-full rounded-2xl border border-white/15 bg-slate-950/80 p-3.5 font-mono text-xs text-slate-200 placeholder-slate-600 shadow-inner focus:border-sky-400 focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Standard CCC formats, letter grades, and unit values</span>
                  {auditResult && (
                    <span className="text-sky-300 font-medium">{auditResult.courses.length} courses identified</span>
                  )}
                </div>
              </div>

              <div>
                {auditResult ? (
                  <div className="space-y-4">
                    {auditResult.detectedSchool && (
                      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-300">
                        <IconSchool className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>Feeder College Identified: <strong>{auditResult.detectedSchool}</strong></span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">Transfer GPA</div>
                        <div className="mt-1 text-2xl font-bold text-sky-400">
                          {auditResult.gpa > 0 ? auditResult.gpa.toFixed(2) : '--'}
                        </div>
                        <div className="text-[10px] text-slate-500">{auditResult.gradedUnits} graded units</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">Total Units</div>
                        <div className="mt-1 text-2xl font-bold text-emerald-400">
                          {auditResult.totalUnits}
                        </div>
                        <div className="text-[10px] text-slate-500">of 60 required</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">60-Unit Goal</div>
                        <div className="mt-1 text-2xl font-bold text-amber-400">
                          {auditResult.progress60Units}%
                        </div>
                        <div className="text-[10px] text-slate-500">junior standing</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full rounded-full bg-white/10 h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, auditResult.progress60Units)}%` }}
                      />
                    </div>

                    {/* GE Checks */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs space-y-2.5">
                      <div className="font-semibold text-slate-200">UC 7-Course Pattern Check:</div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>English Composition (2 req):</span>
                        <span className={auditResult.ucSevenCoursePattern.englishComp.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                          {auditResult.ucSevenCoursePattern.englishComp.completed} / 2 {auditResult.ucSevenCoursePattern.englishComp.isSatisfied ? 'Satisfied' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Math / Quant (1 req):</span>
                        <span className={auditResult.ucSevenCoursePattern.mathQuant.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                          {auditResult.ucSevenCoursePattern.mathQuant.completed} / 1 {auditResult.ucSevenCoursePattern.mathQuant.isSatisfied ? 'Satisfied' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Breadth (4 courses in 2+ areas):</span>
                        <span className={auditResult.ucSevenCoursePattern.breadthAreas.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                          {auditResult.ucSevenCoursePattern.breadthAreas.completed} / 4 {auditResult.ucSevenCoursePattern.breadthAreas.isSatisfied ? 'Satisfied' : 'Pending'}
                        </span>
                      </div>

                      <div className="pt-2.5 border-t border-white/10 font-semibold text-slate-200">CSU Golden Four Check:</div>
                      <div className="grid grid-cols-2 gap-2 text-slate-400">
                        <div>A1 Oral Comm: <span className={auditResult.csuGoldenFour.a1OralComm.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{auditResult.csuGoldenFour.a1OralComm.isSatisfied ? 'Passed' : 'Pending'}</span></div>
                        <div>A2 Written: <span className={auditResult.csuGoldenFour.a2WrittenComm.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{auditResult.csuGoldenFour.a2WrittenComm.isSatisfied ? 'Passed' : 'Pending'}</span></div>
                        <div>A3 Critical: <span className={auditResult.csuGoldenFour.a3CriticalThinking.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{auditResult.csuGoldenFour.a3CriticalThinking.isSatisfied ? 'Passed' : 'Pending'}</span></div>
                        <div>B4 Math/Quant: <span className={auditResult.csuGoldenFour.b4MathQuant.isSatisfied ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{auditResult.csuGoldenFour.b4MathQuant.isSatisfied ? 'Passed' : 'Pending'}</span></div>
                      </div>
                    </div>

                    {onApplyToPlanner && (
                      <button
                        type="button"
                        onClick={handleApply}
                        disabled={applied}
                        className={`group/btn flex w-full items-center justify-between rounded-xl px-5 py-3 text-xs font-bold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          applied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 hover:brightness-110 shadow-lg shadow-sky-500/20 active:scale-[0.98]'
                        }`}
                      >
                        <span>{applied ? 'Applied to Planner & Target GPA' : 'Apply Calculated GPA & Courses to Planner'}</span>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 ${
                          applied ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-950/20 text-slate-950 group-hover/btn:translate-x-0.5'
                        }`}>
                          <IconCheck className="h-3.5 w-3.5" />
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/15 p-8 text-center text-xs text-slate-500">
                    Paste your transcript text or click &quot;Load Sample CCC Transcript&quot; to view instant metrics.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
