'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, ArrowRight, CornerDownLeft, Zap, Radar, GraduationCap, LayoutGrid, Sparkles, Calendar } from 'lucide-react';
import { searchGuides, SearchResult } from '@/lib/search';
import { CATEGORIES } from '@/data/categories';
import { CategoryId } from '@/types/guide';

interface WorkstationItem {
  name: string;
  description: string;
  href: string;
  keywords: string[];
  badge: string;
  iconType: 'radar' | 'transfer' | 'planner' | 'grid' | 'zap' | 'sparkles' | 'calendar';
}

const WORKSTATIONS: WorkstationItem[] = [
  {
    name: 'ZotSniper WebReg Drop Radar (41 Depts)',
    description: '119 live WebSoc sections, 5ms bookmarklet script, and Markov waitlist admission calculator',
    href: '/webreg',
    keywords: ['webreg', 'sniper', 'seat', 'radar', 'drop', 'waitlist', 'register', 'enroll', 'code', 'window', 'markov', 'bookmarklet', '抢课', '选课'],
    badge: 'Radar',
    iconType: 'radar',
  },
  {
    name: 'CC Transfer Articulation Tray',
    description: 'Instant 1.5x semester-to-quarter credit evaluation for 8 CA CCs (IVC, OCC, De Anza)',
    href: '/transfer',
    keywords: ['transfer', 'cc', 'community college', 'ivc', 'occ', 'assist', 'de anza', 'smc', 'articulation', 'credit', '转学', '学分'],
    badge: 'Scholar',
    iconType: 'transfer',
  },
  {
    name: '4-Year Degree & Prereq Engine (85 Majors)',
    description: 'Deterministic prerequisite AST solver, 13 schools, 85 majors, double major & minor support',
    href: '/degree-planning',
    keywords: ['planner', 'plan', 'degree', 'prereq', 'prerequisite', 'schedule', 'ast', 'audit', 'gpa', 'repeat', 'cs', 'swe', 'math', 'major', 'minor', '排课', '毕业', '专业'],
    badge: 'Planner',
    iconType: 'planner',
  },
  {
    name: 'Canvas LMS Command Center',
    description: 'Eisenhower priority deadline matrix & final exam grade simulator',
    href: '/canvas',
    keywords: ['canvas', 'ddl', 'deadline', 'task', 'homework', 'assignment', 'grade', 'what-if', 'priority', '作业'],
    badge: 'Matrix',
    iconType: 'zap',
  },
  {
    name: 'STEM Pattern Recognition & Drills',
    description: '349 retrieval cards & exam drills for MATH 2E, 3A, 130A, 140A',
    href: '/study',
    keywords: ['study', 'stem', 'bubble', 'math', '2e', '3a', '130a', '140a', 'probability', 'linear algebra', 'calculus', 'flashcard', 'drill', 'quiz', '刷题', '数学'],
    badge: 'Bubble',
    iconType: 'sparkles',
  },
  {
    name: 'Registrar Deadlines & Calendar Sync',
    description: 'Academic calendar deadlines with 1-click Google Calendar & .ics export',
    href: '/deadlines',
    keywords: ['deadline', 'deadlines', 'calendar', 'drop', 'fee', 'tuition', 'webreg', 'finals', 'quarter', 'registration', 'ics', '校历', '截止日期'],
    badge: 'Deadlines',
    iconType: 'calendar',
  },
  {
    name: 'UCI 603 Course Catalog & Water Courses',
    description: 'Explore 603 official courses across 60+ departments & student-reviewed GPA boosters',
    href: '/courses',
    keywords: ['course', 'courses', 'catalog', 'ics', 'cs', 'math', 'stats', 'physics', 'chem', 'bio', 'econ', 'water', 'booster', 'easy', 'gpa', 'ge', 'drama 10', 'earthss 3', 'dance 3', '选课', '课程', '水课', '全校课程'],
    badge: '603 Catalog',
    iconType: 'grid',
  },
  {
    name: 'National College & Feeder Directory',
    description: 'Official U.S. College Scorecard database & California CC transfer feeder metrics',
    href: '/colleges',
    keywords: ['college', 'colleges', 'scorecard', 'university', 'universities', 'admit rate', 'tuition', 'ivc', 'occ', 'ucla', 'berkeley', '院校', '大学', '黄页', '全美高校'],
    badge: 'Directory',
    iconType: 'transfer',
  },
];

export default function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | undefined>(undefined);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Filter workstations matching the query
  const matchedWorkstations = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return WORKSTATIONS.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.keywords.some(k => k.includes(q) || q.includes(k))
    );
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    const handleCustomTrigger = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open_search_modal', handleCustomTrigger);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open_search_modal', handleCustomTrigger);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedCategory(undefined);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    const matched = searchGuides(query, {
      category: selectedCategory,
      limit: 8,
    });
    setResults(matched);
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  const handleSelectGuide = (slug: string) => {
    setIsOpen(false);
    router.push(`/guides/${slug}`);
  };

  const handleSearchAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden transition-all">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchAll} className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search guides, tools, rules, deadlines..."
            autoFocus
            className="w-full text-base bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
            ESC
          </kbd>
        </form>

        {/* Category Filter Pills */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory(undefined)}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors shrink-0 ${
              selectedCategory === undefined
                ? 'bg-[#0064a4] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? undefined : cat.id)}
              className={`rounded-full px-2.5 py-1 font-medium transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#0064a4] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {/* Workstation Quick Jump */}
          {matchedWorkstations.length > 0 && (
            <div className="pb-2 mb-2">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0064a4] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Workstation Quick Access</span>
              </div>
              <div className="space-y-1">
                {matchedWorkstations.map(ws => (
                  <div
                    key={ws.href}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(ws.href);
                    }}
                    className="group flex items-center justify-between gap-3 p-2.5 rounded-xl bg-sky-50/70 hover:bg-[#0064a4] hover:text-white cursor-pointer transition-all border border-sky-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs group-hover:bg-white/20">
                        {ws.iconType === 'radar' && <Radar className="w-4 h-4 text-amber-600 group-hover:text-white" />}
                        {ws.iconType === 'transfer' && <GraduationCap className="w-4 h-4 text-emerald-600 group-hover:text-white" />}
                        {ws.iconType === 'planner' && <Zap className="w-4 h-4 text-[#0064a4] group-hover:text-white" />}
                        {ws.iconType === 'grid' && <LayoutGrid className="w-4 h-4 text-orange-600 group-hover:text-white" />}
                        {ws.iconType === 'zap' && <Zap className="w-4 h-4 text-rose-600 group-hover:text-white" />}
                        {ws.iconType === 'sparkles' && <Sparkles className="w-4 h-4 text-indigo-600 group-hover:text-white" />}
                        {ws.iconType === 'calendar' && <Calendar className="w-4 h-4 text-teal-600 group-hover:text-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 group-hover:text-white">
                          {ws.name}
                        </div>
                        <div className="text-[11px] text-slate-500 group-hover:text-sky-100 line-clamp-1">
                          {ws.description}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#0064a4] bg-white group-hover:bg-white/20 group-hover:text-white rounded-md px-2 py-0.5 shadow-2xs">
                        {ws.badge} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query ? (
            results.length > 0 ? (
              results.map(({ guide, matchReason }) => (
                <div
                  key={guide.id}
                  onClick={() => handleSelectGuide(guide.slug)}
                  className="group flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-sky-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-100/70 text-[#0064a4]">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#0064a4]">
                        {guide.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {guide.shortDescription}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md px-2 py-0.5">
                      {matchReason || 'Guide'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0064a4] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))
            ) : matchedWorkstations.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-sm font-medium">No direct guides found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for &ldquo;scooter&rdquo;, &ldquo;parking&rdquo;, &ldquo;uship&rdquo;, &ldquo;print&rdquo;, or &ldquo;drop&rdquo;.
                </p>
              </div>
            ) : null
          ) : (
            <div className="p-4 space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Frequent Anteater Searches
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: '📱 iPhone Duo & 2FA', q: 'duo' },
                  { label: '🛴 Scooter & Dismount Rules', q: 'scooter' },
                  { label: '🚗 Zone 4 Parking & 3PM', q: 'parking' },
                  { label: '🏥 Waive UC SHIP ($2,000+)', q: 'uship' },
                  { label: '☀️ Summer Pay for 8', q: 'summer' },
                  { label: '📦 Dorm Mail & Amazon', q: 'package' },
                  { label: '🖨️ WEPA Printing Kiosks', q: 'print' },
                  { label: '💳 Digital ZotCard & ARC', q: 'zotcard' },
                  { label: '🛡️ 24/7 CSO Safe Walk', q: 'safety' },
                  { label: '📶 eduroam Wi-Fi', q: 'wifi' },
                  { label: '🍉 Water & GPA Boosters', q: 'water' },
                  { label: '🚌 Anteater Express Shuttles', q: 'shuttle' },
                  { label: '⚠️ Drop Class Deadline', q: 'drop' },
                ].map(item => (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => setQuery(item.q)}
                    className="rounded-full border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-[#0064a4] px-3 py-1 font-semibold text-slate-700 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {query && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Showing top {results.length} guides</span>
            <button
              onClick={handleSearchAll}
              className="font-semibold text-[#0064a4] hover:underline flex items-center gap-1"
            >
              <span>Full search page</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
