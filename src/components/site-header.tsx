"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const { t } = useLanguage();
  const links = [
    { href: "/study", label: t("navStudy") },
    { href: "/bubblegum", label: t("navBubblegum") },
    { href: "/quiz", label: t("navQuiz") },
    { href: "/memory-hooks", label: t("navMemoryHooks") },
    { href: "/topics", label: t("navTopics") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[rgba(250,246,239,0.82)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-start gap-4">
            <div className="accent-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-[linear-gradient(145deg,#fff8f2,#f2d1c5)] text-xl font-semibold text-[#7a2e1d]">
              Σ
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-2xl leading-none text-slate-900">
                Bubble
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-[color:var(--muted)]">
                Focused study app for MATH 130A, 140A, 121A, and 2E
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a2e1d] md:inline-flex">
              Study with focus
            </div>
            <div className="sm:hidden">
              <LanguageSwitcher compact />
            </div>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 text-sm font-medium text-[color:var(--muted)]">
          <Link
            href="/"
            className="shrink-0 rounded-full border border-[color:var(--line-strong)] bg-[#2a2d33] px-4 py-2 text-white transition hover:bg-[#1f2227]"
          >
            Home
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 transition hover:border-[#c77964] hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
