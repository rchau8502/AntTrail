import React, { useState } from 'react'
import { EligibilityResult, GradeLetter } from '../academic-engine/types'
import { PrerequisiteTreeVisualizer } from './PrerequisiteTreeVisualizer'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  PlusCircle,
  Clock,
  Sparkles
} from 'lucide-react'

interface CourseCardProps {
  result: EligibilityResult
  isCompleted: boolean
  completedGrade?: GradeLetter
  onToggleCompleted: (courseCode: string) => void
}

export const CourseCard: React.FC<CourseCardProps> = ({
  result,
  isCompleted,
  completedGrade,
  onToggleCompleted
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { course, status, isEligible, missingItems, transferEquivalentsUsed, warnings } = result

  // Status Styling
  const getBadgeStyle = () => {
    if (isCompleted) {
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30'
    }
    switch (status) {
      case 'ELIGIBLE':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      case 'TRANSFER_EQUIVALENCY_USED':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      case 'MISSING_PREREQUISITES':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      case 'REQUIRES_REVIEW':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-700'
    }
  }

  const getStatusLabel = () => {
    if (isCompleted) return `Completed (${completedGrade ?? 'A'})`
    switch (status) {
      case 'ELIGIBLE':
        return '✓ Eligible for Enrollment'
      case 'TRANSFER_EQUIVALENCY_USED':
        return '✓ Eligible (Transfer Articulation)'
      case 'MISSING_PREREQUISITES':
        return 'Not Eligible Yet'
      case 'REQUIRES_REVIEW':
        return 'Placement / Review Required'
      default:
        return status
    }
  }

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden ${
        isCompleted
          ? 'border-blue-900/40 bg-slate-900/40'
          : isEligible
          ? 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-950/20'
          : 'border-slate-800/60 bg-slate-950/60 opacity-90'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Header row: Course Code, Title, Units, Status Badge */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-anteater-gold transition-colors font-mono">
                {course.code}
              </span>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300">
                {course.units} Units
              </span>
              <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                {course.department}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-200">{course.title}</h3>
          </div>

          <div className="flex items-center gap-2 self-start">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getBadgeStyle()}`}
            >
              {isCompleted ? (
                <Check className="h-3 w-3" />
              ) : isEligible ? (
                <Sparkles className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {getStatusLabel()}
            </span>

            <button
              onClick={() => onToggleCompleted(course.code)}
              className={`rounded-lg p-1.5 text-xs font-medium transition-colors ${
                isCompleted
                  ? 'bg-blue-600/30 text-blue-300 hover:bg-rose-500/20 hover:text-rose-300'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
              title={isCompleted ? 'Remove from completed history' : 'Mark as completed with grade A'}
            >
              <PlusCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Concise Description */}
        <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Missing Prerequisites Pill Alert */}
        {!isEligible && missingItems.length > 0 && (
          <div className="mt-3 rounded-xl border border-rose-900/40 bg-rose-950/20 p-2.5 text-xs text-rose-300">
            <span className="font-semibold text-rose-200">Missing Prerequisites:</span>
            <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px] text-rose-300/90">
              {missingItems.slice(0, 3).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Transfer Equivalent Highlight (from prompt: MATH 3A ✓ Satisfied by Mt. SAC MATH 260) */}
        {transferEquivalentsUsed.length > 0 && (
          <div className="mt-3 rounded-xl border border-sky-800/40 bg-sky-950/20 p-2.5 text-xs text-sky-300">
            <span className="font-semibold text-sky-200">Transfer Articulation Applied:</span>
            <div className="mt-1 space-y-0.5 text-[11px]">
              {transferEquivalentsUsed.map((t, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-sky-300 font-mono">
                  <span>✓</span>
                  <span>{course.code} satisfied by {t.institution} {t.transferCourse}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offering quarters */}
        {course.offerings && course.offerings.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
            <span className="font-medium text-slate-500">Upcoming Offerings:</span>
            {course.offerings.map((off, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-slate-300 border border-slate-700/50"
              >
                <span>{off.term} {off.year}</span>
                <span className={`text-[9px] font-bold px-1 rounded ${
                  off.confidence === 'CONFIRMED'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : off.confidence === 'EXPECTED'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {off.confidence}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-2 space-y-1">
            {warnings.map((w, idx) => (
              <p key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-300/80">
                <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0" />
                {w}
              </p>
            ))}
          </div>
        )}

        {/* Footer: Toggle breakdown button */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Info className="h-3.5 w-3.5" />
            <span>Prereq: {course.prerequisiteText || 'None'}</span>
          </div>

          {result.tree && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>{isExpanded ? 'Hide Logic Tree' : 'View Logic Tree'}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Prerequisite AST Logic */}
      {isExpanded && result.tree && (
        <div className="border-t border-slate-800 bg-slate-950/80 p-4">
          <PrerequisiteTreeVisualizer tree={result.tree} />
        </div>
      )}
    </div>
  )
}
