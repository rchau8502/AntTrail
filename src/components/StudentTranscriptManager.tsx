import React, { useState } from 'react'
import { StudentProfile, StudentCourseRecord, GradeLetter } from '../academic-engine/types'
import { STUDENT_PERSONAS } from '../data/mock/mockStudentData'
import { UCI_CS_MATH_COURSES } from '../data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../data/uci/equivalencies'
import { UCI_DEGREE_PROGRAMS } from '../data/uci/programs'
import {
  User,
  Plus,
  Trash2,
  FileText
} from 'lucide-react'

interface StudentTranscriptManagerProps {
  profile: StudentProfile
  onUpdateProfile: (updated: StudentProfile) => void
  selectedPersonaId: string
  onSelectPersona: (personaId: string) => void
  onOpenImportModal?: () => void
}

export const StudentTranscriptManager: React.FC<StudentTranscriptManagerProps> = ({
  profile,
  onUpdateProfile,
  selectedPersonaId,
  onSelectPersona,
  onOpenImportModal
}) => {
  const [showAddTransferModal, setShowAddTransferModal] = useState(false)
  const [selectedTransferEqId, setSelectedTransferEqId] = useState(
    OFFICIAL_TRANSFER_EQUIVALENCIES[0]?.id || ''
  )
  const [transferGrade, setTransferGrade] = useState<GradeLetter>('A')

  // Quick toggle course
  const handleToggleCourse = (code: string) => {
    const existingIndex = profile.courseHistory.findIndex((c) => c.courseCode === code)
    let newHistory: StudentCourseRecord[] = []

    if (existingIndex >= 0) {
      newHistory = profile.courseHistory.filter((_, idx) => idx !== existingIndex)
    } else {
      const courseDef = UCI_CS_MATH_COURSES.find((c) => c.code === code)
      newHistory = [
        ...profile.courseHistory,
        {
          id: `manual-${Date.now()}-${code}`,
          courseCode: code,
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

    onUpdateProfile({
      ...profile,
      completedUnits: newUnits,
      classStanding: newStanding,
      courseHistory: newHistory
    })
  }

  // Remove a course record
  const handleRemoveRecord = (id: string) => {
    const newHistory = profile.courseHistory.filter((c) => c.id !== id)
    const newUnits = newHistory.reduce((acc, c) => acc + c.units, 0)
    let newStanding = profile.classStanding
    if (newUnits >= 135) newStanding = 'Senior'
    else if (newUnits >= 90) newStanding = 'Junior'
    else if (newUnits >= 45) newStanding = 'Sophomore'
    else newStanding = 'Freshman'

    onUpdateProfile({
      ...profile,
      completedUnits: newUnits,
      classStanding: newStanding,
      courseHistory: newHistory
    })
  }

  // Add transfer course from catalog
  const handleAddTransferCourse = () => {
    const eq = OFFICIAL_TRANSFER_EQUIVALENCIES.find((e) => e.id === selectedTransferEqId)
    if (!eq) return

    const newRecord: StudentCourseRecord = {
      id: `transfer-${Date.now()}`,
      courseCode: eq.sourceCourseCode,
      institution: eq.sourceInstitution,
      term: 'Completed',
      units: eq.units,
      grade: transferGrade,
      status: 'COMPLETED'
    }

    const newHistory = [...profile.courseHistory, newRecord]
    const newUnits = newHistory.reduce((acc, c) => acc + c.units, 0)
    let newStanding = profile.classStanding
    if (newUnits >= 135) newStanding = 'Senior'
    else if (newUnits >= 90) newStanding = 'Junior'
    else if (newUnits >= 45) newStanding = 'Sophomore'
    else newStanding = 'Freshman'

    onUpdateProfile({
      ...profile,
      completedUnits: newUnits,
      classStanding: newStanding,
      courseHistory: newHistory
    })
    setShowAddTransferModal(false)
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-anteater-gold" />
            <h2 className="text-base font-bold text-white">Student Academic Profile</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test eligibility by selecting a realistic persona or toggling completed coursework.
          </p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs border border-slate-700/60">
            <span className="text-slate-400">Standing: </span>
            <span className="font-semibold text-sky-400">{profile.classStanding}</span>
          </div>
          <div className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs border border-slate-700/60">
            <span className="text-slate-400">Completed Units: </span>
            <span className="font-semibold text-emerald-400">{profile.completedUnits}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs border border-slate-700/60">
            <span className="text-slate-400">Major: </span>
            <select
              value={profile.major}
              onChange={(e) => onUpdateProfile({ ...profile, major: e.target.value })}
              className="bg-transparent font-semibold text-anteater-gold cursor-pointer focus:outline-none max-w-[220px] truncate"
              title="Click to switch major"
            >
              {UCI_DEGREE_PROGRAMS.map((prog) => (
                <option key={prog.id} value={prog.name} className="bg-slate-900 text-white font-normal">
                  {prog.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Persona Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Quick Preset Personas
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {STUDENT_PERSONAS.map((persona) => {
            const isSelected = selectedPersonaId === persona.id
            return (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona.id)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-anteater-gold bg-anteater-blue/20 ring-1 ring-anteater-gold/40'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-anteater-gold' : 'text-slate-200'}`}>
                    {persona.name}
                  </span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-anteater-gold" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {persona.tagline}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Quick Course Checklist */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Toggle Completed UCI Courses
          </label>
          <span className="text-[11px] text-slate-500">
            Click to add/remove completed courses
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {UCI_CS_MATH_COURSES.map((course) => {
            const isTaken = profile.courseHistory.some(
              (c) => c.courseCode.toUpperCase() === course.code.toUpperCase()
            )
            return (
              <button
                key={course.id}
                onClick={() => handleToggleCourse(course.code)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  isTaken
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                <span>{course.code}</span>
                {isTaken && <span className="text-[10px]">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Completed Course Records */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Current Course History ({profile.courseHistory.length} courses)
          </label>
          <div className="flex items-center gap-3">
            {onOpenImportModal && (
              <button
                onClick={onOpenImportModal}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Paste or upload unofficial transcript"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Import Transcript</span>
              </button>
            )}
            <button
              onClick={() => setShowAddTransferModal(true)}
              className="flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Transfer Course</span>
            </button>
          </div>
        </div>

        {profile.courseHistory.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-center">
            <p className="text-xs text-slate-500">
              No completed courses recorded. Select a persona above or toggle courses to begin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {profile.courseHistory.map((rec) => {
              const isTransfer = rec.institution !== 'UCI'
              return (
                <div
                  key={rec.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                    isTransfer
                      ? 'border-sky-900/40 bg-sky-950/20'
                      : 'border-slate-800 bg-slate-900/80'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white font-mono">{rec.courseCode}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-emerald-400 font-bold">
                        {rec.grade}
                      </span>
                      <span className="text-[10px] text-slate-400">({rec.units}u)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
                      {rec.institution} • {rec.term}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveRecord(rec.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove course"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Transfer Course Modal */}
      {showAddTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Articulated Transfer Course</h3>
              <button
                onClick={() => setShowAddTransferModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Select Official Articulation Agreement:
                </label>
                <select
                  value={selectedTransferEqId}
                  onChange={(e) => setSelectedTransferEqId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  {OFFICIAL_TRANSFER_EQUIVALENCIES.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.sourceInstitution}: {eq.sourceCourseCode} ({eq.sourceCourseTitle}) → UCI {eq.targetUciCourseId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Grade Earned:
                </label>
                <select
                  value={transferGrade}
                  onChange={(e) => setTransferGrade(e.target.value as GradeLetter)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C- (Will fail prerequisites requiring C)</option>
                  <option value="P">P (Pass)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowAddTransferModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransferCourse}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 shadow-sm"
              >
                Add Articulated Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
