"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import {
  getCourseDisplayLabel,
  getCourseOptions,
} from "@/lib/course-catalog";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPriorityScore,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  isBubblegumTopicMastered,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

interface BubblegumHubProps {
  cards: BubbleCard[];
}

function isOptionalCard(card: BubbleCard) {
  const chapterText = card.chapter.toLowerCase();
  const unitText = card.unit.toLowerCase();

  return (
    chapterText.includes("later / optional") ||
    unitText.includes("later / optional") ||
    chapterText.includes("optional") ||
    unitText.includes("optional") ||
    card.chapter.includes("后续 / 可选") ||
    card.unit.includes("后续 / 可选")
  );
}

const hubCopy = {
  en: {
    eyebrow: "Repair lab",
    title: "Practice the topics you miss until they stop being weak topics.",
    description:
      "Bubblegum is the repair loop. Use it after review, after quizzes, or after office hours when you know exactly which topics are still breaking.",
    weakTopics: "Weak topics",
    weakHelp: "These misses are tracked on this device so the weakest topics rise to the top automatically.",
    misses: "misses",
    readyDrills: "Ready drills",
    readyHelp: "Pick one topic, run a short drill, then come back and keep the repair loop tight.",
    mastered: "mastered",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
  },
  es: {
    eyebrow: "Laboratorio de reparacion",
    title: "Practica los temas que fallas hasta que dejen de ser puntos flojos.",
    description:
      "Bubblegum es el bucle de reparacion. Usalo despues de repasar, despues de quizzes o despues de oficina cuando ya sabes que temas todavia fallan.",
    weakTopics: "Temas flojos",
    weakHelp: "Estos fallos se guardan en este dispositivo para que los temas mas debiles suban solos al principio.",
    misses: "fallos",
    readyDrills: "Practicas listas",
    readyHelp: "Elige un tema, haz un ejercicio corto y vuelve para mantener apretado el bucle de reparacion.",
    mastered: "dominados",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
  },
  zh: {
    eyebrow: "补弱训练",
    title: "把你总做错的主题反复练到不再是薄弱点。",
    description:
      "Bubblegum 是补弱循环。适合复习后、小测后、或者答疑后使用，因为这时你已经知道哪些主题还在出错。",
    weakTopics: "薄弱主题",
    weakHelp: "这些错题会记录在当前设备上，最弱的主题会自动排到前面。",
    misses: "错题次数",
    readyDrills: "可开始训练",
    readyHelp: "一次只选一个主题，做一轮短练，然后回来继续补弱。",
    mastered: "已掌握",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
  },
} as const;

export function BubblegumHub({ cards }: BubblegumHubProps) {
  const { locale, t } = useLanguage();
  const ui = hubCopy[locale] ?? hubCopy.en;
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [coreOnly, setCoreOnly] = useState(true);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [progressMap, setProgressMap] = useState<Record<string, BubblegumTopicProgress>>({});
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);
  const courseOptions = getCourseOptions(localizedCards);

  useEffect(() => {
    const sync = () => {
      setMasteredIds(new Set(cards.filter((card) => isBubblegumTopicMastered(card.id)).map((card) => card.id)));
      setProgressMap(getBubblegumTopicProgressMap());
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
  const scopedCards = localizedCards.filter((card) => {
    const matchesCourse = courseFilter === "All" || card.course === courseFilter;
    return matchesCourse && (!coreOnly || !isOptionalCard(card));
  });

  const filteredCards = scopedCards.filter((card) => {
    if (normalizedQuery.length === 0) {
      return true;
    }

    return [
      card.name,
      card.topic,
      card.unit,
      card.course,
      getCourseDisplayLabel(card.course, locale),
      card.rememberThis,
      card.memoryHook,
      card.looksLike,
      card.doThis,
      card.watchOutFor,
      buildBubblegumDrill(card, locale, "quiz", 0).prompt,
      getTechniqueLabel(card, locale),
      getRecognitionPrompt(card),
      ...getPatternTokens(card),
      ...card.typicalProblemShapes,
      ...card.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const orderedCards = [...filteredCards].sort((left, right) => {
    const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
    const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
    const priorityDiff =
      getBubblegumPriorityScore(rightProgress) -
      getBubblegumPriorityScore(leftProgress);

    return priorityDiff || left.order - right.order;
  });
  const weakCards = [...scopedCards]
    .map((card) => ({
      card,
      progress: progressMap[card.id] ?? { gotIt: 0, missedIt: 0 },
    }))
    .filter(({ progress }) => progress.missedIt > 0)
    .sort(
      (left, right) =>
        right.progress.missedIt - left.progress.missedIt ||
        left.progress.gotIt - right.progress.gotIt,
    )
    .slice(0, 6);

  function stateLabel(cardId: string) {
    const state = getBubblegumStudyState(
      progressMap[cardId] ?? { gotIt: 0, missedIt: 0 },
    );

    if (state === "repair") return ui.repair;
    if (state === "review") return ui.review;
    if (state === "stable") return ui.stable;
    return ui.fresh;
  }

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(255,229,239,0.88)_58%,rgba(255,245,251,0.96))] p-6 sm:p-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] xl:items-end">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              {ui.eyebrow}
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              {ui.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {ui.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-rose-200 sm:col-span-2"
            />
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3.5 text-sm outline-none"
            >
              <option value="All">{t("allCourses")}</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {getCourseDisplayLabel(course, locale)}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-slate-900">
              <input
                type="checkbox"
                checked={coreOnly}
                onChange={(event) => setCoreOnly(event.target.checked)}
                className="h-4 w-4 rounded border-[color:var(--line)] text-rose-600"
              />
              <span>{t("currentSyllabusOnly")}</span>
            </label>
            <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
              {orderedCards.length} {t("topics")}
            </div>
            <div className="rounded-2xl border border-[color:var(--line)] bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {masteredIds.size} {ui.mastered}
            </div>
          </div>
        </div>
      </section>

      {weakCards.length > 0 ? (
        <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                {ui.weakTopics}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {ui.weakHelp}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {weakCards.map(({ card, progress }) => (
              <Link
                key={card.id}
                href={`/bubblegum/${card.id}`}
                className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5 transition hover:border-rose-200"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                  {progress.missedIt} {ui.misses}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-slate-900">{card.name}</h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {stateLabel(card.id)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {getTechniqueLabel(card, locale)}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-800">{card.doThis}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            {ui.readyDrills}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            {ui.readyHelp}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orderedCards.map((card) => {
            const mastered = masteredIds.has(card.id);
            const preview = buildBubblegumDrill(card, locale, "warmup", 0);

            return (
              <Link
                key={card.id}
                href={`/bubblegum/${card.id}`}
                className="bubble-shadow rounded-[1.6rem] border border-[color:var(--line)] bg-white/90 p-4 sm:p-5 transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                    Bubblegum
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
                <div className="mt-3 inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {stateLabel(card.id)}
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">{preview.prompt}</p>
                <div className="mt-4 rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                    {ui.eyebrow}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{preview.firstStep}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
