import React, { useState } from 'react'
import {
  PlannedQuarter,
  SequenceValidationError,
  Course
} from '../../academic-engine/types'
import { QuarterColumn } from './QuarterColumn'
import { AddCourseModal } from './AddCourseModal'
import {
  Calendar,
  AlertTriangle,
  Plus,
  RotateCcw,
  Trash2,
  Zap
} from 'lucide-react'

interface QuarterPlannerViewProps {
  quarters: PlannedQuarter[]
  errors: SequenceValidationError[]
  onAddCourse: (quarterId: string, courseCode: string, units: number, title?: string) => void
  onRemoveCourse: (quarterId: string, courseCode: string) => void
  onAddQuarter: () => void
  onRemoveQuarter: (quarterId: string) => void
  onResetRoadmap: () => void
  onClearSchedule: () => void
  onOpenAutoPlan: () => void
  eligibleCourses: string[]
  catalogCourses: Course[]
}

export const QuarterPlannerView: React.FC<QuarterPlannerViewProps> = ({
  quarters,
  errors,
  onAddCourse,
  onRemoveCourse,
  onAddQuarter,
  onRemoveQuarter,
  onResetRoadmap,
  onClearSchedule,
  onOpenAutoPlan,
  eligibleCourses,
  catalogCourses
}) => {
  const [activeQuarterModal, setActiveQuarterModal] = useState<string | null>(null)

  const activeQuarter = quarters.find((q) => q.id === activeQuarterModal)
  const totalPlannedUnits = quarters.reduce(
    (sum, q) => sum + q.courses.reduce((cSum, c) => cSum + (c.units ?? 4), 0),
    0
  )
  const totalPlannedCourses = quarters.reduce((sum, q) => sum + q.courses.length, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Planner Controls */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-sky-300 border border-sky-500/30">
              <Calendar className="h-3.5 w-3.5" />
              <span>Multi-Quarter Degree Scheduler</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Quarter Planner
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Schedule courses into quarters with real-time prerequisite ordering validation. AntTrail automatically detects if you place an advanced course before completing its prerequisites.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 min-w-[120px]">
              <div className="text-xs text-slate-400 font-medium">Planned Terms</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {quarters.length}
              </div>
              <div className="text-[10px] text-slate-500">active quarters</div>
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4 min-w-[120px]">
              <div className="text-xs text-sky-300 font-medium">Planned Units</div>
              <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                {totalPlannedUnits}
              </div>
              <div className="text-[10px] text-sky-300/80">{totalPlannedCourses} planned courses</div>
            </div>

            <div
              className={`rounded-2xl border p-4 min-w-[120px] ${
                errors.length > 0
                  ? 'border-rose-500/40 bg-rose-950/30'
                  : 'border-emerald-500/30 bg-emerald-950/30'
              }`}
            >
              <div
                className={`text-xs font-medium ${
                  errors.length > 0 ? 'text-rose-300' : 'text-emerald-300'
                }`}
              >
                Sequencing Status
              </div>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  errors.length > 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {errors.length === 0 ? 'Valid' : `${errors.length} Conflict`}
              </div>
              <div
                className={`text-[10px] ${
                  errors.length > 0 ? 'text-rose-400/80' : 'text-emerald-400/80'
                }`}
              >
                {errors.length === 0 ? 'Prerequisites respected' : 'Order violation'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAutoPlan}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-4 py-2 text-xs font-black text-slate-950 transition-all shadow-lg shadow-amber-950/40"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>⚡ Auto Plan Degree</span>
            </button>

            <button
              onClick={onAddQuarter}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/30"
            >
              <Plus className="h-4 w-4" />
              <span>Add Next Quarter</span>
            </button>

            <button
              onClick={onResetRoadmap}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Load Sample Roadmap</span>
            </button>
          </div>

          <button
            onClick={onClearSchedule}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Schedule</span>
          </button>
        </div>
      </div>

      {/* Sequence Conflicts Alert Banner */}
      {errors.length > 0 && (
        <div className="rounded-2xl border border-rose-500/50 bg-rose-950/30 p-4 sm:p-5 shadow-lg shadow-rose-950/30 animate-shake">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-rose-200">
                Prerequisite Sequencing Conflicts Detected ({errors.length})
              </h3>
              <p className="text-xs text-rose-300/80">
                The following courses cannot be taken in their planned terms because their prerequisite requirements are scheduled later or completely missing:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-rose-200 font-mono">
                {errors.map((e, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="font-bold">• {e.courseCode}</span> in {e.quarterLabel}: {e.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Quarter Columns Grid (Scrollable) */}
      <div className="flex items-start gap-4 overflow-x-auto pb-6 pt-2">
        {quarters.map((quarter) => (
          <QuarterColumn
            key={quarter.id}
            quarter={quarter}
            errors={errors}
            onAddCourseClick={(qId) => setActiveQuarterModal(qId)}
            onRemoveCourse={onRemoveCourse}
            onRemoveQuarter={onRemoveQuarter}
          />
        ))}

        {/* Add Quarter Quick Card */}
        <button
          onClick={onAddQuarter}
          className="flex flex-col items-center justify-center min-w-[200px] h-[220px] rounded-2xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-900/30 hover:bg-blue-600/5 text-slate-400 hover:text-blue-300 transition-all p-6 text-center group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold">Add Next Quarter</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Extend your schedule</span>
        </button>
      </div>

      {/* Add Course Modal */}
      {activeQuarter && (
        <AddCourseModal
          isOpen={Boolean(activeQuarterModal)}
          quarterLabel={`${activeQuarter.term} ${activeQuarter.year}`}
          onClose={() => setActiveQuarterModal(null)}
          onSelectCourse={(courseCode, units, title) =>
            onAddCourse(activeQuarter.id, courseCode, units, title)
          }
          eligibleCourses={eligibleCourses}
          catalogCourses={catalogCourses}
        />
      )}
    </div>
  )
}
