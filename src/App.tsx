import React, { useState, useMemo, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { PersonaSelector } from './components/PersonaSelector'
import { CourseFilters, FilterStatus } from './components/CourseFilters'
import { CourseCard } from './components/CourseCard'
import { StudentCourseDrawer } from './components/StudentCourseDrawer'
import { UCI_CS_MATH_COURSES } from './data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from './data/uci/equivalencies'
import { STUDENT_PERSONAS, StudentPersona } from './data/mock/mockStudentData'
import { evaluateAllCourses } from './academic-engine/eligibility'
import {
  StudentProfile,
  StudentCourseRecord,
  GradeLetter,
  EligibilityResult,
  TermOffering
} from './academic-engine/types'
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Shield,
  Layers,
  ChevronRight
} from 'lucide-react'

const STORAGE_KEY = 'anttrail_active_profile_v1'

export const App: React.FC = () => {
  // --- Persona & Profile State ---
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('freshman')
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback
    }
    return STUDENT_PERSONAS[0].profile
  })

  // Persist locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // ignore
    }
  }, [profile])

  // --- Filter & Drawer State ---
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // --- Deterministic Rules Engine Evaluation ---
  const evaluationResults = useMemo(() => {
    return evaluateAllCourses(UCI_CS_MATH_COURSES, profile, OFFICIAL_TRANSFER_EQUIVALENCIES)
  }, [profile])

  // Map of completed course codes for O(1) lookup
  const completedMap = useMemo(() => {
    const map = new Map<string, { grade: GradeLetter; id: string }>()
    for (const rec of profile.courseHistory) {
      if (rec.status === 'COMPLETED') {
        map.set(rec.courseCode.toUpperCase(), { grade: rec.grade, id: rec.id })
      }
    }
    return map
  }, [profile.courseHistory])

  // Calculate Standing from completed units
  const calculateStanding = (units: number): 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' => {
    if (units >= 135) return 'Senior'
    if (units >= 90) return 'Junior'
    if (units >= 45) return 'Sophomore'
    return 'Freshman'
  }

  // --- Handlers ---
  const handleSelectPersona = (persona: StudentPersona) => {
    setSelectedPersonaId(persona.id)
    setProfile(persona.profile)
  }

  const handleResetProfile = () => {
    const fresh = STUDENT_PERSONAS[0].profile
    setSelectedPersonaId('freshman')
    setProfile(fresh)
  }

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `anttrail-profile-${profile.major.replace(/\s+/g, '_')}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Fast toggle completed status directly on CourseCard
  const handleToggleCourseCompleted = (courseCode: string) => {
    const normalized = courseCode.trim().toUpperCase()
    const existing = completedMap.get(normalized)

    if (existing) {
      // Remove it
      handleRemoveCourse(existing.id)
    } else {
      // Find course to get units
      const targetCourse = UCI_CS_MATH_COURSES.find((c) => c.code.toUpperCase() === normalized)
      const unitsToAdd = targetCourse ? targetCourse.units : 4

      handleAddCourse({
        courseCode: normalized,
        institution: 'UCI',
        term: 'Completed Prior',
        units: unitsToAdd,
        grade: 'A',
        status: 'COMPLETED'
      })
    }
  }

  const handleAddCourse = (course: Omit<StudentCourseRecord, 'id'>) => {
    const newCourse: StudentCourseRecord = {
      ...course,
      id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    }
    const updatedHistory = [...profile.courseHistory, newCourse]
    const updatedUnits = updatedHistory
      .filter((c) => c.status === 'COMPLETED')
      .reduce((acc, curr) => acc + curr.units, 0)

    setProfile({
      ...profile,
      courseHistory: updatedHistory,
      completedUnits: updatedUnits,
      classStanding: calculateStanding(updatedUnits)
    })
  }

  const handleRemoveCourse = (courseId: string) => {
    const updatedHistory = profile.courseHistory.filter((c) => c.id !== courseId)
    const updatedUnits = updatedHistory
      .filter((c) => c.status === 'COMPLETED')
      .reduce((acc, curr) => acc + curr.units, 0)

    setProfile({
      ...profile,
      courseHistory: updatedHistory,
      completedUnits: updatedUnits,
      classStanding: calculateStanding(updatedUnits)
    })
  }

  // --- Filtering Logic ---
  const filteredResults = useMemo(() => {
    return evaluationResults.filter((result: EligibilityResult) => {
      const { course, isEligible, status } = result

      // Department filter
      if (selectedDepartment !== 'ALL' && course.department !== selectedDepartment) {
        return false
      }

      // Status filter
      if (filterStatus === 'ELIGIBLE_ONLY' && !isEligible) return false
      if (filterStatus === 'MISSING_ONLY' && isEligible) return false
      if (filterStatus === 'TRANSFER_ONLY' && status !== 'TRANSFER_EQUIVALENCY_USED') return false

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchCode = course.code.toLowerCase().includes(q)
        const matchTitle = course.title.toLowerCase().includes(q)
        const matchDesc = course.description.toLowerCase().includes(q)
        const matchInstructor = course.offerings?.some((off: TermOffering) =>
          off.instructors?.some((inst: string) => inst.toLowerCase().includes(q))
        )
        return matchCode || matchTitle || matchDesc || matchInstructor
      }

      return true
    })
  }, [evaluationResults, selectedDepartment, filterStatus, searchQuery])

  // Count summaries
  const eligibleCount = evaluationResults.filter((r: EligibilityResult) => r.isEligible).length
  const missingCount = evaluationResults.filter((r: EligibilityResult) => !r.isEligible).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onReset={handleResetProfile} onExport={handleExportJSON} />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
        {/* Hero Banner & Purpose */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-anteater-gold/15 px-3 py-1 text-xs font-bold text-anteater-gold ring-1 ring-anteater-gold/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Phase 1 — Prerequisite Boolean Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                What UCI courses can you take next?
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                AntTrail deterministically evaluates actual UCI catalog prerequisites, letter grade rules,
                and approved California Community College transfer equivalencies to show your exact course eligibility.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 min-w-[120px]">
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Eligible Now
                </div>
                <div className="text-2xl font-black text-white font-mono">{eligibleCount}</div>
                <div className="text-[10px] text-emerald-400/80">ready for enrollment</div>
              </div>

              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-3.5 min-w-[120px]">
                <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold mb-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Prereqs Missing
                </div>
                <div className="text-2xl font-black text-white font-mono">{missingCount}</div>
                <div className="text-[10px] text-rose-400/80">locked by chains</div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex flex-col justify-center rounded-2xl border border-blue-500/40 bg-blue-600/30 p-3.5 hover:bg-blue-600/50 hover:border-blue-400 transition-all text-left min-w-[140px]"
              >
                <div className="flex items-center gap-1.5 text-xs text-blue-300 font-semibold mb-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  Course Record
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {profile.courseHistory.length}
                </div>
                <div className="text-[10px] text-blue-300 flex items-center gap-0.5">
                  Manage record <ChevronRight className="h-3 w-3" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Persona Selector */}
        <PersonaSelector
          selectedPersonaId={selectedPersonaId}
          onSelectPersona={handleSelectPersona}
          activeProfile={profile}
        />

        {/* Search & Filters */}
        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          filterStatus={filterStatus}
          onSelectFilterStatus={setFilterStatus}
          totalCount={filteredResults.length}
          eligibleCount={eligibleCount}
          missingCount={missingCount}
        />

        {/* Course Cards Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Catalog & Eligibility Matrix ({filteredResults.length})</span>
            </h2>
            <p className="text-xs text-slate-400 hidden sm:block">
              Click the checkmark on any card to toggle completion and see real-time prerequisite updates.
            </p>
          </div>

          {filteredResults.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center text-slate-400">
              <AlertCircle className="mx-auto h-8 w-8 text-slate-500 mb-2" />
              <p className="text-sm font-semibold">No courses match the current search or filters.</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the department or status filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map((result: EligibilityResult) => {
                const comp = completedMap.get(result.course.code.toUpperCase())
                return (
                  <CourseCard
                    key={result.course.id}
                    result={result}
                    isCompleted={Boolean(comp)}
                    completedGrade={comp?.grade}
                    onToggleCompleted={handleToggleCourseCompleted}
                  />
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Student Course Drawer */}
      <StudentCourseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        profile={profile}
        onAddCourse={handleAddCourse}
        onRemoveCourse={handleRemoveCourse}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Privacy Invariant: 100% Client-Side. No student academic records persist on our servers.</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            AntTrail is an independent student academic resource and is not affiliated with or endorsed by UC Irvine.
          </div>
        </div>
      </footer>
    </div>
  )
}
