import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Radar,
  GraduationCap,
  Zap,
  BookOpen,
  Home,
  Clock,
  Sparkles
} from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Degree & Prereq Engine',
      desc: '4-year planner & deterministic prerequisite AST solver',
      href: '/degree-planning',
      icon: GraduationCap,
      color: 'text-[#0064a4] bg-sky-50 border-sky-200',
    },
    {
      title: 'ZotSniper WebReg Command',
      desc: 'Real-time open seat radar & waitlist odds solver',
      href: '/webreg',
      icon: Radar,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      title: 'CC Transfer Articulation',
      desc: 'ASSIST.org equivalencies for California CCs (IVC, OCC)',
      href: '/transfer',
      icon: Compass,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Canvas LMS Command Center',
      desc: 'Eisenhower priority matrix & grade what-if simulator',
      href: '/canvas',
      icon: Zap,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      title: 'STEM Pattern Recognition',
      desc: '349 retrieval cards & drills for MATH 2E, 3A, 130A, 140A',
      href: '/study',
      icon: Sparkles,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
    {
      title: 'Campus Survival Guides',
      desc: '42+ verified student guides and registrar deadline calendar',
      href: '/guides',
      icon: BookOpen,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl text-center space-y-6">
        {/* Anteater 404 Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-extrabold text-[#0064a4] shadow-xs">
          <span>Zot! Lost on the Ring Road?</span>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-sky-100">
            Error 404
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          The path you took seems to have wandered off Aldrich Park. Don&apos;t worry — every essential Anteater tool is still within reach below.
        </p>

        {/* Quick Launchpad Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-[#0064a4]/40 hover:shadow-md transition-all"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#0064a4] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0064a4] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back to Home Action */}
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4 text-[#ffd200]" />
            <span>Return to AntTrail Main Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
