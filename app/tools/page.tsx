'use client';

import { useState } from 'react';
import { UCI_TOOLS } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import { Search, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const TOOLS_I18N: Record<string, {
  badge: string;
  placeholder: string;
  all: string;
  academics: string;
  finances: string;
  life: string;
  career: string;
}> = {
  en: {
    badge: 'Campus Portals Directory',
    placeholder: 'Search tools by name or task (e.g. WebReg, billing, transcripts, bus)...',
    all: 'All Systems',
    academics: 'Academics & Registration',
    finances: 'Finances & Billing',
    life: 'Campus Life & Housing',
    career: 'Career & Health',
  },
  'zh-CN': {
    badge: '校园常用系统与工具导航',
    placeholder: '搜索系统名称或办理事项 (如 WebReg, 缴费, 成绩单, 班车)...',
    all: '全部系统',
    academics: '选课与教务',
    finances: '学费与财务',
    life: '校园生活与宿舍',
    career: '求职与健康',
  },
  es: {
    badge: 'Directorio de Portales del Campus',
    placeholder: 'Buscar herramientas por nombre o tarea (ej. WebReg, pagos, expedientes)...',
    all: 'Todos los Sistemas',
    academics: 'Académico y Registro',
    finances: 'Finanzas y Pagos',
    life: 'Vida en el Campus y Vivienda',
    career: 'Carrera y Salud',
  },
  vi: {
    badge: 'Danh Mục Cổng Thông Tin UCI',
    placeholder: 'Tìm kiếm công cụ theo tên hoặc tác vụ (vd: WebReg, học phí, bảng điểm)...',
    all: 'Tất Cả Hệ Thống',
    academics: 'Học Tập & Đăng Ký',
    finances: 'Tài Chính & Học Phí',
    life: 'Đời Sống & Nhà Ở',
    career: 'Nghề Nghiệp & Y Tế',
  },
  ko: {
    badge: '캠퍼스 포털 디렉토리',
    placeholder: '시스템 이름 또는 작업으로 검색 (예: WebReg, 등록금, 성적표, 셔틀버스)...',
    all: '모든 시스템',
    academics: '학사 및 수강신청',
    finances: '재정 및 등록금',
    life: '캠퍼스 생활 및 기숙사',
    career: '취업 및 건강',
  },
  'zh-TW': {
    badge: '校園常用系統與工具導航',
    placeholder: '搜尋系統名稱或辦理事項 (如 WebReg, 繳費, 成績單, 校車)...',
    all: '全部系統',
    academics: '選課與教務',
    finances: '學費與財務',
    life: '校園生活與宿舍',
    career: '求職與健康',
  },
  tl: {
    badge: 'Direktoryo ng mga Portal sa Kampus',
    placeholder: 'Maghanap ng portal o gawain (hal. WebReg, billing, transcript, bus)...',
    all: 'Lahat ng Sistema',
    academics: 'Akademiko at Pagpaparehistro',
    finances: 'Pananalapi at Singilin',
    life: 'Buhay sa Kampus at Pabahay',
    career: 'Karera at Kalusugan',
  },
  ja: {
    badge: 'キャンパスポータル一覧',
    placeholder: 'システム名や用事で検索（例：WebReg、学費納入、成績証明書、バス）...',
    all: 'すべてのシステム',
    academics: '履修登録・教務',
    finances: '学費・会計',
    life: '学生生活・寮',
    career: 'キャリア・健康',
  },
};

export default function ToolsPage() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loc = TOOLS_I18N[language] || TOOLS_I18N.en;

  const categoryOptions = [
    { id: 'all', label: `${loc.all} (${UCI_TOOLS.length})` },
    { id: 'Academics & Registration', label: loc.academics },
    { id: 'Finances & Billing', label: loc.finances },
    { id: 'Campus Life & Housing', label: loc.life },
    { id: 'Career & Health', label: loc.career },
  ];

  const filteredTools = UCI_TOOLS.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.whatItIs.toLowerCase().includes(q) ||
      tool.aliases.some(a => a.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 text-[#0064a4] border border-sky-200 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{loc.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.sections.toolsExplained}
          </h1>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            {t.sections.toolsExplainedSub}
          </p>

          {/* Search Tools */}
          <div className="mt-6 relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={loc.placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0064a4]/20 focus:border-[#0064a4]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
          {categoryOptions.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#0064a4] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
