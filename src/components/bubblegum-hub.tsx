"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { getCourseDisplayLabel, getCourseOptions } from "@/lib/bubble";
import { BUBBLE_PROGRESS_EVENT, isBubbleTopicComplete, isBubblegumTopicMastered } from "@/lib/progress";
import { getPatternTokens, getRecognitionPrompt, getTechniqueLabel } from "@/lib/recognition";

interface BubblegumHubProps {
  cards: BubbleCard[];
}

export function BubblegumHub({ cards }: BubblegumHubProps) {
  const { locale, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);
  const courseOptions = getCourseOptions(localizedCards);

  useEffect(() => {
    const sync = () => {
      setCompletedIds(new Set(cards.filter((card) => isBubbleTopicComplete(card.id)).map((card) => card.id)));
      setMasteredIds(new Set(cards.filter((card) => isBubblegumTopicMastered(card.id)).map((card) => card.id)));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);
    };
  }, [cards]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCards = localizedCards.filter((card) => {
    const matchesCourse = courseFilter === "All" || card.course === courseFilter;
    const matchesQuery =
      normalizedQuery.length === 0
        ? true
        : [
            card.name,
            card.topic,
            card.unit,
            card.course,
            card.rememberThis,
            card.memoryHook,
            card.looksLike,
            card.doThis,
            card.watchOutFor,
            getTechniqueLabel(card, locale),
            getRecognitionPrompt(card),
            ...getPatternTokens(card),
            ...card.typicalProblemShapes,
            ...card.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

    return matchesCourse && matchesQuery;
  });

  const orderedCards = [...filteredCards].sort((left, right) => {
    const leftComplete = completedIds.has(left.id) ? 1 : 0;
    const rightComplete = completedIds.has(right.id) ? 1 : 0;

    if (leftComplete !== rightComplete) {
      return rightComplete - leftComplete;
    }

    return left.order - right.order;
  });

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(255,229,239,0.88)_58%,rgba(255,245,251,0.96))] p-6 sm:p-8">
        <p className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
          Bubblegum
        </p>
        <h1 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
          {t("bubblegumTitle")}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
          {t("bubblegumDescription")}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-200"
          />
          <select
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="All">{t("allCourses")}</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {getCourseDisplayLabel(course, locale)}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orderedCards.map((card) => {
          const complete = completedIds.has(card.id);
          const mastered = masteredIds.has(card.id);

          return (
            <Link
              key={card.id}
              href={`/bubblegum/${card.id}`}
              className="bubble-shadow rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-5 transition hover:-translate-y-1"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  {complete ? t("bubblegumUnlocked") : t("bubbleIncomplete")}
                </span>
                {mastered ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {t("bubblegumMastered")}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                {getCourseDisplayLabel(card.course, locale)}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{card.name}</h2>
              <div className="mt-3 inline-flex max-w-full rounded-full border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {getTechniqueLabel(card, locale)}
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {card.memoryHook}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
