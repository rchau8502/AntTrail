"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CoursePathways } from "@/components/course-pathways";
import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import { MathConceptVisual } from "@/components/math-concept-visual";
import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import {
  difficulties,
  getChapterOptions,
  getCourseAliases,
  getCourseDisplayLabel,
  getCourseOptions,
  getPrimaryCourseCode,
  getUnitOptions,
} from "@/lib/bubble";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

interface TopicExplorerProps {
  cards: BubbleCard[];
}

function slugifyCourse(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function TopicExplorer({ cards }: TopicExplorerProps) {
  const { difficultyLabel, locale, t } = useLanguage();
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

  const groupedCards = getCourseOptions(filteredCards).map((course) => ({
    course,
    cards: filteredCards.filter((card) => card.course === course),
  }));

  const hasActiveFilters =
    query.length > 0 ||
    courseFilter !== "All" ||
    unitFilter !== "All" ||
    difficultyFilter !== "All" ||
    chapterFilter !== "All";

  return (
    <div className="space-y-8">
      <CoursePathways
        selectedCourse={courseFilter}
        onSelectCourse={(course) => {
          setQuery("");
          setCourseFilter(course);
          setUnitFilter("All");
          setDifficultyFilter("All");
          setChapterFilter("All");
        }}
      />

      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
        <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.1fr)_minmax(30rem,34rem)]">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {t("topicDashboard")}
            </p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
              {t("findTheRuleFast")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {t("topicDashboardDescription")}
            </p>
          </div>

          <div className="grid gap-5 rounded-[1.75rem] border border-[color:var(--line)] bg-white/80 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {t("searchEverything")}
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                  {t("searchEverythingHelp")}
                </p>
              </div>
              {hasActiveFilters ? (
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
              ) : null}
            </div>

            <div className="grid gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
                className="min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-300"
              />
            </div>

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
                    setDifficultyFilter(
                      event.target.value as "All" | Difficulty,
                    )
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
                  onChange={(event) =>
                    setChapterFilter(event.target.value)
                  }
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

            <p className="text-sm text-[color:var(--muted)]">
              {filteredCards.length} {t("cardsReadyToScan")}
            </p>
          </div>
        </div>
      </section>

      {groupedCards.map(({ course, cards: courseCards }) => (
        <section key={course} id={slugifyCourse(course)} className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {getCourseDisplayLabel(course, locale, { includeCode: false })}
                </p>
                {courseCards[0]?.courseCode ? (
                  <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {courseCards[0].courseCode}
                  </span>
                ) : getPrimaryCourseCode(course) ? (
                  <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {getPrimaryCourseCode(course)}
                  </span>
                ) : null}
              </div>
              <h2 className="font-display text-3xl text-slate-900">
                {courseCards.length} {t("topics")}
              </h2>
            </div>
          </div>

          {courseCards.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[color:var(--line-strong)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
              {t("noCardsMatch")}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courseCards.map((card) => (
                <Link
                  key={card.id}
                  href={`/topics/${card.id}`}
                  className="bubble-shadow group rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    <span>{card.unit}</span>
                    {card.courseCode ? <span>{card.courseCode}</span> : null}
                    <span className="rounded-full bg-sky-100 px-2 py-1 tracking-normal">
                      {difficultyLabel(card.difficulty)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {card.name}
                  </h3>
                  <div className="mt-4 rounded-[1.35rem] border border-sky-100 bg-sky-50/80 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("techniqueToTry")}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                      {getTechniqueLabel(card, locale)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <MathConceptVisual card={card} mode="card" />
                  </div>
                  <div className="mt-4 rounded-[1.35rem] bg-slate-950 px-4 py-4 text-sky-50">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                      {t("problemCue")}
                    </p>
                    <p className="mt-2 font-mono text-sm leading-7">
                      {getRecognitionPrompt(card)}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getPatternTokens(card).map((token) => (
                      <span
                        key={token}
                        className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 font-mono text-xs text-sky-950"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[1.4rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.76),rgba(255,255,255,0.96))] px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("firstMove")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {card.doThis}
                    </p>
                  </div>
                  <div className="mt-4 rounded-[1.35rem] border border-rose-100 bg-rose-50/70 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                      {t("trap")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {card.watchOutFor}
                    </p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-sky-50/80 px-4 py-3 text-sm font-medium text-sky-950">
                    {card.memoryHook}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--muted)]">
                    <span className="rounded-full border border-[color:var(--line)] px-3 py-1">
                      {card.chapter}
                    </span>
                    {card.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[color:var(--line)] px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 transition group-hover:text-sky-700">
                    {t("openBubble")} →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
