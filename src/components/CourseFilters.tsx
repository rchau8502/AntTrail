import React from 'react'
import { Search, CheckCircle, AlertTriangle, Layers, X, School } from 'lucide-react'
import { useLanguage } from '../../lib/i18n/LanguageContext'

export type FilterStatus = 'ALL' | 'ELIGIBLE_ONLY' | 'MISSING_ONLY' | 'TRANSFER_ONLY'

interface CourseFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedDepartment: string
  onSelectDepartment: (dept: string) => void
  filterStatus: FilterStatus
  onSelectFilterStatus: (status: FilterStatus) => void
  totalCount: number
  eligibleCount: number
  missingCount: number
  availableDepartments?: string[]
}

const DEFAULT_TOP_DEPTS = [
  'ALL',
  'COMPSCI',
  'IN4MATX',
  'I&C SCI',
  'MATH',
  'STATS',
  'BIO SCI',
  'CHEM',
  'PHYSICS',
  'ECON',
  'MGMT',
  'EECS',
  'ENGRMAE',
  'WRITING'
]

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onSelectDepartment,
  filterStatus,
  onSelectFilterStatus,
  totalCount,
  eligibleCount,
  missingCount,
  availableDepartments
}) => {
  const { t } = useLanguage()
  const depts = availableDepartments && availableDepartments.length > 0 ? availableDepartments : DEFAULT_TOP_DEPTS

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course code, title, or topic (e.g. ICS 33, Calculus, Algorithms)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Department Select & Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedDepartment}
            onChange={(e) => onSelectDepartment(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="ALL">🏛️ {t.coursesHub.allDepartments}</option>
            {depts
              .filter((d) => d !== 'ALL')
              .map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Quick Pills for Top Departments */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] font-bold uppercase mr-1 shrink-0">
          Top Depts:
        </span>
        {DEFAULT_TOP_DEPTS.slice(0, 10).map((dept) => {
          const isSelected = selectedDepartment === dept
          return (
            <button
              key={dept}
              onClick={() => onSelectDepartment(dept)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {dept === 'ALL' ? t.coursesHub.allDepartments : dept}
            </button>
          )
        })}
      </div>

      {/* Status Filter Chips & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Status:</span>

          <button
            onClick={() => onSelectFilterStatus('ALL')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'ALL'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>All Courses ({totalCount})</span>
          </button>

          <button
            onClick={() => onSelectFilterStatus('ELIGIBLE_ONLY')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'ELIGIBLE_ONLY'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/50 text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'
            }`}
          >
            <CheckCircle className="h-3 w-3" />
            <span>{t.degreePlanningHub.metricEligibleNow} ({eligibleCount})</span>
          </button>

          <button
            onClick={() => onSelectFilterStatus('MISSING_ONLY')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'MISSING_ONLY'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-800/50 text-rose-400 hover:bg-slate-800 hover:text-rose-300'
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>{t.degreePlanningHub.metricPrereqsMissing} ({missingCount})</span>
          </button>
        </div>

        <div className="text-right text-xs text-slate-400 font-mono">
          Showing <span className="font-bold text-slate-200">{totalCount}</span> courses
        </div>
      </div>
    </div>
  )
}
