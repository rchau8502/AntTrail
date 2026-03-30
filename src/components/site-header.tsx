"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const { t } = useLanguage();
  const links = [
    { href: "/topics", label: t("navTopics") },
    { href: "/study", label: t("navStudy") },
    { href: "/quiz", label: t("navQuiz") },
    { href: "/bubblegum", label: t("navBubblegum") },
    { href: "/memory-hooks", label: t("navMemoryHooks") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-white/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="bubble-shadow flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_30%_30%,_white,_#b9e5ff_55%,_#78c8ff)] text-2xl font-semibold text-sky-950">
              ∫
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-xl leading-none">Bubble</p>
              <p className="line-clamp-2 text-sm text-[color:var(--muted)]">
                {t("appTagline")}
              </p>
            </div>
          </Link>

          <div className="shrink-0">
            <div className="sm:hidden">
              <LanguageSwitcher compact />
            </div>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 text-sm font-medium text-[color:var(--muted)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 transition hover:border-[color:var(--line-strong)] hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
