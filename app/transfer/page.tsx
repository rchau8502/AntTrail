'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Check,
  RotateCcw,
  Layers,
  ChevronRight,
  School,
  Building,
  Compass,
  ArrowUpRight,
  Copy
} from 'lucide-react'
import {
  auditCourseArticulation,
  calculateTransferableUnits,
  bridgeArticulatedToStudentProfile,
  CAMPUS_MAJOR_REQUIREMENTS,
  MajorPreparationAudit
} from '@/lib/articulation'
import { CCC_COLLEGES, CccCollege, CccPresetCourse } from '@/data/cccArticulations'
import { safeLocalStorageSet, setVaultItem } from '@/lib/storage/indexed-db'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface UserCourseEntry {
  id: string
  code: string
  title: string
  units: number
  grade: string
  term: string
  status: 'completed' | 'planned'
}

const DEFAULT_DEMO_COURSES: UserCourseEntry[] = [
  { id: '1', code: 'MATH 3A', title: 'Analytic Geometry and Calculus I', units: 5, grade: 'A', term: 'Fall 2024', status: 'completed' },
  { id: '2', code: 'MATH 3B', title: 'Analytic Geometry and Calculus II', units: 5, grade: 'A', term: 'Spring 2025', status: 'completed' },
  { id: '3', code: 'CS 36', title: 'C++ Programming', units: 3, grade: 'A', term: 'Fall 2024', status: 'completed' },
  { id: '4', code: 'CS 41', title: 'Python Programming', units: 3, grade: 'A', term: 'Spring 2025', status: 'completed' },
  { id: '5', code: 'MATH 26', title: 'Introduction to Linear Algebra', units: 4, grade: 'B', term: 'Fall 2025', status: 'completed' },
  { id: '6', code: 'CS 37', title: 'C++ Data Structures', units: 3, grade: 'IP', term: 'Spring 2026', status: 'planned' }
]

export default function TransferArticulationPage() {
  const { t } = useLanguage()
  const tr = t.transferHub

  // --- Selection State ---
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('ivc')
  const [selectedCampus, setSelectedCampus] = useState<string>('UC Irvine')
  const [selectedMajor, setSelectedMajor] = useState<string>('Computer Science')

  // --- Course Roster ---
  const [courses, setCourses] = useState<UserCourseEntry[]>(DEFAULT_DEMO_COURSES)

  // --- Custom Course Input Form ---
  const [customCode, setCustomCode] = useState('')
  const [customTitle, setCustomTitle] = useState('')
  const [customUnits, setCustomUnits] = useState('4')
  const [customGrade, setCustomGrade] = useState('A')
  const [customTerm, setCustomTerm] = useState('Spring 2026')
  const [customStatus, setCustomStatus] = useState<'completed' | 'planned'>('completed')

  // --- Modal & Bridge State ---
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false)
  const [bridgeSuccessBanner, setBridgeSuccessBanner] = useState<string | null>(null)
  const [copiedReport, setCopiedReport] = useState(false)

  // Selected College Object
  const currentCollege = useMemo(() => {
    return CCC_COLLEGES.find((c) => c.id === selectedCollegeId) || CCC_COLLEGES[0]
  }, [selectedCollegeId])

  // Available Majors for Selected Campus
  const availableMajors = useMemo(() => {
    const campusMatrix = CAMPUS_MAJOR_REQUIREMENTS[selectedCampus]
    if (campusMatrix) {
      return Object.keys(campusMatrix)
    }
    return ['Computer Science', 'Data Science', 'Software Engineering', 'Business Administration', 'Mechanical Engineering']
  }, [selectedCampus])

  // Keep major synchronized if selected campus changes
  useEffect(() => {
    if (!availableMajors.includes(selectedMajor)) {
      setSelectedMajor(availableMajors[0] || 'Computer Science')
    }
  }, [availableMajors, selectedMajor])

  // --- Live Audit Calculation ---
  const audit: MajorPreparationAudit = useMemo(() => {
    return auditCourseArticulation({
      targetCampus: selectedCampus,
      targetMajor: selectedMajor,
      courses: courses.map((c) => ({
        code: c.code,
        title: c.title,
        units: c.units,
        grade: c.status === 'planned' ? 'IP' : c.grade,
        term: c.term
      }))
    })
  }, [selectedCampus, selectedMajor, courses])

  // --- Transferable Units Summary ---
  const unitsSummary = useMemo(() => {
    return calculateTransferableUnits(courses, currentCollege.termSystem)
  }, [courses, currentCollege.termSystem])

  // --- Quick Add from CCC Catalog ---
  const handleQuickAdd = (preset: CccPresetCourse) => {
    const alreadyAdded = courses.some((c) => c.code.toUpperCase() === preset.code.toUpperCase())
    if (alreadyAdded) return

    const newCourse: UserCourseEntry = {
      id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: preset.code,
      title: preset.title,
      units: preset.units,
      grade: 'A',
      term: 'Completed',
      status: 'completed'
    }
    setCourses((prev) => [...prev, newCourse])
  }

  // --- Custom Course Submit ---
  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customCode.trim()) return

    const newCourse: UserCourseEntry = {
      id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: customCode.trim().toUpperCase(),
      title: customTitle.trim() || customCode.trim().toUpperCase(),
      units: parseFloat(customUnits) || 3,
      grade: customStatus === 'planned' ? 'IP' : customGrade,
      term: customTerm.trim() || 'Spring 2026',
      status: customStatus
    }

    setCourses((prev) => [...prev, newCourse])
    setCustomCode('')
    setCustomTitle('')
  }

  // --- Remove Course ---
  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  // --- Clear Roster ---
  const handleClearAll = () => {
    setCourses([])
  }

  // --- Copy Formatted Transfer Report ---
  const handleCopyReport = () => {
    if (courses.length === 0 || typeof navigator === 'undefined') return
    const lines = [
      `🎓 AntTrail CC Transfer Articulation Report`,
      `Origin: ${currentCollege.name} (${currentCollege.termSystem.toUpperCase()})`,
      `Target: ${selectedCampus} — ${selectedMajor}`,
      `-----------------------------------------`,
      `• Total Transferable Units: ${unitsSummary.totalOriginUnits} ${currentCollege.termSystem === 'semester' ? `Semester Units (approx. ${unitsSummary.totalQuarterUnits} Quarter Units)` : 'Quarter Units'}`,
      `• Major Prep Completion: ${audit.satisfiedCount} / ${audit.totalRequirements} (${audit.completionPercentage}%)`,
      `• Articulated Courses (${audit.articulatedCourses.length}):`,
      ...audit.articulatedCourses.map(
        (c) => `  - ${c.originCourseCode} ➔ ${c.targetCourseCode} (${c.originUnits} units)`
      ),
      `-----------------------------------------`,
      `Evaluated via AntTrail: https://anttrail.vercel.app/transfer`
    ]
    navigator.clipboard.writeText(lines.join('\n'))
    setCopiedReport(true)
    setTimeout(() => setCopiedReport(false), 2500)
  }

  // --- Reset to Demo ---
  const handleResetDemo = () => {
    setSelectedCollegeId('ivc')
    setSelectedCampus('UC Irvine')
    setSelectedMajor('Computer Science')
    setCourses(DEFAULT_DEMO_COURSES)
  }

  // --- Bridge Articulated Courses to Degree Planner ---
  const handleBridgeToDegreePlanner = () => {
    try {
      const STORAGE_KEY = 'anttrail_active_profile_v2'
      let existingProfile: any = null
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) existingProfile = JSON.parse(raw)
      }

      const { updatedProfile, bridgedCount } = bridgeArticulatedToStudentProfile({
        audit,
        originCollegeName: currentCollege.name,
        existingProfile
      })

      if (typeof window !== 'undefined') {
        safeLocalStorageSet(STORAGE_KEY, updatedProfile)
        setVaultItem(STORAGE_KEY, updatedProfile).catch(() => {})
        window.dispatchEvent(new Event('anttrail_profile_updated'))
      }

      setIsBridgeModalOpen(false)
      setBridgeSuccessBanner(
        `Successfully bridged ${bridgedCount} articulated course(s) into your AntTrail Degree Planner profile!`
      )

      setTimeout(() => {
        setBridgeSuccessBanner(null)
      }, 8000)
    } catch (err) {
      console.error('Failed to bridge profile:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Header & Hero */}
      <section className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-b from-sky-50/70 via-white to-slate-50/30 pt-10 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            {/* ScholarStack Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-[#0064a4] shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{tr.badge}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{tr.badgeAssist}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {tr.title} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0064a4] via-[#0c2340] to-[#0064a4] bg-clip-text text-transparent">
                {tr.titleHighlight}
              </span>
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {tr.subtitle}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleResetDemo}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span>{tr.sampleTransferBtn}</span>
              </button>
              <a
                href="https://assist.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <span>{tr.officialAssistBtn}</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Notification Banner */}
      {bridgeSuccessBanner && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 shadow-xs">
            <div className="flex items-center gap-3 text-sm font-semibold text-emerald-900">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>{bridgeSuccessBanner}</span>
            </div>
            <Link
              href="/degree-planning"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-emerald-800 transition-colors"
            >
              <span>{tr.openInPlanner}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
        {/* 2. Campus & Major Selectors Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Origin CCC Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <School className="h-4 w-4 text-[#0064a4]" />
                <span>{tr.originCollegeLabel}</span>
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
              >
                {CCC_COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.termSystem})
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500">
                District: {currentCollege.district} • System: {currentCollege.termSystem.toUpperCase()}
              </p>
            </div>

            {/* Target Destination Campus Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <Building className="h-4 w-4 text-[#0064a4]" />
                <span>{tr.targetCampusLabel}</span>
              </label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
              >
                {Object.keys(CAMPUS_MAJOR_REQUIREMENTS).map((campus) => (
                  <option key={campus} value={campus}>
                    {campus} {campus === 'UC Irvine' ? '★ (Home)' : ''}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Destination prerequisite articulation matrix
              </p>
            </div>

            {/* Target Major Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <Compass className="h-4 w-4 text-[#0064a4]" />
                <span>{tr.targetMajorLabel}</span>
              </label>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
              >
                {availableMajors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Auditing lower-division major preparation
              </p>
            </div>
          </div>
        </div>

        {/* 3. KPI Metrics & Unit Progress Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {/* Major Prep Completion Radial/Metric */}
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {tr.prepCompleteTitle}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-[#0064a4]">
                <GraduationCap className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {audit.completionPercentage}%
              </span>
              <span className="text-xs font-medium text-slate-500">
                ({audit.satisfiedCount} of {audit.totalRequirements} reqs)
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-gradient-to-r from-[#0064a4] to-sky-500 transition-all duration-500"
                style={{ width: `${audit.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Transferable Units Progress */}
          <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/40 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {tr.transferUnitsTitle}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {unitsSummary.completedOriginUnits}
              </span>
              <span className="text-xs font-medium text-slate-500">
                / {unitsSummary.targetThresholdSemesterUnits} {unitsSummary.originTermSystem} units
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                style={{ width: `${unitsSummary.progressPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] font-semibold text-slate-500">
              ≈ {unitsSummary.completedQuarterUnits} quarter units completed
            </p>
          </div>

          {/* Planned & In-Progress */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/40 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {tr.plannedInProgressTitle}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {audit.plannedCount}
              </span>
              <span className="text-xs font-medium text-slate-500">
                requirements (+{unitsSummary.plannedOriginUnits} units)
              </span>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Courses marked with grade "IP" or status "Planned"
            </p>
          </div>

          {/* Missing Critical Requirements */}
          <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/40 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {tr.missingReqsTitle}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                <AlertCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600">
                {audit.missingCount}
              </span>
              <span className="text-xs font-medium text-slate-500">
                remaining for {selectedCampus}
              </span>
            </div>
            <p className="mt-4 text-[11px] font-semibold text-rose-700">
              {audit.missingCount === 0 ? tr.allSatisfiedMsg : tr.planUpcomingMsg}
            </p>
          </div>
        </div>

        {/* 4. Course Entry Section & Quick Add Catalog */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Quick Catalog & Custom Input Form (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Quick-Add Catalog for Selected College */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {tr.quickAddTitle.replace('{college}', currentCollege.name.split('(')[0].trim())}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {tr.quickAddSubtitle}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {currentCollege.popularCourses.length} {tr.preloadedBadge}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                {currentCollege.popularCourses.map((preset) => {
                  const isAdded = courses.some(
                    (c) => c.code.toUpperCase() === preset.code.toUpperCase()
                  )
                  return (
                    <button
                      key={preset.code}
                      onClick={() => handleQuickAdd(preset)}
                      disabled={isAdded}
                      className={`group flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        isAdded
                          ? 'border-emerald-200 bg-emerald-50/80 text-emerald-800 opacity-60 cursor-default'
                          : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-[#0064a4] hover:bg-sky-50/50 hover:text-[#0064a4]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Plus className="h-3 w-3 text-slate-400 group-hover:text-[#0064a4]" />
                      )}
                      <span>{preset.code}</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-[#0064a4]/70">
                        ({preset.units}u)
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom Course Entry Form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                {tr.addCustomTitle}
              </h3>
              <p className="text-[11px] text-slate-500 mb-4">
                {tr.addCustomSubtitle}
              </p>

              <form onSubmit={handleAddCustomCourse} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tr.courseCodeLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CS 36, MATH 3A"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tr.unitsLabel}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="10"
                      value={customUnits}
                      onChange={(e) => setCustomUnits(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {tr.courseTitleLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C++ Programming, Linear Algebra"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tr.statusLabel}
                    </label>
                    <select
                      value={customStatus}
                      onChange={(e) => setCustomStatus(e.target.value as 'completed' | 'planned')}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-2 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                    >
                      <option value="completed">{tr.completedStatus}</option>
                      <option value="planned">{tr.plannedStatus}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tr.gradeLabel}
                    </label>
                    <select
                      value={customGrade}
                      disabled={customStatus === 'planned'}
                      onChange={(e) => setCustomGrade(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-2 text-xs font-semibold text-slate-900 disabled:opacity-50 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="P">P (Pass)</option>
                      <option value="IP">IP (In Prog)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tr.termLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="Fall 2024"
                      value={customTerm}
                      onChange={(e) => setCustomTerm(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#0064a4] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0c2340] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>{tr.addToTrayBtn}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Active Course Tray & Articulation Mapping (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Active Tray Table */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {tr.activeTrayTitle} ({courses.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {tr.activeTraySubtitle}
                  </p>
                </div>
                {courses.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReport}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-bold text-[#0064a4] hover:bg-sky-100 transition-colors shadow-2xs"
                      title="Copy formatted transfer evaluation summary"
                    >
                      {copiedReport ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{tr.reportCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{tr.copyReportBtn}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 px-1.5 py-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{tr.clearTrayBtn}</span>
                    </button>
                  </div>
                )}
              </div>

              {courses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                  <BookOpen className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-600">{tr.emptyTrayTitle}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {tr.emptyTraySubtitle}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
                  {courses.map((course) => {
                    const match = audit.articulatedCourses.find(
                      (c) => c.originCourseCode === course.code
                    )
                    const isFulfilling = !!match && !match.targetCourseCode.includes('Elective')

                    return (
                      <div key={course.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">
                                {course.code}
                              </span>
                              <span className="rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">
                                {course.units} units
                              </span>
                              <span
                                className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                                  course.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                    : 'bg-sky-50 text-sky-700 border border-sky-200/60'
                                }`}
                              >
                                {course.status === 'completed' ? `Grade: ${course.grade}` : tr.plannedStatus}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {course.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {isFulfilling ? (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200/80 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              <span>{tr.articulatesTo} {match.targetCourseCode}</span>
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              {tr.transferElective}
                            </span>
                          )}
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Bridge Callout Action Card */}
            <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/90 to-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0064a4]">
                  <Layers className="h-4 w-4" />
                  <span>{tr.bridgeCardBadge}</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">
                  {tr.bridgeCardTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-md">
                  {tr.bridgeCardSubtitle}
                </p>
              </div>

              <button
                onClick={() => setIsBridgeModalOpen(true)}
                disabled={courses.length === 0}
                className="w-full sm:w-auto shrink-0 rounded-2xl bg-[#0064a4] px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#0c2340] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <span>{tr.bridgeBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Detailed Audit Breakdown & Requirements Grid */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sky-100 text-[#0064a4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {tr.officialMatrixBadge}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedCampus} • {selectedMajor}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {tr.auditChecklistTitle}
              </h2>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {tr.legendSatisfied}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> {tr.legendPlanned}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> {tr.legendMissing}
              </span>
            </div>
          </div>

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {audit.requirements.map((item) => {
              const req = item.requirement
              const isSatisfied = item.status === 'satisfied'
              const isPlanned = item.status === 'planned'
              const isMissing = item.status === 'missing'

              return (
                <div
                  key={req.id}
                  className={`rounded-2xl border p-4.5 transition-all ${
                    isSatisfied
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : isPlanned
                      ? 'border-sky-200 bg-sky-50/30'
                      : req.isCritical
                      ? 'border-rose-200 bg-rose-50/20'
                      : 'border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          {req.targetCourseCode}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-700">
                          {req.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {req.description}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <div className="shrink-0">
                      {isSatisfied && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>{tr.legendSatisfied}</span>
                        </span>
                      )}
                      {isPlanned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800">
                          <Clock className="h-3 w-3 text-sky-600" />
                          <span>{tr.legendPlanned}</span>
                        </span>
                      )}
                      {isMissing && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            req.isCritical
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <AlertCircle className="h-3 w-3 text-rose-600" />
                          <span>{req.isCritical ? tr.legendMissing : tr.missingElective}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Matched Details or C-ID Reference */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    {item.matchedCourse ? (
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span>
                          {tr.articulatesTo} <strong className="font-extrabold">{item.matchedCourse.code}</strong> ({item.matchedCourse.title})
                        </span>
                      </div>
                    ) : (
                      <div className="text-slate-500 flex items-center gap-1">
                        <span>{tr.cIdDescriptor}</span>
                        <strong className="text-slate-700 font-semibold">{req.cIdEquivalent || tr.directArticulationReq}</strong>
                      </div>
                    )}
                    <span className="text-slate-400 font-medium">{req.units} units</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actionable Admissions Guidance */}
          <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-5 mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0064a4] flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>{tr.guidanceTitle}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {audit.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#0064a4] font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Degree Planner Bridge Confirmation Modal */}
      {isBridgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0064a4] text-white">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {tr.modalTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {tr.modalSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBridgeModalOpen(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs leading-relaxed text-slate-600">
              {tr.modalDesc.replace('{major}', selectedMajor).replace('{campus}', selectedCampus)}
            </p>

            {/* List of Courses to Bridge */}
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-slate-50/50 p-3">
              {audit.articulatedCourses
                .filter((c) => !c.targetCourseCode.includes('Elective'))
                .map((course, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <strong className="font-extrabold text-slate-900">
                        {course.targetCourseCode}
                      </strong>
                      <span className="text-slate-500 ml-2">({course.targetCourseTitle})</span>
                    </div>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      via {course.originCourseCode}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsBridgeModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {tr.cancelBtn}
              </button>
              <button
                onClick={handleBridgeToDegreePlanner}
                className="rounded-xl bg-[#0064a4] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0c2340] transition-colors flex items-center gap-1.5"
              >
                <span>{tr.confirmBridgeBtn}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
