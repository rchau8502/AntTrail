'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RECOMMENDED_COURSES } from '@/data/courses';
import { UCI_CS_MATH_COURSES } from '@/src/data/uci/courses';
import { Course } from '@/src/academic-engine/types';
import CourseCard from '@/components/CourseCard';
import { MajorDivision, GECategory } from '@/types/course';
import {
  Search,
  Flame,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Globe,
  Radio,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function getCourseNumber(code: string): number {
  const match = code.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function CatalogCourseCard({
  course,
  t,
}: {
  course: Course;
  t: any;
}) {
  const courseNumber = getCourseNumber(course.code);
  const isUpper = courseNumber >= 100;
  const deptCode = course.department || course.code.split(' ')[0] || '';
  const numOnly = course.code.replace(/^[A-Z\s&/]+/, '').trim();

  const zotisticsUrl = `https://zotistics.com/?dept=${encodeURIComponent(deptCode)}&code=${encodeURIComponent(numOnly || courseNumber.toString())}`;
  const peterPortalCode = course.code.replace(/\s+/g, '');
  const peterPortalUrl = `https://peterportal.org/course/${encodeURIComponent(peterPortalCode)}`;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Header badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-base font-black text-slate-900 group-hover:text-[#0064a4] transition-colors">
              {course.code}
            </span>
            <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
              {course.units} {t.coursesHub.cardUnits}
            </span>
            <span
              className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isUpper
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {isUpper ? t.coursesHub.upperDiv : t.coursesHub.lowerDiv}
            </span>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
            {course.department}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
          {course.title}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Prerequisites */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/60 p-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#0064a4]" />
            <span>{t.coursesHub.prereqLabel}</span>
          </div>
          <div className="text-slate-700">
            {course.prerequisiteText ? (
              <span className="font-medium text-slate-800">{course.prerequisiteText}</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.coursesHub.noPrereqs}
              </span>
            )}
          </div>
        </div>

        {/* Upcoming Offerings */}
        {course.offerings && course.offerings.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Scheduled Offerings
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {course.offerings.map((off, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-50 border border-sky-200/60 px-2 py-0.5 text-[11px] font-semibold text-sky-800"
                >
                  <Calendar className="w-3 h-3 text-[#0064a4]" />
                  <span>
                    {off.term} {off.year}
                  </span>
                  {off.instructors && off.instructors.length > 0 && (
                    <span className="text-sky-600 font-normal">
                      ({off.instructors[0]})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <a
            href={zotisticsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 transition-colors"
            title="View historical grade distribution on Zotistics"
          >
            <BarChart3 className="w-3 h-3 text-[#0064a4]" />
            <span>Zotistics</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>
          <a
            href={peterPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 transition-colors"
            title="View course roadmap on PeterPortal"
          >
            <span>PeterPortal</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/webreg?dept=${encodeURIComponent(course.department)}`}
            className="inline-flex items-center gap-1 rounded-xl bg-amber-50 border border-amber-200/80 hover:bg-amber-100 text-amber-900 font-bold px-2.5 py-1 transition-colors"
            title="Check live open seats on WebReg Radar"
          >
            <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
            <span>{t.coursesHub.viewInWebRegRadar}</span>
          </Link>
          <Link
            href={`/degree-planning`}
            className="inline-flex items-center gap-1 rounded-xl bg-[#0064a4] hover:bg-[#004e80] text-white font-bold px-3 py-1 shadow-2xs transition-colors"
            title="Add to your 4-year degree plan"
          >
            <span>{t.coursesHub.planCourseBtn}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const { language, t } = useLanguage();

  // Mode: Complete 603 Course Catalog vs Curated 25 GPA Boosters
  const [activeMode, setActiveMode] = useState<'catalog' | 'boosters'>('catalog');

  // --- CATALOG MODE STATE ---
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogDept, setCatalogDept] = useState('ALL');
  const [catalogLevel, setCatalogLevel] = useState<'ALL' | 'LOWER' | 'UPPER'>('ALL');
  const [catalogUnits, setCatalogUnits] = useState('ALL');
  const [catalogPage, setCatalogPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Derive catalog departments with counts
  const { departmentCounts, departmentList } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of UCI_CS_MATH_COURSES) {
      counts[c.department] = (counts[c.department] || 0) + 1;
    }
    const list = Object.keys(counts).sort();
    return { departmentCounts: counts, departmentList: list };
  }, []);

  // Filter Catalog Courses
  const filteredCatalogCourses = useMemo(() => {
    const q = catalogSearch.toLowerCase().trim();

    return UCI_CS_MATH_COURSES.filter((c) => {
      // Dept filter
      if (catalogDept !== 'ALL' && c.department !== catalogDept) {
        return false;
      }

      // Level filter
      const num = getCourseNumber(c.code);
      if (catalogLevel === 'LOWER' && num >= 100) return false;
      if (catalogLevel === 'UPPER' && num < 100) return false;

      // Units filter
      if (catalogUnits !== 'ALL') {
        const u = parseInt(catalogUnits, 10);
        if (catalogUnits === '5+' && c.units < 5) return false;
        if (catalogUnits !== '5+' && c.units !== u) return false;
      }

      // Text query
      if (q) {
        const matchCode = c.code.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchDept = c.department.toLowerCase().includes(q);
        const matchDesc = c.description ? c.description.toLowerCase().includes(q) : false;
        const matchPrereq = c.prerequisiteText ? c.prerequisiteText.toLowerCase().includes(q) : false;
        if (!matchCode && !matchTitle && !matchDept && !matchDesc && !matchPrereq) {
          return false;
        }
      }

      return true;
    });
  }, [catalogSearch, catalogDept, catalogLevel, catalogUnits]);

  // Paginated Catalog
  const totalCatalogPages = Math.ceil(filteredCatalogCourses.length / ITEMS_PER_PAGE) || 1;
  const paginatedCatalogCourses = useMemo(() => {
    const start = (catalogPage - 1) * ITEMS_PER_PAGE;
    return filteredCatalogCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCatalogCourses, catalogPage]);

  // --- BOOSTER MODE STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<MajorDivision>('gpa-booster');
  const [selectedGe, setSelectedGe] = useState<string>('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [noExamsOnly, setNoExamsOnly] = useState(false);
  const [highARateOnly, setHighARateOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'easiest' | 'highest-rmp' | 'highest-a' | 'code'>('easiest');

  const divisions: { id: MajorDivision; label: string }[] = [
    { id: 'gpa-booster', label: t.coursesHub.divisionGpaBooster },
    { id: 'all', label: t.coursesHub.divisionAll },
    { id: 'ics-cs', label: t.coursesHub.divisionIcs },
    { id: 'social-sci', label: t.coursesHub.divisionSocSci },
    { id: 'business-econ', label: t.coursesHub.divisionBusiness },
    { id: 'biosci', label: t.coursesHub.divisionBioSci },
    { id: 'engineering', label: t.coursesHub.divisionEngineering },
    { id: 'humanities-arts', label: t.coursesHub.divisionHumanities },
  ];

  const geOptions: { id: string; label: string }[] = [
    { id: 'all', label: t.coursesHub.geAll },
    { id: 'GE Ia', label: t.coursesHub.geIa },
    { id: 'GE Ib', label: t.coursesHub.geIb },
    { id: 'GE II', label: t.coursesHub.geII },
    { id: 'GE III', label: t.coursesHub.geIII },
    { id: 'GE IV', label: t.coursesHub.geIV },
    { id: 'GE Va', label: t.coursesHub.geVa },
    { id: 'GE VII', label: t.coursesHub.geVII },
    { id: 'GE VIII', label: t.coursesHub.geVIII },
  ];

  const filteredBoosterCourses = useMemo(() => {
    let result = RECOMMENDED_COURSES.filter(course => {
      // Division filter
      if (selectedDivision === 'gpa-booster' && !course.isGpaBooster) return false;
      if (selectedDivision !== 'all' && selectedDivision !== 'gpa-booster' && course.division !== selectedDivision) {
        return false;
      }

      // GE filter
      if (selectedGe !== 'all' && !course.geCategories.includes(selectedGe as GECategory)) {
        return false;
      }

      // Quick toggles
      if (onlineOnly && !course.isOnlineAvailable) return false;
      if (noExamsOnly && !course.isNoMidtermFinal) return false;
      if (highARateOnly && course.zotisticsStats.percentA < 80) return false;

      // Text search
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const loc = course.translations?.[language];
      const matchesCode = course.code.toLowerCase().includes(q);
      const matchesTitle =
        course.title.toLowerCase().includes(q) ||
        (loc?.title ? loc.title.toLowerCase().includes(q) : false);
      const matchesWhy =
        course.whyTakeIt.toLowerCase().includes(q) ||
        (loc?.whyTakeIt ? loc.whyTakeIt.toLowerCase().includes(q) : false);
      const matchesTags = course.tags.some(tag => tag.toLowerCase().includes(q));
      const matchesProfs = course.recommendedProfessors.some(p =>
        p.name.toLowerCase().includes(q) || p.tags.some(tag => tag.toLowerCase().includes(q))
      );

      const matchesSlang =
        (q.includes('水课') ||
          q.includes('水') ||
          q.includes('简单') ||
          q.includes('easy') ||
          q.includes('꿀강') ||
          q.includes('楽単') ||
          q.includes('facil') ||
          q.includes('fácil') ||
          q.includes('甜課') ||
          q.includes('madali')) &&
        course.isGpaBooster;

      return matchesCode || matchesTitle || matchesWhy || matchesTags || matchesProfs || matchesSlang;
    });

    result.sort((a, b) => {
      if (sortBy === 'easiest') {
        return a.difficultyScore - b.difficultyScore;
      }
      if (sortBy === 'highest-rmp') {
        const aMaxRmp = Math.max(...a.recommendedProfessors.map(p => p.rmpRating));
        const bMaxRmp = Math.max(...b.recommendedProfessors.map(p => p.rmpRating));
        return bMaxRmp - aMaxRmp;
      }
      if (sortBy === 'highest-a') {
        return b.zotisticsStats.percentA - a.zotisticsStats.percentA;
      }
      if (sortBy === 'code') {
        return a.code.localeCompare(b.code);
      }
      return 0;
    });

    return result;
  }, [
    selectedDivision,
    selectedGe,
    onlineOnly,
    noExamsOnly,
    highARateOnly,
    searchQuery,
    sortBy,
    language,
  ]);

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Hero */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{t.coursesHub.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.coursesHub.title}
          </h1>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            {t.coursesHub.subtitle}
          </p>

          {/* Verification Tools Banner */}
          <div className="mt-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 p-4 text-xs sm:text-sm text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <BarChart3 className="w-4 h-4 text-[#0064a4] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{t.coursesHub.bannerTitle} </span>
                <span>{t.coursesHub.bannerText}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://www.ratemyprofessors.com/school/1074"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0064a4] bg-white border border-sky-200 px-2.5 py-1 rounded-xl shadow-2xs hover:bg-sky-100/60 transition-colors"
              >
                <span>{t.coursesHub.rmpBtn}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a
                href="https://zotistics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0064a4] bg-white border border-sky-200 px-2.5 py-1 rounded-xl shadow-2xs hover:bg-sky-100/60 transition-colors"
              >
                <span>{t.coursesHub.zotisticsBtn}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <Link
                href="/webreg"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl shadow-2xs hover:bg-amber-100/60 transition-colors"
              >
                <Radio className="w-2.5 h-2.5 text-amber-600" />
                <span>WebReg Radar</span>
              </Link>
            </div>
          </div>
        </div>

        {/* MODE SWITCHER TABS: Catalog (601) vs Curated Boosters (25) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 w-fit">
          <button
            type="button"
            onClick={() => setActiveMode('catalog')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black transition-all ${
              activeMode === 'catalog'
                ? 'bg-[#0064a4] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.coursesHub.tabCatalog}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeMode === 'catalog' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {UCI_CS_MATH_COURSES.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('boosters')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black transition-all ${
              activeMode === 'boosters'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{t.coursesHub.tabBoosters}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeMode === 'boosters' ? 'bg-black/15 text-slate-950' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {RECOMMENDED_COURSES.length}
            </span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MODE 1: OFFICIAL UCI COURSE CATALOG (601 COURSES) */}
        {/* ---------------------------------------------------- */}
        {activeMode === 'catalog' && (
          <div className="space-y-6">
            {/* Catalog Filter Controls */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Search query */}
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => {
                      setCatalogSearch(e.target.value);
                      setCatalogPage(1);
                    }}
                    placeholder={t.coursesHub.catalogSearchPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
                  />
                </div>

                {/* Department Filter */}
                <div className="md:col-span-3">
                  <select
                    value={catalogDept}
                    onChange={(e) => {
                      setCatalogDept(e.target.value);
                      setCatalogPage(1);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
                  >
                    <option value="ALL">
                      🏛️ {t.coursesHub.allDepartments} ({UCI_CS_MATH_COURSES.length})
                    </option>
                    {departmentList.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept} ({departmentCounts[dept]} courses)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="md:col-span-2">
                  <select
                    value={catalogLevel}
                    onChange={(e) => {
                      setCatalogLevel(e.target.value as any);
                      setCatalogPage(1);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
                  >
                    <option value="ALL">{t.coursesHub.allLevels}</option>
                    <option value="LOWER">{t.coursesHub.lowerDiv}</option>
                    <option value="UPPER">{t.coursesHub.upperDiv}</option>
                  </select>
                </div>

                {/* Units Filter */}
                <div className="md:col-span-2">
                  <select
                    value={catalogUnits}
                    onChange={(e) => {
                      setCatalogUnits(e.target.value);
                      setCatalogPage(1);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
                  >
                    <option value="ALL">All Units</option>
                    <option value="4">4 Units (Standard)</option>
                    <option value="2">2 Units</option>
                    <option value="1">1 Unit</option>
                    <option value="5+">5+ Units</option>
                  </select>
                </div>
              </div>

              {/* Department quick-filter pills for top schools */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-400 font-bold uppercase text-[11px] mr-1 shrink-0">
                  Quick Depts:
                </span>
                {['ALL', 'COMPSCI', 'IN4MATX', 'I&C SCI', 'MATH', 'STATS', 'BIO SCI', 'CHEM', 'PHYSICS', 'ECON', 'MGMT', 'EECS', 'ENGRMAE', 'WRITING'].map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      setCatalogDept(dept);
                      setCatalogPage(1);
                    }}
                    className={`rounded-xl px-3 py-1 font-bold transition-all shrink-0 ${
                      catalogDept === dept
                        ? 'bg-[#0064a4] text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {dept === 'ALL' ? t.coursesHub.allDepartments : dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count & Pagination Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-semibold px-1">
              <div>
                {t.coursesHub.showingCount}{' '}
                <span className="text-slate-900 font-bold">{filteredCatalogCourses.length}</span>{' '}
                UCI courses across{' '}
                <span className="text-slate-900 font-bold">{departmentList.length}</span> departments
                {catalogDept !== 'ALL' && (
                  <span className="ml-1 text-[#0064a4]">in {catalogDept}</span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">
                Page {catalogPage} of {totalCatalogPages} ({ITEMS_PER_PAGE} per page)
              </div>
            </div>

            {/* Catalog Grid */}
            {paginatedCatalogCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedCatalogCourses.map((c) => (
                  <CatalogCourseCard key={c.id || c.code} course={c} t={t} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">{t.coursesHub.noResultsTitle}</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {t.coursesHub.noResultsText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCatalogSearch('');
                    setCatalogDept('ALL');
                    setCatalogLevel('ALL');
                    setCatalogUnits('ALL');
                    setCatalogPage(1);
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0064a4] hover:underline"
                >
                  {t.coursesHub.resetFilters}
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalCatalogPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setCatalogPage((p) => Math.max(1, p - 1))}
                  disabled={catalogPage === 1}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalCatalogPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalCatalogPages > 7) {
                      if (catalogPage > 4 && catalogPage < totalCatalogPages - 3) {
                        pageNum = catalogPage - 3 + i;
                      } else if (catalogPage >= totalCatalogPages - 3) {
                        pageNum = totalCatalogPages - 6 + i;
                      }
                    }
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCatalogPage(pageNum)}
                        className={`rounded-xl h-8 w-8 text-xs font-bold transition-colors ${
                          catalogPage === pageNum
                            ? 'bg-[#0064a4] text-white shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCatalogPage((p) => Math.min(totalCatalogPages, p + 1))}
                  disabled={catalogPage === totalCatalogPages}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODE 2: CURATED GPA BOOSTERS & WATER COURSES (25)  */}
        {/* ---------------------------------------------------- */}
        {activeMode === 'boosters' && (
          <div className="space-y-6">
            {/* Search Input for Boosters */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.coursesHub.searchPlaceholder}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
              />
            </div>

            {/* Filter Controls Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-4 sm:p-5 space-y-4">
              {/* Major / Category Tabs */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.coursesHub.majorCategoryLabel}
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {divisions.map((div) => (
                    <button
                      key={div.id}
                      onClick={() => setSelectedDivision(div.id)}
                      className={`rounded-xl px-3.5 py-2 font-bold transition-all shrink-0 ${
                        selectedDivision === div.id
                          ? 'bg-[#0064a4] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {div.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* GE Category Dropdown & Quick Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 text-xs">
                {/* GE Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <span className="text-slate-400 font-bold text-[11px] uppercase mr-1 shrink-0">
                    {t.coursesHub.geFilterLabel}
                  </span>
                  {geOptions.map((ge) => (
                    <button
                      key={ge.id}
                      onClick={() => setSelectedGe(ge.id)}
                      className={`rounded-lg px-2.5 py-1 font-semibold transition-colors shrink-0 ${
                        selectedGe === ge.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {ge.label}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <span className="text-slate-400 font-bold text-[11px] uppercase">{t.coursesHub.sortLabel}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20"
                  >
                    <option value="easiest">{t.coursesHub.sortEasiest}</option>
                    <option value="highest-rmp">{t.coursesHub.sortHighestRmp}</option>
                    <option value="highest-a">{t.coursesHub.sortHighestA}</option>
                    <option value="code">{t.coursesHub.sortCode}</option>
                  </select>
                </div>
              </div>

              {/* Quick Toggle Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 text-xs">
                <button
                  type="button"
                  onClick={() => setOnlineOnly(!onlineOnly)}
                  className={`rounded-xl px-3 py-1.5 font-bold transition-colors inline-flex items-center gap-1.5 ${
                    onlineOnly
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{t.coursesHub.toggleOnline}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNoExamsOnly(!noExamsOnly)}
                  className={`rounded-xl px-3 py-1.5 font-bold transition-colors inline-flex items-center gap-1.5 ${
                    noExamsOnly
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.coursesHub.toggleNoExams}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHighARateOnly(!highARateOnly)}
                  className={`rounded-xl px-3 py-1.5 font-bold transition-colors inline-flex items-center gap-1.5 ${
                    highARateOnly
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{t.coursesHub.toggleHighA}</span>
                </button>
              </div>
            </div>

            {/* Results Count Banner */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <div>
                {t.coursesHub.showingCount}{' '}
                <span className="text-slate-900 font-bold">{filteredBoosterCourses.length}</span>{' '}
                {t.coursesHub.showingRecommended}
                {selectedDivision === 'gpa-booster' && ` ${t.coursesHub.showingBoosterSuffix}`}
              </div>
              <div className="text-[11px] text-slate-400">
                {t.coursesHub.verifiedRecordsNotice}
              </div>
            </div>

            {/* Booster Cards Grid */}
            {filteredBoosterCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBoosterCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">{t.coursesHub.noResultsTitle}</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {t.coursesHub.noResultsText}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDivision('all');
                    setSelectedGe('all');
                    setOnlineOnly(false);
                    setNoExamsOnly(false);
                    setHighARateOnly(false);
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0064a4] hover:underline"
                >
                  {t.coursesHub.resetFilters}
                </button>
              </div>
            )}
          </div>
        )}

        {/* AntTrail Integration Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c2340] to-[#0064a4] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide uppercase text-amber-300">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.coursesHub.antTrailBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.coursesHub.antTrailTitle}
            </h2>
            <p className="text-slate-200 text-sm max-w-xl leading-relaxed">
              {t.coursesHub.antTrailText}
            </p>
          </div>

          <Link
            href="/degree-planning"
            className="rounded-2xl bg-[#ffd200] hover:bg-[#ffc000] text-slate-900 font-extrabold px-6 py-3.5 text-sm shadow-md transition-all hover:scale-105 shrink-0 inline-flex items-center gap-2"
          >
            <span>{t.coursesHub.antTrailButton}</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
