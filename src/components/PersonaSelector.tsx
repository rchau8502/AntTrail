import React, { useMemo } from 'react'
import { STUDENT_PERSONAS, StudentPersona } from '../data/mock/mockStudentData'
import { StudentProfile, DegreeProgram } from '../academic-engine/types'
import { UCI_DEGREE_PROGRAMS, UCI_MINORS } from '../data/uci/programs'
import { useLanguage } from '../../lib/i18n/LanguageContext'
import {
  User,
  GraduationCap,
  ArrowRightLeft,
  BookOpen,
  Layers,
  Sparkles,
  Award,
  GitBranch
} from 'lucide-react'

interface PersonaSelectorProps {
  selectedPersonaId: string
  onSelectPersona: (persona: StudentPersona) => void
  activeProfile: StudentProfile
  onSelectMajor?: (majorName: string) => void
  onSelectSecondaryMajor?: (secondaryMajor: string) => void
  onSelectMinor?: (minor: string) => void
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersonaId,
  onSelectPersona,
  activeProfile,
  onSelectMajor,
  onSelectSecondaryMajor,
  onSelectMinor
}) => {
  const { t } = useLanguage()

  // Group programs by school for organized navigation
  const programsBySchool = useMemo(() => {
    const map = new Map<string, DegreeProgram[]>()
    for (const prog of UCI_DEGREE_PROGRAMS) {
      const school = prog.school || 'General University'
      if (!map.has(school)) map.set(school, [])
      map.get(school)!.push(prog)
    }
    return Array.from(map.entries())
  }, [])

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-sm space-y-5">
      {/* 1. Header & Live Profile Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-anteater-gold" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              <span>{t.degreePlanningHub.majorSelectorTitle}</span>
              <span className="rounded-full bg-blue-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 text-[10px] font-bold lowercase">
                85 majors • 13 schools
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.degreePlanningHub.majorSelectorSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-xl bg-slate-800/90 border border-slate-700 px-3 py-1 text-slate-200 font-mono">
            {activeProfile.completedUnits} {t.degreePlanningHub.unitsDone}
          </span>
          <span className="rounded-xl bg-anteater-blue/20 text-sky-300 px-3 py-1 font-semibold border border-sky-500/30">
            {activeProfile.classStanding}
          </span>
          <span className="rounded-xl bg-amber-500/15 text-amber-300 px-3 py-1 font-semibold border border-amber-500/30">
            {activeProfile.major}
          </span>
        </div>
      </div>

      {/* 2. Primary Major, Double Major & Minor Interactive Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Major Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            <span>{t.degreePlanningHub.primaryMajorLabel}</span>
          </label>
          <select
            value={activeProfile.major}
            onChange={(e) => onSelectMajor?.(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 shadow-inner focus:border-anteater-blue focus:ring-1 focus:ring-anteater-blue focus:outline-hidden transition-colors"
          >
            {programsBySchool.map(([schoolName, progs]) => (
              <optgroup key={schoolName} label={schoolName} className="bg-slate-900 text-slate-400 font-bold">
                {progs.map((p) => (
                  <option key={p.id} value={p.name} className="bg-slate-950 text-slate-100 font-normal">
                    {p.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Secondary Major (Double Major) Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5 text-purple-400" />
            <span>{t.degreePlanningHub.secondaryMajorLabel}</span>
          </label>
          <select
            value={activeProfile.secondaryMajor || ''}
            onChange={(e) => onSelectSecondaryMajor?.(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 shadow-inner focus:border-anteater-blue focus:ring-1 focus:ring-anteater-blue focus:outline-hidden transition-colors"
          >
            <option value="" className="bg-slate-950 text-slate-400">
              {t.degreePlanningHub.noneSingleMajor}
            </option>
            {programsBySchool.map(([schoolName, progs]) => (
              <optgroup key={schoolName} label={schoolName} className="bg-slate-900 text-slate-400 font-bold">
                {progs
                  .filter((p) => p.name !== activeProfile.major)
                  .map((p) => (
                    <option key={p.id} value={p.name} className="bg-slate-950 text-slate-100 font-normal">
                      {p.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Minor Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.degreePlanningHub.minorLabel}</span>
          </label>
          <select
            value={activeProfile.minor || ''}
            onChange={(e) => onSelectMinor?.(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 shadow-inner focus:border-anteater-blue focus:ring-1 focus:ring-anteater-blue focus:outline-hidden transition-colors"
          >
            <option value="" className="bg-slate-950 text-slate-400">
              {t.degreePlanningHub.noneMinor}
            </option>
            {UCI_MINORS.map((m) => (
              <option key={m.id} value={m.name} className="bg-slate-950 text-slate-100 font-normal">
                {m.name} ({m.school})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Demo Persona Presets Quick-Load Section */}
      <div className="pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <User className="h-3.5 w-3.5 text-slate-500" />
            <span>{t.degreePlanningHub.demoPersonasTitle}</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {t.degreePlanningHub.demoPersonasSub}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STUDENT_PERSONAS.map((persona) => {
            const isSelected = persona.id === selectedPersonaId
            const isTransfer = persona.id.includes('transfer')
            const isMath = persona.id.includes('math')

            return (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona)}
                className={`flex flex-col text-left rounded-xl p-3 transition-all duration-200 border ${
                  isSelected
                    ? 'border-anteater-blue bg-blue-950/40 ring-2 ring-blue-500/30 shadow-lg shadow-blue-950/50'
                    : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isTransfer ? (
                        <ArrowRightLeft className="h-3 w-3" />
                      ) : isMath ? (
                        <BookOpen className="h-3 w-3" />
                      ) : (
                        <GraduationCap className="h-3 w-3" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {persona.name}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed mb-2 line-clamp-1">
                  {persona.tagline}
                </p>

                <div className="mt-auto pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[120px]">{persona.profile.major}</span>
                  <span className="font-mono text-slate-400">
                    {persona.profile.courseHistory.length} courses
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
