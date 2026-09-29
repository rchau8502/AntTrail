import React from 'react'
import { PlannedQuarter, SequenceValidationError } from '../../academic-engine/types'
import { Plus, Trash2, AlertTriangle, BookOpen } from 'lucide-react'

interface QuarterColumnProps {
  quarter: PlannedQuarter
  errors: SequenceValidationError[]
  onAddCourseClick: (quarterId: string) => void
  onRemoveCourse: (quarterId: string, courseCode: string) => void
  onRemoveQuarter: (quarterId: string) => void
}

export const QuarterColumn: React.FC<QuarterColumnProps> = ({
  quarter,
  errors,
  onAddCourseClick,
  onRemoveCourse,
  onRemoveQuarter
}) => {
  const totalUnits = quarter.courses.reduce((sum, c) => sum + (c.units ?? 4), 0)
  const isOverload = totalUnits > 20
  const isUnderload = totalUnits > 0 && totalUnits < 12
  const quarterErrors = errors.filter((e) => e.quarterId === quarter.id)

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-slate-900/60 p-4 min-w-[280px] w-full transition-all ${
        quarterErrors.length > 0
          ? 'border-rose-500/40 shadow-lg shadow-rose-950/20'
          : 'border-slate-800'
      }`}
    >
      {/* Quarter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            {quarter.term} {quarter.year}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                isOverload
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : isUnderload
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {totalUnits} Units
            </span>
            {isOverload && <span className="text-[10px] text-rose-400 font-medium">Overload (&gt;20)</span>}
            {isUnderload && <span className="text-[10px] text-amber-400 font-medium">Underload (&lt;12)</span>}
          </div>
        </div>

        <button
          onClick={() => onRemoveQuarter(quarter.id)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-rose-400 transition-colors"
          title="Remove Quarter"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Course List in Quarter */}
      <div className="flex-1 space-y-2.5 min-h-[140px]">
        {quarter.courses.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800/80 p-6 text-center text-xs text-slate-500">
            <BookOpen className="h-5 w-5 mb-1.5 text-slate-600" />
            <span>No courses planned yet</span>
          </div>
        ) : (
          quarter.courses.map((course) => {
            const courseError = quarterErrors.find((e) => e.courseCode === course.courseCode)

            return (
              <div
                key={course.courseCode}
                className={`group relative rounded-xl border p-3 transition-all ${
                  courseError
                    ? 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-bold text-white">
                        {course.courseCode}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({course.units}u)
                      </span>
                    </div>
                    {course.customTitle && (
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {course.customTitle}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveCourse(quarter.id, course.courseCode)}
                    className="opacity-60 hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                    title="Remove from quarter"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {courseError && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-rose-950/50 border border-rose-500/30 p-2 text-[11px] text-rose-300">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="leading-tight">
                      <span className="font-semibold">{courseError.reason}: </span>
                      {courseError.message}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Add Course Button */}
      <button
        onClick={() => onAddCourseClick(quarter.id)}
        className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-xl border border-dashed border-slate-700 bg-slate-950/40 py-2.5 text-xs font-semibold text-slate-300 hover:bg-blue-600/10 hover:border-blue-500/50 hover:text-blue-300 transition-all"
      >
        <Plus className="h-4 w-4" />
        <span>Add Course</span>
      </button>
    </div>
  )
}
