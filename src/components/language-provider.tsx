"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  defaultLocale,
  detectLocale,
  locales,
  type Locale,
  type TranslationKey,
  translate,
  translateCourseTitle,
  translateDifficulty,
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  courseLabel: (title: string) => string;
  difficultyLabel: (difficulty: string) => string;
}

const LANGUAGE_STORAGE_KEY = "bubble-locale";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (stored && locales.includes(stored as Locale)) {
      return stored as Locale;
    }

    return detectLocale(window.navigator.language);
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => setLocaleState(nextLocale),
      t: (key) => translate(locale, key),
      courseLabel: (title) => translateCourseTitle(locale, title),
      difficultyLabel: (difficulty) => translateDifficulty(locale, difficulty),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
