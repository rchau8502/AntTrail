import React, { useState } from 'react'
import { StudentProfile, StudentCourseRecord, GradeLetter } from '../academic-engine/types'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../data/uci/equivalencies'
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react'

interface StudentCourseDrawerProps {
  isOpen: boolean
  onClose: () => void
  profile: StudentProfile
  onAddCourse: (course: Omit<StudentCourseRecord, 'id'>) => void
  onRemoveCourse: (courseId: string) => void
  onOpenImportTranscript?: () => void
}

const AVAILABLE_GRADES: GradeLetter[] = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'F', 'P', 'NP', 'IP'
]

export const StudentCourseDrawer: React.FC<StudentCourseDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onAddCourse,
  onRemoveCourse,
  onOpenImportTranscript
}) => {
  const [courseCode, setCourseCode] = useState('')
  const [institution, setInstitution] = useState('UCI')
  const [term, setTerm] = useState('Fall 2025')
  const [units, setUnits] = useState(4)
  const [grade, setGrade] = useState<GradeLetter>('A')
  const [status, setStatus] = useState<'COMPLETED' | 'IN_PROGRESS'>('COMPLETED')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseCode.trim()) {
      setError('Please enter a course code (e.g. ICS 31 or MATH 180)')
      return
    }

    onAddCourse({
      courseCode: courseCode.trim().toUpperCase(),
      institution: institution.trim(),
      term,
      units: Number(units) || 4,
      grade,
      status
    })

    setCourseCode('')
    setError(null)
  }

  // Check if a course in history is an articulated transfer course
  const findArticulatedTarget = (code: string, inst: string) => {
    if (inst === 'UCI') return null
    const match = OFFICIAL_TRANSFER_EQUIVALENCIES.find(
      (eq) =>
        eq.sourceCourseCode.toUpperCase() === code.toUpperCase() ||
        eq.sourceInstitution.toLowerCase().includes(inst.toLowerCase())
    )
    return match ? match.targetUciCourseId : null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative flex w-full max-w-lg flex-col bg-slate-900 border-l border-slate-800 shadow-2xl h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-anteater-gold" />
            <div>
              <h2 className="text-base font-bold text-white">Student Course History</h2>
              <p className="text-xs text-slate-400">
                {profile.courseHistory.length} recorded courses ({profile.completedUnits} completed units)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Quick Import Action Banner */}
          {onOpenImportTranscript && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">Have an unofficial transcript?</div>
                  <div className="text-[11px] text-slate-400">Import StudentAccess or DegreeWorks text</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenImportTranscript()
                }}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 transition-colors shrink-0"
              >
                Import
              </button>
            </div>
          )}

          {/* Quick Add Form */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-blue-400" />
              Add Course to Record
            </h3>

            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ICS 31 or MATH 180"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Institution
                  </label>
                  <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="UCI">UC Irvine</option>
                    <option value="Mt. San Antonio College">Mt. San Antonio College</option>
                    <option value="Irvine Valley College">Irvine Valley College</option>
                    <option value="Orange Coast College">Orange Coast College</option>
                    <option value="AP/IB Exam Credit">AP/IB Exam Credit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Term
                  </label>
                  <input
                    type="text"
                    value={term}
                    placeholder="e.g. Fall 2025"
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Grade
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLetter)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                  >
                    {AVAILABLE_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    step="0.5"
                    value={units}
                    onChange={(e) => setUnits(parseFloat(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'COMPLETED' | 'IN_PROGRESS')}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Add to Academic Record
              </button>
            </form>
          </div>

          {/* List of Courses */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Academic Record ({profile.courseHistory.length})
            </h3>

            {profile.courseHistory.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
                No courses recorded yet. Add your first course or select a persona above.
              </div>
            ) : (
              <div className="space-y-2">
                {profile.courseHistory.map((course) => {
                  const articulatedTarget = findArticulatedTarget(course.courseCode, course.institution)

                  return (
                    <div
                      key={course.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white">
                            {course.courseCode}
                          </span>
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-anteater-gold">
                            {course.grade}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({course.units} units)
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span>{course.institution}</span>
                          <span>•</span>
                          <span>{course.term}</span>
                          <span>•</span>
                          <span
                            className={`flex items-center gap-1 text-[10px] ${
                              course.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {course.status === 'COMPLETED' ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {course.status}
                          </span>
                        </div>

                        {articulatedTarget && (
                          <div className="flex items-center gap-1 pt-1 text-[11px] text-sky-400">
                            <ArrowRightLeft className="h-3 w-3" />
                            <span>Satisfies UCI Equivalent: </span>
                            <span className="font-bold text-sky-300 font-mono">{articulatedTarget}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveCourse(course.id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                        title="Remove course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
