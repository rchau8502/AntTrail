import React from 'react'
import { Search, Sparkles, AlertCircle, ArrowRightLeft } from 'lucide-react'

interface FilterBarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedDept: string
  onDeptChange: (d: string) => void
  statusFilter: string
  onStatusFilterChange: (s: string) => void
  totalCount: number
  eligibleCount: number
  transferCount: number
  missingCount: number
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDept,
  onDeptChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  eligibleCount,
  transferCount,
  missingCount
}) => {
  return (
    <div className="space-y-3">
      {/* Search and Department row */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by course code, title, or topic (e.g., ICS 46, Linear Algebra, Algorithms)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Department tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1 shrink-0">
          {['ALL', 'ICS', 'MATH', 'STATS'].map((dept) => (
            <button
              key={dept}
              onClick={() => onDeptChange(dept)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDept === dept
                  ? 'bg-anteater-blue text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {dept === 'ALL' ? 'All Depts' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onStatusFilterChange('ALL')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            statusFilter === 'ALL'
              ? 'bg-slate-200 text-slate-900'
              : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50'
          }`}
        >
          <span>All Courses</span>
          <span className="rounded-full bg-slate-900/20 px-1.5 py-0.2 text-[10px] font-bold">
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('ELIGIBLE')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            statusFilter === 'ELIGIBLE'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 border border-emerald-800/40'
          }`}
        >
          <Sparkles className="h-3 w-3" />
          <span>Eligible for Enrollment</span>
          <span className="rounded-full bg-emerald-900/40 px-1.5 py-0.2 text-[10px]">
            {eligibleCount}
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('TRANSFER')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            statusFilter === 'TRANSFER'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
              : 'bg-sky-950/30 text-sky-300 hover:bg-sky-900/40 border border-sky-800/40'
          }`}
        >
          <ArrowRightLeft className="h-3 w-3" />
          <span>Via Transfer Credit</span>
          <span className="rounded-full bg-sky-900/40 px-1.5 py-0.2 text-[10px]">
            {transferCount}
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('MISSING')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            statusFilter === 'MISSING'
              ? 'bg-rose-500 text-white font-bold shadow-sm'
              : 'bg-rose-950/30 text-rose-300 hover:bg-rose-900/40 border border-rose-800/40'
          }`}
        >
          <AlertCircle className="h-3 w-3" />
          <span>Missing Prerequisites</span>
          <span className="rounded-full bg-rose-900/40 px-1.5 py-0.2 text-[10px]">
            {missingCount}
          </span>
        </button>
      </div>
    </div>
  )
}
