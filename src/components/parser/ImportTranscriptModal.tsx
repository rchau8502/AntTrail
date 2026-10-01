import React, { useState, useMemo, useEffect } from 'react'
import {
  Course,
  CourseEquivalency,
  GradeLetter
} from '../../academic-engine/types'
import { parseAcademicRecordText } from '../../academic-engine/parser/parser'
import {
  SAMPLE_STUDENT_ACCESS_TRANSCRIPT,
  SAMPLE_DEGREE_WORKS_AUDIT,
  SAMPLE_GENERIC_COURSE_LIST
} from '../../data/mock/sampleTranscripts'
import {
  X,
  FileText,
  Shield,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Square
} from 'lucide-react'

interface ImportTranscriptModalProps {
  isOpen: boolean
  onClose: () => void
  onImportCourses: (
    courses: Array<{
      courseCode: string
      units: number
      grade: GradeLetter
      term: string
      institution: string
      status: 'COMPLETED' | 'IN_PROGRESS' | 'TRANSFER'
    }>,
    replaceExisting: boolean
  ) => void
  catalogCourses: Course[]
  transferEquivalencies: CourseEquivalency[]
}

export const ImportTranscriptModal: React.FC<ImportTranscriptModalProps> = ({
  isOpen,
  onClose,
  onImportCourses,
  catalogCourses,
  transferEquivalencies
}) => {
  const [rawText, setRawText] = useState('')
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Parse reactively whenever rawText changes
  const parseResult = useMemo(() => {
    if (!rawText.trim()) return null
    return parseAcademicRecordText(rawText, catalogCourses, transferEquivalencies)
  }, [rawText, catalogCourses, transferEquivalencies])

  // Select all parsed courses by default
  useEffect(() => {
    if (parseResult && parseResult.courses.length > 0) {
      setSelectedIds(new Set(parseResult.courses.map((c) => c.id)))
    } else {
      setSelectedIds(new Set())
    }
  }, [parseResult])

  if (!isOpen) return null

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSelectAll = () => {
    if (parseResult) {
      setSelectedIds(new Set(parseResult.courses.map((c) => c.id)))
    }
  }

  const handleDeselectAll = () => {
    setSelectedIds(new Set())
  }

  const handleImport = () => {
    if (!parseResult) return
    const selectedCourses = parseResult.courses
      .filter((c) => selectedIds.has(c.id))
      .map((c) => ({
        courseCode: c.articulationTargetCode || c.courseCode,
        units: c.units,
        grade: c.grade,
        term: c.term,
        institution: c.institution || 'UCI',
        status: c.status
      }))

    if (selectedCourses.length > 0) {
      onImportCourses(selectedCourses, replaceExisting)
      onClose()
    }
  }

  const formatLabel =
    parseResult?.detectedFormat === 'STUDENT_ACCESS'
      ? 'UCI StudentAccess Unofficial Record'
      : parseResult?.detectedFormat === 'DEGREE_WORKS'
      ? 'UCI DegreeWorks Audit Text'
      : parseResult?.detectedFormat === 'GENERIC_LIST'
      ? 'Course List Format'
      : 'Auto-Detecting Format...'

  const selectedCount = selectedIds.size

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="relative flex w-full max-w-4xl flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl max-h-[92vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/30 text-sky-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                <span>Phase 4</span>
                <span>•</span>
                <span>Deterministic Parser</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Import Transcript or DegreeWorks
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
          {/* Privacy Banner */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-emerald-300">
                100% Client-Side Invariant & Automatic PII Redaction
              </div>
              <p className="text-slate-300 leading-relaxed">
                Your transcript text is processed strictly within local browser memory. No student IDs, names, or grade records are ever transmitted over the network. Personal identifiers are stripped instantly.
              </p>
            </div>
          </div>

          {/* Input & Sample Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                <span>Paste StudentAccess or DegreeWorks Text</span>
              </label>

              {/* Sample Triggers */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Try sample:</span>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_STUDENT_ACCESS_TRANSCRIPT)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-blue-600/20 hover:text-sky-300 hover:border-blue-500/30 transition-colors"
                >
                  StudentAccess
                </button>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_DEGREE_WORKS_AUDIT)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-blue-600/20 hover:text-sky-300 hover:border-blue-500/30 transition-colors"
                >
                  DegreeWorks
                </button>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_GENERIC_COURSE_LIST)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-blue-600/20 hover:text-sky-300 hover:border-blue-500/30 transition-colors"
                >
                  Quick List
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw text copied from UCI StudentAccess Unofficial Transcript or DegreeWorks Audit..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          {/* Parsed Results Section */}
          {parseResult && (
            <div className="space-y-4">
              {/* Parse Summary Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-sky-400">
                    {formatLabel}
                  </div>
                  <span className="text-xs text-slate-300">
                    Found <strong className="text-white font-mono">{parseResult.courses.length}</strong> courses (
                    <strong className="text-white font-mono">{parseResult.totalUnitsExtracted}</strong> units)
                  </span>
                </div>

                {parseResult.sanitizedPiiCount > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    <Shield className="h-3 w-3" />
                    <span>Redacted {parseResult.sanitizedPiiCount} PII fields</span>
                  </div>
                )}
              </div>

              {/* Table Selection Controls */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-2">
                  <span>Selected:</span>
                  <span className="font-mono font-bold text-sky-400">{selectedCount}</span> of{' '}
                  <span className="font-mono">{parseResult.courses.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="hover:text-white transition-colors text-xs text-slate-400 underline decoration-slate-700"
                  >
                    Select All
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="hover:text-white transition-colors text-xs text-slate-400 underline decoration-slate-700"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {/* Course Checklist Table */}
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/40">
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/60">
                  {parseResult.courses.map((course) => {
                    const isChecked = selectedIds.has(course.id)
                    const gradeColor =
                      course.grade.startsWith('A')
                        ? 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30'
                        : course.grade.startsWith('B')
                        ? 'text-sky-400 bg-blue-950/50 border-blue-500/30'
                        : course.grade.startsWith('C') || course.grade === 'P'
                        ? 'text-amber-400 bg-amber-950/50 border-amber-500/30'
                        : 'text-rose-400 bg-rose-950/50 border-rose-500/30'

                    return (
                      <div
                        key={course.id}
                        onClick={() => handleToggleSelect(course.id)}
                        className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-slate-900/80 hover:bg-slate-800/80'
                            : 'bg-slate-950/40 hover:bg-slate-900/40 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-600" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-white">
                                {course.courseCode}
                              </span>
                              {course.isArticulation && (
                                <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.2 text-[10px] font-bold text-purple-300">
                                  {course.articulationTargetCode
                                    ? `→ UCI ${course.articulationTargetCode}`
                                    : 'Transfer Articulated'}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">
                                {course.term}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {course.title || course.institution || 'UCI Course'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400">
                            {course.units} units
                          </span>
                          <span
                            className={`rounded-lg border px-2 py-0.5 text-xs font-bold font-mono ${gradeColor}`}
                          >
                            {course.grade}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Import Options */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-200">
                      Import Mode
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {replaceExisting
                        ? 'Replace current student profile history with imported courses'
                        : 'Append to and merge with current student profile history'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReplaceExisting(false)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        !replaceExisting
                          ? 'bg-blue-600 text-white font-bold'
                          : 'border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Merge (Keep Existing)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplaceExisting(true)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        replaceExisting
                          ? 'bg-rose-600 text-white font-bold'
                          : 'border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Replace Entire Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={!parseResult || selectedCount === 0}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/30"
          >
            <span>Import {selectedCount} Selected Courses</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
