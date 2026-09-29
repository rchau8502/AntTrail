import React, { useState } from 'react'
import { GradeLetter, StudentCourseRecord } from '../academic-engine/types'
import { Plus, X } from 'lucide-react'

interface ManualCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCourse: (record: StudentCourseRecord) => void
}

export const ManualCourseModal: React.FC<ManualCourseModalProps> = ({
  isOpen,
  onClose,
  onAddCourse
}) => {
  const [courseCode, setCourseCode] = useState('')
  const [units, setUnits] = useState(4)
  const [grade, setGrade] = useState<GradeLetter>('A')
  const [institution, setInstitution] = useState('UCI')
  const [term, setTerm] = useState('Fall 2025')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseCode.trim()) return

    onAddCourse({
      id: `manual-${Date.now()}`,
      courseCode: courseCode.trim().toUpperCase(),
      units: Number(units) || 4,
      grade,
      institution: institution.trim() || 'UCI',
      term: term.trim() || 'Completed',
      status: 'COMPLETED'
    })

    setCourseCode('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-anteater-gold" />
            <h3 className="text-sm font-bold text-white">Manual Course Entry</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Course Code</label>
            <input
              type="text"
              required
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. WRITING 39B, ICS 31, MATH 2A"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Units</label>
              <input
                type="number"
                min="1"
                max="12"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLetter)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="P">P (Pass)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. UCI, Mt. SAC, IVC"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Term Completed</label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. Fall 2025"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 shadow-sm"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
