'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import GuideCard from '@/components/GuideCard';
import { getSavedGuideSlugs } from '@/lib/bookmarks';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const SAVED_I18N: Record<string, {
  badge: string;
  subtitle: string;
  clear: string;
  emptyTitle: string;
  emptyDesc: string;
  browse: string;
}> = {
  en: {
    badge: 'Saved on Device',
    subtitle: 'Quick access to your bookmarked articles. Saved privately in your browser without requiring an account.',
    clear: 'Clear all bookmarks',
    emptyTitle: 'No saved guides yet',
    emptyDesc: 'When viewing any guide, click the bookmark icon to save it here for quick reference during your quarter.',
    browse: 'Browse Student Guides',
  },
  'zh-CN': {
    badge: '本地设备已保存',
    subtitle: '快速访问已收藏的指南文章。全部离线保存在本地浏览器中，无需注册或登录账号。',
    clear: '清空所有收藏',
    emptyTitle: '暂无已保存的指南',
    emptyDesc: '在浏览任意指南时，点击右上角的收藏图标即可保存到这里，方便随时翻阅。',
    browse: '浏览全部学生指南',
  },
  es: {
    badge: 'Guardado en el Dispositivo',
    subtitle: 'Acceso rápido a sus artículos guardados. Guardados privadamente en su navegador sin necesidad de cuenta.',
    clear: 'Borrar todos los marcadores',
    emptyTitle: 'Aún no hay guías guardadas',
    emptyDesc: 'Al ver cualquier guía, haga clic en el ícono de marcador para guardarla aquí.',
    browse: 'Explorar Guías Estudiantiles',
  },
  vi: {
    badge: 'Đã Lưu Trên Thiết Bị',
    subtitle: 'Truy cập nhanh vào các bài viết đã đánh dấu. Lưu riêng tư trong trình duyệt mà không cần tài khoản.',
    clear: 'Xóa tất cả dấu trang',
    emptyTitle: 'Chưa có hướng dẫn nào được lưu',
    emptyDesc: 'Khi xem hướng dẫn, nhấp vào biểu tượng dấu trang để lưu lại xem sau.',
    browse: 'Khám Phá Hướng Dẫn',
  },
  ko: {
    badge: '기기에 저장됨',
    subtitle: '북마크한 가이드에 빠르게 접근하세요. 계정 없이 브라우저에 안전하게 저장됩니다.',
    clear: '북마크 모두 지우기',
    emptyTitle: '저장된 가이드가 없습니다',
    emptyDesc: '가이드를 볼 때 북마크 아이콘을 누르면 이곳에 저장되어 언제든 다시 볼 수 있습니다.',
    browse: '학생 가이드 둘러보기',
  },
  'zh-TW': {
    badge: '本機裝置已儲存',
    subtitle: '快速存取已收藏的指南文章。全部離線保存在本機瀏覽器中，無須註冊或登入帳號。',
    clear: '清空所有收藏',
    emptyTitle: '尚無已儲存的指南',
    emptyDesc: '在瀏覽任何指南時，點擊右上角的收藏圖示即可儲存到這裡，方便隨時翻閱。',
    browse: '瀏覽全部學生指南',
  },
  tl: {
    badge: 'Nai-save sa Device',
    subtitle: 'Mabilis na pag-access sa iyong mga nai-save na gabay nang hindi kailangan ng account.',
    clear: 'Burahin ang lahat ng bookmark',
    emptyTitle: 'Wala pang nai-save na gabay',
    emptyDesc: 'I-click ang bookmark icon sa anumang gabay upang i-save ito dito.',
    browse: 'Tingnan ang mga Gabay',
  },
  ja: {
    badge: '端末に保存済み',
    subtitle: 'ブックマークしたガイドへ素早くアクセス。アカウント不要でブラウザ内に安全に保存されます。',
    clear: 'すべてのブックマークを削除',
    emptyTitle: '保存されたガイドはありません',
    emptyDesc: '各ガイドの閲覧中にブックマークアイコンを押すと、ここに保存されます。',
    browse: '学生ガイド一覧を見る',
  },
};

export default function SavedGuidesPage() {
  const { language, t } = useLanguage();
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const loc = SAVED_I18N[language] || SAVED_I18N.en;

  useEffect(() => {
    setMounted(true);
    setSavedSlugs(getSavedGuideSlugs());

    const handleUpdate = () => {
      setSavedSlugs(getSavedGuideSlugs());
    };

    window.addEventListener('everyuci_bookmarks_updated', handleUpdate);
    return () => window.removeEventListener('everyuci_bookmarks_updated', handleUpdate);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('everyuci_saved_guides_v1');
    setSavedSlugs([]);
    window.dispatchEvent(new Event('everyuci_bookmarks_updated'));
  };

  const savedGuides = GUIDES.filter(g => savedSlugs.includes(g.slug));

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm text-slate-500">
        Loading saved guides...
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 text-[#0064a4] border border-sky-200 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Bookmark className="w-3.5 h-3.5" />
              <span>{loc.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {t.nav.savedGuides}
            </h1>
            <p className="mt-2 text-base text-slate-600">
              {loc.subtitle}
            </p>
          </div>

          {savedGuides.length > 0 && (
            <button
              onClick={handleClearAll}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{loc.clear}</span>
            </button>
          )}
        </div>

        {savedGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedGuides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0064a4] mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {loc.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {loc.emptyDesc}
            </p>
            <div className="pt-2">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0064a4] text-white px-4 py-2 text-xs font-semibold hover:bg-[#0c2340] transition-colors"
              >
                <span>{loc.browse}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
