import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { StudentTranscriptManager } from './components/StudentTranscriptManager'
import { FilterBar } from './components/FilterBar'
import { CourseCard } from './components/CourseCard'
import { UCI_CS_MATH_COURSES } from './data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from './data/uci/equivalencies'
import { STUDENT_PERSONAS } from './data/mock/mockStudentData'
import { evaluateCourseEligibility } from './academic-engine/eligibility'
import { StudentProfile, StudentCourseRecord } from './academic-engine/types'
import { Shield, BookOpen, AlertCircle, Compass } from 'lucide-react'

export function App() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('sophomore_cs')
  const [profile, setProfile] = useState<StudentProfile>(() => {
    return STUDENT_PERSONAS.find((p) => p.id === 'sophomore_cs')?.profile ?? STUDENT_PERSONAS[0].profile
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  // Select persona preset
  const handleSelectPersona = (personaId: string) => {
    setSelectedPersonaId(personaId)
    const persona = STUDENT_PERSONAS.find((p) => p.id === personaId)
    if (persona) {
      setProfile(JSON.parse(JSON.stringify(persona.profile)))
    }
  }

  // Toggle course in completed history
  const handleToggleCompleted = (courseCode: string) => {
    const existingIndex = profile.courseHistory.findIndex(
      (c) => c.courseCode.toUpperCase() === courseCode.toUpperCase()
    )
    let newHistory: StudentCourseRecord[] = []

    if (existingIndex >= 0) {
      newHistory = profile.courseHistory.filter((_, idx) => idx !== existingIndex)
    } else {
      const courseDef = UCI_CS_MATH_COURSES.find((c) => c.code.toUpperCase() === courseCode.toUpperCase())
      newHistory = [
        ...profile.courseHistory,
        {
          id: `manual-${Date.now()}-${courseCode}`,
          courseCode: courseCode,
          institution: 'UCI',
          term: 'Fall 2025',
          units: courseDef?.units ?? 4,
          grade: 'A',
          status: 'COMPLETED'
        }
      ]
    }

    const newUnits = newHistory.reduce((acc, c) => acc + c.units, 0)
    let newStanding = profile.classStanding
    if (newUnits >= 135) newStanding = 'Senior'
    else if (newUnits >= 90) newStanding = 'Junior'
    else if (newUnits >= 45) newStanding = 'Sophomore'
    else newStanding = 'Freshman'

    setProfile({
      ...profile,
      completedUnits: newUnits,
      classStanding: newStanding,
      courseHistory: newHistory
    })
  }

  // Reset profile
  const handleResetProfile = () => {
    handleSelectPersona('freshman')
  }

  // Export profile JSON
  const handleExportProfile = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `anttrail-profile-${profile.studentId || 'export'}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Compute eligibility for all courses
  const evaluatedCourses = useMemo(() => {
    return UCI_CS_MATH_COURSES.map((course) => {
      const res = evaluateCourseEligibility(course, profile, OFFICIAL_TRANSFER_EQUIVALENCIES)
      const isTaken = profile.courseHistory.some(
        (c) => c.courseCode.toUpperCase() === course.code.toUpperCase() && c.status === 'COMPLETED'
      )
      const takenRecord = profile.courseHistory.find(
        (c) => c.courseCode.toUpperCase() === course.code.toUpperCase()
      )
      return {
        ...res,
        isCompleted: isTaken,
        completedGrade: takenRecord?.grade
      }
    })
  }, [profile])

  // Filter courses
  const filteredCourses = useMemo(() => {
    return evaluatedCourses.filter((item) => {
      // Dept filter
      if (selectedDept !== 'ALL') {
        if (selectedDept === 'ICS' && item.course.department !== 'ICS' && item.course.department !== 'COMPSCI') {
          return false
        }
        if (selectedDept === 'MATH' && item.course.department !== 'MATH') {
          return false
        }
        if (selectedDept === 'STATS' && item.course.department !== 'STATS') {
          return false
        }
      }

      // Status filter
      if (statusFilter === 'ELIGIBLE' && !item.isEligible) {
        return false
      }
      if (statusFilter === 'TRANSFER' && item.status !== 'TRANSFER_EQUIVALENCY_USED') {
        return false
      }
      if (statusFilter === 'MISSING' && item.isEligible) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesCode = item.course.code.toLowerCase().includes(q)
        const matchesTitle = item.course.title.toLowerCase().includes(q)
        const matchesDesc = item.course.description.toLowerCase().includes(q)
        const matchesPrereq = item.course.prerequisiteText?.toLowerCase().includes(q)
        return matchesCode || matchesTitle || matchesDesc || matchesPrereq
      }

      return true
    })
  }, [evaluatedCourses, selectedDept, statusFilter, searchQuery])

  // Aggregate stats
  const eligibleCount = evaluatedCourses.filter((c) => c.isEligible).length
  const transferCount = evaluatedCourses.filter((c) => c.status === 'TRANSFER_EQUIVALENCY_USED').length
  const missingCount = evaluatedCourses.filter((c) => !c.isEligible).length

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar onReset={handleResetProfile} onExport={handleExportProfile} />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Hero banner */}
        <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-anteater-blue/20 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-anteater-gold/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-sky-300 ring-1 ring-blue-500/20">
              <Compass className="h-3.5 w-3.5" />
              <span>Phase 1 Prototype: Prerequisite Engine & Eligibility Auditor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              What courses can you actually take at <span className="text-anteater-gold">UC Irvine</span>?
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              AntTrail evaluates full Boolean prerequisite trees, minimum grade thresholds, and California
              Community College transfer articulations deterministically with zero server retention.
            </p>
          </div>
        </div>

        {/* Interactive Student Transcript & Persona Manager */}
        <StudentTranscriptManager
          profile={profile}
          onUpdateProfile={setProfile}
          selectedPersonaId={selectedPersonaId}
          onSelectPersona={handleSelectPersona}
        />

        {/* Filter and Search Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-anteater-gold" />
              <span>Course Catalog & Real-Time Eligibility</span>
            </h2>
            <span className="text-xs text-slate-400">
              Showing {filteredCourses.length} of {evaluatedCourses.length} courses
            </span>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDept={selectedDept}
            onDeptChange={setSelectedDept}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={evaluatedCourses.length}
            eligibleCount={eligibleCount}
            transferCount={transferCount}
            missingCount={missingCount}
          />
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center space-y-2">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-300">No matching courses found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or relaxing your status and department filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((item) => (
              <CourseCard
                key={item.course.id}
                result={item}
                isCompleted={item.isCompleted}
                completedGrade={item.completedGrade}
                onToggleCompleted={handleToggleCompleted}
              />
            ))}
          </div>
        )}

        {/* Architecture & Privacy Callout */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Deterministic Academic Engine Guarantees
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="font-semibold text-slate-200 block mb-1">No AI In Academic Rules</span>
              Eligibility, transfer articulations, and prerequisite checks are 100% deterministic code.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="font-semibold text-slate-200 block mb-1">Zero Server Retention</span>
              Student transcripts and course records are never sent to or stored on our servers.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="font-semibold text-slate-200 block mb-1">Full Boolean AST</span>
              Handles nested logic: <code className="text-sky-300">A AND (B OR C)</code>, minimum grades, and transfer credits.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-4 sm:px-6 text-center text-xs text-slate-500">
        <p>
          AntTrail • Built for UC Irvine Anteaters • Inspired by AntAlmanac & ZotCourse • Phase 1 Release
        </p>
      </footer>
    </div>
  )
}
export default App
