"use client";

import { localeNames, locales, type Locale } from "@/lib/i18n";

import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <label className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-2 text-sm text-[color:var(--muted)]">
      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
        {t("language")}
      </span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="bg-transparent text-sm font-semibold text-slate-900 outline-none"
      >
        {locales.map((entry) => (
          <option key={entry} value={entry}>
            {localeNames[entry]}
          </option>
        ))}
      </select>
    </label>
  );
}
