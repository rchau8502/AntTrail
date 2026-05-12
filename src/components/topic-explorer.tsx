"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MathConceptVisual } from "@/components/math-concept-visual";
import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import { difficulties } from "@/content/schema";
import {
  getChapterOptions,
  getCourseAliases,
  getCourseDisplayLabel,
  getCourseOptions,
  getPrimaryCourseCode,
  getUnitOptions,
} from "@/lib/course-catalog";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

interface TopicExplorerProps {
  cards: BubbleCard[];
}

const libraryCopy = {
  en: {
    eyebrow: "Reference library",
    title: "Use Topics when you need the right page fast, not when you want to wander.",
    description:
      "Topics is now a reference layer. Search by course, unit, or chapter, then open the exact topic page you need for review, drill work, or a weak spot check.",
    libraryReady: "Topics ready",
    noMatch: "No topics match the current filters.",
    openTopic: "Open topic",
    reviewNow: "Review now",
    mistakeToAvoid: "Mistake to avoid",
  },
  es: {
    eyebrow: "Biblioteca de referencia",
    title: "Usa Temas cuando necesitas la pagina correcta rapido, no para pasear.",
    description:
      "Temas ahora es una capa de referencia. Busca por curso, unidad o capitulo y abre exactamente el tema que necesitas para repasar, practicar o revisar una debilidad.",
    libraryReady: "Temas listos",
    noMatch: "No hay temas que coincidan con los filtros actuales.",
    openTopic: "Abrir tema",
    reviewNow: "Repasa ahora",
    mistakeToAvoid: "Error a evitar",
  },
  zh: {
    eyebrow: "参考库",
    title: "Topics 现在是查找层，不是让你随便逛的地方。",
    description:
      "按课程、单元或章节搜索，然后直接打开你需要的主题页，用来复习、做题或检查薄弱点。",
    libraryReady: "可用主题",
    noMatch: "当前筛选下没有匹配的主题。",
    openTopic: "打开主题",
    reviewNow: "现在先复习",
    mistakeToAvoid: "要避开的错误",
  },
} as const;

export function TopicExplorer({ cards }: TopicExplorerProps) {
  const { difficultyLabel, locale, t } = useLanguage();
  const ui = libraryCopy[locale] ?? libraryCopy.en;
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<"All" | Difficulty>(
    "All",
  );
  const [chapterFilter, setChapterFilter] = useState<"All" | string>("All");
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);
  const courseOptions = getCourseOptions(localizedCards);

  const courseScopedCards =
    courseFilter === "All"
      ? localizedCards
      : localizedCards.filter((card) => card.course === courseFilter);
  const unitOptions = getUnitOptions(courseScopedCards);
  const chapterOptions = getChapterOptions(courseScopedCards);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCards = localizedCards.filter((card) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        card.course,
        getCourseDisplayLabel(card.course, locale),
        card.courseCode,
        card.unit,
        card.chapter,
        card.name,
        card.topic,
        card.looksLike,
        card.doThis,
        card.watchOutFor,
        card.rememberThis,
        card.memoryHook,
        card.useItWhen,
        getTechniqueLabel(card, locale),
        ...getCourseAliases(card.course),
        ...(card.aliases ?? []),
        ...card.typicalProblemShapes,
        ...card.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCourse = courseFilter === "All" || card.course === courseFilter;
    const matchesUnit = unitFilter === "All" || card.unit === unitFilter;
    const matchesDifficulty =
      difficultyFilter === "All" || card.difficulty === difficultyFilter;
    const matchesChapter =
      chapterFilter === "All" || card.chapter === chapterFilter;

    return (
      matchesQuery &&
      matchesCourse &&
      matchesUnit &&
      matchesDifficulty &&
      matchesChapter
    );
  });

  const sortedCards = [...filteredCards].sort((left, right) => left.order - right.order);

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,32rem)] xl:items-start">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {ui.eyebrow}
            </p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
              {ui.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {ui.description}
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-4 sm:p-6">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-sky-300"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {t("course")}
                </span>
                <select
                  value={courseFilter}
                  onChange={(event) => {
                    setCourseFilter(event.target.value);
                    setUnitFilter("All");
                    setChapterFilter("All");
                  }}
                  className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="All">{t("allCourses")}</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {getCourseDisplayLabel(course, locale)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {t("unit")}
                </span>
                <select
                  value={unitFilter}
                  onChange={(event) =>
                    setUnitFilter(event.target.value as "All" | Unit)
                  }
                  className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="All">{t("allUnits")}</option>
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {t("difficulty")}
                </span>
                <select
                  value={difficultyFilter}
                  onChange={(event) =>
                    setDifficultyFilter(event.target.value as "All" | Difficulty)
                  }
                  className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="All">{t("allDifficulty")}</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficultyLabel(difficulty)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {t("chapter")}
                </span>
                <select
                  value={chapterFilter}
                  onChange={(event) => setChapterFilter(event.target.value)}
                  className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="All">{t("allChapters")}</option>
                  {chapterOptions.map((chapter) => (
                    <option key={chapter} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[color:var(--line)] bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-950">
                {sortedCards.length} {ui.libraryReady}
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCourseFilter("All");
                  setUnitFilter("All");
                  setDifficultyFilter("All");
                  setChapterFilter("All");
                }}
                className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
              >
                {t("clearAll")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {sortedCards.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-[color:var(--line-strong)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
          {ui.noMatch}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedCards.map((card) => (
            <Link
              key={card.id}
              href={`/topics/${card.id}`}
              className="bubble-shadow group rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 sm:p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                <span>{getCourseDisplayLabel(card.course, locale, { includeCode: false })}</span>
                {card.courseCode ? <span>{card.courseCode}</span> : getPrimaryCourseCode(card.course) ? <span>{getPrimaryCourseCode(card.course)}</span> : null}
                <span className="rounded-full bg-sky-100 px-2 py-1 tracking-normal">
                  {difficultyLabel(card.difficulty)}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{card.name}</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {card.unit} · {card.chapter}
              </p>

              <div className="mt-4 hidden sm:block">
                <MathConceptVisual card={card} mode="card" />
              </div>

              <div className="mt-4 rounded-[1.35rem] border border-sky-100 bg-sky-50/80 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {ui.reviewNow}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                  {card.doThis}
                </p>
              </div>

              <div className="mt-4 rounded-[1.35rem] bg-slate-950 px-4 py-4 text-sky-50">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                  {t("problemCue")}
                </p>
                <p className="mt-2 font-mono text-xs leading-6 sm:text-sm sm:leading-7">
                  {getRecognitionPrompt(card)}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {getPatternTokens(card).slice(0, 3).map((token, index) => (
                  <span
                    key={`${token}-${index}`}
                    className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 font-mono text-xs text-sky-950"
                  >
                    {token}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-[1.35rem] border border-rose-100 bg-rose-50/70 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                  {ui.mistakeToAvoid}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {card.watchOutFor}
                </p>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-900 transition group-hover:text-sky-700">
                {ui.openTopic} →
              </p>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
