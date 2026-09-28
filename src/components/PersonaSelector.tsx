import React from 'react'
import { STUDENT_PERSONAS, StudentPersona } from '../data/mock/mockStudentData'
import { StudentProfile } from '../academic-engine/types'
import { User, GraduationCap, ArrowRightLeft, BookOpen } from 'lucide-react'

interface PersonaSelectorProps {
  selectedPersonaId: string
  onSelectPersona: (persona: StudentPersona) => void
  activeProfile: StudentProfile
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersonaId,
  onSelectPersona,
  activeProfile
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-anteater-gold" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Student Persona Presets
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a test profile or customize completed coursework to see real-time eligibility updates.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-300 font-mono">
            {activeProfile.completedUnits} Units Completed
          </span>
          <span className="rounded-md bg-anteater-blue/20 text-sky-300 px-2.5 py-1 font-semibold border border-sky-500/30">
            {activeProfile.classStanding}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {STUDENT_PERSONAS.map((persona) => {
          const isSelected = persona.id === selectedPersonaId
          const isTransfer = persona.id.includes('transfer')
          const isMath = persona.id.includes('math')

          return (
            <button
              key={persona.id}
              onClick={() => onSelectPersona(persona)}
              className={`flex flex-col text-left rounded-xl p-3.5 transition-all duration-200 border ${
                isSelected
                  ? 'border-anteater-blue bg-blue-950/40 ring-2 ring-blue-500/30 shadow-lg shadow-blue-950/50'
                  : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isTransfer ? (
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                    ) : isMath ? (
                      <BookOpen className="h-3.5 w-3.5" />
                    ) : (
                      <GraduationCap className="h-3.5 w-3.5" />
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

              <p className="text-[11px] text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {persona.tagline}
              </p>

              <div className="mt-auto pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>{persona.profile.major}</span>
                <span className="font-mono text-slate-300">
                  {persona.profile.courseHistory.length} courses
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
