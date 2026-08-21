"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

const navGroups = [
  { href: "/study", label: "Study" },
  { href: "/bubblegum", label: "Repair" },
  { href: "/quiz", label: "Recall" },
  { href: "/topics", label: "Library" },
  { href: "/memory-hooks", label: "Hooks" },
] as const;

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[rgba(248,245,240,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-[linear-gradient(145deg,#fffdf8,#dbe8ff)] text-lg font-semibold text-slate-900 shadow-[0_14px_30px_rgba(23,33,53,0.14)]">
              ∑
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl leading-none text-slate-950">Bubble</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                Retrieval-first study system for MATH 130A, 140A, 121A, and 2E
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-[color:var(--line)] bg-white/75 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 md:inline-flex">
              Attempt → Diagnose → Retry
            </div>
            <div className="sm:hidden">
              <LanguageSwitcher compact />
            </div>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
          <Link
            href="/"
            className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Home
          </Link>
          {navGroups.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[color:var(--line)] bg-white/75 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-[#8da2ff] hover:bg-white"
            >
              {item.label === "Study"
                ? t("navStudy")
                : item.label === "Recall"
                  ? t("navQuiz")
                  : item.label === "Repair"
                    ? t("navBubblegum")
                    : item.label === "Hooks"
                      ? t("navMemoryHooks")
                      : item.label === "Library"
                        ? t("navTopics")
                        : item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
