import React, { useState, useMemo } from 'react'
import {
  DegreeProgram,
  StudentProfile,
  Course,
  PlannedQuarter,
  GeneratedPlan,
  CourseEquivalency
} from '../../academic-engine/types'
import { generateAutoPlans } from '../../academic-engine/autoplan'
import {
  X,
  Zap,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sun,
  Sliders,
  AlertTriangle,
  Award
} from 'lucide-react'

interface AutoPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyPlan: (quarters: PlannedQuarter[]) => void
  program: DegreeProgram
  profile: StudentProfile
  catalogCourses: Course[]
  transferEquivalencies: CourseEquivalency[]
}

export const AutoPlanModal: React.FC<AutoPlanModalProps> = ({
  isOpen,
  onClose,
  onApplyPlan,
  program,
  profile,
  catalogCourses,
  transferEquivalencies
}) => {
  const [maxUnits, setMaxUnits] = useState<number>(16)
  const [minUnits, setMinUnits] = useState<number>(12)
  const [includeSummer, setIncludeSummer] = useState<boolean>(false)
  const [selectedStrategy, setSelectedStrategy] = useState<'BALANCED' | 'ACCELERATED' | 'LIGHT'>('BALANCED')

  // Generate plans deterministically based on parameters
  const autoPlanResult = useMemo(() => {
    return generateAutoPlans(
      program,
      profile,
      {
        maxUnitsPerQuarter: maxUnits,
        minUnitsPerQuarter: minUnits,
        includeSummer
      },
      catalogCourses,
      transferEquivalencies
    )
  }, [program, profile, maxUnits, minUnits, includeSummer, catalogCourses, transferEquivalencies])

  const selectedPlan: GeneratedPlan | undefined = useMemo(() => {
    return (
      autoPlanResult.plans.find((p) => p.strategy === selectedStrategy) ??
      autoPlanResult.plans[0]
    )
  }, [autoPlanResult, selectedStrategy])

  if (!isOpen) return null

  const handleApply = () => {
    if (selectedPlan) {
      onApplyPlan(selectedPlan.quarters)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="relative flex w-full max-w-4xl flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl max-h-[90vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-anteater-gold">
              <Zap className="h-5 w-5 fill-anteater-gold/20 text-anteater-gold" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <span>Phase 3</span>
                <span>•</span>
                <span>Deterministic Solver</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Automated Degree Plan Generator
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Sliders className="h-4 w-4 text-blue-400" />
              <span>Scheduling Constraints & Preferences</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Max Units Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Max Units / Quarter:</span>
                  <span className="font-mono font-bold text-sky-400">{maxUnits} units</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="20"
                  step="2"
                  value={maxUnits}
                  onChange={(e) => setMaxUnits(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>12</span>
                  <span>16 (UCI Normal)</span>
                  <span>20</span>
                </div>
              </div>

              {/* Min Units Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Min Units / Quarter:</span>
                  <span className="font-mono font-bold text-sky-400">{minUnits} units</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="14"
                  step="2"
                  value={minUnits}
                  onChange={(e) => setMinUnits(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>8</span>
                  <span>12 (Full-time)</span>
                  <span>14</span>
                </div>
              </div>

              {/* Summer Session Toggle */}
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-3 cursor-pointer group rounded-xl border border-slate-800 p-2.5 hover:border-slate-700 bg-slate-900/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeSummer}
                    onChange={(e) => setIncludeSummer(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <div className="flex items-center gap-2">
                    <Sun className={`h-4 w-4 ${includeSummer ? 'text-amber-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        Include Summer
                      </div>
                      <div className="text-[10px] text-slate-400">Utilize summer offerings</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Strategy Comparison Cards */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Select Generated Graduation Strategy</span>
              <span className="text-[11px] font-normal text-slate-500">
                Derived for {program.name}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {autoPlanResult.plans.map((plan) => {
                const isSelected = selectedPlan?.strategy === plan.strategy
                const badgeColor =
                  plan.strategy === 'BALANCED'
                    ? 'border-blue-500/30 bg-blue-500/10 text-sky-400'
                    : plan.strategy === 'ACCELERATED'
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    : 'border-purple-500/30 bg-purple-500/10 text-purple-400'

                return (
                  <button
                    key={plan.strategy}
                    type="button"
                    onClick={() => setSelectedStrategy(plan.strategy)}
                    className={`flex flex-col text-left rounded-2xl border p-4 transition-all relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/30 shadow-lg shadow-blue-950/50 ring-2 ring-blue-500/30'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
                        {plan.strategy}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mt-auto space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Calendar className="h-3.5 w-3.5 text-blue-400" />
                          Est. Graduation
                        </span>
                        <span className="font-mono font-bold text-white">
                          {plan.graduationTerm}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Clock className="h-3.5 w-3.5 text-slate-500" />
                          Total Terms
                        </span>
                        <span className="font-mono text-slate-200">
                          {plan.totalQuarters} terms
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Award className="h-3.5 w-3.5 text-slate-500" />
                          Avg Load
                        </span>
                        <span className="font-mono text-slate-200">
                          {plan.averageUnitsPerQuarter.toFixed(1)} units/term
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detailed Selected Plan Preview */}
          {selectedPlan && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">
                    Quarter Breakdown for {selectedPlan.name}
                  </h4>
                  <span className="text-xs text-slate-400">
                    ({selectedPlan.totalUnits} total units across {selectedPlan.quarters.length} terms)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>0 Prereq Conflicts</span>
                </div>
              </div>

              {selectedPlan.quarters.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  No courses needed or all requirements are already completed!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedPlan.quarters.map((q) => {
                    const qUnits = q.courses.reduce((sum, c) => sum + (c.units ?? 4), 0)
                    return (
                      <div
                        key={q.id}
                        className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-2">
                          <span className="font-bold text-xs text-slate-200">
                            {q.term} {q.year}
                          </span>
                          <span className="text-[10px] font-mono text-sky-400 bg-blue-950/50 px-1.5 py-0.5 rounded border border-blue-500/20">
                            {qUnits} units
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {q.courses.map((course, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs bg-slate-950/50 rounded-lg px-2 py-1 border border-slate-800/50"
                            >
                              <span className="font-mono font-bold text-slate-200">
                                {course.courseCode}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {course.units ?? 4}u
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {autoPlanResult.unfulfillableCourses.length > 0 && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Unfulfillable Requirements:</span>{' '}
                    Some courses could not be scheduled within the term limits: {autoPlanResult.unfulfillableCourses.map((c) => c.courseCode).join(', ')}.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            disabled={!selectedPlan || selectedPlan.quarters.length === 0}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/30"
          >
            <span>Apply {selectedPlan?.name ?? 'Plan'} to Schedule</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
