import React, { useState, useMemo } from 'react'
import {
  StudentProfile,
  PlannedQuarter,
  GradeLetter
} from '../../academic-engine/types'
import { useLanguage } from '../../../lib/i18n/LanguageContext'
import {
  calculateUciGpaReport,
  calculateTargetGpaRequirement,
  projectWhatIfTrajectory
} from '../../academic-engine/gpa'
import {
  Calculator,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react'

interface GpaCalculatorViewProps {
  profile: StudentProfile
  plannedQuarters: PlannedQuarter[]
}

const SELECTABLE_GRADES: GradeLetter[] = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'F', 'P', 'NP'
]

export const GpaCalculatorView: React.FC<GpaCalculatorViewProps> = ({
  profile,
  plannedQuarters
}) => {
  const { t } = useLanguage()
  // Target GPA State
  const [targetGpa, setTargetGpa] = useState<number>(3.5)

  // What-If Scenario State: courseCode -> selected hypothetical grade
  const [hypotheticalGrades, setHypotheticalGrades] = useState<Record<string, GradeLetter>>({})

  // Evaluate Live UCI GPA Report
  const gpaReport = useMemo(() => {
    return calculateUciGpaReport(profile)
  }, [profile])

  // Count planned graded units
  const totalPlannedUnits = useMemo(() => {
    return plannedQuarters.reduce(
      (sum, q) => sum + q.courses.reduce((cSum, c) => cSum + c.units, 0),
      0
    )
  }, [plannedQuarters])

  // Target GPA Requirement
  const targetRequirement = useMemo(() => {
    return calculateTargetGpaRequirement(gpaReport, totalPlannedUnits, targetGpa)
  }, [gpaReport, totalPlannedUnits, targetGpa])

  // What-If Trajectory
  const trajectory = useMemo(() => {
    return projectWhatIfTrajectory(profile, plannedQuarters, hypotheticalGrades)
  }, [profile, plannedQuarters, hypotheticalGrades])

  // Final Projected GPA from trajectory
  const finalProjectedGpa = useMemo(() => {
    if (trajectory.length === 0) return gpaReport.cumulativeGpa
    return trajectory[trajectory.length - 1].cumulativeGpa
  }, [trajectory, gpaReport.cumulativeGpa])

  const handleGradeChange = (courseCode: string, grade: GradeLetter) => {
    setHypotheticalGrades((prev) => ({
      ...prev,
      [courseCode]: grade
    }))
  }

  const handleSetAllGrades = (grade: GradeLetter) => {
    const updated: Record<string, GradeLetter> = {}
    plannedQuarters.forEach((q) => {
      q.courses.forEach((c) => {
        updated[c.courseCode] = grade
      })
    })
    setHypotheticalGrades(updated)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30">
              <Calculator className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white">
              {t.degreePlanningHub.gpaHeaderTitle}
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {t.degreePlanningHub.gpaHeaderDesc}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-950/30 px-3 py-1 text-xs font-semibold text-sky-300">
            <Award className="h-3.5 w-3.5" />
            <span>{t.degreePlanningHub.gpaOfficialBadge}</span>
          </span>
        </div>
      </div>

      {/* Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cumulative UC GPA */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.degreePlanningHub.gpaUcCumulative}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                gpaReport.cumulativeGpa >= 3.5
                  ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                  : gpaReport.cumulativeGpa >= 3.0
                  ? 'bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40'
                  : gpaReport.cumulativeGpa >= 2.0
                  ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40'
              }`}
            >
              {gpaReport.cumulativeGpa.toFixed(2)}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {gpaReport.cumulativeGpa > 0 ? gpaReport.cumulativeGpa.toFixed(2) : 'N/A'}
            </span>
            <span className="text-xs text-slate-400">/ 4.00 max</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Based on {gpaReport.totalGradedUnits} graded UCI units ({gpaReport.totalGradePoints} grade points)
          </p>
        </div>

        {/* Academic Standing */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.degreePlanningHub.gpaAcademicStanding}
            </span>
            {gpaReport.academicStanding === 'GOOD_STANDING' ? (
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            )}
          </div>
          <div className="mt-3">
            <span
              className={`text-lg font-bold ${
                gpaReport.academicStanding === 'GOOD_STANDING'
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {gpaReport.academicStanding === 'GOOD_STANDING'
                ? t.degreePlanningHub.gpaGoodStanding
                : t.degreePlanningHub.gpaProbation}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {gpaReport.academicStanding === 'GOOD_STANDING'
              ? 'Meets UCI minimum 2.0 cumulative requirement'
              : 'Cumulative GPA is below UCI 2.0 threshold'}
          </p>
        </div>

        {/* Unit Breakdown & Transfer Exclusion */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.degreePlanningHub.gpaUnitsTowardDegree}
            </span>
            <BookOpen className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {gpaReport.totalEarnedUnits}
            </span>
            <span className="text-xs text-slate-400">total units</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {profile.completedUnits - gpaReport.totalGradedUnits > 0
              ? `${profile.completedUnits - gpaReport.totalGradedUnits} transfer/P-NP units excluded from UC GPA`
              : 'All units completed via graded UCI coursework'}
          </p>
        </div>

        {/* Dean's Honor List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.degreePlanningHub.gpaDeansList}
            </span>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-300">
              {gpaReport.deansListTerms.length}
            </span>
            <span className="text-xs text-slate-400">quarter(s)</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Requires term GPA &ge; 3.5 in &ge; 12 graded units
          </p>
        </div>
      </div>

      {/* Target GPA Planner Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <h2 className="text-base font-bold text-white">{t.degreePlanningHub.gpaTargetTitle}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.degreePlanningHub.gpaTargetDesc}
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            {[
              { label: 'Good Standing (2.0)', value: 2.0 },
              { label: '3.00 (B)', value: 3.0 },
              { label: "Dean's List (3.50)", value: 3.5 },
              { label: 'Cum Laude (3.65)', value: 3.65 },
              { label: 'Summa Cum Laude (3.90)', value: 3.9 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setTargetGpa(preset.value)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  targetGpa === preset.value
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target Slider & Live Result */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Target Cumulative GPA:</span>
              <span className="text-lg font-extrabold text-sky-400 font-mono">
                {targetGpa.toFixed(2)}
              </span>
            </div>

            <input
              type="range"
              min="2.0"
              max="4.0"
              step="0.05"
              value={targetGpa}
              onChange={(e) => setTargetGpa(parseFloat(e.target.value))}
              aria-label="Target Cumulative GPA slider"
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>2.00 (Minimum)</span>
              <span>3.00 (B average)</span>
              <span>3.50 (Dean's List)</span>
              <span>4.00 (Straight A's)</span>
            </div>
          </div>

          {/* Status Badge Box */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-center ${
              targetRequirement.status === 'ACHIEVABLE'
                ? 'border-emerald-500/40 bg-emerald-950/20'
                : targetRequirement.status === 'ALREADY_EXCEEDED'
                ? 'border-sky-500/40 bg-sky-950/20'
                : 'border-rose-500/40 bg-rose-950/20'
            }`}
          >
            <div className="flex items-center gap-2">
              {targetRequirement.status === 'ACHIEVABLE' ? (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              ) : targetRequirement.status === 'ALREADY_EXCEEDED' ? (
                <Sparkles className="h-4 w-4 text-sky-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              )}
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  targetRequirement.status === 'ACHIEVABLE'
                    ? 'text-emerald-400'
                    : targetRequirement.status === 'ALREADY_EXCEEDED'
                    ? 'text-sky-400'
                    : 'text-rose-400'
                }`}
              >
                {targetRequirement.status === 'ACHIEVABLE'
                  ? 'Target Achievable'
                  : targetRequirement.status === 'ALREADY_EXCEEDED'
                  ? 'Target Guaranteed'
                  : 'Target Unattainable'}
              </span>
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-100">
              {targetRequirement.explanation}
            </div>

            {targetRequirement.status === 'ACHIEVABLE' && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                <span>Recommended average:</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 ring-1 ring-emerald-500/40">
                  {targetRequirement.recommendedAverageGrade} ({targetRequirement.requiredGpa.toFixed(2)})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* UCI 16-Unit Repeat Policy Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              <strong>UCI Regulation A345 Repeat Policy:</strong> First 16 units of repeated coursework replace the original grade in cumulative GPA calculations.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">Allowance Used:</span>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
              <span className="font-bold text-sky-400 font-mono">
                {gpaReport.repeatUnitsReplaced} / 16
              </span>
              <span className="text-[10px] text-slate-400">units</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive What-If Scenario Modeler */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <h2 className="text-base font-bold text-white">What-If Quarterly Simulator</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Assign hypothetical expected grades to each planned course to see your projected cumulative GPA trajectory over time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Set All To:</span>
            {(['A', 'B+', 'B', 'C+'] as GradeLetter[]).map((g) => (
              <button
                key={g}
                onClick={() => handleSetAllGrades(g)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                All {g}
              </button>
            ))}
          </div>
        </div>

        {/* Trajectory Timeline Bar / Mini Chart */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
            <span>Cumulative GPA Trajectory</span>
            <span className="text-emerald-400">
              Projected Final GPA: {finalProjectedGpa.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {trajectory.map((pt, idx) => (
              <div
                key={pt.periodId || idx}
                className={`rounded-2xl border p-3.5 flex flex-col justify-between transition-all ${
                  pt.isProjected
                    ? 'border-sky-500/30 bg-sky-950/20 shadow-sm'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {pt.isProjected ? 'Projected' : 'Actual'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        pt.isProjected
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Term: {pt.termGpa.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">
                    {pt.label}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-[10px] text-slate-400">Cum. GPA:</span>
                  <span className="text-base font-extrabold text-white font-mono">
                    {pt.cumulativeGpa.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course-by-Course Grade Selectors */}
        {plannedQuarters.length > 0 ? (
          <div className="mt-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hypothetical Grade Selection By Quarter
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plannedQuarters.map((quarter) => (
                <div
                  key={quarter.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-white">
                      {quarter.term} {quarter.year}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {quarter.courses.reduce((sum, c) => sum + c.units, 0)} units
                    </span>
                  </div>

                  <div className="space-y-2">
                    {quarter.courses.map((course) => {
                      const selectedGrade = hypotheticalGrades[course.courseCode] || 'B+'
                      return (
                        <div
                          key={course.courseCode}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-bold text-slate-200 truncate">
                            {course.courseCode}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">
                              {course.units}u
                            </span>
                            <select
                              value={selectedGrade}
                              onChange={(e) =>
                                handleGradeChange(
                                  course.courseCode,
                                  e.target.value as GradeLetter
                                )
                              }
                              aria-label={`Hypothetical grade for ${course.courseCode}`}
                              className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-bold text-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            >
                              {SELECTABLE_GRADES.map((g) => (
                                <option key={g} value={g}>
                                  {g}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/30 p-6 text-center text-xs text-slate-400">
            No quarters planned yet. Switch to the <strong>Quarter Planner</strong> tab to add courses to upcoming terms.
          </div>
        )}
      </div>

      {/* Historical Transcript Breakdown Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Quarterly Course History Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/40">
              <tr>
                <th className="py-3 px-4">Term</th>
                <th className="py-3 px-4">Courses & Grades</th>
                <th className="py-3 px-4">Graded Units</th>
                <th className="py-3 px-4">Term GPA</th>
                <th className="py-3 px-4">Dean's Honor List</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {gpaReport.termSummaries.map((termSummary) => (
                <tr key={termSummary.term} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">
                    {termSummary.term}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <div className="flex flex-wrap gap-1.5">
                      {termSummary.courses.map((c, i) => (
                        <span
                          key={i}
                          className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                            c.isRepeatReplaced
                              ? 'bg-amber-950/40 text-amber-300 line-through'
                              : c.isTransferExcluded
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-slate-800/80 text-sky-300'
                          }`}
                          title={
                            c.isRepeatReplaced
                              ? 'Replaced under UCI 16-unit repeat policy'
                              : c.isTransferExcluded
                              ? 'Transfer credit (excluded from UC GPA)'
                              : `${c.gradePoints} grade points`
                          }
                        >
                          {c.courseCode} ({c.grade})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">{termSummary.gradedUnits}</td>
                  <td className="py-3 px-4 font-bold text-white">
                    {termSummary.gradedUnits > 0 ? termSummary.gpa.toFixed(2) : 'N/A'}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    {termSummary.deansListEligible ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 ring-1 ring-amber-500/40">
                        <Award className="h-3 w-3" />
                        <span>Dean's List</span>
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
