import React, { useState } from 'react'
import {
  DegreeAuditResult,
  EvaluatedRequirement,
  DegreeProgram
} from '../../academic-engine/types'
import { useLanguage } from '../../../lib/i18n/LanguageContext'
import {
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Calendar,
  Layers,
  Printer
} from 'lucide-react'

interface DegreeAuditViewProps {
  audit: DegreeAuditResult
  onPlanCourse?: (courseCode: string) => void
  onSelectProgram?: (programName: string) => void
  availablePrograms?: DegreeProgram[]
}

export const DegreeAuditView: React.FC<DegreeAuditViewProps> = ({
  audit,
  onPlanCourse,
  onSelectProgram,
  availablePrograms
}) => {
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const programsBySchool = React.useMemo(() => {
    if (!availablePrograms) return {}
    const map: Record<string, DegreeProgram[]> = {}
    for (const prog of availablePrograms) {
      if (!map[prog.school]) map[prog.school] = []
      map[prog.school].push(prog)
    }
    return map
  }, [availablePrograms])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === false ? true : false
    }))
  }

  const { program, overallProgressPercent, plannedProgressPercent, totalUnitsEarned, totalUnitsPlanned } = audit

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Stats Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-anteater-gold/15 px-3 py-1 text-xs font-bold text-anteater-gold border border-anteater-gold/30">
                {program.school}
              </span>
              <span className="text-xs text-slate-400 font-mono">Catalog {program.catalogYear}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Award className="h-7 w-7 text-anteater-gold shrink-0" />
                <span>{program.name}</span>
              </h1>

              {availablePrograms && availablePrograms.length > 0 && onSelectProgram && (
                <div className="flex items-center gap-2">
                  <label htmlFor="major-switcher" className="sr-only">Switch Degree Program</label>
                  <select
                    id="major-switcher"
                    value={program.name}
                    onChange={(e) => onSelectProgram(e.target.value)}
                    className="rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-600 transition-colors cursor-pointer max-w-xs sm:max-w-md truncate"
                  >
                    {Object.entries(programsBySchool).map(([schoolName, progs]) => (
                      <optgroup key={schoolName} label={schoolName} className="bg-slate-900 text-slate-400 font-bold">
                        {progs.map((p) => (
                          <option key={p.id} value={p.name} className="text-white font-normal">
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Print official academic advising sheet"
                >
                  <Printer className="h-3.5 w-3.5 text-sky-400" />
                  <span>{t.degreePlanningHub.advisingSheetBtn}</span>
                </button>
                {onSelectProgram && program.name !== 'UCI General Education (GE Breadth)' && (
                  <button
                    type="button"
                    onClick={() => onSelectProgram('UCI General Education (GE Breadth)')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/30 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/40 transition-colors cursor-pointer"
                    title="Audit UCI General Education Requirements"
                  >
                    <Layers className="h-3.5 w-3.5 text-amber-400" />
                    <span>{t.degreePlanningHub.auditGeBreadthBtn}</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-xl">
              Deterministic progress evaluation based on completed transcripts, verified transfer articulation, and future planned quarters.
            </p>
          </div>

          {/* Progress Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 min-w-[120px]">
              <div className="text-xs text-slate-400 font-medium">Earned Progress</div>
              <div className="text-3xl font-black text-white font-mono mt-1">
                {overallProgressPercent}%
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">completed history</div>
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4 min-w-[120px]">
              <div className="text-xs text-sky-300 font-medium">With Planned</div>
              <div className="text-3xl font-black text-sky-400 font-mono mt-1">
                {plannedProgressPercent}%
              </div>
              <div className="text-[10px] text-sky-300/80">+{plannedProgressPercent - overallProgressPercent}% future plan</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 min-w-[120px]">
              <div className="text-xs text-slate-400 font-medium">Total Units</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {totalUnitsEarned} <span className="text-xs font-normal text-slate-500">/ {program.totalUnitsRequired}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">+{totalUnitsPlanned} planned</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 min-w-[120px]">
              <div className="text-xs text-slate-400 font-medium">Upper-Division</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {audit.upperDivisionUnitsEarned} <span className="text-xs font-normal text-slate-500">/ {program.minUpperDivisionUnits}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">+{audit.upperDivisionUnitsPlanned} planned</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Degree Progress</span>
            <span className="font-mono text-slate-200">
              {overallProgressPercent}% Complete ({plannedProgressPercent}% with schedule)
            </span>
          </div>
          <div className="relative h-3 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            {/* Planned bar */}
            <div
              className="absolute left-0 top-0 h-full bg-sky-500/50 transition-all duration-500"
              style={{ width: `${Math.min(100, plannedProgressPercent)}%` }}
            />
            {/* Earned bar */}
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-anteater-blue to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(100, overallProgressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections & Requirements Breakdown */}
      <div className="space-y-4">
        {audit.sections.map(({ section, requirements, isComplete, isPlannedComplete }) => {
          const isExpanded = expandedSections[section.id] !== false

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-sm transition-all"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-800/40 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${
                      isComplete
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isPlannedComplete
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isPlannedComplete ? (
                      <Calendar className="h-4 w-4" />
                    ) : (
                      <Layers className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{section.name}</h2>
                    <p className="text-xs text-slate-400">
                      {requirements.filter((r) => r.isComplete).length} of {requirements.length} completed
                      {requirements.some((r) => !r.isComplete && r.isPlannedComplete) && (
                        <span className="text-sky-400 ml-1.5 font-medium">
                          ({requirements.filter((r) => r.isPlannedComplete).length} planned)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isComplete
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : isPlannedComplete
                        ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isComplete ? t.degreePlanningHub.statusCompleted : isPlannedComplete ? t.degreePlanningHub.statusPlanned : t.degreePlanningHub.statusUnsatisfied}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Requirements Cards */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-1 sm:px-5 space-y-3 border-t border-slate-800/60">
                  {requirements.map((req) => (
                    <RequirementCard key={req.requirement.id} evaluated={req} onPlanCourse={onPlanCourse} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface RequirementCardProps {
  evaluated: EvaluatedRequirement
  onPlanCourse?: (courseCode: string) => void
}

const RequirementCard: React.FC<RequirementCardProps> = ({ evaluated, onPlanCourse }) => {
  const { t } = useLanguage()
  const { requirement, isComplete, isPlannedComplete, completedCourses, plannedCourses, missingCourses, eligibleToSatisfy } = evaluated

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isComplete
          ? 'border-emerald-500/20 bg-emerald-950/10'
          : isPlannedComplete
          ? 'border-sky-500/20 bg-sky-950/10'
          : 'border-slate-800 bg-slate-950/40'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : isPlannedComplete ? (
            <Clock className="h-4 w-4 text-sky-400 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-bold text-white tracking-tight">{requirement.name}</span>
        </div>

        <span
          className={`self-start sm:self-auto rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            isComplete
              ? 'bg-emerald-500/20 text-emerald-300'
              : isPlannedComplete
              ? 'bg-sky-500/20 text-sky-300'
              : 'bg-rose-500/20 text-rose-300'
          }`}
        >
          {isComplete ? t.degreePlanningHub.statusCompleted : isPlannedComplete ? t.degreePlanningHub.statusPlanned : t.degreePlanningHub.statusUnsatisfied}
        </span>
      </div>

      {requirement.description && (
        <p className="text-xs text-slate-400 mb-3">{requirement.description}</p>
      )}

      {/* Courses Breakdown */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Completed Courses */}
        {completedCourses.map((code) => (
          <span
            key={code}
            className="inline-flex items-center gap-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 font-mono text-emerald-300 text-xs font-semibold"
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            {code}
          </span>
        ))}

        {/* Planned Courses */}
        {plannedCourses.map((code) => (
          <span
            key={code}
            className="inline-flex items-center gap-1 rounded-md bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 font-mono text-sky-300 text-xs font-semibold"
          >
            <Calendar className="h-3 w-3 text-sky-400" />
            {code} (Planned)
          </span>
        ))}

        {/* Missing Courses */}
        {missingCourses.map((code) => (
          <span
            key={code}
            className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-700/80 px-2 py-0.5 font-mono text-slate-400 text-xs"
          >
            {code}
          </span>
        ))}
      </div>

      {/* Eligible courses recommendation to satisfy requirement */}
      {!isComplete && eligibleToSatisfy.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-anteater-gold" />
            Eligible to take now:
          </span>
          {eligibleToSatisfy.map((code) => (
            <button
              key={code}
              onClick={() => onPlanCourse && onPlanCourse(code)}
              className="inline-flex items-center gap-1 rounded-md bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/40 px-2 py-0.5 text-xs font-semibold text-blue-300 transition-colors"
              title="Add to Quarter Planner"
            >
              <Plus className="h-3 w-3" />
              <span>{code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
