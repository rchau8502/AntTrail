import React, { useState, useMemo } from 'react'
import { Course } from '../../academic-engine/types'
import { X, Search, Sparkles, Plus, BookOpen } from 'lucide-react'

interface AddCourseModalProps {
  isOpen: boolean
  quarterLabel: string
  onClose: () => void
  onSelectCourse: (courseCode: string, units: number, title?: string) => void
  eligibleCourses: string[]
  catalogCourses: Course[]
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  quarterLabel,
  onClose,
  onSelectCourse,
  eligibleCourses,
  catalogCourses
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [customUnits, setCustomUnits] = useState(4)

  if (!isOpen) return null

  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return catalogCourses
    const q = searchQuery.toLowerCase().trim()
    return catalogCourses.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
    )
  }, [catalogCourses, searchQuery])

  const eligibleCatalogMatches = useMemo(() => {
    const set = new Set(eligibleCourses.map((c) => c.toUpperCase()))
    return filteredCatalog.filter((c) => set.has(c.code.toUpperCase()))
  }, [filteredCatalog, eligibleCourses])

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customCode.trim()) return
    onSelectCourse(customCode.trim().toUpperCase(), customUnits, 'Custom Planned Course')
    setCustomCode('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative flex w-full max-w-xl flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-white">Add Course to {quarterLabel}</h2>
            <p className="text-xs text-slate-400">
              Pick from recommended eligible courses or enter a custom course.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search course code or title (e.g. ICS 33, MATH 2D)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-5">
          {/* Eligible Recommendations */}
          {eligibleCatalogMatches.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-anteater-gold mb-2.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Eligible for you right now ({eligibleCatalogMatches.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {eligibleCatalogMatches.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course.code, course.units, course.title)
                      onClose()
                    }}
                    className="flex flex-col text-left rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold text-white group-hover:text-emerald-300">
                        {course.code}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {course.units} units
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {course.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full Catalog Listing */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
              <span>Catalog Courses ({filteredCatalog.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredCatalog.map((course) => (
                <button
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course.code, course.units, course.title)
                    onClose()
                  }}
                  className="flex flex-col text-left rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:bg-slate-800/60 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-blue-300">
                      {course.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {course.units} units
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {course.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Course Fallback */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5 text-blue-400" />
              Add Custom Course / General Education
            </h4>
            <form onSubmit={handleCustomAdd} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. WRITING 39C, ANTHRO 2A, PHYSICS 7C"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="number"
                min="1"
                max="8"
                value={customUnits}
                onChange={(e) => setCustomUnits(Number(e.target.value))}
                className="w-16 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
