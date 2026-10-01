import React, { useState, useMemo, useEffect } from 'react'
import { Navbar, NavigationTab } from './components/Navbar'
import { PersonaSelector } from './components/PersonaSelector'
import { CourseFilters, FilterStatus } from './components/CourseFilters'
import { CourseCard } from './components/CourseCard'
import { StudentCourseDrawer } from './components/StudentCourseDrawer'
import { QuarterPlannerView } from './components/planner/QuarterPlannerView'
import { AutoPlanModal } from './components/planner/AutoPlanModal'
import { ImportTranscriptModal } from './components/parser/ImportTranscriptModal'
import { CloudSyncModal } from './components/auth/CloudSyncModal'
import { DegreeAuditView } from './components/degree/DegreeAuditView'
import { GpaCalculatorView } from './components/gpa/GpaCalculatorView'
import { ExportPlanModal } from './components/export/ExportPlanModal'
import { calculateUciGpaReport } from './academic-engine/gpa'
import { GoogleUser, SyncStatus } from './services/drive/types'
import {
  createSyncPayload,
  pushToGoogleDrive,
  pullFromGoogleDrive
} from './services/drive/syncManager'
import {
  fetchGoogleUserInfo,
  loadGisScript,
  getEffectiveGoogleClientId,
  DRIVE_APPDATA_SCOPE
} from './services/drive/googleAuth'
import { UCI_CS_MATH_COURSES } from './data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from './data/uci/equivalencies'
import { STUDENT_PERSONAS, StudentPersona } from './data/mock/mockStudentData'
import { UCI_DEGREE_PROGRAMS, getDegreeProgramByName } from './data/uci/programs'
import { evaluateCatalogEligibility } from './academic-engine/eligibility'
import { evaluateDegreeAudit } from './academic-engine/degree'
import { validateQuarterPlan } from './academic-engine/planner'
import {
  StudentProfile,
  StudentCourseRecord,
  GradeLetter,
  EligibilityResult,
  TermOffering,
  PlannedQuarter,
  OfferingTerm
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

const PROFILE_STORAGE_KEY = 'anttrail_active_profile_v2'
const QUARTERS_STORAGE_KEY = 'anttrail_planned_quarters_v2'

const DEFAULT_INITIAL_QUARTERS: PlannedQuarter[] = [
  {
    id: 'q-fall-2026',
    term: 'Fall',
    year: 2026,
    courses: []
  },
  {
    id: 'q-winter-2027',
    term: 'Winter',
    year: 2027,
    courses: []
  },
  {
    id: 'q-spring-2027',
    term: 'Spring',
    year: 2027,
    courses: []
  },
  {
    id: 'q-fall-2027',
    term: 'Fall',
    year: 2027,
    courses: []
  },
  {
    id: 'q-winter-2028',
    term: 'Winter',
    year: 2028,
    courses: []
  },
  {
    id: 'q-spring-2028',
    term: 'Spring',
    year: 2028,
    courses: []
  }
]

export const App: React.FC = () => {
  // --- Navigation & View Tab ---
  const [activeTab, setActiveTab] = useState<NavigationTab>('ELIGIBILITY')

  // --- Persona & Profile State ---
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('freshman')
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback
    }
    return STUDENT_PERSONAS[0].profile
  })

  // --- Planned Quarters State ---
  const [plannedQuarters, setPlannedQuarters] = useState<PlannedQuarter[]>(() => {
    try {
      const saved = localStorage.getItem(QUARTERS_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback
    }
    return DEFAULT_INITIAL_QUARTERS
  })

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // Ignore
    }
  }, [profile])

  useEffect(() => {
    try {
      localStorage.setItem(QUARTERS_STORAGE_KEY, JSON.stringify(plannedQuarters))
    } catch {
      // Ignore
    }
  }, [plannedQuarters])

  // --- Filter & Drawer State ---
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isAutoPlanOpen, setIsAutoPlanOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = sessionStorage.getItem('anttrail_google_user')
      if (saved) return JSON.parse(saved)
    } catch {}
    return null
  })
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('anttrail_google_token') || null
    } catch {}
    return null
  })
  const [cachedDriveFileId, setCachedDriveFileId] = useState<string | undefined>(undefined)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => (accessToken ? 'SYNCED' : 'DISCONNECTED'))
  const [lastSyncedTime, setLastSyncedTime] = useState<number | null>(null)
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  // --- Deterministic Rules Engine Evaluation ---
  const evaluationResults = useMemo(() => {
    return evaluateCatalogEligibility(UCI_CS_MATH_COURSES, profile, OFFICIAL_TRANSFER_EQUIVALENCIES)
  }, [profile])

  const eligibleCourseCodes = useMemo(() => {
    return evaluationResults.filter((r) => r.isEligible).map((r) => r.course.code)
  }, [evaluationResults])

  // Prerequisite sequence validation
  const validationReport = useMemo(() => {
    return validateQuarterPlan(
      plannedQuarters,
      profile,
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )
  }, [plannedQuarters, profile])

  // Degree program resolution & degree audit
  const activeProgram = useMemo(() => {
    return getDegreeProgramByName(profile.major) ?? UCI_DEGREE_PROGRAMS[0]
  }, [profile.major])

  const degreeAudit = useMemo(() => {
    return evaluateDegreeAudit(
      activeProgram,
      profile,
      plannedQuarters,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )
  }, [activeProgram, profile, plannedQuarters])

  const gpaReport = useMemo(() => {
    return calculateUciGpaReport(profile)
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

  // --- Handlers: Persona & Profile ---
  const handleSelectPersona = (persona: StudentPersona) => {
    setSelectedPersonaId(persona.id)
    setProfile(persona.profile)
  }

  const handleResetProfile = () => {
    const fresh = STUDENT_PERSONAS[0].profile
    setSelectedPersonaId('freshman')
    setProfile(fresh)
    setPlannedQuarters(DEFAULT_INITIAL_QUARTERS)
  }

  // Fast toggle completed status directly on CourseCard
  const handleToggleCourseCompleted = (courseCode: string) => {
    const normalized = courseCode.trim().toUpperCase()
    const existing = completedMap.get(normalized)

    if (existing) {
      handleRemoveCourse(existing.id)
    } else {
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

  const handleImportCourses = (
    importedCourses: Array<{
      courseCode: string
      units: number
      grade: GradeLetter
      term: string
      institution: string
      status: 'COMPLETED' | 'IN_PROGRESS' | 'TRANSFER'
    }>,
    replaceExisting: boolean
  ) => {
    const baseHistory = replaceExisting ? [] : [...profile.courseHistory]
    const existingSet = new Set(baseHistory.map((c) => c.courseCode.toUpperCase()))

    const newRecords: StudentCourseRecord[] = []
    for (const item of importedCourses) {
      const norm = item.courseCode.trim().toUpperCase()
      if (replaceExisting || !existingSet.has(norm)) {
        newRecords.push({
          id: 'rec_imp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          courseCode: norm,
          institution: item.institution,
          term: item.term,
          units: item.units,
          grade: item.grade,
          status: item.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'COMPLETED'
        })
        existingSet.add(norm)
      }
    }

    const updatedHistory = [...baseHistory, ...newRecords]
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

  // --- Google Drive Sync Handlers ---
  const handleConnectLive = async () => {
    try {
      await loadGisScript()
      const effectiveClientId = getEffectiveGoogleClientId()
      if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: effectiveClientId,
          scope: DRIVE_APPDATA_SCOPE,
          callback: async (resp) => {
            if (resp.access_token) {
              setAccessToken(resp.access_token)
              sessionStorage.setItem('anttrail_google_token', resp.access_token)
              try {
                const info = await fetchGoogleUserInfo(resp.access_token)
                setGoogleUser(info)
                sessionStorage.setItem('anttrail_google_user', JSON.stringify(info))
              } catch {
                const fallbackUser: GoogleUser = {
                  id: 'google_user',
                  name: 'Peter Anteater',
                  email: 'peter@uci.edu'
                }
                setGoogleUser(fallbackUser)
                sessionStorage.setItem('anttrail_google_user', JSON.stringify(fallbackUser))
              }
              setSyncStatus('SYNCED')
              setLastSyncedTime(Date.now())
            }
          }
        })
        client.requestAccessToken()
      } else {
        handleConnectDemo()
      }
    } catch {
      handleConnectDemo()
    }
  }

  const handleConnectDemo = () => {
    const demoUser: GoogleUser = {
      id: 'anteater_demo_user',
      name: 'Peter Anteater (UCI)',
      email: 'anteater@uci.edu'
    }
    setAccessToken('demo_drive_token')
    setGoogleUser(demoUser)
    setSyncStatus('SYNCED')
    setLastSyncedTime(Date.now())
    sessionStorage.setItem('anttrail_google_token', 'demo_drive_token')
    sessionStorage.setItem('anttrail_google_user', JSON.stringify(demoUser))
  }

  const handleConnectGoogle = () => {
    setIsSyncModalOpen(true)
  }

  const handleDisconnectGoogle = () => {
    setAccessToken(null)
    setGoogleUser(null)
    setCachedDriveFileId(undefined)
    setSyncStatus('DISCONNECTED')
    setLastSyncedTime(null)
    sessionStorage.removeItem('anttrail_google_token')
    sessionStorage.removeItem('anttrail_google_user')
  }

  const handleBackupNow = async () => {
    if (!accessToken) return
    setIsSyncing(true)
    setSyncStatus('SYNCING')
    try {
      const payload = createSyncPayload(profile, plannedQuarters)
      if (accessToken !== 'demo_drive_token') {
        const res = await pushToGoogleDrive(accessToken, payload, cachedDriveFileId)
        setCachedDriveFileId(res.fileId)
      } else {
        sessionStorage.setItem('anttrail_demo_drive_backup', JSON.stringify(payload))
      }
      setLastSyncedTime(Date.now())
      setSyncStatus('SYNCED')
    } catch {
      setSyncStatus('ERROR')
    } finally {
      setIsSyncing(false)
    }
  }

  const handleRestoreFromDrive = async () => {
    if (!accessToken) return
    setIsSyncing(true)
    setSyncStatus('SYNCING')
    try {
      if (accessToken !== 'demo_drive_token') {
        const result = await pullFromGoogleDrive(accessToken, cachedDriveFileId)
        if (result && result.payload) {
          setProfile(result.payload.profile)
          setPlannedQuarters(result.payload.plannedQuarters)
          setCachedDriveFileId(result.fileId)
          setLastSyncedTime(result.payload.lastModified)
        }
      } else {
        const raw = sessionStorage.getItem('anttrail_demo_drive_backup')
        if (raw) {
          const payload = JSON.parse(raw)
          setProfile(payload.profile)
          setPlannedQuarters(payload.plannedQuarters)
          setLastSyncedTime(payload.lastModified)
        }
      }
      setSyncStatus('SYNCED')
    } catch {
      setSyncStatus('ERROR')
    } finally {
      setIsSyncing(false)
    }
  }

  // Debounced auto-save to Google Drive when authenticated and state changes
  useEffect(() => {
    if (!accessToken) return
    const timer = setTimeout(async () => {
      try {
        setSyncStatus('SYNCING')
        const payload = createSyncPayload(profile, plannedQuarters)
        if (accessToken !== 'demo_drive_token') {
          const res = await pushToGoogleDrive(accessToken, payload, cachedDriveFileId)
          setCachedDriveFileId(res.fileId)
        } else {
          sessionStorage.setItem('anttrail_demo_drive_backup', JSON.stringify(payload))
        }
        setLastSyncedTime(Date.now())
        setSyncStatus('SYNCED')
      } catch {
        setSyncStatus('ERROR')
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [profile, plannedQuarters, accessToken, cachedDriveFileId])

  // --- Handlers: Quarter Planner ---
  const handleAddCourseToQuarter = (
    quarterId: string,
    courseCode: string,
    units: number = 4,
    title?: string
  ) => {
    setPlannedQuarters((prev) =>
      prev.map((q) => {
        if (q.id !== quarterId) return q
        if (q.courses.some((c) => c.courseCode.toUpperCase() === courseCode.toUpperCase())) return q
        return {
          ...q,
          courses: [...q.courses, { courseCode: courseCode.toUpperCase(), units, customTitle: title }]
        }
      })
    )
  }

  const handleRemoveCourseFromQuarter = (quarterId: string, courseCode: string) => {
    setPlannedQuarters((prev) =>
      prev.map((q) => {
        if (q.id !== quarterId) return q
        return {
          ...q,
          courses: q.courses.filter((c) => c.courseCode.toUpperCase() !== courseCode.toUpperCase())
        }
      })
    )
  }

  const handleAddNextQuarter = () => {
    const lastQ = plannedQuarters[plannedQuarters.length - 1]
    let nextTerm: OfferingTerm = 'Fall'
    let nextYear = 2026

    if (lastQ) {
      if (lastQ.term === 'Fall') {
        nextTerm = 'Winter'
        nextYear = lastQ.year + 1
      } else if (lastQ.term === 'Winter') {
        nextTerm = 'Spring'
        nextYear = lastQ.year
      } else if (lastQ.term === 'Spring') {
        nextTerm = 'Fall'
        nextYear = lastQ.year
      } else {
        nextTerm = 'Fall'
        nextYear = lastQ.year
      }
    }

    const newQ: PlannedQuarter = {
      id: `q-${nextTerm.toLowerCase()}-${nextYear}-${Date.now().toString(36)}`,
      term: nextTerm,
      year: nextYear,
      courses: []
    }

    setPlannedQuarters([...plannedQuarters, newQ])
  }

  const handleRemoveQuarter = (quarterId: string) => {
    if (plannedQuarters.length <= 1) return
    setPlannedQuarters(plannedQuarters.filter((q) => q.id !== quarterId))
  }

  const handleClearSchedule = () => {
    setPlannedQuarters((prev) => prev.map((q) => ({ ...q, courses: [] })))
  }

  const handleResetSampleRoadmap = () => {
    // Populate sample valid roadmap
    if (profile.major.includes('Computer Science')) {
      setPlannedQuarters([
        {
          id: 'q-fall-2026',
          term: 'Fall',
          year: 2026,
          courses: [
            { courseCode: 'ICS 31', units: 4, customTitle: 'Intro to Programming I' },
            { courseCode: 'MATH 2A', units: 4, customTitle: 'Calculus I' },
            { courseCode: 'WRITING 39A', units: 4, customTitle: 'Academic Writing' },
            { courseCode: 'GE CAT III', units: 4, customTitle: 'Social Science' }
          ]
        },
        {
          id: 'q-winter-2027',
          term: 'Winter',
          year: 2027,
          courses: [
            { courseCode: 'ICS 32', units: 4, customTitle: 'Programming with Software Libraries' },
            { courseCode: 'MATH 2B', units: 4, customTitle: 'Calculus II' },
            { courseCode: 'GE CAT IV', units: 4, customTitle: 'Arts & Humanities' }
          ]
        },
        {
          id: 'q-spring-2027',
          term: 'Spring',
          year: 2027,
          courses: [
            { courseCode: 'ICS 33', units: 4, customTitle: 'Intermediate Programming' },
            { courseCode: 'STATS 67', units: 4, customTitle: 'Stats for Computer Science' },
            { courseCode: 'MATH 3A', units: 4, customTitle: 'Linear Algebra' }
          ]
        },
        {
          id: 'q-fall-2027',
          term: 'Fall',
          year: 2027,
          courses: [
            { courseCode: 'ICS 45C', units: 4, customTitle: 'Programming in C/C++' },
            { courseCode: 'MATH 2D', units: 4, customTitle: 'Multivariable Calculus' }
          ]
        },
        {
          id: 'q-winter-2028',
          term: 'Winter',
          year: 2028,
          courses: [
            { courseCode: 'ICS 46', units: 4, customTitle: 'Data Structure Implementation' }
          ]
        },
        {
          id: 'q-spring-2028',
          term: 'Spring',
          year: 2028,
          courses: [
            { courseCode: 'CS 161', units: 4, customTitle: 'Design and Analysis of Algorithms' }
          ]
        }
      ])
    } else {
      // Mathematics sample roadmap
      setPlannedQuarters([
        {
          id: 'q-fall-2026',
          term: 'Fall',
          year: 2026,
          courses: [
            { courseCode: 'MATH 2A', units: 4, customTitle: 'Calculus I' },
            { courseCode: 'ICS 31', units: 4, customTitle: 'Intro to Programming' }
          ]
        },
        {
          id: 'q-winter-2027',
          term: 'Winter',
          year: 2027,
          courses: [
            { courseCode: 'MATH 2B', units: 4, customTitle: 'Calculus II' }
          ]
        },
        {
          id: 'q-spring-2027',
          term: 'Spring',
          year: 2027,
          courses: [
            { courseCode: 'MATH 2D', units: 4, customTitle: 'Multivariable Calculus' },
            { courseCode: 'MATH 3A', units: 4, customTitle: 'Linear Algebra' }
          ]
        },
        {
          id: 'q-fall-2027',
          term: 'Fall',
          year: 2027,
          courses: [
            { courseCode: 'MATH 13', units: 4, customTitle: 'Intro to Abstract Math' }
          ]
        },
        {
          id: 'q-winter-2028',
          term: 'Winter',
          year: 2028,
          courses: [
            { courseCode: 'MATH 140A', units: 4, customTitle: 'Elementary Analysis I' }
          ]
        }
      ])
    }
  }

  const handlePlanCourseFromDegree = (courseCode: string) => {
    // Find first quarter with room (< 4 courses)
    const targetQ = plannedQuarters.find((q) => q.courses.length < 4) ?? plannedQuarters[0]
    if (targetQ) {
      handleAddCourseToQuarter(targetQ.id, courseCode, 4)
      setActiveTab('PLANNER')
    }
  }

  // --- Filtering Logic for Eligibility Tab ---
  const filteredResults = useMemo(() => {
    return evaluationResults.filter((result: EligibilityResult) => {
      const { course, isEligible, status } = result

      if (selectedDepartment !== 'ALL' && course.department !== selectedDepartment) {
        return false
      }

      if (filterStatus === 'ELIGIBLE_ONLY' && !isEligible) return false
      if (filterStatus === 'MISSING_ONLY' && isEligible) return false
      if (filterStatus === 'TRANSFER_ONLY' && status !== 'TRANSFER_EQUIVALENCY_USED') return false

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

  const eligibleCount = evaluationResults.filter((r: EligibilityResult) => r.isEligible).length
  const missingCount = evaluationResults.filter((r: EligibilityResult) => !r.isEligible).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onReset={handleResetProfile}
        onExport={() => setIsExportModalOpen(true)}
        onOpenManualEntry={() => setIsDrawerOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        googleUser={googleUser}
        syncStatus={syncStatus}
        onConnectGoogle={handleConnectGoogle}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
        {/* Persona Selector (Global across tabs) */}
        <PersonaSelector
          selectedPersonaId={selectedPersonaId}
          onSelectPersona={handleSelectPersona}
          activeProfile={profile}
        />

        {/* ============================================================== */}
        {/* TAB 1: COURSE ELIGIBILITY                                       */}
        {/* ============================================================== */}
        {activeTab === 'ELIGIBILITY' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hero Banner */}
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
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: QUARTER PLANNER                                          */}
        {/* ============================================================== */}
        {activeTab === 'PLANNER' && (
          <QuarterPlannerView
            quarters={plannedQuarters}
            errors={validationReport.errors}
            onAddCourse={handleAddCourseToQuarter}
            onRemoveCourse={handleRemoveCourseFromQuarter}
            onAddQuarter={handleAddNextQuarter}
            onRemoveQuarter={handleRemoveQuarter}
            onResetRoadmap={handleResetSampleRoadmap}
            onClearSchedule={handleClearSchedule}
            onOpenAutoPlan={() => setIsAutoPlanOpen(true)}
            eligibleCourses={eligibleCourseCodes}
            catalogCourses={UCI_CS_MATH_COURSES}
          />
        )}

        {/* ============================================================== */}
        {/* TAB 3: DEGREE AUDIT                                             */}
        {/* ============================================================== */}
        {activeTab === 'DEGREE' && (
          <DegreeAuditView
            audit={degreeAudit}
            onPlanCourse={handlePlanCourseFromDegree}
            onSelectProgram={(programName) =>
              setProfile((prev) => ({
                ...prev,
                major: programName
              }))
            }
            availablePrograms={UCI_DEGREE_PROGRAMS}
          />
        )}

        {/* ============================================================== */}
        {/* TAB 4: GPA CALCULATOR                                           */}
        {/* ============================================================== */}
        {activeTab === 'GPA' && (
          <GpaCalculatorView
            profile={profile}
            plannedQuarters={plannedQuarters}
          />
        )}
      </main>

      {/* Student Course History Drawer */}
      <StudentCourseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        profile={profile}
        onAddCourse={handleAddCourse}
        onRemoveCourse={handleRemoveCourse}
        onOpenImportTranscript={() => setIsImportModalOpen(true)}
      />

      {/* Automated Degree Plan Modal */}
      <AutoPlanModal
        isOpen={isAutoPlanOpen}
        onClose={() => setIsAutoPlanOpen(false)}
        onApplyPlan={(newQuarters) => setPlannedQuarters(newQuarters)}
        program={activeProgram}
        profile={profile}
        catalogCourses={UCI_CS_MATH_COURSES}
        transferEquivalencies={OFFICIAL_TRANSFER_EQUIVALENCIES}
      />

      {/* Transcript / DegreeWorks Import Modal */}
      <ImportTranscriptModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportCourses={handleImportCourses}
        catalogCourses={UCI_CS_MATH_COURSES}
        transferEquivalencies={OFFICIAL_TRANSFER_EQUIVALENCIES}
      />

      {/* Google Drive Cloud Sync Modal */}
      <CloudSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        user={googleUser}
        syncStatus={syncStatus}
        lastSyncedTime={lastSyncedTime}
        onBackupNow={handleBackupNow}
        onRestoreFromDrive={handleRestoreFromDrive}
        onDisconnect={handleDisconnectGoogle}
        onConnectLive={handleConnectLive}
        onConnectDemo={handleConnectDemo}
        isSyncing={isSyncing}
      />

      {/* Academic Roadmap Export & Share Modal */}
      <ExportPlanModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        profile={profile}
        plannedQuarters={plannedQuarters}
        programName={activeProgram.name}
        overallProgress={degreeAudit.overallProgressPercent}
        plannedProgress={degreeAudit.plannedProgressPercent}
        gpaReport={gpaReport}
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
